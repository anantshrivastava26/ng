/* ═══════════════════════════════════════════════════════════════════════════
   NAVYA GROVER — NOORA PORTFOLIO  |  JS
   ═══════════════════════════════════════════════════════════════════════════ */

'use strict';

/* ── Custom Cursor ──────────────────────────────────────────────────────── */
(function initCursor() {
  if (!window.matchMedia('(pointer: fine)').matches) return;

  const cursor = document.createElement('div');
  cursor.className = 'cursor';
  const ring   = document.createElement('div');
  ring.className = 'cursor-ring';
  document.body.append(cursor, ring);

  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.transform = `translate(${mx - 4}px, ${my - 4}px)`;
  });

  // Smooth ring follow
  function animRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.transform = `translate(${rx - 18}px, ${ry - 18}px)`;
    requestAnimationFrame(animRing);
  }
  animRing();

  // Hover state
  document.querySelectorAll('a, button, .project-tile, .bento-card, .tool-item').forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('hovering'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hovering'));
  });
})();

/* ── Navbar ─────────────────────────────────────────────────────────────── */
(function initNavbar() {
  const nav = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  let menuOpen = false;

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  hamburger.addEventListener('click', () => {
    menuOpen = !menuOpen;
    mobileMenu.classList.toggle('open', menuOpen);
    hamburger.setAttribute('aria-expanded', menuOpen);
    // Animate spans
    const spans = hamburger.querySelectorAll('span');
    if (menuOpen) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.transform = '';
    }
  });

  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      menuOpen = false;
      mobileMenu.classList.remove('open');
    });
  });
})();

/* ── Hero Entrance Animations ───────────────────────────────────────────── */
(function initHeroAnimations() {
  const reveals = document.querySelectorAll('[data-reveal]');

  // Stagger each element
  reveals.forEach(el => {
    const delay = parseInt(el.getAttribute('data-delay') || 0, 10);
    setTimeout(() => {
      el.style.transition = `opacity 0.9s cubic-bezier(0.25,0.46,0.45,0.94) ${delay}ms,
                             transform 0.9s cubic-bezier(0.25,0.46,0.45,0.94) ${delay}ms`;
      el.classList.add('in');
    }, 400 + delay);
  });
})();

/* ── Scroll Reveal (IntersectionObserver) ───────────────────────────────── */
(function initScrollReveal() {
  const items = document.querySelectorAll('[data-scroll-reveal]');

  const observer = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger siblings within same parent
        const siblings = [...entry.target.parentElement.querySelectorAll('[data-scroll-reveal]')];
        const idx = siblings.indexOf(entry.target);
        setTimeout(() => {
          entry.target.classList.add('revealed');
        }, idx * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  items.forEach(el => observer.observe(el));
})();

/* ── Text Reveal on Scroll (word-by-word, like Framer TextReveal) ──────── */
(function initTextReveal() {
  const target = document.getElementById('revealText');
  if (!target) return;

  const rawText = target.textContent.trim();
  const words = rawText.split(/\s+/);

  target.innerHTML = words
    .map(w => `<span class="word">${w}</span>`)
    .join(' ');

  const wordEls = target.querySelectorAll('.word');

  function updateWords() {
    const rect = target.getBoundingClientRect();
    const winH = window.innerHeight;

    // Progress: 0 when top of element hits bottom of viewport, 1 when element bottom hits center
    const progress = 1 - (rect.bottom - winH * 0.3) / (rect.height + winH * 0.7);
    const clampedProgress = Math.min(1, Math.max(0, progress));

    const litCount = Math.floor(clampedProgress * wordEls.length);
    wordEls.forEach((el, i) => {
      el.classList.toggle('lit', i < litCount);
    });
  }

  window.addEventListener('scroll', updateWords, { passive: true });
  updateWords();
})();

/* ── Parallax on Hero BG ────────────────────────────────────────────────── */
(function initParallax() {
  const bgImg = document.querySelector('.hero-bg-img');
  if (!bgImg) return;

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    bgImg.style.transform = `scale(1) translateY(${scrolled * 0.35}px)`;
  }, { passive: true });
})();

/* ── Animated Progress Bar (trigger on enter viewport) ─────────────────── */
(function initProgressBar() {
  const fill = document.querySelector('.progress-fill');
  if (!fill) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        fill.style.width = fill.style.width || '0%';
        requestAnimationFrame(() => {
          fill.style.transition = 'width 1.5s cubic-bezier(0.25,0.46,0.45,0.94)';
          fill.style.width = '72%';
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  observer.observe(fill.closest('.bento-card'));
})();

/* ── Smooth hover lift on project tiles ────────────────────────────────── */
(function initProjectHover() {
  document.querySelectorAll('.project-tile').forEach(tile => {
    const img = tile.querySelector('.project-tile-img');
    tile.addEventListener('mousemove', e => {
      const r = tile.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top)  / r.height - 0.5;
      img.style.transform = `scale(0.97) rotateY(${x * 4}deg) rotateX(${-y * 4}deg)`;
    });
    tile.addEventListener('mouseleave', () => {
      img.style.transform = '';
    });
  });
})();

/* ── Bento card hover glow ──────────────────────────────────────────────── */
(function initBentoGlow() {
  document.querySelectorAll('.bento-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      card.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(126,25,176,0.06) 0%, #fff 60%)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.background = '';
    });
  });
})();

/* ── Staggered entrance for tools list ─────────────────────────────────── */
(function initToolsAnimation() {
  const tools = document.querySelectorAll('.tool-item');
  if (!tools.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        tools.forEach((tool, i) => {
          setTimeout(() => {
            tool.style.opacity = '1';
            tool.style.transform = 'translateX(0)';
          }, i * 60);
        });
        observer.disconnect();
      }
    });
  }, { threshold: 0.2 });

  // Initial hidden state
  tools.forEach(t => {
    t.style.opacity = '0';
    t.style.transform = 'translateX(-20px)';
    t.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });

  observer.observe(tools[0]);
})();

/* ── Scroll progress indicator (thin line on top) ───────────────────────── */
(function initScrollProgress() {
  const bar = document.createElement('div');
  bar.style.cssText = `
    position: fixed; top: 0; left: 0; height: 2px;
    background: #7E19B0; z-index: 9999;
    width: 0%; transition: width 0.1s linear;
    pointer-events: none;
  `;
  document.body.appendChild(bar);

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = `${(scrollTop / docHeight) * 100}%`;
  }, { passive: true });
})();

/* ── Section entrance counter numbers (About stats if any) ──────────────── */
(function initCountUp() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = +el.getAttribute('data-count');
      let current = 0;
      const step = target / 60;
      const timer = setInterval(() => {
        current = Math.min(current + step, target);
        el.textContent = Math.round(current);
        if (current >= target) clearInterval(timer);
      }, 16);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
})();
