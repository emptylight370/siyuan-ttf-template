# AGENTS.md

本文件为 CodeBuddy 在此仓库中工作时提供指引。

## 项目定位

这是**思源笔记（SiYuan）自定义字体插件的模板仓库**，不是应用工程：没有构建系统、没有测试框架、没有运行时依赖（唯一的 `require('siyuan')` 由宿主提供）。产出物就是一组静态文件，被复制到思源工作空间的 `data/plugins/<name>/` 后由思源直接加载。

核心结论先记住三点：

1. `plugin.json` 是唯一事实来源，其余文件中的名称都从它的 `name` 字段派生。
2. 字体与样式全在 `index.css`，`index.js` 只是极薄的加载/卸载壳。
3. 改动范围始终是"全局字体"，只覆盖 CSS 变量 `--b3-font-family-default`，因此与设置中的编辑器字体、以及其他改别的变量的插件/代码片段兼容。

要求思源 3.8.6-alpha.2 及以上：`plugin.json` 的 `minAppVersion` 与两份 README 已同步为该值（模板已跟进官方自带的 `--b3-font-family-default` 变量）。注意这是预发布版本号，正式发版前应确认是否改回稳定版。

## 常用命令

所有命令在仓库根目录执行。开发工具由 mise(-en-place) 管理，命令通过 MCP 的 mise 工具或 `mise exec` 运行。

| 目的                     | 命令                                                                                                                                                                                                                                  |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 安装/更新开发工具        | `mise install`（安装 `mise.toml` 中声明的 `git-cliff`、`lefthook`、`prettier`，并自动执行 `[deps.lefthook]` 里的 `lefthook install`）。首次进入仓库必跑。                                                                             |
| 手动重装 git 钩子        | `mise exec -- lefthook install`（`lefthook.yml` 定义 pre-commit 与 commit-msg 钩子）。                                                                                                                                                |
| 格式化                   | `mise exec -- prettier -w .` 或只格式化改动文件。配置见 `.prettierrc`：JS/JSON/MD 用单引号、`printWidth 180`；`*.css` 覆盖为 `tabWidth 4`、`printWidth 240`。提交时 pre-commit 会自动格式化并 `git add` 回暂存区。                    |
| 生成 changelog           | `mise run changelog`（任务在 `.mise/tasks/changelog.ps1`）：读取 `plugin.json` 的 `version` 作为 tag 跑 `git cliff -t <version>`，写 `changelog.md`，再 `prettier -w` 并 `git add`。也可直接 `mise exec -- git cliff -t 1.0.0` 预览。 |
| 本地验证（无自动化测试） | 复制文件到 `<思源工作空间>/data/plugins/<name>/`，在思源集市已安装界面启用并重启界面，观察字体是否变化、控制台是否打印 `load start.`/`loaded.`。                                                                                      |

无 lint、无 test 命令；不要臆造。

## 架构与关键约定

### 命名一致性（最容易出错的地方）

`plugin.json` 的 `name`（当前 `siyuan-ttf-template`）在**三处**被硬编码引用，改 `name` 时必须同步，否则插件静默失效（字体 404、CSS 不加载）：

1. `index.css` 中每个 `@font-face` 的 `src: url('../plugins/<name>/fonts/<file>')` —— 路径以思源界面页面为基准，必须写出插件目录名。
2. `index.js` 的 `pluginName = '<name>'`（用于日志前缀）。
3. 安装目录名 `data/plugins/<name>/` 必须与之一致。

README（中英文版）的"用法"步骤就是这份改写作的编号流程，照做即可。

### 样式加载机制

`index.css` 完全由思源自行加载（6666c64「修复新版本思源加载样式问题」把 `style.css` 合并进 `index.css` 并删除了旧文件，之后 `index.js` 里手动注入样式的代码也已移除）。`index.js` 现在只剩生命周期日志：`onload`/`onunload`/`uninstall` 各打印一行，不再创建 `<style>`、不再 `fetch` 任何文件。

