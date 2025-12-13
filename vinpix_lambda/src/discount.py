import time
from datetime import datetime, timezone, timedelta
from decimal import Decimal
from typing import Dict, Any, Optional, List, Iterable

import boto3
from botocore.exceptions import ClientError
from boto3.dynamodb.conditions import Key, Attr

from src.utils import dynamodb, discount_table, convert_sets_to_lists

TABLE_NAME = discount_table.table_name  # 'sb-discount'


def _ensure_table_exists():
    """Ensure the DynamoDB discount table exists; create it if it does not."""
    try:
        discount_table.load()
    except dynamodb.meta.client.exceptions.ResourceNotFoundException:
        client = dynamodb.meta.client
        client.create_table(
            TableName=TABLE_NAME,
            AttributeDefinitions=[
                {"AttributeName": "code", "AttributeType": "S"},
            ],
            KeySchema=[
                {"AttributeName": "code", "KeyType": "HASH"},
            ],
            BillingMode="PAY_PER_REQUEST",
        )
        waiter = client.get_waiter("table_exists")
        waiter.wait(TableName=TABLE_NAME)


def _decimal_to_native(value: Any) -> Any:
    """Convert Decimal to int/float for JSON serialization."""
    if isinstance(value, Decimal):
        return int(value) if value % 1 == 0 else float(value)
    if isinstance(value, list):
        return [_decimal_to_native(v) for v in value]
    if isinstance(value, dict):
        return {k: _decimal_to_native(v) for k, v in value.items()}
    return value


def _normalize_emails(raw: Optional[Any]) -> List[str]:
    """Normalize email input into a list of lowercase strings."""
    if raw is None:
        return []

    emails: Iterable[Any]
    if isinstance(raw, str):
        emails = raw.split(",")
    elif isinstance(raw, Iterable):
        emails = raw
    else:
        return []

    normalized: List[str] = []
    for item in emails:
        if item is None:
            continue
        email = str(item).strip().lower()
        if email:
            normalized.append(email)
    seen = set()
    unique: List[str] = []
    for email in normalized:
        if email not in seen:
            unique.append(email)
            seen.add(email)
    return unique


def create_discount(data: Dict[str, Any]) -> Dict[str, Any]:
    """Create a new discount code."""
    if not data:
        return {"statusCode": 400, "body": "No discount data provided"}

    required_fields = ["code", "discountType", "discountValue", "usageLimit", "expiryDate"]
    for field in required_fields:
        if field not in data or data[field] in (None, "", []):
            return {"statusCode": 400, "body": f"Missing field: {field}"}

    exclusive_emails: List[str] = []
    if data.get("discountType") == "exclusive":
        exclusive_emails = _normalize_emails(
            data.get("exclusiveEmails") or data.get("exclusiveEmail")
        )
        if not exclusive_emails:
            return {
                "statusCode": 400,
                "body": "exclusiveEmail is required for exclusive discount",
            }

    _ensure_table_exists()

    code = data["code"].upper()
    now_iso = datetime.utcnow().isoformat() + "Z"

    item: Dict[str, Any] = {
        "code": code,
        "discountType": data["discountType"],
        "discountValue": Decimal(str(data["discountValue"])),
        "minOrderValue": Decimal(str(data.get("minOrderValue", 0))),
        "usageLimit": int(data["usageLimit"]),
        "usedCount": 0,
        "expiryDate": data["expiryDate"],
        "isActive": True,
        "createdAt": now_iso,
    }

    if data.get("maxDiscount") not in (None, "", 0):
        item["maxDiscount"] = Decimal(str(data["maxDiscount"]))
    if exclusive_emails:
        item["exclusiveEmails"] = exclusive_emails
        # Keep legacy single email field for backward compatibility
        item["exclusiveEmail"] = exclusive_emails[0]
    # Optional: restrict applicability to specific collections
    allowed_ids = data.get("allowedCollectionIds")
    if isinstance(allowed_ids, list):
        # filter only non-empty strings
        cleaned = [str(x).strip() for x in allowed_ids if str(x).strip()]
        if cleaned:
            item["allowedCollectionIds"] = cleaned

    try:
        discount_table.put_item(
            Item=item,
            ConditionExpression="attribute_not_exists(#code)",
            ExpressionAttributeNames={"#code": "code"},
        )
        return {
            "statusCode": 200,
            "body": {
                "message": "Discount created",
                "discount": _decimal_to_native(item),
            },
        }
    except ClientError as e:
        if e.response["Error"]["Code"] == "ConditionalCheckFailedException":
            return {"statusCode": 400, "body": "Discount code already exists"}
        raise


def get_discounts(limit: Optional[int] = None) -> Dict[str, Any]:
    """Retrieve a list of discounts."""
    _ensure_table_exists()
    scan_kwargs: Dict[str, Any] = {}
    if limit:
        scan_kwargs["Limit"] = limit

    response = discount_table.scan(**scan_kwargs)
    items: List[Dict[str, Any]] = response.get("Items", [])
    items_native = [_decimal_to_native(i) for i in items]

    return {"statusCode": 200, "body": {"discounts": items_native, "count": len(items_native)}}


