// ================================
// Infinite Carousel — HARD SNAP PER CARD
// ================================

const wrapper = document.querySelector(".projects-wrapper");
const track = document.querySelector(".projects-grid");

if (wrapper && track && !track.dataset.looped) {
  track.dataset.looped = "true";

  const cards = Array.from(track.children);
  const cardWidth = cards[0].offsetWidth + 32; // card + gap
  const cardCount = cards.length;

  // Clone once for looping
  cards.forEach(card => {
    track.appendChild(card.cloneNode(true));
  });

  let index = 0;
  let position = 0;
  let targetPosition = 0;

  const snapSpeed = 0.35; // ↑ higher = snappier
  const scrollThreshold = 60;
  let scrollAccumulator = 0;

  wrapper.style.overflow = "hidden";

  wrapper.addEventListener(
    "wheel",
    (e) => {
      e.preventDefault();
      
      // Use deltaX for horizontal scrolling (trackpad left/right)
      // Use deltaY for vertical scrolling converted to horizontal
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      
      scrollAccumulator += delta;

      // Scroll RIGHT (positive delta) → move cards LEFT (index++)
      if (scrollAccumulator > scrollThreshold) {
        index++;
        scrollAccumulator = 0;
      } 
      // Scroll LEFT (negative delta) → move cards RIGHT (index--)
      else if (scrollAccumulator < -scrollThreshold) {
        index--;
        scrollAccumulator = 0;
      }

      // Wrap index
      if (index >= cardCount) index -= cardCount;
      if (index < 0) index += cardCount;

      targetPosition = index * cardWidth;
    },
    { passive: false }
  );

  function animate() {
    // Fast snap (spring-like, not floaty)
    position += (targetPosition - position) * snapSpeed;

    // Kill micro jitter
    if (Math.abs(targetPosition - position) < 0.5) {
      position = targetPosition;
    }

    track.style.transform = `translateX(${-position}px)`;
    requestAnimationFrame(animate);
  }

  animate();
}
