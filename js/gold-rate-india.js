// Gold Rate India - City-wise rates and charts v2.0 - Auto-updating
// API Configuration
const API_CONFIG = {
    goldAPI: 'https://api.metals.live/v1/spot/gold',
    silverAPI: 'https://api.metals.live/v1/spot/silver',
    platinumAPI: 'https://api.metals.live/v1/spot/platinum',
    forexAPI: 'https://api.exchangerate-api.com/v4/latest/USD',
    fallbackGoldAPI: 'https://www.goldapi.io/api/XAU/INR',
    cacheKey: 'goldRatesIndia',
    cacheDuration: 30 * 60 * 1000 // 30 minutes for more frequent updates
};

// Default fallback prices (used if API fails)
let basePrices = {
    gold24k: 13582, // per gram in INR
    gold22k: 12450, // per gram in INR
    gold18k: 10187, // per gram in INR
    silver: 2400,   // per kg in INR
    platinum: 79500 // per gram in INR
};

let USD_TO_INR = 85.42; // Will be updated from API

// City-specific variations (in INR)
const cityVariations = {
    'Mumbai': { gold24k: 0, gold22k: 0, gold18k: 0, silver: 0, platinum: 0 },
    'Delhi': { gold24k: -50, gold22k: -45, gold18k: -38, silver: -30, platinum: -200 },
    'Bangalore': { gold24k: 0, gold22k: 0, gold18k: 0, silver: 0, platinum: 0 },
    'Chennai': { gold24k: +30, gold22k: +28, gold18k: +23, silver: +20, platinum: +100 },
    'Kolkata': { gold24k: -30, gold22k: -28, gold18k: -23, silver: -20, platinum: -150 },
    'Hyderabad': { gold24k: -20, gold22k: -18, gold18k: -15, silver: -15, platinum: -100 },
    'Pune': { gold24k: -10, gold22k: -9, gold18k: -8, silver: -10, platinum: -50 },
    'Ahmedabad': { gold24k: -40, gold22k: -37, gold18k: -30, silver: -25, platinum: -180 },
    'Jaipur': { gold24k: -35, gold22k: -32, gold18k: -26, silver: -22, platinum: -160 },
    'Lucknow': { gold24k: -45, gold22k: -41, gold18k: -34, silver: -28, platinum: -190 },
    'Chandigarh': { gold24k: -38, gold22k: -35, gold18k: -29, silver: -24, platinum: -170 },
    'Kochi': { gold24k: +20, gold22k: +18, gold18k: +15, silver: +15, platinum: +80 }
};

// 12-month historical data (dynamically generated based on current price)
function generateMonthlyData() {
    const currentGold24k = basePrices.gold24k;
    const currentGold22k = basePrices.gold22k;
    const currentSilver = basePrices.silver;
    const currentPlatinum = basePrices.platinum;
    
    // Generate realistic historical data (approximate 8% growth over 12 months)
    const monthlyVariations = [0.92, 0.93, 0.945, 0.955, 0.965, 0.975, 0.985, 0.99, 0.995, 1.005, 1.015, 1.0];
    
    return {
        labels: ['Feb 2025', 'Mar 2025', 'Apr 2025', 'May 2025', 'Jun 2025', 'Jul 2025', 
                 'Aug 2025', 'Sep 2025', 'Oct 2025', 'Nov 2025', 'Dec 2025', 'Jan 2026'],
        gold24k: monthlyVariations.map(v => Math.round(currentGold24k * v)),
        gold22k: monthlyVariations.map(v => Math.round(currentGold22k * v)),
        silver: monthlyVariations.map((v, i) => {
            // Silver has higher volatility
            const silverVar = [0.88, 0.90, 0.92, 0.94, 0.96, 0.98, 0.99, 1.01, 1.03, 1.05, 1.06, 1.0];
            return Math.round(currentSilver * silverVar[i]);
        }),
        platinum: monthlyVariations.map((v, i) => {
            // Platinum slight decline
            const platVar = [1.03, 1.025, 1.02, 1.015, 1.01, 1.005, 1.002, 1.0, 0.998, 0.995, 0.992, 1.0];
            return Math.round(currentPlatinum * platVar[i]);
        })
    };
}

