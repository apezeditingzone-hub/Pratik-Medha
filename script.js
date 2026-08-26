/* ============================================
   PRATIK MEDHA — PORTFOLIO ANIMATIONS
   GSAP 3.15.0 + ScrollTrigger + SplitText
   Lenis 1.3.26 Smooth Scroll
   ============================================ */

(() => {
  'use strict';

  // ====== REGISTER GSAP PLUGINS ======
  gsap.registerPlugin(ScrollTrigger, SplitText);

  // ====== LENIS SMOOTH SCROLL ======
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 2,
    infinite: false,
  });

  // Connect Lenis to GSAP ticker
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  // ====== CUSTOM CURSOR ======
  const cursor = document.getElementById('cursor');
  const cursorDot = document.getElementById('cursor-dot');
  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;
  let dotX = 0, dotY = 0;

  // Only enable custom cursor on non-touch devices
  const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;

  if (!isTouchDevice) {
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    // Cursor animation loop
    function animateCursor() {
      // Smooth follow for outer circle
      cursorX += (mouseX - cursorX) * 0.12;
      cursorY += (mouseY - cursorY) * 0.12;
      cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;

      // Faster follow for dot
      dotX += (mouseX - dotX) * 0.6;
      dotY += (mouseY - dotY) * 0.6;
      cursorDot.style.transform = `translate3d(calc(${dotX}px - 50%), calc(${dotY}px - 50%), 0)`;

      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Cursor hover states
    const interactiveEls = document.querySelectorAll('a, button, .magnetic-btn, input, textarea');
    interactiveEls.forEach((el) => {
      el.addEventListener('mouseenter', () => cursor.classList.add('cursor--hover'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('cursor--hover'));
    });

    // Cursor "VIEW" state on project cards
    const viewEls = document.querySelectorAll('.cursor-view');
    viewEls.forEach((el) => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('cursor--view');
        cursor.classList.remove('cursor--hover');
      });
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('cursor--view');
      });
    });
  }

  // ====== PRELOADER ======
  function initPreloader() {
    const preloader = document.getElementById('preloader');
    const preloaderNumber = document.getElementById('preloader-number');
    const curtain = preloader.querySelector('.preloader__curtain');

    const tl = gsap.timeline({
      onComplete: () => {
        preloader.style.display = 'none';
        document.body.style.overflow = '';
        initScrollAnimations();
      }
    });

    // Prevent scroll during preloader
    document.body.style.overflow = 'hidden';

    // Count up 0 to 100
    tl.to({ val: 0 }, {
      val: 100,
      duration: 2,
      ease: 'power2.inOut',
      onUpdate: function() {
        preloaderNumber.textContent = Math.round(this.targets()[0].val);
      }
    });

    // Curtain rise
    tl.to(curtain, {
      height: '100%',
      duration: 0.8,
      ease: 'power4.inOut',
    }, '-=0.3');

    // Fade out preloader
    tl.to(preloader, {
      opacity: 0,
      duration: 0.4,
      ease: 'power2.out',
    });

    // Animate hero elements in
    tl.add(() => initHeroAnimation(), '-=0.2');
  }

  // ====== HERO ANIMATION ======
  function initHeroAnimation() {
    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Split hero name text
    const heroName = document.querySelector('.hero__name');
    if (heroName) {
      const heroSplit = new SplitText(heroName, { type: 'chars' });
      heroTl.from(heroSplit.chars, {
        y: 120,
        opacity: 0,
        rotationX: -40,
        stagger: 0.04,
        duration: 1.2,
        ease: 'power4.out',
      }, 0);
    }

    // Overtitle
    heroTl.to('.hero__overtitle', {
      opacity: 1,
      duration: 0.8,
    }, 0.3);

    // Subtitle
    const heroSubtitle = document.querySelector('.hero__subtitle');
    if (heroSubtitle) {
      const subtitleSplit = new SplitText(heroSubtitle, { type: 'chars' });
      heroTl.from(subtitleSplit.chars, {
        opacity: 0,
        y: 20,
        stagger: 0.02,
        duration: 0.6,
      }, 0.8);
    }

    // CTA buttons
    heroTl.to('.hero__cta', {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power3.out',
    }, 1);

    // Scroll indicator
    heroTl.to('.hero__scroll-indicator', {
      opacity: 1,
      duration: 0.8,
    }, 1.5);

    // Parallax blobs on scroll
    gsap.to('.blob--1', {
      y: -150,
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 }
    });
    gsap.to('.blob--2', {
      y: -100,
      x: 50,
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 }
    });
    gsap.to('.blob--3', {
      y: -200,
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 }
    });
  }

  // ====== SCROLL-TRIGGERED ANIMATIONS ======
  function initScrollAnimations() {
    // --- Text Reveal for Section Labels & Titles ---
    document.querySelectorAll('[data-splitting]').forEach((el) => {
      // Skip hero elements (already animated)
      if (el.closest('.hero')) return;

      const split = new SplitText(el, { type: 'chars, words' });
      gsap.from(split.chars, {
        y: 60,
        opacity: 0,
        rotationX: -20,
        stagger: 0.025,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        }
      });
    });

    // --- Reveal Text (clip-path) ---
    document.querySelectorAll('.reveal-text').forEach((el) => {
      gsap.to(el, {
        clipPath: 'inset(0 0 0% 0)',
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        }
      });
    });

    // --- Number Counters ---
    document.querySelectorAll('[data-count]').forEach((el) => {
      const target = parseInt(el.getAttribute('data-count'));
      gsap.to(el, {
        textContent: target,
        duration: 2,
        ease: 'power2.out',
        snap: { textContent: 1 },
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        }
      });
    });

    // --- Skill Cards Stagger ---
    gsap.from('.skill-card', {
      y: 80,
      opacity: 0,
      scale: 0.9,
      stagger: {
        amount: 0.6,
        from: 'start'
      },
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.skills__grid',
        start: 'top 80%',
        toggleActions: 'play none none none',
      }
    });

    // --- Horizontal Scroll (Projects) ---
    initHorizontalScroll();

    // --- Timeline Entries ---
    document.querySelectorAll('.timeline__entry').forEach((entry, i) => {
      gsap.to(entry, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: entry,
          start: 'top 80%',
          toggleActions: 'play none none none',
        }
      });
    });

    // --- Timeline SVG Line Draw ---
    const timelinePath = document.querySelector('.timeline__path');
    if (timelinePath) {
      const pathLength = timelinePath.getBoundingClientRect().height;
      timelinePath.style.strokeDasharray = pathLength;
      timelinePath.style.strokeDashoffset = pathLength;

      gsap.to(timelinePath, {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: '.timeline',
          start: 'top 70%',
          end: 'bottom 70%',
          scrub: 1,
        }
      });
    }

    // --- Navbar scroll state ---
    ScrollTrigger.create({
      trigger: document.body,
      start: 'top -80',
      onEnter: () => document.getElementById('navbar').classList.add('scrolled'),
      onLeaveBack: () => document.getElementById('navbar').classList.remove('scrolled'),
    });
  }

  // ====== HORIZONTAL SCROLL (PROJECTS) ======
  function initHorizontalScroll() {
    const track = document.querySelector('.projects__track');
    const wrapper = document.querySelector('.projects__horizontal-wrapper');

    if (!track || !wrapper) return;

    const totalScrollWidth = track.scrollWidth - wrapper.offsetWidth;

    gsap.to(track, {
      x: -totalScrollWidth,
      ease: 'none',
      scrollTrigger: {
        trigger: '.projects',
        start: 'top 10%',
        end: () => `+=${totalScrollWidth}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      }
    });
  }

  // ====== MAGNETIC BUTTONS ======
  if (!isTouchDevice) {
    document.querySelectorAll('.magnetic-btn').forEach((btn) => {
      const strength = parseInt(btn.dataset.strength) || 20;

      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(btn, {
          x: x * (strength / 100),
          y: y * (strength / 100),
          duration: 0.4,
          ease: 'power2.out',
        });
      });

      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: 'elastic.out(1, 0.5)',
        });
      });
    });
  }

  // ====== 3D TILT CARDS ======
  if (!isTouchDevice) {
    document.querySelectorAll('.tilt-card').forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;

        const rotateX = (0.5 - y) * 15;
        const rotateY = (x - 0.5) * 15;

        // Update glow position
        card.style.setProperty('--mouse-x', `${x * 100}%`);
        card.style.setProperty('--mouse-y', `${y * 100}%`);

        gsap.to(card, {
          rotateX: rotateX,
          rotateY: rotateY,
          scale: 1.02,
          duration: 0.4,
          ease: 'power2.out',
          transformPerspective: 800,
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          scale: 1,
          duration: 0.6,
          ease: 'elastic.out(1, 0.6)',
        });
      });
    });
  }

  // ====== TEXT SCRAMBLE EFFECT ======
  class TextScramble {
    constructor(el) {
      this.el = el;
      this.chars = '!<>-_\\/[]{}—=+*^?#________';
      this.originalText = el.textContent;
    }

    scramble() {
      const text = this.originalText;
      const length = text.length;
      let iteration = 0;

      const interval = setInterval(() => {
        this.el.textContent = text
          .split('')
          .map((char, i) => {
            if (i < iteration) return text[i];
            return this.chars[Math.floor(Math.random() * this.chars.length)];
          })
          .join('');

        if (iteration >= length) clearInterval(interval);
        iteration += 1 / 2;
      }, 30);
    }

    restore() {
      this.el.textContent = this.originalText;
    }
  }

  document.querySelectorAll('.scramble-text').forEach((el) => {
    const scrambler = new TextScramble(el);
    el.addEventListener('mouseenter', () => scrambler.scramble());
    el.addEventListener('mouseleave', () => scrambler.restore());
  });

  // ====== CONTACT GRADIENT FOLLOW ======
  const contactSection = document.querySelector('.contact');
  const contactGradient = document.querySelector('.contact__gradient');

  if (contactSection && contactGradient) {
    contactSection.addEventListener('mousemove', (e) => {
      const rect = contactSection.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      contactGradient.style.setProperty('--mouse-x', `${x}%`);
      contactGradient.style.setProperty('--mouse-y', `${y}%`);
    });
  }

  // ====== MOBILE MENU ======
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      mobileMenu.classList.toggle('open');

      if (mobileMenu.classList.contains('open')) {
        lenis.stop();
      } else {
        lenis.start();
      }
    });

    // Close menu on link click
    mobileMenu.querySelectorAll('.mobile-menu__link').forEach((link) => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        mobileMenu.classList.remove('open');
        lenis.start();
      });
    });
  }

  // ====== SMOOTH SCROLL ANCHOR LINKS ======
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        lenis.scrollTo(target, {
          offset: -80,
          duration: 1.5,
        });
      }
    });
  });

  // ====== FOOTER YEAR ======
  const yearEl = document.getElementById('current-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ====== INITIALIZE ======
  window.addEventListener('DOMContentLoaded', () => {
    // Small delay to ensure fonts are loaded
    setTimeout(initPreloader, 300);
  });

  // Refresh ScrollTrigger on resize
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);
  });

})();
