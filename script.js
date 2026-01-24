// Infinite horizontal carousel logic

const wrapper = document.querySelector(".projects-wrapper");
const grid = document.querySelector(".projects-grid");

if (wrapper && grid) {
  // Duplicate all project cards ONCE
  const cards = Array.from(grid.children);
  cards.forEach(card => {
    const clone = card.cloneNode(true);
    grid.appendChild(clone);
  });

  // Width of the original set
  const totalWidth = grid.scrollWidth / 2;

  // Start at the seam between original + clone
  wrapper.scrollLeft = totalWidth;

  let isResetting = false;

  wrapper.addEventListener("scroll", () => {
    if (isResetting) return;

    const buffer = 10; // px safety zone

    if (wrapper.scrollLeft >= totalWidth * 2 - buffer) {
      isResetting = true;
      wrapper.scrollLeft -= totalWidth;
      requestAnimationFrame(() => (isResetting = false));
    } 
    else if (wrapper.scrollLeft <= buffer) {
      isResetting = true;
      wrapper.scrollLeft += totalWidth;
      requestAnimationFrame(() => (isResetting = false));
    }
  });
}
