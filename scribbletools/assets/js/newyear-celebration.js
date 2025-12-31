/**
 * New Year Celebration Effect
 * Displays Happy New Year message with flower particles
 * Only visible on January 1st
 */

(function() {
    'use strict';
    
    // Check if today is January 1st
    function isNewYearDay() {
        const today = new Date();
        return today.getMonth() === 0 && today.getDate() === 1;
    }
    
    // Only run if it's January 1st
    if (!isNewYearDay()) {
        return;
    }
    
    // Create celebration container
    function initNewYearCelebration() {
        // Create overlay container
        const celebrationContainer = document.createElement('div');
        celebrationContainer.id = 'newyear-celebration';
        celebrationContainer.innerHTML = `
            <style>
                #newyear-celebration {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    pointer-events: none;
                    z-index: 999999;
                    overflow: hidden;
                }
                
                #newyear-message {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    text-align: center;
                    pointer-events: auto;
                    animation: fadeInOut 6s ease-in-out;
                    z-index: 1000000;
                }
                
                #newyear-message h1 {
                    font-size: clamp(2rem, 8vw, 5rem);
                    font-weight: bold;
                    background: linear-gradient(45deg, #ff6b6b, #ffd93d, #6bcf7f, #4ecdc4, #c44569);
                    background-size: 300% 300%;
                    -webkit-background-clip: text;
                    background-clip: text;
                    -webkit-text-fill-color: transparent;
                    animation: gradientShift 3s ease infinite, bounce 2s ease-in-out infinite;
                    text-shadow: 2px 2px 20px rgba(255, 107, 107, 0.3);
                    margin: 0;
                    padding: 1rem;
                }
                
                #newyear-message p {
                    font-size: clamp(1rem, 3vw, 1.5rem);
                    color: #333;
                    margin-top: 1rem;
                    animation: fadeIn 2s ease-in;
                }
                
                .flower-particle {
                    position: absolute;
                    font-size: 2rem;
                    pointer-events: none;
                    animation: fall linear infinite;
                    opacity: 0.8;
                }
                
                @keyframes gradientShift {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                
                @keyframes bounce {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-20px); }
                }
                
                @keyframes fadeInOut {
                    0% { opacity: 0; }
                    20% { opacity: 1; }
                    80% { opacity: 1; }
                    100% { opacity: 0; }
                }
                
                @keyframes fadeIn {
                    0% { opacity: 0; }
                    100% { opacity: 1; }
                }
                
                @keyframes fall {
                    0% {
                        transform: translateY(-100px) rotate(0deg);
                        opacity: 1;
                    }
                    100% {
                        transform: translateY(100vh) rotate(360deg);
                        opacity: 0.5;
                    }
                }
            </style>
            
            <div id="newyear-message">
                <h1>🎊 Happy New Year 2026! 🎊</h1>
                <p>Wishing you a year filled with success and prosperity!</p>
            </div>
        `;
        
        document.body.appendChild(celebrationContainer);
        
        // Create flower particles
        createFlowerParticles();
        
        // Remove message after 3 seconds
        setTimeout(() => {
            const message = document.getElementById('newyear-message');
            if (message) {
                message.remove();
            }
        }, 3000);
    }
    
    // Create falling flower particles
    function createFlowerParticles() {
        const flowers = ['🌸', '🌺', '🌼', '🌻', '🌷', '🌹', '💐', '🏵️', '💮', '🥀'];
        const container = document.getElementById('newyear-celebration');
        
        function createParticle() {
            const particle = document.createElement('div');
            particle.className = 'flower-particle';
            particle.textContent = flowers[Math.floor(Math.random() * flowers.length)];
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDuration = (Math.random() * 2 + 3) + 's'; // 3-5 seconds
            particle.style.animationDelay = '0s'; // No delay
            container.appendChild(particle);
        }
        
        // Create initial batch
        for (let i = 0; i < 30; i++) {
            setTimeout(createParticle, Math.random() * 1000);
        }
        
        // Continue creating particles
        const particleInterval = setInterval(() => {
            createParticle();
        }, 300);
        
        // Stop creating particles after 5 seconds and remove all
        setTimeout(() => {
            clearInterval(particleInterval);
            // Immediately remove ALL particles
            const allParticles = document.querySelectorAll('.flower-particle');
            allParticles.forEach(p => p.remove());
        }, 5000);
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initNewYearCelebration);
    } else {
        initNewYearCelebration();
    }
})();
