import {
  initializePageChrome,
  initializePageReveals,
  setDocumentTitle,
  siteHref,
} from "./shared.js";

const root = document.querySelector("[data-about-page]");

function createMasthead() {
  const masthead = document.createElement("section");
  masthead.className = "page-masthead page-masthead--compact page-masthead--about";
  masthead.innerHTML = `
    <picture class="page-masthead__plate" aria-hidden="true">
      <source srcset="${siteHref("assets/art/closing-panorama.webp")}" type="image/webp">
      <img src="${siteHref("assets/art/closing-panorama.jpg")}" width="2880" height="1234" alt="" loading="eager" decoding="async">
    </picture>
    <div class="page-masthead__shade" aria-hidden="true"></div>
    <div class="micro-label page-masthead__micro page-masthead__micro--left" aria-hidden="true">
      <span>Context Matters</span><span>Honesty Builds Trust</span>
    </div>
    <div class="micro-label page-masthead__micro page-masthead__micro--right" aria-hidden="true">
      <span>Ancient Texts</span><span>Modern Minds</span>
    </div>
    <div class="page-masthead__content">
      <p class="page-eyebrow">The approach behind the work</p>
      <h1>About</h1>
      <p>Ancient wisdom deserves curiosity, context, and plain speaking.</p>
    </div>`;
  return masthead;
}

function createStatement() {
  const section = document.createElement("section");
  section.className = "about-statement reveal-band";
  section.innerHTML = `
    <div class="about-statement__lead">
      <p class="page-eyebrow">Our approach</p>
      <h2>Use the source. Name the distance.</h2>
    </div>
    <div class="about-statement__body">
      <p>This project brings old and modern works into conversation around consciousness, conditioning, and choice. It does not claim that different traditions secretly say the same thing. A shared question can connect sources without collapsing their histories or beliefs.</p>
      <p>The journey uses the book’s own chapters as its spine. The Living Library keeps each text’s title, period, tradition, teaching, passage, and context visible so you can follow an idea back to where it came from.</p>
    </div>`;
  return section;
}

function createGrounding() {
  const section = document.createElement("section");
  section.className = "about-grounding reveal-band";
  section.setAttribute("aria-labelledby", "grounding-title");
  section.innerHTML = `
    <div class="about-grounding__rule">
      <p class="page-eyebrow">The grounding rule</p>
      <h2 id="grounding-title">Do not make a source sound older, stranger, or more certain than it is.</h2>
      <p>If we cannot support a claim, we mark the uncertainty instead of filling the gap.</p>
    </div>
    <div class="about-grounding__points">
      <article>
        <span aria-hidden="true">01</span>
        <div><h3>Quotes name their source</h3><p>Every passage carries a named translator or edition when it has been verified. The context line explains how the passage is being used here.</p></div>
      </article>
      <article>
        <span aria-hidden="true">02</span>
        <div><h3>The paraphrase mark means uncertainty</h3><p><strong>Paraphrase / attribution uncertain</strong> means we have not confirmed that wording as a direct line in a named edition. It may be a modern rendering, a loose attribution, or a sentence still awaiting verification.</p></div>
      </article>
      <article>
        <span aria-hidden="true">03</span>
        <div><h3>Dates and labels stay honest</h3><p>The Kybalion was published in 1908. The Emerald Tablet is not an ancient Egyptian text. We do not present either one as ancient Egyptian, no matter how often that claim is repeated.</p></div>
      </article>
    </div>`;
  return section;
}

function createClosing() {
  const section = document.createElement("section");
  section.className = "about-closing reveal-band";
  section.innerHTML = `
    <p class="page-eyebrow">Read with discernment</p>
    <h2>The source is part of the teaching.</h2>
    <p>Start with a passage, keep its context beside it, and notice what changes when you bring it into your own life.</p>
    <div><a class="button button--solid" href="${siteHref("journey/")}">Begin the journey</a><a class="button button--outline" href="${siteHref("library/")}">Enter the library</a></div>`;
  return section;
}

function initialize() {
  initializePageChrome("about");
  setDocumentTitle("About");
  root.replaceChildren(createMasthead(), createStatement(), createGrounding(), createClosing());
  initializePageReveals();
}

initialize();
