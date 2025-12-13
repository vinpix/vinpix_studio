import json
import re
import src.aiService as ai
from typing import Dict, Any

def _calculate_total_answer_mappings(questions: list) -> int:
    """
    Calculate total number of answer mappings across all questions.
    For HTML questions, each answerMapping represents a sub-question.
    
    Parameters:
        questions (list): List of questions
        
    Returns:
        int: Total number of answer mappings (actual sub-questions)
    """
    total = 0
    for question in questions:
        answer_mapping = question.get('answerMapping', [])
        total += len(answer_mapping)
    return total


def upload_questions(
    text_input: str,
    question_set_settings: Dict[str, Any],
    job_id: str = None,
    placeholder_question_set_id: str = None,
) -> Dict[str, Any]:
    """
    Uploads and formats questions from raw text input using AI service.
    
    Parameters:
        text_input (str): Raw text from PDF conversion containing questions
        question_set_settings (dict): Settings for the question set including:
            - title (str): Title of the question set
            - category (str): Category (Grammar, Reading, Listening, Writing)
            - difficulty (str): Difficulty level (Easy, Medium, Hard)
            - exam (str): Exam type (HSG, HSGQG, HSGT)
            - questionType (str): Type (multiple-choice, comprehension, essay, word-formation)
            - timeLimit (int): Time limit in minutes
            - description (str): Description of the question set
    
    Returns:
        Dict[str, Any]: Response containing formatted question set or error message
    """
    
    try:
        # Validate inputs
        if not text_input or not text_input.strip():
            return {
                'statusCode': 400,
                'body': {'error': 'Text input is required and cannot be empty'}
            }
        
        if not question_set_settings:
            return {
                'statusCode': 400,
                'body': {'error': 'Question set settings are required'}
            }
        
        # Validate required settings (initial metadata does NOT need 'questions'); title/description optional
        required_fields = ['category', 'exam', 'questionType', 'timeLimit']
        for field in required_fields:
            if field not in question_set_settings:
                return {
                    'statusCode': 400,
                    'body': {'error': f'Missing required field: {field}'}
                }
        
        # Updated schema to support HTML and instructions question types only
        question_set_schema = {
            "type": "object",
            "properties": {
                "title": {"type": "string"},
                "category": {"type": "string", "enum": ["Grammar", "Reading", "Listening", "Writing"]},
                "exam": {"type": "string", "enum": ["HSG", "HSGQG", "HSGT"]},
                "questionType": {"type": "string"},
                "timeLimit": {"type": "integer"},
                "description": {"type": "string"},
                "questions": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "type": {"type": "string", "enum": ["html"]},
                            "text": {"type": "string"},
                            "htmlContent": {"type": "string"},
                            "answerMapping": {
                                "type": "array",
                                "items": {
                                    "type": "object",
                                    "properties": {
                                        "selector": {"type": "string"},
                                        "correctValue": {
                                            "oneOf": [
                                                {"type": "string"},
                                                {"type": "array", "items": {"type": "string"}},
                                                {"type": "boolean"},
                                                {"type": "number"}
                                            ]
                                        },
                                        "validationType": {"type": "string", "enum": ["exact", "contains", "regex", "numeric"]},
                                        "caseSensitive": {"type": "boolean"},
                                        "tolerance": {"type": "number"},
                                        "explanation": {"type": "string"}
                                    },
                                    "required": ["selector", "correctValue", "validationType", "explanation"]
                                }
                            }
                        },
                        "required": ["type", "htmlContent", "answerMapping"]
                    },
                    "minItems": 1
                }
            },
            "required": ["category", "exam", "questionType", "timeLimit", "questions"]
        }
        
        # Create system instruction for AI
        system_instruction = """
Bạn là chuyên gia định dạng bộ câu hỏi cho giáo dục Việt Nam. Hãy chuyển đổi văn bản thô thành bộ câu hỏi có cấu trúc chuẩn.

QUY TẮC ĐỊNH DẠNG QUAN TRỌNG:
1. Trích xuất TẤT CẢ câu hỏi từ văn bản.
2. Loại câu hỏi duy nhất: "html" – câu hỏi tương tác với HTML form elements (input, select, checkbox, radio). Không chấp nhận loại khác.

3. XỬ LÝ LINK VÀ ĐỊNH DẠNG TITLE:
   - NẾU tìm thấy link (URL) trong văn bản ngoại trừ link Facebook, thường đây là đề gốc
   - Đặt link LÊN TRÊN CÙNG trong phần "htmlContent" của câu hỏi
   - Định dạng link đẹp với thẻ <a href="URL" target="_blank" style="display: block; margin-bottom: 20px; color: #0066cc; text-decoration: none; font-weight: bold; padding: 10px; border: 1px solid #ddd; border-radius: 5px; background-color: #f9f9f9;">📄 Click here to see the exam</a>
   - Link phải mở tab mới (target="_blank") và có style đẹp mắt

4. Định dạng "html":
   - Tạo trường "htmlContent" chứa HTML code hoàn chỉnh với form elements
   - Tạo trường "answerMapping" là mảng các object, mỗi object gồm:
     * selector: CSS selector để identify element (ví dụ: "#input1", "[name='question1']")
     * correctValue: giá trị đúng (string, number, boolean, hoặc array)
     * validationType: "exact" | "contains" | "regex" | "numeric"
     * explanation: giải thích riêng cho câu trả lời này
     * caseSensitive: true/false (optional, mặc định true)
     * tolerance: số (optional, cho numeric validation)

5. XỬ LÝ PASSAGE ĐIỀN VÀO CHỖ TRỐNG CÓ SẴN LỰA CHỌN:
   - Khi passage có các chỗ trống (blank) kèm danh sách đáp án/câu/cụm từ để chọn, CHÈN <select> NGAY TẠI VỊ TRÍ CHỖ TRỐNG; KHÔNG liệt kê các lựa chọn riêng ở bên dưới.
   - Thay thế các dấu ____ hoặc [ ... ] trong passage bằng thẻ <select id="blank1" name="blank1" class="inline-select"> với các <option value="...">Nội dung đáp án</option> tương ứng (theo đúng thứ tự trong đề).
   - Nếu đề liệt kê lựa chọn theo A/B/C/D, dùng CHÍNH NỘI DUNG đáp án làm cả value và label (ví dụ: <option value="because">because</option>), không chỉ dùng chữ cái.
   - Trong answerMapping cho từng chỗ trống:
     * selector: "#blank1", "#blank2", ...
     * correctValue: string (hoặc array nếu cho phép nhiều đáp án đúng) trùng với value của option đúng
     * validationType: "exact"
     * explanation: giải thích ngắn gọn bằng tiếng Việt vì sao đáp án đúng

6. XỬ LÝ CÂU HỎI DẠNG BẢNG (CỘT A, B):
   - Nếu câu hỏi có dạng bảng với cột A và cột B:
     * GHI RÕ số lượng câu hỏi ở cột A và cột B trong phần mô tả
     * Đặt phần trả lời RIÊNG BIỆT bên dưới bảng, không nhập trong bảng
     * Sử dụng các input fields riêng cho từng câu trả lời
     * Đánh số thứ tự rõ ràng cho từng câu trả lời
   - Ví dụ: "Có 5 câu ở cột A và 5 câu ở cột B. Điền đáp án vào các ô trống bên dưới."

7. Ví dụ HTML:
   - Input text: <input type="text" id="answer1" name="word1">
   - Select: <select name="choice1"><option value="a">A</option><option value="b">B</option></select>
   - Checkbox: <input type="checkbox" name="check1" value="correct">
   - Radio: <input type="radio" name="radio1" value="option1">

8. QUAN TRỌNG:
   - Giữ NGUYÊN nội dung câu hỏi và đề, nội dung bằng TIẾNG ANH (không dịch, không thay đổi)
   - Chỉ viết giải thích bằng tiếng Việt cho TỪNG đáp án
   - Trong trường "explanation" của mỗi answerMapping, nếu có thể hãy cung cấp GIẢI THÍCH ĐẦY ĐỦ theo định dạng Markdown ngắn gọn:
     * Bắt đầu bằng 1-2 câu giải nghĩa/ngữ pháp ngắn.
     * **Example**: một câu ví dụ tiếng Anh (in đậm nhãn) kèm dịch ngắn.
     * **Đồng nghĩa**: danh sách gạch đầu dòng các từ/cụm từ liên quan (tối đa 6 mục).
     * **Trái nghĩa**: danh sách gạch đầu dòng nếu có (tối đa 6 mục).
     * Dùng dấu '-' để tạo danh sách; giữ nhãn phần bằng in đậm như "**Example**", "**Đồng nghĩa**", "**Trái nghĩa**". Không chèn HTML, chỉ dùng Markdown đơn giản.
9. Làm sạch ký tự rác do chuyển PDF.
10. Giữ nguyên số thứ tự câu nếu có.
11. HTML code phải hợp lệ và có thể render được.

Trả về JSON HOÀN CHỈNH theo schema.
"""
        
        # Create the prompt for AI processing
        prompt = f"""
Please format the following raw text into a structured question set:

{text_input}

Convert this into a properly formatted JSON question set with the settings provided in the system instruction.
Ensure all questions are properly extracted, formatted, and include correct answers with explanations.
"""
        
        # Call AI service to format the questions
        result = ai.call_generate_content(
            system_instruction,
            prompt,
            jsonRule=question_set_schema,
            auto_pair_json=True,
            max_retries=1 #must be 1
        )
        
        # Check if AI service returned an error
        if isinstance(result, dict) and 'error' in result:
            return {
                'statusCode': 500,
                'body': {'error': f'AI processing failed: {result["error"]}'}
            }
        
        # Validate that we got a proper question set. If AI returns a bare question or a list of questions,
        # wrap it into the required structure using provided settings to avoid hard failure.
        if not isinstance(result, dict) or 'questions' not in result:
            wrapped = None
            # Single question object case
            if isinstance(result, dict) and (
                ('type' in result and ('htmlContent' in result or 'answerMapping' in result))
            ):
                wrapped = {
                    'title': question_set_settings.get('title'),
                    'category': question_set_settings.get('category'),
                    'exam': question_set_settings.get('exam'),
                    'questionType': question_set_settings.get('questionType'),
                    'timeLimit': question_set_settings.get('timeLimit'),
                    'description': question_set_settings.get('description'),
                    'questions': [result],
                }
            # List of question objects case
            elif isinstance(result, list) and all(isinstance(q, dict) for q in result):
                wrapped = {
                    'title': question_set_settings.get('title'),
                    'category': question_set_settings.get('category'),
                    'exam': question_set_settings.get('exam'),
                    'questionType': question_set_settings.get('questionType'),
                    'timeLimit': question_set_settings.get('timeLimit'),
                    'description': question_set_settings.get('description'),
                    'questions': result,
                }

            if wrapped:
                result = wrapped
            else:
                return {
                    'statusCode': 500,
                    'body': {'error': 'Failed to format questions properly: ' + str(result)}
                }
        
        # Additional validation
        if not result['questions'] or len(result['questions']) == 0:
            return {
                'statusCode': 400,
                'body': {'error': 'No questions were extracted from the provided text'}
            }
        
        for i, question in enumerate(result['questions']):
            q_type = question.get('type')
            if not q_type:
                return {
                    'statusCode': 500,
                    'body': {'error': f'Question {i+1} missing type field'}
                }

            # Validation based on type
            if q_type == 'html':
                required_fields = ['htmlContent']
                for field in required_fields:
                    if field not in question:
                        return {
                            'statusCode': 500,
                            'body': {'error': f'Question {i+1} missing required field "{field}"'}
                        }
                # Avoid duplicating prompt: clear optional short text
                if 'text' in question and isinstance(question['text'], str):
                    question['text'] = ''
                
                # Validate answerMapping structure
                answer_mapping = question.get('answerMapping')
                # If provided, validate structure; otherwise allow None/absent
                if answer_mapping is not None:
                    if not isinstance(answer_mapping, list):
                        return {
                            'statusCode': 500,
                            'body': {'error': f'Question {i+1} answerMapping must be an array if provided'}
                        }
                
                for j, mapping in enumerate(answer_mapping):
                    required_mapping_fields = ['selector', 'correctValue', 'validationType', 'explanation']
                    for mapping_field in required_mapping_fields:
                        if mapping_field not in mapping:
                            return {
                                'statusCode': 500,
                                'body': {'error': f'Question {i+1} answerMapping[{j}] missing required field "{mapping_field}"'}
                            }
                    
                    # Validate validationType
                    valid_types = ['exact', 'contains', 'regex', 'numeric']
                    if mapping.get('validationType') not in valid_types:
                        return {
                            'statusCode': 500,
                            'body': {'error': f'Question {i+1} answerMapping[{j}] has invalid validationType. Must be one of: {valid_types}'}
                        }
                        
            # Only html type supported; validation handled above

        # Ensure questions are sorted in ascending order based on numeric prefix in their text
        # try:
        #     def _extract_q_num(q):
        #         match = re.match(r"\s*(\d+)", q.get('text', ''))
        #         return int(match.group(1)) if match else 0

        #     result['questions'] = sorted(result['questions'], key=_extract_q_num)
        # except Exception:
        #     # If extraction or sorting fails, keep original order
        #     pass

        # ===================== NEW: Persist data =====================
        try:
            import time
            import boto3
            from src.utils import short_uuid, question_set_table, S3_BUCKET, get_s3_key

            # Use provided placeholder id when present to update in-place
            qid = placeholder_question_set_id or short_uuid()
            created_at = int(time.time())  # Unix timestamp (seconds)

            # Build metadata item with required default fields
            metadata_item = {
                'uid': qid,
                'title': (result.get('title') or question_set_settings.get('title') or ''),
                'category': result['category'],

                'exam': result['exam'],
                'questionType': result['questionType'],
                'timeLimit': result['timeLimit'],
                'description': (result.get('description') or question_set_settings.get('description') or ''),
                # Defaults / calculated fields
                'totalQuestions': _calculate_total_answer_mappings(result['questions']),
                'completions': 0,

                'createdAt': created_at,
                'author': question_set_settings.get('author', 'Admin'),
                'status': 'draft',  # Default status on creation
                'isTrial': False,   # Default trial status on creation
            }

            # Add collection field if provided, otherwise default to 'single'
            collection_id = question_set_settings.get('collection', 'single')
            if collection_id and collection_id != 'single':
                metadata_item['collection'] = collection_id

            # Save detailed question set JSON to S3
            s3_client = boto3.client('s3')
            s3_key = get_s3_key(f"question_sets/{qid}.json")
            s3_client.put_object(
                Bucket=S3_BUCKET,
                Key=s3_key,
                Body=json.dumps(result),
                ContentType='application/json',
            )

            # Store the S3 key reference in metadata
            metadata_item['s3Key'] = s3_key

            # Persist metadata to DynamoDB (overwrite placeholder if exists)
            question_set_table.put_item(Item=metadata_item)

            # If we didn't create a placeholder earlier, append this question set to the collection now
            try:
                if collection_id and collection_id != 'single' and not placeholder_question_set_id:
                    from src.utils import collection_table
                    updated_at = int(time.time())
                    collection_table.update_item(
                        Key={'uid': collection_id},
                        UpdateExpression="SET questionSets = list_append(if_not_exists(questionSets, :empty_list), :new_item), updatedAt = :updated_at",
                        ExpressionAttributeValues={
                            ':new_item': [qid],
                            ':empty_list': [],
                            ':updated_at': updated_at
                        },
                        ReturnValues='NONE'
                    )
            except Exception:
                # Non-fatal; linkage can be fixed later
                pass
        except Exception as e:
            # If persistence fails, return an error so the caller can handle it
            return {
                'statusCode': 500,
                'body': {'error': f'Failed to persist question set: {str(e)}'}
            }
        # =================== END PERSISTENCE SECTION =================

        return {
            'statusCode': 200,
            'body': {
                'questionSetId': qid,
                'questionSet': result,
                'metadata': metadata_item,
                'summary': {
                    'totalQuestions': _calculate_total_answer_mappings(result['questions']),
                    'category': result['category'],
                    'timeLimit': result['timeLimit'],
                    'status': result.get('status', 'draft')
                }
            }
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'body': {'error': f'Unexpected error: {str(e)}'}
        }


