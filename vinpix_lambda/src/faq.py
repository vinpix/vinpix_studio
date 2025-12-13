"""
FAQ management functions for Springboard Lambda
Handles section and FAQ creation, retrieval, updates, and deletion
"""

from datetime import datetime
from typing import Dict, Any, Optional, List
from boto3.dynamodb.conditions import Key
from botocore.exceptions import ClientError

from src.utils import faq_table, short_uuid, convert_sets_to_lists


def _decimal_to_native(value: Any) -> Any:
    """Convert Decimal to int/float for JSON serialization."""
    from decimal import Decimal
    if isinstance(value, Decimal):
        return int(value) if value % 1 == 0 else float(value)
    if isinstance(value, list):
        return [_decimal_to_native(v) for v in value]
    if isinstance(value, dict):
        return {k: _decimal_to_native(v) for k, v in value.items()}
    return value


def get_all_sections() -> Dict[str, Any]:
    """Retrieve all sections."""
    try:
        # Scan for all items with item_type_item_id = "SECTION#METADATA"
        response = faq_table.scan(
            FilterExpression="item_type_item_id = :sk",
            ExpressionAttributeValues={
                ":sk": "SECTION#METADATA"
            }
        )
        items = response.get("Items", [])
        # Sort by order if exists, otherwise by section_name
        items_sorted = sorted(
            items,
            key=lambda x: (x.get("order", 999), x.get("section_name", ""))
        )
        items_native = [_decimal_to_native(i) for i in items_sorted]
        
        return {
            "statusCode": 200,
            "body": {
                "sections": [item.get("section_name") for item in items_native],
                "sectionsData": items_native
            }
        }
    except Exception as e:
        return {
            "statusCode": 500,
            "body": {"error": f"Failed to get sections: {str(e)}"}
        }


def create_section(section_name: str, order: Optional[int] = None, title: Optional[str] = None) -> Dict[str, Any]:
    """Create a new section."""
    if not section_name or not section_name.strip():
        return {"statusCode": 400, "body": {"error": "Section name is required"}}
    
    section_name = section_name.strip()
    
    try:
        # Check if section already exists
        existing = faq_table.get_item(
            Key={
                "section_name": section_name,
                "item_type_item_id": "SECTION#METADATA"
            }
        )
        if "Item" in existing:
            return {
                "statusCode": 400,
                "body": {"error": f"Section '{section_name}' already exists"}
            }
        
        timestamp = datetime.utcnow().isoformat() + "Z"
        item = {
            "section_name": section_name,
            "item_type_item_id": "SECTION#METADATA",
            "item_type": "section",
            "status": "active",
            "created_at": timestamp,
            "updated_at": timestamp
        }
        
        if order is not None:
            item["order"] = int(order)
        
        if title is not None and title.strip():
            item["title"] = title.strip()
        
        faq_table.put_item(Item=item)
        
        return {
            "statusCode": 200,
            "body": {
                "message": "Section created",
                "section": _decimal_to_native(item)
            }
        }
    except Exception as e:
        return {
            "statusCode": 500,
            "body": {"error": f"Failed to create section: {str(e)}"}
        }


def delete_section(section_name: str) -> Dict[str, Any]:
    """Delete a section. Only allowed if section has no FAQs."""
    if not section_name:
        return {"statusCode": 400, "body": {"error": "Section name is required"}}
    
    try:
        # Check if section exists
        section_res = faq_table.get_item(
            Key={
                "section_name": section_name,
                "item_type_item_id": "SECTION#METADATA"
            }
        )
        if "Item" not in section_res:
            return {
                "statusCode": 404,
                "body": {"error": f"Section '{section_name}' not found"}
            }
        
        # Check if section has FAQs
        faqs_res = faq_table.query(
            KeyConditionExpression=Key("section_name").eq(section_name) & Key("item_type_item_id").begins_with("FAQ#")
        )
        faqs = faqs_res.get("Items", [])
        
        if faqs:
            return {
                "statusCode": 400,
                "body": {
                    "error": f"Cannot delete section '{section_name}' because it contains {len(faqs)} FAQ(s)"
                }
            }
        
        # Delete section
        faq_table.delete_item(
            Key={
                "section_name": section_name,
                "item_type_item_id": "SECTION#METADATA"
            }
        )
        
        return {
            "statusCode": 200,
            "body": {"message": "Section deleted"}
        }
    except Exception as e:
        return {
            "statusCode": 500,
            "body": {"error": f"Failed to delete section: {str(e)}"}
        }


