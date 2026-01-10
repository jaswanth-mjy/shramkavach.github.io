/**
 * ShramKavach Newsletter Automation
 * Google Apps Script to send automated emails with latest articles
 * 
 * Setup Instructions:
 * 1. Go to script.google.com
 * 2. Create new project, paste this code
 * 3. Create a Google Sheet with columns: Email, Name, Subscribed, Language
 * 4. Set SPREADSHEET_ID to your sheet ID
 * 5. Set up time-based trigger (weekly/bi-weekly)
 * 6. Run sendNewsletterToSubscribers() to test
 */

// ============ CONFIGURATION ============
const CONFIG = {
  SPREADSHEET_ID: 'YOUR_SPREADSHEET_ID_HERE', // Replace with your Google Sheet ID
  SHEET_NAME: 'Subscribers',
  WEBSITE_URL: 'https://shramkavach.com',
  SENDER_NAME: 'ShramKavach Team',
  REPLY_TO: 'support@shramkavach.com', // Update with actual email
  UNSUBSCRIBE_URL: 'https://shramkavach.com/unsubscribe.html' // Updated to use dedicated page
};

// ============ LATEST ARTICLES DATA ============
// Update this manually or fetch from a JSON endpoint
const LATEST_ARTICLES = [
  {
    title: "Last 5 Days of 2025: Critical Actions for Gig Workers",
    titleHindi: "2025 के आखिरी 5 दिन: Gig Workers के लिए जरूरी कदम",
    excerpt: "नया साल शुरू होने से पहले ये जरूरी कदम उठाएं। Tax savings, EPF claims, gratuity applications—सब कुछ 31 December तक complete करें या पैसे खो दें।",
    date: "Dec 26, 2025",
    readTime: "10 min read",
    category: "URGENT",
    categoryColor: "#dc2626",
    url: "https://shramkavach.com/updates.html#year-end-2025",
    urgent: true
  },
  {
    title: "India's Gig Workforce Enters Social Security Net",
    titleHindi: "भारत के Gig Workers को मिली Social Security",
    excerpt: "पहली बार app-based workers को 'platform workers' के रूप में कानूनी मान्यता मिली है। 5.12 lakh workers पहले ही register हो चुके हैं।",
    date: "Dec 18, 2025",
    readTime: "8 min read",
    category: "BREAKING",
    categoryColor: "#2563eb",
    url: "https://shramkavach.com/updates.html#social-security",
    urgent: false
  },
  {
    title: "GST Threshold Raised to ₹40 Lakhs",
    titleHindi: "GST Registration की Limit बढ़कर ₹40 लाख",
    excerpt: "Small businesses और freelancers को huge compliance relief। Effective April 1, 2026 से ₹40 lakh तक GST-free growth।",
    date: "Dec 1, 2025",
    readTime: "4 min read",
    category: "CONFIRMED",
    categoryColor: "#ca8a04",
    url: "https://shramkavach.com/updates.html#gst-threshold",
    urgent: false
  }
];

// ============ MAIN FUNCTIONS ============

/**
 * Send newsletter to all subscribed users
 */
function sendNewsletterToSubscribers() {
  const sheet = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID).getSheetByName(CONFIG.SHEET_NAME);
  const data = sheet.getDataRange().getValues();
  
  // Skip header row
  for (let i = 1; i < data.length; i++) {
    const [email, name, subscribed, language] = data[i];
    
    // Skip if not subscribed or invalid email
    if (subscribed !== 'YES' || !email || !isValidEmail(email)) {
      continue;
    }
    
    try {
      const htmlBody = generateNewsletterHTML(name, language || 'en', email);
      const subject = language === 'hi' 
        ? '📬 ShramKavach साप्ताहिक Update - महत्वपूर्ण बदलाव!'
        : '📬 ShramKavach Weekly Update - Important Changes!';
      
      MailApp.sendEmail({
        to: email,
        subject: subject,
        htmlBody: htmlBody,
        name: CONFIG.SENDER_NAME,
        replyTo: CONFIG.REPLY_TO
      });
      
      Logger.log(`✅ Sent to: ${email}`);
      Utilities.sleep(1000); // Prevent rate limiting
      
    } catch (error) {
      Logger.log(`❌ Failed to send to ${email}: ${error.message}`);
      sheet.getRange(i + 1, 5).setValue(`Error: ${error.message}`); // Log error in column E
    }
  }
  
  Logger.log('Newsletter campaign completed!');
}

