// The plane: flight path, banking, zoom and the parked plane after landing.
import { TIMELINE as T, MOTION as M, FLIGHT_PATH as F } from "../config/motion.js?v=1795676983";
import { clamp, lerp, smooth, smoothIn } from "../lib/math.js?v=1795676983";
import { $ } from "../lib/dom.js?v=1795676983";

const SVG = "http://www.w3.org/2000/svg";

/** Progress through the flight (0 = take-off, 1 = landed) for page progress p. */
export const flightT = (p) => clamp((p - T.flight.start) / T.flight.length);

export function createPlane() {
  const plane = $("plane"), parked = $("planeEmpty");
  const pilot = $("hPlane"), pilotSide = $("hPlane2");
  const path = document.createElementNS(SVG, "path");
  let face = -1; // 1 = nose right, -1 = nose left (art faces left)

  /** Three legs: right across the top, back left, then right into the landing. */
  function layout(S) {
    const { W, H, land } = S;
    const top = S.portrait ? Math.max(S.oy + S.ih * F.topPhoneArt, H * F.topPhone) : H * F.topDesktop;
    const a = F.leg1, b = F.leg2, c = F.leg3;
    const x2 = Math.min(W * b.swingX, land.x - W * b.swingBack), y2 = top + (land.y - top) * b.swingDepth;
    path.setAttribute("d", `M${W * F.startX},${top}
      C${W * a.c1x},${top} ${W * a.c2x},${top + H * a.c2y} ${W * a.x},${top + H * a.y}
      C${W * b.c1x},${top + H * b.c1y} ${x2 + W * b.c2dx},${y2 + H * b.c2dy} ${x2},${y2}
      C${x2 + W * c.c1dx},${y2 + H * c.c1dy} ${land.x - W * c.approach},${land.y} ${land.x},${land.y}`);
    S.pathLen = path.getTotalLength();
  }

  /** Point on the flight path at flight progress t (used by Manu to look at the plane). */
  const pointAt = (S, t) => path.getPointAtLength(t * S.pathLen);

  function update(S, now) {
    const P = M.plane, t = flightT(S.p), L = t * S.pathLen;
    const pt = path.getPointAtLength(L);
    const a = path.getPointAtLength(Math.max(0, L - 3)), b = path.getPointAtLength(Math.min(S.pathLen, L + 3));
    const dx = b.x - a.x, dy = b.y - a.y;
    // decide facing from a wide look-ahead so it turns only on real direction changes
    const fa = path.getPointAtLength(Math.max(0, L - P.lookAhead));
    const fb = path.getPointAtLength(Math.min(S.pathLen, L + P.lookAhead));
    const fdx = fb.x - fa.x;
    const want = t >= P.settleAt ? 1 : fdx > P.turnAt ? 1 : fdx < -P.turnAt ? -1 : face >= 0 ? 1 : -1;
    face += (want - face) * P.turnEase;

    let ang = (Math.atan2(dy, Math.abs(dx) || 1) * 180) / Math.PI;
    ang = clamp(ang, -P.maxBank, P.maxBank) * (t >= 1 ? 0 : 1) * smoothIn(P.bankIn, t);
    const bob = t < 1 ? Math.sin(now / P.bobPeriod) * P.bob : 0;
    const pw = plane.offsetWidth, ph = plane.offsetHeight;
    // far away = small, grows as it comes closer; art faces left, so mirror when flying right
    const z = lerp(P.startZoom, 1, smooth(0, 1, t) ** P.zoomCurve);
    plane.style.transform =
      `translate(${pt.x - pw / 2}px,${pt.y - ph / 2 + bob}px) rotate(${ang * face}deg) scale(${(-face * z).toFixed(3)},${z.toFixed(3)})`;
    plane.style.filter = S.filter;

    const side = t > T.pilotLooksRight ? 1 : 0; // pilot turns to look at Manu after the last turn
    pilotSide.style.opacity = side; pilot.style.opacity = 1 - side;

    // Pranav hops out: swap to the parked (empty) plane
    const hop = smoothIn(T.hop, S.p);
    plane.style.opacity = 1 - hop;
    const eW = parked.offsetWidth, eH = parked.offsetHeight;
    parked.style.transform = `translate(${S.land.x - eW / 2}px,${S.land.y - eH / 2}px) scaleX(-1)`;
    parked.style.opacity = hop;
    parked.style.filter = S.filter;
  }

  return { layout, update, pointAt };
}
