// ================================
// TRUE Infinite Carousel (TIGHT CONTROL)
// ================================
const wrapper = document.querySelector(".projects-wrapper");
const track = document.querySelector(".projects-grid");
if (wrapper && track && !track.dataset.looped) {
  track.dataset.looped = "true";
  const cards = Array.from(track.children);
  const cardWidth = cards[0].offsetWidth + 32; // width + gap
  const cardCount = cards.length;
  
  // Clone ONCE for looping
  cards.forEach(card => {
    track.appendChild(card.cloneNode(true));
  });
  
  let position = 0;
  let velocity = 0;
  const friction = 0.85; // Higher = tighter control (was 0.9)
  const sensitivity = 1.2; // Higher = more responsive
  const snapStrength = 0.15; // Pulls toward resting position
  const loopWidth = cardWidth * cardCount;
  
  wrapper.style.overflow = "hidden";
  
  let isScrolling = false;
  let scrollTimeout;
  
  wrapper.addEventListener(
    "wheel",
    (e) => {
      e.preventDefault();
      
      // Direct position change for immediate response
      velocity = e.deltaY * sensitivity;
      
      isScrolling = true;
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isScrolling = false;
      }, 150);
    },
    { passive: false }
  );
  
  function animate() {
    // Apply velocity decay
    if (Math.abs(velocity) > 0.1) {
      position += velocity;
      velocity *= friction;
    } else {
      velocity = 0;
    }
    
    // Snap to cards when stopped (optional - remove if you don't want snapping)
    if (!isScrolling && Math.abs(velocity) < 0.5) {
      const nearestCard = Math.round(position / cardWidth) * cardWidth;
      const diff = nearestCard - position;
      position += diff * snapStrength;
    }
    
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
