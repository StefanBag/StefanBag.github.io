// Bulletproof infinite horizontal carousel

const wrapper = document.querySelector(".projects-wrapper");
const grid = document.querySelector(".projects-grid");

if (wrapper && grid) {
  const originals = Array.from(grid.children);

  // Duplicate once (2 sets total)
  originals.forEach(card => {
    grid.appendChild(card.cloneNode(true));
  });

  let setWidth;

  function recalc() {
    setWidth = grid.scrollWidth / 2;
    wrapper.scrollLeft = setWidth / 2;
  }

  // Recalculate after images load
  window.addEventListener("load", recalc);
  window.addEventListener("resize", recalc);

  wrapper.addEventListener("scroll", () => {
    // Wrap seamlessly using modulo
    if (wrapper.scrollLeft >= setWidth) {
      wrapper.scrollLeft -= setWidth;
    } else if (wrapper.scrollLeft < 0) {
      wrapper.scrollLeft += setWidth;
    }
  });
}
