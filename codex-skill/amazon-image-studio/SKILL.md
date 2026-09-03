---
name: amazon-image-studio
description: "Plan Amazon Listing and A+ images from product copy and reference files, producing compliant structured plans, prompts, and optional image-generation tasks."
---

# Amazon Image Studio

Use this skill when the user wants Amazon product-image planning, Listing image slots, A+ modules, image prompts, or a local Codex image-workbench task.

## Chat-first interaction

- Treat the chat window as the primary user interface. Accept natural-language requests, pasted product copy, and files or images uploaded in the conversation. Do not require the user to fill a form, prepare JSON, or name slot IDs.
- Infer the task from the conversation: Listing requests route to `listing-plan`, A+ requests route to `aplus-plan`, and requests to create image files route to `image-generation`. If the mode is omitted, default to a Listing plan and state that assumption briefly.
- Infer the marketplace from the conversation and use `US` when none is provided. Do not ask for information already present in the conversation or reference files.
- For a first-use conversation with no complete product task yet, or whenever the user asks how to use, install, copy, paste, open a window, or process multiple SKUs, read [references/quick-start.md](references/quick-start.md) and send its concise onboarding guidance plus the copy-ready task template. Explain that one Codex task/window handles one SKU and that multiple independent tasks can run in parallel. If the user has already supplied a complete product task, do not block execution with the full onboarding; include the one-window/one-SKU rule briefly and continue.
- Whenever a normal chat response includes image prompt planning, also send a visible `模板参考图` section using the already-installed style board assets. If the user has not selected a preset, show the available boards with their preset IDs, mark the recommended default, and let the user reply with an ID; if a preset is selected, show that board beside the plan. Resolve a board asset to an absolute local image path or attach the actual image so it is visible to the user; do not expose only a relative asset path. When the user asks for JSON-only output, preserve `styleTemplate.boardAsset` and do not break the requested JSON format.
- Ask at most one concise question only when a missing fact blocks safe work. Otherwise proceed with a reasonable default and record the uncertainty as a verification warning.
- When a Listing count is omitted, create 7 slots: `MAIN` plus `PT01`–`PT06`. Support 7–12 slots when the user asks for more or fewer within that range, while keeping every slot focused on one message.
- When A+ dimensions or content type are missing, use the `amazon-aplus.md` defaults, complete the content/layout plan first, and flag any unresolved dimensions.
- Lead with a concise human-readable result. Keep machine-readable JSON available when the user asks for it; never make the user manually assemble JSON.

## First-use onboarding and parallel SKU tasks

- A single task is the unit of work for one SKU. Keep product facts, reference images, prompts, output names, and warnings isolated to that SKU.
- When several SKUs need work at the same time, instruct the user to create or open separate Codex tasks, paste the quick-start template into each task, replace the SKU and product data, and upload only that SKU's reference images. Do not describe the workflow as requiring a multi-SKU batch file.
- Require a visible SKU identifier in the task whenever the user provides one. Use it as the output filename prefix and, when a project output directory is available, prefer a SKU-specific subdirectory to avoid collisions between parallel tasks.
- Onboarding must be short and actionable: explain the one-window/one-SKU rule, where to paste the template, how to attach reference images, and how to start another SKU in a separate task. Read the full copy-ready template from [references/quick-start.md](references/quick-start.md) when the user asks for detailed instructions.

## Operating contract

- Treat the product title, bullets, description, brand notes, marketplace, and reference files as the source of truth. Do not invent materials, dimensions, certifications, functions, claims, or package contents.
- Preserve product identity from reference images. Product references may establish factual appearance, color, shape, structure, accessories, material, packaging, and feature evidence; they do not define final aesthetics unless the user explicitly asks for that.
- Default to Simplified Chinese for explanations and labels/plan fields. Use professional English for image prompts, negative prompts, and the generation style block. Visible copy must use the target marketplace language.
- Keep visible image text short and legible. Put longer A+ copy in structured fields instead of forcing it into a small image.
- The Listing `MAIN` image must use a pure white RGB `255,255,255` background, show the complete sold product at a marketplace-appropriate scale, and contain no badges, prices, reviews, Amazon branding, borders, props, decorative text, or unsupported claims.
- Read [references/planner-prompts.md](references/planner-prompts.md) for the project-aligned planner contract, image-purpose guidance, A+ module sizes, prompt priority, and multi-image generation protocol.

## Visual system and style references

