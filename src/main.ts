import { App, Plugin } from 'obsidian';
import type { ColorSchemeSettings } from './interfaces';
import ColorSchemeSettingsTab from './settings';
import {applyAllCss, removeStyleTag} from "./utils";
import {DEFAULT_SETTINGS} from "./interfaces";
import SettingsView from "./settings_view";
import {viewType} from "./constants";


export default class ColorSchemePlugin extends Plugin {
	//@ts-expect-error,...
	settings: ColorSchemeSettings;
	settingsTab!: ColorSchemeSettingsTab;

	async onload() {
		console.log('loading Color Schemes plugin');

		await this.loadSettings();

		this.settingsTab = new ColorSchemeSettingsTab(this.app, this)

		this.addSettingTab(this.settingsTab);

		this.registerView(viewType, (leaf) => new SettingsView(this, leaf));

		// https://github.com/mgmeyers/obsidian-style-settings/blob/0bd458a1c366dadf6ec68a73e3fae2ac3da91873/src/main.ts#L45
		// changed id and name
		this.addCommand({
			id: "show-color-settings-leaf",
			name: "Show color settings view",
			callback: () => {
				this.activateView();
			},
		});


		applyAllCss(this.settings)

	}
	deactivateView() {
		this.app.workspace.detachLeavesOfType(viewType);
	}

	//https://github.com/mgmeyers/obsidian-style-settings/blob/0bd458a1c366dadf6ec68a73e3fae2ac3da91873/src/main.ts#L156
	// also check for null
	async activateView() {
		this.deactivateView();
		const { activeLeaf } = this.app.workspace
		if (activeLeaf !== null) {
			const leaf = this.app.workspace.createLeafBySplit(
				activeLeaf,
				"vertical"
			);

			await leaf.setViewState({
				type: viewType,
			});
		} else {
			return
		}

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
