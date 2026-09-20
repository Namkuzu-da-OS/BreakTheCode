# Breaking Your Genetic Code

Breaking Your Genetic Code is a static digital companion to the book of the same name. It brings six chapters, a 16-text Living Library, 28 sourced or honestly marked quotations, the Wisdom Web, four study paths, bookmarks, and private reflections into one accessible web experience.

The site has no framework, dependency install, or build step. It is plain HTML, CSS, JSON, and ES modules; Google Fonts is its only external request.

## Experience model

The home page is a sequence of full-width bands:

1. A monumental threshold and primary navigation
2. The six-stage Journey Within
3. Six featured works from the Living Library
4. The Wisdom Web constellation
5. The Weighing of Your Heart reflection prompts
6. A panoramic closing invitation

Deeper routes provide the complete journey chapters, all 16 library texts, the interactive relationship graph, saved practices, and the project approach:

- `/journey/` and `/journey/{chapter}/`
- `/library/` and `/library/{text-id}/`
- `/web/`
- `/practices/`
- `/about/`

The previous single-file site remains temporarily available at `/legacy/` for the 2.0.0 release cycle.

## Run locally

The JSON content is fetched at runtime, so the site must be served over HTTP. Opening `index.html` directly with `file://` is not supported.

From the repository root:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000/`.

## Project structure

```text
assets/                 Generated art plates and the seal
css/                    Shared tokens, base styles, bands, and pages
data/                   Chapters, texts, relationships, paths, and themes
js/bands/               Home-page band renderers
js/pages/               Journey, library, web, practices, and about pages
journey/ library/       Static route shells hydrated from data
web/ practices/ about/  Additional route shells
legacy/                 The pre-2.0 single-file site, retained for one release
scripts/                Content integrity checks
```

## Edit content

Content belongs in `data/*.json`, not in the rendering modules. Preserve the existing record shapes and IDs because routes, relationships, bookmarks, and study paths refer to them.

- `data/chapters.json`: six journey chapters and their linked wisdom texts
- `data/texts.json`: 16 texts, 28 quotations, contexts, and source status
- `data/connections.json`: Wisdom Web relationship types and edges
- `data/paths.json`: four study paths
- `data/themes.json`: theme taxonomy and featured home-page nodes

Every quotation must keep a `source` object. If wording has not been verified against a named translation or edition, leave `verified` false and explain the uncertainty in `note`; the interface will mark it as a paraphrase or pending verification.

After any content edit, run:

```bash
node scripts/verify-content.mjs
```

The check must continue to report 6 chapters, 16 texts, 28 quotes, 19 connections, and 4 study paths.

## Design and contribution guidance

The implementation specification lives in `docs/redesign/00-DESIGN-BIBLE.md`, with `docs/redesign/reference/MASTER-mockup.png` as the visual authority. See `AGENTS.md` and `docs/CONTRIBUTING.md` before changing the site.
