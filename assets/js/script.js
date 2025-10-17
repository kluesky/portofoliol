 // Modern TikTok Downloader with Fixed Paste Function
class ModernTikTokDownloader {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initializeStats();
    }

    setupEventListeners() {
        // Enter key support
        ['tiktokUrl', 'slideUrl', 'mp3Url'].forEach(id => {
            const input = document.getElementById(id);
            if (input) {
                input.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') {
                        this.handleEnterKey(id);
                    }
                });

                // Add input validation styling
                input.addEventListener('input', (e) => {
                    this.validateInput(e.target);
                });
            }
        });

        // Add click event for paste buttons (fallback)
        document.querySelectorAll('.modern-paste-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const inputId = e.target.closest('.input-container')
                    .querySelector('input').id;
                this.pasteFromClipboard(inputId);
            });
        });
    }

    validateInput(input) {
        if (input.value.includes('tiktok.com')) {
            input.style.borderColor = '#10b981';
        } else {
            input.style.borderColor = '#e5e7eb';
        }
    }

    handleEnterKey(inputId) {
        switch (inputId) {
            case 'tiktokUrl':
                this.downloadVideo();
                break;
            case 'slideUrl':
                this.downloadSlide();
                break;
            case 'mp3Url':
                this.downloadMP3();
                break;
        }
    }

    initializeStats() {
        // Update stats every 5 seconds
        setInterval(() => {
            this.updateLiveStats();
        }, 5000);
        this.updateLiveStats();
    }

    updateLiveStats() {
        const downloadCount = document.getElementById('downloadCount');
        const successRate = document.getElementById('successRate');
        const avgTime = document.getElementById('avgTime');

        if (downloadCount) {
            const current = parseInt(downloadCount.textContent) || 10000;
            downloadCount.textContent = (current + Math.floor(Math.random() * 3)) + '+';
        }

        if (successRate) {
            const rates = ['99.7%', '99.8%', '99.9%', '99.8%'];
            successRate.textContent = rates[Math.floor(Math.random() * rates.length)];
        }

        if (avgTime) {
            const times = ['1.1s', '1.2s', '1.3s', '1.2s'];
            avgTime.textContent = times[Math.floor(Math.random() * times.length)];
        }
    }

    // FIXED: Paste function with better error handling
    async pasteFromClipboard(inputId) {
        const input = document.getElementById(inputId);
        if (!input) return;

        try {
            // Method 1: Modern clipboard API (requires HTTPS)
            const text = await navigator.clipboard.readText();
            input.value = text;
            this.validateInput(input);
            this.showNotification('success', 'Link berhasil ditempel!', 'Tekan download untuk melanjutkan');
            
        } catch (err) {
            console.log('Modern clipboard failed, trying fallback:', err);
            
            // Method 2: Fallback using execCommand (deprecated but works)
            try {
                input.focus();
                const result = document.execCommand('paste');
                if (result) {
                    this.validateInput(input);
                    this.showNotification('success', 'Link berhasil ditempel!', 'Tekan download untuk melanjutkan');
                } else {
                    this.showFallbackPaste(input);
                }
            } catch (fallbackErr) {
                console.log('Fallback also failed:', fallbackErr);
                this.showFallbackPaste(input);
            }
        }
    }

    showFallbackPaste(input) {
        // Method 3: Manual paste prompt
        const pastedText = prompt('Silakan tempel link TikTok di sini:');
        if (pastedText) {
            input.value = pastedText;
            this.validateInput(input);
            this.showNotification('success', 'Link berhasil ditempel!', 'Tekan download untuk melanjutkan');
        }
    }

    showNotification(icon, title, text) {
        Swal.fire({
            icon: icon,
            title: title,
            text: text,
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            background: '#f8fafc',
            color: '#1f2937'
        });
    }

    // Utility functions
    generateRandomFilename(ext = '.mp4') {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let name = '';
        for (let i = 0; i < 6; i++) {
            name += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return `chisato-${name}${ext}`;
    }

    isValidTikTokUrl(url) {
        return url.includes('tiktok.com') && url.trim().length > 0;
    }

    showLoading(element) {
        element.innerHTML = `
            <div class="loading-state">
                <div class="loading-spinner"></div>
                <span>Memproses...</span>
            </div>
        `;
    }

    showSuccess(message, details = '') {
        return `
            <div class="success-message">
                <div class="success-header">
                    <span class="success-icon">✅</span>
                    <span class="success-title">Download Berhasil!</span>
                </div>
                ${details ? `<div class="success-details">${details}</div>` : ''}
                <div class="success-message-text">${message}</div>
            </div>
        `;
    }

    showError(message) {
        return `
            <div class="error-message">
                <div class="error-header">
                    <span class="error-icon">❌</span>
                    <span class="error-title">Gagal</span>
                </div>
                <div class="error-message-text">${message}</div>
            </div>
        `;
    }

    // Download methods
    async downloadVideo() {
        const url = document.getElementById('tiktokUrl').value.trim();
        const resultBox = document.getElementById('result');
        
        if (!this.isValidTikTokUrl(url)) {
            resultBox.innerHTML = this.showError('⚠️ Masukkan link TikTok yang valid');
            return;
        }

        this.showLoading(resultBox);

        try {
            const data = await this.fetchTikTokData(url);
            
            if (!data?.play) {
                throw new Error('Video tidak ditemukan');
            }

            await this.downloadFile(data.play, this.generateRandomFilename('.mp4'));

            const caption = data.title || 'Tidak ada caption';
            const username = data.author?.unique_id || 'Tidak diketahui';

            resultBox.innerHTML = this.showSuccess(
                'Video berhasil diunduh!',
                `📝 ${caption}<br>👤 @${username}`
            );

        } catch (error) {
            resultBox.innerHTML = this.showError(`Gagal: ${error.message}`);
        }
    }

    async downloadSlide() {
        const url = document.getElementById('slideUrl').value.trim();
        const resultBox = document.getElementById('slideResult');
        
        if (!this.isValidTikTokUrl(url)) {
            resultBox.innerHTML = this.showError('⚠️ Masukkan link TikTok yang valid');
            return;
        }

        this.showLoading(resultBox);

        try {
            const data = await this.fetchTikTokData(url);
            
            if (!data?.images || data.images.length === 0) {
                throw new Error('Slide tidak ditemukan');
            }

            resultBox.innerHTML = `
                <div class="success-message">
                    <div class="success-header">
                        <span class="success-icon">🖼️</span>
                        <span class="success-title">${data.images.length} Slide Ditemukan</span>
                    </div>
                    <div class="slides-grid">
                        ${data.images.map((img, i) => `
                            <a href="${img}" download="chisato-slide-${i + 1}.jpg" 
                               class="slide-download-link">
                                📥 Download Slide ${i + 1}
                            </a>
                        `).join('')}
                    </div>
                </div>
            `;

        } catch (error) {
            resultBox.innerHTML = this.showError(`Gagal: ${error.message}`);
        }
    }

    async downloadMP3() {
        const url = document.getElementById('mp3Url').value.trim();
        const resultBox = document.getElementById('mp3Result');
        
        if (!this.isValidTikTokUrl(url)) {
            resultBox.innerHTML = this.showError('⚠️ Masukkan link TikTok yang valid');
            return;
        }

        this.showLoading(resultBox);

        try {
            const data = await this.fetchTikTokData(url);
            
            if (!data?.music) {
                throw new Error('Audio tidak ditemukan');
            }

            await this.downloadFile(data.music, this.generateRandomFilename('.mp3'));

            resultBox.innerHTML = this.showSuccess('🎵 MP3 berhasil diunduh!');

        } catch (error) {
            resultBox.innerHTML = this.showError(`Gagal: ${error.message}`);
        }
    }

    // API call
    async fetchTikTokData(url) {
        try {
            const response = await fetch(`https://tikwm.com/api/?url=${encodeURIComponent(url)}&hd=1`);
            
            if (!response.ok) {
                throw new Error('Gagal mengambil data dari server');
            }

            const data = await response.json();
            
            if (data.code !== 0) {
                throw new Error(data.msg || 'Terjadi kesalahan');
            }

            return data.data;
        } catch (error) {
            throw new Error('Tidak dapat terhubung ke server. Coba lagi nanti.');
        }
    }

    // Download helper
    async downloadFile(url, filename) {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Gagal mengunduh file');
            
            const blob = await response.blob();
            const blobUrl = URL.createObjectURL(blob);
            
            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            // Clean up
            setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
        } catch (error) {
            throw new Error('Gagal mengunduh file: ' + error.message);
        }
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new ModernTikTokDownloader();
    console.log('Chisato TikTok Downloader initialized!');
});

// Global functions for HTML onclick attributes
function pasteFromClipboard(inputId) {
    if (window.app) {
        window.app.pasteFromClipboard(inputId);
    } else {
        console.error('App not initialized');
    }
}

function downloadVideo() {
    if (window.app) {
        window.app.downloadVideo();
    } else {
        console.error('App not initialized');
    }
}

function downloadSlide() {
    if (window.app) {
        window.app.downloadSlide();
    } else {
        console.error('App not initialized');
    }
}

function downloadMP3() {
    if (window.app) {
        window.app.downloadMP3();
    } else {
        console.error('App not initialized');
    }
}

// Add error handling for global functions
window.addEventListener('error', (e) => {
    console.error('Global error:', e.error);
});
