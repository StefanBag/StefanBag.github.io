const track = document.querySelector(".projects-grid");
const leftArrow = document.querySelector(".carousel-arrow.left");
const rightArrow = document.querySelector(".carousel-arrow.right");

if (track && leftArrow && rightArrow) {

  const cards = Array.from(track.children);
  let index = 0;

  function getCardWidth() {
    const card = cards[0];
    const styles = window.getComputedStyle(track);
    const gap = parseInt(styles.gap) || 0;
    return card.offsetWidth + gap;
  }

  function update() {
    const cardWidth = getCardWidth();
    track.style.transform = `translateX(-${index * cardWidth}px)`;
  }

  rightArrow.addEventListener("click", () => {
    if (index === cards.length - 1) {
      index = 0; // wrap only at true end
    } else {
      index++;
    }
    update();
  });

  leftArrow.addEventListener("click", () => {
    if (index === 0) {
      index = cards.length - 1;
    } else {
      index--;
    }
    update();
  });

  window.addEventListener("resize", update);
}