def get_question_sets_paged(limit: int = 24, last_key: Dict[str, Any] = None, only_standalone: bool = False, status_filter: str = None) -> Dict[str, Any]:
    """
    Retrieves question sets with DynamoDB pagination.

    Args:
        limit (int): Max number of items to return.
        last_key (dict): DynamoDB LastEvaluatedKey to continue from.
        only_standalone (bool): If True, include only standalone question sets (collection == 'single' or attribute missing).
        status_filter (str): Optional status filter (e.g., 'active' or 'draft').

    Returns:
        Dict[str, Any]: Response containing list of question sets, pagination key and hasMore flag.
    """
    try:
        from botocore.exceptions import ClientError
        from boto3.dynamodb.conditions import Attr
        from src.utils import question_set_table, convert_sets_to_lists

        scan_kwargs: Dict[str, Any] = {
            'Limit': int(limit) if limit else 24
        }
        if last_key:
            scan_kwargs['ExclusiveStartKey'] = last_key

        filter_expression = None
        if only_standalone:
            # collection attribute either not exists or equals 'single'
            expr = Attr('collection').not_exists() | Attr('collection').eq('single')
            filter_expression = expr
        if status_filter:
            status_expr = Attr('status').eq(status_filter)
            filter_expression = status_expr if filter_expression is None else (filter_expression & status_expr)
        if filter_expression is not None:
            scan_kwargs['FilterExpression'] = filter_expression

        try:
            response = question_set_table.scan(**scan_kwargs)
        except ClientError as e:
            return {
                'statusCode': 500,
                'body': {'error': f'Failed to scan question sets: {str(e)}'}
            }

        items = response.get('Items', [])
        items = convert_sets_to_lists(items)

        formatted_items = []
        for item in items:
            formatted_item = {
                'id': item.get('uid'),
                'title': item.get('title', ''),
                'category': item.get('category', ''),
                'difficulty': item.get('difficulty', ''),
                'totalQuestions': item.get('totalQuestions', 0),
                'completions': item.get('completions', 0),
                'createdAt': item.get('createdAt', 0),
                'status': item.get('status', 'draft'),
                'author': item.get('author', 'Admin'),
                'exam': item.get('exam', ''),
                'questionType': item.get('questionType', ''),
                'timeLimit': item.get('timeLimit', 0),
                'description': item.get('description', ''),
                's3Key': item.get('s3Key', ''),
                'isTrial': item.get('isTrial', False),
                'collection': item.get('collection', 'single')
            }
            formatted_items.append(formatted_item)

        # Newest first
        formatted_items.sort(key=lambda x: x.get('createdAt', 0), reverse=True)

        last_evaluated_key = response.get('LastEvaluatedKey')

        return {
            'statusCode': 200,
            'body': {
                'questionSets': formatted_items,
                'lastKey': last_evaluated_key,
                'hasMore': last_evaluated_key is not None
            }
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': {'error': f'Unexpected error: {str(e)}'}
        }

def create_question_set_placeholder(question_set_settings: Dict[str, Any], job_id: str = None) -> Dict[str, Any]:
    """
    Create a placeholder question set metadata item with status 'processing' so UI can display immediately.
    """
    try:
        import time
        from src.utils import short_uuid, question_set_table

        if not question_set_settings:
            return {
                'statusCode': 400,
                'body': {'error': 'questionSetSettings are required'}
            }

        qid = short_uuid()
        created_at = int(time.time())

        title = question_set_settings.get('title') or 'Đề thi đang xử lý'
        description = question_set_settings.get('description') or ''
        if 'đang xử lý' not in description.lower():
            description = (description + ' ').strip() + '(Đang xử lý...)'

        metadata_item = {
            'uid': qid,
            'title': title,
            'category': question_set_settings.get('category', ''),
            'exam': question_set_settings.get('exam', ''),
            'questionType': question_set_settings.get('questionType', ''),
            'timeLimit': int(question_set_settings.get('timeLimit', 60)),
            'description': description,
            'totalQuestions': 0,
            'completions': 0,
            'createdAt': created_at,
            'author': question_set_settings.get('author', 'Admin'),
            'status': 'processing',
            'isTrial': False,
            # No s3Key yet
        }

        collection_id = question_set_settings.get('collection')
        if collection_id and collection_id != 'single':
            metadata_item['collection'] = collection_id

        # Optional: annotate processing job id for tracing
        if job_id:
            metadata_item['processingJobId'] = job_id

        question_set_table.put_item(Item=metadata_item)

        # If collection provided, append now so it shows inside collection too
        try:
            if collection_id and collection_id != 'single':
                from src.utils import collection_table
                updated_at = int(time.time())
                collection_table.update_item(
                    Key={'uid': collection_id},
                    UpdateExpression="SET questionSets = list_append(if_not_exists(questionSets, :empty_list), :new_item), updatedAt = :updated_at",
                    ExpressionAttributeValues={
                        ':new_item': [qid],
                        ':empty_list': [],
                        ':updated_at': updated_at
                    },
                    ReturnValues='NONE'
                )
        except Exception:
            pass

        return {
            'statusCode': 200,
            'body': {
                'placeholderQuestionSetId': qid,
                'jobId': job_id,
                'questionSet': metadata_item,
            }
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': {'error': f'Failed to create placeholder: {str(e)}'}
        }

def create_question_set(question_set_data: Dict[str, Any]) -> Dict[str, Any]:
    """
    Creates a new question set from a provided JSON object and persists it to S3 and DynamoDB.
    Expects fields: title, category, exam, questionType, description, questions[, timeLimit, author, status, isTrial, collection]
    """
    try:
        import time
        import boto3
        from botocore.exceptions import ClientError
        from src.utils import short_uuid, question_set_table, S3_BUCKET, get_s3_key

        # Validate payload
        if not question_set_data:
            return {
                'statusCode': 400,
                'body': {'error': 'Question set data is required'}
            }

        required_fields = ['category', 'exam', 'questionType', 'questions']
        for field in required_fields:
            if field not in question_set_data:
                return {
                    'statusCode': 400,
                    'body': {'error': f'Missing required field: {field}'}
                }

        if not isinstance(question_set_data.get('questions'), list) or len(question_set_data['questions']) == 0:
            return {
                'statusCode': 400,
                'body': {'error': 'Question set must include at least one question'}
            }

        # Validate each question (only html supported as per current schema)
        for i, question in enumerate(question_set_data['questions']):
            q_type = question.get('type')
            if q_type != 'html':
                return {
                    'statusCode': 400,
                    'body': {'error': f'Question {i+1} has unsupported type "{q_type}"; only "html" is supported'}
                }
            if 'htmlContent' not in question:
                return {
                    'statusCode': 400,
                    'body': {'error': f'Question {i+1} missing htmlContent'}
                }

        # Prepare identifiers and metadata
        qid = short_uuid()
        created_at = int(time.time())
        time_limit = question_set_data.get('timeLimit', 60)

        # Persist detailed JSON to S3
        s3_client = boto3.client('s3')
        s3_key = get_s3_key(f"question_sets/{qid}.json")
        s3_client.put_object(
            Bucket=S3_BUCKET,
            Key=s3_key,
            Body=json.dumps(question_set_data),
            ContentType='application/json',
        )

        # Build and save metadata to DynamoDB
        metadata_item = {
            'uid': qid,
            'title': question_set_data.get('title', ''),
            'category': question_set_data['category'],
            'exam': question_set_data['exam'],
            'questionType': question_set_data['questionType'],
            'timeLimit': time_limit,
            'description': question_set_data.get('description', ''),
            'totalQuestions': _calculate_total_answer_mappings(question_set_data['questions']),
            'completions': 0,
            'createdAt': created_at,
            'author': question_set_data.get('author', 'Admin'),
            'status': question_set_data.get('status', 'draft'),
            'isTrial': question_set_data.get('isTrial', False),
            's3Key': s3_key
        }

        # Optional collection association
        collection_id = question_set_data.get('collection')
        if collection_id:
            metadata_item['collection'] = collection_id

        question_set_table.put_item(Item=metadata_item)

        # If collection was provided, also append this question set to the collection's list
        try:
            if collection_id:
                from src.utils import collection_table
                updated_at = int(time.time())
                collection_table.update_item(
                    Key={'uid': collection_id},
                    UpdateExpression="SET questionSets = list_append(if_not_exists(questionSets, :empty_list), :new_item), updatedAt = :updated_at",
                    ExpressionAttributeValues={
                        ':new_item': [qid],
                        ':empty_list': [],
                        ':updated_at': updated_at
                    },
                    ReturnValues='NONE'
                )
        except Exception:
            # Do not fail creation if collection update fails; client can retry linking separately
            pass

        return {
            'statusCode': 200,
            'body': {
                'questionSetId': qid,
                'questionSet': question_set_data,
                'metadata': metadata_item,
                'summary': {
                    'totalQuestions': metadata_item['totalQuestions'],
                    'category': metadata_item['category'],
                    'timeLimit': metadata_item['timeLimit'],
                    'status': metadata_item['status']
                }
            }
        }
    except ClientError as e:
        return {
            'statusCode': 500,
            'body': {'error': f'AWS error: {str(e)}'}
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': {'error': f'Unexpected error: {str(e)}'}
        }


