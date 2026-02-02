// ================================
// Carousel — BIG ARROWS, 1 CARD PER CLICK
// ================================

const wrapper = document.querySelector(".projects-wrapper");
const track = document.querySelector(".projects-grid");
const leftArrow = document.querySelector(".carousel-arrow.left");
const rightArrow = document.querySelector(".carousel-arrow.right");

if (wrapper && track && leftArrow && rightArrow) {
  const cards = Array.from(track.children);
  const gap = 32; // matches CSS gap: 2rem
  const cardWidth = cards[0].offsetWidth + gap;

  let index = 0;
  const maxIndex = cards.length - 1;

  function update() {
    wrapper.scrollTo({
      left: index * cardWidth,
      behavior: "smooth",
    });
  }

  leftArrow.addEventListener("click", () => {
    index = Math.max(index - 1, 0);
    update();
  });

  rightArrow.addEventListener("click", () => {
    index = Math.min(index + 1, maxIndex);
    update();
  });
}
