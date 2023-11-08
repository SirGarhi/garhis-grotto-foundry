import { ggHelpers } from '../../helperFunctions.js';
import { featureEffects } from '../../effects/featureEffects.js';

async function chooseWeaponProficiency(actor) {
	let martialWeapons = ['battleaxe', 'flail', 'glaive', 'greataxe', 'greatsword', 'halberd', 'lance', 'longsword', 'maul', 'morningstar', 'pike', 'rapier', 'scimitar', 'shortsword', 'trident', 'warpick', 'warhammer', 'whip', 'blowgun', 'handcrossbow', 'heavycrossbow', 'longbow', 'net'];
	let simpleWeapons = ['club', 'dagger', 'greatclub', 'handaxe', 'javelin', 'lighthammer', 'mace', 'quarterstaff', 'sickle', 'spear', 'dart', 'lightcrossbow', 'shortbow', 'sling'];
	let choices = [];
	if (!actor.system.traits.weaponProf.value.find( val => val === 'mar')) {
		for( let prof of martialWeapons ) {
			if( !actor.system.traits.weaponProf.value.find( val => val === prof) ) {
				choices.push(prof);
			}
		}
	}
	if (!actor.system.traits.weaponProf.value.find( val => val === 'sim')) {
		for( let prof of simpleWeapons ) {
			if( !actor.system.traits.weaponProf.value.find( val => val === prof) ) {
				choices.push(prof);
			}
		}
	}
	if( choices.length < 1 ) {
		choices = [['You Already Know All The Weapons!', false]];
	} else {
		for( let i = 0; i < choices.length; i++ ) {
			switch (choices[i]) {
				case 'battleaxe':
					choices[i] = ['Battleaxe', 'battleaxe'];
					break;
				case 'flail':
					choices[i] = ['Flail', 'flail'];
					break;
				case 'glaive':
					choices[i] = ['Glaive', 'glaive'];
					break;
				case 'greataxe':
					choices[i] = ['Greataxe', 'greataxe'];
					break;
				case 'greatsword':
					choices[i] = ['Greatsword', 'greatsword'];
					break;
				case 'halberd':
					choices[i] = ['Halberd', 'halberd'];
					break;
				case 'lance':
					choices[i] = ['Lance', 'lance'];
					break;
				case 'longsword':
					choices[i] = ['Longsword', 'longsword'];
					break;
				case 'maul':
					choices[i] = ['Maul', 'maul'];
					break;
				case 'morningstar':
					choices[i] = ['Morningstar', 'morningstar'];
					break;
				case 'pike':
					choices[i] = ['Pike', 'pike'];
					break;
				case 'rapier':
					choices[i] = ['Rapier', 'rapier'];
					break;
				case 'scimitar':
					choices[i] = ['Scimitar', 'scimitar'];
					break;
				case 'shortsword':
					choices[i] = ['Shortsword', 'shortsword'];
					break;
				case 'trident':
					choices[i] = ['Trident', 'trident'];
					break;
				case 'warpick':
					choices[i] = ['War Pick', 'warpick'];
					break;
				case 'warhammer':
					choices[i] = ['War Hammer', 'warhammer'];
					break;
				case 'whip':
					choices[i] = ['Whip', 'whip'];
					break;
				case 'blowgun':
					choices[i] = ['Blowgun', 'blowgun'];
					break;
				case 'handcrossbow':
					choices[i] = ['Hand Crossbow', 'handcrossbow'];
					break;
				case 'heavycrossbow':
					choices[i] = ['Heavy Crossbow', 'heavycrossbow'];
					break;
				case 'longbow':
					choices[i] = ['Longbow', 'longbow'];
					break;
				case 'net':
					choices[i] = ['Net', 'net'];
					break;
				case 'club':
					choices[i] = ['Club', 'club'];
					break;
				case 'dagger':
					choices[i] = ['Dagger', 'dagger'];
					break;
				case 'greatclub':
					choices[i] = ['Greatclub', 'greatclub'];
					break;
				case 'handaxe':
					choices[i] = ['Hand Axe', 'handaxe'];
					break;
				case 'javelin':
					choices[i] = ['Javelin', 'javelin'];
					break;
				case 'lighthammer':
					choices[i] = ['Light Hammer', 'lighthammer'];
					break;
				case 'mace':
					choices[i] = ['Mace', 'mace'];
					break;
				case 'quarterstaff':
					choices[i] = ['Quarterstaff', 'quarterstaff'];
					break;
				case 'sickle':
					choices[i] = ['Sickle', 'sickle'];
					break;
				case 'spear':
					choices[i] = ['Spear', 'spear'];
					break;
				case 'dart':
					choices[i] = ['Dart', 'dart'];
					break;
				case 'lightcrossbow':
					choices[i] = ['Light Crossbow', 'lightcrossbow'];
					break;
				case 'shortbow':
					choices[i] = ['Shortbow', 'shortbow'];
					break;
				case 'sling':
					choices[i] = ['Sling', 'sling'];
					break;
				default:
					console.log("Error filtering weapon proficiencies");
			}
		}
	}
	return await ggHelpers.buttonMenu('Choose a Weapon Proficiency', choices, {'height': Math.min(400,(choices.length*35+40))});
}

