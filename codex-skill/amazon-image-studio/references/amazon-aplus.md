# Amazon A+ image planning

Use the project planner contract in [planner-prompts.md](planner-prompts.md). Select one A+ content type and follow its module sequence. Do not simply crop a desktop module for mobile.

## Content types and module specifications

| Content type | Module sequence and generation size |
|---|---|
| `standard` | `A+S01` header-banner 970x300; `A+S02`–`A+S04` single-image 970x600; `A+S05`–`A+S08` highlight-tile 220x220 |
| `standard-large` | `A+L01` header-banner 970x300; `A+L02`–`A+L05` single-image 970x600 |
| `premium` | `A+P01` hero-banner 1464x600; `A+P02`–`A+P04` feature-image 970x600; `A+P05`–`A+P06` brand-story 463x625 |
| `mobile` | `A+M01`–`A+M05` mobile modules 600x450; compose each independently for a narrow screen |

Use the requested content type when provided. If the user gives only “A+”, default to `standard-large` for a concise image set and record the assumption.

## Required output per module

Use the project-compatible fields below. Preserve legacy aliases when needed:

- `slot` (legacy alias: `moduleId`)
- `label` (Simplified Chinese)
- `moduleType`
- `uploadSize` and `generationSize` (legacy alias: `size`)
- `planMarkdown` (legacy aliases may include `objective`, `headline`, `bodyCopy`, `layout`, `visualHierarchy`, `complianceNotes`)
- `textTitle` and `textBody` in the target marketplace language, or empty when no copy is needed
- `prompt` (English, finished-image prompt)
- `negativePrompt` (English)
- `stylePresetId`
- `styleOverrides` (mobile-safe layout changes only; do not change the global visual system)
- `fileName`
- `relativePath`

## Layout, copy, and compliance

- Keep product identity, product scale, lighting direction, palette, typography feel, background language, and graphic grammar consistent across all modules.
- Use short, scannable copy inside images and keep longer copy in `textBody`. Preserve a central mobile-safe area and test legibility at the target upload size.
- A+ images must not contain prices, discounts, contact information, QR codes, external URLs, reviews, ratings, competitor references, unsupported comparisons, fake awards, or unsupported claims. Do not duplicate the Listing MAIN image as an A+ module.
- Brand marks may be used only when supplied or explicitly authorized. Do not invent logos or packaging.
- Keep `seriesStyleGuide` style-neutral. The selected preset/style board is the generation-time visual authority, and its style-reference guard forbids copying placeholder words, exact layout, props, or scene from the board.