def append_questions_to_question_set(question_set_id: str, text_input: str, insert_index: int = 0) -> Dict[str, Any]:
    """
    Appends questions parsed from raw text (e.g., extracted PDF text) into an existing question set
    at a specific index. Uses the same AI schema as upload_questions (HTML-only with answerMapping),
    then merges the new questions into the existing S3 JSON and updates DynamoDB totals.

    Parameters:
        question_set_id (str): Target question set ID
        text_input (str): Raw text to be parsed into questions
        insert_index (int): Index to insert new questions at (0..len). Clamped within bounds

    Returns:
        Dict[str, Any]: Updated question set, metadata, and summary
    """
    try:
        import boto3
        import time
        from botocore.exceptions import ClientError
        from src.utils import question_set_table, S3_BUCKET

        if not question_set_id or not question_set_id.strip():
            return {
                'statusCode': 400,
                'body': {'error': 'Question set ID is required and cannot be empty'}
            }

        if not text_input or not text_input.strip():
            return {
                'statusCode': 400,
                'body': {'error': 'Text input is required and cannot be empty'}
            }

        # 1) Load existing metadata and S3 JSON
        try:
            meta_res = question_set_table.get_item(Key={'uid': question_set_id})
            if 'Item' not in meta_res:
                return {'statusCode': 404, 'body': {'error': 'Question set not found'}}
            meta_item = meta_res['Item']
            s3_key = meta_item.get('s3Key')
            if not s3_key:
                return {'statusCode': 404, 'body': {'error': 'Question set data not found in S3'}}
        except ClientError as e:
            return {'statusCode': 500, 'body': {'error': f'Failed to get question set: {str(e)}'}}

        try:
            s3 = boto3.client('s3')
            s3_obj = s3.get_object(Bucket=S3_BUCKET, Key=s3_key)
            current_qs = json.loads(s3_obj['Body'].read().decode('utf-8'))
        except Exception as e:
            return {'statusCode': 500, 'body': {'error': f'Failed to read S3 question set: {str(e)}'}}

        # 2) Build a minimal settings object from current_qs for AI formatting
        settings = {
            'title': current_qs.get('title', ''),
            'category': current_qs.get('category', 'Grammar'),
            'exam': current_qs.get('exam', 'HSG'),
            'questionType': current_qs.get('questionType', 'multiple-choice'),
            'timeLimit': current_qs.get('timeLimit', 60),
            'description': current_qs.get('description', ''),
        }

        # 3) Reuse the same schema + prompt to transform text_input to structured questions
        #    We only need the "questions" array from the result
        schema = {
            "type": "object",
            "properties": {
                "title": {"type": "string"},
                "category": {"type": "string"},
                "exam": {"type": "string"},
                "questionType": {"type": "string"},
                "timeLimit": {"type": "integer"},
                "description": {"type": "string"},
                "questions": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "type": {"type": "string", "enum": ["html"]},
                            "text": {"type": "string"},
                            "htmlContent": {"type": "string"},
                            "answerMapping": {
                                "type": "array",
                                "items": {
                                    "type": "object",
                                    "properties": {
                                        "selector": {"type": "string"},
                                        "correctValue": {
                                            "oneOf": [
                                                {"type": "string"},
                                                {"type": "array", "items": {"type": "string"}},
                                                {"type": "boolean"},
                                                {"type": "number"}
                                            ]
                                        },
                                        "validationType": {"type": "string", "enum": ["exact", "contains", "regex", "numeric"]},
                                        "caseSensitive": {"type": "boolean"},
                                        "tolerance": {"type": "number"},
                                        "explanation": {"type": "string"}
                                    },
                                    "required": ["selector", "correctValue", "validationType", "explanation"]
                                }
                            }
                        },
                        "required": ["type", "text", "htmlContent", "answerMapping"]
                    },
                    "minItems": 1
                }
            },
            "required": ["category", "exam", "questionType", "timeLimit", "questions"]
        }

        sys_inst = """
Bạn là chuyên gia định dạng bộ câu hỏi cho giáo dục Việt Nam. Hãy chuyển đổi văn bản thô thành bộ câu hỏi có cấu trúc chuẩn.
- Chỉ tạo câu hỏi dạng "html" với htmlContent và answerMapping.
- Với passage điền vào chỗ trống có sẵn lựa chọn: CHÈN thẻ <select> NGAY TẠI VỊ TRÍ CHỖ TRỐNG với các <option> tương ứng (không liệt kê lựa chọn riêng bên dưới). Dùng id tuần tự #blank1, #blank2,... và ánh xạ từng <select> trong answerMapping (selector là id, correctValue là value của option đúng, validationType="exact").
- Không thay đổi nội dung gốc, chỉ thêm giải thích bằng tiếng Việt cho từng answerMapping.
- Trường "text" chỉ dùng mô tả rất ngắn hoặc để TRỐNG; KHÔNG lặp lại nội dung đề đã có trong htmlContent.
- Trong trường "explanation" của answerMapping, nếu phù hợp, yêu cầu Markdown có các phần: lời giải nghĩa ngắn; **Example**: câu ví dụ và dịch; **Đồng nghĩa**: danh sách '-', **Trái nghĩa**: danh sách '-'. Không chèn HTML, chỉ Markdown đơn giản, tối đa 6 mục mỗi danh sách.
- Trả về JSON hợp lệ theo schema.
"""

        prompt = f"""
Please format the following raw text into a structured question set (we only need the questions array):

{text_input}

Ensure each question is type "html" with htmlContent. If you include answerMapping, follow the structure and ensure selectors map to elements in htmlContent. For cloze/fill-in-the-blank passages that include provided choices, embed a <select> with inline <option> at each blank instead of listing the choices separately.
"""

        ai_result = ai.call_generate_content(
            sys_inst,
            prompt,
            jsonRule=schema,
            auto_pair_json=True,
            max_retries=1
        )

        if isinstance(ai_result, dict) and ai_result.get('error'):
            return {'statusCode': 500, 'body': {'error': f"AI parsing error: {ai_result['error']}"}}

        if not isinstance(ai_result, dict) or 'questions' not in ai_result or not isinstance(ai_result['questions'], list) or len(ai_result['questions']) == 0:
            return {'statusCode': 400, 'body': {'error': 'Failed to parse questions from the provided text'}}

        new_questions = ai_result['questions']
        # Normalize: avoid duplicating main content in the optional 'text' field
        for q in new_questions:
            if isinstance(q, dict) and q.get('type') == 'html' and isinstance(q.get('text', ''), str):
                q['text'] = ''

        # 4) Merge questions into existing question set at insert_index
        existing_questions = current_qs.get('questions', [])
        insert_index = max(0, min(insert_index if isinstance(insert_index, int) else 0, len(existing_questions)))
        merged_questions = existing_questions[:insert_index] + new_questions + existing_questions[insert_index:]
        current_qs['questions'] = merged_questions

        # 5) Persist back to S3
        try:
            s3.put_object(Bucket=S3_BUCKET, Key=s3_key, Body=json.dumps(current_qs), ContentType='application/json')
        except Exception as e:
            return {'statusCode': 500, 'body': {'error': f'Failed to update S3: {str(e)}'}}

        # 6) Update totals in DynamoDB
        try:
            total_questions = _calculate_total_answer_mappings(current_qs.get('questions', []))
            updated_at = int(time.time())
            question_set_table.update_item(
                Key={'uid': question_set_id},
                UpdateExpression="SET totalQuestions = :tq, updatedAt = :ua",
                ExpressionAttributeValues={
                    ':tq': total_questions,
                    ':ua': updated_at
                }
            )
            meta_item['totalQuestions'] = total_questions
            meta_item['updatedAt'] = updated_at
        except ClientError as e:
            return {'statusCode': 500, 'body': {'error': f'Failed to update metadata: {str(e)}'}}

        return {
            'statusCode': 200,
            'body': {
                'message': 'Questions appended successfully',
                'questionSetId': question_set_id,
                'questionSet': current_qs,
                'metadata': meta_item,
                'summary': {
                    'totalQuestions': meta_item['totalQuestions'],
                    'category': current_qs.get('category'),
                    'timeLimit': current_qs.get('timeLimit'),
                    'status': meta_item.get('status', 'draft')
                }
            }
        }
    except Exception as e:
        return {'statusCode': 500, 'body': {'error': f'Unexpected error: {str(e)}'}}


#get all question sets no input require
def get_question_sets() -> Dict[str, Any]:
    """
    Retrieves all question sets from DynamoDB.
    
    Returns:
        Dict[str, Any]: Response containing list of question sets or error message
    """
    
    try:
        import boto3
        from botocore.exceptions import ClientError
        from src.utils import question_set_table, convert_sets_to_lists
        
        # Scan the table to get all question sets
        try:
            response = question_set_table.scan()
            items = response.get('Items', [])
            
            # Convert DynamoDB sets to lists for JSON serialization
            items = convert_sets_to_lists(items)
            
            # Format the response to match frontend expectations
            formatted_items = []
            for item in items:
                formatted_item = {
                    'id': item.get('uid'),
                    'title': item.get('title', ''),
                    'category': item.get('category', ''),
                    'difficulty': item.get('difficulty', ''),
                    'totalQuestions': item.get('totalQuestions', 0),
                    'completions': item.get('completions', 0),
                    'createdAt': item.get('createdAt', 0),  # Use createdAt directly (Unix timestamp in seconds)
                    'status': item.get('status', 'draft'),
                    'author': item.get('author', 'Admin'),
                    'exam': item.get('exam', ''),
                    'questionType': item.get('questionType', ''),
                    'timeLimit': item.get('timeLimit', 0),
                    'description': item.get('description', ''),
                    's3Key': item.get('s3Key', ''),
                    'isTrial': item.get('isTrial', False),  # Add isTrial field
                    'collection': item.get('collection', 'single')  # Add collection field
                }
                formatted_items.append(formatted_item)
            
            # Sort by creation date (newest first)
            formatted_items.sort(key=lambda x: x.get('createdAt', 0), reverse=True)
            
            return {
                'statusCode': 200,
                'body': {
                    'questionSets': formatted_items,
                    'total': len(formatted_items)
                }
            }
            
        except ClientError as e:
            return {
                'statusCode': 500,
                'body': {'error': f'Failed to retrieve question sets: {str(e)}'}
            }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'body': {'error': f'Unexpected error: {str(e)}'}
        }

# ================================
# Wrong-answer stats (sb_question_stats)
# ================================
from typing import List, Dict, Any
from datetime import datetime, timezone
from boto3.dynamodb.conditions import Key, Attr
from src.utils import sb_question_stats as _sb_question_stats


def _now_periods():
    now = datetime.utcnow().replace(tzinfo=timezone.utc)
    iso_year, iso_week, _ = now.isocalendar()
    week_period = f"{iso_year}-W{iso_week:02d}"
    month_period = now.strftime("%Y-%m")
    ts = int(now.timestamp())
    return ts, week_period, month_period


from typing import Tuple


def _get_stats_key_names() -> Tuple[str, str]:
    """Detect primary key attribute names of sb_question_stats to avoid schema mismatch.
    Returns (pk_name, sk_name_or_none). Defaults to ('bucket', 'question_id').
    """
    try:
        import boto3
        table_name = getattr(_sb_question_stats, 'name', 'sb_question_stats')
        client = boto3.client('dynamodb')
        desc = client.describe_table(TableName=table_name)
        ks = desc.get('Table', {}).get('KeySchema', [])
        pk_name = next((k.get('AttributeName') for k in ks if k.get('KeyType') == 'HASH'), None) or 'bucket'
        sk_name = next((k.get('AttributeName') for k in ks if k.get('KeyType') == 'RANGE'), None)
        return pk_name, sk_name
    except Exception:
        return 'bucket', 'question_id'


def record_wrong_answers(user_id: str, question_set_id: str, question_ids: List[str], collection_id: str = None) -> Dict[str, Any]:
    """
    Increment wrong-answer counters for provided question identifiers.
    - question_id format: "{question_set_id}#{questionIndex}" or just "{questionIndex}" (index-based)
    - Stores html/explanation/correct answer for rendering.

    Writes into sb_question_stats under buckets: ALL, WEEK:YYYY-Www, MONTH:YYYY-MM
    with a GSI 'bucket-wrongCount-index' to query top wrong questions per period.
    """
    try:
        if not question_set_id or not str(question_set_id).strip():
            return {'statusCode': 400, 'body': {'error': 'questionSetId is required'}}
        if not isinstance(question_ids, list) or len(question_ids) == 0:
            return {'statusCode': 400, 'body': {'error': 'questionIds must be a non-empty list'}}

        # Load question set once from S3
        import boto3
        from src.utils import question_set_table, S3_BUCKET

        meta = question_set_table.get_item(Key={'uid': question_set_id}).get('Item')
        if not meta:
            return {'statusCode': 404, 'body': {'error': 'Question set not found'}}
        s3_key = meta.get('s3Key')
        if not s3_key:
            return {'statusCode': 404, 'body': {'error': 'Question set data missing'}}
        s3_client = boto3.client('s3')
        qset_obj = s3_client.get_object(Bucket=S3_BUCKET, Key=s3_key)
        qset = json.loads(qset_obj['Body'].read().decode('utf-8'))
        questions: List[Dict[str, Any]] = qset.get('questions', [])
        title = qset.get('title', '')
        # Try to get owning collection name if available via reverse lookup
        collection_name = None
        try:
            from src.utils import collection_table
            # If collection_id provided, read it; else scan to find any collection that contains this qset
            if collection_id:
                cres = collection_table.get_item(Key={'uid': collection_id})
                if 'Item' in cres:
                    collection_name = cres['Item'].get('name')
            if not collection_name:
                # Light scan filter by questionSets contains question_set_id (best-effort)
                try:
                    scan = collection_table.scan()
                    for it in scan.get('Items', []):
                        arr = it.get('questionSets') or []
                        if question_set_id in arr:
                            collection_name = it.get('name')
                            break
                except Exception:
                    pass
        except Exception:
            pass

        updated = 0
        updated_ids: List[str] = []
        errors: List[str] = []
        now_ts, week_period, month_period = _now_periods()
        buckets = [
            'ALL',
            f'WEEK:{week_period}',
            f'MONTH:{month_period}',
        ]
        pk_name, sk_name = _get_stats_key_names()
        for raw in question_ids:
            try:
                idx_part = str(raw)
                if '#' in idx_part:
                    idx_part = idx_part.split('#')[-1]
                qidx = int(idx_part)
            except Exception:
                continue

            if qidx < 0 or qidx >= len(questions):
                continue

            q = questions[qidx] or {}
            am = q.get('answerMapping') or []
            # Only track when single mapping
            if not isinstance(am, list) or len(am) != 1:
                continue
            m = am[0] or {}

            # Normalize correct answer to string for quick rendering
            cv = m.get('correctValue')
            if isinstance(cv, (list, dict)):
                try:
                    correct_ans_text = json.dumps(cv, ensure_ascii=False)
                except Exception:
                    correct_ans_text = str(cv)
            elif cv is None:
                correct_ans_text = ''
            else:
                correct_ans_text = str(cv)

            explanation = m.get('explanation') or ''
            selector = m.get('selector') or ''
            html = q.get('htmlContent') or ''
            question_id = f"{question_set_id}#{qidx}"

            success_any = False
            for b in buckets:
                try:
                    key_args = {pk_name: b}
                    if sk_name:
                        key_args[sk_name] = question_id
                    _sb_question_stats.update_item(
                        Key=key_args,
                        UpdateExpression=(
                            'SET question_set_id = :qsid, question_index = :qidx, '
                            'title = if_not_exists(title, :title), '
                            'collectionId = if_not_exists(collectionId, :cid), '
                            'collectionName = if_not_exists(collectionName, :cname), '
                            'html = if_not_exists(html, :html), '
                            'correctAnswer = if_not_exists(correctAnswer, :ans), '
                            'explanation = if_not_exists(explanation, :exp), '
                            'selector = if_not_exists(selector, :sel), '
                            'updatedAt = :now, '
                            'wrongCountNum = if_not_exists(wrongCountNum, :zero) + :one'
                        ),
                        ExpressionAttributeValues={
                            ':qsid': question_set_id,
                            ':qidx': qidx,
                            ':title': title,
                            ':cid': collection_id or '',
                            ':cname': collection_name or '',
                            ':html': html,
                            ':ans': correct_ans_text,
                            ':exp': explanation,
                            ':sel': selector,
                            ':now': now_ts,
                            ':zero': 0,
                            ':one': 1,
                        },
                    )
                    # Update wrongCount as padded string for GSI compatibility
                    try:
                        # Read current wrongCountNum
                        cur = _sb_question_stats.get_item(Key=key_args).get('Item') or {}
                        wc_num = int(cur.get('wrongCountNum', 0))
                        wc_str = str(int(wc_num)).zfill(12)
                        _sb_question_stats.update_item(
                            Key=key_args,
                            UpdateExpression='SET wrongCount = :wc',
                            ExpressionAttributeValues={':wc': wc_str},
                        )
                    except Exception:
                        pass
                    success_any = True
                except Exception as e:
                    # Capture error for diagnostics
                    try:
                        err_str = str(e)
                        if len(err_str) > 300:
                            err_str = err_str[:300] + '...'
                        errors.append(f"{b}/{question_id}: {err_str}")
                    except Exception:
                        pass
                    print(f"record_wrong_answers update failed for {b}/{question_id}: {str(e)}")
                    continue
            if success_any:
                updated += 1
                updated_ids.append(question_id)

        status = 200 if updated > 0 and len(errors) == 0 else (207 if updated > 0 else 500)
        return {'statusCode': status, 'body': {'updated': updated, 'updatedIds': updated_ids, 'errors': errors}}
    except Exception as e:
        return {'statusCode': 500, 'body': {'error': str(e)}}


