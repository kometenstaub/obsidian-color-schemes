import { App, Plugin } from 'obsidian';
import type { ColorSchemeSettings } from './interfaces';
import ColorSchemeSettingsTab from './settings';
import {applyAllCss, removeStyleTag} from "./utils";
import {DEFAULT_SETTINGS} from "./interfaces";


export default class ColorSchemePlugin extends Plugin {
	//@ts-expect-error,...
	settings: ColorSchemeSettings;
	settingsTab!: ColorSchemeSettingsTab;

	async onload() {
		console.log('loading Color Schemes plugin');

		await this.loadSettings();

		this.settingsTab = new ColorSchemeSettingsTab(this.app, this)

		this.addSettingTab(this.settingsTab);

		applyAllCss(this.settings)

	}

	onunload() {
		console.log('unloading Color Schemes plugin');
		removeStyleTag()
	}

	async loadSettings() {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			await this.loadData()
		);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}