- Read [references/style-presets.md](references/style-presets.md) before planning. Select one preset for the entire job. The project-compatible built-ins are `clean-tech`, `natural-warm`, `premium-contrast`, `bright-retail`, and `soft-pink-toddler-girl`.
- A user-provided style or `params.stylePresetId` takes precedence. If neither is provided, use `clean-tech` as the runtime default or record a reasoned automatic recommendation. Expose preset ID, name, selection mode, and reason in `styleTemplate`.
- Keep the planner's `seriesStyleGuide` style-neutral: it describes product storytelling, cross-image consistency, and evidence handling. It must not lock a competing palette, typography, background, lighting, or decorative system.
- During image generation, the selected visual style block and the same user-visible style board are the visual source of truth. For supporting Listing images and A+ modules, attach the chosen preset board as the last reference image when available. Do not attach it to `MAIN`; `MAIN` follows the pure-white override.
- Every slot/module inherits the same palette, typography feel, lighting direction, background/material language, product rendering, density, and global negative prompt. `styleOverrides` may only express narrow role-level exceptions such as `MAIN` pure white, a detail crop, or a mobile-safe text zone.
- Apply the project's style-reference guard: use a style board only for palette, lighting, contrast, material finish, typography feel, and visual polish. Do not copy its placeholder words, swatch positions, exact composition, product arrangement/count, props, scene, or information density. Preserve the task's facts, image purpose, layout, and negative prompt.
- Support two image-information density modes: `minimal` means fewer callouts, generous spacing, and a product-plus-one-or-two-message hierarchy; `rich` means organized callouts, detail crops, measurements, comparison areas, or use-case zones when supported by the facts. Default to `minimal` unless the user explicitly asks for rich/content-rich information. Natural-language choices such as “简约” map to `minimal`, and “内容丰富” map to `rich`. Density does not change the selected preset.

## Planning workflow

1. Read [references/style-presets.md](references/style-presets.md) and choose the one job-level visual system. In the normal chat result, send the corresponding existing style board preview at the same time as the prompt plan so the user can select or confirm the reference image.
2. Extract `product.title` from an explicit Listing/Product Title field. If absent, infer the most credible title from the Listing text and return `product_title_inferred`; if none can be recovered, use a safe fallback and return `product_title_missing`.
3. For `listing-plan`, read [references/amazon-listing.md](references/amazon-listing.md), produce the requested 7–12 slots, and use the project image kinds: `main`, `lifestyle`, `detail`, `scale`, `bundle`, and `steps`.
4. For `aplus-plan`, read [references/amazon-aplus.md](references/amazon-aplus.md), choose the requested content type (`standard`, `standard-large`, `premium`, or `mobile`), and produce the corresponding module sequence and sizes.
5. Keep every prompt self-contained and include the same selected visual style anchor. Place task prompt first, selected style block second, style-neutral series guide third, density guidance fourth, negative prompt fifth, and the style-reference guard last. The user-visible template preview and the generation reference must point to the same selected board asset.
6. For `image-generation`, generate one distinct image per slot/module. Generate a base product image first when later images depend on it; reference the base for dependent images. Batch remaining independent images only when the runtime supports it. Never make a collage or silently rewrite the complete prompt.
7. Save generated files only in the supplied task output directory. For local Codex work, use `output/<product-slug>/listing/` or `output/<product-slug>/aplus/` inside the current project when available; never write generated files into the installed Skill directory. When a SKU is available, include it in the output directory or filename prefix so parallel SKU tasks remain isolated.
8. Return the Markdown summary and JSON shape in [references/output-schema.md](references/output-schema.md).

## Prompt and generation rules

- Image prompts must fully specify the finished image: product evidence, composition, focal hierarchy, visible copy, callouts, rendering, output aspect/resolution, selected style anchor, and negative prompt.
- The selected visual style has higher priority than conflicting aesthetic wording in a task or series guide, but never overrides product facts, copy facts, slot purpose, dimensions, marketplace compliance, or negative prompts.
- Use the generation runtime's no-rewrite guard where available: treat each prepared prompt as the complete prompt and do not paraphrase it.
- Include exact output resolution in the generation request, not as visible image text. Keep reference IDs bare in batch APIs and do not expose `<ref>` tags in the final image.
- Never claim an image was generated unless an image artifact was actually returned. If unavailable, finish the plan and return `image_generation_unavailable`.

## Artifact rules

- Save generated files only inside the task output directory supplied by the user or current project.
- Use `output/<product-slug>/listing/` or `output/<product-slug>/aplus/` with names such as `<product-slug>__MAIN.png`, `<product-slug>__PT01.png`, or `<product-slug>__A+L01.png` when a local project output directory is available.
- When a SKU is available, prefer `<sku>__MAIN.png`, `<sku>__PT01.png`, or `<sku>__A+L01.png` and a matching SKU-specific directory; retain the product slug as a readable secondary component when useful.
- Normalize the Listing title with Unicode NFKC, lowercase English, preserve Chinese and alphanumeric characters, replace special characters with short hyphens, and limit the slug to 80 characters.
- Do not overwrite an existing artifact. If the target exists, append `__v2`, `__v3`, and so on.
- Report missing references, unsupported dimensions, failed generation, inferred/missing titles, and incomplete output explicitly.