/**
 * Generate HTML email body
 */
function generateNewsletterHTML(userName, language, userEmail) {
  const isHindi = language === 'hi';
  const email = userEmail || '';
  
  return `
<!DOCTYPE html>
<html lang="${isHindi ? 'hi' : 'en'}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f3f4f6; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px 20px; text-align: center; color: white; }
        .logo { font-size: 28px; font-weight: bold; margin-bottom: 8px; }
        .tagline { font-size: 14px; opacity: 0.9; }
        .greeting { padding: 20px; background-color: #fef3c7; border-left: 4px solid #f59e0b; }
        .greeting-text { font-size: 16px; color: #78350f; }
        .content { padding: 20px; }
        .article { margin-bottom: 25px; border-left: 4px solid #e5e7eb; padding-left: 15px; transition: all 0.3s; }
        .article:hover { border-left-color: #667eea; }
        .article-urgent { border-left-color: #dc2626 !important; background-color: #fef2f2; padding: 15px; border-radius: 8px; }
        .article-category { display: inline-block; font-size: 11px; font-weight: bold; padding: 4px 10px; border-radius: 12px; margin-bottom: 8px; color: white; }
        .article-title { font-size: 18px; font-weight: bold; color: #111827; margin-bottom: 8px; line-height: 1.4; }
        .article-meta { font-size: 12px; color: #6b7280; margin-bottom: 10px; }
        .article-excerpt { font-size: 14px; color: #4b5563; line-height: 1.6; margin-bottom: 12px; }
        .read-more { display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 14px; transition: transform 0.2s; }
        .read-more:hover { transform: translateY(-2px); }
        .stats-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin: 25px 0; }
        .stat-card { background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%); padding: 15px; border-radius: 8px; text-align: center; }
        .stat-number { font-size: 24px; font-weight: bold; color: #667eea; }
        .stat-label { font-size: 12px; color: #6b7280; margin-top: 5px; }
        .footer { background-color: #111827; color: #9ca3af; padding: 25px 20px; text-align: center; }
        .footer-links { margin: 15px 0; }
        .footer-link { color: #60a5fa; text-decoration: none; margin: 0 10px; font-size: 13px; }
        .social-icons { margin: 20px 0; }
        .social-icon { display: inline-block; margin: 0 8px; color: #60a5fa; font-size: 20px; }
        .unsubscribe { font-size: 11px; color: #6b7280; margin-top: 15px; }
        .urgent-banner { background: linear-gradient(135deg, #dc2626 0%, #f59e0b 100%); color: white; padding: 15px 20px; text-align: center; font-weight: bold; animation: pulse 2s infinite; }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.8; } }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <div class="header">
            <div class="logo">🛡️ ShramKavach</div>
            <div class="tagline">${isHindi ? 'आपके अधिकार, हमारी जिम्मेदारी' : 'Your Rights, Our Responsibility'}</div>
        </div>

        ${LATEST_ARTICLES.some(a => a.urgent) ? `
        <!-- Urgent Banner -->
        <div class="urgent-banner">
            ⚡ ${isHindi ? 'जरूरी: 31 December तक action लें!' : 'URGENT: Take action before Dec 31!'}
        </div>
        ` : ''}

        <!-- Greeting -->
        <div class="greeting">
            <div class="greeting-text">
                ${isHindi 
                  ? `नमस्ते ${userName || 'दोस्त'} 👋` 
                  : `Hello ${userName || 'Friend'} 👋`
                }
                <br>
                ${isHindi
                  ? 'इस हफ्ते के सबसे important labour law updates:'
                  : 'Here are this week\'s most important labour law updates:'
                }
            </div>
        </div>

        <!-- Platform Stats -->
        <div class="content">
            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-number">34+</div>
                    <div class="stat-label">${isHindi ? 'मुफ्त Calculators' : 'Free Calculators'}</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number">1200+</div>
                    <div class="stat-label">${isHindi ? 'AI Prompts' : 'AI Prompts'}</div>
                </div>
            </div>

            <!-- Articles -->
            ${LATEST_ARTICLES.map(article => `
            <div class="article ${article.urgent ? 'article-urgent' : ''}">
                <div class="article-category" style="background-color: ${article.categoryColor};">
                    ${article.category}
                </div>
                <div class="article-title">
                    ${isHindi ? article.titleHindi : article.title}
                </div>
                <div class="article-meta">
                    📅 ${article.date} • ⏱️ ${article.readTime}
                </div>
                <div class="article-excerpt">
                    ${article.excerpt}
                </div>
                <a href="${article.url}" class="read-more">
                    ${isHindi ? 'पूरा पढ़ें →' : 'Read Full Article →'}
                </a>
            </div>
            `).join('')}

            <!-- CTA Section -->
            <div style="background: linear-gradient(135deg, #fef3c7 0%, #fed7aa 100%); padding: 20px; border-radius: 8px; text-align: center; margin-top: 30px;">
                <div style="font-size: 18px; font-weight: bold; color: #78350f; margin-bottom: 10px;">
                    ${isHindi ? '🎯 और भी बहुत कुछ है!' : '🎯 There\'s More!'}
                </div>
                <div style="font-size: 14px; color: #92400e; margin-bottom: 15px;">
                    ${isHindi 
                      ? 'Tax calculators, legal document generators, और AI-powered prompts explore करें'
                      : 'Explore tax calculators, legal document generators, and AI-powered prompts'
                    }
                </div>
                <a href="${CONFIG.WEBSITE_URL}" style="display: inline-block; background: #78350f; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold;">
                    ${isHindi ? 'Website पर जाएं →' : 'Visit Website →'}
                </a>
            </div>
        </div>

        <!-- Footer -->
        <div class="footer">
            <div>
                <strong>ShramKavach</strong> - Empowering India's Workforce
            </div>
            <div class="footer-links">
                <a href="${CONFIG.WEBSITE_URL}/updates.html" class="footer-link">Updates</a>
                <a href="${CONFIG.WEBSITE_URL}/calculators.html" class="footer-link">Calculators</a>
                <a href="${CONFIG.WEBSITE_URL}/prompts.html" class="footer-link">AI Prompts</a>
            </div>
            <div class="social-icons">
                <a href="#" class="social-icon">📧</a>
                <a href="#" class="social-icon">🐦</a>
                <a href="#" class="social-icon">📱</a>
            </div>
            <div class="unsubscribe">
                ${isHindi 
                  ? `यह email आपको इसलिए मिला क्योंकि आपने ShramKavach newsletter subscribe किया है।<br>`
                  : `You received this email because you subscribed to ShramKavach newsletter.<br>`
                }
                <a href="${CONFIG.UNSUBSCRIBE_URL}?email=${encodeURIComponent(email)}" style="color: #60a5fa;">
                  ${isHindi ? 'Unsubscribe करें' : 'Unsubscribe'}
                </a>
            </div>
        </div>
    </div>
</body>
</html>
`;
}

