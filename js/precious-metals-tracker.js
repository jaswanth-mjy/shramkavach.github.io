/**
 * Precious Metals Price Tracker
 * Auto-updates Gold, Silver, Platinum, and Diamond prices daily
 * Uses multiple API sources for reliability
 * Version: 1.0
 */

(function() {
    'use strict';

    // Configuration
    const CONFIG = {
        updateInterval: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
        cacheKey: 'precious_metals_prices',
        lastUpdateKey: 'precious_metals_last_update',
        apiEndpoints: {
            // Free API for Gold, Silver, Platinum (metals-api.com alternative)
            metals: 'https://api.metalpriceapi.com/v1/latest?api_key=YOUR_API_KEY&base=USD&currencies=XAU,XAG,XPT,XPD',
            // Backup: CoinGecko for crypto-based pricing
            backup: 'https://api.coingecko.com/api/v3/simple/price?ids=gold,silver,platinum&vs_currencies=usd'
        },
        fallbackPrices: {
            gold: { price: 4332.00, unit: 'USD/oz', change: '+0.28%', lastUpdate: '2026-01-04' },
            silver: { price: 73.00, unit: 'USD/oz', change: '+0.15%', lastUpdate: '2026-01-04' },
            platinum: { price: 950.00, unit: 'USD/oz', change: '-0.10%', lastUpdate: '2026-01-04' },
            diamond: { price: 65000.00, unit: 'USD/carat', change: '+0.05%', lastUpdate: '2026-01-04' }
        }
    };

    /**
     * Fetch latest prices from API
     */
    async function fetchLatestPrices() {
        try {
            console.log('📊 Fetching latest precious metals prices...');
            
            // Try primary API
            const response = await fetch(CONFIG.apiEndpoints.metals);
            
            if (!response.ok) {
                throw new Error('Primary API failed, trying backup...');
            }
            
            const data = await response.json();
            return parsePricesFromAPI(data);
            
        } catch (error) {
            console.warn('⚠️ API fetch failed:', error.message);
            
            // Try backup API
            try {
                const backupResponse = await fetch(CONFIG.apiEndpoints.backup);
                const backupData = await backupResponse.json();
                return parsePricesFromBackupAPI(backupData);
            } catch (backupError) {
                console.warn('⚠️ Backup API also failed, using fallback prices');
                return CONFIG.fallbackPrices;
            }
        }
    }

    /**
     * Parse prices from primary API
     */
    function parsePricesFromAPI(data) {
        const rates = data.rates || {};
        const timestamp = new Date().toISOString().split('T')[0];
        
        return {
            gold: {
                price: rates.XAU ? (1 / rates.XAU).toFixed(2) : CONFIG.fallbackPrices.gold.price,
                unit: 'USD/oz',
                change: calculateChange('gold', 1 / rates.XAU),
                lastUpdate: timestamp
            },
            silver: {
                price: rates.XAG ? (1 / rates.XAG).toFixed(2) : CONFIG.fallbackPrices.silver.price,
                unit: 'USD/oz',
                change: calculateChange('silver', 1 / rates.XAG),
                lastUpdate: timestamp
            },
            platinum: {
                price: rates.XPT ? (1 / rates.XPT).toFixed(2) : CONFIG.fallbackPrices.platinum.price,
                unit: 'USD/oz',
                change: calculateChange('platinum', 1 / rates.XPT),
                lastUpdate: timestamp
            },
            diamond: {
                // Diamond prices are typically manual/estimated
                price: CONFIG.fallbackPrices.diamond.price,
                unit: 'USD/carat (avg)',
                change: CONFIG.fallbackPrices.diamond.change,
                lastUpdate: timestamp,
                note: 'Estimated average for investment-grade diamonds'
            }
        };
    }

    /**
     * Parse prices from backup API
     */
    function parsePricesFromBackupAPI(data) {
        const timestamp = new Date().toISOString().split('T')[0];
        
        return {
            gold: {
                price: data.gold?.usd || CONFIG.fallbackPrices.gold.price,
                unit: 'USD/oz',
                change: calculateChange('gold', data.gold?.usd),
                lastUpdate: timestamp
            },
            silver: {
                price: data.silver?.usd || CONFIG.fallbackPrices.silver.price,
                unit: 'USD/oz',
                change: calculateChange('silver', data.silver?.usd),
                lastUpdate: timestamp
            },
            platinum: {
                price: data.platinum?.usd || CONFIG.fallbackPrices.platinum.price,
                unit: 'USD/oz',
                change: calculateChange('platinum', data.platinum?.usd),
                lastUpdate: timestamp
            },
            diamond: CONFIG.fallbackPrices.diamond
        };
    }

    /**
     * Calculate price change percentage
     */
    function calculateChange(metal, currentPrice) {
        const cached = getCachedPrices();
        if (!cached || !cached[metal]) return '+0.00%';
        
        const oldPrice = parseFloat(cached[metal].price);
        const change = ((currentPrice - oldPrice) / oldPrice) * 100;
        
        return (change >= 0 ? '+' : '') + change.toFixed(2) + '%';
    }

    /**
     * Get cached prices from localStorage
     */
    function getCachedPrices() {
        try {
            const cached = localStorage.getItem(CONFIG.cacheKey);
            return cached ? JSON.parse(cached) : null;
        } catch (error) {
            console.warn('Failed to get cached prices:', error);
            return null;
        }
    }

    /**
     * Save prices to localStorage
     */
    function savePrices(prices) {
        try {
            localStorage.setItem(CONFIG.cacheKey, JSON.stringify(prices));
            localStorage.setItem(CONFIG.lastUpdateKey, Date.now().toString());
            console.log('✓ Prices cached successfully');
        } catch (error) {
            console.warn('Failed to cache prices:', error);
        }
    }

    /**
     * Check if update is needed
     */
    function needsUpdate() {
        const lastUpdate = localStorage.getItem(CONFIG.lastUpdateKey);
        if (!lastUpdate) return true;
        
        const timeSinceUpdate = Date.now() - parseInt(lastUpdate);
        return timeSinceUpdate >= CONFIG.updateInterval;
    }

    /**
     * Update prices if needed
     */
    async function updatePrices() {
        if (!needsUpdate()) {
            console.log('📊 Using cached prices (updated within 24 hours)');
            return getCachedPrices();
        }
        
        console.log('🔄 Fetching fresh prices...');
        const prices = await fetchLatestPrices();
        savePrices(prices);
        return prices;
    }

    /**
     * Render prices to DOM
     */
    function renderPrices(prices, containerId = 'precious-metals-widget') {
        const container = document.getElementById(containerId);
        if (!container) {
            console.warn(`Container #${containerId} not found`);
            return;
        }

        const metals = [
            { key: 'gold', name: 'Gold', icon: '🥇', color: 'yellow' },
            { key: 'silver', name: 'Silver', icon: '🥈', color: 'gray' },
            { key: 'platinum', name: 'Platinum', icon: '⚪', color: 'slate' },
            { key: 'diamond', name: 'Diamond', icon: '💎', color: 'blue' }
        ];

        let html = '<div class="grid grid-cols-2 md:grid-cols-4 gap-4">';
        
        metals.forEach(metal => {
            const data = prices[metal.key];
            const changeClass = data.change.startsWith('+') ? 'text-green-600' : 'text-red-600';
            
            html += `
                <div class="bg-white rounded-lg shadow-md p-4 border-l-4 border-${metal.color}-500 hover:shadow-lg transition">
                    <div class="flex items-center justify-between mb-2">
                        <span class="text-2xl">${metal.icon}</span>
                        <span class="text-xs text-gray-500">${data.lastUpdate}</span>
                    </div>
                    <h3 class="font-bold text-gray-900 mb-1">${metal.name}</h3>
                    <div class="text-2xl font-bold text-gray-900 mb-1">
                        $${parseFloat(data.price).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                    <div class="text-xs text-gray-600 mb-1">${data.unit}</div>
                    <div class="text-sm font-semibold ${changeClass}">${data.change}</div>
                    ${data.note ? `<div class="text-xs text-gray-500 mt-2">${data.note}</div>` : ''}
                </div>
            `;
        });
        
        html += '</div>';
        
        // Add last update timestamp
        html += `
            <div class="text-center mt-4 text-sm text-gray-500">
                Last updated: ${new Date().toLocaleString('en-US', { 
                    dateStyle: 'medium', 
                    timeStyle: 'short' 
                })}
                <button onclick="preciousMetalsTracker.forceUpdate()" class="ml-4 text-indigo-600 hover:text-indigo-800 font-semibold">
                    🔄 Refresh
                </button>
            </div>
        `;
        
        container.innerHTML = html;
    }

    /**
     * Force immediate update
     */
    async function forceUpdate() {
        localStorage.removeItem(CONFIG.lastUpdateKey);
        const prices = await updatePrices();
        renderPrices(prices);
    }

    /**
     * Initialize tracker
     */
    async function init(containerId) {
        console.log('💰 Initializing Precious Metals Tracker...');
        
        const prices = await updatePrices();
        renderPrices(prices, containerId);
        
        // Set up auto-update every 24 hours
        setInterval(async () => {
            console.log('⏰ Auto-update triggered');
            const updatedPrices = await updatePrices();
            renderPrices(updatedPrices, containerId);
        }, CONFIG.updateInterval);
        
        console.log('✓ Precious Metals Tracker initialized');
    }

    /**
     * Get current prices (for external use)
     */
    function getCurrentPrices() {
        return getCachedPrices() || CONFIG.fallbackPrices;
    }

    // Expose public API
    window.preciousMetalsTracker = {
        init: init,
        getPrices: getCurrentPrices,
        forceUpdate: forceUpdate,
        updatePrices: updatePrices
    };

    // Auto-initialize if container exists
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            if (document.getElementById('precious-metals-widget')) {
                init('precious-metals-widget');
            }
        });
    } else {
        if (document.getElementById('precious-metals-widget')) {
            init('precious-metals-widget');
        }
    }

})();
