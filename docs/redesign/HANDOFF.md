# Handoff — Breaking Your Genetic Code

**Last session:** 2026-09-19 → 2026-09-20
**State:** Site is **LIVE** at https://breakthecode.meatball-labs.com
**Next session:** pick up at "Where to start" below.

---

## Where things stand

The 2.0 redesign is built, verified and deployed. `main` is live at commit `41ce0b9`.

| Piece | State |
|---|---|
| Home page (7 bands + footer) | live |
| `/journey/` + 6 chapter pages | live |
| `/library/` + 16 text pages | live |
| `/web/` interactive graph | live |
| `/practices/`, `/about/` | live |
| Content preserved | 6 chapters, 16 texts, 28 quotes, 19 connections, 4 paths |
| Quote sourcing | 23 of 28 verified to a named edition |
| Art | 16 of 26 plates wired; 10 new ones generated, **wiring in progress** |
| Old site | preserved at `/legacy/index.html` + backed up to Drive |

---

## Where to start next session

**1. Finish the library plates (small, in flight).**
Ten artefact plates for the remaining texts were generated and are sitting on branch `redesign/temple`, uncommitted or freshly committed depending on how the last run landed. Check:

```bash
git -C <repo> status --short
git -C <repo> log --oneline -3 redesign/temple
```

They need to be committed on `redesign/temple`, then merged forward to `main`. **Merge carefully** — `redesign/temple` is behind `main` and does not contain the quote corrections (`41ce0b9`). Merging `redesign/temple` → `main` is the safe direction; the branch has no changes to `data/texts.json` or `scripts/verify-content.mjs` since the merge base, so `main`'s versions win. Verify after merging:

```bash
node scripts/verify-content.mjs      # must print "Approved quote corrections applied: 7"
```

**2. One known visual defect.**
`assets/art/library-09` (The Cloud of Unknowing) and `library-10` (Ibn Arabi) are near-duplicate compositions — both open codices, same angle, same light. Correct up close, but they read as the same object twice in the library grid. Regenerate `library-09` as a *closed* leather binding so it contrasts. One `image_gen` call with the master mockup as reference.

**3. Five quotes still carry the paraphrase mark, by design.**
No honest same-meaning replacement exists for these, so they were deliberately left alone:

| Text | Why |
|---|---|
| Rumi ×2 | No Persian original or named translation locatable; one has no replacement offered at all |
| Emerson — "What lies behind us…" | Actually Henry Stanley Haskins, 1940 |
| Huxley — "doors of perception" | Actually Ray Manzarek, 1967, explaining the band's name |
| Tao Te Ching — "When I let go of what I am" | Actually John Heider, 1985 |

Options for each: keep with the honest mark (current), re-attribute to the real author, or drop. **This is an owner decision, not a builder one.** Full evidence in `docs/redesign/RESEARCH-REPORT.md`.

**4. Nice-to-haves, none urgent.**
- Mobile QA pass at 390px on the real device
- Lighthouse run (packet 08's checklist is in `NOTES.md`)
- Open Graph image for link sharing
- The `AGENTS.md` rule still says "never commit to `main`" — true during the build, now stale since publishing happens on `main`. Update if an agent gets confused by it.

---

## How to work on this

**Preview locally** (does NOT work from `file://` — data JSON is fetched at runtime):
```bash
cd <repo> && python -m http.server 8080
# open http://localhost:8080/
```

**Run a build packet with Codex:**
```bash
codex exec -C "<repo>" -s workspace-write -c model_reasoning_effort=high \
  -i "docs/redesign/reference/MASTER-mockup.png" \
  # prompt via stdin - `-i` is variadic and will swallow a trailing prompt arg
```
Configured model is `gpt-5.6-sol`. `gpt-5-codex` is a stale name.

**Check remaining Codex quota** (it logs rate-limit snapshots):
```bash
grep -o '"rate_limits":{[^}]*}[^}]*}' "$(ls -t ~/.codex/sessions/*/*/*/*.jsonl | head -1)" | tail -1
```

**The contract that protects the content:** `scripts/verify-content.mjs` reads `legacy/index.html` and asserts nothing was lost or silently reworded. It must pass at every commit. It carries an explicit allowlist of the seven approved quote swaps — any *other* wording change fails the build. Don't loosen it; add to the allowlist deliberately if a swap is approved.

---

## Rules that are settled (don't relitigate)

- The title is **Breaking Your Genetic Code**. "Break the code" is supporting copy only.
- `docs/redesign/reference/MASTER-mockup.png` is the design. The old site supplies content and functionality only.
- The six journey stages are the owner's own words, asserted verbatim by the verifier. Do not rewrite them.
- Don't blend in ideas from rejected concept images (the temple/Court-map direction is dead and archived).
- Art is generated with the master mockup passed as a reference on **every** call.
- Artefact plates must match the text's real tradition. Modern authors get the *kind* of object, never a fabricated cover of a real edition.

---

## Backups

- `BigPic - Technology/Website/Backups/BreakTheCode-pre-redesign-2026-09-20/` — live capture + full `main` tree at `ed8485c`
- `legacy/index.html` in the repo (and the verifier reads it every run)
- Rollback: `git checkout main -- index.html`

## The method

Written up as a reusable playbook: `BigPic - Technology/Playbooks/Internal/Image-First Interface Design.md`.
Project-specific record: `docs/redesign/PROCESS.md`.