这意味着样式不再以 `snippetCSS-<name>` 前缀注入，而该前缀是思源把样式写进导出 PDF 的约定；若将来要让字体出现在导出的 PDF 中，需要重新用该 id 注入一份样式，不要以为这是无用代码而删掉相关说明。

`index.js` 的生命周期很简单：`onload` 注入、`onunload` 与 `uninstall` 移除该 `<style>`；它是 `module.exports = class extends require('siyuan').Plugin` 的 CommonJS 模块，思源用 Electron/浏览器环境直接加载，无需打包。

### `index.css` 的组织方式

分两层：

- **上半部：`@font-face` 声明**，按语言族分组命名：`SC`（简体中文）、`TC`（繁体中文）、`JP`（日语）、`Sans`（拉丁文，另含两组 `font-style: italic`）。每组为 400/700 两个字重提供 `src`。字体文件放 `fonts/`，模板里占位为 `font.woff`；推荐 `woff`/`woff2`。
- **下半部：CSS 变量覆盖**。`:root` 是默认（英文/其他语言，无 `:lang`），`:root:lang(zh-CN)`、`(zh-TW)`、`(ja)` 分别是各语言的字体栈；新增语言即新增一条 `:root:lang(xx)`，英文则直接改 `:root`。每个字体栈都以 `var(--b3-font-family-emoji-reset)` 开头（Emoji 重置变量）、以 `emojis` 结尾，并以 `!important` 覆盖思源默认；自定义字体族名（`SC`/`Sans` 等）排在思源自带字体之前。

裁剪原则：只保留需要的语言段，且字体栈里不能引用未定义的 `font-family`。要改 Emoji 字体时，新增一个 `@font-face`，把它的族名插到对应语言栈中 `Sans` 之后、`emojis` 之前（README 旧表述为 `'Emojis Additional'` 之前）。

### 发布与工程化

- `.github/workflows/release.yml`：仅当 `main` 分支上 `plugin.json` 变更（或手动触发）时运行；用 jq 取 `version` 作为 tag，若该 release 已存在则跳过，然后 `zip -r package.zip . -i 'index.*' 'icon.png' 'preview.png' 'plugin.json' 'README*.md' 'fonts/*'`，用 `git cliff` 生成 `release.md` 作为说明发布。
- `cliff.toml`：conventional commits 分组（feat/fix/doc/perf/...），`style`/`chore`/`test`/`wip` 被跳过，输出落到 `changelog.md`。
- `lefthook.yml`：pre-commit 在 `plugin.json` 的 `version` 变化时自动更新 changelog，并对 `*.md/json/js/css` 跑 prettier；commit-msg 用 `.lefthook/commit-msg/commitmsg.sh` 校验 Conventional Commits 格式。提交信息必须形如 `feat: xxx` / `fix(scope): xxx`。
- `plugin.json` 的 `publish.resources: ["fonts/"]` 与 `readme`（default/zh-CN）、`displayName`、`description` 双语字段需一并维护。

### 自用裁剪

纯自用可删除 `.github/`、`.lefthook/` 与 `.lefthook-local/`、`.mise/` 与 `mise.toml`、`cliff.toml`（README「If You Do Not Need to Publish」一节）。运行必需文件：`plugin.json`、`index.js`、`index.css`、`fonts/*`、`icon.png`、`preview.png`；其中 `icon.png`、`preview.png` 不需要时应同时删除文件与 `plugin.json` 中对应字段，字段值不能留空（README 已写明）。

## 与用户协作的要求

README 明确要求：**修改前先询问用户 `plugin.json` 需要哪些改动**（`name`、`url`、`displayName`、`description`、`version` 等），并以 `plugin.json` 为核心依据再去改 `index.css`、`index.js`。不要擅自替用户决定插件名或字体族名。字体授权问题若涉及发布，需提醒用户自行确认。

## 遗留事项

- `fonts/` 目录当前只有 `.gitkeep`，没有真实字体文件；`.gitignore` 忽略 `node_modules/`、mise 本地锁文件与 `.lefthook-local`。