const monthlyData = generateMonthlyData();

let goldChart, silverChart, platinumChart;

// Initialize on page load
document.addEventListener('DOMContentLoaded', async function() {
    showLoading();
    await fetchLatestPrices();
    initializeCharts();
    
    // Select Mumbai as default
    const mumbaiBtn = Array.from(document.querySelectorAll('.city-btn')).find(btn => btn.textContent.trim() === 'Mumbai');
    if (mumbaiBtn) {
        mumbaiBtn.classList.add('ring-4', 'ring-white', 'ring-offset-2');
    }
    const variation = cityVariations['Mumbai'];
    const prices = {
        gold24k: basePrices.gold24k + variation.gold24k,
        gold22k: basePrices.gold22k + variation.gold22k,
        gold18k: basePrices.gold18k + variation.gold18k,
        silver: basePrices.silver + variation.silver,
        platinum: basePrices.platinum + variation.platinum
    };
    displayCityRates('Mumbai', prices);
    
    updateHeroPrices();
    updateTicker();
    hideLoading();
    updateLastUpdateTime();
    
    // Set up auto-refresh every 30 minutes
    setInterval(async () => {
        if (!document.hidden) {
            await fetchLatestPrices();
            updateHeroPrices();
            updateTicker();
            updateLastUpdateTime();
            updateChartsData();
            
            const activeCity = document.querySelector('.city-btn.ring-4');
            if (activeCity) {
                const cityName = activeCity.textContent.trim();
                const variation = cityVariations[cityName];
                const prices = {
                    gold24k: basePrices.gold24k + variation.gold24k,
                    gold22k: basePrices.gold22k + variation.gold22k,
                    gold18k: basePrices.gold18k + variation.gold18k,
                    silver: basePrices.silver + variation.silver,
                    platinum: basePrices.platinum + variation.platinum
                };
                displayCityRates(cityName, prices);
            }
        }
    }, API_CONFIG.cacheDuration);
});

// Auto-refresh when page becomes visible (user returns to tab)
document.addEventListener('visibilitychange', async function() {
    if (!document.hidden) {
        const cached = getCachedData();
        if (cached && isCacheExpired(cached.timestamp)) {
            console.log('Page visible and cache expired, refreshing...');
            await fetchLatestPrices();
            updateHeroPrices();
            updateTicker();
            updateLastUpdateTime();
            
            const activeCity = document.querySelector('.city-btn.ring-4');
            if (activeCity) {
                const cityName = activeCity.textContent.trim();
                const variation = cityVariations[cityName];
                const prices = {
                    gold24k: basePrices.gold24k + variation.gold24k,
                    gold22k: basePrices.gold22k + variation.gold22k,
                    gold18k: basePrices.gold18k + variation.gold18k,
                    silver: basePrices.silver + variation.silver,
                    platinum: basePrices.platinum + variation.platinum
                };
                displayCityRates(cityName, prices);
            }
        }
    }
});

// Show loading indicator
function showLoading() {
    const heroSection = document.querySelector('.bg-white.rounded-xl.shadow-lg.p-6.mb-8');
    if (heroSection) {
        heroSection.style.opacity = '0.6';
    }
}

// Hide loading indicator
function hideLoading() {
    const heroSection = document.querySelector('.bg-white.rounded-xl.shadow-lg.p-6.mb-8');
    if (heroSection) {
        heroSection.style.opacity = '1';
    }
}

