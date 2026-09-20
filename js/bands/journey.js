import { loadData } from "../data.js";

const container = document.querySelector("[data-journey-cards]");

function chapterHref(id) {
  return `./journey/${encodeURIComponent(id)}/`;
}

function plateNumber(number) {
  return String(number).padStart(2, "0");
}

function createPlate(chapter) {
  const picture = document.createElement("picture");
  picture.className = "journey-card__plate";

  const webp = document.createElement("source");
  webp.srcset = `./assets/art/journey-${plateNumber(chapter.n)}.webp`;
  webp.type = "image/webp";

  const image = document.createElement("img");
  image.src = `./assets/art/journey-${plateNumber(chapter.n)}.jpg`;
  image.width = 900;
  image.height = 1200;
  image.loading = "lazy";
  image.decoding = "async";
  image.alt = `Artwork for ${chapter.title}.`;

  picture.append(webp, image);
  return picture;
}

function createCard(chapter) {
  const link = document.createElement("a");
  link.className = "journey-card";
  link.href = chapterHref(chapter.id);

  const content = document.createElement("span");
  content.className = "journey-card__content";

  const number = document.createElement("span");
  number.className = "journey-card__number";
  number.textContent = plateNumber(chapter.n);

  const title = document.createElement("span");
  title.className = "journey-card__title";
  title.textContent = chapter.title;

  const subtitle = document.createElement("span");
  subtitle.className = "journey-card__subtitle";
  subtitle.textContent = chapter.cardSubtitle;

  content.append(number, title, subtitle);
  link.append(createPlate(chapter), content);
  return link;
}

function createChevron() {
  const chevron = document.createElement("span");
  chevron.className = "journey-chevron";
  chevron.setAttribute("aria-hidden", "true");
  chevron.innerHTML = '<svg viewBox="0 0 12 22"><path d="m2 2 8 9-8 9"></path></svg>';
  return chevron;
}

function renderError() {
  if (!container) return;
  const status = document.createElement("p");
  status.className = "band-status band-status--error";
  status.textContent = "The journey could not be opened.";
  container.replaceChildren(status);
}

export async function initializeJourneyBand() {
  if (!container) return;

  try {
    const chapters = await loadData("chapters.json");
    const fragment = document.createDocumentFragment();

    chapters.forEach((chapter, index) => {
      fragment.append(createCard(chapter));
      if (index < chapters.length - 1) fragment.append(createChevron());
    });

    container.replaceChildren(fragment);
  } catch {
    renderError();
  }
}
