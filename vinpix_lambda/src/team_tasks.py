"""
Team Task Management module for the /team page.

Persistence:
  - vinpix_team_tasks  (PK pk, SK sk)
        Task item    : pk="TASK"    sk=task_id
        Code counter : pk="COUNTER" sk="TASK_CODE" (atomic auto-increment for T001..)
  - vinpix_team_members (PK member_id)  -> roster only (no per-member login)

Auth: a single shared team passcode stored in the Lambda env var TEAM_PASSCODE.
      loginTeam(password) issues an opaque session token; the Next.js layer keeps it
      in an httpOnly cookie (vinpix_team_session) and the middleware only checks presence.

Modeled on src/contract.py conventions: try/except, {'statusCode', 'body'} returns,
short_uuid() ids, ISO-8601 timestamps, atomic ADD counter (see faq.py).
"""

import os
import time
import hashlib
from decimal import Decimal
from datetime import datetime

from boto3.dynamodb.conditions import Key
from .utils import team_tasks_table, team_members_table, short_uuid, S3_BUCKET, get_s3_key
from .s3helper import upload_to_s3

# ----- domain constants -----
TASK_PK = "TASK"
NOTE_PK = "NOTE"
COUNTER_PK = "COUNTER"
COUNTER_SK = "TASK_CODE"

VALID_STATUS = {"chua_bat_dau", "dang_lam", "cho_review", "hoan_thanh", "tam_hoan"}
VALID_PRIORITY = {"cao", "trung_binh", "thap"}
VALID_MEMBER_TYPE = {"full_time", "intern"}

# task fields a client is allowed to write through updateTask
EDITABLE_TASK_FIELDS = {
    "name", "description", "assigneeId", "assigneeIds", "role", "priority",
    "assignedDate", "deadline", "status", "progress", "notes", "links", "order",
}
EDITABLE_MEMBER_FIELDS = {
    "name", "avatar", "role", "joinDate", "type", "status", "notes",
}


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
    """Coerce arbitrary input into a DynamoDB-safe number (Decimal)."""
    try:
        if value is None or value == "":
            value = default
        d = Decimal(str(value))
        return d
    except Exception:
        return Decimal(str(default))


def _assignee_list(params):
    """Build the assignee id list, accepting either assigneeIds[] or legacy assigneeId."""
    ids = params.get("assigneeIds")
    if isinstance(ids, list):
        return [str(x) for x in ids if x]
    single = params.get("assigneeId")
    return [single] if single else []


def _strip_task(item):
    """Drop internal pk/sk and normalise assigneeIds (migrate legacy assigneeId on read)."""
    item = _clean(item)
    item.pop("pk", None)
    item.pop("sk", None)
    if not isinstance(item.get("assigneeIds"), list):
        aid = item.get("assigneeId")
        item["assigneeIds"] = [aid] if aid else []
    return item


def _next_code():
    """Atomically bump the task-code counter and return 'Tnnn'."""
    resp = team_tasks_table.update_item(
        Key={"pk": COUNTER_PK, "sk": COUNTER_SK},
        UpdateExpression="ADD seq :inc",
        ExpressionAttributeValues={":inc": Decimal(1)},
        ReturnValues="ALL_NEW",
    )
    seq = int(resp["Attributes"]["seq"])
    return "T" + str(seq).zfill(3)


# =========================================================
#  AUTH  (shared passcode)
# =========================================================
def loginTeam(password):
    try:
        passcode = os.environ.get("TEAM_PASSCODE")
        if not passcode:
            return {"statusCode": 500, "body": {"error": "Team passcode is not configured."}}
        if not password:
            return {"statusCode": 400, "body": {"error": "Mật khẩu là bắt buộc."}}
        if str(password).strip() != str(passcode):
            return {"statusCode": 401, "body": {"error": "Sai mật khẩu."}}

        session_token = short_uuid()
        expires_at = int(time.time()) + (7 * 24 * 60 * 60)
        return {
            "statusCode": 200,
            "body": {"sessionToken": session_token, "expiresAt": expires_at},
        }
    except Exception as e:
        print(f"[team] loginTeam error: {str(e)}")
        return {"statusCode": 500, "body": {"error": f"Login failed: {str(e)}"}}


