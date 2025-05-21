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


document.addEventListener("DOMContentLoaded", () => {
  const gallery = document.querySelector('.experience-gallery');
  const leftFade = document.querySelector('.experience-fade.left');
  const rightFade = document.querySelector('.experience-fade.right');
  const btnPrev = document.getElementById('prev-exp');
  const btnNext = document.getElementById('next-exp');

  function updateExperienceFade() {
    if (!gallery) return;

    const scrollLeft = gallery.scrollLeft;
    const clientWidth = gallery.clientWidth;
    const scrollWidth = gallery.scrollWidth;
    const maxScroll = scrollWidth - clientWidth;
    const tolerance = 5;

    const hasOverflow = scrollWidth > clientWidth + 1;
    const canScrollLeft = scrollLeft > tolerance;
    const canScrollRight = scrollLeft < maxScroll - tolerance;

    console.log({
      scrollLeft,
      scrollWidth,
      clientWidth,
      maxScroll
    });

    console.log("Fade LEFT visible?", hasOverflow && canScrollLeft);
    console.log("Fade RIGHT visible?", hasOverflow && canScrollRight);
    console.log("BTN prev enabled?", canScrollLeft);
    console.log("BTN next enabled?", canScrollRight);

    // Fades
    if (leftFade) leftFade.classList.toggle("visible", hasOverflow && canScrollLeft);
    if (rightFade) rightFade.classList.toggle("visible", hasOverflow && canScrollRight);

    // Botones
    if (btnPrev) btnPrev.classList.toggle("disabled", !canScrollLeft);
    if (btnNext) btnNext.classList.toggle("disabled", !canScrollRight);
  }

  // Scroll por botones
  if (btnPrev) {
    btnPrev.addEventListener('click', () => {
      gallery.scrollBy({ left: -300, behavior: 'smooth' });
      setTimeout(updateExperienceFade, 350);
    });
  }

  if (btnNext) {
    btnNext.addEventListener('click', () => {
      gallery.scrollBy({ left: 300, behavior: 'smooth' });
      setTimeout(updateExperienceFade, 350);
    });
  }

  // Eventos naturales
  gallery.addEventListener('scroll', updateExperienceFade);
  window.addEventListener('resize', updateExperienceFade);

  updateExperienceFade(); // inicial
});