def update_section(section_name: str, title: Optional[str] = None, order: Optional[int] = None) -> Dict[str, Any]:
    """Update section metadata (title and/or order)."""
    if not section_name:
        return {"statusCode": 400, "body": {"error": "Section name is required"}}
    
    try:
        # Check if section exists
        section_res = faq_table.get_item(
            Key={
                "section_name": section_name,
                "item_type_item_id": "SECTION#METADATA"
            }
        )
        if "Item" not in section_res:
            return {
                "statusCode": 404,
                "body": {"error": f"Section '{section_name}' not found"}
            }
        
        # Build update expression
        set_parts = []
        remove_parts = []
        expr_attr_names = {}
        expr_attr_values = {}
        
        if title is not None:
            if title.strip():
                set_parts.append("#title = :title")
                expr_attr_names["#title"] = "title"
                expr_attr_values[":title"] = title.strip()
            else:
                # Remove title if empty string provided
                remove_parts.append("#title")
                expr_attr_names["#title"] = "title"
        
        if order is not None:
            set_parts.append("#order = :order")
            expr_attr_names["#order"] = "order"
            expr_attr_values[":order"] = int(order)
        
        if not set_parts and not remove_parts:
            return {
                "statusCode": 400,
                "body": {"error": "No fields to update. Provide title and/or order."}
            }
        
        # Add updated_at
        set_parts.append("#updated_at = :updated_at")
        expr_attr_names["#updated_at"] = "updated_at"
        expr_attr_values[":updated_at"] = datetime.utcnow().isoformat() + "Z"
        
        # Build UpdateExpression
        update_expression = "SET " + ", ".join(set_parts)
        if remove_parts:
            update_expression += " REMOVE " + ", ".join(remove_parts)
        
        # Update item
        update_params = {
            "Key": {
                "section_name": section_name,
                "item_type_item_id": "SECTION#METADATA"
            },
            "UpdateExpression": update_expression,
            "ExpressionAttributeNames": expr_attr_names,
            "ReturnValues": "ALL_NEW"
        }
        
        if expr_attr_values:
            update_params["ExpressionAttributeValues"] = expr_attr_values
        
        response = faq_table.update_item(**update_params)
        
        return {
            "statusCode": 200,
            "body": {
                "message": "Section updated",
                "section": _decimal_to_native(response.get("Attributes", {}))
            }
        }
    except Exception as e:
        return {
            "statusCode": 500,
            "body": {"error": f"Failed to update section: {str(e)}"}
        }


def get_faqs_by_section(section_name: Optional[str] = None) -> Dict[str, Any]:
    """Get FAQs. If section_name is provided, get FAQs for that section only. Otherwise get all FAQs grouped by section."""
    try:
        if section_name:
            # Get FAQs for specific section
            response = faq_table.query(
                KeyConditionExpression=Key("section_name").eq(section_name) & Key("item_type_item_id").begins_with("FAQ#")
            )
            items = response.get("Items", [])
            items_sorted = sorted(items, key=lambda x: x.get("order", 0))
            items_native = [_decimal_to_native(i) for i in items_sorted]
            
            return {
                "statusCode": 200,
                "body": {
                    "faqs": items_native,
                    "section": section_name
                }
            }
        else:
            # Get all FAQs grouped by section
            # First get all sections
            sections_res = get_all_sections()
            if sections_res["statusCode"] != 200:
                return sections_res
            
            sections = sections_res["body"]["sections"]
            all_faqs = {}
            
            for section in sections:
                faqs_res = faq_table.query(
                    KeyConditionExpression=Key("section_name").eq(section) & Key("item_type_item_id").begins_with("FAQ#")
                )
                faqs = faqs_res.get("Items", [])
                faqs_sorted = sorted(faqs, key=lambda x: x.get("order", 0))
                all_faqs[section] = [_decimal_to_native(f) for f in faqs_sorted]
            
            return {
                "statusCode": 200,
                "body": {
                    "faqsBySection": all_faqs
                }
            }
    except Exception as e:
        return {
            "statusCode": 500,
            "body": {"error": f"Failed to get FAQs: {str(e)}"}
        }


