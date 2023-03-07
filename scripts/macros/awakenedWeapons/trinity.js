import { ggHelpers } from "../../helperFunctions.js";

async function awaken(args) {
	let lastArg = args[args.length-1];
	let spellData = await ggHelpers.getItemFromCompendium('garhis-grotto.gg-item-blueprints', "Thor's Wrath", false);
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
		'name': 'Awakened',
		'description': 'Adds Thor\'s Wrath as a spell to the character sheet.'
	}
	await warpgate.mutate(token.document, actorUpdates, {}, options);
}

async function giantsBane(workflow) {
	// console.log(workflow);
	if (workflow.item.name !== 'Trinity') return;
	if (workflow.hitTargets.size !== 1) return;
	let token = workflow.token.document;
	let targetToken =  workflow.hitTargets.first().document;
	if( (targetToken.height > token.height) || (targetToken.width > token.width) ) {
		let damage = `${(workflow.isCritical ? 2 : 1)}d8[bludgeoning]`;
		const animFile = 'jb2a.hammer.melee.01.blue.2';
		const animation = Sequencer.Database.entryExists(animFile);
		if (animation) {
			new Sequence()
			.effect()
			.file(animation)
			.atLocation(workflow.hitTargets.first())
			.play();
		}
		return {damageRoll: damage, flavor: "Giant's Bane"};
	}

}

export let trinity = {
	'awaken': awaken,
	'giantsBane': giantsBane
}
