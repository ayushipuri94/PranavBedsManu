// Centred heading block used at the top of the Story, Events, Travel and RSVP pages.
import { html, raw } from "../lib/dom.js?v=1795676983";

export const pageHero = ({ kicker, title, sub, extra = "" }) =>
  html`<div class="hero"><div class="kick">${kicker}</div><h1>${title}</h1>${
    sub ? raw(html`<p class="sub">${sub}</p>`) : ""
  }${raw(extra)}</div>`;

/** Yellow "still to do" note for placeholders. */
export const todo = (text, id = "") => (text ? html`<div class="todo"${raw(id ? ` id="${id}"` : "")}>${text}</div>` : "");
