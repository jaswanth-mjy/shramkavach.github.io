/**
 * Accordion Calculator System - Non-intrusive version
 * Adds expand/collapse functionality to all 34 calculators without modifying HTML
 */

document.addEventListener('DOMContentLoaded', function() {
    // Find all calculator sections
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
        const sectionId = section.id;
        
        // Skip non-calculator sections
        if (!section.querySelector('form')) return;
        
        // Find the header div (gradient background)
        const headerDiv = section.querySelector('[class*="bg-gradient-to-r"]');
        if (!headerDiv) return;
        
        // Find the body (p-8 div with form)
        const bodyDiv = section.querySelector('.p-8');
        if (!bodyDiv) return;
        
        // Add classes
        headerDiv.classList.add('calculator-header');
        bodyDiv.classList.add('calculator-body');
        section.closest('.max-w-4xl')?.parentElement?.classList.add('calculator-card');
        
        // Start collapsed
        bodyDiv.classList.remove('expanded');
        
        // Add click handler
        headerDiv.addEventListener('click', function() {
            // Close all other calculators
            document.querySelectorAll('.calculator-body.expanded').forEach(body => {
                if (body !== bodyDiv) {
                    body.classList.remove('expanded');
                    const otherHeader = body.closest('section').querySelector('.calculator-header');
                    if (otherHeader) otherHeader.classList.remove('expanded');
                }
            });
            
            // Toggle current calculator
            const isExpanded = bodyDiv.classList.contains('expanded');
            if (isExpanded) {
                bodyDiv.classList.remove('expanded');
                headerDiv.classList.remove('expanded');
            } else {
                bodyDiv.classList.add('expanded');
                headerDiv.classList.add('expanded');
                
                // Smooth scroll to header
                setTimeout(() => {
                    headerDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
            }
        });
    });
    
    // Auto-open calculator from URL hash
    const hash = window.location.hash.substring(1);
    if (hash) {
        const targetSection = document.getElementById(hash);
        if (targetSection) {
            const headerDiv = targetSection.querySelector('.calculator-header');
            const bodyDiv = targetSection.querySelector('.calculator-body');
            
            if (headerDiv && bodyDiv) {
                setTimeout(() => {
                    bodyDiv.classList.add('expanded');
                    headerDiv.classList.add('expanded');
                    headerDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 500);
            }
        }
    }
    
    // Handle hash changes (back/forward navigation)
    window.addEventListener('hashchange', function() {
        const hash = window.location.hash.substring(1);
        if (hash) {
            const targetSection = document.getElementById(hash);
            if (targetSection) {
                const headerDiv = targetSection.querySelector('.calculator-header');
                const bodyDiv = targetSection.querySelector('.calculator-body');
                
                // Close all others
                document.querySelectorAll('.calculator-body').forEach(body => body.classList.remove('expanded'));
                document.querySelectorAll('.calculator-header').forEach(header => header.classList.remove('expanded'));
                
                // Open target
                if (headerDiv && bodyDiv) {
                    bodyDiv.classList.add('expanded');
                    headerDiv.classList.add('expanded');
                    headerDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        }
    });
    
    console.log('✅ Accordion Calculator System Loaded - All calculators collapsed by default');
});
