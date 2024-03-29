import {ggHelpers} from '../../helperFunctions.js';
import { queue } from '../../queue.js';
async function hexItem({speaker, actor, token, character, item, args, scope, workflow}) {
	const lastArg = args[args.length-1];
	if (lastArg.targets.length != 1) {
		ui.notifications.warn('Can only cast Hex on a single target'); 
		return;
	}
	const target = lastArg.targets[0];
	let featureData = await ggHelpers.getItemFromCompendium('garhis-grotto.gg-item-blueprints', 'Transfer Hex', false);
	if (!featureData) return;
	let selection = await ggHelpers.buttonMenu('What ability should have disadvantage?', [
		['Strength', 'str'],
		['Dexterity', 'dex'],
		['Constitution', 'con'],
		['Intelligence', 'int'],
		['Wisdom', 'wis'],
		['Charisma', 'cha']
	]);
	if (!selection) selection = 'str';
	let seconds;
	switch (lastArg.castData.castLevel) {
		case 3:
		case 4:
			seconds = 28800;
			break;
		case 5:
		case 6:
		case 7:
		case 8:
		case 9:
			seconds = 86400;
			break;
		default:
			seconds = 3600;
	}
	let targetEffectData = {
		'label': `Hexed - ${actor.name}`,
		'icon': item.img,
		'origin': actor.uuid,
		'duration': {
			'seconds': seconds
		},
		'changes': [
			{
				'key': 'flags.midi-qol.disadvantage.ability.check.' + selection,
				'mode': CONST.ACTIVE_EFFECT_MODES.CUSTOM,
				'value': 'true',
				'priority': 20
			}
		]
	};
	await ggHelpers.createEffect(target.actor, targetEffectData);
	async function effectMacro() {
		await warpgate.revert(token.document, 'Hex');
		let targetTokenId = effect.changes[0].value;
		let targetToken = canvas.scene.tokens.get(targetTokenId);
		if (!targetToken) return;
		let targetActor = targetToken.actor;
		let targetEffect =  garhisGrotto.helpers.findEffect(targetActor, `Hexed - ${actor.name}`);
		if (!targetEffect) return;
		await garhisGrotto.helpers.removeEffect(targetEffect);
	}
	let sourceEffectData = {
		'label': 'Hex',
		'icon': item.img,
		'changes': [
			{
				'key': 'flags.garhis-grotto.spells.hexTarget',
				'mode': CONST.ACTIVE_EFFECT_MODES.OVERRIDE,
				'value': target.id,
				'priority': 20
			},
			{
				'key': 'flags.dnd5e.DamageBonusMacro',
				'mode': 0,
				'value': 'function.garhisGrotto.macros.spells.hex.damage',
				'priority': 20
			}
		],
		'transfer': false,
		'origin': item.uuid,
		'duration': {
			'seconds': seconds
		},
		'flags': {
			'effectmacro': {
				'onDelete': {
					'script': ggHelpers.functionToString(effectMacro)
				}
			}
		}
	}
	let updates = {
		'embedded': {
			'Item': {
				[featureData.name]: featureData
			},
			'ActiveEffect': {
				[sourceEffectData.label]: sourceEffectData
			}
		}
	};
	let options = {
		'permanent': false,
		'name': sourceEffectData.label,
		'description': sourceEffectData.label
	};
	await warpgate.mutate(token.document, updates, {}, options);
	let conEffect = ggHelpers.findEffect(actor, 'Concentrating');
	if (conEffect) {
		let updates = {
			'duration': {
				'seconds': seconds
			}
		};
		await ggHelpers.updateEffect(conEffect, updates);
	}
}
async function hexDamage({speaker, actor, token, character, item, args, scope, workflow}) {
	if (workflow.hitTargets.size != 1) return;
	if (!["mwak","rwak","msak","rsak"].includes(workflow.item.system.actionType)) return {};
	let markedTarget = workflow.actor.flags['garhis-grotto'].spells.hexTarget;
	let targetToken = workflow.hitTargets.first();
	if (targetToken.id != markedTarget) return;
	let diceNum = 1;
	if (workflow.isCritical) diceNum = 2;
	let damageFormula = diceNum + 'd6[necrotic]';
	return {damageRoll: damageFormula, flavor: "Hex"};
}
async function hexTransfer({speaker, actor, token, character, item, args, scope, workflow}) {
	if (workflow.targets.size != 1) {
		ui.notifications.warn('Can only transfer Hex to a single target'); 
		return;
	}
	let targetToken = workflow.targets.first();
	let targetActor = targetToken.actor;
	let effect = ggHelpers.findEffect(actor, 'Hex');
	if (!effect) {
		ui.notifications.warn('Hex Active Effect not found, check for old Mutation');
		return;
	}
	let oldTargetTokenId = actor.flags['garhis-grotto'].spells.hexTarget;
	let oldTargetToken = canvas.scene.tokens.get(oldTargetTokenId);
	let selection = 'flags.midi-qol.disadvantage.ability.check.str';
	if (oldTargetToken) {
		let oldTargetActor = oldTargetToken.actor;
		let oldTargetEffect =  ggHelpers.findEffect(oldTargetActor, `Hexed - ${actor.name}`);
		if (oldTargetEffect) {
			await ggHelpers.removeEffect(oldTargetEffect);
			selection = oldTargetEffect.changes[0].key;
		}
	}
	let duration = 3600;
	if (effect) duration = effect.duration.remaining;
	let effectData = {
		'label': `Hexed - ${actor.name}`,
		'icon': effect.icon,
		'origin': actor.uuid,
		'duration': {
			'seconds': duration
		},
		'changes': [
			{
				'key': selection,
				'mode': CONST.ACTIVE_EFFECT_MODES.CUSTOM,
				'value': 'true',
				'priority': 20
			}
		]
	};
	await ggHelpers.createEffect(targetActor, effectData);
	if (effect) {
		let changes = effect.changes;
		changes[0].value = targetToken.id;
		let updates = {changes};
		await ggHelpers.updateEffect(effect, updates);
	}
}
export let hex = {
	'item': hexItem,
	'damage': hexDamage,
	'transfer': hexTransfer
};
