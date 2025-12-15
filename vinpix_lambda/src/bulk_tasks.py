"""
Simplified Bulk Tasks Module

This module now only handles AI-powered prompt parsing.
No database storage, no batch management - just parse markdown to prompts.
"""

import src.aiService as ai


def parse_prompts(raw_text):
    """
    Parse raw markdown text into individual prompts using AI.
    
    Args:
        raw_text: The pasted markdown text
    
    Returns:
        dict: { "success": bool, "prefix": str, "prompts": [str, ...] }
    """
    try:
        print(f"Parsing bulk prompts for text length: {len(str(raw_text))}")
        
        # Call the new simplified parsing function in aiService
        response = ai.parse_bulk_prompts(raw_text)
        
        if isinstance(response, dict) and 'error' in response:
            print(f"AI parsing failed: {response['error']}")
            return {
                'statusCode': 500,
                'body': {'error': f"AI parsing failed: {response['error']}"}
            }
        
        prompts = response.get('prompts')
        if prompts is None:
            prompts = []
            
        print(f"Successfully parsed {len(prompts)} prompts")
            
        return {
            'statusCode': 200,
            'body': {
                'success': True,
                'prefix': response.get('prefix', ''),
                'prompts': prompts
            }
        }
    
    except Exception as e:
        print(f"Error parsing prompts: {str(e)}")
        return {
            'statusCode': 500,
            'body': {'error': f'Failed to parse prompts: {str(e)}'}
        }