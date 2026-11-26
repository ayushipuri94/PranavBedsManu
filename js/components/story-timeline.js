// Story page: a vertical "flight log" timeline of chapters.
import { STORY } from "../config/pages.js?v=1795676983";
import { html, raw, asset } from "../lib/dom.js?v=1795676983";
import { pageHero } from "./page-hero.js?v=1795676983";

const photo = (c) => {
  if (c.photo === undefined) return "";
  if (!c.photo) return `<div class="ph">Photo</div>`;
  const [name, ext] = c.photo.split(/\.(?=[^.]+$)/);
  return html`<img class="ph" src="${asset("story/" + name, ext)}" alt="${c.title}">`;
};

const chapter = (c) =>
  html`<div class="card"><div class="when">${c.when}</div><h3>${c.title}</h3><p>${c.text}</p>${raw(photo(c))}</div>`;

export const storyTimeline = () =>
  pageHero(STORY) + html`\n<div class="tl">\n ${STORY.chapters.map((c) => chapter(c) + "\n ")}</div>`;
