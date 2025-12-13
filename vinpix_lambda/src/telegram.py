import json
import os
import urllib.parse
import urllib.request


def send_message(message: str) -> dict:
    token = "7853837542:AAFinqoaZur1Px7idI6ExxjCFx68e3j5yAk"
    chat_id = "5468319786"

    if not token or not chat_id:
        raise ValueError("Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID")

    base_url = f"https://api.telegram.org/bot{token}/sendMessage"
    params = {
        "chat_id": chat_id,
        "text": message,
    }

    url = f"{base_url}?{urllib.parse.urlencode(params)}"

    with urllib.request.urlopen(url, timeout=5) as response:
        data = response.read().decode("utf-8")
        return json.loads(data)
