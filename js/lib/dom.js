// DOM helpers: element lookup, safe HTML templating and asset URLs.
import { VERSION } from "../version.js?v=1795676983";

export const $ = (id) => document.getElementById(id);

/** Escape text for safe use inside HTML. */
export const esc = (s = "") =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

/** Tagged template: html`<p>${text}</p>` escapes values; wrap with raw() to skip escaping. */
export function html(strings, ...vals) {
  return strings.reduce((out, s, i) => {
    if (i >= vals.length) return out + s;
    const v = vals[i];
    const str = Array.isArray(v) ? v.join("") : v?.__raw ? v.value : esc(v ?? "");
    return out + s + str;
  }, "");
}
export const raw = (value) => ({ __raw: true, value });

/** URL for an image in assets/, with cache-busting version. */
export const asset = (name, ext = "webp") => `assets/${name}.${ext}?v=${VERSION}`;

/** Render HTML into an element (by id or element). */
export function mount(target, markup) {
  const el = typeof target === "string" ? $(target) : target;
  el.innerHTML = markup;
  return el;
}

/** Set several style properties at once; numbers get "px". */
export function css(el, props) {
  for (const [k, v] of Object.entries(props)) el.style[k] = typeof v === "number" ? v + "px" : v;
}

/** Percent-box inline style string from { left, top, width, height }. */
export const pctBox = (b) =>
  `left:${b.left}%;top:${b.top}%;width:${b.width}%;height:${b.height}%`;
