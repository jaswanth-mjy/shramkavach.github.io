/**
 * ScribbleTools Notification System
 * Displays notification banner and logs user interactions
 * For ShramKavach website
 */

(function() {
    'use strict';

    // Configuration
    const CONFIG = {
        BANNER_ID: 'scribbletools-banner',
        STORAGE_KEY: 'scribbletools_banner_dismissed',
        LOG_KEY: 'scribbletools_interaction_log',
        SCRIBBLETOOLS_URL: 'https://shramtools.shramkavach.com',
        AUTO_DISMISS_DAYS: 7, // Auto-show banner again after 7 days
        ENABLE_LOGGING: true
    };

    // Error and interaction logging system
    const Logger = {
        /**
         * Log user interaction with banner
         */
        logInteraction: function(action, details = {}) {
            if (!CONFIG.ENABLE_LOGGING) return;

            const logEntry = {
                timestamp: new Date().toISOString(),
                action: action,
                details: details,
                userAgent: navigator.userAgent,
                screenSize: `${window.screen.width}x${window.screen.height}`,
                viewport: `${window.innerWidth}x${window.innerHeight}`,
                referrer: document.referrer || 'direct',
                page: window.location.pathname
            };

            try {
                // Get existing logs
                const logs = this.getLogs();
                
                // Add new log entry
                logs.push(logEntry);
                
                // Keep only last 100 entries to prevent storage overflow
                const recentLogs = logs.slice(-100);
                
                // Store in localStorage
                localStorage.setItem(CONFIG.LOG_KEY, JSON.stringify(recentLogs));
                
                // Console log for debugging (only in development)
                if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                    console.log('📊 ScribbleTools Interaction:', action, details);
                }
            } catch (error) {
                console.warn('Failed to log interaction:', error);
            }
        },

        /**
         * Get all logged interactions
         */
        getLogs: function() {
            try {
                const logsJSON = localStorage.getItem(CONFIG.LOG_KEY);
                return logsJSON ? JSON.parse(logsJSON) : [];
            } catch (error) {
                console.warn('Failed to retrieve logs:', error);
                return [];
            }
        },

        /**
         * Export logs as downloadable file
         */
        exportLogs: function() {
            try {
                const logs = this.getLogs();
                const dataStr = JSON.stringify(logs, null, 2);
                const dataBlob = new Blob([dataStr], { type: 'application/json' });
                
                const url = URL.createObjectURL(dataBlob);
                const link = document.createElement('a');
                link.href = url;
                link.download = `scribbletools-logs-${new Date().toISOString().split('T')[0]}.json`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
                
                console.log('✅ Logs exported successfully');
            } catch (error) {
                console.error('Failed to export logs:', error);
            }
        },

        /**
         * Clear all logs
         */
        clearLogs: function() {
            try {
                localStorage.removeItem(CONFIG.LOG_KEY);
                console.log('✅ Logs cleared');
            } catch (error) {
                console.warn('Failed to clear logs:', error);
            }
        },

        /**
         * Get summary statistics
         */
        getStats: function() {
            const logs = this.getLogs();
            const stats = {
                totalInteractions: logs.length,
                bannerViews: logs.filter(l => l.action === 'banner_shown').length,
                bannerClicks: logs.filter(l => l.action === 'banner_clicked').length,
                bannerDismissals: logs.filter(l => l.action === 'banner_dismissed').length,
                redirects: logs.filter(l => l.action === 'redirected_to_scribbletools').length,
                clickThroughRate: 0
            };

            if (stats.bannerViews > 0) {
                stats.clickThroughRate = ((stats.bannerClicks / stats.bannerViews) * 100).toFixed(2) + '%';
            }

            return stats;
        }
    };

    // Banner management
    const BannerManager = {
        /**
         * Check if banner should be shown
         */
        shouldShowBanner: function() {
            try {
                const dismissedData = localStorage.getItem(CONFIG.STORAGE_KEY);
                
                if (!dismissedData) return true;
                
                const dismissedDate = new Date(dismissedData);
                const daysSinceDismissed = Math.floor((Date.now() - dismissedDate.getTime()) / (1000 * 60 * 60 * 24));
                
                return daysSinceDismissed >= CONFIG.AUTO_DISMISS_DAYS;
            } catch (error) {
                console.warn('Error checking banner status:', error);
                return true; // Show by default if error
            }
        },

        /**
         * Mark banner as dismissed
         */
        dismissBanner: function() {
            try {
                const banner = document.getElementById(CONFIG.BANNER_ID);
                if (banner) {
                    // Fade out animation
                    banner.style.transition = 'opacity 0.3s ease-out, transform 0.3s ease-out';
                    banner.style.opacity = '0';
                    banner.style.transform = 'translateY(-20px)';
                    
                    setTimeout(() => {
                        banner.style.display = 'none';
                    }, 300);
                }
                
                // Store dismissal timestamp
                localStorage.setItem(CONFIG.STORAGE_KEY, new Date().toISOString());
                
                // Log the dismissal
                Logger.logInteraction('banner_dismissed', {
                    reason: 'user_action'
                });
            } catch (error) {
                console.warn('Error dismissing banner:', error);
            }
        },

        /**
         * Track banner click
         */
        trackClick: function(event) {
            const targetUrl = event.currentTarget.href;
            
            Logger.logInteraction('banner_clicked', {
                targetUrl: targetUrl,
                buttonText: event.currentTarget.textContent.trim()
            });
            
            Logger.logInteraction('redirected_to_scribbletools', {
                from: window.location.href,
                to: targetUrl
            });
        },

        /**
         * Initialize banner
         */
        init: function() {
            // Check if banner should be shown
            if (!this.shouldShowBanner()) {
                const banner = document.getElementById(CONFIG.BANNER_ID);
                if (banner) {
                    banner.style.display = 'none';
                }
                Logger.logInteraction('banner_hidden', {
                    reason: 'previously_dismissed'
                });
                return;
            }

            // Log banner shown
            Logger.logInteraction('banner_shown', {
                page: window.location.pathname
            });

            // Attach event listeners
            this.attachEventListeners();
        },

        /**
         * Attach event listeners to banner elements
         */
        attachEventListeners: function() {
            const banner = document.getElementById(CONFIG.BANNER_ID);
            if (!banner) {
                Logger.logInteraction('error', {
                    message: 'Banner element not found',
                    bannerId: CONFIG.BANNER_ID
                });
                return;
            }

            // Track clicks on "Try ScribbleTools" button
            const ctaButtons = banner.querySelectorAll('a[href*="scribbletools"]');
            ctaButtons.forEach(button => {
                button.addEventListener('click', (e) => this.trackClick(e));
            });

            // Track banner dismissal
            const closeButtons = banner.querySelectorAll('button[onclick*="display"]');
            closeButtons.forEach(button => {
                // Remove inline onclick to use our custom handler
                button.removeAttribute('onclick');
                button.addEventListener('click', () => this.dismissBanner());
            });
        }
    };

    // Global error logging for ScribbleTools-related errors
    const ErrorLogger = {
        /**
         * Log JavaScript errors
         */
        init: function() {
            // Only log errors in production, not development
            if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
                window.addEventListener('error', (event) => {
                    // Only log errors from ScribbleTools or this script
                    if (event.filename && event.filename.includes('scribbletools')) {
                        Logger.logInteraction('javascript_error', {
                            message: event.message,
                            filename: event.filename,
                            line: event.lineno,
                            column: event.colno,
                            stack: event.error ? event.error.stack : null
                        });
                    }
                });

                // Log unhandled promise rejections
                window.addEventListener('unhandledrejection', (event) => {
                    Logger.logInteraction('unhandled_promise_rejection', {
                        reason: event.reason,
                        promise: event.promise
                    });
                });
            }
        }
    };

    // Public API for console access
    window.ScribbleToolsNotification = {
        showBanner: function() {
            localStorage.removeItem(CONFIG.STORAGE_KEY);
            const banner = document.getElementById(CONFIG.BANNER_ID);
            if (banner) {
                banner.style.display = '';
                banner.style.opacity = '1';
                banner.style.transform = 'translateY(0)';
            }
            Logger.logInteraction('banner_manually_shown');
        },
        
        hideBanner: BannerManager.dismissBanner.bind(BannerManager),
        
        getLogs: Logger.getLogs.bind(Logger),
        
        getStats: Logger.getStats.bind(Logger),
        
        exportLogs: Logger.exportLogs.bind(Logger),
        
        clearLogs: Logger.clearLogs.bind(Logger),
        
        config: CONFIG
    };

    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            BannerManager.init();
            ErrorLogger.init();
        });
    } else {
        BannerManager.init();
        ErrorLogger.init();
    }

    // Log page load
    Logger.logInteraction('page_loaded', {
        page: window.location.pathname,
        loadTime: performance.timing.loadEventEnd - performance.timing.navigationStart
    });

})();

/**
 * USAGE EXAMPLES (Developer Console):
 * 
 * // View interaction statistics
 * ScribbleToolsNotification.getStats()
 * 
 * // View all logs
 * ScribbleToolsNotification.getLogs()
 * 
 * // Export logs to file
 * ScribbleToolsNotification.exportLogs()
 * 
 * // Clear all logs
 * ScribbleToolsNotification.clearLogs()
 * 
 * // Manually show banner
 * ScribbleToolsNotification.showBanner()
 * 
 * // Manually hide banner
 * ScribbleToolsNotification.hideBanner()
 */
