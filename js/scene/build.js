// Builds the animated stage's DOM from the scene config.
// Nothing here knows about timing; it only creates elements.
import { BACKDROP, SPRITES } from "../config/scene.js?v=1795676983";
import { asset, pctBox, html, raw } from "../lib/dom.js?v=1795676983";

const img = (src, attrs = "") => `<img src="${asset(src)}" alt=""${attrs}>`;

function propellerMarkup(p) {
  return html`<div class="propwrap" style="${pctBox(p.disc)}"><div class="disc">${raw(
    img("plane/prop-front", ` class="prop${p.speed === "slow" ? " slow" : ""}"`)
  )}</div></div>${raw(img("plane/spinner", ` class="spinner" style="${pctBox(p.spinner)}"`))}`;
}

function partMarkup(part) {
  if (part.type === "propeller") return propellerMarkup(part);
  const cls = [part.fill && "fill", part.head && "head", part.flip && "flip", part.leg && "leg", part.z && `z${part.z}`]
    .filter(Boolean).join(" ");
  const style = [part.box && pctBox(part.box), part.hidden && "opacity:0"].filter(Boolean).join(";");
  const attrs = (part.id && !part.wrap ? ` id="${part.id}"` : "") + (cls ? ` class="${cls}"` : "") + (style ? ` style="${style}"` : "");
  const tag = img(part.src, attrs);
  return part.wrap ? `<div class="${part.wrap}" style="transform-origin:${part.origin}">${tag}</div>` : tag;
}

const spriteMarkup = (s) => `<div id="${s.id}" class="sprite">${s.parts.map(partMarkup).join("")}</div>`;

function backdropMarkup(layer) {
  if (layer.slot === "moon") return img("scene/moon", ` id="moon"`);
  if (layer.slot === "clouds") return `<div id="clouds"></div>`;
  const cls = ["art", layer.phase && `ph${layer.phase}`].filter(Boolean).join(" ");
  return img(layer.src, `${layer.id ? ` id="${layer.id}"` : ""} class="${cls}" data-box="${layer.box.join(",")}"`);
}

/** Fill #stage with stars, backdrop layers, characters and the hearts container. */
export function buildStage(stage) {
  stage.innerHTML = [
    `<div id="stars"></div>`,
    ...BACKDROP.map(backdropMarkup),
    ...SPRITES.map(spriteMarkup),
    `<div id="hearts"></div>`,
  ].join("\n");
}
