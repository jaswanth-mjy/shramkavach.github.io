# Precious Metals Price Tracker - Setup Guide

## Overview
Automatic daily updates for Gold, Silver, Platinum, and Diamond prices from global markets.

## Files Created

### 1. **js/precious-metals-tracker.js**
- Main tracking script
- Auto-updates every 24 hours
- Fetches from multiple API sources
- Fallback to cached prices if API fails

### 2. **data/precious-metals-prices.json**
- Static price database
- Historical data
- Market insights
- Fallback prices

### 3. **precious-metals-live.html**
- Dedicated page for live prices
- Real-time display widget
- Historical performance charts

## How It Works

### Automatic Updates
```javascript
// Updates automatically every 24 hours
- Checks if last update was more than 24 hours ago
- Fetches latest prices from API
- Caches in localStorage
- Updates display
```

### API Configuration

#### Free APIs You Can Use:

1. **MetalpriceAPI** (Recommended)
   - URL: https://metalpriceapi.com
   - Free tier: 50 requests/month
   - Metals: Gold, Silver, Platinum, Palladium
   
2. **Metals-API**
   - URL: https://metals-api.com
   - Free tier: 50 requests/month
   - Real-time precious metals data

3. **CoinGecko** (Backup)
   - URL: https://coingecko.com/api
   - Free, no API key needed
   - Limited precious metals coverage

### Setup Steps

#### Step 1: Get API Key
```bash
1. Visit https://metalpriceapi.com
2. Sign up for free account
3. Copy your API key
```

#### Step 2: Configure API Key
Edit `js/precious-metals-tracker.js`:
```javascript
const CONFIG = {
    apiEndpoints: {
        metals: 'https://api.metalpriceapi.com/v1/latest?api_key=YOUR_API_KEY_HERE&base=USD&currencies=XAU,XAG,XPT,XPD'
    }
};
```

#### Step 3: Add Widget to Any Page
```html
<!-- In HTML <head> -->
<script src="https://cdn.tailwindcss.com"></script>

<!-- In HTML <body> where you want prices to display -->
<div id="precious-metals-widget"></div>

<!-- Before </body> -->
<script src="js/precious-metals-tracker.js?v=1.0"></script>
```

## Usage

### Display on Any Page
```html
<!-- Simple widget -->
<div id="precious-metals-widget"></div>
<script src="js/precious-metals-tracker.js"></script>
```

### Manual Refresh
```javascript
// Force immediate update
preciousMetalsTracker.forceUpdate();

// Get current prices
const prices = preciousMetalsTracker.getPrices();
console.log(prices.gold.price); // 4332.00
```

### Custom Container
```javascript
// Initialize with custom container ID
preciousMetalsTracker.init('my-custom-container');
```

## Price Update Schedule

- **Frequency**: Every 24 hours
- **Cache**: localStorage (persists between sessions)
- **Fallback**: Static prices from JSON file
- **API Limit**: 50 requests/month (enough for daily updates)

## Diamond Prices

Diamond prices are **estimated averages** for investment-grade stones:
- 1 carat
- D color (colorless)
- IF clarity (internally flawless)
- Excellent cut

Actual diamond prices vary significantly based on:
- Carat weight
- Color grade (D-Z)
- Clarity (FL, IF, VVS, VS, SI, I)
- Cut quality
- Certification (GIA, AGS, etc.)

## Fallback System

If APIs fail, the system uses:
1. **Cached prices** from last successful update
2. **Static prices** from `precious-metals-prices.json`
3. **Hardcoded fallback** in JavaScript

## Data Sources

- **Gold, Silver, Platinum**: Global spot prices (London, COMEX)
- **Diamond**: Rapaport Diamond Report (industry standard)

## Adding to Navigation

Add to your site's navigation:
```html
<a href="precious-metals-live.html">Live Precious Metals</a>
```

## Customization

### Change Update Frequency
```javascript
// In precious-metals-tracker.js
const CONFIG = {
    updateInterval: 12 * 60 * 60 * 1000, // 12 hours instead of 24
};
```

### Add More Metals
```javascript
// Add palladium, rhodium, etc.
const metals = [
    { key: 'palladium', name: 'Palladium', icon: '⚪', color: 'purple' }
];
```

## Browser Console Commands

```javascript
// Check last update time
localStorage.getItem('precious_metals_last_update');

// View cached prices
JSON.parse(localStorage.getItem('precious_metals_prices'));

// Force refresh
preciousMetalsTracker.forceUpdate();

// Clear cache
localStorage.removeItem('precious_metals_prices');
localStorage.removeItem('precious_metals_last_update');
```

## Troubleshooting

### Prices not updating?
1. Check browser console for errors
2. Verify API key is configured
3. Check API rate limits (50/month)
4. Clear localStorage cache

### API rate limit exceeded?
- Free tier allows 50 requests/month
- Daily updates = ~30 requests/month
- Each manual refresh counts toward limit

### Alternative: Manual Update
Update `data/precious-metals-prices.json` manually:
```json
{
  "prices": {
    "gold": { "price": 4350.00, "change": "+0.42%" }
  }
}
```

## Production Deployment

For automatic daily updates without API:

1. **GitHub Actions** (Recommended)
```yaml
# .github/workflows/update-prices.yml
name: Update Precious Metals Prices
on:
  schedule:
    - cron: '0 0 * * *' # Daily at midnight UTC
  workflow_dispatch:

jobs:
  update:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Fetch prices
        run: |
          curl "https://api.metalpriceapi.com/v1/latest?api_key=${{ secrets.METAL_API_KEY }}&base=USD&currencies=XAU,XAG,XPT" > data/precious-metals-prices.json
      - name: Commit
        run: |
          git config user.name "GitHub Actions"
          git config user.email "actions@github.com"
          git add data/precious-metals-prices.json
          git commit -m "Auto-update precious metals prices"
          git push
```

2. **Store API key in GitHub Secrets**
   - Go to repo Settings > Secrets
   - Add `METAL_API_KEY`

## Support

For issues or questions:
- Check browser console for errors
- Verify API key configuration
- Test with fallback prices first

## License

MIT License - Free to use and modify
