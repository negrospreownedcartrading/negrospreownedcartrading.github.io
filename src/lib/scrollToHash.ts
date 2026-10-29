// Smooth-scroll to an in-page section (e.g. "#units").
// iPhone Safari can snap back to where you started when the browser's own smooth anchor
// jump meets the page's scroll locking (scroll-snap), so we turn snapping off just for
// the jump, glide there ourselves, then turn it back on.
export function scrollToHash(hash: string) {
  const target = document.querySelector<HTMLElement>(hash);
  if (!target) return;
  const html = document.documentElement;
  const margin = parseFloat(getComputedStyle(target).scrollMarginTop) || 0;
  const top = Math.max(0, target.getBoundingClientRect().top + window.scrollY - margin);

  html.style.scrollSnapType = "none";
  let restored = false;
  const restore = () => {
    if (restored) return;
    restored = true;
    window.removeEventListener("scrollend", restore);
    html.style.scrollSnapType = "";
  };
  window.addEventListener("scrollend", restore);
  setTimeout(restore, 1200); // browsers without "scrollend"

  window.scrollTo({ top, behavior: "smooth" });
  history.replaceState(null, "", hash);
}
