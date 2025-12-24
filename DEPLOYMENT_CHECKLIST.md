# ShramSetu - Pre-Launch Checklist

Use this checklist before deploying to production.

## 🧪 Testing Checklist

### Core Functionality
- [ ] **Gratuity Calculator**
  - [ ] Fixed-term (12 months minimum) works
  - [ ] Regular (60 months minimum) works
  - [ ] Correct formula: (Basic/26) × 15 × Years
  - [ ] Results display properly
  - [ ] WhatsApp share button works

- [ ] **Social Security Calculator**
  - [ ] Platform selection works
  - [ ] Calculation respects 5% cap
  - [ ] Benefit breakdown displays
  - [ ] Insurance affiliate widget shows

- [ ] **Tax Comparator**
  - [ ] Section 44ADA (50% presumption) works
  - [ ] Old regime calculation accurate
  - [ ] New regime calculation accurate
  - [ ] Recommendation logic correct

- [ ] **Privacy Policy Generator**
  - [ ] All form fields required
  - [ ] DPDP Act sections cited correctly
  - [ ] Copy to clipboard works
  - [ ] Download HTML works
  - [ ] No data sent to server (verify in Network tab)

- [ ] **Contract Builder**
  - [ ] All fields validate
  - [ ] PDF generation works
  - [ ] Payment terms correctly displayed
  - [ ] Copyright clauses accurate

- [ ] **Prompt Library**
  - [ ] Prompts load from JSON
  - [ ] Search works in real-time
  - [ ] Category filter works
  - [ ] Language filter works
  - [ ] Copy to clipboard works
  - [ ] Toast notification appears

### Multi-Language Support
- [ ] **Hindi (हिंदी)**
  - [ ] All UI elements translated
  - [ ] Calculator labels in Hindi
  - [ ] Results display in Hindi

- [ ] **English**
  - [ ] Complete English version works
  - [ ] Professional tone maintained

- [ ] **Tamil (தமிழ்)**
  - [ ] All translations present
  - [ ] Tamil script renders correctly

- [ ] **Marathi (मराठी)**
  - [ ] All translations present
  - [ ] Marathi script renders correctly

- [ ] **Language Switching**
  - [ ] Toggle works on all pages
  - [ ] Preference persists (localStorage)
  - [ ] No page reload required

### Responsive Design
- [ ] **Desktop (1920x1080)**
  - [ ] Layout looks professional
  - [ ] No horizontal scroll
  - [ ] All sections visible

- [ ] **Tablet (768x1024)**
  - [ ] Grid collapses appropriately
  - [ ] Touch targets are large enough
  - [ ] Navigation works

- [ ] **Mobile (375x667)**
  - [ ] Single column layout
  - [ ] Text is readable (16px minimum)
  - [ ] Forms are usable
  - [ ] No tiny click targets

### Browser Compatibility
- [ ] **Chrome** (Latest)
- [ ] **Firefox** (Latest)
- [ ] **Safari** (iOS & macOS)
- [ ] **Edge** (Latest)
- [ ] **Chrome Mobile** (Android)

### Performance
- [ ] **Lighthouse Audit** (Chrome DevTools)
  - [ ] Performance: 90+
  - [ ] Accessibility: 85+
  - [ ] Best Practices: 90+
  - [ ] SEO: 90+

- [ ] **Load Time**
  - [ ] First Contentful Paint: <2s
  - [ ] Time to Interactive: <3s
  - [ ] Total page size: <1MB

## 🔐 Security Checklist

### Client-Side Security
- [ ] No sensitive data in localStorage
- [ ] No API keys in frontend code
- [ ] All external links use `rel="noopener"`
- [ ] Forms validate input (no XSS vectors)

### Deployment Security
- [ ] HTTPS enforced (Netlify/Vercel automatic)
- [ ] Security headers configured (netlify.toml)
- [ ] No directory listing enabled
- [ ] .gitignore excludes sensitive files

## 📝 Content Checklist

### SEO Optimization
- [ ] **Meta Tags**
  - [ ] Title tags (<60 characters)
  - [ ] Description tags (<160 characters)
  - [ ] Keywords relevant to target audience
  - [ ] Open Graph tags for social sharing

- [ ] **Content**
  - [ ] Headings use proper hierarchy (H1 → H2 → H3)
  - [ ] Alt text for all images (if added)
  - [ ] Internal links work
  - [ ] No broken links

### Legal & Compliance
- [ ] **Disclaimer**
  - [ ] "Informational purposes only" stated
  - [ ] "Consult professionals" recommended
  - [ ] Footer disclaimer visible

- [ ] **Affiliate Disclosure**
  - [ ] Affiliate links clearly marked
  - [ ] "Support ShramSetu" messaging
  - [ ] No misleading claims

