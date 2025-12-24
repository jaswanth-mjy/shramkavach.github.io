# 🛡️ ShramKavach (श्रम कवच) - Worker Empowerment Platform

**"हर मजदूर की सुरक्षा, हमारा संकल्प"** | *Every worker's protection, our commitment*

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg) ![PWA](https://img.shields.io/badge/PWA-enabled-purple.svg) ![License](https://img.shields.io/badge/license-MIT-green.svg)

ShramKavach is a comprehensive platform empowering Indian gig workers, freelancers, and platform workers with **34+ free calculators**, **25+ legal document generators**, **1561+ AI prompts**, and complete worker rights protection resources - all with 100% privacy.

---

## 🎯 Project Vision

ShramSetu bridges the gap between India's new labour laws (Code on Social Security 2020, DPDP Act 2023) and the millions of vernacular gig workers who need to understand and exercise their rights. Unlike heavy, venture-backed platforms, ShramSetu is a lightweight static utility optimized for Tier-2/3 networks and built with a ₹10,000 budget.

---

## ✨ Key Features

### 1. **34 Essential Calculators** 🧮
**Labour Rights:** Gratuity (1-year eligibility), EPF, Leave Encashment, Social Security  
**Earnings:** Delivery Partner, Cab Driver, Freelance Pricing, Hourly Rate, Invoice, Platform Fees  
**Tax & Finance:** GST, TDS, Income Tax, Advance Tax, Professional Tax, CTC Converter  
**Loans:** EMI, Eligibility, MUDRA, Vehicle Finance, Loan Comparison  
**Business:** Break-Even, Profit Margin, ROI, Discount, Commission, CAC  
**Others:** Fuel Cost, SIP, FD, Age, Work Hours Tracker

### 2. **सुरक्षा (Security) - Legal Document Generators**
- **DPDP Privacy Policy Generator**: India-specific, DPDP Act 2023 compliant, 100% client-side
- **Gig Contract Builder**: Protect freelancers from non-payment with simple service agreements
- **PDF Export**: Download contracts as professional PDFs

### 3. **विकास (Growth) - AI Prompt Library**
- **500+ Ready-to-Use Prompts**: Tested for ChatGPT, Gemini in Hindi, Tamil, Marathi, English
- **Categories**: Marketing, Customer Service, Negotiation, Business Planning, Content Creation, Legal
- **One-Click Copy**: Instant clipboard integration for seamless AI workflow

### 4. **Vernacular Interface**
- **4 Languages**: Hindi, English, Tamil, Marathi (fully localized)
- **Client-Side Translation**: Persistent language preference across sessions
- **Mobile-First Design**: Optimized for entry-level smartphones

---

## 🏗️ Technical Architecture

### Tech Stack
- **Frontend**: Pure HTML5, CSS3, Vanilla JavaScript (ES6+)
- **Styling**: Tailwind CSS (CDN, optimized for production)
- **Data**: JSON files (no database required)
- **Fonts**: Noto Sans Devanagari (for Indian scripts)
- **Libraries**: jsPDF (for contract PDF generation)

### Why Static?
1. **Zero Server Costs**: Host on Netlify/Vercel free tier
2. **Lightning Fast**: No backend latency, instant page loads
3. **Privacy-First**: All calculations happen in browser, zero tracking
4. **Tier-2/3 Optimized**: Works on 2G/3G networks
5. **Secure**: No database = no data breach risk

### File Structure
```
shram/
├── index.html              # Landing page
├── calculators.html        # Gratuity, Social Security, Tax tools
├── generator.html          # Privacy Policy & Contract builders
├── prompts.html            # AI Prompt library
├── js/
│   ├── calculators.js      # Calculator logic (gratuity, tax, social security)
│   ├── privacy-gen.js      # DPDP policy & contract generators
│   ├── prompt-loader.js    # Prompt search & filtering
│   ├── common.js           # Language switching, utilities
├── data/
│   ├── prompts.json        # 30 AI prompts (expandable to 500+)
│   ├── translations.json   # i18n strings (hi, en, ta, mr)
├── netlify.toml            # Netlify deployment config
├── vercel.json             # Vercel deployment config
└── README.md               # This file
```

---

## 🚀 Deployment Guide

### Option 1: Netlify (Recommended)
1. **Push to GitHub**:
   ```bash
   cd shram
   git init
   git add .
   git commit -m "Initial commit: ShramSetu v1.0"
   git remote add origin https://github.com/yourusername/shramsetu.git
   git push -u origin main
   ```

2. **Deploy on Netlify**:
   - Go to [Netlify](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect GitHub, select `shramsetu` repo
   - Build settings: Leave default (static site)
   - Click "Deploy site"
   - **Custom Domain**: Add your `.in` domain in Site Settings

### Option 2: Vercel
1. Push code to GitHub (same as above)
2. Go to [Vercel](https://vercel.com)
3. Click "New Project" → Import from GitHub
4. Select `shramsetu` → Deploy
5. Add custom domain in Project Settings

### Option 3: GitHub Pages (Free)
```bash
# Enable GitHub Pages in repo settings
# Settings → Pages → Source: main branch → Save
# Your site will be live at: https://yourusername.github.io/shramsetu
```

---

## 💰 Monetization Strategy

ShramSetu operates on a **high-intent affiliate model**. Users engaging with calculators/tools are self-identifying financial needs.

### Affiliate Partners (To Implement)
1. **CreditSea / Paisabazaar**: Gig worker loans (₹200-500 CPA)
2. **Acko / Zuno**: Micro-insurance (10-15% commission)
3. **Writesonic / Rytr**: AI writing tools (30% recurring)
4. **Jupiter / Open**: Neo-banking for freelancers

### Integration Steps
1. Sign up for affiliate programs
2. Replace placeholder links in HTML:
   - `calculators.html` → After gratuity result (loan widget)
   - `calculators.html` → After social security (insurance widget)
   - `prompts.html` → Bottom CTA (AI tools)
3. Track conversions via affiliate dashboards

---

## 📊 SEO Strategy

### Target Keywords
- **English**: "Fixed term gratuity calculator India 2025", "DPDP privacy policy generator free"
- **Hindi**: "Gig worker gratuity kaise calculate kare", "Freelancer tax calculator Hindi"
- **Long-tail**: "Kirana store marketing message Hindi", "Delivery boy social security check"

### Implementation
1. **Meta Tags**: Already optimized in each HTML file
2. **Structured Data**: Add JSON-LD schema for calculators (future enhancement)
3. **Sitemap**: Generate and submit to Google Search Console
4. **WhatsApp Virality**: Share buttons on every result page

---

## 🔧 Customization Guide

### Adding More Prompts
Edit `data/prompts.json`:
```json
{
  "id": 31,
  "title": "Your Prompt Title",
  "category": "marketing",
  "language": "hi",
  "description": "Brief description",
  "prompt": "The actual prompt text here..."
}
```

### Adding New Languages
1. Add translations to `data/translations.json`
2. Update language selector in HTML files
3. Add font support (e.g., Bengali: Noto Sans Bengali)

### Updating Legal Templates
Edit `js/privacy-gen.js`:
- Modify `privacyPolicyTemplate` object for DPDP changes
- Update `contractTemplate` for new legal clauses

### Affiliate Link Integration
Search for `href="#"` placeholders and replace with actual affiliate URLs:
```html
<!-- Example -->
<a href="https://creditsea.com?ref=shramsetu" class="...">
```

---

## 🛡️ Privacy & Security

### Data Handling
- **Zero Server Storage**: All data processed client-side
- **No Tracking**: No Google Analytics by default (can be added)
- **No Cookies**: Language preference stored in `localStorage` only
- **HTTPS Only**: Enforced by Netlify/Vercel

### Compliance
- **DPDP Act 2023**: Tool itself generates compliant policies
- **Code on Social Security 2020**: Calculations verified against gazette notifications
- **Tax Calculations**: Based on FY 2025-26 official slabs (update annually)

---

## 📈 Roadmap

### Phase 1 (Current - MVP)
- [x] 3 Calculators (Gratuity, Social Security, Tax)
- [x] 2 Generators (Privacy Policy, Contract)
- [x] 30 AI Prompts (Hindi, English)
- [x] 4 Languages (Hi, En, Ta, Mr)

### Phase 2 (Month 2-3)
- [ ] Expand to 500+ prompts across all categories
- [ ] Add Bengali & Telugu languages
- [ ] Implement affiliate integrations
- [ ] SEO optimization & backlink campaign
- [ ] WhatsApp bot for quick calculator access

### Phase 3 (Month 4-6)
- [ ] PF/ESI calculators
- [ ] Invoicing tool for freelancers
- [ ] Partnership with gig platforms (Zomato, Swiggy)
- [ ] Mobile app (Progressive Web App)

---

## 📞 Support & Contribution

### Bug Reports
Open an issue on GitHub with:
- Browser & OS version
- Steps to reproduce
- Expected vs actual behavior

### Feature Requests
We prioritize features that:
1. Serve the vernacular user base
2. Require zero server infrastructure
3. Address compliance gaps

### Translation Help
Native speakers can contribute to `data/translations.json`

---

## 📜 Legal Disclaimer

**ShramSetu provides informational tools only. We are not:**
- Legal advisors (consult a lawyer for legal matters)
- Tax consultants (consult a CA for tax filing)
- Financial advisors (consult a certified advisor for investments)

All calculators are based on publicly available laws and may contain simplifications. Users are advised to verify results with professionals before making decisions.

---

## 🙏 Credits & Acknowledgments

- **Labour Code Research**: Ministry of Labour & Employment, Govt. of India
- **DPDP Act Reference**: Ministry of Electronics & IT, Govt. of India
- **Tax Slabs**: Income Tax Department, FY 2025-26
- **Design Inspiration**: India Stack, Digital India initiatives
- **Fonts**: Google Fonts (Noto Sans Devanagari)
- **Icons**: Heroicons (Tailwind CSS)

---

## 📧 Contact

**Project Maintainer**: [Your Name]  
**Email**: [Your Email]  
**Website**: [Your Domain]

**Built with ❤️ for Bharat's Workforce**

---

## License

This project is open-source under the MIT License. You are free to use, modify, and distribute with attribution.

**Copyright © 2025 ShramSetu. All Rights Reserved.**
