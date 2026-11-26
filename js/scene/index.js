// The animated invitation scene: builds the stage, then runs one
// animation loop that hands the shared state to each module.
import { MOTION as M } from "../config/motion.js?v=1795676983";
import { clamp } from "../lib/math.js?v=1795676983";
import { $ } from "../lib/dom.js?v=1795676983";
import { buildStage } from "./build.js?v=1795676983";
import { layout } from "./layout.js?v=1795676983";
import { createSky } from "./sky.js?v=1795676983";
import { createClouds } from "./clouds.js?v=1795676983";
import { createPlane } from "./plane.js?v=1795676983";
import { createCharacters } from "./characters.js?v=1795676983";

export function startScene() {
  buildStage($("stage"));

  const clouds = createClouds();
  const sky = createSky();
  const plane = createPlane();
  const people = createCharacters(plane);

  // Shared state: screen fit (set by layout) + scroll progress.
  // pT = target progress from the scroll bar, p = smoothed progress used for drawing.
  const S = { p: 0, pT: 0, sy: 0 };

  function relayout() {
    layout(S);
    clouds.layout(S);
    plane.layout(S);
    people.layout(S);
  }

  function readScroll() {
    S.sy = scrollY;
    const max = document.documentElement.scrollHeight - innerHeight;
    S.pT = max > 0 ? clamp(S.sy / max) : 0;
  }

  let last = performance.now();
  function frame() {
    const now = performance.now();
    const dt = Math.min(0.1, (now - last) / 1000);
    last = now;
    S.p += (S.pT - S.p) * (1 - Math.exp(-dt * M.smoothing));
    sky(S);
    clouds.update(S, now);
    people.update(S);
    plane.update(S, now);
    requestAnimationFrame(frame);
  }

  relayout();
  readScroll();
  S.p = S.pT;
  addEventListener("scroll", readScroll, { passive: true });
  let timer;
  addEventListener("resize", () => {
    clearTimeout(timer);
    timer = setTimeout(() => { relayout(); readScroll(); }, 120);
  });
  requestAnimationFrame(frame);
}