def get_discount_by_code(code: str) -> Dict[str, Any]:
    """Get a specific discount by its code."""
    if not code:
        return {"statusCode": 400, "body": "code is required"}

    _ensure_table_exists()
    res = discount_table.get_item(Key={"code": code.upper()})
    if "Item" not in res:
        return {"statusCode": 404, "body": "Discount not found"}

    item = res["Item"]
    item_native = _decimal_to_native(item)

    return {"statusCode": 200, "body": {"discount": item_native}}


def toggle_discount_status(code: str) -> Dict[str, Any]:
    """Toggle the active status of a discount code."""
    if not code:
        return {"statusCode": 400, "body": "code is required"}

    _ensure_table_exists()
    try:
        res = discount_table.update_item(
            Key={"code": code.upper()},
            UpdateExpression="SET #isActive = NOT #isActive",
            ExpressionAttributeNames={"#isActive": "isActive"},
            ReturnValues="ALL_NEW",
        )
        item = res.get("Attributes", {})
        return {"statusCode": 200, "body": {"discount": _decimal_to_native(item)}}
    except ClientError as e:
        if e.response["Error"]["Code"] == "ConditionalCheckFailedException":
            return {"statusCode": 404, "body": "Discount not found"}
        raise


def delete_discount(code: str) -> Dict[str, Any]:
    """Delete a discount code."""
    if not code:
        return {"statusCode": 400, "body": "code is required"}

    _ensure_table_exists()
    discount_table.delete_item(Key={"code": code.upper()})
    return {"statusCode": 200, "body": {"message": "Deleted"}}


def update_discount(code: str, update_data: Dict[str, Any]) -> Dict[str, Any]:
    """Update fields of an existing discount code.

    Allowed updatable fields: discountType, discountValue, maxDiscount, minOrderValue,
    usageLimit, expiryDate, isActive, exclusiveEmail/exclusiveEmails, allowedCollectionIds.
    """
    if not code:
        return {"statusCode": 400, "body": "code is required"}
    if not update_data or not isinstance(update_data, dict):
        return {"statusCode": 400, "body": "updateData is required"}

    _ensure_table_exists()

    existing_res = discount_table.get_item(Key={"code": code.upper()})
    if "Item" not in existing_res:
        return {"statusCode": 404, "body": "Discount not found"}

    existing_item = _decimal_to_native(existing_res["Item"])
    existing_emails = _normalize_emails(
        existing_item.get("exclusiveEmails") or existing_item.get("exclusiveEmail")
    )

    payload_has_emails = "exclusiveEmails" in update_data or "exclusiveEmail" in update_data
    payload_emails = _normalize_emails(
        update_data.get("exclusiveEmails") or update_data.get("exclusiveEmail")
    )

    # Validate exclusive discount requirements
    if "discountType" in update_data:
        dt = update_data.get("discountType")
        if dt not in ("percentage", "fixed", "exclusive"):
            return {"statusCode": 400, "body": "Invalid discountType"}
        if dt == "exclusive":
            effective_emails = payload_emails if payload_has_emails else existing_emails
            if not effective_emails:
                return {
                    "statusCode": 400,
                    "body": "exclusiveEmail is required for exclusive discount",
                }
        else:
            # Mark for clearing emails when switching away from exclusive without explicit payload
            if not payload_has_emails and existing_emails:
                payload_has_emails = True
                payload_emails = []

    if payload_has_emails:
        if payload_emails:
            # Keep normalized representation for subsequent handling
            update_data["exclusiveEmails"] = payload_emails
            update_data["exclusiveEmail"] = payload_emails[0]
        else:
            update_data["exclusiveEmails"] = []
            update_data["exclusiveEmail"] = None

    set_expr_parts: List[str] = []
    remove_expr_parts: List[str] = []
    expr_attr_names: Dict[str, str] = {"#c": "code"}
    expr_attr_values: Dict[str, Any] = {}

    def set_field(field_name: str, value: Any):
        key = f":{field_name}"
        set_expr_parts.append(f"#{field_name} = {key}")
        expr_attr_names[f"#{field_name}"] = field_name
        expr_attr_values[key] = value

    # Map and coerce fields
    if "discountType" in update_data:
        set_field("discountType", update_data["discountType"]) 

    if "discountValue" in update_data:
        try:
            set_field("discountValue", Decimal(str(update_data["discountValue"])))
        except Exception:
            return {"statusCode": 400, "body": "Invalid discountValue"}

    if "maxDiscount" in update_data:
        max_discount = update_data.get("maxDiscount")
        if max_discount in (None, "", 0):
            expr_attr_names["#maxDiscount"] = "maxDiscount"
            remove_expr_parts.append("#maxDiscount")
        else:
            try:
                set_field("maxDiscount", Decimal(str(max_discount)))
            except Exception:
                return {"statusCode": 400, "body": "Invalid maxDiscount"}

    if "minOrderValue" in update_data:
        try:
            set_field("minOrderValue", Decimal(str(update_data["minOrderValue"])))
        except Exception:
            return {"statusCode": 400, "body": "Invalid minOrderValue"}

    if "usageLimit" in update_data:
        try:
            set_field("usageLimit", int(update_data["usageLimit"]))
        except Exception:
            return {"statusCode": 400, "body": "Invalid usageLimit"}

    if "expiryDate" in update_data:
        set_field("expiryDate", update_data["expiryDate"]) 

    if "isActive" in update_data:
        set_field("isActive", bool(update_data["isActive"]))

    if payload_has_emails:
        if payload_emails:
            set_field("exclusiveEmails", payload_emails)
            set_field("exclusiveEmail", payload_emails[0])
        else:
            expr_attr_names["#exclusiveEmails"] = "exclusiveEmails"
            remove_expr_parts.append("#exclusiveEmails")
            expr_attr_names["#exclusiveEmail"] = "exclusiveEmail"
            remove_expr_parts.append("#exclusiveEmail")

    # Handle allowedCollectionIds updates
    if "allowedCollectionIds" in update_data:
        ids = update_data.get("allowedCollectionIds")
        if ids in (None, "") or (isinstance(ids, list) and len(ids) == 0):
            expr_attr_names["#allowedCollectionIds"] = "allowedCollectionIds"
            remove_expr_parts.append("#allowedCollectionIds")
        elif isinstance(ids, list):
            cleaned = [str(x).strip() for x in ids if str(x).strip()]
            set_field("allowedCollectionIds", cleaned)

    if not set_expr_parts and not remove_expr_parts:
        return {"statusCode": 400, "body": "No valid fields to update"}

    update_expression_segments: List[str] = []
    if set_expr_parts:
        update_expression_segments.append("SET " + ", ".join(set_expr_parts))
    if remove_expr_parts:
        update_expression_segments.append("REMOVE " + ", ".join(remove_expr_parts))

    update_expression = " ".join(update_expression_segments)

    try:
        res = discount_table.update_item(
            Key={"code": code.upper()},
            UpdateExpression=update_expression,
            ExpressionAttributeNames=expr_attr_names,
            ExpressionAttributeValues=expr_attr_values or None,
            ConditionExpression="attribute_exists(#c)",
            ReturnValues="ALL_NEW",
        )
        item = res.get("Attributes", {})
        return {"statusCode": 200, "body": {"message": "Updated", "discount": _decimal_to_native(item)}}
    except ClientError as e:
        if e.response["Error"]["Code"] == "ConditionalCheckFailedException":
            return {"statusCode": 404, "body": "Discount not found"}
        raise

