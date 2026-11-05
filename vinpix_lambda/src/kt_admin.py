"""
Kitchen Together Admin Tool (/game_design/admin).

Web port of the Unity editor "KT/Admin Tool" — but without an admin key: the
Next.js route only forwards these `kta*` functions for callers holding the
team passcode cookie, and this Lambda talks to the game tables directly
(same AWS account as the game Lambda `kitchenmain2`).

Tables (game account):
    kitchen2_user  PK uid ; GSI username-index (username)
                   fields used: username, wallet{coin,gem}, wallet_locked,
                   levels[{level,stars}], owned_maps (string set),
                   is_pass_tutorial, has_password, accountStatus, createdAt
    kt_maps        PK map_id ; title, creator_username, price_coins, price_gems, visibility

Functions:
    ktaLookup(username | uid)                       -> user summary
    ktaSetWallet(uid, mode=add|set, coin?, gem?)    -> new wallet
    ktaUnlockLevels(uid, upTo? | levels?, stars=3)  -> levels
    ktaResetLevels(uid, level?)                     -> levels
    ktaGrantMap(uid, mapId) / ktaRevokeMap          -> owned_maps
    ktaResetTutorial(uid)
    ktaSearchMaps(q, limit)                         -> maps (by map_id prefix / title / creator)
"""

import unicodedata
from decimal import Decimal

from boto3.dynamodb.conditions import Key, Attr
from botocore.exceptions import ClientError

from .utils import kt_user_table, kt_maps_table
from .game_design import _clean

USER_PROJECTION = (
    "uid, username, wallet, wallet_locked, levels, owned_maps, is_pass_tutorial, "
    "has_password, accountStatus, createdAt, created_at, referralCode, skin, gender"
)
MAX_LEVEL = 500
MAX_SEARCH_SCAN = 4000


def _ok(body):
    return {"statusCode": 200, "body": body}


def _err(code, message):
    return {"statusCode": code, "body": {"error": message}}


def _normalize_username(raw):
    if raw is None:
        return ""
    return unicodedata.normalize("NFC", str(raw)).strip()


def _int(v, default=None):
    try:
        if v is None or v == "":
            return default
        return int(Decimal(str(v)))
    except Exception:
        return default


def _uid_by_username(username):
    name = _normalize_username(username)
    if not name:
        return None
    resp = kt_user_table.query(
        IndexName="username-index",
        KeyConditionExpression=Key("username").eq(name),
        Limit=1,
    )
    items = resp.get("Items", [])
    return items[0].get("uid") if items else None


def _resolve_uid(params):
    """Accept either uid or username. Returns (uid, error_response)."""
    params = params or {}
    uid = str(params.get("uid") or "").strip()
    if uid:
        return uid, None
    username = params.get("username")
    if not _normalize_username(username):
        return None, _err(400, "Cần username hoặc uid.")
    uid = _uid_by_username(username)
    if not uid:
        return None, _err(404, f"Không tìm thấy user '{_normalize_username(username)}'.")
    return uid, None


def _get_user(uid):
    resp = kt_user_table.get_item(Key={"uid": uid}, ProjectionExpression=USER_PROJECTION, ConsistentRead=True)
    item = resp.get("Item")
    return _clean(item) if item else None


def _map_brief(m):
    m = _clean(m or {})
    return {
        "mapId": m.get("map_id"),
        "title": m.get("title") or "",
        "creator": m.get("creator_username") or "",
        "priceCoins": m.get("price_coins", 0) or 0,
        "priceGems": m.get("price_gems", 0) or 0,
        "visibility": m.get("visibility") or "",
    }


def _maps_by_ids(ids):
    ids = [i for i in dict.fromkeys(ids or []) if isinstance(i, str) and i]
    out = {}
    for start in range(0, len(ids), 100):
        chunk = ids[start:start + 100]
        resp = kt_maps_table.meta.client.batch_get_item(
            RequestItems={
                kt_maps_table.name: {
                    "Keys": [{"map_id": i} for i in chunk],
                    "ProjectionExpression": "map_id, title, creator_username, price_coins, price_gems, visibility",
                }
            }
        )
        # The resource's client already (de)serializes DynamoDB types.
        for m in resp.get("Responses", {}).get(kt_maps_table.name, []):
            out[m["map_id"]] = _map_brief(m)
    return out


