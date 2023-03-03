import { registerSettings } from './settings.js';
import {macros, setupWorldMacros, setupMacroFolder} from './macros.js';
import {effects} from './effects.js';
import {ggHelpers as helpers} from './helperFunctions.js';
Hooks.once('init', async function() {
	registerSettings();
});
Hooks.once('ready', async function() {
	if (game.user.isGM) {
		await setupMacroFolder();
		await setupWorldMacros();
	}
	if (game.settings.get('garhis-grotto', 'Rage Automation')) { Hooks.on('midi-qol.RollComplete', macros.rage.handleRoll);
	}
});

globalThis['garhisGrotto'] = {
	helpers,
	macros,
	effects
}
