# Pranav & Manu · Wedding Website

Live at **https://ayushipuri94.github.io/PranavBedsManu/**. It's a plain static site with no build step, hosted on GitHub Pages.

## Editing content: you only touch `js/config/`

| I want to change… | Edit |
|---|---|
| Names, parents, dates, venue, invitation wording, menu, tab titles, link-preview text | `js/config/wedding.js` |
| Days, events, times, dress codes (invitation boarding passes, Events page **and** RSVP checkboxes) | `js/config/events.js` |
| Story chapters, Travel sections, RSVP labels, WhatsApp number, RSVP deadline | `js/config/pages.js` |
| Scroll pacing (when sunset/night/landing/hug happen), sky colours, flight path, motion | `js/config/motion.js` |
| Which images are used and where they sit (clouds, heads, propeller…) | `js/config/scene.js` |
| Colours, fonts | `css/tokens.css` |

Text in `[brackets]` is still a placeholder.

**Examples**
- *Add an event:* add `{ time, name, dress, note }` to a day in `events.js`. It appears on the invitation, the Events page and the RSVP form.
- *Add a day:* add a new object to `DAYS`. A new boarding pass ("Leg IV") is created automatically.
- *Story photo:* put the file in `assets/story/` and set `photo: "first-date.jpg"` on that chapter.
- *Turn on RSVPs:* set `RSVP.whatsapp` in `pages.js` (country code + number, e.g. `"919812345678"`).

## Publishing a change

```bash
node tools/release.mjs   # bumps cache versions, writes <title>/preview tags, checks file sizes
git add -A && git commit -m "…" && git push
```
GitHub Pages updates in 1–2 minutes. `release.mjs` gives every file a new version tag, so phones load the new files instead of cached ones.

## How the code is organised

```
index.html, story.html, events.html, travel.html, rsvp.html   ← tiny shells; content is rendered from config
css/
  tokens.css         colours, fonts (shared)
  nav.css            top menu
  invite-base.css    invitation layout & type
  invite-cards.css   text cards over the scene (boarding pass, countdown…)
  scene.css          sky, stars, clouds, landscape layers
  sprites.css        characters, heads, propeller, hearts
  page-*.css         content pages (base + one per page)
js/
  config/            ← all content and tunable numbers (see table above)
  lib/               dom.js (html templating, asset URLs), math.js (clamp, smooth, colour mix)
  components/        nav, boarding-pass, countdown, invite-sections, event-list,
                     story-timeline, travel-cards, rsvp-form, page-hero, reveal
  scene/             the animation, split by responsibility:
                       build.js      creates the stage elements from config/scene.js
                       layout.js     fits the painting to the screen, sizes sprites
                       sky.js        day → sunset → night, sun, moon, stars
                       clouds.js     drifting clouds
                       plane.js      flight path, banking, zoom, parked plane
                       characters.js Manu, Pranav walking, the hug, hearts
                       index.js      shared state + one animation loop
  pages/             one entry file per page (wires components together)
  version.js         cache-busting version (set by the release tool)
assets/scene, assets/plane, assets/people   images, grouped by what they are
tools/release.mjs    release helper
```

**Conventions**
- No content or magic numbers in components or scene code; they read from `js/config/`.
- Every source file stays under 150 lines (`release.mjs` warns if one grows past that).
- To add a new invitation section, write a function in `components/invite-sections.js` and add it to the list at the bottom.
- To add a new page, copy one of the page shells, add an entry in `js/pages/`, and add it to `NAV` in `wedding.js`.

## Running locally

ES modules need a web server (opening the file directly won't work):
```bash
python3 -m http.server 8000   # then open http://localhost:8000
```
