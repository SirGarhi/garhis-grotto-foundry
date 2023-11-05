import { ggHelpers } from "../../helperFunctions.js";

export async function spiritGuardians(args) {
	let lastArg = args[args.length-1];
	let spellData = await ggHelpers.getItemFromCompendium('garhis-grotto.gg-item-blueprints', 'Spirit Guardians Pulse', false);
	if (!spellData) return;
	let damage = { parts: [[`${lastArg.castData.castLevel}d8`, 'radiant']]};
	spellData.damage = damage;
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
		'name': 'Spirit Guardians',
		'description': 'Adds Spirit Guardian Pulse'
	}
	await warpgate.mutate(token.document, actorUpdates, {}, options);
}
