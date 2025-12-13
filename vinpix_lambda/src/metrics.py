import time
from datetime import datetime, timezone, timedelta
from decimal import Decimal
from typing import Any, Dict, List

import boto3
from boto3.dynamodb.conditions import Key, Attr
import json
import src.aiService as ai

# Reuse shared table handle from utils
from src.utils import metrics_table, orders_table
from boto3.dynamodb.conditions import Key


def _to_iso_date_from_epoch(epoch_seconds: int) -> str:
    return datetime.fromtimestamp(int(epoch_seconds), tz=timezone.utc).strftime("%Y-%m-%d")


def _to_first_day_of_month(dt: datetime) -> datetime:
    return dt.replace(day=1, hour=0, minute=0, second=0, microsecond=0)


from typing import Tuple


def _month_bounds_utc(target: datetime) -> Tuple[str, str]:
    start = _to_first_day_of_month(target)
    # First day next month
    if start.month == 12:
        next_month = start.replace(year=start.year + 1, month=1)
    else:
        next_month = start.replace(month=start.month + 1)
    # End is exclusive; we'll query BETWEEN start and last day inclusive by subtracting 1 day from next_month
    end_inclusive = (next_month - timedelta(days=1)).strftime("%Y-%m-%d")
    return start.strftime("%Y-%m-%d"), end_inclusive


def increment_daily_metrics_for_order(order: Dict[str, Any]) -> None:
    """
    Idempotently increment daily metrics for a paid order (revenue > 0).
    Expects order fields: createdAt (epoch), userId, finalPrice|totalPrice.
    """
    try:
        amount = int(round(float(order.get("finalPrice", order.get("totalPrice", 0)) or 0)))

        organization_id = "default"
        date_str = _to_iso_date_from_epoch(order.get("createdAt", int(time.time())))
        user_id = order.get("userId")
        if not user_id:
            return

        # Read the item to check paying user de-dup for the day
        existing = metrics_table.get_item(
            Key={"organizationId": organization_id, "date": date_str}
        ).get("Item")

        if existing and isinstance(existing.get("payingUserIds"), set):
            paying_user_ids = existing.get("payingUserIds")
        elif existing and isinstance(existing.get("payingUserIds"), list):
            paying_user_ids = set(existing.get("payingUserIds"))
        else:
            paying_user_ids = set()

        is_new_user_today = user_id not in paying_user_ids

        # Prepare update expressions
        # Always add orderCount; add revenue (0 allowed)
        update_expr = "SET updatedAt = :now ADD revenue :revenue, orderCount :one"
        expr_vals = {
            ":now": int(time.time()),
            ":revenue": Decimal(str(amount)),
            ":one": Decimal("1"),
        }

        if not existing:
            # Put new with base attributes
            item = {
                "organizationId": organization_id,
                "date": date_str,
                "currency": "VND",
                "revenue": Decimal(str(amount)),
                "orderCount": Decimal("1"),
                "updatedAt": int(time.time()),
            }
            if is_new_user_today:
                item["payingUsers"] = Decimal("1")
                item["payingUserIds"] = set([user_id])
            metrics_table.put_item(Item=item)
            return

        # Existing item: update counters, and optionally payingUsers and user set
        if is_new_user_today:
            update_expr += ", payingUsers = if_not_exists(payingUsers, :zero) + :one"
            expr_vals[":zero"] = Decimal("0")
            # Use ADD to update a String Set
            update_expr += " ADD payingUserIds :uidset"
            expr_vals[":uidset"] = set([user_id])

        metrics_table.update_item(
            Key={"organizationId": organization_id, "date": date_str},
            UpdateExpression=update_expr,
            ExpressionAttributeValues=expr_vals,
        )
    except Exception as _:
        # Fail-safe: don't raise metrics errors back to order flow
        pass


def get_metrics_series(start_date: str, end_date: str, organization_id: str = "default") -> Dict[str, Any]:
    """
    Return daily series between start_date and end_date inclusive.
    """
    try:
        resp = metrics_table.query(
            KeyConditionExpression=Key("organizationId").eq(organization_id)
            & Key("date").between(start_date, end_date),
        )

        points: List[Dict[str, Any]] = []
        for item in resp.get("Items", []):
            points.append(
                {
                    "date": item.get("date"),
                    "revenue": float(item.get("revenue", 0)),
                    "orderCount": int(item.get("orderCount", 0)),
                    "payingUsers": int(
                        item.get("payingUsers", len(item.get("payingUserIds", [])))
                    ),
                }
            )

        # Sort ascending by date string
        points.sort(key=lambda p: p["date"]) 
        return {"statusCode": 200, "body": {"series": points}}
    except Exception as e:
        return {"statusCode": 500, "body": {"error": f"Failed to query metrics: {str(e)}"}}


