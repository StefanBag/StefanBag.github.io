// ================================
// Carousel — 1 CARD PER CLICK
// ================================

const wrapper = document.querySelector(".projects-wrapper");
const track = document.querySelector(".projects-grid");
const leftArrow = document.querySelector(".carousel-arrow.left");
const rightArrow = document.querySelector(".carousel-arrow.right");

if (wrapper && track && leftArrow && rightArrow) {

  let cards = Array.from(track.children);
  let index = 0;
  let cardWidth = 0;

  function calculateCardWidth() {
    const style = window.getComputedStyle(track);
    const gap = parseInt(style.gap) || 0;
    cardWidth = cards[0].offsetWidth + gap;
  }

  function update() {
    wrapper.scrollTo({
      left: index * cardWidth,
      behavior: "smooth",
    });
  }

  // Recalculate on load
  calculateCardWidth();

  // Recalculate if window resizes
  window.addEventListener("resize", () => {
    calculateCardWidth();
    update();
  });

  leftArrow.addEventListener("click", () => {
    if (index > 0) {
      index--;
      update();
    }
  });

  rightArrow.addEventListener("click", () => {
    if (index < cards.length - 1) {
      index++;
      update();
    }
  });

}
