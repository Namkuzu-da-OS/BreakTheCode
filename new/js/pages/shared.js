import { initializeRevealObserver, initializeSiteChrome, renderPageChrome } from "../chrome.js";

export const siteRoot = new URL("../../", import.meta.url);

export function siteHref(path = "") {
  return new URL(path, siteRoot).href;
}

export function initializePageChrome(section) {
  renderPageChrome(section);
  initializeSiteChrome();
}

export function initializePageReveals() {
  initializeRevealObserver();
}

export function setDocumentTitle(title) {
  document.title = `${title} | Breaking Your Genetic Code`;
}

export function chapterNumber(number) {
  return String(number).padStart(2, "0");
}

export function createJourneyPicture(chapter, className) {
  const picture = document.createElement("picture");
  picture.className = className;
  picture.setAttribute("aria-hidden", "true");

  const plate = `assets/art/journey-${chapterNumber(chapter.n)}`;
  const source = document.createElement("source");
  source.srcset = siteHref(`${plate}.webp`);
  source.type = "image/webp";

  const image = document.createElement("img");
  image.src = siteHref(`${plate}.jpg`);
  image.width = 900;
  image.height = 1200;
  image.alt = "";
  image.loading = className.includes("masthead") ? "eager" : "lazy";
  image.decoding = "async";

  picture.append(source, image);
  return picture;
}

export function quoteSourceLabel(source = {}) {
  if (source.verified) {
    return source.translator_or_edition || "Source verified";
  }

  return source.translator_or_edition || "Source verification pending";
}

export function renderPageError(container, message, returnPath, returnLabel) {
  const panel = document.createElement("section");
  panel.className = "page-error";

  const title = document.createElement("h1");
  title.textContent = message;
  const link = document.createElement("a");
  link.className = "button button--outline";
  link.href = siteHref(returnPath);
  link.textContent = returnLabel;

  panel.append(title, link);
  container.replaceChildren(panel);
}
