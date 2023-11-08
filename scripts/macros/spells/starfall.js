import { ggHelpers } from "../../helperFunctions.js";

export async function starfall({speaker, actor, token, character, item, args, scope, workflow}) {
	let spellData = await ggHelpers.getItemFromCompendium('garhis-grotto.gg-item-blueprints', 'Starfall Impact', false);
	if (!spellData) return;
	spellData.system.level = workflow.castData.castLevel;
	spellData.system.description.value = `At the start of each of your subsequent turns, you may drop ${workflow.castData.castLevel-3} additional star impacts.`
	let actorUpdates = {
		'embedded': {
			'Item': {
				[spellData.name]: spellData
			}
		}
	}
	let options = {
		'permanent': false,
		'name': 'Starfall',
		'description': 'Adds Starfall Impact Spell'
	}
	await warpgate.mutate(token.document, actorUpdates, {}, options);
}
