import { loadData } from "../data.js";

const container = document.querySelector("[data-library-cards]");
const featuredIds = ["upanishads", "taoTeChing", "dhammapada", "marcusAurelius", "rumi", "blake"];

function textHref(id) {
  return `./library/${encodeURIComponent(id)}/`;
}

function plateNumber(index) {
  return String(index + 1).padStart(2, "0");
}

function createPlate(text, index) {
  const picture = document.createElement("picture");
  picture.className = "library-card__plate";

  const webp = document.createElement("source");
  webp.srcset = `./assets/art/library-${plateNumber(index)}.webp`;
  webp.type = "image/webp";

  const image = document.createElement("img");
  image.src = `./assets/art/library-${plateNumber(index)}.jpg`;
  image.width = 800;
  image.height = 1000;
  image.loading = "lazy";
  image.decoding = "async";
  image.alt = `${text.title}, represented by an artefact from the ${text.tradition} tradition.`;

  picture.append(webp, image);
  return picture;
}

function createCard(text, index) {
  const link = document.createElement("a");
  link.className = "library-card";
  link.href = textHref(text.id);

  const content = document.createElement("span");
  content.className = "library-card__content";

  const title = document.createElement("span");
  title.className = "library-card__title";
  title.textContent = text.title;

  content.append(title);
  text.cardLines.forEach((line) => {
    const teaching = document.createElement("span");
    teaching.className = "library-card__line";
    teaching.textContent = line;
    content.append(teaching);
  });

  link.append(createPlate(text, index), content);
  return link;
}

function renderError() {
  if (!container) return;
  const status = document.createElement("p");
  status.className = "band-status band-status--error";
  status.textContent = "The library could not be opened.";
  container.replaceChildren(status);
}

export async function initializeLibraryBand() {
  if (!container) return;

  try {
    const texts = await loadData("texts.json");
    const byId = new Map(texts.map((text) => [text.id, text]));
    const featured = featuredIds.map((id) => byId.get(id));

    if (featured.some((text) => !text)) throw new Error("Featured library text missing");

    const cards = featured.map((text, index) => createCard(text, index));
    container.replaceChildren(...cards);
  } catch {
    renderError();
  }
}
