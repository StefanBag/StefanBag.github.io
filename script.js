// Infinite horizontal carousel logic

const wrapper = document.querySelector(".projects-wrapper");
const grid = document.querySelector(".projects-grid");

if (wrapper && grid) {
  // Duplicate all project cards
  const cards = Array.from(grid.children);
  cards.forEach(card => {
    const clone = card.cloneNode(true);
    grid.appendChild(clone);
  });

  // Set initial scroll position to the start
  const totalWidth = grid.scrollWidth / 2;
  wrapper.scrollLeft = 0;

  wrapper.addEventListener("scroll", () => {
    // If user scrolls past the duplicated midpoint, reset
    if (wrapper.scrollLeft >= totalWidth) {
      wrapper.scrollLeft = 0;
    }

    // If user scrolls backwards past start, jump forward
    if (wrapper.scrollLeft <= 0) {
      wrapper.scrollLeft = totalWidth;
    }
  });
}
