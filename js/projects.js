/**
 * projects.js
 * Owns project data and renders project cards into the DOM.
 * Adding a new project = adding one object to PROJECTS below.
 */

/** @typedef {{id:string,title:string,category:string[],description:string,tech:string[],image?:string,demoUrl?:string,codeUrl?:string}} Project */

/** @type {Project[]} */
export const PROJECTS = [
  {
    id: 'proj-ai-ops',
    title: 'AI Ops Copilot',
    category: ['ai', 'backend', 'product'],
    description:
      'An internal copilot that reads infrastructure telemetry and drafts incident summaries, cutting mean time to diagnosis for on-call engineers.',
    tech: ['Node.js', 'NestJS', 'PostgreSQL', 'Redis', 'AI tools'],
    demoUrl: '#',
    codeUrl: '#',
  },
  {
    id: 'proj-fintrack',
    title: 'FinTrack Platform',
    category: ['fullstack', 'architecture'],
    description:
      'A multi-tenant financial reporting platform built for scale — event-driven services, role-based access, and real-time dashboards for enterprise clients.',
    tech: ['ASP.NET Core', 'React', 'Azure', 'Docker', 'PostgreSQL'],
    demoUrl: '#',
    codeUrl: '#',
  },
  {
    id: 'proj-commerce-ui',
    title: 'Storefront Design System',
    category: ['frontend', 'ui-ux'],
    description:
      'A component library and design system for a headless commerce storefront, built for consistency across five regional brand sites.',
    tech: ['Next.js', 'TypeScript', 'React'],
    demoUrl: '#',
    codeUrl: '#',
  },
  {
    id: 'proj-realtime-chat',
    title: 'Realtime Support Console',
    category: ['fullstack', 'backend'],
    description:
      'A support console with live chat, presence, and queueing built on WebSockets — designed to stay responsive under high concurrent load.',
    tech: ['Node.js', 'MongoDB', 'Redis', 'Docker'],
    codeUrl: '#',
  },
  {
    id: 'proj-vision-pipeline',
    title: 'Document Vision Pipeline',
    category: ['ai', 'architecture'],
    description:
      'An OCR and classification pipeline that ingests scanned documents and routes structured data into downstream business systems automatically.',
    tech: ['Python', 'AI tools', 'Azure', 'PostgreSQL'],
  },
  {
    id: 'proj-design-collab',
    title: 'Design-Engineering Handoff Tool',
    category: ['ui-ux', 'product'],
    description:
      'An internal tool that syncs design tokens from Figma directly into a shared codebase, keeping design and engineering in lockstep release after release.',
    tech: ['TypeScript', 'Next.js', 'React'],
    codeUrl: '#',
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
