#!/usr/bin/env python3
"""
News Fetcher for Shram Kavach
Fetches labor law, gig economy, and worker rights news from Indian sources
"""

import feedparser
import json
import os
from datetime import datetime
from pathlib import Path

# RSS feeds for Indian labor law and worker rights news
RSS_FEEDS = [
    {
        "name": "The Hindu - Labour",
        "url": "https://www.thehindu.com/news/national/feeder/default.rss",
        "keywords": ["labour", "labor", "worker", "gig", "employment", "wages", "pf", "epfo", "gratuity"]
    },
    {
        "name": "Economic Times - Labour",
        "url": "https://economictimes.indiatimes.com/jobs/rssfeedsdefault.cms",
        "keywords": ["labour", "labor", "worker", "gig", "employment", "freelance", "contractor"]
    },
    {
        "name": "Business Standard",
        "url": "https://www.business-standard.com/rss/home_page_top_stories.rss",
        "keywords": ["labour", "labor", "worker", "gig", "employment", "social security"]
    }
]

def fetch_rss_news(feed_config, max_items=5):
    """Fetch and filter news from an RSS feed"""
    try:
        feed = feedparser.parse(feed_config['url'])
        news_items = []
        
        for entry in feed.entries[:20]:  # Check first 20 items
            title = entry.get('title', '').lower()
            description = entry.get('summary', entry.get('description', '')).lower()
            
            # Check if any keyword matches
            if any(keyword in title or keyword in description for keyword in feed_config['keywords']):
                news_items.append({
                    'title': entry.get('title', 'No Title'),
                    'description': entry.get('summary', entry.get('description', ''))[:200] + '...',
                    'link': entry.get('link', ''),
                    'published': entry.get('published', ''),
                    'source': feed_config['name']
                })
                
                if len(news_items) >= max_items:
                    break
                    
        return news_items
    except Exception as e:
        print(f"Error fetching {feed_config['name']}: {e}")
        return []

def main():
    """Main function to fetch and save news"""
    all_news = []
    
    print("Fetching news from RSS feeds...")
    for feed_config in RSS_FEEDS:
        print(f"Fetching from {feed_config['name']}...")
        news = fetch_rss_news(feed_config)
        all_news.extend(news)
        print(f"  Found {len(news)} relevant articles")
    
    # Sort by most recent
    all_news = sorted(all_news, key=lambda x: x.get('published', ''), reverse=True)
    
    # Take top 15 articles
    all_news = all_news[:15]
    
    # Prepare data structure
    news_data = {
        'last_updated': datetime.now().isoformat(),
        'count': len(all_news),
        'articles': all_news
    }
    
    # Save to JSON file
    data_dir = Path(__file__).parent.parent / 'data'
    data_dir.mkdir(exist_ok=True)
    
    output_file = data_dir / 'news.json'
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(news_data, f, indent=2, ensure_ascii=False)
    
    print(f"\n✅ Successfully fetched {len(all_news)} articles")
    print(f"📁 Saved to {output_file}")

if __name__ == '__main__':
    main()
