// Date: 2025-02-06 (6th February 2025)
// Version: 1.0.1
// Description: JavaScript file for the portfolio website

// Function to toggle the menu
document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.querySelector(".menu-toggle");
  const navBanner = document.querySelector("#nav-banner");

  menuToggle.addEventListener("click", function () {
    navBanner.classList.toggle("active");
  });

  document.querySelectorAll("#nav-banner a").forEach(link => {
    link.addEventListener("click", () => {
      navBanner.classList.remove("active");
    });
  });

  // Año dinámico del footer
  document.getElementById("year").textContent = new Date().getFullYear();
});


document.addEventListener("DOMContentLoaded", function () {
  if (window.innerWidth > 768) {
    AOS.init({
      duration: 800,
      once: true
    });
  }
});


// Function to handle the experience gallery
function updateExperienceFade() {
  const wrapper = document.querySelector('.experience-gallery-wrapper');
  const leftFade = wrapper.querySelector('.experience-fade.left');
  const rightFade = wrapper.querySelector('.experience-fade.right');

  const scrollLeft = wrapper.scrollLeft;
  const clientWidth = wrapper.clientWidth;
  const scrollWidth = wrapper.scrollWidth;
  const maxScroll = scrollWidth - clientWidth;

  const hasOverflow = scrollWidth > clientWidth + 1;
  const tolerance = 5; // píxeles de margen

  leftFade.style.display = hasOverflow && scrollLeft > tolerance ? 'block' : 'none';
  rightFade.style.display = hasOverflow && scrollLeft < maxScroll - tolerance ? 'block' : 'none';
}


const wrapper = document.querySelector('.experience-gallery-wrapper');
wrapper.addEventListener('scroll', updateExperienceFade);
window.addEventListener('resize', updateExperienceFade);
window.addEventListener('DOMContentLoaded', updateExperienceFade);
