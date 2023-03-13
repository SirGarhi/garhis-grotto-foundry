
import { ggHelpers } from "../../helperFunctions.js";

async function feedTheTrap(args) {
	console.log(args);
	const lastArg = args[args.length-1];
	let essenceSize = await ggHelpers.buttonMenu('What size essence is being fed?', [
		['Uncommon (+3)', 3],
		['Rare (+6)', 6],
		['Very Rare (+10)', 10]
	]);
	if( essenceSize ) {
		const actor = lastArg.actor;
		const item = actor.items.getName("Aether Trap");
		if (item) {
			const newValue = Math.min((item.system.uses.value + essenceSize), item.system.uses.max);
			let essenceItem = undefined;
			let essenceName = '';
			switch (essenceSize) {
				case 3:
					essenceName = 'Uncommon Essence';
					break;
				case 6:
					essenceName = 'Rare Essence';
					break;
				case 10:
					essenceName = 'Very Rare Essence';
					break;
			}
			essenceItem = actor.items.getName(essenceName);
			if( essenceItem && essenceItem.system.quantity != 0 ) {
				await essenceItem.update({"system.quantity": essenceItem.system.quantity-1});
				await item.update({"system.uses.value": newValue});
			} else {
				let errorDialog = new Promise((resolve, reject) => {
					new Dialog({
					title: "Unable to find Essence",
					content: `<p>Couldn't find any essence of type: ${essenceName}</p><p>Name must be exactly the same as expected</p>`,
						buttons: {
							  ok: {
								  label: "Ok",
								  callback: () => resolve()
							  },
						},
						default: "ok"
					}).render(true);
				});
				await errorDialog;
			}
		} else {
			ui.notifications.warn("Couldn't Find the item 'Aether Trap'");
		}
	}
}

async function analyzeItem(workflow) {
	if (workflow.targets.size != 1) return;
	let featureData = await ggHelpers.getItemFromCompendium('garhis-grotto.gg-item-blueprints', 'Transfer Analysis', false);
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
		'label': `Analyzed - ${workflow.actor.name}`,
		'icon': workflow.item.img,
		'origin': workflow.actor.uuid,
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
	await ggHelpers.createEffect(workflow.targets.first().actor, targetEffectData);
	async function effectMacro() {
		await warpgate.revert(token.document, 'Analysis');
		let targetTokenId = effect.changes[0].value;
		let targetToken = canvas.scene.tokens.get(targetTokenId);
		if (!targetToken) return;
		let targetActor = targetToken.actor;
		let targetEffect =  garhisGrotto.helpers.findEffect(targetActor, `Analyzed - ${actor.name}`);
		if (!targetEffect) return;
		await garhisGrotto.helpers.removeEffect(targetEffect);
	}
	let sourceEffectData = {
		'label': 'Analysis',
		'icon': workflow.item.img,
		'changes': [
			{
				'key': 'flags.garhis-grotto.spell.analysisTarget',
				'mode': CONST.ACTIVE_EFFECT_MODES.CUSTOM,
				'value': workflow.targets.first().id,
				'priority': 20
			},
			{
				'key': 'flags.dnd5e.DamageBonusMacro',
				'mode': 0,
				'value': 'GG_analyzeDamage',
				'priority': 20
			}
		],
		'transfer': false,
		'origin': workflow.item.uuid,
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
	await warpgate.mutate(workflow.token.document, updates, {}, options);
	let conEffect = ggHelpers.findEffect(workflow.actor, 'Concentrating');
	if (conEffect) {
		let updates = {
			'duration': {
				'seconds': seconds
			}
		};
		await ggHelpers.updateEffect(conEffect, updates);
	}
}
async function analyzeDamage(workflow) {
	if (workflow.hitTargets.size != 1) return;
	let hexedTarget = ggHelpers.findEffect(workflow.actor, 'Analysis')?.changes[0]?.value;
	let targetToken = workflow.hitTargets.first();
	if (targetToken.id != hexedTarget) return;
	let damage = "1d6[necrotic]";
	if (workflow.isCritical) damage = "2d6[necrotic]";
	return {damageRoll: damage, flavor: "Analyzed"};
}
async function analyzeTransfer(workflow) {
	if (workflow.targets.size != 1) {
		ui.notifications.warn('Can only transfer Analysis to a single target'); 
		return;
	}
	let targetToken = workflow.targets.first();
	let targetActor = targetToken.actor;
	let effect = ggHelpers.findEffect(workflow.actor, 'Analysis');
	let oldTargetToken;
	if (effect) {
		let oldTargetTokenId = effect.changes[0]?.value;
		oldTargetToken = canvas.scene.tokens.get(oldTargetTokenId);
	}
	let selection = 'flags.midi-qol.disadvantage.ability.check.str';
	if (oldTargetToken) {
		let oldTargetActor = oldTargetToken.actor;
		let oldTargetEffect =  ggHelpers.findEffect(oldTargetActor, `Analyzed - ${workflow.actor.name}`);
		if (oldTargetEffect) {
			await ggHelpers.removeEffect(oldTargetEffect);
			selection = oldTargetEffect.changes[0].key;
		}
	}
	let duration = 3600;
	if (effect) duration = effect.duration.remaining;
	let effectData = {
		'label': `Analyzed - ${workflow.actor.name}`,
		'icon': effect.icon,
		'origin': workflow.actor.uuid,
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

export let tiko = {
	'feedTheTrap': feedTheTrap,
	'analyze': {
		'item': analyzeItem,
		'damage': analyzeDamage,
		'transfer': analyzeTransfer
	}
}