async function chooseToolProficiency(actor) {
	console.log(actor);
	let artTools = ['alchemist', 'brewer', 'calligrapher', 'carpenter', 'cartographer', 'cobbler', 'cook', 'glassblower', 'jeweler', 'leatherworker', 'mason', 'painter', 'potter', 'smith', 'tinker', 'weaver', 'woodcarver'];
	let musicTools = ['bagpipes', 'drum', 'dulcimer', 'flute', 'horn', 'lute', 'lyre', 'panflute', 'shawm', 'viol'];
	let vehicleTools = ['air', 'land', 'space', 'water'];
	let gameTools = ['chess', 'card', 'dice'];
	let miscKits = ['disg', 'forg', 'herb', 'navg', 'pois', 'thief'];
	let choices = [];
	if (!('art' in actor.system.tools)) {
		for( let prof of artTools ) {
			if( !(prof in actor.system.tools) || (actor.system.tools.prof?.value < 1)) {
				choices.push(prof);
			}
		}
	}
	if (!('music' in actor.system.tools)) {
		for( let prof of musicTools ) {
			if( !(prof in actor.system.tools) || (actor.system.tools.prof?.value < 1)) {
				choices.push(prof);
			}
		}
	}
	if (!('vehicle' in actor.system.tools)) {
		for( let prof of vehicleTools ) {
			if( !(prof in actor.system.tools) || (actor.system.tools.prof?.value < 1)) {
				choices.push(prof);
			}
		}
	}
	if (!('game' in actor.system.tools)) {
		for( let prof of gameTools ) {
			if( !(prof in actor.system.tools) || (actor.system.tools.prof?.value < 1)) {
				choices.push(prof);
			}
		}
	}
	for( let prof of miscKits ) {
		if( !(prof in actor.system.tools) || (actor.system.tools.prof?.value < 1)) {
			choices.push(prof);
		}
	}
	if( choices.length < 1 ) {
		choices = [['You Already Know All The Tools!', false]];
	} else {
		for( let i = 0; i < choices.length; i++ ) {
			switch (choices[i]) {
				case 'alchemist':
					choices[i] = ['Alcehmist\'s Supplies', 'alchemist']; 
					break; 
				case 'brewer':
					choices[i] = ['Brewer\'s Supplies', 'brewer']; 
					break; 
				case 'calligrapher':
					choices[i] = ['Calligrapher\'s Supplies', 'calligrapher']; 
					break; 
				case 'carpenter':
					choices[i] = ['Carpenter\'s Tools', 'carpenter']; 
					break; 
				case 'cartographer':
					choices[i] = ['Cartographer\'s Tools', 'cartographer']; 
					break; 
				case 'cobbler':
					choices[i] = ['Cobbler\'s Tools', 'cobbler']; 
					break; 
				case 'cook':
					choices[i] = ['Cook\'s Utensils', 'cook']; 
					break; 
				case 'glassblower':
					choices[i] = ['Glassblower\'s Tools', 'glassblower']; 
					break; 
				case 'jeweler':
					choices[i] = ['Jeweler\'s Tools', 'jeweler']; 
					break; 
				case 'leatherworker':
					choices[i] = ['Leatherworker\'s Tools', 'leatherworker']; 
					break; 
				case 'mason':
					choices[i] = ['Mason\'s Tools', 'mason']; 
					break; 
				case 'painter':
					choices[i] = ['Painter\'s Supplies', 'painter']; 
					break; 
				case 'potter':
					choices[i] = ['Potter\'s Tools', 'potter']; 
					break; 
				case 'smith':
					choices[i] = ['Smith\'s Tools', 'smith']; 
					break; 
				case 'tinker':
					choices[i] = ['Tinker\'s Tools', 'tinker']; 
					break; 
				case 'weaver':
					choices[i] = ['Weaver\'s Tools', 'weaver']; 
					break; 
				case 'woodcarver':
					choices[i] = ['Woodcaver\'s Tools', 'woodcarver']; 
					break; 
				case 'bagpipes':
					choices[i] = ['Bagpipes', 'bagpipes']; 
					break; 
				case 'drum':
					choices[i] = ['Drum', 'drum']; 
					break; 
				case 'dulcimer':
					choices[i] = ['Dulcimer', 'dulcimer']; 
					break; 
				case 'flute':
					choices[i] = ['Flute', 'flute']; 
					break; 
				case 'horn':
					choices[i] = ['Horn', 'horn']; 
					break; 
				case 'lute':
					choices[i] = ['Lute', 'lute']; 
					break; 
				case 'lyre':
					choices[i] = ['Lyre', 'lyre']; 
					break; 
				case 'panflute':
					choices[i] = ['Pan Flute', 'panflute']; 
					break; 
				case 'shawm':
					choices[i] = ['Shawm', 'shawm']; 
					break; 
				case 'viol':
					choices[i] = ['Viol', 'viol']; 
					break; 
				case 'air':
					choices[i] = ['Air Vehicles', 'air']; 
					break; 
				case 'land':
					choices[i] = ['Land Vehicles', 'land']; 
					break;
				case 'space':
					choices[i] = ['Space Vehicles', 'space']; 
					break;
				case 'water':
					choices[i] = ['Water Vehicles', 'water']; 
					break;
				case 'disg':
					choices[i] = ['Disguise Kit', 'disg']; 
					break; 
				case 'forg':
					choices[i] = ['Forgery Kit', 'forg']; 
					break; 
				case 'chess':
					choices[i] = ['Chess Set', 'chess']; 
					break; 
				case 'dice':
					choices[i] = ['Dice Set', 'dice']; 
					break; 
				case 'card':
					choices[i] = ['Playing Cards Set', 'card']; 
					break; 
				case 'herb':
					choices[i] = ['Herbalism Kit', 'herb']; 
					break; 
				case 'navg':
					choices[i] = ['Navigator\'s Tools', 'navg']; 
					break; 
				case 'pois':
					choices[i] = ['Poisoner\'s Kit', 'pois']; 
					break; 
				case 'thief':
					choices[i] = ['Thieves\' Tools', 'thief'];
					break;
				default:
					console.log("Failed Filtering Tool Options");
			}
		}
	}
	return await ggHelpers.buttonMenu('Choose a Tool Proficiency', choices, {'height': Math.min(400,(choices.length*35+40))});
}

