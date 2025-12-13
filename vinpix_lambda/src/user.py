from .utils import *
import boto3
from src.bundle import get_bundle_by_id
import re
import json
import base64
import csv
import io
from decimal import Decimal
from boto3.dynamodb.conditions import Key, Attr
import random
import uuid
import time
from botocore.exceptions import ClientError
from datetime import datetime  # Import the datetime class directly

def createUser(params):
    """
    Create a new user account in the system.
    
    Args:
        params (dict): Dictionary containing user creation parameters
            - email (str): User's email address
            - fuid (str): Firebase/Supabase user ID
            - displayName (str, optional): User's display name
            - avatarUrl (str, optional): User's avatar URL
            - languageCode (str, optional): User's preferred language (default: 'en')
            - countryCode (str, optional): User's country code (default: 'US')
            
    Returns:
        dict: Response with created user data and tempToken
    """
    try:
        uid = short_uuid()
        userEmail = params.get('email', '')
        fuid = params.get('fuid', 'None')
        displayName = params.get('displayName', '')
        avatarUrl = params.get('avatarUrl', '')
        gender = ''
        tempToken = short_uuid()
        languageCode = params.get('languageCode', 'en')
        countryCode = params.get('countryCode', 'US')

        createdAt = datetime.utcnow().isoformat() + 'Z'  # Adding 'Z' to indicate UTC time
        
        newAuth = {
            'email': userEmail,
            'tempToken': tempToken,
        }
        
        newUser = {
            'uid': uid,
            'authData': newAuth,
            'createAt': createdAt,
            'fuid': fuid,
            'isInitExample': False,
            'languageCode': languageCode,
            'countryCode': countryCode,
            'cart': [],  # Initialize empty cart for storing collection IDs
        }
        
        # Add optional user metadata if provided
        if displayName:
            newUser['displayName'] = displayName
        if avatarUrl:
            newUser['avatarUrl'] = avatarUrl
            
        # Initialize user statistics
        newUser['login_streak'] = {
            'last_login': createdAt,
            'current_streak': 0,
            'max_streak': 0
        }
        newUser['total_login_days'] = 0
        
        user_table.put_item(Item=newUser)
        
        print(f"Created new user: {uid}, email: {userEmail}, fuid: {fuid}")
        
        return {
            'statusCode': 200, 
            'body': {
                'userData': newUser,
                'tempToken': tempToken,
            }
        }
        
    except Exception as e:
        print(f"Error creating user: {str(e)}")
        return {
            'statusCode': 500,
            'body': f'Failed to create user: {str(e)}'
        }

def add_additional_info(uid: str, additionalInfo: dict) -> dict:
    """
    Adds or updates the 'additionalInfo' field for a specified user in the DynamoDB user_table.

    Args:
        uid (str): The unique identifier of the user.
        additionalInfo (dict): A dictionary containing the additional information to add.

    Returns:
        dict: A response dictionary containing:
              - statusCode (int): HTTP-like status code.
              - body (str or dict): Details about the operation or error messages.
    """
    # Input Validation
    if not uid or not uid.strip():
        return {
            'statusCode': 400,
            'body': 'Parameter "uid" is required and cannot be empty.'
        }
    
    if not isinstance(additionalInfo, dict):
        return {
            'statusCode': 400,
            'body': 'Parameter "additionalInfo" must be a dictionary.'
        }

    try:
        # Step 1: Check if the user exists
        response = user_table.get_item(
            Key={'uid': uid},
            ProjectionExpression='uid'
        )
        
        if 'Item' not in response:
            return {
                'statusCode': 404,
                'body': 'User with the provided uid does not exist.'
            }
        
        # Step 2: Update the user's additionalInfo field
        user_table.update_item(
            Key={'uid': uid},
            UpdateExpression='SET additionalInfo = :info',
            ExpressionAttributeValues={
                ':info': additionalInfo
            },
            ReturnValues='UPDATED_NEW'
        )
        
        return {
            'statusCode': 200,
            'body': {
                'message': f'Successfully added/updated additionalInfo for user {uid}.',
                'additionalInfo': additionalInfo
            }
        }
    
    except ClientError as e:
        error_code = e.response['Error']['Code']
        error_message = e.response['Error']['Message']
        
        return {
            'statusCode': 500,
            'body': {
                'message': 'Failed to add/update additionalInfo.',
                'error': error_message
            }
        }
    
    except Exception as e:
        return {
            'statusCode': 500,
            'body': {
                'message': 'An unexpected error occurred while adding/updating additionalInfo.',
                'error': str(e)
            }
        }

def get_additional_info(uid: str) -> dict:
    """
    Retrieves only the 'additionalInfo' field for a specified user.

    Args:
        uid (str): The unique identifier of the user.

    Returns:
        dict: A response dictionary containing statusCode and body with 'additionalInfo' map.
              If user not found returns 404. If field missing returns empty object.
    """
    if not uid or not uid.strip():
        return {
            'statusCode': 400,
            'body': 'Parameter "uid" is required and cannot be empty.'
        }

    try:
        response = user_table.get_item(
            Key={'uid': uid},
            ProjectionExpression='additionalInfo'
        )
        if 'Item' not in response:
            return {
                'statusCode': 404,
                'body': 'User with the provided uid does not exist.'
            }

        item = response.get('Item', {})
        additional = item.get('additionalInfo') or {}
        return {
            'statusCode': 200,
            'body': {
                'additionalInfo': additional
            }
        }
    except ClientError as e:
        return {
            'statusCode': 500,
            'body': {
                'message': 'Failed to retrieve additionalInfo.',
                'error': e.response['Error']['Message']
            }
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': {
                'message': 'An unexpected error occurred while retrieving additionalInfo.',
                'error': str(e)
            }
        }

def loginUsingTempToken(uid, token):
    response = user_table.get_item(
                Key={'uid': uid},
                ProjectionExpression='authData'
            )
    
    # Check if the user exists
    if 'Item' not in response:
        return {
            'statusCode': 404,
            'body': 'user_not_exist'
        }
    item = response.get('Item')
    if not item:
        return {
            'statusCode': 404,
            'body':  'user_not_exist'
        }

    if(token != item['authData'].get('tempToken', '')):
        return {
            'statusCode': 404,
            'body':  'token_not_correct'
        }
    return getUser(uid)

def getRefRes(uid):
    return _getUser(uid,'addRefRes')

def getUser(uid):
    return _getUser(uid, 'uid,firstInit,isInitExample,gender,pinStyle,age,cart')

def loginUsingAuth(token, gmail, fuid, displayName='', avatarUrl=''): 
    """
    Login or create user using authentication details (Google OAuth, email, etc.)
    If user doesn't exist, automatically creates a new account.
    
    Args:
        token (str): Authentication token (currently unused but kept for future use)
        gmail (str): User's email address
        fuid (str): Firebase/Supabase user ID
        
    Returns:
        dict: Response with user data and authentication state
    """
    try:
        # Input validation
        if not fuid:
            return {
                'statusCode': 400,
                'body': 'fuid is required and cannot be empty.'
            }
        if fuid == 'None':
            return {
                'statusCode': 400,
                'body': 'fuid is invalid'
            }
        if not gmail:
            return {
                'statusCode': 400,
                'body': 'email is required and cannot be empty.'
            }
            
        # Define the index name
        index_name = 'fuid-index'

        # Query the user table for the connection ID
        response = user_table.query(
            IndexName=index_name,
            KeyConditionExpression=boto3.dynamodb.conditions.Key('fuid').eq(fuid)
        )
        
        # Extract items and userId
        items = response.get('Items', [])

        if not items:
            # User doesn't exist - create new account
            print(f"Creating new user account for email: {gmail}, fuid: {fuid}")
            
            # Use metadata provided from client (if any)
            displayName = displayName or ''
            avatarUrl = avatarUrl or ''

            params = {
                'fuid': fuid,
                'email': gmail,
                'displayName': displayName,
                'avatarUrl': avatarUrl,
            }

            res = createUser(params)
            res['body']['state'] = 'newUser'  # Changed from 'foundUser' to 'newUser'
            res['tempToken'] = res['body']['userData']['authData']['tempToken']
            
            print(f"Successfully created new user with uid: {res['body']['userData']['uid']}")
            return res

        # User exists - return existing user data
        user_item = items[0]
        # Patch missing displayName/avatarUrl if provided now
        update_needed = False
        update_expr = []
        expr_values = {}
        if displayName and not user_item.get('displayName'):
            update_expr.append('displayName = :dn')
            expr_values[':dn'] = displayName
            update_needed = True
        if avatarUrl and not user_item.get('avatarUrl'):
            update_expr.append('avatarUrl = :av')
            expr_values[':av'] = avatarUrl
            update_needed = True
        if update_needed:
            user_table.update_item(
                Key={'uid': user_item['uid']},
                UpdateExpression='SET ' + ', '.join(update_expr),
                ExpressionAttributeValues=expr_values
            )
        uid = user_item['uid']
        
        # Get fresh tempToken and user data
        tempToken_response = _getUser(uid, 'authData.tempToken')
        if tempToken_response['statusCode'] != 200:
            return tempToken_response
            
        tempToken = tempToken_response['body']['authData']['tempToken']
        userData = getUser(uid)['body']
        
        print(f"Existing user login: {gmail}, uid: {uid}")
        
        return {
            'statusCode': 200, 
            'body': {
                'state': 'existingUser',  # Changed from 'foundUser' to 'existingUser'
                'tempToken': tempToken,
                'userData': userData
            }
        }
        
    except Exception as e:
        print(f"Error in loginUsingAuth: {str(e)}")
        return {
            'statusCode': 500,
            'body': f'Internal server error: {str(e)}'
        }

