// TRUE infinite horizontal carousel (no walls, no jitter)

const wrapper = document.querySelector(".projects-wrapper");
const grid = document.querySelector(".projects-grid");

if (wrapper && grid) {
  const originalCards = Array.from(grid.children);

  // 1️⃣ Clone before
  originalCards.forEach(card => {
    grid.insertBefore(card.cloneNode(true), grid.firstChild);
  });

  // 2️⃣ Clone after
  originalCards.forEach(card => {
    grid.appendChild(card.cloneNode(true));
  });

  // 3️⃣ Width of ONE full set
  const setWidth = grid.scrollWidth / 3;

  // 4️⃣ Start dead-center (IMPORTANT)
  wrapper.scrollLeft = setWidth;

  let isJumping = false;
  const buffer = 100; // safety zone

  wrapper.addEventListener("scroll", () => {
    if (isJumping) return;

    // 🚫 NEVER let browser hit 0
    if (wrapper.scrollLeft <= buffer) {
      isJumping = true;
      wrapper.scrollLeft += setWidth;
      requestAnimationFrame(() => (isJumping = false));
    }

    // 🚫 NEVER let browser hit max
    else if (wrapper.scrollLeft >= setWidth * 2 - buffer) {
      isJumping = true;
      wrapper.scrollLeft -= setWidth;
      requestAnimationFrame(() => (isJumping = false));
    }
  });
}
