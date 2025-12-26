/**
 * Website Integration - Newsletter Subscription Form
 * Add this to your HTML pages to collect newsletter signups
 */

// ============ HTML FORM COMPONENT ============
// Add this to updates.html, index.html, or any page

const newsletterHTML = `
<style>
.newsletter-section {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    padding: 40px 20px;
    border-radius: 12px;
    margin: 40px 0;
    text-align: center;
    color: white;
}

.newsletter-title {
    font-size: 28px;
    font-weight: bold;
    margin-bottom: 10px;
}

.newsletter-subtitle {
    font-size: 16px;
    opacity: 0.9;
    margin-bottom: 25px;
}

.newsletter-form {
    max-width: 500px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.newsletter-input {
    padding: 14px 18px;
    border: none;
    border-radius: 8px;
    font-size: 15px;
    background: rgba(255, 255, 255, 0.95);
}

.newsletter-select {
    padding: 14px 18px;
    border: none;
    border-radius: 8px;
    font-size: 15px;
    background: rgba(255, 255, 255, 0.95);
}

.newsletter-submit {
    padding: 14px 28px;
    background: #f59e0b;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s;
}

.newsletter-submit:hover {
    background: #d97706;
    transform: translateY(-2px);
}

.newsletter-submit:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.newsletter-message {
    margin-top: 15px;
    padding: 12px;
    border-radius: 6px;
    font-size: 14px;
    display: none;
}

.newsletter-message.success {
    background: rgba(34, 197, 94, 0.2);
    border: 1px solid rgba(34, 197, 94, 0.5);
    display: block;
}

.newsletter-message.error {
    background: rgba(239, 68, 68, 0.2);
    border: 1px solid rgba(239, 68, 68, 0.5);
    display: block;
}

.newsletter-benefits {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 15px;
    margin-top: 25px;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
}

.newsletter-benefit {
    background: rgba(255, 255, 255, 0.1);
    padding: 15px;
    border-radius: 8px;
    font-size: 14px;
}

.newsletter-benefit-icon {
    font-size: 24px;
    margin-bottom: 8px;
}

@media (max-width: 600px) {
    .newsletter-title { font-size: 22px; }
    .newsletter-subtitle { font-size: 14px; }
}
</style>

<section class="newsletter-section">
    <div class="newsletter-title">📬 साप्ताहिक Updates पाएं</div>
    <div class="newsletter-subtitle">
        हर सोमवार सुबह latest labour law changes, tax updates, और calculator news सीधे आपके inbox में।
    </div>
    
    <form id="newsletterForm" class="newsletter-form">
        <input 
            type="email" 
            id="subscriberEmail" 
            name="email" 
            placeholder="आपका Email Address" 
            required 
            class="newsletter-input"
        >
        <input 
            type="text" 
            id="subscriberName" 
            name="name" 
            placeholder="आपका नाम" 
            required 
            class="newsletter-input"
        >
        <select 
            id="subscriberLanguage" 
            name="language" 
            required 
            class="newsletter-select"
        >
            <option value="">भाषा चुनें / Choose Language</option>
            <option value="hi">Hindi (हिंदी)</option>
            <option value="en">English</option>
        </select>
        <button type="submit" class="newsletter-submit">
            Subscribe करें (Free)
        </button>
        <div id="newsletterMessage" class="newsletter-message"></div>
    </form>

    <div class="newsletter-benefits">
        <div class="newsletter-benefit">
            <div class="newsletter-benefit-icon">📰</div>
            <div>साप्ताहिक Updates</div>
        </div>
        <div class="newsletter-benefit">
            <div class="newsletter-benefit-icon">🎯</div>
            <div>Curated Content</div>
        </div>
        <div class="newsletter-benefit">
            <div class="newsletter-benefit-icon">🔒</div>
            <div>Privacy First</div>
        </div>
        <div class="newsletter-benefit">
            <div class="newsletter-benefit-icon">🚫</div>
            <div>No Spam</div>
        </div>
    </div>
</section>
`;

