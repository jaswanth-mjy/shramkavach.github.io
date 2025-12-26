# 📧 ShramKavach Newsletter Automation

Automated email newsletter system using Google Apps Script to send weekly updates to subscribers with beautiful formatting and "Read More" links.

## ✨ Features

- ✅ **Automated Weekly Emails** - Schedule newsletters for specific days/times
- ✅ **Beautiful HTML Design** - Professional, mobile-responsive emails
- ✅ **Bilingual Support** - English & Hindi content
- ✅ **Read More Links** - Drive traffic back to shramkavach.com
- ✅ **Subscriber Management** - Google Sheets database
- ✅ **Welcome Emails** - Automatic onboarding
- ✅ **Unsubscribe Handling** - GDPR compliant
- ✅ **Rate Limiting** - Prevents Gmail quota issues

## 🚀 Setup Instructions

### Step 1: Create Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create new spreadsheet named "ShramKavach Subscribers"
3. Create sheet named "Subscribers" with these columns:

| Email | Name | Subscribed | Language | Joined Date |
|-------|------|------------|----------|-------------|
| user@example.com | John Doe | YES | en | 2025-12-26 |
| user2@example.com | रोहन | YES | hi | 2025-12-26 |

4. Copy the Spreadsheet ID from URL:
   ```
   https://docs.google.com/spreadsheets/d/SPREADSHEET_ID_HERE/edit
   ```

### Step 2: Create Apps Script Project