def _summary(uid):
    item = _get_user(uid)
    if not item:
        return None
    wallet = item.get("wallet") or {}
    locked = item.get("wallet_locked") or {}
    levels = item.get("levels") or []
    if not isinstance(levels, list):
        levels = []
    levels = sorted(
        [{"level": _int(l.get("level"), 0), "stars": _int(l.get("stars"), 0)} for l in levels if isinstance(l, dict)],
        key=lambda l: l["level"],
    )
    owned_ids = sorted([i for i in (item.get("owned_maps") or []) if isinstance(i, str)])
    briefs = _maps_by_ids(owned_ids)
    owned = [briefs.get(i) or {"mapId": i, "title": "", "creator": "", "missing": True} for i in owned_ids]
    return {
        "uid": item.get("uid"),
        "username": item.get("username") or "",
        "wallet": {"coin": _int(wallet.get("coin"), 0), "gem": _int(wallet.get("gem"), 0)},
        "walletLocked": {"coin": _int(locked.get("coin"), 0), "gem": _int(locked.get("gem"), 0)},
        "levels": levels,
        "maxLevel": max([l["level"] for l in levels], default=0),
        "ownedMaps": owned,
        "isPassTutorial": bool(item.get("is_pass_tutorial", False)),
        "hasPassword": bool(item.get("has_password", False)),
        "accountStatus": item.get("accountStatus") or "",
        "createdAt": item.get("createdAt") or item.get("created_at") or "",
        "referralCode": item.get("referralCode") or "",
        "skin": item.get("skin"),
        "gender": item.get("gender"),
    }


def _with_summary(uid, extra=None):
    s = _summary(uid)
    if not s:
        return _err(404, "User không tồn tại.")
    body = {"user": s}
    if extra:
        body.update(extra)
    return _ok(body)


def _wrap(fn):
    def run(params):
        try:
            return fn(params or {})
        except ClientError as e:
            code = e.response["Error"]["Code"]
            if code == "ConditionalCheckFailedException":
                return _err(409, "Dữ liệu vừa thay đổi, thử lại.")
            print(f"[kt_admin] {fn.__name__} ClientError: {e}")
            return _err(500, e.response["Error"]["Message"])
        except Exception as e:
            print(f"[kt_admin] {fn.__name__} error: {e}")
            return _err(500, str(e))
    run.__name__ = fn.__name__
    return run


# ---------------------------------------------------------------- functions

@_wrap
def ktaLookup(params):
    uid, err = _resolve_uid(params)
    if err:
        return err
    return _with_summary(uid)


@_wrap
def ktaSetWallet(params):
    """mode=add: coin/gem are deltas (may be negative, floor 0). mode=set: exact values."""
    uid, err = _resolve_uid(params)
    if err:
        return err
    mode = str(params.get("mode") or "add").lower()
    coin = _int(params.get("coin"))
    gem = _int(params.get("gem"))
    if coin is None and gem is None:
        return _err(400, "Cần coin hoặc gem.")
    if mode not in ("add", "set"):
        return _err(400, "mode phải là add hoặc set.")

    item = _get_user(uid)
    if not item:
        return _err(404, "User không tồn tại.")
    wallet = item.get("wallet") or {}
    cur_coin = _int(wallet.get("coin"), 0)
    cur_gem = _int(wallet.get("gem"), 0)
    new_coin = cur_coin if coin is None else (cur_coin + coin if mode == "add" else coin)
    new_gem = cur_gem if gem is None else (cur_gem + gem if mode == "add" else gem)
    new_coin = max(0, new_coin)
    new_gem = max(0, new_gem)

    kt_user_table.update_item(
        Key={"uid": uid},
        UpdateExpression="SET wallet = :w",
        ExpressionAttributeValues={":w": {"coin": new_coin, "gem": new_gem}},
        ConditionExpression="attribute_exists(uid)",
    )
    return _with_summary(uid, {
        "change": {"coin": new_coin - cur_coin, "gem": new_gem - cur_gem},
        "message": f"Ví: coin {cur_coin} → {new_coin}, gem {cur_gem} → {new_gem}",
    })


def _write_levels(uid, levels):
    kt_user_table.update_item(
        Key={"uid": uid},
        UpdateExpression="SET #levels = :l",
        ExpressionAttributeNames={"#levels": "levels"},
        ExpressionAttributeValues={":l": [{"level": l["level"], "stars": l["stars"]} for l in levels]},
        ConditionExpression="attribute_exists(uid)",
    )


@_wrap
def ktaUnlockLevels(params):
    """Unlock levels 1..upTo (or an explicit list) with `stars` (default 3).
    Existing entries keep max(stars). No coin reward is granted (unlike gameplay)."""
    uid, err = _resolve_uid(params)
    if err:
        return err
    stars = _int(params.get("stars"), 3)
    if stars is None or stars < 0 or stars > 3:
        return _err(400, "stars phải từ 0 đến 3.")
    targets = set()
    up_to = _int(params.get("upTo"))
    if up_to is not None:
        if up_to < 1 or up_to > MAX_LEVEL:
            return _err(400, f"upTo phải từ 1 đến {MAX_LEVEL}.")
        targets.update(range(1, up_to + 1))
    for v in params.get("levels") or []:
        n = _int(v)
        if n is not None and 1 <= n <= MAX_LEVEL:
            targets.add(n)
    if not targets:
        return _err(400, "Cần upTo hoặc levels.")

    item = _get_user(uid)
    if not item:
        return _err(404, "User không tồn tại.")
    current = {}
    for l in item.get("levels") or []:
        if isinstance(l, dict):
            n = _int(l.get("level"))
            if n is not None:
                current[n] = max(current.get(n, 0), _int(l.get("stars"), 0))
    added = 0
    for n in targets:
        if n not in current:
            added += 1
            current[n] = stars
        else:
            current[n] = max(current[n], stars)
    merged = [{"level": n, "stars": s} for n, s in sorted(current.items())]
    _write_levels(uid, merged)
    return _with_summary(uid, {"added": added, "message": f"Đã mở {len(targets)} level ({added} mới), {stars} sao."})


