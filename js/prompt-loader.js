/**
 * ShramSetu Prompt Loader with Dynamic Count
 * Loads prompts from multiple sources and updates count dynamically
 */

let allPrompts = [];
let totalPromptCount = 0;

// Load prompts from multiple sources
document.addEventListener('DOMContentLoaded', async function() {
    console.log('🔄 Starting to load prompts...');
    
    try {
        // Show loading state
        const container = document.getElementById('promptsContainer');
        container.innerHTML = `
            <div class="col-span-full text-center py-12">
                <div class="animate-spin rounded-full h-16 w-16 border-b-4 border-green-600 mx-auto mb-4"></div>
                <p class="text-xl text-gray-600">Loading prompts...</p>
            </div>
        `;
        
        // Load from all prompt files
        const [mainPrompts, megaPrompts, extendedPrompts] = await Promise.all([
            fetch('data/prompts.json')
                .then(r => {
                    console.log('📄 prompts.json status:', r.status);
                    return r.json();
                })
                .catch(err => {
                    console.error('❌ Error loading prompts.json:', err);
                    return [];
                }),
            fetch('data/prompts-mega.json')
                .then(r => {
                    console.log('📄 prompts-mega.json status:', r.status);
                    return r.json();
                })
                .catch(err => {
                    console.error('❌ Error loading prompts-mega.json:', err);
                    return { prompts: [] };
                }),
            fetch('data/prompts-extended.json')
                .then(r => {
                    console.log('📄 prompts-extended.json status:', r.status);
                    return r.json();
                })
                .catch(err => {
                    console.error('❌ Error loading prompts-extended.json:', err);
                    return {};
                })
        ]);

        console.log('✅ Loaded main prompts:', Array.isArray(mainPrompts) ? mainPrompts.length : 0);
        console.log('✅ Loaded mega prompts:', megaPrompts.prompts ? megaPrompts.prompts.length : 0);
        console.log('✅ Loaded extended prompts:', Object.keys(extendedPrompts).length);

        // Combine all prompts
        allPrompts = [
            ...(Array.isArray(mainPrompts) ? mainPrompts : []),
            ...(megaPrompts.prompts || [])
        ];

        // Add extended prompts (convert topic lists to prompt objects)
        if (extendedPrompts && Object.keys(extendedPrompts).length > 0) {
            let promptId = allPrompts.length + 1;
            
            Object.keys(extendedPrompts).forEach(categoryKey => {
                const category = categoryKey.replace('_prompts', '').replace(/_/g, '-');
                const promptList = extendedPrompts[categoryKey];
                
                if (Array.isArray(promptList)) {
                    promptList.forEach((title, index) => {
                        allPrompts.push({
                            id: promptId++,
                            title: title,
                            category: category,
                            language: 'en',
                            description: `AI prompt for ${title.toLowerCase()}`,
                            prompt: `Generate content for: ${title}\n\nProvide detailed, actionable content that helps with this specific business need. Include examples and best practices.`
                        });
                    });
                }
            });
        }

        totalPromptCount = allPrompts.length;
        console.log(`✅ Total prompts loaded: ${totalPromptCount}`);
        
        updatePromptCount(totalPromptCount);
        displayPrompts(allPrompts);
        setupFilters();
        
        console.log(`✅ Successfully displayed ${totalPromptCount} prompts`);
    } catch (error) {
        console.error('❌ Critical error loading prompts:', error);
        document.getElementById('promptsContainer').innerHTML = `
            <div class="col-span-full text-center py-12">
                <div class="text-6xl mb-4">❌</div>
                <p class="text-red-600 text-xl font-bold mb-2">Failed to load prompts</p>
                <p class="text-gray-600 mb-4">Error: ${error.message}</p>
                <button onclick="location.reload()" class="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700">
                    Try Again
                </button>
            </div>
        `;
    }
});

function updatePromptCount(count) {
    // Update count in hero section
    const countElements = document.querySelectorAll('.prompt-count');
    countElements.forEach(el => {
        el.textContent = count + '+';
        el.classList.add('animate-pulse');
        setTimeout(() => el.classList.remove('animate-pulse'), 1000);
    });
    
    // Update page title
    document.title = `${count}+ AI Prompts for Gig Workers | ShramSetu`;
}

