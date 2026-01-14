/**
 * Cookie Consent Management
 * Displays privacy-first cookie notice on first visit only
 * No data collection or tracking - 100% local storage
 */

// Check if user has already accepted cookie consent
function checkCookieConsent() {
    const consent = localStorage.getItem('cookieConsent');
    return consent === 'accepted';
}

// Show cookie consent popup with animation
function showCookieConsent() {
    const consent = localStorage.getItem('cookieConsent');
    const popup = document.getElementById('cookieConsent');
    
    if (!consent && popup) {
        // Delay showing popup slightly for better UX
        setTimeout(() => {
            popup.classList.add('show');
        }, 500);
    }
}

// Accept cookie consent and hide popup
function acceptCookieConsent() {
    // Store consent in localStorage
    localStorage.setItem('cookieConsent', 'accepted');
    localStorage.setItem('cookieConsentDate', new Date().toISOString());
    
    // Hide popup with animation
    const popup = document.getElementById('cookieConsent');
    if (popup) {
        popup.classList.remove('show');
        
        // Remove from DOM after animation completes
        setTimeout(() => {
            popup.style.display = 'none';
        }, 400);
    }
}

// Initialize cookie consent on page load
if (typeof window !== 'undefined') {
    window.addEventListener('DOMContentLoaded', showCookieConsent);
}
