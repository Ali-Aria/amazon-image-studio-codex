# Amazon Image Studio Codex

一个面向 Codex 的 Amazon 商品图片策划与生成 Skill。

它根据商品标题、五点描述、产品资料和参考图，为 Amazon Listing 与 A+ 页面生成结构化图片方案、合规检查清单和专业图片 Prompt；在宿主环境支持图片生成时，也可以继续生成图片文件。

这是一个独立项目，面向本地 Codex 聊天窗使用，不依赖原来的 [amazon-image-studio](https://github.com/Ali-Aria/amazon-image-studio) React 工作台。

## 安装

克隆本仓库后，在项目根目录执行：

```powershell
npm run codex:install
```

安装脚本会把 `codex-skill/amazon-image-studio` 复制到当前用户的 Codex Skill 目录：

```text
Windows: %USERPROFILE%\\.codex\\skills\\amazon-image-studio\\
macOS/Linux: ~/.codex/skills/amazon-image-studio/
```

安装完成后重新打开 Codex，或新建一个任务使 Skill 生效。也可以通过环境变量 `CODEX_HOME` 指定 Codex 根目录。

> 注意：如果目标位置已经存在同名 Skill，安装脚本会先替换它。升级前请备份本地修改。

## 用户使用：只需在聊天窗对话

安装完成并重新打开 Codex 后，普通用户不需要填写 JSON，也不需要准备固定格式的表单。直接在聊天窗描述需求即可，也可以显式调用：

```text
$amazon-image-studio
```

一个窗口只处理一个 SKU。需要同时制作多个商品时，新建多个独立 Codex 任务，在每个任务的底部消息输入框粘贴任务模板，分别替换 SKU、商品资料并上传对应参考图。详细模板和“复制工作目录 / 复制深度链接 / 复制为 Markdown”的区别见 [快速开始](codex-skill/amazon-image-studio/references/quick-start.md)。

生成图片 Prompt 方案时，Skill 会同步展示已安装的风格模板图。用户可以回复模板 ID 或名称来选择模板；确认后，模板图会作为 Listing 附图和 A+ 图片的风格参考，`MAIN` 主图不使用模板图并继续遵守纯白背景规则。

例如：

```text
帮我为这款产品做 Amazon US Listing 图片方案。
这是商品标题和五点描述：
[直接粘贴商品资料]

我上传了产品参考图。
```

用户可以直接用自然语言提交商品标题、五点描述、产品资料和参考图片，完成：

- Amazon Listing 图片策划
- A+ 页面模块策划
- 与项目版对齐的统一视觉风格预置库（自动推荐，也可手动指定）
- 主图与附图合规检查
- 图片 Prompt 生成
- 可用时的图片生成任务
- Markdown、JSON 和本地图片产物输出

Skill 会自动判断用户要做 Listing、A+ 还是图片生成任务。未指定市场时默认 US；未指定 Listing 图片数量时默认 7 张，即 `MAIN` 加 `PT01`–`PT06`，也支持按项目版规则生成 7–12 张。A+ 默认采用项目版 `standard-large` 模块规格。只有缺少关键事实导致无法安全执行时才会追问一个简短问题，否则会直接继续并标注待核实内容。

Skill 会把商品资料视为事实来源，不虚构尺寸、材质、认证、功能和包装内容。图片能力不可用时，仍然完成策划和 Prompt，并返回明确的 `image_generation_unavailable` warning。

每个任务会先选择一套统一视觉风格，再让 Listing 和 A+ 计划继承同一套色板、字体方向、光线、背景语言和构图规则。

内置风格与项目版 ID 对齐：`clean-tech`、`natural-warm`、`premium-contrast`、`bright-retail`，以及适合幼儿女孩产品的 `soft-pink-toddler-girl`。

五套风格现在都带有对应的图片风格板，统一存放在 `codex-skill/amazon-image-studio/assets/style-presets/`。可在聊天中直接指定风格，也可以使用默认 `clean-tech`。支持 `minimal`（简约，默认）和 `rich`（内容丰富）两种图片信息密度，也可以在聊天中直接说“简约”或“内容丰富”。

在当前项目中保存生成图片时，建议按 Listing 商品标题归档：

```text
output/
└── <product-slug>/
    ├── listing/
    │   ├── <product-slug>__MAIN.png
    │   └── <product-slug>__PT01.png
    └── aplus/
        └── <product-slug>__A+L01.png
```

仓库中的 `output/` 仅用于本地生成产物，不是安装 Skill 所必需的内容。

## 预览

![image-20260903180220549](https://niaoyu.oss-cn-shenzhen.aliyuncs.com/img/image-20260903180220549.png)

![image-20260903180246089](https://niaoyu.oss-cn-shenzhen.aliyuncs.com/img/image-20260903180246089.png)

![image-20260903180306654](https://niaoyu.oss-cn-shenzhen.aliyuncs.com/img/image-20260903180306654.png)

## 支持的任务

### Listing 图片

未指定数量时，默认生成 7 个图片位：`MAIN` 加 `PT01`–`PT06`；也支持在 7–12 张范围内指定数量。图片用途包括主图、生活方式图、细节图、尺寸/比例图、套装图和使用步骤图。

### A+ 页面

支持标准 A+、大尺寸标准 A+、Premium A+ 和移动端 A+ 的模块规划。未提供尺寸或内容类型时，会使用默认规格完成方案，并标记待确认项。

### 图片生成

每个图片位或 A+ 模块单独生成，不制作未经请求的拼图。默认生成尺寸为最长边 2048px，并保留目标比例。

## 视觉风格

内置风格预置：

| ID | 风格 |
| --- | --- |
| `clean-tech` | 清洁、现代、科技感 |
| `natural-warm` | 自然、温暖、生活方式 |
| `premium-contrast` | 高级、强对比、精致 |
| `bright-retail` | 明亮、零售、电商感 |
| `soft-pink-toddler-girl` | 柔和、粉色、幼儿女孩场景 |

默认推荐 `clean-tech`。图片信息密度默认为 `minimal`，也可以指定 `rich`，或直接说“简约/内容丰富”。

## 重要规则

- 一个 Codex 任务或窗口只处理一个 SKU。
- 商品资料和参考图是产品事实的唯一来源，不虚构材质、尺寸、认证、功能或包装内容。
- Listing `MAIN` 主图使用纯白 RGB `255,255,255` 背景。
- 主图不放价格、评价、徽章、Amazon 标识、装饰文字或未经证实的宣传语。
- Listing 附图和 A+ 模块保持同一套视觉风格。
- 生成图片前先确认方案；没有实际图片产物时，不声称图片已经生成。

详细运行契约见 [`SKILL.md`](codex-skill/amazon-image-studio/SKILL.md)，首次使用模板见[快速开始](codex-skill/amazon-image-studio/references/quick-start.md)。

## 开发命令

| 命令 | 用途 |
| --- | --- |
| `npm run codex:install` | 安装或更新本地 Codex Skill |
| `npm test` | 运行项目测试 |

## 项目结构

```text
amazon-image-studio-codex/
├── codex-skill/amazon-image-studio/
│   ├── SKILL.md
│   ├── agents/openai.yaml
│   ├── assets/style-presets/      # 项目版 5 张风格参考板
│   └── references/                # 策划、规格、Prompt 与输出契约
├── scripts/
│   └── install-codex-skill.mjs
├── test/
├── output/                        # 本地生成产物
├── LICENSE
└── package.json
```

## 运行要求

这是一个 Codex Skill，不是独立的图片生成软件。图片策划可以在支持文本和文件输入的 Codex 环境中完成；实际图片生成和文件保存取决于宿主环境是否提供相应能力。用户直接在 Codex 聊天窗中使用即可。

## 许可证

[MIT License](LICENSE)
