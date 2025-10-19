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
                        downloadUrl: "https://pastebin.com/m7MXkZtL",
                        youtubeId: "ZrX1drrJ2eA" // Ganti dengan ID YouTube Anda
                    },
                    {
                        name: "Teleport Premium ( Detect Mod/Admin )", 
                        size: null,
                        icon: "fas fa-file-code",
                        downloadUrl: "https://pastebin.com/S4aK3z6k",
                        youtubeId: "g6anXeKrg70" // Ganti dengan ID YouTube Anda
                    }
                ]
            },
            {
                category: "Cheat Tools",
                icon: "fas fa-tools", 
                color: "bg-red-500",
                items: [
                    {
                        name: "Speed Hack Pro",
                        meta: "Windows Compatible",
                        icon: "fas fa-cog",
                        downloadUrl: "https://www.mediafire.com/file/p4425ph18g8d7xq/[+BASE+TREDIC+].zip/file",
                        youtubeId: "dQw4w9WgXcQ" // Ganti dengan ID YouTube Anda
                    },
                    {
                        name: "Resource Editor",
                        meta: "Multi-Game Support", 
                        icon: "fas fa-cog",
                        downloadUrl: "https://www.mediafire.com/file/k86smicuzfp3dfd/JUSTIN+V20+NO+ENC(KHUSUS+OWNER).zip/file",
                        youtubeId: "dQw4w9WgXcQ" // Ganti dengan ID YouTube Anda
                    }
                ]
            },
            {
                category: "Game Assets",
                icon: "fas fa-cube",
                color: "bg-purple-500", 
                items: [
                    {
                        name: "Texture Pack HD",
                        meta: "4K Resolution",
                        icon: "fas fa-image",
                        downloadUrl: "https://drive.google.com/file/d/1MD8VXyHfLI8GPCdGv7l32kf3IZPx3uGj/view?usp=drivesdk",
                        youtubeId: "dQw4w9WgXcQ" // Ganti dengan ID YouTube Anda
                    },
                    {
                        name: "Sound Effects Pack",
                        meta: "300+ Files",
                        icon: "fas fa-music", 
                        downloadUrl: "https://drive.google.com/file/d/1MG1MZzdLruh8SZlPYQWNIP3nBV_fgY5V/view?usp=drivesdk",
                        youtubeId: "dQw4w9WgXcQ" // Ganti dengan ID YouTube Anda
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
