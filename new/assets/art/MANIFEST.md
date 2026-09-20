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
| `library-01` | 800 × 1000 | 117,470 B | 222,527 B |
| `library-02` | 800 × 1000 | 117,892 B | 199,403 B |
| `library-03` | 800 × 1000 | 118,656 B | 227,832 B |
| `library-04` | 800 × 1000 | 118,576 B | 207,344 B |
| `library-05` | 800 × 1000 | 117,956 B | 234,596 B |
| `library-06` | 800 × 1000 | 117,984 B | 241,508 B |
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
Use case: historical-scene
Asset type: Living Library artifact card plate, portrait 4:5
Input image: the supplied master mockup is the binding production style reference; match it exactly.
Primary request: a museum-like close view of a weathered painted tomb relief showing a dignified ancient scribe in profile, made from carved limestone with faded ochre, charcoal, muted turquoise, and gold pigments.
Composition/framing: artifact fills the frame inside a dark stone niche, frontal camera, mounted-plate clarity, lower edge slightly darker for adjoining card copy.
Lighting/mood: one soft amber raking light reveals chips, dust, and tool marks; deep surrounding shadow.
Constraints: authentic hand-worked material; pictorial relief only, no readable writing, text, lettering, labels, logos, UI, watermark, modern display case or objects.
```

### `library-02.webp` and `library-02.jpg`

```text
Use case: historical-scene
Asset type: Living Library artifact card plate, portrait 4:5
Input image: the supplied master mockup is the binding production style reference; match it exactly.
Primary request: a single aged clay wisdom tablet standing upright in a blackened temple niche, densely incised with abstract ancient wedge and pictographic marks, chipped edges and mineral patina.
Composition/framing: close frontal artifact portrait, tablet centered and nearly fills frame, dark stone pedestal, lower edge slightly darker for adjoining card copy.
Lighting/mood: warm amber raking light from one side and faint gold rim light, deep near-black surround, suspended dust.
Constraints: marks must remain decorative and non-legible, no modern alphabet, no readable text, labels, logos, UI, watermark, people, modern objects.
```

### `library-03.webp` and `library-03.jpg`

```text
Use case: historical-scene
Asset type: Living Library artifact card plate, portrait 4:5
Input image: the supplied master mockup is the binding production style reference; match it exactly.
Primary request: an unfurled, time-darkened papyrus vignette painted with a ceremonial passage through shadow toward a small golden sun disk, figures rendered as ancient flat relief art rather than living people, frayed fibers and mineral pigment.
Composition/framing: papyrus mounted against weathered black stone, frontal museum-like close view, artifact fills most of frame, lower edge slightly darker for adjoining card copy.
Lighting/mood: subtle amber firelight, deep vignette, tactile age and dust.
Constraints: painted figures are part of the artifact only; no readable writing, modern alphabet, text, labels, logos, UI, watermark, modern objects.
```

### `library-04.webp` and `library-04.jpg`

```text
Use case: historical-scene
Asset type: Living Library artifact card plate, portrait 4:5
Input image: the supplied master mockup is the binding production style reference; match it exactly.
Primary request: a single carved feather of Ma'at as an ancient limestone and aged-gold relief, feather centered on a cracked dark temple slab, precise hand-tooled barbs, traces of faded ochre and turquoise pigment.
Composition/framing: close frontal artifact portrait, feather fills the middle of the frame, black stone niche and shallow pedestal, lower edge slightly darker for adjoining card copy.
Lighting/mood: warm gold raking light and deep shadow, solemn, restrained, tactile.
Constraints: no scales, no living people, no readable writing, text, lettering, labels, logos, UI, watermark, modern objects.
```

### `library-05.webp` and `library-05.jpg`

```text
Use case: historical-scene
Asset type: Living Library artifact card plate, portrait 4:5
Input image: the supplied master mockup is the binding production style reference; match it exactly.
Primary request: a time-darkened folded Maya codex page made from bark paper, covered in faded ochre, charcoal, muted turquoise, and gold pictographic panels about creation and sacred cycles, its fibers, folds, and chipped pigment clearly visible.
Composition/framing: frontal museum-like artifact close view, page centered against a black weathered stone niche, lower edge slightly darker for adjoining card copy.
Lighting/mood: one restrained warm raking light, deep shadow, fine dust, grave and precious.
Constraints: pictographic marks must be decorative and non-legible; no modern alphabet, readable text, labels, logos, UI, watermark, people, modern objects.
```

### `library-06.webp` and `library-06.jpg`

```text
Use case: historical-scene
Asset type: Living Library artifact card plate, portrait 4:5
Input image: the supplied master mockup is the binding production style reference; match it exactly.
Primary request: an ancient astronomical codex wheel carved and painted on layered bark paper and thin stone, concentric calendars, celestial dots, abstract animal and sun motifs, deeply aged ochre, charcoal, muted turquoise, and worn gold.
Composition/framing: circular artifact centered and nearly fills the portrait frame, frontal mounted-plate view in a dark temple niche, lower edge slightly darker for adjoining card copy.
Lighting/mood: warm amber edge light, deep near-black surround, tactile dust and worn fibers.
Constraints: marks remain decorative and non-legible; not a machine or clock; no readable text, modern alphabet, labels, logos, UI, watermark, people, modern objects.
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

`contact-sheet.jpg` (1520 × 1550, 324,469 B) is a derived side-by-side review sheet assembled from the final WebP plates. It was not generated by `image_gen` and therefore has no generation prompt.

The hand-drawn vector seal is stored at `../seal.svg`; it is intentionally not a generated raster.
