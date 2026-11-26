// Events page: every day and event with time, dress code and a note.
import { DAYS, EVENTS_PAGE as E } from "../config/events.js?v=1795676983";
import { VENUE, mapsUrl } from "../config/wedding.js?v=1795676983";
import { html, raw } from "../lib/dom.js?v=1795676983";
import { pageHero, todo } from "./page-hero.js?v=1795676983";

const eventCard = (ev) => html`<div class="card ev"><div class="time">${ev.time}</div><div><h3>${ev.name}</h3>${
  ev.dress ? raw(html`<div class="dc"><b>${E.dressLabel}</b> ${ev.dress}</div>`) : ""
}<p>${ev.note}</p></div></div>`;

const daySection = (d) =>
  html`<section class="day"><div class="dayh"><h2>${d.weekday}</h2><span>${d.date}</span></div>${d.events.map(eventCard)}</section>`;

export function eventList() {
  const actions = html`<p class="hero-actions"><a class="btn" href="${mapsUrl()}" target="_blank" rel="noopener">${E.directions}</a>
&nbsp;<button class="btn ghost" data-print>${E.print}</button></p>`;
  const sub = html`<p class="sub">All events are at <b>${VENUE.name}</b>, ${VENUE.address}</p>`;
  return (
    pageHero({ kicker: E.kicker, title: E.title, extra: "\n" + sub + "\n" + actions }) +
    DAYS.map(daySection).join("") +
    todo(E.todo)
  );
}

export const wirePrint = (root) =>
  root.querySelectorAll("[data-print]").forEach((b) => b.addEventListener("click", () => window.print()));
