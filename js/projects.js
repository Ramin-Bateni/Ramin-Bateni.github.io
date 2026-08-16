/**
 * projects.js
 * Owns project data and renders project cards into the DOM.
 * Adding a new project = adding one object to PROJECTS below.
 */

import { openCaseStudy } from './case-study.js';

/**
 * Truncates a string to a maximum length, preserving whole words.
 * If the string is longer than `max`, it is cut at the last word
 * boundary before the limit, trimmed, and an ellipsis is appended.
 * @param {string} text
 * @param {number} max
 * @returns {string}
 */
function truncateText(text, max) {
  if (!text || text.length <= max) return text;
  const truncated = text.slice(0, max + 1); // +1 to include potential space
  const lastSpace = truncated.lastIndexOf(' ');
  const result = lastSpace > 0 ? truncated.slice(0, lastSpace) : truncated.slice(0, max);
  return result.trimEnd() + '…';
}

/** @typedef {{id:string,title:string,category:string[],description:string,tech:string[],image?:string,images?:string[],demoUrl?:string,codeUrl?:string}} Project */

/** @type {Project[]} */
export const PROJECTS = [
  {
    id: "proj-meta-trend",
    title: "AI Meta Trend Products",
    category: ["ai", "automation", "n8n", "fullstack", "architecture"],
    description:
      "A multi-agent pipeline that discovers trending Meta ad products from a user-defined search: a rate-limited backend crawler queries the Facebook Ads Library, deduplicates results, then hands each candidate to a chain of specialized AI agents — product images, pricing, estimated size/weight, review sentiment — before a final agent scores it as an investment opportunity. Enriched results stream to a live dashboard over SignalR, each product opening into a full gallery with side-by-side ad and product-page detail.",
    tech: [
      "AWS",
      "ASP.NET Core",
      "Angular",
      "n8n",
      "SignalR",
      "Facebook Ads API",
      "Multi-Agent AI",
    ],
    image: "assets/portfolio/01tech/01-meta-trend-products-frontend.png",
  },
  {
    id: "proj-n8n-meta-trend",
    title: "n8n Multi-Agent Workflow",
    category: ["n8n", "automation", "ai"],
    description:
      "A very large n8n workflow equipped with multi-agent AI for \"AI Meta Trend Products\" project: it analyzes and researches a wide range of products advertised on Meta/Facebook Ads, then digs into each product to analyze the information available on its own website. Built as part of the larger AI Meta Trend Products platform.",
    tech: [
      "n8n",
      "Multi-Agent AI",
      "Facebook Ads",
      "Web Analysis",
      "Redis",
      "PostgreSQL",
      "AWS EC2",
    ],
    image: "assets/portfolio/01tech/01-meta-trend-products-n8n-01.png",
  },
  {
    id: "proj-market-research",
    title: "AI Market Research Module",
    category: ["ai", "automation", "n8n", "fullstack"],
    description:
      "An AI-driven n8n workflow that surfaces trending products across Amazon and other major marketplaces, built to give clients an early read on what to source next.",
    tech: ["n8n", "AI Agents", "ASP.NET Core", "Git"],
    image: "assets/portfolio/01tech/01-market-research-ai_01.png",
  },
  {
    id: "proj-lead-finder",
    title: "AI Business Lead Finder",
    category: ["ai", "automation", "n8n", "fullstack"],
    description:
      "An n8n workflow that finds qualified business leads for a given industry and geographic area, using the Google Places API and AI-driven analysis of customer reviews.",
    tech: ["n8n", "Google Places API", "AI Agents"],
    image: "assets/portfolio/01tech/01-lead-finder-ai_01.png",
  },
  {
    id: "iln",
    title: "ILN - Life Manager Platform",
    category: ["full-stack"],
    image: "assets/portfolio/iln/iln_01.png",
    description:
      "Frontend-heavy full-stack development for a US-based web platform, working on complex UI components including nested modals and a real-time chat system built with JavaScript, HTML, CSS, and WebSockets, alongside backend development with .NET and Microsoft technologies.",
    tech: [
      "Azure",
      "JavaScript",
      "HTML",
      "CSS",
      "WebSockets",
      ".NET",
      "ASP.NET Core",
    ],
  },
  {
    id: "proj-nicshell-tment",
    title: "Nicshell Advanced Telegram Comment System",
    category: ["telegram", "fullstack"],
    description:
      "Advanced Telegram post comment system, combining beauty and efficiency using Telegram bot infrastructure and backend systems. Part of the Nicshell product suite.",
    tech: ["Telegram Bot API", "Node.js", "WebSockets", "React"],
    image: "assets/portfolio/nicshell/nicshell-tment_01.png",
  },
  {
    id: "nicode",
    title: "Nicode - Technical Leadership & Full-Stack",
    category: ["full-stack"],
    image: "assets/portfolio/nicode/nicode_01.png",
    description:
      "Technical lead and full-stack engineer leading a 15-person multidisciplinary team across frontend, backend, mobile, UI/UX, graphic design, and QA, organized into parallel teams working on multiple web and mobile products. I was involved in projects for insurance brokerage, vehicle-based freight, beauty services, and a large platform with three mobile apps and a web management panel, where I worked backend-heavy. I also conceived and designed Technico from the ground up based on market needs, developed its business plan, and helped turn the concept into a product that later attracted sponsorship. During my leadership, direct customer interactions reflected significantly higher satisfaction compared with the previous management period.",
    tech: [
      "Technical Leadership",
      "Full-Stack",
      "Backend",
      "Web",
      "Mobile",
      "UI/UX",
      "QA",
    ],
  },
  {
    id: "proj-nicshell-products",
    title: "Nicshell Creative Products",
    category: ["product", "design", "mobile"],
    description:
      "Creative products from Nicshell including Haftsin - a culturally rich WPF desktop application that brings Nowruz and ancient Iranian celebrations to your desktop, NicTic - an Android mobile app with beautiful widgets and birthdays/occasions, and NicMag - a cultural-scientific magazine published on Facebook, Instagram, and Telegram.",
    tech: ["WPF", "Android", "React", "Social Media Integration"],
    image: "assets/portfolio/nicshell/nicshell-02.png",
    images: [
      "assets/portfolio/nicshell/nicshell_02.png",
      "assets/portfolio/nicshell/nicshell_01.png",
    ],
  },
  {
    id: "proj-helperx",
    title: "Helperx - Telegram Scheduled Posting",
    category: ["telegram", "automation", "fullstack"],
    description:
      "The premier scheduled posting system for Telegram channels, combining precise Telegram bot functionality, backend, and modern frontend. Creative component for scheduling posts on a calendar interface.",
    tech: ["Telegram Bot API", "Node.js", "React", "Calendar UI"],
    image: "assets/portfolio/helperx/helperx-01.png",
    images: [
      "assets/portfolio/helperx/helperx-01.png",
      "assets/portfolio/helperx/helperx-02.png",
    ],
  },
  {
    id: "proj-counos",
    title: "Counos Crypto Wallet QA",
    category: ["mobile", "qa", "crypto", "code review"],
    description:
      "Comprehensive QA and testing of the Counos mobile wallet, a Swiss crypto product. Included Code review and Best Practice recommendations for React Native code. Covered API Testing, Manual Testing, and Regression Testing.",
    tech: ["React Native", "QA Testing", "API Testing", "Regression Testing"],
    image: "assets/portfolio/counos/counos-wallet-01.png",
  },
  {
    id: "couchino-ui-ux",
    title: "Couchino - Sports Social App",
    category: ["ui/ux"],
    image: "assets/portfolio/couchino/couchino-ui-ux_01.png",
    description:
      "UI/UX design for Couchino, a startup concept combining sports, fitness, and social networking in a mobile app.",
    tech: ["UI/UX", "Mobile Design", "Prototyping"],
  },
  {
    id: "proj-more-soon",
    title: "Various Web/Mobile Products (NDA)",
    category: ["product", "fullstack"],
    description:
      "I have worked on different Web/Mobile products during my experience. Due to NDA clearance, I cannot display all details. I will add more case studies as NDA clearance allows.",
    tech: [],
    image: "assets/portfolio/general.webp",
  },
];

