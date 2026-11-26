// ─────────────────────────────────────────────────────────────
//  STORY TIMING & MOTION. Every value is a fraction of page scroll
//  (0 = top, 1 = bottom) unless noted. Tweak to change pacing.
// ─────────────────────────────────────────────────────────────

export const TIMELINE = {
  sunset: [0.26, 0.48],    // day → sunset colours
  night: [0.56, 0.76],     // sunset → night colours
  sunSets: [0.18, 0.56],   // sun sinks behind the hills
  moonFade: [0.46, 0.6],
  moonRise: [0.5, 0.8],
  stars: [0.6, 0.82],
  darkText: 0.36,          // text switches to light colours
  flight: { start: 0.02, length: 0.82 },
  hop: [0.845, 0.865],     // Pranav hops out
  walk: [0.865, 0.935],    // walks to Manu
  hug: [0.935, 0.965],
  hearts: 0.955,
  // these two are fractions of the flight itself (0 = take-off, 1 = landed)
  pilotLooksRight: 0.86,
  manuLooksAtHim: 0.86,
};

// Sky gradient stops per phase: [top, middle, horizon]
export const SKY = {
  day: ["#a9d8f5", "#c4e5f8", "#e4f3fb"],
  sunset: ["#b8a9dc", "#e7b8cf", "#f8cdb4"],
  night: ["#5b6aa8", "#7a86bf", "#9ea6d3"],
};

export const LAYOUT = {
  portraitBelow: 1.1,      // width/height ratio under which the phone layout is used
  portraitArtHeight: 0.70, // painting fills this much of a phone screen
  portraitManuX: 0.74,     // Manu's position across a phone screen
  horizonY: 600,           // panel px
  sunDrop: 720,            // panel px the sun sinks
  moon: { size: 0.2, min: 84, max: 170, right: 0.07, topPhone: 0.24, topDesktop: 0.07, low: 560 },
  plane: { scale: 0.8, maxPhoneWidth: 0.95, landBehindManu: 0.82, landY: 905, minLeft: 0.08 },
  walkerHeight: 0.87,      // × Manu's height
  hugHeightRef: 650,
  // stage marks, as fractions of Manu's width unless noted
  marks: { manuCentre: 0.45, manuEyeLevel: 120 /* panel px */, walkFrom: 0.02, walkTo: 0.22, walkerAnchor: 0.92,
           minWalkerX: 4 /* px */, hugAt: 0.6, hugAnchor: 0.62, heartsAt: 0.25, heartsAbove: 20 /* px */, heartDelay: 0.45 },
};

// Flight path: three legs (right across the top, back left, then into the landing).
// x values are fractions of screen width, y of screen height.
export const FLIGHT_PATH = {
  startX: 0.14, topDesktop: 0.14, topPhone: 0.12, topPhoneArt: 0.10,
  leg1: { c1x: 0.5, c2x: 0.92, c2y: -0.02, x: 0.9, y: 0.14 },
  leg2: { c1x: 0.88, c1y: 0.28, swingX: 0.16, swingBack: 0.28, swingDepth: 0.55, c2dx: 0.25, c2dy: -0.12 },
  leg3: { c1dx: -0.06, c1dy: 0.06, approach: 0.3 },
};

export const MOTION = {
  smoothing: 7,            // how quickly the scene catches up with the scroll
  cloudScroll: 0.35, cloudTime: 0.012, cloudMargin: 60,
  plane: { startZoom: 0.55, zoomCurve: 1.4, maxBank: 18, bankIn: [0.04, 0.16], bob: 3, bobPeriod: 420,
           lookAhead: 60, turnAt: 25, turnEase: 0.12, settleAt: 0.97 },
  arm: { swing: 13, period: 55 },
  manuLean: 0.12,
  walk: { step: 18, bob: 5, rock: 2.5, legSwing: 11, legPeriod: 22 },
  nightBrightness: 0.9, nightSaturation: 0.88, duskShare: 0.4,
  sunGlow: { base: 0.65, add: 0.5, hue: -25 },
};
