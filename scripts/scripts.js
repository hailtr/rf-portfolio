// Date: 2025-02-06 (6th February 2025)
// Version: 1.0.3
// Description: JavaScript file for the portfolio website

// --- Inicializar AOS (esperando trigger manual) ---
AOS.init({
  duration: 500,
  once: true,
  startEvent: 'aos:manual-start',
  disableMutationObserver: true
});

// --- Loader y AOS ---
AOS.init({
  duration: 500,
  once: true,
  startEvent: 'aos:manual-start',
  disableMutationObserver: true
});

window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  const main = document.querySelector("main");

  loader.style.opacity = 0;
  loader.style.transition = "opacity 0.5s ease";

  setTimeout(() => {
    loader.style.display = "none";
    main.style.display = "block";

    // 🔥 Aquí usamos scroll y rAF para asegurar que AOS vea lo que entra
    setTimeout(() => {
      requestAnimationFrame(() => {
        document.dispatchEvent(new Event("aos:manual-start"));
        AOS.refresh(); // NO usar refreshHard, queremos que escuche scroll
      });
    }, 100);
  }, 600);
});


// --- Menú responsive y footer ---
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

  document.getElementById("year").textContent = new Date().getFullYear();
});

// --- Galería: Fades, botones y scroll ---
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

    if (leftFade) leftFade.classList.toggle("visible", hasOverflow && canScrollLeft);
    if (rightFade) rightFade.classList.toggle("visible", hasOverflow && canScrollRight);

    if (btnPrev) btnPrev.classList.toggle("disabled", !canScrollLeft);
    if (btnNext) btnNext.classList.toggle("disabled", !canScrollRight);
  }

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

  gallery.addEventListener('scroll', updateExperienceFade);
  window.addEventListener('resize', updateExperienceFade);

  updateExperienceFade();
});
