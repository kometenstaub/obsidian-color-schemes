import { App, PluginSettingTab, Setting } from 'obsidian';
import type ColorSchemePlugin from './main';
import { LIGHT_VARS, DARK_VARS } from './constants';
import {applyAllCss, applySingleCss} from "./utils";
import {DEFAULT_SETTINGS} from "./interfaces";
import {settings} from "cluster";

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
			text: ' Color Scheme',
		});

		containerEl.createEl('h3', {
			text: 'Light mode variables',
		});
		(async () => await this.createSettings(settings.lightVars))();
		containerEl.createEl('h3', {
			text: 'Dark mode variables',
		});
		(async () => await this.createSettings(settings.darkVars))();
	}

	async createSettings(mode: Record<string, string>) {
		for (let i = 0; i <= Object.keys(mode).length - 1; i++) {
			const currentKey = Object.keys(mode)[i]
			new Setting(this.containerEl)
				.setName(Object.keys(mode)[i])
				.addText((text) => {
					text.setValue(Object.values(mode)[i])
						.onChange(
						async (value) => {
							console.log(currentKey)
							if (mode === this.plugin.settings.lightVars) {
								if (value.trim() === '') {
									this.plugin.settings.lightVars[currentKey] = DEFAULT_SETTINGS.lightVars[currentKey]
									await this.plugin.saveSettings();
									applySingleCss('light', Object.keys(mode)[i], DEFAULT_SETTINGS.lightVars[currentKey])
								} else {
									this.plugin.settings.lightVars[currentKey] = value;
									await this.plugin.saveSettings();
									applySingleCss('light', Object.keys(mode)[i], value)
								}
							} else {
								if (value.trim() === '') {
									this.plugin.settings.darkVars[currentKey] = DEFAULT_SETTINGS.darkVars[currentKey]
									await this.plugin.saveSettings();
									applySingleCss('dark', Object.keys(mode)[i], DEFAULT_SETTINGS.darkVars[currentKey])
								} else {
									this.plugin.settings.darkVars[currentKey] = value;
									await this.plugin.saveSettings();
									applySingleCss('dark', Object.keys(mode)[i], value)
								}
							}
						}
					);
				});
		}
	}
}
