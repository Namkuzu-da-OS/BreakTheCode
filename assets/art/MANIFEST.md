# Packet 02 art manifest

All raster plates were generated with the built-in `image_gen` tool. Every call used `docs/redesign/reference/MASTER-mockup.png` as its reference image. Each exact prompt was the shared preamble below, followed by a blank line and the asset-specific suffix recorded for that plate.

## Shared preamble

> Cinematic ancient-world concept art in the exact style of the supplied reference image. Dark warm near-black palette, deep shadow, gold and amber firelight as the only bright sources, weathered carved limestone and sandstone, Egyptian and Mayan architectural influence blended into one civilisation that never existed. Volumetric god-rays, fine dust in the air, photoreal render with painterly depth, high detail, no text, no lettering, no watermark, no people unless specified, no modern objects.

Final rasters are sRGB. Byte counts are the committed output sizes.

| Plate | Dimensions | WebP | JPG |
|---|---:|---:|---:|
| `hero-threshold` | 2880 × 1234 | 369,188 B | 554,869 B |
| `hero-threshold-mobile` | 1400 × 1750 | 391,886 B | 467,524 B |
| `journey-01` | 900 × 1200 | 113,768 B | 211,600 B |
| `journey-02` | 900 × 1200 | 117,696 B | 217,663 B |
| `journey-03` | 900 × 1200 | 117,590 B | 266,100 B |
| `journey-04` | 900 × 1200 | 113,196 B | 187,358 B |
| `journey-05` | 900 × 1200 | 118,876 B | 234,461 B |
| `journey-06` | 900 × 1200 | 114,852 B | 206,130 B |
| `library-01` | 800 × 1000 | 118,956 B | 123,172 B |
| `library-02` | 800 × 1000 | 119,178 B | 140,742 B |
| `library-03` | 800 × 1000 | 114,694 B | 138,687 B |
| `library-04` | 800 × 1000 | 113,518 B | 143,918 B |
| `library-05` | 800 × 1000 | 117,582 B | 218,311 B |
| `library-06` | 800 × 1000 | 119,522 B | 228,452 B |
| `library-07` | 800 × 1000 | 116,836 B | 234,068 B |
| `library-08` | 800 × 1000 | 119,822 B | 198,889 B |
| `library-09` | 800 × 1000 | 118,450 B | 199,187 B |
| `library-10` | 800 × 1000 | 115,530 B | 204,629 B |
| `library-12` | 800 × 1000 | 111,134 B | 142,635 B |
| `library-13` | 800 × 1000 | 119,588 B | 188,304 B |
| `library-14` | 800 × 1000 | 116,212 B | 143,567 B |
| `library-15` | 800 × 1000 | 114,664 B | 173,887 B |
| `library-16` | 800 × 1000 | 89,752 B | 119,584 B |
| `library-17` | 800 × 1000 | 103,474 B | 143,362 B |
| `web-face-left` | 700 × 1050 | 111,300 B | 124,776 B |
| `web-face-right` | 700 × 1050 | 107,226 B | 120,685 B |
| `web-starfield` | 2560 × 1097 | 152,398 B | 287,067 B |
| `weighing-scales` | 1400 × 1050 | 198,850 B | 247,928 B |
| `closing-panorama` | 2880 × 1234 | 394,270 B | 610,733 B |

## Exact prompt suffixes

### `hero-threshold.webp` and `hero-threshold.jpg`

```text
Use case: stylized-concept
Asset type: ultra-wide desktop website hero plate, 21:9
Input image: the supplied master mockup is the binding production style reference; match its palette, light logic, materials, atmosphere, and monumental camera language exactly.
Primary request: Two colossal seated pharaonic guardians flank a distant stepped pyramid that sends one perfectly vertical golden-white light beam into a dramatic clouded sky. Four low fire braziers glow near the temple threshold. One single small anonymous robed figure walks inward from the shadowed foreground toward the pyramid.
Composition/framing: symmetrical axial composition, very wide cinematic establishing shot, eye-level low camera, pyramid and beam precisely centered, guardians cropped at the far edges, generous dark foreground and side vignette for overlaid typography; keep all essential subjects inside a central 4:5-safe crop for mobile.
Lighting/mood: darkness opening toward awakening; amber braziers and the central beam are the only bright sources.
Constraints: one small figure only; no visible facial detail; architecture must feel ancient, weathered, monumental, and internally consistent with the reference. No text, symbols, lettering, logos, UI, watermark, extra people, modern objects, neon, cool-white flood lighting.
```

### `hero-threshold-mobile.webp` and `hero-threshold-mobile.jpg`

```text
Use case: stylized-concept
Asset type: portrait mobile website hero plate, 4:5
Input image: the supplied master mockup is the binding production style reference; match its palette, light logic, materials, atmosphere, and monumental camera language exactly.
Primary request: Two colossal seated pharaonic guardians flank a stepped pyramid that sends one perfectly vertical golden-white light beam into a dramatic clouded sky. Four low fire braziers glow near the temple threshold. One single small anonymous robed figure walks inward from the shadowed foreground toward the pyramid.
Composition/framing: symmetrical axial portrait composition, pyramid and beam precisely centered and fully visible, guardians cropped into the left and right edges, ample dark space at top and bottom for mobile hero typography.
Lighting/mood: darkness opening toward awakening; amber braziers and the central beam are the only bright sources.
Constraints: one small figure only; no visible facial detail; no text, symbols, lettering, logos, UI, watermark, extra people, modern objects, neon, cool-white flood lighting.
```

### `journey-01.webp` and `journey-01.jpg`

