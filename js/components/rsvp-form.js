// RSVP form: collects answers and opens WhatsApp with them pre-filled.
import { RSVP } from "../config/pages.js?v=1795676983";
import { DAYS } from "../config/events.js?v=1795676983";
import { COUPLE } from "../config/wedding.js?v=1795676983";
import { html, raw } from "../lib/dom.js?v=1795676983";
import { pageHero, todo } from "./page-hero.js?v=1795676983";

const L = RSVP.labels;
const rsvpEvents = () => DAYS.flatMap((d) => d.events).filter((e) => e.rsvp !== false).map((e) => e.name);

const row = (label, field) => html`<div class="row"><label class="t">${label}</label>${raw(field)}</div>`;
const choice = (value) => html`<label><input type="radio" name="coming" value="${value}"${raw(value === L.yes ? " required" : "")}><span>${value}</span></label>`;
const check = (name) => html`<label><input type="checkbox" name="ev" value="${name}" checked> ${name}</label>`;

export function rsvpForm() {
  const fields = [
    row(L.name, html`<input type="text" name="name" required placeholder="${L.namePlaceholder}">`),
    row(L.coming, html`<div class="yn">${[L.yes, L.no].map(choice)}</div>`),
    row(L.guests, html`<input type="number" name="guests" min="1" max="${RSVP.maxGuests}" value="1">`),
    row(L.events, html`<div class="chk">${rsvpEvents().map(check)}</div>`),
    row(L.diet, html`<input type="text" name="diet" placeholder="${L.dietPlaceholder}">`),
    row(L.note, `<textarea name="msg" rows="3"></textarea>`),
  ];
  return (
    pageHero({ kicker: RSVP.kicker, title: RSVP.title, sub: `Kindly respond by ${RSVP.deadline}` }) +
    html`\n<form class="card" id="rsvp">${raw(fields.join(""))}
 <button class="btn" type="submit" id="send">${L.send}</button>
 <p class="note help">${L.help}</p>
 ${raw(RSVP.whatsapp ? "" : todo(L.todo))}
</form>`
  );
}

/** Build the WhatsApp message from the form and open it. */
export function wireRsvp(form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const d = new FormData(form);
    const lines = [
      `RSVP · ${COUPLE.short}`, `Name: ${d.get("name")}`, `Coming: ${d.get("coming")}`, `Guests: ${d.get("guests")}`,
      `Events: ${d.getAll("ev").join(", ") || "-"}`, `Diet: ${d.get("diet") || "-"}`, `Note: ${d.get("msg") || "-"}`,
    ];
    if (!RSVP.whatsapp) { form.querySelector("#send").textContent = L.sendDisabled; return; }
    window.open(`https://wa.me/${RSVP.whatsapp}?text=${encodeURIComponent(lines.join("\n"))}`, "_blank");
  });
}
