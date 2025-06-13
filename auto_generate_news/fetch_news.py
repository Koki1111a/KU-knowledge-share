
import feedparser

# ✅ カテゴリ別RSSフィードURL（NHK）
CATEGORY_RSS = {
    "総合": "https://www3.nhk.or.jp/rss/news/cat0.xml",
    "社会": "https://www3.nhk.or.jp/rss/news/cat1.xml",
    "科学文化": "https://www3.nhk.or.jp/rss/news/cat2.xml",
    "政治": "https://www3.nhk.or.jp/rss/news/cat3.xml",
    "経済": "https://www3.nhk.or.jp/rss/news/cat4.xml",
    "国際": "https://www3.nhk.or.jp/rss/news/cat5.xml",
    "スポーツ": "https://www3.nhk.or.jp/rss/news/cat6.xml",
    "ITネット": "https://www3.nhk.or.jp/rss/news/cat7.xml",
    "医療健康": "https://www3.nhk.or.jp/rss/news/cat8.xml"
}

def fetch_latest_news(category="国際"):
    rss_url = CATEGORY_RSS.get(category)
    if not rss_url:
        raise ValueError(f"無効なカテゴリです：{category}")

    feed = feedparser.parse(rss_url)
    if not feed.entries:
        raise RuntimeError("ニュースが取得できませんでした")

    # 最新1件を取得
    entry = feed.entries[0]
    title = entry.title
    summary = entry.summary
    link = entry.link

    return {
        "title": title,
        "summary": summary,
        "link": link
    }

# 🔽 テスト実行
if __name__ == "__main__":
    category = "国際"  # ← ここを「政治」「経済」などに変更可能
    news = fetch_latest_news(category)
    print("📰 タイトル:", news["title"])
    print("📝 要約:", news["summary"])
    print("🔗 リンク:", news["link"])
