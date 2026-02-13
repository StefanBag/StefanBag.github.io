// ================================
// Infinite Carousel — 1 Card Per Click
// ================================

const wrapper = document.querySelector(".projects-wrapper");
const track = document.querySelector(".projects-grid");
const leftArrow = document.querySelector(".carousel-arrow.left");
const rightArrow = document.querySelector(".carousel-arrow.right");

if (wrapper && track && leftArrow && rightArrow) {

  let index = 0;
  const cards = Array.from(track.children);

  function getCardWidth() {
    const card = cards[0];
    const styles = window.getComputedStyle(track);
    const gap = parseInt(styles.gap) || 0;
    return card.offsetWidth + gap;
  }

  function update() {
    const cardWidth = getCardWidth();
    wrapper.scrollTo({
      left: index * cardWidth,
      behavior: "smooth"
    });
  }

  rightArrow.addEventListener("click", () => {
    index = (index + 1) % cards.length;  // wraps forward
    update();
  });

  leftArrow.addEventListener("click", () => {
    index = (index - 1 + cards.length) % cards.length; // wraps backward
    update();
  });

  window.addEventListener("resize", update);
}
