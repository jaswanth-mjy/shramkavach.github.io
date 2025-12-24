#!/usr/bin/env python3
"""
Script to convert all calculator sections to accordion format
Adds collapsible headers with expand/collapse functionality
"""

import re

# Read the HTML file
with open('/Users/mjaswanth/shram/calculators.html', 'r', encoding='utf-8') as f:
    html = f.read()

# List of all calculator IDs and their titles
calculators = [
    # Already done: gratuity
    ('socialsecurity', '🏥 Social Security Cess Estimator', 'from-blue-600 to-indigo-600', 'Platform आपके लिए कितना contribute कर रहा है?'),
    ('taxcomparator', '📈 Freelance Tax Comparator (FY 2025-26)', 'from-green-600 to-teal-600', 'Section 44ADA - Old vs New Tax Regime'),
    ('pf', '🏦 EPF Calculator (12% + 12%)', 'from-orange-500 to-yellow-500', 'Employee + Employer PF contribution calculator'),
    ('leave', '🏖️ Leave Encashment Calculator', 'from-red-500 to-pink-500', 'Calculate unused leave payout value'),
    ('hourly', '⏰ Hourly Rate Calculator', 'from-blue-600 to-cyan-600', 'Calculate your per-hour earning rate'),
    ('delivery', '🛵 Delivery Partner Earnings', 'from-green-600 to-emerald-600', 'Swiggy/Zomato/Dunzo earnings estimator'),
    ('cab', '🚗 Cab Driver Income (Uber/Ola)', 'from-yellow-500 to-orange-500', 'Calculate take-home after platform commission'),
    ('pricing', '💵 Freelance Project Pricing', 'from-purple-600 to-indigo-600', 'Quote calculator with expenses & profit margin'),
    ('salaryConvert', '🔄 Salary to Freelance Converter', 'from-pink-500 to-rose-500', 'What freelance rate equals your salary?'),
    ('invoice', '🧾 Invoice Amount Calculator', 'from-teal-500 to-cyan-500', 'Calculate with GST, TDS deductions'),
    ('platformFee', '💸 Platform Fee Calculator', 'from-red-600 to-orange-600', 'Compare Upwork, Fiverr, Freelancer fees'),
    ('gst', '📋 GST Calculator', 'from-green-700 to-teal-700', 'Calculate inclusive/exclusive GST amounts'),
    ('tds', '💼 TDS Calculator (194J/194C)', 'from-indigo-600 to-purple-600', 'Tax Deducted at Source calculator'),
    ('advanceTax', '📅 Advance Tax Calculator', 'from-orange-600 to-red-600', 'Quarterly advance tax payment schedule'),
    ('proTax', '🏛️ Professional Tax Calculator', 'from-blue-700 to-indigo-700', 'State-wise professional tax (Maharashtra, Karnataka, etc.)'),
    ('takeHome', '💰 Take Home Salary Calculator', 'from-purple-700 to-pink-700', 'In-hand salary after all deductions'),
    ('ctc', '💼 CTC to In-Hand Converter', 'from-cyan-600 to-blue-600', 'Real salary from Cost to Company'),
    ('taxDetailed', '🧮 Detailed Income Tax Calculator', 'from-green-800 to-teal-800', 'With deductions u/s 80C, 80D, HRA'),
    ('emi', '🏠 EMI Calculator', 'from-purple-600 to-indigo-600', 'Calculate monthly loan installment'),
    ('loanEligibility', '✅ Loan Eligibility Calculator', 'from-blue-600 to-cyan-600', 'How much loan can you get?'),
    ('mudra', '🏪 MUDRA Loan Calculator', 'from-orange-600 to-yellow-600', 'Shishu/Kishore/Tarun scheme calculator'),
    ('loanCompare', '⚖️ Personal Loan Comparison', 'from-pink-600 to-rose-600', 'Compare total cost across lenders'),
    ('vehicle', '🛵 Vehicle Finance Calculator', 'from-red-600 to-orange-600', 'Bike/Scooter loan for delivery partners'),
    ('breakeven', '⚖️ Break-Even Calculator', 'from-pink-600 to-purple-600', 'When will your business become profitable?'),
    ('margin', '📊 Profit Margin Calculator', 'from-green-600 to-emerald-600', 'Calculate gross & net profit margins'),
    ('roi', '💹 ROI Calculator', 'from-indigo-600 to-blue-600', 'Return on Investment calculator'),
    ('discount', '🏷️ Discount Calculator', 'from-orange-600 to-red-600', 'Calculate sale price & discount percentage'),
    ('commission', '💰 Commission Calculator', 'from-yellow-600 to-orange-600', 'Sales commission & agent earnings'),
    ('cac', '👥 Customer Acquisition Cost (CAC)', 'from-cyan-600 to-teal-600', 'Cost to acquire one customer'),
    ('fuel', '⛽ Fuel Cost Calculator', 'from-indigo-600 to-purple-600', 'For delivery partners & cab drivers'),
    ('sip', '📈 SIP Calculator', 'from-blue-600 to-indigo-600', 'Systematic Investment Plan returns'),
    ('fd', '🏦 FD Calculator', 'from-green-600 to-teal-600', 'Fixed Deposit maturity calculator'),
    ('age', '🎂 Age Calculator', 'from-purple-600 to-pink-600', 'Calculate exact age from date of birth'),
    ('timeTracker', '⏱️ Work Hours Tracker', 'from-orange-600 to-yellow-600', 'Calculate total work hours & earnings'),
]

# Function to convert a calculator section
def convert_calculator(calc_id, title, gradient, subtitle):
    # Pattern to find the section
    pattern = rf'(<section id="{calc_id}"[^>]*>.*?<div class="bg-gradient-to-r {gradient} text-white p-6">)'
    
    replacement = rf'<section id="{calc_id}" class="mb-6">\n            <div class="max-w-4xl mx-auto">\n                <div class="bg-white rounded-xl shadow-xl overflow-hidden calculator-card">\n                    <div class="bg-gradient-to-r {gradient} text-white p-6 cursor-pointer calculator-header" onclick="toggleCalculator(\'{calc_id}\')">\n                        <div class="flex justify-between items-center">\n                            <div>\n                                <h2 class="text-3xl font-bold mb-2">{title}</h2>\n                                <p class="text-lg">{subtitle}</p>\n                            </div>\n                            <svg class="w-8 h-8 transform transition-transform calculator-icon" id="{calc_id}-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">\n                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>\n                            </svg>\n                        </div>\n                    </div>\n                    \n                    <div class="calculator-content hidden" id="{calc_id}-content">'
    
    html_modified = re.sub(pattern, replacement, html, flags=re.DOTALL)
    
    return html_modified

# Apply conversions (skip gratuity as it's already done)
for calc in calculators:
    html = convert_calculator(calc[0], calc[1], calc[2], calc[3])

# Fix section closings - add proper closing divs
html = re.sub(r'</section>', r'                    </div>\n                </div>\n            </div>\n        </section>', html)

# Write back
with open('/Users/mjaswanth/shram/calculators.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("✅ All calculators converted to accordion format!")
print(f"✅ Total calculators processed: {len(calculators) + 1}")  # +1 for gratuity
