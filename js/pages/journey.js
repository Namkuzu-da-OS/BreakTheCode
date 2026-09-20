import { loadData } from "../data.js";
import {
  chapterNumber,
  createJourneyPicture,
  initializePageChrome,
  initializePageReveals,
  quoteSourceLabel,
  renderPageError,
  setDocumentTitle,
  siteHref,
} from "./shared.js";

const indexRoot = document.querySelector("[data-journey-index]");
const chapterRoot = document.querySelector("[data-journey-chapter]");

function chapterHref(chapter) {
  return siteHref(`journey/${encodeURIComponent(chapter.id)}/`);
}

function createIndexCard(chapter) {
  const link = document.createElement("a");
  link.className = "journey-page-card";
  link.href = chapterHref(chapter);

  const content = document.createElement("span");
  content.className = "journey-page-card__content";

  const number = document.createElement("span");
  number.className = "journey-page-card__number";
  number.textContent = chapterNumber(chapter.n);

  const title = document.createElement("span");
  title.className = "journey-page-card__title";
  title.textContent = chapter.title;

  const subtitle = document.createElement("span");
  subtitle.className = "journey-page-card__subtitle";
  subtitle.textContent = chapter.cardSubtitle;

  content.append(number, title, subtitle);
  link.append(createJourneyPicture(chapter, "journey-page-card__plate"), content);
  return link;
}

function renderJourneyIndex(chapters) {
  setDocumentTitle("The Journey Within");

  const masthead = document.createElement("section");
  masthead.className = "page-masthead page-masthead--journey";
  masthead.innerHTML = `
    <div class="page-masthead__shade" aria-hidden="true"></div>
    <div class="micro-label page-masthead__micro page-masthead__micro--left" aria-hidden="true">
      <span>Recognize</span><span>Question</span><span>Choose</span>
    </div>
    <div class="micro-label page-masthead__micro page-masthead__micro--right" aria-hidden="true">
      <span>Six Stages</span><span>One Journey</span>
    </div>
    <div class="page-masthead__content">
      <p class="page-eyebrow">A Return to What Has Always Been</p>
      <h1>The Journey Within</h1>
      <p>Six stages from inherited pattern to conscious choice.</p>
    </div>`;

  const heroPicture = document.createElement("picture");
  heroPicture.className = "page-masthead__plate";
  heroPicture.setAttribute("aria-hidden", "true");
  heroPicture.innerHTML = `
    <source srcset="${siteHref("assets/art/closing-panorama.webp")}" type="image/webp">
    <img src="${siteHref("assets/art/closing-panorama.jpg")}" width="2880" height="1234" alt="" loading="eager" decoding="async">`;
  masthead.prepend(heroPicture);

  const section = document.createElement("section");
  section.className = "page-section reveal-band";
  section.setAttribute("aria-labelledby", "journey-stages-title");
  section.innerHTML = `
    <div class="page-section__inner">
      <header class="page-section__heading">
        <p class="page-eyebrow">The path unfolds</p>
        <h2 id="journey-stages-title">Begin where you are</h2>
        <p>Each chapter opens a different part of the same inquiry.</p>
      </header>
      <div class="journey-page-grid" data-journey-page-grid></div>
    </div>`;

  const grid = section.querySelector("[data-journey-page-grid]");
  grid.append(...chapters.map(createIndexCard));
  indexRoot.replaceChildren(masthead, section);
}

