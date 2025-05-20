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