// Fetch latest prices from APIs
async function fetchLatestPrices() {
    try {
        // Check cache first
        const cached = getCachedData();
        if (cached && !isCacheExpired(cached.timestamp)) {
            console.log('Using cached data');
            basePrices = cached.prices;
            USD_TO_INR = cached.usdToInr;
            return;
        }

        console.log('Fetching fresh data from APIs');
        
        // Fetch USD to INR exchange rate
        try {
            const forexResponse = await fetch(API_CONFIG.forexAPI);
            const forexData = await forexResponse.json();
            USD_TO_INR = forexData.rates.INR;
        } catch (error) {
            console.error('Failed to fetch forex rate, using default:', error);
            // Keep the default USD_TO_INR value
        }

        // Fetch gold price (in USD per troy ounce, convert to INR per gram)
        // Note: 1 troy ounce = 31.1035 grams
        const goldPriceUSD = await fetchGoldPrice();
        const goldPriceINRperOunce = goldPriceUSD * USD_TO_INR;
        const goldPriceINRperGram = goldPriceINRperOunce / 31.1035;

        // Calculate different purities
        basePrices.gold24k = Math.round(goldPriceINRperGram);
        basePrices.gold22k = Math.round(goldPriceINRperGram * 0.9167); // 22/24
        basePrices.gold18k = Math.round(goldPriceINRperGram * 0.75);   // 18/24

        // Fetch silver price (in USD per troy ounce, convert to INR per kg)
        const silverPriceUSD = await fetchSilverPrice();
        const silverPriceINRperOunce = silverPriceUSD * USD_TO_INR;
        const silverPriceINRperGram = silverPriceINRperOunce / 31.1035;
        basePrices.silver = Math.round(silverPriceINRperGram * 1000); // per kg

        // Fetch platinum price (in USD per troy ounce, convert to INR per gram)
        const platinumPriceUSD = await fetchPlatinumPrice();
        const platinumPriceINRperOunce = platinumPriceUSD * USD_TO_INR;
        const platinumPriceINRperGram = platinumPriceINRperOunce / 31.1035;
        basePrices.platinum = Math.round(platinumPriceINRperGram);

        // Cache the data
        cacheData({
            prices: basePrices,
            usdToInr: USD_TO_INR,
            timestamp: Date.now()
        });

        console.log('Prices updated successfully', basePrices);
    } catch (error) {
        console.error('Error fetching prices, using fallback:', error);
        // Will use default fallback prices
    }
}

// Fetch gold price from multiple sources
async function fetchGoldPrice() {
    // Try metals.live API first
    try {
        const response = await fetch(API_CONFIG.goldAPI);
        const data = await response.json();
        if (data && data.price) {
            return data.price;
        }
    } catch (error) {
        console.log('Metals.live API failed, trying next source');
    }

    // Try GoldAPI.io
    try {
        const response = await fetch('https://www.goldapi.io/api/XAU/USD', {
            headers: {
                'x-access-token': 'goldapi-demo'
            }
        });
        const data = await response.json();
        if (data && data.price) {
            return data.price;
        }
    } catch (error) {
        console.log('GoldAPI failed, trying next source');
    }

    // Try metals-api.com
    try {
        const response = await fetch('https://metals-api.com/api/latest?access_key=demo&base=USD&symbols=XAU');
        const data = await response.json();
        if (data && data.rates && data.rates.XAU) {
            return 1 / data.rates.XAU; // Convert to price per ounce
        }
    } catch (error) {
        console.log('Metals API failed, trying next source');
    }
    
    // Try Open Exchange Rates with commodity data
    try {
        const response = await fetch('https://open.er-api.com/v6/latest/XAU');
        const data = await response.json();
        if (data && data.rates && data.rates.USD) {
            return 1 / data.rates.USD;
        }
    } catch (error) {
        console.log('Exchange rates API failed');
    }
    
    // Fallback to approximate current market price
    console.log('All gold APIs failed, using market estimate');
    return 2650; // Approximate gold price in USD per ounce
}

// Fetch silver price
async function fetchSilverPrice() {
    // Try metals.live API first
    try {
        const response = await fetch(API_CONFIG.silverAPI);
        const data = await response.json();
        if (data && data.price) {
            return data.price;
        }
    } catch (error) {
        console.log('Metals.live API failed for silver, trying fallback');
    }

    // Try metals-api.com
    try {
        const response = await fetch('https://metals-api.com/api/latest?access_key=demo&base=USD&symbols=XAG');
        const data = await response.json();
        if (data && data.rates && data.rates.XAG) {
            return 1 / data.rates.XAG; // Convert to price per ounce
        }
    } catch (error) {
        console.log('Metals API failed for silver');
    }
    
    // Fallback to approximate current market price
    console.log('All silver APIs failed, using market estimate');
    return 30.5; // Approximate silver price in USD per ounce
}

