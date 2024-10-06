// Hero Carousel
let currentHeroIndex = 0;
const heroSlides = document.querySelectorAll(".carousel-item");
const heroDots = document.querySelectorAll(".dot");

function showHeroSlide(index) {
  heroSlides.forEach((slide, i) => {
    slide.style.display = i === index ? "block" : "none";
    heroDots[i].classList.toggle("active", i === index);
  });
}

function currentHeroSlide(index) {
  currentHeroIndex = index;
  showHeroSlide(currentHeroIndex);
}

function nextHeroSlide() {
  currentHeroIndex = (currentHeroIndex + 1) % heroSlides.length;
  showHeroSlide(currentHeroIndex);
}

// Initialize the first slide
showHeroSlide(currentHeroIndex);
setInterval(nextHeroSlide, 5000);

// Gallery Carousel
let currentGalleryIndex = 0;
const galleryItems = document.querySelectorAll(".gallery-item");
const totalGalleryItems = galleryItems.length;

function showNextGallery() {
  currentGalleryIndex = (currentGalleryIndex + 1) % totalGalleryItems;
  updateGalleryCarousel();
}

function updateGalleryCarousel() {
  const track = document.querySelector(".gallery-track");
  const itemWidth = galleryItems[0].offsetWidth + 20; // Adjust margin if needed
  const offset = -currentGalleryIndex * itemWidth;
  track.style.transform = `translateX(${offset}px)`;
}

let autoSlide = setInterval(showNextGallery, 3000);
const galleryCarouselContainer = document.querySelector(".gallery-carousel");

galleryCarouselContainer.addEventListener("mouseover", () => {
  clearInterval(autoSlide);
});
galleryCarouselContainer.addEventListener("mouseout", () => {
  autoSlide = setInterval(showNextGallery, 3000);
});

// Design Inspirations Section
let currentInspirationIndex = 0;
const inspirationItems = document.querySelectorAll(".inspiration-card");
const inspirationTotalItems = inspirationItems.length;
const inspirationTrack = document.querySelector(".inspiration-track");

const firstItemClone = inspirationItems[0].cloneNode(true);
inspirationTrack.appendChild(firstItemClone);

const totalInspirationClonedItems = inspirationTotalItems + 1;

function showNextInspiration() {
  currentInspirationIndex =
    (currentInspirationIndex + 1) % totalInspirationClonedItems;
  if (currentInspirationIndex === inspirationTotalItems) {
    inspirationTrack.style.transition = "none";
    currentInspirationIndex = 0;
    inspirationTrack.style.transform = `translateX(0)`;
    setTimeout(() => {
      inspirationTrack.style.transition = "transform 0.5s ease";
      updateInspirationCarousel();
    }, 20);
  } else {
    updateInspirationCarousel();
  }
}

function showPrevInspiration() {
  currentInspirationIndex =
    (currentInspirationIndex - 1 + totalInspirationClonedItems) %
    totalInspirationClonedItems;
  if (currentInspirationIndex === inspirationTotalItems) {
    inspirationTrack.style.transition = "none";
    currentInspirationIndex = 0;
    inspirationTrack.style.transform = `translateX(0)`;
    setTimeout(() => {
      inspirationTrack.style.transition = "transform 0.5s ease";
      updateInspirationCarousel();
    }, 20);
  } else {
    updateInspirationCarousel();
  }
}

function updateInspirationCarousel() {
  const itemWidth = inspirationItems[0].offsetWidth;
  const offset = -currentInspirationIndex * itemWidth;
  inspirationTrack.style.transform = `translateX(${offset}px)`;
}

// Event listeners for buttons
const nextInspirationButton = document.querySelector(".carousel-nav.next");
const prevInspirationButton = document.querySelector(".carousel-nav.prev");

nextInspirationButton.addEventListener("click", showNextInspiration);
prevInspirationButton.addEventListener("click", showPrevInspiration);
setInterval(showNextInspiration, 5000);

// Gallery Navigation Arrows
const galleryLeftArrow = document.querySelector(".left-arrow");
const galleryRightArrow = document.querySelector(".right-arrow");

galleryLeftArrow.addEventListener("click", () => {
  if (currentGalleryIndex > 0) {
    currentGalleryIndex--;
    updateGalleryCarousel();
  }
});

galleryRightArrow.addEventListener("click", () => {
  if (currentGalleryIndex < galleryItems.length - 1) {
    currentGalleryIndex++;
    updateGalleryCarousel();
  }
});

// Sticky Navigation
document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector("header");
  const sticky = header.offsetTop; // Get the initial position of the header

  function handleScroll() {
    if (window.pageYOffset > sticky) {
      header.classList.add("sticky"); // Add sticky class
    } else {
      header.classList.remove("sticky"); // Remove sticky class
    }
  }

  window.addEventListener("scroll", handleScroll); // Execute handleScroll on scroll

  // Smooth scrolling for anchor links
  const navLinks = document.querySelectorAll("nav a");

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault(); // Prevent default anchor click behavior
      const targetId = this.getAttribute("href"); // Get the target section's ID
      const targetSection = document.querySelector(targetId); // Find the target section
      targetSection.scrollIntoView({
        behavior: "smooth", // Smooth scrolling
        block: "start", // Align to the top of the section
      });
    });
  });
});