```text
Use case: stylized-concept
Asset type: Journey chapter card plate, portrait 3:4
Input image: the supplied master mockup is the binding production style reference; match it exactly.
Primary request: an anonymous human silhouette in profile whose outer stone-like shell is fragmenting into small dark geometric pieces, revealing faint warm inner light; visual metaphor for inherited conditioning and recognizing the patterns that shape a life.
Composition/framing: iconic single bust/profile centered in a weathered temple alcove, room in the lower third for a card text gradient, no other people.
Lighting/mood: very dark, contemplative, one restrained amber rim light and dim internal glow.
Constraints: ancient monumental materials; not futuristic, not a robot, not graphic design. No text, symbols, lettering, logos, UI, watermark, modern objects.
```

### `journey-02.webp` and `journey-02.jpg`

```text
Use case: stylized-concept
Asset type: Journey chapter card plate, portrait 3:4
Input image: the supplied master mockup is the binding production style reference; match it exactly.
Primary request: one small anonymous robed figure descending into a long, narrow, weathered stone corridor, moving from deep shadow toward a distant pool of warm firelight; visual metaphor for awakening through facing what is hidden.
Composition/framing: strong one-point perspective, towering carved walls, figure small and centered, room in the lower third for a card text gradient.
Lighting/mood: deep near-black shadow, a single distant amber source, subtle dust-filled god-rays.
Constraints: one person only; ancient stone environment. No text, symbols, lettering, logos, UI, watermark, modern objects.
```

### `journey-03.webp` and `journey-03.jpg`

```text
Use case: stylized-concept
Asset type: Journey chapter card plate, portrait 3:4
Input image: the supplied master mockup is the binding production style reference; match it exactly.
Primary request: a radiant circular sunburst of remembrance suspended within a vast dark ancient stone chamber, concentric hand-carved rings and fine golden rays illuminating dust; a visual metaphor for recognizing what has always been known.
Composition/framing: central iconic orb, symmetrical temple geometry, no people, room in the lower third for a card text gradient.
Lighting/mood: almost black chamber, the restrained warm sunburst is the sole light source, sacred and contemplative rather than explosive.
Constraints: tactile weathered stone and metal, no science-fiction machinery. No text, lettering, logos, UI, watermark, modern objects.
```

### `journey-04.webp` and `journey-04.jpg`

```text
Use case: stylized-concept
Asset type: Journey chapter card plate, portrait 3:4
Input image: the supplied master mockup is the binding production style reference; match it exactly.
Primary request: one luminous blue-green lotus opening above a still black temple pool, its petals edged by warm gold firelight, surrounded by weathered carved stone and faint reflected columns; visual metaphor for presence and the heart.
Composition/framing: single lotus centered, low intimate camera, deep negative shadow around it, room in the lower third for a card text gradient, no people.
Lighting/mood: nocturnal teal-black shadows held inside the master image's warm amber light logic; subtle internal glow, never neon.
Constraints: photoreal botanical form, ancient temple materials. No text, lettering, logos, UI, watermark, modern objects.
```

### `journey-05.webp` and `journey-05.jpg`

```text
Use case: stylized-concept
Asset type: Journey chapter card plate, portrait 3:4
Input image: the supplied master mockup is the binding production style reference; match it exactly.
Primary request: a long monumental stair climbing between weathered temple walls toward a distant opening of golden dawn light; one tiny anonymous robed figure ascends near the middle; visual metaphor for conscious choice and expansion.
Composition/framing: steep axial perspective, figure very small, summit light centered, room in the lower third for a card text gradient.
Lighting/mood: near-black lower steps, warm gold light above, fine dust and restrained god-rays.
Constraints: one person only, no visible face, no modern objects. No text, lettering, logos, UI, watermark.
```

### `journey-06.webp` and `journey-06.jpg`

```text
Use case: stylized-concept
Asset type: Journey chapter card plate, portrait 3:4
Input image: the supplied master mockup is the binding production style reference; match it exactly.
Primary request: the whole Earth seen from near orbit, emerging from deep near-black space, with a restrained warm golden sunrise along the limb and faint ancient-pattern geometry suggested in cloud and land textures; visual metaphor for integration and collective awakening.
Composition/framing: Earth centered and mostly complete, no spacecraft, no people, deep dark margins, room in the lower third for a card text gradient.
Lighting/mood: solemn, realistic, dark; gold and amber sunlight, subtle cool blue only in the planet, consistent with the master palette.
Constraints: photoreal, no exaggerated neon, no fantasy continents, no city-light overload. No text, lettering, logos, UI, watermark, modern objects.
```

### `library-01.webp` and `library-01.jpg`

```text
For this Living Library plate, section 6.1 overrides the architectural subject matter in the shared preamble: continuity with the reference comes ONLY from palette, light grade, intimate museum camera, fine dust, and the near-black warm treatment. Do not include Egyptian or Maya architecture, reliefs, hieroglyphs, glyphs, borders, ornaments, figures, symbols, or set dressing anywhere. The authentic historical writing intrinsic to the specified manuscript is required and is the sole exception to “no text or lettering”; do not add any caption, label, title, modern type, logo, UI, or watermark.

Use case: historical-scene
Asset type: Living Library artefact card plate, portrait 4:5
Input image: Image 1 is the binding production style reference for palette, lighting, camera, depth, and grade only; it is not a source of cultural motifs.
Primary request: The Upanishads — one genuine Indian palm-leaf manuscript resting on a plain dark stone shelf inside a shallow unadorned niche. Show a compact stack of long oblong palm leaves, edges darkened and irregular with age, incised with fine Sanskrit lines, bound through two holes with simple cord; a few leaves are gently offset so the construction is unmistakable.
Composition/framing: close frontal three-quarter museum study, manuscript centered and filling most of the portrait frame, shallow depth, no other objects, lower edge slightly darker for adjoining card copy.
Lighting/mood: one warm off-frame brazier gives restrained amber raking light; deep shadow, fine dust, near-black warm grade.
Materials/textures: dry fibrous palm leaf, worn cord, subtle incision marks, plain charcoal stone.
Constraints: culturally and materially accurate Indian manuscript; writing remains small and artifact-scale. Absolutely no Egyptian or Maya motifs, architecture, hieroglyphs, glyphs, pyramids, columns, statuary, ornamental borders, people, labels, modern objects, UI, or watermark.
```

