from .utils import *
import json
import os
from . import aiService as ai
from botocore.exceptions import ClientError
from . import telegram as telegram
from . import s3helper as s3


def promptSuggest(data, language: str):
    """
    Analyze the provided image data and generate 5 creative suggestions to improve the image.
    Suggestions can include adjustments to camera angle, facial expression, accessory addition, or clothing modifications.
    Example suggestions include: "High Angle Front View", "Depth-Enhanced Front View", 
    "make the person smile", "add glasses", "change the shirt color", etc.

    Args:
        data: The image data (base64 encoded image) to be analyzed.
        language (str): The language in which the AI should respond, if not English.

    Returns:
        dict: A response dictionary with a statusCode and body containing a JSON object with the key "suggestions".
    """
    
    # Prepare the basic instructions
    base_prompt = "analyze the image"
    if language != "English":
        base_prompt += " and reply in " + language + " language"
    
    # Define a system prompt directing the AI on what to do
    sysPrompt = (
        "You will analyze the image provided and generate 5 creative improvement suggestions. "
        "Each suggestion should be concise and focus on how to improve the image—for example, suggesting a different camera angle, "
        "adding accessories, changing clothing colors, or modifying the hairstyle to side part,.. "
        "'make her raise her hand doing hi symbol','change the shirt color'.,'Make her sleep under a tree with sunlight filtering through the leaves.', 'Make her sitting in a small café, writing in a journal.', 'put hand in the pocket',... be creative"
        "Return a valid JSON object with a key 'suggestions' that contains exactly 5 distinct suggestions."
    )
    image_url = s3.upload_to_s3(data, S3_BUCKET, "uploads/images")
    # Define the JSON schema for the expected output
    prompt_suggest_schema = {
        "type": "object",
        "properties": {
            "suggestions": {
                "type": "array",
                "description": "A list of 5 creative improvement prompts for the image.",
                "minItems": 5,
                "maxItems": 5,
                "items": {
                    "type": "string"
                }
            }
        },
        "required": ["suggestions"]
    }
    
    # Call the AI service with the image data, system prompt, base instruction, and JSON schema
    res = ai.call_generate_content_with_base64_image(sysPrompt, data, base_prompt, jsonRule=prompt_suggest_schema)
    
    # Parse the returned JSON response
    res = json.loads(res)
    
    return {
        'statusCode': 200,
        'body': {
            'res': res,
            'image_url': image_url
        },
    }

def add_reportCount(uid: str):
    """
    Increments the report_count for the given uid in the DynamoDB feedback_table.
    If the uid does not exist, it initializes the report_count to 1.
    
    Args:
        uid (str): The unique identifier for the user.
        
    Returns:
        dict: A response dictionary with statusCode and body.
    """
    if not isinstance(uid, str) or not uid.strip():
    
        return {
            'statusCode': 400,
            'body': "Invalid UID provided."
        }
    
    try:
        response = feedback_table.update_item(
            Key={'uid': uid},
            UpdateExpression='SET report_count = if_not_exists(report_count, :start) + :inc',
            ExpressionAttributeValues={
                ':inc': 1,
                ':start': 0
            },
            ReturnValues='UPDATED_NEW'
        )
        new_count = response['Attributes']['report_count']
      
        return {
            'statusCode': 200,
            'body': f"Report count for uid '{uid}' is now {new_count}."
        }
    except ClientError as e:
       
        return {
            'statusCode': 500,
            'body': f"An error occurred: {e.response['Error']['Message']}"
        }

