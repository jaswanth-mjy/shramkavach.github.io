/**
 * Firebase-powered Real-Time View Counter
 * Tracks article views with actual backend persistence
 * Falls back to localStorage if Firebase unavailable
 */

(function() {
    'use strict';
    
    const BASE_VIEWS = 2000;
    const MAX_RANDOM_ADDITION = 5000;
    
    // Get article ID from URL
    function getArticleId() {
        const path = window.location.pathname;
        const filename = path.split('/').pop().replace('.html', '').replace('.HTML', '');
        return filename || 'homepage';
    }
    
    // Format number with commas
    function formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    
    // Animate counter
    function animateCounter(element, targetValue) {
        const duration = 1000;
        const startValue = Math.max(0, targetValue - 50);
        const increment = (targetValue - startValue) / (duration / 16);
        let currentValue = startValue;
        
        const timer = setInterval(() => {
            currentValue += increment;
            if (currentValue >= targetValue) {
                currentValue = targetValue;
                clearInterval(timer);
            }
            element.textContent = formatNumber(Math.floor(currentValue));
        }, 16);
    }
    
    // Display view count on page
    function displayViewCount(viewCount) {
        let counterElement = document.getElementById('article-views');
        
        if (!counterElement) {
            const header = document.querySelector('article header, header');
            if (header) {
                counterElement = document.createElement('div');
                counterElement.id = 'article-views';
                counterElement.className = 'flex items-center gap-2 text-sm text-gray-600 mt-2';
                counterElement.innerHTML = `
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                    </svg>
                    <span class="font-semibold"><span id="view-count">0</span> views</span>
                    <span class="mx-2">•</span>
                    <span class="text-green-600 flex items-center gap-1">
                        <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <circle cx="10" cy="10" r="3" class="animate-pulse"/>
                        </svg>
                        Live
                    </span>
                `;
                header.appendChild(counterElement);
            }
        }
        
        const countSpan = document.getElementById('view-count');
        if (countSpan) {
            animateCounter(countSpan, viewCount);
        }
    }
    
    // Firebase implementation
    function trackViewFirebase(articleId) {
        if (!window.firebaseDB) {
            console.warn('Firebase not available, using localStorage fallback');
            fallbackToLocalStorage(articleId);
            return;
        }
        
        const viewRef = window.firebaseDB.ref('article_views/' + articleId);
        
        // Use transaction to safely increment
        viewRef.transaction((currentViews) => {
            if (currentViews === null) {
                // First time - generate random starting number
                return BASE_VIEWS + Math.floor(Math.random() * MAX_RANDOM_ADDITION);
            } else {
                // Increment existing count
                return currentViews + 1;
            }
        }).then((result) => {
            if (result.committed) {
                displayViewCount(result.snapshot.val());
                console.log(`✓ View tracked: ${articleId} = ${result.snapshot.val()}`);
            }
        }).catch((error) => {
            console.error('Firebase transaction error:', error);
            fallbackToLocalStorage(articleId);
        });
        
        // Listen for real-time updates from other users
        viewRef.on('value', (snapshot) => {
            const views = snapshot.val();
            if (views !== null) {
                const countSpan = document.getElementById('view-count');
                if (countSpan && parseInt(countSpan.textContent.replace(/,/g, '')) !== views) {
                    // Update only if different (another user viewed)
                    countSpan.textContent = formatNumber(views);
                }
            }
        });
        
        // Track daily views for analytics
        trackDailyViews(articleId);
    }
    
    // Track daily views for analytics
    function trackDailyViews(articleId) {
        if (!window.firebaseDB) return;
        
        const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
        const dailyRef = window.firebaseDB.ref(`daily_views/${today}/${articleId}`);
        
        dailyRef.transaction((current) => (current || 0) + 1);
    }
    
    // Fallback to localStorage if Firebase fails
    function fallbackToLocalStorage(articleId) {
        const STORAGE_KEY = 'shramkavach_views';
        const stored = localStorage.getItem(STORAGE_KEY);
        const viewData = stored ? JSON.parse(stored) : {};
        
        if (!viewData[articleId]) {
            viewData[articleId] = {
                count: BASE_VIEWS + Math.floor(Math.random() * MAX_RANDOM_ADDITION),
                lastView: Date.now()
            };
        } else {
            viewData[articleId].count++;
            viewData[articleId].lastView = Date.now();
        }
        
        localStorage.setItem(STORAGE_KEY, JSON.stringify(viewData));
        displayViewCount(viewData[articleId].count);
        
        // Simulate real-time updates
        setInterval(() => {
            if (Math.random() > 0.7) {
                viewData[articleId].count += Math.floor(Math.random() * 3) + 1;
                localStorage.setItem(STORAGE_KEY, JSON.stringify(viewData));
                const countSpan = document.getElementById('view-count');
                if (countSpan) {
                    countSpan.textContent = formatNumber(viewData[articleId].count);
                }
            }
        }, 10000);
    }
    
    // Initialize
    function init() {
        const articleId = getArticleId();
        
        // Wait for Firebase to be ready
        const maxWait = 3000; // 3 seconds max wait
        const startTime = Date.now();
        
        const checkFirebase = setInterval(() => {
            if (window.firebaseDB || (Date.now() - startTime > maxWait)) {
                clearInterval(checkFirebase);
                trackViewFirebase(articleId);
            }
        }, 100);
    }
    
    // Wait for DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    // Export for debugging
    window.viewTracker = {
        getArticleId: getArticleId,
        displayCount: displayViewCount
    };
})();
