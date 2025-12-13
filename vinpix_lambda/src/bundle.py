"""
Bundle management functions for Springboard Lambda
Handles bundle creation, retrieval, updates, and deletion
"""

from src.utils import bundles_table, bundle_collections_table, collection_table, short_uuid
from boto3.dynamodb.conditions import Key
from datetime import datetime


def _get_collections_total_price(collection_ids):
    """Sum price of provided collection ids. Missing collections count as 0."""
    total = 0
    for collection_id in collection_ids or []:
        try:
            resp = collection_table.get_item(Key={'uid': collection_id})
            if 'Item' in resp:
                price = resp['Item'].get('price', 0) or 0
                # Ensure integer
                try:
                    total += int(price)
                except Exception:
                    total += 0
        except Exception:
            # Skip invalid collection ids
            continue
    return max(total, 0)


def _recalculate_bundle_price(bundle_id):
    """Recalculate and persist bundle price based on its collections and discount_percentage."""
    try:
        # Load bundle to get discount_percentage
        bundle_resp = bundles_table.get_item(Key={'id': bundle_id})
        if 'Item' not in bundle_resp:
            return

        bundle_item = bundle_resp['Item']
        discount_pct = bundle_item.get('discount_percentage', 0) or 0
        try:
            discount_pct = int(discount_pct)
        except Exception:
            discount_pct = 0
        # Clamp 0..100
        if discount_pct < 0:
            discount_pct = 0
        if discount_pct > 100:
            discount_pct = 100

        # Fetch all collections linked to this bundle
        bcols = bundle_collections_table.query(
            KeyConditionExpression=Key('bundle_id').eq(bundle_id)
        ).get('Items', [])
        collection_ids = [bc.get('collection_id') for bc in bcols if bc.get('collection_id')]

        total_price = _get_collections_total_price(collection_ids)
        final_price = int(round(total_price * (1 - discount_pct / 100)))
        if final_price < 0:
            final_price = 0

        # Persist new price
        bundles_table.update_item(
            Key={'id': bundle_id},
            UpdateExpression='SET #price = :price, #orig = :orig, #updated_at = :updated_at',
            ExpressionAttributeNames={'#price': 'price', '#orig': 'original_price', '#updated_at': 'updated_at'},
            ExpressionAttributeValues={
                ':price': final_price,
                ':orig': total_price,
                ':updated_at': datetime.utcnow().isoformat() + "Z",
            },
        )
    except Exception:
        # Silent fail to avoid breaking main flows
        pass


def create_bundle(bundle_data, user_id):
    """Create a new bundle with collections"""
    try:
        collection_ids = bundle_data.get('collection_ids', [])
        # Normalize discount
        discount_pct = bundle_data.get('discount_percentage', 0) or 0
        try:
            discount_pct = int(discount_pct)
        except Exception:
            discount_pct = 0
        if discount_pct < 0:
            discount_pct = 0
        if discount_pct > 100:
            discount_pct = 100

        # Generate bundle ID
        bundle_id = short_uuid()
        # Use ISO8601 string to match DynamoDB GSI expecting String type for created_at
        current_time_iso = datetime.utcnow().isoformat() + "Z"
        
        # Compute price based on selected collections and discount
        total_price = _get_collections_total_price(collection_ids)
        computed_price = int(round(total_price * (1 - discount_pct / 100)))
        if computed_price < 0:
            computed_price = 0

        # Create bundle in DynamoDB
        bundle_item = {
            'id': bundle_id,
            'title': bundle_data.get('title'),
            'description': bundle_data.get('description'),
            'price': computed_price,
            'original_price': total_price,
            'discount_percentage': discount_pct,
            'status': bundle_data.get('status', 'draft'),
            'created_by': user_id,
            'created_at': current_time_iso,
            'updated_at': current_time_iso
        }
        
        bundles_table.put_item(Item=bundle_item)
        
        # Add collections to bundle
        if collection_ids:
            for collection_id in collection_ids:
                bundle_collections_table.put_item(Item={
                    'bundle_id': bundle_id,
                    'collection_id': collection_id,
                    'created_at': current_time_iso
                })
        
        return {
            'statusCode': 200,
            'body': {
                'bundleId': bundle_id,
                'bundle': bundle_item,
                'message': 'Bundle created successfully'
            }
        }
    except Exception as e:
        return {'statusCode': 500, 'body': {'error': f'Failed to create bundle: {str(e)}'}}


