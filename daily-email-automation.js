/**
 * Google Apps Script - Daily Email Automation for ShramKavach
 * 
 * SETUP INSTRUCTIONS:
 * 1. Create a Google Sheet named "ShramKavach Subscribers"
 * 2. Add columns: Email | Name | Subscribed | Last Sent | Status
 * 3. Go to https://script.google.com and create new project
 * 4. Paste this code
 * 5. Update SPREADSHEET_ID with your Google Sheet ID
 * 6. Set up time-based trigger: Edit > Current project's triggers > Add Trigger
 *    - Function: sendDailyEmails
 *    - Deployment: Head
 *    - Event source: Time-driven
 *    - Type: Day timer
 *    - Time: Choose your preferred time (e.g., 9:00 AM - 10:00 AM)
 * 
 * FEATURES:
 * ✅ Daily automated emails to subscribers
 * ✅ Labour law tips, rights information, calculator updates
 * ✅ Professional HTML email templates
 * ✅ Subscriber management via Google Sheets
 * ✅ Unsubscribe functionality
 * ✅ Email tracking and status
 * ✅ 100% Free (Google quota: 100 emails/day for free accounts, 1500/day for Workspace)
 */

// Configuration
const SPREADSHEET_ID = "1uq1dC70vP1GVz_98HMwxExom19CdO1GKjJdhXrsHKKU"; // Replace with your Google Sheets ID
const FROM_NAME = "ShramKavach";
const REPLY_TO_EMAIL = "jaswanthplc@gmail.com";

/**
 * Main function - Send daily emails to all subscribers
 * Set this to run daily via time-based trigger
 */
function sendDailyEmails() {
  try {
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName("Subscribers");
    const data = sheet.getDataRange().getValues();
    
    let successCount = 0;
    let failCount = 0;
    
    // Skip header row, start from row 2
    for (let i = 1; i < data.length; i++) {
      const email = data[i][0];
      const name = data[i][1];
      const subscribed = data[i][2];
      
      // Only send to subscribed users
      if (subscribed === true || subscribed === "TRUE" || subscribed === "Yes") {
        try {
          // Get today's content
          const content = getDailyContent();
          
          // Send email
          const sent = sendDailyEmail(email, name, content);
          
          if (sent) {
            // Update last sent date and status
            sheet.getRange(i + 1, 4).setValue(new Date()); // Last Sent column
            sheet.getRange(i + 1, 5).setValue("Sent"); // Status column
            successCount++;
          } else {
            sheet.getRange(i + 1, 5).setValue("Failed");
            failCount++;
          }
          
          // Add small delay to avoid rate limiting
          Utilities.sleep(100);
          
        } catch (error) {
          console.error(`Failed to send to ${email}:`, error);
          sheet.getRange(i + 1, 5).setValue("Error: " + error.message);
          failCount++;
        }
      }
    }
    
    console.log(`Daily emails sent: ${successCount} successful, ${failCount} failed`);
    
    // Optional: Send summary to admin
    sendAdminSummary(successCount, failCount);
    
  } catch (error) {
    console.error("Error in sendDailyEmails:", error);
  }
}

/**
 * Send individual daily email
 */