def get_revenue_month_compare(organization_id: str = "default") -> Dict[str, Any]:
    """
    Sum revenue for current month and previous month (UTC) and return comparison.
    """
    try:
        now = datetime.now(tz=timezone.utc)
        cur_start, cur_end = _month_bounds_utc(now)

        # Previous month
        first_of_cur = _to_first_day_of_month(now)
        prev_month_last_day = first_of_cur - timedelta(days=1)
        prev_start, prev_end = _month_bounds_utc(prev_month_last_day)

        def sum_range(s: str, e: str) -> float:
            r = metrics_table.query(
                KeyConditionExpression=Key("organizationId").eq(organization_id)
                & Key("date").between(s, e),
            )
            total = 0.0
            for it in r.get("Items", []):
                total += float(it.get("revenue", 0))
            return total

        cur_total = sum_range(cur_start, cur_end)
        prev_total = sum_range(prev_start, prev_end)

        delta = cur_total - prev_total
        delta_pct = (delta / prev_total * 100.0) if prev_total > 0 else (100.0 if cur_total > 0 else 0.0)

        return {
            "statusCode": 200,
            "body": {
                "currentMonthRevenue": cur_total,
                "previousMonthRevenue": prev_total,
                "delta": delta,
                "deltaPct": delta_pct,
                "currentMonth": cur_start[:7],
                "previousMonth": prev_start[:7],
            },
        }
    except Exception as e:
        return {"statusCode": 500, "body": {"error": f"Failed to compute month compare: {str(e)}"}}


def get_paying_users_month_unique(organization_id: str = "default") -> Dict[str, Any]:
    """
    Return unique paying users count for the current month (UTC).
    """
    try:
        now = datetime.now(tz=timezone.utc)
        start, end = _month_bounds_utc(now)

        resp = metrics_table.query(
            KeyConditionExpression=Key("organizationId").eq(organization_id)
            & Key("date").between(start, end),
        )

        unique_users: set = set()
        for item in resp.get("Items", []):
            p = item.get("payingUserIds")
            if isinstance(p, set):
                unique_users.update(p)
            elif isinstance(p, list):
                unique_users.update(p)

        return {
            "statusCode": 200,
            "body": {
                "month": start[:7],
                "payingUsersMonth": len(unique_users),
            },
        }
    except Exception as e:
        return {"statusCode": 500, "body": {"error": f"Failed to compute paying users month: {str(e)}"}}


# ===============================
# Order-only metrics (no aux table)
# ===============================

def _pick_index(table) -> str:
    # Prefer 'status-createdAt-index'; fallback to 'status-createAt-index'
    for idx in ("status-createdAt-index", "status-createAt-index"):
        try:
            # A lightweight probe: not guaranteed by API, but we will attempt to query with impossible range
            table.query(
                IndexName=idx,
                KeyConditionExpression=Key("status").eq("__probe__") & Key("createdAt").between("0", "0"),
                Limit=1,
            )
            return idx
        except Exception:
            continue
    # If probe fails, still try primary name and let caller handle
    return "status-createdAt-index"


def _query_completed_orders_in_range(orders, index_name: str, start_epoch: int, end_epoch: int, start_str: str, end_str: str) -> List[Dict[str, Any]]:
    items: List[Dict[str, Any]] = []
    last_evaluated_key = None
    while True:
        try:
            qargs = {
                "IndexName": index_name,
                "KeyConditionExpression": Key("status").eq("completed") & Key("createdAt").between(start_str, end_str),
            }
            if last_evaluated_key:
                qargs["ExclusiveStartKey"] = last_evaluated_key
            resp = orders.query(**qargs)
        except Exception:
            qargs = {
                "IndexName": index_name,
                "KeyConditionExpression": Key("status").eq("completed") & Key("createdAt").between(start_epoch, end_epoch),
            }
            if last_evaluated_key:
                qargs["ExclusiveStartKey"] = last_evaluated_key
            resp = orders.query(**qargs)
        items.extend(resp.get("Items", []))
        last_evaluated_key = resp.get("LastEvaluatedKey")
        if not last_evaluated_key:
            break

    if not items:
        # Partition-only Query (no Scan). We'll filter by createdAt in code
        last_evaluated_key = None
        while True:
            qargs = {
                "IndexName": index_name,
                "KeyConditionExpression": Key("status").eq("completed"),
            }
            if last_evaluated_key:
                qargs["ExclusiveStartKey"] = last_evaluated_key
            resp = orders.query(**qargs)
            items.extend(resp.get("Items", []))
            last_evaluated_key = resp.get("LastEvaluatedKey")
            if not last_evaluated_key:
                break
    return items


def _query_pending_paid_in_range(orders, index_name: str, start_epoch: int, end_epoch: int, start_str: str, end_str: str) -> List[Dict[str, Any]]:
    items: List[Dict[str, Any]] = []
    last_evaluated_key = None
    while True:
        # Prefer BETWEEN on createdAt with filter paymentStatus=paid
        try:
            qargs = {
                "IndexName": index_name,
                "KeyConditionExpression": Key("status").eq("pending") & Key("createdAt").between(start_str, end_str),
                "FilterExpression": Attr("paymentStatus").eq("paid"),
            }
            if last_evaluated_key:
                qargs["ExclusiveStartKey"] = last_evaluated_key
            resp = orders.query(**qargs)
        except Exception:
            qargs = {
                "IndexName": index_name,
                "KeyConditionExpression": Key("status").eq("pending"),
                "FilterExpression": Attr("paymentStatus").eq("paid"),
            }
            if last_evaluated_key:
                qargs["ExclusiveStartKey"] = last_evaluated_key
            resp = orders.query(**qargs)
        items.extend(resp.get("Items", []))
        last_evaluated_key = resp.get("LastEvaluatedKey")
        if not last_evaluated_key:
            break
    return items


