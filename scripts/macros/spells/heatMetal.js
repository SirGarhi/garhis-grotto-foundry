import {ggHelpers} from '../../helperFunctions.js';

export async function heatMetal({speaker, actor, token, character, item, args, scope, workflow}) {
	let attackData = await ggHelpers.getItemFromCompendium('garhis-grotto.gg-item-blueprints', 'Heat Metal Flareup', false);
	let damage = { parts: [[`${workflow.castData.castLevel}d8`, "fire"]], versatile: "" };
	attackData.system.damage = damage;
	let actorUpdates = {
		'embedded': {
			'Item': {
				[attackData.name]: attackData
			},
		}
	}
	let options = {
		'permanent': false,
		'name': 'Heat Metal',
		'description': 'Provides the Heat Metal Flareup Attack'
	}
	await warpgate.mutate(token.document, actorUpdates, {}, options);

	const heatMetal = lastArg.actor.items.getName("Heat Metal Flareup");
	if (heatMetal) heatMetal.use();
}
