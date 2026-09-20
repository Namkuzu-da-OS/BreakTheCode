# Breaking Your Genetic Code — Design Bible

Status: **RESET 2026-09-19.** This replaces the earlier "temple complex / Court map" direction entirely. That direction is dead — its mockup is kept only at `archive/court-figure-SUPERSEDED.html` as a record. Do not resurrect it.

## 0. The one instruction

**`reference/MASTER-mockup.png` IS the site.** Build what that image shows.

The task is not "take the old site and make it more like this image." The task is **"build the site in this image, then populate it with real material from the old project."** Think of the old site as a database sitting behind an entirely new front end. The old site's appearance has **no authority** over this design.

Look at the master image before every packet. Someone comparing the finished site side by side with it should say *"yes, that's the site in that picture"* — not *"that's the old site with some inspiration from the picture."*

`reference/secondary-editorial-mockup.png` is a **secondary** reference, used only for two things the master doesn't show in detail: the Living Library browse controls (search + filter pills + era timeline slider) and the "Read the Source" scholarship table. Its art direction is compatible; where the two disagree, **the master wins.**

## 1. Identity — the name is not negotiable

**The title is "Breaking Your Genetic Code."** That is the name of the book, and this site is the book's world: a digital experience, a conceptual companion, and a living archive that expands beyond the book while staying rooted in it.

- Both mockups render the wordmark as "BREAK THE CODE." **That is wrong. Replace it everywhere** — header, hero, footer, `<title>`, Open Graph tags, share text — with **Breaking Your Genetic Code**.
- "Break the code" survives only as occasional supporting copy or a CTA line. It is never the wordmark, the page title, or the site's name.
- Approved supporting lines: *Break the code. See the pattern. Understand what shaped you. Wake up to your conditioning. Learn to see clearly.*
- The repo, folder and domain (`breakthecode.meatball-labs.com`) keep their short names. A URL is an address, not an identity.

**Wordmark lockup** (header + footer): the circular gold seal glyph at left, then two stacked lines of Cinzel caps — `BREAKING YOUR` / `GENETIC CODE` — tightly leaded, letter-spaced `.14em`. In the hero the same words are set as the monumental display type.

## 2. Content rule — new skin, real substance

The visible front end is replaced. The substance is the owner's and is preserved.

**Reuse from the old project:** all written chapter content, the 28 wisdom texts and their metadata (title, period, tradition, key teaching, every quote and its context), the Wisdom Web relationships and connection types, the 4 study paths, era/theme taxonomy, bookmarks, reflection functionality, search and filter behaviour, and any useful data model or routing logic.

**Replace outright:** all CSS, every visual component, page layout, header and nav presentation, hero, cards, section shells, the type system, spacing system, backgrounds, colour system, imagery, decorative elements, visual hierarchy, mobile layout, interaction presentation. Do not keep a component merely because rewriting it is work.

**Where the mockup's placeholder words conflict with real content, the real content wins and the composition stays.** Specifically:
- The master's journey cards read `THE CONDITIONING / THE DESCENT / REMEMBRANCE / THE HEART / THE ASCENT / INTEGRATION`. The real chapters are **Introduction, The Awakening, Breaking Patterns, Ancient Wisdom, Expanding Consciousness, Full Potential**. Ship the **real** titles in the mockup's card design. (The mockup's names are stronger copy; renaming the chapters is the owner's call, not the builder's. Note it in NOTES.md, don't do it.)
- The master's library cards show six Egyptian/Maya texts. Ship **six real texts chosen from the 28**, with the full 28 on the Library page.

Every ancient quote carries `source: { translator_or_edition, note, verified }`. Unverified quotes render with a quiet "paraphrase / attribution uncertain" mark. Nothing is silently presented as verbatim scripture. The Kybalion (1908) and the Emerald Tablet are never presented as ancient Egyptian.

## 3. Architecture

A **single monumental home page** that scrolls through the bands below, plus real sub-pages for the depth. This reverses the old "no scrolling page, no nav bar" rule — the master image shows a scrolling page with a nav bar, and the image governs.

Home page bands, in order:
1. Header (fixed, transparent over the hero, gains a dark backing on scroll)
2. Hero — monumental threshold
3. The Journey Within — six chapters
4. The Living Library — six featured texts
5. The Wisdom Web — radial constellation
6. The Weighing of Your Heart — reflection
7. The Journey Continues — panoramic close
8. Footer

Sub-pages (real routes, real URLs, shareable): `/journey/` and `/journey/{chapter}`, `/library/` and `/library/{text-id}`, `/web/`, `/practices/` (study paths + saved reflections + bookmarks), `/about/`.

