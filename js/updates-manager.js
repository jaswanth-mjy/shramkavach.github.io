/**
 * Updates Manager - Dynamic article loading, sorting, and pagination
 * Automatically manages banner updates and article display
 */

(function() {
    'use strict';
    
    // Articles database - Add new articles here (automatically sorted by date)
    const articlesDatabase = [
        {
            id: 'convergence-complexity-finance-ai-feb19-2026',
            title: 'Convergence and Complexity: Global Finance, AI & Digital Infrastructure',
            shortTitle: 'Convergence & Complexity: Finance, AI & Infra Feb 19',
            excerpt: 'SENSEX crashes 1,236 pts (-1.48%), Claude Opus 4.6 MRCR 76%, OpenAI $100B round, DDoS up 168%, India loses Rs 7.5 lakh crore, Walmart earnings beat, Sovereign AI.',
            date: '2026-02-19',
            displayDate: 'Feb 19, 2026',
            category: 'convergence complexity finance ai digital infrastructure cybersecurity',
            tags: ['🌐 CONVERGENCE', '📉 MARKET CRASH', '🤖 CLAUDE OPUS 4.6', '🛡️ CYBERSECURITY'],
            tagColors: ['bg-indigo-600', 'bg-red-600', 'bg-purple-600', 'bg-pink-600'],
            readTime: '35 min read',
            author: 'ShramKavach',
            icon: '🌐',
            gradient: 'from-slate-50 via-indigo-50 to-red-50',
            borderColor: 'border-indigo-600',
            stats: [
                { label: 'SENSEX', value: '-1.48%', subtext: '-1,236 pts', color: 'text-red-600', icon: '📉' },
                { label: 'Opus 4.6', value: '76%', subtext: 'MRCR v2', color: 'text-purple-600', icon: '🤖' },
                { label: 'OpenAI', value: '$100B', subtext: 'Valuation', color: 'text-green-600', icon: '💰' },
                { label: 'DDoS', value: '+168%', subtext: 'YoY Surge', color: 'text-pink-600', icon: '🛡️' }
            ],
            link: 'convergence-complexity-finance-ai-feb19-2026.html',
            featured: true
        },
        {
            id: 'great-architecture-shift-agentic-ai-feb18-2026',
            title: 'The Great Architecture Shift: Global Finance, Agentic AI & 2026 Market Reset',
            shortTitle: 'Architecture Shift: SaaSpocalypse & Agentic AI Feb 18',
            excerpt: 'SaaSpocalypse vaporizes $2T, Claude 4.6 Elo 1633, GPT-5.3-Codex self-creates, S&P 6,843, SENSEX 83,734, Pixel 10a, Python 3.14. Architecture Shift analysis.',
            date: '2026-02-18',
            displayDate: 'Feb 18, 2026',
            category: 'architecture shift saaspocalypse agentic ai market reset',
            tags: ['🏗️ ARCHITECTURE SHIFT', '💥 SAASPOCALYPSE', '🤖 AGENTIC AI', '📊 MARKET RESET'],
            tagColors: ['bg-slate-600', 'bg-red-600', 'bg-purple-600', 'bg-blue-600'],
            readTime: '32 min read',
            author: 'ShramKavach',
            icon: '🏗️',
            gradient: 'from-slate-50 via-blue-50 to-purple-50',
            borderColor: 'border-blue-600',
            stats: [
                { label: 'S&P 500', value: '6,843', subtext: '+0.10%', color: 'text-green-600', icon: '📈' },
                { label: 'SENSEX', value: '83,734', subtext: '+0.34%', color: 'text-green-600', icon: '🇮🇳' },
                { label: 'Claude 4.6', value: '1633', subtext: 'Elo Score', color: 'text-purple-600', icon: '🤖' },
                { label: 'SaaS Lost', value: '$2T', subtext: 'Vaporized', color: 'text-red-600', icon: '💥' }
            ],
            link: 'great-architecture-shift-agentic-ai-feb18-2026.html',
            featured: true
        },
        {
            id: 'intelligence-age-financial-equilibrium-feb17-2026',
            title: 'The Intelligence Age: Global Financial Equilibrium, AI Proliferation & Cybersecurity Resilience',
            shortTitle: 'Intelligence Age: Financial Equilibrium & AI Feb 17',
            excerpt: 'Dow 49,500, SENSEX 83,450, $390B AI market, Grok-3 94.5% HumanEval, Fujitsu 100x productivity, $10.22M breach costs, 30,700 tech layoffs. Comprehensive analysis of the Intelligence Age.',
            date: '2026-02-17',
            displayDate: 'Feb 17, 2026',
            category: 'intelligence age financial equilibrium ai proliferation cybersecurity',
            tags: ['🧠 INTELLIGENCE AGE', '📈 FINANCIAL EQUILIBRIUM', '🤖 AI PROLIFERATION', '🔒 CYBERSECURITY'],
            tagColors: ['bg-purple-600', 'bg-green-600', 'bg-amber-600', 'bg-red-600'],
            readTime: '34 min read',
            author: 'ShramKavach',
            icon: '🧠',
            gradient: 'from-slate-50 via-purple-50 to-teal-50',
            borderColor: 'border-purple-600',
            stats: [
                { label: 'Dow', value: '49,500', subtext: 'Record', color: 'text-green-600', icon: '📈' },
                { label: 'SENSEX', value: '83,450', subtext: 'Recovery', color: 'text-green-600', icon: '🇮🇳' },
                { label: 'Grok-3', value: '94.5%', subtext: 'HumanEval', color: 'text-amber-600', icon: '🤖' },
                { label: 'Layoffs', value: '30.7K', subtext: 'Tech Jobs', color: 'text-red-600', icon: '💼' }
            ],
            link: 'intelligence-age-financial-equilibrium-feb17-2026.html',
            featured: true
        },
        {
            id: 'structural-divergence-agentic-frontier-feb16-2026',
            title: 'Structural Divergence and the Agentic Frontier: Global Finance & Technology',
            shortTitle: 'Structural Divergence: Markets, AI & Agentic Feb 16',
            excerpt: 'SENSEX +0.79% recovery, NIFTY IT -9% weekly repricing, $2.52T AI enterprise spending, Claude 4.5 30-hour autonomous coding. Comprehensive analysis of market divergence, agentic AI transformation, workforce displacement, and structural technology shifts.',
            date: '2026-02-16',
            displayDate: 'Feb 16, 2026',
            category: 'structural divergence agentic ai it repricing workforce shift',
            tags: ['🔀 STRUCTURAL DIVERGENCE', '🤖 AGENTIC AI', '📊 IT REPRICING', '💼 WORKFORCE SHIFT'],
            tagColors: ['bg-slate-600', 'bg-indigo-600', 'bg-purple-600', 'bg-blue-600'],
            readTime: '32 min read',
            author: 'ShramKavach',
            icon: '🔀',
            gradient: 'from-slate-50 via-indigo-50 to-purple-50',
            borderColor: 'border-slate-600',
            stats: [
                { label: 'SENSEX', value: '+0.79%', subtext: 'Recovery', color: 'text-green-600', icon: '📈' },
                { label: 'IT Weekly', value: '-9%', subtext: 'Repricing', color: 'text-red-600', icon: '📊' },
                { label: 'AI Spend', value: '$2.52T', subtext: '2026 Est.', color: 'text-purple-600', icon: '💰' },
                { label: 'Claude 4.5', value: '30hrs', subtext: 'Auto Code', color: 'text-indigo-600', icon: '🤖' }
            ],
            link: 'structural-divergence-agentic-frontier-feb16-2026.html',
            featured: true
        },
        {
            id: 'silicon-inflection-financial-ai-resilience-feb15-2026',
            title: 'The Silicon Inflection: Global Financial Markets, Generative AI & Technical Resilience',
            shortTitle: 'Silicon Inflection: Markets, AI & Resilience Feb 15',
            excerpt: 'SENSEX crash -1,048 pts, NIFTY IT -4.5%, developer AI adoption 92%, ToT prompting 74% success. Comprehensive analysis of tech correction, agentic AI evolution, developer productivity crisis, and EPOCH career framework.',
            date: '2026-02-15',
            displayDate: 'Feb 15, 2026',
            category: 'silicon inflection developer ai tech correction career framework',
            tags: ['🔷 SILICON INFLECTION', '💻 DEVELOPER AI', '📈 TECH CORRECTION', '🎯 CAREER FRAMEWORK'],
            tagColors: ['bg-cyan-600', 'bg-blue-600', 'bg-red-600', 'bg-purple-600'],
            readTime: '35 min read',
            author: 'ShramKavach',
            icon: '🔷',
            gradient: 'from-cyan-50 via-blue-50 to-purple-50',
            borderColor: 'border-cyan-600',
            stats: [
                { label: 'SENSEX', value: '-1,048', subtext: 'Points drop', color: 'text-red-600', icon: '📉' },
                { label: 'Dev AI', value: '92%', subtext: 'Adoption', color: 'text-blue-600', icon: '💻' },
                { label: 'ToT Success', value: '74%', subtext: 'Prompting', color: 'text-purple-600', icon: '🎯' },
                { label: 'NIFTY IT', value: '-4.5%', subtext: 'Correction', color: 'text-orange-600', icon: '📊' }
            ],
            link: 'silicon-inflection-financial-ai-resilience-feb15-2026.html',
            featured: true
        },
        {
            id: 'strategic-equilibrium-autonomous-agency-feb14-2026',
            title: 'Strategic Equilibrium in the Age of Autonomous Agency: A Comprehensive Audit of Financial, Technological, and Security Architectures',
            shortTitle: 'Strategic Equilibrium & Autonomous Agency Feb 14',
            excerpt: 'BSE Sensex -1.25%, Nasdaq -2.03%, NVIDIA $4.4T market cap. Q-Day compressed to 2029, AI salaries hit $300K+, gold flash crash -$200. Comprehensive audit of financial volatility, AI evolution, and post-quantum security mandates.',
            date: '2026-02-14',
            displayDate: 'Feb 14, 2026',
            category: 'strategic audit post-quantum market crash ai salaries',
            tags: ['🛡️ STRATEGIC AUDIT', '🔐 POST-QUANTUM', '📉 MARKET CRASH', '💰 AI SALARIES'],
            tagColors: ['bg-purple-600', 'bg-gray-600', 'bg-red-600', 'bg-green-600'],
            readTime: '30 min read',
            author: 'ShramKavach',
            icon: '🛡️',
            gradient: 'from-purple-50 via-gray-50 to-red-50',
            borderColor: 'border-purple-600',
            stats: [
                { label: 'Sensex', value: '-1.25%', subtext: 'BSE drop', color: 'text-red-600', icon: '📉' },
                { label: 'NVIDIA', value: '$4.4T', subtext: 'Market cap', color: 'text-green-600', icon: '🚀' },
                { label: 'Q-Day', value: '2029', subtext: 'Timeline', color: 'text-purple-600', icon: '🔐' },
                { label: 'AI Salary', value: '$300K+', subtext: 'Engineers', color: 'text-gray-600', icon: '💰' }
            ],
            link: 'strategic-equilibrium-autonomous-agency-feb14-2026.html',
            featured: true
        },
        {
            id: 'global-technological-financial-synthesis-feb13-2026',
            title: 'The Global Technological and Financial Synthesis: Market Volatility, Generative AI Evolution, and Strategic Digital Resilience',
            shortTitle: 'Global Tech & Financial Synthesis Feb 13',
            excerpt: 'BSE Sensex crashes 1,048 points, Indian IT index -5%, S&P 500 at 6,836. GPT-5.3-Codex-Spark delivers 1,000+ tokens/sec, Disney faces $2.75M CCPA fine. Comprehensive analysis of market volatility and AI acceleration.',
            date: '2026-02-13',
            displayDate: 'Feb 13, 2026',
            category: 'market volatility indian markets ai acceleration cybersecurity',
            tags: ['📊 MARKET VOLATILITY', '🇮🇳 INDIAN MARKETS', '⚡ AI ACCELERATION', '🔒 CYBERSECURITY'],
            tagColors: ['bg-blue-600', 'bg-orange-600', 'bg-purple-600', 'bg-gray-600'],
            readTime: '28 min read',
            author: 'ShramKavach',
            icon: '📊',
            gradient: 'from-blue-50 via-purple-50 to-indigo-50',
            borderColor: 'border-blue-600',
            stats: [
                { label: 'BSE Sensex', value: '-1,048', subtext: 'Points crash', color: 'text-red-600', icon: '📉' },
                { label: 'IT Index', value: '-5%', subtext: 'Decline', color: 'text-orange-600', icon: '💻' },
                { label: 'GPT-5.3', value: '1K+/sec', subtext: 'Token speed', color: 'text-purple-600', icon: '⚡' },
                { label: 'Disney Fine', value: '$2.75M', subtext: 'CCPA penalty', color: 'text-gray-600', icon: '⚖️' }
            ],
            link: 'global-technological-financial-synthesis-feb13-2026.html',
            featured: true
        },
        {
            id: 'great-bifurcation-industrialization-ai-feb12-2026',
            title: 'The Great Bifurcation: The Industrialization of Artificial Intelligence and the Redefining of Economic, Technical, and Security Architectures',
            shortTitle: 'Great Bifurcation: AI Industrialization Feb 12',
            excerpt: 'S&P 500 breaches 7,000, SaaS loses $1 trillion in market cap, GPT-5.3 Codex launches. The death of man-month, AI phishing 54% CTR, Gen Z faces broken rung. Complete analysis of AI industrialization reshaping markets, engineering, and security.',
            date: '2026-02-12',
            displayDate: 'Feb 12, 2026',
            category: 'ai revolution saas crisis engineering shift security threats',
            tags: ['⚡ AI REVOLUTION', '📉 SAAS CRISIS', '💻 ENGINEERING SHIFT', '🔒 SECURITY THREATS'],
            tagColors: ['bg-red-600', 'bg-orange-600', 'bg-purple-600', 'bg-gray-600'],
            readTime: '32 min read',
            author: 'ShramKavach',
            icon: '⚡',
            gradient: 'from-red-50 via-orange-50 to-purple-50',
            borderColor: 'border-red-600',
            stats: [
                { label: 'S&P 500', value: '7,000', subtext: 'Breached', color: 'text-green-600', icon: '📈' },
                { label: 'SaaS Loss', value: '$1T', subtext: 'Market cap', color: 'text-red-600', icon: '📉' },
                { label: 'AI Phishing', value: '54%', subtext: 'CTR achieved', color: 'text-orange-600', icon: '🔒' },
                { label: 'GPT-5.3', value: 'Launch', subtext: 'Codex model', color: 'text-purple-600', icon: '⚡' }
            ],
            link: 'great-bifurcation-industrialization-ai-feb12-2026.html',
            featured: true
        },
        {
            id: 'global-orchestration-capital-autonomous-intelligence-feb11-2026',
            title: 'The Global Orchestration of Capital and Autonomous Intelligence: A Strategic Analysis of February 2026',
            shortTitle: 'Capital Orchestration & AI Feb 11',
            excerpt: 'US adds 130K jobs with unemployment at 4.3%, Alphabet raises $30B debt for AI arms race, Oracle announces $50B AI expansion. Runway valued at $5.3B, Claude Opus 4.6 leads benchmarks. Strategic analysis of capital orchestration and autonomous intelligence.',
            date: '2026-02-11',
            displayDate: 'Feb 11, 2026',
            category: 'strategic analysis capital markets autonomous ai jobs report',
            tags: ['🎯 STRATEGIC ANALYSIS', '💰 CAPITAL MARKETS', '🤖 AUTONOMOUS AI', '📊 JOBS REPORT'],
            tagColors: ['bg-indigo-600', 'bg-green-600', 'bg-purple-600', 'bg-blue-600'],
            readTime: '28 min read',
            author: 'ShramKavach',
            icon: '🎯',
            gradient: 'from-indigo-50 via-green-50 to-purple-50',
            borderColor: 'border-indigo-600',
            stats: [
                { label: 'US Jobs', value: '130K', subtext: 'Added Feb', color: 'text-blue-600', icon: '📊' },
                { label: 'Alphabet Debt', value: '$30B', subtext: 'AI expansion', color: 'text-green-600', icon: '💰' },
                { label: 'Runway Value', value: '$5.3B', subtext: 'Series E', color: 'text-purple-600', icon: '🚀' },
                { label: 'Claude Opus', value: '4.6', subtext: 'Top benchmark', color: 'text-indigo-600', icon: '🤖' }
            ],
            link: 'global-orchestration-capital-autonomous-intelligence-feb11-2026.html',
            featured: true
        },
        {
            id: 'global-intelligence-capital-report-feb10-2026',
            title: 'The 2026 Global Intelligence and Capital Report: Systematic Integration of Finance, Generative AI, and Secure Developmental Infrastructure',
            shortTitle: 'Global Intelligence & Capital Feb 10',
            excerpt: 'Indian markets extend rally with Nifty +0.26%, US software sector faces 22% correction, GPT-5.2 achieves 100% AIME benchmark, AI engineer salaries reach $170K+, cybersecurity breach costs hit $4.88M. Comprehensive analysis of capital markets, agentic AI workflows, and secure infrastructure.',
            date: '2026-02-10',
            displayDate: 'Feb 10, 2026',
            category: 'global intelligence capital analysis ai benchmarks tech salaries cybersecurity',
            tags: ['🔬 CAPITAL ANALYSIS', '🤖 AI BENCHMARKS', '💼 TECH SALARIES', '🔒 CYBERSECURITY'],
            tagColors: ['bg-teal-600', 'bg-purple-600', 'bg-blue-600', 'bg-red-600'],
            readTime: '26 min read',
            author: 'ShramKavach',
            icon: '🔬',
            gradient: 'from-teal-50 via-purple-50 to-blue-50',
            borderColor: 'border-teal-600',
            stats: [
                { label: 'Nifty 50', value: '+0.26%', subtext: 'Rally extends', color: 'text-green-600', icon: '📈' },
                { label: 'GPT-5.2', value: '100%', subtext: 'AIME score', color: 'text-purple-600', icon: '🤖' },
                { label: 'AI Engineer', value: '$170K+', subtext: 'Average salary', color: 'text-blue-600', icon: '💼' },
                { label: 'Breach Cost', value: '$4.88M', subtext: 'Per incident', color: 'text-red-600', icon: '🔒' }
            ],
            link: 'global-intelligence-capital-report-feb10-2026.html',
            featured: true
        },
        {
            id: 'state-of-global-finance-autonomous-intelligence-feb9-2026',
            title: 'The 2026 State of Global Finance and Autonomous Intelligence: A Comprehensive Synthesis of Market Dynamics, Agentic Architectures, and Regulatory Landscapes',
            shortTitle: 'Global Finance & Agentic AI Feb 9',
            excerpt: 'Nifty surges 0.68%, Dow crosses 50,000 milestone. Anthropic Effect wipes $300B from SaaS sector as agentic AI reshapes enterprise software. EU AI Act enforcement begins August 2026, Colorado CAIA takes effect. Comprehensive analysis of market dynamics, autonomous intelligence, and regulatory transformation.',
            date: '2026-02-09',
            displayDate: 'Feb 9, 2026',
            category: 'global finance agentic ai market rally saas crisis anthropic effect eu ai act colorado regulatory',
            tags: ['🤖 AGENTIC AI', '📈 MARKET RALLY', '💼 SAAS CRISIS', '⚖️ AI REGULATION'],
            tagColors: ['bg-purple-600', 'bg-green-600', 'bg-red-600', 'bg-blue-600'],
            readTime: '24 min read',
            author: 'ShramKavach',
            icon: '🤖',
            gradient: 'from-purple-50 via-blue-50 to-green-50',
            borderColor: 'border-purple-600',
            stats: [
                { label: 'Dow Jones', value: '50,000', subtext: 'Milestone', color: 'text-green-600', icon: '📈' },
                { label: 'Nifty 50', value: '+0.68%', subtext: 'Rally', color: 'text-blue-600', icon: '📊' },
                { label: 'SaaS Crisis', value: '$300B', subtext: 'Lost value', color: 'text-red-600', icon: '💼' },
                { label: 'EU AI Act', value: 'Aug 2026', subtext: 'Enforcement', color: 'text-purple-600', icon: '⚖️' }
            ],
            link: 'state-of-global-finance-autonomous-intelligence-feb9-2026.html',
            featured: true
        },
        {
            id: 'comprehensive-global-analysis-feb8-2026',
            title: 'Comprehensive Analysis of Global Macroeconomic Indicators, Technological Frontiers, and Sociocultural Shifts (February 8, 2026)',
            shortTitle: 'Global Analysis Feb 8',
            excerpt: 'India AI Impact Summit 2026 draws 35,000+ delegates with hotel rooms hitting ₹1.97 lakh/night, $650B AI capex boom continues, frontier models Kimi K2.5 and Qwen3-Max-Thinking launch, Indian gold market dynamics shift, and viral social phenomena define February 8, 2026.',
            date: '2026-02-08',
            displayDate: 'Feb 8, 2026',
            category: 'india ai summit technology frontier models gold market olympics social phenomena',
            tags: ['🎯 AI SUMMIT', '💰 GOLD MARKET', '🤖 FRONTIER AI', '🏆 OLYMPICS'],
            tagColors: ['bg-indigo-600', 'bg-yellow-600', 'bg-purple-600', 'bg-green-600'],
            readTime: '48 min read',
            author: 'ShramKavach',
            icon: '🎯',
            gradient: 'from-indigo-50 via-purple-50 to-yellow-50',
            borderColor: 'border-indigo-600',
            stats: [
                { label: 'AI Summit', value: '35K+', subtext: 'Delegates', color: 'text-indigo-600', icon: '🎯' },
                { label: 'Hotel Rooms', value: '₹1.97L', subtext: 'Per night', color: 'text-red-600', icon: '🏨' },
                { label: 'Gold Market', value: 'Dynamic', subtext: 'Price shifts', color: 'text-yellow-600', icon: '💰' },
                { label: 'Frontier AI', value: 'Launch', subtext: 'New models', color: 'text-purple-600', icon: '🤖' }
            ],
            link: 'comprehensive-global-analysis-feb8-2026.html',
            featured: true
        },
        {
            id: 'comprehensive-global-analysis-feb7-2026',
            title: 'Comprehensive Analysis of Global Macroeconomic Indicators, Technological Frontiers, and Sociocultural Shifts (February 7, 2026)',
            shortTitle: 'Global Analysis Feb 7',
            excerpt: 'Comprehensive analysis of February 7, 2026: $650B AI infrastructure supercycle, India-US trade pact, gold market surge, CES 2026, deepfake crisis, T20 World Cup, and sociocultural shifts defining the global paradigm.',
            date: '2026-02-07',
            displayDate: 'Feb 7, 2026',
            category: 'global analysis macroeconomic technology ai infrastructure india us trade gold ces deepfake t20 world cup',
            tags: ['🌍 GLOBAL ANALYSIS', '💻 AI SUPERCYCLE', '🏆 TRADE DEALS', '📱 CES 2026'],
            tagColors: ['bg-cyan-600', 'bg-blue-600', 'bg-green-600', 'bg-purple-600'],
            readTime: '38 min read',
            author: 'ShramKavach',
            icon: '🌍',
            gradient: 'from-cyan-50 via-blue-50 to-purple-50',
            borderColor: 'border-cyan-600',
            stats: [
                { label: 'AI Capex', value: '$650B', subtext: 'Infrastructure boom', color: 'text-blue-600', icon: '💻' },
                { label: 'Trade Deal', value: 'India-US', subtext: 'Strategic pact', color: 'text-green-600', icon: '🏆' },
                { label: 'Gold Market', value: 'Surge', subtext: 'Record demand', color: 'text-yellow-600', icon: '💰' },
                { label: 'CES 2026', value: 'Innovation', subtext: 'Tech showcase', color: 'text-purple-600', icon: '📱' }
            ],
            link: 'comprehensive-global-analysis-feb7-2026.html',
            featured: true
        },
        {
            id: 'ai-industrial-integration-report-feb6-2026',
            title: 'The 2026 Artificial Intelligence Industrial Integration Report: Technical Frontiers, Financial Convergence, and the Agentic Paradigm (February 6, 2026)',
            shortTitle: 'AI Integration Report Feb 6',
            excerpt: 'Comprehensive analysis of the Great Assimilation: SpaceX-xAI $1.25T merger creating industrial AI powerhouse, NVIDIA Rubin platform breakthrough, agentic AI paradigm shifting from chat to autonomous workflows, 4.9% productivity surge, and the transition from experimental to operational AI transforming enterprise infrastructure.',
            date: '2026-02-06',
            displayDate: 'Feb 6, 2026',
            category: 'ai artificial intelligence industrial integration spacex xai nvidia rubin agentic paradigm productivity',
            tags: ['🤖 AI INTEGRATION', '🚀 SPACEX-XAI', '💎 NVIDIA RUBIN', '⚡ AGENTIC AI'],
            tagColors: ['bg-blue-600', 'bg-purple-600', 'bg-green-600', 'bg-indigo-600'],
            readTime: '42 min read',
            author: 'ShramKavach',
            icon: '🤖',
            gradient: 'from-blue-50 via-purple-50 to-green-50',
            borderColor: 'border-blue-600',
            stats: [
                { label: 'Merger Value', value: '$1.25T', subtext: 'SpaceX-xAI', color: 'text-purple-600', icon: '🚀' },
                { label: 'Productivity', value: '+4.9%', subtext: 'AI surge', color: 'text-green-600', icon: '📈' },
                { label: 'Platform', value: 'Rubin', subtext: 'NVIDIA launch', color: 'text-blue-600', icon: '💎' },
                { label: 'Paradigm', value: 'Agentic', subtext: 'Autonomous AI', color: 'text-indigo-600', icon: '⚡' }
            ],
            link: 'ai-industrial-integration-report-feb6-2026.html',
            featured: true
        },
        {
            id: 'state-of-global-intelligence-capital-feb5-2026',
            title: 'The State of Global Intelligence and Capital: Comprehensive Analysis of Technology Recovery, Capital Rotation, and Energy Dynamics (February 5, 2026)',
            shortTitle: 'Intelligence & Capital Feb 5',
            excerpt: 'Strategic assessment of Feb 5: Nifty IT rebounds 3.7% from AI-driven crash signaling market adaptation, capital rotation accelerating from technology to precious metals safe havens, emerging markets demonstrating structural resilience, Eastern Europe energy crisis deepening with infrastructure sabotage, and the convergence of artificial intelligence disruption with global capital flow dynamics.',
            date: '2026-02-05',
            displayDate: 'Feb 5, 2026',
            category: 'global intelligence capital nifty it recovery capital rotation precious metals emerging markets energy crisis ai disruption',
            tags: ['🧠 INTELLIGENCE', '💎 CAPITAL FLOW', '📈 IT RECOVERY', '⚡ ENERGY CRISIS'],
            tagColors: ['bg-purple-600', 'bg-yellow-600', 'bg-green-600', 'bg-orange-600'],
            readTime: '38 min read',
            author: 'ShramKavach',
            icon: '🧠',
            gradient: 'from-purple-50 via-yellow-50 to-green-50',
            borderColor: 'border-purple-600',
            stats: [
                { label: 'IT Recovery', value: '+3.7%', subtext: 'Market rebound', color: 'text-green-600', icon: '📈' },
                { label: 'Capital Flow', value: 'Rotation', subtext: 'Tech to metals', color: 'text-yellow-600', icon: '💎' },
                { label: 'Markets', value: 'Resilient', subtext: 'Emerging strength', color: 'text-purple-600', icon: '🌍' },
                { label: 'Energy', value: 'Crisis', subtext: 'Infrastructure hit', color: 'text-orange-600', icon: '⚡' }
            ],
            link: 'state-of-global-intelligence-capital-feb5-2026.html',
            featured: true
        },
        {
            id: 'global-macroeconomic-geopolitical-risk-assessment-feb4-2026',
            title: 'Global Macroeconomic and Geopolitical Risk Assessment: Tech Sector Disruption, Parliamentary Gridlock, and Energy Warfare (February 4, 2026)',
            shortTitle: 'Disruption Feb 4',
            excerpt: 'Strategic assessment of Feb 4: Indian IT sector crashes 5.87% on Anthropic agentic AI disruption threatening coding jobs, parliamentary crisis deepening with mass opposition walkouts, Maharashtra political succession intensifying, Eastern Europe energy warfare escalating with Nord Stream sabotage reports, precious metals recovery gaining strength, and convergence of technological disruption with political instability.',
            date: '2026-02-04',
            displayDate: 'Feb 4, 2026',
            category: 'global macroeconomic geopolitical assessment indian it crash agentic ai anthropic parliamentary crisis maharashtra energy warfare precious metals',
            tags: ['⚡ DISRUPTION', '💻 AI CRASH', '🏛️ CRISIS', '⚔️ ENERGY WAR'],
            tagColors: ['bg-red-600', 'bg-purple-600', 'bg-orange-600', 'bg-gray-600'],
            readTime: '44 min read',
            author: 'ShramKavach',
            icon: '⚡',
            gradient: 'from-red-50 via-purple-50 to-orange-50',
            borderColor: 'border-red-600',
            stats: [
                { label: 'IT Crash', value: '-5.87%', subtext: 'AI disruption', color: 'text-red-600', icon: '💻' },
                { label: 'Parliament', value: 'Gridlock', subtext: 'Mass walkouts', color: 'text-orange-600', icon: '🏛️' },
                { label: 'Energy War', value: 'Escalation', subtext: 'Nord Stream', color: 'text-gray-600', icon: '⚔️' },
                { label: 'Metals', value: 'Recovery', subtext: 'Safe haven', color: 'text-purple-600', icon: '💎' }
            ],
            link: 'global-macroeconomic-geopolitical-risk-assessment-feb4-2026.html',
            featured: true
        },
        {
            id: 'global-macroeconomic-geopolitical-risk-assessment-feb3-2026',
            title: 'Global Macroeconomic and Geopolitical Risk Assessment: Historic Trade Deal, Market Rally, and Regional Stability Shifts (February 3, 2026)',
            shortTitle: 'Assessment Feb 3',
            excerpt: 'Strategic assessment of Feb 3: Historic India-US trade deal driving record market rally, parliamentary crisis deepening with mass suspensions, precious metals recovery gaining momentum, Maharashtra political succession, Eastern Europe energy survival amid extreme winter, and convergence of diplomatic breakthrough with domestic political turbulence.',
            date: '2026-02-03',
            displayDate: 'Feb 3, 2026',
            category: 'global macroeconomic geopolitical assessment india us trade deal market rally parliamentary crisis precious metals recovery eastern europe energy crisis',
            tags: ['📊 ASSESSMENT', '🤝 TRADE DEAL', '📈 MARKET RALLY', '⚡ ENERGY CRISIS'],
            tagColors: ['bg-blue-600', 'bg-green-600', 'bg-yellow-600', 'bg-purple-600'],
            readTime: '46 min read',
            author: 'ShramKavach',
            icon: '📊',
            gradient: 'from-blue-50 via-green-50 to-yellow-50',
            borderColor: 'border-blue-600',
            stats: [
                { label: 'Trade Deal', value: 'Historic', subtext: 'India-US pact', color: 'text-green-600', icon: '🤝' },
                { label: 'Market Rally', value: 'Record', subtext: 'All-time highs', color: 'text-yellow-600', icon: '📈' },
                { label: 'Parliament', value: 'Crisis', subtext: 'Mass suspensions', color: 'text-red-600', icon: '⚖️' },
                { label: 'Energy', value: 'Survival', subtext: 'Eastern Europe', color: 'text-purple-600', icon: '⚡' }
            ],
            link: 'global-macroeconomic-geopolitical-risk-assessment-feb3-2026.html',
            featured: true
        },
        {
            id: 'global-macroeconomic-geopolitical-risk-assessment-feb2-2026',
            title: 'Global Macroeconomic and Geopolitical Risk Assessment: Comprehensive Analysis of Trade Policy Escalation, Commodity Volatility, and Regional Corridor Fragility (February 2, 2026)',
            shortTitle: 'Risk Assessment Feb 2',
            excerpt: 'Strategic risk assessment of Feb 2: Trump tariff threats escalating US-China trade tensions, gold market dynamics amid policy uncertainty, India-Middle East economic corridor fragility under regional pressures, Yemen geopolitical realignment, and convergence of macroeconomic policy risk with Middle Eastern instability.',
            date: '2026-02-02',
            displayDate: 'Feb 2, 2026',
            category: 'global macroeconomic geopolitical risk assessment trump tariffs us china trade war gold market india middle east corridor yemen regional instability',
            tags: ['⚠️ RISK ASSESSMENT', '💼 TRADE WAR', '📈 GOLD DYNAMICS', '🌍 REGIONAL RISKS'],
            tagColors: ['bg-red-600', 'bg-orange-600', 'bg-yellow-600', 'bg-purple-600'],
            readTime: '41 min read',
            author: 'ShramKavach',
            icon: '⚠️',
            gradient: 'from-red-50 via-orange-50 to-purple-50',
            borderColor: 'border-red-600',
            stats: [
                { label: 'Trump Tariffs', value: 'Escalation', subtext: 'Trade threats', color: 'text-orange-600', icon: '💼' },
                { label: 'Gold Dynamics', value: 'Volatile', subtext: 'Policy risk', color: 'text-yellow-600', icon: '📈' },
                { label: 'ME Corridor', value: 'Fragile', subtext: 'Regional pressures', color: 'text-purple-600', icon: '🌍' },
                { label: 'Yemen Shift', value: 'Geopolitical', subtext: 'Realignment', color: 'text-red-600', icon: '⚠️' }
            ],
            link: 'global-macroeconomic-geopolitical-risk-assessment-feb2-2026.html',
            featured: true
        },
        {
            id: 'global-strategic-situation-report-jan31-feb1-2026',
            title: 'Global Strategic Situation Report: Comprehensive Analysis of Union Budget, Gold Market Recovery, and Regional Political Transitions (January 31 – February 01, 2026)',
            shortTitle: 'Situation Report Feb 1',
            excerpt: 'Strategic analysis of the pivotal 48-hour period: Union Budget 2026-27 announced with fiscal priorities, gold market recovery from crash, India-Russia energy cooperation intensifying, Maharashtra political stabilization, and convergence of fiscal policy with commodity volatility.',
            date: '2026-02-01',
            displayDate: 'Feb 1, 2026',
            category: 'global strategic situation union budget 2026 gold recovery india russia energy maharashtra politics fiscal policy commodity markets',
            tags: ['📋 SITUATION REPORT', '💰 UNION BUDGET', '📈 GOLD RECOVERY', '🌐 ENERGY TIES'],
            tagColors: ['bg-blue-600', 'bg-green-600', 'bg-yellow-600', 'bg-indigo-600'],
            readTime: '42 min read',
            author: 'ShramKavach',
            icon: '📋',
            gradient: 'from-blue-50 via-green-50 to-yellow-50',
            borderColor: 'border-blue-600',
            stats: [
                { label: 'Union Budget', value: '2026-27', subtext: 'Fiscal priorities', color: 'text-green-600', icon: '💰' },
                { label: 'Gold Recovery', value: 'Partial', subtext: 'Market bounce', color: 'text-yellow-600', icon: '📈' },
                { label: 'India-Russia', value: 'Energy Ties', subtext: 'Cooperation', color: 'text-indigo-600', icon: '🌐' },
                { label: 'Maharashtra', value: 'Stabilization', subtext: 'Post-crisis', color: 'text-blue-600', icon: '🏛️' }
            ],
            link: 'global-strategic-situation-report-jan31-feb1-2026.html',
            featured: true
        },
        {
            id: 'strategic-intelligence-monitor-jan30-31-2026',
            title: 'Strategic Intelligence Monitor: Comprehensive Analysis of Global Economic Shifts, Geopolitical Fractures, and Indian State Affairs (January 30–31, 2026)',
            shortTitle: 'Intel Monitor Jan 31',
            excerpt: 'Critical 48-hour analysis of Jan 30-31: Oil price collapse from high-velocity liquidity events, global equity sell-off across markets, Ukraine-Russia ceasefire implementation, Maharashtra political realignment, Argentina currency crisis deepening, and Sensex correction reality-checking the Economic Survey—convergence of commodity collapse, governance fractures, and geopolitical recalibration.',
            date: '2026-01-31',
            displayDate: 'Jan 31, 2026',
            category: 'strategic intelligence monitor oil collapse equity sell-off ukraine ceasefire maharashtra politics argentina currency crisis geopolitical fractures global economic shifts',
            tags: ['🔍 INTEL MONITOR', '💥 OIL COLLAPSE', '📉 MARKETS', '🌐 GEOPOLITICS'],
            tagColors: ['bg-purple-600', 'bg-red-600', 'bg-orange-600', 'bg-blue-600'],
            readTime: '38 min read',
            author: 'ShramKavach',
            icon: '🔍',
            gradient: 'from-purple-50 via-red-50 to-orange-50',
            borderColor: 'border-purple-600',
            stats: [
                { label: 'Oil Collapse', value: 'High-Velocity', subtext: 'Liquidity event', color: 'text-red-600', icon: '💥' },
                { label: 'Equity Sell-Off', value: 'Global', subtext: 'Market correction', color: 'text-orange-600', icon: '📉' },
                { label: 'Ukraine Ceasefire', value: 'Diplomatic', subtext: 'Geopolitical shift', color: 'text-blue-600', icon: '🕊️' },
                { label: 'Maharashtra', value: 'Political', subtext: 'Governance shift', color: 'text-purple-600', icon: '🏛️' }
            ],
            link: 'strategic-intelligence-monitor-jan30-31-2026.html',
            featured: true
        },
        {
            id: 'global-strategic-intelligence-monitor-jan29-30-2026',
            title: 'Global Strategic Intelligence Monitor: Geopolitical Realignments, Regional Instability, and Economic Trajectories (January 29–30, 2026)',
            shortTitle: 'Intel Monitor Jan 30',
            excerpt: 'Critical 24-hour analysis: Ukraine-Russia peace talks, India-EU FTA & Energy Week in Goa, Trump tariff threats, Maharashtra cabinet expansion, and Sensex sell-off reality-checking the Economic Survey—convergence of kinetic conflicts, diplomatic realignments, and market volatility.',
            date: '2026-01-30',
            displayDate: 'Jan 30, 2026',
            category: 'strategic intelligence monitor ukraine peace talks india EU FTA energy week goa trump tariffs maharashtra politics sensex sell-off geopolitical realignments',
            tags: ['🎯 INTEL MONITOR', '🕊️ PEACE TALKS', '⚡ ENERGY SECURITY', '📉 MARKET SELL-OFF'],
            tagColors: ['bg-indigo-600', 'bg-emerald-600', 'bg-yellow-600', 'bg-red-600'],
            readTime: '42 min read',
            author: 'ShramKavach',
            icon: '🎯',
            gradient: 'from-indigo-50 via-emerald-50 to-yellow-50',
            borderColor: 'border-indigo-600',
            stats: [
                { label: 'Peace Talks', value: 'Ukraine-Russia', subtext: 'Western hope', color: 'text-emerald-600', icon: '🕊️' },
                { label: 'Energy Week', value: 'Goa Concludes', subtext: 'Security focus', color: 'text-yellow-600', icon: '⚡' },
                { label: 'Trump Tariffs', value: 'Reciprocal', subtext: 'Trade tension', color: 'text-orange-600', icon: '🌐' },
                { label: 'Sensex', value: 'Sell-Off', subtext: 'Reality check', color: 'text-red-600', icon: '📉' }
            ],
            link: 'global-strategic-intelligence-monitor-jan29-30-2026.html',
            featured: true
        },
        {
            id: 'global-strategic-situation-jan28-29-2026',
            title: 'Global Strategic Situation & Intelligence Report: January 28–29, 2026',
            shortTitle: 'Strategic Situation Jan 29',
            excerpt: 'Comprehensive strategic intelligence on India\'s Economic Survey 2025 triggering market euphoria, Trump\'s reciprocal tariff threats destabilizing global trade, DeepSeek R1\'s AI revolution, and the precarious geopolitical transition defining the world between January 28-29, 2026.',
            date: '2026-01-29',
            displayDate: 'Jan 29, 2026',
            category: 'strategic intelligence india economic survey sensex rally trump tariffs deepseek R1 AI revolution geopolitical transition domestic institutions',
            tags: ['📊 STRATEGIC INTEL', '📈 ECONOMIC SURVEY', '🌐 TARIFF THREATS', '🤖 AI REVOLUTION'],
            tagColors: ['bg-blue-600', 'bg-green-600', 'bg-orange-600', 'bg-indigo-600'],
            readTime: '38 min read',
            author: 'ShramKavach',
            icon: '📊',
            gradient: 'from-blue-50 via-green-50 to-orange-50',
            borderColor: 'border-blue-600',
            stats: [
                { label: 'Economic Survey', value: 'Optimistic', subtext: 'Market euphoria', color: 'text-green-600', icon: '📈' },
                { label: 'Sensex Rally', value: 'DII-Driven', subtext: 'Domestic power', color: 'text-blue-600', icon: '💪' },
                { label: 'Trump Tariffs', value: 'Reciprocal', subtext: 'Trade tension', color: 'text-orange-600', icon: '🌐' },
                { label: 'DeepSeek R1', value: 'AI Shift', subtext: 'Tech disruption', color: 'text-indigo-600', icon: '🤖' }
            ],
            link: 'global-strategic-situation-jan28-29-2026.html',
            featured: true
        },
        {
            id: 'global-strategic-synthesis-2026',
            title: 'Global Strategic Synthesis: The Convergence of Trade, Technology, and Security',
            shortTitle: 'Strategic Synthesis Jan 28',
            excerpt: 'A comprehensive 24-hour strategic analysis revealing the convergence of trade, technology, and security: India-EU FTA impact on capital markets, IMF/World Bank upward GDP revisions for India FY26, crude oil reaching 4-month peak during India Energy Week, Apple AirTag 2 launch with extended UWB range, Nothing\'s flagship store opening, and the maturation of AI deployment amidst escalating cybersecurity threats.',
            date: '2026-01-28',
            displayDate: 'Jan 28, 2026',
            category: 'strategic synthesis india EU FTA IMF world bank GDP forecast energy security AI deployment cybersecurity trade technology security convergence',
            tags: ['🌐 STRATEGIC SYNTHESIS', '🤝 TRADE', '🤖 TECH', '🔒 SECURITY'],
            tagColors: ['bg-blue-600', 'bg-cyan-600', 'bg-indigo-600', 'bg-red-600'],
            readTime: '48 min read',
            author: 'ShramKavach',
            icon: '🌐',
            gradient: 'from-blue-50 via-cyan-50 to-indigo-50',
            borderColor: 'border-blue-600',
            stats: [
                { label: 'India-EU FTA', value: 'Market Impact', subtext: 'Capital inflows', color: 'text-cyan-600', icon: '🤝' },
                { label: 'IMF/World Bank', value: 'GDP Revision', subtext: 'Upward forecast', color: 'text-blue-600', icon: '📊' },
                { label: 'Crude Oil', value: '4-Month Peak', subtext: 'Energy security', color: 'text-indigo-600', icon: '⛽' },
                { label: 'AI Maturation', value: 'Deployment', subtext: 'Security threats', color: 'text-red-600', icon: '🤖' }
            ],
            link: 'global-strategic-synthesis-2026.html',
            featured: true
        },
        {
            id: 'state-of-future-2026',
            title: 'State of the Future 2026: The Convergence of Wealth, Code, and the Security Imperative',
            shortTitle: 'State of Future Jan 27',
            excerpt: 'Comprehensive analysis of India-EU FTA triggering massive market rally, Sensex surge to 81,857, gold reserves expansion, DeepSeek R1 AI revolution, prompt engineering evolution, and the critical convergence of wealth generation, code mastery, and security imperatives defining the 2026 landscape.',
            date: '2026-01-27',
            displayDate: 'Jan 27, 2026',
            category: 'state of future india EU FTA market rally sensex surge gold reserves AI revolution deepseek R1 prompt engineering cybersecurity wealth code security',
            tags: ['🔮 STATE OF FUTURE', '📈 MARKET RALLY', '🤖 AI REVOLUTION', '🔒 CYBERSECURITY'],
            tagColors: ['bg-purple-600', 'bg-green-600', 'bg-indigo-600', 'bg-red-600'],
            readTime: '42 min read',
            author: 'ShramKavach',
            icon: '🔮',
            gradient: 'from-purple-50 via-green-50 to-indigo-50',
            borderColor: 'border-purple-600',
            stats: [
                { label: 'Sensex', value: '81,857', subtext: 'FTA rally surge', color: 'text-green-600', icon: '📈' },
                { label: 'Gold', value: '$117.45B', subtext: 'Reserve expansion', color: 'text-purple-600', icon: '💰' },
                { label: 'DeepSeek R1', value: 'AI Era', subtext: 'Code revolution', color: 'text-indigo-600', icon: '🤖' },
                { label: 'Security', value: 'Critical', subtext: 'Cyber imperative', color: 'text-red-600', icon: '🔒' }
            ],
            link: 'state-of-future-2026.html',
            featured: true
        },
        {
            id: 'strategic-horizon-2026',
            title: 'Strategic Horizon 2026: The Convergence of Geopolitical Assertiveness, Economic Sovereignty, and the Agentic AI Paradigm',
            shortTitle: 'Strategic Horizon Jan 26',
            excerpt: 'Comprehensive strategic analysis of India\'s 77th Republic Day showcasing geopolitical assertiveness through Operation Sindoor, EU strategic partnership, DeepSeek R1 agentic AI revolution, economic sovereignty, and the convergence of military modernization with technological paradigm shifts.',
            date: '2026-01-26',
            displayDate: 'Jan 26, 2026',
            category: 'strategic horizon india republic day operation sindoor EU partnership agentic AI deepseek R1 economic sovereignty geopolitical assertiveness',
            tags: ['🌅 STRATEGIC HORIZON', '🇮🇳 REPUBLIC DAY', '🤖 AGENTIC AI', '💼 SOVEREIGNTY'],
            tagColors: ['bg-purple-600', 'bg-orange-600', 'bg-indigo-600', 'bg-blue-600'],
            readTime: '45 min read',
            author: 'ShramKavach',
            icon: '🌅',
            gradient: 'from-purple-50 via-orange-50 to-indigo-50',
            borderColor: 'border-purple-600',
            stats: [
                { label: 'Republic Day', value: '77th', subtext: 'Operation Sindoor', color: 'text-orange-600', icon: '🇮🇳' },
                { label: 'EU Partnership', value: 'Strategic', subtext: 'von der Leyen & Costa', color: 'text-purple-600', icon: '🤝' },
                { label: 'DeepSeek R1', value: 'Agentic AI', subtext: 'Paradigm shift', color: 'text-indigo-600', icon: '🤖' },
                { label: 'Sovereignty', value: 'Economic', subtext: 'Strategic autonomy', color: 'text-blue-600', icon: '💼' }
            ],
            link: 'strategic-horizon-2026.html',
            featured: true
        },
        {
            id: 'global-strategic-realignment-jan2026',
            title: 'Global Strategic Realignment: Operation Absolute Resolve, Board of Peace Initiative, and the Era of Abundance',
            shortTitle: 'Strategic Realignment Jan 25',
            excerpt: 'A radical transformation in global geopolitics: decisive unilateral action in Venezuela, transaction-based multilateralism in Gaza, Arctic security restructuring, and the emergence of an Era of Abundance through AI integration.',
            date: '2026-01-25',
            displayDate: 'Jan 25, 2026',
            category: 'global strategic realignment operation absolute resolve board of peace venezuela intervention gaza reconstruction golden dome era of abundance',
            tags: ['🎯 STRATEGIC REALIGNMENT', '🪖 VENEZUELA OP', '🕊️ GAZA PEACE', '✨ ABUNDANCE'],
            tagColors: ['bg-red-600', 'bg-amber-600', 'bg-emerald-600', 'bg-yellow-600'],
            readTime: '50 min read',
            author: 'ShramKavach',
            icon: '🎯',
            gradient: 'from-red-50 via-amber-50 to-yellow-50',
            borderColor: 'border-red-600',
            stats: [
                { label: 'Venezuela', value: 'Operation', subtext: 'Absolute Resolve', color: 'text-red-600', icon: '🪖' },
                { label: 'Gaza', value: 'Board of Peace', subtext: 'Reconstruction', color: 'text-emerald-600', icon: '🕊️' },
                { label: 'Golden Dome', value: 'Arctic', subtext: 'Security framework', color: 'text-amber-600', icon: '🛡️' },
                { label: 'Abundance', value: 'Era', subtext: 'AI integration', color: 'text-yellow-600', icon: '✨' }
            ],
            link: 'global-strategic-realignment-jan2026.html',
            featured: true
        },
        {
            id: 'global-strategic-intelligence-jan24-2026',
            title: 'Global Strategic Intelligence Report: Geopolitical Instability, Digital Asset Maturation, and the Semiconductor Paradigm Shift',
            shortTitle: 'Strategic Intelligence Jan 24',
            excerpt: 'The global landscape is characterized by a precarious equilibrium between escalating great power competition and stabilizing economic interdependence. Arctic security frameworks, crypto market maturation, and semiconductor paradigm shifts converge.',
            date: '2026-01-24',
            displayDate: 'Jan 24, 2026',
            category: 'global strategic intelligence arctic security greenland crisis bitgo ipo semiconductor wars nvidia cybersecurity geopolitical analysis',
            tags: ['🌐 STRATEGIC INTELLIGENCE', '🛡️ ARCTIC SECURITY', '₿ CRYPTO MARKETS', '💻 SEMICONDUCTORS'],
            tagColors: ['bg-blue-600', 'bg-cyan-600', 'bg-purple-600', 'bg-indigo-600'],
            readTime: '48 min read',
            author: 'ShramKavach',
            icon: '🌐',
            gradient: 'from-blue-50 via-cyan-50 to-purple-50',
            borderColor: 'border-blue-600',
            stats: [
                { label: 'Arctic', value: 'Framework', subtext: 'Greenland security', color: 'text-blue-600', icon: '🛡️' },
                { label: 'BitGo IPO', value: '$20.1', subtext: 'Crypto maturation', color: 'text-purple-600', icon: '₿' },
                { label: 'Nvidia N1', value: 'Launch', subtext: 'Chip paradigm shift', color: 'text-indigo-600', icon: '💻' },
                { label: 'Risk Level', value: '90/100', subtext: 'Global volatility', color: 'text-cyan-600', icon: '📊' }
            ],
            link: 'global-strategic-intelligence-jan24-2026.html',
            featured: true
        },
        {
            id: 'great-convergence-industrialized-intelligence-jan23-2026',
            title: 'The Great Convergence: Industrialized Intelligence, Capital Rotation, and the Redefinition of Labor',
            shortTitle: 'Great Convergence Jan 23',
            excerpt: 'January 23, 2026, marks the transition from AI\'s speculative phase to its industrial phase. Capital aggressively rotates from legacy tech to energy infrastructure, while 30,000 corporate roles vanish in a single day.',
            date: '2026-01-23',
            displayDate: 'Jan 23, 2026',
            category: 'great convergence industrialized intelligence capital rotation AI energy trade workforce redefinition amazon layoffs cybersecurity crisis',
            tags: ['⚡ GREAT CONVERGENCE', '🏭 AI INDUSTRIALIZATION', '⚡ ENERGY TRADE', '👥 WORKFORCE'],
            tagColors: ['bg-red-600', 'bg-orange-600', 'bg-yellow-600', 'bg-green-600'],
            readTime: '55 min read',
            author: 'ShramKavach',
            icon: '⚡',
            gradient: 'from-red-50 via-orange-50 to-yellow-50',
            borderColor: 'border-red-600',
            stats: [
                { label: 'Energy Trade', value: 'NextEra', subtext: 'AI infrastructure', color: 'text-green-600', icon: '⚡' },
                { label: 'Layoffs', value: '30,000', subtext: 'Amazon cuts', color: 'text-red-600', icon: '👥' },
                { label: 'Gold', value: '$4,970', subtext: 'Record highs', color: 'text-yellow-600', icon: '💰' },
                { label: 'Intel', value: '-15%', subtext: 'Legacy decline', color: 'text-orange-600', icon: '📉' }
            ],
            link: 'great-convergence-industrialized-intelligence-jan23-2026.html',
            featured: true
        },
        {
            id: 'convergence-intelligence-infrastructure-risk-jan22-2026',
            title: 'The Convergence of Intelligence, Infrastructure, and Risk: A Comprehensive Analysis of the Global Technoeconomic Landscape (January 2026)',
            shortTitle: 'Convergence Intelligence Jan 22',
            excerpt: 'The global economy stands at a precarious yet exhilarating intersection of stabilizing traditional market dynamics and rapidly accelerating technological disruption.',
            date: '2026-01-22',
            displayDate: 'Jan 22, 2026',
            category: 'convergence intelligence AI revolution crypto supercycle technoeconomic landscape infrastructure risk market analysis',
            tags: ['🔄 CONVERGENCE', '🤖 AI REVOLUTION', '₿ CRYPTO', '🏗️ INFRASTRUCTURE'],
            tagColors: ['bg-purple-600', 'bg-indigo-600', 'bg-blue-600', 'bg-cyan-600'],
            readTime: '58 min read',
            author: 'ShramKavach',
            icon: '🔄',
            gradient: 'from-purple-50 via-indigo-50 to-blue-50',
            borderColor: 'border-purple-600',
            stats: [
                { label: 'AI', value: 'Revolution', subtext: 'Agentic infrastructure', color: 'text-purple-600', icon: '🤖' },
                { label: 'Crypto', value: 'Supercycle', subtext: 'BitGo IPO signals', color: 'text-indigo-600', icon: '₿' },
                { label: 'React 20', value: 'Launch', subtext: 'Frontend evolution', color: 'text-blue-600', icon: '⚛️' },
                { label: 'Market', value: 'Dynamics', subtext: 'Risk convergence', color: 'text-cyan-600', icon: '📊' }
            ],
            link: 'convergence-intelligence-infrastructure-risk-jan22-2026.html',
            featured: true
        },
        {
            id: 'global-convergence-2026-jan21',
            title: 'Global Convergence 2026: The Interplay of Geopolitical Volatility, Agentic AI, and Workforce Resilience',
            shortTitle: 'Global Convergence Jan 21',
            excerpt: 'Comprehensive analysis of the jarring dissonance between macroeconomic instability and accelerated technological integration, featuring the Greenland Shock, AI revolution, and workforce transformation.',
            date: '2026-01-21',
            displayDate: 'Jan 21, 2026',
            category: 'global convergence agentic ai workforce resilience geopolitics market volatility cybersecurity SAP migration enterprise AI',
            tags: ['🤖 AGENTIC AI', '🌐 CONVERGENCE', '👥 WORKFORCE', '🌍 GEOPOLITICS'],
            tagColors: ['bg-emerald-600', 'bg-green-600', 'bg-teal-600', 'bg-cyan-600'],
            readTime: '52 min read',
            author: 'ShramKavach',
            icon: '🤖',
            gradient: 'from-emerald-50 via-green-50 to-teal-50',
            borderColor: 'border-emerald-600',
            stats: [
                { label: 'Agentic AI', value: 'Revolution', subtext: 'Enterprise transformation', color: 'text-emerald-600', icon: '🤖' },
                { label: 'Greenland', value: 'Shock', subtext: 'Geopolitical volatility', color: 'text-green-600', icon: '🌍' },
                { label: 'Workforce', value: 'Resilience', subtext: 'Skills evolution', color: 'text-teal-600', icon: '👥' },
                { label: 'Market', value: 'Volatility', subtext: 'Economic uncertainty', color: 'text-cyan-600', icon: '📈' }
            ],
            link: 'global-convergence-2026-jan21.html',
            featured: true
        },
        {
            id: 'jan20-global-strategic-assessment-2026',
            title: 'Global Strategic Assessment: Geopolitical Fractures, Market Volatility, and Sectoral Shifts – January 20, 2026',
            shortTitle: 'Global Strategic Assessment Jan 20',
            excerpt: 'Comprehensive multi-dimensional strategic assessment integrating geopolitical fractures, market volatility, and technological sectoral shifts across global landscapes.',
            date: '2026-01-20',
            displayDate: 'Jan 20, 2026',
            category: 'strategic intelligence geopolitics markets technology sectoral analysis global assessment',
            tags: ['📊 STRATEGIC INTELLIGENCE', '🌍 GEOPOLITICS', '📈 MARKETS', '💻 TECHNOLOGY'],
            tagColors: ['bg-blue-600', 'bg-indigo-600', 'bg-purple-600', 'bg-pink-600'],
            readTime: '45 min read',
            author: 'ShramKavach',
            icon: '📊',
            gradient: 'from-blue-50 via-indigo-50 to-purple-50',
            borderColor: 'border-blue-600',
            stats: [
                { label: 'Geopolitical', value: 'Fractures', subtext: 'Global strategic tensions', color: 'text-blue-600', icon: '🌍' },
                { label: 'Market', value: 'Volatility', subtext: 'Financial instability', color: 'text-indigo-600', icon: '📈' },
                { label: 'Tech', value: 'Shifts', subtext: 'Sectoral disruptions', color: 'text-purple-600', icon: '💻' },
                { label: 'Strategic', value: 'Analysis', subtext: 'Multi-dimensional view', color: 'text-pink-600', icon: '📊' }
            ],
            link: 'jan20_global_strategic_assessment.html',
            featured: true
        },
        {
            id: 'global-convergence-jan19-2026',
            title: 'Global Convergence: The January 19, 2026 Report on Geopolitics, Markets, and Cultural Shifts',
            shortTitle: 'Global Convergence Jan 19',
            excerpt: 'A Monday of fracture and resilience, characterized by a sharp juxtaposition between high-level diplomatic aspirations and the coercive reality of geoeconomics.',
            date: '2026-01-19',
            displayDate: 'Jan 19, 2026',
            category: 'global convergence geopolitics greenland crisis trade war financial markets davos iranian protests',
            tags: ['🌐 GLOBAL CONVERGENCE', '🌍 GEOPOLITICS', '📈 MARKETS'],
            tagColors: ['bg-orange-600', 'bg-amber-600', 'bg-yellow-600'],
            readTime: '48 min read',
            author: 'ShramKavach',
            icon: '🌐',
            gradient: 'from-orange-50 via-amber-50 to-yellow-50',
            borderColor: 'border-orange-600',
            stats: [
                { label: 'Greenland', value: 'Crisis', subtext: 'US-EU tariff confrontation', color: 'text-orange-600', icon: '🌐' },
                { label: 'Markets', value: 'Volatility', subtext: 'BSE, Bitcoin, bonds react', color: 'text-amber-600', icon: '📈' },
                { label: 'Davos', value: 'Dialogue', subtext: 'Elite summit amid tensions', color: 'text-yellow-600', icon: '🏛️' },
                { label: 'Iranian', value: 'Protests', subtext: 'Youth defiance escalates', color: 'text-red-600', icon: '🔥' }
            ],
            link: 'global-convergence-jan19-2026.html',
            featured: true
        },
        {
            id: 'sunday-fracture-2026',
            title: 'The Sunday Fracture: Storms, Summits, and the Science of Survival – January 18, 2026',
            shortTitle: 'The Sunday Fracture',
            excerpt: 'The date represents a singular, volatile node in the trajectory of the mid-2020s, characterized by extreme duality between elite diplomacy and ground-level reality.',
            date: '2026-01-18',
            displayDate: 'Jan 18, 2026',
            category: 'global analysis wef davos atmospheric separation nfl cultural dynamics world economic forum',
            tags: ['🌪️ GLOBAL ANALYSIS', '🏛️ WEF', '🎭 CULTURAL'],
            tagColors: ['bg-red-600', 'bg-orange-600', 'bg-yellow-600'],
            readTime: '52 min read',
            author: 'ShramKavach',
            icon: '🌪️',
            gradient: 'from-red-50 via-orange-50 to-yellow-50',
            borderColor: 'border-red-600',
            stats: [
                { label: 'WEF', value: 'Davos', subtext: 'Elite summit amid global fractures', color: 'text-red-600', icon: '🏛️' },
                { label: 'Atmospheric', value: 'Separation', subtext: 'Great Eurasian weather divide', color: 'text-orange-600', icon: '🌪️' },
                { label: 'NFL', value: 'Playoffs', subtext: 'Sports culture at peak intensity', color: 'text-yellow-600', icon: '🏈' },
                { label: 'Cultural', value: 'Dynamics', subtext: 'Ground-level reality vs elite', color: 'text-purple-600', icon: '🎭' }
            ],
            link: 'sunday-fracture-2026.html',
            featured: true
        },
        {
            id: 'technology-gaming-science-intelligence-2026',
            title: 'Global Technology, Gaming, & Scientific Strategic Intelligence Report – January 17, 2026',
            shortTitle: 'Technology Intelligence Jan 17',
            excerpt: 'The global technology landscape is defined by a paradoxical state of mature stability in hardware cycles and radical disruption in software infrastructure.',
            date: '2026-01-17',
            displayDate: 'Jan 17, 2026',
            category: 'technology intelligence consumer electronics ai gaming science innovation',
            tags: ['🎮 TECHNOLOGY', '🎯 GAMING', '🔬 SCIENCE'],
            tagColors: ['bg-teal-600', 'bg-cyan-600', 'bg-blue-600'],
            readTime: '55 min read',
            author: 'ShramKavach',
            icon: '🎮',
            gradient: 'from-teal-50 via-cyan-50 to-blue-50',
            borderColor: 'border-teal-600',
            stats: [
                { label: 'iPhone 17', value: 'Launch', subtext: 'Consumer electronics evolution', color: 'text-teal-600', icon: '📱' },
                { label: 'AI', value: 'Regulation', subtext: 'Infrastructure compliance era', color: 'text-blue-600', icon: '🤖' },
                { label: 'Gaming', value: 'Ecosystem', subtext: 'Market consolidation trends', color: 'text-cyan-600', icon: '🎮' },
                { label: 'Science', value: 'Innovation', subtext: 'Fusion, gene editing advances', color: 'text-purple-600', icon: '🔬' }
            ],
            link: 'technology-gaming-science-intelligence-2026.html',
            featured: true
        },
        {
            id: 'global-strategic-intelligence-jan16-2026',
            title: 'Global Strategic Intelligence Assessment: Operational, Technological, and Geopolitical Dynamics – January 16, 2026',
            shortTitle: 'Intelligence Assessment Jan 16',
            excerpt: 'The global operational landscape presents a striking dichotomy between the accelerating sophistication of digital automation and the persistent, often chaotic, fragility of physical and biological systems.',
            date: '2026-01-16',
            displayDate: 'Jan 16, 2026',
            category: 'intelligence assessment agentic ai operational iss parloa drone economy digital sovereignty',
            tags: ['🎯 INTELLIGENCE', '🤖 AGENTIC AI', '🔬 OPERATIONAL'],
            tagColors: ['bg-purple-600', 'bg-blue-600', 'bg-indigo-600'],
            readTime: '50 min read',
            author: 'ShramKavach',
            icon: '🎯',
            gradient: 'from-purple-50 via-blue-50 to-indigo-50',
            borderColor: 'border-purple-600',
            stats: [
                { label: 'Agentic', value: 'AI', subtext: 'Enterprise autonomous agents era', color: 'text-purple-600', icon: '🤖' },
                { label: 'Parloa', value: '$350M', subtext: 'Series D funding milestone', color: 'text-blue-600', icon: '💰' },
                { label: 'ISS', value: 'Evacuation', subtext: 'Aerospace security concerns', color: 'text-red-600', icon: '🚀' },
                { label: 'Digital', value: 'Sovereignty', subtext: 'Cyber security legislation', color: 'text-indigo-600', icon: '🔒' }
            ],
            link: 'global-strategic-intelligence-jan16-2026.html',
            featured: true
        },
        {
            id: 'global-strategic-assessment-15-01-26',
            title: 'Global Strategic Assessment: The Convergence of Kinetic, Financial, and Technological Risks – January 15, 2026',
            shortTitle: 'Strategic Assessment Jan 15',
            excerpt: 'The international system navigates a confluence of crises testing the resilience of global institutions, the stability of financial markets, and the very definition of sovereignty in the digital age.',
            date: '2026-01-15',
            displayDate: 'Jan 15, 2026',
            category: 'strategic assessment kinetic risks financial crisis technological risks iran greenland fed ai',
            tags: ['📊 STRATEGIC ASSESSMENT', '⚔️ KINETIC RISKS', '💵 FINANCIAL CRISIS'],
            tagColors: ['bg-emerald-600', 'bg-red-600', 'bg-orange-600'],
            readTime: '48 min read',
            author: 'ShramKavach',
            icon: '📊',
            gradient: 'from-emerald-50 via-teal-50 to-cyan-50',
            borderColor: 'border-emerald-600',
            stats: [
                { label: 'Iran', value: 'Crisis', subtext: 'Execution crisis continues to destabilize', color: 'text-red-600', icon: '⚠️' },
                { label: 'Greenland', value: 'Sovereignty', subtext: 'Territorial sovereignty tensions escalate', color: 'text-yellow-600', icon: '🌍' },
                { label: 'Fed', value: 'Investigation', subtext: 'Federal Reserve under scrutiny', color: 'text-blue-600', icon: '🏛️' },
                { label: 'Agentic', value: 'AI', subtext: 'AI autonomy reaches new capabilities', color: 'text-purple-600', icon: '🤖' }
            ],
            link: 'global-strategic-assessment-15-01-26.html',
            featured: true
        },
        {
            id: 'global-strategic-intelligence-report-2026',
            title: 'Global Strategic Intelligence Report: Convergence of Crisis, Capital, and Code – January 14, 2026',
            shortTitle: 'Strategic Intelligence Report',
            excerpt: 'Comprehensive analysis of geopolitical instability, financial market volatility, agentic AI emergence, and regulatory fortification. Iran execution crisis, Golden Dome doctrine, Claude Computer Use, and crypto regulation convergence.',
            date: '2026-01-14',
            displayDate: 'Jan 14, 2026',
            category: 'intelligence iran greenland agentic ai crypto regulation crisis',
            tags: ['🎯 INTELLIGENCE', '🌍 GEOPOLITICS', '🤖 AGENTIC AI'],
            tagColors: ['bg-red-600', 'bg-orange-600', 'bg-purple-600'],
            readTime: '52 min read',
            author: 'ShramKavach',
            icon: '🎯',
            gradient: 'from-red-50 via-purple-50 to-indigo-50',
            borderColor: 'border-red-600',
            stats: [
                { label: 'Iran', value: 'Crisis', subtext: 'Execution crisis destabilizes region', color: 'text-red-600', icon: '⚠️' },
                { label: 'Golden', value: 'Dome', subtext: 'Greenland Golden Dome doctrine emerges', color: 'text-yellow-600', icon: '🏛️' },
                { label: 'Claude', value: 'AI Agent', subtext: 'Computer Use capabilities breakthrough', color: 'text-purple-600', icon: '🤖' },
                { label: 'Crypto', value: 'Regulation', subtext: 'Regulatory fortification accelerates', color: 'text-blue-600', icon: '💰' }
            ],
            link: 'global-strategic-intelligence-report-2026.html',
            featured: true
        },
        {
            id: 'global-situation-jan13-2026',
            title: 'Global Situation Report: January 13, 2026 - Fed Crisis, AI Infrastructure, Gold Rally',
            shortTitle: 'Global Situation Report',
            excerpt: 'Analysis of Federal Reserve\'s extraordinary emergency meeting, gold price surge to $4,600+, SK Hynix\'s $5B AI infrastructure investment, and the accelerating shift in global geopolitical tensions.',
            date: '2026-01-13',
            displayDate: 'Jan 13, 2026',
            category: 'global situation federal reserve ai infrastructure gold crisis sk hynix',
            tags: ['🌍 GLOBAL SITUATION', '🏛️ FEDERAL RESERVE', '💻 AI INFRASTRUCTURE'],
            tagColors: ['bg-red-600', 'bg-orange-600', 'bg-purple-600'],
            readTime: '48 min read',
            author: 'ShramKavach',
            icon: '🌍',
            gradient: 'from-red-50 via-yellow-50 to-purple-50',
            borderColor: 'border-red-600',
            stats: [
                { label: 'Fed', value: 'Crisis', subtext: 'Emergency meeting addresses systemic concerns', color: 'text-red-600', icon: '🏛️' },
                { label: 'Gold', value: '$4,600+', subtext: 'Gold price surge amid financial uncertainty', color: 'text-yellow-600', icon: '💰' },
                { label: 'SK Hynix', value: '$5B', subtext: 'AI infrastructure investment announcement', color: 'text-purple-600', icon: '🔌' }
            ],
            link: 'global-situation-jan13-2026.html',
            featured: true
        },
        {
            id: 'great-decoupling-2026',
            title: 'The Great Decoupling of 2026: Institutional Crisis, The Biological Pivot, and the Redefinition of Human Value – January 12, 2026',
            shortTitle: 'The Great Decoupling',
            excerpt: 'The events of January 12, 2026, represent a singular, jagged fracture in the continuity of the global economic and technological order. Federal Reserve emergency meeting, AI lab crisis, vibe coding revolution, and the biological pivot redefining human value.',
            date: '2026-01-12',
            displayDate: 'Jan 12, 2026',
            category: 'institutional crisis biological ai human value fed emergency aeo',
            tags: ['🌪️ INSTITUTIONAL CRISIS', '🧬 BIOLOGICAL PIVOT', '🤖 AI'],
            tagColors: ['bg-red-600', 'bg-purple-600', 'bg-blue-600'],
            readTime: '45 min read',
            author: 'ShramKavach',
            icon: '🌪️',
            gradient: 'from-red-50 via-purple-50 to-blue-50',
            borderColor: 'border-red-600',
            stats: [
                { label: 'Fed', value: 'Emergency', subtext: 'Federal Reserve convenes crisis meeting', color: 'text-red-600', icon: '🏛️' },
                { label: 'AI Lab', value: 'Crisis', subtext: 'Lab management institutional collapse', color: 'text-purple-600', icon: '🔬' },
                { label: 'Vibe', value: 'Coding', subtext: 'AEO and vibe-driven development surge', color: 'text-blue-600', icon: '💻' }
            ],
            link: 'great-decoupling-2026.html',
            featured: true
        },
        {
            id: 'global-strategic-assessment-2026',
            title: 'Global Strategic Assessment: Market Dynamics, Geopolitical Realignment, and Digital Asset Trajectories – January 11, 2026',
            shortTitle: 'Global Strategic Assessment',
            excerpt: 'The global geopolitical and financial architecture is currently undergoing a stress test of a magnitude not seen since the early 2020s. Analysis of Venezuela intervention phase two, Indo-Pacific trade dynamics, crypto market volatility, and defense industrial realignment.',
            date: '2026-01-11',
            displayDate: 'Jan 11, 2026',
            category: 'markets geopolitics crypto trade venezuela indo-pacific',
            tags: ['📊 STRATEGIC ASSESSMENT', '🌎 MARKETS', '💰 CRYPTO'],
            tagColors: ['bg-blue-600', 'bg-purple-600', 'bg-orange-600'],
            readTime: '50 min read',
            author: 'ShramKavach',
            icon: '📊',
            gradient: 'from-blue-50 via-purple-50 to-orange-50',
            borderColor: 'border-blue-600',
            stats: [
                { label: 'Venezuela', value: 'Phase 2', subtext: 'Reconstruction effort enters critical phase', color: 'text-blue-600', icon: '🌍' },
                { label: 'Indo-Pacific', value: 'Trade', subtext: 'Regional trade dynamics reshaping', color: 'text-green-600', icon: '🌏' },
                { label: 'Crypto', value: 'Volatility', subtext: 'Digital assets under pressure', color: 'text-orange-600', icon: '💰' }
            ],
            link: 'global-strategic-assessment-2026.html',
            featured: true
        },
        {
            id: 'global-strategic-intelligence-2026',
            title: 'Global Strategic Intelligence Report: The Convergence of Kinetic Geopolitics, Physical AI, and Financial Recalibration – January 10, 2026',
            shortTitle: 'Global Strategic Intelligence Report',
            excerpt: 'The first ten days of 2026 have catalyzed a paradigm shift across global markets, defined by the re-emergence of kinetic geopolitical intervention, the maturation of artificial intelligence into physical reality, and a frantic repricing of risk assets. Venezuela reconstruction summit, $1.5T defense budget shock, Physical AI era, and crypto market volatility.',
            date: '2026-01-10',
            displayDate: 'Jan 10, 2026',
            category: 'intelligence geopolitics defense energy crypto ai',
            tags: ['🎯 INTELLIGENCE', '🌍 GEOPOLITICS', '🛡️ DEFENSE STIMULUS'],
            tagColors: ['bg-red-600', 'bg-purple-600', 'bg-blue-600'],
            readTime: '55 min read',
            author: 'ShramKavach',
            icon: '🎯',
            gradient: 'from-red-50 via-purple-50 to-blue-50',
            borderColor: 'border-red-600',
            stats: [
                { label: 'Venezuela', value: 'Reconstruction', subtext: 'US-led energy summit with global titans', color: 'text-blue-600', icon: '🌍' },
                { label: 'Defense Budget', value: '$1.5T', subtext: 'Proposed military spending triggers market rotation', color: 'text-green-600', icon: '🛡️' },
                { label: 'Physical AI', value: 'CES 2026', subtext: 'Intelligence enters the physical world', color: 'text-purple-600', icon: '🤖' }
            ],
            link: 'global-strategic-intelligence-2026.html',
            featured: true
        },
        {
            id: 'jan-9-pivot-2026',
            title: 'Global Convergence: The January 9, 2026 Pivot Point - A Comprehensive Analysis of Macroeconomic Shifts, Financial Market Dynamics, and Technological Paradigms',
            shortTitle: 'Global Convergence: Jan 9, 2026',
            excerpt: 'Friday, January 9, 2026, will be recorded in economic history as a day of converging volatilities that resolved into a surprising equilibrium. Analysis of the Goldilocks jobs report (50K nonfarm payrolls), Supreme Court tariff deferral, CES 2026 Physical AI conclusion, and evolving technological paradigms.',
            date: '2026-01-09',
            displayDate: 'Jan 9, 2026',
            category: 'markets labor geopolitics technology ai',
            tags: ['🔴 BREAKING', '📊 ANALYSIS', '🌐 GOLDILOCKS MOMENT'],
            tagColors: ['bg-red-600', 'bg-purple-600', 'bg-green-600'],
            readTime: '50 min read',
            author: 'ShramKavach',
            icon: '🌐',
            gradient: 'from-green-50 via-blue-50 to-purple-50',
            borderColor: 'border-green-600',
            stats: [
                { label: 'Nonfarm Payrolls', value: '50K', subtext: 'Goldilocks scenario - cooling but not collapsing', color: 'text-blue-600', icon: '📊' },
                { label: 'Supreme Court', value: 'Deferred', subtext: 'Tariff ruling postponed, status quo maintained', color: 'text-purple-600', icon: '⚖️' },
                { label: 'Physical AI', value: 'CES 2026', subtext: 'From generative AI to embodied intelligence', color: 'text-green-600', icon: '🤖' }
            ],
            link: 'jan-9-pivot-2026.html',
            featured: true
        },
        {
            id: 'jan-8-pivot-2026',
            title: 'The Jan 8 Pivot: A Comprehensive Analysis of Market Dynamics, Geopolitical Realignment, and Technological Evolution in Early 2026',
            shortTitle: 'The Jan 8 Pivot',
            excerpt: 'Thursday, January 8, 2026 represents a singular moment where macroeconomic reality, geopolitical power, and technological innovation converged. Defense sector rotation, Venezuela intervention, jobless claims at 201K, and the vibe coding phenomenon mark a decisive pivot in market dynamics.',
            date: '2026-01-08',
            displayDate: 'Jan 8, 2026',
            category: 'markets geopolitics defense technology labor',
            tags: ['🔴 BREAKING', '📊 ANALYSIS', '🔄 PIVOT MOMENT'],
            tagColors: ['bg-red-600', 'bg-purple-600', 'bg-blue-600'],
            readTime: '45 min read',
            author: 'ShramKavach',
            icon: '🔄',
            gradient: 'from-blue-50 via-indigo-50 to-purple-50',
            borderColor: 'border-blue-600',
            stats: [
                { label: 'Jobless Claims', value: '201K', subtext: 'Labor market resilience continues', color: 'text-green-600', icon: '📊' },
                { label: 'Defense Sector', value: 'Rotation', subtext: 'Geopolitical shift drives capital flows', color: 'text-blue-600', icon: '🛡️' },
                { label: 'Venezuela', value: 'Intervention', subtext: 'Energy markets recalibrate', color: 'text-purple-600', icon: '🌍' }
            ],
            link: 'jan-8-pivot-2026.html',
            featured: true
        },
        {
            id: 'great-recalibration-2026',
            title: 'The Great Recalibration: Converging Trajectories of Physical AI, Economic Stasis, and Digital Fragility on January 7, 2026',
            shortTitle: 'The Great Recalibration',
            excerpt: 'January 7, 2026 serves as a singular moment where high-technology ambition, macroeconomic realignment, and systemic digital vulnerability became inextricably knotted. Labor market stasis, CES 2026 Physical AI surge, vibe coding democratization, and industrial-scale ransomware converge.',
            date: '2026-01-07',
            displayDate: 'Jan 7, 2026',
            category: 'technology ai labor markets cybersecurity',
            tags: ['🔴 BREAKING', '📊 ANALYSIS', '⚖️ PHYSICAL AI'],
            tagColors: ['bg-red-600', 'bg-purple-600', 'bg-indigo-600'],
            readTime: '40 min read',
            author: 'ShramKavach',
            icon: '⚖️',
            gradient: 'from-purple-50 via-indigo-50 to-blue-50',
            borderColor: 'border-purple-600',
            stats: [
                { label: 'ISM Services PMI', value: '54.4', subtext: 'Service sector strength beats expectations', color: 'text-green-600', icon: '📈' },
                { label: 'JOLTS Openings', value: '7.1M', subtext: 'Labor market stasis continues', color: 'text-blue-600', icon: '💼' },
                { label: 'CES 2026', value: 'Physical AI', subtext: 'Embodied intelligence takes center stage', color: 'text-purple-600', icon: '🤖' }
            ],
            link: 'great-recalibration-2026.html',
            featured: true
        },
        {
            id: 'convergence-capital-code-2026',
            title: 'The Convergence of Capital and Code: A Strategic Analysis of the Post-Digital Economy in 2026',
            shortTitle: 'Capital & Code Convergence 2026',
            excerpt: 'On January 6, 2026, the global trajectory of finance and technology intersected at a definitive fulcrum, marking the transition from "Generative AI" to the age of "Agentic Intelligence." Wall Street rallies toward Dow 50K, NVIDIA unveils Rubin platform, cybersecurity threats escalate, and vibe coding democratizes software.',
            date: '2026-01-06',
            displayDate: 'Jan 6, 2026',
            category: 'finance ai technology markets cybersecurity',
            tags: ['🔴 BREAKING', '💹 STRATEGIC', '📊 ANALYSIS'],
            tagColors: ['bg-red-600', 'bg-indigo-600', 'bg-purple-600'],
            readTime: '35 min read',
            author: 'ShramKavach',
            icon: '💹',
            gradient: 'from-indigo-50 via-blue-50 to-purple-50',
            borderColor: 'border-indigo-600',
            stats: [
                { label: 'Dow Jones Target', value: '50K', subtext: 'Wall Street rallies on risk-on sentiment', color: 'text-green-600', icon: '📈' },
                { label: 'NVIDIA Rubin', value: 'Platform', subtext: 'Agentic Intelligence infrastructure unveiled', color: 'text-blue-600', icon: '🔮' },
                { label: 'Gold Price', value: '$4,332', subtext: 'Debasement trade accelerates globally', color: 'text-yellow-600', icon: '💰' }
            ],
            link: 'capital-and-code.html',
            featured: true
        },
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
        // Sort articles by date (newest first - latest at top)
        articlesDatabase.sort((a, b) => new Date(b.date) - new Date(a.date));
        filteredArticles = sortArticlesByDate([...articlesDatabase]);
        
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
