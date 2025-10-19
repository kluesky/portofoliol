[file name]: cekerip.js
[file content begin]
// Simple Key Generator tanpa limit
class SimpleKeyGenerator {
    constructor() {
        this.currentKey = null;
        this.isCooldown = false;
        this.cooldown = 10000; // 10 detik
        
        this.init();
    }
    
    init() {
        console.log('🚀 SimpleKeyGenerator initialized');
        
        // Get elements
        this.elements = {
            keyDisplay: document.getElementById('keyDisplay'),
            copyBtn: document.getElementById('copyBtn'),
            generateBtn: document.getElementById('generateBtn'),
            clearBtn: document.getElementById('clearBtn'),
            status: document.getElementById('status'),
            timerWrapper: document.getElementById('timerWrapper'),
            countdown: document.getElementById('countdown'),
            usageCounter: document.getElementById('usageCounter')
        };
        
        // Load saved data
        this.loadData();
        
        // Setup event listeners
        this.setupEvents();
        
        // Update display
        this.updateDisplay();
        
        console.log('✅ Generator ready - Unlimited mode');
    }
    
    setupEvents() {
        // Generate button
        this.elements.generateBtn.addEventListener('click', () => {
            console.log('🎯 Generate clicked');
            this.handleGenerate();
        });
        
        // Clear button
        this.elements.clearBtn.addEventListener('click', () => {
            console.log('🗑️ Clear clicked');
            this.handleClear();
        });
        
        // Copy button
        this.elements.copyBtn.addEventListener('click', () => {
            console.log('📋 Copy clicked');
            this.handleCopy();
        });
    }
    
    loadData() {
        try {
            // Load from localStorage
            const saved = localStorage.getItem('simpleKeyGenerator');
            if (saved) {
                const data = JSON.parse(saved);
                this.currentKey = data.currentKey || null;
                console.log('📂 Loaded data:', data);
            }
        } catch (error) {
            console.error('❌ Error loading data:', error);
        }
    }
    
    saveData() {
        try {
            const data = {
                currentKey: this.currentKey,
                lastUpdate: Date.now()
            };
            localStorage.setItem('simpleKeyGenerator', JSON.stringify(data));
            console.log('💾 Saved data:', data);
        } catch (error) {
            console.error('❌ Error saving data:', error);
        }
    }
    
    handleGenerate() {
        // Check cooldown
        if (this.isCooldown) {
            this.showStatus('Please wait for cooldown', 'error');
            return;
        }
        
        // Generate key
        this.generateKey();
        
        // Start cooldown
        this.startCooldown();
    }
    
    generateKey() {
        // Simple key format: KYL-XXXX-XXXX-XXXX
        const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
        let key = 'KYL-';
        
        for (let i = 0; i < 12; i++) {
            if (i > 0 && i % 4 === 0) key += '-';
            key += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        
        this.currentKey = key;
        
        console.log('🔑 Generated key:', key);
        
        this.saveData();
        this.updateDisplay();
        this.showStatus('Key generated successfully!', 'success');
    }
    
    startCooldown() {
        this.isCooldown = true;
        this.elements.generateBtn.disabled = true;
        this.elements.timerWrapper.classList.add('active');
        
        let timeLeft = 10;
        this.elements.countdown.textContent = timeLeft;
        
        const countdown = setInterval(() => {
            timeLeft--;
            this.elements.countdown.textContent = timeLeft;
            
            if (timeLeft <= 0) {
                clearInterval(countdown);
                this.isCooldown = false;
                this.elements.generateBtn.disabled = false;
                this.elements.timerWrapper.classList.remove('active');
                this.showStatus('Ready to generate key', 'success');
            }
        }, 1000);
    }
    
    handleClear() {
        this.currentKey = null;
        this.saveData();
        this.updateDisplay();
        this.showStatus('Key cleared', 'success');
    }
    
    handleCopy() {
        if (!this.currentKey) {
            this.showStatus('No key to copy', 'error');
            return;
        }
        
        navigator.clipboard.writeText(this.currentKey).then(() => {
            const originalIcon = this.elements.copyBtn.innerHTML;
            this.elements.copyBtn.innerHTML = '<i class="fas fa-check"></i>';
            this.elements.copyBtn.classList.add('copied');
            this.showStatus('Key copied to clipboard', 'success');
            
            setTimeout(() => {
                this.elements.copyBtn.innerHTML = originalIcon;
                this.elements.copyBtn.classList.remove('copied');
            }, 2000);
        }).catch(() => {
            this.showStatus('Failed to copy key', 'error');
        });
    }
    
    updateDisplay() {
        // Update key display
        if (this.currentKey) {
            this.elements.keyDisplay.textContent = this.currentKey;
            this.elements.keyDisplay.classList.add('has-key');
            this.elements.copyBtn.disabled = false;
        } else {
            this.elements.keyDisplay.innerHTML = '<span class="key-placeholder"><i class="fas fa-key"></i>Your key will appear here</span>';
            this.elements.keyDisplay.classList.remove('has-key');
            this.elements.copyBtn.disabled = true;
        }
        
        // Update usage counter to show unlimited
        this.elements.usageCounter.textContent = '∞';
        this.elements.generateBtn.innerHTML = '<i class="fas fa-bolt"></i> Generate Key';
    }
    
    showStatus(message, type = '') {
        const statusElement = this.elements.status;
        const statusText = statusElement.querySelector('.status-text') || statusElement;
        
        statusText.textContent = message;
        statusElement.className = 'status-message';
        
        if (type === 'success') {
            statusElement.classList.add('success');
        } else if (type === 'error') {
            statusElement.classList.add('error');
        } else if (type === 'warning') {
            statusElement.classList.add('warning');
        }
        
        // Auto clear success messages after 3 seconds
        if (type === 'success') {
            setTimeout(() => {
                if (statusText.textContent === message) {
                    statusText.textContent = 'Ready to generate access key';
                    statusElement.className = 'status-message';
                }
            }, 3000);
        }
    }
}

// Initialize when page loads
console.log('🔄 Page loading...');
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ DOM loaded, starting generator...');
    window.keyGenerator = new SimpleKeyGenerator();
});

// Validation function for downloader
function validateKey(key) {
    try {
        const saved = localStorage.getItem('simpleKeyGenerator');
        if (!saved) return false;
        
        const data = JSON.parse(saved);
        const isValid = data.currentKey === key;
        
        if (isValid) {
            // Remove the used key
            data.currentKey = null;
            localStorage.setItem('simpleKeyGenerator', JSON.stringify(data));
        }
        
        return isValid;
    } catch (error) {
        console.error('Validation error:', error);
        return false;
    }
}
[file content end]
