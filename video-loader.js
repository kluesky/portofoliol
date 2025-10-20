// Video Preview Loader dengan YouTube
class VideoPreviewLoader {
    constructor() {
        this.resources = [
            {
                category: "Game Scripts",
                icon: "fas fa-code",
                color: "bg-blue-500",
                items: [
                    {
                        name: "Part Controller",
                        size: null,
                        icon: "fas fa-file-code",
                        downloadUrl: "https://pastebin.com/EkgeH8Qz",
                        youtubeId: "ZrX1drrJ2eA" // Ganti dengan ID YouTube Anda
                    },
                    {
                        name: "Teleport Premium ( Detect Mod/Admin )", 
                        size: null,
                        icon: "fas fa-file-code",
                        downloadUrl: "https://pastebin.com/xT28Eaa4",
                        youtubeId: "g6anXeKrg70" // Ganti dengan ID YouTube Anda
                    },
                    {
                        name: "Arsenal AUTO TP + AIMBOT ( Y All Get Key Manually 😁 )", 
                        size: null,
                        icon: "fas fa-file-code",
                        downloadUrl: "https://pastebin.com/qM5uJBqx",
                        youtubeId: "Y-JpyHarAHc" // Ganti dengan ID YouTube Anda
                    },
                    {
                        name: "SC Spade Troll Universal ( Y All Get Key Manually 😁 )", 
                        size: null,
                        icon: "fas fa-file-code",
                        downloadUrl: "https://pastebin.com/d0pSGSD1",
                        youtubeId: "2gF87jvGIJE" // Ganti dengan ID YouTube Anda
                    }
                ]
            },
            {
                category: "Cheat Tools",
                icon: "fas fa-tools", 
                color: "bg-red-500",
                items: [
                    {
                        name: "Codex Executor ( Love By Admin )",
                        meta: "Android",
                        icon: "fas fa-cog",
                        downloadUrl: "https://codex.lol/android",
                        youtubeId: "aajh5j7qfbM" // Ganti dengan ID YouTube Anda
                    },
                    {
                        name: "Hydrogen Executor",
                        meta: "PC ONLY",
                        icon: "fas fa-cog",
                        downloadUrl: "https://hydrogen.lat/",
                        youtubeId: "f7IFfY-oiT4" // Ganti dengan ID YouTube Anda
                    },
                    {
                        name: "Xeno Executor",
                        meta: "PC ONLY",
                        icon: "fas fa-cog",
                        downloadUrl: "https://rscripts.wiki/xeno-executor-v1-2-80/#google_vignette",
                        youtubeId: "d6oR9GIPuBA" // Ganti dengan ID YouTube Anda
                    }
                ]
            },
            {
                category: "Other Games",
                icon: "fas fa-cube",
                color: "bg-purple-500", 
                items: [
                    {
                        name: "Free Fire",
                        meta: "Mobile",
                        icon: "fas fa-image",
                        downloadUrl: "https://gringoxp.site/dashboard",
                        youtubeId: "i0duks9_fRs" // Ganti dengan ID YouTube Anda
                    },
                    {
                        name: "Call Of Duty ( XIN MOD 80% SAFE )",
                        meta: "Mobile Root & No Root",
                        icon: "fas fa-music", 
                        downloadUrl: "https://t.me/NotYourAverageXinn",
                        youtubeId: "CeMVmUe0E5I" // Ganti dengan ID YouTube Anda
                    }
                ]
            }
        ];
    }

    init() {
        this.renderResources();
        this.setupYouTubePlayers();
    }

    renderResources() {
        const grid = document.getElementById('downloadGrid');
        if (!grid) return;
        
        grid.innerHTML = '';

        this.resources.forEach(category => {
            const categoryCard = this.createCategoryCard(category);
            grid.appendChild(categoryCard);
        });
    }

    createCategoryCard(category) {
        const card = document.createElement('div');
        card.className = 'category-card';
        
        card.innerHTML = `
            <div class="category-header">
                <div class="category-icon ${category.color}">
                    <i class="${category.icon}"></i>
                </div>
                <h3 class="category-title">${category.category}</h3>
            </div>
            <div class="download-list">
                ${category.items.map(item => this.createDownloadItem(item)).join('')}
            </div>
        `;

        return card;
    }

    createDownloadItem(item) {
        return `
            <div class="download-item">
                <div class="file-info">
                    <i class="${item.icon} file-icon"></i>
                    <div>
                        <p class="file-name">${item.name}</p>
                        ${item.size ? `<p class="file-size">${item.size}</p>` : ''}
                        ${item.meta ? `<p class="file-meta">${item.meta}</p>` : ''}
                    </div>
                </div>
                <a href="${item.downloadUrl}" class="download-link" target="_blank">
                    <i class="fas fa-download"></i>
                </a>
            </div>
            
            <!-- YouTube Preview -->
            <div class="video-preview">
                <div class="video-header">
                    <i class="fab fa-youtube mr-2"></i>
                    <span>Watch Preview</span>
                </div>
                <div class="youtube-placeholder" data-youtube-id="${item.youtubeId}">
                    <div class="youtube-thumbnail">
                        <img src="https://img.youtube.com/vi/${item.youtubeId}/hqdefault.jpg" 
                             alt="${item.name} Preview" 
                             class="thumbnail-image"
                             loading="lazy">
                        <div class="play-button">
                            <i class="fas fa-play"></i>
                        </div>
                    </div>
                    <p class="video-note">Click to watch demo video</p>
                </div>
                <div class="youtube-player">
                    <!-- YouTube iframe akan dimuat di sini ketika diklik -->
                </div>
            </div>
        `;
    }

    setupYouTubePlayers() {
        document.querySelectorAll('.youtube-placeholder').forEach(placeholder => {
            placeholder.addEventListener('click', (e) => {
                const youtubeId = placeholder.getAttribute('data-youtube-id');
                const videoPreview = placeholder.closest('.video-preview');
                const youtubePlayer = videoPreview.querySelector('.youtube-player');
                
                // Sembunyikan placeholder
                placeholder.style.display = 'none';
                
                // Buat iframe YouTube
                youtubePlayer.innerHTML = `
                    <iframe 
                        width="100%" 
                        height="200" 
                        src="https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0" 
                        frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen
                        loading="lazy">
                    </iframe>
                `;
                
                // Tampilkan player
                youtubePlayer.style.display = 'block';
            });
        });
    }
}

// Initialize ketika DOM ready
document.addEventListener('DOMContentLoaded', function() {
    // Tunggu sebentar untuk memastikan DOM sudah fully loaded
    setTimeout(() => {
        const videoLoader = new VideoPreviewLoader();
        videoLoader.init();
    }, 100);
});

// Juga initialize ketika showContent dipanggil (setelah login)
if (typeof showContent !== 'undefined') {
    const originalShowContent = showContent;
    window.showContent = function() {
        originalShowContent();
        
        // Tunggu sampai konten download ditampilkan
        setTimeout(() => {
            const videoLoader = new VideoPreviewLoader();
            videoLoader.init();
        }, 500);
    };
}

// Fallback jika showContent tidak ada
else {
    window.showContent = function() {
        document.getElementById('accessSection').style.display = 'none';
        document.getElementById('downloadContent').style.display = 'block';
        
        setTimeout(() => {
            const videoLoader = new VideoPreviewLoader();
            videoLoader.init();
        }, 500);
    };
}