def get_top_wrong_questions(period: str = 'WEEK', limit: int = 10) -> Dict[str, Any]:
    """
    Return top wrong questions for current period.
    period: 'WEEK' | 'MONTH' | 'ALL'
    """
    try:
        _, week_period, month_period = _now_periods()
        if period == 'ALL':
            bucket = 'ALL'
        elif period == 'MONTH':
            bucket = f'MONTH:{month_period}'
        else:
            bucket = f'WEEK:{week_period}'

        items: List[Dict[str, Any]] = []
        pk_name, _sk_name = _get_stats_key_names()
        try:
            # Enforce server-side cap regardless of client value
            eff_limit = 10
            resp = _sb_question_stats.query(
                IndexName='bucket-wrongCount-index',
                KeyConditionExpression=Key('bucket').eq(bucket),
                ScanIndexForward=False,
                Limit=eff_limit,
            )
            items = resp.get('Items', [])
            # If index exists but has no items yet, fallback to scan/filter by pk_name
            if not items:
                try:
                    scan = _sb_question_stats.scan(
                        FilterExpression=Attr(pk_name).eq(bucket)
                    )
                    items = scan.get('Items', [])
                    items.sort(key=lambda it: int(it.get('wrongCountNum', it.get('wrongCount', 0)) or 0), reverse=True)
                    items = items[: eff_limit]
                except Exception:
                    pass
        except Exception as e:
            # Fallback: scan then filter/sort using detected pk name
            try:
                scan = _sb_question_stats.scan(FilterExpression=Attr(pk_name).eq(bucket))
                items = scan.get('Items', [])
                items.sort(key=lambda it: int(it.get('wrongCountNum', it.get('wrongCount', 0)) or 0), reverse=True)
                items = items[: 10]
            except Exception as e2:
                return {'statusCode': 500, 'body': {'error': f'Failed to query stats: {str(e2)}'}}

        results = []
        for it in items:
            # Prefer numeric if available; else parse string
            try:
                wc_val = int(it.get('wrongCountNum')) if it.get('wrongCountNum') is not None else int(it.get('wrongCount', 0))
            except Exception:
                wc_val = 0
            results.append({
                'questionId': it.get('question_id'),
                'questionSetId': it.get('question_set_id'),
                'questionIndex': it.get('question_index'),
                'title': it.get('title', ''),
                'wrongCount': wc_val,
                'html': it.get('html', ''),
                'correctAnswer': it.get('correctAnswer', ''),
                'explanation': it.get('explanation', ''),
                'selector': it.get('selector', ''),
                'collectionId': it.get('collectionId', ''),
                'collectionName': it.get('collectionName', ''),
            })
        return {'statusCode': 200, 'body': {'questions': results, 'bucket': bucket}}
    except Exception as e:
        return {'statusCode': 500, 'body': {'error': str(e)}}


def get_question_set_counts(exam_filter: str = None, status_filter: str = "active") -> dict:
    """
    Retrieves count of question sets by category from DynamoDB.
    Can optionally filter by exam type and status.
    Optimized to only fetch necessary fields to minimize data transfer.
    Returns:
        dict: Response containing counts by category
    """
    try:
        from botocore.exceptions import ClientError
        from src.utils import question_set_table
        
        # Build filter expression and values
        filter_expressions = []
        expression_values = {}
        expression_names = {}
        
        # Add exam filter if provided
        if exam_filter:
            filter_expressions.append('exam = :exam')
            expression_values[':exam'] = exam_filter
        
        # Add status filter (default to active) - handle reserved keyword
        if status_filter:
            filter_expressions.append('#status = :status')
            expression_values[':status'] = status_filter
            expression_names['#status'] = 'status'
        
        # Combine filter expressions
        filter_expression = ' AND '.join(filter_expressions) if filter_expressions else None
        
        # Projection includes all fields needed for filtering - handle reserved keyword
        projection = 'category, exam, #status'
        expression_names['#status'] = 'status'
        
        try:
            # Build scan parameters
            scan_params = {
                'ProjectionExpression': projection,
                'ExpressionAttributeNames': expression_names
            }
            
            if filter_expression:
                scan_params['FilterExpression'] = filter_expression
                scan_params['ExpressionAttributeValues'] = expression_values
            
            response = question_set_table.scan(**scan_params)
            items = response.get('Items', [])
            
            # Count by category
            category_counts = {}
            for item in items:
                category = item.get('category', 'Unknown')
                category_counts[category] = category_counts.get(category, 0) + 1
            
            # Ensure all expected categories are present with 0 count
            expected_categories = ['Grammar', 'Reading', 'Listening', 'Writing']
            for category in expected_categories:
                if category not in category_counts:
                    category_counts[category] = 0
            
            return {
                'statusCode': 200,
                'body': {
                    'counts': category_counts,
                    'total': sum(category_counts.values()),
                    'examFilter': exam_filter,
                    'statusFilter': status_filter
                }
            }
        except ClientError as e:
            return {
                'statusCode': 500,
                'body': {'error': f'Failed to retrieve question set counts: {str(e)}'}
            }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': {'error': f'Unexpected error: {str(e)}'}
        }


def delete_question_set(question_set_id: str) -> Dict[str, Any]:
    """
    Deletes a question set from both DynamoDB and S3.
    
    Parameters:
        question_set_id (str): The unique identifier of the question set to delete
    
    Returns:
        Dict[str, Any]: Response containing success message or error
    """
    
    try:
        import boto3
        from botocore.exceptions import ClientError
        from src.utils import question_set_table, S3_BUCKET
        
        # Validate input
        if not question_set_id or not question_set_id.strip():
            return {
                'statusCode': 400,
                'body': {'error': 'Question set ID is required and cannot be empty'}
            }
        
        # First, get the question set to retrieve S3 key
        try:
            existing_item_response = question_set_table.get_item(
                Key={'uid': question_set_id}
            )
            
            if 'Item' not in existing_item_response:
                return {
                    'statusCode': 404,
                    'body': {'error': 'Question set not found'}
                }
            
            existing_item = existing_item_response['Item']
            s3_key = existing_item.get('s3Key')
            
        except ClientError as e:
            return {
                'statusCode': 500,
                'body': {'error': f'Failed to retrieve question set: {str(e)}'}
            }

        # Delete from S3 if s3Key exists
        if s3_key:
            try:
                s3_client = boto3.client('s3')
                s3_client.delete_object(
                    Bucket=S3_BUCKET,
                    Key=s3_key
                )
            except Exception as e:
                # Log the error but don't fail the entire operation
                print(f"Warning: Failed to delete S3 object {s3_key}: {str(e)}")

        # Delete from DynamoDB
        try:
            question_set_table.delete_item(
                Key={'uid': question_set_id},
                ConditionExpression='attribute_exists(uid)'
            )
            
        except ClientError as e:
            error_code = e.response['Error']['Code']
            if error_code == 'ConditionalCheckFailedException':
                return {
                    'statusCode': 404,
                    'body': {'error': 'Question set not found'}
                }
            else:
                return {
                    'statusCode': 500,
                    'body': {'error': f'Failed to delete from DynamoDB: {str(e)}'}
                }

        return {
            'statusCode': 200,
            'body': {
                'message': 'Question set deleted successfully',
                'questionSetId': question_set_id
            }
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'body': {'error': f'Unexpected error: {str(e)}'}
        }


def bulk_delete_question_sets(question_set_ids: list) -> Dict[str, Any]:
    """
    Bulk delete multiple question sets from both DynamoDB and S3.
    
    Parameters:
        question_set_ids (list): List of question set IDs to delete
    
    Returns:
        Dict[str, Any]: Response containing bulk deletion results
    """
    
    try:
        # Validate input
        if not question_set_ids or not isinstance(question_set_ids, list):
            return {
                'statusCode': 400,
                'body': {'error': 'Question set IDs list is required and must be a non-empty array'}
            }
        
        if len(question_set_ids) == 0:
            return {
                'statusCode': 400,
                'body': {'error': 'At least one question set ID is required'}
            }
        
        # Remove duplicates and empty values
        question_set_ids = list(set([id.strip() for id in question_set_ids if id and str(id).strip()]))
        
        if len(question_set_ids) == 0:
            return {
                'statusCode': 400,
                'body': {'error': 'No valid question set IDs provided'}
            }
        
        success_results = []
        failed_results = []
        
        # Delete each question set
        for question_set_id in question_set_ids:
            try:
                result = delete_question_set(question_set_id)
                
                if result.get('statusCode') == 200:
                    success_results.append({
                        'id': question_set_id,
                        'message': result['body']['message']
                    })
                else:
                    failed_results.append({
                        'id': question_set_id,
                        'error': result['body'].get('error', 'Unknown error')
                    })
                    
            except Exception as e:
                failed_results.append({
                    'id': question_set_id,
                    'error': f'Unexpected error: {str(e)}'
                })
        
        return {
            'statusCode': 200,
            'body': {
                'message': f'Bulk deletion completed: {len(success_results)} successful, {len(failed_results)} failed',
                'results': {
                    'success': success_results,
                    'failed': failed_results,
                    'total': len(question_set_ids),
                    'successCount': len(success_results),
                    'failedCount': len(failed_results)
                }
            }
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'body': {'error': f'Unexpected error in bulk deletion: {str(e)}'}
        }


