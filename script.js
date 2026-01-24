// TRUE infinite horizontal carousel (stable both directions)
const wrapper = document.querySelector(".projects-wrapper");
const grid = document.querySelector(".projects-grid");
if (wrapper && grid) {
  const originalCards = Array.from(grid.children);
  // Clone BEFORE
  originalCards.forEach(card => {
    grid.insertBefore(card.cloneNode(true), grid.firstChild);
  });
  // Clone AFTER
  originalCards.forEach(card => {
    grid.appendChild(card.cloneNode(true));
  });
  // Width of ONE full set
  const setWidth = grid.scrollWidth / 3;
  // Start in the middle set
  wrapper.scrollLeft = setWidth;
  let isJumping = false;
  const buffer = 10; // REDUCED - prevents hitting browser edges
  wrapper.addEventListener("scroll", () => {
    if (isJumping) return;
    // Too far LEFT → jump right
    if (wrapper.scrollLeft <= buffer) {
      isJumping = true;
      wrapper.scrollLeft += setWidth;
      requestAnimationFrame(() => (isJumping = false));
    }
    // Too far RIGHT → jump left
    else if (wrapper.scrollLeft >= setWidth * 2 - buffer) {
      isJumping = true;
      wrapper.scrollLeft -= setWidth;
      requestAnimationFrame(() => (isJumping = false));
    }
  });
}
