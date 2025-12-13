import urllib.request
import json
import os
import src.aiService as ai
import re
import urllib.request

geminiAPIKey = os.environ.get('geminiAPIKey')
openAIKey = os.environ.get('openAIKey')
openAIModel = 'gpt-4.1-mini'
use_gemini = True

def remove_additional_properties(schema):
	"""
	Recursively removes 'additionalProperties' key from a JSON schema dictionary.
	Google's Gemini API responseSchema does not support this field.
	"""
	if isinstance(schema, dict):
		# Create a new dict excluding additionalProperties
		new_schema = {k: v for k, v in schema.items() if k != 'additionalProperties'}
		
		# Recursively process 'properties'
		if 'properties' in new_schema:
			new_schema['properties'] = {k: remove_additional_properties(v) for k, v in new_schema['properties'].items()}
			
		# Recursively process 'items'
		if 'items' in new_schema:
			new_schema['items'] = remove_additional_properties(new_schema['items'])
			
		return new_schema
	elif isinstance(schema, list):
		return [remove_additional_properties(item) for item in schema]
	return schema

def call_generate_content_with_base64_image(systemInstruct, image_base64, prompt, jsonRule=None):
	"""
	Calls the Google Generative Language API to generate content based on a Base64-encoded input image with safety filters disabled.
	
	Parameters:
		systemInstruct (str): System instructions for content generation.
		image_base64 (str): The Base64-encoded string of the input image.
	
	Returns:
		str or dict: The generated content as a string if successful, otherwise an error dictionary.
	"""
	if not geminiAPIKey:
		return {"error": "geminiAPIKey is not configured"}
	url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-3-pro-preview:generateContent?key={geminiAPIKey}"
	headers = {"Content-Type": "application/json"}
	
	try:
		# Construct the payload
		data = {
			"contents": [
				{
					"parts": [
						{"text": prompt},
						{
							"inline_data": {
								"mime_type":"image/webp",
								"data": image_base64
							}
						}
					]
				}
			],
			"systemInstruction": {
				"parts": [
					{"text": systemInstruct}
				]
			},
			"safetySettings": [
				{"category": "HARM_CATEGORY_HARASSMENT", "threshold": "BLOCK_NONE"},
				{"category": "HARM_CATEGORY_HATE_SPEECH", "threshold": "BLOCK_NONE"},
				{"category": "HARM_CATEGORY_SEXUALLY_EXPLICIT", "threshold": "BLOCK_NONE"},
				{"category": "HARM_CATEGORY_DANGEROUS_CONTENT", "threshold": "BLOCK_NONE"},
				{"category": "HARM_CATEGORY_CIVIC_INTEGRITY", "threshold": "BLOCK_NONE"}
			]
			,
			"generationConfig": {
				"temperature": 1.7,
				"topK": 40,
				"topP": 0.95,
				"maxOutputTokens": 8192,
			}
		}
		if jsonRule:
			cleaned_schema = remove_additional_properties(jsonRule)
			data['generationConfig']['responseMimeType'] = "application/json"
			data['generationConfig']['responseSchema'] = cleaned_schema
		# Encode the data to JSON
		request_data = json.dumps(data).encode('utf-8')
		request = urllib.request.Request(url, data=request_data, headers=headers, method='POST')
		
		# Make the HTTP request
		with urllib.request.urlopen(request) as response:
			# Decode the response
			response_data = response.read().decode('utf-8')
			res = json.loads(response_data)
			
			# Extract the generated content
			generated_content = res.get('candidates', [])[0].get('content', {}).get('parts', [])[0].get('text', '')
			
			# Clean up the response if necessary
			return generated_content.replace('```json', '').replace('```', '')
	
	except urllib.error.HTTPError as e:
		# Handle HTTP errors
		error_message = e.read().decode()
		return {"error": f"HTTPError: {e.code}, {e.reason}", "details": error_message}
	except urllib.error.URLError as e:
		# Handle URL errors
		return {"error": f"URLError: {e.reason}"}
	except Exception as e:
		# Handle any other exceptions
		return {"error": str(e)}