function sendDailyEmail(email, name, content) {
  try {
    const subject = `${content.title} - ShramKavach Daily`;
    
    const htmlBody = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #f9fafb; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 40px 30px; border-radius: 10px 10px 0 0; text-align: center; }
          .header h1 { margin: 0; font-size: 28px; }
          .header p { margin: 10px 0 0 0; opacity: 0.95; font-size: 14px; }
          .content { background: white; padding: 40px 30px; }
          .greeting { font-size: 18px; color: #1f2937; margin-bottom: 20px; }
          .main-content { color: #4b5563; margin: 25px 0; line-height: 1.8; }
          .tip-box { background: #f0f9ff; border-left: 4px solid #667eea; padding: 20px; margin: 25px 0; border-radius: 5px; }
          .tip-box h3 { margin: 0 0 15px 0; color: #667eea; font-size: 18px; }
          .tip-box p { margin: 10px 0; color: #1e40af; }
          .highlight { background: #fef3c7; padding: 15px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #f59e0b; }
          .cta-section { text-align: center; margin: 30px 0; }
          .cta-button { display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 40px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; }
          .quick-links { background: #f9fafb; padding: 20px; border-radius: 8px; margin: 25px 0; }
          .quick-links h4 { margin: 0 0 15px 0; color: #374151; }
          .quick-links a { display: block; color: #667eea; text-decoration: none; padding: 8px 0; font-weight: 500; }
          .footer { background: #f3f4f6; padding: 30px; text-align: center; border-radius: 0 0 10px 10px; }
          .footer-links { margin: 20px 0; }
          .footer-links a { color: #667eea; text-decoration: none; margin: 0 15px; font-size: 14px; }
          .unsubscribe { font-size: 12px; color: #9ca3af; margin-top: 20px; }
          .unsubscribe a { color: #6b7280; text-decoration: underline; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>&#128640; ${content.title}</h1>
            <p>${new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
          
          <div class="content">
            <div class="greeting">
              Hello <strong>${name}</strong>,
            </div>
            
            <div class="main-content">
              ${content.mainContent}
            </div>
            
            <div class="tip-box">
              <h3>&#128161; Today's Labour Law Tip</h3>
              ${content.tip}
            </div>
            
            ${content.highlight ? `
              <div class="highlight">
                <strong>&#9888; Important Notice:</strong><br>
                ${content.highlight}
              </div>
            ` : ''}
            
            <div class="quick-links">
              <h4>&#128209; Quick Access:</h4>
              <a href="https://shramkavach.github.io/calculators.html">&#128200; Labour Law Calculators</a>
              <a href="https://shramkavach.github.io/protection.html">&#128196; Generate Legal Documents</a>
              <a href="https://shramkavach.github.io/prompts.html">&#129302; AI Prompts for Workers</a>
              <a href="https://shramkavach.github.io/#faq">&#10067; FAQs</a>
            </div>
            
            <div class="cta-section">
              <a href="https://shramkavach.github.io" class="cta-button">Visit ShramKavach</a>
            </div>
          </div>
          
          <div class="footer">
            <p style="font-weight: bold; color: #374151; margin-bottom: 15px;">Stay Connected</p>
            
            <div class="footer-links">
              <a href="mailto:jaswanthplc@gmail.com">Contact Us</a>
              <a href="https://shramkavach.github.io">Website</a>
              <a href="https://wa.me/+919876543210">WhatsApp</a>
            </div>
            
            <div class="unsubscribe">
              <p><strong>ShramKavach</strong> - Empowering workers with knowledge and tools</p>
              <p>You're receiving this because you subscribed to our daily updates.</p>
              <p><a href="mailto:jaswanthplc@gmail.com?subject=Unsubscribe">Unsubscribe</a> | <a href="https://shramkavach.github.io">Update Preferences</a></p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;
    
    const plainBody = `
${content.title}
${new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}

Hello ${name},

${content.mainContent.replace(/<[^>]*>/g, '')}

TODAY'S LABOUR LAW TIP:
${content.tip.replace(/<[^>]*>/g, '')}

${content.highlight ? `
IMPORTANT NOTICE:
${content.highlight}
` : ''}

QUICK ACCESS:
- Labour Law Calculators: https://shramkavach.github.io/calculators.html
- Generate Legal Documents: https://shramkavach.github.io/protection.html
- AI Prompts for Workers: https://shramkavach.github.io/prompts.html
- FAQs: https://shramkavach.github.io/#faq

Visit ShramKavach: https://shramkavach.github.io

---
ShramKavach - Empowering workers with knowledge and tools
You're receiving this because you subscribed to our daily updates.
Unsubscribe: jaswanthplc@gmail.com
    `;
    
    GmailApp.sendEmail(
      email,
      subject,
      plainBody,
      {
        htmlBody: htmlBody,
        name: FROM_NAME,
        replyTo: REPLY_TO_EMAIL,
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
 * Get daily content - Rotate through different topics
 */
function getDailyContent() {
  const dayOfWeek = new Date().getDay(); // 0 = Sunday, 1 = Monday, etc.
  
  const contentSchedule = [
    // Sunday
    {
      title: "Weekend Rights Recap",
      mainContent: `
        <p>Happy Sunday! Take a moment to review your labour rights this weekend.</p>
        <p>Did you know that understanding your rights is the first step to protecting them? Today, we're sharing essential information every worker should know.</p>
      `,
      tip: `
        <p><strong>Weekly Working Hours:</strong> Standard working hours in India should not exceed 48 hours per week (8 hours/day for 6 days).</p>
        <p>Anything beyond this qualifies for overtime pay at double the regular rate.</p>
      `,
      highlight: null
    },
    
    // Monday
    {
      title: "Monday Motivation: Know Your Rights",
      mainContent: `
        <p>Starting a new week? Make sure you're aware of your workplace rights!</p>
        <p>This Monday, we're focusing on <strong>Minimum Wages</strong> - one of the most fundamental rights of every worker in India.</p>
        <p>Use our calculator to check if you're being paid fairly: <a href="https://shramkavach.github.io/calculators.html" style="color: #667eea;">Calculate Now</a></p>
      `,
      tip: `
        <p><strong>Minimum Wage Rights:</strong> Every state in India has different minimum wage rates based on skill level and industry.</p>
        <p>Check your state's minimum wage and ensure your employer is complying with the law.</p>
      `,
      highlight: "Underpayment is illegal! If you're paid below minimum wage, you can file a complaint with the Labour Commissioner."
    },
    
    // Tuesday
    {
      title: "Tuesday Tips: Leave Entitlements",
      mainContent: `
        <p>Are you aware of all the leave types you're entitled to?</p>
        <p><strong>Types of Leave:</strong></p>
        <ul>
          <li><strong>Earned Leave:</strong> 1 day per 20 days worked (15 days/year)</li>
          <li><strong>Casual Leave:</strong> 7-12 days per year</li>
          <li><strong>Sick Leave:</strong> As per company policy</li>
          <li><strong>Maternity Leave:</strong> 26 weeks (12 weeks for 3rd child)</li>
          <li><strong>Paternity Leave:</strong> 15 days (in some states)</li>
        </ul>
      `,
      tip: `
        <p><strong>Unused Earned Leave:</strong> Must be encashed when you leave employment.</p>
        <p>Don't let your employer deny this right - it's protected under the Shops and Establishments Act.</p>
      `,
      highlight: null
    },
    
    // Wednesday
    {
      title: "Midweek Update: Safety at Work",
      mainContent: `
        <p>Workplace safety is not optional - it's your right!</p>
        <p>Every employer must provide a safe working environment under the <strong>Occupational Safety, Health and Working Conditions Code, 2020</strong>.</p>
        <p><strong>Your Safety Rights Include:</strong></p>
        <ul>
          <li>Safe machinery and equipment</li>
          <li>Protective gear (PPE) at no cost</li>
          <li>Clean drinking water and toilets</li>
          <li>First aid facilities</li>
          <li>Proper lighting and ventilation</li>
        </ul>
      `,
      tip: `
        <p><strong>Report Unsafe Conditions:</strong> You have the right to refuse unsafe work.</p>
        <p>Report violations to the Labour Inspector or use our legal document generator to file a complaint.</p>
      `,
      highlight: "Workplace accidents due to negligence can lead to compensation claims. Know your rights!"
    },
    
    // Thursday
    {
      title: "Thursday Thoughts: PF & Gratuity",
      mainContent: `
        <p>Let's talk about your future - <strong>Provident Fund (PF) and Gratuity</strong>!</p>
        <p><strong>Provident Fund (EPF):</strong></p>
        <ul>
          <li>Mandatory for establishments with 20+ employees</li>
          <li>Employee contributes 12% of basic salary</li>
          <li>Employer contributes 12% (split: 3.67% EPF + 8.33% EPS)</li>
          <li>You can withdraw after retirement or resignation</li>
        </ul>
        <p><strong>Gratuity:</strong></p>
        <ul>
          <li>Payable after 5 years of continuous service</li>
          <li>Formula: (Last drawn salary × 15 days × Years of service) ÷ 26</li>
          <li>Maximum limit: ₹20 lakhs</li>
        </ul>
      `,
      tip: `
        <p><strong>Check Your PF Balance:</strong> Register on the EPFO portal (epfindia.gov.in) to track your contributions.</p>
        <p>Use our Gratuity Calculator to estimate your payout: <a href="https://shramkavach.github.io/calculators.html" style="color: #667eea;">Calculate</a></p>
      `,
      highlight: null
    },
    
    // Friday
    {
      title: "Friday Focus: Termination Rights",
      mainContent: `
        <p>Facing termination or retrenchment? Know your rights!</p>
        <p><strong>Wrongful Termination:</strong> You cannot be fired without proper notice or reason (except in case of misconduct with due process).</p>
        <p><strong>Notice Period:</strong></p>
        <ul>
          <li>Minimum 30 days notice or pay in lieu</li>
          <li>90 days for retrenchment</li>
          <li>As per employment contract (whichever is higher)</li>
        </ul>
        <p><strong>Retrenchment Compensation:</strong> 15 days wages for each completed year of service</p>
      `,
      tip: `
        <p><strong>Get it in Writing:</strong> Always ask for termination in writing with clear reasons.</p>
        <p>Generate a legal notice using our tool if you believe termination was unfair: <a href="https://shramkavach.github.io/protection.html" style="color: #667eea;">Generate Notice</a></p>
      `,
      highlight: "Don't sign any termination documents under pressure. Seek legal advice first!"
    },
    
    // Saturday
    {
      title: "Saturday Special: Workplace Harassment",
      mainContent: `
        <p>Every workplace must be free from harassment - it's the law!</p>
        <p><strong>Sexual Harassment Prevention:</strong> Under the POSH Act (Prevention of Sexual Harassment), every company with 10+ employees must have an Internal Complaints Committee (ICC).</p>
        <p><strong>What Constitutes Harassment:</strong></p>
        <ul>
          <li>Unwelcome physical contact</li>
          <li>Demand for sexual favours</li>
          <li>Sexually coloured remarks</li>
          <li>Showing pornography</li>
          <li>Any unwelcome sexual gesture or behaviour</li>
        </ul>
        <p><strong>How to Complain:</strong></p>
        <ol>
          <li>File complaint with ICC within 3 months</li>
          <li>If no ICC, complain to Local Complaints Committee (LCC)</li>
          <li>Police complaint for serious cases</li>
        </ol>
      `,
      tip: `
        <p><strong>Document Everything:</strong> Keep records of all incidents, messages, emails.</p>
        <p>You can also file complaints anonymously through labour department portals.</p>
      `,
      highlight: "Retaliation against complainants is illegal. Your identity will be protected during inquiry."
    }
  ];
  
  return contentSchedule[dayOfWeek];
}

/**
 * Send summary email to admin
 */
function sendAdminSummary(successCount, failCount) {
  try {
    const subject = `Daily Email Report - ${new Date().toLocaleDateString()}`;
    const body = `
Daily Email Automation Report
ShramKavach

Date: ${new Date().toLocaleString('en-IN')}

Summary:
- Successfully Sent: ${successCount}
- Failed: ${failCount}
- Total Attempted: ${successCount + failCount}
- Success Rate: ${((successCount / (successCount + failCount)) * 100).toFixed(1)}%

Status: ${failCount === 0 ? '✓ All emails sent successfully' : '⚠ Some emails failed'}

View detailed status in your Google Sheet:
https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}

---
ShramKavach Daily Email Automation
    `;
    
    GmailApp.sendEmail(
      REPLY_TO_EMAIL,
      subject,
      body
    );
  } catch (error) {
    console.error("Error sending admin summary:", error);
  }
}

/**
 * Add new subscriber (can be called from website form)
 */
function addSubscriber(email, name) {
  try {
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName("Subscribers");
    
    // Check if email already exists
    const data = sheet.getDataRange().getValues();
    for (let i = 1; i < data.length; i++) {
      if (data[i][0] === email) {
        return { success: false, message: "Email already subscribed" };
      }
    }
    
    // Add new subscriber
    sheet.appendRow([email, name, true, "", "New"]);
    
    // Send welcome email
    sendWelcomeEmail(email, name);
    
    return { success: true, message: "Subscribed successfully!" };
  } catch (error) {
    console.error("Error adding subscriber:", error);
    return { success: false, message: error.message };
  }
}

/**
 * Send welcome email to new subscribers
 */
function sendWelcomeEmail(email, name) {
  const subject = "Welcome to ShramKavach Daily Updates!";
  const htmlBody = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 40px 30px; border-radius: 10px 10px 0 0; text-align: center; }
        .content { background: white; padding: 40px 30px; }
        .cta-button { display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 40px; text-decoration: none; border-radius: 8px; font-weight: bold; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>&#127881; Welcome to ShramKavach!</h1>
        </div>
        <div class="content">
          <p>Dear <strong>${name}</strong>,</p>
          <p>Thank you for subscribing to ShramKavach Daily Updates!</p>
          <p>You'll now receive daily emails with:</p>
          <ul>
            <li>&#128161; Labour law tips and insights</li>
            <li>&#128200; Calculator updates and new features</li>
            <li>&#128196; Legal document templates</li>
            <li>&#9888; Important rights information</li>
          </ul>
          <p style="text-align: center; margin: 30px 0;">
            <a href="https://shramkavach.github.io" class="cta-button">Explore ShramKavach</a>
          </p>
          <p>Stay informed, stay protected!</p>
        </div>
      </div>
    </body>
    </html>
  `;
  
  GmailApp.sendEmail(email, subject, `Welcome to ShramKavach, ${name}!`, {
    htmlBody: htmlBody,
    name: FROM_NAME,
    replyTo: REPLY_TO_EMAIL
  });
}

/**
 * Test function - Send test email to yourself
 */
function testDailyEmail() {
  const content = getDailyContent();
  sendDailyEmail("jaswanthplc@gmail.com", "Test User", content);
  console.log("Test email sent!");
}

/**
 * Initialize spreadsheet with headers (run once)
 */
function initializeSpreadsheet() {
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName("Subscribers") 
    || SpreadsheetApp.openById(SPREADSHEET_ID).insertSheet("Subscribers");
  
  sheet.clear();
  sheet.appendRow(["Email", "Name", "Subscribed", "Last Sent", "Status"]);
  sheet.getRange("A1:E1").setFontWeight("bold").setBackground("#667eea").setFontColor("white");
  
  console.log("Spreadsheet initialized!");
}
