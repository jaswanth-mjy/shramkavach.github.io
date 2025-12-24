/**
 * ShramSetu Calculator Logic
 * Implements: Gratuity, Social Security, Tax Comparator
 * All calculations follow Code on Social Security 2020 and FY 2025-26 tax slabs
 */

// ============================================
// GRATUITY CALCULATOR
// ============================================

/**
 * Calculates Gratuity based on 2025 Code on Social Security
 * @param {number} basicPay - Monthly Basic Salary
 * @param {number} monthsServed - Total months of service
 * @param {string} employmentType - 'regular' or 'fixed-term'
 */
function calculateGratuity(basicPay, monthsServed, employmentType) {
    // Validation: 2025 Code allows Fixed Term employees gratuity after 1 year (12 months)
    const minMonths = (employmentType === 'fixed-term') ? 12 : 60; // 1 year vs 5 years

    if (monthsServed < minMonths) {
        return {
            eligible: false,
            amount: 0,
            message: `Minimum service of ${minMonths/12} year(s) required for ${employmentType} employees.`,
            details: `You have completed ${Math.floor(monthsServed/12)} years and ${monthsServed%12} months.`
        };
    }

    // Logic: Round off months > 6 to next year
    let years = Math.floor(monthsServed / 12);
    const remainingMonths = monthsServed % 12;
    if (remainingMonths > 6) {
        years += 1;
    }

    // Formula: (Basic / 26) * 15 * Years
    const gratuity = (basicPay / 26) * 15 * years;

    return {
        eligible: true,
        amount: Math.round(gratuity * 100) / 100,
        years: years,
        message: "✅ Eligible under Code on Social Security, 2020",
        details: `Calculation: (₹${basicPay} / 26) × 15 × ${years} years = ₹${Math.round(gratuity * 100) / 100}`
    };
}

// Event Listener for Gratuity Form
if (document.getElementById('gratuityForm')) {
    document.getElementById('gratuityForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const employmentType = document.getElementById('employmentType').value;
        const basicPay = parseFloat(document.getElementById('basicPay').value);
        const monthsServed = parseInt(document.getElementById('monthsServed').value);
        
        if (!basicPay || !monthsServed) {
            alert('Please fill all fields');
            return;
        }
        
        const result = calculateGratuity(basicPay, monthsServed, employmentType);
        
        const resultDiv = document.getElementById('gratuityResult');
        const outputDiv = document.getElementById('gratuityOutput');
        
        if (result.eligible) {
            outputDiv.innerHTML = `
                <div class="text-3xl font-bold text-green-800 mb-2">₹${result.amount.toLocaleString('en-IN')}</div>
                <p class="text-lg font-semibold">${result.message}</p>
                <p class="text-gray-700 mt-2">${result.details}</p>
                <div class="mt-4 p-4 bg-blue-50 rounded-lg">
                    <p class="text-sm text-gray-700"><strong>Your Service:</strong> ${result.years} years</p>
                    <p class="text-sm text-gray-700"><strong>Type:</strong> ${employmentType === 'fixed-term' ? 'Fixed-Term Contract' : 'Regular Employment'}</p>
                </div>
            `;
        } else {
            outputDiv.innerHTML = `
                <div class="text-2xl font-bold text-red-800 mb-2">Not Eligible Yet</div>
                <p class="text-lg">${result.message}</p>
                <p class="text-gray-700 mt-2">${result.details}</p>
            `;
        }
        
        resultDiv.classList.remove('hidden');
        resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        // WhatsApp Share Button
        document.getElementById('shareGratuity').onclick = function() {
            const text = `मैंने अपना gratuity check किया ShramSetu पर!\n\n✅ मुझे मिलेगा: ₹${result.amount.toLocaleString('en-IN')}\n\nCheck yours: ${window.location.href}`;
            window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
        };
    });
}

// ============================================
// SOCIAL SECURITY CALCULATOR
// ============================================

function calculateSocialSecurity(annualEarnings, platformContributionRate) {
    // Law: Aggregator contributes 1-2% of turnover, capped at 5% of worker's earnings
    const maxContribution = annualEarnings * 0.05;
    
    // Estimate based on platform rate (simplified model)
    const estimatedContribution = Math.min(
        annualEarnings * (platformContributionRate / 100),
        maxContribution
    );
    
    return {
        contribution: Math.round(estimatedContribution),
        maxCap: Math.round(maxContribution),
        monthly: Math.round(estimatedContribution / 12),
        benefits: {
            health: Math.round(estimatedContribution * 0.4),
            pension: Math.round(estimatedContribution * 0.35),
            maternity: Math.round(estimatedContribution * 0.15),
            disability: Math.round(estimatedContribution * 0.1)
        }
    };
}

