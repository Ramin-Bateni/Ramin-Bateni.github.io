/**
 * animations.js
 * Small, focused UI animation helpers that don't belong to a
 * specific feature: nav scroll state, mobile menu toggle,
 * and an IntersectionObserver-based reveal fallback for elements
 * not covered by AOS.
 */

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Adds/removes `.is-scrolled` on the nav based on scroll position.
 * @param {HTMLElement} nav
 */
export function initNavScrollState(nav) {
  if (!nav) return;

  const SCROLL_THRESHOLD = 24;
  let ticking = false;

  const update = () => {
    nav.classList.toggle('is-scrolled', window.scrollY > SCROLL_THRESHOLD);
    ticking = false;
  };

  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    },
    { passive: true }
  );

  update();
}

/**
 * Wires the mobile nav toggle button to open/close the link list.
 * @param {HTMLElement} toggle
 * @param {HTMLElement} links
 */
export function initMobileNav(toggle, links) {
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    const isOpen = links.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  links.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      links.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/**
 * Reveals elements with the `.js-reveal` class as they enter the viewport.
 * Used for elements rendered dynamically (e.g. project cards) where an
 * AOS attribute alone won't retrigger after render.
 * @param {string} [selector]
 */
export function initScrollReveal(selector = '.js-reveal') {
  const elements = document.querySelectorAll(selector);
  if (!elements.length) return;

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    elements.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  elements.forEach((el) => observer.observe(el));
}

/**
 * Wires the floating contact button to open/close its option menu.
 * Closes on outside click and on Escape.
 * @param {HTMLElement} toggle
 * @param {HTMLElement} menu
 */
export function initFab(toggle, menu) {
  if (!toggle || !menu) return;

  const close = () => {
    menu.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  };

  toggle.addEventListener('click', (event) => {
    event.stopPropagation();
    const isOpen = menu.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  document.addEventListener('click', (event) => {
    if (!toggle.contains(event.target) && !menu.contains(event.target)) {
      close();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') close();
  });
}

/**
 * Highlights the nav link matching whichever section is currently
 * most prominent in the viewport, using IntersectionObserver.
 */
export function initScrollSpy() {
  const navLinks = Array.from(document.querySelectorAll('.nav__link[href^="#"]'));
  if (!navLinks.length) return;

  const linkMap = new Map();
  const sections = [];

  navLinks.forEach((link) => {
    const id = link.getAttribute('href').slice(1);
    const section = document.getElementById(id);
    if (!section) return;
    linkMap.set(id, link);
    sections.push(section);
  });

  if (!sections.length) return;

  const navHeight = parseInt(
    getComputedStyle(document.documentElement).getPropertyValue('--nav-h') || '84',
    10
  );

  const setActive = (id) => {
    navLinks.forEach((link) => link.classList.remove('is-active'));
    linkMap.get(id)?.classList.add('is-active');
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    },
    { rootMargin: `-${navHeight}px 0px -60% 0px`, threshold: 0 }
  );

  sections.forEach((section) => observer.observe(section));
}

/**
 * Smoothly scrolls to an in-page anchor, accounting for the fixed nav height.
 * @param {HTMLElement} root document or a scoped container to attach listeners on
 */
export function initSmoothAnchors(root = document) {
  const navHeight = 88;

  root.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const id = link.getAttribute('href');
      if (!id || id === '#') return;

      const target = document.querySelector(id);
      if (!target) return;

      event.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    });
  });
}
