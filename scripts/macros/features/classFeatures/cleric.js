import { ggHelpers } from '../../../helperFunctions.js';
import { effects } from '../../../effects.js';

async function twilightSanctuary(args) {
	const lastArg = args[args.length - 1];
	const actor = lastArg.actor;
	// console.log(actor);
	let removePotentials = [];
	let sourceActor;
	for (let effect of actor.effects) {
		if (effect.label === 'Twilight Sanctuary') {
			sourceActor = await fromUuid(effect.origin);
		} else {
			if (effect.label === 'Frightened' || effect.label === 'Charmed') {
				removePotentials.push(effect);
			}
		}
	}
	let applyHitpoints;
	if (removePotentials.length > 0) {
		let buttons = [['Tempory Hitpoints', 'tempHp']];
		for (let effect of removePotentials) {
			// console.log(effect);
			buttons.push([effect.label, effect])
		}
		let choice = await ggHelpers.buttonMenu('Choose Twilight Sanctuary Effect', buttons);
		if ( choice === 'tempHp' ) {
			applyHitpoints = true;
		} else {
			await ggHelpers.removeEffect(choice);
		}
	} else {
		applyHitpoints = true;
	}
	if (applyHitpoints) {
		sourceActor = sourceActor.actor;
		let levelMod = sourceActor.classes?.cleric?.system.levels;
		if (!levelMod) {
			levelMod = '';
		} else {
			levelMod = '+'+levelMod
		}
		let damageFormula = { parts: [["1d6"+levelMod, "temphp"]] };
		const itemData = {
			name: "Twilight Sanctuary Pulse",
			img: "icons/magic/light/explosion-star-teal-purple.webp",
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
		const tempItem = new CONFIG.Item.documentClass(itemData, { parent: sourceActor });
		const config = {};
		const options = { targetUuids: [lastArg.tokenUuid], showFullCard: false, createWorkflow: true, versatile: false, configureDialog: false };
		await MidiQOL.completeItemUse(tempItem, config, options);	
	}
}

async function emboldeningBond(args) {
	game.user?.targets.forEach(t => {
		t.setTarget(false, { releaseOthers: false });
	});
	game.user?.targets.clear();	
	const lastArg = args[args.length - 1];
	const token = canvas.tokens.get(lastArg.tokenId);
	let nearbyTargets = ggHelpers.findNearby(token, 30, 'nonHostile');
	nearbyTargets.push(token);
	let buttons = [{label: 'Apply to Selected', value: true},{label: 'Cancel', value: false}];
	const maxTargets = lastArg.actor.system.attributes.prof;
	let chosenTargets = await ggHelpers.selectTarget(`Emboldening Bond Targets (Max: ${maxTargets})`, buttons, nearbyTargets, false, true);
	if (chosenTargets) {
		if (!chosenTargets.buttons) return;
		let numSelectedTargets = chosenTargets.inputs.filter(val => val !== false).length;
		while(numSelectedTargets > maxTargets) {
			chosenTargets = await ggHelpers.selectTarget(`Chose Too Many Targets! (Max: ${maxTargets})`, buttons, nearbyTargets, false, true);
			if (!chosenTargets) return;
			if (!chosenTargets.buttons) return;
			numSelectedTargets = chosenTargets.inputs.filter(val => val !== false).length;
		}
		for (let target of chosenTargets.inputs) {
			if (target) {
				let targetToken = canvas.tokens.get(target);
				targetToken.setTarget(true, { user: game.user, releaseOthers: false });
			}
		}
	}
}

export let cleric = {
	'twilightSanctuary': twilightSanctuary,
	'emboldeningBond' : emboldeningBond
}
