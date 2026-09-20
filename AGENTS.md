# AGENTS.md — Breaking Your Genetic Code

This repo is mid-redesign. Before doing anything:

1. **Open `docs/redesign/reference/MASTER-mockup.png`.** That image is the site. It is the specification.
2. Read `docs/redesign/00-DESIGN-BIBLE.md` in full.
3. Read `docs/redesign/PACKETS.md` and find the first packet whose acceptance checks are not yet met (check `docs/redesign/NOTES.md` and `git log` on branch `redesign/temple`).
4. Do that packet only. Run its acceptance checks. Commit with the packet's commit message. Append a short entry to `docs/redesign/NOTES.md` (what you did, what you verified, anything you deliberately left out and why).
5. Stop. Do not start the next packet in the same run unless told to.

Rules that override anything else:

- Work on branch `redesign/temple`. Never commit to `main`.
- **Build the site in the master image.** The old `index.html` is a *content and data reference only* — its appearance has zero authority. Do not preserve its CSS, layout, components, colours or hierarchy. Do not keep a component because rewriting it is work.
- The displayed title is **"Breaking Your Genetic Code"** — the name of the book this site is built around. Both mockups show "BREAK THE CODE" in the wordmark; that is wrong and must be replaced everywhere. "Break the code" is supporting copy only.
- Content is preserved in full: 6 chapters, 16 texts, all 28 quotes, every connection, 4 study paths. `node scripts/verify-content.mjs` must pass at every commit after packet 01. Where the mockup's placeholder words conflict with real content, the real content wins and the composition stays.
- All art is generated with the built-in `image_gen` tool, **always passing the master mockup as a reference image** and the shared style preamble from bible §6. Never ask it for a new art direction.
- No build step, no dependencies, no frameworks. Static files only. Google Fonts is the only external request.
- No emojis in the UI. Icons are monoline SVG glyphs.
- Every ancient quote carries a `source` object; unverified quotes render with the paraphrase mark. Do not invent facts about Egypt or the Maya — if unsure, leave it out and note it.
- Do not widen scope. The old `docs/ROADMAP.md` is not a task list.

Superseded, do not resurrect: the "temple complex / Court map / standing figure" direction and everything in `docs/redesign/archive/`.

Local preview: `python -m http.server 8000` from the repo root, then open `http://localhost:8000/new/index.html`. Opening the file directly will NOT work - the data JSON is fetched at runtime and browsers block that on `file://`.