### `library-02.webp` and `library-02.jpg`

```text
For this Living Library plate, section 6.1 overrides the architectural subject matter in the shared preamble: continuity with the reference comes ONLY from palette, light grade, intimate museum camera, fine dust, and the near-black warm treatment. Do not include Egyptian or Maya architecture, reliefs, hieroglyphs, glyphs, borders, ornaments, figures, symbols, or set dressing anywhere. The authentic historical writing intrinsic to the specified manuscript is required and is the sole exception to “no text or lettering”; do not add any caption, label, title, modern type, logo, UI, or watermark.

Use case: historical-scene
Asset type: Living Library artefact card plate, portrait 4:5
Input image: Image 1 is the binding production style reference for palette, lighting, camera, depth, and grade only; it is not a source of cultural motifs.
Primary request: Tao Te Ching — one genuine ancient Chinese bamboo-slip book resting on a plain dark stone shelf inside a shallow unadorned niche. Narrow aged bamboo slips are bound vertically with dark silk cord, partly unrolled in a gentle curve; sparse brush-inked early Chinese seal-script characters run vertically on the slips.
Composition/framing: close frontal three-quarter museum study, bamboo book centered and filling most of the portrait frame, no extra objects, lower edge slightly darker for adjoining card copy.
Lighting/mood: one warm off-frame brazier gives restrained amber raking light; deep shadow, fine dust, near-black warm grade.
Materials/textures: split aged bamboo, frayed silk cord, dry black ink, plain charcoal stone.
Constraints: culturally and materially accurate Chinese bamboo-slip manuscript; writing remains small and artifact-scale. Absolutely no Egyptian or Maya motifs, architecture, hieroglyphs, glyphs, pyramids, columns, statuary, ornamental borders, people, labels, modern objects, UI, or watermark.
```

### `library-03.webp` and `library-03.jpg`

```text
For this Living Library plate, section 6.1 overrides the architectural subject matter in the shared preamble: continuity with the reference comes ONLY from palette, light grade, intimate museum camera, fine dust, and the near-black warm treatment. Do not include Egyptian or Maya architecture, reliefs, hieroglyphs, glyphs, borders, ornaments, figures, symbols, or set dressing anywhere. The authentic historical writing intrinsic to the specified manuscript is required and is the sole exception to “no text or lettering”; do not add any caption, label, title, modern type, logo, UI, or watermark.

Use case: historical-scene
Asset type: Living Library artefact card plate, portrait 4:5
Input image: Image 1 is the binding production style reference for palette, lighting, camera, depth, and grade only; it is not a source of cultural motifs.
Primary request: The Dhammapada — one genuine Pali palm-leaf manuscript placed between two slim gilded Southeast Asian wooden covers, resting on a plain dark stone shelf inside a shallow unadorned niche. Long oblong leaves are bound through with cord, with neat incised rows of Pali script; only traces of black lacquer and worn gold remain on the carved wooden covers.
Composition/framing: close frontal three-quarter museum study, closed covers slightly parted to reveal the manuscript leaves, centered and filling most of the portrait frame, no extra objects, lower edge slightly darker for adjoining card copy.
Lighting/mood: one warm off-frame brazier gives restrained amber raking light; deep shadow, fine dust, near-black warm grade.
Materials/textures: aged fibrous palm leaf, worn gilded wood, traces of lacquer, plain charcoal stone.
Constraints: culturally and materially accurate Buddhist Pali manuscript; restrained cover ornament only, with no borrowed Egyptian or Maya design. Absolutely no Egyptian or Maya motifs, architecture, hieroglyphs, glyphs, pyramids, columns, statuary, people, labels, modern objects, UI, or watermark.
```

### `library-04.webp` and `library-04.jpg`

```text
For this Living Library plate, section 6.1 overrides the architectural subject matter in the shared preamble: continuity with the reference comes ONLY from palette, light grade, intimate museum camera, fine dust, and the near-black warm treatment. Do not include Egyptian or Maya architecture, reliefs, hieroglyphs, glyphs, borders, ornaments, figures, symbols, or set dressing anywhere. The authentic historical writing intrinsic to the specified manuscript is required and is the sole exception to “no text or lettering”; do not add any caption, label, title, modern type, logo, UI, or watermark.

Use case: historical-scene
Asset type: Living Library artefact card plate, portrait 4:5
Input image: Image 1 is the binding production style reference for palette, lighting, camera, depth, and grade only; it is not a source of cultural motifs.
Primary request: Meditations — a materially accurate Roman writing set resting on a plain dark stone shelf inside a shallow unadorned niche: an open hinged wooden wax tablet with a few faint hand-scratched Greek lines in the dark wax, a slender bronze stylus laid beside it, and a partly unrolled papyrus roll bearing small Greek handwriting.
Composition/framing: close frontal three-quarter museum still life, the wax tablet is the dominant centered artefact, papyrus and stylus clearly visible but subordinate, all objects contained in the portrait frame, lower edge slightly darker for adjoining card copy. Nothing else is present.
Lighting/mood: warm amber raking light from an off-frame brazier; the light source is completely outside the image. Deep shadow, fine dust, near-black warm grade. No visible flame, brazier, lamp, bowl, pot, or vessel.
Materials/textures: rubbed wood, matte dark beeswax, patinated bronze, fibrous aged papyrus, plain charcoal stone.
Constraints: culturally and materially accurate Roman-era writing tools; no bust, statue, laurel, helmet, coin, architecture, visible light source, or extra prop. Absolutely no Egyptian or Maya motifs, hieroglyphs, glyphs, pyramids, columns, ornamental borders, people, labels, modern objects, UI, or watermark.
```

