import {ggHelpers} from '../../helperFunctions.js';
async function huntersMarkItem({speaker, actor, token, character, item, args}) {
	if (this.targets.size != 1) {
		ui.notifications.warn('Require exactly 1 target to cast Hunter\'s Mark'); 
		return;
	}
	let featureData = await ggHelpers.getItemFromCompendium('garhis-grotto.gg-item-blueprints', 'Mark New Target', false);
	if (!featureData) return;
	let seconds;
	switch (this.castData.castLevel) {
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
		'label': `Marked Target - ${this.actor.name}`,
		'icon': this.item.img,
		'origin': this.actor.uuid,
		'duration': {
			'seconds': seconds
		},
		'changes': []
	};
	await ggHelpers.createEffect(this.targets.first().actor, targetEffectData);
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
		'icon': this.item.img,
		'changes': [
			{
				'key': 'flags.garhis-grotto.spells.huntersMarkTarget',
				'mode': CONST.ACTIVE_EFFECT_MODES.OVERRIDE,
				'value': this.targets.first().id,
				'priority': 20
			},
			{
				'key': 'flags.dnd5e.DamageBonusMacro',
				'mode': 0,
				'value': 'GG_huntersMarkDamage',
				'priority': 20
			}
		],
		'transfer': false,
		'origin': this.item.uuid,
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
	await warpgate.mutate(this.token.document, updates, {}, options);
	let conEffect = ggHelpers.findEffect(this.actor, 'Concentrating');
	if (conEffect) {
		let updates = {
			'duration': {
				'seconds': seconds
			}
		};
		await ggHelpers.updateEffect(conEffect, updates);
	}
}
async function huntersMarkDamage(workflow) {
	if (workflow.hitTargets.size != 1) return;
	if (!["mwak","rwak"].includes(workflow.item.system.actionType)) return {};
	let markedTarget = workflow.actor.flags['garhis-grotto'].spells.huntersMarkTarget;
	let targetToken = workflow.hitTargets.first();
	if (targetToken.id != markedTarget) return;
	let diceNum = 1;
	if (workflow.isCritical) diceNum = 2;
	let damageFormula = diceNum + 'd6[' + workflow.defaultDamageType + ']';
	return {damageRoll: damageFormula, flavor: "Hunter's Mark"};
}
async function huntersMarkTransfer({speaker, actor, token, character, item, args}) {
	if (this.targets.size != 1) {
		ui.notifications.warn('Can only transfer Hunter\'s Mark to a single target'); 
		return;
	}
	let targetToken = this.targets.first();
	let targetActor = targetToken.actor;
	let effect = ggHelpers.findEffect(this.actor, 'Hunter\'s Mark');
	if (!effect) {
		ui.notifications.warn('Hunter\'s Mark Active Effect not found');
		return;
	}
	let oldTargetTokenId = this.actor.flags['garhis-grotto'].spells.huntersMarkTarget;
	let oldTargetToken = canvas.scene.tokens.get(oldTargetTokenId);
	if (oldTargetToken) {
		let oldTargetActor = oldTargetToken.actor;
		let oldTargetEffect = ggHelpers.findEffect(oldTargetActor, `Marked Target - ${this.actor.name}`);
		if (oldTargetEffect) {
			await ggHelpers.removeEffect(oldTargetEffect);
		}
	}
	let duration = 3600;
	if (effect) duration = effect.duration.remaining;
	let effectData = {
		'label': `Marked Target - ${this.actor.name}`,
		'icon': effect.icon,
		'origin': this.actor.uuid,
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
