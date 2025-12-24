// Google AdSense Integration for ShramKavach
// Replace 'ca-pub-XXXXXXXXXXXXXXXX' with your actual AdSense publisher ID

// AdSense Auto Ads (Recommended for beginners)
(function() {
    // TODO: Replace with your AdSense publisher ID after approval
    const ADSENSE_ID = 'ca-pub-XXXXXXXXXXXXXXXX';
    
    if (ADSENSE_ID !== 'ca-pub-XXXXXXXXXXXXXXXX') {
        const script = document.createElement('script');
        script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_ID}`;
        script.crossOrigin = 'anonymous';
        script.async = true;
        document.head.appendChild(script);
    }
})();

// Manual Ad Initialization (for specific ad slots)
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

console.log('💰 AdSense module loaded. Update ADSENSE_ID in ads.js after approval.');