def canLinkAccount(uid):
    p = _getUser(uid, 'fuid')
    if(p['body']['fuid'] != 'None'):
        return {
            'statusCode': 200,
            'body': {
                'canLink':False
            }
        }
    return {
            'statusCode': 200,
            'body': {
                'canLink':True
            }
        }

def _getUser(uid, projection):
    """
    Retrieves user data from the user_table based on the provided uid.

    Args:
        uid (str): The unique identifier of the user.

    Returns:
        dict: A response dictionary with statusCode and body containing the user data or an error message.
    """
    try:
        # Validate that uid is provided
        if not uid:
            return {
                'statusCode': 400,
                'body': {'message': 'Parameter "uid" is required.'}
            }
        
        # Retrieve the user data from DynamoDB
        response = user_table.get_item(
                Key={'uid': uid},
                ProjectionExpression=projection
            )
        
        # Check if the user exists
        if 'Item' not in response:
            return {
                'statusCode': 404,
                'body': 'user_not_exist_on_user_table'
            }
        item = response['Item']
        item = convert_sets_to_lists(item)
        # Return the retrieved user data
        return {
            'statusCode': 200,
            'body': item
        }
    
    except ClientError as e:
        # Handle specific DynamoDB client errors
        return {
            'statusCode': 500,
            'body': {
                'message': 'Failed to retrieve user data.',
                'error': e.response['Error']['Message']
            }
        }
    except Exception as e:
        # Handle any other exceptions
        return {
            'statusCode': 500,
            'body': {
                'message': 'An unexpected error occurred while retrieving user data.',
                'error': str(e)
            }
        }

def link_account(uid: str, tempToken: str,fuid: str, email: str) -> dict:
    """
    Links an external account to an existing user by updating the user's fuid and email.

    Args:
        uid (str): The unique identifier of the user in the system.
        fuid (str): The external account identifier to be linked.
        email (str): The email address to be associated with the user.

    Returns:
        dict: A response dictionary containing:
              - statusCode (int): HTTP-like status code.
              - body (str or dict): Details about the operation or error messages.
    """
    # Input Validation
    if not uid or not uid.strip():
        return {
            'statusCode': 400,
            'body': 'Parameter "uid" is required and cannot be empty.'
        }
    if not fuid or not fuid.strip():
        return {
            'statusCode': 400,
            'body': 'Parameter "fuid" is required and cannot be empty.'
        }
    if not email or not email.strip():
        return {
            'statusCode': 400,
            'body': 'Parameter "email" is required and cannot be empty.'
        }
    
    # Optional: Validate email format using regex
    email_pattern = re.compile(r'^[\w\.-]+@[\w\.-]+\.\w+$')
    if not email_pattern.match(email):
        return {
            'statusCode': 400,
            'body': 'Invalid email format.'
        }
    
    try:
        # Step 1: Check if the user with the given uid exists and currently has fuid as 'None'
        response = user_table.get_item(
            Key={'uid': uid},
            ProjectionExpression='fuid, authData.email, authData.tempToken'
        )
        
        if 'Item' not in response:
            return {
                'statusCode': 404,
                'body': 'User with the provided uid does not exist.'
            }
        
        user_item = response['Item']
        current_fuid = user_item.get('fuid', 'None')
        current_email = user_item.get('authData', {}).get('email', '')
        current_temp_token = user_item.get('authData', {}).get('tempToken', '')
        if tempToken != current_temp_token:
            return {
                'statusCode': 403,
                'body': 'Invalid tempToken provided.'
            }



        if current_fuid != 'None':
            return {
                'statusCode': 400,
                'body': 'This user account is already linked to an external account.'
            }
        
        # Step 2: Check if the fuid is already linked to another user
        fuid_index_name = 'fuid-index'  # Assuming you have a GSI named 'fuid-index'
        fuid_response = user_table.query(
            IndexName=fuid_index_name,
            KeyConditionExpression=Key('fuid').eq(fuid)
        )
        
        if fuid_response['Count'] > 0:
            return {
                'statusCode': 409,
                'body': 'The provided fuid is already linked to another user.'
            }
        
        # Step 4: Update the user's fuid and email
        user_table.update_item(
            Key={'uid': uid},
            UpdateExpression='SET fuid = :fuid, authData.email = :email',
            ExpressionAttributeValues={
                ':fuid': fuid,
                ':email': email,
                ':none': 'None'

            },
            ConditionExpression='fuid = :none',
        )
        
        return {
            'statusCode': 200,
            'body': f'Successfully linked external account with fuid "{fuid}" and updated email to "{email}" for user {uid}.'
        }
    
    except ClientError as e:
        error_code = e.response['Error']['Code']
        error_message = e.response['Error']['Message']
        
        if error_code == 'ConditionalCheckFailedException':
            return {
                'statusCode': 409,
                'body': 'Conditional check failed. The user might have been linked to an external account recently.'
            }
        else:
            return {
                'statusCode': 500,
                'body': {
                    'message': 'Failed to link account.',
                    'error': error_message
                }
            }
    
    except Exception as e:
        return {
            'statusCode': 500,
            'body': {
                'message': 'An unexpected error occurred while linking the account.',
                'error': str(e)
            }
        }

def unlink_account(uid: str, tempToken: str) -> dict:
    """
    Unlinks an external account from an existing user by resetting the user's fuid.

    Args:
        uid (str): The unique identifier of the user in the system.
        tempToken (str): The temporary token used to authenticate the unlinking operation.

    Returns:
        dict: A response dictionary containing:
              - statusCode (int): HTTP-like status code.
              - body (str or dict): Details about the operation or error messages.
    """
    # Input Validation
    if not uid or not uid.strip():
        return {
            'statusCode': 400,
            'body': 'Parameter "uid" is required and cannot be empty.'
        }
    if not tempToken or not tempToken.strip():
        return {
            'statusCode': 400,
            'body': 'Parameter "tempToken" is required and cannot be empty.'
        }

    try:
        # Step 1: Retrieve the user's current fuid and tempToken
        response = user_table.get_item(
            Key={'uid': uid},
            ProjectionExpression='fuid, authData.tempToken'
        )

        # Check if the user exists
        if 'Item' not in response:
            return {
                'statusCode': 404,
                'body': 'User with the provided uid does not exist.'
            }

        user_item = response['Item']
        current_fuid = user_item.get('fuid', 'None')
        user_tempToken = user_item.get('authData', {}).get('tempToken', '')

        # Step 2: Verify that the provided tempToken matches the user's tempToken
        if tempToken != user_tempToken:
            return {
                'statusCode': 403,
                'body': 'Invalid tempToken provided.'
            }

        # Step 3: Check if the user currently has an fuid linked
        if current_fuid == 'None':
            return {
                'statusCode': 400,
                'body': 'No external account is linked to this user.'
            }

        # Step 4: Update the user's fuid to 'None' to unlink the external account
        user_table.update_item(
            Key={'uid': uid},
            UpdateExpression='SET fuid = :none',
            ExpressionAttributeValues={
                ':none': 'None'
            },
            ConditionExpression='fuid <> :none'
        )

        return {
            'statusCode': 200,
            'body': f'Successfully unlinked external account from user {uid}.'
        }

    except ClientError as e:
        error_code = e.response['Error']['Code']
        error_message = e.response['Error']['Message']

        if error_code == 'ConditionalCheckFailedException':
            # This can occur if the fuid was already set to 'None' between the get_item and update_item calls
            return {
                'statusCode': 409,
                'body': 'The external account was already unlinked.'
            }
        else:
            return {
                'statusCode': 500,
                'body': {
                    'message': 'Failed to unlink account.',
                    'error': error_message
                }
            }

    except Exception as e:
        return {
            'statusCode': 500,
            'body': {
                'message': 'An unexpected error occurred while unlinking the account.',
                'error': str(e)
            }
        }

