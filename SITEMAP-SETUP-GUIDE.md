# Sitemap Configuration Guide

## ✅ Current Setup

You now have a **multi-sitemap structure** properly configured:

### Main Domain (shramkavach.com):
- **sitemap.xml** - Contains all ShramKavach pages
- **sitemap-index.xml** - Master index referencing both sitemaps
- **robots.txt** - References all sitemaps

### Subdomain (scribbletools.shramkavach.com):
- **sitemap.xml** - Contains all 250+ ScribbleTools calculators
- **robots.txt** - References ScribbleTools sitemap

---

## 🚀 How to Submit to Google Search Console

### Option 1: Submit Each Sitemap Separately (RECOMMENDED)

**For ShramKavach:**
1. Go to [Google Search Console](https://search.google.com/search-console/)
2. Add property: `https://shramkavach.com`
3. Verify ownership
4. Go to Sitemaps → Submit: `https://shramkavach.com/sitemap.xml`

**For ScribbleTools:**
1. In Google Search Console
2. Add property: `https://scribbletools.shramkavach.com`
3. Verify ownership (add verification meta tag to scribbletools/index.html)
4. Go to Sitemaps → Submit: `https://scribbletools.shramkavach.com/sitemap.xml`

### Option 2: Use Sitemap Index (ADVANCED)

Submit the index file instead:
- Submit: `https://shramkavach.com/sitemap-index.xml`
- Google will automatically crawl both referenced sitemaps

---

## 📋 File Locations

```
/Users/mjaswanth/shram/
├── sitemap.xml                    # Main site pages
├── sitemap-index.xml              # Master index (NEW)
├── robots.txt                     # References all sitemaps
└── scribbletools/
    ├── sitemap.xml                # All 250+ tools
    └── robots.txt                 # References ScribbleTools sitemap
```

---

## 🔍 How Search Engines Will Discover Your Sitemaps

1. **Via robots.txt:**
   - Crawlers check `https://shramkavach.com/robots.txt`
   - Find 3 sitemap references
   - Crawl all of them

2. **Via Sitemap Index:**
   - If submitted, `sitemap-index.xml` tells Google about both sitemaps
   - Google automatically crawls both child sitemaps

3. **Direct Submission:**
   - You manually submit each sitemap in GSC
   - Most reliable method

---

## ✅ Verification Checklist

Test your sitemaps are accessible:

```bash
# Main sitemap
curl -I https://shramkavach.com/sitemap.xml

# Sitemap index
curl -I https://shramkavach.com/sitemap-index.xml

# ScribbleTools sitemap
curl -I https://scribbletools.shramkavach.com/sitemap.xml

# Main robots.txt
curl https://shramkavach.com/robots.txt

# ScribbleTools robots.txt
curl https://scribbletools.shramkavach.com/robots.txt
```

All should return 200 OK status.

---

## 📊 Best Practices

### For Multiple Sitemaps:

1. **Keep separate sitemaps** when you have:
   - Different subdomains
   - Different sections (blog, products, etc.)
   - More than 50,000 URLs in one sitemap
   - File size > 50MB

2. **Use sitemap index** when you have:
   - Multiple sitemaps to manage
   - Want centralized control
   - Complex site architecture

3. **Update dates regularly:**
   - Update `<lastmod>` when content changes
   - Helps Google prioritize crawling

---

## 🎯 Your Next Steps

1. **Deploy the changes:**
   ```bash
   git add -A
   git commit -m "Add sitemap index and update robots.txt"
   git push
   ```

2. **Wait for deployment** (1-2 minutes)

3. **Verify files are accessible** (use curl commands above)

4. **Submit to Google Search Console:**
   - Main site: `sitemap.xml` or `sitemap-index.xml`
   - ScribbleTools: `sitemap.xml` (as separate property)

5. **Monitor in GSC:**
   - Check "Coverage" report
   - Fix any errors
   - Monitor indexed pages

---

## 🆘 Troubleshooting

**Sitemap not found:**
- Check file is in root directory
- Verify deployment was successful
- Check file permissions

**Sitemap index not working:**
- Ensure child sitemaps are accessible
- Check XML format is valid
- Use [Sitemap Validator](https://www.xml-sitemaps.com/validate-xml-sitemap.html)

**Subdomain not indexed:**
- Verify subdomain separately in GSC
- Submit sitemap for subdomain
- Ensure DNS is properly configured

---

**Last Updated:** December 29, 2025
