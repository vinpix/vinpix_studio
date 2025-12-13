
import json
import uuid
import time
import boto3
import re
from boto3.dynamodb.conditions import Key, Attr
from .utils import contract_table, short_uuid, convert_sets_to_lists, S3_BUCKET, get_s3_key
from .s3helper import upload_to_s3
import src.aiService as ai
from datetime import datetime

s3_client = boto3.client('s3')

def _get_contract_item(contract_id):
    """Helper to get contract item by querying contract_id."""
    try:
        response = contract_table.query(
            KeyConditionExpression=Key('contract_id').eq(contract_id)
        )
        items = response.get('Items', [])
        if not items:
            return None
        return items[0]
    except Exception as e:
        print(f"Error querying contract: {str(e)}")
        return None

def _save_input_data_to_s3(contract_id, input_data):
    """Helper to save input data to S3 as JSON."""
    try:
        s3_key = get_s3_key(f"contracts/{contract_id}_input.json")
        s3_client.put_object(
            Bucket=S3_BUCKET,
            Key=s3_key,
            Body=json.dumps(input_data).encode('utf-8'),
            ContentType='application/json'
        )
        return f"https://{S3_BUCKET}.s3.amazonaws.com/{s3_key}"
    except Exception as e:
        print(f"Error saving input data to S3: {str(e)}")
        return None

def create_contract(params):
    """
    Create a new contract draft.
    """
    try:
        user_id = params.get('userId')
        title = params.get('title')
        
        if not user_id or not title:
            return {'statusCode': 400, 'body': {'error': 'userId and title are required'}}
            
        contract_id = short_uuid()
        created_at = datetime.utcnow().isoformat() + 'Z'
        
        item = {
            'contract_id': contract_id,
            'user_id': user_id,
            'title': title,
            'status': 'draft',
            'created_at': created_at,
            'updated_at': created_at,
            'html_content': '',
            'input_data': {},
            'signatures': {
                'owner': None,
                'partner': None
            }
        }
        
        contract_table.put_item(Item=item)
        
        return {
            'statusCode': 200,
            'body': {
                'message': 'Contract created',
                'contract': item
            }
        }
    except Exception as e:
        print(f"Error creating contract: {str(e)}")
        return {'statusCode': 500, 'body': {'error': str(e)}}

def get_contracts(params):
    """
    Get all contracts for a user.
    """
    try:
        user_id = params.get('userId')
        if not user_id:
            return {'statusCode': 400, 'body': {'error': 'userId is required'}}
            
        response = contract_table.scan(
            FilterExpression=Attr('user_id').eq(user_id)
        )
        
        items = convert_sets_to_lists(response.get('Items', []))
        items.sort(key=lambda x: x.get('created_at', ''), reverse=True)
        
        return {
            'statusCode': 200,
            'body': {
                'contracts': items
            }
        }
    except Exception as e:
        print(f"Error getting contracts: {str(e)}")
        return {'statusCode': 500, 'body': {'error': str(e)}}

def get_contract_details(params):
    """
    Get full details of a contract.
    """
    try:
        contract_id = params.get('contractId')
        user_id = params.get('userId')
        
        if not contract_id:
            return {'statusCode': 400, 'body': {'error': 'contractId is required'}}
            
        # Use helper to query
        contract = _get_contract_item(contract_id)
        
        if not contract:
            return {'statusCode': 404, 'body': {'error': 'Contract not found'}}
            
        contract = convert_sets_to_lists(contract)
        
        if user_id and contract.get('user_id') != user_id:
             return {'statusCode': 403, 'body': {'error': 'Access denied'}}
             
        return {
            'statusCode': 200,
            'body': {
                'contract': contract
            }
        }
    except Exception as e:
        print(f"Error getting contract details: {str(e)}")
        return {'statusCode': 500, 'body': {'error': str(e)}}

