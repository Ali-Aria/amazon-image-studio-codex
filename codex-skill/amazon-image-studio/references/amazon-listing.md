# Amazon Listing image planning

Use the project planner contract in [planner-prompts.md](planner-prompts.md). Produce a Listing image plan, not a collection of unrelated poster ideas.

## Default slots and image purposes

When the user does not specify a count, create exactly 7 slots:

| Slot | Project kind | Purpose |
|---|---|---|
| `MAIN` | `main` | Pure-white compliant product hero |
| `PT01` | `lifestyle` | One supported use scenario or outcome |
| `PT02` | `detail` | Material, finish, construction, or key feature evidence |
| `PT03` | `scale` | Believable real-world scale/context |
| `PT04` | `bundle` | All supported included components/package contents |
| `PT05` | `steps` | Simple use sequence when the product has a meaningful workflow |
| `PT06` | one evidence-backed kind | Comparison, second use case, or strongest remaining selling point |

Support 7–12 slots when requested. If a purpose is unsupported, replace it with another evidence-backed purpose and add a verification note. Do not force invented bundle, scale, or steps content.

## Required output per slot

Use the project-compatible fields below. Keep legacy aliases only when they make the local result easier to read or reuse:

- `slot` (legacy alias: `slotId`)
- `label` (Simplified Chinese)
- `kind`: `main | lifestyle | detail | scale | bundle | steps`
- `planMarkdown` (legacy aliases may include `objective`, `composition`, `visibleCopy`, `complianceNotes`)
- `prompt` (English, finished-image prompt)
- `negativePrompt` (English)
- `stylePresetId`
- `styleOverrides` (narrow role-level exceptions only)
- `fileName`
- `relativePath`

Every prompt must state the product evidence used, focal hierarchy, composition, visible copy/callouts, safe areas, output aspect/resolution, and the shared style anchor. Keep supporting images focused on one message.

## Compliance and evidence

- `MAIN` uses pure white RGB `255,255,255`, complete true-to-color product, no decorative text, badges, prices, reviews, Amazon branding, border, props, or unsupported claims.
- Lifestyle images use believable context without misleading extra items. Detail images show only evidenced materials/finish/structure. Scale images use believable context and no invented measurements. Bundle images show every included item with equal factual importance. Steps images show realistic use and never turn written instructions into graphic text.
- A feature is allowed only when present in listing copy, product files, or reference images. If a bullet is vague, write a verification note instead of guessing.
- Keep the planner `seriesStyleGuide` style-neutral. The selected preset controls palette, typography, lighting, background language, graphic accents, and density during generation.
- Use target-market language for visible copy, Simplified Chinese for plan labels, and English for generation prompts/negative prompts unless the user explicitly requests another prompt language.
