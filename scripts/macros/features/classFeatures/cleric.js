import { ggHelpers } from '../../../helperFunctions.js';
import { effects } from '../../../effects.js';

async function twilightSanctuaryPulse({speaker, actor, token, character, item, args}) {
	const lastArg = args[args.length - 1];
	// console.log(actor);
	let removePotentials = [];
	let sourceActor;
	for (let effect of actor.effects) {
		if (effect.label === 'Twilight Sanctuary Pulse') {
			sourceActor = await fromUuid(effect.origin);
			sourceActor = ggHelpers.tokenOrActor(sourceActor);
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
		// console.log(sourceActor);
		let levelMod = sourceActor.classes?.cleric?.system.levels;
		if (!levelMod) {
			levelMod = '';
		} else {
			levelMod = '+'+levelMod
		}
		let damageFormula = { parts: [["1d6"+levelMod, "temphp"]] };
		const itemData = {
			name: "Temporary Hitpoints",
			img: "icons/magic/light/explosion-star-teal-purple.webp",
			type: "weapon",
			effects: [],
			flags: {
				"midiProperties": {
					magicdam: true
				},
				"autoanimations": {
					"menu": "ontoken",
					"primary": {
					  "video": {
						"dbSection": "static",
						"menuType": "spell",
						"animation": "curewounds",
						"variant": "01",
						"color": "purple",
						"enableCustom": false,
						"customPath": ""
					  }
					},
					"isEnabled": true,
					"isCustomized": true,
					"fromAmmo": false,
					"version": 5
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

async function twilightSanctuaryItem(workflow) {
	let effect = ggHelpers.findEffect(workflow.actor, 'Twilight Sanctuary Pulse');
	if (effect) {
		let updates = {
			'origin': workflow.actor.uuid
		}
		await ggHelpers.updateEffect(effect, updates);
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
	let chosenTargets = await ggHelpers.selectTarget(`Emboldening Bond Targets (Max: ${maxTargets})`, buttons, nearbyTargets, true);
	if (chosenTargets) {
		if (!chosenTargets.buttons) return;
		let numSelectedTargets = chosenTargets.inputs.filter(val => val !== false).length;
		while(numSelectedTargets > maxTargets) {
			chosenTargets = await ggHelpers.selectTarget(`Chose Too Many Targets! (Max: ${maxTargets})`, buttons, nearbyTargets, true);
			if (!chosenTargets) return;
			if (!chosenTargets.buttons) return;
			numSelectedTargets = chosenTargets.inputs.filter(val => val !== false).length;
		}
		for (let i = 0; i < chosenTargets.inputs.length; i++) {
			if (chosenTargets.inputs[i]) {
				let targetToken = nearbyTargets[i];
				targetToken.setTarget(true, { user: game.user, releaseOthers: false });
			}
		}
	}
}

export let cleric = {
	'twilightSanctuary': {
		'item': twilightSanctuaryItem,
		'pulse': twilightSanctuaryPulse
	},
	'emboldeningBond' : emboldeningBond
}