# =========================================================
#  TASKS
# =========================================================
def listTasks(params):
    try:
        resp = team_tasks_table.query(
            KeyConditionExpression=Key("pk").eq(TASK_PK)
        )
        tasks = [_strip_task(i) for i in resp.get("Items", [])]

        # optional server-side narrowing
        status = (params or {}).get("status")
        assignee = (params or {}).get("assigneeId")
        if status:
            tasks = [t for t in tasks if t.get("status") == status]
        if assignee:
            tasks = [t for t in tasks if assignee in t.get("assigneeIds", [])]

        tasks.sort(key=lambda t: (t.get("status", ""), t.get("order", 0)))
        return {"statusCode": 200, "body": {"tasks": tasks}}
    except Exception as e:
        print(f"[team] listTasks error: {str(e)}")
        return {"statusCode": 500, "body": {"error": str(e)}}


def createTask(params):
    try:
        params = params or {}
        name = (params.get("name") or "").strip()
        if not name:
            return {"statusCode": 400, "body": {"error": "Tên công việc là bắt buộc."}}

        status = params.get("status") or "chua_bat_dau"
        priority = params.get("priority") or "trung_binh"
        if status not in VALID_STATUS:
            return {"statusCode": 400, "body": {"error": f"Trạng thái không hợp lệ: {status}"}}
        if priority not in VALID_PRIORITY:
            return {"statusCode": 400, "body": {"error": f"Ưu tiên không hợp lệ: {priority}"}}

        task_id = short_uuid()
        now = _now()
        order = params.get("order")
        if order is None:
            order = int(time.time() * 1000)  # monotonic append

        item = {
            "pk": TASK_PK,
            "sk": task_id,
            "task_id": task_id,
            "code": _next_code(),
            "name": name,
            "description": params.get("description", ""),
            "assigneeIds": _assignee_list(params),
            "role": params.get("role", ""),
            "priority": priority,
            "assignedDate": params.get("assignedDate", ""),
            "deadline": params.get("deadline", ""),
            "status": status,
            "progress": _num(params.get("progress", 0)),
            "notes": params.get("notes", ""),
            "links": params.get("links", []) or [],
            "order": _num(order),
            "createdAt": params.get("createdAt") or now,
            "updatedAt": now,
            "createdBy": params.get("createdBy", ""),
        }
        team_tasks_table.put_item(Item=item)
        return {"statusCode": 200, "body": {"task": _strip_task(item)}}
    except Exception as e:
        print(f"[team] createTask error: {str(e)}")
        return {"statusCode": 500, "body": {"error": str(e)}}


def updateTask(params):
    try:
        params = params or {}
        task_id = params.get("taskId")
        updates = params.get("updates") or {}
        if not task_id:
            return {"statusCode": 400, "body": {"error": "taskId là bắt buộc."}}
        if not updates:
            return {"statusCode": 400, "body": {"error": "Không có thay đổi."}}

        if "status" in updates and updates["status"] not in VALID_STATUS:
            return {"statusCode": 400, "body": {"error": f"Trạng thái không hợp lệ: {updates['status']}"}}
        if "priority" in updates and updates["priority"] not in VALID_PRIORITY:
            return {"statusCode": 400, "body": {"error": f"Ưu tiên không hợp lệ: {updates['priority']}"}}

        set_parts = ["updatedAt = :ua"]
        names = {}
        values = {":ua": _now()}
        i = 0
        for key, val in updates.items():
            if key not in EDITABLE_TASK_FIELDS:
                continue
            i += 1
            ph = f"#f{i}"
            pv = f":v{i}"
            names[ph] = key
            if key in ("progress", "order"):
                values[pv] = _num(val)
            elif key == "links":
                values[pv] = val or []
            else:
                values[pv] = val
            set_parts.append(f"{ph} = {pv}")

        if len(set_parts) == 1:
            return {"statusCode": 400, "body": {"error": "Không có trường hợp lệ để cập nhật."}}

        kwargs = {
            "Key": {"pk": TASK_PK, "sk": task_id},
            "UpdateExpression": "SET " + ", ".join(set_parts),
            "ExpressionAttributeValues": values,
            "ReturnValues": "ALL_NEW",
        }
        if names:
            kwargs["ExpressionAttributeNames"] = names

        resp = team_tasks_table.update_item(**kwargs)
        return {"statusCode": 200, "body": {"task": _strip_task(resp["Attributes"])}}
    except Exception as e:
        print(f"[team] updateTask error: {str(e)}")
        return {"statusCode": 500, "body": {"error": str(e)}}