def create_faq(
    section_name: str,
    question: str,
    answer: str,
    order: int,
    status: str = "active"
) -> Dict[str, Any]:
    """Create a new FAQ."""
    if not section_name:
        return {"statusCode": 400, "body": {"error": "Section name is required"}}
    if not question or not question.strip():
        return {"statusCode": 400, "body": {"error": "Question is required"}}
    if not answer or not answer.strip():
        return {"statusCode": 400, "body": {"error": "Answer is required"}}
    if status not in ("active", "draft"):
        return {"statusCode": 400, "body": {"error": "Status must be 'active' or 'draft'"}}
    
    try:
        # Check if section exists
        section_res = faq_table.get_item(
            Key={
                "section_name": section_name,
                "item_type_item_id": "SECTION#METADATA"
            }
        )
        if "Item" not in section_res:
            return {
                "statusCode": 404,
                "body": {"error": f"Section '{section_name}' not found"}
            }
        
        faq_id = short_uuid()
        timestamp = datetime.utcnow().isoformat() + "Z"
        
        item = {
            "section_name": section_name,
            "item_type_item_id": f"FAQ#{faq_id}",
            "faq_id": faq_id,
            "question": question.strip(),
            "answer": answer.strip(),
            "section": section_name,
            "order": int(order),
            "status": status,
            "item_type": "faq",
            "likes": 0,
            "dislikes": 0,
            "created_at": timestamp,
            "updated_at": timestamp
        }
        
        faq_table.put_item(Item=item)
        
        return {
            "statusCode": 200,
            "body": {
                "message": "FAQ created",
                "faq": _decimal_to_native(item)
            }
        }
    except Exception as e:
        return {
            "statusCode": 500,
            "body": {"error": f"Failed to create FAQ: {str(e)}"}
        }


def update_faq(
    section_name: str,
    faq_id: str,
    update_data: Dict[str, Any]
) -> Dict[str, Any]:
    """Update an existing FAQ."""
    if not section_name or not faq_id:
        return {"statusCode": 400, "body": {"error": "Section name and FAQ ID are required"}}
    
    try:
        # Check if FAQ exists
        faq_res = faq_table.get_item(
            Key={
                "section_name": section_name,
                "item_type_item_id": f"FAQ#{faq_id}"
            }
        )
        if "Item" not in faq_res:
            return {
                "statusCode": 404,
                "body": {"error": "FAQ not found"}
            }
        
        # Build update expression
        update_expr_parts = []
        expr_attr_names = {}
        expr_attr_values = {}
        
        allowed_fields = ["question", "answer", "order", "status", "section"]
        for field in allowed_fields:
            if field in update_data:
                if field == "section":
                    # Section change requires moving the item
                    new_section = update_data["section"]
                    if new_section != section_name:
                        # Check new section exists
                        new_section_res = faq_table.get_item(
                            Key={
                                "section_name": new_section,
                                "item_type_item_id": "SECTION#METADATA"
                            }
                        )
                        if "Item" not in new_section_res:
                            return {
                                "statusCode": 404,
                                "body": {"error": f"Target section '{new_section}' not found"}
                            }
                        
                        # Get old item
                        old_item = faq_res["Item"]
                        # Create new item with new section_name
                        new_item = old_item.copy()
                        new_item["section_name"] = new_section
                        new_item["section"] = new_section
                        new_item["updated_at"] = datetime.utcnow().isoformat() + "Z"
                        
                        # Update fields
                        for k, v in update_data.items():
                            if k in allowed_fields and k != "section":
                                new_item[k] = v
                        
                        # Delete old item and create new one
                        faq_table.delete_item(
                            Key={
                                "section_name": section_name,
                                "item_type_item_id": f"FAQ#{faq_id}"
                            }
                        )
                        faq_table.put_item(Item=new_item)
                        
                        return {
                            "statusCode": 200,
                            "body": {
                                "message": "FAQ updated",
                                "faq": _decimal_to_native(new_item)
                            }
                        }
                else:
                    attr_name = f"#{field}"
                    attr_value = f":{field}"
                    update_expr_parts.append(f"{attr_name} = {attr_value}")
                    expr_attr_names[attr_name] = field
                    if field == "order":
                        expr_attr_values[attr_value] = int(update_data[field])
                    elif field == "status":
                        if update_data[field] not in ("active", "draft"):
                            return {
                                "statusCode": 400,
                                "body": {"error": "Status must be 'active' or 'draft'"}
                            }
                        expr_attr_values[attr_value] = update_data[field]
                    else:
                        expr_attr_values[attr_value] = str(update_data[field]).strip()
        
        if not update_expr_parts:
            return {
                "statusCode": 400,
                "body": {"error": "No valid fields to update"}
            }
        
        # Add updated_at
        update_expr_parts.append("#updated_at = :updated_at")
        expr_attr_names["#updated_at"] = "updated_at"
        expr_attr_values[":updated_at"] = datetime.utcnow().isoformat() + "Z"
        
        # Update item
        response = faq_table.update_item(
            Key={
                "section_name": section_name,
                "item_type_item_id": f"FAQ#{faq_id}"
            },
            UpdateExpression="SET " + ", ".join(update_expr_parts),
            ExpressionAttributeNames=expr_attr_names,
            ExpressionAttributeValues=expr_attr_values,
            ReturnValues="ALL_NEW"
        )
        
        return {
            "statusCode": 200,
            "body": {
                "message": "FAQ updated",
                "faq": _decimal_to_native(response.get("Attributes", {}))
            }
        }
    except Exception as e:
        return {
            "statusCode": 500,
            "body": {"error": f"Failed to update FAQ: {str(e)}"}
        }


