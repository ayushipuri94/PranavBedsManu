// Small maths helpers shared by the scene modules.

export const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
export const lerp = (a, b, t) => a + (b - a) * t;

/** Smoothstep of v between edges a and b (0 → 1 with eased ends). */
export const smooth = (a, b, v) => {
  const t = clamp((v - a) / (b - a));
  return t * t * (3 - 2 * t);
};
/** smooth() taking a [from, to] pair, e.g. smoothIn(TIMELINE.hug, p). */
export const smoothIn = ([a, b], v) => smooth(a, b, v);

const hex = (c) => [1, 3, 5].map((i) => parseInt(c.slice(i, i + 2), 16));

/** Mix two #rrggbb colours, returning an rgb() string. */
export const mixColor = (a, b, t) => {
  const x = hex(a), y = hex(b);
  return "rgb(" + x.map((v, i) => Math.round(v + (y[i] - v) * t)).join(",") + ")";
};
