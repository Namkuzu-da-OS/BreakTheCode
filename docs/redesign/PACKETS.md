# Build Packets

**Reset 2026-09-19.** These replace the previous packets entirely (that build order served the dead "temple complex" direction).

Read `00-DESIGN-BIBLE.md` in full and **open `reference/MASTER-mockup.png`** before starting any packet. The image is the specification. Packets run in order; each ends with its acceptance checks passing and a commit on branch `redesign/temple`. Do not start the next packet with the previous one's checks failing. Do not widen scope — if it isn't in the bible or the packet, leave it out and note it in `NOTES.md`.

Build the new site at `new/` during packets 01–07. Old `index.html` stays untouched until packet 08 promotes the new one to root.

---

## Packet 01 — Extract content to data (no content loss)

Source of truth: the current `index.html`. Produce:

- `data/chapters.json` — 6 chapters in order: `{ id, n (1–6), title, cardLines: [line1, line2], prose: [paragraphs…], pullQuote, keyThemes: […], wisdomCard: { textId, quote, context } }`. Extract the `<section class="content">` blocks `#intro #awakening #patterns #ancient #consciousness #potential`, preserving paragraph order and wording exactly. `cardLines` are new: two lines, **max six words each**, written from that chapter's own content for the journey card (bible §5.3).
- `data/texts.json` — flatten the `wisdomTexts` object (~line 2814): 16 texts, `{ id, era, eraName, title, period, tradition, keyTeaching, cardLines: [line1, line2], quotes: [{ text, context, source: { translator_or_edition: "", note: "", verified: false } }] }`. Drop the emoji `icon` field. `cardLines` are a two-line compression of `keyTeaching` for the library card.
- `data/connections.json` — from the Wisdom Web data (`webConnections`, `connectionColors`, ~4199–4260): `{ types: [{ id, label, color }], connections: [{ from, to, type, note? }] }`.
- `data/paths.json` — the `studyPaths` array (~3950), drop `icon`.
- `data/themes.json` — the theme taxonomy, with the ten used by the home constellation flagged `featured: true` (bible §5.5).
- `scripts/verify-content.mjs` — Node, no deps: asserts 6 chapters, 16 texts, quote count (28) equal to the old file (computed from it at run time), 4 paths, connection count equal to old. Prints a table, exits non-zero on mismatch.

Acceptance: `node scripts/verify-content.mjs` passes. Commit: `content: extract chapters, texts, connections, paths, themes to data/`.

---

## Packet 02 — The plates (art generation)

Generate every image in bible §6 with the built-in `image_gen` tool (system skill `imagegen` — built-in mode, no `OPENAI_API_KEY` needed).

**Every single call passes `docs/redesign/reference/MASTER-mockup.png` as a reference image, and every prompt begins with the shared style preamble in bible §6.** The tool is being asked for *a component that belongs inside the world of that reference*, never a new art direction. If a plate comes back in a different palette, light logic or material language than the master, regenerate it — visual continuity across the set matters more than any single image.

- Output to `new/assets/art/`, as WebP plus a JPG fallback, sRGB, at the sizes in the table.
- The hero needs both the 21:9 desktop plate and a 4:5 phone crop that keeps the pyramid and beam centred.
- `seal` is **not** generated — draw it as a monoline SVG by hand (gold ring, eye-and-rays glyph) and save to `new/assets/seal.svg`.
- Write `new/assets/art/MANIFEST.md`: for each file, the exact prompt used, the dimensions, and the byte size.

Acceptance: every file in the §6 table exists at the right ratio and under its byte budget; laid out side by side in a contact sheet they read as one production; MANIFEST.md complete. Commit: `art: generate plates from master reference`.

Reasoning: the art carries this design. A correct layout with wrong-feeling plates is a failed build.

---

## Packet 03 — Shell: tokens, header, hero, footer

- `new/index.html`, `css/tokens.css`, `css/base.css`, `css/bands.css`, `js/app.js`, `js/data.js`, `js/store.js`.
- Tokens exactly per bible §4 — colour, type scale, micro-label style, hairline framing, grain.
- Header per §5.1: transparent over hero → dark backing after 80px, wordmark lockup (seal + two stacked Cinzel lines), centre nav, expanding search, "Awaken Within" button, sub-900px overlay menu.
- Hero per §5.2: full-viewport plate, vignette, eyebrow / display / subline / two CTAs, gutter micro-labels, phone crop swap via `<picture>`.
- Footer per §5.8.
- The band-reveal IntersectionObserver utility (fade + 16px rise, once, reduced-motion aware) that later packets reuse.

Acceptance: header and hero match the master at 1440px and at 390px; hero LCP plate preloaded; contrast ≥ 4.5:1 on all hero text; keyboard reaches every header control; no console errors. Commit: `shell: tokens, header, hero, footer`.

---

## Packet 04 — Journey and Living Library bands

- `js/bands/journey.js`, `js/bands/library.js`, rendered from `data/chapters.json` and `data/texts.json`.
- Journey per §5.3: six framed portrait cards with gold chevrons between, number + the exact `title` + the single exact `cardSubtitle` over a bottom gradient (bible §2 — verbatim, never padded to two lines); 6 → 3×2 → snap-scroll rail. **Real chapter titles, not the mockup's placeholder names** (bible §2).
- Library per §5.4: six featured cards, framed plate + title + two lines, and the `EXPLORE ALL TEXTS →` link.
- Cards are single links with real `href`s to `/journey/{chapter}` and `/library/{id}` (those pages land in packet 06; until then they may 404 — note it).