def generate_contract(params):
    """
    Generate contract HTML content using AI.
    """
    try:
        contract_id = params.get('contractId')
        input_data = params.get('inputData')
        user_id = params.get('userId')
        
        if not contract_id or not input_data:
            return {'statusCode': 400, 'body': {'error': 'contractId and inputData are required'}}
            
        # Verify ownership & get item for SK
        contract = _get_contract_item(contract_id)
        if not contract:
            return {'statusCode': 404, 'body': {'error': 'Contract not found'}}
            
        if contract.get('user_id') != user_id:
            return {'statusCode': 403, 'body': {'error': 'Access denied'}}
            
        created_at = contract.get('created_at')
            
        # Construct Prompt
        system_instruct = "You are a professional legal contract generator. Create a valid, well-formatted HTML contract based on the provided details. Output ONLY the HTML code within <body> tags (do not include <html> or <head>). Use inline CSS for styling to look professional (Times New Roman, 12pt, adequate spacing). The contract should have clear sections. IMPORTANT: For the signature section, you MUST use exactly these containers with these IDs: <div id='signature-owner'>[Owner Signature Placeholder]</div>, <div id='name-owner'>[Owner Name Placeholder]</div>, <div id='signature-partner'>[Partner Signature Placeholder]</div>, and <div id='name-partner'>[Partner Name Placeholder]</div>."
        
        prompt = f"""
        Generate a contract based on the following data:
        {json.dumps(input_data, indent=2)}
        
        The contract should be professional and cover standard legal clauses relevant to the data provided.
        Ensure there are placeholders for signatures at the bottom if not explicitly handled.
        """
        
        # Call AI
        generated_html = ai.call_generate_content(system_instruct, prompt)
        
        if isinstance(generated_html, dict) and 'error' in generated_html:
             return {'statusCode': 500, 'body': {'error': 'AI generation failed', 'details': generated_html}}

        # Save HTML to S3
        s3_key = get_s3_key(f"contracts/{contract_id}.html")
        s3_client.put_object(
            Bucket=S3_BUCKET,
            Key=s3_key,
            Body=generated_html.encode('utf-8'),
            ContentType='text/html'
        )
        html_url = f"https://{S3_BUCKET}.s3.amazonaws.com/{s3_key}"

        # Save Input Data to S3
        input_url = _save_input_data_to_s3(contract_id, input_data)

        # Update DB
        updated_at = datetime.utcnow().isoformat() + 'Z'
        
        contract_table.update_item(
            Key={'contract_id': contract_id, 'created_at': created_at},
            UpdateExpression="SET html_content = :html, s3_url = :url, input_data = :data, input_data_s3_url = :iurl, updated_at = :ua, #s = :status",
            ExpressionAttributeNames={'#s': 'status'},
            ExpressionAttributeValues={
                ':html': generated_html,
                ':url': html_url,
                ':data': input_data,
                ':iurl': input_url,
                ':ua': updated_at,
                ':status': 'generated'
            }
        )
        
        return {
            'statusCode': 200,
            'body': {
                'message': 'Contract generated successfully',
                'htmlContent': generated_html,
                's3Url': html_url,
                'inputS3Url': input_url
            }
        }
        
    except Exception as e:
        print(f"Error generating contract: {str(e)}")
        return {'statusCode': 500, 'body': {'error': str(e)}}

