/**
 * filters.js
 * Wires up the category filter pills to show/hide project cards
 * with a small fade/scale transition. No framework, no re-render —
 * it just toggles classes on the already-rendered cards.
 */

const HIDE_DELAY_MS = 220;

/**
 * @param {HTMLElement} filterBar container holding .filter-pill buttons
 * @param {HTMLElement} grid container holding .project-card elements
 * @param {HTMLElement} emptyState element shown when a filter matches nothing
 */
export function initFilters(filterBar, grid, emptyState) {
  if (!filterBar || !grid) return;

  filterBar.addEventListener('click', (event) => {
    const pill = event.target.closest('.filter-pill');
    if (!pill) return;

    setActivePill(filterBar, pill);
    applyFilter(grid, pill.dataset.filter, emptyState);
  });
}

/**
 * @param {HTMLElement} filterBar
 * @param {HTMLElement} activePill
 */
function setActivePill(filterBar, activePill) {
  filterBar.querySelectorAll('.filter-pill').forEach((pill) => {
    pill.classList.toggle('is-active', pill === activePill);
    pill.setAttribute('aria-pressed', String(pill === activePill));
  });
}

/**
 * @param {HTMLElement} grid
 * @param {string} filterValue e.g. "all", "ai", "frontend"
 * @param {HTMLElement} emptyState
 */
function applyFilter(grid, filterValue, emptyState) {
  const cards = Array.from(grid.querySelectorAll('.project-card'));
  let visibleCount = 0;

  cards.forEach((card) => {
    const categories = card.dataset.category?.split(' ') ?? [];
    const matches = filterValue === 'all' || categories.includes(filterValue);

    if (matches) {
      visibleCount += 1;
      card.classList.remove('is-filtering-out');
      card.classList.remove('is-hidden');
    } else {
      card.classList.add('is-filtering-out');
      window.setTimeout(() => card.classList.add('is-hidden'), HIDE_DELAY_MS);
    }
  });

  if (emptyState) {
    emptyState.classList.toggle('is-visible', visibleCount === 0);
  }
}