def update_question_set(question_set_id: str, question_set_data: Dict[str, Any]) -> Dict[str, Any]:
    """
    Updates an existing question set in both S3 and DynamoDB.
    
    Parameters:
        question_set_id (str): The unique identifier of the question set to update
        question_set_data (dict): The complete question set data including:
            - title (str): Title of the question set
            - category (str): Category (Grammar, Reading, Listening, Writing)
            - difficulty (str): Difficulty level (Easy, Medium, Hard)
            - exam (str): Exam type (HSG, HSGQG, HSGT)
            - questionType (str): Type (multiple-choice, comprehension, essay, word-formation)
            - timeLimit (int): Time limit in minutes
            - description (str): Description of the question set
            - status (str): Status (draft, active)
            - questions (list): List of questions
    
    Returns:
        Dict[str, Any]: Response containing success message or error
    """
    
    try:
        import time
        import boto3
        from botocore.exceptions import ClientError
        from src.utils import question_set_table, S3_BUCKET, get_s3_key
        
        # Validate inputs
        if not question_set_id or not question_set_id.strip():
            return {
                'statusCode': 400,
                'body': {'error': 'Question set ID is required and cannot be empty'}
            }
        
        if not question_set_data:
            return {
                'statusCode': 400,
                'body': {'error': 'Question set data is required'}
            }
        
        # Validate required fields (title and description are optional)
        required_fields = ['category', 'exam', 'questionType', 'timeLimit', 'questions']
        for field in required_fields:
            if field not in question_set_data:
                return {
                    'statusCode': 400,
                    'body': {'error': f'Missing required field: {field}'}
                }
        
        # Validate questions structure
        if not question_set_data['questions'] or len(question_set_data['questions']) == 0:
            return {
                'statusCode': 400,
                'body': {'error': 'Question set must have at least one question'}
            }
        
        # Validate each question structure
        for i, question in enumerate(question_set_data['questions']):
            q_type = question.get('type')
            if not q_type:
                return {
                    'statusCode': 400,
                    'body': {'error': f'Question {i+1} missing type field'}
                }

            # Validation based on type
            if q_type == 'mcq':
                required_fields = ['answers', 'correctIndex', 'explanation']
                for field in required_fields:
                    if field not in question:
                        return {
                            'statusCode': 400,
                            'body': {'error': f'Question {i+1} missing required field "{field}"'}
                        }
                if question['correctIndex'] >= len(question['answers']):
                    return {
                        'statusCode': 400,
                        'body': {'error': f'Question {i+1} has invalid correctIndex'}
                    }
            elif q_type == 'wordform':
                if 'word' not in question:
                    return {
                        'statusCode': 400,
                        'body': {'error': f'Question {i+1} missing word list'}
                    }
            elif q_type == 'separate_section':
                if 'word' not in question:
                    return {
                        'statusCode': 400,
                        'body': {'error': f'Question {i+1} missing word list for separate_section'}
                    }
            # Only html type supported; validation handled above

        # First, check if the question set exists in DynamoDB
        try:
            existing_item_response = question_set_table.get_item(
                Key={'uid': question_set_id}
            )
            
            if 'Item' not in existing_item_response:
                return {
                    'statusCode': 404,
                    'body': {'error': 'Question set not found'}
                }
            
            existing_item = existing_item_response['Item']
            
        except ClientError as e:
            return {
                'statusCode': 500,
                'body': {'error': f'Failed to retrieve question set: {str(e)}'}
            }

        # Update S3 file with new question set data
        try:
            s3_client = boto3.client('s3')
            s3_key = existing_item.get('s3Key')
            
            if not s3_key:
                # If no s3Key exists, create a new one
                s3_key = get_s3_key(f"question_sets/{question_set_id}.json")
            
            s3_client.put_object(
                Bucket=S3_BUCKET,
                Key=s3_key,
                Body=json.dumps(question_set_data),
                ContentType='application/json',
            )
            
        except Exception as e:
            return {
                'statusCode': 500,
                'body': {'error': f'Failed to update S3 file: {str(e)}'}
            }

        # Update DynamoDB metadata
        try:
            updated_at = int(time.time())
            
            # Build update expression and values
            update_expression = """
                SET 
                    title = :title,
                    category = :category,
                    exam = :exam,
                    questionType = :questionType,
                    timeLimit = :timeLimit,
                    description = :description,
                    totalQuestions = :totalQuestions,
                    completions = :completions,
                    updatedAt = :updatedAt,
                    s3Key = :s3Key,
                    isTrial = :isTrial
            """
            
            expression_values = {
                ':title': question_set_data.get('title', existing_item.get('title', '')),
                ':category': question_set_data['category'],
                ':exam': question_set_data['exam'],
                ':questionType': question_set_data['questionType'],
                ':timeLimit': question_set_data['timeLimit'],
                ':description': question_set_data['description'],
                ':totalQuestions': _calculate_total_answer_mappings(question_set_data['questions']),
                ':completions': question_set_data.get('completions', existing_item.get('completions', 0)),
                ':updatedAt': updated_at,
                ':s3Key': s3_key,
                ':isTrial': question_set_data.get('isTrial', False)
            }
            
            # Add status if provided
            if 'status' in question_set_data:
                update_expression += ", #status = :status"
                expression_values[':status'] = question_set_data['status']
            
            expression_attribute_names = {}
            if 'status' in question_set_data:
                expression_attribute_names['#status'] = 'status'
            
            update_params = {
                'Key': {'uid': question_set_id},
                'UpdateExpression': update_expression,
                'ExpressionAttributeValues': expression_values,
                'ReturnValues': 'ALL_NEW'
            }
            
            if expression_attribute_names:
                update_params['ExpressionAttributeNames'] = expression_attribute_names
            
            response = question_set_table.update_item(**update_params)
            updated_item = response.get('Attributes', {})
            
        except ClientError as e:
            return {
                'statusCode': 500,
                'body': {'error': f'Failed to update DynamoDB: {str(e)}'}
            }

        return {
            'statusCode': 200,
            'body': {
                'message': 'Question set updated successfully',
                'questionSetId': question_set_id,
                'metadata': updated_item,
                'summary': {
                    'totalQuestions': _calculate_total_answer_mappings(question_set_data['questions']),
                    'category': question_set_data['category'],
                    'timeLimit': question_set_data['timeLimit'],
                    'status': question_set_data.get('status', 'draft')
                }
            }
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'body': {'error': f'Unexpected error: {str(e)}'}
        }


def update_question_set_status(question_set_id: str, status: str) -> Dict[str, Any]:
    """
    Updates only the status of an existing question set in DynamoDB.
    
    Parameters:
        question_set_id (str): The unique identifier of the question set to update
        status (str): The new status (draft, active)
    
    Returns:
        Dict[str, Any]: Response containing success message or error
    """
    
    try:
        import time
        from botocore.exceptions import ClientError
        from src.utils import question_set_table
        
        # Validate inputs
        if not question_set_id or not question_set_id.strip():
            return {
                'statusCode': 400,
                'body': {'error': 'Question set ID is required and cannot be empty'}
            }
        
        if not status or status not in ['draft', 'active']:
            return {
                'statusCode': 400,
                'body': {'error': 'Status must be either "draft" or "active"'}
            }
        
        # First, check if the question set exists in DynamoDB
        try:
            existing_item_response = question_set_table.get_item(
                Key={'uid': question_set_id}
            )
            
            if 'Item' not in existing_item_response:
                return {
                    'statusCode': 404,
                    'body': {'error': 'Question set not found'}
                }
            
        except ClientError as e:
            return {
                'statusCode': 500,
                'body': {'error': f'Failed to retrieve question set: {str(e)}'}
            }

        # Update only the status in DynamoDB
        try:
            updated_at = int(time.time())
            
            update_params = {
                'Key': {'uid': question_set_id},
                'UpdateExpression': 'SET #status = :status, updatedAt = :updatedAt',
                'ExpressionAttributeNames': {
                    '#status': 'status'
                },
                'ExpressionAttributeValues': {
                    ':status': status,
                    ':updatedAt': updated_at
                },
                'ReturnValues': 'ALL_NEW'
            }
            
            response = question_set_table.update_item(**update_params)
            updated_item = response.get('Attributes', {})
            
        except ClientError as e:
            return {
                'statusCode': 500,
                'body': {'error': f'Failed to update status: {str(e)}'}
            }

        return {
            'statusCode': 200,
            'body': {
                'message': 'Question set status updated successfully',
                'questionSetId': question_set_id,
                'status': status,
                'metadata': updated_item
            }
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'body': {'error': f'Unexpected error: {str(e)}'}
        }


def update_question_set_trial(question_set_id: str, is_trial: bool) -> Dict[str, Any]:
    """
    Updates only the isTrial flag of an existing question set in DynamoDB.
    
    Parameters:
        question_set_id (str): The unique identifier of the question set to update
        is_trial (bool): The new trial status (True/False)
    
    Returns:
        Dict[str, Any]: Response containing success message or error
    """
    
    try:
        import time
        from botocore.exceptions import ClientError
        from src.utils import question_set_table
        
        # Validate inputs
        if not question_set_id or not question_set_id.strip():
            return {
                'statusCode': 400,
                'body': {'error': 'Question set ID is required and cannot be empty'}
            }
        
        if not isinstance(is_trial, bool):
            return {
                'statusCode': 400,
                'body': {'error': 'isTrial must be a boolean value'}
            }
        
        # First, check if the question set exists in DynamoDB
        try:
            existing_item_response = question_set_table.get_item(
                Key={'uid': question_set_id}
            )
            
            if 'Item' not in existing_item_response:
                return {
                    'statusCode': 404,
                    'body': {'error': 'Question set not found'}
                }
            
        except ClientError as e:
            return {
                'statusCode': 500,
                'body': {'error': f'Failed to retrieve question set: {str(e)}'}
            }

        # Update only the isTrial flag in DynamoDB
        try:
            updated_at = int(time.time())
            
            update_params = {
                'Key': {'uid': question_set_id},
                'UpdateExpression': 'SET isTrial = :isTrial, updatedAt = :updatedAt',
                'ExpressionAttributeValues': {
                    ':isTrial': is_trial,
                    ':updatedAt': updated_at
                },
                'ReturnValues': 'ALL_NEW'
            }
            
            response = question_set_table.update_item(**update_params)
            updated_item = response.get('Attributes', {})
            
        except ClientError as e:
            return {
                'statusCode': 500,
                'body': {'error': f'Failed to update trial status: {str(e)}'}
            }

        return {
            'statusCode': 200,
            'body': {
                'message': 'Question set trial status updated successfully',
                'questionSetId': question_set_id,
                'isTrial': is_trial,
                'metadata': updated_item
            }
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'body': {'error': f'Unexpected error: {str(e)}'}
        }


def increment_question_set_completions(question_set_id: str) -> Dict[str, Any]:
    """
    Increment the 'completions' counter of a question set by 1.

    Parameters:
        question_set_id (str): The unique identifier of the question set to update.

    Returns:
        Dict[str, Any]: Response containing the updated completions count or error.
    """
    try:
        from botocore.exceptions import ClientError
        from src.utils import question_set_table

        # Validate input
        if not question_set_id or not question_set_id.strip():
            return {
                'statusCode': 400,
                'body': {'error': 'Question set ID is required and cannot be empty'}
            }

        try:
            # Atomically increment the completions attribute (creates it if it doesn't exist)
            response = question_set_table.update_item(
                Key={'uid': question_set_id},
                UpdateExpression='ADD completions :inc',
                ExpressionAttributeValues={':inc': 1},
                ReturnValues='UPDATED_NEW'
            )

            new_completions = int(response['Attributes'].get('completions', 0))

            return {
                'statusCode': 200,
                'body': {
                    'message': 'Question set completions incremented successfully',
                    'questionSetId': question_set_id,
                    'completions': new_completions
                }
            }
        except ClientError as e:
            return {
                'statusCode': 500,
                'body': {'error': f'Failed to increment completions: {str(e)}'}
            }

    except Exception as e:
        return {
            'statusCode': 500,
            'body': {'error': f'Unexpected error: {str(e)}'}
        }


def get_question_sets_by_category_and_type(category: str, question_type: str, exam_filter: str = None, status_filter: str = "active") -> Dict[str, Any]:
    """
    Retrieves question sets filtered by category and question type from DynamoDB.
    Can optionally filter by exam type and status.
    
    Parameters:
        category (str): Category to filter by (Grammar, Reading, Listening, Writing)
        question_type (str): Question type to filter by (multiple-choice, word-formation, etc.)
        exam_filter (str, optional): Exam type to filter by (HSG, HSGQG, HSGT)
        status_filter (str, optional): Status to filter by (draft, active). Defaults to "active"
    
    Returns:
        Dict[str, Any]: Response containing list of filtered question sets or error message
    """
    
    try:
        import boto3
        from botocore.exceptions import ClientError
        from src.utils import question_set_table, convert_sets_to_lists
        
        # Validate inputs
        if not category or not category.strip():
            return {
                'statusCode': 400,
                'body': {'error': 'Category is required and cannot be empty'}
            }
        
        if not question_type or not question_type.strip():
            return {
                'statusCode': 400,
                'body': {'error': 'Question type is required and cannot be empty'}
            }
        
        # Build filter expression and values
        filter_expression = 'category = :category AND questionType = :questionType'
        expression_values = {
            ':category': category,
            ':questionType': question_type
        }
        expression_names = {}
        
        # Add exam filter if provided
        if exam_filter and exam_filter.strip():
            filter_expression += ' AND exam = :exam'
            expression_values[':exam'] = exam_filter
        
        # Add status filter (default to active) - handle reserved keyword
        if status_filter:
            filter_expression += ' AND #status = :status'
            expression_values[':status'] = status_filter
            expression_names['#status'] = 'status'
        
        # Scan the table with filter expressions
        try:
            scan_params = {
                'FilterExpression': filter_expression,
                'ExpressionAttributeValues': expression_values
            }
            
            # Add expression names if we have any (for reserved keywords like 'status')
            if expression_names:
                scan_params['ExpressionAttributeNames'] = expression_names
            
            response = question_set_table.scan(**scan_params)
            items = response.get('Items', [])
            
            # Convert DynamoDB sets to lists for JSON serialization
            items = convert_sets_to_lists(items)
            
            # Format the response to match frontend expectations
            formatted_items = []
            for item in items:
                formatted_item = {
                    'id': item.get('uid'),
                    'title': item.get('title', ''),
                    'category': item.get('category', ''),
                    'difficulty': item.get('difficulty', ''),
                    'totalQuestions': item.get('totalQuestions', 0),
                    'completions': item.get('completions', 0),
                    'createdAt': item.get('createdAt', 0),
                    'status': item.get('status', 'draft'),
                    'author': item.get('author', 'Admin'),
                    'exam': item.get('exam', ''),
                    'questionType': item.get('questionType', ''),
                    'timeLimit': item.get('timeLimit', 0),
                    'description': item.get('description', ''),
                    's3Key': item.get('s3Key', '')
                }
                formatted_items.append(formatted_item)
            
            # Sort by creation date (newest first)
            formatted_items.sort(key=lambda x: x.get('createdAt', 0), reverse=True)
            
            return {
                'statusCode': 200,
                'body': {
                    'questionSets': formatted_items,
                    'total': len(formatted_items),
                    'category': category,
                    'questionType': question_type,
                    'examFilter': exam_filter,
                    'statusFilter': status_filter
                }
            }
            
        except ClientError as e:
            return {
                'statusCode': 500,
                'body': {'error': f'Failed to retrieve question sets: {str(e)}'}
            }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'body': {'error': f'Unexpected error: {str(e)}'}
        }


