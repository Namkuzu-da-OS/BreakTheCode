# How this site was built

A record of the working method, because it is repeatable and it worked.

## The short version

> Talk it out in ChatGPT → generate an image of the finished site → hand that image to coding agents as the specification → have the same agent generate the art → gate everything behind a machine-checkable content contract.

The image was not a moodboard. **The image was the spec.**

## The steps

**1. Conversation first, in ChatGPT.** The owner talked through what the site should be and feel — the mission, the audience, the weight it needed to carry — before any layout existed. No code, no wireframes.

**2. Generate the site as an image.** That conversation produced a full-page rendered mockup: hero, section rhythm, type hierarchy, colour, lighting, the whole scroll. Two concepts were generated; one was selected. `reference/MASTER-mockup.png`.

**3. Promote the image to specification.** Claude read the image and wrote it down as an enforceable document — `00-DESIGN-BIBLE.md` (band-by-band layout, colour tokens, type scale, art direction) plus `PACKETS.md` (an ordered build queue with acceptance checks) and `AGENTS.md` (the contract any coding agent reads on entry).

This is the step that makes the method work. An image alone drifts; an image plus a written contract does not.

**4. Codex builds, one packet per run.** `codex exec` with the master mockup attached via `-i`, `-s workspace-write`, one packet at a time, each ending in its own commit and a NOTES.md entry. No agent was ever asked to "build the site" — only "do packet 04, and only packet 04."

**5. Codex also generates the art.** Its built-in `image_gen` tool produced all 19 plates. The rule that mattered: **every generation call passed the master mockup as a reference image**, plus a shared style preamble. That is what makes a hero, six journey cards, six artefact plates and a closing panorama read as one production instead of six art directions.

**6. A content contract gates every commit.** `scripts/verify-content.mjs` reads the *old* site and asserts the new one still carries all of it: 6 chapters, 16 texts, 28 quotes, 19 connections, 4 study paths — plus the owner's six journey subtitles, verbatim. It fails the build on drift.

**7. A research desk verifies the claims.** A dedicated packet traced every quote to a named translation and edition. 16 verified, 12 found to be paraphrases or misattributions and marked as such.

**8. Claude reviews in the browser against the image**, and fixes defects by hand rather than spending an agent run on them.

## What made it work

- **An image is a better spec than a description.** "Monumental, dark, gold, ancient" produces six different sites. A rendered page produces one.
- **Reference on every art call.** Continuity comes from passing the same reference image every time, not from describing the style again.
- **One packet per agent run.** Small scopes, real acceptance checks, a commit each. Interruptions cost one packet, never the project.
- **Machine-checkable invariants beat good intentions.** The verifier caught a real error: the spec claimed "28 texts" (taken from placeholder copy in a concept image) when the source actually holds 16 texts and 28 quotes. It also permanently locks the owner's own wording against well-meaning rewrites.
- **Separate the layers and say so out loud:** *the old site supplies content and functionality; the selected mockup supplies the design.* Written into AGENTS.md so no agent quietly preserved old UI or invented new content.
- **Do not blend concepts.** Several concept images existed. Only the selected one counted. Pulling a nice idea from a rejected concept is how a coherent design turns muddy.

## What to watch for

- Agents will inherit a placeholder's *words* along with its layout. The mockup named six Egyptian/Maya texts this library does not contain, and the first art pass dutifully illustrated them. Culturally wrong plates for real texts had to be caught and regenerated.
- A content-preservation rule can end up protecting errors. The verifier froze publication dates to the legacy values, which blocked the research desk from correcting them. Preserve wording; allow corrections.
- Usage limits interrupt long runs. Agents may complete work and die before committing — check the working tree before assuming a failed run did nothing.
