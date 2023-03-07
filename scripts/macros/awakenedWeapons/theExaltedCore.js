import { ggHelpers } from "../../helperFunctions.js";
import { awakenedWeaponEffects } from "../../effects/awakenedWeaponEffects.js";

async function awaken(args) {
	let lastArg = args[args.length-1];
	let spellData = await ggHelpers.getItemFromCompendium('garhis-grotto.gg-item-blueprints', 'Guide them Well', false);
	if (!spellData) return;
	let shieldData = await ggHelpers.getItemFromCompendium('garhis-grotto.gg-item-blueprints', 'Projected Matrix', false);
	if (!shieldData) return;	
	let token = canvas.tokens.get(lastArg.tokenId)
	let actorUpdates = {
		'embedded': {
			'Item': {
				[spellData.name]: spellData,
				[shieldData.name]: shieldData
			}
		}
	}
	let options = {
		'permanent': false,
		'name': 'Awakened',
		'description': 'Adds Guide them Well and Projected Matrix to the character sheet'
	}
	await warpgate.mutate(token.document, actorUpdates, {}, options);
}

async function elementalMatrix(args) {
	console.log(args);
	const lastArg = args[args.length-1];
	let damageType = await ggHelpers.buttonMenu('What damage type is being absorbed?', [
		['Acid', 'acid'],
		['Cold', 'cold'],
		['Fire', 'fire'],
		['Lightning', 'lightning'],
		['Thunder', 'thunder']
	]);
	const resistanceBonusChanges = [{key: "system.traits.dr.value", mode: CONST.ACTIVE_EFFECT_MODES.CUSTOM, priority: 20, value: damageType}];
	let resistanceEffect = structuredClone(awakenedWeaponEffects.elementalMatrixEffect);
	resistanceEffect.label += ' ' + damageType;
	resistanceEffect.changes = resistanceBonusChanges;
	let actor = lastArg.actor;
	await ggHelpers.createEffect(actor, resistanceEffect);
}

export let exaltedCore = {
	'awaken': awaken,
	'elementalMatrix': elementalMatrix
}
