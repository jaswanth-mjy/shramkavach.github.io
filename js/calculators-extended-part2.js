/**
 * ShramSetu Extended Calculators - Part 2
 * Remaining 19 calculators (16-34)
 */

// 16. PROFESSIONAL TAX CALCULATOR
if (document.getElementById('proTaxForm')) {
    document.getElementById('proTaxForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const income = parseFloat(document.getElementById('proTaxIncome').value);
        const state = document.getElementById('state').value;
        
        let monthlyTax = 0;
        let stateName = '';
        
        if (state === 'maharashtra') {
            if (income <= 7500) monthlyTax = 0;
            else if (income <= 10000) monthlyTax = 175;
            else monthlyTax = 200;
            stateName = 'Maharashtra';
        } else if (state === 'karnataka') {
            if (income <= 15000) monthlyTax = 0;
            else monthlyTax = 200;
            stateName = 'Karnataka';
        } else if (state === 'west-bengal') {
            if (income <= 8500) monthlyTax = 0;
            else if (income <= 20000) monthlyTax = 110;
            else monthlyTax = 150;
            stateName = 'West Bengal';
        } else {
            monthlyTax = 0;
            stateName = 'Tamil Nadu (Abolished)';
        }
        
        const annualTax = monthlyTax * 12;
        
        document.getElementById('proTaxResult').innerHTML = `
            <div class="bg-green-50 border-2 border-green-400 rounded-lg p-6">
                <h3 class="text-2xl font-bold text-blue-800 mb-4">Professional Tax - ${stateName}</h3>
                <div class="space-y-2 text-gray-700">
                    <p><strong>Monthly Tax:</strong> ₹${monthlyTax}</p>
                    <p class="text-3xl font-bold text-blue-900 mt-3">Annual Tax: ₹${annualTax}</p>
                    <p class="text-sm text-gray-600 mt-4">${stateName === 'Tamil Nadu (Abolished)' ? 'No professional tax in Tamil Nadu' : 'Deducted from salary/income'}</p>
                </div>
            </div>
        `;
        document.getElementById('proTaxResult').classList.remove('hidden');
    });
}

// 17. TAKE HOME SALARY CALCULATOR
if (document.getElementById('takeHomeForm')) {
    document.getElementById('takeHomeForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const gross = parseFloat(document.getElementById('grossSalary').value);
        const epfCheck = document.getElementById('epfCheck').checked;
        const profTax = parseFloat(document.getElementById('profTax').value);
        
        let deductions = profTax;
        if (epfCheck) {
            const epf = gross * 0.12;
            deductions += epf;
        }
        
        const takeHome = gross - deductions;
        
        document.getElementById('takeHomeResult').innerHTML = `
            <div class="bg-green-50 border-2 border-green-400 rounded-lg p-6">
                <h3 class="text-2xl font-bold text-purple-800 mb-4">Take Home Salary</h3>
                <div class="text-4xl font-bold text-purple-900 mb-4">₹${Math.round(takeHome).toLocaleString('en-IN')}</div>
                <div class="space-y-2 text-gray-700">
                    <p><strong>Gross Salary:</strong> ₹${gross.toLocaleString('en-IN')}</p>
                    ${epfCheck ? `<p><strong>EPF (12%):</strong> -₹${(gross * 0.12).toLocaleString('en-IN')}</p>` : ''}
                    <p><strong>Professional Tax:</strong> -₹${profTax.toLocaleString('en-IN')}</p>
                    <p><strong>Total Deductions:</strong> ₹${Math.round(deductions).toLocaleString('en-IN')}</p>
                </div>
            </div>
        `;
        document.getElementById('takeHomeResult').classList.remove('hidden');
    });
}

