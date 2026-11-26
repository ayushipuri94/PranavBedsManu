// Story page.
import { renderNav } from "../components/nav.js?v=1795676983";
import { storyTimeline } from "../components/story-timeline.js?v=1795676983";
import { mount } from "../lib/dom.js?v=1795676983";

renderNav();
mount("content", storyTimeline());
