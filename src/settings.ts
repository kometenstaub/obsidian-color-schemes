import { App, PluginSettingTab, Setting } from 'obsidian';
import type ColorSchemePlugin from './main';

export default class TemplateSettingTab extends PluginSettingTab {
	plugin: ColorSchemePlugin;

	constructor(app: App, plugin: ColorSchemePlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;
		const { settings } = this.plugin;

		containerEl.empty();

		containerEl.createEl('h2', {
			text: ' ... Settings',
		});

		// keys for YAML
		new Setting(containerEl)
			.setName('')
			.setDesc('')
			.addText((text) => {
				text.setPlaceholder('')
					.setValue(settings.homeNote)
					.onChange(async (value) => {
						settings.homeNote = value.trim();
						await this.plugin.saveSettings();
					});
			});
	}
}