// 18. CTC TO IN-HAND CONVERTER
if (document.getElementById('ctcForm')) {
    document.getElementById('ctcForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const ctc = parseFloat(document.getElementById('ctcAmount').value);
        
        // Typical breakdown
        const basic = ctc * 0.40;
        const hra = ctc * 0.20;
        const allowances = ctc * 0.20;
        const employerPF = ctc * 0.048; // 12% of basic (assuming basic is 40%)
        const bonus = ctc * 0.084; // ~8.33%
        const gratuity = ctc * 0.048;
        
        const employeePF = basic * 0.12;
        const professionalTax = 2400; // Annual average
        
        const grossMonthly = (basic + hra + allowances + bonus) / 12;
        const monthlyDeductions = (employeePF / 12) + (professionalTax / 12);
        const monthlyInHand = grossMonthly - monthlyDeductions;
        
        document.getElementById('ctcResult').innerHTML = `
            <div class="bg-green-50 border-2 border-green-400 rounded-lg p-6">
                <h3 class="text-2xl font-bold text-cyan-800 mb-4">In-Hand Salary</h3>
                <div class="text-4xl font-bold text-cyan-900 mb-4">₹${Math.round(monthlyInHand).toLocaleString('en-IN')}/month</div>
                <div class="space-y-2 text-gray-700">
                    <p><strong>Annual CTC:</strong> ₹${ctc.toLocaleString('en-IN')}</p>
                    <p><strong>Gross Monthly:</strong> ₹${Math.round(grossMonthly).toLocaleString('en-IN')}</p>
                    <p><strong>EPF Deduction:</strong> -₹${Math.round(employeePF / 12).toLocaleString('en-IN')}</p>
                    <p><strong>Professional Tax:</strong> -₹${Math.round(professionalTax / 12).toLocaleString('en-IN')}</p>
                    <p><strong>Annual In-Hand:</strong> ₹${Math.round(monthlyInHand * 12).toLocaleString('en-IN')}</p>
                    <p class="text-sm text-gray-600 mt-4">Note: Approximation based on typical salary structure</p>
                </div>
            </div>
        `;
        document.getElementById('ctcResult').classList.remove('hidden');
    });
}

// 19. DETAILED INCOME TAX CALCULATOR
if (document.getElementById('taxDetailedForm')) {
    document.getElementById('taxDetailedForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const income = parseFloat(document.getElementById('taxDetailedIncome').value);
        const c80C = parseFloat(document.getElementById('deduction80C').value);
        const d80D = parseFloat(document.getElementById('deduction80D').value);
        const hra = parseFloat(document.getElementById('hraExemption').value);
        
        const taxableIncome = Math.max(0, income - 50000 - c80C - d80D - hra);
        
        let tax = 0;
        if (taxableIncome <= 250000) tax = 0;
        else if (taxableIncome <= 500000) tax = (taxableIncome - 250000) * 0.05;
        else if (taxableIncome <= 1000000) tax = 12500 + (taxableIncome - 500000) * 0.20;
        else tax = 112500 + (taxableIncome - 1000000) * 0.30;
        
        if (taxableIncome <= 500000) tax = Math.max(0, tax - 12500);
        tax = tax * 1.04;
        
        document.getElementById('taxDetailedResult').innerHTML = `
            <div class="bg-green-50 border-2 border-green-400 rounded-lg p-6">
                <h3 class="text-2xl font-bold text-green-800 mb-4">Tax Liability (Old Regime)</h3>
                <div class="text-4xl font-bold text-green-900 mb-4">₹${Math.round(tax).toLocaleString('en-IN')}</div>
                <div class="space-y-2 text-gray-700">
                    <p><strong>Gross Income:</strong> ₹${income.toLocaleString('en-IN')}</p>
                    <p><strong>Standard Deduction:</strong> -₹50,000</p>
                    <p><strong>80C Deductions:</strong> -₹${c80C.toLocaleString('en-IN')}</p>
                    <p><strong>80D (Health):</strong> -₹${d80D.toLocaleString('en-IN')}</p>
                    <p><strong>HRA Exemption:</strong> -₹${hra.toLocaleString('en-IN')}</p>
                    <p class="border-t pt-2 mt-2"><strong>Taxable Income:</strong> ₹${taxableIncome.toLocaleString('en-IN')}</p>
                    <p><strong>Monthly Tax:</strong> ₹${Math.round(tax / 12).toLocaleString('en-IN')}</p>
                </div>
            </div>
        `;
        document.getElementById('taxDetailedResult').classList.remove('hidden');
    });
}

// ============================================
// LOAN CALCULATORS
// ============================================

