import { ggHelpers } from './helperFunctions.js';
import { features } from './macros/features.js';
import { spells } from './macros/spells.js';
import { characterPaths } from './macros/characterPaths.js';
import { awakenedWeapons } from './macros/awakenedWeapons.js';
import { inventoryItems } from './macros/inventoryItems.js';

export let macros = {
	'onUse': useOnUse,
	'onUseMulti': useOnUseMulti,
	'damageBonus': damageBonus,
	'selectTargetsInRange': selectTargetsInRange,
	'targetAllInRange': targetAllInRange,
	'features': features,
	'spells': spells,
	'paths': characterPaths,
	'awakenedWeapons': awakenedWeapons,
	'items': inventoryItems
}
function onUseMacro(macroName) {
	return 'await garhisGrotto.macros.onUse(args, "' + macroName + '");';
}
function onUseMultiPassMacro(macroName) {
	return 'await garhisGrotto.macros.onUseMulti(args, "' + macroName + '", args[0].macroPass);'
}
function damageBonusMacro(macroName) {
	return `let result = await garhisGrotto.macros.damageBonus(this, '${macroName}'); return result;`;
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
	await createMacro('hexDamage', damageBonusMacro('hexDamage'), false);
	await createMacro('applyThrumming', onUseMacro('applyThrumming'), false);
	await createMacro('applyPotentThrumming', onUseMacro('applyPotentThrumming'), false);
	await createMacro('thrummingExplosion', onUseMacro('thrummingExplosion'), false);
	await createMacro('potentThrummingExplosion', onUseMacro('potentThrummingExplosion'), false);
	await createMacro('sneakAttack', damageBonusMacro('sneakAttack'), false);
	await createMacro('greenFlameBladeSplash', onUseMacro('greenFlameBladeSplash'), false);
	await createMacro('greenFlameBladeSplashPotent', onUseMacro('greenFlameBladeSplashPotent'), false);
	await createMacro('twilightSanctuary', onUseMacro('twilightSanctuary'), false);
	await createMacro('updateConvenientEffects', 'garhisGrotto.effects.updateConvenientEffects()', false);
	await createMacro('piercerCriticalBonus', damageBonusMacro('piercerBonus'), false);
	await createMacro('venomfangDamage', damageBonusMacro('venomfangDamage'), false);
	await createMacro('petalSlash', onUseMacro('petalSlash'), false);
	await createMacro('giantsBane', damageBonusMacro('giantsBane'), false);
	await createMacro('hemorrhagingStrikes', onUseMacro('hemorrhagingStrikes'), false);
	await createMacro('concussiveTechnique', onUseMacro('concussiveTechnique'), false);
	await createMacro('sightedDamage', damageBonusMacro('sightedDamage'), false);
	await createMacro('analyzeDamage', damageBonusMacro('analyzeDamage'), false);
	await createMacro('autoReckless', onUseMacro('autoReckless'), false);
}
async function useOnUse(args, itemName) {
	switch (itemName) {
		case 'applyThrumming':
			await spells.boomingBlade.applyThrumming(args);
			break;
		case 'applyPotentThrumming':
			await spells.boomingBlade.applyPotentThrumming(args);
			break;
		case 'thrummingExplosion':
			await spells.boomingBlade.thrummingExplosion(args);
			break;
		case 'potentThrummingExplosion':
			await spells.boomingBlade.potentThrummingExplosion(args);
			break;
		case 'astralTrance':
			await features.trance.astralTrance(args);
			break;
		case 'trance':
			await features.trance.standardTrance(args);
			break;
		case 'greenFlameBladeSplash':
			await spells.greenFlameBlade.splash(args);
			break;
		case 'greenFlameBladeSplashPotent':
			await spells.greenFlameBlade.splashPotent(args);
			break;
		case 'twilightSanctuary':
			await features.class.cleric.twilightSanctuary(args);
			break;
		case 'autoReckless':
			await features.class.barbarian.autoReckless(args);
			break;
		default:
			ui.notifications.warn('Garhis Grotto: No onUse macro named: '+itemName);
			return;
	}
}
async function useOnUseMulti(args, itemName, pass) {
	switch (itemName) {
		default:
			ui.notifications.warn('Invalid actor onUse macro!');
			return;
	}
}
async function damageBonus(args, itemName) {
	let result = {};
	switch (itemName) {
		case 'hexDamage': 
			result = await spells.hex.damage(args);
			return result;
		case 'sneakAttack':
			result = await features.class.rogue.sneakAttack(args);
			return result;
		case 'piercerBonus':
			result = await features.piercer.damageBonus(args);
			return result;
		case 'venomfangDamage':
			result = await features.class.barbarian.venomfang(args);
			return result;
		case 'giantsBane':
			result = await awakenedWeapons.trinity.giantsBane(args);
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
	game.user?.targets.forEach(t => {
		t.setTarget(false, { releaseOthers: false });
	});
	game.user?.targets.clear();	
	if (chosenTargets) {
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
