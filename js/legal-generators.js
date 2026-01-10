// Legal Document Generators - Complete Implementation
// All generators work client-side, no data sent to servers

class LegalDocumentGenerator {
    constructor() {
        this.initializeGenerators();
    }

    initializeGenerators() {
        // Attach event listeners to all generator buttons
        document.addEventListener('DOMContentLoaded', () => {
            this.attachGeneratorListeners();
        });
    }

    attachGeneratorListeners() {
        const generators = {
            'privacy-policy': () => this.generatePrivacyPolicy(),
            'contract': () => this.generateContract(),
            'invoice': () => this.generateInvoice(),
            'quotation': () => this.generateQuotation(),
            'termination': () => this.generateTerminationLetter(),
            'payment-reminder': () => this.generatePaymentReminder(),
            'legal-notice': () => this.generateLegalNotice(),
            'nda': () => this.generateNDA(),
            'work-agreement': () => this.generateWorkAgreement(),
            'complaint': () => this.generateComplaint(),
            'grievance': () => this.generateGrievance(),
            'income-certificate': () => this.generateIncomeCertificate(),
            'experience-letter': () => this.generateExperienceLetter(),
            'payment-terms': () => this.generatePaymentTerms(),
            'ip-rights': () => this.generateIPRights(),
            'refund-policy': () => this.generateRefundPolicy(),
            'terms-conditions': () => this.generateTermsConditions(),
            'sla': () => this.generateSLA(),
            'non-compete': () => this.generateNonCompete(),
            'liability-waiver': () => this.generateLiabilityWaiver(),
            'testimonial-release': () => this.generateTestimonialRelease(),
            'partnership': () => this.generatePartnership(),
            'work-log': () => this.generateWorkLog(),
            'expense-report': () => this.generateExpenseReport(),
            'accident-report': () => this.generateAccidentReport(),
            'character-certificate': () => this.generateCharacterCertificate(),
            'advance-request': () => this.generateAdvanceRequest(),
            'clearance-certificate': () => this.generateClearanceCertificate(),
            'rate-card': () => this.generateRateCard()
        };

        // Attach listeners
        Object.keys(generators).forEach(id => {
            const btn = document.getElementById(`btn-${id}`);
            if (btn) {
                btn.addEventListener('click', generators[id]);
            }
        });
    }

    // Modal for collecting user inputs - Enhanced with better UX
    showInputModal(title, fields, callback) {
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-fadeIn';
        modal.style.animation = 'fadeIn 0.2s ease-out';
        
        // Calculate progress based on required fields
        const requiredFields = fields.filter(f => f.required !== false).length;
        
        modal.innerHTML = `
            <style>
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes slideUp {
                    from { transform: translateY(20px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
                .modal-content {
                    animation: slideUp 0.3s ease-out;
                }
                .progress-bar {
                    transition: width 0.3s ease;
                }
                .field-error {
                    display: none;
                    color: #DC2626;
                    font-size: 0.875rem;
                    margin-top: 0.25rem;
                }
                .input-error {
                    border-color: #DC2626 !important;
                }
                .input-success {
                    border-color: #10B981 !important;
                }
                .floating-label {
                    position: absolute;
                    left: 1rem;
                    top: 0.75rem;
                    pointer-events: none;
                    transition: all 0.2s ease;
                    color: #6B7280;
                }
                .input-wrapper input:focus ~ .floating-label,
                .input-wrapper input:not(:placeholder-shown) ~ .floating-label,
                .input-wrapper textarea:focus ~ .floating-label,
                .input-wrapper textarea:not(:placeholder-shown) ~ .floating-label,
                .input-wrapper select:focus ~ .floating-label,
                .input-wrapper select:not([value=""]) ~ .floating-label {
                    top: -0.5rem;
                    left: 0.75rem;
                    font-size: 0.75rem;
                    background: white;
                    padding: 0 0.25rem;
                    color: #4F46E5;
                }
            </style>
            <div class="modal-content bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
                <!-- Header with Progress -->
                <div class="sticky top-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white p-6 relative">
                    <button type="button" class="absolute top-4 right-4 text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-all" onclick="this.closest('.fixed').remove()" aria-label="Close">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                    <div class="pr-12">
                        <h2 class="text-2xl md:text-3xl font-bold mb-2">${title}</h2>
                        <p class="text-sm opacity-90 flex items-center gap-2">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                            </svg>
                            100% Private - All data stays in your browser
                        </p>
                    </div>
                    <!-- Progress Bar -->
                    <div class="mt-4 bg-white bg-opacity-20 rounded-full h-2 overflow-hidden">
                        <div id="progress-bar" class="progress-bar bg-white h-full" style="width: 0%"></div>
                    </div>
                    <p id="progress-text" class="text-xs mt-2 opacity-75">0 of ${requiredFields} fields completed</p>
                </div>

                <!-- Form Content -->
                <form id="generator-form" class="p-6 md:p-8 space-y-6 overflow-y-auto" style="max-height: calc(90vh - 200px);">
                    ${fields.map((field, index) => this.createFormField(field, index)).join('')}
                    
                    <!-- Action Buttons -->
                    <div class="sticky bottom-0 bg-white pt-6 pb-2 border-t border-gray-200 flex flex-col sm:flex-row gap-3">
                        <button type="submit" id="submit-btn" class="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            Generate Document
                        </button>
                        <button type="button" class="px-8 py-4 border-2 border-gray-300 rounded-xl font-bold text-lg hover:bg-gray-50 transition-all hover:border-gray-400" onclick="this.closest('.fixed').remove()">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        `;

        document.body.appendChild(modal);

        // Close on backdrop click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });

        // Close on Escape key
        const escapeHandler = (e) => {
            if (e.key === 'Escape') {
                modal.remove();
                document.removeEventListener('keydown', escapeHandler);
            }
        };
        document.addEventListener('keydown', escapeHandler);

        const form = modal.querySelector('form');
        const progressBar = modal.querySelector('#progress-bar');
        const progressText = modal.querySelector('#progress-text');
        const submitBtn = modal.querySelector('#submit-btn');

        // Track field completion
        let completedFields = 0;
        const updateProgress = () => {
            completedFields = 0;
            fields.filter(f => f.required !== false).forEach(field => {
                const input = form.querySelector(`[name="${field.name}"]`);
                if (input && input.value.trim()) {
                    completedFields++;
                }
            });
            const progress = (completedFields / requiredFields) * 100;
            progressBar.style.width = `${progress}%`;
            progressText.textContent = `${completedFields} of ${requiredFields} fields completed`;
        };

        // Add input validation and progress tracking
        form.querySelectorAll('input, textarea, select').forEach(input => {
            // Real-time validation
            input.addEventListener('input', () => {
                updateProgress();
                this.validateField(input);
                
                // Character counter for textareas
                if (input.tagName === 'TEXTAREA') {
                    const charCount = input.parentElement.querySelector('.char-count');
                    if (charCount) {
                        charCount.textContent = input.value.length;
                    }
                }
            });

            input.addEventListener('blur', () => {
                this.validateField(input);
            });

            // Focus effect with smooth animation
            input.addEventListener('focus', () => {
                input.parentElement.style.transform = 'scale(1.01)';
                input.parentElement.style.transition = 'transform 0.2s ease-out';
                input.style.boxShadow = '0 0 0 3px rgba(79, 70, 229, 0.1)';
            });

            input.addEventListener('blur', () => {
                input.parentElement.style.transform = 'scale(1)';
                input.style.boxShadow = 'none';
            });
        });

        // Form submission with validation
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Validate all fields
            let isValid = true;
            form.querySelectorAll('input, textarea, select').forEach(input => {
                if (!this.validateField(input)) {
                    isValid = false;
                }
            });

            if (!isValid) {
                // Scroll to first error
                const firstError = form.querySelector('.input-error');
                if (firstError) {
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
                return;
            }

            // Show loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = `
                <svg class="animate-spin w-6 h-6" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating...
            `;

            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            
            // Simulate brief processing time for better UX
            setTimeout(() => {
                modal.remove();
                document.removeEventListener('keydown', escapeHandler);
                callback(data);
            }, 500);
        });
    }

    // Field validation
    validateField(input) {
        const value = input.value.trim();
        const isRequired = input.hasAttribute('required');
        const type = input.type;
        const errorDiv = input.parentElement.querySelector('.field-error');

        // Clear previous states
        input.classList.remove('input-error', 'input-success');
        if (errorDiv) errorDiv.style.display = 'none';

        // Required field check
        if (isRequired && !value) {
            if (input !== document.activeElement) { // Don't show error while typing
                input.classList.add('input-error');
                if (errorDiv) {
                    errorDiv.textContent = 'This field is required';
                    errorDiv.style.display = 'block';
                }
                return false;
            }
            return true;
        }

        // Type-specific validation
        if (value) {
            let isValid = true;
            let errorMsg = '';

            switch(type) {
                case 'email':
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    isValid = emailRegex.test(value);
                    errorMsg = 'Please enter a valid email address';
                    break;
                case 'tel':
                    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
                    isValid = phoneRegex.test(value) && value.replace(/\D/g, '').length >= 10;
                    errorMsg = 'Please enter a valid phone number';
                    break;
                case 'number':
                    isValid = !isNaN(value) && parseFloat(value) >= 0;
                    errorMsg = 'Please enter a valid number';
                    break;
                case 'url':
                    try {
                        new URL(value);
                        isValid = true;
                    } catch {
                        isValid = false;
                        errorMsg = 'Please enter a valid URL';
                    }
                    break;
            }

            if (!isValid) {
                input.classList.add('input-error');
                if (errorDiv) {
                    errorDiv.textContent = errorMsg;
                    errorDiv.style.display = 'block';
                }
                return false;
            } else {
                input.classList.add('input-success');
            }
        }

        return true;
    }

    createFormField(field, index) {
        const { name, label, type = 'text', required = true, placeholder = '', options = [], help = '' } = field;
        const fieldId = `field-${name}-${index}`;
        const requiredMark = required ? '<span class="text-red-500 ml-1">*</span>' : '';
        const helpText = help ? `<p class="text-xs text-gray-500 mt-1">${help}</p>` : '';

        // Common input classes with better styling
        const inputClasses = 'w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition-all duration-200 text-gray-800 placeholder-gray-400';

        if (type === 'textarea') {
            return `
                <div class="input-wrapper relative group">
                    <label for="${fieldId}" class="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-1">
                        <svg class="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                        </svg>
                        ${label}${requiredMark}
                    </label>
                    <textarea 
                        id="${fieldId}"
                        name="${name}" 
                        ${required ? 'required' : ''} 
                        placeholder="${placeholder || `Enter ${label.toLowerCase()}...`}" 
                        rows="4" 
                        class="${inputClasses} resize-none"
                    ></textarea>
                    <div class="field-error"></div>
                    ${helpText}
                    <div class="absolute bottom-2 right-2 text-xs text-gray-400 pointer-events-none">
                        <span class="char-count">0</span> characters
                    </div>
                </div>
            `;
        } else if (type === 'select') {
            return `
                <div class="input-wrapper relative group">
                    <label for="${fieldId}" class="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-1">
                        <svg class="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                        </svg>
                        ${label}${requiredMark}
                    </label>
                    <div class="relative">
                        <select 
                            id="${fieldId}"
                            name="${name}" 
                            ${required ? 'required' : ''} 
                            class="${inputClasses} appearance-none cursor-pointer bg-white pr-10"
                        >
                            <option value="">Select ${label}</option>
                            ${options.map(opt => `<option value="${opt}">${opt}</option>`).join('')}
                        </select>
                        <svg class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </div>
                    <div class="field-error"></div>
                    ${helpText}
                </div>
            `;
        } else if (type === 'date') {
            return `
                <div class="input-wrapper relative group">
                    <label for="${fieldId}" class="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-1">
                        <svg class="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                        </svg>
                        ${label}${requiredMark}
                    </label>
                    <input 
                        id="${fieldId}"
                        type="date" 
                        name="${name}" 
                        ${required ? 'required' : ''} 
                        class="${inputClasses}"
                    >
                    <div class="field-error"></div>
                    ${helpText}
                </div>
            `;
        } else if (type === 'number') {
            return `
                <div class="input-wrapper relative group">
                    <label for="${fieldId}" class="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-1">
                        <svg class="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"></path>
                        </svg>
                        ${label}${requiredMark}
                    </label>
                    <div class="relative">
                        <input 
                            id="${fieldId}"
                            type="number" 
                            name="${name}" 
                            ${required ? 'required' : ''} 
                            placeholder="${placeholder || '0'}" 
                            min="0"
                            step="any"
                            class="${inputClasses}"
                        >
                        <svg class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                        </svg>
                    </div>
                    <div class="field-error"></div>
                    ${helpText}
                </div>
            `;
        } else if (type === 'email') {
            return `
                <div class="input-wrapper relative group">
                    <label for="${fieldId}" class="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-1">
                        <svg class="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                        </svg>
                        ${label}${requiredMark}
                    </label>
                    <div class="relative">
                        <input 
                            id="${fieldId}"
                            type="email" 
                            name="${name}" 
                            ${required ? 'required' : ''} 
                            placeholder="${placeholder || 'example@email.com'}" 
                            class="${inputClasses} pl-10"
                        >
                        <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"></path>
                        </svg>
                    </div>
                    <div class="field-error"></div>
                    ${helpText}
                </div>
            `;
        } else if (type === 'tel') {
            return `
                <div class="input-wrapper relative group">
                    <label for="${fieldId}" class="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-1">
                        <svg class="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                        </svg>
                        ${label}${requiredMark}
                    </label>
                    <div class="relative">
                        <input 
                            id="${fieldId}"
                            type="tel" 
                            name="${name}" 
                            ${required ? 'required' : ''} 
                            placeholder="${placeholder || '+91 9876543210'}" 
                            class="${inputClasses} pl-10"
                        >
                        <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                        </svg>
                    </div>
                    <div class="field-error"></div>
                    ${helpText}
                </div>
            `;
        } else {
            return `
                <div class="input-wrapper relative group">
                    <label for="${fieldId}" class="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-1">
                        <svg class="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                        </svg>
                        ${label}${requiredMark}
                    </label>
                    <input 
                        id="${fieldId}"
                        type="${type}" 
                        name="${name}" 
                        ${required ? 'required' : ''} 
                        placeholder="${placeholder || `Enter ${label.toLowerCase()}...`}" 
                        class="${inputClasses}"
                    >
                    <div class="field-error"></div>
                    ${helpText}
                </div>
            `;
        }
    }

    // Download as PDF
    downloadAsPDF(content, filename) {
        // Create a styled A4 document
        const printWindow = window.open('', '', 'width=210mm,height=297mm');
        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>${filename}</title>
                <meta charset="UTF-8">
                <style>
                    @page {
                        size: A4;
                        margin: 20mm;
                    }
                    @media print {
                        body {
                            width: 210mm;
                            height: 297mm;
                        }
                        .page-break {
                            page-break-before: always;
                        }
                    }
                    * {
                        box-sizing: border-box;
                    }
                    body { 
                        font-family: 'Georgia', 'Times New Roman', serif; 
                        padding: 25mm;
                        margin: 0;
                        line-height: 1.6; 
                        color: #1a1a1a;
                        font-size: 9pt;
                        background: white;
                    }
                    h1 { 
                        color: #1e40af; 
                        border-bottom: 4px solid #1e40af; 
                        padding-bottom: 10px; 
                        margin-bottom: 20px;
                        font-size: 18pt;
                        font-weight: bold;
                        text-transform: uppercase;
                        letter-spacing: 1px;
                    }
                    h2 { 
                        color: #3b82f6; 
                        margin-top: 25px; 
                        margin-bottom: 12px;
                        font-size: 11pt;
                        font-weight: bold;
                        border-left: 4px solid #3b82f6;
                        padding-left: 10px;
                    }
                    h3 {
                        color: #4b5563;
                        font-size: 10pt;
                        margin-top: 15px;
                        margin-bottom: 8px;
                        font-weight: 600;
                    }
                    .meta { 
                        background: #f0f9ff; 
                        padding: 15px; 
                        border-radius: 0;
                        border-left: 4px solid #1e40af;
                        margin: 20px 0; 
                        line-height: 1.6;
                    }
                    .meta p {
                        margin: 6px 0;
                    }
                    .section { 
                        margin: 20px 0; 
                        text-align: justify;
                    }
                    .section p {
                        margin: 10px 0;
                        line-height: 1.6;
                    }
                    .footer { 
                        margin-top: 40px; 
                        padding-top: 20px; 
                        border-top: 3px double #9ca3af; 
                        font-size: 7pt; 
                        color: #6b7280; 
                        text-align: center;
                        line-height: 1.4;
                    }
                    ul { 
                        margin-left: 20px; 
                        margin-top: 10px;
                        margin-bottom: 10px;
                    }
                    li { 
                        margin: 8px 0; 
                        line-height: 1.5;
                    }
                    ol {
                        margin-left: 20px;
                        margin-top: 10px;
                        margin-bottom: 10px;
                    }
                    ol li {
                        margin: 8px 0;
                        line-height: 1.5;
                    }
                    strong { 
                        color: #111827; 
                        font-weight: 700;
                    }
                    .highlight {
                        background: #fef3c7;
                        padding: 2px 4px;
                        border-radius: 2px;
                    }
                    .signature-block {
                        margin-top: 40px;
                        display: flex;
                        justify-content: space-between;
                        page-break-inside: avoid;
                    }
                    .signature-box {
                        width: 45%;
                        border: 2px solid #d1d5db;
                        padding: 20px;
                        min-height: 100px;
                    }
                    table {
                        width: 100%;
                        border-collapse: collapse;
                        margin: 15px 0;
                    }
                    th, td {
                        border: 1px solid #d1d5db;
                        padding: 10px;
                        text-align: left;
                    }
                    th {
                        background: #f3f4f6;
                        font-weight: bold;
                    }
                    .watermark {
                        position: fixed;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%) rotate(-45deg);
                        font-size: 72pt;
                        color: rgba(0, 0, 0, 0.03);
                        z-index: -1;
                        font-weight: bold;
                    }
                    .header-logo {
                        text-align: center;
                        margin-bottom: 20px;
                        color: #1e40af;
                        font-size: 10pt;
                        font-weight: 600;
                    }
                </style>
            </head>
            <body>
                <div class="watermark">ShramKavach</div>
                <div class="header-logo">
                    ShramKavach - श्रम कवच<br>
                    Worker Rights & Protection Platform
                </div>
                ${content}
                <div class="footer">
                    <p><strong>Generated by ShramKavach (श्रम कवच)</strong></p>
                    <p>Worker Rights & Protection Platform | Empowering Indian Gig Workers</p>
                    <p><strong>Document Generation Date:</strong> ${new Date().toLocaleString('en-IN', { dateStyle: 'full', timeStyle: 'short' })}</p>
                    <p style="margin-top: 10px; font-size: 8pt;">
                        ⚡ This document was generated client-side with zero data storage. Your privacy is protected.<br>
                        🌐 Visit: https://shramkavach.com | 📧 Contact: shramkavach@gmail.com<br>
                        ⚖️ For legal advice, please consult a qualified attorney. This is a template for informational purposes.
                    </p>
                </div>
            </body>
            </html>
        `);
        printWindow.document.close();
        setTimeout(() => {
            printWindow.print();
            // Show share prompt after generating document
            this.showSharePrompt(filename);
        }, 500);
    }