def get_bundles(limit=50, offset=0):
    """Get all bundles with their collections"""
    try:
        # Scan bundles table
        response = bundles_table.scan()
        bundles_data = response.get('Items', [])
        
        # Sort by created_at descending, supporting both ISO string and numeric timestamps
        def _created_sort_value(b):
            v = b.get('created_at')
            if isinstance(v, (int, float)):
                return float(v)
            if isinstance(v, str):
                try:
                    from datetime import datetime as _dt
                    # Handle trailing Z by converting to +00:00
                    return _dt.fromisoformat(v.replace("Z", "+00:00")).timestamp()
                except Exception:
                    return 0.0
            return 0.0
        bundles_data.sort(key=_created_sort_value, reverse=True)
        
        # Apply pagination
        bundles_data = bundles_data[:limit]
        
        # Get collections for each bundle
        bundles = []
        for bundle in bundles_data:
            # Get collections for this bundle
            collections_response = bundle_collections_table.query(
                KeyConditionExpression=Key('bundle_id').eq(bundle['id'])
            )
            
            # Get collection details
            collections = []
            for bc in collections_response.get('Items', []):
                try:
                    collection_response = collection_table.get_item(
                        Key={'uid': bc['collection_id']}
                    )
                    if 'Item' in collection_response:
                        collections.append({
                            'id': collection_response['Item'].get('uid'),
                            'name': collection_response['Item'].get('name', ''),
                            'category': collection_response['Item'].get('category', '')
                        })
                except:
                    # Skip if collection not found
                    continue
            
            formatted_bundle = {
                **bundle,
                'collections': collections
            }
            bundles.append(formatted_bundle)
        
        return {
            'statusCode': 200,
            'body': {
                'bundles': bundles,
                'total': len(bundles)
            }
        }
    except Exception as e:
        return {'statusCode': 500, 'body': {'error': f'Failed to get bundles: {str(e)}'}}


def get_bundle_by_id(bundle_id):
    """Get a specific bundle by ID"""
    try:
        if not bundle_id:
            return {'statusCode': 400, 'body': {'error': 'Bundle ID is required'}}
        
        # Get bundle
        bundle_response = bundles_table.get_item(Key={'id': bundle_id})
        if 'Item' not in bundle_response:
            return {'statusCode': 404, 'body': {'error': 'Bundle not found'}}
        
        bundle = bundle_response['Item']
        
        # Get collections for this bundle
        collections_response = bundle_collections_table.query(
            KeyConditionExpression=Key('bundle_id').eq(bundle_id)
        )
        
        # Get collection details
        collections = []
        for bc in collections_response.get('Items', []):
            try:
                collection_response = collection_table.get_item(
                    Key={'uid': bc['collection_id']}
                )
                if 'Item' in collection_response:
                    collections.append({
                        'id': collection_response['Item'].get('uid'),
                        'name': collection_response['Item'].get('name', ''),
                        'category': collection_response['Item'].get('category', ''),
                        'questionType': collection_response['Item'].get('questionType', ''),
                        'exam': collection_response['Item'].get('exam', ''),
                        'price': collection_response['Item'].get('price', 0),
                        'status': collection_response['Item'].get('status', '')
                    })
            except:
                # Skip if collection not found
                continue
        
        formatted_bundle = {
            **bundle,
            'collections': collections
        }
        
        return {
            'statusCode': 200,
            'body': {
                'bundle': formatted_bundle
            }
        }
    except Exception as e:
        return {'statusCode': 500, 'body': {'error': f'Failed to get bundle: {str(e)}'}}


