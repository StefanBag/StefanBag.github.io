// Mobile menu
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
    });
  });
}

// Active nav highlighting on scroll
const sections = document.querySelectorAll("section[id]");
const navAnchors = document.querySelectorAll(".nav-links a");

function setActiveLink() {
  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 120;
    const sectionHeight = section.offsetHeight;

    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      currentSection = section.getAttribute("id");
    }
  });

  navAnchors.forEach((link) => {
    link.classList.remove("active");

    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active");
    }
  });
}

window.addEventListener("scroll", setActiveLink);
window.addEventListener("load", setActiveLink);

// Game projects carousel
const track = document.querySelector("#game-projects .projects-grid");
const leftArrow = document.querySelector("#game-projects .carousel-arrow.left");
const rightArrow = document.querySelector("#game-projects .carousel-arrow.right");

if (track && leftArrow && rightArrow && window.innerWidth > 768) {
  const cards = Array.from(track.children);
  const step = 372; // 340 card + 32 gap
  const visibleCards = 3;

  let index = 0;
  const maxIndex = Math.max(cards.length - visibleCards, 0);

  function updateCarousel() {
    track.style.transform = `translateX(-${index * step}px)`;
  }

  rightArrow.addEventListener("click", () => {
    index = index >= maxIndex ? 0 : index + 1;
    updateCarousel();
  });

  leftArrow.addEventListener("click", () => {
    index = index <= 0 ? maxIndex : index - 1;
    updateCarousel();
  });
}
