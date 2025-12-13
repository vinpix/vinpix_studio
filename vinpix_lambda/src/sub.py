from .utils import *
import json
import boto3
from botocore.exceptions import ClientError
import time
from . import telegram as telegram

def decryptItemInfo(itemInfo):
    try:
        # Expect plaintext JSON string; parse directly
        if isinstance(itemInfo, str):
            item_info_dict = json.loads(itemInfo)
        elif isinstance(itemInfo, dict):
            item_info_dict = itemInfo
        else:
            raise ValueError("Invalid itemInfo format")

        # Return fields as-is (no encryption/decryption)
        return {
            'subId': item_info_dict.get('subId'),
            'transactionId': item_info_dict.get('transactionId'),
            'purchaseToken': item_info_dict.get('purchaseToken'),
            'purchaseDate': item_info_dict.get('purchaseDate'),
            'expirationDate': item_info_dict.get('expirationDate'),
        }
    except Exception as e:
        # Handle JSON parsing errors
        raise ValueError(f"Failed to parse item info: {e}")

def activateReceipt(uid, platform,itemInfo):
    decrypted_info = decryptItemInfo(itemInfo)
    itemId = decrypted_info['subId']
    message = f"User {uid} activated subscription {itemId} platform {platform}"
    return telegram.send_message(message)

def isSubValid(userId, platform, itemInfo):
    try:
        # Decrypt the item information
        decrypted_info = decryptItemInfo(itemInfo)
        
        # Get the current time in milliseconds since epoch
        current_time_ms = int(time.time() * 1000)
        
        # Extract and convert expirationDate to integer if it's a string
        expiration_date = decrypted_info.get('expirationDate')
        if isinstance(expiration_date, str):
            expiration_date = int(expiration_date)
        elif isinstance(expiration_date, float):
            expiration_date = int(expiration_date)
        elif not isinstance(expiration_date, int):
            raise ValueError("Invalid expirationDate format")
        
        # Check if the subscription is still valid
        if expiration_date > current_time_ms:         
            return {
                'statusCode': 200,
            }
        else:
            return {
                'statusCode': 400,
                'body': 'Subscription expired'
            }
    except Exception as e:
        # Handle any unexpected errors
        return {
            'statusCode': 500,
            'body': f"Error validating subscription: {e}"
        }

def updateReceiptCache(userId, platform, itemInfo):
    try:
        # Update the 'receipt' field in the user_table for the given userId
        response = user_table.update_item(
            Key={
                'uid': userId  # Replace with your primary key attribute
            },
            UpdateExpression="set receipt = :r",
            ExpressionAttributeValues={
                ':r': itemInfo
            },
            ReturnValues="UPDATED_NEW"
        )
        
        return {
            'statusCode': 200,
            'body': 'Update successful',
            'updatedAttributes': response.get('Attributes', {})
        }
    except ClientError as e:
        # Handle DynamoDB client errors
        return {
            'statusCode': 500,
            'body': f"DynamoDB error: {e.response['Error']['Message']}"
        }
    except Exception as e:
        # Handle other exceptions
        return {
            'statusCode': 500,
            'body': f"Unexpected error: {e}"
        }