/**
 * Returns all available images for a project.
 * If `images` is defined, it's used as-is (with `image` as the first item).
 * Otherwise falls back to `[image]` or empty array.
 * @param {Project} project
 * @returns {string[]}
 */
export function getProjectImages(project) {
  if (project.images && Array.isArray(project.images) && project.images.length > 0) {
    return project.images;
  }
  if (project.image) {
    return [project.image];
  }
  return [];
}

/**
 * Initialises in-card gallery: button clicks, dot clicks, touch swipe.
 * @param {HTMLElement} media - .project-card__media container
 * @param {number} totalImages
 */
function initCardGallery(media, totalImages) {
  const track = media.querySelector('.project-card__gallery-track');
  const prevBtn = media.querySelector('.project-card__gallery-btn--prev');
  const nextBtn = media.querySelector('.project-card__gallery-btn--next');
  const dots = media.querySelectorAll('.project-card__gallery-dot');
  let currentIndex = 0;
  let startX = 0;
  let isSwiping = false;

  function goTo(index) {
    // Infinite loop: wrap around using modulo
    index = ((index % totalImages) + totalImages) % totalImages;
    if (index === currentIndex) return;
    currentIndex = index;
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('is-active', i === currentIndex));
  }

  // Button navigation
  prevBtn?.addEventListener('click', (e) => { e.stopPropagation(); goTo(currentIndex - 1); });
  nextBtn?.addEventListener('click', (e) => { e.stopPropagation(); goTo(currentIndex + 1); });

  // Dot navigation
  dots.forEach((dot) => {
    dot.addEventListener('click', (e) => {
      e.stopPropagation();
      goTo(Number(dot.dataset.index));
    });
  });

  // Touch / pointer swipe
  const onPointerDown = (e) => {
    isSwiping = true;
    startX = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
  };

  const onPointerUp = (e) => {
    if (!isSwiping) return;
    isSwiping = false;
    const endX = e.clientX ?? e.changedTouches?.[0]?.clientX ?? 0;
    const diff = startX - endX;
    const threshold = 40;
    if (Math.abs(diff) > threshold) {
      goTo(diff > 0 ? currentIndex + 1 : currentIndex - 1);
    }
  };

  // Mouse events
  media.addEventListener('mousedown', onPointerDown);
  media.addEventListener('mouseup', onPointerUp);
  media.addEventListener('mouseleave', () => { isSwiping = false; });

  // Touch events
  media.addEventListener('touchstart', onPointerDown, { passive: true });
  media.addEventListener('touchend', onPointerUp, { passive: true });

  // Initial state: buttons always visible in infinite loop mode
  if (totalImages <= 1) {
    prevBtn?.classList.add('is-hidden');
    nextBtn?.classList.add('is-hidden');
  }
}

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

  const images = getProjectImages(project);
  const hasGallery = images.length > 1;

  const media = document.createElement('div');
  media.className = 'project-card__media';

  if (project.image) {
    if (hasGallery) {
      // Build in-card gallery
      media.classList.add('project-card__media--gallery');

      const track = document.createElement('div');
      track.className = 'project-card__gallery-track';

      images.forEach((src, i) => {
        const img = document.createElement('img');
        img.src = src;
        img.alt = `${project.title} — image ${i + 1} of ${images.length}`;
        img.loading = i === 0 ? 'eager' : 'lazy';
        img.decoding = 'async';
        img.dataset.index = String(i);
        track.appendChild(img);
      });

      media.appendChild(track);

      // Prev / Next buttons
      const prevBtn = document.createElement('button');
      prevBtn.className = 'project-card__gallery-btn project-card__gallery-btn--prev';
      prevBtn.setAttribute('aria-label', 'Previous image');
      prevBtn.innerHTML = '<i data-lucide="chevron-left" aria-hidden="true"></i>';

      const nextBtn = document.createElement('button');
      nextBtn.className = 'project-card__gallery-btn project-card__gallery-btn--next';
      nextBtn.setAttribute('aria-label', 'Next image');
      nextBtn.innerHTML = '<i data-lucide="chevron-right" aria-hidden="true"></i>';

      media.append(prevBtn, nextBtn);

      // Dot indicators
      const dots = document.createElement('div');
      dots.className = 'project-card__gallery-dots';
      dots.setAttribute('role', 'tablist');
      dots.setAttribute('aria-label', 'Image selection');

      images.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.className = 'project-card__gallery-dot' + (i === 0 ? ' is-active' : '');
        dot.setAttribute('role', 'tab');
        dot.setAttribute('aria-label', `Image ${i + 1} of ${images.length}`);
        dot.dataset.index = String(i);
        dots.appendChild(dot);
      });

      media.appendChild(dots);

      // Wire gallery navigation
      initCardGallery(media, images.length);
    } else {
      const img = document.createElement('img');
      img.src = project.image;
      img.alt = `${project.title} preview`;
      img.loading = 'lazy';
      img.decoding = 'async';
      media.appendChild(img);
    }
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
  desc.textContent = truncateText(project.description, 300);

  const tech = document.createElement('div');
  tech.className = 'project-card__tech';
  tech.append(...project.tech.map(createTechBadge));

  const hasCode = !!project.codeUrl;
  const hasDemo = !!project.demoUrl;
  let footer;
  if (hasCode || hasDemo) {
    footer = document.createElement('div');
    footer.className = 'project-card__footer';
    const links = document.createElement('div');
    links.className = 'project-card__links';
    if (hasCode) links.appendChild(createLinkIcon(project.codeUrl, 'github', 'View source code'));
    if (hasDemo) links.appendChild(createLinkIcon(project.demoUrl, 'external-link', 'View live demo'));
    footer.appendChild(links);
  }

  body.append(category, title, desc, tech);
  if (footer) body.append(footer);
  article.append(media, body);

  // Entire card click → Case Study (unless the click is on an interactive child)
  article.addEventListener('click', (e) => {
    // Ignore clicks on links, buttons, gallery controls, or any interactive element
    const target = /** @type {HTMLElement} */ (e.target);
    const interactive = target.closest('a, button, .project-card__gallery-btn, .project-card__gallery-dot, .project-card__gallery-track');
    if (interactive) return;
    openCaseStudy(project.id);
  });

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