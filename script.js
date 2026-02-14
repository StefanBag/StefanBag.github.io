const track = document.querySelector(".projects-grid");
const leftArrow = document.querySelector(".carousel-arrow.left");
const rightArrow = document.querySelector(".carousel-arrow.right");

if (track && leftArrow && rightArrow) {

  const cards = Array.from(track.children);
  const step = 372; // 340 card + 32 gap
  const visibleCards = 3;

  let index = 0;
  const maxIndex = cards.length - visibleCards;

  function update() {
    track.style.transform = `translateX(-${index * step}px)`;
  }

  rightArrow.addEventListener("click", () => {
    if (index >= maxIndex) {
      index = 0; // wrap cleanly
    } else {
      index++;
    }
    update();
  });

  leftArrow.addEventListener("click", () => {
    if (index <= 0) {
      index = maxIndex;
    } else {
      index--;
    }
    update();
  });

}
