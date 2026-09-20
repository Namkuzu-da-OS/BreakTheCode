import { loadData } from "../data.js";
import { readStore, writeStore } from "../store.js";
import {
  initializePageChrome,
  initializePageReveals,
  quoteSourceLabel,
  renderPageError,
  setDocumentTitle,
  siteHref,
} from "./shared.js";

const libraryRoot = document.querySelector("[data-library-index]");
const textRoot = document.querySelector("[data-library-text]");
const featuredPlateIds = ["upanishads", "taoTeChing", "dhammapada", "marcusAurelius", "rumi", "blake"];
const timelineMin = -1200;
const timelineMax = 2000;

function textHref(text) {
  return siteHref(`library/${encodeURIComponent(text.id)}/`);
}

function createArtifactPlate(text, className, eager = false) {
  const index = featuredPlateIds.indexOf(text.id);
  const plate = document.createElement("div");
  plate.className = `${className} ${index >= 0 ? "is-artifact" : "is-abstract"}`;
  plate.setAttribute("aria-hidden", "true");

  if (index >= 0) {
    const number = String(index + 1).padStart(2, "0");
    const picture = document.createElement("picture");
    picture.innerHTML = `
      <source srcset="${siteHref(`assets/art/library-${number}.webp`)}" type="image/webp">
      <img src="${siteHref(`assets/art/library-${number}.jpg`)}" width="800" height="1000" alt=""
        loading="${eager ? "eager" : "lazy"}" decoding="async">`;
    plate.append(picture);
  } else {
    const sigil = document.createElement("span");
    sigil.className = "abstract-plate__sigil";
    sigil.textContent = text.title
      .replace(/^(the|a)\s+/i, "")
      .split(/\s+/)
      .slice(0, 2)
      .map((word) => word[0])
      .join("");
    const line = document.createElement("span");
    line.className = "abstract-plate__line";
    line.textContent = text.eraName;
    plate.append(sigil, line);
  }

  return plate;
}

function themesForText(text, themes) {
  return themes.filter((theme) => theme.textIds.includes(text.id));
}

function createLibraryCard(text, themes) {
  const link = document.createElement("a");
  link.className = "library-page-card";
  link.href = textHref(text);
  link.dataset.title = text.title;

  link.append(createArtifactPlate(text, "library-page-card__plate"));

  const body = document.createElement("span");
  body.className = "library-page-card__body";
  const title = document.createElement("span");
  title.className = "library-page-card__title";
  title.textContent = text.title;
  const meta = document.createElement("span");
  meta.className = "library-page-card__meta";
  meta.textContent = `${text.period} · ${text.tradition}`;
  const teaching = document.createElement("span");
  teaching.className = "library-page-card__teaching";
  teaching.textContent = text.keyTeaching;
  const tags = document.createElement("span");
  tags.className = "library-page-card__tags";
  themesForText(text, themes).slice(0, 3).forEach((theme) => {
    const tag = document.createElement("span");
    tag.textContent = theme.label;
    tags.append(tag);
  });
  const count = document.createElement("span");
  count.className = "library-page-card__count";
  count.textContent = `${text.quotes.length} ${text.quotes.length === 1 ? "quote" : "quotes"}`;

  body.append(title, meta, teaching, tags, count);
  link.append(body);
  return link;
}

function createLibraryMasthead() {
  const masthead = document.createElement("section");
  masthead.className = "page-masthead page-masthead--library";
  masthead.innerHTML = `
    <picture class="page-masthead__plate" aria-hidden="true">
      <source srcset="${siteHref("assets/art/web-starfield.webp")}" type="image/webp">
      <img src="${siteHref("assets/art/web-starfield.jpg")}" width="2560" height="1097" alt="" loading="eager" decoding="async">
    </picture>
    <div class="page-masthead__shade" aria-hidden="true"></div>
    <div class="micro-label page-masthead__micro page-masthead__micro--left" aria-hidden="true">
      <span>Timeless Teachings</span><span>Living Inquiry</span>
    </div>
    <div class="micro-label page-masthead__micro page-masthead__micro--right" aria-hidden="true">
      <span>Sixteen Texts</span><span>Twenty-Eight Quotes</span>
    </div>
    <div class="page-masthead__content">
      <p class="page-eyebrow">Ancient Texts. Living Wisdom. Modern Insights.</p>
      <h1>The Living Library</h1>
      <p>Read across traditions without flattening their differences.</p>
    </div>`;
  return masthead;
}