def call_generate_content(systemInstruct, prompt, jsonRule=None, auto_pair_json=False, max_retries=1, model=None, images=None):
	"""
	Calls a text-generation model and returns either text or JSON.
	When use_gemini is True (default), uses Gemini; otherwise falls back to OpenAI.
	"""
	if use_gemini:
		# Determine model to use
		gemini_model = "gemini-3-pro-preview"
		if model:
			# Map user-friendly model names to actual Gemini API model IDs
			model_lower = model.lower()
			if model == "gemini-3.0-pro" or ("3.0" in model_lower and "pro" in model_lower):
				gemini_model = "gemini-3-pro-preview"
			elif model == "gemini-2.5-flash" or ("2.5" in model_lower and "flash" in model_lower):
				# Map to a widely available Flash model on API key
				gemini_model = "gemini-2.5-flash"
			elif model == "gemini-2.5-pro" or ("2.5" in model_lower and "pro" in model_lower):
				gemini_model = "gemini-2.5-pro"  # Approximate 2.5 pro
			elif model == "gemini-1.5-pro":
				gemini_model = "gemini-1.5-pro"
			elif model == "gemini-1.5-flash":
				gemini_model = "gemini-1.5-flash"
			elif "flash" in model_lower:
				gemini_model = "gemini-2.0-flash-exp"
			elif "3" in model_lower and "pro" in model_lower:
				gemini_model = "gemini-3-pro-preview"

		url = f"https://generativelanguage.googleapis.com/v1beta/models/{gemini_model}:generateContent?key={geminiAPIKey}"
		headers = {"Content-Type": "application/json"}

		# Prepare content parts
		parts = [{"text": prompt}]
		# Add images if provided
		if images:
			for img_base64 in images:
				# Handle data URI prefix if present
				if img_base64.startswith('data:'):
					header, encoded = img_base64.split(',', 1)
					mime_type = header.split(';')[0].split(':')[1]
					data_str = encoded
				else:
					mime_type = "image/jpeg"  # Default fallback
					data_str = img_base64
				parts.append({
					"inline_data": {
						"mime_type": mime_type,
						"data": data_str
					}
				})

		data = {
			"contents": [{"parts": parts}],
			"systemInstruction": {"parts": [{"text": systemInstruct}]},
			"safetySettings": [
				{"category": "HARM_CATEGORY_HARASSMENT", "threshold": "BLOCK_NONE"},
				{"category": "HARM_CATEGORY_HATE_SPEECH", "threshold": "BLOCK_NONE"},
				{"category": "HARM_CATEGORY_SEXUALLY_EXPLICIT", "threshold": "BLOCK_NONE"},
				{"category": "HARM_CATEGORY_DANGEROUS_CONTENT", "threshold": "BLOCK_NONE"},
				{"category": "HARM_CATEGORY_CIVIC_INTEGRITY", "threshold": "BLOCK_NONE"}
			],
			"generationConfig": {
				"temperature": 1.7,
				"topK": 40,
    
				"topP": 0.95,
				"maxOutputTokens": 65536,
			}
		}
		if jsonRule:
			cleaned_schema = remove_additional_properties(jsonRule)
			data['generationConfig']['responseMimeType'] = "application/json"
			data['generationConfig']['responseSchema'] = cleaned_schema

		attempt = 0
		while attempt < max_retries:
			try:
				request_data = json.dumps(data).encode('utf-8')
				request = urllib.request.Request(url, data=request_data, headers=headers, method='POST')
				with urllib.request.urlopen(request) as response:
					response_data = response.read().decode('utf-8')
					res = json.loads(response_data)
					content_text = res['candidates'][0]['content']['parts'][0]['text']
					content_text = content_text.replace('```json', '').replace('```', '')

					if auto_pair_json:
						try:
							parsed_json = json.loads(content_text)
							return parsed_json
						except json.JSONDecodeError:
							match = re.search(r'\{.*\}', content_text, re.DOTALL)
							if match:
								try:
									parsed_json = json.loads(match.group(0))
									return parsed_json
								except json.JSONDecodeError:
									pass
							attempt += 1
							if attempt >= max_retries:
								return {"error": "Failed to parse JSON after multiple attempts: " + content_text}
							else:
								continue
					else:
						return content_text
			except urllib.error.HTTPError as e:
				try:
					details = e.read().decode()
				except Exception:
					details = ""
				return {"error": f"HTTPError: {e.code}, {e.reason}", "details": details}
			except urllib.error.URLError as e:
				return {"error": f"URLError: {e.reason}"}
			except Exception as e:
				return {"error": str(e)}

		return {"error": "Failed to generate content with valid JSON."}
	else:
		# OpenAI Chat Completions fallback
		url = "https://api.openai.com/v1/chat/completions"
		headers = {
			"Content-Type": "application/json",
			"Authorization": f"Bearer {openAIKey}",
		}

		# Build base messages
		base_messages = [
			{"role": "system", "content": systemInstruct},
			{"role": "user", "content": prompt},
		]

		# If JSON schema is provided, force function-call to ensure strict JSON structure
		if jsonRule:
			openai_payload = {
				"model": openAIModel,
				"messages": base_messages,
				"temperature": 0.2,
				"tools": [
					{
						"type": "function",
						"function": {
							"name": "format_question_set",
							"description": "Return a question set strictly matching the JSON schema.",
							"parameters": jsonRule,
						},
					}
				],
				"tool_choice": {
					"type": "function",
					"function": {"name": "format_question_set"}
				},
				# Prevent parallel tool calls to keep one deterministic output
				"parallel_tool_calls": False,
			}
		else:
			# No schema; ask for regular text response
			openai_payload = {
				"model": openAIModel,
				"messages": base_messages,
				"temperature": 0.7,
			}

		attempt = 0
		while attempt < max_retries:
			try:
				request_data = json.dumps(openai_payload).encode("utf-8")
				request = urllib.request.Request(url, data=request_data, headers=headers, method="POST")

				with urllib.request.urlopen(request) as response:
					response_text = response.read().decode("utf-8")
					res = json.loads(response_text)
					msg = res.get("choices", [{}])[0].get("message", {})

					# Prefer function-call arguments when a schema was provided
					tool_calls = msg.get("tool_calls") or []
					if jsonRule and tool_calls:
						try:
							arguments_str = tool_calls[0]["function"]["arguments"]
							parsed_json = json.loads(arguments_str)
							return parsed_json
						except Exception:
							# Fall back to content parsing below
							pass

					content_text = msg.get("content", "")
					content_text = content_text.replace('```json', '').replace('```', '')

					if auto_pair_json or jsonRule:
						try:
							parsed_json = json.loads(content_text)
							return parsed_json
						except json.JSONDecodeError:
							match = re.search(r'\{.*\}', content_text, re.DOTALL)
							if match:
								try:
									parsed_json = json.loads(match.group(0))
									return parsed_json
								except json.JSONDecodeError:
									pass
							attempt += 1
							if attempt >= max_retries:
								return {"error": "Failed to parse JSON after multiple attempts: " + content_text}
							else:
								continue
					else:
						return content_text
			except urllib.error.HTTPError as e:
				try:
					details = e.read().decode()
				except Exception:
					details = ""
				return {"error": f"HTTPError: {e.code}, {e.reason}", "details": details}
			except urllib.error.URLError as e:
				return {"error": f"URLError: {e.reason}"}
			except Exception as e:
				return {"error": str(e)}

		return {"error": "Failed to generate content with valid JSON."}

