// Share functionality for ShramKavach
// Handles WhatsApp sharing and link copying across all pages

/**
 * Share via WhatsApp
 * @param {string} title - Title of the content to share
 * @param {string} path - Relative path to the page/section
 */
function shareViaWhatsApp(title, path) {
    const url = 'https://shramkavach.com/' + path;
    const emoji = getEmojiForPage(path);
    const text = `${emoji} ${title} - ShramKavach\n\n34+ Free calculators, 1200+ AI prompts for workers and freelancers! 💼\n\n`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text + url)}`;
    window.open(whatsappUrl, '_blank');
}

/**
 * Copy link to clipboard
 * @param {string} path - Relative path to the page/section
 * @param {HTMLElement} button - The button element that triggered the copy (optional)
 */
function copyCalculatorLink(path, button) {
    const url = 'https://shramkavach.com/' + path;
    
    navigator.clipboard.writeText(url).then(() => {
        // Find the button element
        const btn = button || event.target.closest('button');
        if (!btn) return;
        
        const originalHTML = btn.innerHTML;
        const originalClasses = btn.className;
        
        // Show success feedback
        btn.innerHTML = `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg> Copied!`;
        btn.className = originalClasses.replace('bg-indigo-500', 'bg-green-500').replace('hover:bg-indigo-600', 'hover:bg-green-600');
        
        // Reset after 2 seconds
        setTimeout(() => {
            btn.innerHTML = originalHTML;
            btn.className = originalClasses;
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy:', err);
        // Fallback for older browsers
        fallbackCopyLink(url);
    });
}

/**
 * Fallback copy method for older browsers
 */
function fallbackCopyLink(url) {
    const textArea = document.createElement('textarea');
    textArea.value = url;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        alert('Link copied to clipboard!');
    } catch (err) {
        alert('Failed to copy link. Please copy manually: ' + url);
    }
    
    document.body.removeChild(textArea);
}

/**
 * Get appropriate emoji for page type
 */
function getEmojiForPage(path) {
    if (path.includes('calculator')) return '🧮';
    if (path.includes('prompt')) return '🤖';
    if (path.includes('protection')) return '🛡️';
    if (path.includes('generator')) return '📄';
    if (path.includes('history')) return '📚';
    if (path.includes('update')) return '📰';
    return '✨';
}

/**
 * Share current page
 */
function shareCurrentPage() {
    const title = document.title;
    const path = window.location.pathname;
    shareViaWhatsApp(title, path);
}

/**
 * Copy current page URL
 */
function copyCurrentPageLink() {
    const url = window.location.href;
    copyCalculatorLink(url.replace('https://shramkavach.com/', '').replace(window.location.origin + '/', ''));
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        shareViaWhatsApp,
        copyCalculatorLink,
        shareCurrentPage,
        copyCurrentPageLink
    };
}

console.log('✅ ShramKavach Share Module Loaded');
