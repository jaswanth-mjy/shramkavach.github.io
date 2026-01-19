# Article Update Checklist & Process Documentation

## Complete Update Process (Last Updated: Jan 15, 2026)

### STEP 1: Article File Preparation
- [x] Create new article HTML file with proper naming: `{topic}-{date}.html` or `{topic}-dd-mm-yy.html`
- [x] Fix canonical URLs in article to match actual filename
- [x] Fix Open Graph URLs
- [x] Fix structured data schema URLs (mainEntityOfPage)
- [x] Fix breadcrumb URLs
- [x] Add Google AdSense code to head section (after canonical URL, before title)
- [x] Add Contact Us link to footer (Legal & Trust section)

### STEP 2: Data Files Update
- [x] **articles-database.json** (data/articles-database.json)
  - Add new article at TOP of array with priority 1
  - Increment all other priorities by 1
  - Include all fields: id, title, shortTitle, url, icon, date, displayDate, category, tags, readTime, excerpt, featured, priority

- [x] **updates-manager.js** (js/updates-manager.js)
  - Add new article at TOP of articlesDatabase array
  - Include all fields: id, title, shortTitle, excerpt, date, displayDate, category, tags, tagColors, readTime, author, icon, gradient, borderColor, stats[], link, featured

### STEP 3: Homepage Updates (index.html)
- [x] Update Featured Article #1 in "Latest Updates & News" section (~line 777)
  - Change article card styling (gradient, colors)
  - Update title
  - Update excerpt
  - Update date
  - Update link
  
- [x] Update Latest Updates Banner (~line 513)
  - Change text from old article to new article
  - Update date
  - Update keywords

### STEP 4: Updates Page (updates.html)
- [x] Update Breaking News Ticker (~line 258)
  - Add new article at beginning
  - Duplicate for continuous scroll effect
  
- [x] Update Header Date (~line 285)
  - Change date to match new article date
  
- [x] Update Hero Featured Section (~line 302)
  - Change background gradient colors
  - Update category tags
  - Update title
  - Update excerpt
  - Update date
  - Update link
  - Update read time
  - Update stats boxes (4 key points)

### STEP 5: Other Main Pages - Latest Updates Banner
- [x] **calculators.html** (~line 399)
- [x] **prompts.html** (~line 214)
- [x] **protection.html** (~line 173)
Update banner text with new article summary

### STEP 6: Sitemap (sitemap.xml)
- [x] Add new article entry at TOP of "Article Pages" section
- [x] Set priority to 0.95 (highest for articles)
- [x] Set lastmod to current date
- [x] Set changefreq to "monthly"

### STEP 7: Verification
- [x] All file links point to correct filename
- [x] No broken links
- [x] Priority numbering is sequential in articles-database.json
- [x] Sidebar articles will auto-update (uses articles-database.json)
- [x] Latest Headlines will auto-update (uses updates-manager.js)

---

## Files Modified Per Update

### Always Update (11 files):
1. `{new-article}.html` - The new article file
2. `data/articles-database.json` - For sidebar articles
3. `js/updates-manager.js` - For updates page content
4. `index.html` - Featured article + banner
5. `updates.html` - Ticker + header date + hero section
6. `calculators.html` - Banner only
7. `prompts.html` - Banner only
8. `protection.html` - Banner only
9. `sitemap.xml` - Add new article URL
10. Previous article (if needed) - Remove classification banners or fix issues
11. `ARTICLE_UPDATE_CHECKLIST.md` - Update this checklist

### Auto-Updated via JavaScript:
- All article pages sidebar (via sidebar-articles-loader.js reading articles-database.json)
- Updates page "Latest Headlines" section (via updates-manager.js)
- Updates page "All Articles" sidebar (via updates-manager.js)

---

## Commits Made (Jan 15, 2026 Session)

1. **694346b** - Add Contact Us link to footer of all main pages
2. **e45663f** - Update site with Jan 15 Global Strategic Assessment article
3. **898ce40** - Update featured hero section on updates.html with Jan 15 article
4. **114e899** - Add Jan 15 article to updates-manager.js for dynamic content
5. **69b4058** - Update Latest Updates banner on all main pages to Jan 15 article
6. **8b5f5f9** - Remove classification banner from Jan 14 article
7. **6c8f3cc** - Create ARTICLE_UPDATE_CHECKLIST.md with complete process documentation

## Commits Made (Jan 16, 2026 Session)

