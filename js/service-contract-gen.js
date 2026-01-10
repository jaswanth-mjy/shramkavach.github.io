/**
 * ShramKavach Service Contract Generator
 * India-Compliant Professional Service Agreements
 * 100% Client-Side Processing
 */

// Show/hide sections based on payment structure
document.getElementById('paymentStructure')?.addEventListener('change', function() {
    const milestoneSection = document.getElementById('milestoneSection');
    const hourlySection = document.getElementById('hourlySection');
    
    milestoneSection.classList.add('hidden');
    hourlySection.classList.add('hidden');
    
    if (this.value === 'milestone') {
        milestoneSection.classList.remove('hidden');
    } else if (this.value === 'hourly') {
        hourlySection.classList.remove('hidden');
    }
});

// Form submission
document.getElementById('contractForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    generateContract();
});

function generateContract() {
    // Collect all form data
    const contractData = {
        // Party Information
        providerName: document.getElementById('providerName').value.trim(),
        clientName: document.getElementById('clientName').value.trim(),
        providerAddress: document.getElementById('providerAddress').value.trim(),
        clientAddress: document.getElementById('clientAddress').value.trim(),
        providerEmail: document.getElementById('providerEmail').value.trim(),
        clientEmail: document.getElementById('clientEmail').value.trim(),
        providerPhone: document.getElementById('providerPhone').value.trim(),
        clientPhone: document.getElementById('clientPhone').value.trim(),
        providerGST: document.getElementById('providerGST').value.trim(),
        clientGST: document.getElementById('clientGST').value.trim(),
        
        // Service Details
        serviceTitle: document.getElementById('serviceTitle').value.trim(),
        serviceDescription: document.getElementById('serviceDescription').value.trim(),
        serviceCategory: document.getElementById('serviceCategory').value,
        startDate: document.getElementById('startDate').value,
        completionDate: document.getElementById('completionDate').value,
        deliverables: document.getElementById('deliverables').value.trim(),
        
        // Financial Terms
        contractAmount: parseFloat(document.getElementById('contractAmount').value),
        currency: document.getElementById('currency').value,
        paymentStructure: document.getElementById('paymentStructure').value,
        milestoneDetails: document.getElementById('milestoneDetails')?.value.trim() || '',
        hourlyRate: parseFloat(document.getElementById('hourlyRate')?.value) || 0,
        estimatedHours: parseFloat(document.getElementById('estimatedHours')?.value) || 0,
        paymentTerms: parseInt(document.getElementById('paymentTerms').value),
        lateFee: parseFloat(document.getElementById('lateFee').value),
        gstClause: document.querySelector('input[name="gstClause"]:checked')?.value === 'yes',
        
        // IP Rights
        ipOwnership: document.getElementById('ipOwnership').value,
        portfolioRights: document.querySelector('input[name="portfolioRights"]:checked')?.value === 'yes',
        
        // Revisions
        freeRevisions: parseInt(document.getElementById('freeRevisions').value),
        revisionTime: parseInt(document.getElementById('revisionTime').value),
        additionalRevisionCost: parseFloat(document.getElementById('additionalRevisionCost').value) || 0,
        
        // Additional Provisions
        confidentialityClause: document.getElementById('confidentialityClause').checked,
        warrantyClause: document.getElementById('warrantyClause').checked,
        indemnificationClause: document.getElementById('indemnificationClause').checked,
        terminationClause: document.getElementById('terminationClause').checked,
        disputeResolution: document.getElementById('disputeResolution').checked,
        forceMAJEURE: document.getElementById('forceMAJEURE').checked,
        independentContractor: document.getElementById('independentContractor').checked,
        nonCompeteClause: document.getElementById('nonCompeteClause').checked,
        communicationProtocol: document.getElementById('communicationProtocol').checked,
        liabilityLimitation: document.getElementById('liabilityLimitation').checked,
        terminationNoticeDays: parseInt(document.getElementById('terminationNoticeDays').value),
        jurisdiction: document.getElementById('jurisdiction').value,
        additionalTerms: document.getElementById('additionalTerms').value.trim()
    };
    
    // Generate contract HTML
    const contractHTML = buildContractHTML(contractData);
    
    // Display output
    document.getElementById('contractOutput').innerHTML = contractHTML;
    document.getElementById('outputSection').classList.remove('hidden');
    document.getElementById('outputSection').scrollIntoView({ behavior: 'smooth' });
}

