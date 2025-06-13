import os
import requests
from openai import OpenAI
from dotenv import load_dotenv
import random

# .env読み込み & OpenAI初期化
load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def get_wikipedia_content(title, lang="ja"):
    endpoint = f"https://{lang}.wikipedia.org/w/api.php"
    params = {
        "action": "query",
        "prop": "extracts",
        "explaintext": True,
        "format": "json",
        "titles": title
    }
    res = requests.get(endpoint, params=params).json()
    page = next(iter(res['query']['pages'].values()))
    return page.get("extract", "")

def generate_fun_fact_from_wikipedia(title, max_chars=3000):
    content = get_wikipedia_content(title)
    if not content:
        return f"{title} のWikipedia本文が見つかりませんでした。"

    truncated_content = content[:max_chars]
    prompt = f"""
以下は「{title}」に関するWikipediaの記事の内容です。

---本文ここから---
{truncated_content}
---本文ここまで---

この食べ物について、一般の人が「へぇ！」と驚くような面白い誕生エピソードや由来を1つ紹介してください。
なるべく親しみやすく、シンプルに、そして読んで面白いと感じるように100字以内ででまとめてください。
"""

    try:
        response = client.chat.completions.create(
            model="gpt-4",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.7,
        )
        return response.choices[0].message.content
    except Exception as e:
        print(f"エラーが発生しました: {str(e)}")
        return f"{title} のエピソード生成中にエラーが発生しました。"

# ✅ 食べ物リスト
foods = [
    "金平糖", "カステラ", "天ぷら", "ボーロ", "カレーライス", "すき焼き", "ラーメン", "焼きそば",
    "おにぎり", "餅", "羊羹", "団子", "味噌", "醤油", "寿司", "天丼", "親子丼", "納豆", "たこ焼き", "お好み焼き",
    "バームクーヘン", "ドーナツ", "プリン", "モンブラン", "エクレア", "マシュマロ", "チョコレート",
    "キャラメル", "ポテトチップス", "アイスクリーム", "ヨーグルト", "ピザ", "ハンバーガー",
    "パン", "ビスケット", "スコーン", "ティラミス", "シュークリーム", "ワッフル", "ゼリー", "カップラーメン"
]

# ✅ 実行部分
if __name__ == "__main__":
    name = random.choice(foods)
    result = generate_fun_fact_from_wikipedia(name)
    print(f"\n🍽️ {name} の由来・誕生エピソード:\n{result}")
