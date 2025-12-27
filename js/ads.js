// Google AdSense Integration for ShramKavach
// AdSense Publisher ID: ca-pub-2868999138532322
// DISABLED until approval - uncomment below code after approval

// AdSense Auto Ads (Recommended for beginners)
/*
(function() {
    const ADSENSE_ID = 'ca-pub-2868999138532322';
    
    if (ADSENSE_ID !== 'ca-pub-XXXXXXXXXXXXXXXX') {
        const script = document.createElement('script');
        script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_ID}`;
        script.crossOrigin = 'anonymous';
        script.async = true;
        document.head.appendChild(script);
    }
})();
*/

// Manual Ad Initialization (for specific ad slots)
/*
function initializeAds() {
    if (typeof adsbygoogle === 'undefined') {
        console.log('⚠️ AdSense not loaded yet. Add your publisher ID in ads.js');
        return;
    }
    
    // Initialize all ad slots
    const ads = document.querySelectorAll('.adsbygoogle');
    ads.forEach((ad) => {
        if (!ad.dataset.adsbygoogleStatus) {
            (adsbygoogle = window.adsbygoogle || []).push({});
        }
    });
}

// Auto-initialize ads when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAds);
} else {
    initializeAds();
}
*/

console.log('💰 AdSense disabled until approval. Uncomment code in ads.js after approval.');
