import {ggHelpers} from '../../../helperFunctions.js';

export async function twilightSanctuary(args) {
	const lastArg = args[args.length - 1];
	const actor = lastArg.actor;
	console.log(actor);
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
			console.log(effect);
			buttons.push([effect.label, effect])
		}
		let choice = await ggHelpers.buttonMenu('Choose Twilight Sanctuary Effect', buttons, {height: '60%'});
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
