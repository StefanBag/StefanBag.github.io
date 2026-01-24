// TRUE infinite horizontal carousel (stable both directions)
const wrapper = document.querySelector(".projects-wrapper");
const grid = document.querySelector(".projects-grid");
if (wrapper && grid) {
  const originalCards = Array.from(grid.children);
  // Clone BEFORE
  originalCards.forEach(card => {
    grid.insertBefore(card.cloneNode(true), grid.firstChild);
  });
  // Clone AFTER
  originalCards.forEach(card => {
    grid.appendChild(card.cloneNode(true));
  });
  // Width of ONE full set
  const setWidth = grid.scrollWidth / 3;
  // Start in the middle set
  wrapper.scrollLeft = setWidth;
  let isJumping = false;
  
  wrapper.addEventListener("scroll", () => {
    if (isJumping) return;
    
    const scrollPos = wrapper.scrollLeft;
    const maxScroll = wrapper.scrollWidth - wrapper.clientWidth;
    
    // Too far LEFT → jump right
    if (scrollPos < setWidth * 0.1) {
      isJumping = true;
      wrapper.scrollLeft = scrollPos + setWidth;
      setTimeout(() => (isJumping = false), 50);
    }
    // Too far RIGHT → jump left
    else if (scrollPos > setWidth * 1.9) {
      isJumping = true;
      wrapper.scrollLeft = scrollPos - setWidth;
      setTimeout(() => (isJumping = false), 50);
    }
  });
}