def get_question_set_by_id(question_set_id: str) -> Dict[str, Any]:
    """
    Retrieves a specific question set by ID from DynamoDB and S3.
    
    Parameters:
        question_set_id (str): The unique identifier of the question set to retrieve
    
    Returns:
        Dict[str, Any]: Response containing the complete question set or error message
    """
    
    try:
        import boto3
        from botocore.exceptions import ClientError
        from src.utils import question_set_table, S3_BUCKET
        
        # Validate input
        if not question_set_id or not question_set_id.strip():
            return {
                'statusCode': 400,
                'body': {'error': 'Question set ID is required and cannot be empty'}
            }
        
        # First, get the question set metadata from DynamoDB
        try:
            response = question_set_table.get_item(
                Key={'uid': question_set_id}
            )
            
            if 'Item' not in response:
                return {
                    'statusCode': 404,
                    'body': {'error': 'Question set not found'}
                }
            
            metadata_item = response['Item']
            s3_key = metadata_item.get('s3Key')
            
        except ClientError as e:
            return {
                'statusCode': 500,
                'body': {'error': f'Failed to retrieve question set metadata: {str(e)}'}
            }

        # If no S3 key exists, return error
        if not s3_key:
            return {
                'statusCode': 404,
                'body': {'error': 'Question set data not found in S3'}
            }

        # Retrieve the full question set data from S3
        try:
            s3_client = boto3.client('s3')
            s3_response = s3_client.get_object(
                Bucket=S3_BUCKET,
                Key=s3_key
            )
            
            question_set_data = json.loads(s3_response['Body'].read().decode('utf-8'))
            
            # Add metadata fields to the response
            question_set_data['id'] = metadata_item.get('uid')
            question_set_data['totalQuestions'] = metadata_item.get('totalQuestions', 0)
            question_set_data['completions'] = metadata_item.get('completions', 0)
            question_set_data['createdAt'] = metadata_item.get('createdAt', 0)
            question_set_data['status'] = metadata_item.get('status', 'draft')
            question_set_data['author'] = metadata_item.get('author', 'Admin')
            question_set_data['isTrial'] = metadata_item.get('isTrial', False)
            
            return {
                'statusCode': 200,
                'body': {
                    'questionSet': question_set_data
                }
            }
            
        except Exception as e:
            return {
                'statusCode': 500,
                'body': {'error': f'Failed to retrieve question set data from S3: {str(e)}'}
            }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'body': {'error': f'Unexpected error: {str(e)}'}
        }

#Create collection
def create_collection(collection_data: Dict[str, Any]) -> Dict[str, Any]:
    """
    Creates a new collection with metadata.
    
    Parameters:
        collection_data (dict): Collection data including:
            - name (str): Name of the collection
            - category (str): Category (Grammar, Reading, Listening, Writing)
            - questionType (str): Question type for this collection
            - exam (str): Exam type (HSG, HSGQG, HSGT)
            - description (str): Description of the collection
            - createdBy (str): Creator of the collection
            - pricing (str): Pricing type ('free' or 'paid')
            - price (int, optional): Price in VND if pricing is 'paid'
    
    Returns:
        Dict[str, Any]: Response containing created collection or error message
    """
    
    try:
        import time
        import boto3
        from src.utils import short_uuid, collection_table
        
        # Validate inputs (accept either 'exam' or 'exams')
        required_fields = ['name', 'category', 'questionType', 'description', 'createdBy', 'pricing']
        for field in required_fields:
            if field not in collection_data or not collection_data[field]:
                return {
                    'statusCode': 400,
                    'body': {'error': f'Missing required field: {field}'}
                }
        
        # Validate exam(s)
        exam_single = collection_data.get('exam')
        exams_multi = collection_data.get('exams')
        valid_exams = {'HSG', 'HSGQG', 'HSGT'}
        if exams_multi:
            if not isinstance(exams_multi, (list, set)) or not exams_multi:
                return {
                    'statusCode': 400,
                    'body': {'error': 'exams must be a non-empty list'}
                }
            normalized_exams = sorted({str(x).strip().upper() for x in exams_multi})
            if not set(normalized_exams).issubset(valid_exams):
                return {
                    'statusCode': 400,
                    'body': {'error': 'Exams must be subset of: HSG, HSGQG, HSGT'}
                }
            exam_primary = normalized_exams[0]
        else:
            if not exam_single or str(exam_single).strip().upper() not in valid_exams:
                return {
                    'statusCode': 400,
                    'body': {'error': 'Exam must be one of: HSG, HSGQG, HSGT'}
                }
            normalized_exams = [str(exam_single).strip().upper()]
            exam_primary = normalized_exams[0]
        
        # Validate pricing
        pricing = collection_data['pricing']
        if pricing not in ['free', 'paid']:
            return {
                'statusCode': 400,
                'body': {'error': 'Pricing must be either "free" or "paid"'}
            }
        
        # If paid, validate price
        price = 0
        if pricing == 'paid':
            price = collection_data.get('price', 0)
            if not isinstance(price, (int, float)) or price <= 0:
                return {
                    'statusCode': 400,
                    'body': {'error': 'Price must be a positive number for paid collections'}
                }
            price = int(price)  # Ensure price is integer (VND)
        
        # Generate unique ID and timestamp
        collection_id = short_uuid()
        created_at = int(time.time())
        
        # Determine status (default to 'active' if not provided)
        status = collection_data.get('status', 'active')
        if status not in ['active', 'draft']:
            return {
                'statusCode': 400,
                'body': {'error': 'Status must be either "active" or "draft"'}
            }

        # Build collection item
        collection_item = {
            'uid': collection_id,
            'name': collection_data['name'],
            'category': collection_data['category'],
            'questionType': collection_data['questionType'],
            'exam': exam_primary,           # keep single exam for backward compatibility
            'exams': normalized_exams,      # new: support multiple exams
            'description': collection_data['description'],
            'createdBy': collection_data['createdBy'],
            'pricing': pricing,
            'price': price,
            'studyTime': collection_data.get('studyTime', 1),  # Default to 1 hour
            'createdAt': created_at,
            'updatedAt': created_at,
            'questionSets': [],  # Initialize as empty list
            'questionSetCount': 0,
            'status': status
        }
        
        # Save to DynamoDB
        collection_table.put_item(Item=collection_item)
        
        return {
            'statusCode': 200,
            'body': {
                'message': 'Collection created successfully',
                'collectionId': collection_id,
                'collection': collection_item
            }
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'body': {'error': f'Failed to create collection: {str(e)}'}
        }

#Get all collections
def get_collections() -> Dict[str, Any]:
    """
    Retrieves all collections from DynamoDB.
    
    Returns:
        Dict[str, Any]: Response containing list of collections or error message
    """
    
    try:
        import boto3
        from botocore.exceptions import ClientError
        from src.utils import collection_table, convert_sets_to_lists
        
        # Scan the table to get all collections
        try:
            response = collection_table.scan()
            items = response.get('Items', [])
            
            # Convert DynamoDB sets to lists for JSON serialization
            items = convert_sets_to_lists(items)
            
            # Format the response
            formatted_items = []
            for item in items:
                formatted_item = {
                    'id': item.get('uid'),
                    'name': item.get('name', ''),
                    'category': item.get('category', ''),
                    'questionType': item.get('questionType', ''),
                    'exam': item.get('exam', ''),
                    'exams': item.get('exams', [item.get('exam', '')] if item.get('exam') else []),
                    'description': item.get('description', ''),
                    'createdBy': item.get('createdBy', 'Admin'),
                    'pricing': item.get('pricing', 'free'),
                    'price': item.get('price', 0),
                    'studyTime': item.get('studyTime', 1),
                    'createdAt': item.get('createdAt', 0),
                    'questionSets': item.get('questionSets', []),
                    'questionSetCount': len(item.get('questionSets', [])),
                    'status': item.get('status', 'active')
                }
                formatted_items.append(formatted_item)
            
            # Sort by creation date (newest first)
            formatted_items.sort(key=lambda x: x.get('createdAt', 0), reverse=True)
            
            return {
                'statusCode': 200,
                'body': {
                    'collections': formatted_items,
                    'total': len(formatted_items)
                }
            }
            
        except ClientError as e:
            return {
                'statusCode': 500,
                'body': {'error': f'Failed to retrieve collections: {str(e)}'}
            }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'body': {'error': f'Unexpected error: {str(e)}'}
        }

#Get question sets by collection ID
def get_question_sets_by_collection(collection_id: str) -> Dict[str, Any]:
    """
    Retrieve all question sets that belong to a specific collection.
    
    Parameters:
        collection_id (str): The unique idntifier of the collection
        
    Returns:
        Dict[str, Any]: Response containing list of question sets or error message
    """
    
    try:
        from src.utils import question_set_table, collection_table
        import boto3
        from botocore.exceptions import ClientError
        
        # Validate collection ID
        if not collection_id or not collection_id.strip():
            return {
                'statusCode': 400,
                'body': {'error': 'Collection ID is required and cannot be empty'}
            }
        
        # Get the collection to retrieve its questionSets list
        try:
            collection_response = collection_table.get_item(
                Key={'uid': collection_id}
            )
            
            if 'Item' not in collection_response:
                return {
                    'statusCode': 404,
                    'body': {'error': 'Collection not found'}
                }
                
            collection = collection_response['Item']
            question_set_ids = collection.get('questionSets', [])
            
            if not question_set_ids:
                return {
                    'statusCode': 200,
                    'body': {
                        'questionSets': [],
                        'total': 0,
                        'message': 'No question sets found in this collection'
                    }
                }
                
        except ClientError as e:
            return {
                'statusCode': 500,
                'body': {'error': f'Failed to get collection: {str(e)}'}
            }
        
        # Get question sets by their IDs
        try:
            question_sets = []
            
            # Batch get items for better performance
            for question_set_id in question_set_ids:
                try:
                    response = question_set_table.get_item(
                        Key={'uid': question_set_id}
                    )
                    
                    if 'Item' in response:
                        question_sets.append(response['Item'])
                        
                except ClientError as e:
                    print(f"Error getting question set {question_set_id}: {str(e)}")
                    continue
            
            # Format the response
            formatted_items = []
            for item in question_sets:
                formatted_item = {
                    'id': item.get('uid'),
                    'title': item.get('title', ''),
                    'category': item.get('category', ''),
                    'questionType': item.get('questionType', ''),
                    'exam': item.get('exam', ''),
                    'difficulty': item.get('difficulty', 'Medium'),
                    'totalQuestions': item.get('totalQuestions', 0),
                    'completions': item.get('completions', 0),
                    'author': item.get('author', 'Admin'),
                    'createdAt': item.get('createdAt', 0),
                    'status': item.get('status', 'draft'),
                    'description': item.get('description', ''),
                    'timeLimit': item.get('timeLimit', 0),
                    'isTrial': item.get('isTrial', False),
                    's3Key': item.get('s3Key', '')
                }
                formatted_items.append(formatted_item)
            
            return {
                'statusCode': 200,
                'body': {
                    'questionSets': formatted_items,
                    'total': len(formatted_items),
                    'message': 'Question sets retrieved successfully'
                }
            }
            
        except Exception as e:
            return {
                'statusCode': 500,
                'body': {'error': f'Failed to retrieve question sets: {str(e)}'}
            }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'body': {'error': f'Failed to get question sets by collection: {str(e)}'}
        }

#Delete collection by ID  
def delete_collection(collection_id: str) -> Dict[str, Any]:
    """
    Delete a collection by its unique identifier.
    
    Parameters:
        collection_id (str): The unique identifier of the collection to delete
        
    Returns:
        Dict[str, Any]: Response containing deletion result or error message
    """
    
    try:
        from src.utils import collection_table
        import boto3
        from botocore.exceptions import ClientError
        
        # Validate collection ID
        if not collection_id or not collection_id.strip():
            return {
                'statusCode': 400,
                'body': {'error': 'Collection ID is required and cannot be empty'}
            }
        
        # Check if collection exists before deletion
        try:
            existing_response = collection_table.get_item(
                Key={'uid': collection_id}
            )
            
            if 'Item' not in existing_response:
                return {
                    'statusCode': 404,
                    'body': {'error': 'Collection not found'}
                }
                
        except ClientError as e:
            return {
                'statusCode': 500,
                'body': {'error': f'Failed to check collection existence: {str(e)}'}
            }
        
        # Delete the collection
        try:
            collection_table.delete_item(
                Key={'uid': collection_id}
            )
            
            return {
                'statusCode': 200,
                'body': {
                    'message': 'Collection deleted successfully',
                    'collectionId': collection_id
                }
            }
            
        except ClientError as e:
            return {
                'statusCode': 500,
                'body': {'error': f'Failed to delete collection: {str(e)}'}
            }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'body': {'error': f'Failed to delete collection: {str(e)}'}
        }