### `library-05.webp` and `library-05.jpg`

```text
For this Living Library plate, section 6.1 overrides the architectural subject matter in the shared preamble: continuity with the reference comes ONLY from palette, light grade, intimate museum camera, fine dust, and the near-black warm treatment. Do not include Egyptian or Maya architecture, reliefs, hieroglyphs, glyphs, borders, ornaments, figures, symbols, or set dressing anywhere. The authentic historical writing intrinsic to the specified manuscript is required and is the sole exception to “no text or lettering”; do not add any caption, label, title, modern type, logo, UI, or watermark.

Use case: historical-scene
Asset type: Living Library artefact card plate, portrait 4:5
Input image: Image 1 is the binding production style reference for palette, lighting, camera, depth, and grade only; it is not a source of cultural motifs.
Primary request: Rumi's Poetry — one genuine medieval Persian illuminated manuscript folio resting at a slight angle on a plain dark stone shelf inside a shallow unadorned niche. Elegant nastaʿlīq Persian script appears in orderly columns on aged cream paper, surrounded only by a refined narrow margin of lapis blue pigment, restrained floral arabesque, and worn gold leaf illumination.
Composition/framing: close frontal three-quarter museum study, single folio centered and filling most of the portrait frame, its deckled edges and surface visible, no book stand or other objects, lower edge slightly darker for adjoining card copy.
Lighting/mood: one warm off-frame brazier gives restrained amber raking light; deep shadow, fine dust, near-black warm grade.
Materials/textures: warm handmade paper, carbon ink, mineral lapis pigment, cracked and abraded gold leaf, plain charcoal stone.
Constraints: culturally and materially accurate Persian illuminated folio; Persian ornament only and kept narrow. Absolutely no Egyptian or Maya motifs, architecture, hieroglyphs, glyphs, pyramids, columns, statuary, people, labels, modern objects, UI, or watermark.
```

### `library-06.webp` and `library-06.jpg`

```text
For this Living Library plate, section 6.1 overrides the architectural subject matter in the shared preamble: continuity with the reference comes ONLY from palette, light grade, intimate museum camera, fine dust, and the near-black warm treatment. Do not include Egyptian or Maya architecture, reliefs, hieroglyphs, glyphs, borders, ornaments, figures, symbols, or set dressing anywhere. The authentic historical writing intrinsic to the specified printed page is required and is the sole exception to “no text or lettering”; do not add any caption, label, title, modern type, logo, UI, or watermark.

Use case: historical-scene
Asset type: Living Library artefact card plate, portrait 4:5
Input image: Image 1 is the binding production style reference for palette, lighting, camera, depth, and grade only; it is not a source of cultural motifs.
Primary request: William Blake — one facsimile-like original late-eighteenth-century English relief-etched illuminated page made by William Blake, resting on a plain dark stone shelf inside a shallow unadorned niche. The single warm rag-paper leaf has a visible copperplate impression and irregular relief-printed handwritten verse in Blake's hand, surrounded by small fully clothed symbolic human figures, curling vines, flame forms, and translucent hand-coloured watercolor washes organically entwined with the printed text.
Composition/framing: close frontal three-quarter museum study, single page centered and filling most of the portrait frame, slightly curled worn edges, no frame or other objects, lower edge slightly darker for adjoining card copy.
Lighting/mood: warm amber raking light from an off-frame brazier; the light source is completely outside the image. Deep shadow, fine dust, near-black warm grade. No visible flame, brazier, lamp, bowl, pot, or vessel.
Materials/textures: warm handmade rag paper, relief-printed sepia ink, translucent hand-applied watercolor, subtle plate emboss, plain charcoal stone.
Constraints: unmistakably William Blake's own English Romantic relief-etched illuminated printing, not an ancient manuscript and not a generic medieval page. All illustrated figures are small, symbolic, fully clothed, nonsexual, and part of the printed page only. Absolutely no Egyptian or Maya motifs, architecture, hieroglyphs, glyphs, pyramids, columns, statuary, people outside the printed artwork, labels, modern objects, UI, or watermark.
```

### `library-07.webp` and `library-07.jpg`