def get_order_metrics_series(startDate: str, endDate: str, includePendingPaid: bool = True) -> Dict[str, Any]:
    try:
        ddb = boto3.resource("dynamodb")
        orders = ddb.Table(orders_table)
        index_name = _pick_index(orders)

        start_dt = datetime.strptime(startDate, "%Y-%m-%d").replace(tzinfo=timezone.utc)
        end_dt = datetime.strptime(endDate, "%Y-%m-%d").replace(tzinfo=timezone.utc)
        start_epoch = int(start_dt.timestamp())
        end_epoch = int((end_dt + timedelta(days=1)).timestamp()) - 1
        start_str = str(start_epoch)
        end_str = str(end_epoch)

        items = _query_completed_orders_in_range(orders, index_name, start_epoch, end_epoch, start_str, end_str)
        if includePendingPaid:
            items += _query_pending_paid_in_range(orders, index_name, start_epoch, end_epoch, start_str, end_str)

        # Aggregate by day
        by_day: Dict[str, Dict[str, Any]] = {}
        for it in items:
            created_at_val = it.get("createdAt", 0)
            try:
                created_at = int(created_at_val) if not isinstance(created_at_val, dict) else int(created_at_val.get("N") or created_at_val.get("S"))
            except Exception:
                try:
                    created_at = int(str(created_at_val))
                except Exception:
                    continue
            day = _to_iso_date_from_epoch(created_at)
            final_price = float(it.get("finalPrice", it.get("totalPrice", 0)) or 0)
            user_id = it.get("userId")
            if day not in by_day:
                by_day[day] = {"revenue": 0.0, "orderCount": 0, "users": set()}
            by_day[day]["revenue"] += final_price
            by_day[day]["orderCount"] += 1
            if user_id:
                by_day[day]["users"].add(user_id)

        points: List[Dict[str, Any]] = []
        for day, agg in by_day.items():
            points.append(
                {
                    "date": day,
                    "revenue": float(int(round(agg["revenue"]))),
                    "orderCount": int(agg["orderCount"]),
                    "payingUsers": int(len(agg["users"]))
                }
            )
        points.sort(key=lambda p: p["date"]) 
        return {"statusCode": 200, "body": {"series": points}}
    except Exception as e:
        return {"statusCode": 500, "body": {"error": f"Failed to build series from orders: {str(e)}"}}


def get_order_revenue_month_compare() -> Dict[str, Any]:
    try:
        ddb = boto3.resource("dynamodb")
        orders = ddb.Table(orders_table)
        index_name = _pick_index(orders)

        now = datetime.now(tz=timezone.utc)
        cur_start, cur_end = _month_bounds_utc(now)
        first_of_cur = _to_first_day_of_month(now)
        prev_month_last_day = first_of_cur - timedelta(days=1)
        prev_start, prev_end = _month_bounds_utc(prev_month_last_day)

        def sum_range(s: str, e: str) -> float:
            sdt = datetime.strptime(s, "%Y-%m-%d").replace(tzinfo=timezone.utc)
            edt = datetime.strptime(e, "%Y-%m-%d").replace(tzinfo=timezone.utc)
            se = int(sdt.timestamp()); ee = int((edt + timedelta(days=1)).timestamp()) - 1
            ss = str(se); es = str(ee)
            items = _query_completed_orders_in_range(orders, index_name, se, ee, ss, es)
            total = 0.0
            for it in items:
                total += float(it.get("finalPrice", it.get("totalPrice", 0)) or 0)
            return total

        cur_total = sum_range(cur_start, cur_end)
        prev_total = sum_range(prev_start, prev_end)
        delta = cur_total - prev_total
        delta_pct = (delta / prev_total * 100.0) if prev_total > 0 else (100.0 if cur_total > 0 else 0.0)
        return {
            "statusCode": 200,
            "body": {
                "currentMonthRevenue": float(int(round(cur_total))),
                "previousMonthRevenue": float(int(round(prev_total))),
                "delta": float(int(round(delta))),
                "deltaPct": delta_pct,
                "currentMonth": cur_start[:7],
                "previousMonth": prev_start[:7],
            },
        }
    except Exception as e:
        return {"statusCode": 500, "body": {"error": f"Failed to compute month compare from orders: {str(e)}"}}


