import {ggHelpers} from '../../helperFunctions.js';
async function huntersMarkItem({speaker, actor, token, character, item, args, scope, workflow}) {
	if (workflow.targets.size != 1) {
		ui.notifications.warn('Require exactly 1 target to cast Hunter\'s Mark'); 
		return;
	}
	const target = workflow.targets.first();
	let featureData = await ggHelpers.getItemFromCompendium('garhis-grotto.gg-item-blueprints', 'Mark New Target', false);
	if (!featureData) return;
	let seconds;
	switch (workflow.castData.castLevel) {
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
		'label': `Marked Target - ${actor.name}`,
		'icon': item.img,
		'origin': actor.uuid,
		'duration': {
			'seconds': seconds
		},
		'changes': []
	};
	await ggHelpers.createEffect(target.actor, targetEffectData);
	async function effectMacro() {
		await warpgate.revert(token.document, 'Hunter\'s Mark');
		let targetTokenId = effect.changes[0].value;
		let targetToken = canvas.scene.tokens.get(targetTokenId);
		if (!targetToken) return;
		let targetActor = targetToken.actor;
		let targetEffect = garhisGrotto.helpers.findEffect(targetActor, `Marked Target - ${actor.name}`);
		if (!targetEffect) return;
		await garhisGrotto.helpers.removeEffect(targetEffect);
	}
	let sourceEffectData = {
		'label': 'Hunter\'s Mark',
		'icon': item.img,
		'changes': [
			{
				'key': 'flags.garhis-grotto.spells.huntersMarkTarget',
				'mode': CONST.ACTIVE_EFFECT_MODES.OVERRIDE,
				'value': target.id,
				'priority': 20
			},
			{
				'key': 'flags.dnd5e.DamageBonusMacro',
				'mode': 0,
				'value': 'function.garhisGrotto.macros.spells.huntersMark.damage',
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
async function huntersMarkDamage({speaker, actor, token, character, item, args, scope, workflow}) {
	if (workflow.hitTargets.size != 1) return;
	if (!["mwak","rwak"].includes(workflow.item.system.actionType)) return {};
	let markedTarget = workflow.actor.flags['garhis-grotto'].spells.huntersMarkTarget;
	let targetToken = workflow.hitTargets.first();
	if (targetToken.id != markedTarget) return;
	let diceNum = 1;
	if (workflow.isCritical) diceNum = 2;
	let damageFormula = `${diceNum}d6[${workflow.defaultDamageType}]`;
	return {damageRoll: damageFormula, flavor: "Hunter's Mark"};
}
async function huntersMarkTransfer({speaker, actor, token, character, item, args, scope, workflow}) {
	if (workflow.targets.length != 1) {
		ui.notifications.warn('Can only transfer Hunter\'s Mark to a single target'); 
		return;
	}
	let targetToken = workflow.targets.first();
	let targetActor = targetToken.actor;
	let effect = ggHelpers.findEffect(actor, 'Hunter\'s Mark');
	if (!effect) {
		ui.notifications.warn('Hunter\'s Mark Active Effect not found, check for old Mutation');
		return;
	}
	let oldTargetTokenId = actor.flags['garhis-grotto'].spells.huntersMarkTarget;
	let oldTargetToken = canvas.scene.tokens.get(oldTargetTokenId);
	if (oldTargetToken) {
		let oldTargetActor = oldTargetToken.actor;
		let oldTargetEffect = ggHelpers.findEffect(oldTargetActor, `Marked Target - ${actor.name}`);
		if (oldTargetEffect) {
			await ggHelpers.removeEffect(oldTargetEffect);
		}
	}
	let duration = 3600;
	if (effect) duration = effect.duration.remaining;
	let effectData = {
		'label': `Marked Target - ${actor.name}`,
		'icon': effect.icon,
		'origin': actor.uuid,
		'duration': {
			'seconds': duration
		},
		'changes': []
	};
	await ggHelpers.createEffect(targetActor, effectData);
	if (effect) {
		let changes = effect.changes;
		changes[0].value = targetToken.id;
		let updates = {changes};
		await ggHelpers.updateEffect(effect, updates);
	}
}
export let huntersMark = {
	'item': huntersMarkItem,
	'damage': huntersMarkDamage,
	'transfer': huntersMarkTransfer
};