```text
For this Living Library plate, section 6.2 overrides the architectural subject matter in the shared preamble: continuity with the reference comes ONLY from palette, warm off-frame lighting, intimate museum camera, fine dust, and near-black warm grade. Do not include Egyptian or Maya architecture, reliefs, hieroglyphs, glyphs, borders, ornaments, figures, symbols, or set dressing. Authentic historical writing intrinsic to the specified manuscript is required and is the sole exception to “no text or lettering”; do not add any caption, label, title, modern type, logo, UI, or watermark. The illumination comes from outside the frame: absolutely no visible flame, candle, lamp, brazier, bowl, pot, or light fixture.

Use case: historical-scene
Asset type: Living Library artefact card plate, portrait 4:5
Input image: the supplied master mockup is the binding production style reference for palette, lighting, camera, depth, and grade only; it is not a source of cultural motifs.
Primary request: Bhagavad Gita — one illustrated Sanskrit manuscript folio resting on a plain dark stone shelf inside a shallow unadorned niche. Aged warm paper, neat Devanagari columns, and a restrained painted Indian miniature border; unmistakably a loose manuscript folio, never a modern book cover.
Composition/framing: close frontal three-quarter museum study, single folio centered and filling most of the portrait frame, shallow depth, lower edge slightly darker for adjoining card copy.
Lighting/mood: restrained amber raking light from outside the frame; deep shadow, fine dust, near-black warm grade.
Materials/textures: aged handmade paper, mineral pigments, dry ink, plain charcoal stone.
Constraints: culturally and materially accurate Indian Sanskrit manuscript. No legible modern title or author name. No visible light source. Absolutely no Egyptian or Maya motifs, architecture, hieroglyphs, pyramids, columns, statuary, people, modern objects, UI, or watermark.
```

### `library-08.webp` and `library-08.jpg`

```text
For this Living Library plate, section 6.2 overrides the architectural subject matter in the shared preamble: continuity with the reference comes ONLY from palette, warm off-frame lighting, intimate museum camera, fine dust, and near-black warm grade. Do not include Egyptian or Maya architecture, reliefs, hieroglyphs, glyphs, borders, ornaments, figures, symbols, or set dressing. Authentic historical writing intrinsic to the specified manuscript is required and is the sole exception to “no text or lettering”; do not add any caption, label, title, modern type, logo, UI, or watermark. The illumination comes from outside the frame: absolutely no visible flame, candle, lamp, brazier, bowl, pot, or light fixture.

Use case: historical-scene
Asset type: Living Library artefact card plate, portrait 4:5
Input image: the supplied master mockup is the binding production style reference for palette, lighting, camera, depth, and grade only; it is not a source of cultural motifs.
Primary request: Plato’s Republic — a materially accurate ancient Greek papyrus roll partly unrolled on a plain dark stone shelf inside a shallow unadorned niche. Dense small uncial Greek handwriting runs in narrow columns; edges are fragmented, worn and fibrous with age. The object is a scroll, not a bound codex.
Composition/framing: close frontal three-quarter museum still life, roll centered and filling most of the portrait frame, one rolled end visible, no other objects, lower edge slightly darker for adjoining card copy.
Lighting/mood: restrained amber raking light from outside the frame; deep shadow, fine dust, near-black warm grade.
Materials/textures: dry aged papyrus fibers, faded carbon ink, plain charcoal stone.
Constraints: culturally and materially accurate Greek papyrus manuscript; artifact-scale writing only. No visible light source. Absolutely no Egyptian or Maya motifs, architecture, hieroglyphs, glyphs, pyramids, columns, statuary, people, labels, modern objects, UI, or watermark.
```

### `library-09.webp` and `library-09.jpg`

```text
For this Living Library plate, section 6.2 overrides the architectural subject matter in the shared preamble: continuity with the reference comes ONLY from palette, warm off-frame lighting, intimate museum camera, fine dust, and near-black warm grade. Do not include Egyptian or Maya architecture, reliefs, hieroglyphs, glyphs, borders, ornaments, figures, symbols, or set dressing. Authentic historical writing intrinsic to the specified manuscript is required and is the sole exception to “no text or lettering”; do not add any caption, label, title, modern type, logo, UI, or watermark. The illumination comes from outside the frame: absolutely no visible flame, candle, lamp, brazier, bowl, pot, or light fixture.

Use case: historical-scene
Asset type: Living Library artefact card plate, portrait 4:5
Input image: the supplied master mockup is the binding production style reference for palette, lighting, camera, depth, and grade only; it is not a source of cultural motifs.
Primary request: The Cloud of Unknowing — one late-fourteenth-century medieval English vellum codex resting open on a plain dark stone shelf inside a shallow unadorned niche. The vellum pages carry a compact English Gothic hand in two columns and one plain rubricated red initial; worn undecorated brown leather binding is visible.
Composition/framing: close frontal three-quarter museum study, codex centered and filling most of the portrait frame, shallow depth, no extra objects, lower edge slightly darker for adjoining card copy.
Lighting/mood: restrained amber raking light from outside the frame; deep shadow, fine dust, near-black warm grade.
Materials/textures: cockled vellum, iron-gall ink, restrained red pigment, scuffed leather, plain charcoal stone.
Constraints: culturally and materially accurate medieval English devotional manuscript; sober and minimally decorated, not an illuminated luxury Bible. No visible light source. Absolutely no Egyptian or Maya motifs, architecture, hieroglyphs, glyphs, pyramids, columns, statuary, people, labels, modern objects, UI, or watermark.
```

### `library-10.webp` and `library-10.jpg`