// 20. EMI CALCULATOR
if (document.getElementById('emiForm')) {
    document.getElementById('emiForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const principal = parseFloat(document.getElementById('loanAmount').value);
        const rate = parseFloat(document.getElementById('interestRate').value) / 100 / 12;
        const tenure = parseInt(document.getElementById('tenure').value);
        
        const emi = (principal * rate * Math.pow(1 + rate, tenure)) / (Math.pow(1 + rate, tenure) - 1);
        const totalPayment = emi * tenure;
        const totalInterest = totalPayment - principal;
        
        document.getElementById('emiResult').innerHTML = `
            <div class="bg-green-50 border-2 border-green-400 rounded-lg p-6">
                <h3 class="text-2xl font-bold text-purple-800 mb-4">Monthly EMI</h3>
                <div class="text-4xl font-bold text-purple-900 mb-4">₹${Math.round(emi).toLocaleString('en-IN')}</div>
                <div class="space-y-2 text-gray-700">
                    <p><strong>Principal:</strong> ₹${principal.toLocaleString('en-IN')}</p>
                    <p><strong>Total Interest:</strong> ₹${Math.round(totalInterest).toLocaleString('en-IN')}</p>
                    <p><strong>Total Payment:</strong> ₹${Math.round(totalPayment).toLocaleString('en-IN')}</p>
                    <p><strong>Tenure:</strong> ${tenure} months (${Math.round(tenure/12)} years)</p>
                </div>
            </div>
        `;
        document.getElementById('emiResult').classList.remove('hidden');
    });
}

// 21. LOAN ELIGIBILITY CALCULATOR
if (document.getElementById('eligibilityForm')) {
    document.getElementById('eligibilityForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const income = parseFloat(document.getElementById('monthlyIncomeElig').value);
        const existingEmi = parseFloat(document.getElementById('existingEmi').value);
        const years = parseInt(document.getElementById('eligTenure').value);
        
        const maxEmi = (income * 0.50) - existingEmi; // 50% FOIR
        const rate = 0.11 / 12; // 11% annual
        const tenure = years * 12;
        
        const eligibleLoan = (maxEmi * (Math.pow(1 + rate, tenure) - 1)) / (rate * Math.pow(1 + rate, tenure));
        
        document.getElementById('eligibilityResult').innerHTML = `
            <div class="bg-green-50 border-2 border-green-400 rounded-lg p-6">
                <h3 class="text-2xl font-bold text-blue-800 mb-4">Eligible Loan Amount</h3>
                <div class="text-4xl font-bold text-blue-900 mb-4">₹${Math.round(eligibleLoan).toLocaleString('en-IN')}</div>
                <div class="space-y-2 text-gray-700">
                    <p><strong>Max EMI (50% FOIR):</strong> ₹${Math.round(maxEmi).toLocaleString('en-IN')}</p>
                    <p><strong>Your Income:</strong> ₹${income.toLocaleString('en-IN')}</p>
                    <p><strong>Existing EMIs:</strong> ₹${existingEmi.toLocaleString('en-IN')}</p>
                    <p class="text-sm text-gray-600 mt-4">Based on 11% interest rate, ${years} year tenure</p>
                </div>
            </div>
        `;
        document.getElementById('eligibilityResult').classList.remove('hidden');
    });
}

// 22. MUDRA LOAN CALCULATOR
if (document.getElementById('mudraForm')) {
    document.getElementById('mudraForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const amount = parseFloat(document.getElementById('mudraAmount').value);
        const tenure = parseInt(document.getElementById('mudraTenure').value);
        const maxLimit = parseFloat(document.getElementById('mudraScheme').value);
        
        if (amount > maxLimit) {
            alert(`Amount exceeds ${maxLimit.toLocaleString('en-IN')} limit for selected scheme`);
            return;
        }
        
        const rate = 0.08 / 12; // 8% for MUDRA loans
        const emi = (amount * rate * Math.pow(1 + rate, tenure)) / (Math.pow(1 + rate, tenure) - 1);
        const totalPayment = emi * tenure;
        const totalInterest = totalPayment - amount;
        
        document.getElementById('mudraResult').innerHTML = `
            <div class="bg-green-50 border-2 border-green-400 rounded-lg p-6">
                <h3 class="text-2xl font-bold text-orange-800 mb-4">MUDRA Loan EMI</h3>
                <div class="text-4xl font-bold text-orange-900 mb-4">₹${Math.round(emi).toLocaleString('en-IN')}/month</div>
                <div class="space-y-2 text-gray-700">
                    <p><strong>Loan Amount:</strong> ₹${amount.toLocaleString('en-IN')}</p>
                    <p><strong>Interest Rate:</strong> 8% p.a.</p>
                    <p><strong>Total Interest:</strong> ₹${Math.round(totalInterest).toLocaleString('en-IN')}</p>
                    <p><strong>Total Repayment:</strong> ₹${Math.round(totalPayment).toLocaleString('en-IN')}</p>
                    <p class="text-sm text-green-700 mt-4">✅ No collateral required for MUDRA loans!</p>
                </div>
            </div>
        `;
        document.getElementById('mudraResult').classList.remove('hidden');
    });
}

