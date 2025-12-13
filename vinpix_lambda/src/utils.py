# utils.py
import json
import boto3
import uuid
import base64
import time
from decimal import Decimal
import os

dynamodb = boto3.resource('dynamodb')


user_admin_table = dynamodb.Table('sb_admin_users')
# Vinpix Admin Table: vinpix_admin
# PK: uid (String) - Unique identifier for admin user
# GSI: email-index (PK: email) - For querying by email
# Fields:
#   - uid: String (Primary Key)
#   - email: String (Indexed, unique)
#   - passwordHash: String (SHA256 hashed password)
#   - displayName: String
#   - status: String (active/inactive)
#   - createdAt: String (ISO 8601 format)
#   - lastActive: String (ISO 8601 format)
vinpix_admin_table = dynamodb.Table('vinpix_admin')

user_table = dynamodb.Table('sb_user')
question_set_table = dynamodb.Table('sb_question_set')
collection_table = dynamodb.Table('sb_question_set_collections')
orders_table = 'sb_orders' #status-createAt-index

# Add study session tables
study_session_table = dynamodb.Table('sb_study_sessions') #PK user_id #SK session_id #GSI total_study_time-user_id-index (PK total_study_time SK user_id)
user_study_summary_table = dynamodb.Table('user_study_summary_table') #PK period  #SK user_id #GSI period-total_study_time-index (PK period SK total_study_time)
discount_table = dynamodb.Table('sb-discount') #PK code
sb_user_collections = dynamodb.Table('sb_user_collections') #PK user_id #SK collection_id #Fields: user_id, collection_id, purchased_at, created_at
ref_table = dynamodb.Table('sb_ref')

# Re-enable metrics table for analytics functions
metrics_table = dynamodb.Table('sb_metrics_daily') #PK:organizationId SK:date and Index planId-date-index, category-date-index,
sb_question_stats = dynamodb.Table('sb_question_stats') #PK bucket, SK question_id, GSI1: bucket-wrongCount-index

# Bundle tables
bundles_table = dynamodb.Table('sb_bundles') #PK id, GSI1: status-created_at-index
bundle_collections_table = dynamodb.Table('sb_bundle_collections') #PK bundle_id, SK collection_id
sb_user_bundles = dynamodb.Table('sb_user_bundles') #PK user_id, SK bundle_id

# FAQ tables
faq_table = dynamodb.Table('sb_cskh') #PK: section_name, SK: item_type_item_id (values: SECTION#METADATA or FAQ#{faq_id})

# Smart Chat Tables
smart_chat_sessions_table = dynamodb.Table('sb_smart_chat_sessions') #PK: userId, SK: sessionId

contract_table = dynamodb.Table('vinpix_contract') #PK: contract_id, SK: created_at

k = 'k103@account'
S3_BUCKET = 'springboard2025'
S3_BUCKET_PREFIX = 'vinpixstudio'

BANK_NAME = "TPBank"
ACCOUNT_NUMBER = "10000881426"
ACCOUNT_USER_NAME = "TRAN PHAN HA MY"
PAYMENT_KEY = os.environ.get('paymentKey')
OPENAI_KEY = os.environ.get('openAIKey')

def get_s3_key(path: str) -> str:
    
    """
    Generate S3 key with spring_board prefix to ensure all objects are organized under the root folder.
    
    Args:
        path (str): The relative path for the S3 object
    
    Returns:
        str: Full S3 key with spring_board prefix
    """
    # Remove leading slash if present to avoid double slashes
    path = path.lstrip('/')
    return f"{S3_BUCKET_PREFIX}/{path}"

def short_uuid():
    # Generate a UUID4 and encode it in Base64
    u = uuid.uuid4()
    b64 = base64.urlsafe_b64encode(u.bytes).rstrip(b'=').decode('ascii')
    return b64

def convert_sets_to_lists(obj):
    if isinstance(obj, set):
        return list(obj)
    elif isinstance(obj, dict):
        return {k: convert_sets_to_lists(v) for k, v in obj.items()}
    elif isinstance(obj, list):
        return [convert_sets_to_lists(i) for i in obj]
    return obj
