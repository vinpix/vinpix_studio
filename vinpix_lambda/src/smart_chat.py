import json
import boto3
import time
import uuid
import base64
from src.utils import smart_chat_sessions_table, S3_BUCKET, get_s3_key
import src.s3helper as s3helper
import src.aiService as ai
from boto3.dynamodb.conditions import Key

# Dedicated per-user counter item used to allocate unique "New Chat N" numbers.
# Stored in the sessions table under a sentinel sessionId; filtered out of get_sessions.
NEW_CHAT_COUNTER_SK = '__new_chat_counter__'


def _next_new_chat_number(user_id):
    """
    Atomically allocate a unique, monotonically increasing chat number for a user.

    Uses DynamoDB's atomic ADD on a dedicated counter item, so concurrent creates
    (e.g. multiple members of the shared /team workspace) can never receive the
    same number. Numbers are never reused after a delete (gaps are fine) — the
    only guarantee is uniqueness.
    """
    resp = smart_chat_sessions_table.update_item(
        Key={'userId': user_id, 'sessionId': NEW_CHAT_COUNTER_SK},
        UpdateExpression='ADD #seq :one',
        ExpressionAttributeNames={'#seq': 'seq'},
        ExpressionAttributeValues={':one': 1},
        ReturnValues='UPDATED_NEW'
    )
    return int(resp['Attributes']['seq'])


def create_session(user_id, title="New Chat", model="gemini-3-pro-preview", folder_id=None):
    """
    Creates a new smart chat session.
    - Creates a metadata record in DynamoDB.
    - Creates an initial empty chat tree JSON in S3.
    """
    try:
        # Input Validation
        if not title:
            title = "New Chat"

        # Default (unnamed) chats get a unique number: "New Chat 1", "New Chat 2"...
        # Allocated atomically so concurrent creates never collide.
        if title == "New Chat":
            try:
                title = f"New Chat {_next_new_chat_number(user_id)}"
            except Exception as e:
                print(f"Warning: failed to allocate chat number, using plain title: {str(e)}")

        if len(title) > 200:
            title = title[:200]
            
        allowed_models = [
            "gemini-3.0-pro",
            "gemini-2.5-flash",
            "gemini-2.5-pro",
            "gemini-3-pro-preview" # Legacy support
        ]
        
        if model not in allowed_models:
            # Fallback to default if invalid model
            print(f"Warning: Invalid model '{model}' requested. Using default.")
            model = "gemini-3.0-pro"

        session_id = str(uuid.uuid4())
        timestamp = int(time.time() * 1000)
        
        # Initial tree structure
        initial_tree = {
            "sessionId": session_id,
            "rootNodeId": None,
            "currentNodeId": None,
            "nodes": {}
        }
        
        # Save initial tree to S3
        s3_key = get_s3_key(f"smart_chat/{user_id}/{session_id}.json")
        s3helper.upload_to_s3(initial_tree, S3_BUCKET, s3_key, is_json=True)
        
        # Save metadata to DynamoDB
        item = {
            'userId': user_id,
            'sessionId': session_id,
            'title': title,
            'createdAt': timestamp,
            'updatedAt': timestamp,
            'model': model,
            'lastMessage': '',
            'type': 'chat'
        }
        
        if folder_id:
            # Validate folder_id format (simple check)
            if isinstance(folder_id, str) and len(folder_id) < 100:
                 item['folderId'] = folder_id
            else:
                print(f"Warning: Invalid folder_id provided: {folder_id}")

        smart_chat_sessions_table.put_item(Item=item)
        
        return {
            'statusCode': 200,
            'body': {
                'success': True,
                'session': item,
                'tree': initial_tree
            }
        }
    except Exception as e:
        print(f"Error creating smart chat session: {str(e)}")
        return {
            'statusCode': 500,
            'body': {
                'error': f'Failed to create session: {str(e)}'
            }
        }