// 23. LOAN COMPARISON
if (document.getElementById('compareForm')) {
    document.getElementById('compareForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const amount = parseFloat(document.getElementById('compareAmount').value);
        const tenure = parseInt(document.getElementById('compareTenure').value);
        
        const lenders = [
            {name: 'HDFC Bank', rate: 0.115},
            {name: 'ICICI Bank', rate: 0.1199},
            {name: 'SBI', rate: 0.105},
            {name: 'Bajaj Finserv', rate: 0.13}
        ];
        
        let html = '<div class="space-y-4">';
        lenders.forEach(lender => {
            const r = lender.rate / 12;
            const emi = (amount * r * Math.pow(1 + r, tenure)) / (Math.pow(1 + r, tenure) - 1);
            const total = emi * tenure;
            const interest = total - amount;
            
            html += `
                <div class="bg-blue-50 border-2 border-blue-300 rounded-lg p-4">
                    <h4 class="font-bold text-lg text-blue-800">${lender.name}</h4>
                    <p class="text-gray-700"><strong>Interest:</strong> ${(lender.rate * 100).toFixed(2)}% p.a.</p>
                    <p class="text-xl font-bold text-blue-900"><strong>EMI:</strong> ₹${Math.round(emi).toLocaleString('en-IN')}</p>
                    <p class="text-gray-700"><strong>Total Cost:</strong> ₹${Math.round(total).toLocaleString('en-IN')}</p>
                    <p class="text-sm text-gray-600"><strong>Interest Paid:</strong> ₹${Math.round(interest).toLocaleString('en-IN')}</p>
                </div>
            `;
        });
        html += '</div>';
        
        document.getElementById('compareResult').innerHTML = html;
        document.getElementById('compareResult').classList.remove('hidden');
    });
}

// 24. VEHICLE FINANCE CALCULATOR
if (document.getElementById('vehicleForm')) {
    document.getElementById('vehicleForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const price = parseFloat(document.getElementById('vehiclePrice').value);
        const downPayment = parseFloat(document.getElementById('downPayment').value);
        const tenure = parseInt(document.getElementById('vehicleTenure').value);
        
        const loanAmount = price - downPayment;
        const rate = 0.095 / 12; // 9.5% for two-wheelers
        const emi = (loanAmount * rate * Math.pow(1 + rate, tenure)) / (Math.pow(1 + rate, tenure) - 1);
        const totalPayment = emi * tenure;
        const totalCost = totalPayment + downPayment;
        
        document.getElementById('vehicleResult').innerHTML = `
            <div class="bg-green-50 border-2 border-green-400 rounded-lg p-6">
                <h3 class="text-2xl font-bold text-red-800 mb-4">Vehicle Finance Plan</h3>
                <div class="text-4xl font-bold text-red-900 mb-4">₹${Math.round(emi).toLocaleString('en-IN')}/month</div>
                <div class="space-y-2 text-gray-700">
                    <p><strong>Vehicle Price:</strong> ₹${price.toLocaleString('en-IN')}</p>
                    <p><strong>Down Payment:</strong> ₹${downPayment.toLocaleString('en-IN')}</p>
                    <p><strong>Loan Amount:</strong> ₹${loanAmount.toLocaleString('en-IN')}</p>
                    <p><strong>Interest (9.5%):</strong> ₹${Math.round(totalPayment - loanAmount).toLocaleString('en-IN')}</p>
                    <p><strong>Total Cost:</strong> ₹${Math.round(totalCost).toLocaleString('en-IN')}</p>
                </div>
            </div>
        `;
        document.getElementById('vehicleResult').classList.remove('hidden');
    });
}