function displayPrompts(prompts) {
    const container = document.getElementById('promptsContainer');
    const noResults = document.getElementById('noResults');
    
    if (prompts.length === 0) {
        container.classList.add('hidden');
        noResults.classList.remove('hidden');
        return;
    }
    
    container.classList.remove('hidden');
    noResults.classList.add('hidden');
    
    container.innerHTML = prompts.map(prompt => {
        const categoryColors = {
            'marketing': 'bg-orange-100 text-orange-800',
            'customer-service': 'bg-blue-100 text-blue-800',
            'negotiation': 'bg-purple-100 text-purple-800',
            'business-planning': 'bg-green-100 text-green-800',
            'content-creation': 'bg-pink-100 text-pink-800',
            'legal': 'bg-red-100 text-red-800'
        };
        
        const languageFlags = {
            'hi': 'हिंदी',
            'en': 'English',
            'ta': 'தமிழ்',
            'mr': 'मराठी'
        };
        
        const categoryColor = categoryColors[prompt.category] || 'bg-gray-100 text-gray-800';
        const languageFlag = languageFlags[prompt.language] || prompt.language;
        
        return `
            <div class="bg-white rounded-xl shadow-lg hover:shadow-2xl transition p-6 border-2 border-transparent hover:border-green-400">
                <div class="flex justify-between items-start mb-3">
                    <span class="px-3 py-1 rounded-full text-xs font-semibold ${categoryColor}">
                        ${prompt.category.replace('-', ' ').toUpperCase()}
                    </span>
                    <span class="text-sm">${languageFlag}</span>
                </div>
                
                <h3 class="text-xl font-bold text-gray-800 mb-2">${prompt.title}</h3>
                <p class="text-gray-600 text-sm mb-4">${prompt.description}</p>
                
                <div class="bg-gray-50 rounded-lg p-3 mb-4 max-h-32 overflow-y-auto">
                    <pre class="text-xs text-gray-700 whitespace-pre-wrap font-mono">${prompt.prompt}</pre>
                </div>
                
                <button onclick="copyPrompt(${prompt.id})" class="w-full bg-gradient-to-r from-green-600 to-teal-600 text-white py-3 rounded-lg font-semibold hover:from-green-700 hover:to-teal-700 transition flex items-center justify-center gap-2">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"/>
                        <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"/>
                    </svg>
                    Copy Prompt
                </button>
            </div>
        `;
    }).join('');
}

function setupFilters() {
    const searchInput = document.getElementById('promptSearch');
    const categoryFilter = document.getElementById('categoryFilter');
    const languageFilter = document.getElementById('promptLanguageFilter');
    
    function applyFilters() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedCategory = categoryFilter.value;
        const selectedLanguage = languageFilter.value;
        
        let filtered = allPrompts;
        
        // Search filter
        if (searchTerm) {
            filtered = filtered.filter(prompt => 
                prompt.title.toLowerCase().includes(searchTerm) ||
                prompt.description.toLowerCase().includes(searchTerm) ||
                prompt.prompt.toLowerCase().includes(searchTerm)
            );
        }
        
        // Category filter
        if (selectedCategory !== 'all') {
            filtered = filtered.filter(prompt => prompt.category === selectedCategory);
        }
        
        // Language filter
        if (selectedLanguage !== 'all') {
            filtered = filtered.filter(prompt => prompt.language === selectedLanguage);
        }
        
        displayPrompts(filtered);
    }
    
    searchInput.addEventListener('input', applyFilters);
    categoryFilter.addEventListener('change', applyFilters);
    languageFilter.addEventListener('change', applyFilters);
}

function copyPrompt(id) {
    const prompt = allPrompts.find(p => p.id === id);
    if (!prompt) return;
    
    navigator.clipboard.writeText(prompt.prompt).then(() => {
        showToast();
    }).catch(err => {
        alert('Failed to copy prompt. Please try again.');
        console.error('Copy failed:', err);
    });
}

function showToast() {
    const toast = document.getElementById('toast');
    toast.classList.remove('hidden');
    
    setTimeout(() => {
        toast.classList.add('hidden');
    }, 2000);
}

console.log('✅ ShramSetu Prompt Library Loaded');