def generate_imagen3(prompt, reference_image=None, aspect_ratio="1:1", resolution="1K", model=None):
	"""
	Generates an image using Gemini 3 Pro Image Preview model via Google AI Studio API.
	Returns the base64 encoded image data.
	"""
	if not geminiAPIKey:
		return {"error": "geminiAPIKey is not configured"}
		
	# Determine model
	model_name = "gemini-3-pro-image-preview"
	if model:
		model_name = model.replace("models/", "")

	# Using the new model endpoint for Gemini 3 Image Gen
	url = f"https://generativelanguage.googleapis.com/v1beta/models/{model_name}:generateContent?key={geminiAPIKey}"
	headers = {"Content-Type": "application/json"}
	
	parts = [{"text": prompt}]
	if reference_image:
		if reference_image.startswith('data:'):
			header, encoded = reference_image.split(',', 1)
			mime_type = header.split(';')[0].split(':')[1]
			data_str = encoded
		else:
			mime_type = "image/jpeg"
			data_str = reference_image
		
		parts.append({
			"inline_data": {
				"mime_type": mime_type,
				"data": data_str
			}
		})

	image_config = {}
	if aspect_ratio and aspect_ratio != "Auto":
		image_config["aspectRatio"] = aspect_ratio
	if resolution:
		image_config["image_size"] = resolution

	data = {
		"contents": [
			{
				"role": "user",
				"parts": parts
			}
		],
		"generationConfig": {
			"responseModalities": ["IMAGE"],
			"imageConfig": image_config
		}
	}
	
	try:
		request_data = json.dumps(data).encode('utf-8')
		request = urllib.request.Request(url, data=request_data, headers=headers, method='POST')
		
		with urllib.request.urlopen(request) as response:
			response_data = response.read().decode('utf-8')
			res = json.loads(response_data)
		
		# Extract base64 image from Gemini response
		if 'candidates' in res and len(res['candidates']) > 0:
			content = res['candidates'][0].get('content', {})
			parts = content.get('parts', [])
			for part in parts:
				if 'inline_data' in part:
					return part['inline_data']['data']
				# Check for camelCase just in case
				if 'inlineData' in part:
					return part['inlineData']['data']
		
		return {"error": "No image generated in response", "details": res}
		
	except urllib.error.HTTPError as e:
		error_msg = e.read().decode()
		return {"error": f"HTTPError: {e.code}", "details": error_msg}
	except Exception as e:
		return {"error": str(e)}

