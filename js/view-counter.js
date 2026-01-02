/**
 * Article View Counter
 * Displays view counts starting from 2000+ random number
 * Can be upgraded to use real backend (Firebase/Supabase)
 */

(function() {
    'use strict';
    
    // Configuration
    const BASE_VIEWS = 2000;
    const MAX_RANDOM_ADDITION = 5000;
    const STORAGE_KEY = 'shramkavach_views';
    
    // Get article ID from URL
    function getArticleId() {
        const path = window.location.pathname;
        const filename = path.split('/').pop().replace('.html', '').replace('.HTML', '');
        return filename || 'homepage';
    }
    
    // Generate initial random view count
    function generateInitialViews() {
        return BASE_VIEWS + Math.floor(Math.random() * MAX_RANDOM_ADDITION);
    }
    
    // Get all view data from storage
    function getViewData() {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : {};
    }
    
    // Save view data to storage
    function saveViewData(data) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }
    
    // Get view count for current article
    function getArticleViews(articleId) {
        const viewData = getViewData();
        
        if (!viewData[articleId]) {
            // First time viewing this article - generate initial count
            viewData[articleId] = {
                count: generateInitialViews(),
                lastView: Date.now()
            };
            saveViewData(viewData);
        } else {
            // Increment view count
            viewData[articleId].count++;
            viewData[articleId].lastView = Date.now();
            saveViewData(viewData);
        }
        
        return viewData[articleId].count;
    }
    
    // Format number with commas
    function formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    
    // Animate counter
    function animateCounter(element, targetValue) {
        const duration = 1000; // 1 second
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
    
    // Display view count
    function displayViewCount() {
        const articleId = getArticleId();
        const viewCount = getArticleViews(articleId);
        
        // Find or create view counter element
        let counterElement = document.getElementById('article-views');
        
        if (!counterElement) {
            // Create view counter if it doesn't exist
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
    
    // Simulate real-time updates (optional visual effect)
    function simulateRealTimeUpdates() {
        setInterval(() => {
            const articleId = getArticleId();
            const viewData = getViewData();
            
            if (viewData[articleId] && Math.random() > 0.7) {
                // 30% chance of adding 1-3 views every 10 seconds
                const randomIncrease = Math.floor(Math.random() * 3) + 1;
                viewData[articleId].count += randomIncrease;
                saveViewData(viewData);
                
                const countSpan = document.getElementById('view-count');
                if (countSpan) {
                    countSpan.textContent = formatNumber(viewData[articleId].count);
                }
            }
        }, 10000); // Check every 10 seconds
    }
    
    // Initialize
    function init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                displayViewCount();
                simulateRealTimeUpdates();
            });
        } else {
            displayViewCount();
            simulateRealTimeUpdates();
        }
    }
    
    // Export for debugging
    window.viewCounter = {
        getViews: () => getViewData(),
        reset: () => localStorage.removeItem(STORAGE_KEY),
        setViews: (articleId, count) => {
            const data = getViewData();
            data[articleId] = { count, lastView: Date.now() };
            saveViewData(data);
        }
    };
    
    init();
})();
