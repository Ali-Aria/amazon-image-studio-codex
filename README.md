# Amazon Image Studio Codex

在 Codex 聊天中，用商品标题、描述和参考图制作 Amazon Listing / A+ 图片方案、Prompt，并在环境支持时生成图片。

**一个任务处理一个 SKU。支持 Windows 和 macOS，无需填写 JSON。**

## 1. 安装

### 让 Codex 帮你安装

把下面这段发送到能访问本机文件和终端的 Codex 任务中即可：

```text
请帮我安装这个仓库里的 amazon-image-studio Skill：
https://github.com/Ali-Aria/amazon-image-studio-codex
请按 README 的安装说明完成安装并检查文件是否齐全。如果已安装，请先备份再更新。
```

也可以直接粘贴仓库链接，并补一句“帮我安装这个 Skill”。

<details>
<summary>给 Codex 的安装执行说明</summary>

以下步骤适用于用户明确要求安装或更新本 Skill 的任务；仅阅读仓库不代表要求安装。

1. 检查本机系统、Git、Node.js/npm，以及是否设置 `CODEX_HOME`。安装源是本仓库的 `skills/amazon-image-studio/`，不是仓库根目录，也不是单独的 `SKILL.md`。无需启动网页或配置图片 API Key。
2. 将仓库下载到可写的工作目录。已有本仓库时可复用，但先检查本地改动；不要覆盖用户修改。需要全新副本时使用新的目录，避免同名冲突。没有 Git 时可下载仓库 ZIP 并解压。
3. 安装目标为 `${CODEX_HOME}/skills/amazon-image-studio/`；未设置该变量时，使用当前用户主目录下的 `.codex/skills/amazon-image-studio/`。不要照抄作者的本机路径。目标已存在时，先完整复制到独立备份目录，并确认备份成功；下方安装脚本会替换旧目录。
4. 在仓库根目录执行 `npm run codex:install`。无需 `npm install`。如果没有 Node.js/npm，可将 `skills/amazon-image-studio/` 整个目录复制到上述目标位置；同样先备份已有版本，不要只复制入口文件。
5. 检查安装目录中的 `SKILL.md`、`agents/openai.yaml`、`references/` 和 `assets/style-presets/` 是否齐全，并确认五张模板 PNG 均已复制。仅下载仓库不算完成安装。
6. 告知用户实际安装路径、备份路径（如有），并提示重新打开 Codex 或新建任务，再输入 `$amazon-image-studio` 使用。若当前环境无法写入本机，说明限制并提供下方手动安装步骤，不要声称已安装。

</details>

### 手动安装

准备好 Codex、Node.js 和 npm。使用 Git 下载项目，或从 GitHub 下载 ZIP 后解压。以下命令可在 macOS 终端或 Windows PowerShell 中执行：

```sh
git clone https://github.com/Ali-Aria/amazon-image-studio-codex.git
cd amazon-image-studio-codex
npm run codex:install
```

如果已下载 ZIP，直接在解压后的项目目录执行 `npm run codex:install` 即可。此项目没有 npm 依赖，无需先执行 `npm install`。

安装后重新打开 Codex，或新建任务加载 Skill。

| 系统 | 默认安装位置 |
| --- | --- |
| macOS | `~/.codex/skills/amazon-image-studio/` |
| Windows | `%USERPROFILE%\.codex\skills\amazon-image-studio\` |

设置了 `CODEX_HOME` 时，安装到该目录下的 `skills/amazon-image-studio/`。更新时获取最新项目文件，再运行相同安装命令。

> 安装会替换已有的同名 Skill；如果修改过已安装的文件，请先备份。安装脚本使用跨平台 Node.js API，目前未在真实 Mac 上实测。

## 2. 开始使用

在 Codex 中新建任务，在消息开头输入 `$amazon-image-studio` 调用 Skill。附上几张能看清产品外观与细节的参考图，再填写标题和五点描述即可；尺寸、颜色等信息可按需补充。

直接复制下面的模板，替换方括号内容，与参考图一起发送：

```text
$amazon-image-studio

请根据附图和以下资料，为这款产品制作 Listing 图片方案。

