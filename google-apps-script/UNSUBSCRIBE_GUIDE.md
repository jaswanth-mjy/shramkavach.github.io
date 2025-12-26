# 🚫 Unsubscribe System Setup Guide

Complete guide to implementing the unsubscribe functionality for ShramKavach newsletter.

## 📁 Files Created

1. **unsubscribe.html** - Beautiful unsubscribe page
2. **Updated newsletter-automation.gs** - Added unsubscribe functions
3. This setup guide

## 🎨 What's Included

### Unsubscribe Page Features:
- ✅ Beautiful responsive design matching ShramKavach branding
- ✅ Email pre-fill from URL parameter
- ✅ Feedback collection (optional)
- ✅ "Stay Subscribed" option
- ✅ Success confirmation
- ✅ Links back to website

### Backend Functions:
- ✅ `unsubscribeUser(email, reasons)` - Marks user as unsubscribed
- ✅ `doPost()` - Handles web requests
- ✅ `doGet()` - API health check

## 🚀 Setup Steps

### Step 1: Deploy Google Apps Script as Web App

1. Open your Google Apps Script project
2. Click **Deploy** → **New deployment**
3. Click ⚙️ icon next to "Select type"
4. Select **Web app**
5. Configure:
   - **Description**: ShramKavach Newsletter API
   - **Execute as**: Me (your-email@gmail.com)
   - **Who has access**: Anyone
6. Click **Deploy**
7. **Copy the Web App URL** - looks like:
   ```
   https://script.google.com/macros/s/AKfycbx.../exec
   ```

### Step 2: Update Unsubscribe Page

1. Open `unsubscribe.html`
2. Find this line (around line 260):
   ```javascript
   const SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec';
   ```
3. Replace with your actual Web App URL from Step 1

### Step 3: Upload to Your Website

1. Upload `unsubscribe.html` to your website root:
   ```
   shramkavach.com/unsubscribe.html
   ```
2. Test the page: `https://shramkavach.com/unsubscribe.html`

### Step 4: Test the Flow

1. Visit: `https://shramkavach.com/unsubscribe.html?email=test@example.com`
2. Email should be pre-filled
3. Click "Unsubscribe"
4. Check your Google Sheet - status should change from `YES` to `NO`

## 🔗 How It Works

### 1. Email Contains Unsubscribe Link

Newsletter emails include this link in footer:
```html
<a href="https://shramkavach.com/unsubscribe.html?email=user@example.com">
  Unsubscribe
</a>
```

### 2. User Clicks Link

- Opens unsubscribe page
- Email is pre-filled from URL parameter
- User can:
  - Stay subscribed (button redirects to homepage)
  - Unsubscribe (submits form)

### 3. Form Submission

JavaScript sends POST request to Google Apps Script:
```javascript
{
  "action": "unsubscribe",
  "email": "user@example.com",
  "reasons": ["too_many_emails", "not_relevant"]
}
```

### 4. Apps Script Processes Request

`unsubscribeUser()` function:
1. Finds user in Google Sheet by email
2. Changes `Subscribed` column from `YES` to `NO`
3. Logs unsubscribe date in column E
4. Saves feedback reasons in column F

### 5. Success Confirmation

Page shows success message:
- ✅ "Unsubscribed Successfully"
- Option to return to homepage
- Links to stay connected (website, social media)

## 📊 Google Sheet Structure

Update your sheet to include feedback column:

| A: Email | B: Name | C: Subscribed | D: Language | E: Status | F: Feedback |
|----------|---------|---------------|-------------|-----------|-------------|
| user@example.com | John | NO | en | Unsubscribed on 12/26/2025 | too_many_emails, not_relevant |

## 🎯 Feedback Reasons

Users can select multiple reasons:
- **too_many_emails** - Receiving too frequently
- **not_relevant** - Content doesn't match interests
- **never_signed_up** - Didn't subscribe (possible spam report)
- **other** - Different reason

## 📧 Newsletter Email Footer

The newsletter automatically includes unsubscribe link with user's email:

```html
<div class="unsubscribe">
    You received this email because you subscribed to ShramKavach newsletter.<br>
    <a href="https://shramkavach.com/unsubscribe.html?email=user@example.com">
        Unsubscribe
    </a>
</div>
```

## 🔧 Advanced Features

### Custom Unsubscribe Reasons

Add more options in `unsubscribe.html`:

```html
<label class="feedback-option">
    <input type="checkbox" name="reason" value="switching_jobs">
    Switched to different job type
</label>
<label class="feedback-option">
    <input type="checkbox" name="reason" value="language_preference">
    Want different language
</label>
```

### Re-subscribe Function

Add this to Apps Script to allow re-subscription:

```javascript
function resubscribeUser(email) {
  const sheet = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID).getSheetByName(CONFIG.SHEET_NAME);
  const data = sheet.getDataRange().getValues();
  
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === email) {
      sheet.getRange(i + 1, 3).setValue('YES');
      sheet.getRange(i + 1, 5).setValue(`Re-subscribed on ${new Date()}`);
      return 'Successfully re-subscribed';
    }
  }
  
  return 'Email not found';
}
```

### Analytics Tracking

The page includes Google Analytics event tracking:

```javascript
gtag('event', 'newsletter_unsubscribe', {
  'event_category': 'engagement',
  'event_label': reasons.join(',')
});
```

Make sure Google Analytics is installed on your site.

## 🛡️ Privacy & Compliance

### GDPR Compliance
- ✅ Easy one-click unsubscribe
- ✅ No login required
- ✅ Immediate processing
- ✅ Confirmation message
- ✅ Data retention notice

### CAN-SPAM Act Compliance
- ✅ Unsubscribe link in every email
- ✅ Processes requests within 10 business days (instant in our case)
- ✅ No fee to unsubscribe
- ✅ Clear identification of email as advertisement (if applicable)

## 🐛 Troubleshooting

### Issue: "Error: Please try again"

**Solution**:
1. Check Web App URL is correct in `unsubscribe.html`
2. Verify Web App is deployed with "Anyone" access
3. Check Apps Script execution logs for errors

### Issue: Email not found

**Solution**:
1. Verify email exists in Google Sheet
2. Check for typos or extra spaces
3. Email addresses are case-insensitive

### Issue: Page styling broken

**Solution**:
1. Make sure `unsubscribe.html` uploaded completely
2. Check browser console for errors
3. Test in different browsers

## 📱 Mobile Responsiveness

The unsubscribe page is fully mobile-responsive:
- Fluid layout adapts to screen size
- Touch-friendly buttons
- Readable fonts on small screens
- Single-column layout on mobile

## 🎨 Customization

### Change Colors

Update CSS variables in `unsubscribe.html`:

```css
/* Purple gradient - main brand color */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* Change to different gradient */
background: linear-gradient(135deg, #your-color-1 0%, #your-color-2 100%);
```

### Add Logo

Replace emoji with image:

```html
<div class="logo">
    <img src="https://shramkavach.com/logo.png" alt="ShramKavach" style="width: 80px;">
</div>
```

### Custom Success Message

Edit text in success section:

```html
<div class="success-message">
    <div class="success-icon">✅</div>
    <h2>Your Custom Title</h2>
    <p>Your custom message here...</p>
</div>
```

## 📊 Monitor Unsubscribe Rate

Track unsubscribe metrics in Google Sheets:

```javascript
function getUnsubscribeRate() {
  const sheet = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID).getSheetByName(CONFIG.SHEET_NAME);
  const data = sheet.getDataRange().getValues();
  
  let total = 0;
  let unsubscribed = 0;
  
  for (let i = 1; i < data.length; i++) {
    total++;
    if (data[i][2] === 'NO') {
      unsubscribed++;
    }
  }
  
  const rate = (unsubscribed / total * 100).toFixed(2);
  Logger.log(`Unsubscribe Rate: ${rate}% (${unsubscribed}/${total})`);
  
  return rate;
}
```

## 💡 Best Practices

### 1. Make it Easy
- No login required
- One-click process
- Immediate confirmation

### 2. Collect Feedback (Optional)
- Understand why people leave
- Improve content based on feedback
- Don't make it required (reduces friction)

### 3. Give Second Chance
- "Stay Subscribed" button prominent
- Show what they'll miss
- Option to change frequency instead

### 4. Keep Door Open
- Friendly messaging
- Easy to re-subscribe
- Links to stay connected (social, website)

### 5. Monitor & Act
- Track unsubscribe rate weekly
- If rate spikes, investigate content/frequency
- Target: <2% unsubscribe rate per campaign

## 📝 Testing Checklist

Before going live, test:

- [ ] Unsubscribe link works in email
- [ ] Email pre-fills correctly
- [ ] Form validation works
- [ ] Submission updates Google Sheet
- [ ] Success message displays
- [ ] "Stay Subscribed" button works
- [ ] Mobile responsive layout
- [ ] All links functional
- [ ] Analytics tracking (if enabled)
- [ ] Privacy policy link works

## 🆘 Support

If you encounter issues:

1. **Check Apps Script Logs**:
   - View → Logs (or Executions)
   - Look for error messages

2. **Test in Incognito Mode**:
   - Rules out browser cache issues

3. **Verify Sheet Permissions**:
   - Apps Script has access to sheet
   - Column structure matches expected

4. **Contact**:
   - GitHub: Open issue
   - Email: support@shramkavach.com

---

**Setup Complete! 🎉**

Your newsletter now has a professional, GDPR-compliant unsubscribe system.