Acceptance: both bands render from data with zero hard-coded content; all three breakpoints correct; cards keyboard-focusable with a visible gold focus ring; no CLS (dimensions reserved). Commit: `bands: journey and living library`.

---

## Packet 05 — Wisdom Web, Weighing, Closing

- `js/bands/web.js` per §5.5: the radial constellation in **SVG** — centre gold ring with knotwork glyph and CONSCIOUSNESS, ten satellite nodes from `data/themes.json` (`featured: true`), each a gold-ringed monoline glyph with caps name and Cormorant sub-line, thin connecting lines with glow points, slow opacity shimmer only. Stone faces bleeding in at both edges, starfield plate behind. Each node is a link to `/web/?theme=…`.
- `js/bands/weighing.js` per §5.6: scales plate left, dark panel right, four accordion rows as `<button aria-expanded>` with textarea + Save reflection, persisted to localStorage (`btc.reflections`). The pull quote carries the honesty mark described in §5.6 — do not present it as a verbatim translated line.
- Closing band per §5.7.

Acceptance: constellation is crisp at 200% zoom and keyboard-navigable; accordions correct for ARIA and survive reload; reduced-motion kills the shimmer; all three bands match the master. Commit: `bands: wisdom web, weighing, closing`.

---

## Packet 06 — Journey and Library sub-pages

- `/journey/` index and `/journey/{chapter}`: the full chapter — prose, pull quote as a carved inscription, key themes, the chapter's wisdom text with citation, prev/next. Static HTML shells hydrated from `data/`, real URLs, deep-linkable.
- `/library/` per §5.4: search (title, tradition, key teaching — parity with the old site), `All Traditions / All Eras / All Themes` pills, the era timeline slider from the **secondary** reference, count line, grid of all 16.
- `/library/{id}`: full text page — title, period, tradition, key teaching, every quote with its context and citation line, "Add to bookmarks", and **"Where this speaks"** linking to the chapters that quote it (this replaces the old site's stubbed "coming soon" button at `index.html:3797`).

Acceptance: all 16 texts reachable; search parity with the old site; deep links work; keyboard complete; `verify-content.mjs` still passes. Commit: `pages: journey chapters and library`.

---

## Packet 07 — Web page, Practices, About

- `/web/`: the real interactive graph — existing connection types with filter toggles (all on by default), theme sidebar, detail panel (description, "shared idea in N of 16 texts", sources include, historical distance, explore link) per the secondary reference. Canvas 2D, DPR-aware, render loop pauses when off-screen, ≤4ms/frame at 1400px with all connections on.
- `/practices/`: the 4 study paths as sequences with read/unread markers (migrate old localStorage progress if present), saved reflections from §5.6, and bookmarks (migrate old bookmark storage; remove single, clear-all with an inline confirm — never `window.confirm`).
- `/about/`: the approach and the grounding rule, stated plainly in the owner's voice, including how quotes are sourced and marked.

Acceptance: node and connection counts equal `connections.json`; path progress and bookmarks persist and migrate; frame budget met and logged in NOTES.md. Commit: `pages: wisdom web, practices, about`.

---

## Packet 08 — Promote, QA, docs

- Move `new/` to root; keep the old file as `legacy/index.html` for one release.
- QA checklist recorded in NOTES.md: every route at 390px and 1440px; Lighthouse performance ≥ 90 and a11y ≥ 95 on home, a chapter, the library and the web page; `prefers-reduced-motion` walkthrough; no console errors; fonts swap; served over HTTP (see bible §7 — `file://` is not supported and is not a goal); **side-by-side screenshot of the finished home page against `MASTER-mockup.png`**.
- Docs: rewrite `README.md` (what it is, the band model, how to run, how content is edited); rewrite `docs/ROADMAP.md` to a short honest list — the old VR/AR/AI-guide/community/PWA bloat is deleted, not carried; `docs/CHANGELOG.md` gets a `[2.0.0]` entry; archive `CONTENT_EXPANSION.md` and `docs/WISDOM_TEXTS_IMPLEMENTATION.md` into `docs/archive/`.
- Merge packet R verdicts into `data/texts.json` before release.

Acceptance: `verify-content.mjs` passes; checklist complete; PR opened `redesign/temple` → `main` with the checklist and the side-by-side in the body. Commit: `release: 2.0.0 redesign`.

---

## Packet R — Research desk (parallel from packet 01; any model with web access)

Input: `data/texts.json`. For every quote:
1. Find the primary text and a named translation/edition; confirm the line exists there, quoting the located passage and its location.
2. Set `source.translator_or_edition`, `source.note`, `source.verified`.
3. If not found, mark `verified: false`, say in `note` what it actually is (modern paraphrase, misattribution, Barks rendering…), and where possible offer a verified replacement line from the same text carrying the same meaning.
4. Check every `period` date against current scholarship; correct with "c." where uncertain.
5. Output a PR touching only `data/texts.json` plus `docs/redesign/RESEARCH-REPORT.md` with every verdict and links. Do not edit prose or code.

Known suspects first: Tao Te Ching "When I let go of what I am, I become what I might be" (widely circulated, not in the text); any English Rumi (most viral Rumi is Coleman Barks' free rendering); any Buddha quote not traceable to the Pali canon; "A light heart travels far" (bible §5.6); the Kybalion (1908) and the Emerald Tablet, which are never ancient Egyptian.