def sign_contract(params):
    """
    Sign the contract.
    """
    try:
        contract_id = params.get('contractId')
        role = params.get('role') 
        signature_data = params.get('signatureData')
        signer_name = params.get('signerName')
        user_id = params.get('userId')
        
        if not contract_id or not role or not signature_data:
            return {'statusCode': 400, 'body': {'error': 'Missing required fields'}}
            
        if role not in ['owner', 'partner']:
             return {'statusCode': 400, 'body': {'error': 'Invalid role'}}

        # Get current contract
        contract = _get_contract_item(contract_id)
        if not contract:
            return {'statusCode': 404, 'body': {'error': 'Contract not found'}}
            
        created_at = contract.get('created_at')
        
        # Verify permissions
        if role == 'owner':
            if contract.get('user_id') != user_id:
                return {'statusCode': 403, 'body': {'error': 'Only owner can sign as owner'}}
        
        # Handle signature data (upload if base64 image)
        stored_signature = signature_data
        if signature_data.startswith('data:image'):
            try:
                upload_result = upload_to_s3(signature_data, S3_BUCKET, 'contracts/signatures')
                stored_signature = upload_result['url']
            except Exception as e:
                print(f"Error uploading signature: {str(e)}")
                # Fallback: keep the original base64 data URI to ensure signature persists
                # This avoids blocking the signing flow when bucket policies disallow ACLs
                stored_signature = signature_data

        # Update HTML content with signature image
        html_content = contract.get('html_content', '')
        
        if html_content:
            # 1. Update Signature Image (support both http(s) and data URI)
            if stored_signature.startswith('http') or stored_signature.startswith('data:image'):
                # Slight upward shift using negative margin-top to better align within the signature box
                img_tag = (
                    f'<img src="{stored_signature}" alt="{role} signature" '
                    f'style="max-height: 80px; max-width: 200px; display: block; '
                    f'margin-top: -12px; margin-bottom: 0; vertical-align: bottom;" />'
                )
                div_id = f'signature-{role}'
                pattern = re.compile(f'(<div[^>]*id=[\'"]{div_id}[\'"][^>]*>)(.*?)(</div>)', re.DOTALL | re.IGNORECASE)
                if pattern.search(html_content):
                    html_content = pattern.sub(f'\\1{img_tag}\\3', html_content)
                else:
                    # Fallback: Try to find text placeholder if ID not found
                    fallback_patterns = [
                        f'{role} signature',
                        f'\\[{role} signature placeholder\\]',
                        f'\\[{role} signature\\]'
                    ]
                    for pat_str in fallback_patterns:
                         fallback_pat = re.compile(pat_str, re.IGNORECASE)
                         if fallback_pat.search(html_content):
                             html_content = fallback_pat.sub(img_tag, html_content)
                             break

            # 2. Update Signer Name
            if signer_name:
                div_id_name = f'name-{role}'
                pattern_name = re.compile(f'(<div[^>]*id=[\'"]{div_id_name}[\'"][^>]*>)(.*?)(</div>)', re.DOTALL | re.IGNORECASE)
                # Create a nice bold name
                # Slight upward shift using negative margin-top for tighter grouping with signature
                name_html = (
                    f'<span style="display: block; margin-top: -8px; '
                    f'font-weight: bold; font-family: serif; font-size: 14pt;">{signer_name}</span>'
                )
                name_replaced = False
                if pattern_name.search(html_content):
                    html_content = pattern_name.sub(f'\\1{name_html}\\3', html_content)
                    name_replaced = True
                else:
                    # Fallback for name by replacing textual placeholders
                    fallback_patterns_name = [
                        f'{role} name',
                        f'\\[{role} name placeholder\\]',
                        f'\\[{role} name\\]'
                    ]
                    for pat_str in fallback_patterns_name:
                        fallback_pat = re.compile(pat_str, re.IGNORECASE)
                        if fallback_pat.search(html_content):
                            html_content = fallback_pat.sub(name_html, html_content)
                            name_replaced = True
                            break
                if not name_replaced:
                    # As a final fallback, insert the name block right after the signature-{role} div
                    sig_div_pat = re.compile(
                        f'(<div[^>]*id=[\'"]signature-{role}[\'"][^>]*>.*?</div>)',
                        re.DOTALL | re.IGNORECASE
                    )
                    if sig_div_pat.search(html_content):
                        html_content = sig_div_pat.sub(
                            lambda m: m.group(1) + f'<div id=\"{div_id_name}\">{name_html}</div>',
                            html_content,
                            count=1
                        )
                
            # Update S3 HTML
            try:
                s3_key = get_s3_key(f"contracts/{contract_id}.html")
                s3_client.put_object(
                    Bucket=S3_BUCKET,
                    Key=s3_key,
                    Body=html_content.encode('utf-8'),
                    ContentType='text/html'
                )
            except Exception as e:
                print(f"Error updating HTML on S3: {str(e)}")

        # Update signature in DB
        updated_at = datetime.utcnow().isoformat() + 'Z'
        
        # Check if signatures attribute exists and is valid
        if 'signatures' not in contract or not isinstance(contract['signatures'], dict):
            # Initialize signatures map if missing or invalid
            current_signatures = {'owner': None, 'partner': None}
            current_signatures[role] = stored_signature
            
            update_expression = "SET signatures = :sig, updated_at = :ua"
            expression_values = {
                ':sig': current_signatures,
                ':ua': updated_at
            }
            expr_names = None
        else:
            update_expression = f"SET signatures.#{role} = :sig, updated_at = :ua"
            expression_values = {
                ':sig': stored_signature,
                ':ua': updated_at
            }
            expr_names = {f"#{role}": role}
        
        # If we updated HTML, save it too
        if html_content != contract.get('html_content'):
            update_expression += ", html_content = :html"
            expression_values[':html'] = html_content

        update_params = {
            'Key': {'contract_id': contract_id, 'created_at': created_at},
            'UpdateExpression': update_expression,
            'ExpressionAttributeValues': expression_values
        }
        if expr_names:
            update_params['ExpressionAttributeNames'] = expr_names
            
        contract_table.update_item(**update_params)
        
        other_role = 'partner' if role == 'owner' else 'owner'
        signatures = contract.get('signatures', {}) or {}
        if signatures.get(other_role):
             contract_table.update_item(
                Key={'contract_id': contract_id, 'created_at': created_at},
                UpdateExpression="SET #s = :status",
                ExpressionAttributeNames={'#s': 'status'},
                ExpressionAttributeValues={':status': 'completed'}
            )
        elif role == 'owner':
             if contract.get('status') == 'generated':
                 contract_table.update_item(
                    Key={'contract_id': contract_id, 'created_at': created_at},
                    UpdateExpression="SET #s = :status",
                    ExpressionAttributeNames={'#s': 'status'},
                    ExpressionAttributeValues={':status': 'signed_by_owner'}
                )

        return {
            'statusCode': 200,
            'body': {
                'message': 'Signed successfully',
                'htmlContent': html_content,
                's3Url': f"https://{S3_BUCKET}.s3.amazonaws.com/{get_s3_key(f'contracts/{contract_id}.html')}"
            }
        }

    except Exception as e:
        print(f"Error signing contract: {str(e)}")
        return {'statusCode': 500, 'body': {'error': str(e)}}

