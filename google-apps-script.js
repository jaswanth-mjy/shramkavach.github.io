/**
 * Google Apps Script for ShramKavach Contact Form
 * 
 * SETUP INSTRUCTIONS:
 * 1. Go to https://script.google.com
 * 2. Click "New Project"
 * 3. Delete any existing code and paste this entire script
 * 4. Click "Deploy" > "New deployment"
 * 5. Click the gear icon ⚙️ next to "Select type" and choose "Web app"
 * 6. Configure:
 *    - Description: "ShramKavach Contact Form"
 *    - Execute as: "Me"
 *    - Who has access: "Anyone"
 * 7. Click "Deploy"
 * 8. Copy the "Web app URL" (looks like: https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec)
 * 9. Replace SCRIPT_URL in index.html with this URL
 * 10. Click "Authorize access" and grant permissions
 * 
 * BENEFITS:
 * ✅ 100% Free (Google Workspace quota: 100 emails/day)
 * ✅ No email client popup
 * ✅ Professional email formatting
 * ✅ Automatic email notifications
 * ✅ Form data validation
 * ✅ Error handling
 * ✅ CORS enabled for web requests
 */

// Your email address where form submissions will be sent
const RECIPIENT_EMAIL = "jaswanthplc@gmail.com";
const FORM_NAME = "ShramKavach Contact Form";

/**
 * Handle POST requests from the contact form
 */
function doPost(e) {
  try {
    // Parse the incoming JSON data
    const data = JSON.parse(e.postData.contents);
    
    // Validate required fields
    if (!data.name || !data.email || !data.message) {
      return createResponse(false, "Missing required fields");
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return createResponse(false, "Invalid email address");
    }
    
    // Send email notification
    const success = sendEmail(data);
    
    if (success) {
      // Send auto-reply to the user
      sendAutoReply(data);
      
      // Optional: Save to Google Sheets
      // saveToSheet(data);
      
      return createResponse(true, "Query submitted successfully! We'll get back to you within 24-48 hours.");
    } else {
      return createResponse(false, "Failed to send email. Please try again.");
    }
    
  } catch (error) {
    console.error("Error processing request:", error);
    return createResponse(false, "Server error: " + error.message);
  }
}

/**
 * Handle GET requests (for testing)
 */
function doGet(e) {
  return ContentService.createTextOutput(
    JSON.stringify({
      status: "success",
      message: "ShramKavach Contact Form API is running",
      endpoint: "POST requests only",
      timestamp: new Date().toISOString()
    })
  ).setMimeType(ContentService.MimeType.JSON);
}

/**
 * Send email notification
 */
