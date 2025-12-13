import json
import boto3
import time
import uuid
import base64
from src.utils import smart_chat_sessions_table, S3_BUCKET, get_s3_key
import src.s3helper as s3helper
import src.aiService as ai
from boto3.dynamodb.conditions import Key

def create_session(user_id, title="New Chat", model="gemini-3-pro-preview", folder_id=None):
    """
    Creates a new smart chat session.
    - Creates a metadata record in DynamoDB.
    - Creates an initial empty chat tree JSON in S3.
    """
    try:
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
            item['folderId'] = folder_id

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
    Retrieves a list of smart chat sessions and folders for a user from DynamoDB.
    """
    try:
        query_params = {
            'KeyConditionExpression': Key('userId').eq(user_id),
            'ScanIndexForward': False, # Sort by Sort Key (sessionId) - this might not be strictly time-ordered if UUID. 
                                       # Ideally, we should use a GSI with createdAt/updatedAt if strict time ordering is needed.
                                       # For now, UUIDs are not time-ordered. 
                                       # TODO: Add GSI for userId-updatedAt-index for proper sorting.
            'Limit': limit
        }
        
        if last_key:
            query_params['ExclusiveStartKey'] = last_key

        response = smart_chat_sessions_table.query(**query_params)
        
        items = response.get('Items', [])
        last_evaluated_key = response.get('LastEvaluatedKey')
        
        # Sort in memory by updatedAt if not too many items, or rely on client side sorting.
        # Since we query by PK only, and SK is UUID, order is random-ish.
        # Let's sort by updatedAt descending here.
        items.sort(key=lambda x: x.get('updatedAt', 0), reverse=True)

        return {
            'statusCode': 200,
            'body': {
                'sessions': items,
                'lastKey': last_evaluated_key
            }
        }
    except Exception as e:
        print(f"Error getting smart chat sessions: {str(e)}")
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
    """
    try:
        # Save to S3
        s3_key = get_s3_key(f"smart_chat/{user_id}/{session_id}.json")
        s3helper.upload_to_s3(tree_data, S3_BUCKET, s3_key, is_json=True)
        
        # Update DynamoDB
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

        smart_chat_sessions_table.update_item(
            Key={'userId': user_id, 'sessionId': session_id},
            UpdateExpression=update_exp,
            ExpressionAttributeValues=exp_attr_values
        )
        
        return {
            'statusCode': 200,
            'body': {'success': True}
        }
    except Exception as e:
        print(f"Error saving session state: {str(e)}")
        return {
            'statusCode': 500,
            'body': {
                'error': f'Failed to save session state: {str(e)}'
            }
        }

def delete_session(user_id, session_id):
    """
    Deletes a session from DynamoDB and S3.
    """
    try:
        # Delete from DynamoDB
        smart_chat_sessions_table.delete_item(
            Key={'userId': user_id, 'sessionId': session_id}
        )
        
        # Delete from S3
        s3_key = get_s3_key(f"smart_chat/{user_id}/{session_id}.json")
        try:
            s3helper.delete_from_s3(S3_BUCKET, s3_key)
        except Exception as e:
            print(f"Warning: Failed to delete S3 file: {str(e)}")
            
        # Delete image folder from S3
        image_folder = get_s3_key(f"smart_chat_uploads/{user_id}/{session_id}/")
        try:
            s3helper.delete_folder_from_s3(S3_BUCKET, image_folder)
        except Exception as e:
            print(f"Warning: Failed to delete image folder: {str(e)}")
        
        return {
            'statusCode': 200,
            'body': {'success': True}
        }
    except Exception as e:
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
        # 1. Get all sessions/items for user to find those in this folder
        # Note: In a production app with many items, a GSI on folderId would be better.
        response = smart_chat_sessions_table.query(
            KeyConditionExpression=Key('userId').eq(user_id)
        )
        items = response.get('Items', [])
        
        # 2. Update items in this folder to move to root
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