def delete_faq(section_name: str, faq_id: str) -> Dict[str, Any]:
    """Delete an FAQ."""
    if not section_name or not faq_id:
        return {"statusCode": 400, "body": {"error": "Section name and FAQ ID are required"}}
    
    try:
        # Check if FAQ exists
        faq_res = faq_table.get_item(
            Key={
                "section_name": section_name,
                "item_type_item_id": f"FAQ#{faq_id}"
            }
        )
        if "Item" not in faq_res:
            return {
                "statusCode": 404,
                "body": {"error": "FAQ not found"}
            }
        
        # Delete FAQ
        faq_table.delete_item(
            Key={
                "section_name": section_name,
                "item_type_item_id": f"FAQ#{faq_id}"
            }
        )
        
        return {
            "statusCode": 200,
            "body": {"message": "FAQ deleted"}
        }
    except Exception as e:
        return {
            "statusCode": 500,
            "body": {"error": f"Failed to delete FAQ: {str(e)}"}
        }


def vote_faq(section_name: str, faq_id: str, vote_type: str) -> Dict[str, Any]:
    """Vote like or dislike for an FAQ."""
    if not section_name or not faq_id:
        return {"statusCode": 400, "body": {"error": "Section name and FAQ ID are required"}}
    if vote_type not in ("like", "dislike"):
        return {"statusCode": 400, "body": {"error": "Vote type must be 'like' or 'dislike'"}}
    
    try:
        # Check if FAQ exists
        faq_res = faq_table.get_item(
            Key={
                "section_name": section_name,
                "item_type_item_id": f"FAQ#{faq_id}"
            }
        )
        if "Item" not in faq_res:
            return {
                "statusCode": 404,
                "body": {"error": "FAQ not found"}
            }
        
        # Determine which field to increment
        field_to_increment = "likes" if vote_type == "like" else "dislikes"
        
        # Use ADD expression to increment the counter (creates field if it doesn't exist)
        response = faq_table.update_item(
            Key={
                "section_name": section_name,
                "item_type_item_id": f"FAQ#{faq_id}"
            },
            UpdateExpression=f"ADD #{field_to_increment} :inc",
            ExpressionAttributeNames={
                f"#{field_to_increment}": field_to_increment
            },
            ExpressionAttributeValues={
                ":inc": 1
            },
            ReturnValues="ALL_NEW"
        )
        
        updated_faq = response.get("Attributes", {})
        
        return {
            "statusCode": 200,
            "body": {
                "message": f"FAQ {vote_type}d successfully",
                "faq": _decimal_to_native(updated_faq)
            }
        }
    except Exception as e:
        return {
            "statusCode": 500,
            "body": {"error": f"Failed to vote FAQ: {str(e)}"}
        }

