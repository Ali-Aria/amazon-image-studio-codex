# Project-aligned planner and generation prompt contract

This reference mirrors the prompt responsibilities of the project's `listingPlannerApi.ts`, `listingPlanner.ts`, `amazonPrompt.ts`, `amazonKnowledge.ts`, and `agentApi.ts`. Follow this contract for both planning and local Codex image generation.

## Planner system prompt

For both Listing and A+, the preflight confirmation must include the five template choices and the mandatory invitation from `SKILL.md` to upload a preferred palette image. A user-selected upload follows the custom palette workflow in `style-presets.md`, which overrides built-in board selection, attachment, and the final style-reference guard. Treat that image as palette evidence only, not product evidence. Explicit palette instructions in the conversation count as user direction even when absent from the Listing text.

Act as an Amazon image-planning agent. The user provides Listing copy, optional brand notes, and optional product reference images. Treat the title, bullets, description, brand notes, and references as the source of truth.

Always include these rules in the planning instructions:

- Target the requested marketplace and locale. Customer-facing visible copy must be concise, natural, mobile-readable, and written in that marketplace's language. Keep `prompt`, `negativePrompt`, and `seriesStyleGuide` in English; keep `label` and `planMarkdown` in Simplified Chinese; keep A+ `textTitle` and `textBody` in the marketplace language or empty when external text is unnecessary.
- Parse and return `product.title`, `category`, `brand`, `color`, `material`, `audience`, and `packageIncludes`, plus `sellingPoints`.
- Use product reference images only for factual product evidence: appearance, color, shape, structure, included accessories, materials, packaging, and feature evidence.
- Do not use product reference images to choose the final palette, background mood, typography, decorative accents, or overall aesthetic unless the user explicitly requests it.
- If a visual detail is uncertain, keep the prompt neutral and add a verification warning instead of inventing it.
- Return one style-neutral `seriesStyleGuide` for cross-image product identity, factual continuity, copy hierarchy, and product scale. It must not decide the final palette, typography, background mood, lighting mood, or decorative style; those belong to the selected visual style during generation.
- Use Amazon reference material for compliance judgment, but do not copy its slot/module structure over the requested output.
- Do not create a new style-reference-board image during planning. The application/runtime supplies built-in preset style boards. In a normal chat planning response, expose the existing selected board (or the available board choices when no preset is selected) beside the prompt plan so the user can choose the image reference used during generation.
- Do not generate images during planning. Return valid JSON only when a structured planner response is requested.

### Product-reference and text-only guards

Use this guard verbatim in the planner layer:

```text
Product reference image rule:
- Use product reference images only to identify product facts: real appearance, color, shape, structure, included accessories, materials, package contents, and feature evidence.
- Do not use product reference images to choose the final visual style, color palette, background mood, typography style, decorative accents, or overall aesthetic unless the listing text explicitly requests it.
- imagePlans[].prompt and aPlusPlans[].prompt must avoid fixed non-product aesthetics such as coastal resort, warm cream background, botanical accents, luxury editorial, cyberpunk, or magazine fashion unless those are explicit product, brand, or listing requirements.
- seriesStyleGuide should preserve cross-image product consistency, factual visual continuity, copy hierarchy, and product appearance only; it must not lock the final palette, typography, background, lighting mood, or decorative system because the selected preset style controls those during image generation.
```

When the planner cannot receive/understand product reference images, append this guard:

```text
Because the planner cannot receive or understand reference images in this request, do not infer or describe product facts that are not explicitly present in the listing text or user-provided product facts. Do not invent colors, shapes, structures, accessories, logos, bundle quantity, package contents, materials, printed text, ports, buttons, or product variants. If a visual detail is unknown, keep the prompt neutral and refer to the exact product described by the provided facts.
```

## Listing planning prompt

The chat layer must obtain explicit user confirmation of the proposed total image count and exact target image dimensions before invoking the planner. The confirmation must disclose that these dimensions are planning/delivery targets, while native output dimensions and aspect ratio depend on OpenAI's currently available image-generation capabilities and cannot be guaranteed. Until confirmation, return only the concise preflight proposal; do not produce slot strategy, JSON plans, or image prompts. For an unspecified Listing request, propose 7 total images (`MAIN` plus 6 supporting images), all 2048x2048. Clearly distinguish total Listing count from supporting-image-only count.

Unless the user requests another count, create exactly seven slots in this order:

```text
MAIN, PT01, PT02, PT03, PT04, PT05, PT06
```

Allow an explicit Listing count from 7 through 12, preserving the same `MAIN` plus sequential `PT##` naming.

