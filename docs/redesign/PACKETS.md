# Build Packets

Read `00-DESIGN-BIBLE.md` first. Packets run in order; each ends with its acceptance checks passing and a commit on branch `redesign/temple`. Do not start the next packet with the previous one's checks failing. Do not widen scope: if something is not in the bible or the packet, leave it out and note it in `docs/redesign/NOTES.md`.

Work in the repo root. Old `index.html` stays untouched until packet 08 replaces it; build the new site at `new/` during packets 02–07, then packet 08 promotes it to root.

---

## Packet 01 — Extract content to data (no content loss)

Source of truth: the current `index.html`. Produce:

- `data/chapters.json` — 6 chapters, in order: `{ id, hall (1–6), title, prose: [paragraphs…], pullQuote, wisdomCard: { textId, quote, context } }`. Extract `<section class="content">` blocks `#intro #awakening #patterns #ancient #consciousness #potential`. Preserve paragraph order and wording exactly (tightening happens in packet 03, from this file, as a diff).
- `data/texts.json` — flatten the `wisdomTexts` object (line ~2814): 28 texts, `{ id, era (ancient|medieval|renaissance|contemporary), eraName, title, period, tradition, keyTeaching, quotes: [{ text, context, source: { translator_or_edition: "", note: "", verified: false } }] }`. Drop the emoji `icon` field.
- `data/connections.json` — from the Wisdom Web data (search `webConnections`, `connectionColors`, and wherever the connection list is built ~line 4199–4260): `{ types: [{ id, label, color }], connections: [{ from, to, type, note? }] }`.
- `data/paths.json` — the `studyPaths` array (line ~3950), drop `icon`.
- `data/glyphs.json` — starts empty `[]` here; filled in packet 04.
- `scripts/verify-content.mjs` — Node script, no deps: asserts 6 chapters, 28 texts, quote count equals the count in the old file (compute it from the old file at run time), 4 paths, connection count equals old. Prints a table. Exit non-zero on mismatch.

Acceptance: `node scripts/verify-content.mjs` passes. Commit: `content: extract chapters, texts, connections, paths to data/`.

---

## Packet 02 — Shell, router, Gate, Court

- `new/index.html`, `css/tokens.css`, `css/base.css`, `css/rooms.css`, `js/app.js`, `js/router.js`, `js/store.js`, `js/data.js`, `js/rooms/gate.js`, `js/rooms/court.js`.
- Router per bible §3 (hash routes, back button, deep links, unknown route → court).
- Gate: one screen, no scroll, per bible. "Enter" → `#/court`. Returning visitors (any visited room in store) land on the Court directly.
- Court: the standing figure with rooms along the body, per bible §3. Rooms are `<a>` elements inside the SVG with proper focus/aria. Lit state from `store.visited`. Layout must fit a 390×740 portrait viewport with no scroll, and scale up cleanly to 1400px. Reference mockup: `docs/redesign/mockups/court-figure.html` — match its placement; improve its drawing (the figure line should feel drawn by a hand, not a CAD tool).
- Travel transition per bible.
- Placeholder room modules for everything else that render the room's lintel and "under construction" glyph wall — so the whole map is navigable end-to-end from this packet on.

Acceptance: open `new/index.html` from `file://`; every room reachable by click and by keyboard; lit-state persists across reload; no console errors; Lighthouse a11y ≥ 95 on the Court. Commit: `shell: router, gate, court map`.

Reasoning: this is the hardest design packet. Spend the effort on the figure drawing. If a stranger can't tell in one second that the map is a person, it isn't done.

---

## Packet 03 — The six Halls + Exit + copy pass