def get_sessions(user_id, limit=50, last_key=None):
    """
    Retrieves a user's smart chat sessions and folders, ordered by most-recent.

    The sort key (sessionId) is a random UUID, NOT time-ordered. So we CANNOT
    use a DynamoDB Limit to get "the N most recent" — Limit caps the page before
    any ordering, which could drop a freshly created chat entirely. Instead we
    page the whole partition, sort by updatedAt, and only then slice to `limit`.
    This guarantees a just-created chat (newest updatedAt) is always returned.

    Scale note: fine for the hundreds-of-sessions range this app sees. For very
    large partitions, add a GSI on (userId, updatedAt) and query it directly.
    """
    try:
        # Page the entire partition (a single query() returns at most 1MB).
        items = []
        scan_key = None
        while True:
            query_params = {'KeyConditionExpression': Key('userId').eq(user_id)}
            if scan_key:
                query_params['ExclusiveStartKey'] = scan_key
            response = smart_chat_sessions_table.query(**query_params)
            items.extend(response.get('Items', []))
            scan_key = response.get('LastEvaluatedKey')
            if not scan_key:
                break

        # Drop the internal counter sentinel — it's not a real session.
        items = [it for it in items if it.get('sessionId') != NEW_CHAT_COUNTER_SK]

        # Sort newest-first, THEN apply the visible limit.
        items.sort(key=lambda x: x.get('updatedAt', 0), reverse=True)
        if limit and limit > 0:
            items = items[:limit]

        print(f"[get_sessions] Retrieved and sorted {len(items)} sessions for user {user_id}")

        return {
            'statusCode': 200,
            'body': {
                'sessions': items,
                'lastKey': None  # Full partition is read+sorted server-side; no cursor needed.
            }
        }
    except Exception as e:
        print(f"[get_sessions] Error getting smart chat sessions: {str(e)}")
        return {
            'statusCode': 500,
            'body': {
                'error': f'Failed to get sessions: {str(e)}'
            }
        }

def get_session_detail(user_id, session_id):
    """
    Retrieves the full chat tree from S3 for a specific session.
    Also returns the metadata from DynamoDB.
    """
    try:
        # Get metadata
        response = smart_chat_sessions_table.get_item(
            Key={'userId': user_id, 'sessionId': session_id}
        )
        metadata = response.get('Item')
        
        if not metadata:
            return {
                'statusCode': 404,
                'body': {'error': 'Session not found'}
            }
            
        # Get S3 data
        s3_key = get_s3_key(f"smart_chat/{user_id}/{session_id}.json")
        try:
            s3_data = s3helper.read_from_s3(S3_BUCKET, s3_key)
            if isinstance(s3_data, str):
                tree_data = json.loads(s3_data)
            else:
                tree_data = s3_data
        except Exception as s3_error:
            # If S3 file is missing but DB record exists, return empty tree
            print(f"S3 file missing for session {session_id}: {str(s3_error)}")
            tree_data = {
                "sessionId": session_id,
                "rootNodeId": None,
                "currentNodeId": None,
                "nodes": {}
            }

        return {
            'statusCode': 200,
            'body': {
                'metadata': metadata,
                'tree': tree_data if metadata.get('type') != 'moodboard' else None,
                'moodboard': tree_data if metadata.get('type') == 'moodboard' else None
            }
        }
    except Exception as e:
        print(f"Error getting session detail: {str(e)}")
        return {
            'statusCode': 500,
            'body': {
                'error': f'Failed to get session detail: {str(e)}'
            }
        }

