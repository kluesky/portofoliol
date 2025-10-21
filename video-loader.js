jclass VideoPreviewLoader {
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
                        downloadUrl: "https://pastebin.com/iRyQ6mZx",
                        youtubeId: "ZrX1drrJ2eA",
                        description: "If you want the unanchored part to stick to your body, please just use a toggle ring.",
                        previewImage: "https://files.catbox.moe/7vx28b.jpg" // Ganti dengan URL gambar hosting Anda
                    },
                    {
                        name: "Teleport Premium ( Detect Mod/Admin )", 
                        size: null,
                        icon: "fas fa-file-code",
                        downloadUrl: "https://pastebin.com/xT28Eaa4",
                        youtubeId: "g6anXeKrg70",
                        description: "This premium teleport lets you quickly move around while automatically detecting mods and admins nearby for added safety and control.",
                        previewImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSC43Wcf2SIR1Vdr35kOqKK-1UHCzXemmbxA-qD8O9FM499s48fJaiXFX3Y&s=10" // Ganti dengan URL gambar hosting Anda
                    },
                    {
                        name: "Arsenal AUTO TP + AIMBOT (  maintenance )", 
                        size: null,
                        icon: "fas fa-file-code",
                        downloadUrl: "https://pastebin.com/qM5uJBqx",
                        youtubeId: "Y-JpyHarAHc",
                        description: "This script offers auto teleport and aimbot for Arsenal, controlled by manual keys for better precision. I can’t share preview images because my account got banned from the server for using it too aggressively.",
                        previewImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSC43Wcf2SIR1Vdr35kOqKK-1UHCzXemmbxA-qD8O9FM499s48fJaiXFX3Y&s=10" // Ganti dengan URL gambar hosting Anda
                    },
                    {
                        name: "SC Spade Troll Universal ( Y All Get Key Manually 😁 )", 
                        size: null,
                        icon: "fas fa-file-code",
                        downloadUrl: "https://pastebin.com/bt1qh1as",
                        youtubeId: "2gF87jvGIJE",
                        description: "Universal troll script for SC Spade with fun features. This script mainly lets you bring parts to other players when a player gets hit by an unanchored part, they’ll get knocked far away. It won’t work if the player is sitting.",
                        previewImage: "https://files.catbox.moe/igy055.jpg" // Ganti dengan URL gambar hosting Anda
                    }
                ]
            },
            {
                category: "Cheat Tools",
                icon: "fas fa-tools", 
                color: "bg-red-500",
                items: [
                    {
                        name: "Codex Executor ( 🔴 Need Update )",
                        meta: "Android",
                        icon: "fas fa-cog",
                        downloadUrl: "https://codex.lol/android",
                        youtubeId: "aajh5j7qfbM",
                        description: "Codex Executor is the best keyless executor and a favorite of Lyora’s admin. You can adjust its size in the settings. It’s already undetected, and I highly recommend it.",
                        previewImage: "https://files.catbox.moe/b62w7i.jpg" // Ganti dengan URL gambar hosting Anda
                    },
                    {
                        name: "Arceus X Neo ( Last Update Today Oct-21-2025 )",
                        meta: "Android",
                        icon: "fas fa-cog",
                        downloadUrl: "https://www.mediafire.com/file/smc7a6pvyh8krpg/Roblox_Arceus_X_NEO_1.8.9.apk/file?dkey=8ja6cde7ktm&r=748",
                        youtubeId: "UdOp-wP4wtw",
                        description: "Arceus X Neo Executor is a powerful and user-friendly executor designed for smooth and efficient script execution. It offers high compatibility with various scripts, low detection rates, and customizable features that enhance your scripting experience. Perfect for users looking for reliability and performance in one package.",
                        previewImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPtnLzbo4fUB7mM8-c-3A1DwdOCz-SJLwYpb2ev9qLYKQHcOci4oUOJNu7&s=10" // Ganti dengan URL gambar hosting Anda
                    },
                    {
                        name: "Hydrogen Executor",
                        meta: "PC ONLY",
                        icon: "fas fa-cog",
                        downloadUrl: "https://hydrogen.lat/",
                        youtubeId: "f7IFfY-oiT4",
                        description: "Executor Hydrogen is a powerful executor made specifically for MacOS users. It runs smoothly on Apple systems and comes packed with features to make your scripting easier and faster. I can’t show a preview image because I don’t have a MacBook XD",
                        previewImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSC43Wcf2SIR1Vdr35kOqKK-1UHCzXemmbxA-qD8O9FM499s48fJaiXFX3Y&s=10" // Ganti dengan URL gambar hosting Anda
                    },
                    {
                        name: "Xeno Executor",
                        meta: "PC ONLY",
                        icon: "fas fa-cog",
                        downloadUrl: "https://rscripts.wiki/xeno-executor-v1-2-80/#google_vignette",
                        youtubeId: "d6oR9GIPuBA",
                        description: "Xeno Executor is a very safe executor designed for Windows users. It offers solid protection and reliability, making it a great choice if security is your priority. However, not all scripts are compatible with it, so some might not work properly. Make sure to test your scripts or look for ones verified to run on Xeno for the best experience.",
                        previewImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSC43Wcf2SIR1Vdr35kOqKK-1UHCzXemmbxA-qD8O9FM499s48fJaiXFX3Y&s=10" // Ganti dengan URL gambar hosting Anda
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
                        youtubeId: "i0duks9_fRs",
                        description: "The Free Fire mod menu by Gringoxp offers various cool cheats and features to enhance your gameplay. It’s popular for being easy to use and stable, giving you advantages like auto-aim, wallhack, and more.",
                        previewImage: "https://files.catbox.moe/y5w2cd.jpg" // Ganti dengan URL gambar hosting Anda
                    },
                    {
                        name: "Call Of Duty ( XIN MOD 80% SAFE )",
                        meta: "Mobile Root & No Root",
                        icon: "fas fa-music", 
                        downloadUrl: "https://t.me/NotYourAverageXinn",
                        youtubeId: "CeMVmUe0E5I",
                        description: "The COD Mobile mod by Xinn comes packed with useful cheats like auto-aim and wallhack to give you an edge in the game. It’s known for smooth performance and ease of use. It’s about 80% safe if you avoid using aim tracking or aimbot.",
                        previewImage: "https://files.catbox.moe/0qzirh.jpg" // Ganti dengan URL gambar hosting Anda
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
                
                <!-- Deskripsi -->
                <div class="video-description">
                    <div class="description-header">
                        <i class="fas fa-info-circle mr-2"></i>
                        <span>Description</span>
                    </div>
                    <p class="description-text">${item.description || 'No description available.'}</p>
                </div>

                <!-- Preview Image -->
                ${item.previewImage ? `
                <div class="image-preview">
                    <div class="image-header">
                        <i class="fas fa-image mr-2"></i>
                        <span>Preview Image</span>
                    </div>
                    <div class="preview-image-container">
                        <img src="${item.previewImage}" 
                             alt="${item.name} Preview" 
                             class="preview-image"
                             loading="lazy"
                             onclick="this.classList.toggle('zoomed')">
                    </div>
                    <p class="image-note">Click image to zoom</p>
                </div>
                ` : ''}
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

// Fungsi untuk zoom image (tambahkan ke window object)
window.toggleImageZoom = function(img) {
    img.classList.toggle('zoomed');
};
