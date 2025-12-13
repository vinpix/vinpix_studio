# ranking.py
"""Ranking-related Lambda business logic functions.

These functions rely on two DynamoDB tables defined in ``utils``:

* ``user_study_summary_table`` – aggregated study stats per user
* ``study_session_table`` – raw session data (not used here yet)

Current ranking is based on the ``total_study_time`` field in
``sb_user_study_summary``. Later we can extend with exercise metrics or
other criteria.
"""
from typing import List, Dict, Any, Optional, Tuple
from decimal import Decimal
from boto3.dynamodb.conditions import Attr, Key
from datetime import datetime

from .utils import user_study_summary_table, user_table, study_session_table  # type: ignore

# ---------------------------------------------------------------------------
# Internal helpers
# ---------------------------------------------------------------------------

def _decimal_to_int(value: Any) -> int:
    """Safely convert DynamoDB Decimal to int."""
    if isinstance(value, Decimal):
        return int(value)
    return int(value or 0)


def _pad_total(value: int, width: int = 12) -> str:
    """Left-pad total as string to ensure lexicographic == numeric order when needed."""
    try:
        return str(int(value)).zfill(width)
    except Exception:
        return str(value)


def _fetch_user_display(uid: str) -> Dict[str, Any]:
    """Retrieve display info (name, avatar, badge) for a user from ``user_table``.

    Returns minimal dict if user not found to avoid breaking leaderboard.
    """
    try:
        res = user_table.get_item(
            Key={"uid": uid},
            ProjectionExpression="displayName, avatarUrl, badge, login_streak"
        )
        item = res.get("Item", {})
        # Extract current streak from login_streak dict (default 0 if absent)
        login_streak = item.get("login_streak", {})
        current_streak = login_streak.get("current_streak", 0)
        return {
            "id": uid,
            "name": item.get("displayName", f"User {uid[:6]}").strip(),
            "avatar": item.get("avatarUrl"),
            "badge": item.get("badge", "Học viên"),
            "streak": current_streak,
        }
    except Exception:  # pragma: no cover – best-effort; never raise upstream
        return {"id": uid, "name": f"User {uid[:6]}", "avatar": None, "badge": "Học viên", "streak": 0}

# ---------------------------------------------------------------------------
# Session aggregation helpers
# ---------------------------------------------------------------------------

def _total_time_for_user(uid: str) -> int:
    """Sum durations in study_session_table for the given user."""
    try:
        scan_kwargs = {
            "FilterExpression": Attr("user_id").eq(uid),
            "ProjectionExpression": "duration"
        }
        response = study_session_table.scan(**scan_kwargs)
        items = response.get("Items", [])
        while "LastEvaluatedKey" in response:
            response = study_session_table.scan(
                ExclusiveStartKey=response["LastEvaluatedKey"],
                **scan_kwargs
            )
            items.extend(response.get("Items", []))
        total = sum(_decimal_to_int(i.get("duration", 0)) for i in items)
        return total
    except Exception:
        return 0


def _sum_user_time_for_period(uid: str, period: str = "ALL") -> int:
    """Sum study durations for a user filtered by period.

    period values:
      - "ALL" => all time
      - "YYYY-MM" => calendar month
      - "YYYY-Www" => ISO week (e.g., 2025-W04)
    """
    try:
        scan_kwargs = {
            "FilterExpression": Attr("user_id").eq(uid),
            "ProjectionExpression": "duration, end_time",
        }
        response = study_session_table.scan(**scan_kwargs)
        items = response.get("Items", [])
        while "LastEvaluatedKey" in response:
            response = study_session_table.scan(
                ExclusiveStartKey=response["LastEvaluatedKey"], **scan_kwargs
            )
            items.extend(response.get("Items", []))

        def match_period(end_time_str: Optional[str]) -> bool:
            if period == "ALL":
                return True
            if not end_time_str:
                return False
            try:
                dt = datetime.fromisoformat(end_time_str.rstrip("Z").replace("Z", "+00:00"))
            except Exception:
                return False
            if "-W" in period:
                iso_year, iso_week, _ = dt.isocalendar()
                return period == f"{iso_year}-W{iso_week:02d}"
            # monthly
            return period == dt.strftime("%Y-%m")

        total = 0
        for itm in items:
            if match_period(itm.get("end_time")):
                total += _decimal_to_int(itm.get("duration", 0))
        return total
    except Exception:
        return 0


