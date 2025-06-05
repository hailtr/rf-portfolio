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
      const scope = el.getAttribute('data-i18n-scope') || '';
      const fullPath = scope ? [scope, ...key.split('.')] : key.split('.');
      const value = fullPath.reduce((acc, part) => acc?.[part], translations);

      console.log(`→ ${scope ? scope + '.' : ''}${key}:`, value);

      if (value) el.textContent = value;
      else console.warn(`Clave sin traducción encontrada: ${scope ? scope + '.' : ''}${key}`);
    });
  } catch (err) {
    console.error("Error cargando traducciones:", err);
  }
}
