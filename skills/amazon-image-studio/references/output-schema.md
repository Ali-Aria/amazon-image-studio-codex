# Codex result schema

Use this compatible shape for the machine-readable JSON plan artifact. `plans` and `prompts` remain as compact compatibility aliases when useful; `imagePlans` and `aPlusPlans` mirror the explicit planner names.

In normal chat, do not print this complete object or a large JSON code block. Show a concise Chinese summary and planning table, save the complete object as `<sku-or-product-slug>__listing-plan.json` or `<sku-or-product-slug>__aplus-plan.json` inside the task output directory, and provide a clickable link when useful. If the filename exists, append `__v2`, `__v3`, and so on. A request for “JSON only” means deliver the JSON file unless the user explicitly asks to paste the complete JSON into the chat window.

```json
{
  "kind": "listing-plan | aplus-plan | image-generation",
  "marketplace": "US",
  "markdown": "human-readable summary",
  "product": {
    "title": "Original Listing title",
    "slug": "safe-short-product-slug",
    "category": "",
    "brand": "",
    "color": "",
    "material": "",
    "audience": "",
    "packageIncludes": ""
  },
  "styleTemplate": {
    "presetId": "clean-tech",
    "name": "清爽科技",
    "selectionMode": "auto | manual",
    "selectionReason": "Why this preset fits the product",
    "palette": ["#F8FAFC", "#E0F2FE", "#38BDF8", "#0F172A", "#94A3B8", "#14B8A6"],
    "typography": "...",
    "lighting": "...",
    "material": "...",
    "density": "minimal | rich",
    "boardAsset": "assets/style-presets/clean-tech.png",
    "productLock": "...",
    "globalNegativePrompt": "..."
  },
  "seriesStyleGuide": "Style-neutral cross-image storytelling guide.",
  "imagePlans": [],
  "aPlusPlans": [],
  "plans": [],
  "prompts": [],
  "artifacts": [],
  "warnings": []
}
```

Listing plan items use `slot`, `label`, `kind`, `planMarkdown`, `prompt`, and `negativePrompt`. A+ items use `slot`, `label`, `moduleType`, `uploadSize`, `generationSize`, `planMarkdown`, `textTitle`, `textBody`, `prompt`, and `negativePrompt`. Both item types additionally carry `stylePresetId`, optional `styleOverrides`, `fileName`, and `relativePath`; legacy aliases are allowed for backward compatibility.

Each warning has `code` and `message`. Use `product_title_inferred` when the title was recovered from unlabeled Listing text, `product_title_missing` when no title could be recovered, and `image_generation_unavailable` when the runtime cannot return an image artifact. Keep `artifacts` empty when no file was actually produced.

When a local file is produced, include its `outputPath`, for example `output/product-slug/listing/product-slug__MAIN.png`. Repeated output uses `__v2`, `__v3`, and so on rather than overwriting an existing file.

The JSON plan file itself is an artifact. Include its path in the chat handoff, but do not duplicate the complete file contents in the same response.

`styleTemplate.density` records the resolved image-information density. Listing images use `minimal` by default. A+ large-image modules in `standard`, `standard-large`, `premium`, and `advanced` use `rich` by default; Mobile A+ and `220x220` highlight tiles use `minimal` by default. An explicit user preference overrides these defaults. For A+ plans, place each module's story role, primary evidence, composition family, and difference from neighboring modules in `planMarkdown` so the set can be audited for repetition.

For a user-uploaded palette template, use `styleTemplate.presetId: "custom-reference"`, `name: "自定义图片配色"`, `selectionMode: "manual"`, and `boardAsset: null`. Store the actual local path or host attachment ID in `referenceImage`, approximate extracted HEX colors in `palette`, and their main/secondary/accent and application roles in `paletteRoles`. Use `stylePresetId: "custom-reference"` for each slot/module. The reference supplies palette only; product colors and MAIN compliance remain authoritative. Built-in presets retain the existing schema above.

For `mobile`（手机 A+）, set every module's `uploadSize` to `600x450` and `generationSize` to `2352x1776`.

For `advanced`（高级 A+）, use modules `A+X01`–`A+X06` in order. Set `A+X01`–`A+X04` to the `1464:600` ratio and `A+X05`–`A+X06` to 4:3. Preserve these ratios while using the largest supported generation canvas; preferred concrete targets are `2928x1200` and `2400x1800`. Treat `800x600` as a 4:3 upload/reference target from the planning set and keep account-specific module requirements as a warning. Hotspot and video-cover roles do not guarantee interactive or video behavior.

For `standard-large`, keep `uploadSize` at `970x600`, add `generationAspectRatio: "97:60"` and `generationSizePolicy: "largest-supported"` to each module. Set `generationSize` to the resolved target dimensions when known, or null when the runtime controls sizing and no dimensions can be established. Record actual returned dimensions in the image artifact; do not label an unverified target as the actual or maximum size.
