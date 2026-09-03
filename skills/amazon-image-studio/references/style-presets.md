# Amazon Image Studio visual style presets

Use one preset as the visual source of truth for every image in a single job. The preset controls the visual system; product facts, reference-image identity, marketplace rules, and slot objectives still take precedence.

## Selection and inheritance

- If the user names a preset or clearly asks for a visual direction, use that preset.
- Otherwise use `clean-tech` as the runtime default, or recommend another preset when the product category, audience, use scenario, or references make the choice obvious. Record the reason in `styleTemplate.selectionReason`.
- The planner's `seriesStyleGuide` must remain style-neutral. It describes cross-image consistency and product storytelling, while the selected preset controls palette, typography feel, lighting, background language, density, and decorative grammar during generation.
- In a normal chat planning response, show the existing selected preset board as a visible `模板参考图` preview at the same time as the prompts. If the user has not selected a preset, show the available installed boards with their IDs, mark the recommended default, and accept a later ID/name choice without regenerating unrelated product facts.
- Resolve `boardAsset` from the current user's installed Skill directory and attach the actual image block for the preview when the host supports local image preview. A plain file card or ordinary file link is not a visible template preview. On Windows, the installed path has the form `C:/Users/<username>/.codex/skills/amazon-image-studio/assets/style-presets/<preset>.png`; never hard-code another user's profile path or omit the separator before `.codex`. The relative asset path belongs in `styleTemplate.boardAsset`; do not use it as the only user-facing delivery.
- For supporting Listing images and A+ modules, attach the same selected preset board as the last style reference when that board asset is available. `MAIN` is the exception: it uses the pure-white Amazon main-image override, does not need a style board, and must not receive the board as a generation reference.
- Every slot inherits the same preset. A slot may declare only narrow role-level `styleOverrides`, such as the pure-white MAIN background, a detail crop, or a mobile-safe copy zone. It may not replace the job palette, typography, lighting, or background language.
- The selected visual style block is higher priority than conflicting aesthetic language in a task or series guide. It must never override product facts, visible copy facts, image purpose, layout requirements, or negative prompts.
- Image information density is independent from the visual preset. Accept `minimal` and `rich`; default to `minimal` unless the user explicitly requests “内容丰富” or another clearly denser treatment. Record the resolved value in `styleTemplate.density` and carry it into every slot/module prompt.

## User-visible template delivery

- The installed board files are the reusable visual templates: `clean-tech.png`, `natural-warm.png`, `premium-contrast.png`, `bright-retail.png`, and `soft-pink-toddler-girl.png` under `assets/style-presets/`.
- For normal chat planning, include a compact gallery or the selected board preview, with each visible option labeled by preset ID and Chinese name. Mark `clean-tech` as the default only when the user has not supplied a visual direction.
- Tell the user that replying with a preset ID or name selects that image as the style reference for later image generation. The board controls palette, lighting, contrast, material finish, typography feel, and polish only; it does not replace product facts or copy its placeholder text, layout, props, product arrangement, or information density.
- Once the user confirms a preset, use that exact board asset consistently for all supporting Listing slots and A+ modules in the SKU task. Keep the board out of `MAIN` generation.
- If an asset is unavailable or cannot be displayed, keep the `styleTemplate.boardAsset` field, report a warning, and continue with the textual style block without claiming that a template image was delivered.

## Project-compatible preset shape

```json
{
  "presetId": "clean-tech",
  "name": "清爽科技",
  "selectionMode": "auto | manual",
  "selectionReason": "Why this system fits the product and audience.",
  "palette": ["#F8FAFC", "#E0F2FE", "#38BDF8", "#0F172A", "#94A3B8", "#14B8A6"],
  "typography": "...",
  "lighting": "...",
  "material": "...",
  "density": "minimal | rich",
  "boardAsset": "assets/style-presets/clean-tech.png",
  "productLock": "Preserve the exact product identity and evidence from the references.",
  "globalNegativePrompt": "..."
}
```

## Preset catalog

### `clean-tech` — 清爽科技

- Board asset: `assets/style-presets/clean-tech.png` when installed.
- Palette: `#F8FAFC` white-cool base, `#E0F2FE` pale blue, `#38BDF8` sky-blue accent, `#0F172A` graphite text, `#94A3B8` cool gray, and `#14B8A6` restrained teal.
- Typography: clean modern sans-serif, precise hierarchy, compact labels, short uppercase labels only when readable.
- Lighting: cool-neutral soft directional light, crisp edge definition, controlled contact shadows, no cinematic color cast.
- Material/background: white-to-cool-gray studio, translucent or technical surfaces only when they fit the product; organized grid or modular panels.
- Composition: consistent product scale, generous safe margins, clear product-first hierarchy, precise callouts and detail crops where evidence supports them.
- Graphic language: thin rules, small circular markers, disciplined grid, restrained rounded panels.
- Avoid: neon cyberpunk, invented specifications, decorative technical noise, unsupported performance claims, mixed visual systems.

