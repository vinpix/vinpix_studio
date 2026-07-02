"""
Phase 2: image -> 3D for /team batches, as a DECOUPLED QUEUE.

The Lambda does NOT call any 3D provider. Instead:
  - generateBatch3D : marks selected images model3d.status="queued" (pending).
  - getBatch3DStatus: returns the batch as-is (client polls to see the agent's
    writes).
An external worker agent does the real generation:
  - listBatch3DQueue : pulls pending jobs (image S3 key + prompt) to work on.
  - updateBatch3DJob : writes the result back (status running/success/failed,
    modelKey or modelUrl, error, progress, taskId).

Model GLBs live at vinpixstudio/3dgen_models/{batch_id}/{image_id}.glb. The agent
may either upload the GLB to S3 itself and pass modelKey, or pass modelUrl and let
this module fetch + store it.
"""

import os
import urllib.request

import boto3

from .utils import team_tasks_table, S3_BUCKET, get_s3_key
from . import batches
from boto3.dynamodb.conditions import Key

BATCH_PK = batches.BATCH_PK
# states that mean "still in the pipeline" (counts as the batch generating)
_ACTIVE = ("queued", "running")
VALID_JOB_STATUS = {"queued", "running", "success", "failed"}
# fields the worker agent may write through updateBatch3DJob
_WRITABLE_JOB_FIELDS = ("taskId", "progress", "error")


def _recompute_status(images, fallback):
    statuses = [(i.get("model3d") or {}).get("status") for i in images if i.get("model3d")]
    if any(s in _ACTIVE for s in statuses):
        return "generating"
    if statuses and all(s == "success" for s in statuses):
        return "done"
    return fallback or "collecting"


def _save_images(batch_id, images, status):
    resp = team_tasks_table.update_item(
        Key={"pk": BATCH_PK, "sk": batch_id},
        UpdateExpression="SET images = :imgs, #st = :st, updatedAt = :ua",
        ExpressionAttributeNames={"#st": "status"},
        ExpressionAttributeValues={
            ":imgs": images,
            ":st": status,
            ":ua": batches._now(),
        },
        ReturnValues="ALL_NEW",
    )
    return batches._strip_batch(resp["Attributes"])


def _notify_worker():
    """Best-effort wake-up call to the VPS worker (env WORKER_3D_WEBHOOK_URL).
    The worker also polls, so failures here are non-fatal."""
    url = os.environ.get("WORKER_3D_WEBHOOK_URL", "")
    if not url:
        return
    try:
        req = urllib.request.Request(url, data=b"", method="POST")
        urllib.request.urlopen(req, timeout=3).read()
        print("[batch3d] worker webhook notified")
    except Exception as e:
        print(f"[batch3d] worker webhook failed (non-fatal): {e}")


def _download(url):
    with urllib.request.urlopen(urllib.request.Request(url), timeout=120) as resp:
        return resp.read()


def _store_glb(glb_bytes, key):
    boto3.client("s3").put_object(
        Bucket=S3_BUCKET,
        Key=key,
        Body=glb_bytes,
        ContentType="model/gltf-binary",
        CacheControl="public, max-age=31536000",
    )
    return key


# =========================================================
#  WEB CLIENT (the /team UI)
# =========================================================
def generateBatch3D(params):
    """Enqueue images for 3D generation (status="queued"). No external call — a
    separate worker agent picks these up. imageIds optional (defaults to all)."""
    try:
        params = params or {}
        batch_id = params.get("batchId")
        only_ids = params.get("imageIds")
        if not batch_id:
            return {"statusCode": 400, "body": {"error": "batchId là bắt buộc."}}

        item = batches._get_batch_item(batch_id)
        if not item:
            return {"statusCode": 404, "body": {"error": "Không tìm thấy batch."}}

        images = item.get("images") or []
        if not images:
            return {"statusCode": 400, "body": {"error": "Batch chưa có ảnh."}}

        now = batches._now()
        queued = 0
        for img in images:
            if only_ids and img.get("id") not in only_ids:
                continue
            cur = (img.get("model3d") or {}).get("status")
            # don't re-queue something already pending or done
            if cur in ("queued", "running", "success"):
                continue
            img["model3d"] = {
                "status": "queued",
                "taskId": "",
                "modelKey": "",
                "error": "",
                "progress": 0,
                "queuedAt": now,
                "updatedAt": now,
            }
            queued += 1

        status = _recompute_status(images, item.get("status"))
        batch = _save_images(batch_id, images, status)
        if queued:
            _notify_worker()
        return {"statusCode": 200, "body": {"batch": batch, "queued": queued}}
    except Exception as e:
        print(f"[batch3d] generateBatch3D error: {str(e)}")
        return {"statusCode": 500, "body": {"error": str(e)}}


