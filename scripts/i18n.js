export function getLang() {
  return localStorage.getItem("lang") ||
         (navigator.language.startsWith("en") ? "en" : "es");
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
