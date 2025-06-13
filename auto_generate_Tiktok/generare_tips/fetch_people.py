import os
import requests
from openai import OpenAI
from dotenv import load_dotenv

# .envから環境変数を読み込み
load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def get_wikipedia_content(title, lang="ja"):
    """Wikipediaから記事本文を取得"""
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
    """ChatGPTを使って面白いエピソードを抽出・生成"""
    content = get_wikipedia_content(title)
    if not content:
        return f"{title} のWikipedia本文が見つかりませんでした。"

    truncated_content = content[:max_chars]
    prompt = f"""
以下は「{title}」に関するWikipediaの記事の内容です。

---本文ここから---
{truncated_content}
---本文ここまで---

この人物に関して、一般の人が「へぇ！」と思うような面白いエピソードを一つ、簡単に紹介してください。
できるだけ親しみやすく、短くまとめてください。
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

# ✅ テスト実行
if __name__ == "__main__":
    great_figures = [
        # 日本人20人
        "聖徳太子",
        "織田信長",
        "豊臣秀吉",
        "徳川家康",
        "坂本龍馬",
        "西郷隆盛",
        "勝海舟",
        "福沢諭吉",
        "野口英世",
        "夏目漱石",
        "森鷗外",
        "芥川龍之介",
        "本田宗一郎",
        "松下幸之助",
        "黒澤明",
        "宮崎駿",
        "北里柴三郎",
        "渋沢栄一",
        "東郷平八郎",
        "美空ひばり",

        # 外国人30人
        "イエス・キリスト",
        "ムハンマド",
        "仏陀（ガウタマ・シッダールタ）",
        "孔子",
        "アリストテレス",
        "プラトン",
        "ソクラテス",
        "アレクサンドロス大王",
        "ユリウス・カエサル",
        "ナポレオン・ボナパルト",
        "アブラハム・リンカーン",
        "ジョージ・ワシントン",
        "ウィンストン・チャーチル",
        "アドルフ・ヒトラー",
        "マハトマ・ガンディー",
        "ネルソン・マンデラ",
        "カール・マルクス",
        "レーニン",
        "トーマス・エジソン",
        "アルベルト・アインシュタイン",
        "アイザック・ニュートン",
        "チャールズ・ダーウィン",
        "ニコラ・テスラ",
        "マリー・キュリー",
        "モーツァルト",
        "レオナルド・ダ・ヴィンチ",
        "ミケランジェロ",
        "パブロ・ピカソ",
        "マザー・テレサ",
        "アンネ・フランク"
    ]

    name = great_figures[0]
    result = generate_fun_fact_from_wikipedia(name)
    print(f"\n📘 {name} の面白いエピソード:\n{result}")
