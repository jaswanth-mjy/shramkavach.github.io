#!/usr/bin/env python3
import json

# Read current database
with open('data/articles-database.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Create new article entry
new_article = {
    "title": "Structural Divergence and the Agentic Frontier: Global Finance & Technology",
    "shortTitle": "Structural Divergence: Markets, AI & Agentic Feb 16",
    "url": "structural-divergence-agentic-frontier-feb16-2026.html",
    "date": "February 16, 2026",
    "displayDate": "Feb 16, 2026",
    "category": "strategic-intelligence",
    "readTime": "32 min read",
    "icon": "🔀",
    "excerpt": "SENSEX +0.79% recovery, NIFTY IT -9% weekly repricing, $2.52T AI enterprise spending, Claude 4.5 30-hour autonomous coding. Comprehensive analysis of market divergence, agentic AI transformation, workforce displacement, and structural technology shifts.",
    "tags": [
        "🔀 STRUCTURAL DIVERGENCE",
        "🤖 AGENTIC AI",
        "📊 IT REPRICING",
        "💼 WORKFORCE SHIFT"
    ],
    "priority": 1
}

# Insert at the beginning
data['articles'].insert(0, new_article)

# Write back
with open('data/articles-database.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print(f"✅ Added Feb 16 article. Total: {len(data['articles'])} articles")
print(f"First article: {data['articles'][0]['shortTitle']}")
print(f"Second article: {data['articles'][1]['shortTitle']}")
