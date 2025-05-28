export async function loadGallery(lang = 'es') {
  try {
    const res = await fetch('./data/gallery.json');
    const data = await res.json();
    return data[lang] || [];
  } catch (err) {
    console.error("Error cargando la galería:", err);
    return [];
  }
}