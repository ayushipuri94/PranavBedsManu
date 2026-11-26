// RSVP page.
import { renderNav } from "../components/nav.js?v=1795676983";
import { rsvpForm, wireRsvp } from "../components/rsvp-form.js?v=1795676983";
import { mount, $ } from "../lib/dom.js?v=1795676983";

renderNav();
mount("content", rsvpForm());
wireRsvp($("rsvp"));