Use the six project image purposes as the planning vocabulary:

- `main`: pure-white product identification image; complete product once, about 85% of the frame, uncropped, true color and proportion, no text or decorative graphic.
- `lifestyle`: realistic use environment; product remains the clear hero and extra props must not imply included items.
- `detail`: close-up evidence for listed material, finish, structure, seams, texture, ports, buttons, or craftsmanship.
- `scale`: believable real-world size reference using only neutral context that does not imply extra included accessories.
- `bundle`: all included items shown with truthful quantity and equal visual importance.
- `steps`: realistic use or installation sequence when supported, without turning the image into unsupported written instructions.

Every Listing plan must contain `slot`, `label`, `kind`, `planMarkdown`, `prompt`, `negativePrompt`, `stylePresetId`, `styleOverrides`, `fileName`, and `relativePath`. Keep one primary message per supporting image; information-rich layouts must remain mobile-readable and organized.

## A+ planning prompt

The first A+ preflight must show the complete Chinese A1–A4 format comparison table from `amazon-aplus.md`, with 普通 A+ (`standard-large`) recommended by default. Include the table with palette selection in the existing confirmation message; do not replace it with an ID-only list or show only the recommended format. Honor an already selected format or an explicit confirmation waiver.

For `standard-large`, confirmation of upload 970x600 plus “97:60, largest supported generation resolution” is sufficient; it overrides fixed-generation-dimension confirmation requirements. Follow the runtime sizing rules in `amazon-aplus.md`, including truthful reporting when maximum size or exact ratio cannot be verified.

The chat layer must obtain explicit user confirmation of the A+ content type, total module count, and exact upload and generation dimensions before invoking the planner. The confirmation must disclose that these dimensions are planning/delivery targets, while native output dimensions and aspect ratio depend on OpenAI's currently available image-generation capabilities and cannot be guaranteed. Until confirmation, return only the concise preflight proposal; do not produce module strategy, JSON plans, or image prompts. For an unspecified A+ request, propose `standard-large`: 5 modules, upload target 970x600; generation at the largest supported resolution with the 97:60 aspect ratio. Include `mobile`（手机 A+）as a selectable alternative: 5 modules, upload 600x450, generation target 2352x1776. Include `advanced`（高级 A+）as a selectable alternative: 6 modules, four modules at 1464:600 and two modules at 4:3; generation uses the largest supported canvas at each ratio, with preferred targets 2928x1200 and 2400x1800 when a concrete target is required.

Support these content types and use their exact module families and upload sizes:

| Content type | Module sequence | Upload size | Generation size |
|---|---|---|---|
| `standard` | `A+S01` Wide Hero; `A+S02`–`A+S04` Single Image; `A+S05`–`A+S08` Highlight Tile | 970x600; 970x600; 220x220 | 970x600; 970x600; 220x220 |
| `standard-large` | `A+L01` Header Banner / Wide Hero; `A+L02`–`A+L05` Single Image | 970x600 working canvas; keep `A+L01` content inside a centered 970x300 banner-safe band | Largest supported resolution at 97:60 |
| `premium` | `A+P01` Hero Banner; `A+P02`–`A+P04` Feature Image; `A+P05`–`A+P06` Brand Story | 1464x600; 970x600; 463x625 | 1464x600; 970x600; 463x625 |
| `mobile`（手机 A+） | `A+M01`–`A+M05` Mobile Hero/Feature | 600x450 | 2352x1776 |
| `advanced`（高级 A+） | `A+X01` Hero/Brand KV; `A+X02` Core Benefit; `A+X03` Scene/Benefit; `A+X04` Hotspot-style Feature; `A+X05` Single Image; `A+X06` Single Image or Video-cover Alternative | 1464x600 for `A+X01`–`A+X04`; 800x600 (4:3 reference) for `A+X05`–`A+X06` | Largest supported 1464:600 canvas (preferred 2928x1200); largest supported 4:3 canvas (preferred 2400x1800) |

Return exactly the requested module sequence and include `moduleType`, `uploadSize`, `generationSize`, `planMarkdown`, `textTitle`, `textBody`, `prompt`, `negativePrompt`, `stylePresetId`, `styleOverrides`, `fileName`, and `relativePath`.

For `standard`, set both `uploadSize` and `generationSize` of the first module to 970x600. For `standard-large`, set all five working-canvas `uploadSize` values to 970x600 and resolve generation dimensions at the largest supported 97:60 resolution. Do not ask the image runtime to generate 970x300. `A+L01` must still be planned as a Header Banner: use a wide, low-height visual rhythm, reserve a centered safe region equivalent to 970x300 for the essential product and copy, and do not reuse the centered information-card composition of `A+L02`–`A+L05`. For `mobile`, set every module's `uploadSize` to 600x450 and `generationSize` to 2352x1776.

