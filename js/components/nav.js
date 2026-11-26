// Top menu shared by every page. Highlights the current page.
import { NAV } from "../config/wedding.js?v=1795676983";
import { html } from "../lib/dom.js?v=1795676983";

export function renderNav(target = document.querySelector("[data-nav]")) {
  const here = location.pathname.split("/").pop() || "index.html";
  target.outerHTML = html`<nav class="nav"><div class="in">${NAV.map(
    (p) => html`<a href="${p.href}"${p.href === here ? " class=on" : ""}>${p.label}</a>`
  )}</div></nav>`;
}