// ============================================
// BUSINESS CALCULATORS
// ============================================

// 25. BREAK-EVEN CALCULATOR
if (document.getElementById('breakevenForm')) {
    document.getElementById('breakevenForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const fixedCosts = parseFloat(document.getElementById('fixedCosts').value);
        const sellingPrice = parseFloat(document.getElementById('sellingPrice').value);
        const variableCost = parseFloat(document.getElementById('variableCost').value);
        
        const contributionMargin = sellingPrice - variableCost;
        const breakEvenUnits = Math.ceil(fixedCosts / contributionMargin);
        const breakEvenRevenue = breakEvenUnits * sellingPrice;
        
        document.getElementById('breakevenResult').innerHTML = `
            <div class="bg-green-50 border-2 border-green-400 rounded-lg p-6">
                <h3 class="text-2xl font-bold text-pink-800 mb-4">Break-Even Point</h3>
                <div class="text-4xl font-bold text-pink-900 mb-4">${breakEvenUnits} units</div>
                <div class="space-y-2 text-gray-700">
                    <p><strong>Break-Even Revenue:</strong> ₹${breakEvenRevenue.toLocaleString('en-IN')}</p>
                    <p><strong>Contribution Margin:</strong> ₹${contributionMargin.toLocaleString('en-IN')}/unit</p>
                    <p><strong>Margin %:</strong> ${((contributionMargin/sellingPrice) * 100).toFixed(1)}%</p>
                    <p class="text-sm text-gray-600 mt-4">You need to sell ${breakEvenUnits} units to cover all costs</p>
                </div>
            </div>
        `;
        document.getElementById('breakevenResult').classList.remove('hidden');
    });
}

// 26. PROFIT MARGIN CALCULATOR
if (document.getElementById('marginForm')) {
    document.getElementById('marginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const revenue = parseFloat(document.getElementById('revenue').value);
        const cogs = parseFloat(document.getElementById('cogs').value);
        const opex = parseFloat(document.getElementById('opex').value);
        
        const grossProfit = revenue - cogs;
        const netProfit = grossProfit - opex;
        const grossMargin = (grossProfit / revenue) * 100;
        const netMargin = (netProfit / revenue) * 100;
        
        document.getElementById('marginResult').innerHTML = `
            <div class="bg-green-50 border-2 border-green-400 rounded-lg p-6">
                <h3 class="text-2xl font-bold text-green-800 mb-4">Profit Analysis</h3>
                <div class="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <p class="text-sm text-gray-600">Gross Profit</p>
                        <p class="text-2xl font-bold text-green-900">₹${grossProfit.toLocaleString('en-IN')}</p>
                        <p class="text-lg font-semibold text-green-700">${grossMargin.toFixed(1)}% margin</p>
                    </div>
                    <div>
                        <p class="text-sm text-gray-600">Net Profit</p>
                        <p class="text-2xl font-bold text-blue-900">₹${netProfit.toLocaleString('en-IN')}</p>
                        <p class="text-lg font-semibold text-blue-700">${netMargin.toFixed(1)}% margin</p>
                    </div>
                </div>
                <div class="space-y-2 text-gray-700 border-t pt-3">
                    <p><strong>Revenue:</strong> ₹${revenue.toLocaleString('en-IN')}</p>
                    <p><strong>COGS:</strong> -₹${cogs.toLocaleString('en-IN')}</p>
                    <p><strong>Operating Expenses:</strong> -₹${opex.toLocaleString('en-IN')}</p>
                </div>
            </div>
        `;
        document.getElementById('marginResult').classList.remove('hidden');
    });
}

