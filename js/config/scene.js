// ─────────────────────────────────────────────────────────────
//  SCENE ARTWORK: what is drawn where.
//  Positions are in the pixels of the original 1680×944 painting
//  ("panel"); sprite parts are % of their own sprite box.
// ─────────────────────────────────────────────────────────────

export const PANEL = { w: 1680, h: 944 };

// Static backdrop layers, back to front. phase: 1 = sunset copy, 2 = night copy
export const BACKDROP = [
  { id: "sun", src: "scene/sun", box: [1349, 0, 283, 214] },
  { slot: "moon" },
  { slot: "clouds" },
  { src: "scene/land-day", box: [0, 0, 1680, 944] },
  { src: "scene/land-sunset", box: [0, 0, 1680, 944], phase: 1 },
  { src: "scene/land-night", box: [0, 0, 1680, 944], phase: 2 },
];

// Cloud art sizes (panel px) and the drifting copies: art, x, y, scale, flip, speed
export const CLOUD_ART = [[990, 265], [369, 136], [726, 150]];
export const CLOUDS = [
  { art: 0, x: 1185, y: 210, k: 1, flip: 1, speed: 1 },
  { art: 1, x: 464, y: 471, k: 1, flip: 1, speed: 0.7 },
  { art: 2, x: 1316, y: 489, k: 0.9, flip: 1, speed: 0.8 },
  { art: 0, x: -150, y: 330, k: 0.6, flip: -1, speed: 0.55 },
  { art: 1, x: 900, y: 150, k: 0.8, flip: -1, speed: 0.9 },
  { art: 2, x: 120, y: 540, k: 0.7, flip: 1, speed: 0.6 },
  { art: 1, x: 1500, y: 90, k: 0.55, flip: 1, speed: 1.1 },
];

// Where Manu stands in the panel
export const MANU = { x: 920, y: 380, w: 230, h: 555 };

// Propeller: disc box + static spinner, as % of the plane sprite
const PROPELLER = (speed) => ({
  type: "propeller", speed,
  disc: { left: -1.905, top: 2.158, width: 33.333, height: 67.146 },
  spinner: { left: 11.429, top: 30.456, width: 6.071, height: 9.592 },
});

// Characters / props. size = native art px (aspect ratio). parts render in order.
export const SPRITES = [
  { id: "plane", size: [840, 417], parts: [
    { src: "plane/plane-body", fill: true, z: 2 },
    PROPELLER("fast"),
    { id: "hPlane2", src: "people/head-p-walk", head: true, flip: true, hidden: true, z: 1,
      box: { left: 46.90, top: -9.11, width: 13.87, height: 40.80 } },
    { id: "hPlane", src: "people/head-p-plane", head: true, flip: true, z: 1,
      box: { left: 47.62, top: -8.15, width: 13.26, height: 40.79 } },
  ] },
  { id: "manu", size: [230, 555], parts: [
    { src: "people/manu-body", fill: true },
    { id: "arm", src: "people/manu-arm", fill: true, wrap: "arm", origin: "31.3% 25.6%" },
    { id: "hManu", src: "people/head-m-wave", head: true, box: { left: 29.57, top: 10.45, width: 47.91, height: 27.03 } },
    { id: "hManuR", src: "people/head-m-upright", head: true, hidden: true, box: { left: 28.70, top: 10.45, width: 46.90, height: 27.03 } },
    { id: "hManuL", src: "people/head-m-left", head: true, hidden: true, box: { left: 26.96, top: 11.17, width: 43.43, height: 26.31 } },
  ] },
  { id: "planeEmpty", size: [840, 417], parts: [
    { src: "plane/plane-empty", fill: true },
    PROPELLER("slow"),
  ] },
  { id: "walker", size: [418, 700], parts: [
    { id: "legB", src: "people/walker-legB", fill: true, leg: true },
    { id: "legF", src: "people/walker-legF", fill: true, leg: true },
    { src: "people/walker-torso", fill: true, z: 2 },
    { id: "hWalk", src: "people/head-p-walk", head: true, z: 1, box: { left: 33.97, top: -7.43, width: 35.95, height: 31.34 } },
  ] },
  { id: "hug", size: [423, 711], parts: [
    { src: "people/hug-body", fill: true },
    { id: "hHugM", src: "people/head-m-hug", head: true, box: { left: 19.86, top: -5.06, width: 28.13, height: 24.19 } },
    { id: "hHugP", src: "people/head-p-hug", head: true, box: { left: -1.89, top: 3.94, width: 25.04, height: 18.85 } },
  ] },
];

export const HEART = {
  count: 6, spacing: 16, color: "#ff7aa2", outline: "#1d1a1a",
  path: "M12 21s-7.5-4.6-10-9.3C.4 8.4 2.3 4 6.3 4c2.3 0 3.9 1.3 5.7 3.3C13.8 5.3 15.4 4 17.7 4c4 0 5.9 4.4 4.3 7.7C19.5 16.4 12 21 12 21z",
};