```text
For this Living Library plate, section 6.2 overrides the preamble’s subject and set dressing: continuity with the reference comes ONLY from palette, warm off-frame light, intimate still-life camera, fine dust, deep shadow, dark surface, shallow unadorned niche, and near-black warm grade. Do not borrow Egyptian or Maya architecture, reliefs, hieroglyphs, glyphs, borders, ornaments, figures, symbols, or props.
Authentic historical writing intrinsic to the manuscript is required and is the sole exception to “no text or lettering”; do not add any caption, label, title, modern type, logo, UI, or watermark. The illumination comes from outside the frame: absolutely no visible flame, candle, lamp, brazier, bowl, pot, or light fixture.

Use case: historical-scene
Asset type: Living Library artefact card plate, portrait 4:5
Input image: the supplied master mockup is the binding production style reference for palette, lighting, camera, depth, and grade only; it is not a source of cultural motifs.
Primary request: Ibn Arabi’s Works — one medieval Arabic manuscript open on a plain dark stone shelf inside a shallow unadorned niche. Elegant compact naskh script runs in orderly black-ink lines within restrained gold-rule margins; the aged page is slightly cockled and irregular, with a simple worn leather binding visible.
Composition/framing: close frontal three-quarter museum study, manuscript centered and filling most of the portrait frame, shallow depth, no extra objects, lower edge slightly darker for adjoining card copy.
Lighting/mood: restrained amber raking light from outside the frame; deep shadow, fine dust, near-black warm grade.
Materials/textures: cockled handmade paper, carbon ink, fine worn gold rule, scuffed leather, plain charcoal stone.
Constraints: culturally and materially accurate medieval Arabic naskh manuscript; no Persian miniature, no pseudo-Kufic display decoration. No visible light source. Absolutely no Egyptian or Maya motifs, architecture, hieroglyphs, pyramids, columns, statuary, people, labels, modern objects, UI, or watermark.
```

### `library-12.webp` and `library-12.jpg`

```text
For this Living Library plate, section 6.2 overrides the preamble’s subject and set dressing: continuity with the reference comes ONLY from palette, warm off-frame light, intimate still-life camera, fine dust, deep shadow, dark surface, shallow unadorned niche, and near-black warm grade. Do not borrow Egyptian or Maya architecture, reliefs, hieroglyphs, glyphs, borders, ornaments, figures, symbols, or props.
The specified nineteenth-century writing tools are the required exception to “no modern objects.” No lettering at all: no legible journal prose, no title, no author name, no label, no logo, no UI, no watermark.

Use case: product-mockup
Asset type: Living Library object card plate, portrait 4:5
Input image: the supplied master mockup is the binding production style reference for palette, lighting, camera, depth, and grade only.
Primary request: Ralph Waldo Emerson — the corner of a modest nineteenth-century American writing desk inside a shallow dark alcove: an open handwritten journal with writing rendered soft and illegible, a plain steel dip pen, and a small period glass inkwell. This is an anonymous working desk, not a facsimile edition or published book.
Composition/framing: intimate close three-quarter still life, journal dominant and centered, tools subordinate, all contained within the portrait frame, lower edge darker for adjoining card copy.
Lighting/mood: candle-warm amber light originating outside the frame; deep shadow, fine dust, near-black warm grade; no visible candle or lamp.
Materials/textures: worn blank leather journal, cream rag paper, dark wood, patinated steel, plain glass.
Constraints: no printed cover, no book jacket, no readable words, no title, no author name, no recognizable published cover art, no visible light source, no Egyptian or Maya motifs, no architecture, symbols, people, extra props, UI, or watermark.
```

### `library-13.webp` and `library-13.jpg`

```text
For this Living Library plate, section 6.2 overrides the preamble’s subject and set dressing: continuity with the reference comes ONLY from palette, warm off-frame light, intimate still-life camera, fine dust, deep shadow, dark surface, shallow unadorned niche, and near-black warm grade. Do not borrow Egyptian or Maya architecture, reliefs, hieroglyphs, glyphs, borders, ornaments, figures, symbols, or props.
The specified nineteenth-century book, oil lamp, reeds, and plank table are required exceptions to “no modern objects.” The book is deliberately generic and blank: no lettering, no title, no author name, no label, no logo, no recognizable cover art, no UI, no watermark.

Use case: product-mockup
Asset type: Living Library object card plate, portrait 4:5
Input image: the supplied master mockup is the binding production style reference for palette, lighting, camera, depth, and grade only.
Primary request: Henry David Thoreau — a worn closed nineteenth-century cloth-bound book lying on a rough plank table inside a shallow dark alcove, beside a small bundle of natural pond reeds and a simple period oil lamp. The front cover and spine are plain, unmarked cloth with no embossing.
Composition/framing: intimate close three-quarter still life, blank book dominant and centered, reeds and lamp clearly present but subordinate, all contained in the portrait frame, lower edge darker for adjoining card copy.
Lighting/mood: restrained amber off-frame raking light plus a very dim warm glow from the small oil lamp; deep shadow, fine dust, near-black warm grade.
Materials/textures: faded moss-brown book cloth, scuffed board edges, weathered wood, dry reeds, aged glass and brass.
Constraints: no printed cover, no book jacket, no readable words, no title, no author name, no recognizable published cover art, no Egyptian or Maya motifs, architecture, symbols, people, extra props, UI, or watermark.
```

### `library-14.webp` and `library-14.jpg`

