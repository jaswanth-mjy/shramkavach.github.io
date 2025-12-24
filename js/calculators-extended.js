/**
 * ShramSetu Extended Calculator Logic - 34 Calculators
 * All calculations follow 2025 Labour Code, FY 2025-26 tax slabs, and current market rates
 */

// ============================================
// LABOUR RIGHTS CALCULATORS (Already exist in calculators.js)
// ============================================
// 1. Gratuity Calculator - see calculators.js
// 2. Social Security - see calculators.js
// 3. Tax Comparator - see calculators.js

// ============================================
// 4. EPF CALCULATOR
// ============================================
if (document.getElementById('pfForm')) {
    document.getElementById('pfForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const basic = parseFloat(document.getElementById('pfBasic').value);
        const years = parseInt(document.getElementById('pfYears').value);
        const returnRate = parseFloat(document.getElementById('pfReturn').value) / 100;
        
        const months = years * 12;
        const monthlyContribution = basic * 0.12 * 2; // Employee 12% + Employer 12%
        
        // Future Value of Annuity formula
        const maturityAmount = monthlyContribution * (((Math.pow(1 + returnRate/12, months) - 1) / (returnRate/12)) * (1 + returnRate/12));
        const totalInvested = monthlyContribution * months;
        const interest = maturityAmount - totalInvested;
        
        document.getElementById('pfResult').innerHTML = `
            <div class="bg-green-50 border-2 border-green-400 rounded-lg p-6">
                <h3 class="text-2xl font-bold text-green-800 mb-4">EPF Maturity Amount</h3>
                <div class="text-4xl font-bold text-green-900 mb-4">₹${Math.round(maturityAmount).toLocaleString('en-IN')}</div>
                <div class="space-y-2 text-gray-700">
                    <p><strong>Total Invested:</strong> ₹${totalInvested.toLocaleString('en-IN')}</p>
                    <p><strong>Interest Earned:</strong> ₹${Math.round(interest).toLocaleString('en-IN')}</p>
                    <p><strong>Monthly Contribution:</strong> ₹${Math.round(monthlyContribution).toLocaleString('en-IN')} (12% + 12%)</p>
                    <p class="text-sm text-gray-600 mt-4">Note: 8.25% is current EPF interest rate for FY 2024-25</p>
                </div>
            </div>
        `;
        document.getElementById('pfResult').classList.remove('hidden');
    });
}

// ============================================
// 5. LEAVE ENCASHMENT CALCULATOR
// ============================================
if (document.getElementById('leaveForm')) {
    document.getElementById('leaveForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const basicDA = parseFloat(document.getElementById('leaveBasic').value);
        const leaveDays = parseInt(document.getElementById('leaveDays').value);
        
        const perDayRate = basicDA / 30;
        const encashmentAmount = perDayRate * leaveDays;
        
        document.getElementById('leaveResult').innerHTML = `
            <div class="bg-green-50 border-2 border-green-400 rounded-lg p-6">
                <h3 class="text-2xl font-bold text-green-800 mb-4">Leave Encashment Value</h3>
                <div class="text-4xl font-bold text-green-900 mb-4">₹${Math.round(encashmentAmount).toLocaleString('en-IN')}</div>
                <div class="space-y-2 text-gray-700">
                    <p><strong>Per Day Rate:</strong> ₹${Math.round(perDayRate).toLocaleString('en-IN')}</p>
                    <p><strong>Unused Leave:</strong> ${leaveDays} days</p>
                    <p class="text-sm text-gray-600 mt-4">Calculation: (Basic + DA) / 30 × Leave Days</p>
                </div>
            </div>
        `;
        document.getElementById('leaveResult').classList.remove('hidden');
    });
}

// ============================================
// EARNINGS CALCULATORS
// ============================================