def apply_discount(code: str, order_total: float, user_email: Optional[str] = None) -> Dict[str, Any]:
    """Validate and apply a discount to an order total, returning the discount amount and new total."""
    if not code:
        return {"statusCode": 400, "body": "code is required"}

    _ensure_table_exists()
    res = discount_table.get_item(Key={"code": code.upper()})
    if "Item" not in res:
        return {"statusCode": 404, "body": "Discount not found"}

    item = res["Item"]
    item_native = _decimal_to_native(item)

    # Validation checks
    if not item_native.get("isActive", False):
        return {"statusCode": 400, "body": "Discount is not active"}

    # Treat expiryDate as end-of-day in GMT+7 (Asia/Bangkok)
    try:
        tz_gmt7 = timezone(timedelta(hours=7))
        expiry_parsed = datetime.strptime(item_native["expiryDate"], "%Y-%m-%d")
        expiry_end_gmt7 = expiry_parsed.replace(
            hour=23, minute=59, second=59, microsecond=999999, tzinfo=tz_gmt7
        )
        now_gmt7 = datetime.now(timezone.utc).astimezone(tz_gmt7)
        if now_gmt7 > expiry_end_gmt7:
            return {"statusCode": 400, "body": "Discount expired"}
    except Exception:
        # Fallback to previous behavior (UTC midnight) if parsing fails
        if datetime.strptime(item_native["expiryDate"], "%Y-%m-%d").timestamp() < time.time():
            return {"statusCode": 400, "body": "Discount expired"}

    if item_native["usedCount"] >= item_native["usageLimit"]:
        return {"statusCode": 400, "body": "Usage limit reached"}

    if item_native["discountType"] == "exclusive":
        allowed_emails = _normalize_emails(
            item_native.get("exclusiveEmails") or item_native.get("exclusiveEmail")
        )
        if not user_email or user_email.lower() not in allowed_emails:
            return {"statusCode": 400, "body": "Discount cannot be applied for this user"}

    discount_value: float
    if item_native["discountType"] in ("percentage", "exclusive"):
        discount_value = order_total * (item_native["discountValue"] / 100)
        if "maxDiscount" in item_native and item_native["maxDiscount"] > 0:
            discount_value = min(discount_value, item_native["maxDiscount"])
    else:  # fixed amount
        discount_value = item_native["discountValue"]

    new_total = max(order_total - discount_value, 0)

    # Increment usage count
    discount_table.update_item(
        Key={"code": code.upper()},
        UpdateExpression="SET usedCount = usedCount + :inc",
        ExpressionAttributeValues={":inc": 1},
    )

    return {
        "statusCode": 200,
        "body": {
            "discountValue": discount_value,
            "newTotal": new_total,
            "discount": item_native,
        },
    }