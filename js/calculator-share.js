/**
 * Universal Share Functionality for Calculators and Tools
 * Adds WhatsApp sharing with motivational messages
 */

// Share messages for different calculator types
const shareMessages = {
    gratuity: [
        `मैंने अपना gratuity check किया!\\nमुझे मिलेगा: ₹{amount}\\n\\nतुम भी check करो:\\n`,
        `Wow! मेरा gratuity है ₹{amount}\\n\\nआपका कितना है? जानने के लिए:\\n`,
        `अपने rights जानो!\\nमेरा gratuity: ₹{amount}\\n\\nअपना भी calculate करो:\\n`,
        `Worker rights पता होने चाहिए!\\nMy gratuity: ₹{amount}\\n\\nShare yours too:\\n`
    ],
    tax: [
        `Tax planning done!\\n{regime} में ₹{amount} save होंगे!\\n\\nअपना भी check करो:\\n`,
        `Smart tax planning: {regime}\\nSavings: ₹{amount}\\n\\nCalculate yours:\\n`,
        `Section 44ADA checked!\\nBest choice: {regime}\\nSavings: ₹{amount}\\n\\nYour turn:\\n`
    ],
    pf: [
        `My EPF calculation done!\\nTotal: ₹{amount}\\n\\nCheck yours:\\n`,
        `EPF बढ़ रहा है!\\nCurrent total: ₹{amount}\\n\\nCalculate yours:\\n`,
        `Retirement planning: ₹{amount} in EPF\\n\\nYour turn:\\n`
    ],
    delivery: [
        `My delivery earnings: ₹{amount}/month\\n\\nकितना कमा रहे हो?\\n`,
        `Calculated my income: ₹{amount}\\n\\nCheck yours:\\n`,
        `Gig worker earnings: ₹{amount}\\n\\nShare yours:\\n`
    ],
    cab: [
        `My cab earnings: ₹{amount}/month\\n\\nआप कितना कमाते हो?\\n`,
        `Driver income calculated: ₹{amount}\\n\\nCheck yours:\\n`,
        `Monthly earnings: ₹{amount}\\n\\nCalculate yours:\\n`
    ],
    pricing: [
        `My hourly rate: ₹{amount}/hour\\n\\nक्या सही है?\\n`,
        `Freelance pricing done: ₹{amount}/hr\\n\\nCalculate yours:\\n`,
        `Professional rate: ₹{amount}/hour\\n\\nYour turn:\\n`
    ],
    social: [
        `Platform मुझे ₹{amount} contribute करेगा!\\n\\nअपना भी check करो:\\n`,
        `My social security: ₹{amount}/year\\n\\nYours कितना है?\\n`,
        `Gig workers को भी benefits मिलेंगे!\\nMine: ₹{amount}/month\\n\\nCalculate yours:\\n`
    ],
    generic: [
        `Just used this amazing calculator!\\nResult: ₹{amount}\\n\\nTry it:\\n`,
        `Free calculator से चेक किया!\\nResult: ₹{amount}\\n\\nYour turn:\\n`,
        `Smart tool for workers!\\nMy result: ₹{amount}\\n\\nCheck yours:\\n`
    ]
};

/**
 * Add share button to calculator result
 * @param {string} resultDivId - ID of the result container div
 * @param {string} calculatorType - Type of calculator (gratuity, tax, pf, etc.)
 * @param {object} resultData - Result data including amount and other details
 */
function addShareButton(resultDivId, calculatorType, resultData) {
    const resultDiv = document.getElementById(resultDivId);
    if (!resultDiv) return;
    
    // Check if share button already exists
    let shareBtn = resultDiv.querySelector('.calculator-share-btn');
    
    if (!shareBtn) {
        shareBtn = document.createElement('button');
        shareBtn.className = 'calculator-share-btn mt-6 w-full bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-4 rounded-xl font-bold hover:from-green-600 hover:to-green-700 transition flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:scale-105';
        shareBtn.innerHTML = `
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            <span>Share My Result on WhatsApp</span>
        `;
        resultDiv.appendChild(shareBtn);
    }
    
    // Update click handler with new data
    shareBtn.onclick = function() {
        shareCalculatorResult(calculatorType, resultData);
    };
}

/**
 * Share calculator result on WhatsApp
 * @param {string} calculatorType - Type of calculator
 * @param {object} resultData - Result data
 */