async function chooseWeaponOrToolProficiency(actor) {
	let proficiencyCategory = await ggHelpers.buttonMenu('What type of proficiency?', [
		['Weapon', 'wep'],
		['Tool', 'tool'],
	]);
	let proficiency;
	switch (proficiencyCategory) {
		case "wep":
			proficiency = await chooseWeaponProficiency(actor);
			if (proficiency) { 
				return {
					'key': `system.traits.weaponProf.value`,
					'mode': CONST.ACTIVE_EFFECT_MODES.ADD,
					'value': proficiency
				}
			} else { 
				return false; 
			}
		case "tool":
			proficiency = await chooseToolProficiency(actor);
			if (proficiency) { 
				return {
					'key': `system.tools.${proficiency}.prof`,
					'mode': CONST.ACTIVE_EFFECT_MODES.CUSTOM,
					'value': 1
				}
			} else { 
				return false; 
			}
		default:
			return false;
	}
}

async function chooseSkillProficiency(actor) {
	let choices = [];
	let skills = ['acr', 'ani', 'arc', 'ath', 'dec', 'his', 'ins', 'itm', 'inv', 'med', 'nat', 'prc', 'prf', 'per', 'rel', 'slt', 'ste', 'sur'];
	for( let skill of skills ) {
		if( actor.system.skills[skill].value < 1 ) {
			choices.push(skill);
		}
	}
	if( choices.length < 1 ) {
		choices = [['You Already Know All The Skills!', false]];
	} else {
		for( let i = 0; i < choices.length; i++ ) {
			switch (choices[i]) {
				case 'acr':
					choices[i] = ['Acrobatics', 'acr'];
					break;
				case 'ani':
					choices[i] = ['Animal Handling', 'ani'];
					break;
				case 'arc':
					choices[i] = ['Arcana', 'arc'];
					break;
				case 'ath':
					choices[i] = ['Athletics', 'ath'];
					break;
				case 'dec':
					choices[i] = ['Deception', 'dec'];
					break;
				case 'his':
					choices[i] = ['History', 'his'];
					break;
				case 'ins':
					choices[i] = ['Insight', 'ins'];
					break;
				case 'itm':
					choices[i] = ['Intimidation', 'itm'];
					break;
				case 'inv':
					choices[i] = ['Investigation', 'inv'];
					break;
				case 'med':
					choices[i] = ['Medicine', 'med'];
					break;
				case 'nat':
					choices[i] = ['Nature', 'nat'];
					break;
				case 'prc':
					choices[i] = ['Perception', 'prc'];
					break;
				case 'prf':
					choices[i] = ['Performance', 'prf'];
					break;
				case 'per':
					choices[i] = ['Persuasion', 'per'];
					break;
				case 'rel':
					choices[i] = ['Religion', 'rel'];
					break;
				case 'slt':
					choices[i] = ['Sleight of Hand', 'slt'];
					break;
				case 'ste':
					choices[i] = ['Stealth', 'ste'];
					break;
				case 'sur':
					choices[i] = ['Survival', 'sur'];
					break;
				default:
					console.log("Error filtering skill proficiencies");
			}
		}
	}
	return await ggHelpers.buttonMenu('Choose a Skill Proficiency', choices, {'height': Math.min(400,(choices.length*35+40))});
}

