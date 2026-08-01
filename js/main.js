/**
 * main.js
 * Application entry point. Imports feature modules and wires
 * them up once the DOM is ready. Keeps no logic of its own beyond
 * orchestration so each concern stays in its own file.
 */

import { renderProjects } from './projects.js';
import { initFilters } from './filters.js';
import { initNavScrollState, initMobileNav, initScrollReveal, initSmoothAnchors, initFab, initScrollSpy } from './animations.js';
import { initSpaceBackground } from './space-background.js';

function initAOS() {
  if (typeof window.AOS === 'undefined') return;
  window.AOS.init({
    duration: 700,
    easing: 'ease-out-cubic',
    once: true,
    offset: 60,
    disable: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  });
}

function initLucideIcons() {
  if (typeof window.lucide === 'undefined') return;
  window.lucide.createIcons();
}

function setCurrentYear() {
  const el = document.getElementById('current-year');
  if (el) el.textContent = String(new Date().getFullYear());
}

function bootstrap() {
  const nav = document.querySelector('.nav');
  const navToggle = document.querySelector('.nav__toggle');
  const navLinks = document.querySelector('.nav__links');
  const projectsGrid = document.querySelector('.projects__grid');
  const filterBar = document.querySelector('.filters');
  const emptyState = document.querySelector('.projects__empty');

  initNavScrollState(nav);
  initMobileNav(navToggle, navLinks);
  initSmoothAnchors(document);
  initFab(document.getElementById('fab-toggle'), document.getElementById('fab-menu'));
  initScrollSpy();
  setCurrentYear();

  if (projectsGrid) {
    renderProjects(projectsGrid);
    initFilters(filterBar, projectsGrid, emptyState);
  }

  initLucideIcons();
  initAOS();
  initScrollReveal();
  initSpaceBackground();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrap);
} else {
  bootstrap();
}