def _populate_summary_for_user(uid: str, period: str = "ALL") -> int:
    """Ensure a summary record exists for (period, uid); return total study time for that period."""
    total = _sum_user_time_for_period(uid, period)
    try:
        now = datetime.utcnow().isoformat() + "Z"
        user_study_summary_table.put_item(
            Item={
                "period": period,
                "user_id": uid,
                "total_study_time": _pad_total(total),
                "last_updated": now,
            }
        )
    except Exception:
        pass  # ignore write errors
    return total


def _build_summaries_if_empty() -> None:
    """If summary table is empty, build entries from sessions (lightweight)."""
    try:
        # Check count quickly by scanning limit 1
        peek = user_study_summary_table.scan(Limit=1)
        if peek.get("Count", 0) > 0:
            return  # already populated
        # Aggregate from sessions into ALL period only (lightweight bootstrap)
        scan_kwargs = {"ProjectionExpression": "user_id, duration"}
        response = study_session_table.scan(**scan_kwargs)
        user_totals: Dict[str, int] = {}
        items = response.get("Items", [])
        while True:
            for itm in items:
                uid = itm.get("user_id")
                dur = _decimal_to_int(itm.get("duration", 0))
                if uid:
                    user_totals[uid] = user_totals.get(uid, 0) + dur
            if "LastEvaluatedKey" not in response:
                break
            response = study_session_table.scan(ExclusiveStartKey=response["LastEvaluatedKey"], **scan_kwargs)
            items = response.get("Items", [])
        # Bulk write summaries (batch writer)
        with user_study_summary_table.batch_writer() as batch:
            now = datetime.utcnow().isoformat() + "Z"
            for uid, tot in user_totals.items():
                batch.put_item(Item={
                    "period": "ALL",
                    "user_id": uid,
                    "total_study_time": _pad_total(int(tot)),
                    "last_updated": now,
                })
    except Exception:
        pass

# ---------------------------------------------------------------------------
# Public Lambda-facing functions
# ---------------------------------------------------------------------------

# Use the correct GSI name as defined when provisioning the table
INDEX_NAME = "period-total_study_time-index"