def delete_signature(params):
    """
    Delete signature for a specific role (owner or partner).
    """
    try:
        contract_id = params.get('contractId')
        role = params.get('role')  # 'owner' or 'partner'
        user_id = params.get('userId')
        
        if not contract_id or not role:
            return {'statusCode': 400, 'body': {'error': 'contractId and role are required'}}
        
        if role not in ['owner', 'partner']:
            return {'statusCode': 400, 'body': {'error': 'role must be owner or partner'}}
        
        contract = _get_contract_item(contract_id)
        if not contract:
            return {'statusCode': 404, 'body': {'error': 'Contract not found'}}
        
        created_at = contract.get('created_at')
        
        # Verify permissions
        if role == 'owner':
            if contract.get('user_id') != user_id:
                return {'statusCode': 403, 'body': {'error': 'Only owner can delete owner signature'}}
        # Partner can delete their own signature (no user_id check needed for public view)
        
        # Get current signatures
        signatures = contract.get('signatures', {}) or {}
        if not isinstance(signatures, dict):
            signatures = {'owner': None, 'partner': None}
        
        # Get signature URL to delete from S3 if it exists
        signature_to_delete = signatures.get(role)
        
        # Remove signature from dict
        signatures[role] = None
        
        # Update HTML content to remove signature
        html_content = contract.get('html_content', '')
        if html_content:
            # Remove signature image
            div_id = f'signature-{role}'
            pattern = re.compile(f'(<div[^>]*id=[\'"]{div_id}[\'"][^>]*>)(.*?)(</div>)', re.DOTALL | re.IGNORECASE)
            if pattern.search(html_content):
                # Replace with placeholder
                html_content = pattern.sub(f'\\1[{role} signature placeholder]\\3', html_content)
            
            # Remove name
            div_id_name = f'name-{role}'
            pattern_name = re.compile(f'(<div[^>]*id=[\'"]{div_id_name}[\'"][^>]*>)(.*?)(</div>)', re.DOTALL | re.IGNORECASE)
            if pattern_name.search(html_content):
                html_content = pattern_name.sub(f'\\1[{role} name placeholder]\\3', html_content)
            
            # Update S3 HTML
            try:
                s3_key = get_s3_key(f"contracts/{contract_id}.html")
                s3_client.put_object(
                    Bucket=S3_BUCKET,
                    Key=s3_key,
                    Body=html_content.encode('utf-8'),
                    ContentType='text/html'
                )
            except Exception as e:
                print(f"Error updating HTML on S3: {str(e)}")
        
        # Delete signature file from S3 if it's a URL
        if signature_to_delete and signature_to_delete.startswith('http'):
            try:
                # Extract S3 key from URL
                # URL format: https://bucket.s3.amazonaws.com/contracts/signatures/uuid.ext
                if 'contracts/signatures/' in signature_to_delete:
                    key_part = signature_to_delete.split('contracts/signatures/')[-1]
                    s3_key = get_s3_key(f"contracts/signatures/{key_part}")
                    s3_client.delete_object(Bucket=S3_BUCKET, Key=s3_key)
            except Exception as e:
                print(f"Warning: Failed to delete signature from S3: {str(e)}")
        
        # Update DynamoDB
        updated_at = datetime.utcnow().isoformat() + 'Z'
        update_expression = f"SET signatures.#{role} = :sig, updated_at = :ua"
        expression_values = {
            ':sig': None,
            ':ua': updated_at
        }
        expression_names = {f"#{role}": role}
        
        # If we updated HTML, save it too
        if html_content != contract.get('html_content'):
            update_expression += ", html_content = :html"
            expression_values[':html'] = html_content
        
        contract_table.update_item(
            Key={'contract_id': contract_id, 'created_at': created_at},
            UpdateExpression=update_expression,
            ExpressionAttributeNames=expression_names,
            ExpressionAttributeValues=expression_values
        )
        
        # Update status if needed
        # If both signatures are now None, revert to previous status
        if not signatures.get('owner') and not signatures.get('partner'):
            # Both deleted, revert to generated or draft
            original_status = contract.get('status', 'draft')
            if original_status in ['completed', 'signed_by_owner']:
                new_status = 'generated' if original_status == 'signed_by_owner' else 'draft'
                contract_table.update_item(
                    Key={'contract_id': contract_id, 'created_at': created_at},
                    UpdateExpression="SET #s = :status",
                    ExpressionAttributeNames={'#s': 'status'},
                    ExpressionAttributeValues={':status': new_status}
                )
        
        return {
            'statusCode': 200,
            'body': {
                'message': f'{role} signature deleted successfully',
                'htmlContent': html_content
            }
        }
        
    except Exception as e:
        print(f"Error deleting signature: {str(e)}")
        return {'statusCode': 500, 'body': {'error': str(e)}}

