// Manu (waving, watching the plane), Pranav walking over, the hug and the hearts.
import { MANU, HEART } from "../config/scene.js?v=1795676983";
import { TIMELINE as T, MOTION as M, LAYOUT as L } from "../config/motion.js?v=1795676983";
import { clamp, lerp, smoothIn } from "../lib/math.js?v=1795676983";
import { $ } from "../lib/dom.js?v=1795676983";
import { flightT } from "./plane.js?v=1795676983";

const K = L.marks;

export function createCharacters(plane) {
  const manu = $("manu"), arm = manu.querySelector(".arm");
  const faceUpLeft = $("hManu"), faceUpRight = $("hManuR"), faceLevel = $("hManuL");
  const walker = $("walker"), legF = $("legF"), legB = $("legB");
  const hug = $("hug"), hearts = $("hearts");
  const heartSvg = `<svg viewBox="0 0 24 24"><path d="${HEART.path}" fill="${HEART.color}" stroke="${HEART.outline}" stroke-width="1.3"/></svg>`;

  function layout(S) {
    hearts.innerHTML = "";
    for (let i = 0; i < HEART.count; i++) {
      const h = document.createElement("div");
      h.className = "heart";
      h.innerHTML = heartSvg;
      h.style.left = S.mx + S.manuW * K.heartsAt + (i - (HEART.count - 1) / 2) * HEART.spacing + "px";
      h.style.top = S.my - K.heartsAbove + "px";
      h.style.animationDelay = i * K.heartDelay + "s";
      hearts.appendChild(h);
    }
  }

  /** Manu's face follows the plane; after landing she looks level at Pranav. */
  function updateManu(S) {
    manu.style.transform = `translate(${S.mx}px,${S.my}px)`;
    manu.style.filter = S.filter;
    const t = flightT(S.p);
    const headX = S.mx + S.manuW * K.manuCentre;
    const lp = plane.pointAt(S, t);
    const right = lp.x > headX ? 1 : 0;
    const lean = clamp((Math.atan2(lp.x - headX, Math.max(40, S.my + K.manuEyeLevel * S.sc - lp.y)) * 180) / Math.PI, -40, 40);
    const level = t > T.manuLooksAtHim ? 1 : 0;
    const tilt = `rotate(${(-lean * M.manuLean * (1 - level)).toFixed(2)}deg)`;
    faceUpLeft.style.opacity = ((1 - right) * (1 - level)).toFixed(3);
    faceUpRight.style.opacity = (right * (1 - level)).toFixed(3);
    faceLevel.style.opacity = level.toFixed(3);
    faceUpLeft.style.transform = tilt + " scaleX(-1)";
    faceUpRight.style.transform = tilt;
    arm.style.transform = `rotate(${Math.sin(S.sy / M.arm.period) * M.arm.swing}deg)`;
  }

  /** Pranav walks from the plane to Manu, legs swinging, then they hug. */
  function updateEnding(S) {
    const W = M.walk;
    const hop = smoothIn(T.hop, S.p), walkT = smoothIn(T.walk, S.p), hugT = smoothIn(T.hug, S.p);
    const ww = walker.offsetWidth, wh = walker.offsetHeight;
    const feetY = S.my + MANU.h * S.sc;
    const x0 = Math.max(S.land.x + S.pw * K.walkFrom, K.minWalkerX);
    const x1 = S.mx + S.manuW * K.walkTo - ww * K.walkerAnchor;
    const walking = walkT > 0 && walkT < 1;
    const step = walking ? S.sy / W.step : 0;
    walker.style.transform =
      `translate(${lerp(x0, Math.max(x0, x1), walkT)}px,${feetY - wh - Math.abs(Math.sin(step)) * W.bob}px) rotate(${Math.sin(step) * W.rock}deg)`;
    walker.style.opacity = hop * (1 - hugT);
    walker.style.filter = S.filter;
    const swing = walking ? Math.sin(S.sy / W.legPeriod) * W.legSwing : 0;
    legF.style.transform = `rotate(${swing.toFixed(2)}deg)`;
    legB.style.transform = `rotate(${(-swing).toFixed(2)}deg)`;

    manu.style.opacity = 1 - hugT;
    const hw = hug.offsetWidth, hh = hug.offsetHeight;
    hug.style.transform = `translate(${S.mx + S.manuW * K.hugAt - hw * K.hugAnchor}px,${feetY - hh}px)`;
    hug.style.opacity = hugT;
    hug.style.filter = S.filter;

    const on = S.p > T.hearts;
    if (String(on) !== hearts.dataset.on) {
      hearts.dataset.on = on;
      hearts.querySelectorAll(".heart").forEach((h) => h.classList.toggle("go", on));
    }
  }

  return { layout, update: (S) => { updateManu(S); updateEnding(S); } };
}
