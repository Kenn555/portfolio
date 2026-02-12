// Cookie Consent Management
class CookieConsent {
    constructor() {
        this.consentElement = document.getElementById('cookieConsent');
        this.acceptBtn = document.getElementById('acceptCookies');
        this.rejectBtn = document.getElementById('rejectCookies');
        this.settingsBtn = document.getElementById('cookieSettings');
        
        this.consentKey = 'portfolio_cookie_consent';
        this.preferencesKey = 'portfolio_cookie_preferences';
        
        this.init();
    }
    
    init() {
        if (!this.consentElement) return;
        
        // Check if user has already made a choice
        const existingConsent = this.getConsent();
        
        if (!existingConsent) {
            // Show consent banner after a short delay
            setTimeout(() => {
                this.showConsent();
            }, 1000);
        } else {
            // Apply existing preferences
            this.applyPreferences(existingConsent);
        }
        
        this.bindEvents();
    }
    
    bindEvents() {
        if (this.acceptBtn) {
            this.acceptBtn.addEventListener('click', () => {
                this.acceptAll();
            });
        }
        
        if (this.rejectBtn) {
            this.rejectBtn.addEventListener('click', () => {
                this.rejectAll();
            });
        }
        
        if (this.settingsBtn) {
            this.settingsBtn.addEventListener('click', () => {
                this.showSettings();
            });
        }
        
        // Listen for custom events
        document.addEventListener('cookieConsentUpdate', (e) => {
            this.handleConsentUpdate(e.detail);
        });
    }
    
    showConsent() {
        this.consentElement.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
    
    hideConsent() {
        this.consentElement.classList.remove('show');
        document.body.style.overflow = '';
    }
    
    acceptAll() {
        const preferences = {
            necessary: true,
            analytics: true,
            marketing: true,
            functional: true,
            timestamp: Date.now()
        };
        
        this.saveConsent('accepted', preferences);
        this.applyPreferences(preferences);
        this.hideConsent();
        this.showNotification('Cookies acceptés', 'Vous avez accepté tous les cookies.', 'success');
    }
    
    rejectAll() {
        const preferences = {
            necessary: true, // Necessary cookies are always required
            analytics: false,
            marketing: false,
            functional: false,
            timestamp: Date.now()
        };
        
        this.saveConsent('rejected', preferences);
        this.applyPreferences(preferences);
        this.hideConsent();
        this.showNotification('Cookies refusés', 'Seuls les cookies nécessaires sont activés.', 'info');
    }
    
    showSettings() {
        // Create settings modal
        this.createSettingsModal();
    }
    
    createSettingsModal() {
        const modal = document.createElement('div');
        modal.className = 'cookie-settings-modal';
        modal.innerHTML = `
            <div class="modal-overlay"></div>
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Préférences de cookies</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="cookie-category">
                        <div class="category-header">
                            <label class="switch">
                                <input type="checkbox" checked disabled>
                                <span class="slider"></span>
                            </label>
                            <div class="category-info">
                                <h4>Cookies nécessaires</h4>
                                <p>Ces cookies sont essentiels au fonctionnement du site.</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="cookie-category">
                        <div class="category-header">
                            <label class="switch">
                                <input type="checkbox" id="analyticsCookies">
                                <span class="slider"></span>
                            </label>
                            <div class="category-info">
                                <h4>Cookies analytiques</h4>
                                <p>Ces cookies nous aident à comprendre comment les visiteurs interagissent avec notre site.</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="cookie-category">
                        <div class="category-header">
                            <label class="switch">
                                <input type="checkbox" id="marketingCookies">
                                <span class="slider"></span>
                            </label>
                            <div class="category-info">
                                <h4>Cookies marketing</h4>
                                <p>Ces cookies sont utilisés pour diffuser des publicités pertinentes.</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="cookie-category">
                        <div class="category-header">
                            <label class="switch">
                                <input type="checkbox" id="functionalCookies">
                                <span class="slider"></span>
                            </label>
                            <div class="category-info">
                                <h4>Cookies fonctionnels</h4>
                                <p>Ces cookies améliorent l'expérience utilisateur.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-outline" id="savePreferences">Enregistrer les préférences</button>
                    <button class="btn btn-primary" id="acceptAllModal">Tout accepter</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Add modal styles
        this.addModalStyles();
        
        // Bind modal events
        this.bindModalEvents(modal);
        
        // Show modal with animation
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
    }
    
    bindModalEvents(modal) {
        const closeBtn = modal.querySelector('.modal-close');
        const overlay = modal.querySelector('.modal-overlay');
        const saveBtn = modal.getElementById('savePreferences');
        const acceptAllBtn = modal.getElementById('acceptAllModal');
        
        const closeModal = () => {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.remove();
            }, 300);
        };
        
        closeBtn.addEventListener('click', closeModal);
        overlay.addEventListener('click', closeModal);
        
        saveBtn.addEventListener('click', () => {
            const preferences = {
                necessary: true,
                analytics: modal.getElementById('analyticsCookies').checked,
                marketing: modal.getElementById('marketingCookies').checked,
                functional: modal.getElementById('functionalCookies').checked,
                timestamp: Date.now()
            };
            
            this.saveConsent('custom', preferences);
            this.applyPreferences(preferences);
            closeModal();
            this.hideConsent();
            this.showNotification('Préférences enregistrées', 'Vos préférences de cookies ont été sauvegardées.', 'success');
        });
        
        acceptAllBtn.addEventListener('click', () => {
            this.acceptAll();
            closeModal();
        });
    }
    
    addModalStyles() {
        if (document.getElementById('cookie-modal-styles')) return;
        
        const styles = document.createElement('style');
        styles.id = 'cookie-modal-styles';
        styles.textContent = `
            .cookie-settings-modal {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                z-index: 10001;
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
            }
            
            .cookie-settings-modal.show {
                opacity: 1;
                visibility: visible;
            }
            
            .modal-overlay {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.5);
                backdrop-filter: blur(5px);
            }
            
            .modal-content {
                position: relative;
                background: white;
                border-radius: 12px;
                max-width: 600px;
                width: 90%;
                max-height: 80vh;
                overflow-y: auto;
                box-shadow: 0 20px 25px rgba(0, 0, 0, 0.1);
                transform: scale(0.9);
                transition: transform 0.3s ease;
            }
            
            .cookie-settings-modal.show .modal-content {
                transform: scale(1);
            }
            
            .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 1.5rem;
                border-bottom: 1px solid #e9ecef;
            }
            