```text
For this Living Library plate, section 6.2 overrides the preamble’s subject and set dressing: continuity with the reference comes ONLY from palette, warm off-frame light, intimate still-life camera, fine dust, deep shadow, dark surface, shallow unadorned niche, and near-black warm grade. The specified modern objects are required exceptions to “no modern objects.” Do not borrow Egyptian or Maya architecture, reliefs, hieroglyphs, glyphs, borders, ornaments, figures, symbols, or props. This must depict the kind of object the work lives in, never a facsimile of a real published edition. No lettering at all: no readable text, no title, no author name, no label, no logo, no recognizable cover art, no UI, no watermark.

Use case: product-mockup
Asset type: Living Library object card plate, portrait 4:5
Input image: the supplied master mockup is the binding production style reference for palette, lighting, camera, depth, and grade only.
Primary request: Aldous Huxley — a restrained mid-century writing desk inside a shallow dark alcove: one plain closed charcoal cloth hardback with completely blank cover and spine, simple period reading glasses folded beside it, and a clear glass of water. No jacket, embossing, decoration, or printed marks.
Composition/framing: intimate close three-quarter still life, blank hardback dominant and centered, glasses and water clearly visible but subordinate, all contained within the portrait frame, lower edge darker for adjoining card copy.
Lighting/mood: low amber lamplight originating outside the frame; deep shadow, fine dust, near-black warm grade; no visible lamp.
Materials/textures: austere mid-century book cloth, worn dark wood, thin metal eyeglass frames, clear water and glass.
Constraints: convincing generic mid-century objects, never a fake edition. No readable words, title, author, spine marks, cover art, visible light source, Egyptian or Maya motifs, architecture, symbols, people, extra books, UI, or watermark.
```

### `library-15.webp` and `library-15.jpg`

```text
For this Living Library plate, section 6.2 overrides the preamble’s subject and set dressing: continuity with the reference comes ONLY from palette, warm off-frame light, intimate still-life camera, fine dust, deep shadow, dark surface, shallow unadorned niche, and near-black warm grade. The specified modern objects are required exceptions to “no modern objects.” Do not borrow Egyptian or Maya architecture, reliefs, hieroglyphs, glyphs, borders, ornaments, figures, symbols, or props. This must depict the kind of object the work lives in, never a facsimile of a real published edition. No lettering at all: no readable text, no title, no author name, no label, no logo, no recognizable cover art, no UI, no watermark.

Use case: product-mockup
Asset type: Living Library object card plate, portrait 4:5
Input image: the supplied master mockup is the binding production style reference for palette, lighting, camera, depth, and grade only.
Primary request: Ram Dass — one square soft-bound book resting closed on a dark handwoven mat inside a shallow unadorned niche, with a small simple candle and a loose offering of fresh orange and gold marigold blossoms nearby. The book’s cover and spine are completely blank, matte, softly worn, and undecorated.
Composition/framing: intimate close three-quarter still life, square blank book dominant and centered, candle and marigolds clearly present but subordinate, all contained in the portrait frame, lower edge darker for adjoining card copy.
Lighting/mood: restrained amber off-frame light plus a small candle glow; deep shadow, fine dust, near-black warm grade; contemplative, not commercial.
Materials/textures: plain faded saffron cloth-paper cover, woven natural fiber mat, beeswax, fresh marigold petals.
Constraints: generic spiritual practice object, never a fake edition. No readable words, title, author, spine marks, cover art, religious symbol, Egyptian or Maya motifs, architecture, figures, people, extra props, UI, or watermark.
```

### `library-16.webp` and `library-16.jpg`

```text
For this Living Library plate, section 6.2 overrides the preamble’s subject and set dressing: continuity with the reference comes ONLY from palette, warm off-frame light, intimate still-life camera, fine dust, deep shadow, dark surface, shallow unadorned niche, and near-black warm grade. The specified modern objects are required exceptions to “no modern objects.” Do not borrow Egyptian or Maya architecture, reliefs, hieroglyphs, glyphs, borders, ornaments, figures, symbols, or props. This must depict the kind of object the work lives in, never a facsimile of a real published edition. No lettering at all: no readable text, no title, no author name, no label, no logo, no recognizable cover art, no UI, no watermark.

Use case: product-mockup
Asset type: Living Library object card plate, portrait 4:5
Input image: the supplied master mockup is the binding production style reference for palette, lighting, camera, depth, and grade only.
Primary request: Eckhart Tolle — one plain modern paperback resting closed on a perfectly still dark stone surface inside a shallow unadorned niche, beside a single small candle. The paperback cover and spine are completely blank, matte, neutral charcoal, and undecorated.
Composition/framing: minimal intimate close three-quarter still life, blank paperback centered and filling most of the portrait frame, single candle subordinate at one side, extremely shallow depth of field, generous deep shadow, lower edge darker for adjoining card copy.
Lighting/mood: restrained warm off-frame light plus a tiny candle glow; profound stillness, deep shadow, fine dust, near-black warm grade.
Materials/textures: plain uncoated paper cover, cream page edges, smooth charcoal stone, beeswax.
Constraints: minimal generic contemporary object, never a fake edition. No readable words, title, author, spine marks, cover art, decoration, symbols, Egyptian or Maya motifs, architecture, figures, people, extra props, UI, or watermark.
```

### `library-17.webp` and `library-17.jpg`

```text
For this Living Library plate, section 6.2 overrides the preamble’s subject and set dressing: continuity with the reference comes ONLY from palette, warm off-frame light, intimate still-life camera, fine dust, deep shadow, dark surface, shallow unadorned niche, and near-black warm grade. The specified reel-to-reel recorder and notebook are required exceptions to “no modern objects.” Do not borrow Egyptian or Maya architecture, reliefs, hieroglyphs, glyphs, borders, ornaments, figures, symbols, or props. This depicts the kind of object the work lives in, never a facsimile of a real published edition. No lettering at all: no readable notebook text, no brand, no model name, no label, no logo, no UI, no watermark.

Use case: product-mockup
Asset type: Living Library object card plate, portrait 4:5
Input image: the supplied master mockup is the binding production style reference for palette, lighting, camera, depth, and grade only.
Primary request: Alan Watts — a generic 1960s reel-to-reel tape recorder in warm low lamplight inside a shallow dark alcove, its two unbranded metal reels visibly captured mid-turn, with one plain open notebook resting beside it and handwriting rendered soft, abstract, and illegible.
Composition/framing: intimate close frontal three-quarter still life, tape deck dominant and centered, both reels fully inside the portrait frame, notebook clearly visible but subordinate, lower edge darker for adjoining card copy.
Lighting/mood: restrained low amber lamplight originating outside the frame; deep shadow, fine dust, near-black warm grade; no visible lamp.
Materials/textures: brushed dark metal, aged rubber, translucent magnetic tape, worn dark wood, cream notebook paper.
Constraints: historically plausible generic audio recorder, not a branded or recognizable exact product. No readable words, titles, author names, device markings, brand, cover art, visible light source, Egyptian or Maya motifs, architecture, symbols, people, extra books, UI, or watermark.
```

