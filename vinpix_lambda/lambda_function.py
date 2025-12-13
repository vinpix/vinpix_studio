import json
import src.aiService as ai
import src.tool as tool
import src.serverConfig as server
import src.sub as sub
import src.user as user
import src.telegram as telegram
import src.question_uploader as question_uploader
import src.discount as discount
import src.s3helper as s3helper
import src.vinpix_admin as vinpix_admin
import src.contract as contract
from src.utils import S3_BUCKET, get_s3_key
import uuid


def handle_request(func,params):

    if(params):
        if isinstance(params, str):
            params = json.loads(params)
        # Accept either userId (preferred in clients) or uid (server-enriched)
        uid = params.get('userId') or params.get('uid')
        tempToken = params.get('token')
        platform = params.get('platform')
        itemInfo = params.get('itemInfo')
        lang = params.get('language')
        image = params.get('base64Data')
        prompt = params.get('prompt')

    #server
    if(func == 'getServerConfig'):
        return server.getConfig()

    #ai
    if(func == 'chat'):
        content = ai.call_generate_content(
            params.get('systemPrompt'), 
            params.get('prompt'), 
            params.get('schema'), 
            params.get('autoPairJson', False),
            params.get('maxRetries', 1),
            params.get('model'),
            params.get('images')
        )
        return {
            'statusCode': 200,
            'body': content 
        }

    # Smart Chat
    if(func == 'createSmartChatSession'):
        from src import smart_chat
        return smart_chat.create_session(uid, params.get('title'), params.get('model'))
        
    if(func == 'getSmartChatSessions'):
        from src import smart_chat
        return smart_chat.get_sessions(uid, params.get('limit', 20), params.get('lastKey'))
        
    if(func == 'getSmartChatDetail'):
        from src import smart_chat
        return smart_chat.get_session_detail(uid, params.get('sessionId'))
        
    if(func == 'saveSmartChatState'):
        from src import smart_chat
        return smart_chat.save_session_state(
            uid, 
            params.get('sessionId'), 
            params.get('treeData'), 
            params.get('lastMessagePreview'),
            params.get('newTitle'),
            params.get('currentModel'),
            params.get('styleId'),
            params.get('thinkingSteps')
        )
        
    if(func == 'deleteSmartChatSession'):
        from src import smart_chat
        return smart_chat.delete_session(uid, params.get('sessionId'))
        
    if(func == 'updateSmartChatTitle'):
        from src import smart_chat
        return smart_chat.update_session_title(uid, params.get('sessionId'), params.get('title'))

    if(func == 'renameSmartChatSession'):
        from src import smart_chat
        return smart_chat.rename_chat_session(uid, params.get('sessionId'), params.get('newTitle'))
        
    if(func == 'createSmartChatFolder'):
        from src import smart_chat
        return smart_chat.create_folder(uid, params.get('title'))

    if(func == 'createMoodboard'):
        from src import smart_chat
        return smart_chat.create_moodboard(uid, params.get('title'))
        
    if(func == 'updateMoodboard'):
        from src import smart_chat
        return smart_chat.update_moodboard(
            uid, 
            params.get('sessionId'), 
            params.get('images'), 
            params.get('styleDescription'),
            params.get('title')
        )
        
    if(func == 'analyzeMoodboard'):
        from src import smart_chat
        return smart_chat.analyze_moodboard(uid, params.get('sessionId'))

    if(func == 'updateSmartChatSessionFolder'):
        from src import smart_chat
        return smart_chat.update_session_folder(uid, params.get('sessionId'), params.get('folderId'))

    if(func == 'deleteSmartChatFolder'):
        from src import smart_chat
        return smart_chat.delete_folder(uid, params.get('folderId'))

    if(func == 'uploadSmartChatImage'):
        try:
            import uuid
            base64_data = params.get('base64Data')
            session_id = params.get('sessionId')
            if not base64_data or not session_id:
                return { 'statusCode': 400, 'body': { 'error': 'Missing base64Data or sessionId' } }
            
            # Determine extension
            ext = 'jpg'
            if base64_data.startswith('data:'):
                 header = base64_data.split(',', 1)[0]
                 content_type = header.split(';')[0].split(':')[1]
                 if '/' in content_type:
                    ext = content_type.split('/')[1]
            
            # Generate key: smart_chat_uploads/{userId}/{sessionId}/{uuid}.{ext}
            key = get_s3_key(f"smart_chat_uploads/{uid}/{session_id}/{uuid.uuid4()}.{ext}")
            
            s3helper.upload_to_s3(base64_data, S3_BUCKET, key, is_json=False)
            
            # Return key instead of public URL (client will request presigned url using key)
            return { 
                'statusCode': 200, 
                'body': { 
                    'key': key,
                    'success': True
                } 
            }
        except Exception as e:
            return { 'statusCode': 500, 'body': { 'error': f'Failed to upload image: {str(e)}' } }

    if(func == 'deleteSmartChatImages'):
        try:
            keys = params.get('keys')
            if not keys:
                 return { 'statusCode': 400, 'body': { 'error': 'Missing keys' } }
            
            s3helper.delete_objects_from_s3(S3_BUCKET, keys)
            return {
                'statusCode': 200,
                'body': {
                    'success': True
                }
            }
        except Exception as e:
            return { 'statusCode': 500, 'body': { 'error': f'Failed to delete images: {str(e)}' } }

    if(func == 'generateImage'):
        try:
            import uuid
            prompt = params.get('prompt')
            session_id = params.get('sessionId')
            reference_image = params.get('referenceImage')
            aspect_ratio = params.get('aspectRatio', '1:1')
            resolution = params.get('resolution', '1K')
            model = params.get('model')
            
            if not prompt:
                return { 'statusCode': 400, 'body': { 'error': 'Missing prompt' } }
                
            # Call AI Service to generate image (Gemini first, then OpenAI fallback)
            # OpenAI fallback doesn't support reference image in this flow yet (unless variations)
            base64_image = ai.generate_imagen3(prompt, reference_image, aspect_ratio, resolution, model)
            if isinstance(base64_image, dict) and 'error' in base64_image:
                # Attempt OpenAI fallback if Gemini image generation is unavailable
                fallback_image = ai.generate_image_openai(prompt)
                if isinstance(fallback_image, dict) and 'error' in fallback_image:
                    return {
                        'statusCode': 500,
                        'body': {
                            'error': 'Failed to generate image',
                            'geminiError': base64_image,
                            'openaiError': fallback_image
                        }
                    }
                else:
                    base64_image = fallback_image
            
            # Compress to WebP
            try:
                from PIL import Image
                import io
                import base64
                
                # Decode base64
                img_data = base64_image
                if isinstance(img_data, str) and img_data.startswith('data:'):
                     img_data = img_data.split(',', 1)[1]
                
                image_bytes = base64.b64decode(img_data)
                img = Image.open(io.BytesIO(image_bytes))
                
                # Save as WebP
                output_buffer = io.BytesIO()
                img.save(output_buffer, format='WEBP', quality=90)
                webp_data = output_buffer.getvalue()
                
                # Re-encode to base64
                base64_image = base64.b64encode(webp_data).decode('utf-8')
                
                # Update key extension
                key = get_s3_key(f"smart_chat_uploads/{uid}/{session_id}/{uuid.uuid4()}.webp")
                
            except Exception as e:
                print(f"Compression failed, falling back to original: {e}")
                key = get_s3_key(f"smart_chat_uploads/{uid}/{session_id}/{uuid.uuid4()}.png")
            
            # Upload
            # Imagen usually returns raw base64 without data URI prefix, so we treat as raw
            res = s3helper.upload_to_s3(base64_image, S3_BUCKET, key, is_json=False)
            
            return {
                'statusCode': 200,
                'body': {
                    'key': key,
                    'success': True
                }
            }
        except Exception as e:
            return { 'statusCode': 500, 'body': { 'error': f'Failed to generate image: {str(e)}' } }

    #tool (image inpainting endpoints removed)
    if(func == 'promptSuggest'):
        return tool.promptSuggest(image, lang)
    if(func == 'improvePrompt'):
        return tool.improve_prompt(prompt, lang)
    if(func == 'uploadAudio'):
        try:
            base64_data = params.get('base64Data')
            if not base64_data:
                return { 'statusCode': 400, 'body': { 'error': 'Missing base64Data' } }
            
            # Use a unique filename if needed, or stick to folder/uuid
            # The original code assumed upload_to_s3 handles filename gen via folder/uuid
            # But the new signature expects full 'key'.
            # We need to construct the key here if we want to match old behavior, 
            # OR update s3helper.upload_to_s3 to handle 'folder' param again (overloading/optional).
            # To be safe and clean, let's construct key here.
            
            import uuid
            # Original: folder = get_s3_key('uploads/audio') -> upload_to_s3(..., folder)
            # New: upload_to_s3(..., key=full_key)
            folder_path = get_s3_key('uploads/audio')
            # Assuming old s3helper generated uuid.ext. Let's do it here.
            # We need extension. Original defaulted to webp for images, but this is audio?
            # Original code: "if not base64_data: ... folder = ... res = s3helper.upload_to_s3(base64_data, S3_BUCKET, folder)"
            # Wait, the OLD upload_to_s3 logic was:
            # if data: startswith('data:') -> extract ext. else -> webp.
            # The OLD function signature was (data, bucket, folder).
            # The NEW function signature is (data, bucket, key, is_json).
            
            # We need to determine extension to create the key.
            # If base64_data has header:
            ext = 'mp3' # Default for audio upload endpoint context? Or inspect header.
            if base64_data.startswith('data:'):
                 header = base64_data.split(',', 1)[0]
                 content_type = header.split(';')[0].split(':')[1]
                 ext = content_type.split('/')[1]
            
            filename = f"{folder_path}/{uuid.uuid4()}.{ext}"
            
            res = s3helper.upload_to_s3(base64_data, S3_BUCKET, filename, is_json=False)
            return { 'statusCode': 200, 'body': res }
        except Exception as e:
            return { 'statusCode': 500, 'body': { 'error': f'Failed to upload audio: {str(e)}' } }

    if(func == 'getPresignedUrl'):
        try:
            key = params.get('key')
            expires = int(params.get('expires', 3600))
            download = params.get('download', False)
            
            if not key:
                return { 'statusCode': 400, 'body': { 'error': 'Missing key' } }
            
            disposition = None
            if download:
                filename = key.split('/')[-1]
                disposition = f'attachment; filename="{filename}"'
            
            url = s3helper.generate_presigned_url(S3_BUCKET, key, expires, response_content_disposition=disposition)
            return { 'statusCode': 200, 'body': { 'url': url } }
        except Exception as e:
            return { 'statusCode': 500, 'body': { 'error': f'Failed to generate presigned URL: {str(e)}' } }

    if(func == 'createUploadUrl'):
        try:
            from time import time
            content_type = params.get('contentType') or 'audio/mpeg'
            # Generate a unique key under uploads/audio/
            key = params.get('key')
            if not key:
                key = get_s3_key(f"uploads/audio/{int(time())}-{uuid.uuid4().hex}.mp3")
            put_url = s3helper.generate_presigned_put_url(S3_BUCKET, key, content_type, 900)
            return { 'statusCode': 200, 'body': { 'key': key, 'putUrl': put_url } }
        except Exception as e:
            return { 'statusCode': 500, 'body': { 'error': f'Failed to create upload URL: {str(e)}' } }
    
    #subx
    if(func == 'activateReceipt'):
       return telegram.send_hello_world()
    if(func == 'updateReceiptCache'):
        if(params.get('isActivate', False)):
            return sub.activateReceipt(uid, platform, itemInfo)
        return sub.updateReceiptCache(uid, platform, itemInfo)

    #user
    if(func == 'createUser'):
        return user.createUser(params)
    if(func == 'login'):
        return user.loginUsingTempToken(uid, tempToken)
    if(func == 'loginAuth'):
        return user.loginUsingAuth(params['authToken'], params['gmail'], params['fuid'], params.get('displayName', ''), params.get('avatarUrl', ''))
    if(func == 'linkAccount'):
        return user.link_account(uid, tempToken, params['fuid'], params['email'])
    if(func == 'unlinkAccount'):
        return user.unlink_account(uid, tempToken)
    if(func == 'setInitExample'):
        return user.set_is_init_example_true(uid)
    if(func =='setPinStyle'):
        return user.set_pin_style(uid, params['pinStyle'])
    if(func == 'updateAgeNGender'):
        return user.update_age_and_gender(uid, params['age'], params['gender'])
    if(func == 'addRefCode'):
        return user.add_ref_code(uid, params['refCode'])
    if(func == 'updateLoginCount'):
        return user.update_login_count(uid)
    if(func == 'getRefRes'):
        return user.getRefRes(uid)
    if(func == 'addAdditionalInfo'):
        return user.add_additional_info(uid, params.get('additionalInfo', {}))
    if(func == 'getAdditionalInfo'):
        return user.get_additional_info(uid)
    if(func == 'recordStudySession'):
        return user.record_study_session(
            uid,
            params.get('duration'),
            params.get('startTime'),
            params.get('endTime'),
            params.get('submissionTime')
        )

    if(func == 'addFreeCollectionToUser'):
        return user.add_free_collection_to_user(uid, params.get('collectionId'))

    if(func == 'addToCart'):
        return user.add_to_cart(uid, params.get('collectionId'))

    if(func == 'removeFromCart'):
        return user.remove_from_cart(uid, params.get('collectionId'))

    if(func == 'getCart'):
         return user.get_cart(uid)

    if(func == 'updateCart'):
         return user.update_cart(uid, params.get('cartItems', []))

    if(func == 'clearCart'):
         return user.clear_cart(uid)

    # Get user's purchased collections
    if(func == 'getUserCollections'):
        return user.get_user_collection_ids(uid, params.get('limit'))
    
    # Save latest score for a question set in user's collection
    if(func == 'saveUserQuestionScore'):
        return user.save_user_question_score(uid, params.get('collectionId'), params.get('questionSetId'), params.get('score'))

    # Get user collection details including latest_scores
    if(func == 'getUserCollectionDetails'):
        return user.get_user_collection_details(uid, params.get('collectionId'))
        
    #report
    if(func == 'reportCount'):
        return tool.add_reportCount(params['field'])
    if(func == 'addReport'):
        return tool.add_report(params['field'],params['comment'])

    #question uploader
    if(func == 'questionUploader'):
        return question_uploader.upload_questions(
            params.get('textInput'),
            params.get('questionSetSettings'),
            params.get('jobId'),
            params.get('placeholderQuestionSetId')
        )
    if(func == 'uploadQuestions'):
        return question_uploader.create_question_set(params.get('questionSetData'))

    if(func == 'createQuestionSetPlaceholder'):
        return question_uploader.create_question_set_placeholder(
            params.get('questionSetSettings'),
            params.get('jobId')
        )

    #question set update
    if(func == 'updateQuestionSet'):
        return question_uploader.update_question_set(params.get('questionSetId'), params.get('questionSetData'))

    # append questions to a question set from text (PDF extracted)
    if(func == 'appendQuestionsToQuestionSet'):
        return question_uploader.append_questions_to_question_set(
            params.get('questionSetId'),
            params.get('textInput'),
            params.get('insertIndex', 0)
        )

    #question set status update
    if(func == 'updateQuestionSetStatus'):
        return question_uploader.update_question_set_status(params.get('questionSetId'), params.get('status'))

    #question set trial update
    if(func == 'updateQuestionSetTrial'):
        return question_uploader.update_question_set_trial(params.get('questionSetId'), params.get('isTrial'))

    # question set completions increment
    if(func == 'incrementQuestionSetCompletions'):
        return question_uploader.increment_question_set_completions(params.get('questionSetId'))

    #question set get all
    if(func == 'getQuestionSets'):
        return question_uploader.get_question_sets()

    # paginated question sets
    if(func == 'getQuestionSetsPaged'):
        return question_uploader.get_question_sets_paged(
            params.get('limit', 24),
            params.get('lastKey'),
            params.get('onlyStandalone', False),
            params.get('statusFilter')
        )

    #question set get counts
    if(func == 'getQuestionSetCounts'):
        return question_uploader.get_question_set_counts(params.get('examFilter'), params.get('statusFilter'))

    #question set delete
    if(func == 'deleteQuestionSet'):
        return question_uploader.delete_question_set(params.get('questionSetId'))

    #question set bulk delete
    if(func == 'bulkDeleteQuestionSets'):
        return question_uploader.bulk_delete_question_sets(params.get('questionSetIds'))

    #question set get by category and type
    if(func == 'getQuestionSetsByCategoryAndType'):
        return question_uploader.get_question_sets_by_category_and_type(params.get('category'), params.get('questionType'), params.get('examFilter'), params.get('statusFilter'))

    #question set get by id
    if(func == 'getQuestionSetById'):
        return question_uploader.get_question_set_by_id(params.get('questionSetId'))

    # Wrong-answer stats
    if(func == 'recordWrongAnswers'):
        return question_uploader.record_wrong_answers(
            params.get('uid'),
            params.get('questionSetId'),
            params.get('questionIds', []),
            params.get('collectionId')
        )
    if(func == 'getTopWrongQuestions'):
        return question_uploader.get_top_wrong_questions(
            params.get('period', 'WEEK'),
            params.get('limit', 20)
        )

    # Collection management functions
    if(func == 'createCollection'):
        return question_uploader.create_collection(params.get('collectionData'))
    
    if(func == 'getCollections'):
        return question_uploader.get_collections()
    
    if(func == 'getQuestionSetsByCollection'):
        return question_uploader.get_question_sets_by_collection(params.get('collectionId'))
    
    if(func == 'deleteCollection'):
        return question_uploader.delete_collection(params.get('collectionId'))

    if(func == 'updateCollection'):
        return question_uploader.update_collection(params.get('collectionId'), params.get('collectionData'))

    if(func == 'updateCollectionStatus'):
        return question_uploader.update_collection_status(params.get('collectionId'), params.get('status'))

    if(func == 'addQuestionSetToCollection'):
        return question_uploader.add_question_set_to_collection(params.get('collectionId'), params.get('questionSetId'))

    if(func == 'removeQuestionSetFromCollection'):
        return question_uploader.remove_question_set_from_collection(params.get('collectionId'), params.get('questionSetId'))
    
    if(func == 'cleanupOrphanedQuestionSets'):
        return question_uploader.cleanup_orphaned_question_sets(params.get('collectionId'))

    # Collection count and filtering functions
    if(func == 'getCollectionCounts'):
        return question_uploader.get_collection_counts(params.get('examFilter'), params.get('statusFilter'))
    
    if(func == 'getCollectionsByCategoryAndType'):
        return question_uploader.get_collections_by_category_and_type(params.get('category'), params.get('questionType'), params.get('examFilter'), params.get('statusFilter'))
    
    if(func == 'getCollectionById'):
        return question_uploader.get_collection_by_id(params.get('collectionId'))

    if(func == 'suggestCollectionMeta'):
        return question_uploader.suggest_collection_meta(params.get('collectionId'), params.get('maxTitles', 30))

    # Admin user management functions
    if(func == 'createAdminUser'):
        return user.createAdminUser(params)
    
    if(func == 'loginAdminAuth'):
        return user.loginAdminAuth(params.get('authToken'), params.get('email'), params.get('fuid'))
    
    if(func == 'getAdminUsers'):
        return user.getAdminUsers()

    if(func == 'getUsers'):
        return user.getUsers(params)

    if(func == 'exportUsersCsv'):
        return user.exportUsersCsv(params)
    
    if(func == 'updateAdminUser'):
        return user.updateAdminUser(params.get('uid'), params)
    
    if(func == 'deleteAdminUser'):
        return user.deleteAdminUser(params.get('uid'))

    # Ranking functions
    if(func == 'getLeaderboard'):
        from src import ranking
        limit = params.get('limit', 20)
        period = params.get('period', 'ALL')
        return ranking.get_leaderboard(period, limit)
    if(func == 'getUserRanking'):
        from src import ranking
        period = params.get('period', 'ALL')
        return ranking.get_user_ranking(uid, period)

    # Discount functions
    if(func == 'createDiscount'):
        return discount.create_discount(params.get('discountData'))
    if(func == 'getDiscounts'):
        return discount.get_discounts(params.get('limit'))
    if(func == 'updateDiscount'):
        return discount.update_discount(params.get('code'), params.get('updateData'))
    if(func == 'deleteDiscount'):
        return discount.delete_discount(params.get('code'))
    if(func == 'applyDiscount'):
        return discount.apply_discount(params.get('code'), params.get('orderTotal'), params.get('userEmail'))

    # Cart and order functions
    if(func == 'createOrder'):
        from src import cart
        return cart.create_order(
            params.get('userId'),
            params.get('items', []),
            params.get('userEmail', '')
        )
    
    if(func == 'getUserOrders'):
        from src import cart
        return cart.get_user_orders(params.get('userId'), params.get('limit', 10))
    
    if(func == 'updateOrderStatus'):
        from src import cart
        return cart.update_order_status(
            params.get('orderId'), 
            params.get('status'), 
            params.get('paymentStatus')
        )
    
    if(func == 'applyDiscountToOrder'):
        from src import cart
        return cart.apply_discount_to_order(
            params.get('orderId'),
            params.get('discountCode'),
            params.get('userEmail')
        )

    # Bundle functions
    if(func == 'createBundle'):
        from src import bundle
        return bundle.create_bundle(params.get('bundleData'), params.get('userId'))
    if(func == 'getBundles'):
        from src import bundle
        return bundle.get_bundles(params.get('limit', 50), params.get('offset', 0))
    if(func == 'getBundleById'):
        from src import bundle
        return bundle.get_bundle_by_id(params.get('bundleId'))
    if(func == 'updateBundle'):
        from src import bundle
        return bundle.update_bundle(params.get('bundleId'), params.get('updateData'))
    if(func == 'deleteBundle'):
        from src import bundle
        return bundle.delete_bundle(params.get('bundleId'))
    if(func == 'addCollectionToBundle'):
        from src import bundle
        return bundle.add_collection_to_bundle(params.get('bundleId'), params.get('collectionId'))
    if(func == 'removeCollectionFromBundle'):
        from src import bundle
        return bundle.remove_collection_from_bundle(params.get('bundleId'), params.get('collectionId'))
    
    # FAQ functions
    if(func == 'getAllSections'):
        from src import faq
        return faq.get_all_sections()
    if(func == 'createSection'):
        from src import faq
        return faq.create_section(
            params.get('sectionName'),
            params.get('order'),
            params.get('title')
        )
    if(func == 'deleteSection'):
        from src import faq
        return faq.delete_section(params.get('sectionName'))
    if(func == 'updateSection'):
        from src import faq
        return faq.update_section(
            params.get('sectionName'),
            params.get('title'),
            params.get('order')
        )
    if(func == 'getFAQs'):
        from src import faq
        return faq.get_faqs_by_section(params.get('sectionName'))
    if(func == 'createFAQ'):
        from src import faq
        return faq.create_faq(
            params.get('sectionName'),
            params.get('question'),
            params.get('answer'),
            params.get('order'),
            params.get('status', 'active')
        )
    if(func == 'updateFAQ'):
        from src import faq
        return faq.update_faq(
            params.get('sectionName'),
            params.get('faqId'),
            params.get('updateData', {})
        )
    if(func == 'deleteFAQ'):
        from src import faq
        return faq.delete_faq(
            params.get('sectionName'),
            params.get('faqId')
        )
    if(func == 'voteFAQ'):
        from src import faq
        return faq.vote_faq(
            params.get('sectionName'),
            params.get('faqId'),
            params.get('voteType')
        )
    
    if(func == 'getOrderDetails'):
        from src import cart
        return cart.get_order_details(params.get('orderId'))

    if(func == 'handlePaymentWebhook'):
        from src import cart
        return cart.handle_payment_webhook(params.get('webhookData'), params.get('authHeader'))

    # Metrics functions
    if(func == 'getMetricsSeries'):
        from src import metrics
        return metrics.get_metrics_series(
            params.get('startDate'), params.get('endDate'), params.get('organizationId', 'default')
        )
    if(func == 'getRevenueMonthCompare'):
        from src import metrics
        return metrics.get_revenue_month_compare(params.get('organizationId', 'default'))
    if(func == 'getPayingUsersMonthUnique'):
        from src import metrics
        return metrics.get_paying_users_month_unique(params.get('organizationId', 'default'))
    if(func == 'rebuildMetricsRange'):
        from src import metrics
        return metrics.rebuild_metrics_range(
            params.get('startDate'), params.get('endDate'), params.get('organizationId', 'default')
        )
    # Order-only analytics
    if(func == 'getOrderMetricsSeries'):
        from src import metrics
        return metrics.get_order_metrics_series(params.get('startDate'), params.get('endDate'), params.get('includePendingPaid', True))
    if(func == 'getOrderRevenueMonthCompare'):
        from src import metrics
        return metrics.get_order_revenue_month_compare()
    if(func == 'getOrderPayingUsersMonthUnique'):
        from src import metrics
        return metrics.get_order_paying_users_month_unique()
    if(func == 'getOrderPayingUsersMonthCompare'):
        from src import metrics
        return metrics.get_order_paying_users_month_compare()

    # Collection sales stats
    if(func == 'getCollectionSalesStats'):
        from src import metrics
        return metrics.get_collection_sales_stats(
            params.get('startDate'),
            params.get('endDate'),
            params.get('category'),
            params.get('exam')
        )

    # AI evaluation for analytics
    if(func == 'evaluateAnalytics'):
        from src import metrics
        return metrics.evaluate_analytics(
            params.get('analyticsData'),
            params.get('context'),
            params.get('maxSuggestions', 5)
        )

    if(func == 'sendLiveSupport'):
        email = params.get('email')
        phone = params.get('phone')
        content = params.get('content')

        if not content:
            return {
                'statusCode': 400,
                'body': {
                    'success': False,
                    'message': 'Missing content'
                }
            }

        lines = ['📞 Yêu cầu hỗ trợ mới']
        if email:
            lines.append(f"Email: {email}")
        if phone:
            lines.append(f"Phone: {phone}")
        lines.append("\nNội dung:")
        lines.append(content)

        message = "\n".join(lines)

        try:
            telegram.send_message(message)
            return {
                'statusCode': 200,
                'body': {
                    'success': True,
                    'message': 'Support request sent'
                }
            }
        except Exception as e:
            print(f"Failed to send telegram message: {str(e)}")
            return {
                'statusCode': 500,
                'body': {
                    'success': False,
                    'message': 'Failed to send support request'
                }
            }

    if(func == 'test'):
        return {
            'statusCode': 200,
            'body': params.get('testString')
        }
    
    # Vinpix admin functions
    if(func == 'loginVinpixAdmin'):
        return vinpix_admin.loginVinpixAdmin(params.get('email'), params.get('password'))
    if(func == 'verifyVinpixAdminSession'):
        return vinpix_admin.verifyVinpixAdminSession(params.get('sessionToken'))
    if(func == 'helloWorld'):
        return vinpix_admin.helloWorld(params)
    
    # Contract functions
    if(func == 'get_contracts'):
        return contract.get_contracts(params)
    if(func == 'generate_contract'):
        return contract.generate_contract(params)
    if(func == 'create_contract'):
        return contract.create_contract(params)
    if(func == 'get_contract_details'):
        return contract.get_contract_details(params)
    if(func == 'update_contract_status'):
        return contract.update_contract_status(params)
    if(func == 'sign_contract'):
        return contract.sign_contract(params)
    if(func == 'delete_signature'):
        return contract.delete_signature(params)
    if(func == 'get_public_contract'):
        return contract.get_public_contract(params)
    if(func == 'evaluate_contract_inputs'):
        return contract.evaluate_contract_inputs(params)
    if(func == 'save_draft'):
        return contract.save_draft(params)
    if(func == 'delete_contract'):
        return contract.delete_contract(params)

    return {
        'statusCode': 400,
        'body': 'DoNothingCode',
    }

