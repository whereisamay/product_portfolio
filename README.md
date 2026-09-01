# Amay Prabhu — Product Portfolio

A minimal, dependency-free personal portfolio site. No build step — it's
plain HTML/CSS/JS, so it can be deployed anywhere that serves static files.

## Structure

```
index.html                 Page markup (hero, about, experience, skills, contact)
css/style.css               Styles, light/dark theme via CSS variables
js/main.js                  Theme toggle, mobile nav, scroll-reveal animation
assets/                     Static files (resume PDF, etc.)
presentation/index.html     Hub page linking to each case study deck
presentation/hub.css
presentation/shared.css     Shared deck styling (Google Slides–style engine)
presentation/shared.js      Shared deck navigation logic
presentation/<project>/index.html   One folder per case study deck
```

## Local preview

Any static file server works, e.g.:

```
npx serve .
# or
python3 -m http.server 8000
```

Then open the printed URL in a browser.

## Deploying

Pick whichever is easiest for you — all are zero-config since this is a
static site with `index.html` at the repo root.

**Vercel**
1. Import this repo at vercel.com/new.
2. Framework preset: "Other". No build command needed.
3. Deploy.

**Netlify**
1. "Add new site" → "Import an existing project" → pick this repo.
2. Build command: (leave blank). Publish directory: `.`
3. Deploy.

**GitHub Pages**
1. Repo Settings → Pages → Source: `Deploy from a branch`.
2. Branch: this branch, folder: `/ (root)`.
3. Save — the site publishes at `https://<user>.github.io/<repo>/`.

## Updating content

- Experience, skills, and copy live directly in `index.html`.
- Swap `assets/Amay_Prabhu_Resume.pdf` to update the downloadable resume
  (keep the same filename, or update the `href` in the "Resume" button).
- Colors and fonts are CSS variables at the top of `css/style.css`.

## Presentation / case study decks

`presentation/index.html` is a hub page linking out to one self-contained,
keyboard- and swipe-navigable slide deck per project (styled to match the
main site). Each deck lives in its own folder and shares `shared.css` /
`shared.js` from `presentation/`.

Current decks:
- `presentation/partner-analytics-dashboard/`
- `presentation/payments-agent/`
- `presentation/outdoor-activity-tracking/`

- Edit the slide copy directly in each deck's `index.html` — placeholder
  text is wrapped in `[brackets]` for slides not yet filled in.
- To embed a solution recording on the video slide, replace the `iframe`'s
  `src="about:blank"` with a YouTube/Vimeo/Loom embed URL (or swap the
  `iframe` for a `<video controls src="…mp4">` tag).
- Navigate with the on-screen arrows/dots, arrow keys, spacebar, or swipe on
  mobile. The theme toggle is synced with the main portfolio page.
- To add a new deck: duplicate an existing project folder, update its
  content and `#slideTotal`, then add a card for it in `presentation/index.html`.
- The homepage's project carousel now links directly to each of the three
  decks above.

## Next steps (not in this skeleton)

- Custom domain + DNS once a host is chosen.
- Case studies / project deep-dives if you want to expand beyond the
  experience timeline.
- Analytics (e.g. Plausible/GA) if you want visit data.