function createSelect(label, name, firstLabel, values) {
  const wrapper = document.createElement("label");
  wrapper.className = "filter-pill";
  const accessible = document.createElement("span");
  accessible.className = "sr-only";
  accessible.textContent = label;
  const select = document.createElement("select");
  select.name = name;
  select.dataset.filter = name;
  const first = document.createElement("option");
  first.value = "all";
  first.textContent = firstLabel;
  select.append(first);
  values.forEach(([value, optionLabel]) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = optionLabel;
    select.append(option);
  });
  const chevron = document.createElement("span");
  chevron.className = "filter-pill__chevron";
  chevron.setAttribute("aria-hidden", "true");
  wrapper.append(accessible, select, chevron);
  return wrapper;
}

function createBrowsePanel(texts, themes) {
  const traditions = [...new Set(texts.map((text) => text.tradition))].sort((a, b) => a.localeCompare(b));
  const eras = [...new Map(texts.map((text) => [text.era, text.eraName])).entries()];

  const panel = document.createElement("section");
  panel.className = "library-browser reveal-band";
  panel.setAttribute("aria-labelledby", "browse-library-title");
  panel.innerHTML = `
    <div class="library-browser__heading">
      <div><p class="page-eyebrow">Browse the archive</p><h2 id="browse-library-title">Find a thread to follow</h2></div>
      <p class="library-browser__count" aria-live="polite" data-library-count></p>
    </div>`;

  const controls = document.createElement("div");
  controls.className = "library-browser__controls";

  const search = document.createElement("label");
  search.className = "library-search-field";
  search.innerHTML = `
    <span class="sr-only">Search by title, tradition, or key teaching</span>
    <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.3"></circle><path d="m15.5 15.5 4.2 4.2"></path></svg>
    <input type="search" name="q" placeholder="Search title, tradition, or teaching" autocomplete="off" data-library-search>`;
  controls.append(
    search,
    createSelect("Filter by tradition", "tradition", "All Traditions", traditions.map((item) => [item, item])),
    createSelect("Filter by era", "era", "All Eras", eras),
    createSelect("Filter by theme", "theme", "All Themes", themes.map((theme) => [theme.id, theme.label])),
  );

  const timeline = document.createElement("fieldset");
  timeline.className = "era-timeline";
  timeline.innerHTML = `
    <legend>Era timeline</legend>
    <div class="era-timeline__readout">
      <output data-era-min-output>1200 BCE</output>
      <span aria-hidden="true">to</span>
      <output data-era-max-output>2000 CE</output>
    </div>
    <div class="era-timeline__track" data-era-track>
      <input type="range" min="${timelineMin}" max="${timelineMax}" step="50" value="${timelineMin}"
        aria-label="Earliest era" data-era-min>
      <input type="range" min="${timelineMin}" max="${timelineMax}" step="50" value="${timelineMax}"
        aria-label="Latest era" data-era-max>
    </div>
    <div class="era-timeline__ticks" aria-hidden="true">
      <span>1200 BCE</span><span>800 BCE</span><span>400 BCE</span><span>0</span><span>400 CE</span><span>800 CE</span><span>1200 CE</span><span>1600 CE</span><span>2000 CE</span>
    </div>`;

  const grid = document.createElement("div");
  grid.className = "library-page-grid";
  grid.dataset.libraryGrid = "";

  panel.append(controls, timeline, grid);
  return panel;
}