def save_session_state(user_id, session_id, tree_data, last_message_preview=None, new_title=None, current_model=None, style_id=None, thinking_steps=None):
    """
    Saves the updated chat tree to S3 and updates metadata in DynamoDB.
    Implements transaction-like behavior with rollback on failure.
    """
    s3_key = get_s3_key(f"smart_chat/{user_id}/{session_id}.json")
    s3_backup_key = None
    s3_backup_data = None
    
    try:
        # Step 1: Backup existing S3 data (if exists) for rollback
        try:
            s3_backup_data = s3helper.read_from_s3(S3_BUCKET, s3_key)
            s3_backup_key = s3_key
            print(f"[save_session_state] Backed up existing S3 data for session {session_id}")
        except Exception as backup_error:
            # File might not exist yet, which is fine for new sessions
            print(f"[save_session_state] No existing S3 file to backup (new session?): {str(backup_error)}")
        
        # Step 2: Save to S3
        try:
            s3helper.upload_to_s3(tree_data, S3_BUCKET, s3_key, is_json=True)
            print(f"[save_session_state] Successfully saved to S3: {s3_key}")
        except Exception as s3_error:
            print(f"[save_session_state] S3 upload failed: {str(s3_error)}")
            raise Exception(f"Failed to upload to S3: {str(s3_error)}")
        
        # Step 3: Update DynamoDB
        update_exp = "set updatedAt = :t"
        exp_attr_values = {':t': int(time.time() * 1000)}
        exp_attr_names = {}
        
        if last_message_preview is not None:
            update_exp += ", lastMessage = :m"
            exp_attr_values[':m'] = last_message_preview
            
        if new_title:
            update_exp += ", title = :title"
            exp_attr_values[':title'] = new_title
            
        if current_model:
            update_exp += ", model = :model"
            exp_attr_values[':model'] = current_model
            
        if style_id is not None:
            update_exp += ", styleId = :s"
            exp_attr_values[':s'] = style_id
            
        if thinking_steps is not None:
            update_exp += ", thinkingSteps = :ts"
            exp_attr_values[':ts'] = thinking_steps

        try:
            smart_chat_sessions_table.update_item(
                Key={'userId': user_id, 'sessionId': session_id},
                UpdateExpression=update_exp,
                ExpressionAttributeValues=exp_attr_values
            )
            print(f"[save_session_state] Successfully updated DynamoDB for session {session_id}")
        except Exception as dynamo_error:
            print(f"[save_session_state] DynamoDB update failed: {str(dynamo_error)}")
            
            # ROLLBACK: Restore S3 backup if DynamoDB fails
            if s3_backup_key and s3_backup_data:
                try:
                    s3helper.upload_to_s3(s3_backup_data, S3_BUCKET, s3_backup_key, is_json=True)
                    print(f"[save_session_state] Rolled back S3 to backup")
                except Exception as rollback_error:
                    print(f"[save_session_state] CRITICAL: Rollback failed: {str(rollback_error)}")
            
            raise Exception(f"Failed to update DynamoDB: {str(dynamo_error)}")
        
        return {
            'statusCode': 200,
            'body': {'success': True}
        }
    except Exception as e:
        print(f"[save_session_state] Error saving session state: {str(e)}")
        return {
            'statusCode': 500,
            'body': {
                'error': f'Failed to save session state: {str(e)}'
            }
        }

def delete_session(user_id, session_id):
    """
    Deletes a session from S3 and DynamoDB.

    Order matters: S3 resources are deleted FIRST, and only if they all succeed
    is the DynamoDB metadata record removed. This guarantees no orphaned S3
    objects — if an S3 delete fails the DB row survives, the session stays
    visible, and the client can retry the delete (idempotent).
    """
    try:
        # Chat/moodboard tree JSON. delete_objects accepts a key list and is
        # idempotent (no error if the object is already gone).
        s3_key = get_s3_key(f"smart_chat/{user_id}/{session_id}.json")
        s3helper.delete_objects_from_s3(S3_BUCKET, [s3_key])

        # All uploaded + AI-generated + moodboard images live under this prefix.
        image_folder = get_s3_key(f"smart_chat_uploads/{user_id}/{session_id}/")
        s3helper.delete_folder_from_s3(S3_BUCKET, image_folder)

        # S3 is clean — now drop the metadata pointer.
        smart_chat_sessions_table.delete_item(
            Key={'userId': user_id, 'sessionId': session_id}
        )

        return {
            'statusCode': 200,
            'body': {'success': True}
        }
    except Exception as e:
        print(f"Error deleting session {session_id}: {str(e)}")
        return {
            'statusCode': 500,
            'body': {
                'error': f'Failed to delete session: {str(e)}'
            }
        }

