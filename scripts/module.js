import { registerSettings } from './settings.js';
import {macros, setupWorldMacros, setupMacroFolder} from './macros.js';
import {effects} from './effects.js';
import {ggHelpers} from './helperFunctions.js';

async function createWorldActors() {
	let spiritualWeapon = await ggHelpers.getItemFromCompendium('garhis-grotto.gg-actor-blueprints', 'GG - Spiritual Weapon', false, false);
	if (spiritualWeapon) {
		let existingActor = game.actors.getName('GG - Spiritual Weapon');
		if (!existingActor) {
			await Actor.create(spiritualWeapon);
		}
	}
	let cloudDaggers = await ggHelpers.getItemFromCompendium('garhis-grotto.gg-actor-blueprints', 'GG - Cloud of Daggers', false, false);
	if (cloudDaggers) {
		let existingActor = game.actors.getName('GG - Cloud of Daggers');
		if(!existingActor) {
			await Actor.create(cloudDaggers);
		}
	}
}

Hooks.once('init', async function() {
	registerSettings();
});
Hooks.once('ready', async function() {
	if (game.user.isGM) {
		await setupMacroFolder();
		await setupWorldMacros();
		await createWorldActors();
	}
	if (game.settings.get('garhis-grotto', 'Rage Automation')) { Hooks.on('midi-qol.RollComplete', macros.features.class.barbarian.handleRoll);
	}
});

globalThis['garhisGrotto'] = {
	'helpers': ggHelpers,
	macros,
	effects
}