if (document.getElementById('socialSecurityForm')) {
    document.getElementById('socialSecurityForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const annualEarnings = parseFloat(document.getElementById('annualEarnings').value);
        const platformRate = parseFloat(document.getElementById('platformType').value);
        
        if (!annualEarnings) {
            alert('Please enter your annual earnings');
            return;
        }
        
        const result = calculateSocialSecurity(annualEarnings, platformRate);
        
        const resultDiv = document.getElementById('socialSecurityResult');
        const outputDiv = document.getElementById('socialSecurityOutput');
        
        outputDiv.innerHTML = `
            <div class="text-3xl font-bold text-blue-800 mb-2">₹${result.contribution.toLocaleString('en-IN')} / year</div>
            <p class="text-lg font-semibold mb-4">Platform contribution on your behalf</p>
            <div class="space-y-2 text-gray-700">
                <p><strong>Monthly:</strong> ₹${result.monthly.toLocaleString('en-IN')}</p>
                <p><strong>Legal Cap (5%):</strong> ₹${result.maxCap.toLocaleString('en-IN')}</p>
            </div>
            <div class="mt-4 p-4 bg-blue-50 rounded-lg">
                <p class="font-semibold mb-2">Estimated Benefit Allocation:</p>
                <ul class="text-sm space-y-1">
                    <li>🏥 Health: ₹${result.benefits.health.toLocaleString('en-IN')}</li>
                    <li>👴 Pension: ₹${result.benefits.pension.toLocaleString('en-IN')}</li>
                    <li>👶 Maternity: ₹${result.benefits.maternity.toLocaleString('en-IN')}</li>
                    <li>♿ Disability: ₹${result.benefits.disability.toLocaleString('en-IN')}</li>
                </ul>
            </div>
        `;
        
        resultDiv.classList.remove('hidden');
        resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
}

// ============================================
// TAX COMPARATOR (Section 44ADA)
// ============================================

function calculateTax(income, regime) {
    let tax = 0;
    
    if (regime === 'old') {
        // Old Regime Slabs (with standard deduction of 50k)
        const taxableIncome = income - 50000;
        
        if (taxableIncome <= 250000) tax = 0;
        else if (taxableIncome <= 500000) tax = (taxableIncome - 250000) * 0.05;
        else if (taxableIncome <= 1000000) tax = 12500 + (taxableIncome - 500000) * 0.20;
        else tax = 112500 + (taxableIncome - 1000000) * 0.30;
        
        // Rebate u/s 87A (Old Regime: up to 500k)
        if (taxableIncome <= 500000) {
            tax = Math.max(0, tax - 12500);
        }
    } else {
        // New Regime Slabs FY 2025-26
        if (income <= 300000) tax = 0;
        else if (income <= 700000) tax = (income - 300000) * 0.05;
        else if (income <= 1000000) tax = 20000 + (income - 700000) * 0.10;
        else if (income <= 1200000) tax = 50000 + (income - 1000000) * 0.15;
        else if (income <= 1500000) tax = 80000 + (income - 1200000) * 0.20;
        else tax = 140000 + (income - 1500000) * 0.30;
        
        // Rebate u/s 87A (New Regime: up to 700k)
        if (income <= 700000) {
            tax = Math.max(0, tax - 25000);
        }
    }
    
    // Add 4% Cess
    tax = tax * 1.04;
    
    return Math.round(tax);
}

if (document.getElementById('taxForm')) {
    document.getElementById('taxForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const grossReceipts = parseFloat(document.getElementById('grossReceipts').value);
        
        if (!grossReceipts) {
            alert('Please enter your annual gross receipts');
            return;
        }
        
        if (grossReceipts > 7500000) {
            alert('Section 44ADA is applicable only up to ₹75 Lakh annual receipts.');
            return;
        }
        
        // Presumptive income: 50% of gross receipts
        const presumptiveIncome = grossReceipts * 0.5;
        
        const oldRegimeTax = calculateTax(presumptiveIncome, 'old');
        const newRegimeTax = calculateTax(presumptiveIncome, 'new');
        
        const resultDiv = document.getElementById('taxResult');
        const oldOutput = document.getElementById('oldRegimeOutput');
        const newOutput = document.getElementById('newRegimeOutput');
        const recommendation = document.getElementById('recommendation');
        
        oldOutput.innerHTML = `
            <p class="text-sm text-gray-700 mb-2"><strong>Presumptive Income:</strong> ₹${presumptiveIncome.toLocaleString('en-IN')}</p>
            <div class="text-2xl font-bold text-blue-800 mb-2">Tax: ₹${oldRegimeTax.toLocaleString('en-IN')}</div>
            <p class="text-sm text-gray-600">Includes standard deduction & cess</p>
        `;
        
        newOutput.innerHTML = `
            <p class="text-sm text-gray-700 mb-2"><strong>Presumptive Income:</strong> ₹${presumptiveIncome.toLocaleString('en-IN')}</p>
            <div class="text-2xl font-bold text-orange-800 mb-2">Tax: ₹${newRegimeTax.toLocaleString('en-IN')}</div>
            <p class="text-sm text-gray-600">No deductions allowed</p>
        `;
        
        const savings = oldRegimeTax - newRegimeTax;
        if (savings > 0) {
            recommendation.innerHTML = `
                <p class="text-green-800 font-bold">✅ Choose Old Regime</p>
                <p class="text-gray-700">You save: ₹${savings.toLocaleString('en-IN')}</p>
            `;
        } else if (savings < 0) {
            recommendation.innerHTML = `
                <p class="text-orange-800 font-bold">✅ Choose New Regime</p>
                <p class="text-gray-700">You save: ₹${Math.abs(savings).toLocaleString('en-IN')}</p>
            `;
        } else {
            recommendation.innerHTML = `
                <p class="text-gray-800 font-bold">Both regimes are equal!</p>
                <p class="text-gray-700">Choose based on convenience.</p>
            `;
        }
        
        resultDiv.classList.remove('hidden');
        resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
}

console.log('✅ ShramSetu Calculators Loaded');