def rename_chat_session(user_id, session_id, new_title):
    """
    Updates just the title of a session. A wrapper for update_session_title.
    """
    return update_session_title(user_id, session_id, new_title)

def update_session_title(user_id, session_id, title):
    """
    Updates just the title of a session.
    """
    try:
        smart_chat_sessions_table.update_item(
            Key={'userId': user_id, 'sessionId': session_id},
            UpdateExpression="set title = :t, updatedAt = :u",
            ExpressionAttributeValues={
                ':t': title,
                ':u': int(time.time() * 1000)
            }
        )
        return {
            'statusCode': 200,
            'body': {'success': True}
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': {
                'error': f'Failed to update title: {str(e)}'
            }
        }

def create_folder(user_id, title):
    """
    Creates a new folder for smart chat sessions.
    """
    try:
        folder_id = str(uuid.uuid4())
        timestamp = int(time.time() * 1000)
        item = {
            'userId': user_id,
            'sessionId': folder_id,
            'title': title,
            'createdAt': timestamp,
            'updatedAt': timestamp,
            'type': 'folder'
        }
        smart_chat_sessions_table.put_item(Item=item)
        return {
            'statusCode': 200,
            'body': {
                'success': True,
                'folder': item
            }
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': {
                'error': f'Failed to create folder: {str(e)}'
            }
        }

def update_session_folder(user_id, session_id, folder_id):
    """
    Moves a session or folder into another folder (or root if folder_id is None).
    """
    try:
        key = {'userId': user_id, 'sessionId': session_id}
        
        if folder_id:
            update_exp = "set folderId = :f, updatedAt = :t"
            exp_vals = {':f': folder_id, ':t': int(time.time() * 1000)}
        else:
            update_exp = "remove folderId set updatedAt = :t"
            exp_vals = {':t': int(time.time() * 1000)}
            
        smart_chat_sessions_table.update_item(
            Key=key,
            UpdateExpression=update_exp,
            ExpressionAttributeValues=exp_vals
        )
        return {
            'statusCode': 200,
            'body': {'success': True}
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': {
                'error': f'Failed to update session folder: {str(e)}'
            }
        }

def delete_folder(user_id, folder_id):
    """
    Deletes a folder and moves all its contents to root.
    """
    try:
        # 1. Get ALL items for the user (paginated). A single query() returns at
        # most 1MB; without the LastEvaluatedKey loop, children on page 2+ would
        # be skipped and left with a folderId pointing at a deleted folder.
        # Note: a GSI on (userId, folderId) would let us query only the children.
        items = []
        last_key = None
        while True:
            query_params = {'KeyConditionExpression': Key('userId').eq(user_id)}
            if last_key:
                query_params['ExclusiveStartKey'] = last_key
            response = smart_chat_sessions_table.query(**query_params)
            items.extend(response.get('Items', []))
            last_key = response.get('LastEvaluatedKey')
            if not last_key:
                break

        # 2. Move every child of this folder back to root. Done BEFORE deleting
        # the folder so a failure mid-loop leaves the folder (and its children)
        # intact and retryable.
        for item in items:
            if item.get('folderId') == folder_id:
                smart_chat_sessions_table.update_item(
                    Key={'userId': user_id, 'sessionId': item['sessionId']},
                    UpdateExpression="remove folderId set updatedAt = :t",
                    ExpressionAttributeValues={':t': int(time.time() * 1000)}
                )

        # 3. Delete the folder itself
        smart_chat_sessions_table.delete_item(
            Key={'userId': user_id, 'sessionId': folder_id}
        )
        
        return {
            'statusCode': 200,
            'body': {'success': True}
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': {
                'error': f'Failed to delete folder: {str(e)}'
            }
        }

