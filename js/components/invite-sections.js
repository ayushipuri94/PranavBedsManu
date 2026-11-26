// The text cards that scroll over the animated scene on the invitation page.
import { COUPLE, DATES, VENUE, INVITE, mapsUrl } from "../config/wedding.js?v=1795676983";
import { DAYS } from "../config/events.js?v=1795676983";
import { html, raw } from "../lib/dom.js?v=1795676983";
import { boardingPass } from "./boarding-pass.js?v=1795676983";
import { countdownMarkup } from "./countdown.js?v=1795676983";

const ORNAMENT = `<svg class="orn" viewBox="0 0 140 14" fill="none" stroke="currentColor"><path d="M0 7h55M85 7h55"/><path d="M70 1l6 6-6 6-6-6z" fill="currentColor"/></svg>`;

const card = (inner, attrs = "") => `<section${attrs}>\n    <div class="card">${inner}</div>\n  </section>`;

const welcome = () => {
  const w = INVITE.welcome;
  return card(html`
      <span class="tag">${w.tag}</span>
      <h1>${w.title}</h1>
      <p class="lead lead-gap">${w.lead}</p>
      <div class="names">${COUPLE.short}</div>
      ${raw(ORNAMENT)}
      <p class="meta">${DATES.range}<br>${VENUE.name} · ${VENUE.city}</p>
      <div class="hint">${w.hint}</div>`, ` id="welcome"`);
};

const person = (p) => html`<div class="person"><div class="nm">${p.name}</div><div class="par">${p.parents}</div></div>`;

const captain = () => {
  const c = INVITE.captain;
  return card(html`
      <p class="hindi blessing">${c.blessing}</p>
      <span class="tag tag-gap">${c.tag}</span>
      <p class="lead">${c.lead}</p>
      ${raw(person(COUPLE.groom))}
      <div class="with">${c.joiner}</div>
      ${raw(person(COUPLE.bride))}`);
};

const destination = () => {
  const d = INVITE.destination;
  return card(html`
      <span class="tag">${d.tag}</span>
      <h2>${VENUE.name}</h2>
      <p class="lead">${VENUE.address}<br>${d.note}</p>
      <a class="btn" href="${mapsUrl()}" target="_blank" rel="noopener">${d.button}</a>`);
};

const countdown = () => {
  const c = INVITE.countdown;
  return card(html`
      <span class="tag">${c.tag}</span>
      ${raw(countdownMarkup(c.units))}
      <p class="lead lead-gap-lg">${c.note}</p>`);
};

const finale = () => {
  const f = INVITE.final;
  return card(html`
      <span class="tag">${f.tag}</span>
      <div class="names">${COUPLE.short}</div>
      <p class="lead">${f.note}</p>`, ` class="final"`);
};

/** All invitation sections, top to bottom. Reorder or add sections here. */
export const inviteSections = () =>
  [welcome(), captain(), ...DAYS.map(boardingPass), destination(), countdown(), finale()].join("\n") +
  `\n<div class="spacer"></div>`;