function estimateYear(period) {
  const normalized = period.toLowerCase();
  const numbers = [...normalized.matchAll(/\d+/g)].map((match) => Number(match[0]));
  if (!numbers.length) return 0;

  const century = normalized.includes("century");
  if (century) {
    const values = numbers.slice(0, 2).map((value) => (value - 1) * 100 + 50);
    const midpoint = values.reduce((sum, value) => sum + value, 0) / values.length;
    return normalized.includes("bce") ? -midpoint : Math.min(midpoint, timelineMax);
  }

  const values = numbers.slice(0, 2);
  const midpoint = values.reduce((sum, value) => sum + value, 0) / values.length;
  return normalized.includes("bce") ? -midpoint : Math.min(midpoint, timelineMax);
}

function formatYear(year) {
  if (year < 0) return `${Math.abs(year)} BCE`;
  if (year === 0) return "0";
  return `${year} CE`;
}

function wireBrowsePanel(panel, texts, themes) {
  const search = panel.querySelector("[data-library-search]");
  const tradition = panel.querySelector('[data-filter="tradition"]');
  const era = panel.querySelector('[data-filter="era"]');
  const theme = panel.querySelector('[data-filter="theme"]');
  const minInput = panel.querySelector("[data-era-min]");
  const maxInput = panel.querySelector("[data-era-max]");
  const minOutput = panel.querySelector("[data-era-min-output]");
  const maxOutput = panel.querySelector("[data-era-max-output]");
  const track = panel.querySelector("[data-era-track]");
  const count = panel.querySelector("[data-library-count]");
  const grid = panel.querySelector("[data-library-grid]");
  const parameters = new URLSearchParams(window.location.search);
  const query = parameters.get("q") || "";
  const requestedTheme = parameters.get("theme");
  search.value = query;
  if (requestedTheme && themes.some((item) => item.id === requestedTheme)) theme.value = requestedTheme;

  function render() {
    const minimum = Number(minInput.value);
    const maximum = Number(maxInput.value);
    const selectedTheme = themes.find((item) => item.id === theme.value);
    const needle = search.value.trim().toLowerCase();

    const shown = texts.filter((text) => {
      const searchable = [text.title, text.tradition, text.keyTeaching].join(" ").toLowerCase();
      const year = estimateYear(text.period);
      return (!needle || searchable.includes(needle))
        && (tradition.value === "all" || text.tradition === tradition.value)
        && (era.value === "all" || text.era === era.value)
        && (!selectedTheme || selectedTheme.textIds.includes(text.id))
        && year >= minimum
        && year <= maximum;
    });

    grid.replaceChildren(...shown.map((text) => createLibraryCard(text, themes)));
    if (!shown.length) {
      const empty = document.createElement("p");
      empty.className = "library-page-grid__empty";
      empty.textContent = "No texts match these filters. Widen the era or try another thread.";
      grid.append(empty);
    }

    count.textContent = `${texts.length} texts · ${shown.length} shown`;
    minOutput.value = formatYear(minimum);
    maxOutput.value = formatYear(maximum);
    const start = ((minimum - timelineMin) / (timelineMax - timelineMin)) * 100;
    const end = ((maximum - timelineMin) / (timelineMax - timelineMin)) * 100;
    track.style.setProperty("--range-start", `${start}%`);
    track.style.setProperty("--range-end", `${end}%`);
  }

  search.addEventListener("input", render);
  [tradition, era, theme].forEach((control) => control.addEventListener("change", render));
  minInput.addEventListener("input", () => {
    if (Number(minInput.value) > Number(maxInput.value)) minInput.value = maxInput.value;
    render();
  });
  maxInput.addEventListener("input", () => {
    if (Number(maxInput.value) < Number(minInput.value)) maxInput.value = minInput.value;
    render();
  });
  render();
}

function renderLibraryIndex(texts, themes) {
  setDocumentTitle("The Living Library");
  const masthead = createLibraryMasthead();
  const browser = createBrowsePanel(texts, themes);
  libraryRoot.replaceChildren(masthead, browser);
  wireBrowsePanel(browser, texts, themes);
}

function routeId() {
  const parts = window.location.pathname.split("/").filter(Boolean);
  return decodeURIComponent(parts.at(-1) || "");
}

