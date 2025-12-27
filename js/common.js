/**
 * ShramSetu Common Functions
 * Language switching and shared utilities
 */

// Use translations from i18n.js (already declared there)
// let translations = {}; // REMOVED - using global from i18n.js
var currentLanguage = currentLanguage || 'en'; // Use var to avoid re-declaration errors

// Initialize language system (delegate to i18n.js)
document.addEventListener('DOMContentLoaded', function() {
    // FORCE ENGLISH - Site is English-only except prompts page
    localStorage.setItem('shramLanguage', 'en');
    currentLanguage = 'en';
    
    const langApi = window.i18n;
    const current = 'en'; // ALWAYS English

    // Set language toggle
    const toggle = document.getElementById('languageToggle');
    if (toggle) {
        toggle.value = currentLanguage;
        toggle.addEventListener('change', function(e) {
            if (langApi && typeof langApi.switchLanguage === 'function') {
                langApi.switchLanguage(e.target.value);
            } else {
                // Fallback: persist and reload so i18n.js applies on load
                localStorage.setItem('shramLanguage', e.target.value);
                window.location.reload();
            }
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});




// Utility: Format Indian currency
function formatINR(amount) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(amount);
}

// Utility: Format date in Indian format
function formatDate(date) {
    return new Date(date).toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    });
}

// Utility: Debounce function for search inputs
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Analytics placeholder (can be replaced with actual tracking)
function trackEvent(category, action, label) {
    console.log(`Event: ${category} - ${action} - ${label}`);
    // Add Google Analytics or other tracking here
    // Example: gtag('event', action, { 'event_category': category, 'event_label': label });
}

// WhatsApp Share utility
function shareOnWhatsApp(text, url = window.location.href) {
    const fullText = `${text}\n\n${url}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(fullText)}`, '_blank');
}

// Copy to clipboard utility
function copyToClipboard(text, successMessage = 'Copied to clipboard!') {
    navigator.clipboard.writeText(text).then(() => {
        alert(successMessage);
    }).catch(err => {
        console.error('Failed to copy:', err);
        alert('Failed to copy. Please try again.');
    });
}

// Generate unique ID for session tracking
function generateSessionId() {
    return 'sess_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

// Check if user is on mobile
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Log page view (for analytics)
function logPageView() {
    const page = window.location.pathname;
    console.log(`Page View: ${page}`);
    // Add to analytics
}

// Initialize page view tracking
logPageView();

console.log('✅ ShramSetu Common Functions Loaded');
