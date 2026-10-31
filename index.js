module.exports = class FontTemplatePlugin extends require('siyuan').Plugin {
  pluginName = 'siyuan-ttf-template';

  onload() {
    console.log(`${this.pluginName}: loaded.`);
  }

  onunload() {
    console.log(`${this.pluginName}: unloaded.`);
  }

  uninstall() {
    console.log(`${this.pluginName}: uninstall.`);
  }
};
