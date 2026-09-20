# Breaking Your Genetic Code — Redesign Bible

Status: APPROVED DIRECTION 2026-09-19. This document is the source of truth for the rebuild. Packets 01–08 in this folder are the build order. Read this fully before touching any packet.

## 1. Why

The current site (`index.html`, ~4,800 lines) is a six-chapter cyber-themed scrolling book with a Living Library (28 texts), a Wisdom Web (relationship graph), study paths, a timeline, and bookmarks. The content is the owner's work and is **preserved in full**. The container is being rebuilt from first principles.

Mission, in the owner's words: people die never knowing themselves. Some don't break their code until they're old. Get this to people while they're young. Keep it ancient. When you come in there should be a presence — rooted in real knowledge, not fluff. "I don't know what these hieroglyphs say but I feel them."

## 2. The one idea

**The site is a place, not a page.** A temple complex you move through. Every piece of existing content gets its own building. Navigation is spatial: one map, tap a room, you are in it. No top nav bar. No infinite scroll. No chapter list.

Rejected on the way here (do not resurrect): one continuous scroll-walk; a "Weighing of the Heart" quiz; starfield, DNA helix, mouse-trail particles, Orbitron/Rajdhani fonts, emoji icons, the consciousness progress bar.

## 3. The complex (spatial model)

Egyptian temple plan for the whole; the Maya own the Observatory.

| Room | Holds | Old site equivalent |
|---|---|---|
| **The Gate** (pylon) | One screen. Title, one line of intent, "Enter". | Hero |
| **The Court** | The map of the whole complex. THE navigation. | Nav bar + consciousness meter |
| **Hall I — Recognition** | Chapter: Introduction | `#intro` |
| **Hall II — The Awakening** | Chapter: The Awakening | `#awakening` |
| **Hall III — Breaking Patterns** | Chapter: Breaking Patterns | `#patterns` |
| **Hall IV — Ancient Wisdom** | Chapter: Ancient Wisdom | `#ancient` |
| **Hall V — Expanding Consciousness** | Chapter: Expanding Consciousness | `#consciousness` |
| **Hall VI — Full Potential** (the sanctuary) | Chapter: Full Potential + the Exit | `#potential` |
| **The House of Life** (per-ankh — real name of Egyptian temple scriptoria) | Living Library: all 28 texts, era rooms, search, study paths | `#library` grid, filters, search, study paths, text modal |
| **The Observatory** (El Caracol, Chichen Itza — a real Maya observatory) | Wisdom Web as a star map, plus a Time lens | `#relationships-web` + the timeline |
| **Your Cartouche** | Bookmarks. A cartouche is a name ring: you are inscribing yourself. | Bookmarks panel, bookmark-all |

### Sources are voices, not a costume (owner's principle, 2026-09-19)
This is not an Egyptian site, a Maya site, or an adaptation of any one system. It pulls on all known human knowledge and makes something new for this time. Egypt, the Maya, the Vedas, the Stoics, the mystics all speak in it; none of them dresses it. Nothing on the site claims to *be* Luxor, a chakra system, or anyone's diagram. Where a source inspired a choice, credit it as inspiration on the spot.

### The Court (map) — the decision everything hangs on
- **The map is a standing human figure**, drawn in thin limestone line, and the rooms are placed along the body. A teenager reads it in one second: *this is a map of me.* Inspiration (credited on the map in one line): Schwaller de Lubicz's reading of Luxor as "the temple in man" — but this is our own figure and our own placement, not his plan, and no claim is made that it is anatomically or historically "the" mapping. The walk goes through a body and a life, feet first.
- Placement, feet → head, following the chapter order: Gate = the threshold beneath the feet; Hall I Recognition = the feet (the first step); Hall II The Awakening = the navel (where you were written); Hall III Breaking Patterns = the lungs (breath, rhythm, pattern); Hall IV Ancient Wisdom = the heart; Hall V Expanding Consciousness = the throat (your word); Hall VI Full Potential = the head. The Observatory = what the eyes look out at (a circle off the head, joined by a sightline). The House of Life = the left hand (what you read). Your Cartouche = the right hand (what you keep — a name-ring shape).
- Rendering: gold rooms on dark stone, a dashed axis through the spine, small-caps labels, a short plate crediting the inspiration. Survey-drawing restraint; not a medical diagram, not a game map.
- Rooms you have visited are **lit** (warm interior glow inside the outline). Unvisited rooms are outline only. Current room pulses very gently. This is the entire progress system.
- Tap/click a room → travel. Keyboard: Tab between rooms, Enter to go. Phone: the plan fits one portrait screen with no scrolling; halls are large enough to tap (≥44px).
- One line of guidance under the plan for first-time visitors: "Walk the halls in order, or go where you're drawn."