### `web-face-left.webp` and `web-face-left.jpg`

```text
Use case: stylized-concept
Asset type: Wisdom Web edge bleed plate, portrait 2:3
Input image: the supplied master mockup is the binding production style reference; match it exactly.
Primary request: a colossal weathered Egyptian-inspired carved stone head in three-quarter profile, partially eroded and emerging from absolute shadow, made from pitted dark limestone with faint old gold pigment in recesses.
Composition/framing: head occupies the left two-thirds and faces inward toward the right; outer left and bottom merge into black so it can bleed from a website band edge; no shoulders beyond a fragment of carved base.
Lighting/mood: a single thin warm amber rim light from the right, otherwise very dark; solemn and ancient.
Constraints: sculpture only, not a living person; no background architecture, vegetation, text, lettering, logos, UI, watermark, modern objects.
```

### `web-face-right.webp` and `web-face-right.jpg`

```text
Use case: stylized-concept
Asset type: Wisdom Web edge bleed plate, portrait 2:3
Input image: the supplied master mockup is the binding production style reference; match it exactly.
Primary request: a colossal weathered Maya-inspired carved stone head in three-quarter profile, partially eroded and emerging from absolute shadow, made from pitted volcanic stone with faint old gold pigment in recesses.
Composition/framing: head occupies the right two-thirds and faces inward toward the left; outer right and bottom merge into black so it can bleed from a website band edge; no shoulders beyond a fragment of carved base.
Lighting/mood: a single thin warm amber rim light from the left, otherwise very dark; solemn and ancient.
Constraints: sculpture only, not a living person; no background architecture, vegetation, text, lettering, logos, UI, watermark, modern objects.
```

### `web-starfield.webp` and `web-starfield.jpg`

```text
Use case: stylized-concept
Asset type: ultra-wide Wisdom Web background plate, 21:9
Input image: the supplied master mockup is the binding production style reference; match its restrained darkness and cinematic depth exactly.
Primary request: deep near-black night sky background only, sparse fine stars, subtle diagonal dust lanes, and an extremely faint low-saturation blue-teal nebula haze like the Wisdom Web band in the reference.
Composition/framing: seamless-feeling ultra-wide field with the quietest center behind future diagram lines; no horizon, ground, structures, planets, moons, sun, figures, artifacts, or foreground objects.
Lighting/mood: cosmic depth, contemplative and almost black; cool blue is muted and subordinate, with only a few tiny warm-gold stars tying it to the production palette.
Constraints: background texture only, low visual contrast in the center. No text, lettering, logos, UI, watermark, constellations drawn as lines, modern objects.
```

### `weighing-scales.webp` and `weighing-scales.jpg`

```text
Use case: stylized-concept
Asset type: Weighing reflection section plate, landscape 4:3
Input image: the supplied master mockup is the binding production style reference; match it exactly.
Primary request: a hand-worked ancient golden balance standing on a dark weathered temple floor, one shallow pan holding a single white feather and the other holding a sculpted golden heart; the beam is nearly level, with fine chains and believable weight.
Composition/framing: low frontal camera, full balance visible and centered, feather on the left and heart on the right, generous dark space around the subject for section composition; no people.
Lighting/mood: one narrow warm amber source from above-left, deep shadow, glowing dust, quiet moral reflection rather than judgment.
Constraints: physical historical-looking object, not fantasy magic, not a quiz or score. No text, lettering, logos, UI, watermark, modern objects.
```

### `closing-panorama.webp` and `closing-panorama.jpg`

```text
Use case: stylized-concept
Asset type: ultra-wide website closing panorama, 21:9
Input image: the supplied master mockup is the binding production style reference; match its palette, material language, atmosphere, and epic camera language exactly.
Primary request: sunrise over a vast river valley containing several distant stepped temples built from weathered sandstone, framed by dark mountain ranges, low mist above the water, sparse palms and ancient terraces in the foreground.
Composition/framing: very wide elevated panorama, river leading from shadowed foreground toward a centered golden sunrise, temples kept below the middle so the bright sky supports centered overlay copy, no people.
Lighting/mood: awakening, hopeful but restrained; warm gold and amber dawn are the only bright sources, deep near-black foreground vignette.
Constraints: one internally consistent imaginary Egyptian-Maya civilisation, no city skyline, no modern structures, no boats, no text, lettering, logos, UI, watermark, people, modern objects.
```

## Derived QA artifact

`contact-sheet.jpg` (1520 × 2480, 466,510 B) is a derived side-by-side review sheet assembled from all 29 final WebP plates. It was not generated by `image_gen` and therefore has no generation prompt.

The hand-drawn vector seal is stored at `../seal.svg`; it is intentionally not a generated raster.