// ============ JAVASCRIPT FUNCTIONALITY ============

/**
 * Handle newsletter subscription
 * This connects to your Google Apps Script web app
 */
function initNewsletterForm() {
    const form = document.getElementById('newsletterForm');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = form.querySelector('.newsletter-submit');
        const messageDiv = document.getElementById('newsletterMessage');
        
        // Get form data
        const email = document.getElementById('subscriberEmail').value;
        const name = document.getElementById('subscriberName').value;
        const language = document.getElementById('subscriberLanguage').value;
        
        // Disable button
        submitBtn.disabled = true;
        submitBtn.textContent = 'Subscribe हो रहा है...';
        
        try {
            // Google Apps Script Web App URL
            const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzOrN8TYxH5C-Q9HVE8aN7GB_E2z8M-kgAcciP8Kf4PBr6cAeKA2A7oYnzQbBk4D-1W/exec';
            
            const response = await fetch(SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors', // Required for Google Apps Script
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    action: 'subscribe',
                    email: email,
                    name: name,
                    language: language
                })
            });
            
            // Show success message
            messageDiv.textContent = '✅ Successfully subscribed! Check your email for confirmation.';
            messageDiv.className = 'newsletter-message success';
            
            // Reset form
            form.reset();
            
            // Track with analytics (if available)
            if (typeof gtag !== 'undefined') {
                gtag('event', 'newsletter_subscribe', {
                    'event_category': 'engagement',
                    'event_label': language
                });
            }
            
        } catch (error) {
            messageDiv.textContent = '❌ Error: Please try again later.';
            messageDiv.className = 'newsletter-message error';
            console.error('Newsletter subscription error:', error);
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Subscribe करें (Free)';
        }
    });
}

// Initialize on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNewsletterForm);
} else {
    initNewsletterForm();
}

// ============ GOOGLE APPS SCRIPT WEB APP CODE ============
// Add this to your Apps Script project to handle web requests

/**
 * Handle POST requests from website
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
        
        return ContentService
            .createTextOutput(JSON.stringify({ success: false, message: 'Invalid action' }))
            .setMimeType(ContentService.MimeType.JSON);
            
    } catch (error) {
        return ContentService
            .createTextOutput(JSON.stringify({ success: false, message: error.message }))
            .setMimeType(ContentService.MimeType.JSON);
    }
}

/**
 * Handle GET requests (for testing)
 */
function doGet(e) {
    return ContentService.createTextOutput('Newsletter API is running!');
}

// ============ ALTERNATIVE: GOOGLE FORMS INTEGRATION ============
// If you prefer using Google Forms instead of custom API:

/**
 * Redirect to Google Form
 */
function redirectToGoogleForm() {
    const email = document.getElementById('subscriberEmail').value;
    const name = document.getElementById('subscriberName').value;
    const language = document.getElementById('subscriberLanguage').value;
    
    // Pre-fill Google Form URL
    const formUrl = 'https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform';
    const prefillUrl = `${formUrl}?usp=pp_url&entry.EMAIL_ID=${encodeURIComponent(email)}&entry.NAME_ID=${encodeURIComponent(name)}&entry.LANGUAGE_ID=${language}`;
    
    window.open(prefillUrl, '_blank');
}

// ============ EMAIL VALIDATION ============

/**
 * Client-side email validation
 */
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

/**
 * Add real-time validation
 */
function addEmailValidation() {
    const emailInput = document.getElementById('subscriberEmail');
    if (!emailInput) return;
    
    emailInput.addEventListener('blur', function() {
        if (this.value && !validateEmail(this.value)) {
            this.style.border = '2px solid #ef4444';
            alert('कृपया valid email address दर्ज करें');
        } else {
            this.style.border = 'none';
        }
    });
}

// Initialize validation
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addEmailValidation);
} else {
    addEmailValidation();
}