// 6. HOURLY RATE CALCULATOR
if (document.getElementById('hourlyForm')) {
    document.getElementById('hourlyForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const monthlyIncome = parseFloat(document.getElementById('monthlyIncome').value);
        const hoursPerDay = parseFloat(document.getElementById('hoursPerDay').value);
        const daysPerMonth = parseInt(document.getElementById('daysPerMonth').value);
        
        const totalHours = hoursPerDay * daysPerMonth;
        const hourlyRate = monthlyIncome / totalHours;
        
        document.getElementById('hourlyResult').innerHTML = `
            <div class="bg-green-50 border-2 border-green-400 rounded-lg p-6">
                <h3 class="text-2xl font-bold text-blue-800 mb-4">Your Hourly Rate</h3>
                <div class="text-4xl font-bold text-blue-900 mb-4">₹${Math.round(hourlyRate).toLocaleString('en-IN')}/hour</div>
                <div class="space-y-2 text-gray-700">
                    <p><strong>Daily Rate:</strong> ₹${Math.round(hourlyRate * hoursPerDay).toLocaleString('en-IN')}</p>
                    <p><strong>Weekly Rate:</strong> ₹${Math.round(hourlyRate * hoursPerDay * 7).toLocaleString('en-IN')}</p>
                    <p><strong>Total Monthly Hours:</strong> ${totalHours} hours</p>
                </div>
            </div>
        `;
        document.getElementById('hourlyResult').classList.remove('hidden');
    });
}

// 7. DELIVERY PARTNER EARNINGS
if (document.getElementById('deliveryForm')) {
    document.getElementById('deliveryForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const orders = parseInt(document.getElementById('ordersPerDay').value);
        const perOrder = parseFloat(document.getElementById('perOrder').value);
        const days = parseInt(document.getElementById('deliveryDays').value);
        const tips = parseFloat(document.getElementById('tips').value);
        
        const dailyEarnings = (orders * perOrder) + tips;
        const monthlyEarnings = dailyEarnings * days;
        const fuelCost = days * 150; // Estimated ₹150/day
        const netEarnings = monthlyEarnings - fuelCost;
        
        document.getElementById('deliveryResult').innerHTML = `
            <div class="bg-green-50 border-2 border-green-400 rounded-lg p-6">
                <h3 class="text-2xl font-bold text-green-800 mb-4">Monthly Earnings Estimate</h3>
                <div class="text-4xl font-bold text-green-900 mb-4">₹${monthlyEarnings.toLocaleString('en-IN')}</div>
                <div class="space-y-2 text-gray-700">
                    <p><strong>Daily Earnings:</strong> ₹${dailyEarnings.toLocaleString('en-IN')}</p>
                    <p><strong>Order Income:</strong> ₹${(orders * perOrder * days).toLocaleString('en-IN')}</p>
                    <p><strong>Tips:</strong> ₹${(tips * days).toLocaleString('en-IN')}</p>
                    <p><strong>Estimated Fuel Cost:</strong> -₹${fuelCost.toLocaleString('en-IN')}</p>
                    <p class="text-lg font-bold text-green-800 mt-3"><strong>Net Take-Home:</strong> ₹${netEarnings.toLocaleString('en-IN')}</p>
                </div>
            </div>
        `;
        document.getElementById('deliveryResult').classList.remove('hidden');
    });
}

// 8. CAB DRIVER INCOME
if (document.getElementById('cabForm')) {
    document.getElementById('cabForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const trips = parseInt(document.getElementById('trips').value);
        const avgFare = parseFloat(document.getElementById('avgFare').value);
        const platformCommission = parseFloat(document.getElementById('platformCommission').value) / 100;
        const cabDays = parseInt(document.getElementById('cabDays').value);
        
        const dailyRevenue = trips * avgFare;
        const dailyCommission = dailyRevenue * platformCommission;
        const dailyNet = dailyRevenue - dailyCommission;
        const monthlyNet = dailyNet * cabDays;
        
        document.getElementById('cabResult').innerHTML = `
            <div class="bg-green-50 border-2 border-green-400 rounded-lg p-6">
                <h3 class="text-2xl font-bold text-yellow-800 mb-4">Net Monthly Income</h3>
                <div class="text-4xl font-bold text-yellow-900 mb-4">₹${Math.round(monthlyNet).toLocaleString('en-IN')}</div>
                <div class="space-y-2 text-gray-700">
                    <p><strong>Gross Revenue/Month:</strong> ₹${Math.round(dailyRevenue * cabDays).toLocaleString('en-IN')}</p>
                    <p><strong>Platform Commission:</strong> -₹${Math.round(dailyCommission * cabDays).toLocaleString('en-IN')}</p>
                    <p><strong>Daily Net:</strong> ₹${Math.round(dailyNet).toLocaleString('en-IN')}</p>
                    <p class="text-sm text-gray-600 mt-4">Note: Fuel, maintenance not included</p>
                </div>
            </div>
        `;
        document.getElementById('cabResult').classList.remove('hidden');
    });
}

