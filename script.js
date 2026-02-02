// ================================
// Infinite Carousel — HARD SNAP PER CARD
// Arrow-controlled ONLY (no scroll)
// ================================

const wrapper = document.querySelector(".projects-wrapper");
const track = document.querySelector(".projects-grid");
const leftArrow = document.querySelector(".carousel-arrow.left");
const rightArrow = document.querySelector(".carousel-arrow.right");

if (wrapper && track && leftArrow && rightArrow && !track.dataset.looped) {
  track.dataset.looped = "true";

  const cards = Array.from(track.children);
  const cardWidth = cards[0].offsetWidth + 32; // card + gap
  const cardCount = cards.length;

  // Clone cards ONCE for infinite loop
  cards.forEach(card => {
    track.appendChild(card.cloneNode(true));
  });

  let index = 0;
  let position = 0;
  let targetPosition = 0;

  const snapSpeed = 0.35; // easing strength

  wrapper.style.overflow = "hidden";

  // ----------------
  // Arrow controls
  // ----------------
  leftArrow.addEventListener("click", () => {
    index--;
    if (index < 0) index += cardCount;
    targetPosition = index * cardWidth;
  });

  rightArrow.addEventListener("click", () => {
    index++;
    if (index >= cardCount) index -= cardCount;
    targetPosition = index * cardWidth;
  });

  // ----------------
  // Animation loop
  // ----------------
  function animate() {
    position += (targetPosition - position) * snapSpeed;

    if (Math.abs(targetPosition - position) < 0.5) {
      position = targetPosition;
    }

    track.style.transform = `translateX(${-position}px)`;
    requestAnimationFrame(animate);
  }

  animate();
}
