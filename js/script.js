/**
 * Script principal pour le mini-projet "Impact de l'IA sur les métiers"
 * Fonctionnalités : Menu responsive, filtre du tableau, modale d'évaluation,
 * checklist de compétences persistante (localStorage) et bouton retour en haut.
 */

document.addEventListener("DOMContentLoaded", () => {
  initMobileMenu();
  initTableSearch();
  initQuizModal();
  initSkillsChecklist();
  initScrollTopButton();
});

/* 1. Menu Hamburger Responsive */
function initMobileMenu() {
  const toggleBtn = document.getElementById("menuToggle");
  const navList = document.getElementById("navList");
  if (!toggleBtn || !navList) return;

  toggleBtn.addEventListener("click", () => {
    const isOpen = navList.classList.toggle("open");
    toggleBtn.setAttribute("aria-expanded", String(isOpen));
  });
}

/* 2. Recherche dynamique dans le tableau de index.html */
function initTableSearch() {
  const searchInput = document.getElementById("tableSearch");
  const table = document.getElementById("categoriesTable");
  if (!searchInput || !table) return;

  const rows = table.querySelectorAll("tbody tr");

  searchInput.addEventListener("input", (event) => {
    const query = event.target.value.trim().toLowerCase();
    rows.forEach((row) => {
      const text = row.textContent.toLowerCase();
      row.style.display = text.includes(query) ? "" : "none";
    });
  });
}

/* 3. Modale interactive d'auto-évaluation sur index.html */
function initQuizModal() {
  const openBtn = document.getElementById("openQuizBtn");
  const closeBtn = document.getElementById("closeQuizBtn");
  const modal = document.getElementById("quizModal");
  const form = document.getElementById("quizForm");
  const resultDiv = document.getElementById("quizResult");

  if (!openBtn || !modal || !form) return;

  openBtn.addEventListener("click", () => {
    modal.hidden = false;
  });

  closeBtn.addEventListener("click", () => {
    modal.hidden = true;
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.hidden = true;
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const selected = form.querySelector('input[name="profil"]:checked');
    if (!selected) return;

    const messages = {
      repetitif: "Recommandation : Consultez « Métiers en voie de disparition » pour anticiper une reconversion.",
      hybride: "Recommandation : Consultez « Métiers en transformation » pour maîtriser les copilotes IA.",
      innovant: "Recommandation : Consultez « Métiers émergents » pour découvrir les postes d'avenir."
    };

    resultDiv.textContent = messages[selected.value] || "";
  });
}

/* 4. Checklist de compétences avec sauvegarde localStorage (pages catégories) */
function initSkillsChecklist() {
  const checklist = document.querySelector(".skills-checklist");
  const progressText = document.getElementById("skillProgress");
  if (!checklist || !progressText) return;

  const category = checklist.dataset.category || "default";
  const storageKey = `ia_skills_${category}`;
  const checkboxes = checklist.querySelectorAll('input[type="checkbox"]');

  // Charger l'état sauvegardé
  const saved = JSON.parse(localStorage.getItem(storageKey) || "[]");
  checkboxes.forEach((cb) => {
    if (saved.includes(cb.value)) cb.checked = true;
  });

  const updateProgress = () => {
    const checkedValues = Array.from(checkboxes)
      .filter((cb) => cb.checked)
      .map((cb) => cb.value);

    localStorage.setItem(storageKey, JSON.stringify(checkedValues));
    progressText.textContent = `Progression : ${checkedValues.length} / ${checkboxes.length} compétences validées`;
  };

  checkboxes.forEach((cb) => cb.addEventListener("change", updateProgress));
  updateProgress();
}

/* 5. Bouton "Remonter en haut" */
function initScrollTopButton() {
  const btn = document.getElementById("scrollTopBtn");
  if (!btn) return;

  window.addEventListener("scroll", () => {
    btn.classList.toggle("visible", window.scrollY > 250);
  });

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}