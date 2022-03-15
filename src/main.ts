import { App, Plugin } from 'obsidian';
import type { ColorSchemeSettings } from './interfaces';
import TemplateSettingTab from './settings';
import {applyAllCss} from "./utils";
import {DEFAULT_SETTINGS} from "./interfaces";


export default class ColorSchemePlugin extends Plugin {
	//@ts-expect-error,...
	settings: ColorSchemeSettings;

	async onload() {
		console.log('loading Color Schemes plugin');

		await this.loadSettings();

		this.addSettingTab(new TemplateSettingTab(this.app, this));

		applyAllCss(this.settings)

	}

	onunload() {
		console.log('unloading Color Schemes plugin');
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