1. Go to [Google Apps Script](https://script.google.com)
2. Click **New Project**
3. Name it "ShramKavach Newsletter"
4. Delete default code
5. Paste contents from `newsletter-automation.gs`
6. Update `CONFIG` section:
   ```javascript
   const CONFIG = {
     SPREADSHEET_ID: 'YOUR_SPREADSHEET_ID_HERE', // Paste your ID
     SHEET_NAME: 'Subscribers',
     WEBSITE_URL: 'https://shramkavach.com',
     SENDER_NAME: 'ShramKavach Team',
     REPLY_TO: 'support@shramkavach.com', // Your email
     UNSUBSCRIBE_FORM_URL: 'https://forms.gle/YOUR_FORM_ID' // Create form
   };
   ```

### Step 3: Update Article Data

Before each newsletter, update the `LATEST_ARTICLES` array in the script:

```javascript
const LATEST_ARTICLES = [
  {
    title: "Your Latest Article Title",
    titleHindi: "आपका लेख का शीर्षक",
    excerpt: "Brief description with key points...",
    date: "Dec 26, 2025",
    readTime: "10 min read",
    category: "BREAKING", // URGENT, BREAKING, CONFIRMED
    categoryColor: "#dc2626", // Red for urgent
    url: "https://shramkavach.com/updates.html#article-anchor",
    urgent: true // Shows pulsing banner at top
  },
  // Add 2-4 more articles...
];
```

### Step 4: Test the System

1. In Apps Script editor, find function dropdown (top toolbar)
2. Select `testNewsletter`
3. Update test email in function:
   ```javascript
   const testEmail = 'your-email@gmail.com';
   ```
4. Click **Run** (▶️ button)
5. **First run**: Grant permissions when prompted
6. Check your inbox for test email

### Step 5: Set Up Automation

1. In Apps Script, select `createWeeklyTrigger` function
2. Click **Run**
3. Newsletter will now send every **Monday at 9 AM** automatically
4. To change schedule, edit this section:
   ```javascript
   ScriptApp.newTrigger('sendNewsletterToSubscribers')
     .timeBased()
     .onWeekDay(ScriptApp.WeekDay.MONDAY) // Change day
     .atHour(9) // Change hour (0-23)
     .create();
   ```

### Step 6: Create Unsubscribe Form (Optional)

1. Go to [Google Forms](https://forms.google.com)
2. Create form with these fields:
   - Email (short answer, required)
   - Reason (multiple choice, optional)
3. Link form responses to your Google Sheet
4. Copy form link and update `UNSUBSCRIBE_FORM_URL` in config

## 📊 Managing Subscribers

### Manual Addition
1. Open your Google Sheet
2. Add row: `email@example.com | Name | YES | en | 2025-12-26`

### Via Script
Use `addSubscriber()` function:
```javascript
addSubscriber('user@example.com', 'John Doe', 'en');
```

### Unsubscribe
Change `Subscribed` column from `YES` to `NO`

## 🎨 Email Preview

The newsletter includes:

- **Header** - Purple gradient with ShramKavach logo
- **Urgent Banner** - Pulsing red banner for critical updates
- **Greeting** - Personalized welcome message
- **Stats Cards** - Platform metrics (34+ calculators, 1200+ prompts)
- **Article Cards** - Each with:
  - Category badge (URGENT/BREAKING/CONFIRMED)
  - Bilingual title
  - Date + read time
  - Excerpt
  - "Read More" button linking to website
- **CTA Section** - Highlighted call-to-action to visit website
- **Footer** - Links, social icons, unsubscribe

## 📈 Best Practices

### Sending Frequency
- **Weekly** (recommended) - Monday mornings
- **Bi-weekly** - For less frequent updates
- **Monthly** - For digest-style newsletters

### Content Strategy
- Include **1 urgent + 2-3 regular** articles per email
- Keep excerpts to 2-3 lines
- Use category colors strategically:
  - Red (`#dc2626`) - URGENT
  - Blue (`#2563eb`) - BREAKING
  - Yellow (`#ca8a04`) - CONFIRMED

### Gmail Quota Limits
- **Free Gmail**: 100 emails/day
- **Google Workspace**: 1,500 emails/day
- Script includes 1-second delay between emails
- For large lists (500+), consider:
  - Batch processing over multiple days
  - Using dedicated email service (SendGrid, Mailchimp)

## 🔧 Advanced Features

### A/B Testing
Track open rates by adding UTM parameters:
```javascript
url: "https://shramkavach.com/updates.html#article?utm_source=newsletter&utm_medium=email&utm_campaign=weekly"
```

### Dynamic Content
Fetch articles from JSON endpoint instead of hardcoding:
```javascript
function fetchLatestArticles() {
  const response = UrlFetchApp.fetch('https://shramkavach.com/api/latest-articles.json');
  return JSON.parse(response.getContentText());
}
```

### Language Segmentation
Send Hindi-only or English-only newsletters:
```javascript
// In sendNewsletterToSubscribers(), filter by language
if (language === 'hi') {
  // Send Hindi newsletter
}
```

## 🐛 Troubleshooting

### Emails Not Sending?
1. Check **Executions** tab in Apps Script
2. Look for error messages
3. Common issues:
   - Invalid `SPREADSHEET_ID`
   - Email quota exceeded (wait 24 hours)
   - Permissions not granted

### Formatting Issues?
- Test in multiple email clients (Gmail, Outlook, Apple Mail)
- Inline CSS is required (no `<style>` in `<head>`)
- Avoid complex layouts (keep it simple)

### Trigger Not Working?
1. Go to **Triggers** tab (clock icon)
2. Check if trigger exists
3. Delete and recreate using `createWeeklyTrigger()`

## 📱 Mobile Responsiveness

The email is mobile-optimized with:
- Fluid container (max-width: 600px)
- Responsive padding
- Touch-friendly buttons
- Readable font sizes
- Grid layout for stats

## 🔒 Privacy & Compliance

- **GDPR**: Include unsubscribe link in every email
- **CAN-SPAM**: Use real sender name and address
- **Data Storage**: Minimal (email, name, language only)
- **Consent**: Only email confirmed subscribers

## 📝 Customization

### Colors
Update gradient colors in HTML:
```javascript
background: linear-gradient(135deg, #YOUR_COLOR_1 0%, #YOUR_COLOR_2 100%);
```

### Logo
Replace emoji with image:
```html
<img src="https://shramkavach.com/logo.png" alt="ShramKavach" style="width: 120px;">
```

### Footer Links
Add social media URLs:
```html
<a href="https://twitter.com/shramkavach" class="social-icon">🐦</a>
```

## 📞 Support

For questions or issues:
- GitHub Issues: [Create issue](https://github.com/jaswanth-mjy/shramkavach/issues)
- Email: support@shramkavach.com

## 📄 License

Same as main ShramKavach project (see root LICENSE file)

---

**Happy Automating! 🚀**
