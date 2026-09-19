# AGENTS.md — Breaking Your Genetic Code

This repo is mid-redesign. Before doing anything:

1. Read `docs/redesign/00-DESIGN-BIBLE.md` in full.
2. Read `docs/redesign/PACKETS.md` and find the first packet whose acceptance checks are not yet met (check `docs/redesign/NOTES.md` for the log and `git log` on branch `redesign/temple`).
3. Do that packet only. Run its acceptance checks. Commit with the packet's commit message. Append a short entry to `docs/redesign/NOTES.md` (what you did, what you verified, anything you deliberately left out and why).
4. Stop. Do not start the next packet in the same run unless told to.

Rules that override anything else:
- Work on branch `redesign/temple`. Never commit to `main`.
- Content is preserved in full: 6 chapters, 28 texts, every quote, every connection, 4 study paths. `node scripts/verify-content.mjs` must pass at every commit after packet 01.
- No build step, no dependencies, no frameworks. Static files only. Google Fonts is the only external request.
- No emojis in the UI. No nav bar. No infinite scroll page. No "weighing of the heart".
- Every ancient quote carries a `source` object; unverified quotes render with the paraphrase mark.
- Do not invent facts about Egypt or the Maya. If unsure, leave it out and note it.
- Do not widen scope. The old `docs/ROADMAP.md` is not a task list.

Local preview: open `new/index.html` (packets 02–07) or `index.html` (after 08) directly in a browser, or `python -m http.server 8000`.