function citationBlock(quote) {
  const footer = document.createElement("footer");
  footer.className = "quote-card__citation";

  const edition = document.createElement("span");
  edition.textContent = quoteSourceLabel(quote.source);
  footer.append(edition);

  if (quote.source?.note) {
    const note = document.createElement("span");
    note.textContent = quote.source.note;
    footer.append(note);
  }

  if (!quote.source?.verified) {
    const honesty = document.createElement("span");
    honesty.className = "honesty-mark";
    honesty.textContent = "Paraphrase / attribution uncertain";
    footer.append(honesty);
  }
  return footer;
}

function bookmarkKey(text, quote) {
  return `${text.id}:${quote.text}`;
}

function createBookmarkButton(text, quote, status) {
  const button = document.createElement("button");
  button.className = "bookmark-button";
  button.type = "button";

  function isSaved() {
    const saved = readStore("bookmarks", []);
    return Array.isArray(saved) && saved.some((item) => item.id === bookmarkKey(text, quote));
  }

  function update() {
    const saved = isSaved();
    button.classList.toggle("is-saved", saved);
    button.textContent = saved ? "Saved to bookmarks" : "Add to bookmarks";
    button.setAttribute("aria-pressed", String(saved));
  }

  button.addEventListener("click", () => {
    const current = readStore("bookmarks", []);
    const bookmarks = Array.isArray(current) ? current : [];
    const id = bookmarkKey(text, quote);
    if (bookmarks.some((item) => item.id === id)) {
      writeStore("bookmarks", bookmarks.filter((item) => item.id !== id));
      status.textContent = "Removed from bookmarks.";
    } else {
      writeStore("bookmarks", [
        ...bookmarks,
        {
          id,
          quote: quote.text,
          context: quote.context,
          source: text.title,
          textId: text.id,
          period: text.period,
          tradition: text.tradition,
          keyTeaching: text.keyTeaching,
          citation: quote.source,
          savedAt: new Date().toISOString(),
        },
      ]);
      status.textContent = "Saved to bookmarks.";
    }
    update();
  });

  update();
  return button;
}

function createQuoteCard(text, quote, index) {
  const article = document.createElement("article");
  article.className = "quote-card reveal-band";
  article.setAttribute("aria-labelledby", `quote-${index + 1}-title`);

  const label = document.createElement("p");
  label.className = "page-eyebrow";
  label.id = `quote-${index + 1}-title`;
  label.textContent = `Passage ${String(index + 1).padStart(2, "0")}`;
  const blockquote = document.createElement("blockquote");
  blockquote.textContent = `“${quote.text}”`;
  const context = document.createElement("p");
  context.className = "quote-card__context";
  context.textContent = quote.context;
  const status = document.createElement("span");
  status.className = "quote-card__status sr-only";
  status.setAttribute("aria-live", "polite");

  article.append(label, blockquote, context, citationBlock(quote), createBookmarkButton(text, quote, status), status);
  return article;
}