def update_bundle(bundle_id, update_data):
    """Update a bundle"""
    try:
        if not bundle_id:
            return {'statusCode': 400, 'body': {'error': 'Bundle ID is required'}}
        
        # Check if bundle exists
        bundle_response = bundles_table.get_item(Key={'id': bundle_id})
        if 'Item' not in bundle_response:
            return {'statusCode': 404, 'body': {'error': 'Bundle not found'}}
        
        # Add updated_at timestamp (ISO8601 string for consistency)
        update_data['updated_at'] = datetime.utcnow().isoformat() + "Z"

        # Prepare UpdateExpression with ExpressionAttributeNames to avoid reserved keywords (e.g., 'status')
        expr_names = {}
        expr_values = {}
        set_clauses = []
        for k, v in update_data.items():
            # Skip id if present
            if k == 'id':
                continue
            # Ignore direct price updates; price is auto-calculated
            if k == 'price':
                continue
            name_key = f"#{k}"
            value_key = f":{k}"
            expr_names[name_key] = k
            expr_values[value_key] = v
            set_clauses.append(f"{name_key} = {value_key}")

        if not set_clauses:
            return {
                'statusCode': 200,
                'body': {
                    'bundle': bundle_response['Item'],
                    'message': 'No changes applied'
                }
            }

        bundles_table.update_item(
            Key={'id': bundle_id},
            UpdateExpression='SET ' + ', '.join(set_clauses),
            ExpressionAttributeNames=expr_names,
            ExpressionAttributeValues=expr_values,
        )
        
        # Recalculate price if discount changed
        if 'discount_percentage' in update_data:
            _recalculate_bundle_price(bundle_id)

        # Get updated bundle
        updated_bundle = bundles_table.get_item(Key={'id': bundle_id})['Item']
        
        return {
            'statusCode': 200,
            'body': {
                'bundle': updated_bundle,
                'message': 'Bundle updated successfully'
            }
        }
    except Exception as e:
        return {'statusCode': 500, 'body': {'error': f'Failed to update bundle: {str(e)}'}}


def delete_bundle(bundle_id):
    """Delete a bundle"""
    try:
        if not bundle_id:
            return {'statusCode': 400, 'body': {'error': 'Bundle ID is required'}}
        
        # Check if bundle exists
        bundle_response = bundles_table.get_item(Key={'id': bundle_id})
        if 'Item' not in bundle_response:
            return {'statusCode': 404, 'body': {'error': 'Bundle not found'}}
        
        # Delete bundle collections first
        collections_response = bundle_collections_table.query(
            KeyConditionExpression=Key('bundle_id').eq(bundle_id)
        )
        
        for bc in collections_response.get('Items', []):
            bundle_collections_table.delete_item(
                Key={
                    'bundle_id': bundle_id,
                    'collection_id': bc['collection_id']
                }
            )
        
        # Delete bundle
        bundles_table.delete_item(Key={'id': bundle_id})
        
        return {
            'statusCode': 200,
            'body': {
                'message': 'Bundle deleted successfully'
            }
        }
    except Exception as e:
        return {'statusCode': 500, 'body': {'error': f'Failed to delete bundle: {str(e)}'}}


def add_collection_to_bundle(bundle_id, collection_id):
    """Add a collection to an existing bundle"""
    try:
        if not bundle_id or not collection_id:
            return {'statusCode': 400, 'body': {'error': 'Bundle ID and Collection ID are required'}}
        
        # Check if bundle exists
        bundle_response = bundles_table.get_item(Key={'id': bundle_id})
        if 'Item' not in bundle_response:
            return {'statusCode': 404, 'body': {'error': 'Bundle not found'}}
        
        # Check if collection exists
        collection_response = collection_table.get_item(Key={'uid': collection_id})
        if 'Item' not in collection_response:
            return {'statusCode': 404, 'body': {'error': 'Collection not found'}}
        
        # Add collection to bundle
        current_time_iso = datetime.utcnow().isoformat() + "Z"
        bundle_collections_table.put_item(Item={
            'bundle_id': bundle_id,
            'collection_id': collection_id,
            'created_at': current_time_iso
        })
        
        # Recalculate bundle price after modification
        _recalculate_bundle_price(bundle_id)

        return {
            'statusCode': 200,
            'body': {
                'message': 'Collection added to bundle successfully'
            }
        }
    except Exception as e:
        return {'statusCode': 500, 'body': {'error': f'Failed to add collection to bundle: {str(e)}'}}


def remove_collection_from_bundle(bundle_id, collection_id):
    """Remove a collection from a bundle"""
    try:
        if not bundle_id or not collection_id:
            return {'statusCode': 400, 'body': {'error': 'Bundle ID and Collection ID are required'}}
        
        # Check if bundle exists
        bundle_response = bundles_table.get_item(Key={'id': bundle_id})
        if 'Item' not in bundle_response:
            return {'statusCode': 404, 'body': {'error': 'Bundle not found'}}
        
        # Remove collection from bundle
        bundle_collections_table.delete_item(
            Key={
                'bundle_id': bundle_id,
                'collection_id': collection_id
            }
        )
        
        # Recalculate bundle price after modification
        _recalculate_bundle_price(bundle_id)

        return {
            'statusCode': 200,
            'body': {
                'message': 'Collection removed from bundle successfully'
            }
        }
    except Exception as e:
        return {'statusCode': 500, 'body': {'error': f'Failed to remove collection from bundle: {str(e)}'}}
