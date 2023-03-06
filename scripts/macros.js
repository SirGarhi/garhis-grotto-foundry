import { ggHelpers } from './helperFunctions.js';
import { features } from './macros/features.js';
import { spells } from './macros/spells.js';
import { characterPaths } from './macros/characterPaths.js';
import { awakenedWeapons } from './macros/awakenedWeapons.js';

export let macros = {
	'onUse': useOnUse,
	'onUseMulti': useOnUseMulti,
	'damageBonus': damageBonus,
	'selectTargetsInRange': selectTargetsInRange,
	'targetAllInRange': targetAllInRange,
	'features': features,
	'spells': spells,
	'paths': characterPaths,
	'awakenedWeapons': awakenedWeapons
}
function actorOnUseMacro(macroName) {
	return 'await garhisGrotto.macros.onUse(this, "' + macroName + '");';
}
function actorOnUseMultiPassMacro(macroName) {
	return 'await garhisGrotto.macros.onUseMulti(this, "' + macroName + '", args[0].macroPass);'
}
function itemOnUseMacro(macroName) {
	return 'await garhisGrotto.macros.onUse(args, "' + macroName + '");';
}
function itemOnUseMultiPassMacro(macroName) {
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
			await spells.boomingBlade.applyThrumming(args);
		case 'thrummingExplosion':
			await spells.boomingBlade.thrummingExplosion(args);
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
		case 'twilightSanctuary':
			await features.class.cleric.twilightSanctuary(args);
			break;
		case 'petalSlash':
			await characterPaths.angelo.petalSlash(args);
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
	}
}
async function damageBonus(args, itemName) {
	let result = {};
	switch (itemName) {
		case 'hex': 
			result = spells.hex.damage(args);
			return result;
		case 'sneakAttack':
			result = features.class.rogue.sneakAttack(args);
			return result;
		case 'piercerBonus':
			result = features.piercer.damageBonus(args);
			return result;
		case 'venomfangDamage':
			result = features.class.barbarian.venomfang(args);
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
