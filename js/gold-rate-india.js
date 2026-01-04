// Gold Rate India - City-wise rates and charts v1.0
// USD to INR exchange rate (update daily)
const USD_TO_INR = 85.42;

// Base gold prices (will be fetched from API or set manually)
const basePrices = {
    gold24k: 13582, // per gram in INR
    gold22k: 12450, // per gram in INR
    gold18k: 10187, // per gram in INR
    silver: 2400,   // per kg in INR
    platinum: 79500 // per gram in INR
};

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

// 12-month historical data (simulated - replace with actual API data)
const monthlyData = {
    labels: ['Feb 2025', 'Mar 2025', 'Apr 2025', 'May 2025', 'Jun 2025', 'Jul 2025', 
             'Aug 2025', 'Sep 2025', 'Oct 2025', 'Nov 2025', 'Dec 2025', 'Jan 2026'],
    gold24k: [12520, 12680, 12850, 13020, 13150, 13280, 13410, 13520, 13640, 13720, 13850, 13582],
    gold22k: [11477, 11624, 11777, 11935, 12053, 12173, 12293, 12393, 12503, 12577, 12697, 12450],
    silver: [2150, 2180, 2220, 2260, 2300, 2340, 2380, 2420, 2460, 2500, 2540, 2400],
    platinum: [81200, 80800, 80400, 80100, 79800, 79500, 79300, 79100, 79000, 78900, 78700, 79500]
};

let goldChart, silverChart, platinumChart;

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeCharts();
    selectCity('Mumbai'); // Default city
    updateHeroPrices();
    updateTicker();
});

function selectCity(cityName) {
    // Update button states
    document.querySelectorAll('.city-btn').forEach(btn => {
        btn.classList.remove('ring-4', 'ring-white', 'ring-offset-2');
    });
    event.target.classList.add('ring-4', 'ring-white', 'ring-offset-2');
    
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
