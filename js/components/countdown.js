// Live countdown boxes (days / hours / minutes / seconds).
import { html } from "../lib/dom.js?v=1795676983";

export const countdownMarkup = (units) =>
  html`<div class="countdown">${units.map((u) => html`<div class="cd"><b>0</b><small>${u}</small></div>`)}</div>`;

/** Start ticking every .countdown inside root toward the ISO date `target`. */
export function startCountdown(root, target) {
  const end = new Date(target);
  const cells = [...root.querySelectorAll(".countdown b")];
  const tick = () => {
    const s = Math.max(0, (end - Date.now()) / 1000);
    const parts = [Math.floor(s / 86400), Math.floor((s % 86400) / 3600), Math.floor((s % 3600) / 60), Math.floor(s % 60)];
    cells.forEach((c, i) => (c.textContent = parts[i % 4]));
  };
  tick();
  setInterval(tick, 1000);
}
