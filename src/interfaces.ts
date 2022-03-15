import {DARK_VARS, LIGHT_VARS} from "./constants";

export interface ColorSchemeSettings {
	darkVars: Record<string, string>;
	lightVars: Record<string, string>;
}
export const DEFAULT_SETTINGS: ColorSchemeSettings = {
	lightVars: LIGHT_VARS,
	darkVars: DARK_VARS,
};
