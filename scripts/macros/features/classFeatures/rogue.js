import {ggHelpers} from '../../../helperFunctions.js';

async function sneakAttack(workflow) {
	if (!["mwak","rwak"].includes(workflow.item.system.actionType)) return {};
	if (workflow.item.system.actionType === "mwak" && !workflow.item.system.properties?.fin) 
		return {};
	if (workflow.hitTargets.size < 1) return {};
	let token = workflow.token;
	let actor = token.actor;
	if (!actor || !token || workflow.hitTargets.size < 1) return {};
	if (!actor.system.scale.rogue['sneak-attack']) {
		ui.notifications.warn("Sneak Attack: No Sneak Attack Scale Found");
		return {};
	}
	const numDice = actor.system.scale.rogue['sneak-attack'].number;
	const sizeDice = actor.system.scale.rogue['sneak-attack'].faces;
	let target = workflow.hitTargets.first();
	if (!target) ui.notifications.error("Sneak Attack macro failed, invalid target");
	
	if (game.combat) {
		const combatTime = `${game.combat.id}-${game.combat.round + game.combat.turn /100}`;
		const lastTime = actor.getFlag("garhis-grotto", "sneakAttackTime");
		if (combatTime === lastTime) {
			console.warn("GG | Sneak Attack: Already done a sneak attack this turn");
			return {};
		}
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
			usedRakish = ((MidiQOL.getDistance(token, target, true) <= 5) && (MidiQOL.findNearby(null, token, 5).length === 1))
		}
	}
	if (!isSneak) {
		console.warn("GG | Sneak Attack: No advantage and no ally next to target");
		return {};
	}
	let useSneak = getProperty(actor, "flags.dae.autoSneak");
	if (!useSneak) {
		let dialog = new Promise((resolve, reject) => {
			new Dialog({
				title: "Use Sneak Attack?",
				buttons: {
					one: {
						icon: '<i class="fas fa-check"></i>',
						label: "Confirm",
						callback: () => resolve(true)
					},
					two: {
						icon: '<i class="fas fa-times"></i>',
						label: "Cancel",
						callback: () => {resolve(false)}
					}
				},
				default: "two"
			}).render(true);
		});
		useSneak = await dialog;
	}
	if (!useSneak) return {}
	const diceMult = workflow.isCritical ? 2: 1;
	if (game.combat) {
		const combatTime = `${game.combat.id}-${game.combat.round + game.combat.turn /100}`;
		const lastTime = actor.getFlag("garhis-grotto", "sneakAttackTime");
		if (combatTime !== lastTime) {
			await actor.setFlag("garhis-grotto", "sneakAttackTime", combatTime)
		}
	}
	const animFile = 'jb2a.sneak_attack.orange';
	const animation = Sequencer.Database.entryExists(animFile);
	if (animation) {
		new Sequence()
		.effect()
		.file(animation)
		.atLocation(target)
		.play();		
	}
	return {damageRoll: `${numDice * diceMult}d${sizeDice}`, flavor: "Sneak Attack"};
}

export let rogue = {
	'sneakAttack': sneakAttack
}