def update_contract_status(params):
    """
    Update status, publish (set password), etc.
    """
    try:
        contract_id = params.get('contractId')
        status = params.get('status')
        password = params.get('password')
        user_id = params.get('userId')
        
        if not contract_id or not status:
            return {'statusCode': 400, 'body': {'error': 'contractId and status required'}}
            
        # Verify owner
        contract = _get_contract_item(contract_id)
        if not contract:
            return {'statusCode': 404, 'body': {'error': 'Contract not found'}}
            
        if contract.get('user_id') != user_id:
            return {'statusCode': 403, 'body': {'error': 'Access denied'}}
            
        created_at = contract.get('created_at')
            
        update_expr = "SET #s = :status, updated_at = :ua"
        expr_vals = {
            ':status': status,
            ':ua': datetime.utcnow().isoformat() + 'Z'
        }
        
        if status == 'published' and password:
            update_expr += ", password = :pw"
            expr_vals[':pw'] = password
            
        contract_table.update_item(
            Key={'contract_id': contract_id, 'created_at': created_at},
            UpdateExpression=update_expr,
            ExpressionAttributeNames={'#s': 'status'},
            ExpressionAttributeValues=expr_vals
        )
        
        return {
            'statusCode': 200,
            'body': {
                'message': f'Status updated to {status}'
            }
        }
    except Exception as e:
        print(f"Error updating status: {str(e)}")
        return {'statusCode': 500, 'body': {'error': str(e)}}

def get_public_contract(params):
    """
    Get contract for public view (partner).
    """
    try:
        contract_id = params.get('contractId')
        provided_password = params.get('password')
        
        if not contract_id:
            return {'statusCode': 400, 'body': {'error': 'contractId required'}}
            
        contract = _get_contract_item(contract_id)
        
        if not contract:
            return {'statusCode': 404, 'body': {'error': 'Contract not found'}}
            
        # Check password if exists
        stored_password = contract.get('password')
        if stored_password:
            if not provided_password:
                return {'statusCode': 401, 'body': {'error': 'Password required', 'requirePassword': True}}
            if provided_password != stored_password:
                return {'statusCode': 403, 'body': {'error': 'Invalid password'}}
        
        # Return sanitized data
        sanitized = convert_sets_to_lists(contract)
        
        return {
            'statusCode': 200,
            'body': {
                'contract': sanitized
            }
        }
        
    except Exception as e:
        print(f"Error getting public contract: {str(e)}")
        return {'statusCode': 500, 'body': {'error': str(e)}}

