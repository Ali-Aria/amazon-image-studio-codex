# Codex result schema

Return a JSON object with this compatible shape. `plans` and `prompts` remain as compact compatibility aliases when useful; `imagePlans` and `aPlusPlans` mirror the explicit planner names.

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

`styleTemplate.density` records the resolved image-information density. Use `minimal` by default; use `rich` only when the user explicitly requests content-rich or denser image information.