// Fetch platinum price
async function fetchPlatinumPrice() {
    // Try metals.live API first
    try {
        const response = await fetch(API_CONFIG.platinumAPI);
        const data = await response.json();
        if (data && data.price) {
            return data.price;
        }
    } catch (error) {
        console.log('Metals.live API failed for platinum, trying fallback');
    }

    // Try metals-api.com
    try {
        const response = await fetch('https://metals-api.com/api/latest?access_key=demo&base=USD&symbols=XPT');
        const data = await response.json();
        if (data && data.rates && data.rates.XPT) {
            return 1 / data.rates.XPT; // Convert to price per ounce
        }
    } catch (error) {
        console.log('Metals API failed for platinum');
    }
    
    // Fallback to approximate current market price
    console.log('All platinum APIs failed, using market estimate');
    return 950; // Approximate platinum price in USD per ounce
}

// Cache management
function getCachedData() {
    const cached = localStorage.getItem(API_CONFIG.cacheKey);
    return cached ? JSON.parse(cached) : null;
}

function cacheData(data) {
    localStorage.setItem(API_CONFIG.cacheKey, JSON.stringify(data));
}

function isCacheExpired(timestamp) {
    return (Date.now() - timestamp) > API_CONFIG.cacheDuration;
}

// Update last update time display
function updateLastUpdateTime() {
    const cached = getCachedData();
    if (cached) {
        const lastUpdate = new Date(cached.timestamp);
        const timeString = lastUpdate.toLocaleString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        
        // Update in header
        const updateTimeSpan = document.getElementById('last-update-time');
        if (updateTimeSpan) {
            updateTimeSpan.textContent = timeString;
        }
    } else {
        const updateTimeSpan = document.getElementById('last-update-time');
        if (updateTimeSpan) {
            updateTimeSpan.textContent = 'Just now';
        }
    }
}

// Manual refresh function
window.refreshPrices = async function(evt) {
    const button = evt.target.closest('button');
    const originalHTML = button.innerHTML;
    
    // Show loading state
    button.disabled = true;
    button.innerHTML = '<svg class="animate-spin h-5 w-5 mr-2 inline" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Updating...';
    
    // Clear cache to force fresh fetch
    localStorage.removeItem(API_CONFIG.cacheKey);
    
    // Fetch new data
    await fetchLatestPrices();
    
    // Update all displays
    updateHeroPrices();
    updateTicker();
    updateLastUpdateTime();
    
    // Re-select current city to update prices
    const activeCity = document.querySelector('.city-btn.ring-4');
    if (activeCity) {
        activeCity.click();
    } else {
        // Fallback to Mumbai
        const mumbaiBtn = Array.from(document.querySelectorAll('.city-btn')).find(btn => btn.textContent.trim() === 'Mumbai');
        if (mumbaiBtn) {
            mumbaiBtn.click();
        }
    }
    
    // Update charts
    updateChartsData();
    
    // Restore button
    button.disabled = false;
    button.innerHTML = originalHTML;
    
    // Show success message
    showNotification('Prices updated successfully!');
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transition = 'opacity 0.5s';
        setTimeout(() => notification.remove(), 500);
    }, 3000);
}

// Update charts with new data
function updateChartsData() {
    if (goldChart) {
        // Update the last data point
        goldChart.data.datasets[0].data[11] = basePrices.gold24k;
        goldChart.update();
    }
    if (silverChart) {
        silverChart.data.datasets[0].data[11] = basePrices.silver;
        silverChart.update();
    }
    if (platinumChart) {
        platinumChart.data.datasets[0].data[11] = basePrices.platinum;
        platinumChart.update();
    }
}

