import { ggHelpers } from "../../helperFunctions.js";
async function awaken(args) {
	let lastArg = args[args.length-1];
	let breathData = await ggHelpers.getItemFromCompendium('garhis-grotto.gg-item-blueprints', "Winter's Breath", false);
	if (!breathData) return;
	let token = canvas.tokens.get(lastArg.tokenId)
	let actorUpdates = {
		'embedded': {
			'Item': {
				[breathData.name]: breathData,
			}
		}
	}
	let options = {
		'permanent': false,
		'name': 'Awakened',
		'description': 'Adds Winter\'s Breath as a feature to the character sheet.'
	}
	await warpgate.mutate(token.document, actorUpdates, {}, options);
}
export let blueMoon = {
	'awaken': awaken
}
