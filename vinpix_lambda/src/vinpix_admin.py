from .utils import *
import boto3
from boto3.dynamodb.conditions import Key, Attr
from datetime import datetime
import time

def loginVinpixAdmin(email, password):
    """
    Authenticate admin user using email and password.
    Validates against vinpix_admin table.
    
    Args:
        email (str): Admin user's email address
        password (str): Admin user's password
        
    Returns:
        dict: Response with admin user data and session token
    """
    try:
        # Input validation
        if not email or not password:
            return {
                'statusCode': 400,
                'body': {'error': 'email and password are required.'}
            }
        
        admin_user = None
        
        # Try to find by email
        try:
            response = vinpix_admin_table.query(
                IndexName='email-index',
                KeyConditionExpression=boto3.dynamodb.conditions.Key('email').eq(email)
            )
            items = response.get('Items', [])
            if items:
                admin_user = items[0]
        except Exception:
            # If GSI doesn't exist, scan by email
            try:
                response = vinpix_admin_table.scan(
                    FilterExpression=Attr('email').eq(email)
                )
                items = response.get('Items', [])
                if items:
                    admin_user = items[0]
            except Exception as e:
                print(f"Error querying admin user: {str(e)}")
        
        if not admin_user:
            return {
                'statusCode': 401,
                'body': {'error': 'Invalid email or password.'}
            }
        
        # Check password
        import hashlib
        password_hash = hashlib.sha256(password.encode()).hexdigest()
        
        if admin_user.get('passwordHash') != password_hash:
            return {
                'statusCode': 401,
                'body': {'error': 'Invalid email or password.'}
            }
        
        # Check status
        if admin_user.get('status') != 'active':
            return {
                'statusCode': 403,
                'body': {'error': 'Account is not active.'}
            }
        
        # Generate session token
        session_token = short_uuid()
        expires_at = int(time.time()) + (7 * 24 * 60 * 60)  # 7 days
        
        # Update last active
        try:
            vinpix_admin_table.update_item(
                Key={'uid': admin_user['uid']},
                UpdateExpression='SET lastActive = :lastActive',
                ExpressionAttributeValues={
                    ':lastActive': datetime.utcnow().isoformat() + 'Z'
                }
            )
        except Exception as e:
            print(f"Error updating last active: {str(e)}")
        
        print(f"Admin user logged in: {admin_user['uid']}, email: {email}")
        
        return {
            'statusCode': 200,
            'body': {
                'adminUser': {
                    'uid': admin_user['uid'],
                    'email': admin_user['email'],
                    'displayName': admin_user.get('displayName', ''),
                    'status': admin_user.get('status', 'active')
                },
                'sessionToken': session_token,
                'expiresAt': expires_at,
                'lambdaUrl': 'https://gr5ama7oef2mwzwikipq4xbqye0etaca.lambda-url.ap-southeast-1.on.aws/'
            }
        }
        
    except Exception as e:
        print(f"Error logging in admin user: {str(e)}")
        return {
            'statusCode': 500,
            'body': {'error': f'Failed to login: {str(e)}'}
        }

def verifyVinpixAdminSession(session_token):
    """
    Verify admin session token (simple implementation).
    In production, store tokens in DynamoDB with expiration.
    
    Args:
        session_token (str): Session token to verify
        
    Returns:
        dict: Response with admin user data if valid
    """
    try:
        if not session_token:
            return {
                'statusCode': 401,
                'body': {'error': 'Session token is required.'}
            }
        
        # For now, we'll just return success
        # In production, verify token from session table
        return {
            'statusCode': 200,
            'body': {
                'valid': True,
                'message': 'Session is valid'
            }
        }
        
    except Exception as e:
        print(f"Error verifying session: {str(e)}")
        return {
            'statusCode': 500,
            'body': {'error': f'Failed to verify session: {str(e)}'}
        }

def helloWorld(params):
    """
    Simple hello world function for testing lambda connection.
    
    Args:
        params (dict): Optional parameters
            - name (str): Name to greet
            
    Returns:
        dict: Response with greeting message
    """
    try:
        name = params.get('name', 'World')
        message = f"Hello, {name}! This is a test from Vinpix Lambda."
        
        return {
            'statusCode': 200,
            'body': {
                'message': message,
                'timestamp': datetime.utcnow().isoformat() + 'Z',
                'params': params
            }
        }
        
    except Exception as e:
        print(f"Error in helloWorld: {str(e)}")
        return {
            'statusCode': 500,
            'body': {'error': f'Failed to execute helloWorld: {str(e)}'}
        }

