// Date: 2025-02-06 (6th February 2025)
// Version: 1.0.4
// Description: JavaScript file for the portfolio website

// --- Inicializar AOS (esperando trigger manual) ---
AOS.init({
  duration: 500,
  once: true,
  startEvent: 'aos:manual-start',
  disableMutationObserver: true
});

// --- Loader, AOS y botón de contacto ---
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  const main = document.querySelector("main");

  loader.style.opacity = 0;
  loader.style.transition = "opacity 0.5s ease";

  setTimeout(() => {
    loader.style.display = "none";
    main.style.display = "block";

    // Activar AOS
    setTimeout(() => {
      requestAnimationFrame(() => {
        document.dispatchEvent(new Event("aos:manual-start"));
        AOS.refresh();
      });
    }, 100);

  }, 600);
});

// --- Menú responsive ---
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

  if (gallery) {
    gallery.addEventListener('scroll', updateExperienceFade);
  }

  window.addEventListener('resize', updateExperienceFade);
  updateExperienceFade();
});

document.addEventListener("DOMContentLoaded", () => {
  const contactLink = document.querySelector('#contact-link');
  const overlay = document.querySelector('#contactOverlay');
  let overlayTimeout;

  if (contactLink && overlay) {
    contactLink.addEventListener('click', (e) => {
      e.preventDefault();

      overlay.classList.add('active');
      overlay.scrollIntoView({ behavior: 'smooth', block: 'center' });

      clearTimeout(overlayTimeout);
      overlayTimeout = setTimeout(() => {
        overlay.classList.remove('active');
      }, 8000);
    });

    overlay.addEventListener('mouseenter', () => clearTimeout(overlayTimeout));

    overlay.addEventListener('mouseleave', () => {
      overlayTimeout = setTimeout(() => {
        overlay.classList.remove('active');
      }, 3000);
    });
  }
});

// --- Lógica de reveal ---
document.addEventListener('DOMContentLoaded', () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // solo una vez
      }
    });
  }, {
    threshold: 0.8 // solo cuando esté al 80% visible
  });

  document.querySelectorAll('.reveal-section').forEach(section => {
    observer.observe(section);
  });
});