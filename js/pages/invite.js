// Invitation page: animated scene + scrolling cards.
import { renderNav } from "../components/nav.js?v=1795676983";
import { inviteSections } from "../components/invite-sections.js?v=1795676983";
import { revealOnScroll } from "../components/reveal.js?v=1795676983";
import { startCountdown } from "../components/countdown.js?v=1795676983";
import { DATES } from "../config/wedding.js?v=1795676983";
import { mount } from "../lib/dom.js?v=1795676983";
import { startScene } from "../scene/index.js?v=1795676983";

renderNav();
const main = mount("content", inviteSections());
startCountdown(main, DATES.departure);
revealOnScroll();
startScene();
