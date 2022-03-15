import { DARK_VARS, LIGHT_VARS } from './constants';

// default settings

export const DEFAULT_SETTINGS: ColorSchemeSettings = {
	lightVars: LIGHT_VARS,
	darkVars: DARK_VARS,
};

// interfaces

export interface ColorSchemeSettings {
	darkVars: Record<string, string>;
	lightVars: Record<string, string>;
}
