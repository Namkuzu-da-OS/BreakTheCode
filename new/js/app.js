import { initializeJourneyBand } from "./bands/journey.js";
import { initializeLibraryBand } from "./bands/library.js";
import { initializeWebBand } from "./bands/web.js";
import { initializeWeighingBand } from "./bands/weighing.js";

const header = document.querySelector("[data-site-header]");
const search = document.querySelector("[data-site-search]");
const searchToggle = document.querySelector("[data-search-toggle]");
const searchInput = document.querySelector("[data-search-input]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const mobileMenu = document.querySelector("[data-mobile-menu]");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

function updateHeader() {
  header?.classList.toggle("is-scrolled", window.scrollY > 80);
}

function setSearchOpen(open) {
  if (!search || !searchToggle || !searchInput) return;

  search.classList.toggle("is-open", open);
  searchToggle.setAttribute("aria-expanded", String(open));
  searchToggle.setAttribute("aria-label", open ? "Close search" : "Open search");
  searchInput.tabIndex = open ? 0 : -1;

  if (open) {
    searchInput.focus();
  }
}

function setMenuOpen(open) {
  if (!menuToggle || !mobileMenu) return;

  document.body.classList.toggle("nav-open", open);
  mobileMenu.classList.toggle("is-open", open);
  mobileMenu.setAttribute("aria-hidden", String(!open));
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");

  if (open) {
    mobileMenu.querySelector("a")?.focus();
  }
}

function initializeRevealObserver() {
  const bands = [...document.querySelectorAll(".reveal-band")];
  if (!bands.length) return;

  if (reducedMotion.matches || !("IntersectionObserver" in window)) {
    bands.forEach((band) => band.classList.add("is-visible"));
    return;
  }

  document.body.classList.add("reveal-ready");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12 },
  );

  bands.forEach((band) => observer.observe(band));
}

window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

searchToggle?.addEventListener("click", () => {
  setSearchOpen(searchToggle.getAttribute("aria-expanded") !== "true");
});

search?.addEventListener("submit", (event) => {
  if (!searchInput?.value.trim()) {
    event.preventDefault();
    setSearchOpen(true);
  }
});

menuToggle?.addEventListener("click", () => {
  setMenuOpen(menuToggle.getAttribute("aria-expanded") !== "true");
});

mobileMenu?.addEventListener("click", (event) => {
  if (event.target.closest("a")) setMenuOpen(false);
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;

  if (menuToggle?.getAttribute("aria-expanded") === "true") {
    setMenuOpen(false);
    menuToggle.focus();
    return;
  }

  if (searchToggle?.getAttribute("aria-expanded") === "true") {
    setSearchOpen(false);
    searchToggle.focus();
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth >= 900) setMenuOpen(false);
});

initializeRevealObserver();
initializeJourneyBand();
initializeLibraryBand();
initializeWebBand();
initializeWeighingBand();
