const track = document.querySelector(".projects-grid");
const leftArrow = document.querySelector(".carousel-arrow.left");
const rightArrow = document.querySelector(".carousel-arrow.right");

if (track && leftArrow && rightArrow) {

  const cards = Array.from(track.children);

  // Clone first and last
  const firstClone = cards[0].cloneNode(true);
  const lastClone = cards[cards.length - 1].cloneNode(true);

  track.appendChild(firstClone);
  track.insertBefore(lastClone, cards[0]);

  let index = 1;
  let isTransitioning = false;

  function getCardWidth() {
    const card = track.children[0];
    const styles = window.getComputedStyle(track);
    const gap = parseInt(styles.gap) || 0;
    return card.offsetWidth + gap;
  }

  function moveToIndex(i, animate = true) {
    const cardWidth = getCardWidth();

    if (!animate) {
      track.style.transition = "none";
    } else {
      track.style.transition = "transform 0.4s ease";
    }

    track.style.transform = `translateX(-${i * cardWidth}px)`;
  }

  moveToIndex(index, false);

  rightArrow.addEventListener("click", () => {
    if (isTransitioning) return;
    isTransitioning = true;
    index++;
    moveToIndex(index);
  });

  leftArrow.addEventListener("click", () => {
    if (isTransitioning) return;
    isTransitioning = true;
    index--;
    moveToIndex(index);
  });

  track.addEventListener("transitionend", () => {
    const total = track.children.length;

    if (index === total - 1) {
      index = 1;
      moveToIndex(index, false);
    }

    if (index === 0) {
      index = total - 2;
      moveToIndex(index, false);
    }

    isTransitioning = false;
  });

  window.addEventListener("resize", () => moveToIndex(index, false));
}