def get_order_paying_users_month_unique() -> Dict[str, Any]:
    try:
        ddb = boto3.resource("dynamodb")
        orders = ddb.Table(orders_table)
        index_name = _pick_index(orders)

        now = datetime.now(tz=timezone.utc)
        start, end = _month_bounds_utc(now)
        sdt = datetime.strptime(start, "%Y-%m-%d").replace(tzinfo=timezone.utc)
        edt = datetime.strptime(end, "%Y-%m-%d").replace(tzinfo=timezone.utc)
        se = int(sdt.timestamp()); ee = int((edt + timedelta(days=1)).timestamp()) - 1
        ss = str(se); es = str(ee)

        items = _query_completed_orders_in_range(orders, index_name, se, ee, ss, es)
        items += _query_pending_paid_in_range(orders, index_name, se, ee, ss, es)

        users: set = set()
        for it in items:
            uid = it.get("userId")
            if uid:
                users.add(uid)

        return {"statusCode": 200, "body": {"month": start[:7], "payingUsersMonth": len(users)}}
    except Exception as e:
        return {"statusCode": 500, "body": {"error": f"Failed to compute paying users month from orders: {str(e)}"}}


def get_order_paying_users_month_compare() -> Dict[str, Any]:
    try:
        ddb = boto3.resource("dynamodb")
        orders = ddb.Table(orders_table)
        index_name = _pick_index(orders)

        now = datetime.now(tz=timezone.utc)
        cur_start, cur_end = _month_bounds_utc(now)
        first_of_cur = _to_first_day_of_month(now)
        prev_month_last_day = first_of_cur - timedelta(days=1)
        prev_start, prev_end = _month_bounds_utc(prev_month_last_day)

        def count_unique(s: str, e: str) -> int:
            sdt = datetime.strptime(s, "%Y-%m-%d").replace(tzinfo=timezone.utc)
            edt = datetime.strptime(e, "%Y-%m-%d").replace(tzinfo=timezone.utc)
            se = int(sdt.timestamp()); ee = int((edt + timedelta(days=1)).timestamp()) - 1
            ss = str(se); es = str(ee)
            items = _query_completed_orders_in_range(orders, index_name, se, ee, ss, es)
            items += _query_pending_paid_in_range(orders, index_name, se, ee, ss, es)
            users = set()
            for it in items:
                uid = it.get("userId")
                if uid:
                    users.add(uid)
            return len(users)

        cur_users = count_unique(cur_start, cur_end)
        prev_users = count_unique(prev_start, prev_end)
        delta = cur_users - prev_users
        delta_pct = (delta / prev_users * 100.0) if prev_users > 0 else (100.0 if cur_users > 0 else 0.0)

        return {
            "statusCode": 200,
            "body": {
                "currentMonthUsers": cur_users,
                "previousMonthUsers": prev_users,
                "delta": delta,
                "deltaPct": delta_pct,
                "currentMonth": cur_start[:7],
                "previousMonth": prev_start[:7],
            },
        }
    except Exception as e:
        return {"statusCode": 500, "body": {"error": f"Failed to compute users month compare from orders: {str(e)}"}}


