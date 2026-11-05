"""
Game Design Studio (/game_design) persistence.

Table vinpix_game_design (PK pk, SK sk), on-demand:
    pk=WORLD sk=<worldId>   -> World
    pk=DISH  sk=<dishId>    -> Dish
    pk=LEVEL sk=<levelId>   -> Level
    pk=MAP   sk=<mapId>     -> MapDoc (full objects[])

Every record keeps its own JSON shape from the client plus `updatedAt`.
Writes are last-write-wins per record (single internal team, no conflicts expected).

Functions (all gated by the Next.js route behind the team passcode cookie):
    gdLoad()                       -> {worlds, dishes, levels, maps, empty}
    gdSave(worlds?, dishes?, levels?, maps?, deletes?) -> {ok, savedAt, counts}
    gdReset(confirm=True)          -> {ok, deleted}
"""

import json
from decimal import Decimal
from datetime import datetime

from boto3.dynamodb.conditions import Key
from .utils import game_design_table

KINDS = {
    "world": "WORLD",
    "dish": "DISH",
    "level": "LEVEL",
    "map": "MAP",
}
LIST_KEYS = {"worlds": "WORLD", "dishes": "DISH", "levels": "LEVEL", "maps": "MAP"}

MAX_BATCH_ITEMS = 500


def _now():
    return datetime.utcnow().isoformat() + "Z"


def _clean(obj):
    """DynamoDB Decimal/set -> JSON-safe types."""
    if isinstance(obj, list):
        return [_clean(v) for v in obj]
    if isinstance(obj, dict):
        return {k: _clean(v) for k, v in obj.items()}
    if isinstance(obj, set):
        return [_clean(v) for v in obj]
    if isinstance(obj, Decimal):
        return int(obj) if obj % 1 == 0 else float(obj)
    return obj


def _to_ddb(obj):
    """JSON floats -> Decimal so boto3 accepts them."""
    return json.loads(json.dumps(obj), parse_float=Decimal)


def _strip(item):
    item = _clean(item)
    item.pop("pk", None)
    item.pop("sk", None)
    return item


def _query_all(pk):
    items = []
    kwargs = {"KeyConditionExpression": Key("pk").eq(pk)}
    while True:
        resp = game_design_table.query(**kwargs)
        items.extend(resp.get("Items", []))
        last = resp.get("LastEvaluatedKey")
        if not last:
            break
        kwargs["ExclusiveStartKey"] = last
    return [_strip(i) for i in items]


def gdLoad(params=None):
    try:
        out = {}
        total = 0
        for list_key, pk in LIST_KEYS.items():
            rows = _query_all(pk)
            total += len(rows)
            out[list_key] = rows
        out["empty"] = total == 0
        return {"statusCode": 200, "body": out}
    except Exception as e:
        print(f"[gdLoad] error: {e}")
        return {"statusCode": 500, "body": {"error": f"Không tải được dữ liệu: {e}"}}


def _validate_record(pk, rec):
    if not isinstance(rec, dict):
        return None
    rid = rec.get("id")
    if not isinstance(rid, str) or not rid.strip():
        return None
    if pk == "MAP":
        if not isinstance(rec.get("objects"), list):
            return None
    return rid


def gdSave(params):
    """Batch upsert lists + delete list. Nothing is validated beyond ids/shape:
    the client owns the schema; the server only stores JSON."""
    try:
        params = params or {}
        now = _now()
        counts = {"put": 0, "deleted": 0, "skipped": 0}
        puts = []
        dels = []

        for list_key, pk in LIST_KEYS.items():
            rows = params.get(list_key)
            if not isinstance(rows, list):
                continue
            for rec in rows:
                rid = _validate_record(pk, rec)
                if rid is None:
                    counts["skipped"] += 1
                    continue
                item = _to_ddb(rec)
                item["pk"] = pk
                item["sk"] = rid
                item["updatedAt"] = now
                puts.append(item)

        deletes = params.get("deletes")
        if isinstance(deletes, list):
            for d in deletes:
                if not isinstance(d, dict):
                    counts["skipped"] += 1
                    continue
                pk = KINDS.get(str(d.get("kind", "")).lower())
                rid = d.get("id")
                if not pk or not isinstance(rid, str) or not rid:
                    counts["skipped"] += 1
                    continue
                dels.append({"pk": pk, "sk": rid})

        if len(puts) + len(dels) > MAX_BATCH_ITEMS:
            return {"statusCode": 400, "body": {"error": f"Quá nhiều bản ghi trong một lần lưu (>{MAX_BATCH_ITEMS})."}}

        with game_design_table.batch_writer(overwrite_by_pkeys=["pk", "sk"]) as bw:
            for item in puts:
                bw.put_item(Item=item)
                counts["put"] += 1
            for key in dels:
                bw.delete_item(Key=key)
                counts["deleted"] += 1

        return {"statusCode": 200, "body": {"ok": True, "savedAt": now, "counts": counts}}
    except Exception as e:
        print(f"[gdSave] error: {e}")
        return {"statusCode": 500, "body": {"error": f"Lưu thất bại: {e}"}}


def gdReset(params):
    """Delete every record. The client re-seeds afterwards."""
    try:
        if not (params or {}).get("confirm"):
            return {"statusCode": 400, "body": {"error": "Thiếu confirm."}}
        deleted = 0
        with game_design_table.batch_writer() as bw:
            for pk in LIST_KEYS.values():
                kwargs = {
                    "KeyConditionExpression": Key("pk").eq(pk),
                    "ProjectionExpression": "pk, sk",
                }
                while True:
                    resp = game_design_table.query(**kwargs)
                    for it in resp.get("Items", []):
                        bw.delete_item(Key={"pk": it["pk"], "sk": it["sk"]})
                        deleted += 1
                    last = resp.get("LastEvaluatedKey")
                    if not last:
                        break
                    kwargs["ExclusiveStartKey"] = last
        return {"statusCode": 200, "body": {"ok": True, "deleted": deleted}}
    except Exception as e:
        print(f"[gdReset] error: {e}")
        return {"statusCode": 500, "body": {"error": f"Reset thất bại: {e}"}}