def lambda_handler(event, context):
    # print('======')
    #print(event)
    # print('=======')
    
    # Handle Sepay payment webhook
    if 'headers' in event and 'authorization' in event.get('headers', {}):
        # This is a webhook call from Sepay
        try:
            from src import cart
            
            # Parse the body
            if isinstance(event['body'], str):
                webhook_data = json.loads(event['body'])
            else:
                webhook_data = event['body']
            
            auth_header = event['headers']['authorization']
            
            return cart.handle_payment_webhook(webhook_data, auth_header)
            
        except Exception as e:
            print(f"Error handling webhook: {str(e)}")
            return {
                'statusCode': 500,
                'body': {'error': f'Webhook processing failed: {str(e)}'}
            }

    if 'Records' in event:
        record = event['Records'][0]['body']
        if isinstance(record, str):
            record = json.loads(record)
        func = record['function']
        params = record.get('params', {}) 
        return handle_request(func, params)
    elif 'function' in event:
        func = event['function']
        params = event.get('params', {})
        return handle_request(func,params)
    
    elif 'body' in event:
        
        if isinstance(event['body'], str):
            body = json.loads(event['body'])
        else:
            body = event['body']
        func = body['function']
        params = body.get('params', {})
        return handle_request(func,params)

    else:
        return {'statusCode':400, 'body':'DoNothingCode'}