            .modal-header h3 {
                margin: 0;
                color: #2c3e50;
            }
            
            .modal-close {
                background: none;
                border: none;
                font-size: 1.5rem;
                cursor: pointer;
                color: #6c757d;
                padding: 0.5rem;
                border-radius: 50%;
                transition: all 0.2s ease;
            }
            
            .modal-close:hover {
                background: #f8f9fa;
                color: #2c3e50;
            }
            
            .modal-body {
                padding: 1.5rem;
            }
            
            .cookie-category {
                margin-bottom: 1.5rem;
            }
            
            .category-header {
                display: flex;
                align-items: center;
                gap: 1rem;
            }
            
            .category-info h4 {
                margin: 0 0 0.5rem 0;
                color: #2c3e50;
            }
            
            .category-info p {
                margin: 0;
                color: #6c757d;
                font-size: 0.9rem;
            }
            
            .modal-footer {
                display: flex;
                justify-content: flex-end;
                gap: 1rem;
                padding: 1.5rem;
                border-top: 1px solid #e9ecef;
            }
            
            .switch {
                position: relative;
                display: inline-block;
                width: 50px;
                height: 24px;
            }
            
            .switch input {
                opacity: 0;
                width: 0;
                height: 0;
            }
            
            .slider {
                position: absolute;
                cursor: pointer;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: #ccc;
                transition: .4s;
                border-radius: 24px;
            }
            
            .slider:before {
                position: absolute;
                content: "";
                height: 18px;
                width: 18px;
                left: 3px;
                bottom: 3px;
                background-color: white;
                transition: .4s;
                border-radius: 50%;
            }
            
            input:checked + .slider {
                background-color: #007bff;
            }
            
            input:disabled + .slider {
                background-color: #28a745;
                cursor: not-allowed;
            }
            