#Update collection
def update_collection(collection_id: str, collection_data: Dict[str, Any]) -> Dict[str, Any]:
    """
    Updates an existing collection with new metadata.
    
    Parameters:
        collection_id (str): The unique identifier of the collection to update
        collection_data (dict): Collection data including:
            - name (str): Name of the collection
            - category (str): Category (Grammar, Reading, Listening, Writing)
            - questionType (str): Question type for this collection
            - exam (str): Exam type (HSG, HSGQG, HSGT)
            - description (str): Description of the collection
            - pricing (str): Pricing type ('free' or 'paid')
            - price (int, optional): Price in VND if pricing is 'paid'
    
    Returns:
        Dict[str, Any]: Response containing updated collection or error message
    """
    
    try:
        import time
        import boto3
        from botocore.exceptions import ClientError
        from src.utils import collection_table
        
        # Validate collection ID
        if not collection_id or not collection_id.strip():
            return {
                'statusCode': 400,
                'body': {'error': 'Collection ID is required and cannot be empty'}
            }
        
        # Validate inputs (status is optional for updates). Accept either 'exam' or 'exams'.
        required_fields = ['name', 'category', 'questionType', 'description', 'pricing']
        for field in required_fields:
            if field not in collection_data or not collection_data[field]:
                return {
                    'statusCode': 400,
                    'body': {'error': f'Missing required field: {field}'}
                }
        
        # Validate status if provided
        if 'status' in collection_data:
            if collection_data['status'] not in ['active', 'draft']:
                return {
                    'statusCode': 400,
                    'body': {'error': 'Status must be either "active" or "draft"'}
                }
        
        # Validate exam(s)
        exam_single = collection_data.get('exam')
        exams_multi = collection_data.get('exams')
        valid_exams = {'HSG', 'HSGQG', 'HSGT'}
        if exams_multi:
            if not isinstance(exams_multi, (list, set)) or not exams_multi:
                return {
                    'statusCode': 400,
                    'body': {'error': 'exams must be a non-empty list'}
                }
            normalized_exams = sorted({str(x).strip().upper() for x in exams_multi})
            if not set(normalized_exams).issubset(valid_exams):
                return {
                    'statusCode': 400,
                    'body': {'error': 'Exams must be subset of: HSG, HSGQG, HSGT'}
                }
            exam_primary = normalized_exams[0]
        else:
            if not exam_single or str(exam_single).strip().upper() not in valid_exams:
                return {
                    'statusCode': 400,
                    'body': {'error': 'Exam must be one of: HSG, HSGQG, HSGT'}
                }
            normalized_exams = [str(exam_single).strip().upper()]
            exam_primary = normalized_exams[0]
        
        # Validate pricing
        pricing = collection_data['pricing']
        if pricing not in ['free', 'paid']:
            return {
                'statusCode': 400,
                'body': {'error': 'Pricing must be either "free" or "paid"'}
            }
        
        # If paid, validate price
        price = 0
        if pricing == 'paid':
            price = collection_data.get('price', 0)
            if not isinstance(price, (int, float)) or price <= 0:
                return {
                    'statusCode': 400,
                    'body': {'error': 'Price must be a positive number for paid collections'}
                }
            price = int(price)  # Ensure price is integer (VND)
        
        # Check if collection exists
        try:
            existing_response = collection_table.get_item(
                Key={'uid': collection_id}
            )
            
            if 'Item' not in existing_response:
                return {
                    'statusCode': 404,
                    'body': {'error': 'Collection not found'}
                }
                
        except ClientError as e:
            return {
                'statusCode': 500,
                'body': {'error': f'Failed to check collection existence: {str(e)}'}
            }
        
        # Update the collection
        try:
            updated_at = int(time.time())
            
            update_expression = """
                SET 
                    #name = :name,
                    category = :category,
                    questionType = :questionType,
                    exam = :exam,
                    exams = :exams,
                    description = :description,
                    pricing = :pricing,
                    price = :price,
                    studyTime = :studyTime,
                    updatedAt = :updatedAt
            """
            
            expression_values = {
                ':name': collection_data['name'],
                ':category': collection_data['category'],
                ':questionType': collection_data['questionType'],
                ':exam': exam_primary,
                ':exams': normalized_exams,
                ':description': collection_data['description'],
                ':pricing': pricing,
                ':price': price,
                ':studyTime': collection_data.get('studyTime', 1),
                ':updatedAt': updated_at
            }
            
            expression_names = {
                '#name': 'name'  # 'name' is a reserved keyword
            }
            
            # Add status if provided
            if 'status' in collection_data:
                update_expression += ", #status = :status"
                expression_values[':status'] = collection_data['status']
                expression_names['#status'] = 'status'
            
            response = collection_table.update_item(
                Key={'uid': collection_id},
                UpdateExpression=update_expression,
                ExpressionAttributeValues=expression_values,
                ExpressionAttributeNames=expression_names,
                ReturnValues='ALL_NEW'
            )
            
            updated_item = response['Attributes']
            
            # Format response to match frontend expectations
            formatted_item = {
                'id': updated_item.get('uid'),
                'name': updated_item.get('name', ''),
                'category': updated_item.get('category', ''),
                'questionType': updated_item.get('questionType', ''),
                'exam': updated_item.get('exam', ''),
                'exams': updated_item.get('exams', [updated_item.get('exam', '')] if updated_item.get('exam') else []),
                'description': updated_item.get('description', ''),
                'createdBy': updated_item.get('createdBy', 'Admin'),
                'pricing': updated_item.get('pricing', 'free'),
                'price': updated_item.get('price', 0),
                'studyTime': updated_item.get('studyTime', 1),
                'createdAt': updated_item.get('createdAt', 0),
                'questionSets': updated_item.get('questionSets', []),
                'questionSetCount': len(updated_item.get('questionSets', [])),
                'status': updated_item.get('status', 'active'),
                'updatedAt': updated_at
            }
            
            return {
                'statusCode': 200,
                'body': {
                    'message': 'Collection updated successfully',
                    'collection': formatted_item
                }
            }
            
        except ClientError as e:
            return {
                'statusCode': 500,
                'body': {'error': f'Failed to update collection: {str(e)}'}
            }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'body': {'error': f'Failed to update collection: {str(e)}'}
        }

#Update collection status only
def update_collection_status(collection_id: str, status: str) -> Dict[str, Any]:
    """
    Updates only the status of an existing collection in DynamoDB.
    
    Parameters:
        collection_id (str): The unique identifier of the collection to update
        status (str): The new status (active, draft)
    
    Returns:
        Dict[str, Any]: Response containing success message or error
    """
    
    try:
        import time
        from botocore.exceptions import ClientError
        from src.utils import collection_table
        
        # Validate inputs
        if not collection_id or not collection_id.strip():
            return {
                'statusCode': 400,
                'body': {'error': 'Collection ID is required and cannot be empty'}
            }
        
        if not status or status not in ['active', 'draft']:
            return {
                'statusCode': 400,
                'body': {'error': 'Status must be either "active" or "draft"'}
            }
        
        # First, check if the collection exists in DynamoDB
        try:
            existing_item_response = collection_table.get_item(
                Key={'uid': collection_id}
            )
            
            if 'Item' not in existing_item_response:
                return {
                    'statusCode': 404,
                    'body': {'error': 'Collection not found'}
                }
            
        except ClientError as e:
            return {
                'statusCode': 500,
                'body': {'error': f'Failed to retrieve collection: {str(e)}'}
            }

        # Update only the status in DynamoDB
        try:
            updated_at = int(time.time())
            
            update_params = {
                'Key': {'uid': collection_id},
                'UpdateExpression': 'SET #status = :status, updatedAt = :updatedAt',
                'ExpressionAttributeNames': {
                    '#status': 'status'
                },
                'ExpressionAttributeValues': {
                    ':status': status,
                    ':updatedAt': updated_at
                },
                'ReturnValues': 'ALL_NEW'
            }
            
            response = collection_table.update_item(**update_params)
            updated_item = response.get('Attributes', {})
            
        except ClientError as e:
            return {
                'statusCode': 500,
                'body': {'error': f'Failed to update status: {str(e)}'}
            }

        return {
            'statusCode': 200,
            'body': {
                'message': 'Collection status updated successfully',
                'collectionId': collection_id,
                'status': status,
                'collection': updated_item
            }
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'body': {'error': f'Unexpected error: {str(e)}'}
        }

#Add question set to collection
def add_question_set_to_collection(collection_id: str, question_set_id: str) -> Dict[str, Any]:
    """
    Add a question set to a collection's questionSets list.
    
    Parameters:
        collection_id (str): The unique identifier of the collection
        question_set_id (str): The unique identifier of the question set to add
        
    Returns:
        Dict[str, Any]: Response containing operation result or error message
    """
    
    try:
        from src.utils import collection_table, question_set_table
        import boto3
        from botocore.exceptions import ClientError
        
        # Validate inputs
        if not collection_id or not collection_id.strip():
            return {
                'statusCode': 400,
                'body': {'error': 'Collection ID is required and cannot be empty'}
            }
            
        if not question_set_id or not question_set_id.strip():
            return {
                'statusCode': 400,
                'body': {'error': 'Question set ID is required and cannot be empty'}
            }
        
        # Check if question set exists
        try:
            qs_response = question_set_table.get_item(
                Key={'uid': question_set_id}
            )
            
            if 'Item' not in qs_response:
                return {
                    'statusCode': 404,
                    'body': {'error': 'Question set not found'}
                }
                
        except ClientError as e:
            return {
                'statusCode': 500,
                'body': {'error': f'Failed to check question set existence: {str(e)}'}
            }
        
        # Add question set to collection
        try:
            import time
            updated_at = int(time.time())
            
            # First check if the collection exists and get its current questionSets
            collection_response = collection_table.get_item(
                Key={'uid': collection_id}
            )
            
            if 'Item' not in collection_response:
                return {
                    'statusCode': 404,
                    'body': {'error': 'Collection not found'}
                }
            
            collection = collection_response['Item']
            current_question_sets = collection.get('questionSets', [])
            
            # Check if question set is already in the collection
            if question_set_id in current_question_sets:
                return {
                    'statusCode': 400,
                    'body': {'error': 'Question set is already in this collection'}
                }
            
            # Use SET operation with list_append to add to the list
            collection_table.update_item(
                Key={'uid': collection_id},
                UpdateExpression="SET questionSets = list_append(if_not_exists(questionSets, :empty_list), :new_item), updatedAt = :updated_at",
                ExpressionAttributeValues={
                    ':new_item': [question_set_id],
                    ':empty_list': [],
                    ':updated_at': updated_at
                },
                ReturnValues='NONE'
            )
            
            return {
                'statusCode': 200,
                'body': {
                    'message': 'Question set added to collection successfully',
                    'collectionId': collection_id,
                    'questionSetId': question_set_id
                }
            }
            
        except ClientError as e:
            return {
                'statusCode': 500,
                'body': {'error': f'Failed to add question set to collection: {str(e)}'}
            }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'body': {'error': f'Failed to add question set to collection: {str(e)}'}
        }

#Remove question set from collection
def remove_question_set_from_collection(collection_id: str, question_set_id: str) -> Dict[str, Any]:
    """
    Remove a question set from a collection's questionSets list.
    
    Parameters:
        collection_id (str): The unique identifier of the collection
        question_set_id (str): The unique identifier of the question set to remove
        
    Returns:
        Dict[str, Any]: Response containing operation result or error message
    """
    
    try:
        from src.utils import collection_table
        import boto3
        from botocore.exceptions import ClientError
        
        # Validate inputs
        if not collection_id or not collection_id.strip():
            return {
                'statusCode': 400,
                'body': {'error': 'Collection ID is required and cannot be empty'}
            }
            
        if not question_set_id or not question_set_id.strip():
            return {
                'statusCode': 400,
                'body': {'error': 'Question set ID is required and cannot be empty'}
            }
        
        # Remove question set from collection
        try:
            import time
            updated_at = int(time.time())
            
            # First get the collection to check its current questionSets
            collection_response = collection_table.get_item(
                Key={'uid': collection_id}
            )
            
            if 'Item' not in collection_response:
                return {
                    'statusCode': 404,
                    'body': {'error': 'Collection not found'}
                }
            
            collection = collection_response['Item']
            current_question_sets = collection.get('questionSets', [])
            
            # Check if question set exists in the collection
            if question_set_id not in current_question_sets:
                return {
                    'statusCode': 400,
                    'body': {'error': 'Question set is not in this collection'}
                }
            
            # Remove the question set from the list
            updated_question_sets = [qs for qs in current_question_sets if qs != question_set_id]
            
            # Update the collection with the new list
            collection_table.update_item(
                Key={'uid': collection_id},
                UpdateExpression="SET questionSets = :updated_list, updatedAt = :updated_at",
                ExpressionAttributeValues={
                    ':updated_list': updated_question_sets,
                    ':updated_at': updated_at
                },
                ReturnValues='NONE'
            )
            
            return {
                'statusCode': 200,
                'body': {
                    'message': 'Question set removed from collection successfully',
                    'collectionId': collection_id,
                    'questionSetId': question_set_id
                }
            }
            
        except ClientError as e:
            return {
                'statusCode': 500,
                'body': {'error': f'Failed to remove question set from collection: {str(e)}'}
            }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'body': {'error': f'Failed to remove question set from collection: {str(e)}'}
        }

def cleanup_orphaned_question_sets(collection_id):
    """
    Clean up orphaned question sets from a collection.
    Removes question set IDs from collection that no longer exist in the question sets table.
    """
    try:
        from src.utils import collection_table, question_set_table
        import boto3
        from botocore.exceptions import ClientError
        import time
        
        # Get the collection
        collection_response = collection_table.get_item(Key={'uid': collection_id})
        
        if 'Item' not in collection_response:
            return {
                'statusCode': 404,
                'body': {'error': 'Collection not found'}
            }
        
        collection = collection_response['Item']
        current_question_sets = collection.get('questionSets', [])
        
        if not current_question_sets:
            return {
                'statusCode': 200,
                'body': {
                    'message': 'No question sets to clean up',
                    'collectionId': collection_id,
                    'cleanedCount': 0,
                    'remainingCount': 0
                }
            }
        
        # Check which question sets still exist
        valid_question_sets = []
        orphaned_count = 0
        
        for question_set_id in current_question_sets:
            try:
                # Check if question set exists
                question_response = question_set_table.get_item(Key={'uid': question_set_id})
                
                if 'Item' in question_response:
                    # Question set exists, keep it
                    valid_question_sets.append(question_set_id)
                else:
                    # Question set doesn't exist, it's orphaned
                    orphaned_count += 1
                    
            except ClientError as e:
                # If error checking question set, assume it's orphaned
                orphaned_count += 1
                continue
        
        # Update the collection with the cleaned list
        if orphaned_count > 0:
            updated_at = int(time.time())
            
            collection_table.update_item(
                Key={'uid': collection_id},
                UpdateExpression='SET questionSets = :updated_list, updatedAt = :updated_at',
                ExpressionAttributeValues={
                    ':updated_list': valid_question_sets,
                    ':updated_at': updated_at
                },
                ReturnValues='NONE'
            )
        
        return {
            'statusCode': 200,
            'body': {
                'message': f'Cleaned up {orphaned_count} orphaned question sets',
                'collectionId': collection_id,
                'cleanedCount': orphaned_count,
                'remainingCount': len(valid_question_sets),
                'validQuestionSets': valid_question_sets
            }
        }
        
    except ClientError as e:
        return {
            'statusCode': 500,
            'body': {'error': f'Failed to cleanup orphaned question sets: {str(e)}'}
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'body': {'error': f'Failed to cleanup orphaned question sets: {str(e)}'}
        }

