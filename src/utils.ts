import type { ColorSchemeSettings } from './interfaces';

export function applyAllCss(settings: ColorSchemeSettings) {
	let styleText = '.theme-light.theme-light {\n';
	for (const [key, value] of Object.entries(settings.lightVars)) {
		styleText += `${key}: ${value};\n`;
	}
	styleText += '}\n\n.theme-dark.theme-dark {\n';
	for (const [key, value] of Object.entries(settings.darkVars)) {
		styleText += `${key}: ${value};\n`;
	}
	styleText += '}\n';

	// create a style element
	//@ts-expect-error,...
	document.documentElement
		.querySelector('head')
		.createEl('style', { type: 'text/css', text: styleText }).id =
		'color-styles';
	/*
	let root = getRoot('light')
	if (root !== null) {
		for (const [key, value] of Object.entries(settings.lightVars)) {
			root.style.setProperty(key, value);
		}
	} else {
		root = getRoot('dark')
		for (const [key, value] of Object.entries(settings.darkVars)) {
			root?.style.setProperty(key, value);
		}
	}
	 */
}

// hacky, but should yield better performance when only changing an element
// requires reload to only work for chosen mode

export function applySingleCss(mode: string, key: string, value: string) {
	const root = getRoot(mode);
	root?.style.setProperty(key, value);
}

function getRoot(mode: string): HTMLElement | null {
	return document.querySelector(`:root .theme-${mode}`);
}

export function removeStyleTag() {
	document.querySelector('#color-styles')?.detach();
}
