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

    card.addEventListener('click', e => {
      if (e.target.classList.contains('job-close')) return;
      card.classList.add('expanded');
      card.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });

    card.querySelector('.job-close').addEventListener('click', e => {
      e.stopPropagation();
      card.querySelector('.job-description').scrollTop = 0;
      card.classList.remove('expanded');
    });

    gallery.appendChild(card);
  });

  // Reactivar animaciones y fades
  requestAnimationFrame(() => {
    if (window.AOS) AOS.refresh();
    if (window.updateExperienceFade) updateExperienceFade();
  });
}