// ============ HELPER FUNCTIONS ============

/**
 * Validate email format
 */
function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

/**
 * Add new subscriber (can be called from Google Form)
 */
function addSubscriber(email, name, language = 'en') {
  const sheet = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID).getSheetByName(CONFIG.SHEET_NAME);
  
  if (!isValidEmail(email)) {
    throw new Error('Invalid email address');
  }
  
  // Check if already exists
  const data = sheet.getDataRange().getValues();
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === email) {
      sheet.getRange(i + 1, 3).setValue('YES'); // Re-subscribe
      return 'Already subscribed - reactivated';
    }
  }
  
  // Add new subscriber
  sheet.appendRow([email, name, 'YES', language, new Date()]);
  
  // Send welcome email
  sendWelcomeEmail(email, name, language);
  
  return 'Subscribed successfully';
}

/**
 * Send welcome email to new subscriber
 */
function sendWelcomeEmail(email, name, language) {
  const isHindi = language === 'hi';
  const subject = isHindi 
    ? '🎉 ShramKavach में आपका स्वागत है!'
    : '🎉 Welcome to ShramKavach!';
  
  const body = `
    <h2>${isHindi ? 'स्वागत है' : 'Welcome'} ${name}!</h2>
    <p>${isHindi 
      ? 'ShramKavach newsletter subscribe करने के लिए धन्यवाद। अब आपको हर हफ्ते latest labour law updates मिलेंगे।'
      : 'Thank you for subscribing to ShramKavach newsletter. You\'ll receive weekly labour law updates.'
    }</p>
    <p><a href="${CONFIG.WEBSITE_URL}">Visit Website →</a></p>
  `;
  
  MailApp.sendEmail({
    to: email,
    subject: subject,
    htmlBody: body,
    name: CONFIG.SENDER_NAME
  });
}

