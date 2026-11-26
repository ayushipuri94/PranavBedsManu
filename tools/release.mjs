// Release helper. Run from the repo root before pushing:
//   node tools/release.mjs
// 1. bumps the cache-busting version on every CSS/JS/image link,
// 2. writes each page's <title> and link-preview tags from js/config/wedding.js,
// 3. checks that no source file is longer than 150 lines.
import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join, extname } from "node:path";
import { pathToFileURL } from "node:url";

const ROOT = new URL("..", import.meta.url).pathname;
const MAX_LINES = 150;
const VERSION = String(Math.floor(Date.now() / 1000));

const walk = (dir) =>
  readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    if (f.startsWith(".") || f === "assets") return [];
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
const files = walk(ROOT).filter((f) => [".html", ".css", ".js", ".mjs"].includes(extname(f)));

const esc = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
const { NAV, SHARE } = await import(pathToFileURL(join(ROOT, "js/config/wedding.js")) + `?t=${VERSION}`);

function metaFor(page) {
  const nav = NAV.find((n) => n.href === page);
  const tags = [`<title>${esc(nav?.title ?? SHARE.title)}</title>`, `<meta name="description" content="${esc(SHARE.description)}">`];
  if (page === "index.html") {
    tags.push(`<meta property="og:title" content="${esc(SHARE.title)}">`,
      `<meta property="og:description" content="${esc(SHARE.text)}">`,
      `<meta property="og:image" content="${SHARE.image}?v=${VERSION}">`);
  }
  return tags.join("\n");
}

let tooLong = [];
for (const file of files) {
  if (file.endsWith("release.mjs")) continue;
  let src = readFileSync(file, "utf8");
  const before = src;
  src = src.replace(/\?v=\d+/g, `?v=${VERSION}`);
  if (file.endsWith(".js")) {
    // version every relative import so browsers fetch fresh modules after a release
    src = src.replace(/(from\s+["'])(\.{1,2}\/[^"'?]+\.js)(\?v=\d+)?(["'])/g, `$1$2?v=${VERSION}$4`);
  }
  if (file.endsWith("version.js")) src = src.replace(/VERSION = "[^"]*"/, `VERSION = "${VERSION}"`);
  if (file.endsWith(".html")) {
    const page = file.split("/").pop();
    src = src.replace(/(<!-- meta:start[^>]*-->)[\s\S]*?(<!-- meta:end -->)/, `$1\n${metaFor(page)}\n$2`);
  }
  if (src !== before) writeFileSync(file, src);
  const lines = src.split("\n").length;
  if (lines > MAX_LINES) tooLong.push(`${file.replace(ROOT, "")} (${lines} lines)`);
}

console.log(`Released version ${VERSION} (${files.length} files).`);
if (tooLong.length) {
  console.warn(`Files over ${MAX_LINES} lines, please split them:\n  ` + tooLong.join("\n  "));
  process.exitCode = 1;
}