def rebuild_metrics_range(start_date: str, end_date: str, organization_id: str = "default") -> Dict[str, Any]:
    """
    Rebuild daily metrics for [start_date, end_date] inclusive from sb_orders, using only Query on GSI (no Scan).
    This clears and rewrites sb_metrics_daily items in range to avoid double counting.
    """
    try:
        # Convert to epoch bounds
        start_dt = datetime.strptime(start_date, "%Y-%m-%d").replace(tzinfo=timezone.utc)
        end_dt = datetime.strptime(end_date, "%Y-%m-%d").replace(tzinfo=timezone.utc)
        start_epoch = int(start_dt.timestamp())
        # inclusive end: set to end of day
        end_epoch = int((end_dt + timedelta(days=1)).timestamp()) - 1
        # Many deployments defined the GSI sort key createdAt as String.
        # Use string bounds for GSI queries to avoid type mismatch.
        start_str = str(start_epoch)
        end_str = str(end_epoch)

        ddb = boto3.resource("dynamodb")
        orders = ddb.Table(orders_table)

        # Query completed orders in range via GSI; try common index names
        index_candidates = ["status-createdAt-index"]
        items: List[Dict[str, Any]] = []
        last_evaluated_key = None
        chosen_index = None
        for idx in index_candidates:
            # Try string bounds (common when GSI uses createdAt as String)
            try:
                orders.query(
                    IndexName=idx,
                    KeyConditionExpression=Key("status").eq("completed") & Key("createdAt").between(start_str, end_str),
                    Limit=1,
                )
                chosen_index = idx
                break
            except Exception:
                # Fallback: try numeric bounds (if createdAt is a Number)
                try:
                    orders.query(
                        IndexName=idx,
                        KeyConditionExpression=Key("status").eq("completed") & Key("createdAt").between(start_epoch, end_epoch),
                        Limit=1,
                    )
                    chosen_index = idx
                    break
                except Exception:
                    continue
        if chosen_index is None:
            return {"statusCode": 400, "body": {"error": "Required GSI not found: status-createdAt-index"}}

        # Paginate query with BETWEEN on createdAt (String or Number)
        while True:
            # Use string bounds by default
            try:
                qargs = {
                    "IndexName": chosen_index,
                    "KeyConditionExpression": Key("status").eq("completed") & Key("createdAt").between(start_str, end_str),
                }
                if last_evaluated_key:
                    qargs["ExclusiveStartKey"] = last_evaluated_key
                resp = orders.query(**qargs)
            except Exception:
                # Fallback to numeric bounds if needed
                qargs = {
                    "IndexName": chosen_index,
                    "KeyConditionExpression": Key("status").eq("completed") & Key("createdAt").between(start_epoch, end_epoch),
                }
                if last_evaluated_key:
                    qargs["ExclusiveStartKey"] = last_evaluated_key
                resp = orders.query(**qargs)
            items.extend(resp.get("Items", []))
            last_evaluated_key = resp.get("LastEvaluatedKey")
            if not last_evaluated_key:
                break

        # Fallback: if BETWEEN returned 0 items (likely due to type mismatch),
        # query by partition only and filter by createdAt handling both S and N.
        if not items:
            last_evaluated_key = None
            while True:
                qargs = {
                    "IndexName": chosen_index,
                    "KeyConditionExpression": Key("status").eq("completed"),
                    "FilterExpression": (
                        (Attr("createdAt").attribute_type("N") & Attr("createdAt").between(start_epoch, end_epoch))
                        | (Attr("createdAt").attribute_type("S") & Attr("createdAt").between(start_str, end_str))
                    ),
                }
                if last_evaluated_key:
                    qargs["ExclusiveStartKey"] = last_evaluated_key
                resp = orders.query(**qargs)
                items.extend(resp.get("Items", []))
                last_evaluated_key = resp.get("LastEvaluatedKey")
                if not last_evaluated_key:
                    break

        # Aggregate by day
        by_day: Dict[str, Dict[str, Any]] = {}
        for it in items:
            created_at = int(it.get("createdAt", 0))
            day = _to_iso_date_from_epoch(created_at)
            final_price = float(it.get("finalPrice", it.get("totalPrice", 0)) or 0)
            user_id = it.get("userId")
            if day not in by_day:
                by_day[day] = {"revenue": 0.0, "orderCount": 0, "users": set()}
            by_day[day]["revenue"] += final_price
            by_day[day]["orderCount"] += 1
            if user_id:
                by_day[day]["users"].add(user_id)

        # Clear existing metrics in range (query by day range, then batch delete)
        existing = metrics_table.query(
            KeyConditionExpression=Key("organizationId").eq(organization_id) & Key("date").between(start_date, end_date)
        )
        with metrics_table.batch_writer() as batch:
            for ex in existing.get("Items", []):
                try:
                    batch.delete_item(Key={"organizationId": ex["organizationId"], "date": ex["date"]})
                except Exception:
                    pass

        # Write rebuilt metrics
        with metrics_table.batch_writer() as batch:
            for day, agg in by_day.items():
                try:
                    batch.put_item(
                        Item={
                            "organizationId": organization_id,
                            "date": day,
                            "currency": "VND",
                            "revenue": Decimal(str(int(round(agg["revenue"])))),
                            "orderCount": Decimal(str(agg["orderCount"])),
                            "payingUsers": Decimal(str(len(agg["users"]))),
                            "payingUserIds": set(list(agg["users"])),
                            "updatedAt": int(time.time()),
                        }
                    )
                except Exception:
                    pass

        return {"statusCode": 200, "body": {"rebuiltDays": len(by_day)}}
    except Exception as e:
        return {"statusCode": 500, "body": {"error": f"Failed to rebuild metrics: {str(e)}"}}



