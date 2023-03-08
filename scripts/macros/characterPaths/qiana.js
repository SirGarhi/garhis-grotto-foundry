import { ggHelpers } from '../../helperFunctions.js';
import { pathFeatureEffects } from '../../effects/pathFeatureEffects.js';

async function chromaticInfusion(args) {
	const lastArg = args[args.length-1];
	let buttons = [
		['Acid','acid'],
		['Cold','cold'],
		['Fire','fire'],
		['Lightning','lightning'],
		['Poison','poison']
	];
	let damageType = await ggHelpers.buttonMenu('Select Damage Type to Infuse', buttons);
	let effect = structuredClone(pathFeatureEffects.chromaticInfusion);
	const damageBonus = {key: "system.bonuses.rwak.damage", mode: CONST.ACTIVE_EFFECT_MODES.ADD, priority: 20, value: "+1d6["+damageType+"]"}
	effect.label = effect.label+' - '+damageType;
	effect.changes.push(damageBonus);
	let actor = await ggHelpers.tokenOrActor(await fromUuid(lastArg.actorUuid));
	await ggHelpers.createEffect(actor, effect);
}

async function targetingGuidanceItem(workflow) {
	if (workflow.targets.size != 1) return;
	let featureData = await ggHelpers.getItemFromCompendium('garhis-grotto.gg-item-blueprints', 'Sight New Target', false);
	if (!featureData) return;
	let targetEffectData = {
		'label': `Sighted - ${workflow.actor.name}`,
		'icon': workflow.item.img,
		'origin': workflow.actor.uuid,
		'duration': {
			'seconds': 60
		},
		'changes': []
	};
	await ggHelpers.createEffect(workflow.targets.first().actor, targetEffectData);
	async function effectMacro() {
		await warpgate.revert(token.document, 'Targeting Guidance');
		let targetTokenId = effect.changes[0].value;
		let targetToken = canvas.scene.tokens.get(targetTokenId);
		if (!targetToken) return;
		let targetActor = targetToken.actor;
		let targetEffect =  garhisGrotto.helpers.findEffect(targetActor, `Sighted - ${actor.name}`);
		if (!targetEffect) return;
		await garhisGrotto.helpers.removeEffect(targetEffect);
	}
	let sourceEffectData = {
		'label': 'Targeting Guidance',
		'icon': workflow.item.img,
		'changes': [
			{
				'key': 'flags.garhis-grotto.targetingGuidance.sightedTarget',
				'mode': CONST.ACTIVE_EFFECT_MODES.CUSTOM,
				'value': workflow.targets.first().id,
				'priority': 20
			},
			{
				'key': 'flags.dnd5e.DamageBonusMacro',
				'mode': 0,
				'value': 'GG_sightedDamage',
				'priority': 20
			}
		],
		'transfer': false,
		'origin': workflow.item.uuid,
		'duration': {
			'seconds': 600
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
		'name': 'Targeting Guidance',
		'description': sourceEffectData.label
	};
	await warpgate.mutate(workflow.token.document, updates, {}, options);
}
async function targetingGuidanceDamage(workflow) {
	if (workflow.hitTargets.size != 1) return;
	let sightedTarget = ggHelpers.findEffect(workflow.actor, 'Targeting Guidance')?.changes[0]?.value;
	let targetToken = workflow.hitTargets.first();
	if (targetToken.id != sightedTarget) return;
	let damage = "1d6[piercing]";
	if (workflow.isCritical) damage = "2d6[piercing]";
	return {damageRoll: damage, flavor: "Targeting Guidance"};
}
async function targetingGuidanceTransfer(workflow) {
	if (workflow.targets.size != 1) {
		ui.notifications.warn('Can only transfer Targeting Guidance to a single target'); 
		return;    
	}
	let targetToken = workflow.targets.first();
	let targetActor = targetToken.actor;
	let effect = ggHelpers.findEffect(workflow.actor, 'Targeting Guidance');
	if (!effect) return;
	let oldTargetToken;
	let oldTargetTokenId = ggHelpers.findEffect(workflow.actor, 'Targeting Guidance')?.changes[0]?.value;
	oldTargetToken = canvas.scene.tokens.get(oldTargetTokenId);
	if (oldTargetToken) {
		let oldTargetActor = oldTargetToken.actor;
		let oldTargetEffect =  ggHelpers.findEffect(oldTargetActor, `Sighted - ${workflow.actor.name}`);
		if (oldTargetEffect) {
			await ggHelpers.removeEffect(oldTargetEffect);
		}
	}
	let duration = (effect.duration.remaining < 60) ? effect.duration.remaining : 60;
	let effectData = {
		'label': `Sighted - ${workflow.actor.name}`,
		'icon': effect.icon,
		'origin': workflow.actor.uuid,
		'duration': {
			'seconds': duration
		},
		'changes': []
	};
	await ggHelpers.createEffect(targetActor, effectData);
	let changes = effect.changes;
	effect.changes[0].value = targetToken.id;
	let updates = {changes};
	await ggHelpers.updateEffect(effect, updates);
}

async function blazeCanister(args) {
	console.log(args);
	let templateArgs = args[0];
	let animArgs = args[1];
	let actor = animArgs.item.actor;
	let summonData = await ggHelpers.getItemFromCompendium('garhis-grotto.gg-actor-blueprints', 'Blaze Canister Patch', false);
	if (!summonData) return;
	let blazeCount = await actor.getFlag('garhis-grotto', 'blazeCanisterCount');
	console.log(`Blaze Count: ${blazeCount}`);
	if (!blazeCount) blazeCount = 0;
	blazeCount = blazeCount + 1;
	let summonName = `${summonData.name} - ${actor.name} - ${blazeCount}`;
	summonData.name = summonName;
	summonData.prototypeToken.name = summonName;
	summonData.effects[0].label = `Blaze Burn - ${summonName}`;
	let summon = await Actor.create(summonData);
	let gridOffset = canvas.grid.size/2
	let targetCoords = {
		'x': templateArgs.x + gridOffset,
		'y': templateArgs.y + gridOffset
	}
	let summonId = await warpgate.spawnAt(targetCoords, summonName);
	const summonedToken = game.canvas.tokens.get(summonId[0]);
	const summonTokenUuid = summonedToken.document.uuid;
	async function effectMacro() {
		await Actor.deleteDocuments([origin.id]);
		let blazeCount = await actor.getFlag('garhis-grotto', 'blazeCanisterCount');
		blazeCount = blazeCount - 1;
		await actor.setFlag('garhis-grotto', 'blazeCanisterCount', blazeCount);
	}
	let sourceEffectData = {
		'label': `Blaze Canister Patch - ${blazeCount}`,
		'icon': 'modules/jb2A_patreon/Library/3rd_Level/Fireball/FireballLoopNoDebris_01_Orange_Thumb.webp',
		'changes': [ { 'key': 'flags.dae.deleteUuid', 'mode': CONST.ACTIVE_EFFECT_MODES.ADD, 'value': [summonTokenUuid] } ],
		'origin': summon.uuid,
		'duration': { 'seconds': 30, rounds:5 },
		'flags': {
			'dae': {
				'stackable': 'multi'
			},
			'effectmacro': {
				'onDelete': {
					'script': ggHelpers.functionToString(effectMacro)
				}
			}
		}
	}
	await ggHelpers.createEffect(actor, sourceEffectData);
	await actor.setFlag('garhis-grotto', 'blazeCanisterCount', blazeCount);
}

let resetBlaze = "token.actor.setFlag('garhis-grotto', 'blazeCanisterCount', 0);";

export let qiana = {
	'chromaticInfusion': chromaticInfusion,
	'targetingGuidance': {
		'item': targetingGuidanceItem,
		'damage': targetingGuidanceDamage,
		'transfer': targetingGuidanceTransfer
	},
	'blazeCanister': blazeCanister,
	'resetBlazeMacro': resetBlaze
}
