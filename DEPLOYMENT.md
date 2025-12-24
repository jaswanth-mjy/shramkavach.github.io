# ShramKavach Deployment Checklist

## Pre-Deployment Checklist

### Code Quality
- [x] Remove all console.log statements from production code
- [x] Remove test files (test-modal.html, test-click.html)
- [x] Verify all links work correctly
- [x] Test mobile navigation on all pages
- [x] Check all calculators function properly
- [x] Verify AI prompts load from all JSON files

### Performance
- [x] Enable compression (gzip/brotli)
- [x] Set browser caching headers
- [x] Optimize images (if any large files exist)
- [x] Minify CSS/JS (optional - using CDN Tailwind)
- [x] Service Worker configured for offline support

### Security
- [x] Security headers configured (CSP, X-Frame-Options, etc.)
- [x] HTTPS enforcement ready (commented in .htaccess)
- [x] No sensitive data in code
- [x] robots.txt configured
- [x] .gitignore updated

### SEO
- [x] Meta tags on all pages (7 pages)
- [x] Structured data (Schema.org) implemented
- [x] Sitemap.xml updated with all pages
- [x] robots.txt allows search engines
- [x] Clean URLs configured
- [x] 404 page created

### PWA Requirements
- [x] manifest.json configured
- [x] Service Worker registered
- [x] App icons defined
- [x] Offline support enabled
- [x] Mobile-responsive design

### Content
- [x] All pages have proper titles
- [x] All pages have meta descriptions
- [x] Navigation working on desktop
- [x] Navigation working on mobile
- [x] Footer with proper links
- [x] Contact information available

## Deployment Steps

### 1. Final Testing
```bash
# Start local server
python3 -m http.server 8000

# Test all pages:
# - http://localhost:8000/
# - http://localhost:8000/calculators.html
# - http://localhost:8000/prompts.html
# - http://localhost:8000/protection.html
# - http://localhost:8000/history.html
# - http://localhost:8000/updates.html
# - http://localhost:8000/generator.html
```

### 2. Remove Test Files
```bash
rm test-modal.html
rm test-click.html
```

### 3. Deploy to Production
Choose your hosting platform:

#### Option A: Vercel
```bash
npm install -g vercel
vercel --prod
```

#### Option B: Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod
```

#### Option C: Traditional Hosting (cPanel/FTP)
1. Upload all files via FTP
2. Ensure .htaccess is uploaded
3. Set file permissions (644 for files, 755 for directories)
4. Test all pages after upload

### 4. Post-Deployment
- [ ] Test website on production URL
- [ ] Verify HTTPS is working
- [ ] Test mobile navigation
- [ ] Test calculators functionality
- [ ] Verify prompts load correctly
- [ ] Check Google Search Console
- [ ] Submit sitemap to search engines
- [ ] Test PWA installation on mobile
- [ ] Monitor for any errors

### 5. Configure DNS (if needed)
- Point domain to hosting provider
- Wait for DNS propagation (24-48 hours)
- Verify SSL certificate is active

### 6. Monitoring Setup
- Set up uptime monitoring (UptimeRobot, Pingdom)
- Configure error logging
- Set up Google Analytics (optional)
- Monitor Core Web Vitals

## Production URLs to Test
- Homepage: https://shramkavach.com/
- Calculators: https://shramkavach.com/calculators.html
- Prompts: https://shramkavach.com/prompts.html
- Protection: https://shramkavach.com/protection.html
- History: https://shramkavach.com/history.html
- Updates: https://shramkavach.com/updates.html
- Generator: https://shramkavach.com/generator.html
- Sitemap: https://shramkavach.com/sitemap.xml
- Robots: https://shramkavach.com/robots.txt

## Performance Benchmarks
Run these tests after deployment:
- Google PageSpeed Insights
- GTmetrix
- WebPageTest
- Lighthouse (Chrome DevTools)

Target Scores:
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 100

## Rollback Plan
If issues occur:
1. Keep previous version backup
2. Revert DNS or hosting changes
3. Deploy previous stable version
4. Investigate and fix issues locally
5. Redeploy when ready
