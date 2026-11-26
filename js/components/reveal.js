// Fades cards in as they scroll into view (adds/removes the "on" class).
export function revealOnScroll(selector = ".card", threshold = 0.25) {
  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => e.target.classList.toggle("on", e.isIntersecting)),
    { threshold }
  );
  document.querySelectorAll(selector).forEach((el) => io.observe(el));
}
