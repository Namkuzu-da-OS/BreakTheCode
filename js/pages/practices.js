import { loadData } from "../data.js";
import { readStore, writeStore } from "../store.js";
import {
  initializePageChrome,
  initializePageReveals,
  renderPageError,
  setDocumentTitle,
  siteHref,
} from "./shared.js";

const root = document.querySelector("[data-practices-page]");

function createMasthead() {
  const masthead = document.createElement("section");
  masthead.className = "page-masthead page-masthead--compact page-masthead--practices";
  masthead.innerHTML = `
    <picture class="page-masthead__plate" aria-hidden="true">
      <source srcset="${siteHref("assets/art/weighing-scales.webp")}" type="image/webp">
      <img src="${siteHref("assets/art/weighing-scales.jpg")}" width="1400" height="1050" alt="" loading="eager" decoding="async">
    </picture>
    <div class="page-masthead__shade" aria-hidden="true"></div>
    <div class="micro-label page-masthead__micro page-masthead__micro--left" aria-hidden="true">
      <span>Read Slowly</span><span>Practice Honestly</span>
    </div>
    <div class="micro-label page-masthead__micro page-masthead__micro--right" aria-hidden="true">
      <span>Return</span><span>Reflect</span><span>Realign</span>
    </div>
    <div class="page-masthead__content">
      <p class="page-eyebrow">Study. Reflection. Return.</p>
      <h1>Practices</h1>
      <p>Keep the threads you are following in one quiet place.</p>
    </div>`;
  return masthead;
}

function rawLegacyValue(key) {
  try {
    const value = window.localStorage.getItem(key);
    return value === null ? null : JSON.parse(value);
  } catch {
    return null;
  }
}

function hasNamespacedValue(key) {
  try {
    return window.localStorage.getItem(`btc.${key}`) !== null;
  } catch {
    return false;
  }
}

function normalizeProgress(value, paths) {
  const source = value && typeof value === "object" ? value : {};
  return Object.fromEntries(paths.map((path) => [
    path.id,
    Object.fromEntries(path.texts.map((textId) => [textId, Boolean(source[path.id]?.[textId])])),
  ]));
}

function migrateProgress(paths) {
  if (hasNamespacedValue("pathProgress")) {
    const current = normalizeProgress(readStore("pathProgress", {}), paths);
    writeStore("pathProgress", current);
    return current;
  }
  const migrated = normalizeProgress(rawLegacyValue("studyPathProgress"), paths);
  writeStore("pathProgress", migrated);
  return migrated;
}

function findTextForLegacyBookmark(bookmark, texts) {
  return texts.find((text) => text.id === bookmark.textId || text.id === bookmark.textKey)
    || texts.find((text) => text.title === bookmark.source)
    || texts.find((text) => text.quotes.some((quote) => quote.text === bookmark.quote));
}

function migrateBookmarks(texts) {
  if (hasNamespacedValue("bookmarks")) {
    const current = readStore("bookmarks", []);
    return Array.isArray(current) ? current : [];
  }

  const legacy = rawLegacyValue("wisdomBookmarks");
  if (!Array.isArray(legacy)) {
    writeStore("bookmarks", []);
    return [];
  }

  const migrated = [];
  legacy.forEach((bookmark) => {
    if (!bookmark || typeof bookmark.quote !== "string") return;
    const text = findTextForLegacyBookmark(bookmark, texts);
    if (!text) return;
    const quote = text.quotes.find((item) => item.text === bookmark.quote);
    const item = {
      id: `${text.id}:${bookmark.quote}`,
      quote: bookmark.quote,
      context: bookmark.context || quote?.context || "",
      source: text.title,
      textId: text.id,
      period: text.period,
      tradition: text.tradition,
      keyTeaching: text.keyTeaching,
      citation: quote?.source || null,
      savedAt: bookmark.savedAt || new Date().toISOString(),
    };
    if (!migrated.some((saved) => saved.id === item.id)) migrated.push(item);
  });
  writeStore("bookmarks", migrated);
  return migrated;
}

function sectionHeading(eyebrow, title, description) {
  const heading = document.createElement("header");
  heading.className = "page-section__heading page-section__heading--left";
  heading.innerHTML = `<p class="page-eyebrow"></p><h2></h2><p></p>`;
  heading.children[0].textContent = eyebrow;
  heading.children[1].textContent = title;
  heading.children[2].textContent = description;
  return heading;
}

