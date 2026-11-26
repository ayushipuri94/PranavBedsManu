// Fits the painting to the screen and sizes every sprite.
// Results are written onto the shared scene state `S`.
import { PANEL, MANU, SPRITES } from "../config/scene.js?v=1795676983";
import { LAYOUT as L } from "../config/motion.js?v=1795676983";
import { clamp } from "../lib/math.js?v=1795676983";
import { $, css } from "../lib/dom.js?v=1795676983";

const sizeOf = (id) => SPRITES.find((s) => s.id === id).size;

/** Panel px → screen px helpers bound to the current fit. */
export const toScreen = (S) => ({
  x: (px) => S.ox + px * S.sc,
  y: (py) => S.oy + py * S.sc,
});

export function layout(S) {
  const W = (S.W = innerWidth), H = (S.H = innerHeight);
  S.portrait = W / H < L.portraitBelow;
  // landscape: cover the screen. portrait: art fills the lower part, sky colour above
  S.sc = S.portrait
    ? Math.max(W / PANEL.w, (H * L.portraitArtHeight) / PANEL.h)
    : Math.max(W / PANEL.w, H / PANEL.h);
  const iw = PANEL.w * S.sc, ih = PANEL.h * S.sc;
  S.ih = ih;
  S.oy = H - ih;
  const manuCx = MANU.x + MANU.w * L.marks.manuCentre;
  S.ox = clamp(S.portrait ? W * L.portraitManuX - manuCx * S.sc : (W - iw) / 2, W - iw, 0);

  // backdrop layers are placed by their panel box
  document.querySelectorAll("#stage .art").forEach((el) => {
    const [x, y, w, h] = el.dataset.box.split(",").map(Number);
    css(el, { left: S.ox + x * S.sc, top: S.oy + y * S.sc, width: w * S.sc, height: h * S.sc });
  });

  // Manu
  const at = toScreen(S);
  S.mx = at.x(MANU.x); S.my = at.y(MANU.y);
  S.manuW = MANU.w * S.sc; S.manuH = MANU.h * S.sc;
  css($("manu"), { width: S.manuW, height: S.manuH });

  // plane + landing spot (just left of Manu, wheels on the grass)
  const [pW, pH] = sizeOf("plane");
  const ps = S.portrait ? Math.min(L.plane.scale * S.sc, (W * L.plane.maxPhoneWidth) / pW) : L.plane.scale * S.sc;
  S.pw = pW * ps; S.ph = pH * ps;
  css($("plane"), { width: S.pw, height: S.ph });
  S.land = { x: S.mx - S.pw * L.plane.landBehindManu, y: at.y(L.plane.landY) - S.ph * 0.5 };
  S.land.x = Math.max(S.land.x, S.pw * L.plane.minLeft);

  const [eW, eH] = sizeOf("planeEmpty");
  css($("planeEmpty"), { width: S.pw, height: (S.pw * eH) / eW });

  // walker is a little taller than Manu; the hug is scaled to match him
  const [wW, wH] = sizeOf("walker"), [hW, hH] = sizeOf("hug");
  const walkerH = S.manuH * L.walkerHeight;
  css($("walker"), { width: (walkerH * wW) / wH, height: walkerH });
  const hugH = (walkerH * hH) / L.hugHeightRef;
  css($("hug"), { width: (hugH * hW) / hH, height: hugH });
}
