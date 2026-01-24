// Infinite horizontal carousel logic

const wrapper = document.querySelector(".projects-wrapper");
const grid = document.querySelector(".projects-grid");

if (wrapper && grid) {
  const originalCards = Array.from(grid.children);

  // Clone BEFORE and AFTER
  originalCards.forEach(card => {
    grid.appendChild(card.cloneNode(true));
  });
  originalCards.forEach(card => {
    grid.insertBefore(card.cloneNode(true), grid.firstChild);
  });

  const singleSetWidth = grid.scrollWidth / 3;

  // Start in the middle set
  wrapper.scrollLeft = singleSetWidth;

  let isResetting = false;

  wrapper.addEventListener("scroll", () => {
    if (isResetting) return;

    const buffer = 20;

    // Too far right → jump back to middle
    if (wrapper.scrollLeft >= singleSetWidth * 2 - buffer) {
      isResetting = true;
      wrapper.scrollLeft -= singleSetWidth;
      requestAnimationFrame(() => (isResetting = false));
    }

    // Too far left → jump forward to middle
    else if (wrapper.scrollLeft <= buffer) {
      isResetting = true;
      wrapper.scrollLeft += singleSetWidth;
      requestAnimationFrame(() => (isResetting = false));
    }
  });
}
