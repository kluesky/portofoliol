// Configuration
const CONFIG = {
    API_BASE_URL: 'https://tikwm.com/api/',
    PARTICLE_COUNT: 30,
    LOADING_TIMEOUT: 30000 // 30 seconds
};

// Utility Functions
const Utils = {
    // Generate random filename
    generateRandomFilename(ext = '.mp4') {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let name = '';
        for (let i = 0; i < 6; i++) {
            name += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return `chisato-${name}${ext}`;
    },

    // Validate TikTok URL
    isValidTikTokUrl(url) {
        return url.includes('tiktok.com') && url.trim().length > 0;
    },

    // Show notification
    showNotification(icon, title, text) {
        Swal.fire({
            icon,
            title,
            text,
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            background: '#1f2937',
            color: '#fff'
        });
    },

    // Create loading element
    createLoadingElement(color = 'cyan') {
        const colors = {
            cyan: 'border-cyan-500 text-cyan-300',
            pink: 'border-pink-500 text-pink-300',
            yellow: 'border-yellow-500 text-yellow-300'
        };

        return `
            <div class="bg-${color}-900/20 border ${colors[color]} rounded-lg p-4 animate-pulse flex items-center justify-center">
                <svg class="animate-spin h-6 w-6 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Memproses...
            </div>
        `;
    },

    // Create success element
    createSuccessElement(message, color = 'cyan') {
        const colors = {
            cyan: 'border-cyan-500 bg-cyan-900/20 text-cyan-300',
            pink: 'border-pink-500 bg-pink-900/20 text-pink-300',
            yellow: 'border-yellow-500 bg-yellow-900/20 text-yellow-300'
        };

        return `
            <div class="${colors[color]} rounded-xl p-4 animate__animated animate__fadeIn">
                <div class="flex items-center text-${color}-400">
                    <svg class="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                    ${message}
                </div>
            </div>
        `;
    },

    // Create error element
    createErrorElement(message) {
        return `
            <div class="bg-red-900/30 border border-red-500 rounded-lg p-4 text-red-400 animate__animated animate__headShake">
                <svg class="w-5 h-5 inline mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="15" y1="9" x2="9" y2="15"></line>
                    <line x1="9" y1="9" x2="15" y2="15"></line>
                </svg>
                ${message}
            </div>
        `;
    }
};

// Particle System
class ParticleSystem {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.particles = [];
    }

    createParticles() {
        for (let i = 0; i < CONFIG.PARTICLE_COUNT; i++) {
            this.createParticle();
        }
    }

    createParticle() {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random properties
        const size = Math.random() * 2 + 1;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        const opacity = Math.random() * 0.5 + 0.1;

        // Apply styles
        Object.assign(particle.style, {
            width: `${size}px`,
            height: `${size}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `float ${duration}s ease-in-out ${delay}s infinite`,
            opacity: opacity
        });

        this.container.appendChild(particle);
        this.particles.push(particle);
    }

    destroy() {
        this.particles.forEach(particle => particle.remove());
        this.particles = [];
    }
}

// API Service
class TikTokApiService {
    static async fetchData(url, type = 'video') {
        try {
            const apiUrl = `${CONFIG.API_BASE_URL}?url=${encodeURIComponent(url)}&hd=1`;
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), CONFIG.LOADING_TIMEOUT);

            const response = await fetch(apiUrl, {
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            
            if (data.code !== 0) {
                throw new Error(data.msg || 'Failed to fetch data from API');
            }

            return data.data;
        } catch (error) {
            if (error.name === 'AbortError') {
                throw new Error('Request timeout. Please try again.');
            }
            throw new Error(`Failed to fetch ${type}: ${error.message}`);
        }
    }
}

// Download Manager
class DownloadManager {
    static async downloadBlob(url, filename) {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Network response was not ok');
            
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
            
            return blobUrl;
        } catch (error) {
            throw new Error(`Download failed: ${error.message}`);
        }
    }
}

// Main Application
class TikTokDownloaderApp {
    constructor() {
        this.particleSystem = new ParticleSystem('particles-js');
        this.init();
    }

    init() {
        this.initializeParticles();
        this.setupEventListeners();
        this.checkFirstVisit();
    }

    initializeParticles() {
        this.particleSystem.createParticles();
    }

    setupEventListeners() {
        // Enter key support for inputs
        ['tiktokUrl', 'slideUrl', 'mp3Url'].forEach(id => {
            const input = document.getElementById(id);
            if (input) {
                input.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') {
                        this.handleEnterKey(id);
                    }
                });
            }
        });

        // Add input validation
        this.setupInputValidation();
    }

    setupInputValidation() {
        const inputs = document.querySelectorAll('input[type="text"]');
        inputs.forEach(input => {
            input.addEventListener('input', (e) => {
                if (e.target.value.includes('tiktok.com')) {
                    e.target.classList.add('border-green-400');
                } else {
                    e.target.classList.remove('border-green-400');
                }
            });
        });
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

    checkFirstVisit() {
        const hasVisited = localStorage.getItem('chisato_visited');
        if (!hasVisited) {
            localStorage.setItem('chisato_visited', 'true');
            // Welcome modal is shown by default in HTML
        }
    }

    // Clipboard functionality
    async pasteFromClipboard(inputId) {
        try {
            const text = await navigator.clipboard.readText();
            const input = document.getElementById(inputId);
            
            if (input) {
                input.value = text;
                input.focus();
                
                // Validate and show feedback
                if (Utils.isValidTikTokUrl(text)) {
                    Utils.showNotification('success', 'Link berhasil ditempel!', 'Tekan tombol download untuk melanjutkan');
                    input.classList.add('border-green-400');
                } else {
                    input.classList.add('border-red-400');
                }
            }
        } catch (err) {
            console.error('Failed to read clipboard contents: ', err);
            Utils.showNotification('error', 'Gagal menempel link', 'Anda perlu memberikan izin akses clipboard');
        }
    }

    // Download methods
    async downloadVideo() {
        const url = document.getElementById('tiktokUrl').value.trim();
        const resultBox = document.getElementById('result');
        
        if (!Utils.isValidTikTokUrl(url)) {
            resultBox.innerHTML = Utils.createErrorElement('⚠️ Link TikTok tidak valid');
            return;
        }

        resultBox.innerHTML = Utils.createLoadingElement('cyan');

        try {
            const data = await TikTokApiService.fetchData(url, 'video');
            
            if (!data?.play) {
                throw new Error('Video tidak ditemukan');
            }

            const blobUrl = await DownloadManager.downloadBlob(
                data.play, 
                Utils.generateRandomFilename('.mp4')
            );

            const caption = data.title || 'Tidak ada caption';
            const username = data.author?.unique_id || 'Tidak diketahui';

            resultBox.innerHTML = `
                <div class="bg-cyan-900/20 border border-cyan-500 rounded-xl p-4 mt-4 animate__animated animate__fadeIn">
                    <video controls autoplay muted class="w-full rounded-lg shadow-xl border border-cyan-300/50 mb-4 max-h-64 md:max-h-96">
                        <source src="${blobUrl}" type="video/mp4">
                        Browser Anda tidak mendukung pemutar video.
                    </video>
                    <div class="text-left space-y-2">
                        <p class="text-sm text-cyan-200"><span class="font-semibold">📄 Caption:</span> ${caption}</p>
                        <p class="text-sm text-yellow-200"><span class="font-semibold">👤 Creator:</span> @${username}</p>
                        ${Utils.createSuccessElement('Video berhasil diunduh!', 'cyan')}
                    </div>
                </div>
            `;

        } catch (error) {
            resultBox.innerHTML = Utils.createErrorElement(error.message);
        }
    }

    async downloadSlide() {
        const url = document.getElementById('slideUrl').value.trim();
        const resultBox = document.getElementById('slideResult');
        
        if (!Utils.isValidTikTokUrl(url)) {
            resultBox.innerHTML = Utils.createErrorElement('⚠️ Link TikTok tidak valid');
            return;
        }

        resultBox.innerHTML = Utils.createLoadingElement('pink');

        try {
            const data = await TikTokApiService.fetchData(url, 'slide');
            
            if (!data?.images || data.images.length === 0) {
                throw new Error('Slide tidak ditemukan');
            }

            resultBox.innerHTML = `
                <div class="bg-pink-900/20 border border-pink-500 rounded-xl p-4 mt-4 animate__animated animate__fadeIn">
                    <h3 class="text-pink-300 text-lg mb-4 flex items-center justify-center">
                        <svg class="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                            <circle cx="8.5" cy="8.5" r="1.5"></circle>
                            <polyline points="21 15 16 10 5 21"></polyline>
                        </svg>
                        ${data.images.length} Slide Ditemukan
                    </h3>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        ${data.images.map((img, i) => `
                            <div class="bg-gray-800/50 rounded-lg overflow-hidden border border-pink-400/30 transition-transform hover:scale-105">
                                <img 
                                    src="${img}" 
                                    alt="Slide ${i + 1}" 
                                    class="w-full h-48 object-cover mb-2"
                                    loading="lazy"
                                />
                                <a 
                                    href="${img}" 
                                    download="chisato-slide-${i + 1}.jpg" 
                                    class="block py-2 bg-pink-600 hover:bg-pink-500 text-center text-white rounded-b-lg transition flex items-center justify-center"
                                >
                                    <svg class="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                        <polyline points="7 10 12 15 17 10"></polyline>
                                        <line x1="12" y1="15" x2="12" y2="3"></line>
                                    </svg>
                                    Download Slide ${i + 1}
                                </a>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;

        } catch (error) {
            resultBox.innerHTML = Utils.createErrorElement(error.message);
        }
    }

    async downloadMP3() {
        const url = document.getElementById('mp3Url').value.trim();
        const resultBox = document.getElementById('mp3Result');
        
        if (!Utils.isValidTikTokUrl(url)) {
            resultBox.innerHTML = Utils.createErrorElement('⚠️ Link TikTok tidak valid');
            return;
        }

        resultBox.innerHTML = Utils.createLoadingElement('yellow');

        try {
            const data = await TikTokApiService.fetchData(url, 'audio');
            
            if (!data?.music) {
                throw new Error('Audio tidak ditemukan');
            }

            const blobUrl = await DownloadManager.downloadBlob(
                data.music,
                Utils.generateRandomFilename('.mp3')
            );

            resultBox.innerHTML = `
                <div class="bg-yellow-900/20 border border-yellow-500 rounded-xl p-4 mt-4 animate__animated animate__fadeIn">
                    <div class="flex items-center justify-center mb-4">
                        <audio controls class="w-full max-w-md">
                            <source src="${blobUrl}" type="audio/mpeg">
                            Browser Anda tidak mendukung pemutar audio.
                        </audio>
                    </div>
                    ${Utils.createSuccessElement('MP3 berhasil diunduh!', 'yellow')}
                </div>
            `;

        } catch (error) {
            resultBox.innerHTML = Utils.createErrorElement(error.message);
        }
    }
}

// Global functions for HTML onclick attributes
function closeWelcomeModal() {
    const modal = document.getElementById('welcomeModal');
    if (modal) {
        modal.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => modal.remove(), 300);
    }
}

function pasteFromClipboard(inputId) {
    app.pasteFromClipboard(inputId);
}

function downloadVideo() {
    app.downloadVideo();
}

function downloadSlide() {
    app.downloadSlide();
}

function downloadMP3() {
    app.downloadMP3();
}

// Initialize application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new TikTokDownloaderApp();
});

// Add fadeOut animation for modal
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from { opacity: 1; transform: scale(1); }
        to { opacity: 0; transform: scale(0.9); }
    }
`;
document.head.appendChild(style);