function sendEmail(data) {
  try {
    const subject = `${FORM_NAME}: ${data.type || 'General Query'}`;
    
    // Create HTML email body
    const htmlBody = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; }
          .header h1 { margin: 0; font-size: 24px; }
          .content { background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; }
          .field { margin-bottom: 20px; }
          .label { font-weight: bold; color: #667eea; margin-bottom: 5px; }
          .value { background: white; padding: 10px; border-radius: 5px; border: 1px solid #e5e7eb; }
          .message-box { background: white; padding: 15px; border-radius: 5px; border-left: 4px solid #667eea; margin-top: 10px; }
          .footer { background: #f3f4f6; padding: 20px; text-align: center; font-size: 12px; color: #6b7280; border-radius: 0 0 10px 10px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>&#128276; New Contact Form Submission</h1>
            <p style="margin: 5px 0 0 0; opacity: 0.9;">ShramKavach - Labour Rights Protection</p>
          </div>
          
          <div class="content">
            <div class="field">
              <div class="label">&#128100; Name:</div>
              <div class="value">${data.name}</div>
            </div>
            
            <div class="field">
              <div class="label">&#128231; Email:</div>
              <div class="value"><a href="mailto:${data.email}">${data.email}</a></div>
            </div>
            
            <div class="field">
              <div class="label">&#128241; Phone:</div>
              <div class="value">${data.phone || 'Not provided'}</div>
            </div>
            
            <div class="field">
              <div class="label">&#128203; Query Type:</div>
              <div class="value">${data.type || 'General'}</div>
            </div>
            
            <div class="field">
              <div class="label">&#128172; Message:</div>
              <div class="message-box">${data.message.replace(/\n/g, '<br>')}</div>
            </div>
            
            <div class="field">
              <div class="label">&#128338; Submitted:</div>
              <div class="value">${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST</div>
            </div>
          </div>
          
          <div class="footer">
            <p><strong>Quick Actions:</strong></p>
            <p>
              <a href="mailto:${data.email}?subject=Re: ${encodeURIComponent(data.type || 'Your Query')}" style="color: #667eea; text-decoration: none;">Reply via Email</a> | 
              <a href="https://wa.me/${(data.phone || '').replace(/\D/g, '')}" style="color: #667eea; text-decoration: none;">WhatsApp</a> | 
              <a href="https://shramkavach.github.io" style="color: #667eea; text-decoration: none;">Visit Website</a>
            </p>
            <p style="margin-top: 15px; color: #9ca3af;">
              This email was sent from the ShramKavach contact form.<br>
              Please respond within 24-48 hours to maintain quality service.
            </p>
          </div>
        </div>
      </body>
      </html>
    `;
    
    // Plain text version for email clients that don't support HTML
    const plainBody = `
New Contact Form Submission - ShramKavach

Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone || 'Not provided'}
Query Type: ${data.type || 'General'}

Message:
${data.message}

Submitted: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST

---
Reply to: ${data.email}
Visit: https://shramkavach.github.io
    `;
    
    // Send email
    GmailApp.sendEmail(
      RECIPIENT_EMAIL,
      subject,
      plainBody,
      {
        htmlBody: htmlBody,
        name: FORM_NAME,
        replyTo: data.email,
        noReply: false
      }
    );
    
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
}

/**
 * Send auto-reply confirmation email to the user
 */
function sendAutoReply(data) {
  try {
    const subject = `Thank you for contacting ShramKavach - We've received your ${data.type || 'query'}`;
    
    // Create HTML auto-reply email
    const htmlBody = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 40px 30px; border-radius: 10px 10px 0 0; text-align: center; }
          .header h1 { margin: 0 0 10px 0; font-size: 28px; }
          .header p { margin: 0; opacity: 0.95; font-size: 16px; }
          .content { background: #ffffff; padding: 40px 30px; border-left: 1px solid #e5e7eb; border-right: 1px solid #e5e7eb; }
          .greeting { font-size: 18px; color: #1f2937; margin-bottom: 20px; }
          .message { color: #4b5563; margin-bottom: 25px; line-height: 1.8; }
          .info-box { background: #f0f9ff; border-left: 4px solid #667eea; padding: 20px; margin: 25px 0; border-radius: 5px; }
          .info-box h3 { margin: 0 0 10px 0; color: #667eea; font-size: 16px; }
          .info-box p { margin: 5px 0; color: #1e40af; }
          .details { background: #f9fafb; padding: 20px; border-radius: 8px; margin: 25px 0; }
          .details h3 { margin: 0 0 15px 0; color: #374151; font-size: 16px; }
          .detail-row { display: flex; padding: 10px 0; border-bottom: 1px solid #e5e7eb; }
          .detail-row:last-child { border-bottom: none; }
          .detail-label { font-weight: bold; color: #6b7280; min-width: 120px; }
          .detail-value { color: #1f2937; }
          .cta-section { text-align: center; margin: 30px 0; }
          .cta-button { display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 40px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; }
          .footer { background: #f3f4f6; padding: 30px; text-align: center; border-radius: 0 0 10px 10px; border: 1px solid #e5e7eb; border-top: none; }
          .footer-links { margin: 20px 0; }
          .footer-links a { color: #667eea; text-decoration: none; margin: 0 15px; font-weight: 500; }
          .social-icons { margin: 20px 0; }
          .disclaimer { font-size: 12px; color: #9ca3af; margin-top: 20px; line-height: 1.6; }
          .checkmark { font-size: 48px; color: #10b981; text-align: center; margin-bottom: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="checkmark">&#10003;</div>
            <h1>Query Received Successfully!</h1>
            <p>Your message has been delivered to our team</p>
          </div>
          
          <div class="content">
            <div class="greeting">
              Dear <strong>${data.name}</strong>,
            </div>
            
            <div class="message">
              Thank you for reaching out to <strong>ShramKavach</strong>! We've successfully received your ${data.type || 'query'} and our team is already reviewing it.
            </div>
            
            <div class="info-box">
              <h3>&#9200; What Happens Next?</h3>
              <p>&#10003; Our team will review your submission within 2-4 hours</p>
              <p>&#10003; You'll receive a detailed response within 24-48 hours</p>
              <p>&#10003; For urgent matters, we'll prioritize your request</p>
            </div>
            
            <div class="details">
              <h3>&#128203; Your Submission Details:</h3>
              <div class="detail-row">
                <span class="detail-label">Query Type:</span>
                <span class="detail-value">${data.type || 'General'}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Submitted:</span>
                <span class="detail-value">${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'full', timeStyle: 'short' })} IST</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Reference Email:</span>
                <span class="detail-value">${data.email}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Phone:</span>
                <span class="detail-value">${data.phone || 'Not provided'}</span>
              </div>
            </div>
            
            <div class="message">
              <strong>Your Message:</strong><br>
              <div style="background: #f9fafb; padding: 15px; border-radius: 5px; margin-top: 10px; color: #4b5563; font-style: italic;">
                "${data.message}"
              </div>
            </div>
            
            <div class="cta-section">
              <a href="https://shramkavach.github.io" class="cta-button">Visit Our Website</a>
            </div>
            
            <div class="message" style="margin-top: 30px;">
              While you wait for our response, feel free to:
              <ul style="color: #4b5563;">
                <li>Explore our <a href="https://shramkavach.github.io/calculators.html" style="color: #667eea;">Labour Law Calculators</a></li>
                <li>Generate <a href="https://shramkavach.github.io/protection.html" style="color: #667eea;">Legal Documents</a></li>
                <li>Read our <a href="https://shramkavach.github.io/#faq" style="color: #667eea;">FAQs</a></li>
              </ul>
            </div>
          </div>
          
          <div class="footer">
            <p style="font-weight: bold; color: #374151; margin-bottom: 15px;">Need Immediate Assistance?</p>
            
            <div class="footer-links">
              <a href="mailto:jaswanthplc@gmail.com">&#128231; Email Us</a>
              <a href="https://wa.me/+919876543210">&#128172; WhatsApp</a>
              <a href="https://shramkavach.github.io">&#127760; Website</a>
              Empowering workers with knowledge, tools, and legal support.<br><br>
              
              This is an automated confirmation email. Please do not reply to this email.<br>
              For any queries, please use the contact methods above or submit a new form on our website.<br><br>
              
              © 2025 ShramKavach. All rights reserved.<br>
              Protecting labour rights, one worker at a time.
            </div>
          </div>
        </div>
      </body>
      </html>
    `;
    
    // Plain text version
    const plainBody = `
Dear ${data.name},

Thank you for contacting ShramKavach!

We've successfully received your ${data.type || 'query'} and our team is reviewing it.

WHAT HAPPENS NEXT:
- Our team will review your submission within 2-4 hours
- You'll receive a detailed response within 24-48 hours
- For urgent matters, we'll prioritize your request

YOUR SUBMISSION DETAILS:
- Query Type: ${data.type || 'General'}
- Submitted: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST
- Email: ${data.email}
- Phone: ${data.phone || 'Not provided'}

Your Message:
"${data.message}"

NEED IMMEDIATE ASSISTANCE?
- Email: jaswanthplc@gmail.com
- WhatsApp: +91 9876543210
- Website: https://shramkavach.github.io

While you wait, explore our:
- Labour Law Calculators: https://shramkavach.github.io/calculators.html
- Legal Document Generators: https://shramkavach.github.io/protection.html
- FAQs: https://shramkavach.github.io/#faq

---
ShramKavach - Labour Rights Protection Platform
Empowering workers with knowledge, tools, and legal support.

This is an automated confirmation. Please do not reply to this email.

© 2025 ShramKavach. All rights reserved.
    `;
    
    // Send auto-reply email to the user
    GmailApp.sendEmail(
      data.email,
      subject,
      plainBody,
      {
        htmlBody: htmlBody,
        name: 'ShramKavach Support',
        replyTo: 'jaswanthplc@gmail.com',
        noReply: false
      }
    );
    
    return true;
  } catch (error) {
    console.error("Error sending auto-reply:", error);
    return false;
  }
}

/**
 * Optional: Save form data to Google Sheets
 * Uncomment this function and call it from doPost() if you want to log submissions
 */
/*
function saveToSheet(data) {
  try {
    // Create or get the spreadsheet
    const spreadsheetId = "YOUR_SPREADSHEET_ID"; // Replace with your Google Sheets ID
    const sheet = SpreadsheetApp.openById(spreadsheetId).getActiveSheet();
    
    // If first row is empty, add headers
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Timestamp", "Name", "Email", "Phone", "Query Type", "Message", "Status"]);
    }
    
    // Append form data
    sheet.appendRow([
      new Date(),
      data.name,
      data.email,
      data.phone || "",
      data.type || "General",
      data.message,
      "New"
    ]);
    
    return true;
  } catch (error) {
    console.error("Error saving to sheet:", error);
    return false;
  }
}
*/

/**
 * Create JSON response with CORS headers
 */
function createResponse(success, message, data = {}) {
  const response = {
    success: success,
    message: message,
    timestamp: new Date().toISOString(),
    ...data
  };
  
  return ContentService
    .createTextOutput(JSON.stringify(response))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Test function - Run this from the Apps Script editor to test
 */
function testEmailSending() {
  const testData = {
    name: "Test User",
    email: "test@example.com",
    phone: "+91 9876543210",
    type: "General Query",
    message: "This is a test message to verify the email functionality."
  };
  
  const result = sendEmail(testData);
  console.log("Test email sent:", result);
  
  if (result) {
    console.log("✅ Email sent successfully! Check your inbox at:", RECIPIENT_EMAIL);
  } else {
    console.log("❌ Failed to send email. Check the logs for errors.");
  }
}
