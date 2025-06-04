import { getLang } from './i18n.js';
import { loadGallery } from './loadGallery.js';
import { renderGallery } from './renderGallery.js';
import { toggleLang } from './i18n.js';
import { applyTextTranslations } from './loadText.js';

const lang = getLang();
document.documentElement.setAttribute("lang", lang);

applyTextTranslations(lang);

loadGallery(lang).then(renderGallery);

document.addEventListener('DOMContentLoaded', () => {
  const langBtn = document.getElementById("lang-toggle");
  if (langBtn) {
    langBtn.addEventListener("click", toggleLang);
  }
});

async function waitForGalleryReady(timeout = 10000) {
  const gallery = document.querySelector('.experience-gallery');
  if (!gallery) return;

  const images = gallery.querySelectorAll('img');
  if (images.length === 0) return;

  const imagePromises = Array.from(images).map(img =>
    new Promise(resolve => {
      if (img.complete) resolve();
      else img.onload = img.onerror = resolve;
    })
  );

  // Si tarda más de X segundos, continúa igual
  await Promise.race([
    Promise.all(imagePromises),
    new Promise(resolve => setTimeout(resolve, timeout))
  ]);

  // Forzar layout para evitar el bug del scroll
  gallery.scrollLeft = gallery.scrollWidth;
  gallery.offsetHeight;
  gallery.scrollLeft = 0;
}


window.addEventListener("load", async () => {
  const loader = document.getElementById("loader");
  const main = document.querySelector("main");
  const lang = getLang();

setTimeout(() => {
  const delayMsg = document.getElementById("loader-delay-msg");
  if (delayMsg) delayMsg.style.display = "block";
}, 30000); // 30 segundos


  console.log("Cargando galería...");
  const projects = await loadGallery(lang);
  console.log("Proyectos cargados:", projects);
  console.log("Renderizando...");
  renderGallery(projects);
  console.log("Esperando imágenes...");
  
  await waitForGalleryReady();
  console.log("Galería lista. Ocultando loader...");

  updateExperienceFade();

  loader.style.opacity = 0;
  loader.style.transition = "opacity 0.5s ease";

  setTimeout(() => {
    loader.style.display = "none";
    main.classList.add("visible");

    requestAnimationFrame(() => {
      document.dispatchEvent(new Event("aos:manual-start"));
      AOS.refresh();
    });
  }, 600);
});

window.updateExperienceFade = function () {
  const gallery = document.querySelector('.experience-gallery');
  const fadeLeft = document.querySelector('.experience-fade.left');
  const fadeRight = document.querySelector('.experience-fade.right');
  const prevBtn = document.getElementById('prev-exp');
  const nextBtn = document.getElementById('next-exp');

  if (!gallery || !fadeLeft || !fadeRight || !prevBtn || !nextBtn) return;

  const scrollLeft = gallery.scrollLeft;
  const maxScrollLeft = gallery.scrollWidth - gallery.clientWidth;

  const canScrollLeft = scrollLeft > 5;
  const canScrollRight = scrollLeft < maxScrollLeft - 5;

  // Fades
  fadeLeft.classList.toggle('visible', canScrollLeft);
  fadeRight.classList.toggle('visible', canScrollRight);

  // Botones
  prevBtn.classList.toggle('disabled', !canScrollLeft);
  nextBtn.classList.toggle('disabled', !canScrollRight);
};

const gallery = document.querySelector('.experience-gallery');
const prevBtn = document.getElementById('prev-exp');
const nextBtn = document.getElementById('next-exp');

if (gallery && prevBtn && nextBtn) {
  const scrollAmount = 350;

  prevBtn.addEventListener('click', () => {
    gallery.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  });

  nextBtn.addEventListener('click', () => {
    gallery.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  });

  // Actualizar fades dinámicamente cuando se hace scroll manual o con botón
  gallery.addEventListener('scroll', updateExperienceFade);
}

window.setupGalleryFilters = function () {
  const filterButtons = document.querySelectorAll('.experience-filters button');

  // Ocultar los botones de categorías vacías
  const categoriesInUse = new Set(
    [...document.querySelectorAll('.job-card')].map(card =>
      card.getAttribute('data-category')
    )
  );

  filterButtons.forEach(button => {
    const filter = button.getAttribute('data-filter');
    if (filter !== 'all' && !categoriesInUse.has(filter)) {
      button.style.display = 'none';
    }

    // Asignar el evento de click solo a los visibles
    button.addEventListener('click', () => {
      const cards = document.querySelectorAll('.job-card');
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      cards.forEach(card => {

        card.classList.remove('expanded');
        card.querySelector('.job-description')?.scrollTo({ top: 0 });
        
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          // Mostrar tarjeta: quitar hidden, luego permitir transición
          card.classList.remove('hidden');
          requestAnimationFrame(() => {
            card.classList.remove('hide-transition');
          });
        } else {
          // Ocultar con transición
          card.classList.add('hide-transition');
          setTimeout(() => {
            card.classList.add('hidden');
          }, 300); // mismo tiempo que la transición en CSS
        }
      });
    });
  });
};