def set_is_init_example_true(uid: str) -> dict:
    """
    Sets the 'isInitExample' field to True for the specified user in DynamoDB.

    Args:
        uid (str): The unique identifier of the user.

    Returns:
        dict: Response with statusCode and message.
    """
    if not uid or not uid.strip():
        return {
            'statusCode': 400,
            'body': 'Parameter "uid" is required and cannot be empty.'
        }

    try:
        # Update the 'isInitExample' field to True
        response = user_table.update_item(
            Key={'uid': uid},
            UpdateExpression='SET isInitExample = :val',
            ExpressionAttributeValues={':val': True},
            ConditionExpression='attribute_exists(uid)',
            ReturnValues='UPDATED_NEW'
        )

        return {
            'statusCode': 200,
            'body': {
                'message': f'isInitExample set to True for user {uid}.',
                'updatedAttributes': response.get('Attributes', {})
            }
        }

    except ClientError as e:
        error_code = e.response['Error']['Code']
        if error_code == 'ConditionalCheckFailedException':
            return {
                'statusCode': 404,
                'body': 'User does not exist.'
            }
        else:
            return {
                'statusCode': 500,
                'body': 'Failed to update isInitExample.'
            }

    except Exception:
        return {
            'statusCode': 500,
            'body': 'An unexpected error occurred.'
        }

def set_pin_style(uid: str, pin_style: list) -> dict:
    """
    Sets the 'pinStyle' field for the specified user in DynamoDB.

    Args:
        uid (str): The unique identifier of the user.
        pin_style (list): A list of strings representing the PIN styles.

    Returns:
        dict: Response with statusCode and message.
    """
    # Input Validation
    if not uid or not uid.strip():
        return {
            'statusCode': 400,
            'body': 'Parameter "uid" is required and cannot be empty.'
        }

    if not isinstance(pin_style, list) or not all(isinstance(item, str) for item in pin_style):
        return {
            'statusCode': 400,
            'body': 'Parameter "pin_style" must be a list of strings.'
        }

    try:
        # Update the 'pinStyle' field
        response = user_table.update_item(
            Key={'uid': uid},
            UpdateExpression='SET pinStyle = :val',
            ExpressionAttributeValues={':val': pin_style},
            ConditionExpression='attribute_exists(uid)',
            ReturnValues='UPDATED_NEW'
        )

        return {
            'statusCode': 200,
            'body': {
                'message': f'pinStyle set to {pin_style} for user {uid}.',
                'updatedAttributes': response.get('Attributes', {})
            }
        }

    except ClientError as e:
        error_code = e.response['Error']['Code']
        if error_code == 'ConditionalCheckFailedException':
            return {
                'statusCode': 404,
                'body': 'User does not exist.'
            }
        else:
            return {
                'statusCode': 500,
                'body': 'Failed to update pinStyle.'
            }

    except Exception:
        return {
            'statusCode': 500,
            'body': 'An unexpected error occurred.'
        }

def update_age_and_gender(uid: str, age: int, gender: str) -> dict:
    """
    Updates the 'age' and 'gender' fields for the specified user in DynamoDB.

    Args:
        uid (str): The unique identifier of the user.
        age (int): The age to set for the user. Must be a positive integer.
        gender (str): The gender to set for the user. Must be a non-empty string.

    Returns:
        dict: Response with statusCode and message.
    """
    # Input Validation
    if not uid or not uid.strip():
        return {
            'statusCode': 400,
            'body': 'Parameter "uid" is required and cannot be empty.'
        }

    if not isinstance(age, int) or age <= 0:
        return {
            'statusCode': 400,
            'body': 'Parameter "age" must be a positive integer.'
        }

    if not isinstance(gender, str) or not gender.strip():
        return {
            'statusCode': 400,
            'body': 'Parameter "gender" must be a non-empty string.'
        }

    try:
        # Update the 'age' and 'gender' fields
        response = user_table.update_item(
            Key={'uid': uid},
            UpdateExpression='SET age = :age_val, gender = :gender_val',
            ExpressionAttributeValues={
                ':age_val': age,
                ':gender_val': gender.strip()
            },
            ConditionExpression='attribute_exists(uid)',
            ReturnValues='UPDATED_NEW'
        )

        return {
            'statusCode': 200,
            'body': {
                'message': f'Updated age to {age} and gender to "{gender}" for user {uid}.',
                'updatedAttributes': response.get('Attributes', {})
            }
        }

    except ClientError as e:
        error_code = e.response['Error']['Code']
        if error_code == 'ConditionalCheckFailedException':
            return {
                'statusCode': 404,
                'body': 'User does not exist.'
            }
        else:
            return {
                'statusCode': 500,
                'body': 'Failed to update age and gender.'
            }

    except Exception:
        return {
            'statusCode': 500,
            'body': 'An unexpected error occurred.'
        }

def add_ref_code(uid: str, ref_code: str) -> dict:
    """
    Adds a referral code to a user's account. If the referral code starts with 'pro@',
    it retrieves the corresponding item from the ref_table, deletes it, and returns the item.
    Otherwise, it simply adds the ref_code to the user's record in the user_table.
    If the ref_code is a valid uid, sets addRefRes to True.

    Args:
        uid (str): The unique identifier of the user.
        ref_code (str): The referral code to be added.

    Returns:
        dict: A response dictionary containing:
              - statusCode (int): HTTP-like status code.
              - body (str or dict): Details about the operation or error messages.
    """
    # Input Validation
    if not uid or not uid.strip():
        return {
            'statusCode': 400,
            'body': 'Parameter "uid" is required and cannot be empty.'
        }
    
    if not ref_code or not ref_code.strip():
        return {
            'statusCode': 400,
            'body': 'Parameter "ref_code" is required and cannot be empty.'
        }
    
    try:
        # Step 1: Lowercase the ref_code
        ref_code_lower = ref_code
        
        # Step 2: Attempt to split the ref_code with '@'
        parts = ref_code_lower.split('@', 1)
        
        if len(parts) == 2 and parts[0] == 'pro':
            # The ref_code starts with 'pro@'
            # Step 3: Search for the ref_code in ref_table
            try:
                ref_response = ref_table.get_item(
                    Key={'uid': ref_code_lower},
                    ProjectionExpression='addTime'  # Adjust as needed
                )
            except ClientError as e:
                return {
                    'statusCode': 500,
                    'body': {
                        'message': 'Failed to retrieve referral code from ref_table.',
                        'error': e.response['Error']['Message']
                    }
                }
            
            if 'Item' not in ref_response:
                return {
                    'statusCode': 404,
                    'body': 'Referral code does not exist.'
                }
            
            ref_item = ref_response['Item']
            time = ref_item['addTime']
            # Step 4: Delete the item from ref_table
            if(ref_code_lower != 'pro@kietle57' and ref_code_lower !='pro@hunt'):
                try:
                    ref_table.delete_item(
                        Key={'uid': ref_code_lower}
                    )
                except ClientError as e:
                    return {
                        'statusCode': 500,
                        'body': {
                            'message': 'Failed to delete referral code from ref_table.',
                            'error': e.response['Error']['Message']
                        }
                    }
            
            # Step 5: Return the retrieved item
            return {
                'statusCode': 200,
                'body': {
                    'message': 'PRO ref',
                    'refData': time
                }
            }
        
        else:
            # The ref_code does not start with 'pro@' or cannot be split
            # Check if ref_code is a valid uid
            is_valid_uid = False
            try:
                # Check if the ref_code exists as a user
                user_response = user_table.get_item(
                    Key={'uid': ref_code_lower},
                    ProjectionExpression='uid'
                )
                if 'Item' in user_response:
                    is_valid_uid = True
            except ClientError:
                # If there's an error checking, assume it's not a valid uid
                is_valid_uid = False
            
            # Step 6: Add the ref_code to the user's record in user_table
            update_expression = 'SET refCode = :ref'
            expression_values = {':ref': ref_code_lower}
            
            if is_valid_uid:
                update_expression += ', addRefRes = :addRes'
                expression_values[':addRes'] = True
            
            try:
                update_response = user_table.update_item(
                    Key={'uid': uid},
                    UpdateExpression=update_expression,
                    ExpressionAttributeValues=expression_values,
                    ConditionExpression='attribute_exists(uid)',
                    ReturnValues='UPDATED_NEW'
                )
            except ClientError as e:
                error_code = e.response['Error']['Code']
                if error_code == 'ConditionalCheckFailedException':
                    return {
                        'statusCode': 404,
                        'body': 'User with the provided uid does not exist.'
                    }
                else:
                    return {
                        'statusCode': 500,
                        'body': {
                            'message': 'Failed to add referral code to user.',
                            'error': e.response['Error']['Message']
                        }
                    }
            
            # Step 7: Return success response
            response_body = {
                'message': f'Referral code "{ref_code_lower}" added to user {uid}.',
            }
            
            if is_valid_uid:
                response_body['addRefRes'] = True
            
            return {
                'statusCode': 200,
                'body': response_body
            }
    
    except Exception as e:
        return {
            'statusCode': 500,
            'body': {
                'message': 'An unexpected error occurred while adding the referral code.',
                'error': str(e)
            }
        }

