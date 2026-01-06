/**
 * Sidebar Articles Loader v2.0
 * Dynamically loads "All Articles" section in article pages with pagination
 * Auto-detects current page and highlights it
 * Fetches from centralized articles-database.json
 */

(function() {
    'use strict';

    let allArticles = [];
    let currentPage = 1;
    const ARTICLES_PER_PAGE = 6;

    // Fetch articles from centralized database
    async function fetchArticles() {
        try {
            const response = await fetch('data/articles-database.json?v=' + Date.now());
            const data = await response.json();
            
            // Sort articles by date (newest first) and priority
            allArticles = data.articles.sort((a, b) => {
                // First sort by priority (lower number = higher priority)
                if (a.priority !== b.priority) {
                    return a.priority - b.priority;
                }
                // Then by date (newest first)
                return new Date(b.date) - new Date(a.date);
            });
            
            console.log(`✓ Loaded ${allArticles.length} articles from database`);
            return true;
        } catch (error) {
            console.error('Failed to load articles database:', error);
            // Fallback to hardcoded articles if fetch fails
            loadFallbackArticles();
            return false;
        }
    }

    // Fallback articles if database fetch fails
    function loadFallbackArticles() {
        allArticles = [
            {
                title: 'The Convergence of Capital and Code',
                shortTitle: 'Capital & Code 2026',
                url: 'capital-and-code.html',
                icon: '💹',
                displayDate: 'Jan 6, 2026'
            },
            {
                title: 'State of the Technosphere 2026',
                shortTitle: 'Technosphere 2026',
                url: 'state-of-the-technosphere.html',
                icon: '🌐',
                displayDate: 'Jan 5, 2026'
            },
            {
                title: 'The Inflection Point of the Twenty-Twenties',
                shortTitle: 'Inflection Point',
                url: 'twenty-twenties.html',
                icon: '📊',
                displayDate: 'Jan 4, 2026'
            },
            {
                title: 'Kinetic Force & Agentic Intelligence',
                shortTitle: 'Kinetic Force & AI',
                url: 'the-convergence-of-kinetic-force-and-agentic-intelligence.html',
                icon: '⚔️',
                displayDate: 'Jan 4, 2026'
            },
            {
                title: 'The Great Divergence',
                url: 'the-great-divergence.html',
                icon: '🌐',
                displayDate: 'Jan 3, 2026'
            },
            {
                title: 'Bond Markets 2026',
                url: 'bond-markets-2026.html',
                icon: '📉',
                displayDate: 'Jan 1, 2026'
            },
            {
                title: 'The 2026 Reset',
                url: 'UPI-2026.HTML',
                icon: '💳',
                displayDate: 'Jan 1, 2026'
            },
            {
                title: 'December 31 Dispatch',
                url: 'december-31-2025.html',
                icon: '🇮🇳',
                displayDate: 'Dec 31, 2025'
            },
            {
                title: 'Year-End Action Plan',
                url: 'year-end-2025.html',
                icon: '⏰',
                displayDate: 'Dec 26, 2025'
            },
            {
                title: 'Freelancer Tax Guide',
                url: 'freelancer-tax-2025.html',
                icon: '💸',
                displayDate: 'Dec 28, 2025'
            },
            {
                title: 'Financial Calculators',
                url: 'financial-calculators-2025.html',
                icon: '🧮',
                displayDate: 'Dec 26, 2025'
            },
            {
                title: 'Social Security Registration',
                url: 'social-security-2025.html',
                icon: '🛡️',
                displayDate: 'Dec 18, 2025'
            },
            {
                title: '1-Year Gratuity Rule',
                url: 'gratuity-rule-2025.html',
                icon: '💰',
                displayDate: 'Nov 21, 2025'
            },
            {
                title: 'Platform Fee Cap 2026',
                url: 'platform-fees-2025.html',
                icon: '📱',
                displayDate: 'Dec 12, 2025'
            },
            {
                title: 'Health Insurance Mandate',
                url: 'health-insurance-2025.html',
                icon: '🏥',
                displayDate: 'Dec 3, 2025'
            },
            {
                title: 'GST Threshold ₹40L',
                url: 'gst-threshold-2025.html',
                icon: '📈',
                displayDate: 'Dec 1, 2025'
            },
            {
                title: 'EPFO for Gig Workers',
                url: 'epfo-gig-workers-2025.html',
                icon: '💼',
                displayDate: 'Nov 28, 2025'
            },
            {
                title: 'Minimum Wage Guarantee',
                url: 'minimum-wage-2025.html',
                icon: '⚖️',
                displayDate: 'Nov 15, 2025'
            },
            {
                title: 'Section 44ADA Tax',
                url: 'section-44ada-2025.html',
                icon: '📊',
                displayDate: 'Dec 5, 2025'
            }
        ];
    }

    // Get current page filename
    const getCurrentPageUrl = () => {
        const path = window.location.pathname;
        return path.substring(path.lastIndexOf('/') + 1);
    };

    // Render articles for current page
    function renderArticles(page = 1) {
        const container = document.querySelector('#sidebar-all-articles') || 
                         document.querySelector('[data-sidebar-articles]');
        
        if (!container) {
            console.warn('Sidebar articles container not found');
            return;
        }

        const currentUrl = getCurrentPageUrl();
        const startIndex = (page - 1) * ARTICLES_PER_PAGE;
        const endIndex = startIndex + ARTICLES_PER_PAGE;
        const articlesToShow = allArticles.slice(startIndex, endIndex);

        let html = '';
        
        articlesToShow.forEach(article => {
            const isCurrentPage = article.url === currentUrl;
            const bgClass = isCurrentPage 
                ? 'bg-emerald-100 border-2 border-emerald-600' 
                : 'bg-gray-50 hover:bg-indigo-50';
            const textClass = isCurrentPage 
                ? 'text-emerald-600 font-bold' 
                : 'text-gray-900 hover:text-indigo-600';
            const indicator = isCurrentPage ? '✓ ' : '';
            const displayTitle = article.shortTitle || article.title;
            const displayDate = article.displayDate || article.date;

            html += `
                <a href="${article.url}" class="block p-3 ${bgClass} rounded-lg transition">
                    <div class="flex items-center gap-2 mb-1">
                        <span class="text-lg">${article.icon}</span>
                        <div class="text-sm font-semibold ${textClass}">${indicator}${displayTitle}</div>
                    </div>
                    <div class="text-xs text-gray-500 ml-7">${displayDate}</div>
                </a>
            `;
        });

        container.innerHTML = html;
    }

    // Render pagination controls
    function renderPagination() {
        const paginationContainer = document.querySelector('#sidebar-articles-pagination') ||
                                   document.querySelector('[data-articles-pagination]');
        
        if (!paginationContainer) return;

        const totalPages = Math.ceil(allArticles.length / ARTICLES_PER_PAGE);
        
        if (totalPages <= 1) {
            paginationContainer.innerHTML = '';
            return;
        }

        let html = '<div class="flex items-center justify-center gap-2 mt-4">';

        // Previous button
        if (currentPage > 1) {
            html += `
                <button onclick="sidebarArticlesLoader.goToPage(${currentPage - 1})" 
                        class="px-3 py-1 text-sm bg-white border border-indigo-300 rounded-lg hover:bg-indigo-50 transition">
                    ‹ Prev
                </button>
            `;
        }

        // Page numbers
        for (let i = 1; i <= totalPages; i++) {
            const activeClass = i === currentPage 
                ? 'bg-indigo-600 text-white font-bold' 
                : 'bg-white border border-indigo-300 hover:bg-indigo-50';
            
            html += `
                <button onclick="sidebarArticlesLoader.goToPage(${i})" 
                        class="px-3 py-1 text-sm ${activeClass} rounded-lg transition">
                    ${i}
                </button>
            `;
        }

        // Next button
        if (currentPage < totalPages) {
            html += `
                <button onclick="sidebarArticlesLoader.goToPage(${currentPage + 1})" 
                        class="px-3 py-1 text-sm bg-white border border-indigo-300 rounded-lg hover:bg-indigo-50 transition">
                    Next ›
                </button>
            `;
        }

        html += '</div>';
        paginationContainer.innerHTML = html;
    }

    // Navigate to specific page
    function goToPage(page) {
        const totalPages = Math.ceil(allArticles.length / ARTICLES_PER_PAGE);
        if (page < 1 || page > totalPages) return;
        
        currentPage = page;
        renderArticles(currentPage);
        renderPagination();

        // Scroll to top of articles section
        const container = document.querySelector('#sidebar-all-articles') || 
                         document.querySelector('[data-sidebar-articles]');
        if (container) {
            container.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }

    // Initialize on page load
    async function init() {
        // Show loading state
        const container = document.querySelector('#sidebar-all-articles') || 
                         document.querySelector('[data-sidebar-articles]');
        
        if (container) {
            container.innerHTML = '<div class="text-center py-4 text-gray-500">Loading articles...</div>';
        }

        // Fetch articles from database
        await fetchArticles();
        
        // Render articles and pagination
        renderArticles(1);
        renderPagination();
    }

    // Expose public API
    window.sidebarArticlesLoader = {
        goToPage: goToPage,
        refresh: init,
        getArticles: () => allArticles
    };

    // Auto-initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
