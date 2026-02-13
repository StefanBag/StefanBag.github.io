const wrapper = document.querySelector(".projects-wrapper");
const track = document.querySelector(".projects-grid");
const leftArrow = document.querySelector(".carousel-arrow.left");
const rightArrow = document.querySelector(".carousel-arrow.right");

if (wrapper && track && leftArrow && rightArrow) {

  let index = 0;
  let isScrolling = false;
  const cards = Array.from(track.children);

  function getCardWidth() {
    const card = cards[0];
    const styles = window.getComputedStyle(track);
    const gap = parseInt(styles.gap) || 0;
    return card.offsetWidth + gap;
  }

  function update() {
    if (isScrolling) return;

    isScrolling = true;

    const cardWidth = getCardWidth();
    wrapper.scrollTo({
      left: index * cardWidth,
      behavior: "smooth"
    });

    // unlock after animation finishes
    setTimeout(() => {
      isScrolling = false;
    }, 400); // match scroll speed
  }

  rightArrow.addEventListener("click", () => {
    index = (index + 1) % cards.length;
    update();
  });

  leftArrow.addEventListener("click", () => {
    index = (index - 1 + cards.length) % cards.length;
    update();
  });

  window.addEventListener("resize", update);
}