function buildContractHTML(data) {
    const currentDate = new Date().toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    const startDateFormatted = new Date(data.startDate).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    const completionDateFormatted = new Date(data.completionDate).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    const currencySymbol = getCurrencySymbol(data.currency);
    const amountFormatted = formatCurrency(data.contractAmount, data.currency);
    
    let html = `
        <div style="max-width: 800px; margin: 0 auto; padding: 40px; font-family: 'Times New Roman', serif; line-height: 1.8; color: #000;">
            
            <!-- Header -->
            <div style="text-align: center; margin-bottom: 30px;">
                <h1 style="font-size: 28px; font-weight: bold; text-decoration: underline; margin-bottom: 10px;">SERVICE AGREEMENT</h1>
                <p style="font-size: 14px; margin: 5px 0;"><strong>Contract Date:</strong> ${currentDate}</p>
                <p style="font-size: 14px; margin: 5px 0;"><strong>Contract Reference:</strong> SA-${Date.now().toString().slice(-6)}</p>
            </div>
            
            <!-- Parties Section -->
            <div style="margin-bottom: 25px; border: 2px solid #000; padding: 20px;">
                <h2 style="font-size: 18px; font-weight: bold; margin-bottom: 15px;">PARTIES TO THIS AGREEMENT</h2>
                
                <p style="margin-bottom: 15px;"><strong>This Service Agreement</strong> ("Agreement") is entered into on <strong>${currentDate}</strong> by and between:</p>
                
                <div style="margin-bottom: 20px; padding-left: 20px;">
                    <p style="margin-bottom: 8px;"><strong>SERVICE PROVIDER (First Party):</strong></p>
                    <p style="margin-left: 20px; margin-bottom: 5px;">Name: <strong>${data.providerName}</strong></p>
                    <p style="margin-left: 20px; margin-bottom: 5px;">Address: ${data.providerAddress}</p>
                    <p style="margin-left: 20px; margin-bottom: 5px;">Email: ${data.providerEmail}</p>
                    ${data.providerPhone ? `<p style="margin-left: 20px; margin-bottom: 5px;">Phone: ${data.providerPhone}</p>` : ''}
                    ${data.providerGST ? `<p style="margin-left: 20px; margin-bottom: 5px;">GST Number: ${data.providerGST}</p>` : ''}
                    <p style="margin-left: 20px; font-style: italic;">(Hereinafter referred to as "Provider" or "Service Provider")</p>
                </div>
                
                <div style="margin-bottom: 10px; padding-left: 20px;">
                    <p style="margin-bottom: 8px;"><strong>CLIENT (Second Party):</strong></p>
                    <p style="margin-left: 20px; margin-bottom: 5px;">Name: <strong>${data.clientName}</strong></p>
                    <p style="margin-left: 20px; margin-bottom: 5px;">Address: ${data.clientAddress}</p>
                    <p style="margin-left: 20px; margin-bottom: 5px;">Email: ${data.clientEmail}</p>
                    ${data.clientPhone ? `<p style="margin-left: 20px; margin-bottom: 5px;">Phone: ${data.clientPhone}</p>` : ''}
                    ${data.clientGST ? `<p style="margin-left: 20px; margin-bottom: 5px;">GST Number: ${data.clientGST}</p>` : ''}
                    <p style="margin-left: 20px; font-style: italic;">(Hereinafter referred to as "Client")</p>
                </div>
                
                <p style="margin-top: 15px;">The Provider and Client are collectively referred to as the "Parties" and individually as a "Party".</p>
            </div>
            
            <!-- Recitals -->
            <div style="margin-bottom: 25px;">
                <h2 style="font-size: 18px; font-weight: bold; margin-bottom: 15px;">RECITALS</h2>
                <p style="margin-bottom: 10px;"><strong>WHEREAS,</strong> the Provider is engaged in providing professional <strong>${getServiceCategoryName(data.serviceCategory)}</strong> services;</p>
                <p style="margin-bottom: 10px;"><strong>WHEREAS,</strong> the Client desires to engage the Provider to perform certain services as described in this Agreement;</p>
                <p style="margin-bottom: 10px;"><strong>WHEREAS,</strong> both Parties wish to set forth the terms and conditions under which the services will be provided;</p>
                <p style="margin-bottom: 10px;"><strong>NOW, THEREFORE,</strong> in consideration of the mutual covenants, promises, and agreements contained herein, and for other good and valuable consideration, the receipt and sufficiency of which are hereby acknowledged, the Parties agree as follows:</p>
            </div>
    `;
    
    // 1. SCOPE OF SERVICES
    html += `
            <div style="margin-bottom: 25px;">
                <h2 style="font-size: 18px; font-weight: bold; margin-bottom: 15px; border-bottom: 2px solid #000; padding-bottom: 5px;">1. SCOPE OF SERVICES</h2>
                
                <p style="margin-bottom: 10px;"><strong>1.1 Service Title:</strong> ${data.serviceTitle}</p>
                
                <p style="margin-bottom: 10px;"><strong>1.2 Detailed Description:</strong></p>
                <div style="margin-left: 20px; margin-bottom: 15px; padding: 15px; background-color: #f9f9f9; border-left: 4px solid #666;">
                    ${data.serviceDescription.replace(/\n/g, '<br>')}
                </div>
                
                <p style="margin-bottom: 10px;"><strong>1.3 Deliverables:</strong> The Provider agrees to deliver the following:</p>
                <div style="margin-left: 20px; margin-bottom: 15px;">
                    ${formatDeliverables(data.deliverables)}
                </div>
                
                <p style="margin-bottom: 10px;"><strong>1.4 Service Category:</strong> ${getServiceCategoryName(data.serviceCategory)}</p>
                
                <p style="margin-bottom: 10px;"><strong>1.5 Performance Standard:</strong> The Provider agrees to perform all services in a professional and workmanlike manner, consistent with industry standards and best practices.</p>
            </div>
    `;
    
    // 2. PROJECT TIMELINE
    html += `
            <div style="margin-bottom: 25px;">
                <h2 style="font-size: 18px; font-weight: bold; margin-bottom: 15px; border-bottom: 2px solid #000; padding-bottom: 5px;">2. PROJECT TIMELINE & DELIVERY</h2>
                
                <p style="margin-bottom: 10px;"><strong>2.1 Commencement Date:</strong> ${startDateFormatted}</p>
                
                <p style="margin-bottom: 10px;"><strong>2.2 Expected Completion Date:</strong> ${completionDateFormatted}</p>
                
                <p style="margin-bottom: 10px;"><strong>2.3 Delivery Schedule:</strong> The Provider shall deliver the work according to the timeline specified. Any delays shall be communicated in writing at least ${Math.floor(data.revisionTime / 2)} days in advance.</p>
                
                <p style="margin-bottom: 10px;"><strong>2.4 Deadline Extensions:</strong> Extensions to the completion date require written mutual consent from both Parties. Extensions due to Client's delayed feedback or change requests shall not be considered a breach by the Provider.</p>
                
                <p style="margin-bottom: 10px;"><strong>2.5 Client Cooperation:</strong> The Client agrees to provide timely feedback, necessary information, and materials required for the Provider to complete the work.</p>
            </div>
    `;
    
    // 3. FINANCIAL TERMS
    html += `
            <div style="margin-bottom: 25px;">
                <h2 style="font-size: 18px; font-weight: bold; margin-bottom: 15px; border-bottom: 2px solid #000; padding-bottom: 5px;">3. FINANCIAL TERMS & PAYMENT</h2>
                
                <p style="margin-bottom: 10px;"><strong>3.1 Contract Value:</strong> ${amountFormatted}</p>
                
                <p style="margin-bottom: 10px;"><strong>3.2 Payment Structure:</strong> ${getPaymentStructureText(data.paymentStructure)}</p>
    `;
    
    if (data.paymentStructure === 'milestone' && data.milestoneDetails) {
        html += `
                <div style="margin-left: 20px; margin-bottom: 15px; padding: 15px; background-color: #f0f8ff; border-left: 4px solid #4169e1;">
                    <p style="font-weight: bold; margin-bottom: 10px;">Milestone Payment Schedule:</p>
                    ${data.milestoneDetails.replace(/\n/g, '<br>')}
                </div>
        `;
    }
    
    if (data.paymentStructure === 'hourly') {
        html += `
                <p style="margin-left: 20px; margin-bottom: 10px;"><strong>Hourly Rate:</strong> ${currencySymbol}${data.hourlyRate.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}/hour</p>
                <p style="margin-left: 20px; margin-bottom: 10px;"><strong>Estimated Hours:</strong> ${data.estimatedHours} hours (Total: ${formatCurrency(data.hourlyRate * data.estimatedHours, data.currency)})</p>
                <p style="margin-left: 20px; margin-bottom: 10px;"><strong>Note:</strong> Actual billing will be based on time tracked. Client will receive detailed timesheets.</p>
        `;
    }
    
    html += `
                <p style="margin-bottom: 10px;"><strong>3.3 Payment Terms:</strong> Payment is due within <strong>${data.paymentTerms} days</strong> of invoice date (Net ${data.paymentTerms}).</p>
                
                <p style="margin-bottom: 10px;"><strong>3.4 Payment Method:</strong> Payments shall be made via bank transfer (NEFT/RTGS/IMPS), UPI, or as mutually agreed. Bank details will be provided on invoices.</p>
                
                <p style="margin-bottom: 10px;"><strong>3.5 Late Payment:</strong> Late payments shall attract a penalty of <strong>${data.lateFee}% per month</strong> (calculated on a pro-rata basis for partial months) on the outstanding amount.</p>
                
                ${data.gstClause ? `
                <p style="margin-bottom: 10px;"><strong>3.6 Goods & Services Tax (GST):</strong> All amounts stated are exclusive of GST. Applicable GST at the prevailing rate shall be added to the invoice amount. The Provider will issue a GST-compliant tax invoice.</p>
                ` : `
                <p style="margin-bottom: 10px;"><strong>3.6 All-Inclusive Amount:</strong> All amounts stated are inclusive of all applicable taxes. No additional charges will be levied unless explicitly agreed upon.</p>
                `}
                
                <p style="margin-bottom: 10px;"><strong>3.7 Invoicing:</strong> The Provider shall issue invoices as per the payment schedule. Invoices will include detailed breakdown of services rendered.</p>
                
                <p style="margin-bottom: 10px;"><strong>3.8 Currency:</strong> All payments shall be made in ${getCurrencyName(data.currency)}.</p>
            </div>
    `;
    
    // 4. REVISIONS & CHANGES
    html += `
            <div style="margin-bottom: 25px;">
                <h2 style="font-size: 18px; font-weight: bold; margin-bottom: 15px; border-bottom: 2px solid #000; padding-bottom: 5px;">4. REVISIONS & CHANGE REQUESTS</h2>
                
                <p style="margin-bottom: 10px;"><strong>4.1 Free Revisions:</strong> The Client is entitled to <strong>${data.freeRevisions} free revision round(s)</strong> within the scope of the original project.</p>
                
                <p style="margin-bottom: 10px;"><strong>4.2 Revision Scope:</strong> Revisions must be within the original scope of work. Changes that materially alter the scope will be treated as change requests.</p>
                
                <p style="margin-bottom: 10px;"><strong>4.3 Revision Turnaround:</strong> The Provider will complete revisions within <strong>${data.revisionTime} business days</strong> of receiving consolidated feedback.</p>
                
                ${data.additionalRevisionCost > 0 ? `
                <p style="margin-bottom: 10px;"><strong>4.4 Additional Revisions:</strong> Revisions beyond the free limit will be charged at <strong>${formatCurrency(data.additionalRevisionCost, data.currency)} per revision round</strong>.</p>
                ` : `
                <p style="margin-bottom: 10px;"><strong>4.4 Additional Revisions:</strong> Additional revisions beyond the free limit will be charged at a mutually agreed rate.</p>
                `}
                
                <p style="margin-bottom: 10px;"><strong>4.5 Change Request Process:</strong> Major changes to project scope require a written change order detailing the new requirements, timeline impact, and additional costs.</p>
                
                <p style="margin-bottom: 10px;"><strong>4.6 Client Feedback:</strong> The Client must provide consolidated feedback in writing within 7 days of delivery. Failure to provide feedback will be considered as acceptance.</p>
            </div>
    `;
    
    // 5. INTELLECTUAL PROPERTY RIGHTS
    html += `
            <div style="margin-bottom: 25px;">
                <h2 style="font-size: 18px; font-weight: bold; margin-bottom: 15px; border-bottom: 2px solid #000; padding-bottom: 5px;">5. INTELLECTUAL PROPERTY RIGHTS & OWNERSHIP</h2>
                
                ${getIPOwnershipText(data.ipOwnership, data.portfolioRights)}
                
                <p style="margin-bottom: 10px;"><strong>5.4 Pre-Existing Materials:</strong> Any pre-existing intellectual property of either Party shall remain the property of that Party.</p>
                
                <p style="margin-bottom: 10px;"><strong>5.5 Third-Party Materials:</strong> If third-party materials are used, the Provider warrants that all necessary licenses and permissions have been obtained.</p>
            </div>
    `;
    
    // 6. CONFIDENTIALITY
    if (data.confidentialityClause) {
        html += `
            <div style="margin-bottom: 25px;">
                <h2 style="font-size: 18px; font-weight: bold; margin-bottom: 15px; border-bottom: 2px solid #000; padding-bottom: 5px;">6. CONFIDENTIALITY & NON-DISCLOSURE</h2>
                
                <p style="margin-bottom: 10px;"><strong>6.1 Confidential Information:</strong> Both Parties acknowledge that they may receive confidential and proprietary information during the course of this Agreement.</p>
                
                <p style="margin-bottom: 10px;"><strong>6.2 Non-Disclosure Obligation:</strong> Each Party agrees to:</p>
                <ul style="margin-left: 40px; margin-bottom: 15px;">
                    <li>Keep all confidential information strictly confidential</li>
                    <li>Not disclose such information to third parties without written consent</li>
                    <li>Use confidential information solely for the purpose of this Agreement</li>
                    <li>Return or destroy confidential information upon request or termination</li>
                </ul>
                
                <p style="margin-bottom: 10px;"><strong>6.3 Exceptions:</strong> Confidentiality obligations do not apply to information that: (a) is publicly available through no breach of this Agreement, (b) was known prior to disclosure, (c) is independently developed, or (d) must be disclosed by law.</p>
                
                <p style="margin-bottom: 10px;"><strong>6.4 Duration:</strong> Confidentiality obligations shall survive for <strong>3 years</strong> after termination of this Agreement.</p>
            </div>
        `;
    }
    
    // 7. WARRANTIES
    if (data.warrantyClause) {
        html += `
            <div style="margin-bottom: 25px;">
                <h2 style="font-size: 18px; font-weight: bold; margin-bottom: 15px; border-bottom: 2px solid #000; padding-bottom: 5px;">7. WARRANTIES & REPRESENTATIONS</h2>
                
                <p style="margin-bottom: 10px;"><strong>7.1 Provider's Warranties:</strong> The Provider warrants that:</p>
                <ul style="margin-left: 40px; margin-bottom: 15px;">
                    <li>Services will be performed in a professional and workmanlike manner</li>
                    <li>Work will be original and will not infringe any third-party rights</li>
                    <li>Provider has the right and authority to enter into this Agreement</li>
                    <li>Deliverables will be free from material defects for 30 days from delivery</li>
                </ul>
                
                <p style="margin-bottom: 10px;"><strong>7.2 Client's Warranties:</strong> The Client warrants that:</p>
                <ul style="margin-left: 40px; margin-bottom: 15px;">
                    <li>All information provided to Provider is accurate and complete</li>
                    <li>Client has the right to use all materials provided to Provider</li>
                    <li>Client will pay all fees when due</li>
                </ul>
                
                <p style="margin-bottom: 10px;"><strong>7.3 Warranty Period:</strong> The Provider will correct any defects or errors in deliverables reported within 30 days of delivery at no additional charge.</p>
                
                <p style="margin-bottom: 10px;"><strong>7.4 DISCLAIMER:</strong> EXCEPT AS EXPRESSLY PROVIDED HEREIN, PROVIDER MAKES NO WARRANTIES, EXPRESS OR IMPLIED, INCLUDING WARRANTIES OF MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE.</p>
            </div>
        `;
    }
    
    // 8. INDEMNIFICATION
    if (data.indemnificationClause) {
        html += `
            <div style="margin-bottom: 25px;">
                <h2 style="font-size: 18px; font-weight: bold; margin-bottom: 15px; border-bottom: 2px solid #000; padding-bottom: 5px;">8. INDEMNIFICATION</h2>
                
                <p style="margin-bottom: 10px;"><strong>8.1 Provider's Indemnity:</strong> Provider shall indemnify, defend, and hold harmless Client against claims arising from: (a) Provider's breach of this Agreement, (b) intellectual property infringement by Provider's work, or (c) Provider's negligence or willful misconduct.</p>
                
                <p style="margin-bottom: 10px;"><strong>8.2 Client's Indemnity:</strong> Client shall indemnify, defend, and hold harmless Provider against claims arising from: (a) Client's breach of this Agreement, (b) Client's use of deliverables beyond the scope granted, or (c) materials provided by Client.</p>
                
                <p style="margin-bottom: 10px;"><strong>8.3 Indemnification Process:</strong> The indemnified party must promptly notify the indemnifying party of any claim and cooperate in the defense.</p>
            </div>
        `;
    }
    
    // 9. LIMITATION OF LIABILITY
    if (data.liabilityLimitation) {
        html += `
            <div style="margin-bottom: 25px;">
                <h2 style="font-size: 18px; font-weight: bold; margin-bottom: 15px; border-bottom: 2px solid #000; padding-bottom: 5px;">9. LIMITATION OF LIABILITY</h2>
                
                <p style="margin-bottom: 10px;"><strong>9.1 Liability Cap:</strong> EXCEPT FOR BREACH OF CONFIDENTIALITY OR INDEMNIFICATION OBLIGATIONS, EACH PARTY'S TOTAL CUMULATIVE LIABILITY SHALL NOT EXCEED THE TOTAL AMOUNT PAID OR PAYABLE UNDER THIS AGREEMENT (${amountFormatted}).</p>
                
                <p style="margin-bottom: 10px;"><strong>9.2 Excluded Damages:</strong> IN NO EVENT SHALL EITHER PARTY BE LIABLE FOR INDIRECT, INCIDENTAL, CONSEQUENTIAL, SPECIAL, OR PUNITIVE DAMAGES, INCLUDING LOST PROFITS, LOST REVENUE, OR LOSS OF DATA.</p>
                
                <p style="margin-bottom: 10px;"><strong>9.3 Essential Purpose:</strong> These limitations shall apply even if a remedy fails of its essential purpose.</p>
            </div>
        `;
    }
    
    // 10. INDEPENDENT CONTRACTOR
    if (data.independentContractor) {
        html += `
            <div style="margin-bottom: 25px;">
                <h2 style="font-size: 18px; font-weight: bold; margin-bottom: 15px; border-bottom: 2px solid #000; padding-bottom: 5px;">10. INDEPENDENT CONTRACTOR STATUS</h2>
                
                <p style="margin-bottom: 10px;"><strong>10.1 Relationship:</strong> Provider is an independent contractor and not an employee, partner, or agent of Client. This Agreement does not create any employment, partnership, joint venture, or agency relationship.</p>
                
                <p style="margin-bottom: 10px;"><strong>10.2 No Benefits:</strong> Provider is not entitled to any employee benefits from Client including provident fund, insurance, paid leave, or other statutory benefits.</p>
                
                <p style="margin-bottom: 10px;"><strong>10.3 Taxes:</strong> Provider is solely responsible for paying all applicable taxes, including income tax, GST, and any other taxes arising from payments under this Agreement.</p>
                
                <p style="margin-bottom: 10px;"><strong>10.4 Control:</strong> Provider has full control over how, when, and where the services are performed, subject to meeting the deliverables and deadlines.</p>
            </div>
        `;
    }
    
    // 11. TERMINATION
    if (data.terminationClause) {
        html += `
            <div style="margin-bottom: 25px;">
                <h2 style="font-size: 18px; font-weight: bold; margin-bottom: 15px; border-bottom: 2px solid #000; padding-bottom: 5px;">11. TERMINATION</h2>
                
                <p style="margin-bottom: 10px;"><strong>11.1 Termination for Convenience:</strong> Either Party may terminate this Agreement with <strong>${data.terminationNoticeDays} days</strong> written notice to the other Party.</p>
                
                <p style="margin-bottom: 10px;"><strong>11.2 Termination for Cause:</strong> Either Party may terminate immediately upon written notice if the other Party:</p>
                <ul style="margin-left: 40px; margin-bottom: 15px;">
                    <li>Materially breaches this Agreement and fails to cure within 7 days of written notice</li>
                    <li>Becomes insolvent or files for bankruptcy</li>
                    <li>Engages in fraud, gross negligence, or willful misconduct</li>
                </ul>
                
                <p style="margin-bottom: 10px;"><strong>11.3 Payment Upon Termination:</strong> Upon termination:</p>
                <ul style="margin-left: 40px; margin-bottom: 15px;">
                    <li>Client shall pay for all services rendered up to the termination date</li>
                    <li>Provider shall deliver all work-in-progress and project materials to Client</li>
                    <li>Provider shall refund any advance payment for unperformed services (if applicable)</li>
                </ul>
                
                <p style="margin-bottom: 10px;"><strong>11.4 Survival:</strong> Sections relating to payment, intellectual property, confidentiality, warranties, indemnification, and liability shall survive termination.</p>
            </div>
        `;
    }
    
    // 12. DISPUTE RESOLUTION
    if (data.disputeResolution) {
        html += `
            <div style="margin-bottom: 25px;">
                <h2 style="font-size: 18px; font-weight: bold; margin-bottom: 15px; border-bottom: 2px solid #000; padding-bottom: 5px;">12. DISPUTE RESOLUTION & ARBITRATION</h2>
                
                <p style="margin-bottom: 10px;"><strong>12.1 Amicable Resolution:</strong> In the event of any dispute, controversy, or claim arising out of or relating to this Agreement, the Parties shall first attempt to resolve the matter through good faith negotiations.</p>
                
                <p style="margin-bottom: 10px;"><strong>12.2 Mediation:</strong> If negotiations fail within 15 days, the Parties agree to attempt resolution through mediation before a mutually agreed mediator.</p>
                
                <p style="margin-bottom: 10px;"><strong>12.3 Arbitration:</strong> If mediation fails, disputes shall be resolved through binding arbitration under the Arbitration and Conciliation Act, 1996. The arbitration shall be conducted by a sole arbitrator mutually appointed by both Parties.</p>
                
                <p style="margin-bottom: 10px;"><strong>12.4 Jurisdiction:</strong> This Agreement shall be governed by the laws of India. The courts of <strong>${data.jurisdiction}</strong> shall have exclusive jurisdiction for any legal proceedings.</p>
                
                <p style="margin-bottom: 10px;"><strong>12.5 Arbitration Costs:</strong> Each Party shall bear its own costs of arbitration. The arbitrator's fees shall be split equally unless otherwise determined by the arbitrator.</p>
            </div>
        `;
    }
    
    // 13. FORCE MAJEURE
    if (data.forceMAJEURE) {
        html += `
            <div style="margin-bottom: 25px;">
                <h2 style="font-size: 18px; font-weight: bold; margin-bottom: 15px; border-bottom: 2px solid #000; padding-bottom: 5px;">13. FORCE MAJEURE</h2>
                
                <p style="margin-bottom: 10px;"><strong>13.1 Definition:</strong> "Force Majeure" means any event beyond the reasonable control of a Party, including but not limited to: acts of God, natural disasters, pandemics, epidemics, wars, terrorism, civil unrest, government actions, strikes, lockouts, internet outages, or other similar events.</p>
                
                <p style="margin-bottom: 10px;"><strong>13.2 Relief from Performance:</strong> Neither Party shall be liable for any failure or delay in performance due to Force Majeure events.</p>
                
                <p style="margin-bottom: 10px;"><strong>13.3 Notice:</strong> The affected Party must promptly notify the other Party in writing of the Force Majeure event and its expected duration.</p>
                
                <p style="margin-bottom: 10px;"><strong>13.4 Termination:</strong> If the Force Majeure event continues for more than 30 days, either Party may terminate this Agreement without liability.</p>
            </div>
        `;
    }
    
    // 14. NON-COMPETE (if applicable)
    if (data.nonCompeteClause) {
        html += `
            <div style="margin-bottom: 25px;">
                <h2 style="font-size: 18px; font-weight: bold; margin-bottom: 15px; border-bottom: 2px solid #000; padding-bottom: 5px;">14. NON-COMPETE CLAUSE</h2>
                
                <p style="margin-bottom: 10px;"><strong>14.1 Non-Compete Period:</strong> During the term of this Agreement and for 6 months thereafter, Provider agrees not to directly provide services to Client's direct competitors as identified by Client.</p>
                
                <p style="margin-bottom: 10px;"><strong>14.2 Scope:</strong> This restriction applies only to services identical or substantially similar to those provided under this Agreement.</p>
                
                <p style="margin-bottom: 10px;"><strong>14.3 Reasonableness:</strong> Both Parties acknowledge this restriction is reasonable and necessary to protect Client's legitimate business interests.</p>
            </div>
        `;
    }
    
    // 15. COMMUNICATION PROTOCOL
    if (data.communicationProtocol) {
        html += `
            <div style="margin-bottom: 25px;">
                <h2 style="font-size: 18px; font-weight: bold; margin-bottom: 15px; border-bottom: 2px solid #000; padding-bottom: 5px;">15. COMMUNICATION PROTOCOL</h2>
                
                <p style="margin-bottom: 10px;"><strong>15.1 Primary Communication:</strong> All official communications shall be via email to the addresses specified in this Agreement.</p>
                
                <p style="margin-bottom: 10px;"><strong>15.2 Response Time:</strong> Both Parties agree to respond to non-urgent communications within 2 business days and urgent matters within 24 hours.</p>
                
                <p style="margin-bottom: 10px;"><strong>15.3 Project Updates:</strong> Provider shall provide regular project status updates as mutually agreed.</p>
                
                <p style="margin-bottom: 10px;"><strong>15.4 Meeting Schedule:</strong> Parties may schedule regular check-in meetings via video call, phone, or in-person as needed.</p>
            </div>
        `;
    }
    
    // GENERAL PROVISIONS
    html += `
            <div style="margin-bottom: 25px;">
                <h2 style="font-size: 18px; font-weight: bold; margin-bottom: 15px; border-bottom: 2px solid #000; padding-bottom: 5px;">GENERAL PROVISIONS</h2>
                
                <p style="margin-bottom: 10px;"><strong>Entire Agreement:</strong> This Agreement constitutes the entire agreement between the Parties and supersedes all prior negotiations, representations, and agreements.</p>
                
                <p style="margin-bottom: 10px;"><strong>Amendments:</strong> This Agreement may only be amended by written document signed by both Parties.</p>
                
                <p style="margin-bottom: 10px;"><strong>Severability:</strong> If any provision is found invalid or unenforceable, the remaining provisions shall continue in full force and effect.</p>
                
                <p style="margin-bottom: 10px;"><strong>Waiver:</strong> Failure to enforce any provision shall not constitute a waiver of that provision or any other provision.</p>
                
                <p style="margin-bottom: 10px;"><strong>Assignment:</strong> Neither Party may assign this Agreement without the prior written consent of the other Party.</p>
                
                <p style="margin-bottom: 10px;"><strong>Notices:</strong> All notices must be in writing and sent to the email addresses specified in this Agreement.</p>
                
                <p style="margin-bottom: 10px;"><strong>Counterparts:</strong> This Agreement may be executed in counterparts, each of which shall be deemed an original.</p>
                
                <p style="margin-bottom: 10px;"><strong>Headings:</strong> Section headings are for convenience only and do not affect interpretation.</p>
            </div>
    `;
    
    // ADDITIONAL TERMS
    if (data.additionalTerms) {
        html += `
            <div style="margin-bottom: 25px;">
                <h2 style="font-size: 18px; font-weight: bold; margin-bottom: 15px; border-bottom: 2px solid #000; padding-bottom: 5px;">ADDITIONAL TERMS & CONDITIONS</h2>
                <div style="margin-left: 20px; padding: 15px; background-color: #fffacd; border-left: 4px solid #ffd700;">
                    ${data.additionalTerms.replace(/\n/g, '<br>')}
                </div>
            </div>
        `;
    }
    
    // ACKNOWLEDGMENT & SIGNATURES
    html += `
            <div style="margin-bottom: 25px;">
                <h2 style="font-size: 18px; font-weight: bold; margin-bottom: 15px; border-bottom: 2px solid #000; padding-bottom: 5px;">ACKNOWLEDGMENT & ACCEPTANCE</h2>
                
                <p style="margin-bottom: 20px;">IN WITNESS WHEREOF, the Parties have executed this Service Agreement as of the date first written above.</p>
                
                <div style="margin-top: 60px; display: flex; justify-content: space-between; gap: 40px;">
                    <div style="flex: 1;">
                        <div style="border-bottom: 2px solid #000; margin-bottom: 10px; padding-bottom: 40px;"></div>
                        <p style="font-weight: bold; margin-bottom: 5px;">${data.providerName}</p>
                        <p style="margin-bottom: 5px;">SERVICE PROVIDER (First Party)</p>
                        <p style="margin-bottom: 5px;">Signature: _____________________</p>
                        <p style="margin-bottom: 5px;">Date: _____________________</p>
                        <p style="margin-bottom: 5px;">Place: _____________________</p>
                    </div>
                    
                    <div style="flex: 1;">
                        <div style="border-bottom: 2px solid #000; margin-bottom: 10px; padding-bottom: 40px;"></div>
                        <p style="font-weight: bold; margin-bottom: 5px;">${data.clientName}</p>
                        <p style="margin-bottom: 5px;">CLIENT (Second Party)</p>
                        <p style="margin-bottom: 5px;">Signature: _____________________</p>
                        <p style="margin-bottom: 5px;">Date: _____________________</p>
                        <p style="margin-bottom: 5px;">Place: _____________________</p>
                    </div>
                </div>
            </div>
            
            <!-- Witness Section (Optional) -->
            <div style="margin-top: 40px; margin-bottom: 25px;">
                <h3 style="font-size: 16px; font-weight: bold; margin-bottom: 15px;">WITNESSES (Optional but Recommended)</h3>
                
                <div style="margin-top: 40px; display: flex; justify-content: space-between; gap: 40px;">
                    <div style="flex: 1;">
                        <div style="border-bottom: 2px solid #000; margin-bottom: 10px; padding-bottom: 30px;"></div>
                        <p style="margin-bottom: 5px;">Witness 1</p>
                        <p style="margin-bottom: 5px;">Name: _____________________</p>
                        <p style="margin-bottom: 5px;">Signature: _____________________</p>
                        <p style="margin-bottom: 5px;">Date: _____________________</p>
                    </div>
                    
                    <div style="flex: 1;">
                        <div style="border-bottom: 2px solid #000; margin-bottom: 10px; padding-bottom: 30px;"></div>
                        <p style="margin-bottom: 5px;">Witness 2</p>
                        <p style="margin-bottom: 5px;">Name: _____________________</p>
                        <p style="margin-bottom: 5px;">Signature: _____________________</p>
                        <p style="margin-bottom: 5px;">Date: _____________________</p>
                    </div>
                </div>
            </div>
            
            <!-- Footer -->
            <div style="margin-top: 50px; padding-top: 20px; border-top: 2px solid #000; text-align: center; font-size: 12px; color: #666;">
                <p style="margin-bottom: 10px;"><strong>IMPORTANT LEGAL NOTICE</strong></p>
                <p style="margin-bottom: 5px;">This is a legally binding agreement. Both Parties should retain signed copies.</p>
                <p style="margin-bottom: 5px;">It is recommended that each Party initial every page of this agreement.</p>
                <p style="margin-bottom: 5px;">For contracts exceeding ₹10 lakhs, consider notarization and registration.</p>
                <p style="margin-top: 15px; font-style: italic;">Generated using ShramKavach Contract Generator | ${currentDate}</p>
            </div>
            
        </div>
    `;
    
    return html;
}