def increment_field(uid: str, stat_field: str) -> dict:
    try:
        # First, ensure that 'stat' exists
        user_table.update_item(
            Key={'uid': uid},
            UpdateExpression='SET stat = if_not_exists(stat, :emptyMap)',
            ExpressionAttributeValues={':emptyMap': {}},
        )
        
        # Then, increment the nested field
        response = user_table.update_item(
            Key={'uid': uid},
            UpdateExpression='SET stat.#sf = if_not_exists(stat.#sf, :zero) + :inc',
            ExpressionAttributeNames={
                "#sf": stat_field
            },
            ExpressionAttributeValues={
                ":zero": 0,
                ":inc": 1
            },
            ReturnValues='UPDATED_NEW'
        )
        
        new_value = response.get('Attributes', {}).get('stat', {}).get(stat_field, None)
        return {
            'statusCode': 200,
            'body': {
                'message': f'Successfully incremented "{stat_field}" in stat for user {uid}.',
                'newValue': new_value
            }
        }
        
    except ClientError as e:
        return {
            'statusCode': 500,
            'body': {
                'message': 'Failed to increment stat field.',
                'error': e.response
            }
        }
    
    except Exception as e:
        return {
            'statusCode': 500,
            'body': {
                'message': 'An unexpected error occurred while incrementing the stat field.',
                'error': str(e)
            }
        }

def createAdminUser(params):
    """
    Create a new admin user account in the sb_admin_users table.
    
    Args:
        params (dict): Dictionary containing admin user creation parameters
            - email (str): Admin user's email address
            - fuid (str): Firebase/Supabase user ID
            - displayName (str): Admin user's display name
            - photoURL (str, optional): Admin user's photo URL
            - roles (str): Comma-separated roles (e.g., "admin,manager")
            - createdBy (str): UID of the admin who created this user
            
    Returns:
        dict: Response with created admin user data
    """
    try:
        uid = short_uuid()
        email = params.get('email', '')
        fuid = params.get('fuid', '')
        displayName = params.get('displayName', '')
        photoURL = params.get('photoURL', '')
        roles = params.get('roles', 'admin')  # Default to admin role
        createdBy = params.get('createdBy', '')
        
        # Validate required fields
        if not email or not fuid or not displayName:
            return {
                'statusCode': 400,
                'body': 'email, fuid, and displayName are required fields.'
            }
        
        # Check if admin user already exists with this fuid
        try:
            response = user_admin_table.query(
                IndexName='fuid-index',  # Assuming GSI exists
                KeyConditionExpression=boto3.dynamodb.conditions.Key('fuid').eq(fuid)
            )
            if response.get('Items'):
                return {
                    'statusCode': 409,
                    'body': 'Admin user with this fuid already exists.'
                }
        except Exception as e:
            # If GSI doesn't exist, we'll scan (less efficient but works)
            response = user_admin_table.scan(
                FilterExpression=boto3.dynamodb.conditions.Attr('fuid').eq(fuid)
            )
            if response.get('Items'):
                return {
                    'statusCode': 409,
                    'body': 'Admin user with this fuid already exists.'
                }
        
        createdAt = datetime.utcnow().isoformat() + 'Z'
        
        newAdminUser = {
            'uid': uid,
            'email': email,
            'fuid': fuid,
            'displayName': displayName,
            'roles': roles,  # Store as comma-separated string
            'status': 'active',
            'createdAt': createdAt,
            'createdBy': createdBy,
            'lastActive': createdAt
        }
        
        # Add optional fields
        if photoURL:
            newAdminUser['photoURL'] = photoURL
            
        user_admin_table.put_item(Item=newAdminUser)
        
        print(f"Created new admin user: {uid}, email: {email}, roles: {roles}")
        
        return {
            'statusCode': 200,
            'body': {
                'adminUser': newAdminUser,
                'message': 'Admin user created successfully'
            }
        }
        
    except Exception as e:
        print(f"Error creating admin user: {str(e)}")
        return {
            'statusCode': 500,
            'body': f'Failed to create admin user: {str(e)}'
        }

def loginAdminAuth(token, email, fuid):
    """
    Authenticate admin user using Google OAuth details.
    Validates against sb_admin_users table.
    
    Args:
        token (str): Authentication token
        email (str): Admin user's email address
        fuid (str): Firebase/Supabase user ID
        
    Returns:
        dict: Response with admin user data and authentication state
    """
    try:
        # Input validation
        if not fuid or not email:
            return {
                'statusCode': 400,
                'body': 'fuid and email are required.'
            }
        
        admin_user = None
        
        # First, try to find by fuid (for new data structure)
        try:
            response = user_admin_table.query(
                IndexName='fuid-index',  # Assuming GSI exists
                KeyConditionExpression=boto3.dynamodb.conditions.Key('fuid').eq(fuid)
            )
            items = response.get('Items', [])
            if items:
                admin_user = items[0]
        except Exception as e:
            # If GSI doesn't exist, try scan for fuid
            try:
                response = user_admin_table.scan(
                    FilterExpression=boto3.dynamodb.conditions.Attr('fuid').eq(fuid)
                )
                items = response.get('Items', [])
                if items:
                    admin_user = items[0]
            except Exception:
                pass
        
        # If not found by fuid, try to find by email (for existing data structure)
        if not admin_user:
            try:
                # Try direct lookup by uid=email (old structure)
                response = user_admin_table.get_item(Key={'uid': email})
                if 'Item' in response:
                    admin_user = response['Item']
                    print(f"Found admin user by email (old structure): {email}")
                    
                    # Update the record to include fuid for future use
                    try:
                        user_admin_table.update_item(
                            Key={'uid': email},
                            UpdateExpression='SET fuid = :fuid',
                            ExpressionAttributeValues={':fuid': fuid}
                        )
                        admin_user['fuid'] = fuid
                        print(f"Updated admin user record with fuid: {fuid}")
                    except Exception as e:
                        print(f"Warning: Could not update fuid: {str(e)}")
                        
            except Exception as e:
                print(f"Error looking up by email: {str(e)}")
        
        # If still not found, try scan for email field
        if not admin_user:
            try:
                response = user_admin_table.scan(
                    FilterExpression=boto3.dynamodb.conditions.Attr('email').eq(email)
                )
                items = response.get('Items', [])
                if items:
                    admin_user = items[0]
                    print(f"Found admin user by email field: {email}")
            except Exception as e:
                print(f"Error scanning for email: {str(e)}")

        if not admin_user:
            return {
                'statusCode': 403,
                'body': 'Access denied. Admin user not found.'
            }
        
        # Check if admin user is active (default to active if status not set)
        status = admin_user.get('status', 'active')
        if status != 'active':
            return {
                'statusCode': 403,
                'body': 'Access denied. Admin account is not active.'
            }
        
        # Normalize field names for compatibility
        display_name = admin_user.get('displayName') or admin_user.get('name', '')
        roles_str = admin_user.get('roles') or admin_user.get('role', 'admin')
        
        # Update last active timestamp
        current_time = datetime.utcnow().isoformat() + 'Z'
        try:
            user_admin_table.update_item(
                Key={'uid': admin_user['uid']},
                UpdateExpression='SET lastActive = :time',
                ExpressionAttributeValues={':time': current_time}
            )
            admin_user['lastActive'] = current_time
        except Exception as e:
            print(f"Warning: Could not update lastActive: {str(e)}")
        
        # Prepare normalized response
        normalized_admin_user = {
            'uid': admin_user['uid'],
            'email': email,
            'fuid': fuid,
            'displayName': display_name,
            'roles': roles_str,
            'status': status,
            'lastActive': current_time,
            'createdAt': admin_user.get('createdAt', current_time)
        }
        
        # Add optional fields
        if admin_user.get('photoURL'):
            normalized_admin_user['photoURL'] = admin_user['photoURL']
        if admin_user.get('createdBy'):
            normalized_admin_user['createdBy'] = admin_user['createdBy']
        
        # Parse roles for response
        roles_array = []
        if roles_str:
            roles_array = [role.strip() for role in roles_str.split(',') if role.strip()]
        
        print(f"Admin user login successful: {email}, uid: {admin_user['uid']}, roles: {roles_str}")
        
        return {
            'statusCode': 200,
            'body': {
                'state': 'authenticated',
                'adminUser': normalized_admin_user,
                'roles': roles_array,
                'message': 'Admin authentication successful'
            }
        }
        
    except Exception as e:
        print(f"Error in admin authentication: {str(e)}")
        return {
            'statusCode': 500,
            'body': f'Internal server error: {str(e)}'
        }