Still a static site on GitHub Pages: no build step, no framework, no dependencies. `index.html` + `css/` + `js/` (ES modules) + `data/*.json` + `assets/`. Google Fonts is the only external request. `CNAME` untouched.

## 4. Visual system

Read the master image for the feel; these are the tokens that produce it.

**Colour** (`css/tokens.css`):
| Token | Value | Use |
|---|---|---|
| `--ink` | `#0B0A08` | page base, near-black warm |
| `--panel` | `#12100C` | section panels |
| `--panel-2` | `#16130E` | raised cards |
| `--night` | `#0E1524` | Wisdom Web starfield base |
| `--gold` | `#C9A227` | primary accent, rules, borders |
| `--gold-lit` | `#F0CE7A` | lit gold, glow, hover |
| `--ember` | `#C9702F` | firelight warmth |
| `--cream` | `#EFE7D8` | primary text |
| `--stone` | `#9C8F7A` | secondary text, micro-labels |

Everything is dark, warm and lit from within. Light sources in the art (braziers, the beam from the pyramid, sunrise) are the only bright areas; UI gold is never neon.

**Type**: display **Cinzel** (400/600/700), body **Cormorant Garamond** (400/500 + italic), `display=swap`.
- Section display: Cinzel caps, `clamp(1.6rem, 3.4vw, 2.6rem)`, letter-spacing `.22em`, cream.
- Hero display: Cinzel caps, `clamp(2.4rem, 7vw, 5.2rem)`, letter-spacing `.06em`, two lines.
- Eyebrow / subline under a section title: Cinzel caps, `.78rem`, letter-spacing `.3em`, `--stone`.
- **Micro-labels** (the small stacked text pinned in the left and right gutters of most bands — a signature of this design): Cinzel caps, `.62rem`, letter-spacing `.28em`, `--stone` at 70% opacity, 2–4 short stacked lines, with a 24px gold hairline beneath. They are decorative framing; they must be `aria-hidden="true"` and must hide below 1100px.
- Body: Cormorant Garamond, 18–19px, line-height 1.6, measure ≤ 68ch.

**Surface and framing**: 1px gold hairlines at `.35` opacity frame cards and bands; card images sit inside a 1px gold frame with a 6px dark inset, like a mounted plate. Faint carved-stone grain over dark panels (inline SVG `feTurbulence`, ≤ 6% opacity). Vignette on every full-bleed image so text always sits on the dark part. No glassmorphism, no rounded-corner "app" cards — corners are 2px or square.

**Motion**: restrained and slow. Bands fade and rise 16px on first entry (IntersectionObserver, once). Card hover lifts the gold frame to `--gold-lit` and brightens the image 6%. The hero's light beam and brazier glow may breathe on a 6–8s cycle. Everything honours `prefers-reduced-motion`.

**No emojis anywhere.** Icons are monoline SVG glyphs drawn in gold.

## 5. Band specifications

Measurements are desktop at 1440px. Every band is full-bleed; inner content is a 1200px max-width centred column with a 24px gutter.

### 5.1 Header
Fixed. Transparent over the hero; after 80px of scroll it gains `rgba(11,10,8,.92)` with a bottom gold hairline. Left: seal + two-line wordmark. Centre: `Journey · Library · Wisdom Web · Practices · About` — Cinzel caps `.72rem`, letter-spacing `.18em`, `--stone`, gold on hover with a 1px gold underline that wipes in. Right: a search glyph that expands into an inline field, then a bordered gold button **"Awaken Within"** (`.72rem`, letter-spacing `.2em`, 1px gold border, transparent fill, gold-lit fill on hover). Below 900px the centre links collapse into a full-screen overlay menu behind a 3-line gold glyph; the CTA stays visible.

### 5.2 Hero — the threshold
Full-viewport (`min-height: 100vh`, capped at 900px). Background: the hero plate — a colonnade of two colossal seated pharaonic figures flanking a stepped pyramid that throws a vertical light beam into a clouded sky, fire braziers burning at the base, one small human figure walking in from the foreground. Dark vignette left, right and bottom.

Centred stack: eyebrow **"ANCIENT WISDOM. MODERN AWAKENING."**; display **BREAKING YOUR / GENETIC CODE**; subline in Cormorant italic ~1.4rem, **"Remember who you are."**; then two buttons side by side — solid gold **"BEGIN THE JOURNEY →"** (dark ink text) and bordered **"EXPLORE THE LIBRARY"**. Micro-labels in the gutters: left `CONSCIOUSNESS / HERITAGE / SELF-KNOWLEDGE / A BRIGHTER TOMORROW`, right `SAME WISDOM / A HIGHER HUMANITY`.

On phones the plate switches to a portrait crop that keeps the pyramid and beam centred; the display type drops to three lines if needed; buttons stack full-width.

