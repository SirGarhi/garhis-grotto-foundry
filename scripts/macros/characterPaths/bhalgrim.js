import {ggHelpers} from '../../helperFunctions.js';

async function richochetAttack({speaker, actor, token, character, item, args, scope, workflow}) {
	// console.log(item);
	if (item.system.actionType !== 'mwak') return;
	if( workflow.hitTargets.size > 0 ) {
		let target = canvas.tokens.get(workflow.hitTargets.first().id ?? args[0].hitTargets[0]._id);
		let nearbyTargets = ggHelpers.findNearby(target, 10, 'nonHostile');
		if (nearbyTargets.length < 1) return;
		let buttons = [{label: 'Richochet Attack', value: true},{label: 'No Richochet', value: false}];
		let chosenTargets = await ggHelpers.selectTarget('Richochet Target', buttons, nearbyTargets, false);
		if (chosenTargets) {
			if (!chosenTargets.buttons) return;
			let splashTargetId = nearbyTargets[chosenTargets.inputs.indexOf(true)].document.uuid;
			if (!splashTargetId) return;
			const config = {};
			const options = { targetUuids: [splashTargetId], showFullCard: false, createWorkflow: true, versatile: false, configureDialog: false };
			let tempItem = item.clone({ "name": 'Richochet', "flags.autoanimations.isEnabled": false });
			tempItem.flags["midi-qol"].onUseMacroParts.items = tempItem.flags["midi-qol"].onUseMacroParts.items.slice(1);
			// console.log(actor);
			tempItem.system.attackBonus = tempItem.system.attackBonus + actor.system.attributes.prof;
			// console.log(tempItem);
			await MidiQOL.completeItemUse(tempItem, config, options);
			// let origin = canvas.tokens.get(workflow.hitTargets.first().id ?? args[0].hitTargets[0]._id);
			let splashTarget = await fromUuid(splashTargetId);
			if (game.modules.get("sequencer")?.active) {
				let animFile;
				switch (workflow.defaultDamageType) {
					case 'slashing':
						animFile = 'jb2a.handaxe.throw.01';
						break;
					case 'bludgeoning':
					default:
						animFile = 'jb2a.hammer.throw';
				}
				const animation = Sequencer.Database.entryExists(animFile);
				if (animation) {
					new Sequence()
						.effect()
						.atLocation(target)
						.stretchTo(splashTarget)
						.file(animFile)
						.repeats(1, 200, 300)
						.randomizeMirrorY()
						.play();
				}
			}
		}
	}
}

async function richochetDamage({speaker, actor, token, character, item, args, scope, workflow}) {
	if (item.name === 'Richochet') {
		workflow.damageItem.hpDamage = Math.min(Math.floor(workflow.damageItem.appliedDamage/2),workflow.damageItem.hpDamage);
	}
}

async function mount({speaker, actor, token, character, item, args, scope, workflow}) {
	let updates = {
		'token': {
			'texture': {
				'src': 'modules/garhis-grotto/assets/art/pcs/bhalgrim/BhalgrimMountedToken.webp',
				'scaleX': 0.9,
				'scaleY': 0.9
			},
			'width': 2,
			'height': 2
		},
		'actor': {
			'system.attributes.movement.walk': 60
		}
	};
	let options = {
		'permanent': false,
		'name': 'Mounted',
		'description': 'Mounted up on Rupert'
	};
	await warpgate.mutate(token.document, updates, {}, options);
}

export let bhalgrim = {
	'richochet': {
		'attack': richochetAttack,
		'damage': richochetDamage
	},
	'rupert': {
		'mount': mount
	}
}
