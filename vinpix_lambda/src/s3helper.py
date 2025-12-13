from typing import Dict, Any, List
import boto3
import base64
import uuid

def upload_to_s3(data: Any, bucket: str, key: str, is_json: bool = False) -> Dict[str, str]:
    """
    Uploads data to S3. Supports base64 images or JSON data.

    Parameters:
        data: Base64 string (if image) or Dict/List (if JSON).
        bucket (str): The S3 bucket name.
        key (str): The full S3 key (including folder/filename).
        is_json (bool): Whether the data is JSON.

    Returns:
        Dict[str, str]: { 'key': key, 'url': url }
    """
    s3 = boto3.client('s3')
    
    try:
        if is_json:
            import json
            body = json.dumps(data)
            content_type = 'application/json'
            # No base64 decoding needed for JSON
        else:
            # Assume base64 image
            if isinstance(data, str) and data.startswith('data:'):
                header, encoded = data.split(',', 1)
                file_bytes = base64.b64decode(encoded)
                content_type = header.split(';')[0].split(':')[1]
            else:
                file_bytes = base64.b64decode(data)
                content_type = 'image/webp' # Default fallback
            body = file_bytes

        put_params = {
            'Bucket': bucket,
            'Key': key,
            'Body': body,
            'ContentType': content_type
        }
        
        # Removed ACL setting to support buckets with "Bucket owner enforced" setting
        if not is_json:
            put_params['CacheControl'] = "public, max-age=31536000"

        s3.put_object(**put_params)
        
        url = f"https://{bucket}.s3.amazonaws.com/{key}"
        return { 'key': key, 'url': url }

    except Exception as e:
        raise Exception(f"Failed to upload to S3: {str(e)}")
    
def read_from_s3(bucket: str, key: str) -> Any:
    """
    Reads a file from S3.
    """
    s3 = boto3.client('s3')
    try:
        response = s3.get_object(Bucket=bucket, Key=key)
        content = response['Body'].read().decode('utf-8')
        return content
    except Exception as e:
        raise Exception(f"Failed to read from S3: {str(e)}")

def delete_folder_from_s3(bucket: str, prefix: str):
    """
    Deletes all objects in a folder from S3.
    """
    s3 = boto3.client('s3')
    try:
        # List all objects with the prefix
        response = s3.list_objects_v2(Bucket=bucket, Prefix=prefix)
        
        if 'Contents' in response:
            objects_to_delete = [{'Key': obj['Key']} for obj in response['Contents']]
            
            # Delete in batches of 1000 (S3 limit)
            for i in range(0, len(objects_to_delete), 1000):
                batch = objects_to_delete[i:i+1000]
                s3.delete_objects(
                    Bucket=bucket,
                    Delete={'Objects': batch}
                )
                
            # Check if there are more objects (pagination)
            while response.get('IsTruncated'):
                response = s3.list_objects_v2(Bucket=bucket, Prefix=prefix, ContinuationToken=response['NextContinuationToken'])
                if 'Contents' in response:
                    objects_to_delete = [{'Key': obj['Key']} for obj in response['Contents']]
                    for i in range(0, len(objects_to_delete), 1000):
                        batch = objects_to_delete[i:i+1000]
                        s3.delete_objects(
                            Bucket=bucket,
                            Delete={'Objects': batch}
                        )
                        
    except Exception as e:
        print(f"Warning: Failed to delete folder {prefix} from S3: {str(e)}")
        # Don't raise, just log warning as this is cleanup




def generate_presigned_url(bucket: str, key: str, expires_in_seconds: int = 3600, response_content_disposition: str = None) -> str:
    """
    Generate a presigned URL for an object in S3 to allow temporary access.

    Parameters:
        bucket (str): The S3 bucket name
        key (str): The object key inside the bucket
        expires_in_seconds (int): Time in seconds the URL remains valid
        response_content_disposition (str): Content-Disposition header for the response (e.g., 'attachment')

    Returns:
        str: The presigned URL for GET access
    """
    s3 = boto3.client('s3')
    try:
        params = {'Bucket': bucket, 'Key': key}
        if response_content_disposition:
            params['ResponseContentDisposition'] = response_content_disposition

        url = s3.generate_presigned_url(
            ClientMethod='get_object',
            Params=params,
            ExpiresIn=expires_in_seconds
        )
        return url
    except Exception as e:
        raise Exception(f"Failed to generate presigned URL: {str(e)}")


def generate_presigned_put_url(bucket: str, key: str, content_type: str, expires_in_seconds: int = 3600) -> str:
    """
    Generate a presigned PUT URL for direct browser upload to S3.

    Parameters:
        bucket (str): The S3 bucket name
        key (str): The object key to upload
        content_type (str): The content type for the upload
        expires_in_seconds (int): Time in seconds the URL remains valid

    Returns:
        str: The presigned URL for PUT
    """
    s3 = boto3.client('s3')
    try:
        url = s3.generate_presigned_url(
            ClientMethod='put_object',
            Params={'Bucket': bucket, 'Key': key, 'ContentType': content_type},
            ExpiresIn=expires_in_seconds
        )
        return url
    except Exception as e:
        raise Exception(f"Failed to generate presigned PUT URL: {str(e)}")

def delete_objects_from_s3(bucket: str, keys: List[str]):
    """
    Deletes a list of objects from S3.
    """
    if not keys:
        return

    s3 = boto3.client('s3')
    try:
        objects_to_delete = [{'Key': k} for k in keys]
        
        # Delete in batches of 1000 (S3 limit)
        for i in range(0, len(objects_to_delete), 1000):
            batch = objects_to_delete[i:i+1000]
            s3.delete_objects(
                Bucket=bucket,
                Delete={'Objects': batch}
            )
    except Exception as e:
        raise Exception(f"Failed to delete objects from S3: {str(e)}")
