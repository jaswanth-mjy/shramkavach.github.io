# Project Shram Contact Form - Google Apps Script Setup

## Overview
This setup allows your contact form on `launch.html` to send submissions to a Google Sheet and receive email notifications in real-time.

## Step-by-Step Setup

### 1. Create Google Sheet
1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it: **"Project Shram Contact Submissions"**
4. Keep it open for the next steps

### 2. Add Apps Script
1. In your Google Sheet, click **Extensions** → **Apps Script**
2. Delete any default code in the editor
3. Copy all code from `project-shram-contact-form.gs` and paste it
4. Update the configuration at the top:
   ```javascript
   const CONFIG = {
     SHEET_NAME: 'Submissions',
     NOTIFICATION_EMAIL: 'your-email@example.com', // ← Change to your email
     SEND_EMAIL_NOTIFICATIONS: true,
     ALLOW_CORS: true
   };
   ```

### 3. Deploy as Web App
1. In Apps Script editor, click **Deploy** → **New deployment**
2. Click the gear icon ⚙️ next to "Select type"
3. Choose **Web app**
4. Configure deployment:
   - **Description**: Project Shram Contact Form API
   - **Execute as**: Me (your email)
   - **Who has access**: Anyone
5. Click **Deploy**
6. Click **Authorize access** and allow permissions
7. Copy the **Web app URL** (looks like: `https://script.google.com/macros/s/ABC...XYZ/exec`)

### 4. Update launch.html
1. Open `launch.html` in your code editor
2. Find line ~574 (in the contact form JavaScript):
   ```javascript
   const SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE';
   ```
3. Replace with your actual Web App URL:
   ```javascript
   const SCRIPT_URL = 'https://script.google.com/macros/s/ABC...XYZ/exec';
   ```
4. Save the file

### 5. Test the Form
1. Commit and push your changes to GitHub
2. Wait for deployment (30-60 seconds)
3. Visit `https://shramkavach.com/launch.html`
4. Scroll to contact form
5. Fill out and submit a test message
6. Check:
   - ✓ Google Sheet should have a new row with submission
   - ✓ You should receive an email notification
   - ✓ Form should show success message

## What You'll Receive

### In Google Sheet
Each submission creates a new row with:
- **Timestamp**: When the form was submitted
- **Name**: User's name
- **Email**: User's email address
- **Message**: Their message
- **Status**: "New" (you can manually change to "Read")

### Email Notification
You'll receive an email with:
- Subject: "New Contact Form Submission - Project Shram"
- Formatted message with all details
- Direct link to reply to the user's email

## Advanced Features

### Mark Submissions as Read
In Apps Script editor, you can manually run:
```javascript
markAsRead(2); // Marks row 2 as read
```

### View Unread Submissions
```javascript
const unread = getUnreadSubmissions();
Logger.log(unread);
```

### Delete Old Submissions
```javascript
deleteOldSubmissions(90); // Delete submissions older than 90 days
```

### Turn Off Email Notifications
If you don't want emails, update config:
```javascript
SEND_EMAIL_NOTIFICATIONS: false
```

## Troubleshooting

### Form shows "Failed to send"
- Check that Web App URL is correct in launch.html
- Ensure deployment is set to "Anyone" can access
- Check Apps Script execution logs for errors

### Not receiving emails
- Verify `NOTIFICATION_EMAIL` is correct in config
- Check your spam folder
- Ensure `SEND_EMAIL_NOTIFICATIONS: true`

### Sheet not updating
- Check that `SHEET_NAME: 'Submissions'` matches sheet name
- Review Apps Script execution logs
- Make sure Apps Script has permission to access the sheet

### CORS Errors
- These are normal with `mode: 'no-cors'`
- Form will still work despite console warnings
- The script receives data successfully

## Security Notes

- Web app URL is public but only accepts POST requests
- Email validation is performed server-side
- No sensitive data is exposed in client code
- Google handles all authentication and security

## Files Structure

```
google-apps-script/
├── project-shram-contact-form.gs   # Main Apps Script code
└── SETUP-INSTRUCTIONS.md           # This file
```

## Need Help?

If you encounter issues:
1. Check Apps Script execution logs: Apps Script Editor → Executions
2. View detailed error messages
3. Test the script with `testFormSubmission()` function
4. Ensure all permissions are granted

## Next Steps After Setup

1. ✅ Test with multiple submissions
2. ✅ Verify email notifications work
3. ✅ Check Google Sheet formatting
4. ✅ Consider setting up automated responses (optional)
5. ✅ Set up regular sheet backups (optional)

---

**Last Updated**: January 19, 2026
**Contact Form Location**: https://shramkavach.com/launch.html