For `advanced`, return exactly six modules in the order `A+X01` through `A+X06`. Preserve the 1464:600 ratio for the first four and 4:3 for the last two. The 800x600 size is a 4:3 reference/upload target from the proposed planning set, not a universal Amazon module guarantee; keep the account-specific upload requirement visible as a verification warning. Use the largest generation canvas supported by the runtime while preserving each ratio, with 2928x1200 and 2400x1800 as preferred concrete targets. Treat hotspot and video-cover roles as visual fallbacks unless the destination editor explicitly supports the corresponding interactive or video feature.

For Mobile A+, use one clear message per module, large product evidence, short mobile-readable copy, and no dense multi-column composition. A+ should add product/brand value rather than simply duplicating the Listing gallery.

### A+ module differentiation contract

Treat the A+ set as one product story with deliberate variation, not as several versions of the same product shot. Consistency comes from the selected visual system and factual product identity; variation comes from the module role and composition.

For every A+ module, assign and make explicit in `planMarkdown`:

- `叙事角色`: the module's one primary job in the story.
- `主证据`: the supported product fact, feature, material, use scenario, included item, or brand fact being shown.
- `构图族`: for example banner-safe hero, full-bleed lifestyle, three-quarter product with detail crop, macro construction detail, step sequence, bundle layout, or restrained comparison area.
- `与其他模块的差异`: state what changes from the neighboring modules, including camera distance, product angle, product placement, scene, and copy zone.

Do not repeat the same combination of hero framing, camera distance, product angle, background treatment, copy placement, and message across two modules. Use only facts supported by the listing and references; when a role is unsupported, choose another supported role instead of inventing evidence.

For the default `standard-large` sequence, use this role map unless the product facts require a better-supported alternative:

```text
A+L01 — Brand / hero banner: establish the product and one core value in a wide, banner-safe composition; do not use the same centered product card used by later modules.
A+L02 — Core benefit evidence: explain one important feature with a purposeful detail crop, callout, or structured information area.
A+L03 — Use scenario: show the product working in a believable context or demonstrate a supported use flow; vary the camera distance and product placement.
A+L04 — Construction / material / ergonomics: show a different supported physical detail, finish, mechanism, or interaction using close-up or sectional composition when evidence exists.
A+L05 — Secondary value: choose a supported bundle, steps, care/use guidance, secondary scenario, or brand-value composition that has not already been used.
```

For `standard`, keep the header distinct from the three single-image modules, and make each `Highlight Tile` represent a different short benefit. For `premium`, keep the hero, feature images, and vertical brand-story modules visibly different in framing and purpose. For Mobile A+, keep one message per module but vary the evidence type and framing; never reuse one desktop composition by cropping it five times.

If no real brand or logo is supplied, never invent a brand name, logo artwork, brand history, authorization claim, website, contact detail, or external link. Comparison modules may compare only supported same-brand products.

## Project planner system-prompt skeleton

The Codex planner should preserve this order and intent when assembling its instruction message:

```text
You are an Amazon image-planning agent. The user provides listing copy and optional product reference images.
Target the requested marketplace and locale.
Create a complete visual plan for exactly the requested Listing slots or A+ modules in the requested order.
The application fixes the slot/module count, order, upload size, and generation size; you decide strategy, composition, copy approach, visual treatment, prompt content, and negative prompt content.
Use Amazon reference material to improve compliance judgment. It is not a fixed creative framework and must not replace product facts.
For each item, write planMarkdown in Simplified Chinese as a detailed agent-style plan, then write a professional English image prompt and English negative prompt.
Each prompt must fully plan the finished Amazon image: composition, product evidence, target-market on-image copy when useful, callouts/information areas when useful, visual hierarchy, and rendering style.
Return one English seriesStyleGuide for cross-image product consistency and factual visual continuity. Keep it style-neutral; the selected preset controls final palette, typography, background, lighting, and decorative style.
Do not generate images. Return JSON only when a structured planner response is requested.
```

For the internal structured planner result, use these project field requirements before adding optional local output fields. This JSON is intermediate machine-readable data: the outer chat response must save it as the plan artifact and must not mirror the complete object into a normal chat message.