产品标题：[填写产品标题]
五点描述：[粘贴产品的五条卖点描述]
补充信息（选填）：[尺寸、颜色或其他需要说明的信息]
```

没有补充信息时可删除最后一行。需要 A+ 时，将“Listing 图片方案”改为“A+ 图片方案”；只需策划时，加一句“只做方案，不生成图片”。更多说明见[快速开始](skills/amazon-image-studio/references/quick-start.md)。

### 对话流程

提出制作 A+ 图片后，AI 会默认推荐普通 A+，并在首次确认中列出规格对照表：普通 A+、手机 A+、高级 A+、标准 A+（含小图块）。表中展示各方案的图片数量、上传／参考尺寸和生图尺寸策略。直接回复方案编号（如“A2”）或中文名称即可选择，配色也在这一步确认。

1. **提交资料**：发送标题、描述和产品参考图。
2. **确认规格与配色**：AI 提出数量、目标尺寸，展示五套模板，等待确认。**没有喜欢的模板，也可以在这一步上传一张喜欢配色的图片。** AI 会提取主色、辅助色和点缀色作为生图配色参考。
3. **查看方案**：获得中文图片方案和英文 Prompt，可提出修改。
4. **生成与交付**：按确认的方案逐张生成，保存图片及 JSON 方案文件。

处理多个商品时，为每个 SKU 新建独立任务，分别上传资料。

## 3. 配色与图片规格

回复模板序号或中文名称即可选择，不需要输入英文 ID。

| 序号 | 模板 | 配色特点 | ID（供 AI / 开发使用） |
| --- | --- | --- | --- |
| 1 | 清爽科技 | 冷白、浅蓝，整洁理性 | `clean-tech` |
| 2 | 自然暖调 | 奶油色、木质暖色，亲切自然 | `natural-warm` |
| 3 | 高级对比 | 深浅对比、克制金色 | `premium-contrast` |
| 4 | 明亮零售 | 白底、蓝橙色块，醒目易读 | `bright-retail` |
| 5 | 柔和高级童趣 | 柔粉、奶白、淡紫 | `soft-pink-toddler-girl` |
| — | 自定义图片配色 | 从你指定的图片中提取配色 | `custom-reference` |

未指定风格时，默认使用系统根据产品推荐的配色模板。图片信息密度默认“简约”（`minimal`），可改为“内容丰富”（`rich`）。

自定义参考图只用于配色，不复制其中的产品、文字或布局，也不改变商品本身颜色。整套 Listing 附图和 A+ 使用统一视觉系统；`MAIN` 主图保持纯白背景，不附加风格参考图。

| 项目 | 未指定时的提议 |
| --- | --- |
| 市场 | Amazon US |
| Listing | 共 7 张：`MAIN` + `PT01`–`PT06`，每张目标尺寸 2048 × 2048；支持指定 7–12 张 |
| A+（默认） | `standard-large`，共 5 个模块；上传尺寸 970 × 600；生图保持 97:60 比例，使用当前工具支持的最大尺寸 |
| 手机 A+ | 共 5 个模块；上传尺寸 600 × 450，生图目标尺寸 2352 × 1776 |
| 高级 A+ | 共 6 个模块：4 个 1464:600 横幅 + 2 个 4:3 说明图；生图按比例使用当前工具支持的最大画布（优先 2928 × 1200 / 2400 × 1800） |

A+ 还支持标准、Premium、移动端和高级 A+ 规格。数量、上传尺寸和生图比例在正式策划前确认。高级 A+ 中的 Hotspot 和视频封面是视觉策划角色，是否能实现交互或视频播放取决于 Amazon 账号和内容编辑器。**目标尺寸用于构图与交付规划，实际生成尺寸和比例取决于 Codex 提供的图片能力，不保证原生输出完全一致。**

## 4. 交付与使用边界

- 聊天中展示简洁的中文方案；完整 JSON 保存为文件。图片 Prompt 使用英文，图中文字使用目标市场语言。
- 本地输出默认放在项目的 `output/<SKU或商品名>/listing/` 或 `aplus/` 中；同名文件增加版本号，不覆盖已有产物。
- 商品资料和产品参考图是事实依据，不虚构尺寸、材质、认证、功能或包装内容。
- 主图使用纯白 RGB `255,255,255` 背景，不添加价格、评价、徽章或装饰文字。
- 实际生图需要 Codex 提供内置图片生成工具。工具不可用时，交付方案与 Prompt，并明确说明未生成图片。

## 常见问题

**模板图片不显示？** 重新执行安装命令，确保安装了整个 Skill 文件夹，包含 `assets/style-presets/` 中的五张 PNG，而非仅复制 `SKILL.md`。图片预览应使用当前用户安装目录下的绝对路径；无法预览时，Skill 会列出五套中文选项，仍可继续选择。

**安装命令提示找不到 npm？** 先安装 Node.js 和 npm，再重新打开终端执行。

**需要运行网页或配置 API Key 吗？** 不需要。此项目直接在 Codex 聊天中使用，不依赖原来的 [React 工作台](https://github.com/Ali-Aria/amazon-image-studio)。生图默认使用 Codex 内置工具。

## AI 与维护者入口

README 用于安装和上手；完整执行规则以 [`SKILL.md`](skills/amazon-image-studio/SKILL.md) 为准，按任务读取其引用文件。

| 文件 | 用途 |
| --- | --- |
| [SKILL.md](skills/amazon-image-studio/SKILL.md) | 交互确认、策划、生图与产物规则 |
| [style-presets.md](skills/amazon-image-studio/references/style-presets.md) | 内置模板、自定义配色与参考图使用规则 |
| [planner-prompts.md](skills/amazon-image-studio/references/planner-prompts.md) | Planner 与最终生图 Prompt 契约 |
| [output-schema.md](skills/amazon-image-studio/references/output-schema.md) | JSON 方案字段 |
| [amazon-listing.md](skills/amazon-image-studio/references/amazon-listing.md) / [amazon-aplus.md](skills/amazon-image-studio/references/amazon-aplus.md) | Listing / A+ 规格与约束 |
| [install-codex-skill.mjs](scripts/install-codex-skill.mjs) | 跨平台安装脚本 |

`npm run codex:install` 安装或更新本地 Skill。`npm test` 调用 Node.js 测试运行器；当前没有测试用例，不能据此认定平台兼容性已验证。

## 效果预览

<details>
<summary>展开查看三张示例</summary>

![Amazon 图片工作室使用示例 1](https://niaoyu.oss-cn-shenzhen.aliyuncs.com/img/image-20260903180220549.png)

![Amazon 图片工作室使用示例 2](https://niaoyu.oss-cn-shenzhen.aliyuncs.com/img/image-20260903180246089.png)

![Amazon 图片工作室使用示例 3](https://niaoyu.oss-cn-shenzhen.aliyuncs.com/img/image-20260903180306654.png)

</details>

## 许可证

[MIT](LICENSE)
