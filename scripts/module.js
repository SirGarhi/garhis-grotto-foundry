import { registerSettings } from './settings.js';
import {macros, setupWorldMacros, setupMacroFolder} from './macros.js';
import {effects} from './effects.js';
import {ggHelpers} from './helperFunctions.js';

Hooks.once('init', async function() {
	console.warn("GG | Garhi's Grotto Initializing");
	registerSettings();
});
Hooks.once('ready', async function() {
	if (game.user.isGM) {
		await setupMacroFolder();
		await setupWorldMacros();
		await ggHelpers.createWorldActors();
	}
	if (game.settings.get('garhis-grotto', 'Rage Automation')) { Hooks.on('midi-qol.RollComplete', macros.features.class.barbarian.handleRoll);
	}
});

globalThis['garhisGrotto'] = {
	helpers: ggHelpers,
	macros: macros,
	effects: effects
}
