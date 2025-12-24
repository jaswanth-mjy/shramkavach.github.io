/**
 * ShramSetu Privacy Policy & Contract Generator
 * DPDP Act 2023 Compliant - 100% Client-Side
 */

// ============================================
// PRIVACY POLICY GENERATOR
// ============================================

const privacyPolicyTemplate = {
    intro: (businessName) => `
        <h1>Privacy Policy</h1>
        <p><strong>Last Updated:</strong> ${new Date().toLocaleDateString('en-IN')}</p>
        <p>This Privacy Policy describes how <strong>${businessName}</strong> ("we", "us", "our") collects, uses, and protects your personal data in accordance with the <strong>Digital Personal Data Protection Act, 2023 (DPDP Act)</strong> of India.</p>
        <p>By using our services, you consent to the practices described in this policy.</p>
    `,
    
    dataFiduciary: (businessName, email, address) => `
        <h2>1. Data Fiduciary Information</h2>
        <p>Under the DPDP Act, we act as a <strong>Data Fiduciary</strong> for your personal data.</p>
        <ul>
            <li><strong>Business Name:</strong> ${businessName}</li>
            <li><strong>Grievance Officer Email:</strong> ${email}</li>
            <li><strong>Address:</strong> ${address}</li>
        </ul>
    `,
    
    dataCollected: (dataTypes) => `
        <h2>2. Personal Data We Collect</h2>
        <p>We collect the following categories of personal data:</p>
        <ul>
            ${dataTypes.map(type => {
                const descriptions = {
                    'name': 'Full Name - for identification and personalization',
                    'email': 'Email Address - for communication and account management',
                    'phone': 'Phone Number - for order updates and customer support',
                    'address': 'Delivery Address - for fulfillment of orders',
                    'payment': 'Payment Information - processed securely via third-party gateways',
                    'location': 'Location Data - to provide location-based services'
                };
                return `<li>${descriptions[type]}</li>`;
            }).join('')}
        </ul>
        <p><em>Note: We collect only the minimum data necessary for the specified purposes.</em></p>
    `,
    
    purposeOfUse: (purposes) => `
        <h2>3. Purpose of Data Processing</h2>
        <p>Your personal data is processed for the following lawful purposes under Section 7 of the DPDP Act:</p>
        <ul>
            ${purposes.map(purpose => {
                const descriptions = {
                    'order-fulfillment': 'Order Fulfillment & Service Delivery - to process and deliver your orders',
                    'marketing': 'Marketing & Promotional Communications - to send updates and offers (with your consent)',
                    'customer-support': 'Customer Support - to respond to inquiries and resolve issues',
                    'analytics': 'Analytics & Service Improvement - to understand usage patterns and enhance our services'
                };
                return `<li>${descriptions[purpose]}</li>`;
            }).join('')}
        </ul>
    `,
    
    dataSharing: () => `
        <h2>4. Data Sharing & Disclosure</h2>
        <p>We do not sell your personal data. We may share your data with:</p>
        <ul>
            <li><strong>Service Providers:</strong> Third-party vendors who assist in delivery, payment processing, etc.</li>
            <li><strong>Legal Authorities:</strong> When required by law or to protect our rights.</li>
        </ul>
        <p>All third parties are contractually bound to protect your data.</p>
    `,
    
    dataRetention: () => `
        <h2>5. Data Retention</h2>
        <p>We retain your personal data only as long as necessary for the purposes stated, or as required by law. After this period, data is securely deleted or anonymized.</p>
    `,
    
    dataPrincipalRights: (email) => `
        <h2>6. Your Rights as a Data Principal</h2>
        <p>Under the DPDP Act, you have the following rights:</p>
        <ul>
            <li><strong>Right to Access:</strong> Request a copy of your personal data.</li>
            <li><strong>Right to Correction:</strong> Request correction of inaccurate data.</li>
            <li><strong>Right to Erasure:</strong> Request deletion of your data (subject to legal obligations).</li>
            <li><strong>Right to Withdraw Consent:</strong> Withdraw consent for data processing at any time.</li>
            <li><strong>Right to Nominate:</strong> Nominate another person to exercise your rights in case of death or incapacity.</li>
        </ul>
        <p>To exercise these rights, contact us at: <strong>${email}</strong></p>
    `,
    
    dataSecurity: () => `
        <h2>7. Data Security Measures</h2>
        <p>We implement reasonable technical and organizational measures to protect your data from unauthorized access, loss, or misuse. This includes:</p>
        <ul>
            <li>Encryption of sensitive data</li>
            <li>Regular security audits</li>
            <li>Access controls and authentication</li>
        </ul>
    `,
    
    consentManagement: () => `
        <h2>8. Consent Management</h2>
        <p>Your consent is obtained before collecting personal data. You can:</p>
        <ul>
            <li>Review the data we hold about you</li>
            <li>Withdraw consent by contacting our Grievance Officer</li>
            <li>Opt-out of marketing communications at any time</li>
        </ul>
    `,
    
    grievanceRedressal: (email) => `
        <h2>9. Grievance Redressal (Section 12 of DPDP Act)</h2>
        <p>If you have any concerns or complaints regarding your personal data, you may contact our Grievance Officer:</p>
        <p><strong>Email:</strong> ${email}</p>
        <p>We will respond to your complaint within <strong>72 hours</strong> and resolve it within a reasonable timeframe.</p>
        <p>If unsatisfied, you may escalate to the <strong>Data Protection Board of India</strong>.</p>
    `,
    
    childrenPrivacy: () => `
        <h2>10. Children's Privacy</h2>
        <p>We do not knowingly collect data from children under 18 without verifiable parental consent, as required by the DPDP Act.</p>
    `,
    
    changes: () => `
        <h2>11. Changes to This Policy</h2>
        <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated "Last Updated" date.</p>
    `,
    
    contact: (businessName, email) => `
        <h2>12. Contact Us</h2>
        <p>For any questions about this Privacy Policy, please contact:</p>
        <p><strong>${businessName}</strong><br>Email: ${email}</p>
        <p><em>This policy is compliant with the Digital Personal Data Protection Act, 2023.</em></p>
    `
};