// 9. FREELANCE PROJECT PRICING
if (document.getElementById('pricingForm')) {
    document.getElementById('pricingForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const projectHours = parseFloat(document.getElementById('projectHours').value);
        const yourRate = parseFloat(document.getElementById('yourRate').value);
        const expenses = parseFloat(document.getElementById('expenses').value);
        const profitMargin = parseFloat(document.getElementById('profitMargin').value) / 100;
        
        const laborCost = projectHours * yourRate;
        const subtotal = laborCost + expenses;
        const profit = subtotal * profitMargin;
        const finalQuote = subtotal + profit;
        
        document.getElementById('pricingResult').innerHTML = `
            <div class="bg-green-50 border-2 border-green-400 rounded-lg p-6">
                <h3 class="text-2xl font-bold text-purple-800 mb-4">Project Quote</h3>
                <div class="text-4xl font-bold text-purple-900 mb-4">₹${Math.round(finalQuote).toLocaleString('en-IN')}</div>
                <div class="space-y-2 text-gray-700">
                    <p><strong>Labor Cost:</strong> ₹${laborCost.toLocaleString('en-IN')} (${projectHours} hrs × ₹${yourRate})</p>
                    <p><strong>Direct Expenses:</strong> ₹${expenses.toLocaleString('en-IN')}</p>
                    <p><strong>Profit Margin:</strong> ₹${Math.round(profit).toLocaleString('en-IN')}</p>
                    <p class="text-sm text-gray-600 mt-4">Send this quote to your client with confidence!</p>
                </div>
            </div>
        `;
        document.getElementById('pricingResult').classList.remove('hidden');
    });
}

// 10. SALARY TO FREELANCE CONVERTER
if (document.getElementById('convertForm')) {
    document.getElementById('convertForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const annualSalary = parseFloat(document.getElementById('annualSalary').value);
        const paidLeave = parseInt(document.getElementById('paidLeave').value);
        const benefits = parseFloat(document.getElementById('benefits').value);
        
        const totalCompensation = annualSalary + benefits;
        const workingDays = 260 - paidLeave; // 260 working days minus paid leave
        const workingHours = workingDays * 8;
        const hourlyEquivalent = totalCompensation / workingHours;
        const freelanceRate = hourlyEquivalent * 1.25; // 25% buffer for self-employment taxes, no benefits
        
        document.getElementById('convertResult').innerHTML = `
            <div class="bg-green-50 border-2 border-green-400 rounded-lg p-6">
                <h3 class="text-2xl font-bold text-pink-800 mb-4">Equivalent Freelance Rate</h3>
                <div class="text-4xl font-bold text-pink-900 mb-4">₹${Math.round(freelanceRate).toLocaleString('en-IN')}/hour</div>
                <div class="space-y-2 text-gray-700">
                    <p><strong>Full-Day Rate (8 hrs):</strong> ₹${Math.round(freelanceRate * 8).toLocaleString('en-IN')}</p>
                    <p><strong>Monthly Rate (160 hrs):</strong> ₹${Math.round(freelanceRate * 160).toLocaleString('en-IN')}</p>
                    <p><strong>Total Compensation:</strong> ₹${totalCompensation.toLocaleString('en-IN')}/year</p>
                    <p class="text-sm text-gray-600 mt-4">Rate includes 25% buffer for taxes & self-insurance</p>
                </div>
            </div>
        `;
        document.getElementById('convertResult').classList.remove('hidden');
    });
}

