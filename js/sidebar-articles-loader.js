/**
 * Sidebar Articles Loader
 * Dynamically loads "All Articles" section in article pages with pagination
 * Auto-detects current page and highlights it
 */

(function() {
    'use strict';

    // Articles database (same as updates-manager.js)
    const allArticles = [
        {
            title: 'The Great Divergence',
            url: 'the-great-divergence.html',
            icon: '🌐',
            date: 'Jan 3, 2026'
        },
        {
            title: 'Bond Markets 2026',
            url: 'bond-markets-2026.html',
            icon: '📉',
            date: 'Jan 1, 2026'
        },
        {
            title: 'December 31 Dispatch',
            url: 'december-31-2025.html',
            icon: '🇮🇳',
            date: 'Dec 31, 2025'
        },
        {
            title: 'Year-End Action Plan',
            url: 'year-end-2025.html',
            icon: '⏰',
            date: 'Dec 26, 2025'
        },
        {
            title: 'Freelancer Tax Guide',
            url: 'freelancer-tax-2025.html',
            icon: '💸',
            date: 'Dec 28, 2025'
        },
        {
            title: 'Financial Calculators',
            url: 'financial-calculators-2025.html',
            icon: '🧮',
            date: 'Dec 26, 2025'
        },
        {
            title: 'Social Security Registration',
            url: 'social-security-2025.html',
            icon: '🛡️',
            date: 'Dec 18, 2025'
        },
        {
            title: '1-Year Gratuity Rule',
            url: 'gratuity-rule-2025.html',
            icon: '💰',
            date: 'Nov 21, 2025'
        },
        {
            title: 'Platform Fee Cap 2026',
            url: 'platform-fees-2025.html',
            icon: '📱',
            date: 'Dec 12, 2025'
        },
        {
            title: 'Health Insurance Mandate',
            url: 'health-insurance-2025.html',
            icon: '🏥',
            date: 'Dec 3, 2025'
        },
        {
            title: 'GST Threshold ₹40L',
            url: 'gst-threshold-2025.html',
            icon: '📈',
            date: 'Dec 1, 2025'
        },
        {
            title: 'EPFO for Gig Workers',
            url: 'epfo-gig-workers-2025.html',
            icon: '💼',
            date: 'Nov 28, 2025'
        },
        {
            title: 'Minimum Wage Guarantee',
            url: 'minimum-wage-2025.html',
            icon: '⚖️',
            date: 'Nov 15, 2025'
        },
        {
            title: 'Section 44ADA Tax',
            url: 'section-44ada-2025.html',
            icon: '📊',
            date: 'Dec 5, 2025'
        }
    ];

    // Pagination settings
    const ARTICLES_PER_PAGE = 6;
    let currentPage = 1;

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
                ? 'text-emerald-600' 
                : 'text-gray-900 hover:text-indigo-600';
            const indicator = isCurrentPage ? '✓ ' : '';

            html += `
                <a href="${article.url}" class="block p-3 ${bgClass} rounded-lg transition">
                    <div class="flex items-center gap-2 mb-1">
                        <span class="text-lg">${article.icon}</span>
                        <div class="text-sm font-bold ${textClass}">${indicator}${article.title}</div>
                    </div>
                    <div class="text-xs text-gray-500 ml-7">${article.date}</div>
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
    function init() {
        renderArticles(1);
        renderPagination();
    }

    // Expose public API
    window.sidebarArticlesLoader = {
        goToPage: goToPage,
        refresh: init
    };

    // Auto-initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