    // Show share prompt after document generation
    showSharePrompt(filename) {
        const shareMessages = [
            `Just created my ${filename}!\\n\\nProfessional documents बनाने का सबसे आसान तरीका!\\n\\nTry it free:\\n`,
            `${filename} generated!\\n\\n100% free & private - शून्य data storage\\n\\nCreate yours:\\n`,
            `Professional ${filename} ready!\\n\\nBest free tool for freelancers\\n\\nCheck it out:\\n`,
            `${filename} बना लिया in 2 minutes!\\n\\nFree legal templates for all\\n\\nGenerate yours:\\n`
        ];
        
        const randomMsg = shareMessages[Math.floor(Math.random() * shareMessages.length)];
        const shareUrl = `${window.location.origin}/protection.html`;
        
        // Create share dialog
        setTimeout(() => {
            const shareDialog = document.createElement('div');
            shareDialog.className = 'fixed inset-0 bg-black bg-opacity-50 z-[10000] flex items-center justify-center p-4';
            shareDialog.innerHTML = `
                <div class="bg-white rounded-2xl max-w-md w-full p-6 animate-[slideUp_0.3s_ease-out]">
                    <style>
                        @keyframes slideUp {
                            from { transform: translateY(20px); opacity: 0; }
                            to { transform: translateY(0); opacity: 1; }
                        }
                    </style>
                    <div class="text-center mb-6">
                        <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                        </div>
                        <h3 class="text-2xl font-bold text-gray-800 mb-2">Document Generated! 🎉</h3>
                        <p class="text-gray-600">Help others by sharing this free tool</p>
                    </div>
                    
                    <div class="space-y-3 mb-6">
                        <button id="shareWhatsAppDoc" class="w-full bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-4 rounded-xl font-bold hover:from-green-600 hover:to-green-700 transition flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:scale-105">
                            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                            </svg>
                            Share on WhatsApp
                        </button>
                        
                        <button id="copyLinkDoc" class="w-full bg-gray-100 text-gray-800 px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition flex items-center justify-center gap-3">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                            </svg>
                            Copy Link
                        </button>
                    </div>
                    
                    <button id="closeShareDialog" class="w-full text-gray-500 hover:text-gray-700 font-medium">
                        No thanks, close
                    </button>
                </div>
            `;
            
            document.body.appendChild(shareDialog);
            
            // WhatsApp share handler
            document.getElementById('shareWhatsAppDoc').onclick = () => {
                const text = randomMsg + shareUrl;
                window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
                shareDialog.remove();
            };
            
            // Copy link handler
            document.getElementById('copyLinkDoc').onclick = () => {
                navigator.clipboard.writeText(shareUrl).then(() => {
                    const btn = document.getElementById('copyLinkDoc');
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
            document.getElementById('closeShareDialog').onclick = () => shareDialog.remove();
            shareDialog.onclick = (e) => {
                if (e.target === shareDialog) shareDialog.remove();
            };
        }, 2000); // Show after 2 seconds
    }

    // 1. Privacy Policy Generator
    generatePrivacyPolicy() {
        this.showInputModal('Privacy Policy Generator', [
            { name: 'businessName', label: 'Business/Service Name', placeholder: 'Your business name' },
            { name: 'businessType', label: 'Business Type', type: 'select', options: ['Freelancer', 'Small Business', 'Service Provider', 'E-commerce', 'Platform/App', 'Other'] },
            { name: 'email', label: 'Contact Email', type: 'email', placeholder: 'contact@example.com' },
            { name: 'phone', label: 'Contact Phone', placeholder: '+91 9876543210' },
            { name: 'address', label: 'Business Address', placeholder: 'City, State, India' },
            { name: 'dataCollected', label: 'What data do you collect?', type: 'textarea', placeholder: 'E.g., Name, Email, Phone, Address, Payment info' }
        ], (data) => {
            const content = `
                <h1>Privacy Policy</h1>
                <div class="meta">
                    <p><strong>Business Name:</strong> ${data.businessName}</p>
                    <p><strong>Type:</strong> ${data.businessType}</p>
                    <p><strong>Contact:</strong> ${data.email} | ${data.phone}</p>
                    <p><strong>Address:</strong> ${data.address}</p>
                    <p><strong>Effective Date:</strong> ${new Date().toLocaleDateString('en-IN')}</p>
                </div>

                <div class="section">
                    <h2>1. Introduction and Scope</h2>
                    <p>This Privacy Policy ("Policy") sets forth the comprehensive framework governing how ${data.businessName} ("we", "our", "us", or "the Company"), operating as a ${data.businessType}, collects, processes, uses, discloses, stores, and protects your personal information and sensitive personal data. This Policy is formulated in strict compliance with the Digital Personal Data Protection Act, 2023 (DPDP Act) of India, Information Technology Act, 2000 (as amended), and all applicable rules, regulations, and guidelines issued thereunder by the competent authorities.</p>
                    
                    <p>By accessing or using our services, website, mobile applications, or engaging with our business in any manner, you acknowledge that you have read, understood, and agree to be bound by the terms of this Privacy Policy. This Policy applies to all users, customers, visitors, and any individual whose personal data we may collect, process, or handle in the course of our business operations.</p>
                    
                    <p>We are committed to protecting your privacy and ensuring transparent data handling practices. We recognize the trust you place in us when you share your personal information, and we take this responsibility seriously. This Policy describes in detail our practices concerning data collection, usage, disclosure, retention, security, and your rights as a data principal under Indian law.</p>
                </div>

                <div class="section">
                    <h2>2. Information We Collect - Categories and Purposes</h2>
                    <p>In the course of providing our services and operating our business, we may collect, receive, and process various categories of personal data and sensitive personal data from you. The specific types of information we collect include, but are not limited to:</p>
                    
                    <h3>2.1 Personal Information Collected:</h3>
                    <ul>
                        ${data.dataCollected.split(',').map(item => `<li><strong>${item.trim()}</strong> - Collected for service provision, communication, transaction processing, and legal compliance purposes</li>`).join('')}
                    </ul>
                    
                    <h3>2.2 Technical and Usage Information:</h3>
                    <p>We automatically collect certain technical information when you interact with our services, including but not limited to: IP addresses, device identifiers (IMEI, MAC address, device ID), browser type and version, operating system, device type (mobile, desktop, tablet), screen resolution, language preferences, referring/exit pages, clickstream data, pages viewed, time spent on pages, access times, location data (with your consent), and other diagnostic data that helps us improve our services and user experience.</p>
                    
                    <h3>2.3 Transaction and Financial Data:</h3>
                    <p>When you engage in transactions with us, we may collect payment information including bank account details, UPI IDs, digital wallet information, transaction history, billing addresses, and purchase records. However, sensitive financial data such as complete credit/debit card numbers and CVV codes are processed through our PCI-DSS compliant payment processors and are not stored on our servers.</p>
                    
                    <h3>2.4 Communication Records:</h3>
                    <p>We maintain records of all communications between you and our company, including emails, messages, customer support interactions, feedback forms, survey responses, and any other correspondence, for the purposes of providing efficient customer service, resolving disputes, improving our services, and maintaining business records.</p>
                </div>

                <div class="section">
                    <h2>3. How We Use Your Information - Detailed Purposes</h2>
                    <p>We collect and process your personal data for specific, explicit, and legitimate purposes only. We do not use your data for purposes incompatible with those for which consent was obtained. The purposes for which we process your personal information include:</p>
                    
                    <h3>3.1 Service Provision and Fulfillment:</h3>
                    <p>To create and manage your account, authenticate your identity, provide access to our services, process your orders and transactions, deliver products or services you have requested, manage bookings and appointments, provide customer support, respond to your inquiries, and ensure smooth operation of our business relationship with you.</p>
                    
                    <h3>3.2 Transaction Processing and Financial Operations:</h3>
                    <p>To process payments, verify payment information, prevent fraud and unauthorized transactions, issue invoices and receipts, manage refunds and cancellations, maintain accurate financial records, comply with accounting requirements, and facilitate seamless financial transactions through our authorized payment partners.</p>
                    
                    <h3>3.3 Communication and Marketing:</h3>
                    <p>To communicate with you about your orders, services, account updates, policy changes, and important notices; to send promotional materials, newsletters, special offers, and marketing communications (subject to your consent and opt-out preferences); to conduct surveys and collect feedback to improve our services; and to keep you informed about new features, products, or services that may be of interest to you.</p>
                    
                    <h3>3.4 Service Improvement and Analytics:</h3>
                    <p>To analyze usage patterns and trends, understand customer preferences and behavior, identify areas for improvement, develop new features and services, conduct research and development activities, perform data analytics to enhance user experience, optimize our operations, and make data-driven business decisions that benefit our customers.</p>
                    
                    <h3>3.5 Security and Fraud Prevention:</h3>
                    <p>To protect against fraud, unauthorized transactions, security breaches, and other illegal activities; to verify identity and prevent impersonation; to detect and prevent abuse of our services; to maintain the security and integrity of our systems; to protect the rights, property, and safety of our company, users, and the public; and to comply with our legal obligations regarding security.</p>
                    
                    <h3>3.6 Legal Compliance and Regulatory Requirements:</h3>
                    <p>To comply with applicable laws, regulations, court orders, and legal processes; to respond to lawful requests from government authorities and law enforcement agencies; to enforce our terms of service and other agreements; to protect and defend our legal rights; to maintain necessary business records; to comply with tax obligations, accounting standards, and financial regulations; and to fulfill our obligations under the DPDP Act, 2023 and other relevant legislation.</p>
                </div>

                <div class="section">
                    <h2>4. Your Rights Under DPDP Act 2023 - Comprehensive Overview</h2>
                    <p>As a data principal under the Digital Personal Data Protection Act, 2023, you are entitled to certain fundamental rights concerning your personal data. We are committed to facilitating the exercise of these rights in a transparent, accessible, and timely manner. Your rights include:</p>
                    
                    <ul>
                        <li><strong>Right to Information and Access:</strong> You have the right to obtain confirmation whether we are processing your personal data and to access a copy of your personal data along with information about the purposes of processing, categories of data, recipients of data, retention periods, and other relevant details. You may request a summary or complete record of all personal data we hold about you in a structured, commonly used, and machine-readable format.</li>
                        
                        <li><strong>Right to Correction and Update:</strong> You have the right to request correction, completion, or updating of your personal data if it is inaccurate, incomplete, or outdated. We will make reasonable efforts to verify the accuracy of the corrected data and update our records promptly. You can update most information directly through your account settings or by contacting us.</li>
                        
                        <li><strong>Right to Erasure and Deletion:</strong> You have the right to request deletion or erasure of your personal data when it is no longer necessary for the purposes for which it was collected, when you withdraw consent, when you object to processing, or when we are legally required to delete it. We will comply with deletion requests subject to our legal obligations to retain certain data for specified periods (e.g., for tax, accounting, or legal purposes).</li>
                        
                        <li><strong>Right to Data Portability:</strong> You have the right to receive your personal data in a structured, commonly used, and machine-readable format and to transmit this data to another data fiduciary without hindrance. We will provide your data in formats such as CSV, JSON, or PDF, as technically feasible, within a reasonable timeframe.</li>
                        
                        <li><strong>Right to Withdraw Consent:</strong> Where processing is based on consent, you have the right to withdraw your consent at any time with the same ease with which it was given. Withdrawal of consent does not affect the lawfulness of processing based on consent before its withdrawal. You may withdraw consent through your account settings, by contacting us, or by using opt-out mechanisms provided in our communications.</li>
                        
                        <li><strong>Right to Grievance Redressal:</strong> You have the right to lodge a complaint with our designated Grievance Officer regarding any violation of your rights under the DPDP Act or concerns about our data processing practices. We are committed to addressing your grievances within the statutory timeframe of 30 days and providing you with a satisfactory resolution.</li>
                        
                        <li><strong>Right to Nominate:</strong> You have the right to nominate another individual who may exercise your rights in the event of your death or incapacity. The nominee shall be entitled to exercise all your rights as a data principal, subject to verification procedures.</li>
                    </ul>
                    
                    <p><strong>Exercising Your Rights:</strong> To exercise any of these rights, please contact us using the contact information provided in Section 11 of this Policy. We will respond to your request within 30 days or such other period as prescribed by law. We may require additional information to verify your identity before processing certain requests to ensure data security and prevent unauthorized access.</p>
                </div>

                <div class="section">
                    <h2>5. Data Retention Policy and Practices</h2>
                    <p>We retain your personal data only for as long as necessary to fulfill the specific purposes for which it was collected, to comply with our legal and regulatory obligations, to resolve disputes, to enforce our agreements, and to protect our legitimate business interests. Our data retention practices are guided by principles of data minimization and purpose limitation.</p>
                    
                    <p><strong>General Retention Period:</strong> Typically, we retain personal data for the duration of our active business relationship with you and for a period of up to 3 years thereafter. However, certain categories of data may be retained for longer or shorter periods based on specific legal requirements, business needs, and the nature of the data.</p>
                    
                    <p><strong>Specific Retention Periods:</strong></p>
                    <ul>
                        <li><strong>Account Information:</strong> Retained for the duration of account activity plus 3 years after account closure or last activity</li>
                        <li><strong>Transaction Records:</strong> Retained for 7 years from the date of transaction to comply with tax and accounting regulations</li>
                        <li><strong>Financial Data:</strong> Retained for 7-10 years as required by the Income Tax Act and Companies Act</li>
                        <li><strong>Communication Records:</strong> Retained for 2-3 years for customer service quality and dispute resolution purposes</li>
                        <li><strong>Marketing Consent Records:</strong> Retained until consent is withdrawn plus reasonable period to honor opt-out requests</li>
                        <li><strong>Legal and Compliance Records:</strong> Retained for periods mandated by specific laws or until resolution of legal matters</li>
                    </ul>
                    
                    <p><strong>Secure Deletion:</strong> Upon expiry of the retention period, we securely delete or anonymize your personal data using industry-standard methods including secure erasure, degaussing for physical media, cryptographic erasure, and data destruction protocols that prevent recovery or reconstruction of the data.</p>
                </div>

                <div class="section">
                    <h2>6. Data Security Measures and Safeguards</h2>
                    <p>We implement comprehensive technical, physical, and organizational security measures designed to protect your personal data against unauthorized access, alteration, disclosure, destruction, loss, theft, accidental damage, and unlawful processing. Our security framework is regularly reviewed and updated to address emerging threats and technological advancements.</p>
                    
                    <h3>6.1 Technical Security Measures:</h3>
                    <p><strong>Encryption:</strong> We use industry-standard encryption protocols (SSL/TLS) to protect data in transit between your device and our servers. Sensitive data at rest is encrypted using AES-256 encryption or equivalent standards. All payment transactions are processed through encrypted channels.</p>
                    
                    <p><strong>Access Controls:</strong> We implement role-based access controls (RBAC) ensuring that only authorized personnel with legitimate business needs can access personal data. Multi-factor authentication (MFA) is required for access to sensitive systems. Access logs are maintained and regularly audited.</p>
                    
                    <p><strong>Network Security:</strong> Our infrastructure is protected by firewalls, intrusion detection systems (IDS), intrusion prevention systems (IPS), anti-malware software, and regular security patches. We conduct vulnerability assessments and penetration testing periodically.</p>
                    
                    <h3>6.2 Organizational Security Measures:</h3>
                    <p><strong>Employee Training:</strong> All employees handling personal data receive comprehensive training on data protection, privacy principles, security protocols, and their obligations under the DPDP Act. Confidentiality agreements are signed by all personnel.</p>
                    
                    <p><strong>Data Processing Agreements:</strong> We enter into data processing agreements with third-party service providers and vendors who process personal data on our behalf, ensuring they implement adequate security measures and comply with applicable data protection laws.</p>
                    
                    <p><strong>Incident Response:</strong> We maintain a data breach response plan and incident management procedures to promptly detect, respond to, and mitigate any security incidents. In the event of a data breach affecting your personal data, we will notify you and the relevant authorities within the timeframes prescribed by law.</p>
                </div>

                <div class="section">
                    <h2>7. Third-Party Sharing and Disclosure</h2>
                    <p>We do not sell, rent, or trade your personal data to third parties for their marketing purposes. We may share your personal data with third parties only in the following limited circumstances and subject to appropriate safeguards:</p>
                    
                    <ul>
                        <li><strong>Service Providers and Business Partners:</strong> We engage trusted third-party service providers to assist in our operations, including but not limited to payment processors, logistics and delivery partners, cloud hosting providers, IT service providers, marketing agencies, customer support platforms, and analytics providers. These parties are contractually obligated to protect your data, use it only for specified purposes, and comply with data protection laws.</li>
                        
                        <li><strong>Legal and Regulatory Authorities:</strong> We may disclose your personal data when required by law, court order, legal process, or lawful request from government authorities, law enforcement agencies, regulatory bodies, or tax authorities. We will verify the legitimacy of such requests and disclose only the minimum data necessary to comply with legal obligations.</li>
                        
                        <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, reorganization, sale of assets, bankruptcy, or similar business transaction, your personal data may be transferred to the acquiring entity or successor, subject to the same privacy protections and obligations set forth in this Policy. You will be notified of any such transfer.</li>
                        
                        <li><strong>Consent-Based Sharing:</strong> We may share your data with business partners, affiliates, or third parties with your explicit consent for specific purposes such as joint promotions, collaborative services, or integrated offerings. You will be informed about the identity of such third parties and the purposes of sharing before obtaining your consent.</li>
                        
                        <li><strong>Protection of Rights and Safety:</strong> We may disclose personal data when we believe in good faith that disclosure is necessary to protect our rights, property, or safety, or that of our users or the public, to prevent fraud, to enforce our terms of service, or to defend against legal claims.</li>
                    </ul>
                    
                    <p><strong>Cross-Border Transfers:</strong> If we transfer your personal data outside India, we will ensure that adequate safeguards are in place as required by the DPDP Act, such as standard contractual clauses, adequacy decisions, or other legally approved transfer mechanisms, to protect your data in accordance with Indian data protection standards.</p>
                </div>

                <div class="section">
                    <h2>8. Cookies, Tracking Technologies, and Online Privacy</h2>
                    <p>We use cookies, web beacons, pixels, tags, local storage, and similar tracking technologies to enhance user experience, analyze usage patterns, personalize content, remember preferences, facilitate authentication, and improve the functionality and performance of our website and services.</p>
                    
                    <h3>8.1 Types of Cookies We Use:</h3>
                    <ul>
                        <li><strong>Essential Cookies:</strong> These are strictly necessary for the operation of our website and services. They enable core functionality such as security, network management, user authentication, and access to secure areas. You cannot opt-out of these cookies as our services will not function properly without them.</li>
                        
                        <li><strong>Performance and Analytics Cookies:</strong> These cookies collect aggregated information about how visitors use our website, including pages visited, time spent, errors encountered, and traffic sources. We use this data to improve website performance, understand user behavior, and optimize user experience. Examples include Google Analytics cookies.</li>
                        
                        <li><strong>Functionality Cookies:</strong> These cookies allow our website to remember your choices and preferences (such as language, region, login credentials) to provide enhanced, personalized features and content. They may also be used to provide services you have requested.</li>
                        
                        <li><strong>Advertising and Marketing Cookies:</strong> With your consent, we may use cookies to deliver relevant advertisements, limit the number of times you see an ad, measure advertising effectiveness, and understand your interests. These cookies may be placed by us or third-party advertising partners.</li>
                    </ul>
                    
                    <h3>8.2 Managing Cookie Preferences:</h3>
                    <p>You can control and manage cookies through your browser settings. Most browsers allow you to refuse or accept cookies, delete existing cookies, and set preferences for certain websites. However, please note that disabling certain cookies may affect the functionality of our website and limit your access to some features. You can also opt-out of interest-based advertising through industry opt-out mechanisms or by adjusting your privacy settings.</p>
                    
                    <p><strong>Do Not Track Signals:</strong> Some browsers transmit "Do Not Track" (DNT) signals. We currently do not respond to DNT signals due to lack of industry standard on how to interpret such signals. We will update our practices if a uniform standard is established.</p>
                </div>

                <div class="section">
                    <h2>9. Children's Privacy and Age Restrictions</h2>
                    <p>Our services are not intended for, nor do we knowingly direct them to, individuals under the age of 18 years. We do not knowingly collect, use, or disclose personal data from children without verifiable parental or guardian consent as required by law. If you are under 18 years of age, you must obtain permission from your parent or legal guardian before using our services or providing any personal information to us.</p>
                    
                    <p>If we become aware that we have inadvertently collected personal data from a child under 18 without appropriate parental consent, we will take immediate steps to delete such information from our systems. Parents or guardians who believe that their child has provided personal data to us without consent may contact us using the information provided in Section 11, and we will promptly investigate and take appropriate action.</p>
                    
                    <p>We encourage parents and guardians to monitor their children's online activities, educate them about safe internet practices, and participate in their children's use of online services. We support parental involvement in children's online experiences and are committed to protecting the privacy and safety of minors.</p>
                </div>

                <div class="section">
                    <h2>10. Changes and Updates to This Privacy Policy</h2>
                    <p>We reserve the right to modify, amend, or update this Privacy Policy from time to time to reflect changes in our business practices, legal requirements, regulatory guidelines, technological developments, or for other operational, legal, or regulatory reasons. Any changes to this Policy will be effective immediately upon posting the updated version on our website with a revised "Effective Date" or "Last Updated" date.</p>
                    
                    <p><strong>Notification of Material Changes:</strong> If we make material changes that significantly affect your rights or how we process your personal data, we will provide prominent notice through one or more of the following methods: email notification to the address associated with your account, a notification banner on our website or application, an in-app message, or other reasonable means of communication. Material changes may include changes to the purposes of processing, categories of data collected, third-party sharing practices, or your rights.</p>
                    
                    <p><strong>Reviewing Updated Policy:</strong> We encourage you to periodically review this Privacy Policy to stay informed about how we protect your personal information and your privacy rights. Your continued use of our services after the effective date of any changes to this Policy constitutes your acknowledgment and acceptance of the updated terms. If you do not agree with the modified Privacy Policy, you should discontinue use of our services and may exercise your right to data deletion.</p>
                    
                    <p><strong>Version History:</strong> We maintain a version history of our Privacy Policy to ensure transparency. Previous versions may be made available upon request for your reference and to demonstrate our commitment to privacy evolution.</p>
                </div>

                <div class="section">
                    <h2>11. Contact Information and Data Protection Officer</h2>
                    <p>We are committed to addressing your privacy concerns, questions, comments, and requests in a timely and transparent manner. If you have any inquiries regarding this Privacy Policy, our data processing practices, wish to exercise your rights as a data principal, or need assistance with privacy-related matters, please contact us through any of the following channels:</p>
                    
                    <div class="meta">
                        <p><strong>Business Name:</strong> ${data.businessName}</p>
                        <p><strong>Registered Address:</strong> ${data.address}</p>
                        <p><strong>Email Address:</strong> ${data.email}</p>
                        <p><strong>Phone Number:</strong> ${data.phone}</p>
                        <p><strong>Business Hours:</strong> Monday to Saturday, 10:00 AM to 6:00 PM (IST)</p>
                    </div>
                    
                    <p><strong>Data Access and Rights Requests:</strong> To exercise any of your rights under the DPDP Act, including rights to access, correction, erasure, portability, or withdrawal of consent, please submit your request in writing via email or postal mail using the contact information above. Please include your full name, contact information, account details (if applicable), and a clear description of your request. We will verify your identity and respond within 30 days or as prescribed by applicable law.</p>
                    
                    <p><strong>Response Timeline:</strong> We aim to respond to all privacy inquiries and rights requests within 30 days of receipt. In cases requiring additional time due to complexity or volume of requests, we will inform you of the extension and the reasons thereof, as permitted by law. Complex requests may take up to 60 days with prior notification.</p>
                </div>

                <div class="section">
                    <h2>12. Grievance Redressal Mechanism and Compliance</h2>
                    <p>In accordance with Section 10 of the Digital Personal Data Protection Act, 2023, and Rule 3 of the Data Protection Rules, we have appointed a Grievance Officer to address your concerns regarding the processing of your personal data, privacy violations, data breaches, or any other grievances related to compliance with the DPDP Act.</p>
                    
                    <div class="meta">
                        <p><strong>Grievance Officer Details:</strong></p>
                        <p><strong>Name:</strong> [Grievance Officer Name - To be designated by ${data.businessName}]</p>
                        <p><strong>Designation:</strong> Grievance Officer (Data Protection)</p>
                        <p><strong>Email:</strong> ${data.email} (Subject: "Data Protection Grievance - DPDP Act 2023")</p>
                        <p><strong>Phone:</strong> ${data.phone}</p>
                        <p><strong>Address:</strong> ${data.address}</p>
                        <p><strong>Response Timeline:</strong> Within 30 days of receipt of grievance</p>
                    </div>
                    
                    <p><strong>How to File a Grievance:</strong> If you have any complaints or grievances regarding the processing of your personal data or believe that your privacy rights have been violated, you may submit a written grievance to our Grievance Officer using the contact details provided above. Your grievance should include:</p>
                    <ul>
                        <li>Your full name and contact information (email address, phone number, postal address)</li>
                        <li>Description of your account or relationship with us</li>
                        <li>Detailed description of the grievance or complaint</li>
                        <li>Nature of the alleged privacy violation or data protection concern</li>
                        <li>Any supporting documents or evidence relevant to your complaint</li>
                        <li>Specific relief or action you are seeking</li>
                        <li>Any previous communications with us regarding the matter</li>
                    </ul>
                    
                    <p><strong>Grievance Resolution Process:</strong> Upon receipt of your grievance, our Grievance Officer will:</p>
                    <ol>
                        <li>Acknowledge receipt of your grievance within 48-72 hours via email or other appropriate means</li>
                        <li>Investigate the matter thoroughly, including reviewing relevant records and consulting with concerned departments</li>
                        <li>Communicate with you during the investigation process if additional information is required</li>
                        <li>Provide a written response addressing your grievance within 30 days from the date of receipt, as mandated by the DPDP Act</li>
                        <li>Take appropriate corrective actions if a violation is found, including remedial measures and policy updates</li>
                        <li>Maintain confidentiality throughout the grievance resolution process</li>
                    </ol>
                    
                    <p><strong>Escalation to Data Protection Board:</strong> If you are not satisfied with the resolution provided by our Grievance Officer or if you do not receive a response within the stipulated timeframe, you have the right to escalate your complaint to the Data Protection Board of India established under Section 18 of the DPDP Act, 2023. The Board has the authority to investigate complaints, conduct inquiries, and impose penalties for violations of data protection obligations.</p>
                    
                    <p><strong>Our Commitment:</strong> We take all grievances seriously and are committed to resolving them fairly, transparently, and in accordance with applicable laws. We will not retaliate against any individual for filing a grievance in good faith and will protect whistleblowers and complainants from any adverse consequences.</p>
                </div>

                <div class="section">
                    <h2>13. Consent Management and Withdrawal</h2>
                    <p>Your consent is fundamental to our processing of personal data. We obtain your free, specific, informed, and unambiguous consent before collecting or processing your personal data, except where processing is permitted by law without consent (such as for legal compliance, contractual necessity, or legitimate interests).</p>
                    
                    <p><strong>How We Obtain Consent:</strong> We seek your consent through clear affirmative action such as ticking a checkbox, clicking an "I Agree" button, providing verbal consent (recorded where applicable), signing a consent form, or through your account settings. Pre-ticked boxes, silence, or inactivity do not constitute valid consent.</p>
                    
                    <p><strong>Withdrawing Consent:</strong> You have the right to withdraw your consent at any time with the same ease with which it was given. Withdrawal of consent will not affect the lawfulness of any processing we conducted prior to withdrawal. To withdraw consent, you may: (1) Update your preferences in your account settings; (2) Click "Unsubscribe" links in our marketing emails; (3) Contact us at ${data.email}; or (4) Submit a written request to our Grievance Officer. We will process withdrawal requests within 7 business days.</p>
                </div>

                <div class="section">
                    <h2>14. Automated Decision-Making and Profiling</h2>
                    <p>We may use automated decision-making and profiling technologies to enhance personalization, improve service delivery, prevent fraud, and optimize user experience. Automated decisions may include personalized recommendations, dynamic pricing, credit assessments, or fraud detection.</p>
                    
                    <p>Where automated processing significantly affects you, you have the right to: (1) Obtain human intervention; (2) Express your point of view; (3) Contest the decision; and (4) Request an explanation of the decision-making logic. If you wish to challenge an automated decision or request manual review, please contact us at ${data.email}.</p>
                </div>

                <div class="section">
                    <h2>15. Territorial Scope and Governing Law</h2>
                    <p>This Privacy Policy applies to the processing of personal data of individuals located in India or whose personal data is processed in connection with our services offered in India. This Policy is governed by and construed in accordance with the laws of India, including the Digital Personal Data Protection Act, 2023, Information Technology Act, 2000 (as amended), and other applicable Indian legislation.</p>
                    
                    <p>Any disputes arising out of or relating to this Privacy Policy or our data processing practices shall be subject to the exclusive jurisdiction of the courts in ${data.address.split(',').pop().trim()}, India. However, you may also have the option to approach the Data Protection Board of India for grievance redressal as provided under the DPDP Act.</p>
                </div>

                <div class="section">
                    <h2>16. Acceptance and Agreement</h2>
                    <p>By using our services, accessing our website, or engaging with our business, you acknowledge that you have read, understood, and agree to be bound by this Privacy Policy. If you do not agree with any terms of this Policy, please discontinue use of our services immediately.</p>
                    
                    <p>This Privacy Policy constitutes a legally binding agreement between you and ${data.businessName}. We reserve the right to update or modify this Policy as necessary to comply with legal requirements or reflect changes in our business practices.</p>
                    
                    <p><strong>Effective Date:</strong> ${new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    
                    <p><em>This Privacy Policy was generated using ShramKavach's DPDP Act 2023 compliant template. It should be reviewed by a qualified legal professional before use. ShramKavach provides this template for informational purposes only and does not provide legal advice.</em></p>
                </div>
            `;
            this.downloadAsPDF(content, `Privacy_Policy_${data.businessName.replace(/\s+/g, '_')}.pdf`);
        });
    }

    // 2. Contract Generator
    generateContract() {
        window.location.href = 'Privacy/service-contract-generator.html';
    }

    generateContractOld() {
        this.showInputModal('Service Contract Generator', [
            { name: 'clientName', label: 'Client Name', placeholder: 'Client or Company name' },
            { name: 'providerName', label: 'Service Provider Name', placeholder: 'Your name/business' },
            { name: 'serviceDescription', label: 'Service Description', type: 'textarea', placeholder: 'Describe the service/work to be provided' },
            { name: 'startDate', label: 'Start Date', type: 'date' },
            { name: 'duration', label: 'Duration/Deadline', placeholder: 'e.g., 30 days, 3 months' },
            { name: 'totalAmount', label: 'Total Amount (₹)', type: 'number', placeholder: '50000' },
            { name: 'paymentTerms', label: 'Payment Terms', placeholder: 'e.g., 50% advance, 50% on delivery' },
            { name: 'deliverables', label: 'Deliverables', type: 'textarea', placeholder: 'List specific deliverables' }
        ], (data) => {
            const content = `
                <h1>Service Agreement</h1>
                <div class="meta">
                    <p><strong>Agreement Date:</strong> ${new Date().toLocaleDateString('en-IN')}</p>
                    <p><strong>Between:</strong> ${data.providerName} (Service Provider) and ${data.clientName} (Client)</p>
                </div>

                <div class="section">
                    <h2>1. Parties to the Agreement</h2>
                    <p>This Service Agreement ("Agreement") is entered into on ${new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })} ("Effective Date") by and between:</p>
                    
                    <p><strong>Service Provider:</strong> ${data.providerName} (hereinafter referred to as "Provider", "Service Provider", "Contractor", or "Vendor"), engaged in providing professional services, and having its principal place of business or residence in India.</p>
                    
                    <p><strong>Client:</strong> ${data.clientName} (hereinafter referred to as "Client", "Customer", or "Recipient"), requiring the services of the Provider and having its principal place of business or residence in India.</p>
                    
                    <p>The Provider and Client are collectively referred to as the "Parties" and individually as a "Party" to this Agreement. This Agreement sets forth the terms and conditions under which the Provider shall provide services to the Client and establishes the rights, obligations, responsibilities, and liabilities of both Parties.</p>
                </div>

                <div class="section">
                    <h2>2. Purpose and Recitals</h2>
                    <p>WHEREAS, the Provider is engaged in the business of providing professional services and possesses the necessary skills, expertise, qualifications, experience, resources, and capabilities to perform the services contemplated under this Agreement;</p>
                    
                    <p>WHEREAS, the Client desires to engage the Provider to provide certain professional services as described in this Agreement, and the Provider agrees to provide such services subject to the terms and conditions set forth herein;</p>
                    
                    <p>NOW, THEREFORE, in consideration of the mutual covenants, promises, representations, and undertakings contained herein, and for other good and valuable consideration, the receipt and sufficiency of which are hereby acknowledged, the Parties agree to enter into this Service Agreement upon the terms and conditions set forth below.</p>
                </div>

                <div class="section">
                    <h2>3. Scope of Work and Service Description</h2>
                    <p>The Provider agrees to perform and deliver the following services, work, deliverables, and professional assistance (collectively, the "Services") to the Client in a professional, timely, and workmanlike manner, in accordance with industry standards and best practices:</p>
                    
                    <p><strong>Detailed Service Description:</strong></p>
                    <p>${data.serviceDescription}</p>
                    
                    <p>The Provider shall perform the Services with due care, skill, and diligence, utilizing qualified personnel and appropriate resources. The Provider warrants that the Services shall be performed in a professional and competent manner, consistent with generally accepted industry standards and practices applicable to similar services. The Provider shall comply with all applicable laws, rules, regulations, and professional codes of conduct in performing the Services.</p>
                    
                    <p><strong>Scope Limitations:</strong> Any services, work, or deliverables not explicitly described in this Section shall be considered outside the scope of this Agreement and may be subject to additional charges and separate written agreement between the Parties. The Client acknowledges that changes to the scope of work may result in adjustments to timelines and compensation as mutually agreed.</p>
                </div>

                <div class="section">
                    <h2>4. Project Timeline and Milestones</h2>
                    <p><strong>Commencement Date:</strong> The Provider shall commence performance of the Services on ${new Date(data.startDate).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })} ("Start Date"), or such other date as may be mutually agreed upon in writing by the Parties.</p>
                    
                    <p><strong>Project Duration:</strong> The Provider shall complete and deliver all Services, deliverables, and work products within a period of ${data.duration} from the Start Date, unless otherwise extended by mutual written agreement or delayed due to Force Majeure events, Client-caused delays, or other circumstances beyond the reasonable control of the Provider.</p>
                    
                    <p><strong>Milestones and Deadlines:</strong> The Parties may establish specific milestones, intermediate deadlines, and progress checkpoints for the completion of phases or components of the Services. Time shall be of the essence for the performance of obligations under this Agreement, and both Parties agree to cooperate in good faith to adhere to agreed timelines.</p>
                    
                    <p><strong>Delays and Extensions:</strong> If either Party anticipates any delay in meeting the agreed timeline, such Party shall promptly notify the other Party in writing, stating the reasons for the delay and proposing a revised timeline. The Parties shall discuss and mutually agree upon any necessary extensions or adjustments to the timeline. Delays caused by the Client's failure to provide timely information, approvals, or cooperation shall entitle the Provider to a corresponding extension of time for performance.</p>
                </div>

                <div class="section">
                    <h2>5. Deliverables and Acceptance Criteria</h2>
                    <p><strong>Specific Deliverables:</strong> The Provider shall deliver the following specific work products, materials, documents, or outputs ("Deliverables") to the Client as part of the Services:</p>
                    <p>${data.deliverables}</p>
                    
                    <p><strong>Delivery Method:</strong> Deliverables shall be delivered electronically via email, cloud storage, file transfer platforms, or other mutually agreed methods, unless physical delivery is specifically required and agreed upon. The Provider shall ensure that all Deliverables are complete, functional, and meet the specifications described in this Agreement.</p>
                    
                    <p><strong>Acceptance Process:</strong> Upon delivery of each Deliverable, the Client shall have a period of 7 (seven) business days ("Review Period") to review, test, and evaluate the Deliverable against the agreed specifications and acceptance criteria. The Client shall notify the Provider in writing of any defects, deficiencies, or non-conformities during the Review Period. If no written notice is provided within the Review Period, the Deliverable shall be deemed accepted.</p>
                    
                    <p><strong>Revisions and Corrections:</strong> If the Client identifies any legitimate defects or material non-conformities in a Deliverable during the Review Period, the Provider shall promptly correct such defects at no additional charge to the Client, provided that the defects result from the Provider's failure to meet the agreed specifications. Minor revisions and reasonable adjustments are included within the scope of this Agreement as specified in Section 7.</p>
                </div>

                <div class="section">
                    <h2>6. Compensation and Payment Terms</h2>
                    <p><strong>Total Compensation:</strong> In consideration for the Services and Deliverables provided under this Agreement, the Client shall pay the Provider a total fee of Indian Rupees ${parseFloat(data.totalAmount).toLocaleString('en-IN')} (₹${parseFloat(data.totalAmount).toLocaleString('en-IN')}) ("Total Fees"), exclusive of applicable taxes, duties, and government levies.</p>
                    
                    <p><strong>Payment Schedule:</strong> The Total Fees shall be paid according to the following payment schedule:</p>
                    <p>${data.paymentTerms}</p>
                    
                    <p><strong>Payment Method and Instructions:</strong> All payments shall be made via bank transfer (NEFT/RTGS/IMPS), Unified Payments Interface (UPI), digital wallets, or other mutually agreed electronic payment methods to the bank account or payment details provided by the Provider. The Client shall make payments within 7 (seven) business days of receipt of a valid invoice from the Provider, unless otherwise specified in the payment schedule.</p>
                    
                    <p><strong>Invoicing:</strong> The Provider shall issue properly formatted invoices to the Client indicating the services performed, amount due, payment terms, applicable taxes (if any), GST details (if applicable), and payment instructions. Invoices shall comply with applicable Indian tax laws and regulations.</p>
                    
                    <p><strong>Late Payment:</strong> If the Client fails to make any payment when due, the outstanding amount shall accrue interest at the rate of 1.5% per month (18% per annum) or the maximum rate permitted by law, whichever is lower, from the due date until the date of actual payment. The Provider may suspend performance of Services or terminate this Agreement if payments are overdue by more than 15 (fifteen) days, without prejudice to the Provider's rights to recover the outstanding amounts and interest.</p>
                    
                    <p><strong>Taxes:</strong> Unless otherwise specified, the Total Fees are exclusive of all applicable taxes, including but not limited to Goods and Services Tax (GST), Tax Deducted at Source (TDS), service tax, and other levies imposed by central, state, or local governments. The Client shall be responsible for payment of all such taxes or shall reimburse the Provider for taxes paid by the Provider on behalf of the Client, as applicable under Indian tax laws.</p>
                </div>

                <div class="section">
                    <h2>7. Revisions, Modifications, and Change Requests</h2>
                    <p><strong>Included Revisions:</strong> The Services include up to 2 (two) rounds of reasonable revisions or modifications to the Deliverables based on the Client's feedback, provided that such revisions do not constitute a material change to the scope of work, specifications, or project requirements. These revisions are intended to allow for refinement and adjustment of Deliverables to meet the Client's reasonable expectations within the original scope.</p>
                    
                    <p><strong>Additional Revisions:</strong> Any revisions beyond the 2 (two) included rounds, or any modifications that constitute a change in scope, specifications, functionality, or requirements, shall be considered additional work and shall be charged at the rate of Indian Rupees ${Math.round(data.totalAmount * 0.1).toLocaleString('en-IN')} (₹${Math.round(data.totalAmount * 0.1).toLocaleString('en-IN')}) per additional revision round, or as otherwise mutually agreed in writing between the Parties.</p>
                    
                    <p><strong>Change Order Process:</strong> If the Client requests any changes, additions, deletions, or modifications to the scope of work, specifications, deliverables, or timeline after the commencement of Services ("Change Order"), the Provider shall assess the impact of such changes on the project timeline, resources, and costs. The Provider shall provide the Client with a written estimate of additional fees, time extensions, and any other implications of the proposed Change Order. Change Orders shall be effective only upon written acceptance and approval by both Parties.</p>
                    
                    <p><strong>Approval Required:</strong> The Client agrees that requesting revisions or changes does not automatically entitle the Client to unlimited modifications. The Provider reserves the right to decline unreasonable or excessive revision requests that fall outside the scope of this Agreement or that would require disproportionate effort or resources.</p>
                </div>

                <div class="section">
                    <h2>8. Intellectual Property Rights and Ownership</h2>
                    <p><strong>Transfer of Rights:</strong> Upon receipt of full and final payment of all amounts due under this Agreement, all right, title, and interest in and to the Deliverables, including all intellectual property rights, copyrights, trademarks, patents, trade secrets, and proprietary rights (collectively, "Intellectual Property Rights"), shall automatically transfer and vest in the Client. The Provider hereby assigns, transfers, and conveys to the Client all such Intellectual Property Rights in the Deliverables.</p>
                    
                    <p><strong>Provider's Pre-Existing Materials:</strong> Notwithstanding the foregoing, the Provider retains all rights to any pre-existing intellectual property, tools, methodologies, templates, frameworks, software, code libraries, know-how, and materials that were developed by the Provider prior to this Agreement or independently of this engagement ("Pre-Existing Materials"). The Provider grants the Client a non-exclusive, perpetual, irrevocable, worldwide, royalty-free license to use such Pre-Existing Materials solely to the extent necessary to use and enjoy the Deliverables.</p>
                    
                    <p><strong>Third-Party Materials:</strong> If the Deliverables incorporate any third-party materials, content, software, or intellectual property, the Provider shall ensure that the Client receives appropriate licenses or permissions to use such third-party materials. The Provider represents and warrants that the use of the Deliverables by the Client will not infringe upon any third-party intellectual property rights.</p>
                    
                    <p><strong>Portfolio and Marketing Rights:</strong> The Provider retains the right to display, showcase, and reference the Deliverables, project description, and the Client's name in the Provider's portfolio, website, marketing materials, case studies, and promotional content for the purpose of demonstrating the Provider's capabilities and experience, unless the Client provides written notice objecting to such use due to confidentiality concerns. The Client may restrict such use by providing written notice to the Provider.</p>
                    
                    <p><strong>Moral Rights:</strong> To the extent permitted by applicable law, the Provider waives all moral rights, rights of attribution, and rights of integrity in the Deliverables in favor of the Client.</p>
                </div>

                <div class="section">
                    <h2>9. Confidentiality and Non-Disclosure</h2>
                    <p><strong>Confidential Information:</strong> Both Parties acknowledge that in the course of this engagement, they may have access to or become acquainted with confidential, proprietary, sensitive, or non-public information of the other Party, including but not limited to business plans, strategies, financial information, customer data, technical data, trade secrets, know-how, processes, designs, specifications, and other information that is marked as confidential or should reasonably be understood to be confidential ("Confidential Information").</p>
                    
                    <p><strong>Obligations:</strong> Each Party agrees to: (a) hold all Confidential Information of the other Party in strict confidence; (b) not disclose Confidential Information to any third party without the prior written consent of the disclosing Party; (c) use Confidential Information only for the purposes of performing obligations or exercising rights under this Agreement; (d) protect Confidential Information with the same degree of care used to protect its own confidential information, but in no event less than reasonable care; and (e) limit access to Confidential Information to employees, contractors, or agents who have a legitimate need to know and who are bound by confidentiality obligations at least as protective as those set forth herein.</p>
                    
                    <p><strong>Exceptions:</strong> Confidential Information does not include information that: (a) is or becomes publicly available through no breach of this Agreement by the receiving Party; (b) was rightfully in the possession of the receiving Party prior to disclosure by the disclosing Party; (c) is independently developed by the receiving Party without use of or reference to the Confidential Information; (d) is rightfully received by the receiving Party from a third party without breach of any confidentiality obligation; or (e) is required to be disclosed by law, regulation, court order, or legal process, provided that the receiving Party provides prompt notice to the disclosing Party and cooperates in any efforts to limit or protect such disclosure.</p>
                    
                    <p><strong>Survival:</strong> The confidentiality obligations under this Section shall survive the termination or expiration of this Agreement and shall continue for a period of 3 (three) years from the date of disclosure of the Confidential Information, or for such longer period as may be required by law or the nature of the information.</p>
                    
                    <p><strong>Data Protection:</strong> Both Parties agree to comply with all applicable data protection and privacy laws, including the Digital Personal Data Protection Act, 2023, Information Technology Act, 2000 (as amended), and related rules and regulations, in handling any personal data or sensitive personal data obtained or processed in connection with this Agreement.</p>
                </div>

                <div class="section">
                    <h2>10. Term and Termination</h2>
                    <p><strong>Term:</strong> This Agreement shall commence on the Effective Date and shall continue in full force and effect until the completion and acceptance of all Services and Deliverables, or until earlier terminated in accordance with the provisions of this Section ("Term").</p>
                    
                    <p><strong>Termination for Convenience:</strong> Either Party may terminate this Agreement for any reason or for convenience by providing 7 (seven) calendar days' prior written notice to the other Party. Written notice may be provided via email to the other Party's designated contact person or representative.</p>
                    
                    <p><strong>Termination for Cause:</strong> Either Party may terminate this Agreement immediately upon written notice if the other Party: (a) materially breaches any provision of this Agreement and fails to cure such breach within 15 (fifteen) days after receiving written notice of the breach; (b) becomes insolvent, files for bankruptcy, or enters into liquidation or receivership; (c) ceases business operations; or (d) engages in fraudulent, illegal, or unethical conduct related to this Agreement.</p>
                    
                    <p><strong>Payment Upon Termination:</strong> In the event of termination of this Agreement by either Party, regardless of the reason:</p>
                    <ul>
                        <li>The Client shall pay the Provider for all Services performed, work completed, and Deliverables provided up to and including the effective date of termination, calculated on a pro-rata basis relative to the total scope of work and Total Fees;</li>
                        <li>The Provider shall deliver to the Client all completed Deliverables, work-in-progress, materials, documents, and other work product created up to the termination date;</li>
                        <li>The Client shall reimburse the Provider for any reasonable, documented, non-refundable expenses or third-party costs incurred by the Provider prior to the termination notice;</li>
                        <li>All amounts due and payable as of the termination date shall become immediately due and payable.</li>
                    </ul>
                    
                    <p><strong>Return of Materials:</strong> Upon termination, each Party shall promptly return or destroy (at the disclosing Party's option) all Confidential Information, documents, materials, and property belonging to the other Party, and shall provide written certification of such return or destruction if requested.</p>
                    
                    <p><strong>Survival:</strong> Termination of this Agreement shall not affect any rights, obligations, or liabilities of the Parties that accrued prior to termination. The provisions of this Agreement relating to payment, intellectual property, confidentiality, warranties, limitations of liability, indemnification, governing law, and dispute resolution shall survive termination or expiration of this Agreement.</p>
                </div>

                <div class="section">
                    <h2>11. Warranties and Representations</h2>
                    <p><strong>Provider's Warranties:</strong> The Provider represents, warrants, and covenants that:</p>
                    <ul>
                        <li>The Provider has the full right, power, and authority to enter into this Agreement and to perform the obligations hereunder;</li>
                        <li>The Services shall be performed in a professional, competent, and workmanlike manner, consistent with industry standards and best practices;</li>
                        <li>The Deliverables shall be the original work of the Provider and shall not infringe upon or violate any intellectual property rights, proprietary rights, or other rights of any third party;</li>
                        <li>The Provider possesses the necessary skills, qualifications, experience, resources, licenses, and permits to perform the Services;</li>
                        <li>The Provider shall comply with all applicable laws, regulations, and professional standards in performing the Services.</li>
                    </ul>
                    
                    <p><strong>Client's Warranties:</strong> The Client represents, warrants, and covenants that:</p>
                    <ul>
                        <li>The Client has the full right, power, and authority to enter into this Agreement;</li>
                        <li>All information, materials, content, and data provided by the Client to the Provider are accurate, complete, lawful, and do not infringe upon any third-party rights;</li>
                        <li>The Client shall provide timely cooperation, information, approvals, and access necessary for the Provider to perform the Services;</li>
                        <li>The Client has the authority to approve the Deliverables and make payment under this Agreement.</li>
                    </ul>
                    
                    <p><strong>Disclaimer:</strong> EXCEPT AS EXPRESSLY PROVIDED IN THIS AGREEMENT, THE PROVIDER MAKES NO OTHER WARRANTIES, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT. THE SERVICES AND DELIVERABLES ARE PROVIDED "AS IS" EXCEPT AS MODIFIED BY THE EXPRESS WARRANTIES SET FORTH HEREIN.</p>
                </div>

                <div class="section">
                    <h2>12. Limitation of Liability and Indemnification</h2>
                    <p><strong>Limitation of Liability:</strong> Except in cases of gross negligence, willful misconduct, fraud, or intentional breach, the total aggregate liability of the Provider to the Client for any and all claims, damages, losses, liabilities, costs, and expenses arising out of or relating to this Agreement, whether based on contract, tort, negligence, strict liability, or any other legal theory, shall be limited to the total amount of fees actually paid by the Client to the Provider under this Agreement (i.e., ₹${parseFloat(data.totalAmount).toLocaleString('en-IN')}).</p>
                    
                    <p><strong>Exclusion of Consequential Damages:</strong> IN NO EVENT SHALL THE PROVIDER BE LIABLE TO THE CLIENT FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, LOSS OF REVENUE, LOSS OF DATA, LOSS OF BUSINESS OPPORTUNITIES, OR LOSS OF GOODWILL, WHETHER OR NOT THE PROVIDER HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES, AND REGARDLESS OF THE LEGAL THEORY UPON WHICH THE CLAIM IS BASED.</p>
                    
                    <p><strong>Provider's Indemnification:</strong> The Provider shall indemnify, defend, and hold harmless the Client from and against any and all third-party claims, demands, actions, liabilities, damages, losses, costs, and expenses (including reasonable attorneys' fees) arising out of or resulting from: (a) any breach by the Provider of its representations, warranties, or obligations under this Agreement; (b) any infringement or alleged infringement of third-party intellectual property rights by the Deliverables; or (c) any negligent or willful acts or omissions of the Provider.</p>
                    
                    <p><strong>Client's Indemnification:</strong> The Client shall indemnify, defend, and hold harmless the Provider from and against any and all third-party claims, demands, actions, liabilities, damages, losses, costs, and expenses (including reasonable attorneys' fees) arising out of or resulting from: (a) any breach by the Client of its representations, warranties, or obligations under this Agreement; (b) any use of the Deliverables by the Client in a manner not authorized by this Agreement or in violation of applicable laws; or (c) any infringing, unlawful, or unauthorized content or materials provided by the Client to the Provider.</p>
                    
                    <p><strong>Indemnification Procedure:</strong> The indemnified Party shall: (a) promptly notify the indemnifying Party in writing of any claim for which indemnification is sought; (b) cooperate with the indemnifying Party in the defense of such claim; and (c) allow the indemnifying Party to control the defense and settlement of the claim, provided that the indemnifying Party shall not settle any claim without the prior written consent of the indemnified Party if such settlement imposes any obligation, liability, or admission on the indemnified Party.</p>
                </div>

                <div class="section">
                    <h2>13. Force Majeure</h2>
                    <p>Neither Party shall be liable for any failure or delay in performing its obligations under this Agreement (except for payment obligations) to the extent that such failure or delay is caused by circumstances beyond the reasonable control of that Party, including but not limited to acts of God, natural disasters, earthquakes, floods, fires, epidemics, pandemics, war, terrorism, civil unrest, strikes, labor disputes, government actions, embargoes, power failures, telecommunications failures, internet disruptions, or similar events ("Force Majeure Event").</p>
                    
                    <p>The affected Party shall: (a) promptly notify the other Party in writing of the occurrence of the Force Majeure Event and its expected duration; (b) use commercially reasonable efforts to mitigate the effects of the Force Majeure Event and to resume performance as soon as practicable; and (c) provide periodic updates on the status and expected resolution of the Force Majeure Event.</p>
                    
                    <p>If a Force Majeure Event continues for more than 30 (thirty) consecutive days, either Party may terminate this Agreement upon written notice to the other Party, without liability for such termination, except that the Client shall remain obligated to pay for Services performed and expenses incurred prior to the termination.</p>
                </div>

                <div class="section">
                    <h2>14. Dispute Resolution and Arbitration</h2>
                    <p><strong>Negotiation:</strong> In the event of any dispute, controversy, disagreement, or claim arising out of or relating to this Agreement, its interpretation, performance, breach, termination, or validity (collectively, "Dispute"), the Parties shall first attempt to resolve the Dispute amicably through good faith negotiation. Either Party may initiate negotiations by providing written notice to the other Party describing the Dispute in reasonable detail.</p>
                    
                    <p><strong>Mediation:</strong> If the Parties are unable to resolve the Dispute through negotiation within 15 (fifteen) days of the initial notice, the Parties may agree to submit the Dispute to non-binding mediation conducted by a mutually agreed neutral mediator. The costs of mediation shall be shared equally by the Parties.</p>
                    
                    <p><strong>Arbitration:</strong> If the Dispute is not resolved through negotiation or mediation within 30 (thirty) days of the initial notice, or if the Parties do not agree to mediation, the Dispute shall be finally resolved by binding arbitration in accordance with the provisions of the Arbitration and Conciliation Act, 1996, as amended, and the rules thereunder. The arbitration shall be conducted by a sole arbitrator mutually appointed by the Parties. If the Parties cannot agree on an arbitrator within 15 (fifteen) days, the arbitrator shall be appointed by the competent judicial authority.</p>
                    
                    <p><strong>Arbitration Procedure:</strong> The arbitration shall be conducted in the English language (or in Hindi, if both Parties agree). The seat and venue of arbitration shall be [City to be specified based on parties' agreement]. The arbitrator's decision shall be final and binding upon the Parties, and judgment upon the award may be entered in any court of competent jurisdiction. Each Party shall bear its own costs and expenses related to the arbitration, and the Parties shall share equally the fees and expenses of the arbitrator, unless the arbitrator decides otherwise.</p>
                    
                    <p><strong>Equitable Relief:</strong> Notwithstanding the foregoing, either Party may seek interim or injunctive relief from a court of competent jurisdiction to prevent irreparable harm, protect confidential information, or preserve the status quo pending resolution of a Dispute through arbitration.</p>
                </div>

                <div class="section">
                    <h2>15. Governing Law and Jurisdiction</h2>
                    <p>This Agreement shall be governed by, construed, and interpreted in accordance with the substantive laws of India, without regard to its conflict of laws principles. The Parties submit to the exclusive jurisdiction of the courts located in [City/State to be specified] for any matters not subject to arbitration, including enforcement of arbitration awards, interim relief, or matters falling outside the scope of the arbitration clause.</p>
                    
                    <p>The Parties agree that the United Nations Convention on Contracts for the International Sale of Goods (CISG) shall not apply to this Agreement.</p>
                </div>

                <div class="section">
                    <h2>16. Miscellaneous Provisions</h2>
                    <p><strong>Entire Agreement:</strong> This Agreement, together with any exhibits, schedules, or attachments referenced herein, constitutes the entire agreement and understanding between the Parties with respect to the subject matter hereof and supersedes all prior negotiations, discussions, representations, agreements, or understandings, whether written or oral, relating to such subject matter.</p>
                    
                    <p><strong>Amendments:</strong> No amendment, modification, or waiver of any provision of this Agreement shall be effective unless made in writing and signed by authorized representatives of both Parties. Any purported amendment or modification not made in accordance with this provision shall be null and void.</p>
                    
                    <p><strong>Severability:</strong> If any provision of this Agreement is held to be invalid, illegal, or unenforceable by a court of competent jurisdiction, such provision shall be severed from this Agreement, and the remaining provisions shall continue in full force and effect to the maximum extent permitted by law. The Parties shall negotiate in good faith to replace any invalid provision with a valid provision that most closely approximates the intent and economic effect of the invalid provision.</p>
                    
                    <p><strong>Waiver:</strong> No failure or delay by either Party in exercising any right, power, or remedy under this Agreement shall operate as a waiver of such right, power, or remedy. No single or partial exercise of any right, power, or remedy shall preclude any other or further exercise thereof or the exercise of any other right, power, or remedy. Any waiver must be in writing and signed by the Party granting the waiver.</p>
                    
                    <p><strong>Assignment:</strong> Neither Party may assign, transfer, delegate, or otherwise dispose of this Agreement or any of its rights or obligations hereunder without the prior written consent of the other Party, except that either Party may assign this Agreement to a successor in connection with a merger, acquisition, or sale of substantially all of its assets, provided that the successor assumes all obligations under this Agreement.</p>
                    
                    <p><strong>Notices:</strong> All notices, requests, demands, and other communications required or permitted under this Agreement shall be in writing and shall be deemed to have been duly given: (a) upon personal delivery; (b) upon confirmation of receipt if sent by email; (c) one business day after being sent by reputable overnight courier service; or (d) three business days after being mailed by certified or registered mail, return receipt requested, postage prepaid. Notices shall be sent to the addresses or email contacts provided by the Parties.</p>
                    
                    <p><strong>Independent Contractor:</strong> The Provider is an independent contractor and not an employee, agent, partner, or joint venturer of the Client. The Provider shall be solely responsible for all taxes, insurance, benefits, and other obligations related to its performance under this Agreement. Nothing in this Agreement shall create an employment, agency, partnership, or joint venture relationship between the Parties.</p>
                    
                    <p><strong>Counterparts:</strong> This Agreement may be executed in counterparts, each of which shall be deemed an original, and all of which together shall constitute one and the same instrument. Electronic signatures and scanned signatures shall have the same legal effect as original signatures.</p>
                </div>

                <div class="section">
                    <h2>17. Acknowledgment and Signatures</h2>
                    <p>By executing this Agreement, the Parties acknowledge that they have read, understood, and agree to be bound by all terms and conditions set forth herein. Each Party represents that it has the authority to enter into this Agreement and that the individual signing on behalf of each Party has been duly authorized to do so.</p>
                    
                    <div style="margin-top: 50px;">
                        <div style="display: inline-block; width: 45%; vertical-align: top;">
                            <p><strong>SERVICE PROVIDER</strong></p>
                            <p>Signature: _______________________</p>
                            <p>Name: ${data.providerName}</p>
                            <p>Date: ___________</p>
                            <p>Place: ___________</p>
                        </div>
                        <div style="display: inline-block; width: 45%; vertical-align: top; margin-left: 5%;">
                            <p><strong>CLIENT</strong></p>
                            <p>Signature: _______________________</p>
                            <p>Name: ${data.clientName}</p>
                            <p>Date: ___________</p>
                            <p>Place: ___________</p>
                        </div>
                    </div>
                    
                    <p style="margin-top: 30px;"><strong>Witness 1:</strong></p>
                    <p>Signature: _______________________</p>
                    <p>Name: _______________________</p>
                    <p>Date: ___________</p>
                    
                    <p style="margin-top: 20px;"><strong>Witness 2:</strong></p>
                    <p>Signature: _______________________</p>
                    <p>Name: _______________________</p>
                    <p>Date: ___________</p>
                </div>
                
                <div class="section" style="margin-top: 40px; padding: 15px; background: #fef3c7; border-left: 4px solid #f59e0b;">
                    <p style="font-size: 9pt; margin: 0;"><strong>⚖️ Legal Disclaimer:</strong> This Service Agreement template is provided for general informational and educational purposes only. It is automatically generated by ShramKavach and is not a substitute for professional legal advice. Laws and regulations vary by jurisdiction, and specific circumstances may require customization or additional clauses. We strongly recommend that you consult with a qualified attorney or legal professional before using this document to ensure it complies with applicable laws and adequately protects your interests. ShramKavach and its affiliates assume no liability for any legal consequences arising from the use of this template.</p>
                </div>
            `;
            this.downloadAsPDF(content, `Service_Contract_${data.clientName.replace(/\s+/g, '_')}.pdf`);
        });
    }

    // 3. Invoice Generator
    generateInvoice() {
        this.showInputModal('GST Invoice Generator', [
            { name: 'invoiceNumber', label: 'Invoice Number', placeholder: 'INV-001' },
            { name: 'providerName', label: 'Your Business Name', placeholder: 'Your business name' },
            { name: 'providerGST', label: 'Your GST Number', placeholder: '22AAAAA0000A1Z5', required: false },
            { name: 'providerAddress', label: 'Your Address', type: 'textarea', placeholder: 'Your business address' },
            { name: 'clientName', label: 'Client Name', placeholder: 'Client name' },
            { name: 'clientAddress', label: 'Client Address', type: 'textarea', placeholder: 'Client address' },
            { name: 'itemDescription', label: 'Item/Service Description', type: 'textarea', placeholder: 'Description of services provided' },
            { name: 'amount', label: 'Amount (₹)', type: 'number', placeholder: '10000' },
            { name: 'gstRate', label: 'GST Rate (%)', type: 'select', options: ['0', '5', '12', '18', '28'] },
            { name: 'dueDate', label: 'Due Date', type: 'date' }
        ], (data) => {
            const amount = parseFloat(data.amount);
            const gstRate = parseFloat(data.gstRate);
            const gstAmount = (amount * gstRate) / 100;
            const total = amount + gstAmount;

            const content = `
                <h1>TAX INVOICE</h1>
                <div class="meta">
                    <p><strong>Invoice Number:</strong> ${data.invoiceNumber}<br>
                    <strong>Invoice Date:</strong> ${new Date().toLocaleDateString('en-IN')}<br>
                    <strong>Due Date:</strong> ${new Date(data.dueDate).toLocaleDateString('en-IN')}</p>
                </div>

                <div class="section">
                    <h2>From:</h2>
                    <p><strong>${data.providerName}</strong><br>
                    ${data.providerAddress.replace(/\n/g, '<br>')}<br>
                    ${data.providerGST ? `<strong>GSTIN:</strong> ${data.providerGST}` : ''}</p>
                </div>

                <div class="section">
                    <h2>To:</h2>
                    <p><strong>${data.clientName}</strong><br>
                    ${data.clientAddress.replace(/\n/g, '<br>')}</p>
                </div>

                <div class="section">
                    <h2>Invoice Details</h2>
                    <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                        <thead>
                            <tr style="background: #F3F4F6;">
                                <th style="border: 1px solid #E5E7EB; padding: 10px; text-align: left;">Description</th>
                                <th style="border: 1px solid #E5E7EB; padding: 10px; text-align: right;">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style="border: 1px solid #E5E7EB; padding: 10px;">${data.itemDescription}</td>
                                <td style="border: 1px solid #E5E7EB; padding: 10px; text-align: right;">₹${amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                            </tr>
                            ${gstRate > 0 ? `
                            <tr>
                                <td style="border: 1px solid #E5E7EB; padding: 10px;">GST @ ${gstRate}%</td>
                                <td style="border: 1px solid #E5E7EB; padding: 10px; text-align: right;">₹${gstAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                            </tr>
                            ` : ''}
                            <tr style="background: #F9FAFB; font-weight: bold;">
                                <td style="border: 1px solid #E5E7EB; padding: 10px;">Total Amount</td>
                                <td style="border: 1px solid #E5E7EB; padding: 10px; text-align: right;">₹${total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="section">
                    <h2>Amount in Words</h2>
                    <p>${this.numberToWords(total)} Rupees Only</p>
                </div>

                <div class="section">
                    <h2>Payment Terms</h2>
                    <ul>
                        <li>Payment due within 7 days of invoice date</li>
                        <li>Late payments will attract 18% per annum interest</li>
                        <li>Please include invoice number in payment reference</li>
                    </ul>
                </div>

                <div class="section">
                    <h2>Bank Details</h2>
                    <p><em>[Add your bank account details for payment]</em></p>
                </div>

                <div class="section">
                    <p style="margin-top: 40px;"><strong>Authorized Signatory</strong><br><br>
                    _______________________<br>
                    ${data.providerName}</p>
                </div>
            `;
            this.downloadAsPDF(content, `Invoice_${data.invoiceNumber}.pdf`);
        });
    }

    // Helper: Number to Words
    numberToWords(num) {
        const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
        const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
        const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];

        if (num === 0) return 'Zero';

        const convert = (n) => {
            if (n < 10) return ones[n];
            if (n < 20) return teens[n - 10];
            if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 ? ' ' + ones[n % 10] : '');
            if (n < 1000) return ones[Math.floor(n / 100)] + ' Hundred' + (n % 100 ? ' and ' + convert(n % 100) : '');
            if (n < 100000) return convert(Math.floor(n / 1000)) + ' Thousand' + (n % 1000 ? ' ' + convert(n % 1000) : '');
            return convert(Math.floor(n / 100000)) + ' Lakh' + (n % 100000 ? ' ' + convert(n % 100000) : '');
        };

        return convert(Math.floor(num));
    }

    // 4. Quotation Maker
    generateQuotation() {
        this.showInputModal('Quotation Generator', [
            { name: 'quoteNumber', label: 'Quotation Number', placeholder: 'QT-001' },
            { name: 'providerName', label: 'Your Business Name' },
            { name: 'clientName', label: 'Client Name' },
            { name: 'items', label: 'Items/Services (comma separated)', type: 'textarea', placeholder: 'Service 1, Service 2, Service 3' },
            { name: 'prices', label: 'Prices (comma separated)', placeholder: '5000, 10000, 7500' },
            { name: 'validityDays', label: 'Valid for (days)', type: 'number', placeholder: '30' },
            { name: 'notes', label: 'Terms & Conditions', type: 'textarea', placeholder: 'Payment terms, delivery timeline, etc.', required: false }
        ], (data) => {
            const items = data.items.split(',').map(i => i.trim());
            const prices = data.prices.split(',').map(p => parseFloat(p.trim()));
            const total = prices.reduce((sum, p) => sum + p, 0);
            const validUntil = new Date();
            validUntil.setDate(validUntil.getDate() + parseInt(data.validityDays));

            const content = `
                <h1>QUOTATION</h1>
                <div class="meta">
                    <p><strong>Quotation Number:</strong> ${data.quoteNumber}<br>
                    <strong>Date:</strong> ${new Date().toLocaleDateString('en-IN')}<br>
                    <strong>Valid Until:</strong> ${validUntil.toLocaleDateString('en-IN')}</p>
                </div>

                <div class="section">
                    <p><strong>From:</strong> ${data.providerName}<br>
                    <strong>To:</strong> ${data.clientName}</p>
                </div>

                <div class="section">
                    <h2>Price Breakdown</h2>
                    <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                        <thead>
                            <tr style="background: #F3F4F6;">
                                <th style="border: 1px solid #E5E7EB; padding: 10px; text-align: left;">Item/Service</th>
                                <th style="border: 1px solid #E5E7EB; padding: 10px; text-align: right;">Price (₹)</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${items.map((item, i) => `
                            <tr>
                                <td style="border: 1px solid #E5E7EB; padding: 10px;">${item}</td>
                                <td style="border: 1px solid #E5E7EB; padding: 10px; text-align: right;">₹${prices[i].toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                            </tr>
                            `).join('')}
                            <tr style="background: #F9FAFB; font-weight: bold;">
                                <td style="border: 1px solid #E5E7EB; padding: 10px;">Total</td>
                                <td style="border: 1px solid #E5E7EB; padding: 10px; text-align: right;">₹${total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                ${data.notes ? `
                <div class="section">
                    <h2>Terms & Conditions</h2>
                    <p>${data.notes}</p>
                </div>
                ` : ''}

                <div class="section">
                    <h2>Validity</h2>
                    <p>This quotation is valid for ${data.validityDays} days from the date of issue.</p>
                </div>

                <div class="section">
                    <p style="margin-top: 40px;"><strong>Prepared by</strong><br><br>
                    _______________________<br>
                    ${data.providerName}</p>
                </div>
            `;
            this.downloadAsPDF(content, `Quotation_${data.quoteNumber}.pdf`);
        });
    }

    // 5. Termination Letter
    generateTerminationLetter() {
        this.showInputModal('Termination/Resignation Letter', [
            { name: 'type', label: 'Letter Type', type: 'select', options: ['Resignation', 'Termination Notice', 'Contract End Notice'] },
            { name: 'senderName', label: 'Your Name' },
            { name: 'recipientName', label: 'Recipient Name (Client/Platform)' },
            { name: 'noticePeriod', label: 'Notice Period', placeholder: 'e.g., 15 days, 1 month' },
            { name: 'lastWorkingDate', label: 'Last Working Date', type: 'date' },
            { name: 'reason', label: 'Reason (optional)', type: 'textarea', placeholder: 'Brief reason for termination', required: false }
        ], (data) => {
            const content = `
                <h1>${data.type}</h1>
                <div class="meta">
                    <p><strong>Date:</strong> ${new Date().toLocaleDateString('en-IN')}</p>
                </div>

                <div class="section">
                    <p>To,<br>
                    <strong>${data.recipientName}</strong></p>
                </div>

                <div class="section">
                    <p>Dear Sir/Madam,</p>
                    <p>Subject: <strong>${data.type}</strong></p>
                </div>

                <div class="section">
                    <p>${data.type === 'Resignation' ? 
                        `I am writing to formally notify you of my resignation from my position. As per the terms of our agreement, I am providing ${data.noticePeriod} notice.` :
                        `This letter serves as formal notice of termination of our working relationship. As per our agreement terms, I am providing ${data.noticePeriod} notice.`
                    }</p>
                    
                    <p>My last working day will be <strong>${new Date(data.lastWorkingDate).toLocaleDateString('en-IN')}</strong>.</p>

                    ${data.reason ? `<p>${data.reason}</p>` : ''}

                    <p>I will ensure a smooth transition and complete all pending work before my departure. Please let me know if there are any formalities or handover procedures to be completed.</p>

                    <p>I would like to thank you for the opportunity to work together. I hope we can maintain a positive professional relationship going forward.</p>
                </div>

                <div class="section">
                    <p>Sincerely,</p>
                    <p style="margin-top: 40px;">_______________________<br>
                    <strong>${data.senderName}</strong><br>
                    Date: ${new Date().toLocaleDateString('en-IN')}</p>
                </div>
            `;
            this.downloadAsPDF(content, `${data.type.replace(/\s+/g, '_')}_Letter.pdf`);
        });
    }

    // 6-30: Implementing remaining generators with similar patterns
    // For brevity, I'll show key ones and others follow same structure

    generatePaymentReminder() {
        this.showInputModal('Payment Reminder Generator', [
            { name: 'level', label: 'Reminder Level', type: 'select', options: ['Gentle Reminder (1st)', 'Firm Reminder (2nd)', 'Final Notice (3rd)'] },
            { name: 'clientName', label: 'Client Name' },
            { name: 'invoiceNumber', label: 'Invoice Number' },
            { name: 'amount', label: 'Outstanding Amount (₹)', type: 'number' },
            { name: 'dueDate', label: 'Original Due Date', type: 'date' },
            { name: 'daysPast', label: 'Days Overdue', type: 'number' }
        ], (data) => {
            let tone = '';
            if (data.level.includes('1st')) {
                tone = `I hope this message finds you well. This is a gentle reminder regarding the outstanding payment for Invoice ${data.invoiceNumber}.`;
            } else if (data.level.includes('2nd')) {
                tone = `This is a follow-up to my previous reminder regarding the overdue payment for Invoice ${data.invoiceNumber}. The payment was due on ${new Date(data.dueDate).toLocaleDateString('en-IN')}, which is now ${data.daysPast} days past due.`;
            } else {
                tone = `This is a FINAL NOTICE regarding the seriously overdue payment for Invoice ${data.invoiceNumber}. Despite previous reminders, the payment remains unpaid for ${data.daysPast} days.`;
            }

            const content = `
                <h1>Payment Reminder - ${data.level}</h1>
                <div class="meta">
                    <p><strong>Date:</strong> ${new Date().toLocaleDateString('en-IN')}<br>
                    <strong>Invoice Number:</strong> ${data.invoiceNumber}<br>
                    <strong>Amount Due:</strong> ₹${parseFloat(data.amount).toLocaleString('en-IN')}</p>
                </div>

                <div class="section">
                    <p>Dear ${data.clientName},</p>
                    <p>${tone}</p>
                    
                    <p><strong>Payment Details:</strong><br>
                    Invoice Number: ${data.invoiceNumber}<br>
                    Amount: ₹${parseFloat(data.amount).toLocaleString('en-IN')}<br>
                    Due Date: ${new Date(data.dueDate).toLocaleDateString('en-IN')}<br>
                    Days Overdue: ${data.daysPast} days</p>

                    ${data.level.includes('3rd') ? `
                    <p style="color: #DC2626; font-weight: bold;">If payment is not received within 3 business days, I will be forced to take legal action including filing a complaint with the appropriate authorities and pursuing collection through legal channels. This may result in additional costs and damage to your credit rating.</p>
                    ` : `
                    <p>Please arrange for payment at your earliest convenience. If you have already made the payment, please share the transaction details for our records.</p>
                    `}

                    <p>If there are any issues or concerns regarding this invoice, please contact me immediately so we can resolve them.</p>

                    <p>Thank you for your prompt attention to this matter.</p>
                </div>

                <div class="section">
                    <p>Best regards,<br>
                    <em>[Your Name]</em></p>
                </div>
            `;
            this.downloadAsPDF(content, `Payment_Reminder_${data.invoiceNumber}.pdf`);
        });
    }

    generateLegalNotice() {
        this.showInputModal('Legal Notice Generator', [
            { name: 'noticeType', label: 'Notice Type', type: 'select', options: ['Non-Payment', 'Breach of Contract', 'Defamation', 'Dispute Resolution', 'Other'] },
            { name: 'senderName', label: 'Your Name/Business' },
            { name: 'recipientName', label: 'Recipient Name' },
            { name: 'recipientAddress', label: 'Recipient Address', type: 'textarea' },
            { name: 'facts', label: 'Statement of Facts', type: 'textarea', placeholder: 'Describe the issue, dates, amounts, etc.' },
            { name: 'demand', label: 'Demand/Relief Sought', type: 'textarea', placeholder: 'What action do you want them to take?' },
            { name: 'deadline', label: 'Response Deadline (days)', type: 'number', placeholder: '15' }
        ], (data) => {
            const deadlineDate = new Date();
            deadlineDate.setDate(deadlineDate.getDate() + parseInt(data.deadline));

            const content = `
                <h1>LEGAL NOTICE</h1>
                <div class="meta">
                    <p><strong>Date:</strong> ${new Date().toLocaleDateString('en-IN')}<br>
                    <strong>Notice Type:</strong> ${data.noticeType}</p>
                </div>

                <div class="section">
                    <p><strong>TO:</strong><br>
                    ${data.recipientName}<br>
                    ${data.recipientAddress.replace(/\n/g, '<br>')}</p>
                </div>

                <div class="section">
                    <p><strong>FROM:</strong><br>
                    ${data.senderName}</p>
                </div>

                <div class="section">
                    <p>Subject: <strong>Legal Notice - ${data.noticeType}</strong></p>
                </div>

                <div class="section">
                    <p>Dear Sir/Madam,</p>
                    <p>Under instructions from my client, ${data.senderName}, I hereby serve you with this Legal Notice under the following circumstances:</p>
                </div>

                <div class="section">
                    <h2>STATEMENT OF FACTS</h2>
                    <p>${data.facts}</p>
                </div>

                <div class="section">
                    <h2>DEMAND</h2>
                    <p>My client hereby demands that you:</p>
                    <p>${data.demand}</p>
                </div>

                <div class="section">
                    <h2>DEADLINE FOR COMPLIANCE</h2>
                    <p>You are required to comply with the above demands within <strong>${data.deadline} days</strong> from the date of receipt of this notice, i.e., by <strong>${deadlineDate.toLocaleDateString('en-IN')}</strong>.</p>
                    
                    <p style="color: #DC2626; font-weight: bold;">TAKE NOTICE that if you fail to comply with this demand within the stipulated time, my client will be constrained to initiate appropriate legal proceedings against you without further reference to you. In such proceedings, you shall be liable for all costs, charges, and consequences.</p>
                </div>

                <div class="section">
                    <p>This notice is issued without prejudice to the rights, remedies, and contentions of my client, all of which are expressly reserved.</p>
                </div>

                <div class="section">
                    <p style="margin-top: 40px;">Yours faithfully,</p>
                    <p><em>[Advocate Name & Details]</em><br>
                    <em>[On behalf of ${data.senderName}]</em></p>
                </div>
            `;
            this.downloadAsPDF(content, `Legal_Notice_${data.noticeType.replace(/\s+/g, '_')}.pdf`);
        });
    }

    // 8. NDA Agreement
    generateNDA() {
        this.showInputModal('Non-Disclosure Agreement', [
            { name: 'ndaType', label: 'NDA Type', type: 'select', options: ['Unilateral (One-way)', 'Bilateral (Mutual)'] },
            { name: 'disclosingParty', label: 'Disclosing Party Name', placeholder: 'Party sharing information' },
            { name: 'receivingParty', label: 'Receiving Party Name', placeholder: 'Party receiving information' },
            { name: 'purpose', label: 'Purpose of Disclosure', type: 'textarea', placeholder: 'Why is information being shared?' },
            { name: 'duration', label: 'Duration (years)', type: 'number', placeholder: '2' },
            { name: 'effectiveDate', label: 'Effective Date', type: 'date' }
        ], (data) => {
            const content = `
                <h1>NON-DISCLOSURE AGREEMENT (${data.ndaType})</h1>
                <div class="meta">
                    <p><strong>Date:</strong> ${new Date(data.effectiveDate).toLocaleDateString('en-IN')}</p>
                </div>

                <div class="section">
                    <p>This Non-Disclosure Agreement ("Agreement") is entered into on ${new Date(data.effectiveDate).toLocaleDateString('en-IN')} between:</p>
                    <p><strong>Disclosing Party:</strong> ${data.disclosingParty}<br>
                    ${data.ndaType.includes('Bilateral') ? `<strong>Receiving Party:</strong> ${data.receivingParty}` : `<strong>Receiving Party:</strong> ${data.receivingParty}`}</p>
                </div>

                <div class="section">
                    <h2>1. Purpose</h2>
                    <p>${data.purpose}</p>
                </div>

                <div class="section">
                    <h2>2. Definition of Confidential Information</h2>
                    <p>"Confidential Information" means any data or information that is proprietary to the Disclosing Party and not generally known to the public, including but not limited to:</p>
                    <ul>
                        <li>Business plans, strategies, and financial information</li>
                        <li>Technical data, designs, and processes</li>
                        <li>Customer lists and supplier information</li>
                        <li>Trade secrets and intellectual property</li>
                        <li>Any information marked as "Confidential"</li>
                    </ul>
                </div>

                <div class="section">
                    <h2>3. Obligations of Receiving Party</h2>
                    <ul>
                        <li>Keep all Confidential Information strictly confidential</li>
                        <li>Use the information solely for the stated purpose</li>
                        <li>Not disclose to any third party without written consent</li>
                        <li>Take reasonable security measures to protect the information</li>
                        <li>Limit access only to those with a need to know</li>
                    </ul>
                </div>

                <div class="section">
                    <h2>4. Exclusions</h2>
                    <p>This Agreement does not apply to information that:</p>
                    <ul>
                        <li>Was publicly known at the time of disclosure</li>
                        <li>Becomes publicly known through no fault of Receiving Party</li>
                        <li>Was already in Receiving Party's possession</li>
                        <li>Is independently developed by Receiving Party</li>
                        <li>Is required to be disclosed by law or court order</li>
                    </ul>
                </div>

                <div class="section">
                    <h2>5. Term</h2>
                    <p>This Agreement shall remain in effect for <strong>${data.duration} years</strong> from the effective date. The obligation to protect Confidential Information shall survive the termination of this Agreement for an additional ${data.duration} years.</p>
                </div>

                <div class="section">
                    <h2>6. Return of Information</h2>
                    <p>Upon termination or request, Receiving Party shall return or destroy all Confidential Information and certify such destruction in writing.</p>
                </div>

                <div class="section">
                    <h2>7. Remedies</h2>
                    <p>The parties acknowledge that breach of this Agreement may cause irreparable harm for which monetary damages may be inadequate. The Disclosing Party shall be entitled to seek injunctive relief in addition to all other available remedies.</p>
                </div>

                <div class="section">
                    <h2>8. Governing Law</h2>
                    <p>This Agreement shall be governed by the laws of India.</p>
                </div>

                <div class="section">
                    <h2>Signatures</h2>
                    <p>_______________________<br><strong>${data.disclosingParty}</strong><br>Date: ___________</p>
                    <br>
                    <p>_______________________<br><strong>${data.receivingParty}</strong><br>Date: ___________</p>
                </div>
            `;
            this.downloadAsPDF(content, `NDA_${data.receivingParty.replace(/\s+/g, '_')}.pdf`);
        });
    }

    // 9. Work Agreement
    generateWorkAgreement() {
        this.showInputModal('Work Agreement / Scope of Work', [
            { name: 'clientName', label: 'Client Name' },
            { name: 'providerName', label: 'Service Provider Name' },
            { name: 'projectName', label: 'Project Name', placeholder: 'e.g., Website Development' },
            { name: 'scope', label: 'Scope of Work', type: 'textarea', placeholder: 'Detailed description of work to be done' },
            { name: 'deliverables', label: 'Deliverables (comma separated)', type: 'textarea', placeholder: 'Deliverable 1, Deliverable 2, Deliverable 3' },
            { name: 'milestones', label: 'Milestones (comma separated)', type: 'textarea', placeholder: 'Phase 1 - 30%, Phase 2 - 40%, Phase 3 - 30%' },
            { name: 'timeline', label: 'Total Timeline', placeholder: 'e.g., 60 days' },
            { name: 'amount', label: 'Total Amount (₹)', type: 'number' },
            { name: 'revisions', label: 'Included Revisions', type: 'number', placeholder: '2' }
        ], (data) => {
            const deliverables = data.deliverables.split(',').map(d => d.trim());
            const milestones = data.milestones.split(',').map(m => m.trim());

            const content = `
                <h1>WORK AGREEMENT</h1>
                <div class="meta">
                    <p><strong>Project:</strong> ${data.projectName}<br>
                    <strong>Date:</strong> ${new Date().toLocaleDateString('en-IN')}</p>
                </div>

                <div class="section">
                    <p><strong>Client:</strong> ${data.clientName}<br>
                    <strong>Service Provider:</strong> ${data.providerName}</p>
                </div>

                <div class="section">
                    <h2>1. Scope of Work</h2>
                    <p>${data.scope}</p>
                </div>

                <div class="section">
                    <h2>2. Deliverables</h2>
                    <ul>
                        ${deliverables.map(d => `<li>${d}</li>`).join('')}
                    </ul>
                </div>

                <div class="section">
                    <h2>3. Timeline & Milestones</h2>
                    <p><strong>Total Duration:</strong> ${data.timeline}</p>
                    <ul>
                        ${milestones.map(m => `<li>${m}</li>`).join('')}
                    </ul>
                </div>

                <div class="section">
                    <h2>4. Payment Terms</h2>
                    <p><strong>Total Amount:</strong> ₹${parseFloat(data.amount).toLocaleString('en-IN')}</p>
                    <p>Payment shall be made as per the milestone schedule mentioned above.</p>
                </div>

                <div class="section">
                    <h2>5. Revisions</h2>
                    <p>This agreement includes up to <strong>${data.revisions} rounds of revisions</strong> for each deliverable. Additional revisions beyond this will be charged separately at mutually agreed rates.</p>
                </div>

                <div class="section">
                    <h2>6. Approval Process</h2>
                    <p>Client shall provide feedback and approval within 5 business days of deliverable submission. Delays in approval may extend the project timeline accordingly.</p>
                </div>

                <div class="section">
                    <h2>7. Client Responsibilities</h2>
                    <ul>
                        <li>Provide all necessary materials, content, and access</li>
                        <li>Respond to queries within reasonable time</li>
                        <li>Make timely milestone payments</li>
                        <li>Provide clear and consolidated feedback</li>
                    </ul>
                </div>

                <div class="section">
                    <h2>8. Intellectual Property</h2>
                    <p>Upon full payment, all intellectual property rights shall transfer to the Client. Service Provider retains the right to showcase the work in portfolio unless otherwise agreed.</p>
                </div>

                <div class="section">
                    <h2>9. Termination</h2>
                    <p>Either party may terminate with 7 days written notice. Client shall pay for work completed up to termination date on a pro-rata basis.</p>
                </div>

                <div class="section">
                    <h2>Acceptance</h2>
                    <p>_______________________<br><strong>${data.providerName}</strong><br>Date: ___________</p>
                    <br>
                    <p>_______________________<br><strong>${data.clientName}</strong><br>Date: ___________</p>
                </div>
            `;
            this.downloadAsPDF(content, `Work_Agreement_${data.projectName.replace(/\s+/g, '_')}.pdf`);
        });
    }

    // 10. Complaint Letter
    generateComplaint() {
        this.showInputModal('Complaint Letter Generator', [
            { name: 'complaintTo', label: 'Complaint To', type: 'select', options: ['Labour Commissioner', 'Consumer Forum', 'Platform Management', 'Police Station', 'Company HR'] },
            { name: 'yourName', label: 'Your Name' },
            { name: 'yourAddress', label: 'Your Address', type: 'textarea' },
            { name: 'yourPhone', label: 'Your Phone', placeholder: '+91 9876543210' },
            { name: 'recipientName', label: 'Recipient Name/Designation' },
            { name: 'recipientAddress', label: 'Recipient Address', type: 'textarea' },
            { name: 'subject', label: 'Subject', placeholder: 'Brief subject of complaint' },
            { name: 'incidentDate', label: 'Date of Incident', type: 'date' },
            { name: 'complaint', label: 'Detailed Complaint', type: 'textarea', placeholder: 'Describe the issue in detail with facts, dates, amounts, names' },
            { name: 'evidence', label: 'Evidence Available', type: 'textarea', placeholder: 'List documents, screenshots, witnesses etc.', required: false },
            { name: 'relief', label: 'Relief Sought', type: 'textarea', placeholder: 'What action/compensation do you want?' }
        ], (data) => {
            const content = `
                <h1>COMPLAINT LETTER</h1>
                <div class="meta">
                    <p><strong>Date:</strong> ${new Date().toLocaleDateString('en-IN')}</p>
                </div>

                <div class="section">
                    <p><strong>From:</strong><br>
                    ${data.yourName}<br>
                    ${data.yourAddress.replace(/\n/g, '<br>')}<br>
                    Phone: ${data.yourPhone}</p>
                </div>

                <div class="section">
                    <p><strong>To:</strong><br>
                    ${data.recipientName}<br>
                    ${data.complaintTo}<br>
                    ${data.recipientAddress.replace(/\n/g, '<br>')}</p>
                </div>

                <div class="section">
                    <p><strong>Subject:</strong> ${data.subject}</p>
                </div>

                <div class="section">
                    <p>Respected Sir/Madam,</p>
                    <p>I am writing to file a formal complaint regarding the following matter:</p>
                </div>

                <div class="section">
                    <h2>Details of Complaint</h2>
                    <p><strong>Date of Incident:</strong> ${new Date(data.incidentDate).toLocaleDateString('en-IN')}</p>
                    <p>${data.complaint}</p>
                </div>

                ${data.evidence ? `
                <div class="section">
                    <h2>Supporting Evidence</h2>
                    <p>${data.evidence}</p>
                </div>
                ` : ''}

                <div class="section">
                    <h2>Relief Sought</h2>
                    <p>${data.relief}</p>
                </div>

                <div class="section">
                    <p>I request you to kindly take necessary action in this matter at the earliest. I am available for any further information or clarification.</p>
                    <p>Thanking you,</p>
                </div>

                <div class="section">
                    <p style="margin-top: 40px;">Yours faithfully,</p>
                    <p>_______________________<br>
                    <strong>${data.yourName}</strong><br>
                    Phone: ${data.yourPhone}<br>
                    Date: ${new Date().toLocaleDateString('en-IN')}</p>
                </div>

                <div class="section">
                    <p><strong>Enclosures:</strong> [List any documents attached]</p>
                </div>
            `;
            this.downloadAsPDF(content, `Complaint_${data.complaintTo.replace(/\s+/g, '_')}.pdf`);
        });
    }

    // 11. Grievance Form
    generateGrievance() {
        this.showInputModal('Grievance Submission Form', [
            { name: 'grievanceType', label: 'Grievance Type', type: 'select', options: ['Payment Dispute', 'Unfair Deactivation', 'Discrimination', 'Safety Issue', 'Harassment', 'Policy Violation', 'Other'] },
            { name: 'workerName', label: 'Your Name' },
            { name: 'workerId', label: 'Worker/Partner ID', placeholder: 'Your ID on platform' },
            { name: 'phone', label: 'Contact Phone' },
            { name: 'email', label: 'Email Address', type: 'email' },
            { name: 'platform', label: 'Platform/Company Name' },
            { name: 'incidentDate', label: 'Date of Incident', type: 'date' },
            { name: 'description', label: 'Detailed Description', type: 'textarea', placeholder: 'Describe what happened with specific details' },
            { name: 'witnesses', label: 'Witnesses (if any)', placeholder: 'Names and contact details', required: false },
            { name: 'previousComplaints', label: 'Previous Complaints?', type: 'select', options: ['No', 'Yes - ticket/complaint number provided below'] },
            { name: 'ticketNumber', label: 'Previous Ticket Number', placeholder: 'If applicable', required: false },
            { name: 'desiredResolution', label: 'Desired Resolution', type: 'textarea', placeholder: 'What outcome do you want?' }
        ], (data) => {
            const content = `
                <h1>WORKER GRIEVANCE FORM</h1>
                <div class="meta">
                    <p><strong>Submission Date:</strong> ${new Date().toLocaleDateString('en-IN')}<br>
                    <strong>Grievance ID:</strong> GRV-${Date.now()}</p>
                </div>

                <div class="section">
                    <h2>Worker Information</h2>
                    <p><strong>Name:</strong> ${data.workerName}<br>
                    <strong>Worker/Partner ID:</strong> ${data.workerId}<br>
                    <strong>Phone:</strong> ${data.phone}<br>
                    <strong>Email:</strong> ${data.email}<br>
                    <strong>Platform:</strong> ${data.platform}</p>
                </div>

                <div class="section">
                    <h2>Grievance Details</h2>
                    <p><strong>Type:</strong> ${data.grievanceType}<br>
                    <strong>Date of Incident:</strong> ${new Date(data.incidentDate).toLocaleDateString('en-IN')}</p>
                </div>

                <div class="section">
                    <h2>Description of Grievance</h2>
                    <p>${data.description}</p>
                </div>

                ${data.witnesses ? `
                <div class="section">
                    <h2>Witnesses</h2>
                    <p>${data.witnesses}</p>
                </div>
                ` : ''}

                <div class="section">
                    <h2>Previous Complaints</h2>
                    <p>${data.previousComplaints}</p>
                    ${data.ticketNumber ? `<p><strong>Ticket/Complaint Number:</strong> ${data.ticketNumber}</p>` : ''}
                </div>

                <div class="section">
                    <h2>Desired Resolution</h2>
                    <p>${data.desiredResolution}</p>
                </div>

                <div class="section">
                    <h2>Declaration</h2>
                    <p>I hereby declare that the information provided above is true and correct to the best of my knowledge. I understand that providing false information may result in rejection of this grievance.</p>
                </div>

                <div class="section">
                    <p style="margin-top: 40px;">_______________________<br>
                    <strong>${data.workerName}</strong><br>
                    Date: ${new Date().toLocaleDateString('en-IN')}</p>
                </div>

                <div class="section">
                    <h2>For Official Use Only</h2>
                    <p>Received Date: ___________<br>
                    Assigned To: ___________<br>
                    Status: ___________<br>
                    Resolution Date: ___________</p>
                </div>
            `;
            this.downloadAsPDF(content, `Grievance_${data.workerName.replace(/\s+/g, '_')}.pdf`);
        });
    }

    // 12. Income Certificate
    generateIncomeCertificate() {
        this.showInputModal('Income Certificate Generator', [
            { name: 'workerName', label: 'Your Name' },
            { name: 'address', label: 'Address', type: 'textarea' },
            { name: 'workType', label: 'Type of Work', placeholder: 'e.g., Delivery Partner, Freelancer' },
            { name: 'platform', label: 'Platform/Company', placeholder: 'e.g., Swiggy, Zomato, Freelance' },
            { name: 'monthlyIncome', label: 'Average Monthly Income (₹)', type: 'number' },
            { name: 'yearlyIncome', label: 'Annual Income (₹)', type: 'number' },
            { name: 'period', label: 'Income Period', placeholder: 'e.g., January 2024 - December 2024' },
            { name: 'purpose', label: 'Purpose of Certificate', placeholder: 'e.g., Loan application, Visa, Rental' }
        ], (data) => {
            const content = `
                <h1>INCOME CERTIFICATE</h1>
                <div class="meta">
                    <p><strong>Certificate Date:</strong> ${new Date().toLocaleDateString('en-IN')}<br>
                    <strong>Certificate No:</strong> INC-${Date.now()}</p>
                </div>

                <div class="section">
                    <p>This is to certify that:</p>
                </div>

                <div class="section">
                    <h2>Personal Information</h2>
                    <p><strong>Name:</strong> ${data.workerName}<br>
                    <strong>Address:</strong> ${data.address.replace(/\n/g, '<br>')}<br>
                    <strong>Occupation:</strong> ${data.workType}<br>
                    <strong>Platform/Company:</strong> ${data.platform}</p>
                </div>

                <div class="section">
                    <h2>Income Details</h2>
                    <p><strong>Period:</strong> ${data.period}</p>
                    <p><strong>Average Monthly Income:</strong> ₹${parseFloat(data.monthlyIncome).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</p>
                    <p><strong>Annual Income:</strong> ₹${parseFloat(data.yearlyIncome).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</p>
                    <p><strong>In Words:</strong> ${this.numberToWords(data.yearlyIncome)} Rupees Only (Per Annum)</p>
                </div>

                <div class="section">
                    <h2>Purpose</h2>
                    <p>This certificate is issued for the purpose of: <strong>${data.purpose}</strong></p>
                </div>

                <div class="section">
                    <h2>Declaration</h2>
                    <p>I hereby declare that the income information provided above is true and correct based on my earnings records. I understand that this certificate is for the stated purpose only.</p>
                </div>

                <div class="section">
                    <p style="margin-top: 40px;">_______________________<br>
                    <strong>${data.workerName}</strong><br>
                    Date: ${new Date().toLocaleDateString('en-IN')}</p>
                </div>

                <div class="section">
                    <p><em>Note: This is a self-declaration certificate. For official purposes, supporting documents such as bank statements, platform earnings reports, or ITR may be required.</em></p>
                </div>
            `;
            this.downloadAsPDF(content, `Income_Certificate_${data.workerName.replace(/\s+/g, '_')}.pdf`);
        });
    }

    // 13. Experience Letter
    generateExperienceLetter() {
        this.showInputModal('Experience Letter Generator', [
            { name: 'workerName', label: 'Worker Name' },
            { name: 'clientCompany', label: 'Client/Platform Name', placeholder: 'Who is issuing this letter?' },
            { name: 'designation', label: 'Designation/Role', placeholder: 'e.g., Delivery Partner, Freelance Developer' },
            { name: 'startDate', label: 'Work Start Date', type: 'date' },
            { name: 'endDate', label: 'Work End Date', type: 'date' },
            { name: 'responsibilities', label: 'Key Responsibilities', type: 'textarea', placeholder: 'List main duties and responsibilities' },
            { name: 'skills', label: 'Skills Demonstrated', placeholder: 'e.g., Time management, Customer service', required: false },
            { name: 'projects', label: 'Notable Projects/Achievements', type: 'textarea', placeholder: 'List key accomplishments', required: false },
            { name: 'performance', label: 'Performance Rating', type: 'select', options: ['Excellent', 'Very Good', 'Good', 'Satisfactory'] }
        ], (data) => {
            const startDate = new Date(data.startDate);
            const endDate = new Date(data.endDate);
            const months = (endDate.getFullYear() - startDate.getFullYear()) * 12 + (endDate.getMonth() - startDate.getMonth());
            const years = Math.floor(months / 12);
            const remainingMonths = months % 12;
            const duration = years > 0 ? `${years} year${years > 1 ? 's' : ''} and ${remainingMonths} month${remainingMonths > 1 ? 's' : ''}` : `${remainingMonths} month${remainingMonths > 1 ? 's' : ''}`;

            const content = `
                <h1>EXPERIENCE CERTIFICATE</h1>
                <div class="meta">
                    <p><strong>Date:</strong> ${new Date().toLocaleDateString('en-IN')}<br>
                    <strong>Ref No:</strong> EXP-${Date.now()}</p>
                </div>

                <div class="section">
                    <p>TO WHOMEVER IT MAY CONCERN</p>
                </div>

                <div class="section">
                    <p>This is to certify that <strong>${data.workerName}</strong> worked with <strong>${data.clientCompany}</strong> as <strong>${data.designation}</strong> from <strong>${startDate.toLocaleDateString('en-IN')}</strong> to <strong>${endDate.toLocaleDateString('en-IN')}</strong> (${duration}).</p>
                </div>

                <div class="section">
                    <h2>Responsibilities</h2>
                    <p>${data.responsibilities}</p>
                </div>

                ${data.skills ? `
                <div class="section">
                    <h2>Skills & Competencies</h2>
                    <p>${data.skills}</p>
                </div>
                ` : ''}

                ${data.projects ? `
                <div class="section">
                    <h2>Key Achievements</h2>
                    <p>${data.projects}</p>
                </div>
                ` : ''}

                <div class="section">
                    <p>During the tenure, ${data.workerName} demonstrated <strong>${data.performance.toLowerCase()}</strong> performance and maintained professional conduct.</p>
                </div>

                <div class="section">
                    <p>We wish ${data.workerName} all the best for future endeavors.</p>
                </div>

                <div class="section">
                    <p style="margin-top: 40px;">For <strong>${data.clientCompany}</strong></p>
                    <p>_______________________<br>
                    Authorized Signatory<br>
                    Date: ${new Date().toLocaleDateString('en-IN')}</p>
                </div>

                <div class="section">
                    <p><em>[Company Seal/Stamp]</em></p>
                </div>
            `;
            this.downloadAsPDF(content, `Experience_Letter_${data.workerName.replace(/\s+/g, '_')}.pdf`);
        });
    }

    // Remaining 18 generators with complete implementations
    generatePaymentTerms() { this.generateDetailedPaymentTerms(); }
    generateIPRights() { this.generateDetailedIPRights(); }
    generateRefundPolicy() { this.generateDetailedRefundPolicy(); }
    generateTermsConditions() { this.generateDetailedTermsConditions(); }
    generateSLA() { this.generateDetailedSLA(); }
    generateNonCompete() { this.generateDetailedNonCompete(); }
    generateLiabilityWaiver() { this.generateDetailedLiabilityWaiver(); }
    generateTestimonialRelease() { this.generateDetailedTestimonialRelease(); }
    generatePartnership() { this.generateDetailedPartnership(); }
    generateWorkLog() { this.generateDetailedWorkLog(); }
    generateExpenseReport() { this.generateDetailedExpenseReport(); }
    generateAccidentReport() { this.generateDetailedAccidentReport(); }
    generateCharacterCertificate() { this.generateDetailedCharacterCertificate(); }
    generateAdvanceRequest() { this.generateDetailedAdvanceRequest(); }
    generateClearanceCertificate() { this.generateDetailedClearanceCertificate(); }
    generateRateCard() { this.generateDetailedRateCard(); }

    // Detailed implementations for remaining generators
    generateDetailedPaymentTerms() {
        this.showInputModal('Payment Terms Agreement', [
            { name: 'clientName', label: 'Client Name' },
            { name: 'providerName', label: 'Service Provider' },
            { name: 'totalAmount', label: 'Total Amount (₹)', type: 'number' },
            { name: 'advancePercent', label: 'Advance Payment %', type: 'number', placeholder: '30' },
            { name: 'milestones', label: 'Milestone Payments', type: 'textarea', placeholder: 'e.g., 30% advance, 40% mid-project, 30% delivery' },
            { name: 'paymentMethod', label: 'Payment Method', type: 'select', options: ['Bank Transfer', 'UPI', 'Check', 'Cash', 'Multiple Methods'] },
            { name: 'paymentDeadline', label: 'Payment Deadline (days)', type: 'number', placeholder: '7' },
            { name: 'lateFee', label: 'Late Payment Penalty %', type: 'number', placeholder: '2' }
        ], (data) => {
            const advance = (parseFloat(data.totalAmount) * parseFloat(data.advancePercent)) / 100;
            const content = `
                <h1>PAYMENT TERMS AGREEMENT</h1>
                <div class="meta">
                    <p><strong>Date:</strong> ${new Date().toLocaleDateString('en-IN')}</p>
                </div>

                <div class="section">
                    <p><strong>Between:</strong> ${data.providerName} (Service Provider)<br>
                    <strong>And:</strong> ${data.clientName} (Client)</p>
                </div>

                <div class="section">
                    <h2>1. Total Contract Value</h2>
                    <p><strong>₹${parseFloat(data.totalAmount).toLocaleString('en-IN')}</strong></p>
                </div>

                <div class="section">
                    <h2>2. Payment Schedule</h2>
                    <p>${data.milestones}</p>
                    <p><strong>Advance Payment:</strong> ₹${advance.toLocaleString('en-IN')} (${data.advancePercent}%)</p>
                </div>

                <div class="section">
                    <h2>3. Payment Method</h2>
                    <p>${data.paymentMethod}</p>
                    <p>Payments shall be made within <strong>${data.paymentDeadline} days</strong> of invoice issuance.</p>
                </div>

                <div class="section">
                    <h2>4. Late Payment</h2>
                    <p>Late payments will attract a penalty of <strong>${data.lateFee}% per month</strong> on the outstanding amount.</p>
                </div>

                <div class="section">
                    <h2>5. Invoice Requirements</h2>
                    <ul>
                        <li>All invoices must include work description and period</li>
                        <li>GST details if applicable</li>
                        <li>Bank account details for payment</li>
                    </ul>
                </div>

                <div class="section">
                    <h2>6. Refund Policy</h2>
                    <p>Advance payment is non-refundable once work has commenced. Refunds for undelivered work will be calculated on a pro-rata basis.</p>
                </div>

                <div class="section">
                    <h2>Signatures</h2>
                    <p>_______________________<br><strong>${data.providerName}</strong><br>Date: ___________</p>
                    <br>
                    <p>_______________________<br><strong>${data.clientName}</strong><br>Date: ___________</p>
                </div>
            `;
            this.downloadAsPDF(content, `Payment_Terms_${data.clientName.replace(/\s+/g, '_')}.pdf`);
        });
    }

    generateDetailedIPRights() {
        this.showInputModal('Intellectual Property Rights Transfer', [
            { name: 'creator', label: 'Creator Name (transferring rights)' },
            { name: 'recipient', label: 'Recipient Name (receiving rights)' },
            { name: 'workDescription', label: 'Work Description', type: 'textarea', placeholder: 'Describe the work whose IP is being transferred' },
            { name: 'rightsType', label: 'Rights Being Transferred', type: 'select', options: ['Copyright', 'Design Rights', 'All IP Rights', 'Limited License'] },
            { name: 'consideration', label: 'Consideration Amount (₹)', type: 'number', placeholder: 'Amount paid for rights' },
            { name: 'territory', label: 'Territory', type: 'select', options: ['Worldwide', 'India Only', 'Specific Region'] },
            { name: 'exclusivity', label: 'Exclusivity', type: 'select', options: ['Exclusive', 'Non-Exclusive'] }
        ], (data) => {
            const content = `
                <h1>INTELLECTUAL PROPERTY RIGHTS TRANSFER AGREEMENT</h1>
                <div class="meta">
                    <p><strong>Date:</strong> ${new Date().toLocaleDateString('en-IN')}</p>
                </div>

                <div class="section">
                    <p>This Agreement is made between:</p>
                    <p><strong>Creator/Transferor:</strong> ${data.creator}<br>
                    <strong>Recipient/Transferee:</strong> ${data.recipient}</p>
                </div>

                <div class="section">
                    <h2>1. Work Description</h2>
                    <p>${data.workDescription}</p>
                </div>

                <div class="section">
                    <h2>2. Rights Transferred</h2>
                    <p>The Creator hereby transfers <strong>${data.rightsType}</strong> to the Recipient.</p>
                    <p><strong>Territory:</strong> ${data.territory}</p>
                    <p><strong>Type:</strong> ${data.exclusivity}</p>
                </div>

                <div class="section">
                    <h2>3. Consideration</h2>
                    <p>In consideration for the rights transferred, the Recipient shall pay <strong>₹${parseFloat(data.consideration).toLocaleString('en-IN')}</strong> to the Creator.</p>
                </div>

                <div class="section">
                    <h2>4. Creator's Warranties</h2>
                    <ul>
                        <li>The work is original and created by the Creator</li>
                        <li>The work does not infringe any third-party rights</li>
                        <li>The Creator has full right to transfer these IP rights</li>
                        <li>The work has not been previously transferred to any other party</li>
                    </ul>
                </div>

                <div class="section">
                    <h2>5. Rights Granted</h2>
                    <p>The Recipient shall have the right to:</p>
                    <ul>
                        <li>Use, reproduce, and distribute the work</li>
                        <li>Create derivative works</li>
                        <li>Sublicense the work (if exclusive)</li>
                        <li>Register copyright in their name</li>
                    </ul>
                </div>

                <div class="section">
                    <h2>6. Creator's Rights</h2>
                    <p>The Creator retains the right to:</p>
                    <ul>
                        <li>Include the work in their portfolio</li>
                        <li>Claim authorship/credit (moral rights)</li>
                    </ul>
                </div>

                <div class="section">
                    <h2>7. Governing Law</h2>
                    <p>This agreement shall be governed by the Copyright Act, 1957 and laws of India.</p>
                </div>

                <div class="section">
                    <h2>Signatures</h2>
                    <p>_______________________<br><strong>${data.creator}</strong> (Creator)<br>Date: ___________</p>
                    <br>
                    <p>_______________________<br><strong>${data.recipient}</strong> (Recipient)<br>Date: ___________</p>
                </div>
            `;
            this.downloadAsPDF(content, `IP_Rights_Transfer.pdf`);
        });
    }

    generateDetailedRefundPolicy() {
        this.showInputModal('Refund/Cancellation Policy', [
            { name: 'businessName', label: 'Business Name' },
            { name: 'serviceType', label: 'Service Type', placeholder: 'e.g., Design, Consulting, Delivery' },
            { name: 'refundWindow', label: 'Refund Window (days)', type: 'number', placeholder: '7' },
            { name: 'fullRefundCondition', label: 'Full Refund Condition', type: 'textarea', placeholder: 'When is 100% refund provided?' },
            { name: 'partialRefundCondition', label: 'Partial Refund Condition', type: 'textarea', placeholder: 'When is partial refund provided?' },
            { name: 'noRefundCondition', label: 'No Refund Condition', type: 'textarea', placeholder: 'When is no refund given?' },
            { name: 'refundMethod', label: 'Refund Method', type: 'select', options: ['Original Payment Method', 'Bank Transfer', 'Credit/Wallet', 'Multiple Options'] },
            { name: 'processingTime', label: 'Refund Processing Time (days)', type: 'number', placeholder: '7-14' }
        ], (data) => {
            const content = `
                <h1>REFUND & CANCELLATION POLICY</h1>
                <div class="meta">
                    <p><strong>Business:</strong> ${data.businessName}<br>
                    <strong>Effective Date:</strong> ${new Date().toLocaleDateString('en-IN')}</p>
                </div>

                <div class="section">
                    <h2>1. Scope</h2>
                    <p>This policy applies to ${data.serviceType} services provided by ${data.businessName}.</p>
                </div>

                <div class="section">
                    <h2>2. Refund Eligibility Period</h2>
                    <p>Refund requests must be made within <strong>${data.refundWindow} days</strong> of service purchase/delivery.</p>
                </div>

                <div class="section">
                    <h2>3. Full Refund (100%)</h2>
                    <p>${data.fullRefundCondition}</p>
                </div>

                <div class="section">
                    <h2>4. Partial Refund</h2>
                    <p>${data.partialRefundCondition}</p>
                </div>

                <div class="section">
                    <h2>5. No Refund</h2>
                    <p>${data.noRefundCondition}</p>
                </div>

                <div class="section">
                    <h2>6. Cancellation Process</h2>
                    <ol>
                        <li>Submit cancellation request via email/support</li>
                        <li>Provide order/transaction details</li>
                        <li>State reason for cancellation</li>
                        <li>Wait for review and approval</li>
                    </ol>
                </div>

                <div class="section">
                    <h2>7. Refund Method</h2>
                    <p>Refunds will be processed via: ${data.refundMethod}</p>
                </div>

                <div class="section">
                    <h2>8. Processing Time</h2>
                    <p>Approved refunds will be processed within <strong>${data.processingTime} business days</strong>. Bank processing may take additional 3-7 days.</p>
                </div>

                <div class="section">
                    <h2>9. Exceptions</h2>
                    <ul>
                        <li>Customized/personalized services are non-refundable</li>
                        <li>Services already delivered cannot be refunded</li>
                        <li>Third-party charges (payment gateway fees) are non-refundable</li>
                    </ul>
                </div>

                <div class="section">
                    <h2>10. Dispute Resolution</h2>
                    <p>For refund disputes, customers may approach consumer forums or relevant authorities under Consumer Protection Act, 2019.</p>
                </div>

                <div class="section">
                    <h2>Contact for Refunds</h2>
                    <p><strong>${data.businessName}</strong><br>
                    <em>[Add contact email and phone]</em></p>
                </div>
            `;
            this.downloadAsPDF(content, `Refund_Policy_${data.businessName.replace(/\s+/g, '_')}.pdf`);
        });
    }

    // Continue with remaining generators...
    generateDetailedTermsConditions() {
        this.showInputModal('Terms & Conditions Generator', [
            { name: 'businessName', label: 'Business/Platform Name' },
            { name: 'websiteUrl', label: 'Website URL', placeholder: 'https://example.com' },
            { name: 'email', label: 'Contact Email', type: 'email' },
            { name: 'serviceDescription', label: 'Services Provided', type: 'textarea' },
            { name: 'prohibitedUse', label: 'Prohibited Uses', type: 'textarea', placeholder: 'What users cannot do' },
            { name: 'governingLaw', label: 'Governing Law', type: 'select', options: ['Indian Law', 'Specific State Law'] },
            { name: 'jurisdiction', label: 'Jurisdiction', placeholder: 'City/State for disputes' }
        ], (data) => {
            const content = `
                <h1>TERMS & CONDITIONS</h1>
                <div class="meta">
                    <p><strong>Last Updated:</strong> ${new Date().toLocaleDateString('en-IN')}</p>
                </div>

                <div class="section">
                    <h2>1. Introduction</h2>
                    <p>Welcome to <strong>${data.businessName}</strong> (${data.websiteUrl}). These Terms & Conditions govern your use of our services.</p>
                </div>

                <div class="section">
                    <h2>2. Services</h2>
                    <p>${data.serviceDescription}</p>
                </div>

                <div class="section">
                    <h2>3. User Obligations</h2>
                    <ul>
                        <li>Provide accurate information</li>
                        <li>Maintain account security</li>
                        <li>Comply with all applicable laws</li>
                        <li>Not misuse or abuse the platform</li>
                    </ul>
                </div>

                <div class="section">
                    <h2>4. Prohibited Uses</h2>
                    <p>${data.prohibitedUse}</p>
                </div>

                <div class="section">
                    <h2>5. Intellectual Property</h2>
                    <p>All content, trademarks, and data on this platform are owned by ${data.businessName}. Users may not use, copy, or reproduce without permission.</p>
                </div>

                <div class="section">
                    <h2>6. Liability Limitation</h2>
                    <p>${data.businessName} is not liable for indirect, incidental, or consequential damages arising from use of services.</p>
                </div>

                <div class="section">
                    <h2>7. Termination</h2>
                    <p>We reserve the right to terminate or suspend accounts for violation of these terms without prior notice.</p>
                </div>

                <div class="section">
                    <h2>8. Modifications</h2>
                    <p>We may update these Terms at any time. Continued use constitutes acceptance of modified terms.</p>
                </div>

                <div class="section">
                    <h2>9. Governing Law</h2>
                    <p>These Terms are governed by ${data.governingLaw}, with exclusive jurisdiction in ${data.jurisdiction}.</p>
                </div>

                <div class="section">
                    <h2>10. Contact</h2>
                    <p><strong>${data.businessName}</strong><br>
                    Email: ${data.email}</p>
                </div>
            `;
            this.downloadAsPDF(content, `Terms_Conditions_${data.businessName.replace(/\s+/g, '_')}.pdf`);
        });
    }

    generateDetailedSLA() {
        this.showInputModal('Service Level Agreement', [
            { name: 'providerName', label: 'Service Provider' },
            { name: 'clientName', label: 'Client Name' },
            { name: 'serviceDescription', label: 'Service Description', type: 'textarea' },
            { name: 'uptime', label: 'Uptime Guarantee %', type: 'number', placeholder: '99.9' },
            { name: 'responseTime', label: 'Response Time (hours)', type: 'number', placeholder: '24' },
            { name: 'resolutionTime', label: 'Resolution Time (hours)', type: 'number', placeholder: '72' },
            { name: 'supportHours', label: 'Support Hours', placeholder: 'e.g., 24/7, Mon-Fri 9-6' },
            { name: 'penalty', label: 'Penalty for Breach', placeholder: 'e.g., 5% monthly fee credit' }
        ], (data) => {
            const content = `
                <h1>SERVICE LEVEL AGREEMENT (SLA)</h1>
                <div class="meta">
                    <p><strong>Date:</strong> ${new Date().toLocaleDateString('en-IN')}</p>
                </div>

                <div class="section">
                    <p><strong>Service Provider:</strong> ${data.providerName}<br>
                    <strong>Client:</strong> ${data.clientName}</p>
                </div>

                <div class="section">
                    <h2>1. Services Covered</h2>
                    <p>${data.serviceDescription}</p>
                </div>

                <div class="section">
                    <h2>2. Service Availability</h2>
                    <p><strong>Uptime Guarantee:</strong> ${data.uptime}%</p>
                    <p>Planned maintenance windows will be excluded from uptime calculations.</p>
                </div>

                <div class="section">
                    <h2>3. Response & Resolution Times</h2>
                    <p><strong>Initial Response:</strong> Within ${data.responseTime} hours<br>
                    <strong>Issue Resolution:</strong> Within ${data.resolutionTime} hours</p>
                </div>

                <div class="section">
                    <h2>4. Support Hours</h2>
                    <p>${data.supportHours}</p>
                </div>

                <div class="section">
                    <h2>5. Priority Levels</h2>
                    <ul>
                        <li><strong>Critical:</strong> Service down - ${Math.floor(data.responseTime / 2)} hrs response</li>
                        <li><strong>High:</strong> Major functionality issue - ${data.responseTime} hrs response</li>
                        <li><strong>Medium:</strong> Minor functionality issue - ${data.responseTime * 2} hrs response</li>
                        <li><strong>Low:</strong> General queries - ${data.responseTime * 4} hrs response</li>
                    </ul>
                </div>

                <div class="section">
                    <h2>6. Performance Monitoring</h2>
                    <p>Service levels will be monitored and monthly reports provided to the Client.</p>
                </div>

                <div class="section">
                    <h2>7. SLA Breach & Penalties</h2>
                    <p>If SLA commitments are not met: ${data.penalty}</p>
                </div>

                <div class="section">
                    <h2>8. Exclusions</h2>
                    <p>SLA does not cover issues caused by:</p>
                    <ul>
                        <li>Client's equipment or network</li>
                        <li>Third-party services</li>
                        <li>Force majeure events</li>
                        <li>Scheduled maintenance</li>
                    </ul>
                </div>

                <div class="section">
                    <h2>Signatures</h2>
                    <p>_______________________<br><strong>${data.providerName}</strong><br>Date: ___________</p>
                    <br>
                    <p>_______________________<br><strong>${data.clientName}</strong><br>Date: ___________</p>
                </div>
            `;
            this.downloadAsPDF(content, `SLA_${data.clientName.replace(/\s+/g, '_')}.pdf`);
        });
    }

    generateDetailedNonCompete() {
        this.showInputModal('Non-Compete Clause', [
            { name: 'employerName', label: 'Employer/Company Name' },
            { name: 'employeeName', label: 'Employee/Worker Name' },
            { name: 'duration', label: 'Restriction Period (months)', type: 'number', placeholder: '12' },
            { name: 'geographicScope', label: 'Geographic Scope', type: 'select', options: ['Same City', 'Same State', 'All of India', 'Global'] },
            { name: 'restrictedActivities', label: 'Restricted Activities', type: 'textarea', placeholder: 'What activities are prohibited?' },
            { name: 'compensation', label: 'Compensation for Restriction', placeholder: 'e.g., Garden leave pay, lump sum' }
        ], (data) => {
            const content = `
                <h1>NON-COMPETE AGREEMENT</h1>
                <div class="meta">
                    <p><strong>Date:</strong> ${new Date().toLocaleDateString('en-IN')}</p>
                </div>

                <div class="section">
                    <p>This Non-Compete Agreement is entered into between:</p>
                    <p><strong>Employer:</strong> ${data.employerName}<br>
                    <strong>Employee:</strong> ${data.employeeName}</p>
                </div>

                <div class="section">
                    <h2>1. Purpose</h2>
                    <p>To protect the legitimate business interests of ${data.employerName}, the Employee agrees to certain restrictions during and after employment.</p>
                </div>

                <div class="section">
                    <h2>2. Restricted Period</h2>
                    <p>This restriction shall remain in effect for <strong>${data.duration} months</strong> after termination of employment.</p>
                </div>

                <div class="section">
                    <h2>3. Geographic Scope</h2>
                    <p><strong>${data.geographicScope}</strong></p>
                </div>

                <div class="section">
                    <h2>4. Restricted Activities</h2>
                    <p>During the restriction period, Employee shall not:</p>
                    <p>${data.restrictedActivities}</p>
                </div>

                <div class="section">
                    <h2>5. Compensation</h2>
                    <p>${data.compensation}</p>
                </div>

                <div class="section">
                    <h2>6. Legal Note</h2>
                    <p><em>Note: Non-compete clauses must be reasonable in duration, geography, and scope to be enforceable under Indian law. Section 27 of Indian Contract Act restricts restraint of trade.</em></p>
                </div>

                <div class="section">
                    <h2>7. Remedies</h2>
                    <p>Breach of this agreement may result in injunctive relief and monetary damages.</p>
                </div>

                <div class="section">
                    <h2>Signatures</h2>
                    <p>_______________________<br><strong>${data.employerName}</strong><br>Date: ___________</p>
                    <br>
                    <p>_______________________<br><strong>${data.employeeName}</strong><br>Date: ___________</p>
                </div>
            `;
            this.downloadAsPDF(content, `NonCompete_${data.employeeName.replace(/\s+/g, '_')}.pdf`);
        });
    }

    generateDetailedLiabilityWaiver() {
        this.showInputModal('Liability Waiver', [
            { name: 'organizationName', label: 'Organization/Business Name' },
            { name: 'participantName', label: 'Participant Name' },
            { name: 'activityDescription', label: 'Activity Description', type: 'textarea', placeholder: 'Describe the activity/service' },
            { name: 'risks', label: 'Known Risks', type: 'textarea', placeholder: 'List potential risks involved' },
            { name: 'emergencyContact', label: 'Emergency Contact', placeholder: 'Name and phone number' }
        ], (data) => {
            const content = `
                <h1>LIABILITY WAIVER & RELEASE FORM</h1>
                <div class="meta">
                    <p><strong>Date:</strong> ${new Date().toLocaleDateString('en-IN')}</p>
                </div>

                <div class="section">
                    <p><strong>Organization:</strong> ${data.organizationName}<br>
                    <strong>Participant:</strong> ${data.participantName}</p>
                </div>

                <div class="section">
                    <h2>Activity Description</h2>
                    <p>${data.activityDescription}</p>
                </div>

                <div class="section">
                    <h2>Acknowledgment of Risks</h2>
                    <p>I acknowledge that the following risks are inherent in this activity:</p>
                    <p>${data.risks}</p>
                </div>

                <div class="section">
                    <h2>Assumption of Risk</h2>
                    <p>I voluntarily assume all risks associated with participation, whether known or unknown, and accept full responsibility for my participation.</p>
                </div>

                <div class="section">
                    <h2>Release & Waiver</h2>
                    <p>I hereby release, waive, discharge, and covenant not to sue ${data.organizationName}, its officers, employees, and agents from any and all liability, claims, demands, or causes of action arising out of or related to any loss, damage, or injury that may be sustained by me.</p>
                </div>

                <div class="section">
                    <h2>Indemnification</h2>
                    <p>I agree to indemnify and hold harmless ${data.organizationName} from any claims arising from my actions during participation.</p>
                </div>

                <div class="section">
                    <h2>Emergency Contact</h2>
                    <p>${data.emergencyContact}</p>
                </div>

                <div class="section">
                    <h2>Declaration</h2>
                    <p>I have read this waiver, understand its terms, and sign it voluntarily without any inducement.</p>
                </div>

                <div class="section">
                    <p style="margin-top: 40px;">_______________________<br>
                    <strong>${data.participantName}</strong><br>
                    Date: ${new Date().toLocaleDateString('en-IN')}</p>
                </div>
            `;
            this.downloadAsPDF(content, `Liability_Waiver_${data.participantName.replace(/\s+/g, '_')}.pdf`);
        });
    }

    generateDetailedTestimonialRelease() {
        this.showInputModal('Testimonial/Media Release Form', [
            { name: 'clientName', label: 'Client/Person Name' },
            { name: 'businessName', label: 'Business Name (using testimonial)' },
            { name: 'testimonial', label: 'Testimonial Text', type: 'textarea' },
            { name: 'mediaType', label: 'Media Type', type: 'select', options: ['Text Only', 'Text + Photo', 'Text + Video', 'All Media'] },
            { name: 'usageRights', label: 'Usage Rights', type: 'select', options: ['Website Only', 'Social Media Only', 'All Marketing Materials', 'Unlimited Use'] },
            { name: 'duration', label: 'Usage Duration', type: 'select', options: ['1 Year', '2 Years', '5 Years', 'Perpetual'] }
        ], (data) => {
            const content = `
                <h1>TESTIMONIAL & MEDIA RELEASE FORM</h1>
                <div class="meta">
                    <p><strong>Date:</strong> ${new Date().toLocaleDateString('en-IN')}</p>
                </div>

                <div class="section">
                    <p>I, <strong>${data.clientName}</strong>, hereby grant permission to <strong>${data.businessName}</strong> to use my testimonial and likeness for promotional purposes.</p>
                </div>

                <div class="section">
                    <h2>Testimonial</h2>
                    <p>"${data.testimonial}"</p>
                </div>

                <div class="section">
                    <h2>Grant of Rights</h2>
                    <p><strong>Media Type:</strong> ${data.mediaType}<br>
                    <strong>Usage Scope:</strong> ${data.usageRights}<br>
                    <strong>Duration:</strong> ${data.duration}</p>
                </div>

                <div class="section">
                    <h2>Permitted Uses</h2>
                    <ul>
                        <li>Website and landing pages</li>
                        <li>Social media posts and advertisements</li>
                        <li>Print and digital marketing materials</li>
                        <li>Case studies and success stories</li>
                        <li>Email marketing campaigns</li>
                    </ul>
                </div>

                <div class="section">
                    <h2>Representations</h2>
                    <p>I represent that:</p>
                    <ul>
                        <li>The testimonial is my genuine opinion</li>
                        <li>I have authority to grant these rights</li>
                        <li>No compensation has been provided for this testimonial (if applicable)</li>
                    </ul>
                </div>

                <div class="section">
                    <h2>Release</h2>
                    <p>I release ${data.businessName} from any claims arising from the use of my testimonial and likeness as authorized herein.</p>
                </div>

                <div class="section">
                    <h2>Revocation</h2>
                    <p>I may revoke this authorization by providing 30 days written notice to ${data.businessName}.</p>
                </div>

                <div class="section">
                    <p style="margin-top: 40px;">_______________________<br>
                    <strong>${data.clientName}</strong><br>
                    Date: ${new Date().toLocaleDateString('en-IN')}</p>
                </div>
            `;
            this.downloadAsPDF(content, `Testimonial_Release_${data.clientName.replace(/\s+/g, '_')}.pdf`);
        });
    }

    generateDetailedPartnership() {
        this.showInputModal('Partnership Deed', [
            { name: 'partner1', label: 'Partner 1 Name' },
            { name: 'partner2', label: 'Partner 2 Name' },
            { name: 'firmName', label: 'Firm/Partnership Name' },
            { name: 'businessNature', label: 'Nature of Business', type: 'textarea' },
            { name: 'capital1', label: 'Partner 1 Capital (₹)', type: 'number' },
            { name: 'capital2', label: 'Partner 2 Capital (₹)', type: 'number' },
            { name: 'profitRatio', label: 'Profit Sharing Ratio', placeholder: 'e.g., 50:50 or 60:40' },
            { name: 'duration', label: 'Partnership Duration', type: 'select', options: ['At Will (no fixed period)', '1 Year', '3 Years', '5 Years', 'Fixed Project'] }
        ], (data) => {
            const totalCapital = parseFloat(data.capital1) + parseFloat(data.capital2);
            const content = `
                <h1>PARTNERSHIP DEED</h1>
                <div class="meta">
                    <p><strong>Date:</strong> ${new Date().toLocaleDateString('en-IN')}</p>
                </div>

                <div class="section">
                    <p>This Partnership Deed is entered into between:</p>
                    <p><strong>Partner 1:</strong> ${data.partner1}<br>
                    <strong>Partner 2:</strong> ${data.partner2}</p>
                </div>

                <div class="section">
                    <h2>1. Firm Name</h2>
                    <p><strong>${data.firmName}</strong></p>
                </div>

                <div class="section">
                    <h2>2. Nature of Business</h2>
                    <p>${data.businessNature}</p>
                </div>

                <div class="section">
                    <h2>3. Capital Contribution</h2>
                    <p><strong>${data.partner1}:</strong> ₹${parseFloat(data.capital1).toLocaleString('en-IN')}<br>
                    <strong>${data.partner2}:</strong> ₹${parseFloat(data.capital2).toLocaleString('en-IN')}<br>
                    <strong>Total Capital:</strong> ₹${totalCapital.toLocaleString('en-IN')}</p>
                </div>

                <div class="section">
                    <h2>4. Profit & Loss Sharing</h2>
                    <p>Profits and losses shall be shared in the ratio of <strong>${data.profitRatio}</strong></p>
                </div>

                <div class="section">
                    <h2>5. Duration</h2>
                    <p>${data.duration}</p>
                </div>

                <div class="section">
                    <h2>6. Duties & Responsibilities</h2>
                    <ul>
                        <li>Partners shall devote their time and skills to the business</li>
                        <li>Major decisions require consent of all partners</li>
                        <li>Partners shall not engage in competing business</li>
                        <li>Proper books of accounts shall be maintained</li>
                    </ul>
                </div>

                <div class="section">
                    <h2>7. Bank Accounts</h2>
                    <p>All business transactions shall be conducted through the firm's bank account. Withdrawals above a certain limit require all partners' signatures.</p>
                </div>

                <div class="section">
                    <h2>8. Dissolution</h2>
                    <p>Partnership may be dissolved by mutual consent. Upon dissolution, assets shall be liquidated and distributed according to capital ratio after settling liabilities.</p>
                </div>

                <div class="section">
                    <h2>9. Dispute Resolution</h2>
                    <p>Any disputes shall be resolved through arbitration under the Arbitration and Conciliation Act, 1996.</p>
                </div>

                <div class="section">
                    <h2>10. Governing Law</h2>
                    <p>This deed shall be governed by the Indian Partnership Act, 1932.</p>
                </div>

                <div class="section">
                    <h2>Signatures</h2>
                    <p>_______________________<br><strong>${data.partner1}</strong><br>Date: ___________</p>
                    <br>
                    <p>_______________________<br><strong>${data.partner2}</strong><br>Date: ___________</p>
                </div>
            `;
            this.downloadAsPDF(content, `Partnership_Deed_${data.firmName.replace(/\s+/g, '_')}.pdf`);
        });
    }

    generateDetailedWorkLog() {
        this.showInputModal('Work Log / Time Sheet', [
            { name: 'workerName', label: 'Worker Name' },
            { name: 'workPeriod', label: 'Work Period', placeholder: 'e.g., Week of Jan 1-7, 2024' },
            { name: 'clientName', label: 'Client/Platform Name' },
            { name: 'tasks', label: 'Tasks & Hours (one per line)', type: 'textarea', placeholder: 'Task 1 - 8 hours\nTask 2 - 5 hours\nTask 3 - 3 hours' },
            { name: 'hourlyRate', label: 'Hourly Rate (₹)', type: 'number', placeholder: '500' }
        ], (data) => {
            const taskLines = data.tasks.split('\n').filter(line => line.trim());
            let totalHours = 0;
            const taskTable = taskLines.map(line => {
                const match = line.match(/(\d+\.?\d*)\s*(hours?|hrs?)/i);
                const hours = match ? parseFloat(match[1]) : 0;
                totalHours += hours;
                return `<tr><td style="border: 1px solid #ddd; padding: 8px;">${line}</td></tr>`;
            }).join('');
            
            const totalAmount = totalHours * parseFloat(data.hourlyRate);

            const content = `
                <h1>WORK LOG / TIME SHEET</h1>
                <div class="meta">
                    <p><strong>Period:</strong> ${data.workPeriod}<br>
                    <strong>Submitted:</strong> ${new Date().toLocaleDateString('en-IN')}</p>
                </div>

                <div class="section">
                    <p><strong>Worker:</strong> ${data.workerName}<br>
                    <strong>Client:</strong> ${data.clientName}<br>
                    <strong>Hourly Rate:</strong> ₹${parseFloat(data.hourlyRate).toLocaleString('en-IN')}</p>
                </div>

                <div class="section">
                    <h2>Work Details</h2>
                    <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
                        <thead>
                            <tr style="background: #f3f4f6;">
                                <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Task Description & Hours</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${taskTable}
                        </tbody>
                    </table>
                </div>

                <div class="section">
                    <h2>Summary</h2>
                    <p><strong>Total Hours:</strong> ${totalHours.toFixed(2)} hours<br>
                    <strong>Hourly Rate:</strong> ₹${parseFloat(data.hourlyRate).toLocaleString('en-IN')}<br>
                    <strong>Total Amount:</strong> ₹${totalAmount.toLocaleString('en-IN')}</p>
                </div>

                <div class="section">
                    <p>I certify that the hours logged above are accurate and reflect actual work performed.</p>
                </div>

                <div class="section">
                    <p style="margin-top: 40px;">_______________________<br>
                    <strong>${data.workerName}</strong><br>
                    Date: ${new Date().toLocaleDateString('en-IN')}</p>
                </div>
            `;
            this.downloadAsPDF(content, `Work_Log_${data.workPeriod.replace(/\s+/g, '_')}.pdf`);
        });
    }

    generateDetailedExpenseReport() {
        this.showInputModal('Expense Report/Claim', [
            { name: 'workerName', label: 'Your Name' },
            { name: 'employerId', label: 'Employer/Platform ID', placeholder: 'Your worker ID' },
            { name: 'claimPeriod', label: 'Claim Period', placeholder: 'e.g., January 2024' },
            { name: 'expenses', label: 'Expenses (one per line)', type: 'textarea', placeholder: 'Fuel - ₹2000\nMaintenance - ₹1500\nPhone bill - ₹500' },
            { name: 'totalAmount', label: 'Total Claim Amount (₹)', type: 'number' },
            { name: 'bankAccount', label: 'Bank Account Number' },
            { name: 'bankIFSC', label: 'IFSC Code' }
        ], (data) => {
            const expenseLines = data.expenses.split('\n').filter(line => line.trim());
            const expenseTable = expenseLines.map(line => {
                return `<tr><td style="border: 1px solid #ddd; padding: 8px;">${line}</td></tr>`;
            }).join('');

            const content = `
                <h1>EXPENSE REPORT & CLAIM</h1>
                <div class="meta">
                    <p><strong>Claim Date:</strong> ${new Date().toLocaleDateString('en-IN')}<br>
                    <strong>Claim ID:</strong> EXP-${Date.now()}</p>
                </div>

                <div class="section">
                    <p><strong>Employee:</strong> ${data.workerName}<br>
                    <strong>Employee ID:</strong> ${data.employerId}<br>
                    <strong>Period:</strong> ${data.claimPeriod}</p>
                </div>

                <div class="section">
                    <h2>Expense Details</h2>
                    <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
                        <thead>
                            <tr style="background: #f3f4f6;">
                                <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Description & Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${expenseTable}
                        </tbody>
                    </table>
                </div>

                <div class="section">
                    <h2>Total Claim Amount</h2>
                    <p style="font-size: 1.2em;"><strong>₹${parseFloat(data.totalAmount).toLocaleString('en-IN')}</strong></p>
                    <p><strong>In Words:</strong> ${this.numberToWords(data.totalAmount)} Rupees Only</p>
                </div>

                <div class="section">
                    <h2>Payment Details</h2>
                    <p><strong>Bank Account:</strong> ${data.bankAccount}<br>
                    <strong>IFSC Code:</strong> ${data.bankIFSC}</p>
                </div>

                <div class="section">
                    <h2>Declaration</h2>
                    <p>I hereby declare that the expenses claimed above were incurred for business purposes and are supported by valid receipts/bills.</p>
                </div>

                <div class="section">
                    <p style="margin-top: 40px;">_______________________<br>
                    <strong>${data.workerName}</strong><br>
                    Date: ${new Date().toLocaleDateString('en-IN')}</p>
                </div>

                <div class="section">
                    <p><strong>Attachments:</strong> [List receipt numbers/documents]</p>
                </div>
            `;
            this.downloadAsPDF(content, `Expense_Report_${data.workerName.replace(/\s+/g, '_')}.pdf`);
        });
    }

    generateDetailedAccidentReport() {
        this.showInputModal('Accident/Incident Report', [
            { name: 'reporterName', label: 'Reporter Name' },
            { name: 'incidentDate', label: 'Date of Incident', type: 'date' },
            { name: 'incidentTime', label: 'Time of Incident', placeholder: 'e.g., 3:30 PM' },
            { name: 'location', label: 'Location', placeholder: 'Address/place where incident occurred' },
            { name: 'incidentType', label: 'Incident Type', type: 'select', options: ['Road Accident', 'Workplace Injury', 'Equipment Failure', 'Near Miss', 'Property Damage', 'Other'] },
            { name: 'description', label: 'Detailed Description', type: 'textarea', placeholder: 'What happened? Sequence of events' },
            { name: 'injuries', label: 'Injuries/Damages', type: 'textarea', placeholder: 'List any injuries, damages to vehicle/property' },
            { name: 'witnesses', label: 'Witnesses', placeholder: 'Names and contact details', required: false },
            { name: 'actionTaken', label: 'Immediate Action Taken', type: 'textarea', placeholder: 'What was done immediately after?' }
        ], (data) => {
            const content = `
                <h1>ACCIDENT/INCIDENT REPORT</h1>
                <div class="meta">
                    <p><strong>Report Date:</strong> ${new Date().toLocaleDateString('en-IN')}<br>
                    <strong>Report ID:</strong> ACC-${Date.now()}</p>
                </div>

                <div class="section">
                    <h2>Reporter Information</h2>
                    <p><strong>Name:</strong> ${data.reporterName}</p>
                </div>

                <div class="section">
                    <h2>Incident Details</h2>
                    <p><strong>Type:</strong> ${data.incidentType}<br>
                    <strong>Date:</strong> ${new Date(data.incidentDate).toLocaleDateString('en-IN')}<br>
                    <strong>Time:</strong> ${data.incidentTime}<br>
                    <strong>Location:</strong> ${data.location}</p>
                </div>

                <div class="section">
                    <h2>Description of Incident</h2>
                    <p>${data.description}</p>
                </div>

                <div class="section">
                    <h2>Injuries/Damages</h2>
                    <p>${data.injuries}</p>
                </div>

                ${data.witnesses ? `
                <div class="section">
                    <h2>Witnesses</h2>
                    <p>${data.witnesses}</p>
                </div>
                ` : ''}

                <div class="section">
                    <h2>Immediate Action Taken</h2>
                    <p>${data.actionTaken}</p>
                </div>

                <div class="section">
                    <h2>Follow-up Required</h2>
                    <p>☐ Medical attention needed<br>
                    ☐ Police report filed<br>
                    ☐ Insurance claim to be filed<br>
                    ☐ Equipment repair/replacement<br>
                    ☐ Investigation required</p>
                </div>

                <div class="section">
                    <h2>Prevention Recommendations</h2>
                    <p>[To be filled by supervisor/safety officer]</p>
                </div>

                <div class="section">
                    <p style="margin-top: 40px;">_______________________<br>
                    <strong>${data.reporterName}</strong> (Reporter)<br>
                    Date: ${new Date().toLocaleDateString('en-IN')}</p>
                </div>

                <div class="section">
                    <p>_______________________<br>
                    <strong>Supervisor/Manager</strong><br>
                    Date: ___________</p>
                </div>
            `;
            this.downloadAsPDF(content, `Accident_Report_${data.incidentDate}.pdf`);
        });
    }

    generateDetailedCharacterCertificate() {
        this.showInputModal('Character Certificate', [
            { name: 'candidateName', label: 'Candidate Name' },
            { name: 'issuerName', label: 'Issuer Name' },
            { name: 'issuerDesignation', label: 'Issuer Designation', placeholder: 'e.g., Manager, Client' },
            { name: 'organization', label: 'Organization/Platform' },
            { name: 'knownSince', label: 'Known Since', type: 'date' },
            { name: 'relationship', label: 'Relationship', placeholder: 'e.g., Supervisor, Client, Colleague' },
            { name: 'characteristics', label: 'Key Characteristics', type: 'textarea', placeholder: 'Describe honesty, reliability, work ethic, behavior' },
            { name: 'purpose', label: 'Purpose', placeholder: 'e.g., Job application, Visa, Rental' }
        ], (data) => {
            const knownSinceDate = new Date(data.knownSince);
            const yearsKnown = new Date().getFullYear() - knownSinceDate.getFullYear();

            const content = `
                <h1>CHARACTER CERTIFICATE</h1>
                <div class="meta">
                    <p><strong>Date:</strong> ${new Date().toLocaleDateString('en-IN')}<br>
                    <strong>Certificate No:</strong> CHAR-${Date.now()}</p>
                </div>

                <div class="section">
                    <p>TO WHOMEVER IT MAY CONCERN</p>
                </div>

                <div class="section">
                    <p>This is to certify that I, <strong>${data.issuerName}</strong>, ${data.issuerDesignation} at <strong>${data.organization}</strong>, have known <strong>${data.candidateName}</strong> for approximately <strong>${yearsKnown} year${yearsKnown > 1 ? 's' : ''}</strong> in the capacity of <strong>${data.relationship}</strong>.</p>
                </div>

                <div class="section">
                    <h2>Character Assessment</h2>
                    <p>${data.characteristics}</p>
                </div>

                <div class="section">
                    <p>Based on my personal knowledge and interaction with ${data.candidateName}, I can confidently state that they are of good moral character, honest, trustworthy, and law-abiding.</p>
                </div>

                <div class="section">
                    <p>I have no hesitation in recommending ${data.candidateName} for ${data.purpose}.</p>
                </div>

                <div class="section">
                    <p>This certificate is issued upon request and to the best of my knowledge and belief.</p>
                </div>

                <div class="section">
                    <p style="margin-top: 40px;">_______________________<br>
                    <strong>${data.issuerName}</strong><br>
                    ${data.issuerDesignation}<br>
                    ${data.organization}<br>
                    Date: ${new Date().toLocaleDateString('en-IN')}</p>
                </div>

                <div class="section">
                    <p><em>[Signature and stamp/seal]</em></p>
                </div>
            `;
            this.downloadAsPDF(content, `Character_Certificate_${data.candidateName.replace(/\s+/g, '_')}.pdf`);
        });
    }

    generateDetailedAdvanceRequest() {
        this.showInputModal('Advance Payment Request', [
            { name: 'workerName', label: 'Your Name' },
            { name: 'workerId', label: 'Worker/Employee ID' },
            { name: 'department', label: 'Department/Platform', placeholder: 'e.g., Delivery, Freelance' },
            { name: 'advanceAmount', label: 'Advance Amount Requested (₹)', type: 'number' },
            { name: 'reason', label: 'Reason for Advance', type: 'textarea', placeholder: 'Explain why you need advance payment' },
            { name: 'repaymentPlan', label: 'Repayment Plan', type: 'textarea', placeholder: 'How will you repay? e.g., 3 monthly installments' },
            { name: 'urgency', label: 'Urgency', type: 'select', options: ['High - Emergency', 'Medium - Within a week', 'Low - Whenever possible'] }
        ], (data) => {
            const content = `
                <h1>ADVANCE PAYMENT REQUEST</h1>
                <div class="meta">
                    <p><strong>Request Date:</strong> ${new Date().toLocaleDateString('en-IN')}<br>
                    <strong>Request ID:</strong> ADV-${Date.now()}</p>
                </div>

                <div class="section">
                    <p><strong>Name:</strong> ${data.workerName}<br>
                    <strong>Employee/Worker ID:</strong> ${data.workerId}<br>
                    <strong>Department:</strong> ${data.department}</p>
                </div>

                <div class="section">
                    <h2>Advance Details</h2>
                    <p><strong>Amount Requested:</strong> ₹${parseFloat(data.advanceAmount).toLocaleString('en-IN')}<br>
                    <strong>In Words:</strong> ${this.numberToWords(data.advanceAmount)} Rupees Only</p>
                </div>

                <div class="section">
                    <h2>Reason for Advance</h2>
                    <p>${data.reason}</p>
                </div>

                <div class="section">
                    <h2>Repayment Plan</h2>
                    <p>${data.repaymentPlan}</p>
                </div>

                <div class="section">
                    <h2>Urgency Level</h2>
                    <p><strong>${data.urgency}</strong></p>
                </div>

                <div class="section">
                    <h2>Declaration</h2>
                    <p>I hereby request an advance payment as mentioned above. I understand that this amount will be recovered from my future earnings as per the repayment plan. I commit to repaying the advance as agreed.</p>
                </div>

                <div class="section">
                    <p style="margin-top: 40px;">_______________________<br>
                    <strong>${data.workerName}</strong><br>
                    Date: ${new Date().toLocaleDateString('en-IN')}</p>
                </div>

                <div class="section">
                    <h2>For Official Use</h2>
                    <p>☐ Approved ☐ Rejected ☐ Partially Approved (₹_______)</p>
                    <p>Approved By: _______________________<br>
                    Date: ___________<br>
                    Remarks: ___________________________</p>
                </div>
            `;
            this.downloadAsPDF(content, `Advance_Request_${data.workerName.replace(/\s+/g, '_')}.pdf`);
        });
    }

    generateDetailedClearanceCertificate() {
        this.showInputModal('Clearance Certificate', [
            { name: 'employeeName', label: 'Employee Name' },
            { name: 'employeeId', label: 'Employee ID' },
            { name: 'department', label: 'Department/Role' },
            { name: 'organization', label: 'Organization Name' },
            { name: 'joiningDate', label: 'Date of Joining', type: 'date' },
            { name: 'relievingDate', label: 'Date of Relieving', type: 'date' },
            { name: 'noDuesConfirm', label: 'No Dues Status', type: 'select', options: ['No Dues - All Clear', 'Pending Dues (specify in remarks)'] },
            { name: 'remarks', label: 'Remarks', type: 'textarea', placeholder: 'Any pending items or additional notes', required: false }
        ], (data) => {
            const content = `
                <h1>CLEARANCE CERTIFICATE</h1>
                <div class="meta">
                    <p><strong>Certificate Date:</strong> ${new Date().toLocaleDateString('en-IN')}<br>
                    <strong>Certificate No:</strong> CLR-${Date.now()}</p>
                </div>

                <div class="section">
                    <p>This is to certify that:</p>
                </div>

                <div class="section">
                    <h2>Employee Information</h2>
                    <p><strong>Name:</strong> ${data.employeeName}<br>
                    <strong>Employee ID:</strong> ${data.employeeId}<br>
                    <strong>Department:</strong> ${data.department}<br>
                    <strong>Organization:</strong> ${data.organization}</p>
                </div>

                <div class="section">
                    <h2>Employment Period</h2>
                    <p><strong>Joining Date:</strong> ${new Date(data.joiningDate).toLocaleDateString('en-IN')}<br>
                    <strong>Relieving Date:</strong> ${new Date(data.relievingDate).toLocaleDateString('en-IN')}</p>
                </div>

                <div class="section">
                    <h2>Clearance Status</h2>
                    <p><strong>${data.noDuesConfirm}</strong></p>
                </div>

                <div class="section">
                    <h2>Items Cleared</h2>
                    <ul>
                        <li>☑ Company assets (laptop, phone, ID card, etc.) returned</li>
                        <li>☑ All pending work completed/handed over</li>
                        <li>☑ Final settlement processed</li>
                        <li>☑ Access credentials deactivated</li>
                        <li>☑ No financial dues pending</li>
                        <li>☑ Exit formalities completed</li>
                    </ul>
                </div>

                ${data.remarks ? `
                <div class="section">
                    <h2>Remarks</h2>
                    <p>${data.remarks}</p>
                </div>
                ` : ''}

                <div class="section">
                    <p>We wish ${data.employeeName} all the best for future endeavors.</p>
                </div>

                <div class="section">
                    <p style="margin-top: 40px;">For <strong>${data.organization}</strong></p>
                    <p>_______________________<br>
                    Authorized Signatory<br>
                    HR Department<br>
                    Date: ${new Date().toLocaleDateString('en-IN')}</p>
                </div>

                <div class="section">
                    <p><em>[Company Seal/Stamp]</em></p>
                </div>
            `;
            this.downloadAsPDF(content, `Clearance_Certificate_${data.employeeName.replace(/\s+/g, '_')}.pdf`);
        });
    }

    generateDetailedRateCard() {
        this.showInputModal('Rate Card / Pricing Sheet', [
            { name: 'businessName', label: 'Business/Freelancer Name' },
            { name: 'serviceCategory', label: 'Service Category', placeholder: 'e.g., Design, Development, Delivery' },
            { name: 'services', label: 'Services & Rates (one per line)', type: 'textarea', placeholder: 'Logo Design - ₹5000\nWebsite Design - ₹25000\nSEO Audit - ₹10000' },
            { name: 'currency', label: 'Currency', type: 'select', options: ['₹ (INR)', '$ (USD)', '€ (EUR)'] },
            { name: 'validityPeriod', label: 'Rate Validity', placeholder: 'e.g., Valid for 90 days' },
            { name: 'terms', label: 'Payment Terms', type: 'textarea', placeholder: 'e.g., 50% advance, 50% on delivery' }
        ], (data) => {
            const serviceLines = data.services.split('\n').filter(line => line.trim());
            const serviceTable = serviceLines.map(line => {
                const parts = line.split('-');
                const service = parts[0] ? parts[0].trim() : '';
                const rate = parts[1] ? parts[1].trim() : '';
                return `<tr><td style="border: 1px solid #ddd; padding: 8px;">${service}</td><td style="border: 1px solid #ddd; padding: 8px; text-align: right;">${rate}</td></tr>`;
            }).join('');

            const content = `
                <h1>RATE CARD / PRICING SHEET</h1>
                <div class="meta">
                    <p><strong>Date:</strong> ${new Date().toLocaleDateString('en-IN')}<br>
                    <strong>Valid Until:</strong> ${data.validityPeriod}</p>
                </div>

                <div class="section">
                    <h2>${data.businessName}</h2>
                    <p><strong>Category:</strong> ${data.serviceCategory}</p>
                </div>

                <div class="section">
                    <h2>Services & Pricing</h2>
                    <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
                        <thead>
                            <tr style="background: #f3f4f6;">
                                <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Service</th>
                                <th style="border: 1px solid #ddd; padding: 8px; text-align: right;">Rate (${data.currency.split(' ')[0]})</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${serviceTable}
                        </tbody>
                    </table>
                </div>

                <div class="section">
                    <h2>Payment Terms</h2>
                    <p>${data.terms}</p>
                </div>

                <div class="section">
                    <h2>Additional Notes</h2>
                    <ul>
                        <li>All rates are subject to GST (if applicable)</li>
                        <li>Custom requirements may be quoted separately</li>
                        <li>Rates may vary based on project complexity and timeline</li>
                        <li>Rush/urgent delivery may incur additional charges</li>
                    </ul>
                </div>

                <div class="section">
                    <h2>Contact & Booking</h2>
                    <p><strong>${data.businessName}</strong><br>
                    <em>[Add contact email and phone]</em></p>
                </div>

                <div class="section">
                    <p><em>Rates are indicative and may be revised. Please contact for current pricing and availability.</em></p>
                </div>
            `;
            this.downloadAsPDF(content, `Rate_Card_${data.businessName.replace(/\s+/g, '_')}.pdf`);
        });
    }

    // Generic document generator for stubs
    generateGenericDocument(title, filename) {
        alert(`${title} generator is ready! Click OK to see the input form.`);
        this.showInputModal(title, [
            { name: 'name', label: 'Your Name' },
            { name: 'details', label: 'Document Details', type: 'textarea', placeholder: `Enter details for ${title}` }
        ], (data) => {
            const content = `
                <h1>${title}</h1>
                <div class="meta">
                    <p><strong>Date:</strong> ${new Date().toLocaleDateString('en-IN')}</p>
                </div>
                <div class="section">
                    <p><strong>Name:</strong> ${data.name}</p>
                    <p><strong>Details:</strong> ${data.details}</p>
                </div>
                <div class="section">
                    <p><em>This is a template. Customize as per your requirements.</em></p>
                </div>
            `;
            this.downloadAsPDF(content, `${filename}_${data.name.replace(/\s+/g, '_')}.pdf`);
        });
    }
}

// Initialize when page loads
const legalGen = new LegalDocumentGenerator();
