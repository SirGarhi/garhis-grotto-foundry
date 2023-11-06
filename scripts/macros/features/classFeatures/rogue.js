import {ggHelpers} from '../../../helperFunctions.js';

async function sneakAttack({speaker, actor, token, character, item, args, scope, workflow}) {
	if (!["mwak","rwak"].includes(item.system.actionType)) return {};
	if (item.system.actionType === "mwak" && !item.system.properties?.fin) 
		return {};
	if (workflow.hitTargets.size < 1) return {};
	if (!actor || !token || workflow.hitTargets.size < 1) return {};
	if (!actor.system.scale.rogue['sneak-attack']) {
		ui.notifications.warn("Sneak Attack: No Sneak Attack Scale Found");
		return {};
	}
	let numDice = actor.system.scale.rogue['sneak-attack'].number;
	const sizeDice = actor.system.scale.rogue['sneak-attack'].faces;
	let target = workflow.hitTargets.first();
	if (!target) ui.notifications.error("Sneak Attack macro failed, invalid target");
	
	if (!ggHelpers.perTurnCheck(actor, 'class', 'sneakAttack', false, token.id)) {
		console.warn('GG | Sneak Attack: Per Turn Check Failed');
		return {};
	}
	if (workflow.disadvantage) return {};
	let isSneak = workflow.advantage;
	if (!isSneak) {
		if (workflow.item.system.activation.condition === 'Always Sneak') {
			isSneak = true;
		}
	}
	let foundEnemy = false;
	if (!isSneak) {
		let nearbyEnemies = MidiQOL.findNearby(-1, target, 5);
		if (nearbyEnemies.length < 1) return;
		if (nearbyEnemies.length < 2) {
			let nearbyToken = nearbyEnemies[0];
			if (nearbyToken.id !== token.id) {
				foundEnemy = true;
				isSneak = true;
			} else {
				isSneak = MidiQOL.checkNearby(0, target, 5);
			}

		} else {
			foundEnemy = true;
			isSneak = true;
		}
	}
	if (!isSneak) {
		if (actor.items.find( itm => itm.name === 'Rakish Audacity')) {
			isSneak = ((MidiQOL.getDistance(token, target, true) <= 5) && (MidiQOL.findNearby(null, token, 5).length === 1))
		}
	}
	if (!isSneak) {
		console.warn("GG | Sneak Attack: No advantage and no ally next to target");
		return {};
	}
	let useSneak = getProperty(actor, "flags.dae.autoSneak");
	if (!useSneak) {
		useSneak = await ggHelpers.buttonMenu('Use Sneak Attack?', [
			['Yes', true],
			['No', false]
		]);
	}
	if (!useSneak) return {}
	if (workflow.isCritical) numDice = numDice * 2;
	const animFile = 'jb2a.sneak_attack.orange';
	const animation = Sequencer.Database.entryExists(animFile);
	if (animation) {
		new Sequence()
		.effect()
		.file(animation)
		.atLocation(target)
		.play();
	}
	if (ggHelpers.inCombat()) {
		await actor.setFlag('garhis-grotto', 'class.sneakAttack.turn', `${game.combat.round}-${game.combat.turn}`);
	}
	return {damageRoll: `${numDice}d${sizeDice}[${workflow.defaultDamageType}]`, flavor: "Sneak Attack"};
}

export let rogue = {
	'sneakAttack': sneakAttack
}