def create_moodboard(user_id, title="New Moodboard"):
    """
    Creates a new moodboard session.
    """
    try:
        session_id = str(uuid.uuid4())
        timestamp = int(time.time() * 1000)
        
        # Initial moodboard data
        moodboard_data = {
            "sessionId": session_id,
            "images": [], # List of {key, url(temp), name}
            "styleDescription": ""
        }
        
        # Save to S3
        s3_key = get_s3_key(f"smart_chat/{user_id}/{session_id}.json")
        s3helper.upload_to_s3(moodboard_data, S3_BUCKET, s3_key, is_json=True)
        
        # Save metadata
        item = {
            'userId': user_id,
            'sessionId': session_id,
            'title': title,
            'createdAt': timestamp,
            'updatedAt': timestamp,
            'type': 'moodboard',
            'lastMessage': '' 
        }
        
        smart_chat_sessions_table.put_item(Item=item)
        
        return {
            'statusCode': 200,
            'body': {
                'success': True,
                'session': item,
                'data': moodboard_data
            }
        }
    except Exception as e:
        return {'statusCode': 500, 'body': {'error': str(e)}}

def update_moodboard(user_id, session_id, images=None, style_description=None, title=None):
    """
    Updates moodboard content (images list, style text, or title).
    """
    try:
        s3_key = get_s3_key(f"smart_chat/{user_id}/{session_id}.json")
        current_data = s3helper.read_from_s3(S3_BUCKET, s3_key)
        if isinstance(current_data, str):
            current_data = json.loads(current_data)
            
        if images is not None:
            current_data['images'] = images
        if style_description is not None:
            current_data['styleDescription'] = style_description
            
        s3helper.upload_to_s3(current_data, S3_BUCKET, s3_key, is_json=True)
        
        # Update DynamoDB
        update_exp = "set updatedAt = :t"
        exp_attr_values = {':t': int(time.time() * 1000)}
        
        if title:
            update_exp += ", title = :title"
            exp_attr_values[':title'] = title
            
        smart_chat_sessions_table.update_item(
            Key={'userId': user_id, 'sessionId': session_id},
            UpdateExpression=update_exp,
            ExpressionAttributeValues=exp_attr_values
        )
        
        return {'statusCode': 200, 'body': {'success': True}}
    except Exception as e:
        return {'statusCode': 500, 'body': {'error': str(e)}}

def analyze_moodboard(user_id, session_id):
    """
    Analyzes images in the moodboard and updates style description.
    """
    try:
        s3_key = get_s3_key(f"smart_chat/{user_id}/{session_id}.json")
        data = s3helper.read_from_s3(S3_BUCKET, s3_key)
        if isinstance(data, str):
            data = json.loads(data)
            
        images = data.get('images', [])
        if not images:
            return {'statusCode': 400, 'body': {'error': 'No images to analyze'}}
            
        # Collect base64 for images
        s3 = boto3.client('s3')
        base64_images = []
        for img in images:
            if img.get('key'):
                # Read from S3
                try:
                    obj = s3.get_object(Bucket=S3_BUCKET, Key=img['key'])
                    img_bytes = obj['Body'].read()
                    b64 = base64.b64encode(img_bytes).decode('utf-8')
                    base64_images.append(b64)
                except Exception as e:
                    print(f"Failed to read image {img['key']}: {e}")
                    
        if not base64_images:
            return {'statusCode': 400, 'body': {'error': 'Failed to load images'}}
            
        # Call AI
        style_desc = ai.analyze_style_from_images(base64_images)
        
        if isinstance(style_desc, dict) and 'error' in style_desc:
            return {'statusCode': 500, 'body': style_desc}
            
        # Update S3
        data['styleDescription'] = style_desc
        s3helper.upload_to_s3(data, S3_BUCKET, s3_key, is_json=True)
        
        return {
            'statusCode': 200, 
            'body': {
                'success': True,
                'styleDescription': style_desc
            }
        }
    except Exception as e:
        return {'statusCode': 500, 'body': {'error': str(e)}}
