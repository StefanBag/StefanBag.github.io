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

  // Start in the middle for true infinite feel
  wrapper.scrollLeft = totalWidth / 2;

  wrapper.addEventListener("scroll", () => {
    // Scroll forward past end → jump back
    if (wrapper.scrollLeft >= totalWidth) {
      wrapper.scrollLeft -= totalWidth;
    }
    // Scroll backward past start → jump forward
    else if (wrapper.scrollLeft <= 0) {
      wrapper.scrollLeft += totalWidth;
    }
  });
}
