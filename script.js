// Dark mode toggle (jika digunakan di index.html)
const toggleBtn = document.getElementById('toggleDark');
if (toggleBtn) {
  toggleBtn.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
    toggleBtn.textContent = document.documentElement.classList.contains('dark') ? '☀️' : '🌙';
  });
}

// Fade-up on scroll
const fadeElements = document.querySelectorAll('.fade-up');
const showOnScroll = () => {
  const trigger = window.innerHeight * 0.9;
  fadeElements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < trigger) el.style.opacity = 1;
  });
};
window.addEventListener('scroll', showOnScroll);
window.addEventListener('load', showOnScroll);

// Redirect gallery card ke halaman detail
document.querySelectorAll('.gallery-card').forEach(card => {
  const imgAlt = card.querySelector('img')?.alt?.toLowerCase();
  let page = "";

  if (imgAlt.includes("whatsapp")) page = "whatsapp.html";
  else if (imgAlt.includes("mlbb")) page = "mlbb.html";
  else if (imgAlt.includes("telegram")) page = "telegram.html";

  if (page) {
    card.classList.add("cursor-pointer");
    card.addEventListener("click", () => {
      window.location.href = page;
    });
  }
});

// Detail proyek dinamis (jika digunakan di halaman .html khusus)
document.addEventListener('DOMContentLoaded', () => {
  const projectContent = document.getElementById('projectContent');
  const projectLink = document.getElementById('projectLink');

  const params = new URLSearchParams(window.location.search);
  const project = params.get('project');

  const projects = {
    whatsapp: {
      title: 'Bot WhatsApp AI',
      desc: 'Bot WhatsApp dengan fitur AI interaktif, perintah suara, menu dinamis, dan integrasi Telegram.',
      tools: 'Baileys, Node.js, OpenAI API',
      link: 'https://wa.me/6287859822633'
    },
    mlbb: {
      title: 'Website Mabar MLBB',
      desc: 'Situs mabar ML dengan form pendaftaran, efek animasi, suara hover, dan real-time update.',
      tools: 'HTML, Tailwind, JS, Firebase',
      link: 'https://mabarmlbb.vercel.app'
    },
    rpg: {
      title: 'Bot Telegram RPG',
      desc: 'Game waifu RPG di Telegram. Masuki dungeon, gacha waifu, dan PvP leaderboard!',
      tools: 'Telegraf.js, MongoDB, RPG Engine',
      link: 'https://t.me/seiren_waifubot'
    }
  };

  const p = projects[project];

  if (projectContent && p) {
    projectContent.innerHTML = `
      <h1 class="text-4xl font-bold text-blue-300 mb-4">${p.title}</h1>
      <p class="text-gray-200 mb-4">${p.desc}</p>
      <p class="text-sm text-gray-400 italic">Tools: ${p.tools}</p>
    `;
    if (projectLink) {
      projectLink.href = p.link;
    }
  } else if (projectContent) {
    projectContent.innerHTML = '<p class="text-red-400">Proyek tidak ditemukan.</p>';
    if (projectLink) {
      projectLink.style.display = 'none';
    }
  }
});
// Musik latar
const music = document.getElementById('bgMusic');
const musicToggle = document.getElementById('musicToggle');

if (music && musicToggle) {
  let isPlaying = false;

  musicToggle.addEventListener('click', () => {
    if (isPlaying) {
      music.pause();
      musicToggle.textContent = '🔇 Hidupkan Musik';
    } else {
      music.play();
      musicToggle.textContent = '🔊 Matikan Musik';
    }
    isPlaying = !isPlaying;
  });

  // Autoplay setelah klik pertama di halaman
  document.body.addEventListener('click', () => {
    if (!isPlaying) {
      music.play();
      isPlaying = true;
      musicToggle.textContent = '🔊 Matikan Musik';
    }
  }, { once: true });
}

// Status bar animasi
const hpBar = document.getElementById('hpBar');
const manaBar = document.getElementById('manaBar');
const moodBar = document.getElementById('moodBar');

const hpText = document.getElementById('hpText');
const manaText = document.getElementById('manaText');
const moodText = document.getElementById('moodText');

if (hpBar && manaBar && moodBar) {
  let hp = 82, mana = 50, mood = 75;

  setInterval(() => {
    hp = Math.max(0, Math.min(100, hp + (Math.random() * 10 - 5)));
    mana = Math.max(0, Math.min(100, mana + (Math.random() * 15 - 7)));
    mood = Math.max(0, Math.min(100, mood + (Math.random() * 8 - 4)));

    hpBar.style.width = hp + '%';
    manaBar.style.width = mana + '%';
    moodBar.style.width = mood + '%';

    hpText.textContent = `${Math.round(hp)} / 100`;
    manaText.textContent = `${Math.round(mana)} / 100`;

    if (mood > 75) moodText.textContent = 'Senang 🥰';
    else if (mood > 50) moodText.textContent = 'Netral 🙂';
    else if (mood > 25) moodText.textContent = 'Sedih 😢';
    else moodText.textContent = 'Ngambek 😠';

  }, 4000);
}

// Testimoni Slider
const testiList = [
  {
    text: `"Bot ini kawaii banget dan responsif! Aku merasa ngobrol sama waifu beneran~ 💖"`,
    author: "— Aiko, Gamer Otaku"
  },
  {
    text: `"Fitur RPG-nya bikin aku ketagihan! Setiap battle rasanya kayak anime shounen~ ⚔️✨"`,
    author: "— Haru, RPG Addict"
  },
  {
    text: `"Tampilan UI-nya smooth banget! Cocok buat developer yang suka estetika! 🌈"`,
    author: "— Rika, UI Designer"
  },
  {
    text: `"Chisato assistant-nya gemesin parah!! Selalu semangat bantuin aku 😍"`,
    author: "— Kenji, Fullstack Dev"
  },
  {
    text: `"Waifu collection + gacha system-nya kayak main game beneran! Sumpah nagih! 🎮💎"`,
    author: "— Mio, Waifu Collector"
  }
];

let testiIndex = 0;
setInterval(() => {
  testiIndex = (testiIndex + 1) % testiList.length;
  const testiText = document.getElementById("testiText");
  const testiAuthor = document.getElementById("testiAuthor");

  if (testiText && testiAuthor) {
    testiText.classList.remove("opacity-100");
    testiText.classList.add("opacity-0");
    setTimeout(() => {
      testiText.textContent = testiList[testiIndex].text;
      testiAuthor.textContent = testiList[testiIndex].author;
      testiText.classList.remove("opacity-0");
      testiText.classList.add("opacity-100");
    }, 300);
  }
}, 6000);
// Fade-in timeline on scroll
const fadeItems = document.querySelectorAll('.fade-item');
const fadeInObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

fadeItems.forEach(item => fadeInObserver.observe(item));