def evaluate_analytics(analyticsData: Dict[str, Any] | None = None, context: str | None = None, maxSuggestions: int = 5) -> Dict[str, Any]:
    """
    Evaluate business analytics using an LLM and return structured insights.

    Parameters:
        analyticsData: dict containing fields like metricsSeries, revenueMoM, totals, payingUsersMonth, payingUsersMoM.
        context: optional business context. Defaults to Vietnamese description for English exam bundles.
        maxSuggestions: maximum number of suggestions to return.

    Returns:
        { statusCode, body: { summary, rating, reasons, suggestions, keyMetrics } }
    """
    try:
        if not analyticsData or not isinstance(analyticsData, dict):
            analyticsData = {}

        biz_context = context or "Website bán đề tiếng Anh theo bộ đề (bundles). Mục tiêu: tăng doanh thu, tăng người dùng trả phí, tối ưu chuyển đổi và giữ chân."

        # Lightweight pre-aggregation for the model
        series = []
        try:
            ms = analyticsData.get("metricsSeries")
            if isinstance(ms, list):
                series = ms
        except Exception:
            series = []
        revenue_total = 0.0
        orders_total = 0
        users_total = 0
        for p in series:
            try:
                revenue_total += float(p.get("revenue", 0) or 0)
                orders_total += int(p.get("orderCount", 0) or 0)
                users_total += int(p.get("payingUsers", 0) or 0)
            except Exception:
                pass

        try:
            comp = analyticsData.get("revenueMoM") or {}
            if not isinstance(comp, dict):
                comp = {}
        except Exception:
            comp = {}
        keyMetrics = {
            "revenue30d": int(round(revenue_total)),
            "orders30d": orders_total,
            "payingUsers30d": users_total,
            "currentMonthRevenue": comp.get("currentMonthRevenue", 0),
            "previousMonthRevenue": comp.get("previousMonthRevenue", 0),
            "delta": comp.get("delta", 0),
            "deltaPct": comp.get("deltaPct", 0),
            "month": comp.get("currentMonth"),
        }

        # Helper to format VND with thousands separators using dot and suffix 'đ'
        def _fmt_vnd(n: Any) -> str:
            try:
                i = int(round(float(n or 0)))
                return f"{i:,}".replace(",", ".") + " đ"
            except Exception:
                try:
                    i = int(n)
                    return f"{i:,}".replace(",", ".") + " đ"
                except Exception:
                    return str(n)

        formatted = {
            "revenue30dFmt": _fmt_vnd(keyMetrics["revenue30d"]),
            "currentMonthRevenueFmt": _fmt_vnd(keyMetrics["currentMonthRevenue"]),
            "previousMonthRevenueFmt": _fmt_vnd(keyMetrics["previousMonthRevenue"]),
            "deltaFmt": _fmt_vnd(keyMetrics["delta"]),
        }

        # Simple positives (strengths) hints computed deterministically
        best_day_rev = None
        try:
            if series:
                best_day_rev = max(series, key=lambda p: float(p.get("revenue", 0) or 0))
        except Exception:
            best_day_rev = None
        hints = {
            "hasRevenue": keyMetrics["revenue30d"] > 0,
            "hasPayingUsers": keyMetrics["payingUsers30d"] > 0,
            "monthRevenueUp": float(keyMetrics.get("delta", 0) or 0) > 0,
            "bestDay": {
                "date": best_day_rev.get("date") if best_day_rev else None,
                "revenue": float(best_day_rev.get("revenue", 0)) if best_day_rev else 0,
                "revenueFmt": _fmt_vnd(best_day_rev.get("revenue", 0)) if best_day_rev else _fmt_vnd(0),
            },
        }

        system_instruct = (
            "Bạn là một chuyên gia tăng trưởng và thương mại điện tử. \n"
            "Hãy đánh giá dữ liệu kinh doanh và đưa ra nhận định ngắn gọn, rõ ràng bằng tiếng Việt. \n"
            "Khi đề cập số tiền, LUÔN dùng giá trị đã cho trong 'formatted' (ví dụ revenue30dFmt) và thêm hậu tố 'đ'. \n"
            "Lưu ý đơn vị: các trường thời lượng trong analyticsData.gaAvgEngagementSeries đều là PHÚT (minutes), KHÔNG phải giây. Không tự đổi đơn vị.\n"
            "Lưu ý tăng trưởng: nếu 'previousMonthRevenue' = 0 (không có dữ liệu tháng trước) dẫn đến 'deltaPct' = 0, hãy nêu rõ nguyên nhân là thiếu dữ liệu tháng trước, không kết luận tăng trưởng bằng 0%.\n"
        )

        prompt = (
            f"Ngữ cảnh kinh doanh: {biz_context}\n"
            "Dữ liệu thô (JSON):\n" + json.dumps(analyticsData, ensure_ascii=False) + "\n\n"
            "Key metrics (numeric):\n" + json.dumps(keyMetrics, ensure_ascii=False) + "\n" \
            + "Formatted (phải dùng để hiển thị tiền tệ):\n" + json.dumps(formatted, ensure_ascii=False) + "\n" \
            + "Hints (điểm mạnh gợi ý):\n" + json.dumps(hints, ensure_ascii=False) + "\n\n"
            "Yêu cầu: \n"
            "1) Tóm tắt ngắn gọn tình hình tổng quan (1-3 câu).\n"
            "2) Chấm mức độ tình hình: good | average | poor (dựa vào xu hướng, MoM, tổng doanh thu 30 ngày).\n"
            "3) Liệt kê 2-6 lý do chính dẫn tới đánh giá đó.\n"
            "4) Liệt kê 2-6 điểm mạnh/Con số tích cực (positives), ưu tiên dùng các số đã format trong 'Formatted'.\n"
            "5) Đưa ra tối đa " + str(int(maxSuggestions)) + " gợi ý hành động cụ thể (ưu tiên tác động cao, dễ triển khai).\n"
            "Lưu ý: Chỉ dùng giá trị tiền trong 'Formatted'; không đổi đơn vị; ngắn gọn, thực dụng."
        )

        # Align schema style with project samples: typed fields and array constraints
        schema = {
            "type": "object",
            "properties": {
                "summary": {"type": "string"},
                "rating": {
                    "type": "string",
                    "enum": ["good", "average", "poor"]
                },
                "reasons": {
                    "type": "array",
                    "items": {"type": "string"},
                    "minItems": 1
                },
                "positives": {
                    "type": "array",
                    "items": {"type": "string"},
                    "minItems": 1
                },
                "suggestions": {
                    "type": "array",
                    "items": {"type": "string"},
                    "minItems": 1,
                    "maxItems": int(max(1, int(maxSuggestions or 5)))
                },
                "keyMetrics": {
                    "type": "object",
                    "properties": {
                        "revenue30d": {"type": "integer"},
                        "orders30d": {"type": "integer"},
                        "payingUsers30d": {"type": "integer"},
                        "currentMonthRevenue": {"type": "number"},
                        "previousMonthRevenue": {"type": "number"},
                        "delta": {"type": "number"},
                        "deltaPct": {"type": "number"},
                        "month": {"type": "string"}
                    }
                }
            },
            "required": ["summary", "rating", "reasons", "positives", "suggestions"]
        }

        result = ai.call_generate_content(
            system_instruct,
            prompt,
            jsonRule=schema,
            auto_pair_json=True,
            max_retries=2,
        )

        # Normalize model output to a dict; never early-return with empty suggestions
        if isinstance(result, dict) and result.get("error"):
            parsed = {
                "summary": "",
                "rating": "average",
                "reasons": [],
                "positives": [],
                "suggestions": [],
                "keyMetrics": keyMetrics,
                "error": result.get("error"),
            }
        else:
            try:
                parsed = result if isinstance(result, dict) else json.loads(str(result))
            except Exception:
                parsed = {"summary": str(result), "rating": "average", "reasons": [], "positives": [], "suggestions": []}

        # Attach computed key metrics if model omitted and fill positives fallback
        if isinstance(parsed, dict):
            if "keyMetrics" not in parsed or not isinstance(parsed.get("keyMetrics"), dict):
                parsed["keyMetrics"] = keyMetrics
            else:
                # Shallow merge
                for k, v in keyMetrics.items():
                    parsed["keyMetrics"].setdefault(k, v)

            # Ensure positives present; derive some if missing
            if not isinstance(parsed.get("positives"), list) or len(parsed.get("positives", [])) == 0:
                derived = []
                if hints["hasRevenue"]:
                    derived.append(f"Có doanh thu trong 30 ngày: {formatted['revenue30dFmt']}")
                if hints["monthRevenueUp"]:
                    derived.append("Doanh thu tháng này tăng so với tháng trước")
                if hints["hasPayingUsers"]:
                    derived.append(f"Người dùng trả phí 30 ngày: {keyMetrics['payingUsers30d']}")
                if hints.get("bestDay", {}).get("revenue", 0) > 0:
                    bd = hints["bestDay"]
                    derived.append(f"Ngày có doanh thu cao: {bd['date']} ({bd['revenueFmt']})")
                parsed["positives"] = derived

        return {"statusCode": 200, "body": parsed}
    
    except Exception as e:
        return {"statusCode": 500, "body": {"error": f"Failed to evaluate analytics: {str(e)}"}}