def retryBatch3D(params):
    """Re-queue images for a fresh generation. imageIds optional — without it,
    every image whose last run finished (success/failed) is redone;
    queued/running ones are left alone.

    The old GLB is NOT deleted here: the new model overwrites the same S3 key
    on success, and keeping a handle on the previous result lets a queued retry
    be cancelled (cancelBatch3DJob restores it)."""
    try:
        params = params or {}
        batch_id = params.get("batchId")
        only_ids = params.get("imageIds")
        if not batch_id:
            return {"statusCode": 400, "body": {"error": "batchId là bắt buộc."}}

        item = batches._get_batch_item(batch_id)
        if not item:
            return {"statusCode": 404, "body": {"error": "Không tìm thấy batch."}}

        images = item.get("images") or []
        now = batches._now()
        retried = 0
        for img in images:
            if only_ids and img.get("id") not in only_ids:
                continue
            old = img.get("model3d") or {}
            cur = old.get("status")
            # never yank something the worker may be processing right now
            if cur in _ACTIVE:
                continue
            # whole-batch retry only redoes finished runs; explicit ids may also
            # kick off images that were never generated
            if not only_ids and cur not in ("success", "failed"):
                continue
            new_m = {
                "status": "queued",
                "taskId": "",
                "modelKey": "",
                "error": "",
                "progress": 0,
                "queuedAt": now,
                "updatedAt": now,
            }
            if cur == "success" and old.get("modelKey"):
                new_m["prevModelKey"] = old["modelKey"]
                new_m["prevTaskId"] = old.get("taskId", "")
            img["model3d"] = new_m
            retried += 1

        if not retried:
            return {"statusCode": 400, "body": {"error": "Không có model nào để tạo lại."}}

        status = _recompute_status(images, item.get("status"))
        batch = _save_images(batch_id, images, status)
        _notify_worker()
        return {"statusCode": 200, "body": {"batch": batch, "retried": retried}}
    except Exception as e:
        print(f"[batch3d] retryBatch3D error: {str(e)}")
        return {"statusCode": 500, "body": {"error": str(e)}}


def cancelBatch3DJob(params):
    """Cancel a QUEUED job before the worker picks it up. A cancelled retry
    restores the previous model; a cancelled first run goes back to 'none'.
    Running jobs can't be cancelled (the generation is already paid for)."""
    try:
        params = params or {}
        batch_id = params.get("batchId")
        image_id = params.get("imageId")
        if not batch_id or not image_id:
            return {"statusCode": 400, "body": {"error": "batchId và imageId là bắt buộc."}}

        item = batches._get_batch_item(batch_id)
        if not item:
            return {"statusCode": 404, "body": {"error": "Không tìm thấy batch."}}

        images = item.get("images") or []
        target = next((i for i in images if i.get("id") == image_id), None)
        if not target:
            return {"statusCode": 404, "body": {"error": "Không tìm thấy ảnh trong batch."}}

        m = target.get("model3d") or {}
        if m.get("status") != "queued":
            return {"statusCode": 400, "body": {"error": "Chỉ huỷ được job đang chờ xử lý."}}

        now = batches._now()
        if m.get("prevModelKey"):
            target["model3d"] = {
                "status": "success",
                "taskId": m.get("prevTaskId", ""),
                "modelKey": m["prevModelKey"],
                "error": "",
                "progress": batches._num(100),
                "updatedAt": now,
            }
        else:
            target["model3d"] = {
                "status": "none",
                "taskId": "",
                "modelKey": "",
                "error": "",
                "progress": batches._num(0),
                "updatedAt": now,
            }

        status = _recompute_status(images, "collecting")
        batch = _save_images(batch_id, images, status)
        return {"statusCode": 200, "body": {"batch": batch}}
    except Exception as e:
        print(f"[batch3d] cancelBatch3DJob error: {str(e)}")
        return {"statusCode": 500, "body": {"error": str(e)}}


