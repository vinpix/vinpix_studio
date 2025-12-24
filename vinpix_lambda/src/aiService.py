import urllib.request
import json
import os
import re
import textwrap
import textwrap

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
			if jsonRule:
				return generated_content
			return generated_content
	
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
					
					if auto_pair_json or jsonRule:
						content_text = content_text

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
					
					if auto_pair_json or jsonRule:
						content_text = content_text

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
	Generates an image using Imagen 4.0 API with the correct :predict endpoint.
	Returns the base64 encoded image data.
	
	This implementation matches the working Imagen 4.0 API format:
	- Endpoint: /v1beta/models/{model}:predict
	- Request: uses 'instances' array with 'prompt' field
	- Parameters: outputMimeType, sampleCount, personGeneration, aspectRatio, imageSize
	- Response: extracts from predictions[].bytesBase64Encoded
	"""
	if not geminiAPIKey:
		return {"error": "geminiAPIKey is not configured"}
		
	# Determine model - use full model path for Imagen 4.0
	model_name = "imagen-4.0-generate-001"
	if model:
		model_name = model.replace("models/", "")

	# CORRECT Imagen 4.0 endpoint using :predict
	url = f"https://generativelanguage.googleapis.com/v1beta/models/{model_name}:predict?key={geminiAPIKey}"
	headers = {"Content-Type": "application/json"}
	
	# Build the request using the correct Imagen 4.0 structure
	# Note: Reference image support may require additional API parameters
	# For now, we focus on text-to-image generation as per the working example
	instance = {
		"prompt": prompt
	}
	
	# Add reference image if provided (this may need adjustment based on API docs)
	if reference_image:
		# Extract base64 data if it's a data URI
		if reference_image.startswith('data:'):
			header, encoded = reference_image.split(',', 1)
			data_str = encoded
		else:
			data_str = reference_image
		
		# Note: The working bash example doesn't show reference image usage
		# This is a best-effort implementation - may need API documentation
		instance["referenceImage"] = {
			"bytesBase64Encoded": data_str
		}

	# Build parameters object matching the correct API format
	parameters = {
		"outputMimeType": "image/jpeg",
		"sampleCount": 1,
		"personGeneration": "ALLOW_ALL"
	}
	
	# Map aspect_ratio parameter
	if aspect_ratio and aspect_ratio != "Auto":
		parameters["aspectRatio"] = aspect_ratio
	
	# Map resolution parameter to imageSize
	if resolution:
		parameters["imageSize"] = resolution

	# Correct Imagen 4.0 request structure
	data = {
		"instances": [instance],
		"parameters": parameters
	}
	
	try:
		request_data = json.dumps(data).encode('utf-8')
		request = urllib.request.Request(url, data=request_data, headers=headers, method='POST')
		
		with urllib.request.urlopen(request) as response:
			response_data = response.read().decode('utf-8')
			res = json.loads(response_data)
		
		# Extract base64 image from correct Imagen 4.0 response format
		# Response structure: predictions[].bytesBase64Encoded
		if 'predictions' in res and len(res['predictions']) > 0:
			prediction = res['predictions'][0]
			if 'bytesBase64Encoded' in prediction:
				return prediction['bytesBase64Encoded']
		
		return {"error": "No image generated in response", "details": res}
		
	except urllib.error.HTTPError as e:
		error_msg = e.read().decode()
		print(f"[generate_imagen3] HTTPError {e.code}: {error_msg}")
		print(f"[generate_imagen3] Request payload: {json.dumps(data, indent=2)}")
		return {"error": f"HTTPError: {e.code}", "details": error_msg}
	except Exception as e:
		print(f"[generate_imagen3] Exception: {str(e)}")
		print(f"[generate_imagen3] Request payload: {json.dumps(data, indent=2)}")
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
	
	system_prompt = textwrap.dedent("""
		You are an expert Game UI/UX Visual Style Analyzer.
		Analyze the provided reference images and extract a comprehensive, detailed "Style Profile" that describes the visual style with TECHNICAL PRECISION and SPECIFIC MEASUREMENTS.
		
		Your analysis MUST follow this exact structure with detailed, technical descriptions for each section:
		
		1. **Visual Style & Art Medium**
		   - Describe the aesthetic approach (e.g., "stylized 3D", "hand-painted 2D", "vector illustration")
		   - Specify rendering style (e.g., "cel-shaded", "realistic PBR", "flat design")
		   - Describe overall mood and atmosphere (e.g., "playful and whimsical", "dark and moody", "clean and modern")
		
		2. **Color Analysis**
		   - High-saturation/low-saturation analysis with specifics
		   - Identify PRIMARY colors with hex codes (e.g., #FF6B35, #4ECDC4)
		   - Identify SECONDARY colors with hex codes
		   - Identify ACCENT colors with hex codes
		   - Describe gradient usage and color transitions
		   - Note color temperature (warm/cool bias)
		
		3. **UI & Button Characteristics**
		   - Shape language: rounded vs angular (e.g., "heavily rounded corners, 12-16px border radius")
		   - Button dimensions and proportions (e.g., "typically 140px wide × 48px tall")
		   - Button states: normal, hover, pressed, disabled appearance
		   - Container styles: background panels, cards, modals with measurements
		   - Padding and margins (e.g., "16px internal padding, 8px gaps between elements")
		
		4. **Line & Border Styles**
		   - Exterior stroke weight (e.g., "3-4px outer borders")
		   - Interior detail lines thickness (e.g., "1-2px divider lines")
		   - Stroke color and opacity (e.g., "#FFFFFF at 30% opacity")
		   - Corner styles: sharp, rounded, beveled with radius values
		   - Stroke joins: miter, round, bevel
		
		5. **Lighting & Atmosphere**
		   - Lighting type: directional, ambient, rim lighting
		   - Light direction and angle (e.g., "top-left at 45°")
		   - Shadow characteristics: hard/soft, color, offset, blur
		   - Highlight placement and intensity
		   - Overall contrast ratio
		
		6. **Composition & Layout**
		   - Grid structure and alignment patterns
		   - Spacing system (e.g., "8px base unit, scaling to 16px, 24px, 32px")
		   - Visual hierarchy techniques
		   - Balance and weight distribution
		   - Responsive scaling approach
		
		7. **Typography**
		   - Font family style (e.g., "bold geometric sans-serif", "playful rounded display font")
		   - Text treatments: outlines, shadows, glows
		   - Typical font sizes (e.g., "Headers: 28-32px, Body: 14-16px")
		   - Letter spacing and line height
		   - Text effects and decorations
		
		8. **Textures & Materials**
		   - Surface finish: matte, glossy, metallic, rough
		   - Texture overlays: noise, grain, patterns
		   - Material depth and dimensionality
		   - Specular highlights and reflections
		
		9. **Visual Effects**
		   - Focus effects: depth of field, vignetting
		   - Bloom and glow intensity
		   - Particle effects style
		   - Motion blur or speed lines
		   - Overall clarity: sharp vs soft
		
		CRITICAL REQUIREMENTS:
		- Be TECHNICAL and SPECIFIC, not abstract or vague
		- Include MEASUREMENTS in pixels (px) wherever applicable
		- Include HEX COLOR CODES for all mentioned colors
		- Provide QUANTIFIABLE details (e.g., "4px", "60% opacity", "#FF5733")
		- Analyze ALL 9 sections thoroughly
		- Each section should be 2-4 sentences with specific technical details
	""").strip()
	
	prompt = "Analyze these reference images and provide a comprehensive technical style analysis following the exact 9-section structure. Include specific measurements (px values), hex color codes, and quantifiable technical details for each section. Be thorough and precise."
	
	return call_generate_content(system_prompt, prompt, images=images_base64)


def parse_bulk_prompts(raw_text):
	"""
	Simplified bulk prompt parsing - returns only prefix and prompts array.
	No metadata, no complex structure - just extract prefix and combine with items.
	
	Args:
		raw_text: Raw markdown input from user
	
	Returns:
		dict: { "prefix": str, "prompts": [str, str, ...] }
	"""
	if not geminiAPIKey:
		return {"error": "geminiAPIKey is not configured"}
	
	schema = {
		"type": "object",
		"properties": {
			"prefix": {"type": "string"},
			"prompts": {
				"type": "array",
				"items": {"type": "string"}
			}
		},
		"required": ["prompts"]
	}
	
	system_prompt = """You are a prompt extraction assistant.

Your task:
1. Look for a prefix/shared instruction (lines like "Prefix:", "Style:", or header content)
2. Extract individual items from bullet points or numbered lists
3. Combine prefix with each item to create complete prompts

Rules:
- If you find a prefix, extract it and combine it with EACH item
- If no prefix, just return the items as prompts
- Clean up formatting, remove markdown symbols
- Each prompt should be a complete, standalone instruction
- Return ONLY the prompts array, nothing else

Example Input:
```
# Prefix: Icon white background
- Red sneakers with tiny white wings
- Blue running shoes with golden wings
```

Example Output:
{
  "prefix": "Icon white background",
  "prompts": [
    "Icon white background Red sneakers with tiny white wings",
    "Icon white background Blue running shoes with golden wings"
  ]
}
"""
	
	user_prompt = f"""Parse this text and extract prompts:

{raw_text}

Return the prefix (if any) and the complete prompts array."""
	
	response = call_generate_content(
		system_prompt,
		user_prompt,
		jsonRule=schema,
		auto_pair_json=True,
		max_retries=2
	)
	
	if isinstance(response, dict) and 'error' in response:
		return response
	
	# Ensure we have prompts
	if not isinstance(response, dict) or 'prompts' not in response:
		return {"error": "Failed to parse prompts"}
	
	prompts = response.get("prompts")
	if prompts is None:
		prompts = []
	
	if not isinstance(prompts, list):
		return {"error": "AI returned invalid prompts format (not a list)"}

	return {
		"prefix": response.get("prefix", ""),
		"prompts": prompts
	}
