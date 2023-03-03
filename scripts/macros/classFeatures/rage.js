import {ggHelpers} from '../../helperFunctions.js';
import { featureEffects } from '../../effects/featureEffects.js';

export const totemNames = [
	[
		'Totem Spirit: Bear',
		'Totem Spirit: Eagle',
		'Totem Spirit: Elk',
		'Totem Spirit: Venomfang',
		'Totem Spirit: Wolf'
	]
]

async function wolfSpiritRage(workflow) {
	console.log("In Wolf Spirit Rage Function");
	console.log(workflow);
	if (workflow.item.system.actionType !== 'mwak') return;
	if (workflow.targets.size != 1) return;
	if (workflow.advantage === true) return;
	let targetToken = workflow.targets.first();
	let targetActor = targetToken.actor;
	let targetEffect = ggHelpers.findEffect(targetActor, 'Wolf Spirit Rage');
	if (!targetEffect) return;
	if (workflow.actor.uuid === targetEffect.origin) return;
	workflow.advantage = true;
	workflow.attackAdvAttribution['Wolf Spirit Rage'] = true;
}

async function rageItem(args) {
	// console.log("Rage Macro");
	// console.log(args);
	const lastArg = args[args.length-1];
	const actor = await fromUuid(lastArg.actorUuid);
	const persistentRage = actor.items.find( itm => itm.name === 'Persistent Rage');
	let effect = featureEffects.baseRage;
	effect.flags.effectmacro = {};
	if (persistentRage) {
		effect.duration.seconds = null,
		effect.duration.rounds = null
	}
	if (!persistentRage && game.settings.get('garhis-grotto', 'Rage Automation')) {
		async function effectMacroOnTurnEnd() {
			if (actor.getFlag('garhis-grotto', 'shouldRageExpire')) { 
				await garhisGrotto.helpers.removeEffect(effect); 
			}
			actor.setFlag('garhis-grotto', 'shouldRageExpire', true);
		}
		effect.flags.effectmacro.onTurnEnd = { 'script': ggHelpers.functionToString(effectMacroOnTurnEnd) };
		effect.flags.effectmacro.onCombatantDefeated = { 'script': 'await garhisGrotto.helpers.removeEffect(effect);' };
	}
	for (let feature of totemNames[0]) {
		if (actor.items.find( itm => itm.name === feature || itm.name === `${feature} - Bonus`)) {
			effect.changes = effect.changes.concat(featureEffects.specialRages[feature]);
		}
	}
	let wolfName = 'Totem Spirit: Wolf';
	if (actor.items.find( itm => itm.name === wolfName || itm.name === `${wolfName} - Bonus`)) {
		async function effectMacroOnCreate() {
			if (game.settings.get('garhis-grotto', 'Rage Automation')) {
				actor.setFlag('garhis-grotto', 'shouldRageExpire', false);
			}
			Hooks.on('midi-qol.preAttackRoll', garhisGrotto.macros.rage.wolfSpiritRage);
		}
		async function effectMacroOnDelete() {
			Hooks.off('midi-qol.preAttackRoll', garhisGrotto.macros.rage.wolfSpiritRage);
			garhisGrotto.helpers.removeEffect(garhisGrotto.helpers.findEffect(actor, 'Wolf Spirit Rage'));
		}
		effect.flags.effectmacro.onCreate = { 'script': ggHelpers.functionToString(effectMacroOnCreate)};
		effect.flags.effectmacro.onDelete = { 'script': ggHelpers.functionToString(effectMacroOnDelete)};
		let wolfEffect = featureEffects.specialRages.wolfSpiritRage;
		wolfEffect.origin = actor.uuid;
		await ggHelpers.createEffect(actor, wolfEffect);
	} else if (game.settings.get('garhis-grotto', 'Rage Automation')) {
		effect.flags.effectmacro.onCreate = { 'script': "actor.setFlag('garhis-grotto', 'shouldRageExpire', false);"};
	}
	ggHelpers.createEffect(actor, effect);
}

async function venomfang(workflow) {
	if (!["mwak","rwak"].includes(workflow.item.system.actionType)) return {};
	if (workflow.hitTargets.length < 1) return {};
	let token = workflow.token;
	let actor = token.actor;
	if (!actor || !token || workflow.hitTargets.length < 1) return {};
	if (!actor.classes.barbarian?.system.levels) {
		ui.notifications.warn("Venomfang Strike: No Barbarian Levels");
		return {};
	}
	let target = workflow.hitTargets.first();
	if (!target) ui.notifications.error("Venomfang Strike macro failed, invalid target");
	if (game.combat) {
		const combatTime = `${game.combat.id}-${game.combat.round + game.combat.turn /100}`;
		const lastTime = actor.getFlag("garhis-grotto", "venomfangTime");
		if (combatTime === lastTime) {
			console.warn("GG | Venomfang Strike: Already delivered venomfang damage this turn");
			return {};
		}
	}
	let damageDice = "1d6[poison]";
	if (workflow.isCritical) damageDice = "2d6[poison]";
	let damageMod = `+${actor.classes.barbarian.system.levels}[poison]`;
	const animFile = 'jb2a.bite.200px.green';
	const animation = Sequencer.Database.entryExists(animFile);
	if (animation) {
		new Sequence()
		.effect()
		.file(animation)
		.atLocation(target)
		.play();		
	}
	if (game.combat) {
		const combatTime = `${game.combat.id}-${game.combat.round + game.combat.turn /100}`;
		const lastTime = actor.getFlag("garhis-grotto", "venomfangTime");
		if (combatTime !== lastTime) {
			await actor.setFlag("garhis-grotto", "venomfangTime", combatTime)
		}
	}
	return {damageRoll: damageDice+damageMod, flavor: "Venomfang Strike"};
}

async function handleRoll(workflow) {
	// console.log(workflow);
	// First look for if the barb was the attacker
	let rageEffect = ggHelpers.findEffect(workflow.actor, 'Rage');
	if (rageEffect) {
		if (!["mwak","rwak"].includes(workflow.item.system.actionType)) return {};
		// console.log(`Rage user made an attack, resetting flag for: ${workflow.actor.name}`);
		workflow.actor.setFlag('garhis-grotto', 'shouldRageExpire', false);
		return;
	}
	if( workflow.damageList) {
		for ( let damagedTarget of workflow.damageList) {
			let actor = await fromUuid(damagedTarget.actorUuid);
			rageEffect = ggHelpers.findEffect(actor, 'Rage');
			if( rageEffect ) {
				// console.log(`Rage user took damage, resetting flag for: ${actor.name}`);
				actor.setFlag('garhis-grotto', 'shouldRageExpire', false);
			}
		}
	}
}

export let rage = {
	'item': rageItem,
	'venomfang': venomfang,
	'handleRoll': handleRoll,
	'wolfSpiritRage': wolfSpiritRage
}