def reorderTask(params):
    """Kanban move: set status + order in one write."""
    try:
        params = params or {}
        task_id = params.get("taskId")
        new_status = params.get("status")
        order = params.get("order")
        if not task_id or not new_status:
            return {"statusCode": 400, "body": {"error": "taskId và status là bắt buộc."}}
        if new_status not in VALID_STATUS:
            return {"statusCode": 400, "body": {"error": f"Trạng thái không hợp lệ: {new_status}"}}

        values = {":s": new_status, ":ua": _now()}
        expr = "SET #s = :s, updatedAt = :ua"
        if order is not None:
            values[":o"] = _num(order)
            expr += ", #o = :o"

        resp = team_tasks_table.update_item(
            Key={"pk": TASK_PK, "sk": task_id},
            UpdateExpression=expr,
            ExpressionAttributeNames={"#s": "status", "#o": "order"},
            ExpressionAttributeValues=values,
            ReturnValues="ALL_NEW",
        )
        return {"statusCode": 200, "body": {"task": _strip_task(resp["Attributes"])}}
    except Exception as e:
        print(f"[team] reorderTask error: {str(e)}")
        return {"statusCode": 500, "body": {"error": str(e)}}


def deleteTask(params):
    try:
        task_id = (params or {}).get("taskId")
        if not task_id:
            return {"statusCode": 400, "body": {"error": "taskId là bắt buộc."}}
        team_tasks_table.delete_item(Key={"pk": TASK_PK, "sk": task_id})
        return {"statusCode": 200, "body": {"message": "Đã xoá công việc.", "taskId": task_id}}
    except Exception as e:
        print(f"[team] deleteTask error: {str(e)}")
        return {"statusCode": 500, "body": {"error": str(e)}}


# =========================================================
#  MEMBERS  (roster)
# =========================================================
def listMembers(params):
    try:
        resp = team_members_table.scan()
        members = [_clean(m) for m in resp.get("Items", [])]
        members.sort(key=lambda m: m.get("joinDate", "") or "")
        return {"statusCode": 200, "body": {"members": members}}
    except Exception as e:
        print(f"[team] listMembers error: {str(e)}")
        return {"statusCode": 500, "body": {"error": str(e)}}


def createMember(params):
    try:
        params = params or {}
        name = (params.get("name") or "").strip()
        if not name:
            return {"statusCode": 400, "body": {"error": "Tên thành viên là bắt buộc."}}
        mtype = params.get("type") or "intern"
        if mtype not in VALID_MEMBER_TYPE:
            return {"statusCode": 400, "body": {"error": f"Hình thức không hợp lệ: {mtype}"}}

        member_id = params.get("member_id") or short_uuid()
        now = _now()
        item = {
            "member_id": member_id,
            "name": name,
            "avatar": params.get("avatar", ""),
            "role": params.get("role", ""),
            "joinDate": params.get("joinDate", ""),
            "type": mtype,
            "status": params.get("status", "active"),
            "notes": params.get("notes", ""),
            "createdAt": now,
            "updatedAt": now,
        }
        team_members_table.put_item(Item=item)
        return {"statusCode": 200, "body": {"member": _clean(item)}}
    except Exception as e:
        print(f"[team] createMember error: {str(e)}")
        return {"statusCode": 500, "body": {"error": str(e)}}


def updateMember(params):
    try:
        params = params or {}
        member_id = params.get("memberId")
        updates = params.get("updates") or {}
        if not member_id:
            return {"statusCode": 400, "body": {"error": "memberId là bắt buộc."}}

        set_parts = ["updatedAt = :ua"]
        names = {}
        values = {":ua": _now()}
        i = 0
        for key, val in updates.items():
            if key not in EDITABLE_MEMBER_FIELDS:
                continue
            i += 1
            ph, pv = f"#f{i}", f":v{i}"
            names[ph] = key
            values[pv] = val
            set_parts.append(f"{ph} = {pv}")
        if len(set_parts) == 1:
            return {"statusCode": 400, "body": {"error": "Không có trường hợp lệ để cập nhật."}}

        resp = team_members_table.update_item(
            Key={"member_id": member_id},
            UpdateExpression="SET " + ", ".join(set_parts),
            ExpressionAttributeNames=names,
            ExpressionAttributeValues=values,
            ReturnValues="ALL_NEW",
        )
        return {"statusCode": 200, "body": {"member": _clean(resp["Attributes"])}}
    except Exception as e:
        print(f"[team] updateMember error: {str(e)}")
        return {"statusCode": 500, "body": {"error": str(e)}}