// 27. ROI CALCULATOR
if (document.getElementById('roiForm')) {
    document.getElementById('roiForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const investment = parseFloat(document.getElementById('investment').value);
        const finalValue = parseFloat(document.getElementById('finalValue').value);
        const years = parseFloat(document.getElementById('timePeriod').value);
        
        const gain = finalValue - investment;
        const roi = (gain / investment) * 100;
        const annualizedROI = (Math.pow(finalValue / investment, 1 / years) - 1) * 100;
        
        document.getElementById('roiResult').innerHTML = `
            <div class="bg-green-50 border-2 border-green-400 rounded-lg p-6">
                <h3 class="text-2xl font-bold text-indigo-800 mb-4">Return on Investment</h3>
                <div class="text-4xl font-bold text-indigo-900 mb-4">${roi.toFixed(1)}%</div>
                <div class="space-y-2 text-gray-700">
                    <p><strong>Total Gain:</strong> ₹${gain.toLocaleString('en-IN')}</p>
                    <p><strong>Annualized ROI:</strong> ${annualizedROI.toFixed(2)}% per year</p>
                    <p><strong>Investment Period:</strong> ${years} years</p>
                    <p class="text-sm ${roi > 0 ? 'text-green-600' : 'text-red-600'} mt-4">
                        ${roi > 0 ? '✅ Profitable investment!' : '⚠️ Loss on investment'}
                    </p>
                </div>
            </div>
        `;
        document.getElementById('roiResult').classList.remove('hidden');
    });
}

// 28. DISCOUNT CALCULATOR
if (document.getElementById('discountForm')) {
    document.getElementById('discountForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const original = parseFloat(document.getElementById('originalPrice').value);
        const discount = parseFloat(document.getElementById('discountPercent').value);
        
        const discountAmount = original * (discount / 100);
        const salePrice = original - discountAmount;
        const savings = discountAmount;
        
        document.getElementById('discountResult').innerHTML = `
            <div class="bg-green-50 border-2 border-green-400 rounded-lg p-6">
                <h3 class="text-2xl font-bold text-orange-800 mb-4">Sale Price</h3>
                <div class="text-4xl font-bold text-orange-900 mb-4">₹${salePrice.toLocaleString('en-IN')}</div>
                <div class="space-y-2 text-gray-700">
                    <p><strong>Original Price:</strong> <span class="line-through">₹${original.toLocaleString('en-IN')}</span></p>
                    <p><strong>Discount:</strong> ${discount}% off</p>
                    <p class="text-2xl font-bold text-green-700"><strong>You Save:</strong> ₹${savings.toLocaleString('en-IN')}</p>
                </div>
            </div>
        `;
        document.getElementById('discountResult').classList.remove('hidden');
    });
}

// 29. COMMISSION CALCULATOR
if (document.getElementById('commissionForm')) {
    document.getElementById('commissionForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const sales = parseFloat(document.getElementById('salesAmount').value);
        const rate = parseFloat(document.getElementById('commissionRate').value) / 100;
        
        const commission = sales * rate;
        const netRevenue = sales - commission;
        
        document.getElementById('commissionResult').innerHTML = `
            <div class="bg-green-50 border-2 border-green-400 rounded-lg p-6">
                <h3 class="text-2xl font-bold text-yellow-800 mb-4">Commission Earned</h3>
                <div class="text-4xl font-bold text-yellow-900 mb-4">₹${commission.toLocaleString('en-IN')}</div>
                <div class="space-y-2 text-gray-700">
                    <p><strong>Total Sales:</strong> ₹${sales.toLocaleString('en-IN')}</p>
                    <p><strong>Commission Rate:</strong> ${(rate * 100).toFixed(1)}%</p>
                    <p><strong>Net to Company:</strong> ₹${netRevenue.toLocaleString('en-IN')}</p>
                </div>
            </div>
        `;
        document.getElementById('commissionResult').classList.remove('hidden');
    });
}

