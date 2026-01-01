# Google Indexing Guide for ShramKavach

## Current Status
✅ Indexed: shramkavach.com, calculators.html  
❌ Not Indexed: Other pages (prompts, protection, updates, articles)

## Quick Fixes to Get Pages Indexed

### 1. Submit URLs via Google Search Console (FASTEST METHOD)

**Step-by-step:**
1. Go to https://search.google.com/search-console
2. Select your property (shramkavach.com)
3. Click "URL Inspection" in left sidebar
4. Enter full URL (e.g., https://shramkavach.com/prompts.html)
5. Click "Request Indexing"
6. Repeat for all important pages

**Priority order to submit:**
```
https://shramkavach.com/prompts.html
https://shramkavach.com/protection.html
https://shramkavach.com/updates.html
https://shramkavach.com/freelancer-tax-2025.html
https://shramkavach.com/financial-calculators-2025.html
https://shramkavach.com/social-security-2025.html
https://shramkavach.com/gratuity-rule-2025.html
```

### 2. Add Internal Links on Homepage

Make sure every important page has a clickable link on index.html. Google follows links to discover pages.

**Current links to check:**
- ✅ Calculators (linked)
- ✅ Prompts (linked in navigation)
- ✅ Protection (linked)
- ❓ Updates (check if prominent enough)
- ❓ Article pages (add "Latest Updates" section on homepage)

### 3. Create XML Sitemap Ping

Force Google to re-crawl sitemap:

```bash
# Ping Google
curl "https://www.google.com/ping?sitemap=https://shramkavach.com/sitemap.xml"

# Ping Bing
curl "https://www.bing.com/ping?sitemap=https://shramkavach.com/sitemap.xml"
```

### 4. Check robots.txt

Your robots.txt is correct:
```
User-agent: *
Allow: /
Sitemap: https://shramkavach.com/sitemap.xml
```

### 5. Verify Meta Tags

Each page should have:
```html
<meta name="robots" content="index, follow">
<link rel="canonical" href="https://shramkavach.com/page.html">
```

### 6. Build Backlinks

Create links from external sources:
- Share on social media (Twitter, LinkedIn, Facebook)
- Submit to web directories
- Post on Reddit (r/India, r/IndianWorkplace, r/LegalAdviceIndia)
- Answer questions on Quora with links
- Write guest posts

### 7. Improve Page Quality (Google's Criteria)

**Content Quality:**
- ✅ Unique, valuable content
- ✅ Proper headings (H1, H2, H3)
- ✅ Long-form content (500+ words)
- ✅ Mobile-friendly

**Technical SEO:**
- ✅ Fast loading speed
- ✅ HTTPS enabled
- ✅ Structured data (Schema.org)
- ✅ Clean URLs

### 8. Monitor Indexing Status

**Check coverage in Search Console:**
1. Go to Coverage report
2. Look for "Discovered - currently not indexed"
3. Click on each error to see specific issues

**Common reasons pages aren't indexed:**
- Noindex tag (check each HTML file)
- Duplicate content
- Low-quality content
- Server errors (check logs)
- Crawl budget (too many pages, Google indexes slowly)

### 9. Speed Up Indexing with IndexNow

Submit to IndexNow API (Bing, Yandex):

```bash
curl -X POST "https://api.indexnow.org/indexnow" \
  -H "Content-Type: application/json" \
  -d '{
    "host": "shramkavach.com",
    "key": "YOUR_INDEXNOW_KEY",
    "keyLocation": "https://shramkavach.com/YOUR_KEY.txt",
    "urlList": [
      "https://shramkavach.com/prompts.html",
      "https://shramkavach.com/protection.html",
      "https://shramkavach.com/updates.html"
    ]
  }'
```

### 10. Create Fresh Content Regularly

Google prioritizes sites with fresh content:
- ✅ Your daily sitemap update (good!)
- Add new articles weekly
- Update existing pages monthly
- Add "Last Updated" dates

## Automation Script

Run this script to submit all pages to Google:

```bash
#!/bin/bash

# List of all pages
PAGES=(
  "prompts.html"
  "protection.html"
  "updates.html"
  "generator.html"
  "freelancer-tax-2025.html"
  "financial-calculators-2025.html"
  "social-security-2025.html"
  "gratuity-rule-2025.html"
  "platform-fees-2025.html"
  "section-44ada-2025.html"
  "epfo-gig-workers-2025.html"
  "minimum-wage-2025.html"
  "health-insurance-2025.html"
  "gst-threshold-2025.html"
  "year-end-2025.html"
)

echo "Submit these URLs manually in Google Search Console:"
for page in "${PAGES[@]}"; do
  echo "https://shramkavach.com/$page"
done
```

## Timeline Expectations

- **Immediate (same day):** Request indexing via Search Console
- **1-3 days:** Google crawls and evaluates
- **1 week:** Most pages should appear in index
- **2 weeks:** Full indexing of all quality pages
- **1 month:** Ranking improvements

## Troubleshooting

**If pages still not indexed after 2 weeks:**

1. Check Google Search Console > Coverage > Excluded
2. Look for specific error messages
3. Fix issues listed
4. Re-submit URLs

**Common fixes:**
- Remove any `<meta name="robots" content="noindex">` tags
- Ensure canonical URLs are correct
- Fix broken internal links
- Add more unique content (500+ words minimum)
- Get at least 1-2 external backlinks per page

## Need Help?

Submit indexing status via Search Console and wait 48-72 hours. If pages still not indexed, check:
- Coverage report errors
- Manual Actions (penalties)
- Server logs for Googlebot access

Good luck! 🚀