### 5.3 The Journey Within
Panel band. Centred title **THE JOURNEY WITHIN** with subline **A RETURN TO WHAT HAS ALWAYS BEEN**; right micro-label `DIFFERENT PEOPLES / ONE TRUTH / ALWAYS`.

Six portrait cards in a row (aspect ~3:4), separated by small gold chevron glyphs between them. Each card: full-bleed art inside a gold hairline frame, and over the lower third a dark gradient carrying the number (`01`, Cinzel, gold, `.8rem`), the chapter title (Cinzel caps, cream, `.95rem`) and two short lines of Cormorant (`.9rem`, `--stone`) — max six words per line, drawn from the chapter content. Whole card is one link to `/journey/{chapter}`.

Responsive: 6 across ≥1280px → 3 × 2 at 900–1279px → a horizontal snap-scroll rail below 900px (cards ~72vw, chevrons hidden).

### 5.4 The Living Library
Panel band, slightly darker. Left micro-label `TIMELESS TEACHINGS / FOR A NEW HUMANITY`; centred title **THE LIVING LIBRARY** with subline **ANCIENT TEXTS. LIVING WISDOM. MODERN INSIGHTS.**; right a text link **EXPLORE ALL TEXTS →** with a gold underline.

Six cards in a row, squarer than the journey cards (~4:5): a framed plate of the text's artefact art, then below it on the panel the text title (Cinzel caps, cream, `.9rem`) and two short lines (`--stone`) — a compressed form of the key teaching. Links to `/library/{id}`.

The full `/library/` page carries the controls from the **secondary** reference: search field, `All Traditions / All Eras / All Themes` filter pills, and a horizontal era timeline slider (1200 BCE → 2000 CE) with two handles, above a grid of all 28 texts. Search behaviour matches the old site (title, tradition, key teaching) and shows a count line ("28 texts · 12 shown").

### 5.5 The Wisdom Web
Full-bleed band on the `--night` starfield, with weathered carved stone faces bleeding in at the far left and far right edges. Centred title **THE WISDOM WEB**, subline **IDEAS. TEXTS. PEOPLE. PATTERNS. ALL CONNECTED.**, and a bordered **EXPLORE THE WEB →** button top-right.

Centre: a radial constellation. A gold ring at the centre holds a knotwork glyph and the word **CONSCIOUSNESS**. Ten satellite nodes sit on a circle around it, each a small gold-ringed circle containing a monoline glyph, labelled with a Cinzel caps name and a Cormorant sub-line: `GENETICS / Lineage`, `ANCIENT TEXTS / Wisdom`, `SHADOW / Integration`, `MEMORY / The Past`, `LIBERATION / The Future`, `SELF / Identity`, `NATURE / Cycles`, `RITUAL / Practice`, `LANGUAGE / Symbol`, plus one more drawn from the real theme taxonomy. Thin gold lines connect centre to satellites and satellites to each other, with small glowing points along them.

**Built in SVG, not a raster** — it must stay crisp, be keyboard-reachable (each node a link into `/web/?theme=…`), and animate only as a slow opacity shimmer on the connecting lines. Gutter micro-labels: left `"A SINGLE THREAD / CONNECTS / ALL THINGS."`, right `DIFFERENT PATHS / ONE SOURCE`.

The full `/web/` page is the real interactive graph: the existing connection types with their filter toggles, the theme sidebar, and a detail panel per the secondary reference (description, "shared idea in N of 28 texts", sources include, historical distance). Canvas 2D there, 60fps on a mid phone.

### 5.6 The Weighing of Your Heart
Two-column band. **This reinstates a feature previously cut** — the master image includes it, so it ships, but strictly as a reflection prompt, never a quiz and never a score.

Left: the scales plate — a golden balance with a feather in one pan and a heart in the other, lit against a dark temple interior — with the title **THE WEIGHING OF YOUR HEART** in Cinzel caps over/beside it and the micro-label `A MODERN REFLECTION / AN ANCIENT PRACTICE` beneath.

Right: a dark panel with a gold hairline. Heading **PAUSE. REFLECT. REALIGN.**, subline *"Ask. Feel. Be honest. This is a journey back to you."*, then four accordion rows, each a bordered bar with the question in Cormorant and a gold `+` at the right: *What patterns am I ready to release? / Where am I out of alignment? / What does a more conscious me look like? / How can I serve something greater?* Opening a row reveals a textarea and a **Save reflection** action; reflections persist in localStorage and surface on `/practices/`. Accordions are real `<button aria-expanded>` elements.