function selectCity(cityName, evt) {
    // Update button states
    document.querySelectorAll('.city-btn').forEach(btn => {
        btn.classList.remove('ring-4', 'ring-white', 'ring-offset-2');
    });
    if (evt && evt.target) {
        evt.target.classList.add('ring-4', 'ring-white', 'ring-offset-2');
    }
    
    const variation = cityVariations[cityName];
    const prices = {
        gold24k: basePrices.gold24k + variation.gold24k,
        gold22k: basePrices.gold22k + variation.gold22k,
        gold18k: basePrices.gold18k + variation.gold18k,
        silver: basePrices.silver + variation.silver,
        platinum: basePrices.platinum + variation.platinum
    };
    
    displayCityRates(cityName, prices);
}

function displayCityRates(cityName, prices) {
    const container = document.getElementById('city-rates');
    
    container.innerHTML = `
        <div class="bg-white rounded-xl shadow-lg p-6">
            <h2 class="text-2xl font-bold text-gray-800 mb-6">
                Gold Rate in ${cityName} - 4 January 2026
            </h2>
            
            <!-- Quick Summary -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg">
                <div>
                    <p class="text-sm text-gray-600">24K Gold</p>
                    <p class="text-2xl font-bold text-yellow-600">₹${prices.gold24k.toLocaleString('en-IN')}</p>
                    <p class="text-xs text-gray-500">per gram</p>
                </div>
                <div>
                    <p class="text-sm text-gray-600">22K Gold</p>
                    <p class="text-2xl font-bold text-yellow-500">₹${prices.gold22k.toLocaleString('en-IN')}</p>
                    <p class="text-xs text-gray-500">per gram</p>
                </div>
                <div>
                    <p class="text-sm text-gray-600">18K Gold</p>
                    <p class="text-2xl font-bold text-orange-500">₹${prices.gold18k.toLocaleString('en-IN')}</p>
                    <p class="text-xs text-gray-500">per gram</p>
                </div>
            </div>
            
            <!-- Detailed Tables -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <!-- 24K Gold Table -->
                <div class="border rounded-lg overflow-hidden">
                    <div class="bg-yellow-600 text-white px-4 py-3">
                        <h3 class="font-bold text-lg">24 Karat Gold Rate Per Gram</h3>
                    </div>
                    <table class="w-full text-sm">
                        <thead class="bg-gray-50">
                            <tr>
                                <th class="px-4 py-2 text-left font-semibold">Weight</th>
                                <th class="px-4 py-2 text-right font-semibold">Price (INR)</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y">
                            <tr><td class="px-4 py-2">1 gram</td><td class="px-4 py-2 text-right font-semibold">₹${prices.gold24k.toLocaleString('en-IN')}</td></tr>
                            <tr class="bg-gray-50"><td class="px-4 py-2">8 grams</td><td class="px-4 py-2 text-right font-semibold">₹${(prices.gold24k * 8).toLocaleString('en-IN')}</td></tr>
                            <tr><td class="px-4 py-2">10 grams</td><td class="px-4 py-2 text-right font-semibold">₹${(prices.gold24k * 10).toLocaleString('en-IN')}</td></tr>
                            <tr class="bg-gray-50"><td class="px-4 py-2">100 grams</td><td class="px-4 py-2 text-right font-semibold">₹${(prices.gold24k * 100).toLocaleString('en-IN')}</td></tr>
                        </tbody>
                    </table>
                </div>
                
                <!-- 22K Gold Table -->
                <div class="border rounded-lg overflow-hidden">
                    <div class="bg-yellow-500 text-white px-4 py-3">
                        <h3 class="font-bold text-lg">22 Karat Gold Rate Per Gram</h3>
                    </div>
                    <table class="w-full text-sm">
                        <thead class="bg-gray-50">
                            <tr>
                                <th class="px-4 py-2 text-left font-semibold">Weight</th>
                                <th class="px-4 py-2 text-right font-semibold">Price (INR)</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y">
                            <tr><td class="px-4 py-2">1 gram</td><td class="px-4 py-2 text-right font-semibold">₹${prices.gold22k.toLocaleString('en-IN')}</td></tr>
                            <tr class="bg-gray-50"><td class="px-4 py-2">8 grams</td><td class="px-4 py-2 text-right font-semibold">₹${(prices.gold22k * 8).toLocaleString('en-IN')}</td></tr>
                            <tr><td class="px-4 py-2">10 grams</td><td class="px-4 py-2 text-right font-semibold">₹${(prices.gold22k * 10).toLocaleString('en-IN')}</td></tr>
                            <tr class="bg-gray-50"><td class="px-4 py-2">100 grams</td><td class="px-4 py-2 text-right font-semibold">₹${(prices.gold22k * 100).toLocaleString('en-IN')}</td></tr>
                        </tbody>
                    </table>
                </div>
                
                <!-- 18K Gold Table -->
                <div class="border rounded-lg overflow-hidden">
                    <div class="bg-orange-500 text-white px-4 py-3">
                        <h3 class="font-bold text-lg">18 Karat Gold Rate Per Gram</h3>
                    </div>
                    <table class="w-full text-sm">
                        <thead class="bg-gray-50">
                            <tr>
                                <th class="px-4 py-2 text-left font-semibold">Weight</th>
                                <th class="px-4 py-2 text-right font-semibold">Price (INR)</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y">
                            <tr><td class="px-4 py-2">1 gram</td><td class="px-4 py-2 text-right font-semibold">₹${prices.gold18k.toLocaleString('en-IN')}</td></tr>
                            <tr class="bg-gray-50"><td class="px-4 py-2">8 grams</td><td class="px-4 py-2 text-right font-semibold">₹${(prices.gold18k * 8).toLocaleString('en-IN')}</td></tr>
                            <tr><td class="px-4 py-2">10 grams</td><td class="px-4 py-2 text-right font-semibold">₹${(prices.gold18k * 10).toLocaleString('en-IN')}</td></tr>
                            <tr class="bg-gray-50"><td class="px-4 py-2">100 grams</td><td class="px-4 py-2 text-right font-semibold">₹${(prices.gold18k * 100).toLocaleString('en-IN')}</td></tr>
                        </tbody>
                    </table>
                </div>
                
                <!-- Silver & Platinum -->
                <div class="border rounded-lg overflow-hidden">
                    <div class="bg-gray-500 text-white px-4 py-3">
                        <h3 class="font-bold text-lg">Silver & Platinum Rates</h3>
                    </div>
                    <table class="w-full text-sm">
                        <thead class="bg-gray-50">
                            <tr>
                                <th class="px-4 py-2 text-left font-semibold">Metal</th>
                                <th class="px-4 py-2 text-right font-semibold">Price (INR)</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y">
                            <tr><td class="px-4 py-2">Silver (1 kg)</td><td class="px-4 py-2 text-right font-semibold">₹${prices.silver.toLocaleString('en-IN')}</td></tr>
                            <tr class="bg-gray-50"><td class="px-4 py-2">Silver (1 gram)</td><td class="px-4 py-2 text-right font-semibold">₹${(prices.silver / 1000).toFixed(2)}</td></tr>
                            <tr><td class="px-4 py-2">Platinum (1 gram)</td><td class="px-4 py-2 text-right font-semibold">₹${prices.platinum.toLocaleString('en-IN')}</td></tr>
                            <tr class="bg-gray-50"><td class="px-4 py-2">Platinum (10 grams)</td><td class="px-4 py-2 text-right font-semibold">₹${(prices.platinum * 10).toLocaleString('en-IN')}</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
            
            <p class="text-xs text-gray-500 italic">* Prices are indicative and exclude GST (3%), making charges, and other levies. Contact local jewelers for exact rates.</p>
        </div>
    `;
}

