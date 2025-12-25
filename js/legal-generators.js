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
        // Create a styled document
        const printWindow = window.open('', '', 'width=800,height=600');
        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>${filename}</title>
                <style>
                    body { font-family: Arial, sans-serif; padding: 40px; line-height: 1.6; }
                    h1 { color: #4F46E5; border-bottom: 3px solid #4F46E5; padding-bottom: 10px; }
                    h2 { color: #6366F1; margin-top: 25px; }
                    .meta { background: #F3F4F6; padding: 15px; border-radius: 8px; margin: 20px 0; }
                    .section { margin: 20px 0; }
                    .footer { margin-top: 40px; padding-top: 20px; border-top: 2px solid #E5E7EB; font-size: 12px; color: #6B7280; }
                    ul { margin-left: 20px; }
                    li { margin: 8px 0; }
                    strong { color: #1F2937; }
                </style>
            </head>
            <body>
                ${content}
                <div class="footer">
                    <p><strong>Generated by ShramSetu</strong> - Worker Rights & Protection Platform</p>
                    <p>Date: ${new Date().toLocaleDateString('en-IN')} | This document was generated client-side. Your data remains private.</p>
                </div>
            </body>
            </html>
        `);
        printWindow.document.close();
        setTimeout(() => {
            printWindow.print();
        }, 250);
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
                    <h2>1. Introduction</h2>
                    <p>This Privacy Policy explains how ${data.businessName} ("we", "our", or "us") collects, uses, discloses, and protects your personal information in compliance with the Digital Personal Data Protection Act, 2023 (DPDP Act) of India.</p>
                </div>

                <div class="section">
                    <h2>2. Information We Collect</h2>
                    <p>We collect the following types of personal data:</p>
                    <ul>
                        ${data.dataCollected.split(',').map(item => `<li>${item.trim()}</li>`).join('')}
                    </ul>
                </div>

                <div class="section">
                    <h2>3. How We Use Your Information</h2>
                    <ul>
                        <li>To provide and maintain our services</li>
                        <li>To process transactions and send related information</li>
                        <li>To communicate with you about updates and offers</li>
                        <li>To improve our services and customer experience</li>
                        <li>To comply with legal obligations</li>
                    </ul>
                </div>

                <div class="section">
                    <h2>4. Your Rights Under DPDP Act 2023</h2>
                    <ul>
                        <li><strong>Right to Access:</strong> You can request copies of your personal data</li>
                        <li><strong>Right to Correction:</strong> You can request correction of inaccurate data</li>
                        <li><strong>Right to Erasure:</strong> You can request deletion of your data</li>
                        <li><strong>Right to Data Portability:</strong> You can request transfer of your data</li>
                        <li><strong>Right to Withdraw Consent:</strong> You can withdraw consent at any time</li>
                    </ul>
                </div>

                <div class="section">
                    <h2>5. Data Retention</h2>
                    <p>We retain your personal data only for as long as necessary to fulfill the purposes for which it was collected or as required by law. Typically, we retain data for the duration of our business relationship and up to 3 years thereafter for legal compliance.</p>
                </div>

                <div class="section">
                    <h2>6. Data Security</h2>
                    <p>We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. This includes encryption, secure servers, and regular security audits.</p>
                </div>

                <div class="section">
                    <h2>7. Third-Party Sharing</h2>
                    <p>We do not sell your personal data. We may share data with:</p>
                    <ul>
                        <li>Service providers who assist in our operations (payment processors, hosting providers)</li>
                        <li>Legal authorities when required by law</li>
                        <li>Business partners with your explicit consent</li>
                    </ul>
                </div>

                <div class="section">
                    <h2>8. Cookies and Tracking</h2>
                    <p>We use cookies and similar technologies to enhance user experience. You can control cookie settings through your browser preferences.</p>
                </div>

                <div class="section">
                    <h2>9. Children's Privacy</h2>
                    <p>Our services are not directed to individuals under 18 years of age. We do not knowingly collect personal data from children.</p>
                </div>

                <div class="section">
                    <h2>10. Changes to This Policy</h2>
                    <p>We may update this Privacy Policy periodically. The updated version will be posted with a revised effective date. Continued use of our services after changes constitutes acceptance.</p>
                </div>

                <div class="section">
                    <h2>11. Contact Us</h2>
                    <p>For privacy-related inquiries, data access requests, or to exercise your rights:</p>
                    <p><strong>Email:</strong> ${data.email}<br>
                    <strong>Phone:</strong> ${data.phone}<br>
                    <strong>Address:</strong> ${data.address}</p>
                </div>

                <div class="section">
                    <h2>12. Grievance Officer</h2>
                    <p>For DPDP Act complaints, contact our Grievance Officer at ${data.email}. We will respond within 30 days as per regulatory requirements.</p>
                </div>
            `;
            this.downloadAsPDF(content, `Privacy_Policy_${data.businessName.replace(/\s+/g, '_')}.pdf`);
        });
    }

    // 2. Contract Generator
    generateContract() {
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
                    <h2>1. Parties</h2>
                    <p><strong>Service Provider:</strong> ${data.providerName}<br>
                    <strong>Client:</strong> ${data.clientName}</p>
                </div>

                <div class="section">
                    <h2>2. Scope of Work</h2>
                    <p>${data.serviceDescription}</p>
                </div>

                <div class="section">
                    <h2>3. Timeline</h2>
                    <p><strong>Start Date:</strong> ${new Date(data.startDate).toLocaleDateString('en-IN')}<br>
                    <strong>Duration:</strong> ${data.duration}</p>
                </div>

                <div class="section">
                    <h2>4. Deliverables</h2>
                    <p>${data.deliverables}</p>
                </div>

                <div class="section">
                    <h2>5. Payment Terms</h2>
                    <p><strong>Total Amount:</strong> ₹${parseFloat(data.totalAmount).toLocaleString('en-IN')}<br>
                    <strong>Payment Schedule:</strong> ${data.paymentTerms}</p>
                </div>

                <div class="section">
                    <h2>6. Payment Method</h2>
                    <p>Payment shall be made via bank transfer, UPI, or other mutually agreed methods within 7 days of invoice issuance.</p>
                </div>

                <div class="section">
                    <h2>7. Revisions</h2>
                    <p>The service includes up to 2 rounds of revisions. Additional revisions will be charged at ₹${Math.round(data.totalAmount * 0.1)} per revision or as mutually agreed.</p>
                </div>

                <div class="section">
                    <h2>8. Intellectual Property</h2>
                    <p>Upon full payment, all intellectual property rights in the deliverables shall transfer to the Client. The Service Provider retains the right to showcase the work in their portfolio unless otherwise agreed.</p>
                </div>

                <div class="section">
                    <h2>9. Confidentiality</h2>
                    <p>Both parties agree to maintain confidentiality of all proprietary information shared during the course of this agreement.</p>
                </div>

                <div class="section">
                    <h2>10. Termination</h2>
                    <p>Either party may terminate this agreement with 7 days written notice. In case of termination, the Client shall pay for work completed up to the termination date on a pro-rata basis.</p>
                </div>

                <div class="section">
                    <h2>11. Liability</h2>
                    <p>The Service Provider's liability is limited to the total amount paid under this agreement. The Service Provider is not liable for indirect, incidental, or consequential damages.</p>
                </div>

                <div class="section">
                    <h2>12. Dispute Resolution</h2>
                    <p>Any disputes arising from this agreement shall be resolved through good faith negotiation. If unresolved, the matter shall be subject to arbitration under the Arbitration and Conciliation Act, 1996, in accordance with Indian law.</p>
                </div>

                <div class="section">
                    <h2>13. Governing Law</h2>
                    <p>This agreement shall be governed by the laws of India.</p>
                </div>

                <div class="section">
                    <h2>Signatures</h2>
                    <p>_______________________<br>
                    <strong>${data.providerName}</strong> (Service Provider)<br>
                    Date: ___________</p>
                    <br>
                    <p>_______________________<br>
                    <strong>${data.clientName}</strong> (Client)<br>
                    Date: ___________</p>
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
