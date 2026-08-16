/**
 * case-study.js
 * Project Detail Modal — opens a full-screen overlay showing project
 * details, a gallery (if multi-image), description, and tech tags.
 * Zero dependencies, pure Vanilla JS.
 */

import { PROJECTS, getProjectImages } from './projects.js';

/**
 * Tracks whether a history state has been pushed for the current modal.
 * This flag is used to remove the state when the modal is closed via the X button.
 */
let caseStudyHistoryPushed = false;
/**
 * Flag to ensure the popstate listener is added only once.
 */
let popstateListenerAdded = false;
/**
 * Flag used to skip the history.back() call when the modal is closed via the
 * popstate event (i.e., the user pressed the Back button).
 */
let ignorePopStateClose = false;

/** @type {HTMLElement|null} */
let modalEl = null;

/** @type {boolean} */
let isOpen = false;

/** @type {Project|null} */
let currentProject = null;

/**
 * Opens the project detail modal for the given project id.
 * @param {string} projectId
 */
export function openCaseStudy(projectId) {
  const project = PROJECTS.find((p) => p.id === projectId);
  if (!project) return;
  if (isOpen) closeCaseStudy();

  currentProject = project;
  buildModal(project);
  document.body.appendChild(modalEl);

  // Trigger reflow then show for transition
  requestAnimationFrame(() => {
    modalEl.classList.add('is-open');
  });

  isOpen = true;
  lockBodyScroll(true);
  // Push a new history state so that the back button can close the modal
  if (!caseStudyHistoryPushed) {
    history.pushState({ caseStudy: true }, '');
    caseStudyHistoryPushed = true;
  }
  // Add popstate listener once
  if (!popstateListenerAdded) {
    window.addEventListener('popstate', handlePopState);
    popstateListenerAdded = true;
  }

  // Focus the close button for accessibility
  const closeBtn = modalEl.querySelector('.case-study__close');
  if (closeBtn) closeBtn.focus();
}

/**
 * Closes the currently open modal.
 */
export function closeCaseStudy() {
  if (!modalEl || !isOpen) return;
  modalEl.classList.remove('is-open');
  isOpen = false;
  lockBodyScroll(false);
  // If the modal was closed via the X button, remove the history state
  if (caseStudyHistoryPushed) {
    // Trigger a back navigation to remove the state we added
    history.back();
    caseStudyHistoryPushed = false;
  }

  // Remove after transition
  const onTransitionEnd = () => {
    modalEl.removeEventListener('transitionend', onTransitionEnd);
    if (modalEl.parentNode) modalEl.parentNode.removeChild(modalEl);
    modalEl = null;
    currentProject = null;
  };
  modalEl.addEventListener('transitionend', onTransitionEnd, { once: true });

  // Fallback: remove after timeout if transitionend doesn't fire
  setTimeout(() => {
    if (modalEl && modalEl.parentNode) {
      modalEl.parentNode.removeChild(modalEl);
      modalEl = null;
      currentProject = null;
    }
  }, 400);
}

/**
 * Builds the modal DOM from scratch.
 * @param {Project} project
 */
function buildModal(project) {
  modalEl = document.createElement('div');
  modalEl.className = 'case-study';
  modalEl.setAttribute('role', 'dialog');
  modalEl.setAttribute('aria-modal', 'true');
  modalEl.setAttribute('aria-label', `${project.title} — Project Details`);

  const images = getProjectImages(project);
  const hasGallery = images.length > 1;

  modalEl.innerHTML = `
    <div class="case-study__backdrop"></div>
    <div class="case-study__panel" role="document">
      <button class="case-study__close" aria-label="Close project details">
        <i data-lucide="x" aria-hidden="true"></i>
      </button>

      <div class="case-study__media">
        <div class="case-study__gallery-track${hasGallery ? '' : ''}">
          ${images.map((src, i) => `
            <img
              src="${src}"
              alt="${project.title} — image ${i + 1} of ${images.length}"
              loading="${i === 0 ? 'eager' : 'lazy'}"
              decoding="async"
              data-index="${i}"
              class="case-study__gallery-img"
            />
          `).join('')}
        </div>

        ${hasGallery ? `
          <button class="case-study__gallery-btn case-study__gallery-btn--prev" aria-label="Previous image">
            <i data-lucide="chevron-left" aria-hidden="true"></i>
          </button>
          <button class="case-study__gallery-btn case-study__gallery-btn--next" aria-label="Next image">
            <i data-lucide="chevron-right" aria-hidden="true"></i>
          </button>
          <div class="case-study__gallery-dots" role="tablist" aria-label="Image selection">
            ${images.map((_, i) => `
              <button
                class="case-study__gallery-dot${i === 0 ? ' is-active' : ''}"
                role="tab"
                aria-label="Image ${i + 1} of ${images.length}"
                data-index="${i}"
              ></button>
            `).join('')}
          </div>
        ` : ''}
      </div>

      <div class="case-study__body">
        <span class="case-study__category">${project.category[0].replace('-', '/')}</span>
        <h2 class="case-study__title">${project.title}</h2>
        <p class="case-study__desc">${project.description}</p>
        <div class="case-study__tech">
          ${project.tech.map((t) => `<span class="badge">${t}</span>`).join('')}
        </div>
        <div class="case-study__links">
          ${project.demoUrl ? `<a class="btn btn--primary" href="${project.demoUrl}" target="_blank" rel="noopener noreferrer"><i data-lucide="external-link" aria-hidden="true"></i> Live Demo</a>` : ''}
          ${project.codeUrl ? `<a class="btn btn--ghost" href="${project.codeUrl}" target="_blank" rel="noopener noreferrer"><i data-lucide="github" aria-hidden="true"></i> Source Code</a>` : ''}
        </div>
      </div>
    </div>
  `;

  // Wire gallery if multi-image
  if (hasGallery) {
    initModalGallery(modalEl, images.length);
  }

  // Wire close
  const closeBtn = modalEl.querySelector('.case-study__close');
  closeBtn.addEventListener('click', closeCaseStudy);

  // Backdrop click to close
  const backdrop = modalEl.querySelector('.case-study__backdrop');
  backdrop.addEventListener('click', closeCaseStudy);

  // Re-init Lucide icons inside modal
  if (typeof window.lucide !== 'undefined') {
    window.lucide.createIcons({ root: modalEl });
  }
}

