export function renderGallery(projects) {
  const gallery = document.querySelector('.experience-gallery');
  if (!gallery) return;

  gallery.innerHTML = '';

  projects.forEach(project => {
    const card = document.createElement('div');
    card.className = 'job-card';
    card.setAttribute('data-category', project.category);

    card.innerHTML = `
      <div class="job-card-image-container">
        <img src="${project.images.desktop}" alt="Desktop preview" class="job-image-desktop" loading="eager">
        <img src="${project.images.mobile}" alt="Mobile preview" class="job-image-mobile" loading="eager">
      </div>
      <div class="job-card-content">
        <h3>${project.title}</h3>
        <h4>${project.subtitle}</h4>
        <div class="job-description">
          <p>${project.description}</p>
        </div>
        <div class="job-tags">
          ${project.tags.map(tag => `<span class="relative-skill hidden">${tag}</span>`).join('')}
        </div>
      </div>
      <button class="job-close">×</button>
    `;

    // Click para expandir la tarjeta
    card.addEventListener('click', e => {
      if (e.target.classList.contains('job-close')) return;

      // Cerrar cualquier otra tarjeta expandida
      document.querySelectorAll('.job-card.expanded').forEach(expandedCard => {
        if (expandedCard !== card) {
          expandedCard.classList.remove('expanded');
        }
      });

      card.classList.add('expanded');

      // Centrar la tarjeta solo si no está completamente visible
      requestAnimationFrame(() => {
        const cardLeft = card.offsetLeft;
        const cardWidth = card.offsetWidth;
        const galleryScroll = gallery.scrollLeft;
        const galleryWidth = gallery.clientWidth;

        const cardRight = cardLeft + cardWidth;
        const visibleLeft = galleryScroll;
        const visibleRight = galleryScroll + galleryWidth;

        const isFullyVisible = cardLeft >= visibleLeft && cardRight <= visibleRight;

        if (!isFullyVisible) {
          gallery.scrollTo({
            left: cardLeft - (galleryWidth - cardWidth) / 2,
            behavior: 'smooth'
          });
        }
      });

      if (typeof updateExperienceFade === 'function') updateExperienceFade();
    });

    // Botón de cierre
    card.querySelector('.job-close').addEventListener('click', e => {
      e.stopPropagation();
      card.querySelector('.job-description').scrollTop = 0;
      card.classList.remove('expanded');

      // Si ya no hay overflow, alinear al card más cercana
      requestAnimationFrame(() => {
        if (gallery.scrollWidth <= gallery.clientWidth + 1) {
          snapToNearestCard(gallery);
        }
      });

      if (typeof updateExperienceFade === 'function') updateExperienceFade();
    });

    gallery.appendChild(card);
  });

  // Animaciones y fades
  requestAnimationFrame(() => {
    if (window.AOS) AOS.refresh();
    if (window.updateExperienceFade) updateExperienceFade();
  });

  // Utilidad para alinear scroll al card más cercano
  function snapToNearestCard(gallery) {
    const card = gallery.querySelector('.job-card');
    if (!card) return;

    const cardStyle = getComputedStyle(card);
    const marginRight = parseFloat(cardStyle.marginRight || 0);
    const cardWidth = card.offsetWidth + marginRight;

    const index = Math.round(gallery.scrollLeft / cardWidth);
    const targetScroll = index * cardWidth;

    gallery.scrollTo({
      left: targetScroll,
      behavior: 'smooth'
    });
  }

  console.log("snapToNearestCard() llamada")
}
