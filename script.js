// ================================
// TRUE Infinite Carousel (SNAP PER CARD)
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
  
  let currentIndex = 0;
  let targetIndex = 0;
  const loopWidth = cardWidth * cardCount;
  
  wrapper.style.overflow = "hidden";
  
  let scrollAccumulator = 0;
  const scrollThreshold = 50; // pixels needed to trigger next card
  
  wrapper.addEventListener(
    "wheel",
    (e) => {
      e.preventDefault();
      
      scrollAccumulator += e.deltaY;
      
      // Move forward one card
      if (scrollAccumulator > scrollThreshold) {
        targetIndex++;
        scrollAccumulator = 0;
      }
      // Move backward one card
      else if (scrollAccumulator < -scrollThreshold) {
        targetIndex--;
        scrollAccumulator = 0;
      }
    },
    { passive: false }
  );
  
  function animate() {
    // Smooth interpolation to target
    const diff = targetIndex - currentIndex;
    currentIndex += diff * 0.15; // Smooth easing (0.15 = speed)
    
    let position = currentIndex * cardWidth;
    
    // Handle looping by wrapping target and current indices
    if (targetIndex >= cardCount) {
      targetIndex -= cardCount;
      currentIndex -= cardCount;
    } else if (targetIndex < 0) {
      targetIndex += cardCount;
      currentIndex += cardCount;
    }
    
    track.style.transform = `translateX(${-position}px)`;
    requestAnimationFrame(animate);
  }
  
  animate();
}