function shareCalculatorResult(calculatorType, resultData) {
    const messages = shareMessages[calculatorType] || shareMessages.generic;
    let randomMsg = messages[Math.floor(Math.random() * messages.length)];
    
    // Replace placeholders with actual data
    if (resultData.amount) {
        randomMsg = randomMsg.replace('{amount}', 
            typeof resultData.amount === 'number' 
                ? resultData.amount.toLocaleString('en-IN') 
                : resultData.amount
        );
    }
    
    if (resultData.regime) {
        randomMsg = randomMsg.replace('{regime}', resultData.regime);
    }
    
    if (resultData.monthly) {
        randomMsg = randomMsg.replace('{monthly}', 
            typeof resultData.monthly === 'number' 
                ? resultData.monthly.toLocaleString('en-IN') 
                : resultData.monthly
        );
    }
    
    const shareUrl = `${window.location.origin}/calculators.html`;
    const text = randomMsg + shareUrl;
    
    // Open WhatsApp with pre-filled message
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
}

/**
 * Create and show share prompt after tool use
 * @param {string} toolName - Name of the tool/generator used
 * @param {string} targetUrl - URL to share (defaults to current page)
 */
function showToolSharePrompt(toolName, targetUrl = null) {
    const shareUrl = targetUrl || window.location.href;
    
    const shareMessages = [
        `📄 Just created my ${toolName}!\\n\\n🎯 Professional documents बनाने का सबसे आसान तरीका!\\n\\nTry it free 👇\\n`,
        `✅ ${toolName} generated!\\n\\n💯 100% free & private - शून्य data storage\\n\\nCreate yours 👇\\n`,
        `🚀 Professional ${toolName} ready!\\n\\nBest free tool for freelancers 💪\\n\\nCheck it out 👇\\n`,
        `⚡ ${toolName} बना लिया in 2 minutes!\\n\\n📋 Free legal templates for all\\n\\nGenerate yours 👇\\n`
    ];
    
    const randomMsg = shareMessages[Math.floor(Math.random() * shareMessages.length)];
    
    // Create share dialog
    const shareDialog = document.createElement('div');
    shareDialog.className = 'fixed inset-0 bg-black bg-opacity-50 z-[10000] flex items-center justify-center p-4';
    shareDialog.style.animation = 'fadeIn 0.3s ease-out';
    
    shareDialog.innerHTML = `
        <style>
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes slideUp {
                from { transform: translateY(20px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
        </style>
        <div class="bg-white rounded-2xl max-w-md w-full p-6" style="animation: slideUp 0.3s ease-out;">
            <div class="text-center mb-6">
                <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                </div>
                <h3 class="text-2xl font-bold text-gray-800 mb-2">Success! 🎉</h3>
                <p class="text-gray-600">Help others discover this free tool</p>
            </div>
            
            <div class="space-y-3 mb-6">
                <button id="shareWhatsAppTool" class="w-full bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-4 rounded-xl font-bold hover:from-green-600 hover:to-green-700 transition flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:scale-105">
                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Share on WhatsApp
                </button>
                
                <button id="copyLinkTool" class="w-full bg-gray-100 text-gray-800 px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition flex items-center justify-center gap-3">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                    </svg>
                    Copy Link
                </button>
            </div>
            
            <button id="closeShareDialogTool" class="w-full text-gray-500 hover:text-gray-700 font-medium">
                No thanks, close
            </button>
        </div>
    `;
    
    document.body.appendChild(shareDialog);
    
    // WhatsApp share handler
    document.getElementById('shareWhatsAppTool').onclick = () => {
        const text = randomMsg + shareUrl;
        window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
        shareDialog.remove();
    };
    
    // Copy link handler
    document.getElementById('copyLinkTool').onclick = () => {
        navigator.clipboard.writeText(shareUrl).then(() => {
            const btn = document.getElementById('copyLinkTool');
            btn.innerHTML = `
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                Copied!
            `;
            btn.classList.add('bg-green-100', 'text-green-800');
            setTimeout(() => shareDialog.remove(), 1500);
        });
    };
    
    // Close handler
    document.getElementById('closeShareDialogTool').onclick = () => shareDialog.remove();
    shareDialog.onclick = (e) => {
        if (e.target === shareDialog) shareDialog.remove();
    };
}

console.log('✅ Calculator Share System Loaded');