def add_report(uid: str, content: str):
    """
    Adds a report to the report_table for the given uid with the provided content.
    If the uid does not exist in feedback_table, it will be created.
    The report is added to a 'reports' list field, allowing multiple reports per uid.

    Args:
        uid (str): The unique identifier for the user.
        content (str): The content of the report.

    Returns:
        dict: A response dictionary with statusCode and body.
    """
    # Input Validation
    if not isinstance(uid, str) or not uid.strip():
        return {
            'statusCode': 400,
            'body': "Invalid UID provided."
        }

    if not isinstance(content, str) or not content.strip():
        return {
            'statusCode': 400,
            'body': "Invalid content provided."
        }

    try:
        # Attempt to retrieve the UID from feedback_table
        feedback_response = feedback_table.get_item(
            Key={'uid': uid},
            ProjectionExpression='uid'  # Only fetch the UID to minimize data transfer
        )

        if 'Item' not in feedback_response:
            # UID does not exist; create a new entry in feedback_table
            feedback_table.put_item(
                Item={
                    'uid': uid,
                    # Add other necessary attributes here if your table requires them
                    'created_at': int(time.time())  # Example attribute
                }
            )

        # Generate a unique report_id
        report_id = str(uuid.uuid4())

        # Create the new report entry
        new_report = {
            'report_id': report_id,
            'content': content,
            'timestamp': int(time.time())
        }

        telegram.send_message("Report by: "+uid +" " + content)

        # Update the report_table by appending the new report to the 'reports' list
        report_table.update_item(
            Key={'uid': uid},
            UpdateExpression='SET reports = list_append(if_not_exists(reports, :empty_list), :new_report)',
            ExpressionAttributeValues={
                ':new_report': [new_report],
                ':empty_list': []
            },
            ReturnValues='UPDATED_NEW'
        )

        return {
            'statusCode': 200,  # 201 Created
            'body': f"Report added successfully with report_id '{report_id}'."
        }

    except ClientError as e:
        return {
            'statusCode': 500,
            'body': f"An error occurred: {e.response['Error']['Message']}"
        }
    except Exception as ex:
        return {
            'statusCode': 500,
            'body': f"An unexpected error occurred: {str(ex)}"
        }

def improve_prompt(prompt: str, language: str = "English"):
    """
    Enhances a user's prompt by making it more detailed, creative, and effective.
    
    Args:
        prompt (str): The original prompt to be improved.
        language (str): The language in which the AI should respond, default is English.
    
    Returns:
        dict: A response dictionary with a statusCode and body containing the improved prompt.
    """
    if not isinstance(prompt, str) or not prompt.strip():
        return {
            'statusCode': 400,
            'body': "Invalid prompt provided."
        }
    
    # Create system instructions for the AI
    sys_prompt = (
        "You are a prompt enhancement expert. Your task is to improve the user's image generation prompt "
        "start with 'make her', or 'make the scene'. For example: user input Make her sit on a soft bed reading book then your output will be"
        "Make her sit on a soft bed, legs folded comfortably to the side, holding an open book. She is slightly leaning forward, deeply immersed in reading. Her face is softly illuminated by the warm glow of multiple candles around her, creating a peaceful and intimate ambiance. The camera angle is a medium close-up shot, slightly tilted from the side, capturing her serene expression and the flickering candlelight in the background. The mood is warm, cozy, and dreamy, evoking a quiet, introspective moment."
        "Return a single improved prompt without explanations or additional text."
    )
    
    # Create the base instruction
    base_instruction = f"Improve this image generation prompt: {prompt}"
    if language != "English":
        base_instruction += f" and reply in {language} language"
    
    # Schema for the expected response format
    improved_prompt_schema = {
        "type": "object",
        "properties": {
            "improved_prompt": {
                "type": "string",
                "description": "The enhanced, more detailed version of the original prompt."
            }
        },
        "required": ["improved_prompt"]
    }
    
    try:
        # Call the AI service to improve the prompt
        response = ai.call_generate_content(sys_prompt, base_instruction, jsonRule=improved_prompt_schema)
        
        # Parse the returned JSON response
        result = json.loads(response)
        
        return {
            'statusCode': 200,
            'body': {
                'original_prompt': prompt,
                'improved_prompt': result['improved_prompt']
            }
        }
    except Exception as ex:
        return {
            'statusCode': 500,
            'body': f"An error occurred while improving the prompt: {str(ex)}"
        }