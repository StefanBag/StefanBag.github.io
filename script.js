// ================================
// TRUE Infinite Carousel (Transform-Based)
// No scrollLeft, no jitter, no walls
// ================================

const wrapper = document.querySelector(".projects-wrapper");
const track = document.querySelector(".projects-grid");

if (wrapper && track) {
  const cards = Array.from(track.children);
  const cardWidth = cards[0].offsetWidth + 32; // card width + gap
  const totalCards = cards.length;

  // Clone cards ONCE for looping
  cards.forEach(card => {
    track.appendChild(card.cloneNode(true));
  });

  let position = 0;
  let velocity = 0;
  const friction = 0.92;
  const speed = 0.9;

  // Disable native scrolling
  wrapper.style.overflow = "hidden";

  // Wheel / trackpad support
  wrapper.addEventListener("wheel", (e) => {
    e.preventDefault();
    velocity += e.deltaY * speed;
  }, { passive: false });

  function animate() {
    velocity *= friction;
    position += velocity;

    const loopWidth = cardWidth * totalCards;

    // Wrap infinitely
    if (position >= loopWidth) {
      position -= loopWidth;
    }
    if (position <= -loopWidth) {
      position += loopWidth;
    }

    track.style.transform = `translateX(${-position}px)`;
    requestAnimationFrame(animate);
  }

  animate();
}