if (document.getElementById('privacyForm')) {
    document.getElementById('privacyForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const businessName = document.getElementById('businessName').value.trim();
        const contactEmail = document.getElementById('contactEmail').value.trim();
        const businessAddress = document.getElementById('businessAddress').value.trim();
        
        const dataTypes = Array.from(document.querySelectorAll('.dataType:checked')).map(cb => cb.value);
        const purposes = Array.from(document.querySelectorAll('.purposeType:checked')).map(cb => cb.value);
        
        if (!businessName || !contactEmail || !businessAddress || dataTypes.length === 0 || purposes.length === 0) {
            alert('Please fill all required fields and select at least one data type and purpose.');
            return;
        }
        
        // Generate Policy
        let policyHTML = `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 800px; margin: 0 auto; padding: 20px;">
                ${privacyPolicyTemplate.intro(businessName)}
                ${privacyPolicyTemplate.dataFiduciary(businessName, contactEmail, businessAddress)}
                ${privacyPolicyTemplate.dataCollected(dataTypes)}
                ${privacyPolicyTemplate.purposeOfUse(purposes)}
                ${privacyPolicyTemplate.dataSharing()}
                ${privacyPolicyTemplate.dataRetention()}
                ${privacyPolicyTemplate.dataPrincipalRights(contactEmail)}
                ${privacyPolicyTemplate.dataSecurity()}
                ${privacyPolicyTemplate.consentManagement()}
                ${privacyPolicyTemplate.grievanceRedressal(contactEmail)}
                ${privacyPolicyTemplate.childrenPrivacy()}
                ${privacyPolicyTemplate.changes()}
                ${privacyPolicyTemplate.contact(businessName, contactEmail)}
            </div>
        `;
        
        document.getElementById('policyContent').innerHTML = policyHTML;
        document.getElementById('policyOutput').classList.remove('hidden');
        document.getElementById('policyOutput').scrollIntoView({ behavior: 'smooth' });
        
        // Copy Button
        document.getElementById('copyPolicy').onclick = function() {
            navigator.clipboard.writeText(policyHTML).then(() => {
                alert('✅ Privacy Policy copied to clipboard!');
            });
        };
        
        // Download Button
        document.getElementById('downloadPolicy').onclick = function() {
            const blob = new Blob([policyHTML], { type: 'text/html' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${businessName.replace(/\s+/g, '_')}_Privacy_Policy.html`;
            a.click();
            URL.revokeObjectURL(url);
        };
    });
}

// ============================================
// CONTRACT BUILDER
// ============================================

const contractTemplate = (data) => `
    <div style="font-family: 'Times New Roman', serif; line-height: 1.8; max-width: 800px; margin: 0 auto; padding: 40px; border: 2px solid #000;">
        <h1 style="text-align: center; text-decoration: underline;">SERVICE AGREEMENT</h1>
        <p style="text-align: center;"><strong>Date:</strong> ${new Date().toLocaleDateString('en-IN')}</p>
        
        <p>This Service Agreement ("Agreement") is entered into on ${new Date().toLocaleDateString('en-IN')} between:</p>
        
        <p><strong>SERVICE PROVIDER:</strong> ${data.providerName}<br>
        ("Provider")</p>
        
        <p><strong>CLIENT:</strong> ${data.clientName}<br>
        ("Client")</p>
        
        <h2>1. SCOPE OF SERVICES</h2>
        <p>The Provider agrees to perform the following services for the Client:</p>
        <p><em>${data.serviceDescription}</em></p>
        
        <h2>2. PAYMENT TERMS</h2>
        <p><strong>Total Amount:</strong> ₹${data.contractAmount.toLocaleString('en-IN')}</p>
        <p><strong>Payment Schedule:</strong> ${getPaymentTermsText(data.paymentTerms)}</p>
        <p>Payment shall be made via bank transfer/UPI. Late payments will attract a penalty of 2% per month.</p>
        
        <h2>3. DELIVERY & TIMELINE</h2>
        <p><strong>Delivery Date:</strong> ${new Date(data.deliveryDate).toLocaleDateString('en-IN')}</p>
        <p>The Provider will deliver the completed work by the above date. Extensions require written mutual consent.</p>
        
        <h2>4. REVISIONS</h2>
        <p>The Client is entitled to <strong>${data.revisionLimit} free revision(s)</strong> after initial delivery.</p>
        <p>Additional revisions beyond this limit will be charged at ₹${Math.round(data.contractAmount * 0.1)} per revision.</p>
        
        <h2>5. INTELLECTUAL PROPERTY & COPYRIGHT</h2>
        <p>${getCopyrightText(data.copyrightTerms)}</p>
        
        <h2>6. TERMINATION</h2>
        <p>Either party may terminate this Agreement with 7 days' written notice. In case of termination:</p>
        <ul>
            <li>Client must pay for work completed to date</li>
            <li>Provider must deliver all work-in-progress materials</li>
        </ul>
        
        <h2>7. CONFIDENTIALITY</h2>
        <p>Both parties agree to keep confidential information disclosed during this engagement private and not share with third parties.</p>
        
        <h2>8. DISPUTE RESOLUTION</h2>
        <p>Any disputes arising from this Agreement shall be resolved through amicable discussion. If unresolved, disputes shall be subject to the jurisdiction of courts in [Your City], India.</p>
        
        <h2>9. SIGNATURES</h2>
        <div style="margin-top: 50px; display: flex; justify-content: space-between;">
            <div>
                <p>_______________________<br>
                <strong>${data.providerName}</strong><br>
                Service Provider<br>
                Date: _______________</p>
            </div>
            <div>
                <p>_______________________<br>
                <strong>${data.clientName}</strong><br>
                Client<br>
                Date: _______________</p>
            </div>
        </div>
        
        <p style="text-align: center; margin-top: 30px; font-size: 12px; color: #666;">
            <em>This is a legally binding agreement. Both parties should sign and retain a copy.</em>
        </p>
    </div>
`;

function getPaymentTermsText(terms) {
    const texts = {
        'full-advance': '100% payment in advance before work begins',
        '50-50': '50% advance payment, 50% upon delivery',
        'milestone': 'Payment in milestones as agreed upon separately',
        'full-delivery': '100% payment upon successful delivery'
    };
    return texts[terms];
}

function getCopyrightText(terms) {
    const texts = {
        'client': 'Upon full payment, all intellectual property rights and copyright shall be transferred to the Client. The Provider retains no rights to use or display the work.',
        'shared': 'Copyright is shared. The Client may use the work for their business, but the Provider retains the right to display the work in their portfolio.',
        'provider': 'The Provider retains full copyright. The Client is granted a non-exclusive license to use the work for their stated purposes.'
    };
    return texts[terms];
}

if (document.getElementById('contractForm')) {
    document.getElementById('contractForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const data = {
            providerName: document.getElementById('providerName').value.trim(),
            clientName: document.getElementById('clientName').value.trim(),
            serviceDescription: document.getElementById('serviceDescription').value.trim(),
            contractAmount: parseFloat(document.getElementById('contractAmount').value),
            paymentTerms: document.getElementById('paymentTerms').value,
            deliveryDate: document.getElementById('deliveryDate').value,
            revisionLimit: parseInt(document.getElementById('revisionLimit').value),
            copyrightTerms: document.getElementById('copyrightTerms').value
        };
        
        if (!data.providerName || !data.clientName || !data.serviceDescription || !data.contractAmount || !data.deliveryDate) {
            alert('Please fill all required fields');
            return;
        }
        
        const contractHTML = contractTemplate(data);
        
        document.getElementById('contractContent').innerHTML = contractHTML;
        document.getElementById('contractOutput').classList.remove('hidden');
        document.getElementById('contractOutput').scrollIntoView({ behavior: 'smooth' });
        
        // Download PDF
        document.getElementById('downloadContractPDF').onclick = function() {
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF('p', 'pt', 'a4');
            
            doc.html(document.getElementById('contractContent'), {
                callback: function(doc) {
                    doc.save(`Service_Agreement_${data.providerName}_${data.clientName}.pdf`);
                },
                x: 40,
                y: 40,
                width: 515,
                windowWidth: 800
            });
        };
        
        // WhatsApp Share
        document.getElementById('shareContract').onclick = function() {
            const text = `Service Agreement between ${data.providerName} and ${data.clientName}\n\n📋 Amount: ₹${data.contractAmount.toLocaleString('en-IN')}\n📅 Delivery: ${new Date(data.deliveryDate).toLocaleDateString('en-IN')}\n\nCreated using ShramSetu: ${window.location.href}`;
            window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
        };
    });
}

console.log('✅ ShramSetu Generators Loaded');