```text
Return JSON with: product { title, category, brand, color, material, audience, packageIncludes }, sellingPoints string[], seriesStyleGuide string, and imagePlans or aPlusPlans.
Listing imagePlans must contain exactly the requested slots in order; each item includes slot, label, planMarkdown, prompt, negativePrompt.
A+ aPlusPlans must contain exactly the requested modules in order; each item includes slot, label, moduleType, planMarkdown, textTitle, textBody, prompt, negativePrompt.
Visible on-image copy uses natural target-market language; prompt and negativePrompt remain English.
```

## Final image prompt assembly

When converting a plan into a local Codex generation prompt, preserve this order:

1. The slot/module task prompt: subject, product evidence, composition, layout, visible copy, and target dimensions.
2. `Selected visual style (highest priority)`: selected preset/reference name, description, palette anchors, typography feel, lighting, background language, material finish, and information-panel styling.
3. `Series style guide (lower priority than the selected visual style)`: factual continuity only.
4. `Layout density`: for A+ large-image modules in `standard`, `standard-large`, `premium`, and `advanced`, default to `rich`, which may use organized callouts, detail crops, measurement arrows, comparison areas, or use-case zones when supported by the facts. Use `minimal` for Mobile A+ and `220x220` highlight tiles unless the user explicitly requests denser content. For Listing images, default to `minimal`. A user preference overrides these defaults; density must not erase the module's assigned story role.
5. `Negative prompt`: English, specific to the slot and shared style guard.
6. `Style reference rule`: the last input image is the same style board shown to the user as the template preview; use it only for palette, lighting, contrast, material finish, typography feel, and polish. Do not copy its placeholder words, fixed layout, swatch positions, exact composition, product arrangement, product count, props, scene, information density, page grid, margins, or copy zones. Do not repeat the board's composition across A+ modules; the module task prompt controls the actual composition.

The selected visual style outranks conflicting aesthetic language in the slot prompt or series guide, while product facts and required visible copy remain authoritative.

`MAIN` is the only hard exception: do not attach the style reference image, keep a pure white RGB 255,255,255 background, show the product once and uncropped, and exclude text, logos, borders, badges, pricing, reviews, props, packaging, and unsupported claims.

## Local Codex generation protocol

- Use the Codex host's built-in `image_gen` or `image_generation` tool as the first-choice runtime whenever either tool is available. Pass the prepared prompt and required reference images directly to that built-in tool.
- Do not bypass an available built-in tool by invoking an image API through shell commands, SDKs, HTTP requests, CLI utilities, or user-provided API keys.
- If neither built-in tool is available, return `image_generation_unavailable` and keep the completed plan usable. Do not automatically switch to an external image API; use another runtime only when the user explicitly requests or authorizes it.
- Generate one image per distinct slot; never create a collage.
- Prefer parallel calls for independent images when the host permits concurrent built-in tool calls. A native batch is optional, not required: submit separate one-image calls through the host's supported orchestration. Default to at most 3 in-flight calls, honoring user preferences and lower runtime limits. This is a scheduling preference, not a claim about service capacity or speedup. If the host forbids concurrency, run sequentially and explain briefly.
- Prepare every slot's complete prompt, explicit reference set, unique output name, and actual dependencies before dispatch. Sharing the same supplied product images and style board is not a dependency. Do not require an extra generated base when supplied references suffice. If a slot truly needs a generated base, first generate and inspect that base, then release its dependents; unrelated slots may run meanwhile. Do not add an extra deliverable outside the confirmed count without user direction.
- Bind references explicitly by local paths or stable IDs where supported. Do not use mutable recent-image selection for concurrent calls: another completion could change the selected images. If the runtime only supports recent-image context and reference isolation cannot be ensured, serialize those calls. Inspect local references before use when required by the tool.
- Keep each call self-contained with its slot prompt and full style block. Await every dispatched call and handle results separately (for example with all-settled handling where orchestration supports it); one failure must not discard successful siblings. Refill available capacity with ready slots as results finish. Preserve slot ordering in the final delivery even when completion order differs.
- Track each slot as pending, running, completed, or failed, together with its actual returned artifact. Show progress as results arrive without claiming success before an artifact returns. On an explicit transient failure, retry only that failed slot once, reduce concurrency after throttling, and honor retry timing. For an ambiguous timeout, check the existing job where supported before retrying; do not blindly duplicate a possibly running request. After a second failure or a non-retryable error, report the affected slot and deliver successful results. If concurrency is rejected, let existing calls settle before resuming the remaining slots sequentially.
- When a later image references an earlier image, include the corresponding reference tag/id in the generation request and state that the reference is for continuity only.
- Do not rewrite the selected plan prompt. Treat it as the complete generation prompt, adding only technical output resolution and runtime reference syntax.
- Include the exact requested output resolution as a technical requirement, never as visible image text.
