// Events page: the whole schedule on one simple, printable page.
import { renderNav } from "../components/nav.js?v=1795676983";
import { eventList, wirePrint } from "../components/event-list.js?v=1795676983";
import { mount } from "../lib/dom.js?v=1795676983";

renderNav();
wirePrint(mount("content", eventList()));
