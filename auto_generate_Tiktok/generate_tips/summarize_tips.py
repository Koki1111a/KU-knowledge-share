import openai

# ✅ OpenAIのAPIキーをここに入れてください（または環境変数で管理）
from dotenv import load_dotenv
import os

load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

from openai import OpenAI
from dotenv import load_dotenv
import os

# .envからAPIキー読み込み
load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def summarize_for_tiktok(title: str, summary: str) -> str:
    prompt = (
        f"以下のニュースをTikTokで紹介するように、"
        f"カジュアルな日本語で30秒以内に要約してください。\n\n"
        f"【タイトル】：{title}\n"
        f"【本文】：{summary}\n\n"
        f"→ ポイント：カジュアルで話しかけるようなトーンで"
    )

    chat_completion = client.chat.completions.create(
        model="gpt-4",
        messages=[{"role": "user", "content": prompt}]
    )
    return chat_completion.choices[0].message.content


# 🔽 テスト用（fetch_newsと連携する場合）
if __name__ == "__main__":
    from fetch_tips import fetch_latest_news

    news = fetch_latest_news("国際")
    print("📰 タイトル:", news["title"])
    print("📝 元要約:", news["summary"])
    
    summary = summarize_for_tiktok(news["title"], news["summary"])
    print("\n🎙 TikTok向けナレーション：\n", summary)
