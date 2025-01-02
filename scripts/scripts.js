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

/* Fragmento de galería de trabajos */
document.addEventListener("DOMContentLoaded", function () {
    const filterButtons = document.querySelectorAll(".filter-button");
    const galleryItems = document.querySelectorAll(".gallery-item");
    const jobSection = document.getElementById("job");
    const projectDetailsSection = document.getElementById("project-details");
    const backButton = document.querySelector(".back-button");
    const projectContent = document.querySelector(".project-content");
  
    filterButtons.forEach(button => {
      button.addEventListener("click", () => {
        const filter = button.getAttribute("data-filter");
        galleryItems.forEach(item => {
          item.style.display = filter === "all" || item.classList.contains(filter) ? "block" : "none";
        });
      });
    });
  
    galleryItems.forEach(item => {
      item.addEventListener("click", () => {
        const project = item.getAttribute("data-project");
        loadProjectDetails(project);
        jobSection.classList.add("hidden");
        projectDetailsSection.classList.remove("hidden");
      });
    });
  
    backButton.addEventListener("click", () => {
      projectDetailsSection.classList.add("hidden");
      jobSection.classList.remove("hidden");
    });
  
    function loadProjectDetails(project) {
      // Aquí puedes cargar el contenido del proyecto dinámicamente
      projectContent.innerHTML = `<h2>Detalles del Proyecto ${project}</h2><p>Contenido del proyecto ${project}.</p>`;
      console.log("Contenedor seleccionado:", projectContent);
    }
    
  });

  const button = document.getElementById("toggleButton");
  const hiddenText = document.getElementById("hiddenText");
  
  button.addEventListener("click", () => {
    if (hiddenText.style.display === "none") {
      hiddenText.style.display = "block";
      button.textContent = "Ver menos";
    } else {
      hiddenText.style.display = "none";
      button.textContent = "Ver más";
    }
  });
  

  
  
