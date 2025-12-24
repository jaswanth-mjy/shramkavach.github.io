/**
 * ShramSetu - Dynamic Prompt Counter
 * Updates prompt count across all pages
 */

(async function() {
    try {
        // Load prompt counts from all sources
        const [mainPrompts, megaPrompts, extendedPrompts] = await Promise.all([
            fetch('data/prompts.json').then(r => r.json()).catch(() => []),
            fetch('data/prompts-mega.json').then(r => r.json()).catch(() => ({ prompts: [] })),
            fetch('data/prompts-extended.json').then(r => r.json()).catch(() => ({}))
        ]);

        // Calculate total count
        let totalCount = 0;
        
        // Count main prompts
        totalCount += Array.isArray(mainPrompts) ? mainPrompts.length : 0;
        
        // Count mega prompts
        totalCount += (megaPrompts.prompts || []).length;
        
        // Count extended prompts
        if (extendedPrompts) {
            Object.keys(extendedPrompts).forEach(key => {
                if (Array.isArray(extendedPrompts[key])) {
                    totalCount += extendedPrompts[key].length;
                }
            });
        }

        // Update all elements with class 'prompt-count'
        const countElements = document.querySelectorAll('.prompt-count');
        if (countElements.length > 0) {
            countElements.forEach(el => {
                el.textContent = totalCount + '+';
                // Add animation
                el.style.transition = 'all 0.5s ease';
                el.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    el.style.transform = 'scale(1)';
                }, 500);
            });
            
            console.log(`✅ Prompt count updated: ${totalCount} prompts`);
        }

        // Update meta description if on prompts page
        if (window.location.pathname.includes('prompts')) {
            const metaDesc = document.querySelector('meta[name="description"]');
            if (metaDesc) {
                metaDesc.content = metaDesc.content.replace(/\d+\+/g, totalCount + '+');
            }
        }

    } catch (error) {
        console.error('Error updating prompt count:', error);
    }
})();