// 30. CUSTOMER ACQUISITION COST
if (document.getElementById('cacForm')) {
    document.getElementById('cacForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const marketingSpend = parseFloat(document.getElementById('marketingSpend').value);
        const customers = parseInt(document.getElementById('newCustomers').value);
        const ltv = parseFloat(document.getElementById('ltv').value);
        
        const cac = marketingSpend / customers;
        const ltvCacRatio = ltv / cac;
        
        document.getElementById('cacResult').innerHTML = `
            <div class="bg-green-50 border-2 border-green-400 rounded-lg p-6">
                <h3 class="text-2xl font-bold text-cyan-800 mb-4">Customer Acquisition Cost</h3>
                <div class="text-4xl font-bold text-cyan-900 mb-4">₹${Math.round(cac).toLocaleString('en-IN')}</div>
                <div class="space-y-2 text-gray-700">
                    <p><strong>Marketing Spend:</strong> ₹${marketingSpend.toLocaleString('en-IN')}</p>
                    <p><strong>New Customers:</strong> ${customers}</p>
                    <p><strong>LTV:CAC Ratio:</strong> ${ltvCacRatio.toFixed(2)}:1</p>
                    <p class="text-sm ${ltvCacRatio >= 3 ? 'text-green-600' : 'text-orange-600'} mt-4">
                        ${ltvCacRatio >= 3 ? '✅ Healthy ratio (3:1 or better)' : '⚠️ Aim for 3:1 LTV:CAC ratio'}
                    </p>
                </div>
            </div>
        `;
        document.getElementById('cacResult').classList.remove('hidden');
    });
}

// ============================================
// OTHER CALCULATORS
// ============================================

// 31. FUEL COST CALCULATOR
if (document.getElementById('fuelForm')) {
    document.getElementById('fuelForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const distance = parseFloat(document.getElementById('distance').value);
        const mileage = parseFloat(document.getElementById('mileage').value);
        const price = parseFloat(document.getElementById('fuelPrice').value);
        const days = parseInt(document.getElementById('fuelDays').value);
        
        const dailyFuel = distance / mileage;
        const dailyCost = dailyFuel * price;
        const monthlyCost = dailyCost * days;
        const annualCost = monthlyCost * 12;
        
        document.getElementById('fuelResult').innerHTML = `
            <div class="bg-green-50 border-2 border-green-400 rounded-lg p-6">
                <h3 class="text-2xl font-bold text-indigo-800 mb-4">Monthly Fuel Cost</h3>
                <div class="text-4xl font-bold text-indigo-900 mb-4">₹${Math.round(monthlyCost).toLocaleString('en-IN')}</div>
                <div class="space-y-2 text-gray-700">
                    <p><strong>Daily Cost:</strong> ₹${Math.round(dailyCost).toLocaleString('en-IN')}</p>
                    <p><strong>Daily Fuel Usage:</strong> ${dailyFuel.toFixed(2)} liters</p>
                    <p><strong>Annual Cost:</strong> ₹${Math.round(annualCost).toLocaleString('en-IN')}</p>
                    <p class="text-sm text-gray-600 mt-4">Based on ${distance}km/day at ${mileage}km/L</p>
                </div>
            </div>
        `;
        document.getElementById('fuelResult').classList.remove('hidden');
    });
}

// 32. SIP CALCULATOR
if (document.getElementById('sipForm')) {
    document.getElementById('sipForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const monthly = parseFloat(document.getElementById('sipAmount').value);
        const rate = parseFloat(document.getElementById('sipReturn').value) / 100 / 12;
        const years = parseInt(document.getElementById('sipYears').value);
        const months = years * 12;
        
        const maturity = monthly * (((Math.pow(1 + rate, months) - 1) / rate) * (1 + rate));
        const invested = monthly * months;
        const returns = maturity - invested;
        
        document.getElementById('sipResult').innerHTML = `
            <div class="bg-green-50 border-2 border-green-400 rounded-lg p-6">
                <h3 class="text-2xl font-bold text-blue-800 mb-4">SIP Maturity Value</h3>
                <div class="text-4xl font-bold text-blue-900 mb-4">₹${Math.round(maturity).toLocaleString('en-IN')}</div>
                <div class="space-y-2 text-gray-700">
                    <p><strong>Total Invested:</strong> ₹${invested.toLocaleString('en-IN')}</p>
                    <p><strong>Estimated Returns:</strong> ₹${Math.round(returns).toLocaleString('en-IN')}</p>
                    <p><strong>Monthly SIP:</strong> ₹${monthly.toLocaleString('en-IN')}</p>
                    <p><strong>Duration:</strong> ${years} years (${months} months)</p>
                </div>
            </div>
        `;
        document.getElementById('sipResult').classList.remove('hidden');
    });
}

