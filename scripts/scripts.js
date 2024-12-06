document.addEventListener("DOMContentLoaded", function () {
  function showSection(id) {
      // Ocultar todas las secciones
      document.querySelectorAll('.section').forEach(section => {
          section.classList.add('hidden'); // Ocultar con clase 'hidden'
          section.classList.remove('active'); // Asegurarse de que no esté activa
      });

      // Mostrar solo la sección seleccionada
      const selectedSection = document.getElementById(id);
      if (selectedSection) {
          selectedSection.classList.remove('hidden'); // Mostrar eliminando 'hidden'
          selectedSection.classList.add('active'); // Activar añadiendo 'active'
      } else {
          console.error(`No se encontró la sección con ID "${id}".`);
      }
  }

  // Exponer la función al ámbito global
  window.showSection = showSection;

  // Mostrar la sección "home" por defecto
  showSection('home');
});