def getAdminUsers():
    """
    Retrieve all admin users from sb_admin_users table.
    
    Returns:
        dict: Response with list of admin users
    """
    try:
        response = user_admin_table.scan()
        items = response.get('Items', [])
        
        # Convert sets to lists for JSON serialization
        items = convert_sets_to_lists(items)
        
        # Format roles as arrays
        for item in items:
            if 'roles' in item and isinstance(item['roles'], str):
                item['roleArray'] = [role.strip() for role in item['roles'].split(',') if role.strip()]
            else:
                item['roleArray'] = []
        
        return {
            'statusCode': 200,
            'body': {
                'adminUsers': items,
                'count': len(items)
            }
        }
        
    except Exception as e:
        print(f"Error retrieving admin users: {str(e)}")
        return {
            'statusCode': 500,
            'body': f'Failed to retrieve admin users: {str(e)}'
        }

def updateAdminUser(uid, params):
    """
    Update an admin user's information.
    
    Args:
        uid (str): Admin user's unique identifier
        params (dict): Fields to update
        
    Returns:
        dict: Response with updated admin user data
    """
    try:
        # Check if admin user exists
        response = user_admin_table.get_item(Key={'uid': uid})
        if 'Item' not in response:
            return {
                'statusCode': 404,
                'body': 'Admin user not found.'
            }
        
        # Build update expression
        update_expr = "SET "
        expr_values = {}
        expr_names = {}
        
        updatable_fields = ['displayName', 'roles', 'status', 'photoURL']
        updates = []
        
        for field in updatable_fields:
            if field in params:
                if field == 'status':
                    # Validate status values
                    if params[field] not in ['active', 'inactive', 'suspended']:
                        return {
                            'statusCode': 400,
                            'body': 'Invalid status value. Must be active, inactive, or suspended.'
                        }
                
                updates.append(f"#{field} = :{field}")
                expr_names[f"#{field}"] = field
                expr_values[f":{field}"] = params[field]
        
        if not updates:
            return {
                'statusCode': 400,
                'body': 'No valid fields to update.'
            }
        
        # Add updatedAt timestamp
        updates.append("#updatedAt = :updatedAt")
        expr_names["#updatedAt"] = "updatedAt"
        expr_values[":updatedAt"] = datetime.utcnow().isoformat() + 'Z'
        
        update_expr += ", ".join(updates)
        
        response = user_admin_table.update_item(
            Key={'uid': uid},
            UpdateExpression=update_expr,
            ExpressionAttributeNames=expr_names,
            ExpressionAttributeValues=expr_values,
            ReturnValues='ALL_NEW'
        )
        
        updated_item = response.get('Attributes', {})
        
        # Format roles as array
        if 'roles' in updated_item and isinstance(updated_item['roles'], str):
            updated_item['roleArray'] = [role.strip() for role in updated_item['roles'].split(',') if role.strip()]
        else:
            updated_item['roleArray'] = []
        
        return {
            'statusCode': 200,
            'body': {
                'adminUser': updated_item,
                'message': 'Admin user updated successfully'
            }
        }
        
    except Exception as e:
        print(f"Error updating admin user: {str(e)}")
        return {
            'statusCode': 500,
            'body': f'Failed to update admin user: {str(e)}'
        }

def deleteAdminUser(uid):
    """
    Delete an admin user from sb_admin_users table.
    
    Args:
        uid (str): Admin user's unique identifier
        
    Returns:
        dict: Response confirming deletion
    """
    try:
        # Check if admin user exists
        response = user_admin_table.get_item(Key={'uid': uid})
        if 'Item' not in response:
            return {
                'statusCode': 404,
                'body': 'Admin user not found.'
            }
        
        # Delete the admin user
        user_admin_table.delete_item(Key={'uid': uid})
        
        return {
            'statusCode': 200,
            'body': {
                'message': f'Admin user {uid} deleted successfully'
            }
        }
        
    except Exception as e:
        print(f"Error deleting admin user: {str(e)}")
        return {
            'statusCode': 500,
            'body': f'Failed to delete admin user: {str(e)}'
        }

def update_login_count(uid: str) -> dict:
    """
    Updates the login count for a user. This function:
    1. Retrieves the last login timestamp
    2. Tracks consecutive day login streaks
    3. Counts total unique days logged in
    
    Args:
        uid (str): The unique identifier of the user.
        
    Returns:
        dict: A response dictionary with statusCode and body containing the updated login info
    """
    try:
        # Get current timestamp in UTC
        current_time = datetime.utcnow()
        current_date = current_time.date()
        current_timestamp = current_time.isoformat() + 'Z'  # Adding 'Z' to indicate UTC time
        
        # First, ensure login data exists and get last login date
        response = user_table.get_item(
            Key={'uid': uid},
            ProjectionExpression='login_streak, total_login_days'
        )
        
        item = response.get('Item', {})
        login_streak = item.get('login_streak', {})
        total_login_days = item.get('total_login_days', 0)
        
        last_login_timestamp = login_streak.get('last_login', None)
        current_streak = login_streak.get('current_streak', 0)
        max_streak = login_streak.get('max_streak', 0)
        
        # Initialize new streak data
        new_streak_data = {
            'last_login': current_timestamp,
            'current_streak': 1,  # Default to 1 if reset or first login
            'max_streak': max(max_streak, 1)  # Update max_streak if needed
        }
        
        # Flag to track if we should increment total_login_days
        increment_total_days = False
        
        # If there was a previous login, check if it's a consecutive day
        if last_login_timestamp:
            last_login_time = datetime.fromisoformat(last_login_timestamp.rstrip('Z'))
            last_login_date = last_login_time.date()
            
            # Calculate the difference in days
            date_diff = (current_date - last_login_date).days
            
            if date_diff == 1:
                # Consecutive day login
                new_streak_data['current_streak'] = current_streak + 1
                new_streak_data['max_streak'] = max(max_streak, current_streak + 1)
                increment_total_days = True
            elif date_diff == 0:
                # Same day login, maintain current streak
                new_streak_data['current_streak'] = current_streak
                new_streak_data['max_streak'] = max_streak
                increment_total_days = False
            elif date_diff > 1:
                # More than 1 day has passed, streak resets to 1 (already set above)
                increment_total_days = True
        else:
            # First login ever
            increment_total_days = True
        
        # Increment total login days if necessary
        new_total_login_days = total_login_days + (1 if increment_total_days else 0)
        
        # Update the user record with the new login data
        update_expression = 'SET login_streak = :streak, total_login_days = :total_days'
        expression_attribute_values = {
            ':streak': new_streak_data,
            ':total_days': new_total_login_days
        }
        
        response = user_table.update_item(
            Key={'uid': uid},
            UpdateExpression=update_expression,
            ExpressionAttributeValues=expression_attribute_values,
            ReturnValues='UPDATED_NEW'
        )
        
        updated_values = response.get('Attributes', {})
        updated_streak = updated_values.get('login_streak', {})
        updated_total_days = updated_values.get('total_login_days', 0)
        
        return {
            'statusCode': 200,
            'body': {
                'message': f'Successfully updated login data for user {uid}.',
                'loginStreak': updated_streak,
                'totalLoginDays': updated_total_days
            }
        }
        
    except ClientError as e:
        return {
            'statusCode': 500,
            'body': {
                'message': 'Failed to update login count.',
                'error': e.response
            }
        }
    
    except Exception as e:
        return {
            'statusCode': 500,
            'body': {
                'message': 'An unexpected error occurred while updating the login count.',
                'error': str(e)
            }
        }