### Travel (room transitions)
- ≤400ms. Darkness closes, the new room's glyph wall fades in, then content. It should feel like passing through a doorway, not a page load. Respect `prefers-reduced-motion` (instant swap).
- Hash router: `#/gate` `#/court` `#/hall/1`…`#/hall/6` `#/house` `#/house/text/{id}` `#/house/path/{id}` `#/observatory` `#/observatory/time` `#/cartouche`. Back button works. Deep links work. Still a static site.

### Halls (six)
- Anatomy, top to bottom: carved lintel (hall number as Roman numeral, hall name); the chapter prose; the pull quote as a carved inscription; the chapter's wisdom text as a **stela** (a standing stone panel: text title, date, quote, context, citation); the doorway strip: `← Court` and `Next hall →` (Hall VI's doorway is the Exit).
- Depth: at most ~2 phone screens. Tighten prose where it rambles (see Copy pass in packet 03) — never add claims, never lose the owner's meaning.
- **Lighting progression carries the temple**: Hall I is the brightest (open court light, limestone/gold); each hall inward is darker and warmer; Hall VI is torchlit, near-black with gold. Set per-hall CSS tokens; this replaces the old scroll-darkening idea.
- The Exit (end of Hall VI): "One thing to do today" — one concrete practice, in the owner's voice — and one primary action: **Send this to someone younger than you** (Web Share API, fallback copy link). Then `← Court`.

### The House of Life
- Four era rooms (Ancient / Medieval / Renaissance / Contemporary) = the four existing filters. Texts shown as tablets on shelves (cards), not a generic grid. Search stays (title, tradition, teaching).
- Text detail = a full room, not a modal: title, date, tradition, key teaching, all quotes with context, citation line, "Add to Cartouche", and **"Where this speaks in the halls"** (lists the hall(s) that quote it and links there — this replaces the stubbed "coming soon" button).
- Study paths = "the reading the scribe assigns you": the 4 existing paths, progress preserved (localStorage), each shown as a sequence of tablets with a marker for read/unread.

### The Observatory
- The Wisdom Web reborn as a night sky: texts are stars (size = number of connections), connections are drawn lines. Existing connection types and their filter toggles preserved. Hover/tap a star → its name and connections; tap again → its House of Life room. Canvas 2D, throttled, must hold 60fps on a mid phone with all connections on.
- **Time lens** toggle: same stars re-laid along a horizontal time axis (800 BCE → present), era bands as faint horizons. Pan sideways. This replaces the old timeline section. One small plate of real Maya grounding beside the toggle: they had zero and the Long Count; the Dresden Codex Venus table tracks Venus's cycle to within hours across centuries. Cited.

### Your Cartouche
- Saved quotes shown inside a cartouche outline. Add/remove, "bookmark all quotes from a text", clear-all with confirm. localStorage as now. Empty state: an empty cartouche and one line inviting the first inscription.

## 4. The glyph layer (the presence)
- `data/glyphs.json`: ~20 real signs. Egyptian: ankh, djed, was-sceptre, wedjat (Eye of Horus), ba-bird, ka (raised arms), ib (heart), feather of Ma'at, shen ring, sa (protection). Maya: k'in (sun), the ceiba/world tree, day signs Imix, Ik', Ak'bal, K'an, Ajaw, and the Long Count zero shell. Each: `id, culture, name, meaning (1–2 sentences), source (one line), svg`.
- Every room has a **glyph wall**: a low-contrast tiled SVG pattern behind the content, seeded per room so no two rooms tile identically, glyphs chosen by the room's theme (Halls: Egyptian; Observatory: Maya; House: both). Dense — this is a wall, not a row of icons. Contrast low enough never to fight the text.
- ~1 in 8 wall glyphs is *live*: a touch brighter. Tap/click → a small card: name, meaning, source. Feel it first, then it tells you. Cards are keyboard-reachable (live glyphs are buttons with aria-labels).
- Glyph drawings: clean monoline SVG. Recognisable as the actual sign. Not cartoonish, not photoreal.

