// ==================== RAS EL BAR ENTERTAINMENT - APP.JS ====================
// Modern, animation-rich JavaScript for premium tourism website
// No frameworks - vanilla JS with advanced animations

(function() {
  'use strict';

  // ==================== CONFIGURATION ====================
  const CONFIG = {
    scrollOffset: 100,
    animationThreshold: 0.15,
    parallaxSpeed: 0.5,
    counterDuration: 2000,
    testimonialInterval: 6000,
    marqueeSpeed: 30,
    particleCount: 50,
    cursorSmooth: 0.15,
    mapPulseSpeed: 2000,
    heroLoadDelay: 100,
    reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches
  };

  // ==================== DOM CACHE ====================
  const DOM = {
    body: document.body,
    html: document.documentElement,
    nav: document.getElementById('mainNav'),
    navLinks: document.querySelectorAll('.nav-link'),
    mobileMenuBtn: document.getElementById('mobileMenuBtn'),
    mobileMenu: document.getElementById('mobileMenu'),
    mobileLinks: document.querySelectorAll('.mobile-link'),
    themeToggle: document.getElementById('themeToggle'),
    hero: document.querySelector('.hero'),
    heroImage: document.getElementById('heroImage'),
    scrollTop: document.getElementById('scrollTop'),
    statNumbers: document.querySelectorAll('.stat-number'),
    testimonialCards: document.querySelectorAll('.testimonial-card'),
    testimonialPrev: document.getElementById('testimonialPrev'),
    testimonialNext: document.getElementById('testimonialNext'),
    testimonialDots: document.getElementById('testimonialDots'),
    expTabs: document.querySelectorAll('.exp-tab'),
    expPanels: document.querySelectorAll('.exp-panel'),
    mapTabs: document.querySelectorAll('.map-tab'),
    mapCanvases: document.querySelectorAll('.map-canvas'),
    mapAttractions: document.querySelectorAll('.map-attraction'),
    legendItems: document.querySelectorAll('.legend-item'),
    mapInfoPanel: document.getElementById('mapInfoPanel'),
    mapInfoImage: document.getElementById('mapInfoImage'),
    mapInfoTitle: document.getElementById('mapInfoTitle'),
    mapInfoDesc: document.getElementById('mapInfoDesc'),
    mapInfoType: document.getElementById('mapInfoType'),
    mapInfoHeight: document.getElementById('mapInfoHeight'),
    mapInfoWait: document.getElementById('mapInfoWait'),
    faqItems: document.querySelectorAll('.faq-item'),
    galleryItems: document.querySelectorAll('.gallery-item'),
    lightbox: document.getElementById('lightbox'),
    lightboxImage: document.getElementById('lightboxImage'),
    lightboxCaption: document.getElementById('lightboxCaption'),
    lightboxClose: document.getElementById('lightboxClose'),
    lightboxPrev: document.getElementById('lightboxPrev'),
    lightboxNext: document.getElementById('lightboxNext'),
    lightboxCurrent: document.getElementById('lightboxCurrent'),
    lightboxTotal: document.getElementById('lightboxTotal'),
    contactForm: document.getElementById('contactForm'),
    newsletterForm: document.getElementById('newsletterForm'),
    destinationCards: document.querySelectorAll('.destination-card'),
    reveals: document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale'),
    parallaxElements: document.querySelectorAll('.parallax-slow, .parallax-fast'),
    scrollProgress: null,
    loadingScreen: null,
  };

  // ==================== STATE ====================
  const state = {
    currentTestimonial: 0,
    currentLightboxIndex: 0,
    isMenuOpen: false,
    isDarkMode: false,
    scrollY: 0,
    mouseX: 0,
    mouseY: 0,
    cursorX: 0,
    cursorY: 0,
    isTouch: window.matchMedia('(pointer: coarse)').matches,
    countersAnimated: false,
    heroLoaded: false,
    galleryImages: [],
    currentMap: 'carnaval',
    mapData: {
      carnaval: {
        'thunder-bolt': { title: 'Thunder Bolt', desc: 'Our signature roller coaster reaching speeds of 85 km/h with breathtaking Mediterranean views.', type: 'Thrill Ride', height: '1.4m+', wait: '15 min', img: 'assets/images/roller-coaster.jpg' },
        'sky-wheel': { title: 'Sky View Wheel', desc: '60-meter observation wheel with panoramic coastal views at sunset.', type: 'Family Ride', height: '1.0m+', wait: '5 min', img: 'assets/images/ferris-wheel.jpg' },
        'carousel': { title: 'Royal Carousel', desc: 'Classic hand-painted carousel with 48 horses and chariots for all ages.', type: 'Family Ride', height: 'None', wait: '2 min', img: 'assets/images/carousel.jpg' },
        'haunted': { title: 'Mystic Manor', desc: 'Spooky haunted house with live actors and cutting-edge special effects.', type: 'Thrill Ride', height: '1.2m+', wait: '20 min', img: 'assets/images/haunted.jpg' },
        'bumper': { title: 'Crash Zone', desc: 'High-energy bumper cars with LED lighting and surround sound.', type: 'Family Ride', height: '1.1m+', wait: '10 min', img: 'assets/images/bumper.jpg' },
        'arcade': { title: 'Game Central', desc: '200+ arcade games from classics to latest VR experiences.', type: 'Games', height: 'None', wait: 'No wait', img: 'assets/images/arcade.jpg' },
        'food': { title: 'Food Court', desc: 'Mediterranean cuisine, fast food, and sweet treats for every taste.', type: 'Dining', height: 'None', wait: 'No wait', img: 'assets/images/food-court.jpg' },
      },
      amwag: {
        'wave-pool': { title: 'Mediterranean Waves', desc: 'Massive wave pool generating 2-meter waves with sandy beach and palm shade.', type: 'Water', height: '1.0m+', wait: 'No wait', img: 'assets/images/wave-pool.jpg' },
        'lazy-river': { title: 'Nile Drift', desc: '400-meter lazy river winding through tropical gardens and waterfalls.', type: 'Water', height: 'None', wait: 'No wait', img: 'assets/images/lazy-river.jpg' },
        'tsunami': { title: 'Tsunami Rush', desc: '5-story water slide plunging into crystal waters at thrilling speeds.', type: 'Slide', height: '1.2m+', wait: '10 min', img: 'assets/images/water-slide.jpg' },
        'kids-pool': { title: 'Splash Cove', desc: 'Interactive water playground with mini slides, fountains, and shallow pools.', type: 'Kids', height: 'None', wait: 'No wait', img: 'assets/images/kids-pool.jpg' },
        'cabanas': { title: 'Premium Cabanas', desc: 'Luxury private cabanas with concierge service, mini-bar, and premium views.', type: 'Relax', height: 'None', wait: 'Book ahead', img: 'assets/images/cabanas.jpg' },
        'dining': { title: 'Beachfront Dining', desc: 'Fresh seafood and Mediterranean cuisine with panoramic ocean views.', type: 'Dining', height: 'None', wait: 'No wait', img: 'assets/images/beach-dining.jpg' },
      }
    },
  };

  // ==================== UTILITY FUNCTIONS ====================
  const utils = {
    debounce: (fn, delay) => {
      let timer;
      return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, args), delay);
      };
    },
    throttle: (fn, limit) => {
      let inThrottle;
      return (...args) => {
        if (!inThrottle) {
          fn.apply(this, args);
          inThrottle = true;
          setTimeout(() => inThrottle = false, limit);
        }
      };
    },
    lerp: (start, end, factor) => start + (end - start) * factor,
    clamp: (val, min, max) => Math.min(Math.max(val, min), max),
    easeOutQuart: (t) => 1 - Math.pow(1 - t, 4),
    easeInOutCubic: (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
    random: (min, max) => Math.random() * (max - min) + min,
    isInViewport: (el, threshold = 0) => {
      const rect = el.getBoundingClientRect();
      return rect.top < window.innerHeight * (1 - threshold) && rect.bottom > 0;
    },
    formatNumber: (num) => new Intl.NumberFormat('en-EG').format(num),
  };

  // ==================== LOADING SCREEN ====================
  function createLoadingScreen() {
    const loader = document.createElement('div');
    loader.className = 'loading-screen';
    loader.innerHTML = `
      <svg class="loading-logo" viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="22" stroke="currentColor" stroke-width="1.5"/><path d="M24 8C24 8 16 16 16 24C16 32 24 40 24 40C24 40 32 32 32 24C32 16 24 8 24 8Z" stroke="currentColor" stroke-width="1.5"/><circle cx="24" cy="24" r="6" stroke="currentColor" stroke-width="1.5"/></svg>
      <div class="loading-text">Ras El Bar</div>
      <div class="loading-sub">Entertainment</div>
      <div class="loading-bar"><div class="loading-bar-fill"></div></div>
    `;
    document.body.appendChild(loader);
    DOM.loadingScreen = loader;

    window.addEventListener('load', () => {
      setTimeout(() => {
        loader.classList.add('hidden');
        setTimeout(() => loader.remove(), 600);
        initHero();
      }, 500);
    });
  }

  // ==================== SCROLL PROGRESS ====================
  function createScrollProgress() {
    const bar = document.createElement('div');
    bar.className = 'scroll-progress';
    document.body.appendChild(bar);
    DOM.scrollProgress = bar;
  }

  // ==================== CUSTOM CURSOR ====================
  function initCustomCursor() {
    if (state.isTouch || CONFIG.reducedMotion) return;

    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    const dot = document.createElement('div');
    dot.className = 'custom-cursor-dot';
    document.body.appendChild(cursor);
    document.body.appendChild(dot);

    document.addEventListener('mousemove', (e) => {
      state.mouseX = e.clientX;
      state.mouseY = e.clientY;
    });

    function updateCursor() {
      state.cursorX = utils.lerp(state.cursorX, state.mouseX, CONFIG.cursorSmooth);
      state.cursorY = utils.lerp(state.cursorY, state.mouseY, CONFIG.cursorSmooth);
      cursor.style.left = state.cursorX + 'px';
      cursor.style.top = state.cursorY + 'px';
      dot.style.left = state.mouseX + 'px';
      dot.style.top = state.mouseY + 'px';
      requestAnimationFrame(updateCursor);
    }
    updateCursor();

    const hoverables = document.querySelectorAll('a, button, .destination-card, .exp-card, .gallery-item, .map-attraction');
    hoverables.forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
    });
  }

  // ==================== NOISE OVERLAY ====================
  function createNoiseOverlay() {
    const noise = document.createElement('div');
    noise.className = 'noise-overlay';
    document.body.appendChild(noise);
  }

  // ==================== NAVIGATION ====================
  function initNavigation() {
    let lastScroll = 0;
    window.addEventListener('scroll', utils.throttle(() => {
      const currentScroll = window.scrollY;
      
      if (currentScroll > 50) {
        DOM.nav.classList.add('scrolled');
      } else {
        DOM.nav.classList.remove('scrolled');
      }

      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = currentScroll / docHeight;
      if (DOM.scrollProgress) {
        DOM.scrollProgress.style.transform = `scaleX(${progress})`;
      }

      if (currentScroll > 500) {
        DOM.scrollTop.classList.add('visible');
      } else {
        DOM.scrollTop.classList.remove('visible');
      }

      lastScroll = currentScroll;
    }, 16));

    DOM.navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
          const offset = target.offsetTop - 80;
          window.scrollTo({ top: offset, behavior: 'smooth' });
        }
      });
    });

    DOM.mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    DOM.mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        toggleMobileMenu();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
          setTimeout(() => {
            const offset = target.offsetTop - 80;
            window.scrollTo({ top: offset, behavior: 'smooth' });
          }, 400);
        }
      });
    });

    DOM.scrollTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  function toggleMobileMenu() {
    state.isMenuOpen = !state.isMenuOpen;
    DOM.mobileMenuBtn.classList.toggle('active', state.isMenuOpen);
    DOM.mobileMenu.classList.toggle('active', state.isMenuOpen);
    DOM.body.style.overflow = state.isMenuOpen ? 'hidden' : '';
  }

  // ==================== THEME TOGGLE ====================
  function initThemeToggle() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setDarkMode(true);
    }

    DOM.themeToggle.addEventListener('click', () => {
      setDarkMode(!state.isDarkMode);
    });

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem('theme')) {
        setDarkMode(e.matches);
      }
    });
  }

  function setDarkMode(isDark) {
    state.isDarkMode = isDark;
    DOM.html.setAttribute('data-theme', isDark ? 'dark' : 'light');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }

  // ==================== HERO SECTION ====================
  function initHero() {
    if (state.heroLoaded) return;
    state.heroLoaded = true;

    setTimeout(() => {
      DOM.hero.classList.add('loaded');
    }, CONFIG.heroLoadDelay);

    if (!CONFIG.reducedMotion) {
      window.addEventListener('scroll', utils.throttle(() => {
        const scrollY = window.scrollY;
        const heroHeight = DOM.hero.offsetHeight;
        if (scrollY < heroHeight) {
          const parallax = scrollY * 0.4;
          if (DOM.heroImage) {
            DOM.heroImage.style.transform = `translateY(${parallax}px) scale(1.1)`;
          }
        }
      }, 16));
    }

    initCounters();
  }

  // ==================== ANIMATED COUNTERS ====================
  function initCounters() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !state.countersAnimated) {
          state.countersAnimated = true;
          DOM.statNumbers.forEach(counter => {
            const target = parseInt(counter.dataset.target);
            animateCounter(counter, target);
          });
        }
      });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.hero-stats');
    if (statsSection) observer.observe(statsSection);
  }

  function animateCounter(el, target) {
    const startTime = performance.now();
    const duration = CONFIG.counterDuration;

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = utils.easeOutQuart(progress);
      const current = Math.floor(eased * target);
      
      el.textContent = current;
      
      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = target;
      }
    }
    requestAnimationFrame(update);
  }

  // ==================== SCROLL REVEAL ====================
  function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, { threshold: CONFIG.animationThreshold, rootMargin: '0px 0px -50px 0px' });

    DOM.reveals.forEach(el => observer.observe(el));
  }

  // ==================== PARALLAX EFFECTS ====================
  function initParallax() {
    if (CONFIG.reducedMotion) return;

    window.addEventListener('scroll', utils.throttle(() => {
      const scrollY = window.scrollY;
      DOM.parallaxElements.forEach(el => {
        const speed = el.classList.contains('parallax-fast') ? 0.8 : 0.4;
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          const yPos = (scrollY - el.offsetTop) * speed;
          el.style.transform = `translateY(${yPos}px)`;
        }
      });
    }, 16));
  }

  // ==================== DESTINATION CARDS ====================
  function initDestinationCards() {
    DOM.destinationCards.forEach(card => {
      if (!state.isTouch && !CONFIG.reducedMotion) {
        card.addEventListener('mousemove', (e) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          const rotateX = (y - centerY) / 20;
          const rotateY = (centerX - x) / 20;
          card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });

        card.addEventListener('mouseleave', () => {
          card.style.transform = '';
        });
      }

      card.addEventListener('mousemove', (e) => {
        const shine = card.querySelector('.card-shine');
        if (shine) {
          const rect = card.getBoundingClientRect();
          const x = ((e.clientX - rect.left) / rect.width) * 100;
          const y = ((e.clientY - rect.top) / rect.height) * 100;
          shine.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.2) 0%, transparent 60%)`;
        }
      });
    });
  }

  // ==================== EXPERIENCES TABS ====================
  function initExperiencesTabs() {
    DOM.expTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const targetTab = tab.dataset.tab;
        
        DOM.expTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        DOM.expPanels.forEach(panel => {
          if (panel.dataset.panel === targetTab) {
            panel.classList.add('active');
          } else {
            panel.classList.remove('active');
          }
        });
      });
    });
  }

  // ==================== INTERACTIVE MAP ====================
  function initMap() {
    DOM.mapTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const targetMap = tab.dataset.map;
        state.currentMap = targetMap;
        
        DOM.mapTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        DOM.mapCanvases.forEach(canvas => {
          canvas.classList.toggle('active', canvas.dataset.map === targetMap);
        });

        DOM.mapInfoPanel.classList.remove('active');
      });
    });

    DOM.mapAttractions.forEach(attr => {
      attr.addEventListener('click', () => {
        const attractionId = attr.dataset.attraction;
        if (attractionId === 'entrance') return;
        showMapInfo(attractionId);
      });

      attr.addEventListener('mouseenter', () => {
        const attractionId = attr.dataset.attraction;
        if (attractionId !== 'entrance') {
          highlightLegendItem(attractionId);
        }
      });

      attr.addEventListener('mouseleave', () => {
        clearLegendHighlight();
      });
    });

    DOM.legendItems.forEach(item => {
      item.addEventListener('click', () => {
        const attractionId = item.dataset.attraction;
        showMapInfo(attractionId);
        
        DOM.legendItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
      });
    });
  }

  function showMapInfo(attractionId) {
    const data = state.mapData[state.currentMap][attractionId];
    if (!data) return;

    DOM.mapInfoImage.src = data.img;
    DOM.mapInfoImage.alt = data.title;
    DOM.mapInfoTitle.textContent = data.title;
    DOM.mapInfoDesc.textContent = data.desc;
    DOM.mapInfoType.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg> ${data.type}`;
    DOM.mapInfoHeight.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg> ${data.height}`;
    DOM.mapInfoWait.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg> ${data.wait}`;

    DOM.mapInfoPanel.classList.add('active');
  }

  function highlightLegendItem(attractionId) {
    DOM.legendItems.forEach(item => {
      item.classList.toggle('active', item.dataset.attraction === attractionId);
    });
  }

  function clearLegendHighlight() {
    DOM.legendItems.forEach(item => item.classList.remove('active'));
  }

  // ==================== TESTIMONIALS SLIDER ====================
  function initTestimonials() {
    const total = DOM.testimonialCards.length;
    if (total === 0) return;

    for (let i = 0; i < total; i++) {
      const dot = document.createElement('div');
      dot.className = 'testimonial-dot' + (i === 0 ? ' active' : '');
      dot.addEventListener('click', () => goToTestimonial(i));
      DOM.testimonialDots.appendChild(dot);
    }

    DOM.testimonialPrev.addEventListener('click', () => {
      state.currentTestimonial = (state.currentTestimonial - 1 + total) % total;
      updateTestimonials();
    });

    DOM.testimonialNext.addEventListener('click', () => {
      state.currentTestimonial = (state.currentTestimonial + 1) % total;
      updateTestimonials();
    });

    // Touch swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    const track = document.querySelector('.testimonials-track');
    
    if (track) {
      track.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });

      track.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
      }, { passive: true });
    }

    function handleSwipe() {
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          state.currentTestimonial = (state.currentTestimonial + 1) % total;
        } else {
          state.currentTestimonial = (state.currentTestimonial - 1 + total) % total;
        }
        updateTestimonials();
      }
    }

    // Auto-advance
    let autoAdvance = setInterval(() => {
      state.currentTestimonial = (state.currentTestimonial + 1) % total;
      updateTestimonials();
    }, CONFIG.testimonialInterval);

    // Pause on hover
    const slider = document.querySelector('.testimonials-slider');
    if (slider) {
      slider.addEventListener('mouseenter', () => clearInterval(autoAdvance));
      slider.addEventListener('mouseleave', () => {
        autoAdvance = setInterval(() => {
          state.currentTestimonial = (state.currentTestimonial + 1) % total;
          updateTestimonials();
        }, CONFIG.testimonialInterval);
      });
    }
  }

  function goToTestimonial(index) {
    state.currentTestimonial = index;
    updateTestimonials();
  }

  function updateTestimonials() {
    const total = DOM.testimonialCards.length;
    
    DOM.testimonialCards.forEach((card, i) => {
      card.classList.remove('active', 'prev');
      if (i === state.currentTestimonial) {
        card.classList.add('active');
      } else if (i === (state.currentTestimonial - 1 + total) % total) {
        card.classList.add('prev');
      }
    });

    const dots = DOM.testimonialDots.querySelectorAll('.testimonial-dot');
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === state.currentTestimonial);
    });
  }

  // ==================== FAQ ACCORDION ====================
  function initFAQ() {
    DOM.faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all others
        DOM.faqItems.forEach(i => i.classList.remove('active'));
        
        // Toggle current
        if (!isActive) {
          item.classList.add('active');
        }
      });
    });
  }

  // ==================== GALLERY LIGHTBOX ====================
  function initGallery() {
    // Build gallery images array
    DOM.galleryItems.forEach((item, index) => {
      const img = item.querySelector('img');
      const caption = item.querySelector('h4')?.textContent || '';
      const tag = item.querySelector('.gallery-tag')?.textContent || '';
      if (img) {
        state.galleryImages.push({
          src: img.src,
          alt: img.alt,
          caption: caption,
          tag: tag
        });
      }

      item.addEventListener('click', () => openLightbox(index));
    });

    DOM.lightboxClose.addEventListener('click', closeLightbox);
    DOM.lightboxPrev.addEventListener('click', (e) => {
      e.stopPropagation();
      navigateLightbox(-1);
    });
    DOM.lightboxNext.addEventListener('click', (e) => {
      e.stopPropagation();
      navigateLightbox(1);
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (!DOM.lightbox.classList.contains('active')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') navigateLightbox(-1);
      if (e.key === 'ArrowRight') navigateLightbox(1);
    });

    // Click outside to close
    DOM.lightbox.addEventListener('click', (e) => {
      if (e.target === DOM.lightbox) closeLightbox();
    });

    // Touch swipe for lightbox
    let touchStartX = 0;
    DOM.lightbox.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    DOM.lightbox.addEventListener('touchend', (e) => {
      const touchEndX = e.changedTouches[0].screenX;
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) navigateLightbox(1);
        else navigateLightbox(-1);
      }
    }, { passive: true });
  }

  function openLightbox(index) {
    state.currentLightboxIndex = index;
    updateLightbox();
    DOM.lightbox.classList.add('active');
    DOM.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    DOM.lightbox.classList.remove('active');
    DOM.body.style.overflow = '';
  }

  function navigateLightbox(direction) {
    const total = state.galleryImages.length;
    state.currentLightboxIndex = (state.currentLightboxIndex + direction + total) % total;
    updateLightbox();
  }

  function updateLightbox() {
    const img = state.galleryImages[state.currentLightboxIndex];
    if (!img) return;

    DOM.lightboxImage.src = img.src;
    DOM.lightboxImage.alt = img.alt;
    DOM.lightboxCaption.textContent = img.caption ? `${img.tag} - ${img.caption}` : img.tag;
    DOM.lightboxCurrent.textContent = state.currentLightboxIndex + 1;
    DOM.lightboxTotal.textContent = state.galleryImages.length;
  }

  // ==================== CONTACT FORM ====================
  function initContactForm() {
    if (!DOM.contactForm) return;

    DOM.contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const formData = new FormData(DOM.contactForm);
      const data = Object.fromEntries(formData);
      
      // Simulate form submission
      const submitBtn = DOM.contactForm.querySelector('.form-submit');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<span>Sending...</span>';
      submitBtn.disabled = true;

      setTimeout(() => {
        showToast('Message sent successfully! We will get back to you soon.', 'success');
        DOM.contactForm.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }, 1500);
    });
  }

  // ==================== NEWSLETTER FORM ====================
  function initNewsletterForm() {
    if (!DOM.newsletterForm) return;

    DOM.newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const input = DOM.newsletterForm.querySelector('input');
      const btn = DOM.newsletterForm.querySelector('button');
      
      btn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>';
      
      setTimeout(() => {
        showToast('Thank you for subscribing!', 'success');
        input.value = '';
        btn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>';
      }, 1000);
    });
  }

  // ==================== TOAST NOTIFICATIONS ====================
  function showToast(message, type = 'default') {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        ${type === 'success' 
          ? '<path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>'
          : '<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>'
        }
      </svg>
      <span>${message}</span>
    `;
    document.body.appendChild(toast);

    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 400);
    }, 4000);
  }

  // ==================== PARTICLE SYSTEM ====================
  function initParticles() {
    if (state.isTouch || CONFIG.reducedMotion) return;

    const canvas = document.createElement('canvas');
    canvas.className = 'particle-canvas';
    document.body.insertBefore(canvas, document.body.firstChild);

    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;
    let isActive = true;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.5 + 0.1;
        this.color = Math.random() > 0.5 ? '0, 194, 209' : '255, 138, 61';
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
        ctx.fill();
      }
    }

    // Create particles
    for (let i = 0; i < CONFIG.particleCount; i++) {
      particles.push(new Particle());
    }

    function drawConnections() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0, 194, 209, ${0.1 * (1 - distance / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    }

    function animate() {
      if (!isActive) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.update();
        p.draw();
      });

      drawConnections();
      animationId = requestAnimationFrame(animate);
    }

    animate();

    // Pause when tab is hidden
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        isActive = false;
        cancelAnimationFrame(animationId);
      } else {
        isActive = true;
        animate();
      }
    });
  }

  // ==================== MAGNETIC BUTTONS ====================
  function initMagneticButtons() {
    if (state.isTouch || CONFIG.reducedMotion) return;

    const magneticBtns = document.querySelectorAll('.magnetic-btn, .cta-primary, .cta-secondary, .nav-cta');
    
    magneticBtns.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
      });
    });
  }

  // ==================== KINETIC TYPOGRAPHY ====================
  function initKineticTypography() {
    const kineticElements = document.querySelectorAll('.kinetic-text');
    
    kineticElements.forEach(el => {
      const text = el.textContent;
      el.innerHTML = '';
      
      text.split('').forEach((char, i) => {
        const span = document.createElement('span');
        span.className = 'kinetic-letter';
        span.textContent = char === ' ' ? '\\u00A0' : char;
        span.style.transitionDelay = `${i * 0.05}s`;
        el.appendChild(span);
      });
    });
  }

  // ==================== IMAGE LAZY LOADING ====================
  function initLazyLoading() {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.classList.add('loaded');
          imageObserver.unobserve(img);
        }
      });
    }, { rootMargin: '50px' });

    lazyImages.forEach(img => {
      img.classList.add('lazy-blur');
      imageObserver.observe(img);
    });
  }

  // ==================== SMOOTH SCROLL POLYFILL ====================
  function initSmoothScroll() {
    // Native smooth scroll is used, but we enhance it
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          const offset = target.offsetTop - 80;
          window.scrollTo({
            top: offset,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  // ==================== ACTIVE NAV LINK ON SCROLL ====================
  function initActiveNavOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', utils.throttle(() => {
      const scrollPos = window.scrollY + 200;
      
      sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        
        if (scrollPos >= top && scrollPos < top + height) {
          DOM.navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
          });
        }
      });
    }, 100));
  }

  // ==================== MARQUEE SPEED CONTROL ====================
  function initMarqueeControl() {
    const marquee = document.querySelector('.marquee-content');
    if (!marquee) return;

    // Pause on hover
    marquee.parentElement.addEventListener('mouseenter', () => {
      marquee.style.animationPlayState = 'paused';
    });
    
    marquee.parentElement.addEventListener('mouseleave', () => {
      marquee.style.animationPlayState = 'running';
    });
  }

  // ==================== TEXT SCRAMBLE EFFECT ====================
  function initTextScramble() {
    const scrambleElements = document.querySelectorAll('[data-scramble]');
    const chars = '!<>-_\\/[]{}—=+*^?#________';

    scrambleElements.forEach(el => {
      const originalText = el.textContent;
      let frame = 0;
      let queue = [];

      for (let i = 0; i < originalText.length; i++) {
        queue.push({
          from: chars[Math.floor(Math.random() * chars.length)],
          to: originalText[i],
          start: Math.floor(Math.random() * 40),
          end: Math.floor(Math.random() * 40) + 40
        });
      }

      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          animateScramble();
          observer.unobserve(el);
        }
      });
      observer.observe(el);

      function animateScramble() {
        let output = '';
        let complete = 0;

        for (let i = 0; i < queue.length; i++) {
          let { from, to, start, end } = queue[i];
          let char = chars[Math.floor(Math.random() * chars.length)];

          if (frame >= end) {
            complete++;
            output += to;
          } else if (frame >= start) {
            if (!char || Math.random() < 0.28) {
              char = to;
            }
            output += char;
          } else {
            output += from;
          }
        }

        el.textContent = output;

        if (complete === queue.length) {
          return;
        } else {
          frame++;
          requestAnimationFrame(animateScramble);
        }
      }
    });
  }

  // ==================== BLOB ANIMATION ====================
  function initBlobs() {
    if (CONFIG.reducedMotion) return;

    const sections = document.querySelectorAll('.about-section, .destinations-section, .experiences-section');
    
    sections.forEach(section => {
      const blob = document.createElement('div');
      blob.className = 'blob';
      blob.style.cssText = `
        position: absolute;
        width: ${utils.random(300, 600)}px;
        height: ${utils.random(300, 600)}px;
        background: ${Math.random() > 0.5 ? 'var(--aqua)' : 'var(--sunset)'};
        top: ${utils.random(-10, 50)}%;
        left: ${utils.random(-10, 80)}%;
        z-index: 0;
        pointer-events: none;
      `;
      section.style.position = 'relative';
      section.insertBefore(blob, section.firstChild);
    });
  }

  // ==================== INTERSECTION OBSERVER FOR SECTIONS ====================
  function initSectionObservers() {
    const sections = document.querySelectorAll('section');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    }, { threshold: 0.1 });

    sections.forEach(section => observer.observe(section));
  }

  // ==================== PREFERS REDUCED MOTION ====================
  function initReducedMotion() {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    mediaQuery.addEventListener('change', (e) => {
      if (e.matches) {
        document.querySelectorAll('.marquee-content').forEach(el => {
          el.style.animation = 'none';
        });
      }
    });
  }

  // ==================== PERFORMANCE MONITORING ====================
  function initPerformance() {
    // Report performance metrics
    window.addEventListener('load', () => {
      setTimeout(() => {
        const perfData = performance.getEntriesByType('navigation')[0];
        if (perfData) {
          console.log(`Page load time: ${Math.round(perfData.loadEventEnd)}ms`);
        }
      }, 0);
    });
  }

  // ==================== ERROR HANDLING ====================
  function initErrorHandling() {
    window.addEventListener('error', (e) => {
      console.error('JavaScript error:', e.message);
    });

    window.addEventListener('unhandledrejection', (e) => {
      console.error('Unhandled promise rejection:', e.reason);
    });
  }

  // ==================== INITIALIZATION ====================
  function init() {
    createLoadingScreen();
    createScrollProgress();
    createNoiseOverlay();
    initNavigation();
    initThemeToggle();
    initCustomCursor();
    initScrollReveal();
    initParallax();
    initDestinationCards();
    initExperiencesTabs();
    initMap();
    initTestimonials();
    initFAQ();
    initGallery();
    initContactForm();
    initNewsletterForm();
    initParticles();
    initMagneticButtons();
    initKineticTypography();
    initLazyLoading();
    initSmoothScroll();
    initActiveNavOnScroll();
    initMarqueeControl();
    initTextScramble();
    initBlobs();
    initSectionObservers();
    initReducedMotion();
    initPerformance();
    initErrorHandling();

    console.log('%c Ras El Bar Entertainment ', 'background: linear-gradient(135deg, #0B3C5D, #00C2D1); color: white; font-size: 20px; font-weight: bold; padding: 10px 20px; border-radius: 8px;');
    console.log('%c Where Summer Comes Alive ', 'color: #00C2D1; font-size: 14px; font-style: italic;');
  }

  // Start when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
