import base64
import json
import os
from decimal import Decimal
from botocore.exceptions import ClientError

from .utils import convert_sets_to_lists, dynamodb


DEFAULT_FASHINE_USER_TABLE = os.environ.get("FASHINE_USER_TABLE", "fashine-user")
FALLBACK_FASHINE_USER_TABLE = os.environ.get(
    "FASHINE_USER_TABLE_FALLBACK", "sb_user"
)


def _encode_last_key(last_key):
    if not last_key:
        return None
    try:
        return base64.b64encode(
            json.dumps(last_key, default=str).encode("utf-8")
        ).decode("utf-8")
    except Exception:
        return None


def _decode_last_key(encoded_key):
    if not encoded_key:
        return None
    try:
        decoded = base64.b64decode(encoded_key.encode("utf-8")).decode("utf-8")
        return json.loads(decoded)
    except Exception:
        return None


def _normalize_number(value):
    if isinstance(value, Decimal):
        if value % 1 == 0:
            return int(value)
        return float(value)
    return value


def _normalize_user(item, include_raw=False):
    item = convert_sets_to_lists(item)
    auth_data = item.get("authData") or {}
    login_streak = item.get("login_streak") or {}

    normalized = {
        "uid": item.get("uid"),
        "email": auth_data.get("email") or item.get("email") or "",
        "displayName": item.get("displayName") or auth_data.get("displayName") or "",
        "avatarUrl": item.get("avatarUrl") or "",
        "createAt": item.get("createAt") or item.get("createdAt") or "",
        "fuid": item.get("fuid") or "None",
        "isInitExample": bool(item.get("isInitExample", False)),
        "languageCode": item.get("languageCode") or "",
        "countryCode": item.get("countryCode") or "",
        "additionalInfo": item.get("additionalInfo"),
        "pinStyle": item.get("pinStyle"),
        "age": _normalize_number(item.get("age")),
        "gender": item.get("gender"),
        "refCode": item.get("refCode"),
        "addRefRes": item.get("addRefRes"),
        "stat": item.get("stat"),
        "login_streak": {
            "last_login": login_streak.get("last_login"),
            "current_streak": _normalize_number(login_streak.get("current_streak")),
            "max_streak": _normalize_number(login_streak.get("max_streak")),
        }
        if login_streak
        else None,
        "total_login_days": _normalize_number(item.get("total_login_days")),
        "receipt": item.get("receipt"),
        "authData": auth_data,
    }

    if include_raw:
        normalized["raw"] = item

    return normalized


def _scan_users_from_table(table_name, limit, exclusive_start_key, include_raw):
    table = dynamodb.Table(table_name)
    scan_kwargs = {"Limit": limit}
    if exclusive_start_key:
        scan_kwargs["ExclusiveStartKey"] = exclusive_start_key

    response = table.scan(**scan_kwargs)
    items = response.get("Items", [])
    last_evaluated_key = response.get("LastEvaluatedKey")

    users = [_normalize_user(item, include_raw=include_raw) for item in items]
    return users, last_evaluated_key


def get_fashine_users(params=None):
    """
    Retrieve users from Fashine user table with pagination support.

    Params:
        limit (int): defaults 100, max 200
        lastKey (str): base64 encoded ExclusiveStartKey
        includeRaw (bool): include full raw DynamoDB item per user
        tableName (str): override table name, default 'fashine-user'
    """
    params = params or {}

    try:
        raw_limit = params.get("limit", 100)
        try:
            limit = int(raw_limit)
        except Exception:
            limit = 100
        limit = max(1, min(limit, 200))

        include_raw = bool(params.get("includeRaw", False))
        last_key = _decode_last_key(params.get("lastKey"))
        requested_table = params.get("tableName") or DEFAULT_FASHINE_USER_TABLE

        try:
            users, last_evaluated_key = _scan_users_from_table(
                requested_table,
                limit,
                last_key,
                include_raw,
            )
            source_table = requested_table
        except ClientError as e:
            error_code = e.response.get("Error", {}).get("Code")
            if error_code == "ResourceNotFoundException" and (
                requested_table == DEFAULT_FASHINE_USER_TABLE
            ):
                users, last_evaluated_key = _scan_users_from_table(
                    FALLBACK_FASHINE_USER_TABLE,
                    limit,
                    last_key,
                    include_raw,
                )
                source_table = FALLBACK_FASHINE_USER_TABLE
            else:
                raise

        return {
            "statusCode": 200,
            "body": {
                "users": users,
                "count": len(users),
                "lastKey": _encode_last_key(last_evaluated_key),
                "hasMore": bool(last_evaluated_key),
                "sourceTable": source_table,
            },
        }
    except ClientError as e:
        return {
            "statusCode": 500,
            "body": {
                "message": "Failed to retrieve Fashine users.",
                "error": e.response["Error"]["Message"],
            },
        }
    except Exception as e:
        return {
            "statusCode": 500,
            "body": {
                "message": "Unexpected error retrieving Fashine users.",
                "error": str(e),
            },
        }
