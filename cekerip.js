// Simple Key Generator dengan anti-spam
class SimpleKeyGenerator {
    constructor() {
        this.currentKey = null;
        this.generateCount = 0;
        this.maxGenerates = 6;
        this.cooldown = 10000; // 10 detik
        this.isCooldown = false;
        
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
            timer: document.getElementById('timer'),
            countdown: document.getElementById('countdown')
        };
        
        // Load saved data
        this.loadData();
        
        // Setup event listeners
        this.setupEvents();
        
        // Update display
        this.updateDisplay();
        
        console.log('✅ Generator ready');
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
                this.generateCount = data.generateCount || 0;
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
                generateCount: this.generateCount,
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
        
        // Check max generates
        if (this.generateCount >= this.maxGenerates) {
            this.showStatus('Maximum generates reached!', 'error');
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
        this.generateCount++;
        
        console.log('🔑 Generated key:', key);
        console.log('📊 Generate count:', this.generateCount);
        
        this.saveData();
        this.updateDisplay();
        this.showStatus('Key generated successfully!', 'success');
    }
    
    startCooldown() {
        this.isCooldown = true;
        this.elements.generateBtn.disabled = true;
        this.elements.timer.style.display = 'block';
        
        let timeLeft = 10;
        
        const countdown = setInterval(() => {
            this.elements.countdown.textContent = timeLeft;
            timeLeft--;
            
            if (timeLeft < 0) {
                clearInterval(countdown);
                this.isCooldown = false;
                this.elements.generateBtn.disabled = false;
                this.elements.timer.style.display = 'none';
                this.showStatus('Ready to generate again', 'success');
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
            this.elements.copyBtn.textContent = 'Copied!';
            this.elements.copyBtn.classList.add('copied');
            this.showStatus('Key copied to clipboard', 'success');
            
            setTimeout(() => {
                this.elements.copyBtn.textContent = 'Copy';
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
            this.elements.keyDisplay.innerHTML = '<span class="placeholder">Click generate to create key</span>';
            this.elements.keyDisplay.classList.remove('has-key');
            this.elements.copyBtn.disabled = true;
        }
        
        // Update generate button
        const remaining = this.maxGenerates - this.generateCount;
        this.elements.generateBtn.textContent = `Generate Key (${remaining} left)`;
        
        if (remaining <= 0) {
            this.elements.generateBtn.disabled = true;
        }
    }
    
    showStatus(message, type = '') {
        this.elements.status.textContent = message;
        this.elements.status.className = 'status';
        
        if (type === 'success') {
            this.elements.status.classList.add('success');
        } else if (type === 'error') {
            this.elements.status.classList.add('error');
        }
        
        // Auto clear success messages
        if (type === 'success') {
            setTimeout(() => {
                const remaining = this.maxGenerates - this.generateCount;
                this.elements.status.textContent = `Ready - ${remaining} generates left`;
                this.elements.status.className = 'status';
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