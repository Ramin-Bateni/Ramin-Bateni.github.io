# Ramin Bateni Parvar — Portfolio

A premium, dark-futuristic personal portfolio built with plain HTML5, CSS3, and
vanilla JavaScript (ES6 modules). No build step, no framework — deploy as-is.

## Structure

```
├── index.html
├── css/
│   ├── main.css          # tokens, reset, base type, layout helpers
│   ├── components.css    # nav, buttons, badges, cards, filters
│   ├── sections.css       # hero/about/expertise/projects/experience/contact
│   └── animations.css     # keyframes, reveal states
├── js/
│   ├── main.js             # entry point — wires everything together
│   ├── projects.js         # project data + card rendering (edit here to add projects)
│   ├── filters.js           # category filter logic
│   ├── animations.js        # nav scroll state, mobile menu, scroll reveal
│   └── space-background.js  # lightweight Three.js aurora background
├── robots.txt
└── sitemap.xml
```

## Editing your content

- **Projects** — open `js/projects.js` and add an object to the `PROJECTS` array.
  Leave out `image` to automatically get the text-only card variant.
- **Experience timeline** — edit the `.timeline__item` blocks in `index.html`.
- **About panel facts** — edit the `.about__row` items in `index.html`.
- **Social links / email** — update the `href` values in the nav, hero, and contact section.
- **Hero visual** — add your photo/banner as
  `assets/Ramin-Bateni-Parvar_Senior-FullStack-Engineer_hero-banner.jpg`.
  The `<img>` and `.hero__media` styling are already wired up in
  `index.html` / `css/sections.css` — the column shows automatically once
  the file exists, and stays hidden if it doesn't.

## Running locally

No build tools needed. From this folder:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

or, with Node installed:

```bash
npx serve .
```

## Deploying to GitHub Pages

1. Create a new GitHub repository (e.g. `portfolio` or `<your-username>.github.io`
   if you want it at the root of your GitHub Pages domain).
2. Push this folder's contents to the repository's default branch (`main`):

   ```bash
   cd portfolio
   git init
   git add .
   git commit -m "Initial portfolio site"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```

3. In the repository, go to **Settings → Pages**.
4. Under **Build and deployment**, set **Source** to `Deploy from a branch`.
5. Choose branch `main` and folder `/ (root)`, then **Save**.
6. GitHub will publish the site at:
   - `https://<your-username>.github.io/<repo-name>/` (project site), or
   - `https://<your-username>.github.io/` (if the repo is named `<your-username>.github.io`)

It can take a minute or two for the first deployment to go live.

### Before you publish

- Replace the placeholder `mailto:hello@raminbatenip.dev`, GitHub, and LinkedIn
  links with your real ones (nav, hero is unaffected, contact section, footer).
- Update `<link rel="canonical">` and the Open Graph tags in `index.html` with
  your actual GitHub Pages URL once you know it.
- Optionally add a real favicon and an `assets/og-cover.jpg` social preview image.

## Notes on the background effect

`space-background.js` loads Three.js from a CDN only when a WebGL context is
available; otherwise it removes the canvas and falls back to the plain dark
background — no errors, no broken page. It also respects
`prefers-reduced-motion` (renders one static frame instead of animating) and
pauses rendering when the tab isn't visible.
