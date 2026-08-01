/**
 * projects.js
 * Owns project data and renders project cards into the DOM.
 * Adding a new project = adding one object to PROJECTS below.
 */

/** @typedef {{id:string,title:string,category:string[],description:string,tech:string[],image?:string,demoUrl?:string,codeUrl?:string}} Project */

/** @type {Project[]} */
export const PROJECTS = [
  {
    id: 'proj-meta-trend',
    title: 'AI Meta Trend Products',
    category: ['ai', 'automation', 'fullstack', 'architecture'],
    description:
      'A multi-agent pipeline that discovers trending Meta ad products from a user-defined search: a rate-limited backend crawler queries the Facebook Ads Library, deduplicates results, then hands each candidate to a chain of specialized AI agents — product images, pricing, estimated size/weight, review sentiment — before a final agent scores it as an investment opportunity. Enriched results stream to a live dashboard over SignalR, each product opening into a full gallery with side-by-side ad and product-page detail.',
    tech: ['ASP.NET Core', 'Angular', 'n8n', 'SignalR', 'Facebook Ads API', 'Multi-Agent AI'],
  },
  {
    id: 'proj-market-research',
    title: 'AI Market Research Module',
    category: ['ai', 'automation'],
    description:
      'An AI-driven n8n workflow that surfaces trending products across Amazon and other major marketplaces, built to give clients an early read on what to source next.',
    tech: ['n8n', 'AI Agents', 'Web Scraping'],
  },
  {
    id: 'proj-lead-finder',
    title: 'AI Business Lead Finder',
    category: ['ai', 'automation'],
    description:
      'An n8n workflow that finds qualified business leads for a given industry and geographic area, using the Google Places API and AI-driven analysis of customer reviews.',
    tech: ['n8n', 'Google Places API', 'AI Agents'],
  },
  {
    id: 'proj-more-soon',
    title: 'More Case Studies — Coming Soon',
    category: ['product'],
    description:
      'Additional products and modules from ZeroOneTech and other engagements, added here as NDA clearance allows.',
    tech: [],
  },
];

/**
 * Builds the DOM node for a single project card.
 * Chooses the image variant or the text-only variant automatically.
 * @param {Project} project
 * @returns {HTMLElement}
 */
function createProjectCard(project) {
  const article = document.createElement('article');
  article.className = 'card project-card';
  article.dataset.category = project.category.join(' ');
  article.setAttribute('data-aos', 'fade-up');

  const media = document.createElement('div');
  media.className = 'project-card__media';

  if (project.image) {
    const img = document.createElement('img');
    img.src = project.image;
    img.alt = `${project.title} preview`;
    img.loading = 'lazy';
    img.decoding = 'async';
    media.appendChild(img);
  } else {
    const glyph = document.createElement('div');
    glyph.className = 'project-card__glyph';
    glyph.innerHTML = '<i data-lucide="terminal-square" aria-hidden="true"></i>';
    media.appendChild(glyph);
  }

  const body = document.createElement('div');
  body.className = 'project-card__body';

  const category = document.createElement('span');
  category.className = 'project-card__category';
  category.textContent = project.category[0].replace('-', '/');

  const title = document.createElement('h3');
  title.className = 'project-card__title';
  title.textContent = project.title;

  const desc = document.createElement('p');
  desc.className = 'project-card__desc';
  desc.textContent = project.description;

  const tech = document.createElement('div');
  tech.className = 'project-card__tech';
  tech.append(...project.tech.map(createTechBadge));

  const footer = document.createElement('div');
  footer.className = 'project-card__footer';

  const links = document.createElement('div');
  links.className = 'project-card__links';
  if (project.codeUrl) links.appendChild(createLinkIcon(project.codeUrl, 'github', 'View source code'));
  if (project.demoUrl) links.appendChild(createLinkIcon(project.demoUrl, 'external-link', 'View live demo'));

  const cta = document.createElement('a');
  cta.className = 'project-card__cta';
  cta.href = project.demoUrl || project.codeUrl || '#contact';
  cta.innerHTML = 'Case Study <i data-lucide="arrow-right" aria-hidden="true"></i>';

  footer.append(links, cta);
  body.append(category, title, desc, tech, footer);
  article.append(media, body);

  return article;
}

/** @param {string} label */
function createTechBadge(label) {
  const span = document.createElement('span');
  span.className = 'badge';
  span.textContent = label;
  return span;
}

/**
 * @param {string} href
 * @param {string} icon lucide icon name
 * @param {string} label accessible label
 */
function createLinkIcon(href, icon, label) {
  const a = document.createElement('a');
  a.href = href;
  a.target = '_blank';
  a.rel = 'noopener noreferrer';
  a.setAttribute('aria-label', label);
  a.innerHTML = `<i data-lucide="${icon}" aria-hidden="true"></i>`;
  return a;
}

/**
 * Renders all projects into the given container.
 * @param {HTMLElement} container
 * @param {Project[]} [projects]
 */
export function renderProjects(container, projects = PROJECTS) {
  const fragment = document.createDocumentFragment();
  projects.forEach((project) => fragment.appendChild(createProjectCard(project)));
  container.replaceChildren(fragment);
}
