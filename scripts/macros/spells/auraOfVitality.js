import { ggHelpers } from "../../helperFunctions";

export async function auraOfVitality(args) {
	let lastArg = args[args.length-1];
	let spellData = await ggHelpers.getItemFromCompendium('garhis-grotto.gg-item-blueprints', 'Aura of Vitality Pulse', false);
	if (!spellData) return;
	let token = canvas.tokens.get(lastArg.tokenId)
	let actorUpdates = {
		'embedded': {
			'Item': {
				[spellData.name]: spellData
			}
		}
	}
	let options = {
		'permanent': false,
		'name': 'Aura of Vitality',
		'description': 'Adds Aura of Vitality Pulse'
	}
	await warpgate.mutate(token.document, actorUpdates, {}, options);
}
