// Travel & stay page.
import { renderNav } from "../components/nav.js?v=1795676983";
import { travelCards } from "../components/travel-cards.js?v=1795676983";
import { mount } from "../lib/dom.js?v=1795676983";

renderNav();
mount("content", travelCards());
