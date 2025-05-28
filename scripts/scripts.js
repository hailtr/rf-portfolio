// Date: 2025-05-27
// Version: 2.0
// Description: Limpieza de scripts.js tras modularización

// --- Inicializar AOS (esperando trigger manual) ---
AOS.init({
  duration: 500,
  once: true,
  startEvent: 'aos:manual-start',
  disableMutationObserver: true
});

// --- Menú responsive ---
document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.querySelector(".menu-toggle");
  const navBanner = document.querySelector("#nav-banner");

  menuToggle.addEventListener("click", function () {
    navBanner.classList.toggle("active");
  });

  document.querySelectorAll("#nav-banner a").forEach(link => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");

      if (href && href.startsWith("#")) {
        e.preventDefault();
        navBanner.classList.remove("active");

        const target = document.querySelector(href);
        if (target) {
          waitUntilStable(target).then(() => {
            target.scrollIntoView({ behavior: "smooth", block: "start" });
          });
        }
      }
    });
  });

  document.getElementById("year").textContent = new Date().getFullYear();
});

// --- Contact overlay ---
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
    threshold: 0.8
  });

  document.querySelectorAll('.reveal-section').forEach(section => {
    observer.observe(section);
  });
});

// --- Función para esperar que un elemento se estabilice visualmente ---
function waitUntilStable(element, maxTries = 10) {
  return new Promise(resolve => {
    let lastHeight = element.offsetHeight;
    let tries = 0;

    function check() {
      const newHeight = element.offsetHeight;
      if (newHeight === lastHeight || tries >= maxTries) {
        resolve();
      } else {
        lastHeight = newHeight;
        tries++;
        setTimeout(check, 50);
      }
    }

    check();
  });
}