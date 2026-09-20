const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const siteRoot = new URL("../", import.meta.url);

function siteHref(path = "") {
  return new URL(path, siteRoot).href;
}

function navigationMarkup(activeSection = "") {
  const links = [
    ["journey", "Journey", "journey/"],
    ["library", "Library", "library/"],
    ["web", "Wisdom Web", "web/"],
    ["practices", "Practices", "practices/"],
    ["about", "About", "about/"],
  ];

  return links
    .map(([section, label, path]) => {
      const current = section === activeSection ? ' aria-current="page"' : "";
      return `<a href="${siteHref(path)}"${current}>${label}</a>`;
    })
    .join("");
}

function wordmarkMarkup(modifier = "") {
  return `
    <a class="wordmark${modifier}" href="${siteHref()}" aria-label="Breaking Your Genetic Code, home">
      <img class="wordmark__seal" src="${siteHref("assets/seal.svg")}" width="48" height="48" alt="">
      <span class="wordmark__type" aria-hidden="true">
        <span>Breaking Your</span>
        <span>Genetic Code</span>
      </span>
    </a>`;
}

export function renderPageChrome(activeSection = "") {
  const header = document.querySelector("[data-page-header]");
  const mobileMenu = document.querySelector("[data-page-mobile-menu]");
  const footer = document.querySelector("[data-page-footer]");
  const navigation = navigationMarkup(activeSection);

  if (header) {
    header.className = "site-header site-header--solid";
    header.dataset.siteHeader = "";
    header.innerHTML = `
      <div class="site-header__inner">
        ${wordmarkMarkup()}
        <nav class="primary-nav" aria-label="Primary navigation">${navigation}</nav>
        <div class="header-actions">
          <form class="site-search" role="search" action="${siteHref("library/")}" data-site-search>
            <label class="sr-only" for="site-search-input">Search the living library</label>
            <input class="site-search__input" id="site-search-input" name="q" type="search"
              placeholder="Search the library" autocomplete="off" tabindex="-1" data-search-input>
            <button class="icon-button site-search__toggle" type="button" aria-label="Open search"
              aria-expanded="false" aria-controls="site-search-input" data-search-toggle>
              <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.3"></circle><path d="m15.5 15.5 4.2 4.2"></path></svg>
            </button>
          </form>
          <a class="header-cta" href="${siteHref("journey/")}">Awaken Within</a>
          <button class="menu-toggle" type="button" aria-label="Open menu" aria-expanded="false"
            aria-controls="mobile-menu" data-menu-toggle><span></span><span></span><span></span></button>
        </div>
      </div>`;
  }

  if (mobileMenu) {
    mobileMenu.className = "mobile-menu";
    mobileMenu.id = "mobile-menu";
    mobileMenu.dataset.mobileMenu = "";
    mobileMenu.setAttribute("aria-hidden", "true");
    mobileMenu.innerHTML = `
      <nav class="mobile-menu__nav" aria-label="Mobile navigation">${navigation}</nav>
      <form class="mobile-search" role="search" action="${siteHref("library/")}">
        <label for="mobile-search-input">Search the living library</label>
        <div class="mobile-search__field">
          <input id="mobile-search-input" name="q" type="search" placeholder="Title, tradition, teaching">
          <button type="submit" aria-label="Search">
            <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.3"></circle><path d="m15.5 15.5 4.2 4.2"></path></svg>
          </button>
        </div>
      </form>`;
  }

  if (footer) {
    footer.className = "site-footer reveal-band";
    footer.innerHTML = `
      <div class="site-footer__inner">
        ${wordmarkMarkup(" wordmark--footer")}
        <nav class="footer-nav" aria-label="Footer navigation">${navigation}</nav>
        <div class="site-footer__end">
          <div class="social-links" aria-hidden="true">
            <span><svg viewBox="0 0 24 24"><rect x="3" y="6.5" width="18" height="11" rx="3"></rect><path d="m10 9.2 5 2.8-5 2.8Z"></path></svg></span>
            <span><svg viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="4"></rect><circle cx="12" cy="12" r="3.6"></circle><circle cx="17.4" cy="6.7" r=".7" class="social-links__fill"></circle></svg></span>
            <span><svg viewBox="0 0 24 24"><path d="M5 4.5 19 19.5M19 4.5 5 19.5"></path></svg></span>
          </div>
          <p>A more conscious world<br>is possible.</p>
        </div>
      </div>`;
  }
}

export function initializeSiteChrome() {
  const header = document.querySelector("[data-site-header]");
  const search = document.querySelector("[data-site-search]");
  const searchToggle = document.querySelector("[data-search-toggle]");
  const searchInput = document.querySelector("[data-search-input]");
  const menuToggle = document.querySelector("[data-menu-toggle]");
  const mobileMenu = document.querySelector("[data-mobile-menu]");

  function updateHeader() {
    if (!header) return;
    header.classList.toggle(
      "is-scrolled",
      header.classList.contains("site-header--solid") || window.scrollY > 80,
    );
  }

  function setSearchOpen(open) {
    if (!search || !searchToggle || !searchInput) return;

    search.classList.toggle("is-open", open);
    searchToggle.setAttribute("aria-expanded", String(open));
    searchToggle.setAttribute("aria-label", open ? "Close search" : "Open search");
    searchInput.tabIndex = open ? 0 : -1;

    if (open) searchInput.focus();
  }

  function setMenuOpen(open) {
    if (!menuToggle || !mobileMenu) return;

    document.body.classList.toggle("nav-open", open);
    mobileMenu.classList.toggle("is-open", open);
    mobileMenu.setAttribute("aria-hidden", String(!open));
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");

    if (open) mobileMenu.querySelector("a")?.focus();
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
}

export function initializeRevealObserver() {
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