function normalizeQuote(value) {
  return value.replace(/^[\s“”"']+|[\s“”"']+$/g, "").trim();
}

function findWisdomQuote(chapter, text) {
  const wanted = normalizeQuote(chapter.wisdomCard.quote);
  return text.quotes.find((quote) => normalizeQuote(quote.text) === wanted) || {
    text: wanted,
    context: chapter.wisdomCard.context,
    source: { translator_or_edition: "", note: "", verified: false },
  };
}

function createChapterMasthead(chapter) {
  const masthead = document.createElement("section");
  masthead.className = "chapter-masthead";
  masthead.append(createJourneyPicture(chapter, "chapter-masthead__plate"));

  const shade = document.createElement("div");
  shade.className = "chapter-masthead__shade";
  shade.setAttribute("aria-hidden", "true");

  const content = document.createElement("div");
  content.className = "chapter-masthead__content";
  content.innerHTML = `
    <a class="page-breadcrumb" href="${siteHref("journey/")}">The Journey Within</a>
    <p class="chapter-masthead__number">Chapter ${chapterNumber(chapter.n)}</p>`;

  const title = document.createElement("h1");
  title.textContent = chapter.title;
  const subtitle = document.createElement("p");
  subtitle.className = "chapter-masthead__subtitle";
  subtitle.textContent = chapter.cardSubtitle;
  content.append(title, subtitle);

  masthead.append(shade, content);
  return masthead;
}

function createCitation(quote) {
  const citation = document.createElement("footer");
  citation.className = "wisdom-inscription__citation";

  const source = document.createElement("span");
  source.textContent = quoteSourceLabel(quote.source);
  citation.append(source);

  if (quote.source?.note) {
    const note = document.createElement("span");
    note.textContent = quote.source.note;
    citation.append(note);
  }

  if (!quote.source?.verified) {
    const honesty = document.createElement("span");
    honesty.className = "honesty-mark";
    honesty.textContent = "Paraphrase / attribution uncertain";
    citation.append(honesty);
  }

  return citation;
}

function createChapterBody(chapter, text) {
  const section = document.createElement("section");
  section.className = "chapter-body reveal-band";

  const inner = document.createElement("div");
  inner.className = "chapter-body__inner";

  const prose = document.createElement("article");
  prose.className = "chapter-prose";
  prose.setAttribute("aria-label", `${chapter.title} chapter text`);
  chapter.prose.forEach((paragraphText, index) => {
    const paragraph = document.createElement("p");
    paragraph.textContent = paragraphText;
    if (index === 0) paragraph.className = "chapter-prose__lead";
    prose.append(paragraph);
  });

  const themes = document.createElement("aside");
  themes.className = "chapter-themes";
  themes.innerHTML = '<p class="page-eyebrow">Key Themes</p><h2>Ideas to carry</h2>';
  const list = document.createElement("ul");
  chapter.keyThemes.forEach((theme) => {
    const item = document.createElement("li");
    item.textContent = theme;
    list.append(item);
  });
  themes.append(list);

  inner.append(prose, themes);
  section.append(inner);

  if (chapter.pullQuote) {
    const inscription = document.createElement("blockquote");
    inscription.className = "carved-inscription";
    const quote = document.createElement("p");
    quote.textContent = chapter.pullQuote;
    inscription.append(quote);
    section.append(inscription);
  }

  const wisdomQuote = findWisdomQuote(chapter, text);
  const wisdom = document.createElement("section");
  wisdom.className = "wisdom-inscription";
  wisdom.setAttribute("aria-labelledby", "chapter-wisdom-title");
  wisdom.innerHTML = `
    <div class="wisdom-inscription__heading">
      <p class="page-eyebrow">Living Wisdom</p>
      <h2 id="chapter-wisdom-title"></h2>
      <p class="wisdom-inscription__meta"></p>
    </div>`;
  wisdom.querySelector("h2").textContent = text.title;
  wisdom.querySelector(".wisdom-inscription__meta").textContent = `${text.period} · ${text.tradition}`;

  const quote = document.createElement("blockquote");
  quote.className = "wisdom-inscription__quote";
  const quoteText = document.createElement("p");
  quoteText.textContent = `“${wisdomQuote.text}”`;
  const context = document.createElement("p");
  context.className = "wisdom-inscription__context";
  context.textContent = wisdomQuote.context;
  quote.append(quoteText, context, createCitation(wisdomQuote));

  const textLink = document.createElement("a");
  textLink.className = "band-text-link";
  textLink.href = siteHref(`library/${encodeURIComponent(text.id)}/`);
  textLink.textContent = "Enter this text →";
  wisdom.append(quote, textLink);
  section.append(wisdom);
  return section;
}

function createChapterNavigation(chapter, chapters) {
  const index = chapters.findIndex((item) => item.id === chapter.id);
  const navigation = document.createElement("nav");
  navigation.className = "chapter-navigation reveal-band";
  navigation.setAttribute("aria-label", "Chapter navigation");

  const previous = chapters[index - 1];
  const next = chapters[index + 1];

  if (previous) {
    const link = document.createElement("a");
    link.className = "chapter-navigation__link chapter-navigation__link--previous";
    link.href = chapterHref(previous);
    link.innerHTML = '<span aria-hidden="true">←</span><span><small>Previous chapter</small></span>';
    link.lastElementChild.append(document.createTextNode(previous.title));
    navigation.append(link);
  } else {
    navigation.append(document.createElement("span"));
  }

  if (next) {
    const link = document.createElement("a");
    link.className = "chapter-navigation__link chapter-navigation__link--next";
    link.href = chapterHref(next);
    const text = document.createElement("span");
    text.innerHTML = "<small>Next chapter</small>";
    text.append(document.createTextNode(next.title));
    const arrow = document.createElement("span");
    arrow.setAttribute("aria-hidden", "true");
    arrow.textContent = "→";
    link.append(text, arrow);
    navigation.append(link);
  } else {
    const link = document.createElement("a");
    link.className = "chapter-navigation__link chapter-navigation__link--next";
    link.href = siteHref("journey/");
    link.innerHTML = "<span><small>Journey complete</small>Return to the journey</span><span aria-hidden=\"true\">→</span>";
    navigation.append(link);
  }

  return navigation;
}

function routeId() {
  const parts = window.location.pathname.split("/").filter(Boolean);
  return decodeURIComponent(parts.at(-1) || "");
}

async function initialize() {
  initializePageChrome("journey");

  try {
    const [chapters, texts] = await Promise.all([loadData("chapters.json"), loadData("texts.json")]);

    if (indexRoot) {
      renderJourneyIndex(chapters);
      initializePageReveals();
      return;
    }

    if (!chapterRoot) return;
    const chapter = chapters.find((item) => item.id === routeId());
    if (!chapter) {
      renderPageError(chapterRoot, "This chapter could not be found.", "journey/", "Return to the journey");
      return;
    }

    const text = texts.find((item) => item.id === chapter.wisdomCard.textId);
    if (!text) throw new Error("Chapter wisdom text missing");

    setDocumentTitle(chapter.title);
    chapterRoot.replaceChildren(
      createChapterMasthead(chapter),
      createChapterBody(chapter, text),
      createChapterNavigation(chapter, chapters),
    );
    initializePageReveals();
  } catch {
    const root = indexRoot || chapterRoot;
    if (root) renderPageError(root, "The journey could not be opened.", "", "Return home");
  }
}

initialize();
