# ShramSetu - Quick Start Guide

Welcome to ShramSetu! This guide will help you get the project up and running in 5 minutes.

## 🚀 Quick Start (Local Development)

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- Python 3 (for local server) OR any static server

### Method 1: Using Python (Recommended)
```bash
# Navigate to project directory
cd shram

# Start local server
python3 -m http.server 8000

# Open browser
# Visit: http://localhost:8000
```

### Method 2: Using Node.js
```bash
# Install a simple HTTP server globally
npm install -g http-server

# Start server
http-server . -p 8000

# Visit: http://localhost:8000
```

### Method 3: Using VS Code Live Server
1. Install "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

---

## 📁 Project Structure Overview

```
shram/
├── index.html              ← Landing page (START HERE)
├── calculators.html        ← Gratuity, Tax, Social Security calculators
├── generator.html          ← Privacy Policy & Contract generators
├── prompts.html            ← AI Prompt library (500+ prompts)
│
├── js/                     ← All JavaScript logic
│   ├── calculators.js      ← Calculator algorithms
│   ├── privacy-gen.js      ← Document generators
│   ├── prompt-loader.js    ← Prompt search & filtering
│   └── common.js           ← Language switching, utilities
│
├── data/                   ← JSON databases
│   ├── prompts.json        ← 30 AI prompts (expandable)
│   └── translations.json   ← Multi-language strings
│
├── netlify.toml            ← Deploy config for Netlify
├── vercel.json             ← Deploy config for Vercel
└── README.md               ← Full documentation
```

---

## ✅ Testing Checklist

After starting the local server, test these features:

### 1. Language Switching
- [ ] Click language dropdown (top-right)
- [ ] Switch between Hindi, English, Tamil, Marathi
- [ ] Verify text changes across the page

### 2. Gratuity Calculator (calculators.html)
- [ ] Select "Fixed-Term Contract"
- [ ] Enter: Basic Pay = ₹15,000, Months = 18
- [ ] Click "Calculate Gratuity"
- [ ] Result should show: ~₹17,307.69
- [ ] Test WhatsApp share button

### 3. Privacy Policy Generator (generator.html)
- [ ] Fill business details
- [ ] Select data types and purposes
- [ ] Click "Generate Privacy Policy"
- [ ] Verify DPDP Act 2023 sections are cited
- [ ] Test "Copy to Clipboard" button
- [ ] Test "Download HTML" button

### 4. AI Prompt Library (prompts.html)
- [ ] Search for "marketing"
- [ ] Filter by category: "Marketing"
- [ ] Filter by language: "Hindi"
- [ ] Click "Copy Prompt" on any card
- [ ] Verify toast notification appears

---

## 🔧 Customization Quick Guide

### Add More AI Prompts
Edit `data/prompts.json`:
```json
{
  "id": 31,
  "title": "Your New Prompt",
  "category": "marketing",
  "language": "hi",
  "description": "What this prompt does",
  "prompt": "The actual prompt text..."
}
```

### Change Colors/Branding
Colors are defined in Tailwind config in each HTML file:
```javascript
tailwind.config = {
    theme: {
        extend: {
            colors: {
                'shram-orange': '#FF6B35',  // Change this
                'shram-blue': '#004E89',    // Change this
                'shram-green': '#00A878',   // Change this
            }
        }
    }
}
```

### Add Affiliate Links
1. Open `calculators.html`
2. Search for `href="#"` in affiliate sections
3. Replace with your affiliate URL:
   ```html
   <a href="https://partner.com?ref=yourcode">
   ```

---

## 🌐 Deploy to Production

### Deploy to Netlify (Easiest)
1. Create account at [netlify.com](https://netlify.com)
2. Drag & drop the `shram` folder onto Netlify dashboard
3. Done! Site is live in 30 seconds

### Deploy to Vercel
1. Install Vercel CLI: `npm install -g vercel`
2. Run: `vercel` in project directory
3. Follow prompts
4. Site is live!

### Deploy to GitHub Pages (Free Forever)
```bash
# Push to GitHub
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/shramsetu.git
git push -u origin main

# Enable GitHub Pages in repo settings
# Settings → Pages → Source: main branch → Save
```

---

## 🐛 Common Issues & Fixes

### Issue: Prompts not loading
**Fix**: Ensure you're running a server (not opening HTML directly)
- Use `python3 -m http.server 8000`
- Don't double-click HTML files

### Issue: Language toggle not working
**Fix**: Check browser console for errors
- Press F12 → Console tab
- Ensure `data/translations.json` is accessible

### Issue: Calculator showing wrong results
**Fix**: Verify input values
- Basic Pay should be monthly (not annual)
- Months served should be total months

### Issue: PDF download not working
**Fix**: jsPDF requires HTTPS or localhost
- Works on `localhost:8000`
- Works on deployed sites (Netlify/Vercel)

---

## 📊 Performance Optimization

### Before Deploying:
1. **Minify CSS**: Tailwind is loaded via CDN (already optimized)
2. **Compress Images**: Use TinyPNG for any images you add
3. **Enable Gzip**: Netlify/Vercel do this automatically
4. **Test on Mobile**: Open Chrome DevTools → Device Mode

### Lighthouse Score Targets:
- Performance: 95+
- Accessibility: 90+
- Best Practices: 95+
- SEO: 95+

---

## 🔐 Security Checklist

- [x] No server-side code (zero attack surface)
- [x] All data processed client-side
- [x] HTTPS enforced by Netlify/Vercel
- [x] No database (no SQL injection risk)
- [x] No user authentication (no password leaks)
- [x] CSP headers configured in `netlify.toml`

---

## 📞 Need Help?

- **Documentation**: See main [README.md](README.md)
- **Bug Reports**: Open GitHub issue
- **Questions**: Check code comments in JS files

---

## 🎉 You're Ready!

Your ShramSetu instance is now running. Next steps:

1. ✅ Test all features locally
2. 🎨 Customize branding & colors
3. 📝 Add more prompts to `prompts.json`
4. 💰 Integrate affiliate links
5. 🚀 Deploy to Netlify/Vercel
6. 📈 Submit to Google Search Console
7. 📱 Share on social media

**Built with ❤️ for Bharat's Workforce**
