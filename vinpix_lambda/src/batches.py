"""
Image Batch management for the /team "3D Gen" tab.

A batch is a named collection of images pulled out of Smart Chat. When images are
added, each one is COPIED server-side into a batch-owned S3 prefix so the batch
stays intact even if the originating chat session is later deleted.

Persistence:
  - vinpix_team_tasks (PK pk, SK sk)   -> shared with tasks/notes/bugs
        Batch item : pk="BATCH"  sk=batch_id

S3 layout (bucket springboard2025, prefix vinpixstudio/):
  - 3dgen_batches/{batch_id}/{image_id}.{ext}   -> batch-owned image copies
  - 3dgen_models/{batch_id}/{image_id}.glb      -> generated 3D models (Phase 2)

Modeled on team_tasks.py conventions: try/except, {'statusCode','body'} returns,
short_uuid() ids, ISO-8601 timestamps, _num()/_clean() helpers.
"""

import time
from decimal import Decimal
from datetime import datetime

from boto3.dynamodb.conditions import Key
from .utils import team_tasks_table, short_uuid, S3_BUCKET, get_s3_key
from . import s3helper

# ----- domain constants -----
BATCH_PK = "BATCH"
EDITABLE_BATCH_FIELDS = {"name", "description", "cover", "order"}


# ----- helpers -----
def _now():
    return datetime.utcnow().isoformat() + "Z"


def _clean(obj):
    """Recursively convert DynamoDB Decimal/set into JSON-safe types."""
    if isinstance(obj, list):
        return [_clean(v) for v in obj]
    if isinstance(obj, dict):
        return {k: _clean(v) for k, v in obj.items()}
    if isinstance(obj, set):
        return [_clean(v) for v in obj]
    if isinstance(obj, Decimal):
        return int(obj) if obj % 1 == 0 else float(obj)
    return obj


def _num(value, default=0):
    try:
        if value is None or value == "":
            value = default
        return Decimal(str(value))
    except Exception:
        return Decimal(str(default))


def _strip_batch(item):
    item = _clean(item)
    item.pop("pk", None)
    item.pop("sk", None)
    if not isinstance(item.get("images"), list):
        item["images"] = []
    return item


def _ext_from_key(key, fallback="webp"):
    """Pull a file extension from an S3 key (e.g. .../uuid.webp -> webp)."""
    tail = (key or "").rsplit("/", 1)[-1]
    if "." in tail:
        ext = tail.rsplit(".", 1)[-1].lower()
        # guard against absurd "extensions" from keys without a real suffix
        if 1 <= len(ext) <= 5 and ext.isalnum():
            return ext
    return fallback


def _get_batch_item(batch_id):
    resp = team_tasks_table.get_item(Key={"pk": BATCH_PK, "sk": batch_id})
    return resp.get("Item")


# =========================================================
#  CRUD
# =========================================================
def listBatches(params):
    try:
        resp = team_tasks_table.query(KeyConditionExpression=Key("pk").eq(BATCH_PK))
        batches = [_strip_batch(i) for i in resp.get("Items", [])]
        batches.sort(key=lambda b: b.get("order", 0))
        return {"statusCode": 200, "body": {"batches": batches}}
    except Exception as e:
        print(f"[batch] listBatches error: {str(e)}")
        return {"statusCode": 500, "body": {"error": str(e)}}


def createBatch(params):
    try:
        params = params or {}
        name = (params.get("name") or "").strip()
        if not name:
            return {"statusCode": 400, "body": {"error": "Tên batch là bắt buộc."}}

        batch_id = short_uuid()
        now = _now()
        order = params.get("order")
        if order is None:
            order = int(time.time() * 1000)

        item = {
            "pk": BATCH_PK,
            "sk": batch_id,
            "batch_id": batch_id,
            "name": name,
            "description": params.get("description", ""),
            "images": [],
            "cover": "",
            "status": "collecting",
            "createdBy": params.get("createdBy", ""),
            "order": _num(order),
            "createdAt": now,
            "updatedAt": now,
        }
        team_tasks_table.put_item(Item=item)

        # Optionally seed with images in the same call (used by "create + add").
        seed = params.get("images")
        if isinstance(seed, list) and seed:
            return addImagesToBatch({"batchId": batch_id, "images": seed})

        return {"statusCode": 200, "body": {"batch": _strip_batch(item)}}
    except Exception as e:
        print(f"[batch] createBatch error: {str(e)}")
        return {"statusCode": 500, "body": {"error": str(e)}}


def updateBatch(params):
    try:
        params = params or {}
        batch_id = params.get("batchId")
        updates = params.get("updates") or {}
        if not batch_id:
            return {"statusCode": 400, "body": {"error": "batchId là bắt buộc."}}

        set_parts = ["updatedAt = :ua"]
        names = {}
        values = {":ua": _now()}
        i = 0
        for key, val in updates.items():
            if key not in EDITABLE_BATCH_FIELDS:
                continue
            i += 1
            ph, pv = f"#f{i}", f":v{i}"
            names[ph] = key
            values[pv] = _num(val) if key == "order" else val
            set_parts.append(f"{ph} = {pv}")
        if len(set_parts) == 1:
            return {"statusCode": 400, "body": {"error": "Không có trường hợp lệ để cập nhật."}}

        resp = team_tasks_table.update_item(
            Key={"pk": BATCH_PK, "sk": batch_id},
            UpdateExpression="SET " + ", ".join(set_parts),
            ExpressionAttributeNames=names,
            ExpressionAttributeValues=values,
            ReturnValues="ALL_NEW",
        )
        return {"statusCode": 200, "body": {"batch": _strip_batch(resp["Attributes"])}}
    except Exception as e:
        print(f"[batch] updateBatch error: {str(e)}")
        return {"statusCode": 500, "body": {"error": str(e)}}


