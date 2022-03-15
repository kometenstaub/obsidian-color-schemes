// https://github.com/mgmeyers/obsidian-style-settings/blob/0bd458a1c366dadf6ec68a73e3fae2ac3da91873/src/main.ts#L358
import {ItemView, WorkspaceLeaf} from "obsidian";
import type ColorSchemePlugin from "./main";
import ColorSchemeSettingsTab from "./settings";
import {viewType} from "./constants";

export default class SettingsView extends ItemView {
	settingsMarkup: ColorSchemeSettingsTab;
	plugin: ColorSchemePlugin;

	constructor(plugin: ColorSchemePlugin, leaf: WorkspaceLeaf) {
		super(leaf);
		this.plugin = plugin;
		this.settingsMarkup = new ColorSchemeSettingsTab(this.app, this.plugin, this.contentEl)
	}

	getViewType() {
		return viewType;
	}

	getIcon() {
		return "gear";
	}

	getDisplayText() {
		return "Color Settings";
	}

	async onOpen() {
		return this.settingsMarkup.display();
	}

}