function createPathsSection(paths, texts, progress) {
  const textById = new Map(texts.map((text) => [text.id, text]));
  const section = document.createElement("section");
  section.className = "page-section practice-section reveal-band";
  const inner = document.createElement("div");
  inner.className = "page-section__inner";
  inner.append(sectionHeading(
    "Four ways through the library",
    "Study paths",
    "Mark a source read when you have spent time with it. Progress stays in this browser.",
  ));
  const grid = document.createElement("div");
  grid.className = "practice-paths";

  paths.forEach((path, pathIndex) => {
    const article = document.createElement("article");
    article.className = "practice-path";
    article.innerHTML = `
      <header class="practice-path__header">
        <span class="practice-path__number">${String(pathIndex + 1).padStart(2, "0")}</span>
        <div><h3></h3><p></p></div>
      </header>
      <div class="practice-path__meter" aria-hidden="true"><span></span></div>
      <p class="practice-path__progress" aria-live="polite"></p>
      <ol class="practice-path__steps"></ol>`;
    article.querySelector("h3").textContent = path.title;
    article.querySelector(".practice-path__header p").textContent = path.description;
    const meter = article.querySelector(".practice-path__meter span");
    const count = article.querySelector(".practice-path__progress");
    const steps = article.querySelector(".practice-path__steps");

    function updateProgress() {
      const completed = path.texts.filter((id) => progress[path.id]?.[id]).length;
      meter.style.width = `${(completed / path.texts.length) * 100}%`;
      count.textContent = `${completed} of ${path.texts.length} sources read`;
    }

    path.texts.forEach((textId, stepIndex) => {
      const text = textById.get(textId);
      if (!text) return;
      const item = document.createElement("li");
      const label = document.createElement("label");
      label.className = "practice-step";
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = Boolean(progress[path.id]?.[textId]);
      checkbox.setAttribute("aria-label", `Mark ${text.title} as read in ${path.title}`);
      const marker = document.createElement("span");
      marker.className = "practice-step__marker";
      marker.setAttribute("aria-hidden", "true");
      marker.textContent = String(stepIndex + 1).padStart(2, "0");
      const words = document.createElement("span");
      words.className = "practice-step__words";
      const title = document.createElement("strong");
      title.textContent = text.title;
      const meta = document.createElement("small");
      meta.textContent = `${text.period} · ${text.tradition}`;
      const link = document.createElement("a");
      link.href = siteHref(`library/${encodeURIComponent(text.id)}/`);
      link.textContent = "Read source";
      link.setAttribute("aria-label", `Read ${text.title}`);
      words.append(title, meta);
      label.append(checkbox, marker, words);
      item.append(label, link);
      checkbox.addEventListener("change", () => {
        progress[path.id][textId] = checkbox.checked;
        writeStore("pathProgress", progress);
        updateProgress();
      });
      steps.append(item);
    });
    updateProgress();
    grid.append(article);
  });

  inner.append(grid);
  section.append(inner);
  return section;
}

function createReflectionsSection() {
  const section = document.createElement("section");
  section.className = "page-section practice-section practice-section--dark reveal-band";
  const inner = document.createElement("div");
  inner.className = "page-section__inner";
  inner.append(sectionHeading(
    "The Weighing of Your Heart",
    "Saved reflections",
    "Your answers from the home page return here. They remain on this device.",
  ));
  const list = document.createElement("div");
  list.className = "saved-reflections";
  const stored = readStore("reflections", []);
  const reflections = Array.isArray(stored) ? stored : Object.values(stored || {});
  reflections
    .filter((item) => item?.response)
    .sort((a, b) => String(b.savedAt).localeCompare(String(a.savedAt)))
    .forEach((reflection) => {
      const article = document.createElement("article");
      article.className = "saved-reflection";
      const question = document.createElement("h3");
      question.textContent = reflection.prompt || "Saved reflection";
      const response = document.createElement("blockquote");
      response.textContent = reflection.response;
      const date = document.createElement("p");
      const parsed = new Date(reflection.savedAt);
      date.textContent = Number.isNaN(parsed.valueOf()) ? "Saved in this browser" : `Saved ${parsed.toLocaleDateString()}`;
      article.append(question, response, date);
      list.append(article);
    });
  if (!list.children.length) {
    const empty = document.createElement("p");
    empty.className = "practice-empty";
    empty.innerHTML = `No reflections saved yet. Return to <a href="${siteHref("#weighing")}">The Weighing of Your Heart</a> to begin.`;
    list.append(empty);
  }
  inner.append(list);
  section.append(inner);
  return section;
}

