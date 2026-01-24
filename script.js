// ================================
// TRUE Infinite Carousel (NO DUPES, NO JITTER)
// ================================

const wrapper = document.querySelector(".projects-wrapper");
const track = document.querySelector(".projects-grid");

if (wrapper && track && !track.dataset.looped) {
  track.dataset.looped = "true"; // 🔒 prevent re-cloning

  const cards = Array.from(track.children);
  const cardWidth = cards[0].offsetWidth + 32; // width + gap
  const cardCount = cards.length;

  // Clone ONCE for looping
  cards.forEach(card => {
    track.appendChild(card.cloneNode(true));
  });

  let position = 0;
  let velocity = 0;

  const friction = 0.9;
  const sensitivity = 0.8;
  const loopWidth = cardWidth * cardCount;

  // Disable native scrolling
  wrapper.style.overflow = "hidden";

  // Trackpad / wheel input
  wrapper.addEventListener(
    "wheel",
    (e) => {
      e.preventDefault();
      velocity += e.deltaY * sensitivity;
    },
    { passive: false }
  );

  function animate() {
    velocity *= friction;
    position += velocity;

    // Hard wrap — symmetric both directions
    if (position >= loopWidth) {
      position -= loopWidth;
    } else if (position <= 0) {
      position += loopWidth;
    }

    track.style.transform = `translateX(${-position}px)`;
    requestAnimationFrame(animate);
  }

  animate();
}
