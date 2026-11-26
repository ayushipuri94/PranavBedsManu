// Boarding-pass card for one day of the itinerary (used on the invitation).
import { html, raw } from "../lib/dom.js?v=1795676983";
import { LEG_LABEL } from "../config/events.js?v=1795676983";

function rows(day) {
  return day.events.map((ev) =>
    ev.inItinerary === false
      ? ev.itineraryNote ? html`<div class="row"><span class="small">${ev.itineraryNote}</span></div>` : ""
      : html`<div class="row"><span class="ev">${ev.name}</span><span class="t">${ev.time}</span></div>`
  );
}

export const boardingPass = (day, i) => html`<section>
    <div class="card">
      <span class="tag">${LEG_LABEL(i)}</span>
      <h2>${day.leg}</h2>
      <div class="pass">
        <div class="stub"><span class="d">${day.day}</span><span class="m">${day.month}</span><span class="w">${day.weekday}</span></div>
        <div class="body">${raw(rows(day).join(""))}</div>
      </div>
    </div>
  </section>`;