/**
 * Gallery navigation inside the modal.
 * @param {HTMLElement} modal
 * @param {number} totalImages
 */
function initModalGallery(modal, totalImages) {
  const track = modal.querySelector('.case-study__gallery-track');
  const prevBtn = modal.querySelector('.case-study__gallery-btn--prev');
  const nextBtn = modal.querySelector('.case-study__gallery-btn--next');
  const dots = modal.querySelectorAll('.case-study__gallery-dot');
  let currentIndex = 0;
  let startX = 0;
  let isSwiping = false;

  function goTo(index) {
    index = ((index % totalImages) + totalImages) % totalImages;
    if (index === currentIndex) return;
    currentIndex = index;
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('is-active', i === currentIndex));
  }

  prevBtn.addEventListener('click', (e) => { e.stopPropagation(); goTo(currentIndex - 1); });
  nextBtn.addEventListener('click', (e) => { e.stopPropagation(); goTo(currentIndex + 1); });

  dots.forEach((dot) => {
    dot.addEventListener('click', (e) => {
      e.stopPropagation();
      goTo(Number(dot.dataset.index));
    });
  });

  // Swipe support
  const galleryMedia = modal.querySelector('.case-study__media');
  const onPointerDown = (e) => {
    isSwiping = true;
    startX = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
  };
  const onPointerUp = (e) => {
    if (!isSwiping) return;
    isSwiping = false;
    const endX = e.clientX ?? e.changedTouches?.[0]?.clientX ?? 0;
    const diff = startX - endX;
    if (Math.abs(diff) > 40) {
      goTo(diff > 0 ? currentIndex + 1 : currentIndex - 1);
    }
  };

  galleryMedia.addEventListener('mousedown', onPointerDown);
  galleryMedia.addEventListener('mouseup', onPointerUp);
  galleryMedia.addEventListener('mouseleave', () => { isSwiping = false; });
  galleryMedia.addEventListener('touchstart', onPointerDown, { passive: true });
  galleryMedia.addEventListener('touchend', onPointerUp, { passive: true });
}

/**
 * Locks or unlocks body scroll when modal is open.
 * @param {boolean} lock
 */
function lockBodyScroll(lock) {
  if (lock) {
    const scrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
    document.body.dataset.scrollY = String(scrollY);
  } else {
    const scrollY = Number(document.body.dataset.scrollY || 0);
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    document.body.dataset.scrollY = '';
    // Temporarily disable smooth scrolling to restore position instantly.
    const htmlEl = document.documentElement;
    const originalScrollBehavior = htmlEl.style.scrollBehavior;
    htmlEl.style.scrollBehavior = 'auto';
    window.scrollTo(0, scrollY);
    // Restore original scroll behavior after the scroll.
    htmlEl.style.scrollBehavior = originalScrollBehavior;
  }
}

// Handle popstate for back button behavior
function handlePopState(e) {
  // Only act if the state indicates a case study was open
  if (e.state && e.state.caseStudy) {
    if (ignorePopStateClose) {
      // This popstate was triggered by our own history.back() call
      ignorePopStateClose = false;
      return;
    }
    closeCaseStudy();
  }
}

// Global keyboard listener for Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && isOpen) {
    closeCaseStudy();
  }
});