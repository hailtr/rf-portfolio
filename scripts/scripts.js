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
  });
  
