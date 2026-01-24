// True infinite horizontal carousel (stable both directions)

const wrapper = document.querySelector(".projects-wrapper");
const grid = document.querySelector(".projects-grid");

if (wrapper && grid) {
  const originals = Array.from(grid.children);

  // Clone before and after (3 total sets)
  originals.forEach(card => {
    grid.appendChild(card.cloneNode(true));
  });
  originals.forEach(card => {
    grid.insertBefore(card.cloneNode(true), grid.firstChild);
  });

  // Width of ONE set
  const setWidth = grid.scrollWidth / 3;

  // Start in the middle set
  wrapper.scrollLeft = setWidth;

  let isResetting = false;
  const buffer = 50;

  wrapper.addEventListener("scroll", () => {
    if (isResetting) return;

    // Too far right → jump left
    if (wrapper.scrollLeft >= setWidth * 2 - buffer) {
      isResetting = true;
      wrapper.scrollLeft -= setWidth;
      requestAnimationFrame(() => (isResetting = false));
    }

    // Too far left → jump right
    else if (wrapper.scrollLeft <= buffer) {
      isResetting = true;
      wrapper.scrollLeft += setWidth;
      requestAnimationFrame(() => (isResetting = false));
    }
  });
}
