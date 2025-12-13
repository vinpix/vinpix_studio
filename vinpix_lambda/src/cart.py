import json
import time
import boto3
from decimal import Decimal
from typing import Dict, List, Any
import random
import string
from src.utils import orders_table, BANK_NAME, ACCOUNT_NUMBER, ACCOUNT_USER_NAME, sb_user_collections, sb_user_bundles
from src.bundle import get_bundle_by_id
from src.question_uploader import get_collection_by_id
from src.metrics import increment_daily_metrics_for_order

# New helper to generate order IDs prefixed with "SB"
def generate_short_order_id(prefix: str = "SB", length: int = 10) -> str:
    """
    Generate an order ID starting with a fixed prefix (default "SB") followed
    by a random sequence of uppercase letters.

    The total length of the generated ID will be len(prefix) + length.
    """
    random_part = ''.join(random.choices(string.ascii_uppercase, k=length))
    return f"{prefix}{random_part}"

def _expand_order_items_for_grant(order_items: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    """
    Expand any bundle items in an order into their underlying collections for granting.
    Keeps non-bundle items unchanged.
    """
    collections: List[Dict[str, Any]] = []
    for item in order_items:
        cid = item.get('collectionId')
        if isinstance(cid, str) and cid.startswith('BUNDLE:'):
            bundle_id = cid.replace('BUNDLE:', '')
            try:
                bres = get_bundle_by_id(bundle_id)
                if bres and bres.get('statusCode') == 200:
                    b = bres.get('body', {}).get('bundle', {})
                    for c in b.get('collections', []) or []:
                        collections.append({
                            'collectionId': c.get('id'),
                            'name': c.get('name'),
                            'price': c.get('price', 0),
                            'pricing': 'paid' if (c.get('price', 0) or 0) > 0 else 'free',
                            'category': c.get('category', ''),
                            'exam': c.get('exam', ''),
                            'questionSetCount': c.get('questionSetCount', 0)
                        })
                else:
                    # If bundle cannot be loaded, skip expansion silently
                    continue
            except Exception as _e:
                # Skip expansion on error
                continue
        else:
            # Already a collection item
            collections.append(item)
    return collections


def create_order(user_id: str, items: List[Dict[str, Any]], user_email: str) -> Dict[str, Any]:
    """
    Create an order from cart items
    """
    try:
        import boto3
        from src.utils import orders_table
        
        # Generate order ID and timestamp
        order_id = generate_short_order_id()
        created_at = int(time.time())
        
        # Build order lines and calculate total (server-side). For bundles, add one line with bundle price
        # and separately track collections to grant upon completion.
        order_line_items: List[Dict[str, Any]] = []
        grant_collections: List[Dict[str, Any]] = []
        calculated_total: float = 0

        for item in items:
            cid = item.get('collectionId')
            if isinstance(cid, str) and cid.startswith('BUNDLE:'):
                bundle_id = cid.replace('BUNDLE:', '')
                bundle_res = get_bundle_by_id(bundle_id)
                if not bundle_res or bundle_res.get('statusCode') != 200:
                    return {
                        'statusCode': 400,
                        'body': {'error': f'Bundle not found: {bundle_id}'}
                    }
                bundle = bundle_res.get('body', {}).get('bundle', {})
                # Add a single order line for the bundle using its computed price
                bprice = float(bundle.get('price', 0) or 0)
                calculated_total += bprice
                order_line_items.append({
                    'collectionId': f'BUNDLE:{bundle_id}',
                    'name': f"Bundle: {bundle.get('title', bundle_id)}",
                    'price': Decimal(str(bprice)),
                    'pricing': 'paid' if bprice > 0 else 'free',
                    'category': 'bundle',
                    'exam': '',
                    'questionSetCount': len(bundle.get('collections', []) or [])
                })
                # Expand bundle to actual collections for granting later
                for c in bundle.get('collections', []) or []:
                    grant_collections.append({
                        'collectionId': c.get('id'),
                        'name': c.get('name'),
                        'price': c.get('price', 0),
                        'pricing': 'paid' if (c.get('price', 0) or 0) > 0 else 'free',
                        'category': c.get('category', ''),
                        'exam': c.get('exam', ''),
                        'questionSetCount': c.get('questionSetCount', 0)
                    })
            else:
                # Verify collection exists and get latest data
                collection_data = get_collection_by_id(cid)
                if not collection_data or collection_data.get('statusCode') != 200:
                    return {
                        'statusCode': 400,
                        'body': {'error': f'Collection not found: {cid}'}
                    }

                # Extract the actual collection object (may be nested under 'collection')
                body_data = collection_data.get('body', {})
                collection = body_data.get('collection', body_data)

                if not collection or 'id' not in collection:
                    return {
                        'statusCode': 500,
                        'body': {'error': f'Invalid collection data for: {cid}'}
                    }

                # Add order line and include in grant list
                cprice = float(collection.get('price', 0) or 0)
                if collection.get('pricing') == 'paid':
                    calculated_total += cprice
                line = {
                    'collectionId': collection['id'],
                    'name': collection['name'],
                    'price': Decimal(str(cprice)),
                    'pricing': collection.get('pricing', 'free'),
                    'category': collection.get('category', ''),
                    'exam': collection.get('exam', ''),
                    'questionSetCount': collection.get('questionSetCount', 0)
                }
                order_line_items.append(line)
                grant_collections.append(line)
        
        # Create order record
        order_data = {
            'id': order_id,
            'userId': user_id,
            'userEmail': user_email,
            'items': order_line_items,
            'totalPrice': Decimal(str(calculated_total)),
            'finalPrice': Decimal(str(int(round(calculated_total)))),  # Ensure integer, initially same as totalPrice
            'status': 'pending' if calculated_total > 0 else 'completed',
            'paymentStatus': 'pending' if calculated_total > 0 else 'free',
            'createdAt': created_at,
            'updatedAt': created_at
        }
        
        # Save to database (ensure table exists)
        dynamodb = boto3.resource('dynamodb')
        table = dynamodb.Table(orders_table)

        table.load()


        # Now put the order item
        table.put_item(Item=order_data)
        
        # For free orders (total = 0), immediately add collections and record bundle ownerships to user
        if calculated_total == 0 and grant_collections:
            try:
                collections_result = add_user_collections(user_id, grant_collections)
                if collections_result.get('statusCode') != 200:
                    print(f"Warning: Failed to add free collections to user {user_id}: {collections_result}")
                else:
                    print(f"Successfully added {len(grant_collections)} free collections to user {user_id}")
            except Exception as e:
                print(f"Error adding free collections to user {user_id}: {str(e)}")
                # Don't fail the order creation for free items
            # Record bundle ownerships for future auto-grant
            try:
                bundle_ids = []
                for it in order_line_items:
                    cid = it.get('collectionId')
                    if isinstance(cid, str) and cid.startswith('BUNDLE:'):
                        bundle_ids.append(cid.replace('BUNDLE:', ''))
                if bundle_ids:
                    add_user_bundles(user_id, bundle_ids)
            except Exception as e:
                print(f"Error recording user bundles for free order {order_id}: {str(e)}")
        
        # Generate payment info for paid orders
        payment_info = None
        if calculated_total > 0:
            payment_info = {
                'paymentUrl': generate_payment_url(order_id, calculated_total),
                'bankInfo': {
                    'bankName': BANK_NAME,
                    'accountNumber': ACCOUNT_NUMBER,
                    'accountHolder': ACCOUNT_USER_NAME,
                    'amount': calculated_total,
                    'transferNote': order_id
                }
            }
        
        return {
            'statusCode': 200,
            'body': {
                'success': True,
                'orderId': order_id,
                'paymentInfo': payment_info,
                'message': 'Order created successfully' if calculated_total > 0 else 'Free items downloaded successfully'
            }
        }
        
    except Exception as e:
        print(f"Error creating order: {str(e)}")
        return {
            'statusCode': 500,
            'body': {'error': f'Failed to create order: {str(e)}'}
        }

def generate_payment_url(order_id: str, amount: float) -> str:
    """
    Generate QR code payment URL using Sepay with bank transfer details.
    """
    return (
        f"https://qr.sepay.vn/img?"
        f"bank={BANK_NAME}&acc={ACCOUNT_NUMBER}&amount={int(amount)}&des={order_id}"
    )

def add_user_collections(user_id: str, items: List[Dict[str, Any]]) -> Dict[str, Any]:
    """
    Add purchased collections to user's sb_user_collections table
    """
    try:
        current_time = int(time.time())
        
        # Process each collection in the order
        for item in items:
            collection_id = item.get('collectionId')
            if not collection_id:
                continue
                
            # Check if user already has this collection
            try:
                response = sb_user_collections.get_item(
                    Key={
                        'user_id': user_id,
                        'collection_id': collection_id
                    }
                )
                
                # If item already exists, skip it
                if 'Item' in response:
                    print(f"User {user_id} already has collection {collection_id}, skipping...")
                    continue
                    
            except Exception as e:
                print(f"Error checking existing collection: {str(e)}")
                # Continue to try adding it anyway
            
            # Add the collection to user's collections
            try:
                collection_data = {
                    'user_id': user_id,
                    'collection_id': collection_id,
                    'purchased_at': current_time,
                    'created_at': current_time
                }
                
                sb_user_collections.put_item(Item=collection_data)
                print(f"Successfully added collection {collection_id} to user {user_id}")
                
            except Exception as e:
                print(f"Error adding collection {collection_id} to user {user_id}: {str(e)}")
                # Continue with other collections
                continue
        
        return {
            'statusCode': 200,
            'body': {'message': 'User collections updated successfully'}
        }
        
    except Exception as e:
        print(f"Error adding user collections: {str(e)}")
        return {
            'statusCode': 500,
            'body': {'error': f'Failed to add user collections: {str(e)}'}
        }


def add_user_bundles(user_id: str, bundle_ids: List[str]) -> Dict[str, Any]:
    """
    Record bundle ownerships in sb_user_bundles so future newly added collections
    in those bundles are auto-granted to the user via get_user_collection_ids.
    """
    try:
        now_ts = int(time.time())
        for bid in bundle_ids:
            if not bid:
                continue
            # Skip if already recorded
            try:
                existing = sb_user_bundles.get_item(Key={'user_id': user_id, 'bundle_id': bid})
                if 'Item' in existing:
                    continue
            except Exception:
                pass
            try:
                sb_user_bundles.put_item(Item={
                    'user_id': user_id,
                    'bundle_id': bid,
                    'purchased_at': now_ts,
                    'created_at': now_ts,
                })
            except Exception as e:
                print(f"add_user_bundles: failed to add bundle {bid} for user {user_id}: {str(e)}")
                continue
        return {'statusCode': 200, 'body': {'message': 'User bundles updated successfully'}}
    except Exception as e:
        return {'statusCode': 500, 'body': {'error': f'Failed to add user bundles: {str(e)}'}}

def get_user_orders(user_id: str, limit: int = 10) -> Dict[str, Any]:
    """
    Get user's order history
    """
    try:
        import boto3
        from boto3.dynamodb.conditions import Key
        
        dynamodb = boto3.resource('dynamodb')
        table = dynamodb.Table(orders_table)
        
        response = table.query(
            IndexName='userId-index',  # Correct GSI name
            KeyConditionExpression=Key('userId').eq(user_id),
            ScanIndexForward=False,  # Get newest first
            Limit=limit
        )
        
        orders = []
        for item in response.get('Items', []):
            # Convert Decimal to float for JSON serialization
            order = {}
            for key, value in item.items():
                if isinstance(value, Decimal):
                    order[key] = float(value)
                else:
                    order[key] = value
            orders.append(order)
        
        return {
            'statusCode': 200,
            'body': {
                'orders': orders,
                'count': len(orders)
            }
        }
        
    except Exception as e:
        print(f"Error getting user orders: {str(e)}")
        return {
            'statusCode': 500,
            'body': {'error': f'Failed to get orders: {str(e)}'}
        }

def update_order_status(order_id: str, status: str, payment_status: str = None) -> Dict[str, Any]:
    """
    Update order status (for payment webhooks)
    """
    try:
        import boto3
        
        dynamodb = boto3.resource('dynamodb')
        table = dynamodb.Table(orders_table)
        
        update_expression = "SET #status = :status, updatedAt = :updated_at"
        expression_attribute_names = {'#status': 'status'}
        expression_attribute_values = {
            ':status': status,
            ':updated_at': int(time.time())
        }
        
        if payment_status:
            update_expression += ", paymentStatus = :payment_status"
            expression_attribute_values[':payment_status'] = payment_status
        
        update_res = table.update_item(
            Key={'id': order_id},
            UpdateExpression=update_expression,
            ExpressionAttributeNames=expression_attribute_names,
            ExpressionAttributeValues=expression_attribute_values
        )
        try:
            if status == 'completed' and (payment_status == 'paid' or payment_status is None):
                # Load updated order to compute metrics
                order_resp = table.get_item(Key={'id': order_id})
                if 'Item' in order_resp:
                    increment_daily_metrics_for_order(order_resp['Item'])
        except Exception as _:
            pass
        
        return {
            'statusCode': 200,
            'body': {'message': 'Order status updated successfully'}
        }
        
    except Exception as e:
        print(f"Error updating order status: {str(e)}")
        return {
            'statusCode': 500,
            'body': {'error': f'Failed to update order: {str(e)}'}
        }

def apply_discount_to_order(order_id: str, discount_code: str, user_email: str) -> Dict[str, Any]:
    """
    Apply discount code to an existing order and update final price and QR code
    """
    try:
        import boto3
        from src.discount import apply_discount, get_discount_by_code
        
        dynamodb = boto3.resource('dynamodb')
        table = dynamodb.Table(orders_table)
        
        # Get the order first
        response = table.get_item(Key={'id': order_id})
        if 'Item' not in response:
            return {
                'statusCode': 404,
                'body': {'error': 'Order not found'}
            }
            
        order = response['Item']
        
        # Check if order belongs to user (basic security)
        if order.get('userEmail') != user_email:
            return {
                'statusCode': 403,
                'body': {'error': 'Access denied'}
            }
            
        # Check if order is still pending
        if order.get('status') != 'pending':
            return {
                'statusCode': 400,
                'body': {'error': 'Cannot apply discount to completed order'}
            }
            
        # Optionally enforce discount applicability to specific collections
        try:
            discount_info = get_discount_by_code(discount_code)
            if discount_info.get('statusCode') != 200:
                return discount_info
            discount_item = discount_info.get('body', {}).get('discount', {})
            allowed_ids = discount_item.get('allowedCollectionIds')
            if isinstance(allowed_ids, list) and len(allowed_ids) > 0:
                order_item_ids = [it.get('collectionId') for it in order.get('items', [])]
                # Ensure every ordered collection is allowed
                if not all(cid in allowed_ids for cid in order_item_ids):
                    return {
                        'statusCode': 400,
                        'body': {'error': 'Discount is not applicable for these items'}
                    }
        except Exception as _e:
            # Fail safe: if check cannot be performed, block applying discount
            return {
                'statusCode': 400,
                'body': {'error': 'Unable to validate discount applicability'}
            }

        # Get the original total price
        original_total = float(order.get('totalPrice', 0))
        
        # Apply discount using existing discount logic
        discount_result = apply_discount(discount_code, original_total, user_email)
        
        if discount_result.get('statusCode') != 200:
            return discount_result
            
        discount_data = discount_result.get('body', {})
        new_total = discount_data.get('newTotal', original_total)
        # Ensure final price is always an integer (round to nearest whole number)
        final_price_int = int(round(new_total))
        
        # Update order with discount information. If the final price is 0, mark as completed immediately
        payment_info = None
        if final_price_int == 0:
            update_expression = (
                "SET finalPrice = :final_price, discountCode = :code, "
                "#status = :status_value, paymentStatus = :payment_status, updatedAt = :updated_at"
            )
            expression_attribute_names = {'#status': 'status'}
            expression_attribute_values = {
                ':final_price': Decimal(str(final_price_int)),
                ':code': discount_code.upper(),
                ':status_value': 'completed',
                ':payment_status': 'paid',
                ':updated_at': int(time.time())
            }

            table.update_item(
                Key={'id': order_id},
                UpdateExpression=update_expression,
                ExpressionAttributeNames=expression_attribute_names,
                ExpressionAttributeValues=expression_attribute_values
            )

            # Immediately grant collections and record bundle ownership since this becomes a free order
            try:
                user_id = order.get('userId')
                items = order.get('items', [])
                expanded = _expand_order_items_for_grant(items)
                if user_id and expanded:
                    add_user_collections(user_id, expanded)
                # Record bundle ownerships for future auto-grant
                try:
                    bundle_ids = []
                    for it in items:
                        cid = it.get('collectionId')
                        if isinstance(cid, str) and cid.startswith('BUNDLE:'):
                            bundle_ids.append(cid.replace('BUNDLE:', ''))
                    if user_id and bundle_ids:
                        add_user_bundles(user_id, bundle_ids)
                except Exception as _e2:
                    print(f"Granting bundle ownership on discount-to-zero failed: {str(_e2)}")
            except Exception as _e:
                # Do not fail the flow if granting collections encounters an error
                print(f"Granting collections on free order failed: {str(_e)}")
        else:
            update_expression = "SET finalPrice = :final_price, discountCode = :code, updatedAt = :updated_at"
            expression_attribute_values = {
                ':final_price': Decimal(str(final_price_int)),
                ':code': discount_code.upper(),
                ':updated_at': int(time.time())
            }

            table.update_item(
                Key={'id': order_id},
                UpdateExpression=update_expression,
                ExpressionAttributeValues=expression_attribute_values
            )

            # Generate new payment info with updated amount (using integer final price)
            payment_info = {
                'paymentUrl': generate_payment_url(order_id, final_price_int),
                'bankInfo': {
                    'bankName': BANK_NAME,
                    'accountNumber': ACCOUNT_NUMBER,
                    'accountHolder': ACCOUNT_USER_NAME,
                    'amount': final_price_int,
                    'transferNote': order_id
                }
            }
        
        return {
            'statusCode': 200,
            'body': {
                'success': True,
                'discountValue': discount_data.get('discountValue', 0),
                'newTotal': final_price_int,  # Return the integer final price
                'originalTotal': original_total,
                'paymentInfo': payment_info,
                'discount': discount_data.get('discount', {}),
                'message': 'Discount applied successfully'
            }
        }
        
    except Exception as e:
        print(f"Error applying discount to order: {str(e)}")
        return {
            'statusCode': 500,
            'body': {'error': f'Failed to apply discount: {str(e)}'}
        } 

def get_order_details(order_id: str) -> Dict[str, Any]:
    """
    Get order details including payment information and applied discounts
    """
    try:
        import boto3
        
        dynamodb = boto3.resource('dynamodb')
        table = dynamodb.Table(orders_table)
        
        # Get the order
        response = table.get_item(Key={'id': order_id})
        if 'Item' not in response:
            return {
                'statusCode': 404,
                'body': {
                    'success': False,
                    'message': 'Order not found'
                }
            }
            
        order = response['Item']
        
        # Convert Decimal to float for JSON serialization
        order_data = {
            'id': order.get('id'),
            'userId': order.get('userId'),
            'userEmail': order.get('userEmail'),
            'items': order.get('items', []),
            'totalPrice': float(order.get('totalPrice', 0)),
            'status': order.get('status'),
            'paymentStatus': order.get('paymentStatus'),
            'createdAt': order.get('createdAt'),
            'updatedAt': order.get('updatedAt'),
            'finalPrice': float(order.get('finalPrice', 0)),
        }
        
        # Generate payment info if order is pending and has a price
        payment_info = None
        final_price = float(order.get('finalPrice', order.get('totalPrice', 0)))
        
        if order.get('status') == 'pending' and final_price > 0:
            payment_info = {
                'paymentUrl': generate_payment_url(order_id, final_price),
                'bankInfo': {
                    'bankName': BANK_NAME,
                    'accountNumber': ACCOUNT_NUMBER,
                    'accountHolder': ACCOUNT_USER_NAME,
                    'amount': int(final_price),
                    'transferNote': order_id
                }
            }
        
        # Check if there's an applied discount
        applied_discount = None
        discount_code = order.get('discountCode')
        
        if discount_code:
            # Import discount module to get discount details
            from src.discount import get_discount_by_code
            discount_result = get_discount_by_code(discount_code)
            
            if discount_result.get('statusCode') == 200:
                discount_data = discount_result.get('body', {}).get('discount', {})
                original_total = float(order.get('totalPrice', 0))
                final_price = float(order.get('finalPrice', original_total))
                discount_value = original_total - final_price
                
                applied_discount = {
                    'discountValue': discount_value,
                    'newTotal': final_price,
                    'discount': discount_data
                }
        
        return {
            'statusCode': 200,
            'body': {
                'success': True,
                'order': order_data,
                'paymentInfo': payment_info,
                'appliedDiscount': applied_discount,
                'message': 'Order details retrieved successfully'
            }
        }
        
    except Exception as e:
        print(f"Error getting order details: {str(e)}")
        return {
            'statusCode': 500,
            'body': {
                'success': False,
                'message': f'Failed to get order details: {str(e)}'
            }
        }

def handle_payment_webhook(webhook_data: Dict[str, Any], auth_header: str) -> Dict[str, Any]:
    """
    Handle Sepay payment webhook
    """
    try:
        from src.utils import PAYMENT_KEY
        
        # Validate authorization header
        if auth_header != f'Apikey {PAYMENT_KEY}':
            return {
                'statusCode': 401,
                'body': {'error': 'Invalid authorization'}
            }
        
        # Extract payment data
        code = webhook_data.get('code')
        transfer_amount = webhook_data.get('transferAmount', 0)
        order_id = code
        
        if not code:
            return {
                'statusCode': 400,
                'body': {'error': 'Missing transaction code'}
            }
        
        if not order_id:
            return {
                'statusCode': 400,
                'body': {'error': 'Could not extract order ID from content'}
            }
        
        # Get order details
        order_result = get_order_details(order_id)
        if order_result.get('statusCode') != 200:
            return {
                'statusCode': 404,
                'body': {'error': f'Order not found: {order_id}'}
            }
        
        order = order_result.get('body', {}).get('order', {})
        expected_amount = float(order.get('finalPrice', 0))
        
        # Validate amount (convert to integer for comparison since Sepay sends integer amounts)
        if int(transfer_amount) != int(expected_amount):
            return {
                'statusCode': 400,
                'body': {
                    'error': f'Amount mismatch. Order ID: {order_id}, Expected: {int(expected_amount)}, Received: {int(transfer_amount)}'
                }
            }
        
        # Update order status to completed
        update_result = update_order_status(order_id, 'completed', 'paid')
        
        if update_result.get('statusCode') != 200:
            return update_result
        
        # Add collections and record bundle ownerships after successful payment
        user_id = order.get('userId')
        items = order.get('items', [])
        # Expand bundles to collections before granting
        expanded_items = _expand_order_items_for_grant(items)
        
        if user_id and expanded_items:
            try:
                collections_result = add_user_collections(user_id, expanded_items)
                if collections_result.get('statusCode') != 200:
                    print(f"Warning: Failed to add collections to user {user_id}: {collections_result}")
                    # Don't fail the webhook - payment was successful, collections can be added manually if needed
                else:
                    print(f"Successfully added {len(expanded_items)} collections to user {user_id}")
            except Exception as e:
                print(f"Error adding collections to user {user_id}: {str(e)}")
                # Don't fail the webhook - payment was successful
        # Record bundle ownerships
        try:
            bundle_ids = []
            for it in items:
                cid = it.get('collectionId')
                if isinstance(cid, str) and cid.startswith('BUNDLE:'):
                    bundle_ids.append(cid.replace('BUNDLE:', ''))
            if user_id and bundle_ids:
                add_user_bundles(user_id, bundle_ids)
        except Exception as e:
            print(f"Error adding bundle ownerships for user {user_id}: {str(e)}")
        
        try:
            # Also update metrics when webhook confirms payment
            # The order details we fetched contain createdAt, userId, finalPrice
            increment_daily_metrics_for_order(order)
        except Exception as _:
            pass

        return {
            'statusCode': 200,
            'body': {
                'message': 'Payment processed successfully',
                'orderId': order_id,
                'amount': transfer_amount
            }
        }
        
    except Exception as e:
        print(f"Error handling payment webhook: {str(e)}")
        return {
            'statusCode': 500,
            'body': {'error': f'Failed to process payment: {str(e)}'}
        }