import { ggHelpers } from './helperFunctions.js';
import { hex } from './macros/spells/hex.js';
import { rage } from './macros/classFeatures/rage.js';
import { boomingBlade } from './macros/spells/boomingBlade.js';
import { absorbElements } from './macros/spells/absorbElements.js';
import { trance } from './macros/raceFeatures/trance.js';
import { sneakAttack } from './macros/classFeatures/sneakAttack.js';
import { greenFlameBlade } from './macros/spells/greenFlameBlade.js';
import { twilightSanctuary } from './macros/classFeatures/twilightSanctuary.js';
import { aid } from './macros/spells/aid.js';
import { tollTheDead } from './macros/spells/tollTheDead.js';
import { chromaticInfusion } from './macros/signatureItems/chromaticInfusion.js';
import { piercer } from './macros/feats/piercer.js';
import { lineage } from './macros/signatureItems/lineageAndLegacy.js';
import { totemicBracers } from './macros/signatureItems/totemicBracers.js';
import { liltingPerformance } from './macros/signatureItems/liltingPerformance.js';
import { bloomingRose } from './macros/signatureItems/bloomingRose.js';

export let macros = {
	'onUse': useOnUse,
	'onUseMulti': useOnUseMulti,
	'damageBonus': damageBonus,
	'selectTargetsInRange': selectTargetsInRange,
	'targetAllInRange': targetAllInRange,
	'hex': hex,
	'rage': rage,
	'boomingBlade': boomingBlade,
	'greenFlameBlade': greenFlameBlade,
	'absorbElements': absorbElements,
	'trance': trance,
	'sneakAttack': sneakAttack,
	'twilightSanctuary': twilightSanctuary,
	'aid': aid,
	'tollTheDead': tollTheDead,
	'chromaticInfusion': chromaticInfusion,
	'piercer': piercer,
	'lineage': lineage,
	'totemicBracers': totemicBracers,
	'liltingPerformance': liltingPerformance,
	'bloomingRose': bloomingRose
}
function actorOnUseMacro(itemName) {
	return 'await garhisGrotto.macros.onUse(this, "' + itemName + '");';
}
function actorOnUseMultiPassMacro(itemName) {
	return 'await garhisGrotto.macros.onUseMulti(this, "' + itemName + '", args[0].macroPass);'
}
function itemOnUseMacro(itemName) {
	return 'await garhisGrotto.macros.onUse(args, "' + itemName + '");';
}
function itemOnUseMultiPassMacro(itemName) {
	return 'await garhisGrotto.macros.onUseMulti(args, "' + itemName + '", args[0].macroPass);'
}
function damageBonusMacro(itemName) {
	return 'let result = await garhisGrotto.macros.damageBonus(this, "' + itemName + '"); return result;';
}
export async function setupMacroFolder() {
	let macroFolder = game.folders.find((folder) => folder.name === 'GG Macros' && folder.type === 'Macro');
	if (!macroFolder) {
		await Folder.create({
		color: '#666666',
		name: 'GG Macros',
		parent: null,
		type: 'Macro'
		});
	}
}
async function createMacro(name, content, isGM) {
	let macroFolder = game.folders.find((folder) => folder.name === 'GG Macros' && folder.type === 'Macro');
	let data = {
		'name': 'GG_' + name,
		'type': 'script',
		'img': 'modules/garhis-grotto/assets/art/misc/GorillaHeadBW.webp',
		'scope': 'global',
		'command': content,
		'folder': macroFolder ? macroFolder.id : undefined,
		'flags': {
			'advanced-macros': {
				'runAsGM': isGM
			},
		}
	};
	let existingMacro = game.macros.find((m) => m.name === 'GG_' + name);
	if (existingMacro) {
		data._id = existingMacro.id;
		existingMacro.update(data);
	} else {
		Macro.create(data, { temporary: false, displaySheet: false })
	}
}
export async function setupWorldMacros() {
	await createMacro('hexDamage', damageBonusMacro('hex'), false);
	await createMacro('applyThrumming', itemOnUseMacro('applyThrumming'), false);
	await createMacro('thrummingExplosion', itemOnUseMacro('thrummingExplosion'), false);
	await createMacro('sneakAttack', damageBonusMacro('sneakAttack'), false);
	await createMacro('greenFlameBladeSplash', itemOnUseMacro('greenFlameBladeSplash'), false);
	await createMacro('twilightSanctuary', itemOnUseMacro('twilightSanctuary'), false);
	await createMacro('updateConvenientEffects', 'garhisGrotto.effects.updateConvenientEffects()', false);
	await createMacro('piercerCriticalBonus', damageBonusMacro('piercerBonus'), false);
	await createMacro('venomfangDamage', damageBonusMacro('venomfangDamage'), false);
	await createMacro('petalSlash', itemOnUseMacro('petalSlash'), false);
}
async function useOnUse(args, itemName) {
	switch (itemName) {
		case 'applyThrumming':
			await boomingBlade.applyThrumming(args);
		case 'thrummingExplosion':
			await boomingBlade.thrummingExplosion(args);
			break;
		case 'astralTrance':
			await trance.astralTrance(args);
			break;
		case 'trance':
			await trance.standardTrance(args);
			break;
		case 'greenFlameBladeSplash':
			await greenFlameBlade.splash(args);
			break;
		case 'twilightSanctuary':
			await twilightSanctuary(args);
			break;
		case 'petalSlash':
			await bloomingRose.petalSlash(args);
			break;
		default:
			ui.notifications.warn('Invalid actor onUse macro: '+itemName);
			return;
	}
}
async function useOnUseMulti(args, itemName, pass) {
	switch (itemName) {
		default:
			ui.notifications.warn('Invalid actor onUse macro!');
			return;
		case 'radiantSoul': 
			await radiantSoul(args, pass);
			break;
	}
}
async function damageBonus(args, itemName) {
	let result = {};
	switch (itemName) {
		case 'hex': 
			result = hex.damage(args);
			return result;
		case 'sneakAttack':
			result = sneakAttack(args);
			return result;
		case 'piercerBonus':
			result = piercer.damageBonus(args);
			return result;
		case 'venomfangDamage':
			result = rage.venomfang(args);
			return result;
		default:
			ui.notifications.warn('Invalid Damage Bonus Macro!');
			return result;
	}
}
async function selectTargetsInRange(args, range, disposition) {
	const lastArg = args[args.length-1];
	let token = canvas.tokens.get(lastArg.tokenId);
	let nearbyTargets = ggHelpers.findNearby(token, range, disposition);
	let buttons = [{label: 'Target Selected Only', value: 'selected'}, {label: 'Target All', value: 'all'}];
	let chosenTargets = await ggHelpers.selectTarget('Select Targets in Range', buttons, nearbyTargets, false, true);
	if (chosenTargets) {
		game.user?.targets.forEach(t => {
			t.setTarget(false, { releaseOthers: false });
		});
		game.user?.targets.clear();
		if (chosenTargets.buttons === 'selected') {
			for (let target of chosenTargets.inputs) {
				if (target) {
					let targetToken = canvas.tokens.get(target);
					targetToken.setTarget(true, { user: game.user, releaseOthers: false });
				}
			}		
		} else if (chosenTargets.buttons === 'all') {
			for (let targetToken of nearbyTargets) {
				targetToken.setTarget(true, { user: game.user, releaseOthers: false });
			}
		}
	}
}
async function targetAllInRange(args, range, disposition) {
	const lastArg = args[args.length-1];
	let token = canvas.tokens.get(lastArg.tokenId);
	let nearbyTargets = ggHelpers.findNearby(token, range, disposition);
	game.user?.targets.forEach(t => {
		t.setTarget(false, { releaseOthers: false });
	});
	game.user?.targets.clear();
	for (let targetToken of nearbyTargets) {
		targetToken.setTarget(true, { user: game.user, releaseOthers: false });
	}
}