def get_collection_sales_stats(start_date: int = None, end_date: int = None, category: str = None, exam: str = None) -> Dict[str, Any]:
    """
    Get collection sales statistics by aggregating orders.
    Only counts direct collection purchases, not bundle purchases.
    
    Parameters:
        start_date: epoch timestamp (optional)
        end_date: epoch timestamp (optional)
        category: filter by category (optional)
        exam: filter by exam type (optional)
    
    Returns:
        Dict with stats array and summary
    """
    try:
        from src.utils import collection_table, convert_sets_to_lists
        
        ddb = boto3.resource("dynamodb")
        orders = ddb.Table(orders_table)
        index_name = _pick_index(orders)
        
        # Calculate date range
        if start_date is None or end_date is None:
            # Default to last 30 days
            now = datetime.now(tz=timezone.utc)
            end_dt = now
            start_dt = now - timedelta(days=30)
            start_epoch = int(start_dt.timestamp())
            end_epoch = int(end_dt.timestamp())
        else:
            start_epoch = int(start_date)
            end_epoch = int(end_date)
        
        start_str = str(start_epoch)
        end_str = str(end_epoch)
        
        # Query completed orders
        items = _query_completed_orders_in_range(orders, index_name, start_epoch, end_epoch, start_str, end_str)
        items += _query_pending_paid_in_range(orders, index_name, start_epoch, end_epoch, start_str, end_str)
        
        # Aggregate collection purchases
        # Key: collectionId -> { purchaseCount, revenue, price, name, category, exam, pricing }
        collection_stats: Dict[str, Dict[str, Any]] = {}
        
        for order in items:
            order_items = order.get("items", [])
            for item in order_items:
                collection_id = item.get("collectionId", "")
                
                # Skip bundle purchases (only count direct collection purchases)
                if not collection_id or isinstance(collection_id, str) and collection_id.startswith("BUNDLE:"):
                    continue
                
                # Get item price (from order item or collection)
                # Handle Decimal type from DynamoDB
                price_val = item.get("price", 0) or 0
                if isinstance(price_val, Decimal):
                    item_price = float(price_val)
                else:
                    item_price = float(price_val)
                
                # Initialize collection stat if not exists
                if collection_id not in collection_stats:
                    collection_stats[collection_id] = {
                        "collectionId": collection_id,
                        "collectionName": item.get("name", ""),
                        "category": item.get("category", ""),
                        "exam": item.get("exam", ""),
                        "pricing": item.get("pricing", "free"),
                        "price": item_price,
                        "purchaseCount": 0,
                    }
                
                # Increment purchase count only
                collection_stats[collection_id]["purchaseCount"] += 1
        
        # Fetch collection details for missing data (only when needed)
        # Most collections should have name from order items, so we minimize lookups
        collection_cache: Dict[str, Dict[str, Any]] = {}
        collections_to_fetch = [
            collection_id
            for collection_id, stat in collection_stats.items()
            if not stat["collectionName"]
        ]
        
        # Only fetch if we have missing names (limit to avoid too many requests)
        # If too many missing, skip lookups to avoid rate limiting
        if collections_to_fetch and len(collections_to_fetch) <= 50:
            try:
                # Use individual get_item calls but limit to avoid rate limiting
                # In production, consider using batch_get_item with proper format conversion
                for collection_id in collections_to_fetch[:50]:  # Limit to 50 max
                    try:
                        collection_resp = collection_table.get_item(Key={"uid": collection_id})
                        if "Item" in collection_resp:
                            collection_item = convert_sets_to_lists(collection_resp["Item"])
                            collection_cache[collection_id] = collection_item
                    except Exception:
                        continue  # Skip failed lookups
            except Exception as e:
                print(f"Warning: Failed to fetch collections: {str(e)}")
        
        # Apply filters and enrich with collection data
        stats_list: List[Dict[str, Any]] = []
        for collection_id, stat in collection_stats.items():
            # Apply filters
            if category and stat["category"] != category:
                continue
            if exam and stat["exam"] != exam:
                continue
            
            # Enrich with collection data if available
            if collection_id in collection_cache:
                collection_item = collection_cache[collection_id]
                stat["collectionName"] = collection_item.get("name", "[Đã xóa]")
                stat["category"] = collection_item.get("category", stat["category"])
                stat["exam"] = collection_item.get("exam", stat["exam"])
                stat["pricing"] = collection_item.get("pricing", "free")
                if stat["price"] == 0:
                    price_val = collection_item.get("price", 0) or 0
                    if isinstance(price_val, Decimal):
                        stat["price"] = float(price_val)
                    else:
                        stat["price"] = float(price_val)
            elif not stat["collectionName"]:
                stat["collectionName"] = "[Đã xóa]"
            
            stats_list.append(stat)
        
        # Calculate summary
        total_collections = len(stats_list)
        total_purchases = sum(s["purchaseCount"] for s in stats_list)
        
        # Sort by purchase count (descending)
        stats_list.sort(key=lambda x: x["purchaseCount"], reverse=True)
        
        # Calculate trends (compare with previous period) - OPTIONAL to reduce requests
        # Only calculate trends if period is reasonable (not "all time")
        # Skip trend calculation for "all time" to avoid too many requests
        if start_date is not None and end_date is not None:
            try:
                period_length = end_epoch - start_epoch
                # Only calculate trend if period is reasonable (less than 1 year)
                if period_length < 365 * 24 * 60 * 60:
                    prev_start_epoch = start_epoch - period_length
                    prev_end_epoch = start_epoch - 1
                    prev_start_str = str(prev_start_epoch)
                    prev_end_str = str(prev_end_epoch)
                    
                    # Query previous period (with timeout protection)
                    prev_items = _query_completed_orders_in_range(orders, index_name, prev_start_epoch, prev_end_epoch, prev_start_str, prev_end_str)
                    prev_items += _query_pending_paid_in_range(orders, index_name, prev_start_epoch, prev_end_epoch, prev_start_str, prev_end_str)
                    
                    # Aggregate previous period
                    prev_collection_counts: Dict[str, int] = {}
                    for order in prev_items:
                        order_items = order.get("items", [])
                        for item in order_items:
                            collection_id = item.get("collectionId", "")
                            if not collection_id or isinstance(collection_id, str) and collection_id.startswith("BUNDLE:"):
                                continue
                            prev_collection_counts[collection_id] = prev_collection_counts.get(collection_id, 0) + 1
                    
                    # Add trend data to stats
                    for stat in stats_list:
                        collection_id = stat["collectionId"]
                        prev_count = prev_collection_counts.get(collection_id, 0)
                        current_count = stat["purchaseCount"]
                        
                        if prev_count > 0:
                            change_percent = ((current_count - prev_count) / prev_count) * 100.0
                        elif current_count > 0:
                            change_percent = 100.0
                        else:
                            change_percent = 0.0
                        
                        stat["trend"] = {
                            "previousPeriodCount": prev_count,
                            "changePercent": round(change_percent, 1),
                        }
            except Exception as e:
                # If trend calculation fails, continue without trends
                print(f"Warning: Failed to calculate trends: {str(e)}")
                pass
        
        return {
            "statusCode": 200,
            "body": {
                "stats": stats_list,
                "summary": {
                    "totalCollections": total_collections,
                    "totalPurchases": total_purchases,
                },
            },
        }
    except Exception as e:
        return {"statusCode": 500, "body": {"error": f"Failed to get collection sales stats: {str(e)}"}}