def add_to_cart(uid: str, collection_id: str) -> dict:
    """
    Adds a collection ID to the user's cart (sb_user.cart).
    - Ensures the cart exists (creates if missing).
    - Prevents duplicate entries.
    - Limits the cart to 100 items.

    Args:
        uid (str): User's unique identifier.
        collection_id (str): Collection ID to add.

    Returns:
        dict: Response with status code and message.
    """
    if not uid or not uid.strip():
        return {
            'statusCode': 400,
            'body': 'Parameter "uid" is required and cannot be empty.'
        }
    if not collection_id or not collection_id.strip():
        return {
            'statusCode': 400,
            'body': 'Parameter "collection_id" is required and cannot be empty.'
        }

    try:
        # Retrieve current cart
        response = user_table.get_item(Key={'uid': uid}, ProjectionExpression='cart')
        current_cart = response.get('Item', {}).get('cart', [])

        # Ownership check: if user already purchased/owns this collection, block adding to cart
        from src.utils import sb_user_collections
        try:
            ownership_resp = sb_user_collections.get_item(Key={'user_id': uid, 'collection_id': collection_id})
            if 'Item' in ownership_resp:
                return {
                    'statusCode': 409,
                    'body': 'User already owns this collection.'
                }
        except Exception as e:
            # Proceed but log if ownership check fails
            print(f"Ownership check failed in add_to_cart: {str(e)}")

        # Guard: max 100 items
        if len(current_cart) >= 100:
            return {
                'statusCode': 400,
                'body': 'Cart is full. Maximum 100 items allowed.'
            }

        # Prevent duplicates
        if collection_id in current_cart:
            return {
                'statusCode': 200,
                'body': {
                    'message': 'Item already in cart.',
                    'cart': current_cart
                }
            }

        new_cart = current_cart + [collection_id]

        # Update DynamoDB
        user_table.update_item(
            Key={'uid': uid},
            UpdateExpression='SET cart = :newCart',
            ExpressionAttributeValues={':newCart': new_cart}
        )

        return {
            'statusCode': 200,
            'body': {
                'message': f'Added {collection_id} to cart.',
                'cart': new_cart
            }
        }

    except ClientError as e:
        return {
            'statusCode': 500,
            'body': {
                'message': 'Failed to add item to cart.',
                'error': e.response['Error']['Message']
            }
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': {
                'message': 'Unexpected error occurred while adding to cart.',
                'error': str(e)
            }
        }


def remove_from_cart(uid: str, collection_id: str) -> dict:
    """
    Removes a collection ID from the user's cart.

    Args:
        uid (str): User's unique identifier.
        collection_id (str): Collection ID to remove.
    """
    if not uid or not uid.strip():
        return {
            'statusCode': 400,
            'body': 'Parameter "uid" is required and cannot be empty.'
        }
    if not collection_id or not collection_id.strip():
        return {
            'statusCode': 400,
            'body': 'Parameter "collection_id" is required and cannot be empty.'
        }

    try:
        # Retrieve current cart
        response = user_table.get_item(Key={'uid': uid}, ProjectionExpression='cart')
        current_cart = response.get('Item', {}).get('cart', [])

        if collection_id not in current_cart:
            return {
                'statusCode': 404,
                'body': 'Item not found in cart.'
            }

        new_cart = [cid for cid in current_cart if cid != collection_id]

        user_table.update_item(
            Key={'uid': uid},
            UpdateExpression='SET cart = :newCart',
            ExpressionAttributeValues={':newCart': new_cart}
        )

        return {
            'statusCode': 200,
            'body': {
                'message': f'Removed {collection_id} from cart.',
                'cart': new_cart
            }
        }

    except ClientError as e:
        return {
            'statusCode': 500,
            'body': {
                'message': 'Failed to remove item from cart.',
                'error': e.response['Error']['Message']
            }
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': {
                'message': 'Unexpected error occurred while removing from cart.',
                'error': str(e)
            }
        }



def get_cart(uid: str) -> dict:
    """Retrieve full cart (list of collection IDs) for user."""
    if not uid or not uid.strip():
        return {"statusCode": 400, "body": 'Parameter "uid" is required'}
    try:
        res = user_table.get_item(Key={"uid": uid}, ProjectionExpression="cart")
        cart_items = res.get('Item', {}).get('cart', [])
        return {"statusCode": 200, "body": {"cart": cart_items}}
    except Exception as e:
        return {"statusCode": 500, "body": f'Error getting cart: {str(e)}'}


def update_cart(uid: str, cart_items: list) -> dict:
    """Replace entire cart with provided list of collection IDs (max 100)."""
    if not uid or not uid.strip():
        return {"statusCode": 400, "body": 'Parameter "uid" is required'}
    if not isinstance(cart_items, list):
        return {"statusCode": 400, "body": 'cart_items must be list'}
    # Deduplicate and limit
    deduped = []
    for cid in cart_items:
        if isinstance(cid, str) and cid not in deduped:
            deduped.append(cid)
        if len(deduped) >= 100:
            break
    try:
        user_table.update_item(Key={'uid': uid}, UpdateExpression='SET cart = :c', ExpressionAttributeValues={':c': deduped})
        return {"statusCode": 200, "body": {"cart": deduped, "message": 'Cart updated'}}
    except Exception as e:
        return {"statusCode": 500, "body": f'Error updating cart: {str(e)}'}


def clear_cart(uid: str) -> dict:
    """Clear all items from the user's cart by setting the cart to an empty list."""
    return update_cart(uid, [])