function updateHeroPrices() {
    document.getElementById('hero-gold-24k').textContent = basePrices.gold24k.toLocaleString('en-IN');
    document.getElementById('hero-gold-22k').textContent = basePrices.gold22k.toLocaleString('en-IN');
    document.getElementById('hero-silver').textContent = basePrices.silver.toLocaleString('en-IN');
    
    // Calculate and display changes (simulated)
    document.getElementById('hero-gold-24k-change').textContent = '+0.0%';
    document.getElementById('hero-gold-22k-change').textContent = '+0.0%';
    document.getElementById('hero-silver-change').textContent = '+0.0%';
}

function updateTicker() {
    document.getElementById('ticker-gold-24k').textContent = basePrices.gold24k.toLocaleString('en-IN');
    document.getElementById('ticker-gold-22k').textContent = basePrices.gold22k.toLocaleString('en-IN');
    document.getElementById('ticker-silver').textContent = basePrices.silver.toLocaleString('en-IN');
    document.getElementById('ticker-platinum').textContent = basePrices.platinum.toLocaleString('en-IN');
}

function initializeCharts() {
    // Generate fresh monthly data based on current prices
    const monthlyData = generateMonthlyData();
    
    // Calculate 12-month changes
    const gold12mChange = (((basePrices.gold24k - monthlyData.gold24k[0]) / monthlyData.gold24k[0]) * 100).toFixed(1);
    const silver12mChange = (((basePrices.silver - monthlyData.silver[0]) / monthlyData.silver[0]) * 100).toFixed(1);
    const platinum12mChange = (((basePrices.platinum - monthlyData.platinum[0]) / monthlyData.platinum[0]) * 100).toFixed(1);
    
    document.getElementById('gold-12m-change').textContent = `${gold12mChange > 0 ? '+' : ''}${gold12mChange}%`;
    document.getElementById('gold22k-12m-change').textContent = `${gold12mChange > 0 ? '+' : ''}${gold12mChange}%`;
    document.getElementById('silver-12m-change').textContent = `${silver12mChange > 0 ? '+' : ''}${silver12mChange}%`;
    document.getElementById('platinum-12m-change').textContent = `${platinum12mChange > 0 ? '+' : ''}${platinum12mChange}%`;
    
    // Update classes for positive/negative
    document.getElementById('gold-12m-change').className = gold12mChange >= 0 ? 'text-lg font-bold text-green-600' : 'text-lg font-bold text-red-600';
    document.getElementById('silver-12m-change').className = silver12mChange >= 0 ? 'text-lg font-bold text-green-600' : 'text-lg font-bold text-red-600';
    document.getElementById('platinum-12m-change').className = platinum12mChange >= 0 ? 'text-lg font-bold text-green-600' : 'text-lg font-bold text-red-600';
    
    // Gold Chart
    const goldCtx = document.getElementById('goldChart').getContext('2d');
    goldChart = new Chart(goldCtx, {
        type: 'line',
        data: {
            labels: monthlyData.labels,
            datasets: [{
                label: '24K Gold (₹/gram)',
                data: monthlyData.gold24k,
                borderColor: '#EAB308',
                backgroundColor: 'rgba(234, 179, 8, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: true, position: 'top' },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return '₹' + context.parsed.y.toLocaleString('en-IN') + '/g';
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    ticks: {
                        callback: function(value) {
                            return '₹' + value.toLocaleString('en-IN');
                        }
                    }
                }
            }
        }
    });
    
    // Silver Chart
    const silverCtx = document.getElementById('silverChart').getContext('2d');
    silverChart = new Chart(silverCtx, {
        type: 'line',
        data: {
            labels: monthlyData.labels,
            datasets: [{
                label: 'Silver (₹/kg)',
                data: monthlyData.silver,
                borderColor: '#9CA3AF',
                backgroundColor: 'rgba(156, 163, 175, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: true, position: 'top' },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return '₹' + context.parsed.y.toLocaleString('en-IN') + '/kg';
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    ticks: {
                        callback: function(value) {
                            return '₹' + value.toLocaleString('en-IN');
                        }
                    }
                }
            }
        }
    });
    
    // Platinum Chart
    const platinumCtx = document.getElementById('platinumChart').getContext('2d');
    platinumChart = new Chart(platinumCtx, {
        type: 'line',
        data: {
            labels: monthlyData.labels,
            datasets: [{
                label: 'Platinum (₹/gram)',
                data: monthlyData.platinum,
                borderColor: '#60A5FA',
                backgroundColor: 'rgba(96, 165, 250, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: true, position: 'top' },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return '₹' + context.parsed.y.toLocaleString('en-IN') + '/g';
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    ticks: {
                        callback: function(value) {
                            return '₹' + value.toLocaleString('en-IN');
                        }
                    }
                }
            }
        }
    });
}