# Get collection counts by category
def get_collection_counts(exam_filter: str = None, status_filter: str = 'active') -> Dict[str, Any]:
    """
    Get collection counts grouped by category.
    
    Parameters:
        exam_filter (str, optional): Filter by exam type (HSG, HSGQG, HSGT)
        status_filter (str): Filter by status (active, draft). Defaults to 'active'
        
    Returns:
        Dict[str, Any]: Response containing counts for each category
    """
    
    try:
        from src.utils import collection_table, convert_sets_to_lists
        from botocore.exceptions import ClientError
        
        # Scan the collection table
        try:
            response = collection_table.scan()
            items = response.get('Items', [])
            
            # Convert DynamoDB sets to lists
            items = convert_sets_to_lists(items)
            
            # Filter collections
            filtered_items = []
            for item in items:
                # Apply status filter (case-insensitive, trimmed)
                item_status = str(item.get('status', 'active')).strip().lower()
                if status_filter and item_status != status_filter.strip().lower():
                    continue
                    
                # Apply exam filter (case-insensitive, trimmed) against multi-exams
                if exam_filter:
                    raw_exams = item.get('exams')
                    exams = raw_exams if isinstance(raw_exams, (list, set)) else [item.get('exam', '')]
                    normalized = {str(x).strip().upper() for x in exams}
                    if exam_filter.strip().upper() not in normalized:
                        continue
                    
                filtered_items.append(item)
            
            # Count by category
            counts = {
                'Grammar': 0,
                'Reading': 0,
                'Listening': 0,
                'Writing': 0
            }
            
            for item in filtered_items:
                category = str(item.get('category', '')).strip().capitalize()
                if category in counts:
                    counts[category] += 1
            
            return {
                'statusCode': 200,
                'body': {
                    'counts': counts,
                    'total': sum(counts.values()),
                    'examFilter': exam_filter,
                    'statusFilter': status_filter
                }
            }
            
        except ClientError as e:
            return {
                'statusCode': 500,
                'body': {'error': f'Failed to retrieve collection counts: {str(e)}'}
            }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'body': {'error': f'Unexpected error: {str(e)}'}
        }

# Get collections filtered by category and type
def get_collections_by_category_and_type(category: str, question_type: str, exam_filter: str = None, status_filter: str = 'active') -> Dict[str, Any]:
    """
    Get collections filtered by category and question type.
    
    Parameters:
        category (str): Category to filter by (Grammar, Reading, Listening, Writing)
        question_type (str): Question type to filter by (multiple-choice, word-formation, etc.)
        exam_filter (str, optional): Filter by exam type (HSG, HSGQG, HSGT)
        status_filter (str): Filter by status (active, draft). Defaults to 'active'
        
    Returns:
        Dict[str, Any]: Response containing list of filtered collections
    """
    
    try:
        from src.utils import collection_table, convert_sets_to_lists, question_set_table
        from botocore.exceptions import ClientError
        
        # Scan the collection table
        try:
            response = collection_table.scan()
            items = response.get('Items', [])
            
            # Convert DynamoDB sets to lists
            items = convert_sets_to_lists(items)
            
            # Filter collections
            filtered_items = []
            for item in items:
                # Apply category filter
                if item.get('category', '').lower() != category.lower():
                    continue
                    
                # Apply question type filter
                if item.get('questionType', '').lower() != question_type.lower():
                    continue
                    
                # Apply status filter
                if status_filter and str(item.get('status', 'active')).strip().lower() != status_filter.strip().lower():
                    continue
                    
                # Apply exam filter (case-insensitive, trimmed) against multi-exams
                if exam_filter:
                    raw_exams = item.get('exams')
                    exams = raw_exams if isinstance(raw_exams, (list, set)) else [item.get('exam', '')]
                    normalized = {str(x).strip().upper() for x in exams}
                    if exam_filter.strip().upper() not in normalized:
                        continue
                    
                filtered_items.append(item)
            
            # Format the response and calculate additional fields
            formatted_items = []
            for item in filtered_items:
                question_sets = item.get('questionSets', [])
                
                # Calculate average difficulty, time limit, and total questions
                avg_difficulty = "Easy"  # Default
                avg_time_limit = 0
                total_questions = 0
                
                if question_sets:
                    # Get details of question sets in this collection
                    difficulty_counts = {'Easy': 0, 'Medium': 0, 'Hard': 0}
                    time_limits = []
                    
                    for qs_id in question_sets:
                        try:
                            qs_response = question_set_table.get_item(Key={'uid': qs_id})
                            if 'Item' in qs_response:
                                qs_item = qs_response['Item']
                                
                                # Count difficulty
                                difficulty = qs_item.get('difficulty', 'Easy')
                                if difficulty in difficulty_counts:
                                    difficulty_counts[difficulty] += 1
                                
                                # Collect time limits
                                time_limit = qs_item.get('timeLimit', 0)
                                if time_limit:
                                    time_limits.append(time_limit)
                                
                                # Sum total questions (count answer mappings)
                                total_questions += _calculate_total_answer_mappings(qs_item.get('questions', []))
                                
                        except Exception:
                            continue  # Skip if question set not found
                    
                    # Calculate average difficulty (most common)
                    if difficulty_counts:
                        avg_difficulty = max(difficulty_counts, key=difficulty_counts.get)
                    
                    # Calculate average time limit
                    if time_limits:
                        avg_time_limit = sum(time_limits) // len(time_limits)
                
                formatted_item = {
                    'id': item.get('uid'),
                    'name': item.get('name', ''),
                    'category': item.get('category', ''),
                    'questionType': item.get('questionType', ''),
                    'exam': item.get('exam', ''),
                    'exams': item.get('exams', [item.get('exam', '')] if item.get('exam') else []),
                    'description': item.get('description', ''),
                    'createdBy': item.get('createdBy', 'Admin'),
                    'pricing': item.get('pricing', 'free'),
                    'price': item.get('price', 0),
                    'createdAt': item.get('createdAt', 0),
                    'questionSetCount': len(question_sets),
                    'status': item.get('status', 'active'),
                    'avgDifficulty': avg_difficulty,
                    'totalQuestions': total_questions,
                    'avgTimeLimit': avg_time_limit
                }
                formatted_items.append(formatted_item)
            
            # Sort by creation date (newest first)
            formatted_items.sort(key=lambda x: x.get('createdAt', 0), reverse=True)
            
            return {
                'statusCode': 200,
                'body': {
                    'collections': formatted_items,
                    'total': len(formatted_items),
                    'category': category,
                    'questionType': question_type,
                    'examFilter': exam_filter,
                    'statusFilter': status_filter
                }
            }
            
        except ClientError as e:
            return {
                'statusCode': 500,
                'body': {'error': f'Failed to retrieve collections: {str(e)}'}
            }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'body': {'error': f'Unexpected error: {str(e)}'}
        }

# Get collection by ID with question sets
def get_collection_by_id(collection_id: str) -> Dict[str, Any]:
    """
    Get a specific collection by ID with its question sets.
    
    Parameters:
        collection_id (str): The unique identifier of the collection
        
    Returns:
        Dict[str, Any]: Response containing collection with question sets
    """
    
    try:
        from src.utils import collection_table, question_set_table, convert_sets_to_lists
        from botocore.exceptions import ClientError
        
        if not collection_id:
            return {
                'statusCode': 400,
                'body': {'error': 'Collection ID is required'}
            }
        
        try:
            # Get the collection
            collection_response = collection_table.get_item(Key={'uid': collection_id})
            
            if 'Item' not in collection_response:
                return {
                    'statusCode': 404,
                    'body': {'error': 'Collection not found'}
                }
            
            collection_item = convert_sets_to_lists(collection_response['Item'])
            question_set_ids = collection_item.get('questionSets', [])
            
            # Get all question sets in this collection
            question_sets = []
            for qs_id in question_set_ids:
                try:
                    qs_response = question_set_table.get_item(Key={'uid': qs_id})
                    if 'Item' in qs_response:
                        qs_item = convert_sets_to_lists(qs_response['Item'])
                        
                        # Format question set
                        formatted_qs = {
                            'id': qs_item.get('uid'),
                            'title': qs_item.get('title', ''),
                            'category': qs_item.get('category', ''),
                            'difficulty': qs_item.get('difficulty', 'Easy'),
                            # Prefer stored totalQuestions metadata, fallback to counting answer mappings
                            'totalQuestions': qs_item.get('totalQuestions', _calculate_total_answer_mappings(qs_item.get('questions', []))),
                            'completions': qs_item.get('completions', 0),
                            'createdAt': qs_item.get('createdAt', 0),
                            'status': qs_item.get('status', 'draft'),
                            'author': qs_item.get('author', 'Admin'),
                            'exam': qs_item.get('exam', ''),
                            'questionType': qs_item.get('questionType', ''),
                            'timeLimit': qs_item.get('timeLimit', 0),
                            'description': qs_item.get('description', ''),
                            'isTrial': qs_item.get('isTrial', False),
                            's3Key': qs_item.get('s3Key', '')
                        }
                        question_sets.append(formatted_qs)
                        
                except Exception:
                    continue  # Skip if question set not found
            
            # Sort question sets by creation date (newest first)
            question_sets.sort(key=lambda x: x.get('createdAt', 0), reverse=True)
            
            # Format the collection
            formatted_collection = {
                'id': collection_item.get('uid'),
                'name': collection_item.get('name', ''),
                'category': collection_item.get('category', ''),
                'questionType': collection_item.get('questionType', ''),
                'exam': collection_item.get('exam', ''),
                'exams': collection_item.get('exams', [collection_item.get('exam', '')] if collection_item.get('exam') else []),
                'description': collection_item.get('description', ''),
                'createdBy': collection_item.get('createdBy', 'Admin'),
                'pricing': collection_item.get('pricing', 'free'),
                'price': collection_item.get('price', 0),
                'studyTime': collection_item.get('studyTime', 1),
                'createdAt': collection_item.get('createdAt', 0),
                'questionSetCount': len(question_sets),
                'status': collection_item.get('status', 'active'),
                'questionSets': question_sets
            }
            
            return {
                'statusCode': 200,
                'body': {
                    'collection': formatted_collection
                }
            }
        except ClientError as e:
            return {
                'statusCode': 500,
                'body': {'error': f'Failed to retrieve collection: {str(e)}'}
            }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'body': {'error': f'Unexpected error: {str(e)}'}
        }

# Suggest collection metadata using AI
def suggest_collection_meta(collection_id: str, max_titles: int = 30):
    """
    Generate collection title & description based on up to 30 question set titles in the collection.
    Params:
        collection_id (str): collection UID
        max_titles (int): max number of titles to use
    Returns dict: { title: str, description: str }
    """
    try:
        from src.utils import collection_table, question_set_table, convert_sets_to_lists
        from botocore.exceptions import ClientError
        import src.aiService as ai

        # validate
        if not collection_id:
            return {
                'statusCode': 400,
                'body': {'error': 'Collection ID required'}
            }

        # get collection
        col_resp = collection_table.get_item(Key={'uid': collection_id})
        if 'Item' not in col_resp:
            return {
                'statusCode': 404,
                'body': {'error': 'Collection not found'}
            }
        collection = convert_sets_to_lists(col_resp['Item'])
        qs_ids = collection.get('questionSets', [])[:max_titles]
        titles = []
        for qs_id in qs_ids:
            try:
                qs_resp = question_set_table.get_item(Key={'uid': qs_id})
                if 'Item' in qs_resp:
                    titles.append(qs_resp['Item'].get('title', ''))
            except Exception:
                continue

        if not titles:
            return {
                'statusCode': 400,
                'body': {'error': 'No question set titles found to generate suggestion.'}
            }

        # Build prompt for AI
        prompt = (
            "Bạn nhận danh sách tiêu đề đề thi dưới đây. Hãy gợi ý TIÊU ĐỀ BỘ ĐỀ CHUYÊN NGHIỆP (tối đa 6 từ, tránh dùng các từ sáo rỗng như 'Tuyệt đỉnh', 'Cực hay', 'Ultimate') và MÔ TẢ NGẮN (tối đa 30 từ, ngữ điệu hấp dẫn, nêu điểm nổi bật, không lặp lại tiêu đề).\n" +
            "Danh sách tiêu đề:\n- " + "\n- ".join(titles)
        )
        system_prompt = "Bạn là copywriter giáo dục. Trả về JSON {\"title\":string, \"description\":string}"
        json_schema = {
            "type": "object",
            "properties": {
                "title": {"type": "string"},
                "description": {"type": "string"}
            },
            "required": ["title", "description"]
        }
        ai_response = ai.call_generate_content(system_prompt, prompt, jsonRule=json_schema, auto_pair_json=True)

        if isinstance(ai_response, dict) and 'title' in ai_response:
            return {
                'statusCode': 200,
                'body': ai_response
            }
        else:
            # fallback simple heuristic
            fallback_title = f"Bộ đề {collection.get('category', '')} tổng hợp"
            fallback_desc = f"Bộ đề gồm {len(qs_ids)} đề luyện tập chất lượng."
            return {
                'statusCode': 200,
                'body': {
                    'title': fallback_title,
                    'description': fallback_desc
                }
            }

    except Exception as e:
        return {
            'statusCode': 500,
            'body': {'error': f'Failed to generate suggestion: {str(e)}'}
        }