# Insert function to record study sessions
def record_study_session(uid: str, duration: int, startTime: str = None, endTime: str = None, submissionTime: str = None) -> dict:
    """
    Logs a study session and updates user total study time.
    - duration is in minutes (int)
    - startTime/endTime/submissionTime are ISO timestamps (UTC, e.g. 2025-01-30T12:34:56Z)

    Validations when timestamps are provided:
    - If startTime is provided: ensure it is >= the user's latest prior session end_time (no tolerance).
    - If startTime and (endTime or submissionTime) are provided: ensure difference ~= duration within 5 minutes.
    """
    from .utils import study_session_table, user_study_summary_table
    from datetime import datetime, timezone, timedelta
    from decimal import Decimal
    try:
        # Validate duration is not negative and is at least 1 minute
        if duration is None:
            return {'statusCode': 400, 'body': {'error': 'duration is required'}}
        if duration < 0:
            return {'statusCode': 400, 'body': {'error': 'duration must be >= 0'}}
        if duration < 1:
            # Too short; do not record
            return {'statusCode': 200, 'body': {'message': 'Duration too short, not recorded'}}

        def parse_iso(ts: str):
            if not ts:
                return None
            try:
                # Support both Z and +00:00 forms
                if ts.endswith('Z'):
                    return datetime.fromisoformat(ts.replace('Z', '+00:00'))
                return datetime.fromisoformat(ts)
            except Exception:
                return None

        start_dt = parse_iso(startTime)
        end_dt = parse_iso(endTime)
        sub_dt = parse_iso(submissionTime)

        # If end_dt is not provided, default to now (UTC)
        now_dt = datetime.utcnow().replace(tzinfo=timezone.utc)
        if end_dt is None:
            end_dt = now_dt

        # Validation: if start provided, ensure no overlap with previous session end_time
        if start_dt is not None:
            try:
                # Find latest prior end_time for this user
                scan_kwargs = {
                    'FilterExpression': Attr('user_id').eq(uid),
                    'ProjectionExpression': 'end_time'
                }
                resp = study_session_table.scan(**scan_kwargs)
                items = resp.get('Items', [])
                while 'LastEvaluatedKey' in resp:
                    resp = study_session_table.scan(ExclusiveStartKey=resp['LastEvaluatedKey'], **scan_kwargs)
                    items.extend(resp.get('Items', []))
                latest_end = None
                for it in items:
                    et = it.get('end_time')
                    if not et:
                        continue
                    dt = parse_iso(et)
                    if dt is None:
                        continue
                    if (latest_end is None) or (dt > latest_end):
                        latest_end = dt
                if latest_end is not None and start_dt < latest_end:
                    return {
                        'statusCode': 400,
                        'body': {
                            'error': 'start_time_overlaps_previous',
                            'latestEnd': latest_end.isoformat().replace('+00:00', 'Z'),
                        }
                    }
            except Exception as e:
                # Do not block if scan fails; proceed without overlap check
                print(f"record_study_session: overlap scan failed for {uid}: {str(e)}")

        # Validation: if start and an end-like timestamp exist, ensure duration within tolerance
        tolerance_seconds = 5 * 60
        duration_seconds = int(duration) * 60
        def within_tolerance(delta_sec: int) -> bool:
            return abs(delta_sec - duration_seconds) <= tolerance_seconds

        if start_dt is not None:
            # Check against provided end_dt
            if end_dt is not None:
                if end_dt < start_dt:
                    return {'statusCode': 400, 'body': {'error': 'end_time_before_start_time'}}
                diff_sec = int((end_dt - start_dt).total_seconds())
                if not within_tolerance(diff_sec):
                    return {
                        'statusCode': 400,
                        'body': {
                            'error': 'duration_mismatch_with_end_time',
                            'expectedSeconds': duration_seconds,
                            'actualSeconds': diff_sec
                        }
                    }
            # Check against submission time if provided
            if sub_dt is not None:
                if sub_dt < start_dt:
                    return {'statusCode': 400, 'body': {'error': 'submission_time_before_start_time'}}
                diff_sec2 = int((sub_dt - start_dt).total_seconds())
                if not within_tolerance(diff_sec2):
                    return {
                        'statusCode': 400,
                        'body': {
                            'error': 'duration_mismatch_with_submission_time',
                            'expectedSeconds': duration_seconds,
                            'actualSeconds': diff_sec2
                        }
                    }

        # Build item
        session_id = short_uuid()
        end_iso = end_dt.isoformat().replace('+00:00', 'Z')
        now_iso = now_dt.isoformat().replace('+00:00', 'Z')
        item = {
            'user_id': uid,
            'session_id': session_id,
            'end_time': end_iso,
            'duration': Decimal(int(duration)),
            'createdAt': now_iso
        }
        # Attach timestamps if provided or derivable
        if start_dt is not None:
            item['start_time'] = start_dt.isoformat().replace('+00:00', 'Z')
        else:
            # Derive start_time from end_time - duration for storage consistency
            derived_start = end_dt - timedelta(seconds=duration_seconds)
            item['start_time'] = derived_start.isoformat().replace('+00:00', 'Z')
        if sub_dt is not None:
            item['submission_time'] = sub_dt.isoformat().replace('+00:00', 'Z')

        # Persist session
        study_session_table.put_item(Item=item)

        # Update period summaries using the recorded end_time
        try:
            end_for_period = end_dt
            iso_year, iso_week, _ = end_for_period.isocalendar()
            week_period = f"{iso_year}-W{iso_week:02d}"
            month_period = end_for_period.strftime("%Y-%m")
            periods = ["ALL", month_period, week_period]
            for p in periods:
                try:
                    cur = user_study_summary_table.get_item(Key={"period": p, "user_id": uid}).get("Item")
                    existing = cur.get("total_study_time", 0) if cur else 0
                    cur_total = int(existing) if not isinstance(existing, Decimal) else int(existing)
                except Exception:
                    cur_total = 0
                new_total = cur_total + int(duration)
                user_study_summary_table.put_item(Item={
                    "period": p,
                    "user_id": uid,
                    "total_study_time": str(int(new_total)).zfill(12),
                    "last_updated": now_iso,
                })
        except Exception as e:
            print(f"record_study_session: summary update warning: {str(e)}")

        return {'statusCode': 200, 'body': {'sessionId': session_id}}
    except Exception as e:
        print(f"Error recording study session: {str(e)}")
        return {'statusCode': 500, 'body': {'error': str(e)}}

def add_free_collection_to_user(uid: str, collection_id: str) -> dict:
    """
    Add a free collection directly to user's collection without going through cart
    
    Args:
        uid (str): User ID
        collection_id (str): Collection ID to add
        
    Returns:
        dict: Response indicating success/failure
    """
    try:
        if not uid or not collection_id:
            return {
                'statusCode': 400,
                'body': {'error': 'User ID and collection ID are required'}
            }
        
        # First, verify the collection exists and is free
        from src import question_uploader
        collection_response = question_uploader.get_collection_by_id(collection_id)
        
        if collection_response.get('statusCode') != 200:
            return {
                'statusCode': 404,
                'body': {'error': 'Collection not found'}
            }
        
        collection = collection_response['body']['collection']
        
        # Check if collection is free
        if collection.get('pricing') != 'free':
            return {
                'statusCode': 400,
                'body': {'error': 'Collection is not free'}
            }
        
        # Check if user already has this collection
        try:
            response = sb_user_collections.get_item(
                Key={
                    'user_id': uid,
                    'collection_id': collection_id
                }
            )
            
            if 'Item' in response:
                return {
                    'statusCode': 409,
                    'body': {'error': 'User already has this collection'}
                }
                
        except Exception as e:
            print(f"Error checking existing collection: {str(e)}")
        
        # Add the free collection to user's collections
        current_time = int(time.time())
        collection_data = {
            'user_id': uid,
            'collection_id': collection_id,
            'purchased_at': current_time,
            'created_at': current_time
        }
        
        sb_user_collections.put_item(Item=collection_data)
        
        return {
            'statusCode': 200,
            'body': {
                'message': 'Free collection added successfully',
                'collection': {
                    'id': collection_id
                }
            }
        }
        
    except Exception as e:
        print(f"Error adding free collection: {str(e)}")
        return {
            'statusCode': 500,
            'body': {'error': f'Failed to add free collection: {str(e)}'}
        }


def get_user_collection_ids(uid: str, limit: int = None) -> dict:
    """
    Retrieve all collection IDs for the specified user from sb_user_collections table.

    Args:
        uid (str): User ID whose collections are to be fetched.
        limit (int, optional): Maximum number of collection IDs to return. Defaults to None (no limit).

    Returns:
        dict: Response containing list of collectionIds and count.
    """
    if not uid or not uid.strip():
        return {
            'statusCode': 400,
            'body': 'Parameter "uid" is required and cannot be empty.'
        }

    try:
        query_params = {
            'KeyConditionExpression': Key('user_id').eq(uid)
        }
        if limit is not None:
            query_params['Limit'] = int(limit)

        response = sb_user_collections.query(**query_params)
        items = response.get('Items', [])
        collection_ids = [item.get('collection_id') for item in items if item.get('collection_id')]

        # Also expand owned bundles into their current collections to ensure users
        # receive newly added collections to purchased bundles automatically.
        try:
            bundle_resp = sb_user_bundles.query(
                KeyConditionExpression=Key('user_id').eq(uid)
            )
            bundle_items = bundle_resp.get('Items', [])
            owned_bundle_ids = [b.get('bundle_id') for b in bundle_items if b.get('bundle_id')]
            # Fallback: discover historical bundle purchases from orders if not recorded
            if not owned_bundle_ids:
                try:
                    dynamodb = boto3.resource('dynamodb')
                    table = dynamodb.Table(orders_table)
                    order_q = table.query(
                        IndexName='userId-index',
                        KeyConditionExpression=Key('userId').eq(uid),
                        ScanIndexForward=False,
                        Limit=50
                    )
                    for order in order_q.get('Items', []):
                        if order.get('status') != 'completed':
                            continue
                        for it in order.get('items', []) or []:
                            cid = it.get('collectionId')
                            if isinstance(cid, str) and cid.startswith('BUNDLE:'):
                                bid = cid.replace('BUNDLE:', '')
                                if bid and bid not in owned_bundle_ids:
                                    owned_bundle_ids.append(bid)
                    # Persist discovered bundle ownerships for future calls
                    if owned_bundle_ids:
                        now_ts = int(time.time())
                        for bid in owned_bundle_ids:
                            try:
                                exists = sb_user_bundles.get_item(Key={'user_id': uid, 'bundle_id': bid})
                                if 'Item' in exists:
                                    continue
                                sb_user_bundles.put_item(Item={
                                    'user_id': uid,
                                    'bundle_id': bid,
                                    'purchased_at': now_ts,
                                    'created_at': now_ts,
                                })
                            except Exception:
                                pass
                except Exception:
                    pass
            for bid in owned_bundle_ids:
                try:
                    bres = get_bundle_by_id(bid)
                    if bres and bres.get('statusCode') == 200:
                        b = bres.get('body', {}).get('bundle', {})
                        for c in b.get('collections', []) or []:
                            cid = c.get('id')
                            if cid and cid not in collection_ids:
                                collection_ids.append(cid)
                except Exception as _e:
                    # Skip problematic bundles and continue
                    continue
        except Exception as _e:
            # If bundle entitlement expansion fails, fall back to base list
            pass

        return {
            'statusCode': 200,
            'body': {
                'collectionIds': collection_ids,
                'count': len(collection_ids)
            }
        }
    except Exception as e:
        print(f"Error retrieving collections for user {uid}: {str(e)}")
        return {
            'statusCode': 500,
            'body': f'Failed to retrieve collections: {str(e)}'
        }


