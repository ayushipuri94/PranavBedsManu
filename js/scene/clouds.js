// Drifting clouds: they move with the scroll and slowly on their own,
// wrapping around the screen while fully out of view.
import { CLOUD_ART, CLOUDS } from "../config/scene.js?v=1795676983";
import { MOTION as M } from "../config/motion.js?v=1795676983";
import { $, asset } from "../lib/dom.js?v=1795676983";

export function createClouds() {
  const holder = $("clouds");
  const els = CLOUDS.map(({ art }) => {
    const d = document.createElement("div");
    d.className = "cloud";
    d.innerHTML = ["day", "sunset", "night"]
      .map((ph, i) => `<img${i ? ` class="ph${i}"` : ""} src="${asset(`scene/cloud-${art}-${ph}`)}" alt="">`)
      .join("");
    holder.appendChild(d);
    return d;
  });

  function layout(S) {
    els.forEach((d, j) => {
      const { art, k } = CLOUDS[j], [w, h] = CLOUD_ART[art];
      d.style.width = w * k * S.sc + "px";
      d.style.height = h * k * S.sc + "px";
    });
  }

  function update(S, now) {
    const drift = S.sy * M.cloudScroll + now * M.cloudTime;
    const margin = M.cloudMargin;
    els.forEach((d, j) => {
      const { x, y, flip, speed } = CLOUDS[j], cw = d.offsetWidth;
      const span = S.W + cw + margin * 2;
      let cx = S.ox + x * S.sc - drift * speed;
      cx = ((cx + cw + margin) % span + span) % span - cw - margin;
      d.style.transform = `translate(${cx}px,${S.oy + y * S.sc}px) scaleX(${flip})`;
    });
  }

  return { layout, update };
}