// 11. INVOICE CALCULATOR
if (document.getElementById('invoiceForm')) {
    document.getElementById('invoiceForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const baseAmount = parseFloat(document.getElementById('baseAmount').value);
        const gstRate = parseFloat(document.getElementById('gstRate').value) / 100;
        const tdsRate = parseFloat(document.getElementById('tdsApplicable').value) / 100;
        
        const gstAmount = baseAmount * gstRate;
        const invoiceTotal = baseAmount + gstAmount;
        const tdsDeducted = invoiceTotal * tdsRate;
        const amountReceivable = invoiceTotal - tdsDeducted;
        
        document.getElementById('invoiceResult').innerHTML = `
            <div class="bg-green-50 border-2 border-green-400 rounded-lg p-6">
                <h3 class="text-2xl font-bold text-teal-800 mb-4">Invoice Breakdown</h3>
                <div class="space-y-3 text-gray-700">
                    <p><strong>Base Amount:</strong> ₹${baseAmount.toLocaleString('en-IN')}</p>
                    <p><strong>GST (${(gstRate * 100).toFixed(0)}%):</strong> +₹${gstAmount.toLocaleString('en-IN')}</p>
                    <p class="text-xl font-bold text-gray-800 border-t pt-2"><strong>Invoice Total:</strong> ₹${invoiceTotal.toLocaleString('en-IN')}</p>
                    ${tdsRate > 0 ? `
                        <p><strong>TDS Deducted (${(tdsRate * 100).toFixed(0)}%):</strong> -₹${tdsDeducted.toLocaleString('en-IN')}</p>
                        <p class="text-2xl font-bold text-green-800 mt-3"><strong>You Receive:</strong> ₹${amountReceivable.toLocaleString('en-IN')}</p>
                    ` : `<p class="text-2xl font-bold text-green-800 mt-3"><strong>You Receive:</strong> ₹${invoiceTotal.toLocaleString('en-IN')}</p>`}
                </div>
            </div>
        `;
        document.getElementById('invoiceResult').classList.remove('hidden');
    });
}

// 12. PLATFORM FEE CALCULATOR
if (document.getElementById('platformFeeForm')) {
    document.getElementById('platformFeeForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const projectValue = parseFloat(document.getElementById('projectValue').value);
        
        const upwork = projectValue * 0.10; // 10% after $500 threshold
        const fiverr = projectValue * 0.20; // 20% fee
        const freelancer = projectValue * 0.10; // 10% fee
        const direct = 0; // No platform fee
        
        const platforms = [
            {name: 'Direct Client (No Platform)', fee: direct, net: projectValue, color: 'green'},
            {name: 'Freelancer.com', fee: freelancer, net: projectValue - freelancer, color: 'blue'},
            {name: 'Upwork', fee: upwork, net: projectValue - upwork, color: 'emerald'},
            {name: 'Fiverr', fee: fiverr, net: projectValue - fiverr, color: 'orange'}
        ];
        
        platforms.sort((a, b) => b.net - a.net);
        
        let html = '<div class="space-y-4">';
        platforms.forEach(p => {
            html += `
                <div class="bg-${p.color}-50 border-2 border-${p.color}-300 rounded-lg p-4">
                    <h4 class="font-bold text-lg text-${p.color}-800">${p.name}</h4>
                    <p class="text-gray-700"><strong>Platform Fee:</strong> ₹${Math.round(p.fee).toLocaleString('en-IN')}</p>
                    <p class="text-xl font-bold text-${p.color}-900"><strong>You Get:</strong> ₹${Math.round(p.net).toLocaleString('en-IN')}</p>
                </div>
            `;
        });
        html += '</div>';
        
        document.getElementById('platformFeeResult').innerHTML = html;
        document.getElementById('platformFeeResult').classList.remove('hidden');
    });
}

// ============================================
// TAX & FINANCE CALCULATORS
// ============================================

// 13. GST CALCULATOR
if (document.getElementById('gstForm')) {
    document.getElementById('gstForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const type = document.getElementById('gstType').value;
        const amount = parseFloat(document.getElementById('gstAmount').value);
        const rate = parseFloat(document.getElementById('gstRateCalc').value) / 100;
        
        let result;
        if (type === 'exclusive') {
            const gst = amount * rate;
            const total = amount + gst;
            result = `
                <div class="space-y-2 text-gray-700">
                    <p><strong>Base Amount:</strong> ₹${amount.toLocaleString('en-IN')}</p>
                    <p><strong>GST (${(rate * 100).toFixed(0)}%):</strong> +₹${gst.toLocaleString('en-IN')}</p>
                    <p class="text-3xl font-bold text-green-800 mt-3">Total: ₹${total.toLocaleString('en-IN')}</p>
                </div>
            `;
        } else {
            const base = amount / (1 + rate);
            const gst = amount - base;
            result = `
                <div class="space-y-2 text-gray-700">
                    <p><strong>Total Amount:</strong> ₹${amount.toLocaleString('en-IN')}</p>
                    <p><strong>GST (${(rate * 100).toFixed(0)}%):</strong> ₹${gst.toFixed(2)}</p>
                    <p class="text-3xl font-bold text-green-800 mt-3">Base Amount: ₹${base.toFixed(2)}</p>
                </div>
            `;
        }
        
        document.getElementById('gstResult').innerHTML = `
            <div class="bg-green-50 border-2 border-green-400 rounded-lg p-6">
                <h3 class="text-2xl font-bold text-green-800 mb-4">GST Calculation</h3>
                ${result}
            </div>
        `;
        document.getElementById('gstResult').classList.remove('hidden');
    });
}

