# Amazon A+ image planning

Use the project planner contract in [planner-prompts.md](planner-prompts.md). Select one A+ content type and follow its module sequence. Do not simply crop a desktop module for mobile.

## Content types and module specifications

| Content type | Module sequence | Upload size | Generation size |
|---|---|---|---|
| `standard` | `A+S01` wide-hero; `A+S02`–`A+S04` single-image; `A+S05`–`A+S08` highlight-tile | 970x600; 970x600; 220x220 | 970x600; 970x600; 220x220 |
| `standard-large` | `A+L01` wide-hero; `A+L02`–`A+L05` single-image | 970x600 | Largest supported resolution at 97:60 |
| `premium` | `A+P01` hero-banner; `A+P02`–`A+P04` feature-image; `A+P05`–`A+P06` brand-story | 1464x600; 970x600; 463x625 | 1464x600; 970x600; 463x625 |
| `mobile`（手机 A+） | `A+M01`–`A+M05` mobile hero/feature; compose each independently for a narrow screen | 600x450 | 2352x1776 |
| `advanced`（高级 A+） | `A+X01` hero/brand KV; `A+X02` core benefit; `A+X03` scene/benefit; `A+X04` hotspot-style feature; `A+X05` single-image explanation; `A+X06` single-image or video-cover alternative | 1464x600 for `A+X01`–`A+X04`; 800x600 (4:3 reference) for `A+X05`–`A+X06` | Largest supported canvas at 1464:600 for `A+X01`–`A+X04` (preferred 2928x1200); largest supported 4:3 canvas for `A+X05`–`A+X06` (preferred 2400x1800) |

`advanced` is a project planning preset for a six-image high-end story, not a promise that every Amazon account exposes the same native module names or upload fields. The screenshot's split between wide banners and 4:3 explanation images is a sound creative structure; verify the destination account's A+ editor before publishing and keep the ratio-preserving generation policy.

Use the requested content type when provided. If the user gives only “A+”, default to `standard-large` for a concise image set and record the assumption. If the user says “手机 A+” or “mobile A+”, use `mobile` and show its separate upload and generation sizes in the confirmation. If the user says “高级 A+” or “advanced A+”, use `advanced` and show its two aspect-ratio groups and largest-supported generation policy in the confirmation.

For `standard`, plan and generate the first module at 970x600. For `standard-large`, keep all five upload targets at 970x600 and generate at the largest supported resolution preserving 97:60. Do not request a 970x300 generation and do not rely on the image model to produce an ultra-wide 970:300 canvas. If a downstream Amazon module needs a shorter banner crop, preserve the main subject and essential copy inside a centered safe region equivalent to 970x300 at the upload scale so the source at the 970:600 ratio can be cropped deliberately after generation.

Before creating the A+ plan, show the proposed content type, total module count, and the exact upload size and generation size of each module or size group in one confirmation message. Include `mobile`（手机 A+）as an alternative when the user is choosing a format: 5 modules, upload 600x450, generation target 2352x1776. Include `advanced`（高级 A+）as an alternative: 6 modules, four wide modules at the 1464:600 ratio and two 4:3 modules; show the upload reference sizes and state that generation uses the largest supported canvas while preserving each ratio. Then wait for explicit approval. Explain that these are planning/delivery targets and that native generated dimensions or aspect ratio may differ because they depend on OpenAI's currently available image-generation capabilities. For an unspecified A+ request, propose `standard-large`: 5 modules, upload target 970x600; generation at the largest supported resolution with the 97:60 aspect ratio. Do not produce module strategy or prompts until the type, count, and target sizes are confirmed.

### Default A+ generation sizing

For `standard-large`, confirm 5 images, upload 970x600, and generation at the largest supported resolution preserving 97:60. This ratio-and-resolution policy satisfies preflight; do not require users to choose a fixed pixel count. Use the current tool's documented capabilities to select the largest matching output, honoring explicit user limits. Do not invent a maximum or treat an example size as a cap. If the tool does not expose size controls or a supported-size list, request the ratio and highest available resolution in the prompt and report the actual output; do not claim that a maximum was verified. If exact-ratio native output is unavailable, disclose the limitation and reserve a safe composition area; do not stretch the product to force the ratio. Apply any 970x300 safe region proportionally to the larger canvas.

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
- For mobile A+, set every module's `uploadSize` to 600x450 and `generationSize` to 2352x1776. Keep one clear message per module, use large product evidence, and do not reuse a desktop composition by simply cropping it.
- For advanced A+, use exactly six modules in this order: `A+X01` hero/brand KV, `A+X02` core benefit banner, `A+X03` scene or second benefit banner, `A+X04` hotspot-style feature display, `A+X05` single-image explanation, and `A+X06` single-image explanation or video-cover alternative. Keep `A+X01`–`A+X04` at the 1464:600 ratio and `A+X05`–`A+X06` at 4:3. Treat the screenshot's 1464x600 and 800x600 as upload/reference sizes, not universal platform guarantees; verify the account's actual module requirements before publishing. Generate at the largest supported canvas that preserves each ratio, preferring 2928x1200 and 2400x1800 when a concrete target is required.
- For advanced A+, “hotspot” means a visual hotspot-style callout unless the destination A+ editor explicitly supports interactive hotspots; “video-cover alternative” means a still image that can stand in for a video cover and does not promise video playback. Do not invent brand history, interactive behavior, video content, or unsupported claims.
- A+ images must not contain prices, discounts, contact information, QR codes, external URLs, reviews, ratings, competitor references, unsupported comparisons, fake awards, or unsupported claims. Do not duplicate the Listing MAIN image as an A+ module.
- Brand marks may be used only when supplied or explicitly authorized. Do not invent logos or packaging.
- Keep `seriesStyleGuide` style-neutral. The selected preset/style board is the generation-time visual authority, and its style-reference guard forbids copying placeholder words, exact layout, props, or scene from the board.
