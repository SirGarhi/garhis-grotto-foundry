import { ggHelpers } from './helperFunctions.js';
import { spellEffects } from './effects/spellEffects.js';
import { itemEffects } from './effects/itemEffects.js';
import { featureEffects } from './effects/featureEffects.js';
import { convenientEffects } from './effects/convenientEffects.js';

export let effects = {
	'spell': spellEffects,
	'item': itemEffects,
	'feature': featureEffects,
	'updateConvenientEffects': updateConvenientEffects
}

async function updateConvenientEffects() {
	for (let effect of convenientEffects) {
		let existingEffect = game.dfreds.effectInterface.findCustomEffectByName(effect.label);
		if(!existingEffect) {
			await game.dfreds.effectInterface.createNewCustomEffectsWith({ activeEffects: [effect] });
		} else {
			await ggHelpers.updateEffect(existingEffect, effect);
		}
	}
}