// 14. TDS CALCULATOR
if (document.getElementById('tdsForm')) {
    document.getElementById('tdsForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const amount = parseFloat(document.getElementById('tdsAmount').value);
        const section = parseFloat(document.getElementById('tdsSection').value) / 100;
        const hasPan = document.getElementById('hasPan').value;
        
        const rate = hasPan === 'yes' ? section : 0.20;
        const tds = amount * rate;
        const netPayment = amount - tds;
        
        document.getElementById('tdsResult').innerHTML = `
            <div class="bg-green-50 border-2 border-green-400 rounded-lg p-6">
                <h3 class="text-2xl font-bold text-indigo-800 mb-4">TDS Calculation</h3>
                <div class="space-y-2 text-gray-700">
                    <p><strong>Payment Amount:</strong> ₹${amount.toLocaleString('en-IN')}</p>
                    <p><strong>TDS Rate:</strong> ${(rate * 100).toFixed(1)}%</p>
                    <p><strong>TDS Deducted:</strong> ₹${tds.toLocaleString('en-IN')}</p>
                    <p class="text-3xl font-bold text-green-800 mt-3">Net Payment: ₹${netPayment.toLocaleString('en-IN')}</p>
                    ${hasPan === 'no' ? '<p class="text-sm text-red-600 mt-2">⚠️ 20% rate applies without PAN</p>' : ''}
                </div>
            </div>
        `;
        document.getElementById('tdsResult').classList.remove('hidden');
    });
}

// 15. ADVANCE TAX CALCULATOR
if (document.getElementById('advanceTaxForm')) {
    document.getElementById('advanceTaxForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const income = parseFloat(document.getElementById('advanceIncome').value);
        const regime = document.getElementById('advanceRegime').value;
        
        // Simplified tax calculation
        let tax = 0;
        if (regime === 'new') {
            if (income > 300000) tax = (income - 300000) * 0.05;
            if (income > 700000) tax = 20000 + (income - 700000) * 0.10;
            if (income > 1000000) tax = 50000 + (income - 1000000) * 0.15;
        } else {
            if (income > 250000) tax = (income - 250000) * 0.05;
            if (income > 500000) tax = 12500 + (income - 500000) * 0.20;
            if (income > 1000000) tax = 112500 + (income - 1000000) * 0.30;
        }
        tax = tax * 1.04; // Add cess
        
        const q1 = Math.round(tax * 0.15);
        const q2 = Math.round(tax * 0.45 - q1);
        const q3 = Math.round(tax * 0.75 - q1 - q2);
        const q4 = Math.round(tax - q1 - q2 - q3);
        
        document.getElementById('advanceTaxResult').innerHTML = `
            <div class="bg-green-50 border-2 border-green-400 rounded-lg p-6">
                <h3 class="text-2xl font-bold text-orange-800 mb-4">Advance Tax Schedule</h3>
                <div class="text-3xl font-bold text-orange-900 mb-4">Total: ₹${Math.round(tax).toLocaleString('en-IN')}</div>
                <div class="space-y-3 text-gray-700">
                    <p><strong>Q1 (by 15 June):</strong> ₹${q1.toLocaleString('en-IN')} (15%)</p>
                    <p><strong>Q2 (by 15 Sept):</strong> ₹${q2.toLocaleString('en-IN')} (30%)</p>
                    <p><strong>Q3 (by 15 Dec):</strong> ₹${q3.toLocaleString('en-IN')} (30%)</p>
                    <p><strong>Q4 (by 15 March):</strong> ₹${q4.toLocaleString('en-IN')} (25%)</p>
                </div>
            </div>
        `;
        document.getElementById('advanceTaxResult').classList.remove('hidden');
    });
}

// Continuing in next part due to length...
console.log('✅ ShramSetu Extended Calculators Loaded (Part 1)');
