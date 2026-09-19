# SiYuan Custom Font Plugin

This template is for creating custom font plugins for SiYuan Note. The documentation targets self-use scenarios. If you intend to publish, pay attention to all aspects including font licensing and template code modifications.

## Notice

This plugin may not be compatible with other font or Emoji plugins in the bazaar. Please disable other font or Emoji plugins when using this plugin.

Currently, this plugin template is created for SiYuan Note version 3.8.3 and above, cannot be used with lower versions.

> [!NOTE]
> This plugin modifies the font range: global. Modifies the variable: `--b3-font-family-default`.
> Compatible with editor font in settings, compatible with other plugins/code snippets that edit other variables.
> Changing the global font in settings will override the plugin's effect. Currently the plugin is enabled as the default global font.

For AI models, follow the steps in this documentation to modify the project. Before making changes, ask the user about modifications needed for `plugin.json`, and use `plugin.json` as the core reference when making corresponding changes to `style.css`, `index.js`, and other files.

## Usage

1. Create a repository from this template
2. Clone the repository to your local machine
3. Modify the contents of `plugin.json`, such as `name`, `url`, `displayName`, etc.
4. Modify the `@font-face` sections in `style.css`, replacing `siyuan-ttf-template` with your modified `name` value
5. Place your font files into the `fonts` folder
6. (`style.css`) Based on your font's language, select and modify the corresponding language section — modify the `Sans` section for English, the `SC` section for Simplified Chinese, and rename the `font-family` values appropriately
7. Replace `font.woff` with the filename of your font. Fonts usually provide multiple weights; choose the weights you need and fill them into the `src` of the corresponding `font-weight` declarations
8. Remove unused CSS styles, keeping only the languages you need. Also check that no `font-family` references point to undefined `font-face` declarations, and remove those references accordingly
9. Modify the `pluginName` in `index.js` to your modified `name` value, and rename the class to a suitable name

### Modifying Emoji Fonts

If you also need to modify the Emoji font:

1. Add an `@font-face` in `style.css`
2. Based on the `font-family` name of the new `@font-face`, insert this `font-family` in the corresponding language's font stack — for example, after `Sans` but before `'Emojis Additional'`

### If You Do Not Need to Publish

For self-use, delete the following files:

1. `.github` folder: Used to configure the packaging workflow
2. `.lefthook` folder, `.lefthook.yml` file: Used to configure git hooks
3. `.mise` folder, `mise.toml` file: Used to configure the mise(-en-place) tool and development environment
4. `cliff.toml` file: Used to generate the CHANGELOG.md file

### Installation Steps

The following covers self-use scenarios only:

1. Locate the following path in your SiYuan workspace: `<workspace>/data/plugins/`, and create a folder whose name matches the `name` field in `plugin.json`
2. Copy the project files into that folder
3. Enable the plugin in SiYuan Note, reopen the bazaar's installed tab, and verify that the plugin is successfully enabled
4. Check whether the fonts have changed

Required files: `plugin.json`, `index.js`, `index.css`, `style.css`, `fonts/*`, `icon.png`, `preview.png`

## Reference

| Item                    | Description                                                                                                      |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Font format             | `woff` or `woff2` is recommended, as they are optimized for browsers                                             |
| mise.toml               | mise configuration file for managing runtime tools (tools used during development)                               |
| `name` in `plugin.json` | The plugin's installation folder must match this name, and it is also used in path concatenation                 |
| Language reference      | Simplified Chinese: `zh-CN`, Traditional Chinese: `zh-TW`, Japanese: `ja`, other languages: no `:lang` attribute |
| Adding a language       | Non-English languages: add `:root:lang()`. English: modify `:root` directly as the default fallback              |

## Acknowledgments

Original template repository: [TCOTC/siyuan-ttf-HarmonyOS_Sans_SC-and-Twemoji](https://github.com/TCOTC/siyuan-ttf-HarmonyOS_Sans_SC-and-Twemoji)