def _encode_last_key(last_key):
    if not last_key:
        return None
    try:
        return base64.b64encode(json.dumps(last_key, default=str).encode("utf-8")).decode("utf-8")
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


def getUsers(params=None):
    """
    Retrieve end-user accounts from sb_user table with optional pagination.

    Args:
        params (dict, optional):
            - limit (int): maximum records to return (default 25, max 100)
            - lastKey (str): base64 encoded DynamoDB ExclusiveStartKey

    Returns:
        dict: statusCode + body containing users, count, lastKey
    """

    params = params or {}

    try:
        raw_limit = params.get('limit', 25)
        try:
            limit = int(raw_limit)
        except Exception:
            limit = 25
        limit = max(1, min(limit, 100))

        exclusive_start_key = _decode_last_key(params.get('lastKey'))

        scan_kwargs = {
            'Limit': limit,
        }
        if exclusive_start_key:
            scan_kwargs['ExclusiveStartKey'] = exclusive_start_key

        response = user_table.scan(**scan_kwargs)
        items = response.get('Items', [])
        last_evaluated_key = response.get('LastEvaluatedKey')

        items = convert_sets_to_lists(items)

        def normalize_number(value):
            if isinstance(value, Decimal):
                if value % 1 == 0:
                    return int(value)
                return float(value)
            return value

        users = []
        for item in items:
            auth_data = item.get('authData') or {}
            email = auth_data.get('email') or item.get('email') or ''

            created_at = item.get('createdAt') or item.get('createAt') or ''
            last_active = item.get('lastActive')
            if not last_active:
                login_streak = item.get('login_streak') or {}
                last_active = login_streak.get('last_login')

            status = item.get('status') or 'active'

            plan = (
                item.get('plan')
                or item.get('subscriptionPlan')
                or item.get('pricing')
            )

            orders = item.get('orders') or item.get('ordersCount') or item.get('orderCount')
            total_spend = (
                item.get('totalSpend')
                or item.get('lifetimeValue')
                or item.get('totalRevenue')
            )

            orders = normalize_number(orders) if orders is not None else None
            total_spend = (
                normalize_number(total_spend) if total_spend is not None else None
            )

            users.append(
                {
                    'uid': item.get('uid'),
                    'email': email,
                    'displayName': item.get('displayName') or auth_data.get('displayName') or '',
                    'status': status,
                    'createdAt': created_at,
                    'lastActive': last_active,
                    'plan': plan,
                    'orders': orders,
                    'totalSpend': total_spend,
                }
            )

        return {
            'statusCode': 200,
            'body': {
                'users': users,
                'count': len(users),
                'lastKey': _encode_last_key(last_evaluated_key),
            },
        }

    except ClientError as e:
        return {
            'statusCode': 500,
            'body': {
                'message': 'Failed to retrieve users.',
                'error': e.response['Error']['Message'],
            },
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': {
                'message': 'Unexpected error retrieving users.',
                'error': str(e),
            },
        }



# Save or update latest score for a question set inside a user's collection record
def save_user_question_score(uid: str, collection_id: str, question_set_id: str, score: int) -> dict:
    """
    Persist the latest score for a given question set under the user's collection item in sb_user_collections.

    The score is saved under a map attribute `latest_scores` keyed by question_set_id.
    We also update a timestamp map `latest_scores_updated_at` for auditing.
    """
    if not uid or not uid.strip():
        return {'statusCode': 400, 'body': 'Parameter "uid" is required and cannot be empty.'}
    if not collection_id or not collection_id.strip():
        return {'statusCode': 400, 'body': 'Parameter "collection_id" is required and cannot be empty.'}
    if not question_set_id or not question_set_id.strip():
        return {'statusCode': 400, 'body': 'Parameter "question_set_id" is required and cannot be empty.'}

    try:
        now_iso = datetime.utcnow().isoformat() + 'Z'

        # 1) Ensure maps exist (no overlapping nested paths in same expression)
        sb_user_collections.update_item(
            Key={'user_id': uid, 'collection_id': collection_id},
            UpdateExpression='SET #ls = if_not_exists(#ls, :emptyMap), #lsu = if_not_exists(#lsu, :emptyMap)',
            ExpressionAttributeNames={
                '#ls': 'latest_scores',
                '#lsu': 'latest_scores_updated_at',
            },
            ExpressionAttributeValues={
                ':emptyMap': {},
            }
        )

        # 2) Set nested values
        sb_user_collections.update_item(
            Key={'user_id': uid, 'collection_id': collection_id},
            UpdateExpression='SET #ls.#qsid = :score, #lsu.#qsid = :ts',
            ExpressionAttributeNames={
                '#ls': 'latest_scores',
                '#lsu': 'latest_scores_updated_at',
                '#qsid': question_set_id,
            },
            ExpressionAttributeValues={
                ':score': int(score),
                ':ts': now_iso,
            },
            ReturnValues='UPDATED_NEW'
        )

        return {
            'statusCode': 200,
            'body': {
                'message': 'Latest score saved',
                'collection_id': collection_id,
                'question_set_id': question_set_id,
                'score': int(score),
                'updated_at': now_iso,
            }
        }
    except ClientError as e:
        return {'statusCode': 500, 'body': {'message': 'Failed to save latest score', 'error': e.response['Error']['Message']}}
    except Exception as e:
        return {'statusCode': 500, 'body': {'message': 'Unexpected error saving latest score', 'error': str(e)}}


def get_user_collection_details(uid: str, collection_id: str) -> dict:
    """
    Return the user's collection record from sb_user_collections, including latest_scores map if present.
    """
    if not uid or not uid.strip():
        return {'statusCode': 400, 'body': 'Parameter "uid" is required and cannot be empty.'}
    if not collection_id or not collection_id.strip():
        return {'statusCode': 400, 'body': 'Parameter "collection_id" is required and cannot be empty.'}

    try:
        resp = sb_user_collections.get_item(
            Key={'user_id': uid, 'collection_id': collection_id}
        )
        if 'Item' not in resp:
            return {'statusCode': 404, 'body': 'User collection not found'}

        item = convert_sets_to_lists(resp['Item'])
        return {'statusCode': 200, 'body': item}
    except ClientError as e:
        return {'statusCode': 500, 'body': {'message': 'Failed to get user collection details', 'error': e.response['Error']['Message']}}
    except Exception as e:
        return {'statusCode': 500, 'body': {'message': 'Unexpected error getting user collection details', 'error': str(e)}}


def exportUsersCsv(params=None):
    """Export all user records as CSV (uid, email, displayName, status, createdAt)."""
    params = params or {}

    try:
        items = []
        scan_kwargs = {}

        response = user_table.scan(**scan_kwargs)
        items.extend(response.get('Items', []))

        while 'LastEvaluatedKey' in response:
            response = user_table.scan(ExclusiveStartKey=response['LastEvaluatedKey'], **scan_kwargs)
            items.extend(response.get('Items', []))

        items = convert_sets_to_lists(items)

        output = io.StringIO()
        writer = csv.writer(output)
        writer.writerow(['uid', 'email', 'displayName', 'status', 'createdAt'])

        for item in items:
            auth_data = item.get('authData') or {}
            email = auth_data.get('email') or item.get('email') or ''
            display_name = item.get('displayName') or auth_data.get('displayName') or ''
            status = item.get('status') or 'active'
            created_at = item.get('createdAt') or item.get('createAt') or ''

            writer.writerow([
                item.get('uid', ''),
                email,
                display_name,
                status,
                created_at,
            ])

        csv_content = output.getvalue()
        output.close()

        encoded = base64.b64encode(csv_content.encode('utf-8')).decode('utf-8')

        return {
            'statusCode': 200,
            'body': {
                'fileName': params.get('fileName') or 'users-export.csv',
                'contentType': 'text/csv',
                'data': encoded,
            },
        }

    except Exception as e:
        return {
            'statusCode': 500,
            'body': {
                'message': 'Failed to export users CSV.',
                'error': str(e),
            },
        }