def deleteMember(params):
    try:
        member_id = (params or {}).get("memberId")
        if not member_id:
            return {"statusCode": 400, "body": {"error": "memberId là bắt buộc."}}
        team_members_table.delete_item(Key={"member_id": member_id})
        return {"statusCode": 200, "body": {"message": "Đã xoá thành viên.", "memberId": member_id}}
    except Exception as e:
        print(f"[team] deleteMember error: {str(e)}")
        return {"statusCode": 500, "body": {"error": str(e)}}


# =========================================================
#  STATS
# =========================================================
def getTeamStats(params):
    try:
        resp = team_tasks_table.query(KeyConditionExpression=Key("pk").eq(TASK_PK))
        tasks = [_strip_task(i) for i in resp.get("Items", [])]
        members = listMembers({}).get("body", {}).get("members", [])

        by_status = {s: 0 for s in VALID_STATUS}
        by_priority = {p: 0 for p in VALID_PRIORITY}
        overdue = 0
        today = datetime.utcnow().strftime("%Y-%m-%d")
        per_member = {}

        for t in tasks:
            by_status[t.get("status", "chua_bat_dau")] = by_status.get(t.get("status", "chua_bat_dau"), 0) + 1
            by_priority[t.get("priority", "trung_binh")] = by_priority.get(t.get("priority", "trung_binh"), 0) + 1
            deadline = (t.get("deadline") or "")[:10]
            done = t.get("status") == "hoan_thanh"
            if deadline and deadline < today and not done:
                overdue += 1
            aids = t.get("assigneeIds") or ["__unassigned__"]
            for aid in aids:
                bucket = per_member.setdefault(aid, {"memberId": aid, "open": 0, "done": 0})
                if done:
                    bucket["done"] += 1
                else:
                    bucket["open"] += 1

        name_by_id = {m["member_id"]: m.get("name", "") for m in members}
        per_member_list = []
        for aid, b in per_member.items():
            b["name"] = name_by_id.get(aid, "Chưa giao" if aid == "__unassigned__" else aid)
            per_member_list.append(b)

        return {
            "statusCode": 200,
            "body": {
                "stats": {
                    "totalTasks": len(tasks),
                    "byStatus": by_status,
                    "byPriority": by_priority,
                    "overdue": overdue,
                    "perMember": per_member_list,
                }
            },
        }
    except Exception as e:
        print(f"[team] getTeamStats error: {str(e)}")
        return {"statusCode": 500, "body": {"error": str(e)}}


# =========================================================
#  NOTES  (text notes + PDF attachments, optional progress)
# =========================================================
def _strip_note(item):
    item = _clean(item)
    item.pop("pk", None)
    item.pop("sk", None)
    return item


def listNotes(params):
    try:
        resp = team_tasks_table.query(KeyConditionExpression=Key("pk").eq(NOTE_PK))
        notes = [_strip_note(i) for i in resp.get("Items", [])]
        notes.sort(key=lambda n: n.get("order", 0))
        return {"statusCode": 200, "body": {"notes": notes}}
    except Exception as e:
        print(f"[team] listNotes error: {str(e)}")
        return {"statusCode": 500, "body": {"error": str(e)}}


def createNote(params):
    try:
        params = params or {}
        title = (params.get("title") or "").strip()
        if not title:
            return {"statusCode": 400, "body": {"error": "Tiêu đề là bắt buộc."}}

        note_id = short_uuid()
        now = _now()
        order = params.get("order")
        if order is None:
            order = int(time.time() * 1000)

        item = {
            "pk": NOTE_PK,
            "sk": note_id,
            "note_id": note_id,
            "title": title,
            "content": params.get("content", ""),
            "pdfKey": params.get("pdfKey", ""),
            "pdfName": params.get("pdfName", ""),
            "showProgress": bool(params.get("showProgress", False)),
            "progress": _num(params.get("progress", 0)),
            "order": _num(order),
            "createdAt": now,
            "updatedAt": now,
        }
        team_tasks_table.put_item(Item=item)
        return {"statusCode": 200, "body": {"note": _strip_note(item)}}
    except Exception as e:
        print(f"[team] createNote error: {str(e)}")
        return {"statusCode": 500, "body": {"error": str(e)}}


_EDITABLE_NOTE_FIELDS = {
    "title", "content", "pdfKey", "pdfName", "showProgress", "progress", "order",
}