def get_leaderboard(period: str = "ALL", limit: int = 20) -> Dict[str, Any]:
    """Return top *limit* users ordered by total study time."""
    try:
        # Ensure summary table is populated at least once
        _build_summaries_if_empty()

        # Query all items for this period and sort numerically to avoid lexicographic issues
        items: List[Dict[str, Any]] = []
        start_key: Optional[Dict[str, Any]] = None
        while True:
            q_kwargs = {
                "IndexName": INDEX_NAME,
                "KeyConditionExpression": Key("period").eq(period),
                "ProjectionExpression": "user_id, total_study_time",
                "ScanIndexForward": False,
            }
            if start_key:
                q_kwargs["ExclusiveStartKey"] = start_key
            response = user_study_summary_table.query(**q_kwargs)
            items.extend(response.get("Items", []))
            if "LastEvaluatedKey" not in response:
                break
            start_key = response["LastEvaluatedKey"]

        # Fallback: if no summaries exist for this period yet, build lightweight summaries from sessions
        if not items:
            try:
                scan_kwargs = {"ProjectionExpression": "user_id, duration, end_time"}
                resp = study_session_table.scan(**scan_kwargs)
                sess_items = resp.get("Items", [])
                while "LastEvaluatedKey" in resp:
                    resp = study_session_table.scan(ExclusiveStartKey=resp["LastEvaluatedKey"], **scan_kwargs)
                    sess_items.extend(resp.get("Items", []))

                # Aggregate per user for requested period
                totals: Dict[str, int] = {}
                for s in sess_items:
                    uid = s.get("user_id")
                    if not uid:
                        continue
                    et = s.get("end_time")
                    if period != "ALL":
                        if not et:
                            continue
                        try:
                            dt = datetime.fromisoformat(et.rstrip("Z").replace("Z", "+00:00"))
                        except Exception:
                            continue
                        if "-W" in period:
                            y, w, _ = dt.isocalendar()
                            if period != f"{y}-W{w:02d}":
                                continue
                        else:
                            if period != dt.strftime("%Y-%m"):
                                continue
                    totals[uid] = totals.get(uid, 0) + _decimal_to_int(s.get("duration", 0))

                # Write back top summaries for this period so future queries hit index
                if totals:
                    now = datetime.utcnow().isoformat() + "Z"
                    # sort and take top limit to reduce write volume
                    top_users = sorted(totals.items(), key=lambda kv: kv[1], reverse=True)[: limit]
                    with user_study_summary_table.batch_writer() as batch:
                        for uid, tot in top_users:
                            batch.put_item(Item={
                                "period": period,
                                "user_id": uid,
                                "total_study_time": _pad_total(int(tot)),
                                "last_updated": now,
                            })
                    # Reload items from index
                    items = []
                    start_key = None
                    while True:
                        q_kwargs2 = {
                            "IndexName": INDEX_NAME,
                            "KeyConditionExpression": Key("period").eq(period),
                            "ProjectionExpression": "user_id, total_study_time",
                            "ScanIndexForward": False,
                        }
                        if start_key:
                            q_kwargs2["ExclusiveStartKey"] = start_key
                        r2 = user_study_summary_table.query(**q_kwargs2)
                        items.extend(r2.get("Items", []))
                        if "LastEvaluatedKey" not in r2:
                            break
                        start_key = r2["LastEvaluatedKey"]
            except Exception:
                # If fallback aggregation fails for any reason, keep items empty so the endpoint still returns gracefully
                items = []

        # Sort numerically descending and take top limit
        def to_int_total(v: Any) -> int:
            return _decimal_to_int(v)

        sorted_items = sorted(
            items,
            key=lambda e: to_int_total(e.get("total_study_time", 0)),
            reverse=True,
        )[: limit]

        leaderboard: List[Dict[str, Any]] = []
        for idx, entry in enumerate(sorted_items, start=1):
            total_int = _decimal_to_int(entry.get("total_study_time", 0))
            uid = entry["user_id"]
            display = _fetch_user_display(uid)
            leaderboard.append({
                **display,
                "studyTime": total_int,
                "exerciseTime": 0,
                "rank": idx,
            })

        return {
            "statusCode": 200,
            "body": {
                "leaderboard": leaderboard,
                "total": len(items),
            }
        }
    except Exception as e:  # pragma: no cover – handle gracefully
        # If index or resource not found (e.g. table/index empty), return empty leaderboard instead of error
        if "ResourceNotFoundException" in str(e) or "Requested resource not found" in str(e):
            return {
                "statusCode": 200,
                "body": {
                    "leaderboard": [],
                    "total": 0,
                },
            }
        return {"statusCode": 500, "body": {"error": str(e)}}


def get_user_ranking(uid: str, period: str = "ALL") -> Dict[str, Any]:
    """Return ranking info for a single user along with their overall rank."""
    if not uid:
        return {"statusCode": 400, "body": "uid is required"}
    try:
        # Get user summary for this period
        res = user_study_summary_table.get_item(Key={"period": period, "user_id": uid})
        if "Item" not in res:
            # Build summary for this user on the fly for the requested period
            user_total = _populate_summary_for_user(uid, period)
        else:
            user_total = _decimal_to_int(res["Item"].get("total_study_time", 0))

        # Count users with higher score by scanning all for the period and comparing numerically
        higher = 0
        start_key = None
        while True:
            q_kwargs = {
                "IndexName": INDEX_NAME,
                "KeyConditionExpression": Key("period").eq(period),
                "ProjectionExpression": "total_study_time",
                "ScanIndexForward": False,
            }
            if start_key:
                q_kwargs["ExclusiveStartKey"] = start_key
            resp = user_study_summary_table.query(**q_kwargs)
            for it in resp.get("Items", []):
                val = _decimal_to_int(it.get("total_study_time", 0))
                if val > user_total:
                    higher += 1
            if "LastEvaluatedKey" not in resp:
                break
            start_key = resp["LastEvaluatedKey"]
        rank = higher + 1

        # Fetch display data
        display = _fetch_user_display(uid)

        return {
            "statusCode": 200,
            "body": {
                **display,
                "score": user_total,
                "rank": rank,
                "badge": display.get("badge"),
            }
        }
    except Exception as e:
        # Gracefully handle missing table/index when leaderboard not ready yet
        if "ResourceNotFoundException" in str(e) or "Requested resource not found" in str(e):
            display = _fetch_user_display(uid)
            return {
                "statusCode": 200,
                "body": {
                    **display,
                    "score": 0,
                    "rank": 1,
                    "badge": display.get("badge"),
                },
            }
        return {"statusCode": 500, "body": {"error": str(e)}}
