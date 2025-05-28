export async function applyTextTranslations(lang = 'es') {
  try {
    console.log("Cargando traducciones para:", lang);
    const res = await fetch('./data/text.json');
    const data = await res.json();
    const translations = data[lang];

    if (!translations) {
      console.warn("No se encontraron traducciones para:", lang);
      return;
    }

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const value = key.split('.').reduce((acc, part) => acc?.[part], translations);

      console.log(`→ ${key}:`, value);

      if (value) el.textContent = value;
      else console.warn(`Clave sin traducción encontrada: ${key}`);
    });
  } catch (err) {
    console.error("Error cargando traducciones:", err);
  }
}