def getBatch3DStatus(params):
    """Return the batch as stored. The client polls this to reflect the worker
    agent's progress (no provider call here)."""
    try:
        batch_id = (params or {}).get("batchId")
        if not batch_id:
            return {"statusCode": 400, "body": {"error": "batchId là bắt buộc."}}
        item = batches._get_batch_item(batch_id)
        if not item:
            return {"statusCode": 404, "body": {"error": "Không tìm thấy batch."}}
        return {"statusCode": 200, "body": {"batch": batches._strip_batch(item)}}
    except Exception as e:
        print(f"[batch3d] getBatch3DStatus error: {str(e)}")
        return {"statusCode": 500, "body": {"error": str(e)}}


# =========================================================
#  WORKER AGENT
# =========================================================
def listBatch3DQueue(params):
    """Worker pull: every image whose model3d.status is queued (or running).
    Returns enough to do the job: the batch-owned image key + prompt."""
    try:
        params = params or {}
        wanted = params.get("status")  # optional: "queued" | "running"
        resp = team_tasks_table.query(KeyConditionExpression=Key("pk").eq(BATCH_PK))
        jobs = []
        for raw in resp.get("Items", []):
            b = batches._strip_batch(raw)
            for img in b.get("images", []):
                st = (img.get("model3d") or {}).get("status")
                if st not in _ACTIVE:
                    continue
                if wanted and st != wanted:
                    continue
                jobs.append({
                    "batchId": b["batch_id"],
                    "batchName": b.get("name", ""),
                    "imageId": img["id"],
                    "key": img["key"],
                    "sourceKey": img.get("sourceKey", ""),
                    "name": img.get("name", ""),
                    "prompt": img.get("prompt", ""),
                    "status": st,
                    "queuedAt": (img.get("model3d") or {}).get("queuedAt", ""),
                })
        jobs.sort(key=lambda j: j.get("queuedAt", ""))
        return {"statusCode": 200, "body": {"jobs": jobs}}
    except Exception as e:
        print(f"[batch3d] listBatch3DQueue error: {str(e)}")
        return {"statusCode": 500, "body": {"error": str(e)}}


def updateBatch3DJob(params):
    """Worker write-back: set an image's model3d result.

    params: batchId, imageId, status (queued|running|success|failed),
            optional modelKey | modelUrl, error, progress, taskId.
    On success, modelKey is used directly, or modelUrl is fetched + stored to S3.
    """
    try:
        params = params or {}
        batch_id = params.get("batchId")
        image_id = params.get("imageId")
        status = params.get("status")
        if not batch_id or not image_id or not status:
            return {"statusCode": 400, "body": {"error": "batchId, imageId, status là bắt buộc."}}
        if status not in VALID_JOB_STATUS:
            return {"statusCode": 400, "body": {"error": f"status không hợp lệ: {status}"}}

        item = batches._get_batch_item(batch_id)
        if not item:
            return {"statusCode": 404, "body": {"error": "Không tìm thấy batch."}}

        images = item.get("images") or []
        target = next((i for i in images if i.get("id") == image_id), None)
        if not target:
            return {"statusCode": 404, "body": {"error": "Không tìm thấy ảnh trong batch."}}

        m = dict(target.get("model3d") or {})
        m["status"] = status
        m["updatedAt"] = batches._now()
        if status in ("success", "failed"):
            # the retry-cancel handle is only meaningful while queued
            m.pop("prevModelKey", None)
            m.pop("prevTaskId", None)
        for f in _WRITABLE_JOB_FIELDS:
            if f in params and params[f] is not None:
                m[f] = batches._num(params[f]) if f == "progress" else params[f]

        if status == "success":
            model_key = params.get("modelKey")
            model_url = params.get("modelUrl")
            if not model_key and model_url:
                model_key = get_s3_key(f"3dgen_models/{batch_id}/{image_id}.glb")
                _store_glb(_download(model_url), model_key)
            if not model_key:
                return {"statusCode": 400, "body": {"error": "success cần modelKey hoặc modelUrl."}}
            m["modelKey"] = model_key
            m["progress"] = batches._num(100)

        target["model3d"] = m
        status_batch = _recompute_status(images, item.get("status"))
        batch = _save_images(batch_id, images, status_batch)
        return {"statusCode": 200, "body": {"batch": batch}}
    except Exception as e:
        print(f"[batch3d] updateBatch3DJob error: {str(e)}")
        return {"statusCode": 500, "body": {"error": str(e)}}