def deleteBatch(params):
    try:
        batch_id = (params or {}).get("batchId")
        if not batch_id:
            return {"statusCode": 400, "body": {"error": "batchId là bắt buộc."}}

        # Drop batch-owned S3 copies (images + models) before the DB pointer so we
        # don't orphan objects. A missing prefix is a no-op.
        s3helper.delete_folder_from_s3(S3_BUCKET, get_s3_key(f"3dgen_batches/{batch_id}/"))
        s3helper.delete_folder_from_s3(S3_BUCKET, get_s3_key(f"3dgen_models/{batch_id}/"))

        team_tasks_table.delete_item(Key={"pk": BATCH_PK, "sk": batch_id})
        return {"statusCode": 200, "body": {"message": "Đã xoá batch.", "batchId": batch_id}}
    except Exception as e:
        print(f"[batch] deleteBatch error: {str(e)}")
        return {"statusCode": 500, "body": {"error": str(e)}}


def addImagesToBatch(params):
    """
    Append images to a batch. Each incoming image carries the SOURCE smart-chat S3
    key; we copy it into the batch-owned prefix and store the new key. Dedupe is by
    sourceKey so the same chat image isn't added to one batch twice.

    params.images: [{ key, name?, prompt?, sourceNodeId? }]
    """
    try:
        params = params or {}
        batch_id = params.get("batchId")
        incoming = params.get("images") or []
        if not batch_id:
            return {"statusCode": 400, "body": {"error": "batchId là bắt buộc."}}
        if not isinstance(incoming, list) or not incoming:
            return {"statusCode": 400, "body": {"error": "Không có ảnh để thêm."}}

        item = _get_batch_item(batch_id)
        if not item:
            return {"statusCode": 404, "body": {"error": "Không tìm thấy batch."}}

        existing = item.get("images") or []
        existing_sources = {img.get("sourceKey") for img in existing if img.get("sourceKey")}

        now = _now()
        added = []
        for raw in incoming:
            src_key = (raw or {}).get("key")
            if not src_key or src_key in existing_sources:
                continue
            existing_sources.add(src_key)

            image_id = short_uuid()
            ext = _ext_from_key(src_key)
            dest_key = get_s3_key(f"3dgen_batches/{batch_id}/{image_id}.{ext}")
            s3helper.copy_within_s3(S3_BUCKET, src_key, dest_key)

            added.append({
                "id": image_id,
                "key": dest_key,
                "sourceKey": src_key,
                "name": raw.get("name", ""),
                "prompt": raw.get("prompt", ""),
                "sourceNodeId": raw.get("sourceNodeId", ""),
                "addedAt": now,
            })

        if not added:
            # Nothing new (all duplicates / missing keys) — return current state.
            return {"statusCode": 200, "body": {"batch": _strip_batch(item), "added": 0}}

        merged = existing + added
        cover = item.get("cover") or merged[0]["key"]

        resp = team_tasks_table.update_item(
            Key={"pk": BATCH_PK, "sk": batch_id},
            UpdateExpression="SET images = :imgs, cover = :cv, updatedAt = :ua",
            ExpressionAttributeValues={":imgs": merged, ":cv": cover, ":ua": now},
            ReturnValues="ALL_NEW",
        )
        return {
            "statusCode": 200,
            "body": {"batch": _strip_batch(resp["Attributes"]), "added": len(added)},
        }
    except Exception as e:
        print(f"[batch] addImagesToBatch error: {str(e)}")
        return {"statusCode": 500, "body": {"error": str(e)}}


def removeImageFromBatch(params):
    try:
        params = params or {}
        batch_id = params.get("batchId")
        image_id = params.get("imageId")
        if not batch_id or not image_id:
            return {"statusCode": 400, "body": {"error": "batchId và imageId là bắt buộc."}}

        item = _get_batch_item(batch_id)
        if not item:
            return {"statusCode": 404, "body": {"error": "Không tìm thấy batch."}}

        images = item.get("images") or []
        target = next((img for img in images if img.get("id") == image_id), None)
        if not target:
            return {"statusCode": 404, "body": {"error": "Không tìm thấy ảnh trong batch."}}

        # Delete batch-owned copies (image + any generated model).
        keys_to_drop = [k for k in [target.get("key"), (target.get("model3d") or {}).get("modelKey")] if k]
        if keys_to_drop:
            s3helper.delete_objects_from_s3(S3_BUCKET, keys_to_drop)

        remaining = [img for img in images if img.get("id") != image_id]
        cover = item.get("cover")
        if cover == target.get("key"):
            cover = remaining[0]["key"] if remaining else ""

        resp = team_tasks_table.update_item(
            Key={"pk": BATCH_PK, "sk": batch_id},
            UpdateExpression="SET images = :imgs, cover = :cv, updatedAt = :ua",
            ExpressionAttributeValues={":imgs": remaining, ":cv": cover, ":ua": _now()},
            ReturnValues="ALL_NEW",
        )
        return {"statusCode": 200, "body": {"batch": _strip_batch(resp["Attributes"])}}
    except Exception as e:
        print(f"[batch] removeImageFromBatch error: {str(e)}")
        return {"statusCode": 500, "body": {"error": str(e)}}