## 💰 Monetization Checklist

### Affiliate Integration
- [ ] **Placeholder Links Replaced**
  - [ ] CreditSea/Paisabazaar (loan widget)
  - [ ] Acko/Zuno (insurance widget)
  - [ ] Jupiter/Open (neo-banking widget)
  - [ ] Writesonic/Rytr (AI tools CTA)

- [ ] **Tracking Setup**
  - [ ] Affiliate IDs added to URLs
  - [ ] UTM parameters configured
  - [ ] Conversion tracking ready

### Analytics (Optional but Recommended)
- [ ] Google Analytics installed
- [ ] Event tracking configured
  - [ ] Calculator usage
  - [ ] Policy generation
  - [ ] Prompt copies
  - [ ] Affiliate clicks

## 🚀 Deployment Checklist

### Pre-Deployment
- [ ] **Git Repository**
  - [ ] All files committed
  - [ ] .gitignore configured
  - [ ] README.md updated
  - [ ] No large files (>10MB)

- [ ] **Environment**
  - [ ] No localhost URLs in code
  - [ ] No console.log() in production (or remove sensitive logs)
  - [ ] No dev dependencies in production

### Netlify Deployment
- [ ] Account created
- [ ] GitHub repo connected
- [ ] Build settings verified (static site)
- [ ] Custom domain added
- [ ] DNS configured (A/CNAME records)
- [ ] SSL certificate issued (automatic)

### Vercel Deployment
- [ ] Account created
- [ ] GitHub repo connected
- [ ] Project imported
- [ ] Custom domain added
- [ ] DNS configured
- [ ] SSL certificate issued (automatic)

### Domain Configuration
- [ ] .in domain purchased
- [ ] DNS propagated (24-48 hours)
- [ ] www redirect configured
- [ ] HTTPS enforced

## 📊 Post-Launch Checklist

### Search Engine Submission
- [ ] **Google**
  - [ ] Google Search Console account
  - [ ] Sitemap submitted
  - [ ] Domain ownership verified
  - [ ] Request indexing

- [ ] **Bing**
  - [ ] Bing Webmaster Tools account
  - [ ] Sitemap submitted

### Social Media Setup
- [ ] **Facebook**
  - [ ] Business page created
  - [ ] Profile picture & cover photo
  - [ ] About section filled
  - [ ] First post published

- [ ] **Instagram** (Optional)
  - [ ] Business account created
  - [ ] Bio optimized with link
  - [ ] First post published

- [ ] **WhatsApp** (Critical for Bharat)
  - [ ] Business account (if needed)
  - [ ] Status template ready
  - [ ] Share messages crafted

### Marketing Preparation
- [ ] **Paid Ads Budget**
  - [ ] ₹2,500 allocated for Facebook Ads
  - [ ] Target cities selected (Tier-2/3)
  - [ ] Ad creatives designed
  - [ ] Landing page URL finalized

- [ ] **Content Marketing**
  - [ ] First 5 blog posts planned (SEO)
  - [ ] YouTube shorts script written
  - [ ] Gig worker Facebook groups identified

### Monitoring & Maintenance
- [ ] **Uptime Monitoring**
  - [ ] UptimeRobot or similar configured
  - [ ] Alert email set up

- [ ] **Error Tracking** (Optional)
  - [ ] Sentry or LogRocket configured
  - [ ] Error alerts set up

- [ ] **Regular Updates**
  - [ ] Calendar reminder for quarterly tax slab updates
  - [ ] Labour code amendment monitoring
  - [ ] Monthly prompt additions scheduled

## ✅ Final Sign-Off

**Pre-Launch Testing Completed**: [ ] Yes / [ ] No  
**Security Review Completed**: [ ] Yes / [ ] No  
**Affiliate Links Verified**: [ ] Yes / [ ] No  
**Domain Ready**: [ ] Yes / [ ] No  

**Deployment Target Date**: _________________

**Deployed URL**: _________________

**Google Analytics ID**: _________________

---

## 🎉 Launch Day Tasks

1. [ ] Deploy to production
2. [ ] Verify site is live
3. [ ] Test all calculators on production URL
4. [ ] Submit to Google Search Console
5. [ ] Announce on personal social media
6. [ ] Post in 5 gig worker Facebook groups
7. [ ] Share first WhatsApp status
8. [ ] Email 10 friends for feedback
9. [ ] Monitor Google Analytics (first 24 hours)
10. [ ] Celebrate! 🎊

---

**Remember**: Launch imperfect, iterate fast. The perfect is the enemy of the good.

**Launch Mantra**: "Built with ❤️ for Bharat's Workforce"