/**
 * Unsubscribe user from newsletter
 */
function unsubscribeUser(email, reasons = []) {
  const sheet = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID).getSheetByName(CONFIG.SHEET_NAME);
  const data = sheet.getDataRange().getValues();
  
  // Find user and update subscription status
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === email) {
      sheet.getRange(i + 1, 3).setValue('NO'); // Set Subscribed to NO
      sheet.getRange(i + 1, 5).setValue(`Unsubscribed on ${new Date()}`);
      
      // Log feedback reasons
      if (reasons.length > 0) {
        sheet.getRange(i + 1, 6).setValue(reasons.join(', '));
      }
      
      Logger.log(`✅ Unsubscribed: ${email}`);
      return 'Successfully unsubscribed';
    }
  }
  
  return 'Email not found in subscriber list';
}

/**
 * Handle web app POST requests (for unsubscribe page)
 */
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    
    if (data.action === 'subscribe') {
      const result = addSubscriber(data.email, data.name, data.language);
      return ContentService
        .createTextOutput(JSON.stringify({ success: true, message: result }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    if (data.action === 'unsubscribe') {
      const result = unsubscribeUser(data.email, data.reasons || []);
      return ContentService
        .createTextOutput(JSON.stringify({ success: true, message: result }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, message: 'Invalid action' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    Logger.log(`❌ doPost error: ${error.message}`);
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, message: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Handle web app GET requests (for testing)
 */
function doGet(e) {
  return ContentService.createTextOutput('ShramKavach Newsletter API is running!');
}

/**
 * Test function - send to single email
 */
function testNewsletter() {
  const testEmail = 'your-test-email@gmail.com'; // Replace with your email
  const htmlBody = generateNewsletterHTML('Test User', 'en');
  
  MailApp.sendEmail({
    to: testEmail,
    subject: '📬 ShramKavach Newsletter Test',
    htmlBody: htmlBody,
    name: CONFIG.SENDER_NAME
  });
  
  Logger.log('Test email sent to: ' + testEmail);
}

/**
 * Create triggers for automation
 * Run this once to set up weekly schedule
 */
function createWeeklyTrigger() {
  // Delete existing triggers first
  const triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(trigger => ScriptApp.deleteTrigger(trigger));
  
  // Create new weekly trigger (every Monday at 9 AM)
  ScriptApp.newTrigger('sendNewsletterToSubscribers')
    .timeBased()
    .onWeekDay(ScriptApp.WeekDay.MONDAY)
    .atHour(9)
    .create();
  
  Logger.log('✅ Weekly trigger created for Monday 9 AM');
}
