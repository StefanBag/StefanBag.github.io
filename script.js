const track = document.querySelector(".projects-grid");
const leftArrow = document.querySelector(".carousel-arrow.left");
const rightArrow = document.querySelector(".carousel-arrow.right");

if (track && leftArrow && rightArrow) {

  const cards = Array.from(track.children);
  const step = 372; // 340px card + 32px gap
  let index = 0;

  function update() {
    track.style.transform = `translateX(-${index * step}px)`;
  }

  rightArrow.addEventListener("click", () => {
    index++;
    if (index >= cards.length) index = 0;
    update();
  });

  leftArrow.addEventListener("click", () => {
    index--;
    if (index < 0) index = cards.length - 1;
    update();
  });

}
