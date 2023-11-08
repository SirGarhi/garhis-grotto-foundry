import {ggHelpers} from '../../helperFunctions.js';

function sequencerEffect(target, origin = null) {
	if (game.modules.get("sequencer")?.active) {
		const animFile = 'jb2a.chain_lightning.secondary.blue';
		const secondary = Sequencer.Database.entryExists(animFile);
		if (secondary) {
		new Sequence()
			.effect()
			.atLocation(origin)
			.stretchTo(target)
			.file(animFile)
			.repeats(1, 200, 300)
			.randomizeMirrorY()
			.play();
		}
	}
}

async function electricArcItem({speaker, actor, token, character, item, args, scope, workflow}) {
	// console.log(actor);
	// console.log(workflow);
	if (workflow.hitTargets.size <1) return;
	let itemData = await ggHelpers.getItemFromCompendium('garhis-grotto.gg-item-blueprints', 'Electric Arc Jump');
	if (!itemData) return;
	itemData.flags['garhis-grotto'] = {
		'jumpAttackRoll': workflow.attackRoll
	};
	let target = canvas.tokens.get(workflow.hitTargets.first().id ?? args[0].hitTargets[0]._id);
		let nearbyTargets = ggHelpers.findNearby(target, 15, 'all');
		let buttons = [{label: 'Arc Damage', value: true},{label: 'No Damage', value: false}];
		let chosenTargets = await ggHelpers.selectTarget('Arc Damage Target', buttons, nearbyTargets, false);
		if (chosenTargets) {
			if (!chosenTargets.buttons) return;
			let splashTargetId = nearbyTargets[chosenTargets.inputs.indexOf(true)].document.uuid;
			if (!splashTargetId) {
				console.warn("GG | Electric Arc - Couldn't find splashTargetId")
				return;
			}
			const tempItem = new CONFIG.Item.documentClass(itemData, { parent: actor });
			console.log(tempItem);
			const config = {};
			const options = { targetUuids: [splashTargetId], showFullCard: false, createWorkflow: true, versatile: false, configureDialog: false, workflowOptions: {attackRollDSN: false} };
			await MidiQOL.completeItemUse(tempItem, config, options);
			let splashTarget = await fromUuid(splashTargetId);
			sequencerEffect(splashTarget, target);
		}
}

async function electricArcJump({speaker, actor, token, character, item, args, scope, workflow}) {
	// console.log(item);
	workflow.setAttackRoll(item.flags['garhis-grotto'].jumpAttackRoll);
}

export let electricArc = {
	'item': electricArcItem,
	'jump': electricArcJump
}
