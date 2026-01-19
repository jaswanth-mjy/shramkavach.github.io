/**
 * Project Shram Contact Form Handler
 * Google Apps Script to receive contact form submissions
 * 
 * SETUP INSTRUCTIONS:
 * 1. Create a new Google Sheet named "Project Shram Contact Submissions"
 * 2. In the sheet, go to Extensions > Apps Script
 * 3. Copy this entire code and paste it there
 * 4. Click Deploy > New Deployment > Select type: Web App
 * 5. Settings:
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 6. Click Deploy and copy the Web App URL
 * 7. Replace 'YOUR_WEB_APP_URL' in launch.html with this URL
 * 
 * The script will:
 * - Save submissions to Google Sheet
 * - Send email notification to you
 * - Return success/error response to the form
 */

// Configuration - Update these values
const CONFIG = {
  SHEET_NAME: 'Submissions',
  NOTIFICATION_EMAIL: 'shramkavach@gmail.com', // Change this to your email
  SEND_EMAIL_NOTIFICATIONS: true, // Set to false to disable email notifications
  ALLOW_CORS: true // Allow cross-origin requests
};

/**
 * Handle POST requests from contact form
 */
function doPost(e) {
  try {
    // Check if event object exists
    if (!e) {
      Logger.log('Error: No event object received');
      return createResponse(false, 'Invalid request: No event data');
    }
    
    // Check if postData exists
    if (!e.postData || !e.postData.contents) {
      Logger.log('Error: No postData in event object');
      Logger.log('Event object: ' + JSON.stringify(e));
      return createResponse(false, 'Invalid request: No post data');
    }
    
    // Parse the incoming data
    Logger.log('Received data: ' + e.postData.contents);
    const data = JSON.parse(e.postData.contents);
    
    // Validate required fields
    if (!data.name || !data.email || !data.message) {
      return createResponse(false, 'All fields are required');
    }
    
    // Validate email format
    if (!isValidEmail(data.email)) {
      return createResponse(false, 'Invalid email address');
    }
    
    // Get or create the spreadsheet
    const sheet = getOrCreateSheet();
    
    // Prepare row data
    const timestamp = new Date();
    const rowData = [
      timestamp,
      data.name,
      data.email,
      data.message,
      'New' // Status
    ];
    
    // Append to sheet
    sheet.appendRow(rowData);
    Logger.log('Data saved to sheet successfully');
    
    // Send email notification if enabled
    if (CONFIG.SEND_EMAIL_NOTIFICATIONS) {
      sendEmailNotification(data, timestamp);
    }
    
    // Return success response
    return createResponse(true, 'Message received successfully! We will get back to you soon.');
    
  } catch (error) {
    Logger.log('Error processing form: ' + error.toString());
    Logger.log('Error stack: ' + error.stack);
    return createResponse(false, 'An error occurred. Please try again later.');
  }
}

/**
 * Handle GET requests (for testing)
 */
function doGet(e) {
  return ContentService.createTextOutput(
    JSON.stringify({
      status: 'ok',
      message: 'Project Shram Contact Form API is running',
      timestamp: new Date().toISOString()
    })
  ).setMimeType(ContentService.MimeType.JSON);
}

/**
 * Get or create the submissions sheet
 */
function getOrCreateSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(CONFIG.SHEET_NAME);
  
  // Create sheet if it doesn't exist
  if (!sheet) {
    sheet = ss.insertSheet(CONFIG.SHEET_NAME);
    
    // Add headers
    const headers = ['Timestamp', 'Name', 'Email', 'Message', 'Status'];
    sheet.appendRow(headers);
    
    // Format header row
    const headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setBackground('#00ffff');
    headerRange.setFontColor('#000000');
    headerRange.setFontWeight('bold');
    
    // Freeze header row
    sheet.setFrozenRows(1);
    
    // Auto-resize columns
    sheet.autoResizeColumns(1, headers.length);
  }
  
  return sheet;
}

/**
 * Send email notification
 */
function sendEmailNotification(data, timestamp) {
  try {
    const subject = `New Contact Form Submission - Project Shram`;
    
    const htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #00ffff; background: #000; padding: 15px; text-align: center;">
          📬 New Contact Form Submission
        </h2>
        <div style="padding: 20px; border: 1px solid #ddd;">
          <p><strong>Timestamp:</strong> ${timestamp.toLocaleString()}</p>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
          <p><strong>Message:</strong></p>
          <div style="background: #f5f5f5; padding: 15px; border-left: 3px solid #00ffff;">
            ${data.message.replace(/\n/g, '<br>')}
          </div>
        </div>
        <div style="padding: 15px; text-align: center; color: #666; font-size: 12px;">
          Project Shram Contact Form | Automated Notification
        </div>
      </div>
    `;
    
    const plainBody = `
New Contact Form Submission - Project Shram

Timestamp: ${timestamp.toLocaleString()}
Name: ${data.name}
Email: ${data.email}

Message:
${data.message}

---
Project Shram Contact Form
Automated Notification
    `;
    
    MailApp.sendEmail({
      to: CONFIG.NOTIFICATION_EMAIL,
      subject: subject,
      body: plainBody,
      htmlBody: htmlBody
    });
    
    Logger.log('Email notification sent to: ' + CONFIG.NOTIFICATION_EMAIL);
    
  } catch (error) {
    Logger.log('Error sending email: ' + error.toString());
    // Don't throw error - form submission should still succeed
  }
}

/**
 * Validate email format
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

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
  
  const output = ContentService.createTextOutput(JSON.stringify(response))
    .setMimeType(ContentService.MimeType.JSON);
  
  // Add CORS headers if enabled
  if (CONFIG.ALLOW_CORS) {
    return output;
  }
  
  return output;
}

/**
 * Test function - run this to test the script
 */
function testFormSubmission() {
  const testData = {
    postData: {
      contents: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        message: 'This is a test message from the contact form.'
      })
    }
  };
  
  const response = doPost(testData);
  Logger.log(response.getContent());
}

/**
 * Mark a submission as read
 * Usage: markAsRead(2) to mark row 2 as read
 */
function markAsRead(rowNumber) {
  const sheet = getOrCreateSheet();
  sheet.getRange(rowNumber, 5).setValue('Read');
  sheet.getRange(rowNumber, 1, 1, 5).setBackground('#f0f0f0');
}

/**
 * Get all unread submissions
 */
function getUnreadSubmissions() {
  const sheet = getOrCreateSheet();
  const data = sheet.getDataRange().getValues();
  
  // Skip header row
  const unread = [];
  for (let i = 1; i < data.length; i++) {
    if (data[i][4] === 'New') {
      unread.push({
        row: i + 1,
        timestamp: data[i][0],
        name: data[i][1],
        email: data[i][2],
        message: data[i][3]
      });
    }
  }
  
  return unread;
}

/**
 * Delete old submissions (older than specified days)
 */
function deleteOldSubmissions(daysOld = 90) {
  const sheet = getOrCreateSheet();
  const data = sheet.getDataRange().getValues();
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - daysOld);
  
  // Delete from bottom to top to avoid row shifting issues
  for (let i = data.length - 1; i > 0; i--) {
    if (data[i][0] < cutoffDate) {
      sheet.deleteRow(i + 1);
    }
  }
  
  Logger.log('Deleted submissions older than ' + daysOld + ' days');
}
