// script.js – interactive micro-animations and ready message
// ensures smooth experience, dynamic /help hint, and active invite tracking

document.addEventListener('DOMContentLoaded', function() {
  'use strict';

  // --- hover sound simulation (visual only) - no actual audio, but adds class pop ---
  const cmdBadges = document.querySelectorAll('.cmd');
  cmdBadges.forEach(badge => {
    badge.addEventListener('mouseenter', function(e) {
      this.style.backgroundColor = '#2e4a7a';
      this.style.borderColor = '#97c2ff';
      this.style.transition = '0.08s';
    });
    badge.addEventListener('mouseleave', function(e) {
      this.style.backgroundColor = '';
      this.style.borderColor = '';
    });
  });

  // --- invite button click tracking simulation (console greeting) ---
  const inviteBtn = document.querySelector('.invite-btn');
  if (inviteBtn) {
    inviteBtn.addEventListener('click', function(e) {
      console.log('🎉 Lyora Community invite clicked! Permissions: 8 (Administrator)');
      // subtle animation
      this.style.transform = 'scale(0.98)';
      setTimeout(() => { this.style.transform = ''; }, 150);
    });
  }

  // --- typewriter effect for hero subhead? subtle micro interaction ---
  const subhead = document.querySelector('.subhead');
  if (subhead) {
    // just a small flash on load to attract attention
    subhead.style.opacity = '0.7';
    setTimeout(() => { subhead.style.opacity = '1'; }, 80);
  }

  // --- card glow effect on click (demo) ---
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.addEventListener('click', function(e) {
      // do not interfere with link clicks inside card (if any)
      if (e.target.tagName === 'A' || e.target.closest('a')) return;
      this.style.boxShadow = '0 0 0 2px #5f9eff, 0 20px 30px -8px black';
      setTimeout(() => {
        this.style.boxShadow = ''; // revert to hover default
      }, 200);
    });
  });

  // --- dynamic counter for total commands (just for fun, shows 100+) ---
  const totalCmdSpan = document.querySelector('.total-commands strong');
  if (totalCmdSpan) {
    // we don't change the content, but pulse it
    setInterval(() => {
      totalCmdSpan.style.color = '#ffffff';
      totalCmdSpan.style.textShadow = '0 0 8px #629cff';
      setTimeout(() => {
        totalCmdSpan.style.color = '';
        totalCmdSpan.style.textShadow = '';
      }, 400);
    }, 3000);
  }

  // --- welcome/goodbye special feature highlight pulse ---
  const welcomeCard = document.querySelector('.highlight-card');
  if (welcomeCard) {
    const badge = welcomeCard.querySelector('.feature-note i');
    if (badge) {
      setInterval(() => {
        badge.style.color = '#ffdb8a';
        badge.style.transform = 'scale(1.2)';
        setTimeout(() => {
          badge.style.color = '';
          badge.style.transform = '';
        }, 300);
      }, 4000);
    }
  }

  // --- generate dynamic tooltip for /help kategori ---
  const helpHint = document.querySelector('.help-hint');
  if (helpHint) {
    helpHint.addEventListener('mouseenter', function() {
      this.style.backgroundColor = '#315597';
      this.style.borderColor = '#aac9ff';
    });
    helpHint.addEventListener('mouseleave', function() {
      this.style.backgroundColor = '';
      this.style.borderColor = '';
    });
  }

  // --- fake loading effect to simulate "100+ commands ready" (cosmetic) ---
  const cmdStat = document.querySelector('.command-stats span:first-child i');
  if (cmdStat) {
    setInterval(() => {
      cmdStat.style.color = '#b3ff9b';
      setTimeout(() => { cmdStat.style.color = ''; }, 500);
    }, 5000);
  }

  console.log('✨ Lyora Community website loaded — welcome & goodbye commands are ready!');
});