8. **49a38d7** - Jan 16 article integration: Add Intelligence Assessment - Agentic AI, Parloa, ISS, Digital Sovereignty
   - Added Contact Us link to article footer
   - Updated articles-database.json with Jan 16 article (priority 1)
   - Updated updates-manager.js with Jan 16 article
   - Updated index.html featured article and banner
   - Updated updates.html ticker, date, and hero section
   - Updated banners on calculators.html, prompts.html, protection.html
   - Added to sitemap.xml

## Commits Made (Jan 17, 2026 Session)

9. **1f1ccdb** - Jan 17 article integration: Technology, Gaming & Science Intelligence Report
   - Added Contact Us link to article footer
   - Updated articles-database.json with Jan 17 article (priority 1)
   - Updated updates-manager.js with Jan 17 article
   - Updated index.html featured article and banner (teal-cyan-blue gradient)
   - Updated updates.html ticker, date (Jan 17), and hero section
   - Updated banners on calculators.html, prompts.html, protection.html
   - Added to sitemap.xml

## Commits Made (Jan 18, 2026 Session)

10. **83510c4** - Jan 18 article integration: The Sunday Fracture - WEF, Atmospheric Separation, Cultural Dynamics
   - Added Contact Us link to article footer
   - Updated articles-database.json with Jan 18 article (priority 1)
   - Updated updates-manager.js with Jan 18 article
   - Updated index.html featured article and banner (red-orange-yellow gradient)
   - Updated updates.html ticker, date (Jan 18), and hero section
   - Updated banners on calculators.html, prompts.html, protection.html
   - Added to sitemap.xml

11. **21e7acd** - Add Google AdSense code to Jan 18 article and update checklist
   - Added AdSense script to head section
   - Updated checklist to include AdSense as standard step

## Commits Made (Jan 19, 2026 Session)

12. **ac62638** - Jan 19 article integration: Global Convergence - Greenland Crisis, Markets, Davos, Iranian Protests
   - Added AdSense code and Contact Us link to article footer
   - Updated articles-database.json with Jan 19 article (priority 1)
   - Updated updates-manager.js with Jan 19 article and stats
   - Updated index.html featured article and banner (orange-amber-yellow gradient)
   - Updated updates.html ticker, date (Jan 19), and hero section
   - Updated banners on calculators.html, prompts.html, protection.html
   - Added to sitemap.xml

---

## Template for Next Article Update

### Quick Reference:
```bash
# New article filename format
{topic}-{dd-mm-yy}.html  # or
{topic}-{date}.html

# Priority assignment
New article: priority 1
Previous articles: increment by 1

# Gradient themes used
Jan 19: orange-amber-yellow (Global Convergence)
Jan 18: red-orange-yellow (Global Analysis)
Jan 17: teal-cyan-blue (Technology Intelligence)
Jan 16: purple-blue-indigo (Intelligence Assessment)
Jan 15: emerald-teal-cyan (Strategic Assessment)
Jan 14: red-purple-indigo (Intelligence)
Jan 13: red-yellow-purple (Global Situation)
Jan 12: red-purple-blue (Institutional Crisis)

# Banner text format
"Latest: Jan {DD} {Type} - {Key Point 1} | {Key Point 2} | {Key Point 3} | {Key Point 4}"
```

---

## Common Issues & Fixes

1. **Duplicate priorities**: Always check and renumber sequentially
2. **Wrong canonical URLs**: Match actual filename exactly
3. **Missing Contact Us link**: Add to footer Legal & Trust section
4. **Classification banners**: Remove if not needed
5. **Broken links**: Verify all article files exist before linking

---

## Next Article Checklist (To Do):

When adding next article (e.g., Jan 20, 2026):

- [ ] Create new article HTML file
- [ ] Fix all internal URLs in article
- [ ] Add Google AdSense code to head section
- [ ] Add Contact Us link to footer
- [ ] Add to articles-database.json (priority 1)
- [ ] Add to updates-manager.js (top of array)
- [ ] Update index.html featured article
- [ ] Update index.html banner
- [ ] Update updates.html ticker
- [ ] Update updates.html header date
- [ ] Update updates.html hero section
- [ ] Update calculators.html banner
- [ ] Update prompts.html banner
- [ ] Update protection.html banner
- [ ] Add to sitemap.xml
- [ ] Commit and push changes
- [ ] Update this checklist
- [ ] Update protection.html banner
- [ ] Add to sitemap.xml (priority 0.95)
- [ ] Commit with descriptive message
- [ ] Update this checklist