@_wrap
def ktaResetLevels(params):
    """Remove one level (level=N) or every level (no level)."""
    uid, err = _resolve_uid(params)
    if err:
        return err
    level = _int(params.get("level"))
    item = _get_user(uid)
    if not item:
        return _err(404, "User không tồn tại.")
    if level is None:
        kt_user_table.update_item(
            Key={"uid": uid},
            UpdateExpression="REMOVE #levels",
            ExpressionAttributeNames={"#levels": "levels"},
            ConditionExpression="attribute_exists(uid)",
        )
        return _with_summary(uid, {"message": "Đã xoá toàn bộ level."})
    kept = [l for l in (item.get("levels") or []) if isinstance(l, dict) and _int(l.get("level")) != level]
    if len(kept) == len(item.get("levels") or []):
        return _err(404, f"User chưa có level {level}.")
    _write_levels(uid, [{"level": _int(l.get("level"), 0), "stars": _int(l.get("stars"), 0)} for l in kept])
    return _with_summary(uid, {"message": f"Đã xoá level {level}."})


def _map_id_param(params):
    map_id = str(params.get("mapId") or "").strip()
    if not map_id:
        return None, _err(400, "Cần mapId.")
    return map_id, None


@_wrap
def ktaGrantMap(params):
    uid, err = _resolve_uid(params)
    if err:
        return err
    map_id, err = _map_id_param(params)
    if err:
        return err
    m = kt_maps_table.get_item(Key={"map_id": map_id}, ProjectionExpression="map_id, title").get("Item")
    if not m and not params.get("force"):
        return _err(404, f"Map '{map_id}' không tồn tại trong kt_maps.")
    kt_user_table.update_item(
        Key={"uid": uid},
        UpdateExpression="ADD owned_maps :m",
        ExpressionAttributeValues={":m": {map_id}},
        ConditionExpression="attribute_exists(uid)",
    )
    title = (m or {}).get("title") or map_id
    return _with_summary(uid, {"message": f"Đã mở map '{title}'."})


@_wrap
def ktaRevokeMap(params):
    uid, err = _resolve_uid(params)
    if err:
        return err
    map_id, err = _map_id_param(params)
    if err:
        return err
    kt_user_table.update_item(
        Key={"uid": uid},
        UpdateExpression="DELETE owned_maps :m",
        ExpressionAttributeValues={":m": {map_id}},
        ConditionExpression="attribute_exists(uid)",
    )
    return _with_summary(uid, {"message": f"Đã thu hồi map '{map_id}'."})


@_wrap
def ktaResetTutorial(params):
    uid, err = _resolve_uid(params)
    if err:
        return err
    kt_user_table.update_item(
        Key={"uid": uid},
        UpdateExpression="SET is_pass_tutorial = :f",
        ExpressionAttributeValues={":f": False},
        ConditionExpression="attribute_exists(uid)",
    )
    return _with_summary(uid, {"message": "Đã reset tutorial."})


@_wrap
def ktaSearchMaps(params):
    """Exact map_id hit first; otherwise a bounded scan matching title / creator / map_id substring."""
    q = str(params.get("q") or "").strip()
    limit = min(max(_int(params.get("limit"), 20) or 20, 1), 50)
    if len(q) < 2:
        return _err(400, "Nhập ít nhất 2 ký tự.")
    results = []
    exact = kt_maps_table.get_item(Key={"map_id": q}).get("Item")
    if exact:
        results.append(_map_brief(exact))
    scanned = 0
    kwargs = {
        "FilterExpression": Attr("title").contains(q) | Attr("creator_username").contains(q) | Attr("map_id").contains(q),
        "ProjectionExpression": "map_id, title, creator_username, price_coins, price_gems, visibility",
    }
    while len(results) < limit and scanned < MAX_SEARCH_SCAN:
        resp = kt_maps_table.scan(**kwargs)
        scanned += resp.get("ScannedCount", 0)
        for m in resp.get("Items", []):
            b = _map_brief(m)
            if all(r["mapId"] != b["mapId"] for r in results):
                results.append(b)
                if len(results) >= limit:
                    break
        last = resp.get("LastEvaluatedKey")
        if not last:
            break
        kwargs["ExclusiveStartKey"] = last
    return _ok({"maps": results, "scanned": scanned, "truncated": scanned >= MAX_SEARCH_SCAN})


HANDLERS = {
    "ktaLookup": ktaLookup,
    "ktaSetWallet": ktaSetWallet,
    "ktaUnlockLevels": ktaUnlockLevels,
    "ktaResetLevels": ktaResetLevels,
    "ktaGrantMap": ktaGrantMap,
    "ktaRevokeMap": ktaRevokeMap,
    "ktaResetTutorial": ktaResetTutorial,
    "ktaSearchMaps": ktaSearchMaps,
}
