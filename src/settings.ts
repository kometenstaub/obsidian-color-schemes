import {App, ButtonComponent, Modal, PluginSettingTab, Setting, TextAreaComponent} from 'obsidian';
import type ColorSchemePlugin from './main';
import {applyAllCss, applySingleCss, removeStyleTag} from "./utils";
import {ColorSchemeSettings, DEFAULT_SETTINGS} from "./interfaces";

export default class ColorSchemeSettingsTab extends PluginSettingTab {
	plugin: ColorSchemePlugin;
	containerEl!: HTMLElement;

	constructor(app: App, plugin: ColorSchemePlugin, containerEl?: HTMLElement) {
		super(app, plugin);
		this.plugin = plugin;
		// if given, settings will be added to that element, like a leaf
		if (containerEl) {
			this.containerEl = containerEl
		}
	}

	display(): void {
		const { containerEl } = this;
		const { settings } = this.plugin;

		containerEl.empty();

		containerEl.createEl('h2', {
			text: ' Color Scheme',
		});


		// from Obsidian Style settings by mgmeyers, slightly modified, 2022/03/15
		new Setting(containerEl).then((setting) => {
			// Build and import link to open the import modal
			setting.controlEl.createEl('span', {text: 'You may need to reload Obsidian after importing',
			cls: 'color-settings-notice'})
			setting.controlEl.createEl(
				"a",
				{
					cls: "color-settings-import",
					text: "Import",
					href: "#",
				},
				(el) => {
					el.addEventListener("click", (e) => {
						e.preventDefault();
						new ImportModal(this.app, this.plugin).open()
					});
				}
			);

			// Build and export link to open the export modal
			setting.controlEl.createEl(
				"a",
				{
					cls: "color-settings-export",
					text: "Export",
					href: "#",
				},
				(el) => {
					el.addEventListener("click", (e) => {
						e.preventDefault();
						new ExportModal(this.app, this.plugin, this.plugin.settings).open()
					});
				}
			);
		});
		// end of Obsidian Style settings by mgmeyers, slightly modified, 2022/03/15


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
							if (mode === this.plugin.settings.lightVars) {
								if (value.trim() === '') {
									this.plugin.settings.lightVars[currentKey] = DEFAULT_SETTINGS.lightVars[currentKey]
									await this.plugin.saveSettings();
									applySingleCss('light', Object.keys(mode)[i], DEFAULT_SETTINGS.lightVars[currentKey])
									// doesn't work
									//text.inputEl.onblur = () => text.setValue(DEFAULT_SETTINGS.lightVars[currentKey])
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
									// doesn't work
									//text.inputEl.onblur = () => text.setValue(DEFAULT_SETTINGS.lightVars[currentKey])
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


// from Obsidian Style settings by mgmeyers, slightly modified, 2022/03/15
export class ExportModal extends Modal {
	plugin: ColorSchemePlugin;
	config: ColorSchemeSettings;

	constructor(
		app: App,
		plugin: ColorSchemePlugin,
		config: ColorSchemeSettings
	) {
		super(app);
		this.plugin = plugin;
		this.config = config;
	}

	onOpen() {
		const { contentEl, modalEl } = this;

		modalEl.addClass("modal-color-settings");

		new Setting(contentEl)
			.setName('Export settings')
			.then((setting) => {
				const output = JSON.stringify(this.config, null, 2);

				// Build a copy to clipboard link
				setting.controlEl.createEl(
					"a",
					{
						cls: "color-settings-copy",
						text: "Copy to clipboard",
						href: "#",
					},
					(copyButton) => {
						new TextAreaComponent(contentEl)
							.setValue(output)
							.then((textarea) => {
								copyButton.addEventListener("click", async (e) => {
									e.preventDefault();

									// Select the textarea contents and copy them to the clipboard
									const content = textarea.inputEl.value
									await navigator.clipboard.writeText(content)

									copyButton.addClass("success");

									setTimeout(() => {
										// If the button is still in the dom, remove the success class
										if (copyButton.parentNode) {
											copyButton.removeClass("success");
										}
									}, 2000);
								});
							});
					}
				);

				// Build a download link
				setting.controlEl.createEl("a", {
					cls: "color-settings-download",
					text: "Download",
					attr: {
						download: "color-settings.json",
						href: `data:application/json;charset=utf-8,${encodeURIComponent(
							output
						)}`,
					},
				});
			});
	}

	onClose() {
		const { contentEl } = this;
		contentEl.empty();
	}
}

 class ImportModal extends Modal {
	plugin: ColorSchemePlugin;

	constructor(app: App, plugin: ColorSchemePlugin) {
		super(app);
		this.plugin = plugin;
	}

	onOpen() {
		const { contentEl, modalEl } = this;

		modalEl.addClass("modal-color-settings");

		new Setting(contentEl)
			.setName("Import color setting")
			.setDesc(
				"Import an entire configuration. Warning: this may override existing settings"
			);

		new Setting(contentEl).then((setting) => {
			// Build an error message container
			const errorSpan = createSpan({
				cls: "color-settings-import-error",
				text: "Error importing config",
			});

			setting.nameEl.appendChild(errorSpan);

			// Attempt to parse the imported data and close if successful
			const importAndClose = async (str: string) => {
				if (str) {
					try {
						this.plugin.settings = JSON.parse(str) as ColorSchemeSettings
						await this.plugin.saveSettings()

						// need to reload the new CSS
						console.log('hello')
						removeStyleTag()
						applyAllCss(this.plugin.settings)

						this.plugin.settingsTab.display();
						this.close();
					} catch (e) {
						errorSpan.addClass("active");
						errorSpan.setText(`Error importing color settings: ${e}`);
					}
				} else {
					errorSpan.addClass("active");
					errorSpan.setText(`Error importing color settings: config is empty`);
				}
			};

			// Build a file input
			setting.controlEl.createEl(
				"input",
				{
					cls: "color-settings-import-input",
					attr: {
						id: "color-settings-import-input",
						name: "color-settings-import-input",
						type: "file",
						accept: ".json",
					},
				},
				(importInput) => {
					// Set up a FileReader so we can parse the file contents
					importInput.addEventListener("change", (e) => {
						const reader = new FileReader();

						reader.onload = async (e: ProgressEvent<FileReader>) => {
							// @ts-expect-error,...
							await importAndClose(e.target.result.toString().trim());
						};

						// @ts-expect-error,...
						reader.readAsText((e.target as HTMLInputElement).files[0]);
					});
				}
			);

			// Build a label we will style as a link
			setting.controlEl.createEl("label", {
				cls: "color-settings-import-label",
				text: "Import from file",
				attr: {
					for: "color-settings-import-input",
				},
			});

			new TextAreaComponent(contentEl)
				.setPlaceholder("Paste config here...")
				.then((ta) => {
					new ButtonComponent(contentEl)
						.setButtonText("Save")
						.onClick(async () => {
							await importAndClose(ta.getValue().trim());
						});
				});
		});
	}

	onClose() {
		const { contentEl } = this;
		contentEl.empty();
	}
}
