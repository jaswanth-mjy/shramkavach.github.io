/**
 * News Loader for Shram Kavach
 * Loads and displays latest worker rights and labor law news
 */

class NewsLoader {
    constructor(containerId, options = {}) {
        this.container = document.getElementById(containerId);
        this.maxItems = options.maxItems || 10;
        this.showDate = options.showDate !== false;
        this.loading = false;
    }

    async loadNews() {
        if (this.loading || !this.container) return;
        
        this.loading = true;
        this.showLoading();

        try {
            const response = await fetch('/data/news.json');
            if (!response.ok) throw new Error('Failed to fetch news');
            
            const data = await response.json();
            this.displayNews(data);
        } catch (error) {
            console.error('Error loading news:', error);
            this.showError();
        } finally {
            this.loading = false;
        }
    }

    showLoading() {
        this.container.innerHTML = `
            <div class="flex items-center justify-center p-8">
                <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                <span class="ml-3 text-gray-600">Loading latest news...</span>
            </div>
        `;
    }

    showError() {
        this.container.innerHTML = `
            <div class="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                <p class="text-red-600">Failed to load news. Please try again later.</p>
            </div>
        `;
    }

    displayNews(data) {
        if (!data.articles || data.articles.length === 0) {
            this.container.innerHTML = `
                <div class="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
                    <p class="text-gray-600">No news articles available yet.</p>
                </div>
            `;
            return;
        }

        const articles = data.articles.slice(0, this.maxItems);
        const lastUpdated = new Date(data.last_updated).toLocaleString('en-IN', {
            dateStyle: 'medium',
            timeStyle: 'short'
        });

        let html = `
            <div class="mb-4 text-sm text-gray-500">
                <span>Last updated: ${lastUpdated}</span>
                <span class="ml-3">📰 ${data.count} articles</span>
            </div>
            <div class="space-y-4">
        `;

        articles.forEach((article, index) => {
            const publishedDate = article.published ? 
                new Date(article.published).toLocaleDateString('en-IN', { 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric' 
                }) : '';

            html += `
                <article class="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                    <div class="flex items-start gap-3">
                        <span class="flex-shrink-0 w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-semibold text-sm">
                            ${index + 1}
                        </span>
                        <div class="flex-1 min-w-0">
                            <h3 class="font-semibold text-gray-900 mb-2 hover:text-indigo-600">
                                <a href="${article.link}" target="_blank" rel="noopener noreferrer" class="hover:underline">
                                    ${article.title}
                                </a>
                            </h3>
                            <p class="text-gray-600 text-sm mb-3 line-clamp-2">
                                ${article.description}
                            </p>
                            <div class="flex items-center gap-4 text-xs text-gray-500">
                                <span class="flex items-center gap-1">
                                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                                        <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"/>
                                    </svg>
                                    ${article.source}
                                </span>
                                ${this.showDate && publishedDate ? `
                                    <span class="flex items-center gap-1">
                                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"/>
                                        </svg>
                                        ${publishedDate}
                                    </span>
                                ` : ''}
                            </div>
                        </div>
                    </div>
                </article>
            `;
        });

        html += `</div>`;
        this.container.innerHTML = html;
    }
}

// Auto-initialize if news-container exists
document.addEventListener('DOMContentLoaded', () => {
    const newsContainer = document.getElementById('news-container');
    if (newsContainer) {
        const loader = new NewsLoader('news-container', {
            maxItems: 10,
            showDate: true
        });
        loader.loadNews();
    }
});