Far right gutter: the pull quote **"A LIGHT HEART TRAVELS FAR."** with the attribution line **— ANCIENT EGYPTIAN PROVERB**. *Grounding check: this exact wording is a modern rendering of a sentiment from the Book of the Dead / Ma'at tradition, not a verbatim translated line. It must carry the same honesty mark as every other quote — attribute it as "after the Book of the Dead tradition" unless the research desk verifies a specific line and edition.*

### 5.7 The Journey Continues
Full-bleed panoramic band: sunrise over a river valley of stepped temples and mountains, warm light, low mist. Centred: title **THE JOURNEY CONTINUES**, subline **AN AWAKENED YOU. A BRIGHTER TOMORROW.**, and the solid gold **BEGIN THE JOURNEY →** button. Gutter micro-labels: left `HIGHER PEOPLE / BRIGHTER TOMORROWS`, right `KNOW YOURSELF / CHANGE EVERYTHING`.

### 5.8 Footer
Dark, short. Left: seal + wordmark. Centre: `Journey · Library · Wisdom Web · Practices · About`. Right: monoline social glyphs (YouTube, Instagram, X) and the line **A MORE CONSCIOUS WORLD IS POSSIBLE.** A gold hairline runs along the top edge.

## 6. Art direction — the plates

Every plate is generated with Codex's built-in `image_gen` tool (system skill `imagegen`; no API key needed), **always passing `reference/MASTER-mockup.png` as a reference image** so everything comes out of one production. Do not let it invent a new art direction; ask it for a component that belongs inside that same world.

**Shared style preamble, prepended to every prompt:**
> Cinematic ancient-world concept art in the exact style of the supplied reference image. Dark warm near-black palette, deep shadow, gold and amber firelight as the only bright sources, weathered carved limestone and sandstone, Egyptian and Mayan architectural influence blended into one civilisation that never existed. Volumetric god-rays, fine dust in the air, photoreal render with painterly depth, high detail, no text, no lettering, no watermark, no people unless specified, no modern objects.

Plates required (`assets/art/`, WebP + JPG fallback, sRGB):

| File | Ratio / size | Subject |
|---|---|---|
| `hero-threshold` | 21:9, 2880w (+ 4:5 1400w phone crop) | Two colossal seated pharaonic guardians flanking a stepped pyramid throwing a vertical light beam into a clouded sky; fire braziers; one small robed figure walking in |
| `journey-01`…`journey-06` | 3:4, 900w | One per chapter, matched to its meaning — conditioning/pattern, descent into a lit corridor, radiant sunburst of remembrance, luminous lotus, ascent up a temple stair to light, the whole earth from orbit |
| `library-01`…`library-06` | 4:5, 800w | The artefact of each featured text: painted tomb relief, inscribed clay tablet, papyrus vignette, carved feather of Ma'at, Maya codex page, an astronomical codex wheel |
| `web-face-left`, `web-face-right` | 2:3, 700w | Weathered carved stone heads in deep shadow, one Egyptian, one Maya, edge-lit, for the band's left and right bleeds |
| `web-starfield` | 21:9, 2560w | Deep night sky, dust lanes, faint nebula in cool blue over near-black — background only, no structures |
| `weighing-scales` | 4:3, 1400w | A golden balance, white feather in one pan, a golden heart in the other, on a dark temple floor lit by a single warm source |
| `closing-panorama` | 21:9, 2880w | Sunrise over a wide river valley of stepped temples and mountains, low mist, golden light |
| `seal` | 1:1 SVG, hand-drawn | The circular wordmark seal — a gold ring with an eye-and-rays glyph. **Vector, not generated raster.** |

Budget: hero and panorama ≤ 400KB each as WebP, cards ≤ 120KB each; every `<img>` carries `width`, `height`, `loading="lazy"` (except the hero, which is eager and preloaded), and a real `alt`.

## 7. Technical requirements

- Static, no build step, zero dependencies, ES modules, works from `file://` and from Pages.
- Performance: LCP < 2.5s on 4G, total JS < 140KB unminified, no CLS from the plates (always reserve dimensions), 60fps scrolling on a mid phone.
- Accessibility: full keyboard navigation, visible gold focus rings, ARIA landmarks, contrast ≥ 4.5:1 for body text over every plate (darken the vignette until it passes — do not lighten the type), `prefers-reduced-motion` honoured everywhere, all decorative micro-labels and plates hidden from screen readers.
- Data lives in `data/*.json`; the UI never hard-codes content.
- Deployment unchanged: push to `main`, Pages serves root, `CNAME` untouched.

## 8. Done means

The home page reproduces the master image band for band at 1440px and degrades cleanly to 390px; all 28 texts, every quote, every connection, all 4 study paths and all 6 chapters are present and asserted by a script; every plate is generated from the master reference and shares one look; the wordmark reads Breaking Your Genetic Code everywhere; research verdicts merged; QA checklist in packet 08 passes on phone and desktop.