function renderTextPage(text, texts, themes, chapters) {
  setDocumentTitle(text.title);
  const masthead = document.createElement("section");
  masthead.className = "text-masthead";
  masthead.append(createArtifactPlate(text, "text-masthead__plate", true));
  const shade = document.createElement("div");
  shade.className = "text-masthead__shade";
  shade.setAttribute("aria-hidden", "true");
  const content = document.createElement("div");
  content.className = "text-masthead__content";
  content.innerHTML = `<a class="page-breadcrumb" href="${siteHref("library/")}">The Living Library</a>`;
  const eyebrow = document.createElement("p");
  eyebrow.className = "page-eyebrow";
  eyebrow.textContent = `${text.period} · ${text.tradition}`;
  const title = document.createElement("h1");
  title.textContent = text.title;
  const teaching = document.createElement("p");
  teaching.className = "text-masthead__teaching";
  teaching.textContent = text.keyTeaching;
  content.append(eyebrow, title, teaching);
  masthead.append(shade, content);

  const overview = document.createElement("section");
  overview.className = "text-overview reveal-band";
  const textThemes = themesForText(text, themes);
  overview.innerHTML = `
    <div class="text-overview__teaching">
      <p class="page-eyebrow">Key Teaching</p>
      <h2></h2>
    </div>
    <div class="text-overview__metadata">
      <dl><div><dt>Period</dt><dd></dd></div><div><dt>Tradition</dt><dd></dd></div><div><dt>Passages</dt><dd></dd></div></dl>
      <div class="text-overview__themes" aria-label="Related themes"></div>
    </div>`;
  overview.querySelector("h2").textContent = text.keyTeaching;
  const values = overview.querySelectorAll("dd");
  values[0].textContent = text.period;
  values[1].textContent = text.tradition;
  values[2].textContent = String(text.quotes.length);
  const themeList = overview.querySelector(".text-overview__themes");
  textThemes.forEach((theme) => {
    const item = document.createElement("span");
    item.textContent = theme.label;
    themeList.append(item);
  });

  const passages = document.createElement("section");
  passages.className = "text-passages";
  passages.setAttribute("aria-labelledby", "text-passages-title");
  passages.innerHTML = `
    <header class="page-section__heading">
      <p class="page-eyebrow">Words and context</p>
      <h2 id="text-passages-title">Passages from ${text.title}</h2>
    </header>`;
  const quoteGrid = document.createElement("div");
  quoteGrid.className = "quote-grid";
  quoteGrid.append(...text.quotes.map((quote, index) => createQuoteCard(text, quote, index)));
  passages.append(quoteGrid);

  const speaks = document.createElement("section");
  speaks.className = "where-speaks reveal-band";
  speaks.setAttribute("aria-labelledby", "where-speaks-title");
  speaks.innerHTML = `
    <div><p class="page-eyebrow">Where this speaks</p><h2 id="where-speaks-title">Follow it into the journey</h2></div>
    <div class="where-speaks__links"></div>`;
  const links = speaks.querySelector(".where-speaks__links");
  const related = chapters.filter((chapter) => chapter.wisdomCard.textId === text.id);
  if (related.length) {
    related.forEach((chapter) => {
      const link = document.createElement("a");
      link.href = siteHref(`journey/${encodeURIComponent(chapter.id)}/`);
      link.innerHTML = `<span>${String(chapter.n).padStart(2, "0")}</span>`;
      const label = document.createElement("strong");
      label.textContent = chapter.title;
      link.append(label);
      links.append(link);
    });
  } else {
    const empty = document.createElement("p");
    empty.textContent = "No journey chapter currently draws directly from this text.";
    links.append(empty);
  }

  const currentIndex = texts.findIndex((item) => item.id === text.id);
  const returnLink = document.createElement("nav");
  returnLink.className = "text-navigation reveal-band";
  returnLink.setAttribute("aria-label", "Library text navigation");
  const previous = texts[(currentIndex - 1 + texts.length) % texts.length];
  const next = texts[(currentIndex + 1) % texts.length];
  returnLink.innerHTML = `<a href="${textHref(previous)}">← <span>${previous.title}</span></a><a href="${siteHref("library/")}">All texts</a><a href="${textHref(next)}"><span>${next.title}</span> →</a>`;

  textRoot.replaceChildren(masthead, overview, passages, speaks, returnLink);
}

async function initialize() {
  initializePageChrome("library");

  try {
    const [texts, themes, chapters] = await Promise.all([
      loadData("texts.json"),
      loadData("themes.json"),
      loadData("chapters.json"),
    ]);

    if (libraryRoot) {
      renderLibraryIndex(texts, themes);
      initializePageReveals();
      return;
    }

    if (!textRoot) return;
    const text = texts.find((item) => item.id === routeId());
    if (!text) {
      renderPageError(textRoot, "This text could not be found.", "library/", "Return to the library");
      return;
    }

    renderTextPage(text, texts, themes, chapters);
    initializePageReveals();
  } catch {
    const root = libraryRoot || textRoot;
    if (root) renderPageError(root, "The living library could not be opened.", "", "Return home");
  }
}

initialize();