### `natural-warm` — 自然暖调

- Board asset: `assets/style-presets/natural-warm.png` when installed.
- Palette: `#FFF8ED` cream, `#F4D6A6` sand, `#C58A45` warm ochre, `#2F3A2F` deep olive text, `#8FA478` muted sage, and `#E76F51` terracotta accent.
- Typography: friendly humanist sans-serif, sentence case, medium weight, short readable headlines.
- Lighting: warm natural daylight from one consistent side, soft realistic shadows, gentle highlight rolloff.
- Material/background: believable home or use environment, light wood, linen, ceramic, paper, or stone only when relevant; shallow depth of field stays restrained.
- Composition: product remains the hero, with lifestyle context supporting the use scenario; repeatable left/right copy zones and breathing room.
- Graphic language: soft rounded blocks, subtle editorial captions, low-contrast dividers.
- Avoid: unrelated props, invented package contents, excessive bokeh, inconsistent time of day, unsupported lifestyle claims.

### `premium-contrast` — 高级对比

- Board asset: `assets/style-presets/premium-contrast.png` when installed.
- Palette: `#F5F5F4` warm stone, `#D6D3D1` light taupe, `#A8A29E` stone gray, `#111827` near-black text, `#C8A24A` restrained gold, and `#7C2D12` deep brown-red accent.
- Typography: refined neutral sans-serif or restrained modern serif pairing only when the product supports it; strong hierarchy, generous tracking, title case or short uppercase labels.
- Lighting: controlled studio key with sculpted contrast, clean specular highlights, soft but intentional shadows, warm-neutral color temperature.
- Material/background: stone, matte paper, dark-to-light tonal planes, or premium wood; surfaces stay clean and believable.
- Composition: strong hero framing, balanced asymmetry, consistent product angle, premium whitespace, detail crops for finish and construction.
- Graphic language: thin gold rules, restrained tonal blocks, small editorial labels, no ornamental overload.
- Avoid: cheap glossy effects, loud gradients, fake luxury claims, dense copy, unsupported materials or finishes.

### `bright-retail` — 明亮零售

- Board asset: `assets/style-presets/bright-retail.png` when installed.
- Palette: `#FFFFFF` white, `#FEF3C7` pale yellow, `#F97316` orange, `#2563EB` blue, `#16A34A` green, and `#111827` graphite.
- Typography: bold geometric sans-serif, high legibility, short stacked headlines, consistent alignment and strong contrast.
- Lighting: bright even retail light with soft-edged shadows and clean, true-to-color product rendering.
- Material/background: high-key white or pale color fields, clean retail surfaces, simple blocks or relevant use context.
- Composition: one clear hero message per image, product large and unmistakable, repeated headline placement and safe zones.
- Graphic language: bold color blocks, simple circles, clean separators, limited icon use.
- Avoid: visual overload, random stickers, fake awards or urgency cues, decorative text on MAIN, unsupported sales claims.

### `soft-pink-toddler-girl` — 柔和高级童趣

- Board asset: `assets/style-presets/soft-pink-toddler-girl.png`.
- Palette: soft pink, creamy white, pale lavender, with small mint or muted-gold accents; keep contrast high enough for legibility. Recommended anchors: `#F9D6E5`, `#FFF9F2`, `#DDD4F2`, `#A9DCCB`, `#C8A24A`, `#3F3547`.
- Typography: rounded friendly sans-serif, soft geometric headline, medium-to-bold weight, short sentence-case or title-case copy; never use illegible script fonts.
- Lighting: diffused bright light, gentle warm-neutral temperature, soft contact shadow, polished but not glossy.
- Material/background: clean pastel studio or lightly styled child-friendly setting with smooth surfaces and sparse rounded forms.
- Composition: real product stays large and unmistakable, with generous breathing room and a simple repeatable visual rhythm.
- Graphic language: rounded panels, small dots, soft arcs, restrained stars or hearts as abstract accents only when appropriate.
- Avoid: adult beauty styling, harsh neon pink, dense cartoon characters, stereotyped props, invented child-safety or developmental claims, decorative text on MAIN.

## Shared negative prompt

Preserve the exact supplied product identity, proportions, colors, materials, texture, structure, included components, and package facts. Do not redesign, recolor, duplicate, merge, deform, crop, or replace the product. Do not invent dimensions, certifications, safety claims, performance claims, accessories, logos, packaging, or copy. No watermark, QR code, contact information, price, discount, review, star rating, Amazon/Prime badge, competitor reference, fake award, or unsupported claim. Keep all text short, correctly spelled, readable, and inside safe margins. Avoid clutter, random props, conflicting fonts, mixed lighting directions, arbitrary color shifts, and style drift between slots.

## Listing MAIN override

The preset may control product rendering, framing, scale, and neutral studio lighting, but `MAIN` must always use a pure white RGB `255,255,255` background, show only the sold product and supported included components, keep the product complete and true to color, and exclude decorative text, badges, prices, reviews, Amazon branding, borders, props, and unsupported claims.