            input:checked + .slider:before {
                transform: translateX(26px);
            }
        `;
        
        document.head.appendChild(styles);
    }
    
    getConsent() {
        try {
            return localStorage.getItem(this.consentKey);
        } catch (e) {
            return null;
        }
    }
    
    getPreferences() {
        try {
            const prefs = localStorage.getItem(this.preferencesKey);
            return prefs ? JSON.parse(prefs) : null;
        } catch (e) {
            return null;
        }
    }
    
    saveConsent(consent, preferences) {
        try {
            localStorage.setItem(this.consentKey, consent);
            localStorage.setItem(this.preferencesKey, JSON.stringify(preferences));
        } catch (e) {
            console.warn('Unable to save cookie preferences:', e);
        }
    }
    
    applyPreferences(preferences) {
        // Apply cookie preferences here
        // This is where you would enable/disable tracking scripts, etc.
        
        if (preferences.analytics) {
            // Enable analytics cookies
            this.enableAnalytics();
        } else {
            // Disable analytics cookies
            this.disableAnalytics();
        }
        
        if (preferences.marketing) {
            // Enable marketing cookies
            this.enableMarketing();
        } else {
            // Disable marketing cookies
            this.disableMarketing();
        }
        
        if (preferences.functional) {
            // Enable functional cookies
            this.enableFunctional();
        } else {
            // Disable functional cookies
            this.disableFunctional();
        }
        
        // Emit custom event for other scripts
        document.dispatchEvent(new CustomEvent('cookieConsentUpdate', {
            detail: preferences
        }));
    }
    
    enableAnalytics() {
        // Enable Google Analytics or other analytics
        console.log('Analytics cookies enabled');
    }
    
    disableAnalytics() {
        // Disable Google Analytics or other analytics
        console.log('Analytics cookies disabled');
    }
    
    enableMarketing() {
        // Enable marketing cookies
        console.log('Marketing cookies enabled');
    }
    
    disableMarketing() {
        // Disable marketing cookies
        console.log('Marketing cookies disabled');
    }
    
    enableFunctional() {
        // Enable functional cookies
        console.log('Functional cookies enabled');
    }
    
    disableFunctional() {
        // Disable functional cookies
        console.log('Functional cookies disabled');
    }
    
    showNotification(title, message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `cookie-notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <h4>${title}</h4>
                <p>${message}</p>
            </div>
            <button class="notification-close">&times;</button>
        `;
        
        // Add notification styles
        this.addNotificationStyles();
        
        document.body.appendChild(notification);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.classList.add('hide');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 5000);
        
        // Manual close
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.classList.add('hide');
            setTimeout(() => {
                notification.remove();
            }, 300);
        });
    }
    
    addNotificationStyles() {
        if (document.getElementById('cookie-notification-styles')) return;
        
        const styles = document.createElement('style');
        styles.id = 'cookie-notification-styles';
        styles.textContent = `
            .cookie-notification {
                position: fixed;
                top: 20px;
                right: 20px;
                background: white;
                border-radius: 8px;
                padding: 1rem;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                max-width: 300px;
                z-index: 10002;
                transform: translateX(100%);
                transition: transform 0.3s ease;
            }
            
            .cookie-notification.show {
                transform: translateX(0);
            }
            
            .cookie-notification.hide {
                transform: translateX(100%);
                opacity: 0;
            }
            
            .cookie-notification.success {
                border-left: 4px solid #28a745;
            }
            
            .cookie-notification.info {
                border-left: 4px solid #007bff;
            }
            
            .notification-content h4 {
                margin: 0 0 0.5rem 0;
                color: #2c3e50;
            }
            
            .notification-content p {
                margin: 0;
                color: #6c757d;
                font-size: 0.9rem;
            }
            
            .notification-close {
                position: absolute;
                top: 0.5rem;
                right: 0.5rem;
                background: none;
                border: none;
                font-size: 1.2rem;
                cursor: pointer;
                color: #6c757d;
                padding: 0.25rem;
            }
        `;
        
        document.head.appendChild(styles);
    }
    
    handleConsentUpdate(preferences) {
        // Handle consent updates from other parts of the application
        console.log('Cookie consent updated:', preferences);
    }
}

// Initialize cookie consent
document.addEventListener('DOMContentLoaded', function() {
    new CookieConsent();
});
