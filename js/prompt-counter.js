/**
 * ShramKavach - Dynamic Prompt Counter
 * Automatically counts and updates prompt totals from all JSON files
 */

(async function() {
    try {
        // Load prompt counts from all sources
        const [mainPrompts, megaPrompts, extendedPrompts] = await Promise.all([
            fetch('data/prompts.json').then(r => r.json()).catch(() => []),
            fetch('data/prompts-mega.json').then(r => r.json()).catch(() => ({})),
            fetch('data/prompts-extended.json').then(r => r.json()).catch(() => ({}))
        ]);

        // Calculate total count
        let totalCount = 0;
        
        // Count main prompts (array of prompt objects)
        if (Array.isArray(mainPrompts)) {
            totalCount += mainPrompts.length;
            console.log(`📄 prompts.json: ${mainPrompts.length} prompts`);
        }
        
        // Count mega prompts (could be array or object with prompts array)
        if (megaPrompts) {
            if (Array.isArray(megaPrompts.prompts)) {
                totalCount += megaPrompts.prompts.length;
                console.log(`📄 prompts-mega.json: ${megaPrompts.prompts.length} prompts`);
            } else if (typeof megaPrompts === 'object') {
                let megaCount = 0;
                Object.keys(megaPrompts).forEach(key => {
                    if (Array.isArray(megaPrompts[key])) {
                        megaCount += megaPrompts[key].length;
                    }
                });
                totalCount += megaCount;
                console.log(`📄 prompts-mega.json: ${megaCount} prompts`);
            }
        }
        
        // Count extended prompts (object with category arrays)
        if (extendedPrompts && typeof extendedPrompts === 'object') {
            let extendedCount = 0;
            Object.keys(extendedPrompts).forEach(key => {
                if (Array.isArray(extendedPrompts[key])) {
                    extendedCount += extendedPrompts[key].length;
                }
            });
            totalCount += extendedCount;
            console.log(`📄 prompts-extended.json: ${extendedCount} prompts`);
        }

        console.log(`🎯 TOTAL PROMPTS: ${totalCount}`);

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
            
            console.log(`✅ Prompt count updated on page: ${totalCount}+`);
        }

        // Update meta description if on prompts page
        if (window.location.pathname.includes('prompts')) {
            const metaDesc = document.querySelector('meta[name="description"]');
            if (metaDesc) {
                metaDesc.content = metaDesc.content.replace(/\d+\+/g, totalCount + '+');
            }
        }

    } catch (error) {
        console.error('❌ Error updating prompt count:', error);
    }
})();
