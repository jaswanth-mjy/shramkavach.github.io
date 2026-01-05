/**
 * Updates Manager - Dynamic article loading, sorting, and pagination
 * Automatically manages banner updates and article display
 */

(function() {
    'use strict';
    
    // Articles database - Add new articles here (automatically sorted by date)
    const articlesDatabase = [
        {
            id: 'state-of-technosphere-2026',
            title: 'State of the Technosphere 2026: The Convergence of Autonomy, Capital, and Risk',
            shortTitle: 'State of the Technosphere 2026',
            excerpt: 'As the first trading week of 2026 commences, the global technology landscape undergoes a profound transformation from "AI hype" to "industrial execution." The Great Rebalancing: Meta\'s $2B Manus acquisition, DeepSeek\'s mHC breakthrough, CES 2026 physical AI, and the labor market paradox converge.',
            date: '2026-01-05',
            displayDate: 'Jan 5, 2026',
            category: 'technology ai markets finance cybersecurity',
            tags: ['🔴 BREAKING', '🌐 TECHNOSPHERE', '📊 ANALYSIS'],
            tagColors: ['bg-red-600', 'bg-blue-600', 'bg-purple-600'],
            readTime: '30 min read',
            author: 'ShramKavach',
            icon: '🌐',
            gradient: 'from-blue-50 via-indigo-50 to-purple-50',
            borderColor: 'border-blue-600',
            stats: [
                { label: 'Meta-Manus Deal', value: '$2B', subtext: 'Agentic AI acquisition reshapes tech', color: 'text-green-600', icon: '🤝' },
                { label: 'DeepSeek mHC', value: 'Breakthrough', subtext: 'AI training efficiency revolution', color: 'text-blue-600', icon: '🧮' },
                { label: 'Labor Market', value: '200K Jobs', subtext: 'Banking jobs at risk from AI adoption', color: 'text-orange-600', icon: '⚠️' }
            ],
            link: 'state-of-the-technosphere.html',
            featured: true
        },
        {
            id: 'twenty-twenties-inflection-point',
            title: 'The Inflection Point of the Twenty-Twenties: A Comprehensive Analysis of the Convergence of Kinetic Geopolitics, Algorithmic Sovereignty, and Financial Dislocation',
            shortTitle: 'The Inflection Point of the Twenty-Twenties',
            excerpt: 'Sunday, January 4, 2026, marks a distinct inflection point—where technological acceleration, geopolitical tension, and financial structural shifts catalyzed into a new global reality. Venezuelan intervention, DeepSeek mHC breakthrough, Gold at $4,332, and the Oracle Problem converge.',
            date: '2026-01-04',
            displayDate: 'Jan 4, 2026',
            category: 'geopolitics ai technology markets finance',
            tags: ['🔴 ANALYSIS', '⚡ INFLECTION', '🌍 GLOBAL'],
            tagColors: ['bg-red-600', 'bg-orange-600', 'bg-indigo-600'],
            readTime: '25 min read',
            author: 'ShramKavach',
            icon: '📊',
            gradient: 'from-red-50 via-orange-50 to-indigo-50',
            borderColor: 'border-red-600',
            stats: [
                { label: 'Gold Price', value: '$4,332', subtext: 'Debasement trade accelerates globally', color: 'text-yellow-600', icon: '💰' },
                { label: 'Venezuelan Oil', value: '300B bbl', subtext: 'Largest proven reserves now US-accessible', color: 'text-orange-600', icon: '⚡' },
                { label: 'DeepSeek mHC', value: 'Breakthrough', subtext: 'China bypasses chip sanctions via math', color: 'text-blue-600', icon: '🧮' }
            ],
            link: 'twenty-twenties.html',
            featured: true
        },
        {
            id: 'kinetic-agentic-convergence-2026',
            title: 'The Convergence of Kinetic Force and Agentic Intelligence: Global State of Technology, Finance, and Geopolitics – January 2026',
            shortTitle: 'Kinetic Force & Agentic Intelligence',
            excerpt: 'Operation Southern Spear reshapes Venezuela. Meta acquires Manus for $2B+ in the race for agentic AI. DeepSeek challenges Western dominance. The dual singularity of 2026—kinetic military action meets autonomous digital intelligence.',
            date: '2026-01-04',
            displayDate: 'Jan 4, 2026',
            category: 'geopolitics ai technology markets',
            tags: ['🔴 BREAKING', '⚡ INTELLIGENCE', '🌍 GEOPOLITICS'],
            tagColors: ['bg-red-600', 'bg-orange-600', 'bg-yellow-600'],
            readTime: '18 min read',
            author: 'ShramKavach',
            icon: '⚔️',
            gradient: 'from-red-50 via-orange-50 to-yellow-50',
            borderColor: 'border-red-600',
            stats: [
                { label: 'Operation Southern Spear', value: 'Active', subtext: 'US forces capture Maduro in Venezuela', color: 'text-red-600', icon: '🎯' },
                { label: 'Meta Manus Deal', value: '$2B+', subtext: 'Agentic AI acquisition reshapes tech', color: 'text-blue-600', icon: '🤖' },
                { label: 'Energy Markets', value: '+15%', subtext: 'Venezuela oil shock ripples globally', color: 'text-green-600', icon: '⚡' }
            ],
            link: 'the-convergence-of-kinetic-force-and-agentic-intelligence.html',
            featured: true
        },
        {
            id: 'the-great-divergence',
            title: 'The Great Divergence: Global Markets, Technological Agency, and Digital Resilience in the Dawn of 2026',
            shortTitle: 'The Great Divergence',
            excerpt: 'January 2026 marks a pivotal inflection point: Industrial resilience vs tech recalibration. AI Hype → AI Utility. Agentic operations redefine productivity while cybercrime industrializes. Tesla tumbles, bond markets rally, and autonomous agents reshape software engineering.',
            date: '2026-01-03',
            displayDate: 'Jan 3, 2026',
            category: 'markets ai technology',
            tags: ['🌐 ANALYSIS', '🤖 AI SHIFT', '📊 MARKETS'],
            tagColors: ['bg-indigo-600', 'bg-purple-600', 'bg-blue-600'],
            readTime: '20 min read',
            author: 'ShramKavach',
            icon: '🌐',
            gradient: 'from-indigo-50 via-purple-50 to-pink-50',
            borderColor: 'border-indigo-600',
            stats: [
                { label: 'Market Divergence', value: 'Dow +0.7%', subtext: 'Nasdaq continues 5-day slide', color: 'text-blue-600', icon: '📈' },
                { label: 'AI Paradigm', value: 'Agentic Era', subtext: 'From hype to autonomous utility', color: 'text-purple-600', icon: '🤖' },
                { label: 'Cyber Threats', value: 'Industrial', subtext: 'Ransomware-as-a-Service boom', color: 'text-red-600', icon: '🔒' }
            ],
            link: 'the-great-divergence.html',
            featured: true
        },
        {
            id: 'upi-2026',
            title: 'The 2026 Reset: New Financial Rules Effective January 1',
            shortTitle: 'The 2026 Reset',
            excerpt: 'As we wake up to 2026, the financial landscape has shifted overnight. While the 8th Pay Commission grabs headlines, the "silent" changes in credit reporting and digital payments will impact your daily life.',
            date: '2026-01-01',
            displayDate: 'Jan 1, 2026',
            category: 'finance tax digital',
            tags: ['🔴 BREAKING', '🆕 2026', '💳 UPI'],
            tagColors: ['bg-red-600', 'bg-green-600', 'bg-blue-600'],
            readTime: '12 min read',
            author: 'ShramKavach',
            icon: '💳',
            gradient: 'from-red-50 via-pink-50 to-purple-50',
            borderColor: 'border-red-600',
            stats: [
                { label: 'Tax-Free Income', value: '₹12 Lakh', subtext: 'New tax regime benefits', color: 'text-green-600', icon: '💰' },
                { label: 'Credit Reporting', value: 'Weekly', subtext: 'CIBIL updates starting now', color: 'text-blue-600', icon: '📊' },
                { label: 'UPI Changes', value: 'Active', subtext: 'New financial rules in effect', color: 'text-orange-600', icon: '⚡' }
            ],
            link: 'UPI-2026.HTML',
            featured: true
        },
        {
            id: 'bond-markets-2026',
            title: 'Bond Markets 2026: Your Complete Financial Survival Guide',
            shortTitle: 'Bond Markets 2026',
            excerpt: 'Falling interest rates का फायदा कैसे उठाएं? Zero tax up to ₹12 Lakh income! Complete strategy for Bonds vs FDs, credit score weekly updates, medical inflation survival, और 2026 compliance checklist.',
            date: '2026-01-01',
            displayDate: 'Jan 1, 2026',
            category: 'investment bonds tax',
            tags: ['🆕 NEW', '📈 BONDS', '💰 TAX FREE'],
            tagColors: ['bg-green-600', 'bg-blue-600', 'bg-yellow-600'],
            readTime: '15 min read',
            author: 'ShramKavach Financial Team',
            icon: '📉',
            gradient: 'from-green-50 via-emerald-50 to-teal-50',
            borderColor: 'border-green-600',
            stats: [
                { label: 'Tax Revolution', value: '₹0 Tax', subtext: 'On income up to ₹12L (New Tax Regime)', color: 'text-green-600', icon: '💸' },
                { label: 'Bond Strategy', value: '10-15yr', subtext: 'Long duration bonds for capital gains', color: 'text-blue-600', icon: '📊' },
                { label: 'Credit Alert', value: 'Weekly', subtext: 'CIBIL updates - Automate bills NOW', color: 'text-orange-600', icon: '⚠️' }
            ],
            link: 'bond-markets-2026.html',
            featured: true
        },
        {
            id: 'december-31-2025',
            title: 'The December 31 Dispatch: Deadlines, Disruption & the Dawn of 2026',
            shortTitle: 'December 31 Dispatch',
            excerpt: 'India\'s final day of 2025 देखें: Tax filing rush में ₹5,000 penalty से बचें, 13 million gig workers का logout strike, Nifty का +9.4% return, और India officially बना $4.18 Trillion economy—world का 4th largest!',
            date: '2025-12-31',
            displayDate: 'Dec 31, 2025',
            category: 'economy gig finance',
            tags: ['🔴 LIVE', '📊 YEAR-END REPORT', '🚨 BREAKING'],
            tagColors: ['bg-red-600', 'bg-purple-600', 'bg-orange-500'],
            readTime: '12 min read',
            author: 'ShramKavach Research Team',
            icon: '🇮🇳',
            gradient: 'from-purple-50 via-indigo-50 to-blue-50',
            borderColor: 'border-purple-600',
            stats: [
                { label: 'Economy Milestone', value: '$4.18T', subtext: 'India overtakes Japan as world\'s 4th largest economy', color: 'text-green-600', icon: '🎯' },
                { label: 'Gig Strike Live', value: '13M Workers', subtext: 'Delivery partners logout strike disrupts metros', color: 'text-orange-600', icon: '✊' },
                { label: 'Tax Deadline', value: 'Today', subtext: 'Last call for belated ITR—₹5,000 penalty awaits', color: 'text-red-600', icon: '⏰' }
            ],
            link: 'december-31-2025.html',
            featured: true
        },
        {
            id: 'year-end-2025',
            title: 'Year-End 2025 Action Plan: Tax Deadlines, Labour Rights & Financial Planning',
            shortTitle: 'Year-End 2025 Action Plan',
            excerpt: 'Critical deadlines before Dec 31: ITR filing (avoid ₹5,000 late fee), gratuity claims for 1-year workers, tax regime selection, advance tax payment, EPFO contributions verification, and 2026 financial planning.',
            date: '2025-12-26',
            displayDate: 'Dec 26, 2025',
            category: 'tax labour benefits',
            tags: ['⚡ URGENT', '📅 YEAR-END'],
            tagColors: ['bg-red-600', 'bg-orange-500'],
            readTime: '10 min read',
            author: 'ShramKavach Legal Team',
            icon: '⏰',
            gradient: 'from-red-50 via-orange-50 to-yellow-50',
            borderColor: 'border-red-600',
            stats: [],
            link: 'year-end-2025.html',
            featured: true
        },
        {
            id: 'freelancer-tax-2025',
            title: 'Freelancer Tax Guide 2025: Section 44ADA Changes & Tax Optimization',
            shortTitle: 'Freelancer Tax Guide 2025',
            excerpt: 'Complete guide to Section 44ADA presumptive taxation for freelancers: 50% automatic profit, ₹75L turnover limit, quarterly advance tax, new vs old tax regime comparison, and ITR filing requirements.',
            date: '2025-12-20',
            displayDate: 'Dec 20, 2025',
            category: 'tax',
            tags: ['💼 FREELANCE', '📊 TAX'],
            tagColors: ['bg-emerald-600', 'bg-blue-600'],
            readTime: '8 min read',
            author: 'ShramKavach Tax Team',
            icon: '💼',
            gradient: 'from-emerald-50 via-green-50 to-teal-50',
            borderColor: 'border-emerald-600',
            stats: [],
            link: 'freelancer-tax-2025.html',
            featured: true
        },
        {
            id: 'financial-calculators',
            title: 'Free Financial Calculators for Workers & Freelancers 2025',
            shortTitle: 'Financial Calculators 2025',
            excerpt: 'Access 15+ free calculators: Income tax, EPF, gratuity, Section 44ADA, GST, TDS, advance tax, PPF, home loan EMI, and more. Built specifically for gig workers and freelancers.',
            date: '2025-12-15',
            displayDate: 'Dec 15, 2025',
            category: 'tax benefits',
            tags: ['🧮 TOOLS', '💰 FREE'],
            tagColors: ['bg-cyan-600', 'bg-blue-600'],
            readTime: '5 min read',
            author: 'ShramKavach Tech Team',
            icon: '🧮',
            gradient: 'from-cyan-50 via-blue-50 to-indigo-50',
            borderColor: 'border-cyan-600',
            stats: [],
            link: 'financial-calculators-2025.html',
            featured: true
        },
        {
            id: 'social-security',
            title: 'Social Security Fund Registration Opens for Gig Workers',
            shortTitle: 'Social Security Registration',
            excerpt: 'ESIC portal में gig workers के लिए registration शुरू। Zomato, Swiggy, Uber, Ola सभी platforms अब contribute करेंगे। Health, maternity, और pension benefits मिलेंगे।',
            date: '2025-12-10',
            displayDate: 'Dec 10, 2025',
            category: 'labour benefits',
            tags: ['🏥 HEALTH', '💰 BENEFITS'],
            tagColors: ['bg-blue-600', 'bg-green-600'],
            readTime: '5 min read',
            author: 'ShramKavach Policy Team',
            icon: '🏥',
            gradient: 'from-blue-50 to-indigo-50',
            borderColor: 'border-blue-600',
            stats: [],
            link: '#social-security',
            featured: false
        },
        {
            id: 'gratuity-rule',
            title: '1-Year Gratuity Rule Now Active - Check Your Eligibility',
            shortTitle: 'Gratuity After 1 Year',
            excerpt: 'Fixed-term employees अब 1 साल के बाद gratuity के हकदार हैं। New rule के तहत calculation, eligibility criteria, और claim process.',
            date: '2025-12-05',
            displayDate: 'Dec 5, 2025',
            category: 'labour benefits',
            tags: ['💰 BENEFITS', '⚖️ RIGHTS'],
            tagColors: ['bg-orange-600', 'bg-purple-600'],
            readTime: '6 min read',
            author: 'ShramKavach Legal Team',
            icon: '💼',
            gradient: 'from-orange-50 to-yellow-50',
            borderColor: 'border-orange-600',
            stats: [],
            link: 'gratuity-rule-2025.html',
            featured: false
        },
        {
            id: 'platform-fees',
            title: 'Platform Fee Cap Coming Jan 2026 - What Changes for Gig Workers',
            shortTitle: 'Platform Fee Cap 2026',
            excerpt: 'Zomato, Swiggy, Uber platforms की commission fees पर cap लगेगा। Delivery partners को मिलेगा fair pay। Complete details और impact analysis.',
            date: '2025-12-01',
            displayDate: 'Dec 1, 2025',
            category: 'platforms gig',
            tags: ['📱 PLATFORMS', '💵 PAY'],
            tagColors: ['bg-purple-600', 'bg-green-600'],
            readTime: '7 min read',
            author: 'ShramKavach Policy Team',
            icon: '📱',
            gradient: 'from-purple-50 to-pink-50',
            borderColor: 'border-purple-600',
            stats: [],
            link: 'platform-fees-2025.html',
            featured: false
        },
        {
            id: 'health-insurance',
            title: 'Health Insurance Benefits for Platform Workers Announced',
            shortTitle: 'Health Insurance Benefits',
            excerpt: 'Platform workers के लिए ₹2 Lakh health coverage mandatory होगा। Cashless treatment, maternity benefits, और family coverage included.',
            date: '2025-11-25',
            displayDate: 'Nov 25, 2025',
            category: 'benefits health',
            tags: ['🏥 HEALTH', '💰 FREE'],
            tagColors: ['bg-blue-600', 'bg-green-600'],
            readTime: '5 min read',
            author: 'ShramKavach Benefits Team',
            icon: '🏥',
            gradient: 'from-blue-50 to-cyan-50',
            borderColor: 'border-blue-600',
            stats: [],
            link: 'health-insurance-2025.html',
            featured: false
        }
        // Add more articles here - they will be automatically sorted by date
    ];
    
    // Configuration
    const ARTICLES_PER_PAGE = 6;
    let currentPage = 1;
    let filteredArticles = [...articlesDatabase];
    let currentSortMode = 'recent';
    
    // Sort articles by date (newest first)
    function sortArticlesByDate(articles) {
        return articles.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
    
    // Sort articles by popularity (featured first, then by date)
    function sortArticlesByPopularity(articles) {
        return articles.sort((a, b) => {
            // Featured articles first
            if (a.featured && !b.featured) return -1;
            if (!a.featured && b.featured) return 1;
            // Then by date
            return new Date(b.date) - new Date(a.date);
        });
    }
    
    // Sort articles for trending (recent + featured)
    function sortArticlesByTrending(articles) {
        return articles.sort((a, b) => {
            // Get articles from last 7 days
            const now = new Date();
            const aDate = new Date(a.date);
            const bDate = new Date(b.date);
            const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            
            const aIsRecent = aDate >= sevenDaysAgo;
            const bIsRecent = bDate >= sevenDaysAgo;
            
            // Recent + featured articles first
            if (aIsRecent && a.featured && !(bIsRecent && b.featured)) return -1;
            if (bIsRecent && b.featured && !(aIsRecent && a.featured)) return 1;
            
            // Then recent articles
            if (aIsRecent && !bIsRecent) return -1;
            if (!aIsRecent && bIsRecent) return 1;
            
            // Finally by date
            return new Date(b.date) - new Date(a.date);
        });
    }
    
    // Sort articles based on current mode
    function sortArticles(articles, mode = currentSortMode) {
        switch(mode) {
            case 'popular':
                return sortArticlesByPopularity(articles);
            case 'trending':
                return sortArticlesByTrending(articles);
            case 'recent':
            default:
                return sortArticlesByDate(articles);
        }
    }
    
    // Get latest article for banner
    function getLatestArticle() {
        const sorted = sortArticlesByDate([...articlesDatabase]);
        return sorted[0];
    }
    
    // Update banner with latest article
    function updateBanner() {
        const latest = getLatestArticle();
        if (!latest) return;
        
        // Update hero section
        const heroSection = document.querySelector('.bg-gradient-to-br.from-indigo-900');
        if (heroSection) {
            heroSection.innerHTML = `
                <div class="container mx-auto px-3 sm:px-4 py-6 sm:py-12 md:py-16">
                    <div class="grid md:grid-cols-2 gap-8 items-center">
                        <div>
                            <div class="flex items-center gap-2 mb-4">
                                ${latest.tags.map((tag, idx) => `
                                    <span class="category-pill ${latest.tagColors[idx]} text-white badge-live">${tag}</span>
                                `).join('')}
                                <span class="text-sm text-gray-300">• Just now</span>
                            </div>
                            <h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold news-title mb-3 sm:mb-4 leading-tight">
                                ${latest.shortTitle}
                            </h1>
                            <p class="text-sm sm:text-base md:text-lg text-gray-200 mb-4 sm:mb-6 leading-relaxed">
                                ${latest.excerpt}
                            </p>
                            <div class="flex items-center gap-4">
                                <a href="${latest.link}" class="bg-white text-indigo-900 px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base rounded-lg font-bold hover:bg-gray-100 transition inline-flex items-center gap-2">
                                    Read Full Story
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                                </a>
                                <span class="reading-time flex items-center gap-1">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                    ${latest.readTime}
                                </span>
                            </div>
                        </div>
                        <div class="hidden md:block">
                            ${latest.stats.length > 0 ? `
                                <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                                    <div class="grid grid-cols-${Math.min(latest.stats.length, 2)} gap-4">
                                        ${latest.stats.map(stat => `
                                            <div class="text-center p-4 bg-white/10 rounded-lg">
                                                <div class="text-3xl font-bold ${stat.color}">${stat.value}</div>
                                                <div class="text-xs text-gray-300 mt-1">${stat.subtext}</div>
                                            </div>
                                        `).join('')}
                                    </div>
                                </div>
                            ` : ''}
                        </div>
                    </div>
                </div>
            `;
        }
    }
    
    // Render article card
    function renderArticleCard(article) {
        const statsHtml = article.stats && article.stats.length > 0 ? `
            <div class="grid md:grid-cols-3 gap-4 mb-6">
                ${article.stats.map(stat => {
                    const borderClass = stat.color.includes('green') ? 'border-green-300' : 
                                      stat.color.includes('orange') ? 'border-orange-300' :
                                      stat.color.includes('blue') ? 'border-blue-300' :
                                      stat.color.includes('red') ? 'border-red-300' :
                                      stat.color.includes('purple') ? 'border-purple-300' : 'border-gray-300';
                    return `
                    <div class="bg-white rounded-lg p-4 border-2 ${borderClass}">
                        <div class="flex items-center gap-2 mb-2">
                            <span class="text-2xl">${stat.icon}</span>
                            <h4 class="font-bold text-gray-900">${stat.label}</h4>
                        </div>
                        <p class="text-3xl font-extrabold ${stat.color} mb-1">${stat.value}</p>
                        <p class="text-sm text-gray-700">${stat.subtext}</p>
                    </div>
                    `;
                }).join('')}
            </div>
        ` : '';
        
        return `
            <div class="news-card ${article.featured ? 'featured-card' : ''} bg-gradient-to-br ${article.gradient} rounded-xl sm:rounded-2xl shadow-2xl p-3 sm:p-6 md:p-8 border-l-4 ${article.borderColor} hover:shadow-3xl transition-all" data-category="${article.category}" id="${article.id}">
                <div class="flex flex-wrap items-start justify-between gap-2 mb-3 sm:mb-6">
                    <div class="flex flex-wrap items-center gap-2 sm:gap-3">
                        ${article.tags.map((tag, idx) => `
                            <span class="category-pill ${article.tagColors[idx]} text-white text-xs">${tag}</span>
                        `).join('')}
                        <span class="reading-time hidden sm:inline">📖 ${article.readTime}</span>
                    </div>
                    <div class="text-right">
                        <div class="text-xs sm:text-sm text-gray-600 font-semibold">${article.displayDate}</div>
                        <div class="text-xs text-gray-500 hidden sm:block">By ${article.author}</div>
                    </div>
                </div>
                
                <div class="text-center mb-4 sm:mb-6">
                    <div class="text-4xl sm:text-6xl mb-3 sm:mb-4">${article.icon}</div>
                    <h2 class="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-3 sm:mb-4">
                        <span class="gradient-text">${article.title}</span>
                    </h2>
                    <p class="text-base sm:text-lg text-gray-700 mb-3 sm:mb-4">
                        ${article.excerpt}
                    </p>
                </div>

                ${statsHtml}

                <div class="mt-6">
                    <a href="${article.link}" class="text-blue-600 font-semibold text-sm hover:text-blue-800 transition flex items-center gap-1">
                        <span>Read Complete Article →</span>
                    </a>
                </div>
            </div>
        `;
    }
    
    // Render articles grid
    function renderArticles(page = 1) {
        const newsGrid = document.getElementById('newsGrid');
        if (!newsGrid) return;
        
        const startIdx = (page - 1) * ARTICLES_PER_PAGE;
        const endIdx = startIdx + ARTICLES_PER_PAGE;
        const pageArticles = filteredArticles.slice(startIdx, endIdx);
        
        newsGrid.innerHTML = pageArticles.map(article => renderArticleCard(article)).join('');
    }
    
    // Render pagination
    function renderPagination() {
        const totalPages = Math.ceil(filteredArticles.length / ARTICLES_PER_PAGE);
        const paginationContainer = document.getElementById('pagination');
        
        if (!paginationContainer) {
            console.error('Pagination container not found!');
            return;
        }
        
        if (totalPages <= 1) {
            paginationContainer.innerHTML = '';
            return;
        }
        
        let paginationHtml = '<div class="flex flex-wrap items-center justify-center gap-2 mt-8 mb-8">';
        
        // First page button (<<)
        paginationHtml += `
            <button 
                onclick="updatesManager.goToPage(1)" 
                class="px-3 py-2 rounded-lg border font-bold ${currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-indigo-50 border-indigo-200'}" 
                ${currentPage === 1 ? 'disabled' : ''}
                title="First Page"
            >
                «
            </button>
        `;
        
        // Previous button (<)
        paginationHtml += `
            <button 
                onclick="updatesManager.goToPage(${currentPage - 1})" 
                class="px-3 py-2 rounded-lg border ${currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-indigo-50 border-indigo-200'}" 
                ${currentPage === 1 ? 'disabled' : ''}
                title="Previous Page"
            >
                ‹
            </button>
        `;
        
        // Page numbers (show all pages if total <= 7, otherwise show smart pagination)
        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) {
                paginationHtml += `
                    <button 
                        onclick="updatesManager.goToPage(${i})" 
                        class="px-4 py-2 rounded-lg font-semibold ${i === currentPage ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 hover:bg-indigo-50 border border-indigo-200'}"
                    >
                        ${i}
                    </button>
                `;
            }
        } else {
            // Smart pagination for many pages
            for (let i = 1; i <= totalPages; i++) {
                if (
                    i === 1 || 
                    i === totalPages || 
                    (i >= currentPage - 1 && i <= currentPage + 1)
                ) {
                    paginationHtml += `
                        <button 
                            onclick="updatesManager.goToPage(${i})" 
                            class="px-4 py-2 rounded-lg font-semibold ${i === currentPage ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 hover:bg-indigo-50 border border-indigo-200'}"
                        >
                            ${i}
                        </button>
                    `;
                } else if (i === currentPage - 2 || i === currentPage + 2) {
                    paginationHtml += '<span class="px-2 text-gray-400">...</span>';
                }
            }
        }
        
        // Next button (>)
        paginationHtml += `
            <button 
                onclick="updatesManager.goToPage(${currentPage + 1})" 
                class="px-3 py-2 rounded-lg border ${currentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-indigo-50 border-indigo-200'}" 
                ${currentPage === totalPages ? 'disabled' : ''}
                title="Next Page"
            >
                ›
            </button>
        `;
        
        // Last page button (>>)
        paginationHtml += `
            <button 
                onclick="updatesManager.goToPage(${totalPages})" 
                class="px-3 py-2 rounded-lg border font-bold ${currentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-indigo-50 border-indigo-200'}" 
                ${currentPage === totalPages ? 'disabled' : ''}
                title="Last Page"
            >
                »
            </button>
        `;
        
        // Page info
        paginationHtml += `
            <div class="px-4 py-2 text-sm text-gray-600 font-medium">
                Page ${currentPage} of ${totalPages}
            </div>
        `;
        
        paginationHtml += '</div>';
        paginationContainer.innerHTML = paginationHtml;
    }
    
    // Go to specific page
    function goToPage(page) {
        const totalPages = Math.ceil(filteredArticles.length / ARTICLES_PER_PAGE);
        if (page < 1 || page > totalPages) return;
        
        currentPage = page;
        renderArticles(currentPage);
        renderPagination();
        
        // Scroll to top of news grid
        const newsGrid = document.getElementById('newsGrid');
        if (newsGrid) {
            newsGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
    
    // Filter articles
    function filterArticles(category) {
        if (category === 'all') {
            filteredArticles = [...articlesDatabase];
        } else {
            filteredArticles = articlesDatabase.filter(article => 
                article.category.includes(category)
            );
        }
        
        filteredArticles = sortArticles(filteredArticles);
        currentPage = 1;
        renderArticles(currentPage);
        renderPagination();
    }
    
    // Change sorting mode
    function changeSortMode(mode) {
        currentSortMode = mode;
        filteredArticles = sortArticles([...filteredArticles], mode);
        currentPage = 1;
        renderArticles(currentPage);
        renderPagination();
    }
    
    // Render sidebar articles list
    function renderSidebarArticles() {
        const sidebarContainer = document.getElementById('sidebar-articles');
        if (!sidebarContainer) return;
        
        const sortedArticles = sortArticlesByDate([...articlesDatabase]);
        
        const sidebarHtml = sortedArticles.map(article => `
            <a href="${article.link}" class="block py-2 px-3 rounded-lg hover:bg-indigo-50 transition group">
                <div class="flex items-start gap-2">
                    <span class="text-lg flex-shrink-0">${article.icon}</span>
                    <div class="flex-1 min-w-0">
                        <div class="font-semibold text-gray-900 group-hover:text-indigo-600 transition truncate text-sm">
                            ${article.shortTitle}
                        </div>
                        <div class="text-xs text-gray-500 mt-1">${article.displayDate}</div>
                    </div>
                </div>
            </a>
        `).join('');
        
        sidebarContainer.innerHTML = sidebarHtml;
    }
    
    // Update breaking news ticker with latest 3 articles
    function updateBreakingNewsTicker() {
        const tickerElement = document.querySelector('.ticker');
        if (!tickerElement) return;
        
        const sortedArticles = sortArticlesByDate([...articlesDatabase]);
        const latest3 = sortedArticles.slice(0, 3);
        
        const tickerContent = latest3.map((article, index) => {
            // Extract key highlight from excerpt or title
            const highlight = article.excerpt.length > 100 
                ? article.shortTitle 
                : article.excerpt;
            
            return `<span class="mx-4">${index === 0 ? '🔴 BREAKING:' : '•'}</span><span class="mx-8">${highlight}</span>`;
        }).join('');
        
        tickerElement.innerHTML = tickerContent;
    }
    
    // Initialize
    function init() {
        // Sort articles by date
        articlesDatabase.sort((a, b) => new Date(b.date) - new Date(a.date));
        filteredArticles = [...articlesDatabase];
        
        // Update breaking news ticker
        updateBreakingNewsTicker();
        
        // Update banner with latest article
        updateBanner();
        
        // Render first page of articles
        renderArticles(1);
        renderPagination();
        
        // Render sidebar articles list
        renderSidebarArticles();
        
        // Setup sort dropdown
        const sortSelect = document.getElementById('sort-select');
        if (sortSelect) {
            sortSelect.addEventListener('change', function() {
                changeSortMode(this.value);
            });
        }
        
        // Setup filter buttons
        document.querySelectorAll('.filter-tag').forEach(button => {
            button.addEventListener('click', function() {
                const filter = this.dataset.filter;
                
                // Update active state
                document.querySelectorAll('.filter-tag').forEach(btn => {
                    btn.classList.remove('active', 'bg-indigo-600', 'text-white');
                    btn.classList.add('bg-gray-200', 'text-gray-700');
                });
                this.classList.add('active', 'bg-indigo-600', 'text-white');
                this.classList.remove('bg-gray-200', 'text-gray-700');
                
                filterArticles(filter);
            });
        });
    }
    
    // Expose public API
    window.updatesManager = {
        goToPage: goToPage,
        filterArticles: filterArticles,
        changeSortMode: changeSortMode,
        updateBreakingNewsTicker: updateBreakingNewsTicker,
        init: init
    };
    
    // Auto-initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
