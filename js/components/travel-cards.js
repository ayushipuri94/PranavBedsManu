// Travel page: one card per section (venue, flights, trains, stay, help).
import { TRAVEL } from "../config/pages.js?v=1795676983";
import { mapsUrl } from "../config/wedding.js?v=1795676983";
import { html, raw } from "../lib/dom.js?v=1795676983";
import { pageHero, todo } from "./page-hero.js?v=1795676983";

const section = (s) => {
  const heading = s.big ? html`<h2>${s.heading}</h2>` : html`<h3>${s.heading}</h3>`;
  const button = s.maps
    ? html`<p class="card-actions"><a class="btn" href="${mapsUrl()}" target="_blank" rel="noopener">${s.button}</a></p>`
    : "";
  return html`<div class="card"><div class="kick">${s.kicker}</div>${raw(heading)}\n<p>${s.text}</p>${raw(button)}${raw(
    s.todo ? "\n" + todo(s.todo) : ""
  )}</div>\n`;
};

export const travelCards = () => pageHero(TRAVEL) + "\n" + TRAVEL.sections.map(section).join("");