// Helper Functions
function getCurrencySymbol(currency) {
    const symbols = {
        'INR': '₹',
        'USD': '$',
        'EUR': '€',
        'GBP': '£'
    };
    return symbols[currency] || currency;
}

function getCurrencyName(currency) {
    const names = {
        'INR': 'Indian Rupees (INR)',
        'USD': 'US Dollars (USD)',
        'EUR': 'Euros (EUR)',
        'GBP': 'British Pounds (GBP)'
    };
    return names[currency] || currency;
}

function formatCurrency(amount, currency) {
    const symbol = getCurrencySymbol(currency);
    return `${symbol}${amount.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
}

function getServiceCategoryName(category) {
    const categories = {
        'web-development': 'Web Development',
        'mobile-app': 'Mobile App Development',
        'graphic-design': 'Graphic Design',
        'content-writing': 'Content Writing & Copywriting',
        'digital-marketing': 'Digital Marketing',
        'seo': 'SEO Services',
        'consulting': 'Business Consulting',
        'accounting': 'Accounting & Tax Services',
        'legal': 'Legal Services',
        'photography': 'Photography & Videography',
        'translation': 'Translation Services',
        'data-entry': 'Data Entry & Virtual Assistant',
        'software': 'Software Development',
        'other': 'Other Professional Services'
    };
    return categories[category] || category;
}

function getPaymentStructureText(structure) {
    const structures = {
        'full-advance': '100% payment in advance before commencement of work.',
        '50-50': '50% advance payment upon signing this agreement, balance 50% upon completion and delivery.',
        '30-70': '30% advance payment upon signing this agreement, balance 70% upon completion and delivery.',
        'milestone': 'Payment in milestones as detailed below:',
        'monthly': 'Monthly retainer payments on the first day of each month.',
        'hourly': 'Hourly rate billing as detailed below:',
        'full-delivery': '100% payment upon successful completion and delivery of all work.'
    };
    return structures[structure] || structure;
}

function getIPOwnershipText(ownership, portfolioRights) {
    let text = '';
    
    switch(ownership) {
        case 'client-full':
            text = `
                <p style="margin-bottom: 10px;"><strong>5.1 Full Ownership Transfer:</strong> Upon receipt of full payment, all intellectual property rights, including copyrights, in the deliverables shall be transferred to the Client. The Provider retains no rights to the work.</p>
                <p style="margin-bottom: 10px;"><strong>5.2 Assignment:</strong> Provider hereby assigns, transfers, and conveys to Client all rights, title, and interest in and to the deliverables.</p>
                <p style="margin-bottom: 10px;"><strong>5.3 Moral Rights:</strong> To the extent permitted by law, Provider waives all moral rights in the deliverables.</p>
            `;
            if (portfolioRights) {
                text += `<p style="margin-bottom: 10px;"><strong>Portfolio Usage:</strong> Provider may display the work in their portfolio for marketing purposes, with Client attribution.</p>`;
            }
            break;
            
        case 'shared':
            text = `
                <p style="margin-bottom: 10px;"><strong>5.1 Shared Rights:</strong> Upon full payment, Client receives unlimited, perpetual, non-exclusive license to use the deliverables for their business purposes.</p>
                <p style="margin-bottom: 10px;"><strong>5.2 Provider's Rights:</strong> Provider retains copyright and may use the work in their portfolio, for self-promotion, and in similar projects for other clients.</p>
                <p style="margin-bottom: 10px;"><strong>5.3 Attribution:</strong> When Provider displays the work, appropriate credit shall be given to the Client (unless Client requests anonymity).</p>
            `;
            break;
            
        case 'provider':
            text = `
                <p style="margin-bottom: 10px;"><strong>5.1 Provider Ownership:</strong> Provider retains all intellectual property rights in the deliverables. Client receives a limited, non-exclusive, non-transferable license to use the work.</p>
                <p style="margin-bottom: 10px;"><strong>5.2 License Scope:</strong> Client may use the deliverables for their internal business purposes but may not resell, sublicense, or transfer the work to third parties.</p>
                <p style="margin-bottom: 10px;"><strong>5.3 Restrictions:</strong> Client shall not modify, reverse engineer, or create derivative works from the deliverables without Provider's written consent.</p>
            `;
            break;
            
        case 'delayed':
            text = `
                <p style="margin-bottom: 10px;"><strong>5.1 Conditional Transfer:</strong> Intellectual property rights shall transfer to Client only upon receipt of final payment in full.</p>
                <p style="margin-bottom: 10px;"><strong>5.2 Interim Rights:</strong> Until final payment, Provider retains all rights, and Client has a limited license solely for review and approval purposes.</p>
                <p style="margin-bottom: 10px;"><strong>5.3 Payment Default:</strong> If final payment is not received within 30 days of due date, all rights revert to Provider, and Client must cease all use.</p>
            `;
            if (portfolioRights) {
                text += `<p style="margin-bottom: 10px;"><strong>Portfolio Usage:</strong> Provider may display the work in their portfolio for marketing purposes.</p>`;
            }
            break;
    }
    
    return text;
}

function formatDeliverables(deliverables) {
    const lines = deliverables.split('\n').filter(line => line.trim());
    let formatted = '<ul style="list-style-type: disc;">';
    lines.forEach(line => {
        const cleaned = line.trim().replace(/^[-•*]\s*/, '');
        if (cleaned) {
            formatted += `<li style="margin-bottom: 5px;">${cleaned}</li>`;
        }
    });
    formatted += '</ul>';
    return formatted;
}

// Action Buttons
function printContract() {
    window.print();
}

function downloadContract() {
    const element = document.getElementById('contractOutput');
    const opt = {
        margin: [10, 10, 10, 10],
        filename: `Service_Contract_${Date.now()}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    
    // Use html2pdf if available
    if (typeof html2pdf !== 'undefined') {
        html2pdf().set(opt).from(element).save();
    } else {
        alert('PDF generation library not loaded. Please use Print instead.');
        window.print();
    }
}

function copyContract() {
    const element = document.getElementById('contractOutput');
    const text = element.innerText;
    
    navigator.clipboard.writeText(text).then(() => {
        alert('✅ Contract copied to clipboard!');
    }).catch(err => {
        console.error('Copy failed:', err);
        alert('❌ Failed to copy. Please select and copy manually.');
    });
}

console.log('✅ ShramKavach Service Contract Generator Loaded');