// 33. FD CALCULATOR
if (document.getElementById('fdForm')) {
    document.getElementById('fdForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const principal = parseFloat(document.getElementById('fdAmount').value);
        const rate = parseFloat(document.getElementById('fdRate').value) / 100;
        const years = parseInt(document.getElementById('fdYears').value);
        
        const maturity = principal * Math.pow((1 + rate / 4), 4 * years); // Quarterly compounding
        const interest = maturity - principal;
        
        document.getElementById('fdResult').innerHTML = `
            <div class="bg-green-50 border-2 border-green-400 rounded-lg p-6">
                <h3 class="text-2xl font-bold text-green-800 mb-4">FD Maturity Amount</h3>
                <div class="text-4xl font-bold text-green-900 mb-4">₹${Math.round(maturity).toLocaleString('en-IN')}</div>
                <div class="space-y-2 text-gray-700">
                    <p><strong>Principal:</strong> ₹${principal.toLocaleString('en-IN')}</p>
                    <p><strong>Interest Earned:</strong> ₹${Math.round(interest).toLocaleString('en-IN')}</p>
                    <p><strong>Interest Rate:</strong> ${(rate * 100).toFixed(2)}% p.a.</p>
                    <p><strong>Tenure:</strong> ${years} years</p>
                    <p class="text-sm text-gray-600 mt-4">Compounded quarterly</p>
                </div>
            </div>
        `;
        document.getElementById('fdResult').classList.remove('hidden');
    });
}

// 34. AGE CALCULATOR
if (document.getElementById('ageForm')) {
    document.getElementById('ageForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const dob = new Date(document.getElementById('dob').value);
        const today = new Date();
        
        let years = today.getFullYear() - dob.getFullYear();
        let months = today.getMonth() - dob.getMonth();
        let days = today.getDate() - dob.getDate();
        
        if (days < 0) {
            months--;
            days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
        }
        if (months < 0) {
            years--;
            months += 12;
        }
        
        const totalDays = Math.floor((today - dob) / (1000 * 60 * 60 * 24));
        const totalMonths = years * 12 + months;
        
        document.getElementById('ageResult').innerHTML = `
            <div class="bg-green-50 border-2 border-green-400 rounded-lg p-6">
                <h3 class="text-2xl font-bold text-purple-800 mb-4">Your Age</h3>
                <div class="text-4xl font-bold text-purple-900 mb-4">${years} years ${months} months ${days} days</div>
                <div class="space-y-2 text-gray-700">
                    <p><strong>Total Months:</strong> ${totalMonths} months</p>
                    <p><strong>Total Days:</strong> ${totalDays.toLocaleString('en-IN')} days</p>
                    <p><strong>Date of Birth:</strong> ${dob.toLocaleDateString('en-IN')}</p>
                </div>
            </div>
        `;
        document.getElementById('ageResult').classList.remove('hidden');
    });
}

// 35. WORK HOURS TRACKER
if (document.getElementById('timeForm')) {
    document.getElementById('timeForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const start = document.getElementById('startTime').value;
        const end = document.getElementById('endTime').value;
        const rate = parseFloat(document.getElementById('timeRate').value);
        
        const startTime = new Date(`2025-01-01T${start}`);
        const endTime = new Date(`2025-01-01T${end}`);
        const hours = (endTime - startTime) / (1000 * 60 * 60);
        const earnings = hours * rate;
        
        document.getElementById('timeResult').innerHTML = `
            <div class="bg-green-50 border-2 border-green-400 rounded-lg p-6">
                <h3 class="text-2xl font-bold text-orange-800 mb-4">Work Session Summary</h3>
                <div class="text-4xl font-bold text-orange-900 mb-4">₹${Math.round(earnings).toLocaleString('en-IN')}</div>
                <div class="space-y-2 text-gray-700">
                    <p><strong>Hours Worked:</strong> ${hours.toFixed(2)} hours</p>
                    <p><strong>Start Time:</strong> ${start}</p>
                    <p><strong>End Time:</strong> ${end}</p>
                    <p><strong>Hourly Rate:</strong> ₹${rate.toLocaleString('en-IN')}</p>
                </div>
            </div>
        `;
        document.getElementById('timeResult').classList.remove('hidden');
    });
}

console.log('✅ ShramSetu Extended Calculators Loaded (Part 2 - Complete!)');