def updateNote(params):
    try:
        params = params or {}
        note_id = params.get("noteId")
        updates = params.get("updates") or {}
        if not note_id:
            return {"statusCode": 400, "body": {"error": "noteId là bắt buộc."}}

        set_parts = ["updatedAt = :ua"]
        names = {}
        values = {":ua": _now()}
        i = 0
        for key, val in updates.items():
            if key not in _EDITABLE_NOTE_FIELDS:
                continue
            i += 1
            ph, pv = f"#f{i}", f":v{i}"
            names[ph] = key
            if key == "progress" or key == "order":
                values[pv] = _num(val)
            elif key == "showProgress":
                values[pv] = bool(val)
            else:
                values[pv] = val
            set_parts.append(f"{ph} = {pv}")
        if len(set_parts) == 1:
            return {"statusCode": 400, "body": {"error": "Không có trường hợp lệ để cập nhật."}}

        resp = team_tasks_table.update_item(
            Key={"pk": NOTE_PK, "sk": note_id},
            UpdateExpression="SET " + ", ".join(set_parts),
            ExpressionAttributeNames=names,
            ExpressionAttributeValues=values,
            ReturnValues="ALL_NEW",
        )
        return {"statusCode": 200, "body": {"note": _strip_note(resp["Attributes"])}}
    except Exception as e:
        print(f"[team] updateNote error: {str(e)}")
        return {"statusCode": 500, "body": {"error": str(e)}}


def deleteNote(params):
    try:
        note_id = (params or {}).get("noteId")
        if not note_id:
            return {"statusCode": 400, "body": {"error": "noteId là bắt buộc."}}
        team_tasks_table.delete_item(Key={"pk": NOTE_PK, "sk": note_id})
        return {"statusCode": 200, "body": {"message": "Đã xoá ghi chú.", "noteId": note_id}}
    except Exception as e:
        print(f"[team] deleteNote error: {str(e)}")
        return {"statusCode": 500, "body": {"error": str(e)}}


def uploadNotePdf(params):
    """Upload a PDF (base64 data URL) to S3, return its key for later presigned viewing."""
    try:
        params = params or {}
        base64_data = params.get("base64")
        filename = (params.get("filename") or "document.pdf").strip()
        if not base64_data:
            return {"statusCode": 400, "body": {"error": "Thiếu dữ liệu PDF."}}

        safe_name = filename.replace("/", "_").replace("\\", "_")
        key = get_s3_key(f"team/notes/{short_uuid()}_{safe_name}")
        upload_to_s3(base64_data, S3_BUCKET, key, is_json=False)
        return {"statusCode": 200, "body": {"pdfKey": key, "pdfName": filename}}
    except Exception as e:
        print(f"[team] uploadNotePdf error: {str(e)}")
        return {"statusCode": 500, "body": {"error": str(e)}}


# =========================================================
#  SEED  (one-time Excel import, guarded)
# =========================================================
def seed_team_tasks(params):
    try:
        params = params or {}
        secret = params.get("secret")
        if not secret or secret != os.environ.get("SEED_SECRET"):
            return {"statusCode": 403, "body": {"error": "Forbidden."}}

        # idempotency: refuse if already seeded unless force
        existing = team_tasks_table.query(KeyConditionExpression=Key("pk").eq(TASK_PK))
        if existing.get("Items") and not params.get("force"):
            return {"statusCode": 409, "body": {"error": "Đã có dữ liệu. Dùng force=true để ghi đè."}}

        seeded_members = []
        name_to_id = {}
        for m in params.get("members", []):
            r = createMember(m)
            if r["statusCode"] == 200:
                mem = r["body"]["member"]
                seeded_members.append(mem)
                name_to_id[mem["name"].strip().lower()] = mem["member_id"]

        seeded_tasks = []
        for t in params.get("tasks", []):
            t = dict(t)
            assignee_name = (t.pop("assigneeName", "") or "").strip().lower()
            if assignee_name and assignee_name in name_to_id:
                t["assigneeId"] = name_to_id[assignee_name]
            r = createTask(t)
            if r["statusCode"] == 200:
                seeded_tasks.append(r["body"]["task"]["code"])

        return {
            "statusCode": 200,
            "body": {
                "seededMembers": len(seeded_members),
                "seededTasks": len(seeded_tasks),
                "codes": seeded_tasks,
            },
        }
    except Exception as e:
        print(f"[team] seed error: {str(e)}")
        return {"statusCode": 500, "body": {"error": str(e)}}
