# ShramKavach - Digital Worker Empowerment Platform

[![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)](https://shramkavach.com)
[![Status](https://img.shields.io/badge/status-production-success.svg)](https://shramkavach.com)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

**Website:** [shramkavach.com](https://shramkavach.com)  
**Target Market:** India's 150M+ gig economy workforce  
**Architecture:** Static web application with zero server dependencies

## Executive Summary

ShramKavach is a comprehensive digital platform providing financial tools, legal resources, AI-powered productivity solutions, and real-time global market intelligence to India's gig economy workforce. The platform combines compliance calculators, document generation, and intelligence analysis in a privacy-first, mobile-optimized architecture.

## Platform Capabilities

### Financial Intelligence Suite
- 34+ specialized calculators covering labour compliance, taxation, and financial planning
- Real-time analysis of global markets, technology trends, and geopolitical developments
- Integration with Indian regulatory frameworks (Code on Social Security 2020, DPDP Act 2023, Income Tax Act)

### Legal & Compliance Tools
- DPDP Act 2023 compliant privacy policy generator
- Service contract templates for gig workers
- PDF export functionality with professional formatting
- Worker rights documentation and guidance

### AI Productivity Infrastructure
- 2,761+ curated AI prompts across 8 professional categories
- Integration with 250+ ScribbleTools for document automation
- Multi-language support (Hindi, English, Tamil, Marathi)
- One-click workflow integration

### Intelligence & Analysis
- Daily market analysis covering US, Asian, and European markets
- Technology sector reports (AI trends, agentic systems, DeepSeek developments)
- Geopolitical risk assessments and energy market analysis
- Investment strategy guidance and bond market intelligence

## Technical Architecture

### Technology Stack
```
Frontend:     HTML5, CSS3, JavaScript (ES6+)
Framework:    Tailwind CSS (responsive design)
Visualization: Chart.js (market data)
PDF Export:   jsPDF
Data Layer:   JSON (static, no database)
Typography:   Noto Sans Devanagari, Inter
Deployment:   GitHub Pages (automatic CI/CD)
```

### System Design Principles
1. **Zero-Trust Architecture**: All processing client-side, no data collection
2. **Performance Optimization**: Sub-second load times on 2G networks
3. **Progressive Enhancement**: Core functionality without JavaScript
4. **Mobile-First**: Optimized for entry-level smartphones
5. **Accessibility**: WCAG 2.1 AA compliance target

### Repository Structure
```
shram/
├── Core Pages
│   ├── index.html              # Landing page
│   ├── calculators.html        # Financial tools
│   ├── protection.html         # Legal resources
│   ├── prompts.html            # AI productivity
│   └── updates.html            # Intelligence hub
│
├── Intelligence Reports
│   ├── the-convergence-of-kinetic-force-and-agentic-intelligence.html
│   ├── the-great-divergence.html
│   ├── bond-markets-2026.html
│   └── UPI-2026.HTML
│
├── JavaScript Modules
│   ├── calculators.js          # Core calculation engine
│   ├── calculators-extended.js # Advanced calculators
│   ├── legal-generators.js     # Document generation
│   ├── updates-manager.js      # Content management system
│   ├── i18n.js                 # Internationalization
│   └── common.js               # Shared utilities
│
├── Data
│   ├── prompts.json            # AI prompt database
│   ├── prompts-extended.json   # Extended library
│   ├── prompts-mega.json       # Complete collection
│   ├── translations.json       # Multi-language strings
│   └── internal-links.json     # SEO routing
│
└── Automation
    └── google-apps-script/
        ├── newsletter-automation.gs
        └── website-integration.js
```

## Platform Metrics

| Metric | Value | Status |
|--------|-------|--------|
| Financial Calculators | 34+ | Production |
| AI Prompts | 2,761+ | Production |
| ScribbleTools Integration | 250+ | Active |
| Intelligence Reports | 15+ | Weekly Updates |
| Supported Languages | 4 | Expanding |
| Target Addressable Market | 150M+ users | India |
| Data Collection | 0% | Privacy-First |
| Operating Costs | $0/month | Zero Infrastructure |

## Business Model

### Current Revenue Streams
- Google AdSense integration (non-intrusive placement)
- Affiliate infrastructure (ready for financial product partnerships)

### Growth Strategy
1. **SEO Optimization**: Targeting vernacular search queries in tier 2/3 cities
2. **Content Marketing**: Daily intelligence reports building authority
3. **WhatsApp Distribution**: Viral sharing mechanism on every page
4. **Voice Search**: Optimized for natural language queries

### Compliance & Risk Management
- DPDP Act 2023 compliant (no personal data storage)
- Code on Social Security 2020 aligned calculators
- Income Tax Act FY 2025-26 calculations
- Regular legal review and updates

## Development Roadmap

### Current Release (v2.0.0)
- ✓ 34+ financial calculators with Indian regulatory compliance
- ✓ 2,761+ AI prompts across professional categories
- ✓ Legal document generation (privacy policies, contracts)
- ✓ Intelligence reporting system with daily updates
- ✓ Multi-language support (4 languages)
- ✓ SEO optimization with structured data
- ✓ Mobile-responsive design

### Q1 2026 (v2.1.0)
- Bengali and Telugu language support
- Enhanced market data visualization
- Newsletter automation system
- Progressive Web App (PWA) optimization
- Voice search integration

### Q2 2026 (v3.0.0)
- Real-time market data API integration
- AI-powered financial advisory chatbot
- Partnership integrations with gig platforms
- Community forum infrastructure
- Web3 earnings tracker

## Installation & Deployment

### Local Development
```bash
git clone https://github.com/jaswanth-mjy/shramkavach.github.io.git
cd shram
# Open index.html in browser or use local server
```

### Production Deployment
The platform automatically deploys to production on every commit to the main branch via GitHub Actions. No build process required.

**Live URL:** https://shramkavach.com

## API & Integration

### Adding Intelligence Articles
Register new articles in `js/updates-manager.js`:
```javascript
{
    id: 'unique-slug',
    title: 'Article Title',
    excerpt: 'Brief description',
    date: 'YYYY-MM-DD',
    category: 'markets technology',
    tags: ['TAG1', 'TAG2'],
    readTime: 'X min read',
    link: 'article-filename.html'
}
```

### Extending Calculators
Add new calculation modules to `js/calculators-extended.js` following the established pattern for input validation, calculation logic, and result formatting.

### Multi-Language Support
Extend `data/translations.json` with new language keys and register in `js/i18n.js` language selector.

## Security & Privacy

### Data Protection
- Zero data collection or storage
- No cookies (localStorage for preferences only)
- All calculations performed client-side
- HTTPS enforced via GitHub Pages
- No third-party analytics by default

### Compliance
- DPDP Act 2023 (Digital Personal Data Protection)
- Code on Social Security 2020
- Income Tax Act (current fiscal year)
- GST Act (updated thresholds)

## Contributing

Contributions are welcome in the following areas:
- Translation (Bengali, Telugu, Kannada, Punjabi)
- Calculator accuracy verification
- Intelligence report content
- Accessibility improvements
- Cross-browser testing

Submit pull requests with clear descriptions and test coverage.

## Support & Contact

**Technical Issues:** Open an issue on GitHub  
**Business Inquiries:** support@shramkavach.com  
**Website:** https://shramkavach.com

## Legal Disclaimer

ShramKavach provides informational tools and analysis. The platform does not provide legal, tax, or financial advice. Users should consult qualified professionals before making financial or legal decisions. All calculations are based on publicly available information and may contain simplifications.

## License

MIT License - See LICENSE file for details.

**Copyright © 2026 ShramKavach. All Rights Reserved.**

---

## ✨ Core Pillars

### 🧮 1. Financial Tools (34+ Calculators)
**Labour Rights & Benefits:**
- Gratuity Calculator (1-year eligibility, 2025 rules)
- EPF & Social Security Calculator
- Leave Encashment Calculator
- Platform Worker Benefits Estimator

**Earnings & Income:**
- Delivery Partner Earnings
- Cab Driver ROI Calculator
- Freelance Pricing Calculator
- Hourly Rate & Invoice Generator
- Platform Fee Impact Calculator

**Tax & Compliance:**
- GST Calculator (₹20L/₹40L threshold)
- Section 44ADA Tax Calculator
- Income Tax (New vs Old Regime)
- TDS & Advance Tax Calculator
- Professional Tax Calculator

**Financial Planning:**
- EMI & Loan Eligibility
- MUDRA Loan Calculator
- SIP & FD Returns
- Break-Even Analysis
- Business ROI Calculator

### 🛡️ 2. Legal Protection (सुरक्षा)
**Document Generators:**
- DPDP Act 2023 compliant Privacy Policy
- Gig Worker Service Contracts
- Freelancer Agreement Templates
- Non-Payment Protection Contracts
- PDF Export with legal formatting

### 🤖 3. AI Productivity (विकास)
**2761+ AI Prompts across categories:**
- Marketing & Growth (500+ prompts)
- Customer Service Excellence (400+ prompts)
- Business Planning & Strategy (350+ prompts)
- Content Creation & Writing (450+ prompts)
- Sales & Negotiation (300+ prompts)
- Legal & Compliance (200+ prompts)
- Financial Planning (200+ prompts)
- Technical & Development (200+ prompts)

**250+ ScribbleTools Integration:**
- Connected to ShramTools.shramkavach.com
- Professional document templates
- Business automation tools

### 📰 4. Intelligence Reports (NEW!)
**Real-time Global Analysis:**
- **Market Intelligence**: Daily analysis of global markets (Dow, Nasdaq, Asian markets)
- **Technology Trends**: AI paradigm shifts, agentic systems, DeepSeek developments
- **Geopolitical Analysis**: Operation Southern Spear, energy market impacts
- **Financial Strategies**: Bond markets, tax planning, investment opportunities
- **Cybersecurity Alerts**: Threat landscapes, scam center warnings

**Recent Reports:**
- "The Convergence of Kinetic Force and Agentic Intelligence" (Jan 4, 2026)
- "The Great Divergence: Global Markets & AI Utility" (Jan 3, 2026)
- "The 2026 Reset: New Financial Rules" (Jan 1, 2026)
- "Bond Markets 2026: Complete Survival Guide" (Jan 1, 2026)

---

## 🏗️ Technical Architecture

### Tech Stack
- **Frontend**: HTML5, CSS3, Vanilla JavaScript (ES6+)
- **Styling**: Tailwind CSS (responsive, mobile-first)
- **Charts & Visualization**: Chart.js for market data
- **PDF Generation**: jsPDF for contract exports
- **Data**: JSON-based (no database, 100% privacy)
- **Fonts**: Noto Sans Devanagari, Inter (optimized loading)
- **PWA**: Service worker enabled, offline capable

### Why This Architecture?
1. **Zero Server Costs**: Static hosting on GitHub Pages
2. **Lightning Fast**: Sub-second page loads, even on 2G
3. **Privacy-First**: All processing client-side, zero tracking
4. **Tier-2/3 Optimized**: Works perfectly on entry-level devices
5. **Secure by Design**: No database = no data breach risk
6. **SEO Optimized**: Server-side rendering not needed with proper meta tags

### File Structure
```
shram/
├── index.html                    # Landing page
├── updates.html                  # Intelligence reports hub
├── calculators.html              # 34+ financial calculators
├── protection.html               # Worker rights & legal info
├── prompts.html                  # 2761+ AI prompts
├── the-great-divergence.html     # Market analysis report
├── the-convergence-of-kinetic-force-and-agentic-intelligence.html
├── bond-markets-2026.html        # Investment strategies
├── UPI-2026.HTML                 # Financial rules update
├── js/
│   ├── calculators.js            # Core calculator logic
│   ├── calculators-extended.js   # Advanced calculators
│   ├── legal-generators.js       # Document generation
│   ├── prompt-loader.js          # AI prompt system
│   ├── updates-manager.js        # Dynamic article loading
│   ├── sidebar-articles-loader.js # Related content
│   ├── i18n.js                   # Multi-language support
│   ├── common.js                 # Shared utilities
│   └── newyear-celebration.js    # Seasonal features
├── data/
│   ├── prompts.json              # Base prompts
│   ├── prompts-extended.json     # Extended library
│   ├── prompts-mega.json         # Full 2761+ collection
│   ├── translations.json         # i18n strings (4 languages)
│   └── internal-links.json       # SEO & navigation
├── google-apps-script/
│   ├── newsletter-automation.gs  # Email automation
│   └── website-integration.js    # Form handlers
└── README.md                     # This file
```

---

## 🚀 Quick Start

### Local Development
```bash
# Clone the repository
git clone https://github.com/jaswanth-mjy/shramkavach.github.io.git
cd shram

# Open in browser (no build step needed!)
open index.html
# or use Live Server in VS Code
```

### Deployment (GitHub Pages - FREE)
```bash
# Already deployed at:
# https://shramkavach.com
# Repository automatically deploys on push to main branch
```

### Adding New Intelligence Reports
1. Create HTML file with article structure
2. Add to `js/updates-manager.js` articlesDatabase:
```javascript
{
    id: 'your-article-slug',
    title: 'Your Article Title',
    excerpt: 'Brief summary...',
    date: '2026-01-XX',
    category: 'markets ai technology',
    tags: ['🔴 BREAKING', '📊 MARKETS'],
    readTime: 'X min read',
    link: 'your-article.html',
    featured: true
}
```
3. Update `data/internal-links.json` for SEO routing

---

## 📊 SEO & Growth Strategy

### Target Keywords
**Hindi**: "Gig worker calculator Hindi", "Freelancer tax calculator", "Delivery partner EPF"  
**English**: "Gratuity calculator India 2026", "Section 44ADA calculator", "DPDP privacy policy generator"  
**Long-tail**: "How to calculate gratuity for 1 year", "Global markets analysis January 2026"

### Current Performance
- **Google AdSense**: Integrated (ca-pub-2868999138532322)
- **Structured Data**: JSON-LD schema on all pages
- **Canonical URLs**: Properly configured
- **Open Graph**: Full social media optimization
- **Sitemap**: Auto-generated, submitted to Google

### Content Strategy
- **Daily Intelligence Reports**: Market updates, AI trends, geopolitical analysis
- **Evergreen Tools**: Calculators remain relevant year-round
- **WhatsApp Virality**: Share buttons on every page
- **Voice Search Optimized**: Natural language meta descriptions

---

## 💰 Revenue Model (Ethical & User-First)

### Current
- **Google AdSense**: Non-intrusive ads on content pages
- **Affiliate Ready**: Infrastructure for financial product partnerships

### Potential (Aligned with Mission)
1. **Financial Product Affiliates**: Insurance, loans, neo-banking (only verified partners)
2. **Sponsored Intelligence**: Partner insights (clearly labeled)
3. **B2B Licensing**: WhatsApp/Telegram bot versions for platforms

**Non-Negotiable**: Zero data selling, zero compromise on privacy

---

## 🌍 Multi-Language Support

### Currently Supported
- 🇮🇳 **Hindi** (हिंदी)
- 🇬🇧 **English** 
- 🇮🇳 **Tamil** (தமிழ்)
- 🇮🇳 **Marathi** (मराठी)

### Implementation
- Client-side i18n via `js/i18n.js`
- Persistent language preference (localStorage)
- Font optimization for Indic scripts

---

## 🔧 Customization Guide

### Adding New Calculators
Edit `js/calculators.js` or `js/calculators-extended.js`:
```javascript
function newCalculator() {
    const input1 = parseFloat(document.getElementById('input1').value);
    const result = input1 * calculationLogic;
    document.getElementById('result').textContent = `₹${result.toLocaleString('en-IN')}`;
}
```

### Adding Intelligence Articles
1. Create HTML file with proper structure (navbar, breadcrumb, share buttons)
2. Add article schema (JSON-LD)
3. Register in `updates-manager.js`
4. Add to `internal-links.json`

### Updating Legal Templates
Modify `js/legal-generators.js` for DPDP/contract changes

---

## 🛡️ Privacy & Compliance

### Data Handling Principles
- ✅ **100% Client-Side Processing**: All calculations in browser
- ✅ **Zero Server Storage**: No database, no user data collection
- ✅ **No Cookies**: Only localStorage for language preference
- ✅ **HTTPS Enforced**: GitHub Pages automatic SSL
- ✅ **No Tracking Scripts**: Optional analytics (disabled by default)

### Legal Compliance
- **DPDP Act 2023**: Tool generates compliant policies
- **Code on Social Security 2020**: Verified calculations
- **Income Tax Act**: FY 2025-26 slabs
- **GST Act**: Current thresholds (₹20L/₹40L)

---

## 📈 Roadmap

### ✅ Completed (Phase 1-2)
- [x] 34+ Financial Calculators
- [x] 2761+ AI Prompts
- [x] 250+ ScribbleTools Integration
- [x] Legal Document Generators
- [x] Intelligence Reports System
- [x] Multi-language Support (4 languages)
- [x] Dynamic Article Loading
- [x] SEO Optimization
- [x] Google AdSense Integration
- [x] WhatsApp Sharing
- [x] Mobile-First Responsive Design

### 🚧 In Progress (Phase 3 - Q1 2026)
- [ ] Bengali & Telugu Language Support
- [ ] Advanced Market Data Visualization
- [ ] Newsletter Automation (Google Apps Script)
- [ ] WhatsApp Bot Integration
- [ ] Voice Search Optimization
- [ ] Progressive Web App (PWA) Enhancement

### 🔮 Future (Phase 4 - Q2 2026)
- [ ] Real-time Market Data API Integration
- [ ] AI-powered financial advice chatbot
- [ ] Partnership with gig platforms
- [ ] Mobile app (React Native)
- [ ] Crypto earnings tracker for Web3 gig workers
- [ ] Community forum for worker discussions

---

## 🤝 Contributing

### Areas Where We Need Help
1. **Translation**: Bengali, Telugu, Kannada, Punjabi
2. **Legal Review**: Verify calculator accuracy
3. **Content**: More intelligence reports on Indian markets
4. **Design**: Accessibility improvements
5. **Testing**: Cross-browser compatibility

### How to Contribute
```bash
# Fork the repository
# Create feature branch
git checkout -b feature/new-calculator

# Make changes and commit
git commit -m "Add: New calculator for X"

# Push and create Pull Request
git push origin feature/new-calculator
```

---

## 📞 Support & Contact

**Platform**: ShramKavach  
**Website**: https://shramkavach.com  
**Email**: support@shramkavach.com  
**Status**: Live & Production Ready

### Bug Reports
Open an issue with:
- Browser/Device details
- Steps to reproduce
- Expected vs actual behavior
- Screenshots (if applicable)

### Feature Requests
We prioritize features that:
1. Serve the vernacular/gig worker audience
2. Maintain privacy-first architecture
3. Require zero server infrastructure
4. Add real value to workers' financial decisions

---

## 📜 Legal Disclaimer

**Important**: ShramKavach provides informational tools and analysis only. We are NOT:
- ❌ Legal advisors (consult a lawyer for legal matters)
- ❌ Tax consultants (consult a CA for tax filing)
- ❌ Financial advisors (consult SEBI-registered advisors)
- ❌ Investment advisors (not SEBI registered)

All calculators are based on publicly available laws and may contain simplifications. Intelligence reports are analysis/opinion, not investment advice. Users must verify with professionals before making financial/legal decisions.

---

## 🙏 Acknowledgments

**Powered By:**
- Ministry of Labour & Employment (Labour Code research)
- Ministry of Electronics & IT (DPDP Act reference)
- Income Tax Department (Tax slabs FY 2025-26)
- Google Fonts (Noto Sans Devanagari, Inter)
- Tailwind CSS & Chart.js (Open source libraries)
- VS Code & GitHub (Development infrastructure)

**Built with ❤️ for Bharat's 15 Crore+ Gig Workers**

---

## 📄 License

MIT License - Free to use, modify, and distribute with attribution.

**Copyright © 2026 ShramKavach. All Rights Reserved.**

---

## 🌟 Star History

If this project helps you, consider giving it a ⭐ on GitHub!

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
3. **Jupiter / Open**: Neo-banking for freelancers

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