## 5. Grounding rule (credibility is the wow)
- Every ancient quote in `data/texts.json` carries `source: { translator_or_edition, note, verified: true|false }`. Unverified quotes render with a subtle "paraphrase / attribution uncertain" mark. Nothing is silently presented as verbatim scripture.
- Known suspects to check first (Research desk, packet R): Tao Te Ching "When I let go of what I am, I become what I might be" (widely circulated, not in the Tao Te Ching — likely a modern paraphrase); any Rumi in English (most viral Rumi is Coleman Barks' free renderings); any Buddha quote not traceable to the Pali canon; "Be Here Now" and Tolle lines (copyright — keep to short quotation with attribution).
- The Emerald Tablet is an Arabic-era text, the Kybalion is 1908 Chicago: neither may be presented as ancient Egyptian. Fine to mention if labelled honestly.
- Dates shown as ranges with "c." where scholarship is uncertain.

## 6. Visual system
- **Palette tokens** (`css/tokens.css`): limestone `#E8DCC4`, sandstone `#C9B48A`, gold leaf `#D4AF37`, lapis `#1B3A6B`, carnelian `#B03A2E`, Maya blue `#73A9C2`, jade `#3E8A6E`, obsidian `#0B0A0A`, night `#101425`. Egyptian rooms: obsidian/night/lapis with gold and limestone ink. Observatory: night with Maya blue and jade. House of Life: sandstone-lit, warmer.
- **Type**: Cinzel (display, carved), Cormorant Garamond (body). Google Fonts, `display=swap`. Small caps for labels. Generous measure (≤68ch). Body ≥17px on phone.
- **Surface**: stone via CSS — SVG `feTurbulence` grain at low opacity, faint horizontal course lines in the halls. No raster images.
- **Light**: a soft radial torchlight that follows the pointer on desktop and drifts slowly on touch devices; intensity per room token. Never distracting; reduced-motion → static.
- **Motion**: restrained. Nothing loops visibly except the torch drift and the Court's current-room pulse.
- No emojis anywhere in the UI. Icons are glyphs or monoline SVG.

## 7. Technical architecture
- Static site, GitHub Pages, **no build step**. `index.html` + `css/` + `js/` (ES modules) + `data/*.json` + `assets/glyphs/`. Zero dependencies. Google Fonts is the only external request.
- Files: `js/app.js` (boot, router), `js/rooms/*.js` (one module per room), `js/glyphwall.js`, `js/store.js` (localStorage: visited rooms, bookmarks, path progress; namespaced keys `btc.*`; migrate the old site's existing bookmark/progress keys if present), `js/data.js` (fetch + cache JSON).
- Performance budget: first paint < 1.5s on 4G; 60fps on a mid-range phone; total JS < 120KB unminified; no layout thrash on travel.
- Accessibility: full keyboard navigation, visible focus, ARIA landmarks and labels, colour contrast ≥ 4.5:1 for body text in every room's lighting, `prefers-reduced-motion` honoured everywhere.
- Deployment stays exactly as today: push to `main`, GitHub Pages serves root, `CNAME` untouched.

## 8. What "done" means
All six halls, House, Observatory, Cartouche, Court, Gate, Exit live; all 28 texts, every quote, every connection, all 4 study paths present (counts asserted by a script in packet 01); glyph layer active in every room; research desk verdicts merged; runs from `file://` and from Pages; passes packet 08's QA checklist on phone and desktop; docs rewritten (README, CHANGELOG, ROADMAP — the old ROADMAP's VR/AR/AI/community bloat is deleted, not carried).