def evaluate_contract_inputs(params):
    """
    Evaluate contract inputs for missing information or risks using AI.
    """
    try:
        input_data = params.get('inputData')
        
        if not input_data:
            return {'statusCode': 400, 'body': {'error': 'inputData is required'}}
            
        system_instruct = """
        You are a legal assistant. Analyze the provided contract input data. 
        Check for missing critical information, ambiguities, or potential risks based on standard contract requirements.
        Output your analysis in strict JSON format with the following schema:
        {
            "score": number (0-100),
            "missing_info": ["list", "of", "missing", "points"],
            "suggestions": ["list", "of", "suggestions"],
            "risk_level": "Low" | "Medium" | "High",
            "summary": "Brief summary of the contract intent based on inputs"
        }
        """
        
        prompt = f"""
        Analyze these contract inputs:
        {json.dumps(input_data, indent=2)}
        """
        
        ai_response = ai.call_generate_content(system_instruct, prompt, auto_pair_json=True)
        
        if isinstance(ai_response, dict) and 'error' in ai_response:
             return {'statusCode': 500, 'body': {'error': 'AI evaluation failed', 'details': ai_response}}
             
        return {
            'statusCode': 200,
            'body': {
                'evaluation': ai_response
            }
        }
        
    except Exception as e:
        print(f"Error evaluating contract inputs: {str(e)}")
        return {'statusCode': 500, 'body': {'error': str(e)}}

def save_draft(params):
    """
    Save contract draft (inputs and/or HTML) to S3 and DynamoDB.
    """
    try:
        contract_id = params.get('contractId')
        input_data = params.get('inputData')
        html_content = params.get('htmlContent')
        user_id = params.get('userId')
        
        if not contract_id:
            return {'statusCode': 400, 'body': {'error': 'contractId required'}}
            
        # Verify ownership
        contract = _get_contract_item(contract_id)
        if not contract:
            return {'statusCode': 404, 'body': {'error': 'Contract not found'}}
            
        if contract.get('user_id') != user_id:
            return {'statusCode': 403, 'body': {'error': 'Access denied'}}
            
        created_at = contract.get('created_at')
            
        update_expr = "SET updated_at = :ua"
        expr_vals = {':ua': datetime.utcnow().isoformat() + 'Z'}
        
        if input_data:
            # Save Input Data to S3
            input_url = _save_input_data_to_s3(contract_id, input_data)
            
            update_expr += ", input_data = :data, input_data_s3_url = :iurl"
            expr_vals[':data'] = input_data
            expr_vals[':iurl'] = input_url
            
        if html_content:
            # Save to S3
            s3_key = get_s3_key(f"contracts/{contract_id}.html")
            s3_client.put_object(
                Bucket=S3_BUCKET,
                Key=s3_key,
                Body=html_content.encode('utf-8'),
                ContentType='text/html'
            )
            html_url = f"https://{S3_BUCKET}.s3.amazonaws.com/{s3_key}"
            
            update_expr += ", html_content = :html, s3_url = :url"
            expr_vals[':html'] = html_content
            expr_vals[':url'] = html_url
            
        contract_table.update_item(
            Key={'contract_id': contract_id, 'created_at': created_at},
            UpdateExpression=update_expr,
            ExpressionAttributeValues=expr_vals
        )
        
        return {
            'statusCode': 200,
            'body': {
                'message': 'Draft saved successfully'
            }
        }
        
    except Exception as e:
        print(f"Error saving draft: {str(e)}")
        return {'statusCode': 500, 'body': {'error': str(e)}}

def delete_contract(params):
    """
    Delete a contract and associated S3 files.
    """
    try:
        contract_id = params.get('contractId')
        user_id = params.get('userId')
        
        if not contract_id or not user_id:
            return {'statusCode': 400, 'body': {'error': 'contractId and userId required'}}
            
        contract = _get_contract_item(contract_id)
        
        if not contract:
            # Already deleted or doesn't exist
            return {'statusCode': 200, 'body': {'message': 'Contract deleted (or not found)'}}
            
        if contract.get('user_id') != user_id:
            return {'statusCode': 403, 'body': {'error': 'Access denied'}}
            
        created_at = contract.get('created_at')
        
        # Delete from DynamoDB
        contract_table.delete_item(
            Key={'contract_id': contract_id, 'created_at': created_at}
        )
        
        # Attempt to clean up S3 (best effort)
        try:
            s3_client.delete_object(Bucket=S3_BUCKET, Key=get_s3_key(f"contracts/{contract_id}.html"))
            s3_client.delete_object(Bucket=S3_BUCKET, Key=get_s3_key(f"contracts/{contract_id}_input.json"))
        except Exception as e:
            print(f"Warning: Failed to delete S3 objects: {str(e)}")
            
        return {
            'statusCode': 200,
            'body': {
                'message': 'Contract deleted successfully'
            }
        }
        
    except Exception as e:
        print(f"Error deleting contract: {str(e)}")
        return {'statusCode': 500, 'body': {'error': str(e)}}
