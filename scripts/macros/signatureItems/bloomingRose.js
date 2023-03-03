﻿
import {ggHelpers} from '../../helperFunctions.js';
async function petalSlash(args) {
	const lastArg = args[args.length-1];
	if ( !(lastArg.hitTargets.length > 0) || lastArg.isFumble ) return;
	let target = canvas.tokens.get(lastArg.hitTargets[0].id ?? args[0].hitTargets[0]._id);
	let nearbyTargets = ggHelpers.findNearby(target, 5, 'ally');
	console.log(nearbyTargets);
	nearbyTargets.push(target);
	let buttons = [{label: 'Apply Damage', value: true},{label: 'No Damage', value: false}];
	let chosenTargets = await ggHelpers.selectTarget('Petal Slash Target', buttons, nearbyTargets, true, false);
	if (chosenTargets) {
		if (!chosenTargets.buttons) return;
		let splashTargetId = chosenTargets.inputs.find( val => val !== false )
		if (!splashTargetId) return;
		let actor = await ggHelpers.tokenOrActor(await fromUuid(lastArg.actorUuid));
		let damageFormula = { parts: [['1d4', 'slashing']] };
		const itemData = {
			name: "Petal Slash",
			img: "icons/commodities/flowers/daisies-pink.webp",
			type: "weapon",
			effects: [],
			flags: {
				"midiProperties": {
					magicdam: true
				}
			},
			system: {
				actionType: "other",
				damage: damageFormula,
				duration: {units: "inst", value: undefined},
				description: {value: "" }
			}
		};
		const tempItem = new CONFIG.Item.documentClass(itemData, { parent: actor });
		const config = {};
		const options = { targetUuids: [splashTargetId], showFullCard: false, createWorkflow: true, versatile: false, configureDialog: false };
		await MidiQOL.completeItemUse(tempItem, config, options);
		let splashTarget = await fromUuid(splashTargetId);
		let origin = canvas.tokens.get(lastArg.tokenId);
		const animation = Sequencer.Database.entryExists('jb2a.swirling_leaves.ranged.orangepink');
		if (animation) {
			new Sequence()
			.effect()
			.atLocation(origin)
			.stretchTo(splashTarget)
			.file(animation)
			.repeats(1, 200, 300)
			.randomizeMirrorY()
			.play();
		}
	}
}

async function item(args) {
	const lastArg = args[args.length-1];
	const animation = Sequencer.Database.entryExists('jb2a.sword.melee.01.white.5');
	if (animation) {
		const origin = canvas.tokens.get(lastArg.tokenId);
		if (lastArg.hitTargets.length === 0) return;
		new Sequence()
			.effect()
			.atLocation(origin)
			.stretchTo(lastArg.hitTargets[0])
			.file(animation)
			.repeats(1, 200, 300)
			.randomizeMirrorY()
			.play();	
	}
}
export let bloomingRose = {
	'petalSlash': petalSlash,
	'item': item
}