def generate_image_openai(prompt, size="1024x1024"):
	"""
	Generates an image using OpenAI Images API (gpt-image-1).
	Returns the base64 encoded image data.
	"""
	if not openAIKey:
		return {"error": "openAIKey is not configured"}

	url = "https://api.openai.com/v1/images/generations"
	headers = {
		"Content-Type": "application/json",
		"Authorization": f"Bearer {openAIKey}",
	}

	payload = {
		"model": "gpt-image-1",
		"prompt": prompt,
		"n": 1,
		"size": size,
		"response_format": "b64_json"
	}

	try:
		request_data = json.dumps(payload).encode('utf-8')
		request = urllib.request.Request(url, data=request_data, headers=headers, method='POST')
		with urllib.request.urlopen(request) as response:
			response_data = response.read().decode('utf-8')
			res = json.loads(response_data)
		data_arr = res.get("data", [])
		if not data_arr or "b64_json" not in data_arr[0]:
			return {"error": "No image generated in OpenAI response", "details": res}
		return data_arr[0]["b64_json"]
	except urllib.error.HTTPError as e:
		error_msg = e.read().decode()
		return {"error": f"HTTPError: {e.code}, {e.reason}", "details": error_msg}
	except urllib.error.URLError as e:
		return {"error": f"URLError: {e.reason}"}
	except Exception as e:
		return {"error": str(e)}

def analyze_style_from_images(images_base64):
	"""
	Analyzes a list of images (base64) and describes their shared visual style in a concise, general way.
	"""
	if not geminiAPIKey:
		return {"error": "geminiAPIKey is not configured"}
	
	system_prompt = """
	You are an expert Visual Style Analyzer.
	Analyze the provided reference images and extract a concise "Style Profile" that describes the overall visual style in a VERY GENERAL and ABSTRACT way.
	
	CRITICAL RULES:
	- Do NOT describe specific objects, characters, or content (e.g., do not mention "swords", "buttons", "faces").
	- Focus ONLY on the shared visual DNA:
		* Color Palette: Overall mood, saturation, and key color relationships (e.g., "pastel and soft", "neon and dark").
		* Art Medium & Technique: (e.g., "flat vector art", "low-poly 3D", "watercolor").
		* Shape Language: (e.g., "rounded and friendly", "sharp and geometric", "organic and flowing").
		* Lighting & Texture: (e.g., "soft diffused lighting", "noisy texture", "clean gradients").
	
	OUTPUT FORMAT:
	Provide a SHORT, CONCISE paragraph (2-3 sentences) that captures the "vibe" and technical style.
	It should be applicable to ANY subject matter generated in this style.
	Keep it abstract and high-level.
	"""
	
	prompt = "Analyze these images and describe their shared visual style. Be extremely general and abstract. Focus on colors, medium, shape language, and overall vibe. Do NOT describe specific details or content."
	
	return call_generate_content(system_prompt, prompt, images=images_base64)