function createBookmarksSection(initialBookmarks) {
  let bookmarks = initialBookmarks;
  const section = document.createElement("section");
  section.className = "page-section practice-section reveal-band";
  const inner = document.createElement("div");
  inner.className = "page-section__inner";
  const heading = sectionHeading(
    "Passages kept close",
    "Bookmarks",
    "Remove a single passage at any time, or clear the collection with an inline confirmation.",
  );
  const actions = document.createElement("div");
  actions.className = "bookmark-actions";
  actions.innerHTML = `
    <button class="button button--outline" type="button" data-clear-bookmarks>Clear all</button>
    <div class="inline-confirm" hidden data-clear-confirm role="group" aria-label="Confirm clearing all bookmarks">
      <p>Clear every saved passage? This cannot be undone.</p>
      <button type="button" data-cancel-clear>Keep bookmarks</button>
      <button type="button" data-confirm-clear>Clear bookmarks</button>
    </div>
    <span class="sr-only" aria-live="polite" data-bookmark-status></span>`;
  const list = document.createElement("div");
  list.className = "saved-bookmarks";
  const clearButton = actions.querySelector("[data-clear-bookmarks]");
  const confirm = actions.querySelector("[data-clear-confirm]");
  const status = actions.querySelector("[data-bookmark-status]");

  function renderBookmarks() {
    list.replaceChildren();
    clearButton.disabled = bookmarks.length === 0;
    if (!bookmarks.length) {
      const empty = document.createElement("p");
      empty.className = "practice-empty";
      empty.innerHTML = `No passages bookmarked yet. Visit <a href="${siteHref("library/")}">The Living Library</a> to save one.`;
      list.append(empty);
      return;
    }

    bookmarks.forEach((bookmark) => {
      const article = document.createElement("article");
      article.className = "saved-bookmark";
      const quote = document.createElement("blockquote");
      quote.textContent = `“${bookmark.quote}”`;
      const source = document.createElement("p");
      source.textContent = `${bookmark.source} · ${bookmark.period || bookmark.tradition || "Saved source"}`;
      const footer = document.createElement("footer");
      const link = document.createElement("a");
      link.href = siteHref(`library/${encodeURIComponent(bookmark.textId)}/`);
      link.textContent = "Read in context";
      const remove = document.createElement("button");
      remove.type = "button";
      remove.textContent = "Remove";
      remove.setAttribute("aria-label", `Remove bookmarked passage from ${bookmark.source}`);
      remove.addEventListener("click", () => {
        bookmarks = bookmarks.filter((item) => item.id !== bookmark.id);
        writeStore("bookmarks", bookmarks);
        status.textContent = `Removed a bookmark from ${bookmark.source}.`;
        renderBookmarks();
      });
      footer.append(link, remove);
      article.append(quote, source, footer);
      list.append(article);
    });
  }

  clearButton.addEventListener("click", () => {
    confirm.hidden = false;
    clearButton.hidden = true;
    confirm.querySelector("[data-cancel-clear]").focus();
  });
  confirm.querySelector("[data-cancel-clear]").addEventListener("click", () => {
    confirm.hidden = true;
    clearButton.hidden = false;
    clearButton.focus();
  });
  confirm.querySelector("[data-confirm-clear]").addEventListener("click", () => {
    bookmarks = [];
    writeStore("bookmarks", bookmarks);
    confirm.hidden = true;
    clearButton.hidden = false;
    status.textContent = "All bookmarks cleared.";
    renderBookmarks();
    clearButton.focus();
  });

  renderBookmarks();
  inner.append(heading, actions, list);
  section.append(inner);
  return section;
}

async function initialize() {
  initializePageChrome("practices");
  setDocumentTitle("Practices");

  try {
    const [paths, texts] = await Promise.all([loadData("paths.json"), loadData("texts.json")]);
    const progress = migrateProgress(paths);
    const bookmarks = migrateBookmarks(texts);
    root.replaceChildren(
      createMasthead(),
      createPathsSection(paths, texts, progress),
      createReflectionsSection(),
      createBookmarksSection(bookmarks),
    );
    initializePageReveals();
  } catch {
    renderPageError(root, "Your practices could not be opened.", "", "Return home");
  }
}

initialize();