- `js/rooms/hall.js` renders hall N from `data/chapters.json` per bible §3 anatomy. Stela component (`js/components/stela.js`) reused by the House in packet 05.
- Per-hall lighting tokens (`--room-bg`, `--room-ink`, `--room-accent`, `--torch-intensity`) — Hall I brightest → Hall VI torchlit. Body contrast ≥ 4.5:1 in every hall; verify with a script or DevTools.
- Exit at the end of Hall VI per bible: "one thing to do today" (write one, plainly, in the owner's voice — e.g. notice one automatic reaction today and name where it came from) + Share (Web Share API → clipboard fallback with a visible "copied" state).
- Copy pass: produce `data/chapters.json` edits as a reviewable diff — tighten sentences, cut repetition, no new claims, keep every idea and the pull quotes. Target ≤30% shorter per chapter. Record before/after word counts in NOTES.md. (This pass may be delegated to a cheaper model; the diff must be reviewed before commit.)
- Marks each hall visited in the store on arrival.

Acceptance: all six halls render from data; each ≤ ~2 phone screens; stela shows citation line (or the "paraphrase" mark when `verified:false`); `verify-content.mjs` still passes (it must compare ideas/quotes, not raw prose, after the copy pass — adjust the script to compare quote text and paragraph count only). Commit: `halls: six halls, lighting progression, exit`.

---

## Packet 04 — Glyph layer

- Fill `data/glyphs.json` per bible §4 (~20 signs). Draw each as a monoline SVG `path`/`g` in a 64×64 viewBox, stroke-based, `currentColor`. Accurate enough that someone who knows the sign recognises it. Cite the meaning source in one line (e.g. Gardiner sign list number for Egyptian; Thompson/Kettunen & Helmke for Maya).
- `js/glyphwall.js`: builds a tiled `<svg>` wall behind a room's content; seeded PRNG per room id; picks from the room's culture set; density tuned so the wall reads as carved stone at 8–12% ink opacity; ~1 in 8 glyphs rendered as live buttons at a slightly higher opacity with `aria-label="{name}: glyph"`.
- Glyph card: small, anchored near the glyph on desktop, bottom sheet on phone; name, culture, meaning, source; Esc/tap-outside closes; focus returns to the glyph.
- Wall must not repaint on scroll; fixed-position layer with `will-change` only where needed; no jank on a mid phone.

Acceptance: every room shows a wall; at least 6 live glyphs per room; cards open by click and keyboard; wall never reduces body contrast below 4.5:1; 60fps scroll in a hall on a throttled (4× CPU) DevTools profile. Commit: `glyphs: data, walls, cards`.

---

## Packet 05 — The House of Life

- `js/rooms/house.js`: four era rooms as tabs/sub-rooms (`#/house?era=…`), tablets on shelves layout (cards with a carved top edge, era-coloured), search (title, tradition, keyTeaching — same behaviour as the old site), count line ("28 texts · 12 shown").
- Text room `#/house/text/{id}`: per bible. "Where this speaks in the halls" computed from `chapters.json` wisdomCard.textId. "Add all quotes to Cartouche".
- Study paths `#/house/path/{id}`: per bible; progress key migrated from the old site's localStorage if present.

Acceptance: all 28 texts reachable; search parity with old site; path progress persists; deep links work; keyboard complete. Commit: `house: library, text rooms, study paths`.

---

## Packet 06 — The Observatory

- `js/rooms/observatory.js`: star map per bible. Force-directed or precomputed layout (precomputed and stored in `data/layout.json` is fine and faster). Star size ∝ degree. Connection type toggles preserved (all on by default). Hover/tap → tooltip; second tap → text room. DPR-aware canvas; render loop pauses when the room is not visible; ≤ 4ms per frame with all connections on at 1400px, tested with `performance.now()` sampling logged to NOTES.md.
- Time lens `#/observatory/time`: same nodes on a horizontal time axis; era bands; horizontal pan by drag/wheel/touch; keyboard left/right pans.
- Maya grounding plate per bible, cited.

Acceptance: node and connection counts equal `connections.json`; both lenses work on phone; frame budget met. Commit: `observatory: star map and time lens`.

---

## Packet 07 — Your Cartouche

- `js/rooms/cartouche.js` per bible. Migrate old bookmark storage. Remove single, clear-all with confirm (inline confirm, not `window.confirm`). Each saved quote links back to its text room.

Acceptance: add from a stela, from a text room, and bookmark-all; persists; empty state renders. Commit: `cartouche: bookmarks`.

---

## Packet 08 — Promote, polish, docs

- Move `new/` to root: root `index.html` becomes the new site; keep the old file as `legacy/index.html` (reachable at `/legacy/`) for one release, then delete in a later commit.
- QA checklist (record results in NOTES.md): every route on iPhone-size and 1400px; Lighthouse performance ≥ 90, a11y ≥ 95 on Court, a hall, the House, the Observatory; `prefers-reduced-motion` walkthrough; no console errors; fonts load with swap; works from `file://` and from Pages.
- Docs: rewrite `README.md` (what it is, the room model, how to run, how content is edited — the JSON files); rewrite `docs/ROADMAP.md` to a short honest list (delete the VR/AR/AI-guide/community/PWA bloat); update `docs/CHANGELOG.md` with a `[2.0.0]` entry; move `CONTENT_EXPANSION.md` and `docs/WISDOM_TEXTS_IMPLEMENTATION.md` into `docs/archive/`.
- Merge research desk verdicts (packet R) into `data/texts.json` before release.

Acceptance: `verify-content.mjs` passes against the new data; checklist complete; PR opened from `redesign/temple` → `main` with the checklist in the body. Commit: `release: 2.0.0 temple redesign`.

---

## Packet R — Research desk (runs in parallel from packet 01 onward; any model with web access)

Input: `data/texts.json` and `data/glyphs.json`. For every quote and every glyph meaning:
1. Find the primary text and a named translation/edition. Confirm the line exists there (quote the located passage and its location — chapter/verse/section).
2. Set `source.translator_or_edition`, `source.note`, `source.verified`.
3. If not found: mark `verified:false`, and in `note` say what it actually is (modern paraphrase, misattribution, Barks rendering, etc.) and, where possible, offer a verified replacement line from the same text that carries the same meaning.
4. Check every `period` date against current scholarship; correct with "c." where needed.
5. Output: a PR against `redesign/temple` touching only `data/texts.json` and `data/glyphs.json`, plus `docs/redesign/RESEARCH-REPORT.md` listing every verdict with links. Do not edit prose or code.

Start with the known suspects in bible §5.
