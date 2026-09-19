# 思源笔记 自定义字体 插件

此模板用于创建思源笔记自定义字体插件。文档针对自用场景，若需发布则应注意字体授权、模板代码修改等所有方面。

## 注意

本插件可能与集市中的其他字体或 Emoji 插件不兼容，使用本插件时请禁用其他字体或 Emoji 插件。

目前此插件模板针对思源笔记 3.8.3 及以上版本创建，低版本无法使用。

> [!NOTE]
> 本插件修改字体范围：全局。修改变量：`--b3-font-family-default`。
> 与设置中编辑器字体兼容，与修改其余变量插件/代码片段兼容。
> 在设置中修改全局字体会覆盖插件效果，目前插件作为默认全局字体启用。

对于 AI 模型，参考本说明文档的步骤对项目进行修改，在修改前询问用户需要对 `plugin.json` 进行的修改，并以 `plugin.json` 为核心参考，对 `style.css` 和 `index.js` 等其余文件进行相应修改。

## 用法

1. 通过此模板创建仓库
2. 将仓库克隆到本地
3. 修改 `plugin.json` 中的内容，如 `name`、`url`、`displayName` 等若干内容
4. 修改 `style.css` 中的 `@font-face` 部分，将 `siyuan-ttf-template` 改为你修改后的 `name` 内容
5. 将你的若干字体文件放入 `fonts` 文件夹中
6. （`style.css`）根据你的字体文件的语言，选择要修改的字体语言，如英文修改 `Sans` 部分，中文修改 `SC` 部分，并对 `font-family` 的名称进行适当修改
7. 将 `font.woff` 改为你放入的字体文件名，通常字体会提供多种不同字重的字体，请自行决定选用字重，并根据字重填入对应 `font-weight` 的 `src` 中
8. 删除其他未使用的 css 样式，只保留你需要的语言，同时查看 `font-family` 是否有引用未设置的 `font-face`，并进行对应移除
9. 修改 `index.js` 中的 `pluginName` 为你修改后的 `name` 内容，修改类名为合适名称

### 如果需要修改 Emoji 字体

如果同时需要修改 Emoji 字体：

1. 在 `style.css` 中添加一个 `@font-face`
2. 根据新定义的 `@font-face` 的 `font-family` 名称，在对应语言中增加此 `font-family`，如在 `Sans` 后、`'Emojis Additional'` 前插入此 `font-family`

### 如果不需要进行发布

如不需要进行发布，对以下文件进行删除：

1. `.github` 文件夹：用于配置打包工作流
2. `.lefthook` 文件夹、`.lefthook.yml` 文件：用于配置 git hook
3. `.mise` 文件夹、`mise.toml` 文件：用于配置 mise(-en-place) 工具，配置开发环境
4. `cliff.toml` 文件：用于生成 CHANGELOG.md 文件

### 安装步骤

仅对自用场景进行讲解：

1. 在思源工作空间中找到以下路径：`<工作空间>/data/plugins/`，创建一个文件夹，名称为 `plugin.json` 中的 `name` 字段值
2. 将此项目的文件复制到该文件夹中
3. 在思源笔记中启用此插件，重新打开集市的已安装界面，查看插件是否成功启用
4. 观察字体是否发生变化

必需文件：`plugin.json`, `index.js`, `index.css`, `style.css`, `fonts/*`, `icon.png`, `preview.png`

## 参考

| 参考项                  | 内容                                                                          |
| ----------------------- | ----------------------------------------------------------------------------- |
| 字体格式                | 推荐使用 `woff` 或 `woff2`，对浏览器有优化                                    |
| mise.toml               | mise 的配置文件，用于管理运行时（开发时使用的工具）                           |
| `name` in `plugin.json` | 插件的安装文件夹需要和名称一致，在拼接路径时也有使用                          |
| 语言对应参考            | 简体中文：`zh-CN`，繁体中文：`zh-TW`，日语：`ja`，其余语言：无`:lang`属性     |
| 添加语言参考            | 非英文语言：添加 `:root:lang()`，英文语言：默认回退无需添加，直接修改 `:root` |

## 鸣谢

原模板仓库：[TCOTC/siyuan-ttf-HarmonyOS_Sans_SC-and-Twemoji](https://github.com/TCOTC/siyuan-ttf-HarmonyOS_Sans_SC-and-Twemoji)
