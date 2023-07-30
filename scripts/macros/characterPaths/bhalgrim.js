import {ggHelpers} from '../../helperFunctions.js';

async function richochetAttack({speaker, actor, token, character, item, args}) {
	const lastArg = args[args.length-1];
	if (lastArg.itemData.system.actionType !== 'mwak') return;
	if( lastArg.hitTargets.length > 0 ) {
		let target = canvas.tokens.get(lastArg.hitTargets[0].id ?? args[0].hitTargets[0]._id);
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
			const tempItem = item.clone({ "name": 'Richochet' });
			tempItem.flags["midi-qol"].onUseMacroParts.items = tempItem.flags["midi-qol"].onUseMacroParts.items.slice(1);
			await MidiQOL.completeItemUse(tempItem, config, options);
			let origin = canvas.tokens.get(lastArg.hitTargets[0].id ?? args[0].hitTargets[0]._id);
			let splashTarget = await fromUuid(splashTargetId);
			if (game.modules.get("sequencer")?.active) {
				const animation = Sequencer.Database.entryExists("jb2a.hammer.throw");
				if (animation) {
					new Sequence()
						.effect()
						.atLocation(origin)
						.stretchTo(splashTarget)
						.file("jb2a.hammer.throw")
						.repeats(1, 200, 300)
						.randomizeMirrorY()
						.play();
				}
			}
		}
	}
}

async function richochetDamage({speaker, actor, token, character, item, args}) {
	if (item.name === 'Richochet') {
		this.damageItem.hpDamage = Math.min(Math.floor(this.damageItem.appliedDamage/2),this.damageItem.hpDamage);
	}
}

async function mount({speaker, actor, token, character, item, args}) {
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
