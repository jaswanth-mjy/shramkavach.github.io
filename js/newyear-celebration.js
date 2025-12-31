/**
 * New Year Celebration Effect
 * Displays Happy New Year message with snow particles
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
                
                #close-celebration {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: rgba(255, 255, 255, 0.9);
                    border: none;
                    border-radius: 50%;
                    width: 40px;
                    height: 40px;
                    font-size: 1.5rem;
                    cursor: pointer;
                    pointer-events: all;
                    z-index: 1000003;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
                    transition: all 0.3s ease;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                
                #close-celebration:hover {
                    background: rgba(255, 255, 255, 1);
                    transform: scale(1.1);
                }
                
                #newyear-text {
                    position: fixed;
                    bottom: 80px;
                    left: -400px;
                    font-size: clamp(1.2rem, 4vw, 2.5rem);
                    font-weight: 900;
                    animation: textSlide 15s linear;
                    z-index: 1000002;
                    white-space: nowrap;
                    padding: 0.8rem 1.5rem;
                    background: rgba(255, 255, 255, 0.95);
                    border-radius: 0.8rem;
                    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
                    pointer-events: none;
                }
                
                #newyear-text span {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
                    background-size: 200% 200%;
                    -webkit-background-clip: text;
                    background-clip: text;
                    -webkit-text-fill-color: transparent;
                    animation: gradientShift 3s ease infinite;
                }
                
                #santa-sleigh {
                    position: absolute;
                    top: 10%;
                    left: -150px;
                    font-size: 2.5rem;
                    z-index: 1000001;
                    animation: santaFly 12s linear infinite;
                    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
                }
                
                .gift-drop {
                    position: absolute;
                    font-size: 2rem;
                    animation: giftFall 3s ease-in forwards;
                    z-index: 1000000;
                }
                
                .snow-particle {
                    position: absolute;
                    top: -10px;
                    color: #fff;
                    font-size: 1rem;
                    pointer-events: none;
                    text-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
                    animation: snowfall linear infinite;
                }
                
                @keyframes gradientShift {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }
                
                @keyframes pulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.05); }
                }
                
                @keyframes fadeInOut {
                    0% { 
                        opacity: 0;
                        transform: translate(-50%, -50%) scale(0.8);
                    }
                    20% { 
                        opacity: 1;
                        transform: translate(-50%, -50%) scale(1);
                    }
                    80% { 
                        opacity: 1;
                        transform: translate(-50%, -50%) scale(1);
                    }
                    100% { 
                        opacity: 0;
                        transform: translate(-50%, -50%) scale(0.8);
                    }
                }
                
                @keyframes textSlide {
                    0% {
                        left: -400px;
                    }
                    100% {
                        left: calc(100% + 400px);
                    }
                }
                
                @keyframes santaFly {
                    0% {
                        left: -150px;
                        top: 10%;
                    }
                    25% {
                        top: 8%;
                    }
                    50% {
                        left: 50%;
                        top: 5%;
                    }
                    75% {
                        top: 8%;
                    }
                    100% {
                        left: calc(100% + 150px);
                        top: 10%;
                    }
                }
                
                @keyframes giftFall {
                    0% {
                        opacity: 1;
                        transform: translateY(0) rotate(0deg);
                    }
                    100% {
                        opacity: 0;
                        transform: translateY(100vh) rotate(720deg);
                    }
                }
                
                @keyframes snowfall {
                    0% {
                        transform: translateY(0) translateX(0) rotate(0deg);
                        opacity: 1;
                    }
                    100% {
                        transform: translateY(100vh) translateX(var(--drift)) rotate(360deg);
                        opacity: 0.3;
                    }
                }
            </style>
            
            <button id="close-celebration" title="Close celebration" aria-label="Close">×</button>
            <div id="newyear-text"><span>🎊 Happy New Year 2026! 🎊</span></div>
            <div id="santa-sleigh">🎅🛷</div>
        `;
        
        document.body.appendChild(celebrationContainer);
        
        // Close button functionality
        const closeBtn = document.getElementById('close-celebration');
        closeBtn.addEventListener('click', () => {
            const celebration = document.getElementById('newyear-celebration');
            if (celebration) celebration.remove();
        });
        
        // Create snow particles
        createSnowParticles();
        
        // Drop gifts from Santa periodically
        dropGifts();
    }
    
    // Create falling snow particles
    function createSnowParticles() {
        const snowflakes = ['❄', '❅', '❆'];
        const snowColors = [
            '#E0F7FF', // light cyan
            '#B3E5FC', // sky blue
            '#E1F5FE', // pale blue
            '#F0F4FF', // lavender white
            '#E3F2FD', // very light blue
            '#FFFFFF', // white
            '#D1E7FF', // powder blue
            '#E8F5E9'  // mint white
        ];
        const container = document.getElementById('newyear-celebration');
        
        function createSnowflake() {
            const snowflake = document.createElement('div');
            snowflake.className = 'snow-particle';
            snowflake.textContent = snowflakes[Math.floor(Math.random() * snowflakes.length)];
            
            // Random horizontal position
            snowflake.style.left = Math.random() * 100 + '%';
            
            // Random light color
            const color = snowColors[Math.floor(Math.random() * snowColors.length)];
            snowflake.style.color = color;
            snowflake.style.textShadow = `0 0 5px ${color}, 0 0 10px ${color}`;
            
            // Random size
            const size = Math.random() * 1.5 + 0.5; // 0.5rem to 2rem
            snowflake.style.fontSize = size + 'rem';
            
            // Random animation duration (slower = more realistic)
            snowflake.style.animationDuration = (Math.random() * 3 + 4) + 's'; // 4-7 seconds
            
            // Random horizontal drift
            const drift = (Math.random() - 0.5) * 100; // -50px to 50px
            snowflake.style.setProperty('--drift', drift + 'px');
            
            // Random delay for staggered effect
            snowflake.style.animationDelay = Math.random() * 0.5 + 's';
            
            container.appendChild(snowflake);
            
            // Remove snowflake after animation
            setTimeout(() => snowflake.remove(), 7500);
        }
        
        // Create initial batch of snowflakes
        for (let i = 0; i < 50; i++) {
            setTimeout(createSnowflake, Math.random() * 1000);
        }
        
        // Continue creating snowflakes
        const snowInterval = setInterval(createSnowflake, 200);
        
        // Stop after 15 seconds and clean up
        setTimeout(() => {
            clearInterval(snowInterval);
            // Remove remaining snowflakes after 3 more seconds
            setTimeout(() => {
                const allSnow = document.querySelectorAll('.snow-particle');
                allSnow.forEach(s => s.remove());
                // Remove entire container
                const celebration = document.getElementById('newyear-celebration');
                if (celebration) celebration.remove();
            }, 3000);
        }, 15000);
    }
    
    // Drop gifts from Santa
    function dropGifts() {
        const gifts = ['🎁', '🎀', '🎉', '⭐', '🎊'];
        const container = document.getElementById('newyear-celebration');
        const santa = document.getElementById('santa-sleigh');
        
        function createGift() {
            if (!santa || !container) return;
            
            const gift = document.createElement('div');
            gift.className = 'gift-drop';
            gift.textContent = gifts[Math.floor(Math.random() * gifts.length)];
            
            // Get Santa's current position
            const santaRect = santa.getBoundingClientRect();
            gift.style.left = (santaRect.left + santaRect.width / 2) + 'px';
            gift.style.top = (santaRect.top + santaRect.height) + 'px';
            
            container.appendChild(gift);
            
            // Remove gift after animation
            setTimeout(() => gift.remove(), 3000);
        }
        
        // Drop gifts every 3 seconds for 15 seconds
        const giftInterval = setInterval(createGift, 3000);
        
        setTimeout(() => {
            clearInterval(giftInterval);
        }, 15000);
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initNewYearCelebration);
    } else {
        initNewYearCelebration();
    }
})();
