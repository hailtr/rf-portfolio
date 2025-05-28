import { getLang } from './i18n.js';
import { loadGallery } from './loadGallery.js';
import { renderGallery } from './renderGallery.js';

async function waitForGalleryReady() {
  const gallery = document.querySelector('.experience-gallery');
  const images = gallery.querySelectorAll('img');

  const imagePromises = Array.from(images).map(img =>
    new Promise(resolve => {
      if (img.complete) resolve();
      else img.onload = img.onerror = resolve;
    })
  );

  await Promise.all(imagePromises);
  gallery.scrollLeft = gallery.scrollWidth;
  gallery.offsetHeight;
  gallery.scrollLeft = 0;
}

window.addEventListener("load", async () => {
  const loader = document.getElementById("loader");
  const main = document.querySelector("main");
  const lang = getLang();

  const projects = await loadGallery(lang);
  renderGallery(projects);
  await waitForGalleryReady();

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
