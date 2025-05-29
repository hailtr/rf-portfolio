export function getLang() {
  const stored = localStorage.getItem("lang");
  if (stored) return stored;

  const browserLang = navigator.language.slice(0, 2).toLowerCase();
  return browserLang === "es" ? "es" : "en";
}

export function setLang(lang) {
  localStorage.setItem("lang", lang);
}

export function toggleLang() {
  const current = getLang();
  const next = current === "es" ? "en" : "es";
  setLang(next);
  window.location.reload();
}