async function standardTrance({speaker, actor, token, character, item, args, scope, workflow}) {
	ggHelpers.removeEffect(ggHelpers.findEffect(actor, featureEffects.trance.label));
	let changes = [];
	let proficiency = await chooseWeaponOrToolProficiency(actor);
	if (proficiency) changes.push(proficiency);
	proficiency = await chooseWeaponOrToolProficiency(actor);
	if (proficiency) changes.push(proficiency);
	if ( changes.length < 1 ) {
		ui.notifications.warn('No proficiencies chosen or all options already known, Trance effect will not be created.');
		return;
	}
	let effect = structuredClone(featureEffects.trance);
	if (game.settings.get('garhis-grotto', 'Expire Trance')) effect.flags.dae.specialDuration.push("longRest");
	effect.changes = changes;
	ggHelpers.createEffect(actor, effect);
}

async function astralTrance({speaker, actor, token, character, item, args, scope, workflow}) {
	ggHelpers.removeEffect(ggHelpers.findEffect(actor, featureEffects.trance.label));
	let changes = [];
	let proficiency = await chooseWeaponOrToolProficiency(actor);
	if (proficiency) changes.push(proficiency);
	proficiency = await chooseSkillProficiency(actor);
	if(proficiency) changes.push(
		{	'key': `system.skills.${proficiency}.value`, 
			'mode': CONST.ACTIVE_EFFECT_MODES.ADD, 
			'value': '1' });
	if ( changes.length < 1 ) {
		ui.notifications.warn('No proficiencies chosen or all choices already known, Trance effect will not be created.');
		return;
	}
	let effect = structuredClone(featureEffects.trance);
	if (game.settings.get('garhis-grotto', 'Expire Trance')) effect.flags.dae.specialDuration.push("longRest");
	effect.changes = changes;
	ggHelpers.createEffect(actor, effect);
}

export let trance = {
	'trance': standardTrance,
	'astralTrance': astralTrance
}
