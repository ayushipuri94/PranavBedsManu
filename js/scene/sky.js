// Day → sunset → night: sky gradient, landscape colour layers, sun, moon and stars.
import { SKY, TIMELINE as T, LAYOUT as L, MOTION as M } from "../config/motion.js?v=1795676983";
import { clamp, lerp, smoothIn, mixColor } from "../lib/math.js?v=1795676983";
import { $ } from "../lib/dom.js?v=1795676983";

/** Sky colour for stop i (0 top, 1 middle, 2 horizon) given sunset k1 and night k2. */
const skyStop = (k1, k2, i) =>
  k2 > 0 ? mixColor(SKY.sunset[i], SKY.night[i], k2) : mixColor(SKY.day[i], SKY.sunset[i], k1);

export function createSky() {
  const ph1 = [...document.querySelectorAll(".ph1")];
  const ph2 = [...document.querySelectorAll(".ph2")];
  const stage = $("stage"), sun = $("sun"), moon = $("moon"), stars = $("stars");

  return function updateSky(S) {
    const { p } = S;
    const k1 = smoothIn(T.sunset, p), k2 = smoothIn(T.night, p);
    S.dusk = k1; S.night = k2;

    ph1.forEach((e) => (e.style.opacity = k1));
    ph2.forEach((e) => (e.style.opacity = k2));

    const horizon = S.oy + L.horizonY * S.sc;
    const [c0, c1, c2] = [0, 1, 2].map((i) => skyStop(k1, k2, i));
    stage.style.background =
      `linear-gradient(to bottom, ${c0} 0px, ${c1} ${Math.max(horizon * 0.55, 0)}px, ${c2} ${horizon}px, ${c2} 100%)`;
    document.documentElement.style.background = c0;

    sun.style.transform = `translateY(${smoothIn(T.sunSets, p) * L.sunDrop * S.sc}px)`;
    const g = M.sunGlow;
    sun.style.filter = `saturate(${(g.base + k1 * g.add).toFixed(2)}) brightness(1.08) hue-rotate(${g.hue * k1}deg)`;

    // moon: pinned to the screen's top-right so it shows on every device, rising over the hills
    const m = L.moon, { W, H } = S;
    const ms = clamp(Math.min(W, H) * m.size, m.min, m.max);
    moon.style.width = ms + "px"; moon.style.height = ms + "px";
    const top = S.portrait ? H * m.topPhone : Math.max(H * m.topDesktop, 20);
    const y = lerp(S.oy + m.low * S.sc, top, smoothIn(T.moonRise, p));
    moon.style.transform = `translate(${W - ms - W * m.right}px,${y}px)`;
    moon.style.opacity = smoothIn(T.moonFade, p);
    stars.style.opacity = smoothIn(T.stars, p);

    // shared light filter for the characters
    const bright = lerp(1, M.nightBrightness, Math.max(k1 * M.duskShare, k2));
    S.filter = `brightness(${bright.toFixed(3)}) saturate(${lerp(1, M.nightSaturation, k2).toFixed(3)})`;
    document.body.classList.toggle("dark", p > T.darkText);
  };
}
