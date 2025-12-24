// Dropdown menu functionality for calculator selection
document.addEventListener('DOMContentLoaded', function() {
    const dropdownButton = document.querySelector('.dropdown-button');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    const dropdownArrow = document.querySelector('.dropdown-arrow');
    const dropdownItems = document.querySelectorAll('.dropdown-item');
    
    if (!dropdownButton || !dropdownMenu) return;
    
    // Hide all calculators except gratuity on page load
    document.querySelectorAll('section[id]').forEach(section => {
        if (section.id !== 'gratuity') {
            section.style.display = 'none';
        }
    });
    
    // Hide all category headers except labour
    document.querySelectorAll('h2[id]').forEach(header => {
        if (header.id !== 'labour') {
            header.style.display = 'none';
        }
    });
    
    // Toggle dropdown on button click
    dropdownButton.addEventListener('click', function(e) {
        e.stopPropagation();
        const isActive = dropdownMenu.classList.contains('active');
        
        if (isActive) {
            closeDropdown();
        } else {
            openDropdown();
        }
    });
    
    // Handle calculator selection
    dropdownItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.stopPropagation();
            const calculatorId = this.getAttribute('data-calculator');
            
            if (calculatorId) {
                // Close dropdown
                closeDropdown();
                
                // Hide all calculators and category headers
                document.querySelectorAll('section[id]').forEach(section => {
                    section.style.display = 'none';
                });
                document.querySelectorAll('h2[id]').forEach(header => {
                    header.style.display = 'none';
                });
                
                // Show selected calculator
                const calculatorSection = document.getElementById(calculatorId);
                
                if (calculatorSection) {
                    calculatorSection.style.display = 'block';
                    
                    // Find and show the category header
                    let categoryHeader = calculatorSection.previousElementSibling;
                    while (categoryHeader && categoryHeader.tagName !== 'H2') {
                        categoryHeader = categoryHeader.previousElementSibling;
                    }
                    if (categoryHeader && categoryHeader.tagName === 'H2') {
                        categoryHeader.style.display = 'block';
                    }
                    
                    // Scroll to the calculator with offset for sticky header
                    const headerOffset = 100;
                    const elementPosition = calculatorSection.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!dropdownButton.contains(e.target) && !dropdownMenu.contains(e.target)) {
            closeDropdown();
        }
    });
    
    // Close dropdown on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeDropdown();
        }
    });
    
    // Close dropdown when scrolling (optional, for better UX)
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            if (dropdownMenu.classList.contains('active')) {
                closeDropdown();
            }
        }, 150);
    });
    
    function openDropdown() {
        dropdownMenu.classList.add('active');
        dropdownArrow.style.transform = 'rotate(180deg)';
        dropdownButton.setAttribute('aria-expanded', 'true');
    }
    
    function closeDropdown() {
        dropdownMenu.classList.remove('active');
        dropdownArrow.style.transform = 'rotate(0deg)';
        dropdownButton.setAttribute('aria-expanded', 'false');
    }
    
    // Touch support for mobile
    let touchStartY = 0;
    dropdownMenu.addEventListener('touchstart', function(e) {
        touchStartY = e.touches[0].clientY;
    });
    
    dropdownMenu.addEventListener('touchmove', function(e) {
        // Allow scrolling within dropdown on mobile
        const touchY = e.touches[0].clientY;
        const isScrollingDown = touchY < touchStartY;
        const isScrollingUp = touchY > touchStartY;
        const isAtTop = this.scrollTop === 0;
        const isAtBottom = this.scrollTop + this.clientHeight >= this.scrollHeight;
        
        // Prevent body scroll when at boundaries
        if ((isAtTop && isScrollingUp) || (isAtBottom && isScrollingDown)) {
            e.preventDefault();
        }
    });
    
    // Update button text when calculator is selected
    function updateButtonText(calculatorName) {
        const buttonText = dropdownButton.querySelector('span');
        if (buttonText && calculatorName) {
            buttonText.textContent = `🧮 ${calculatorName}`;
            // Reset after 3 seconds
            setTimeout(() => {
                buttonText.textContent = '🧮 Select Calculator (34 Available)';
            }, 3000);
        }
    }
    
    // Enhanced click handler with visual feedback
    dropdownItems.forEach(item => {
        item.addEventListener('click', function() {
            const calculatorName = this.querySelector('span').textContent;
            updateButtonText(calculatorName);
            
            // Add visual feedback
            this.style.background = '#e5e7eb';
            setTimeout(() => {
                this.style.background = '';
            }, 200);
        });
    });
});
