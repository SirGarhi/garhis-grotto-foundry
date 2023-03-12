import { ggHelpers } from "../../helperFunctions.js";
import { awakenedWeaponEffects } from "../../effects/awakenedWeaponEffects.js";

async function awaken(args) {
	let lastArg = args[args.length-1];
	const bladesong = lastArg.actor.items.getName("Advanced Bladesong");
	if (bladesong) bladesong.use();
}

async function advancedBladesong(args) {
	let lastArg = args[args.length-1];
	let damageType = await ggHelpers.buttonMenu('Which Damage Resistance?', [
		['Bludgeoning, Piercing, Slashing', 'bps'],
		['Acid', 'acid'],
		['Cold', 'cold'],
		['Fire', 'fire'],
		['Lightning', 'lightning'],
		['Thunder', 'thunder'],
		['Force', 'force'],
		['Radiant', 'radiant'],
		['Necrotic', 'necrotic'],
		['Poison', 'poison'],
		['Psychic', 'psychic'],

	]);
	let resistanceBonusChanges = [{key: "system.traits.dr.value", mode: CONST.ACTIVE_EFFECT_MODES.CUSTOM, priority: 20, value: damageType}];
	if (damageType === 'bps') {
		resistanceBonusChanges = [
			{key: "system.traits.dr.value", mode: CONST.ACTIVE_EFFECT_MODES.CUSTOM, priority: 20, value: 'bludgeoning'},
			{key: "system.traits.dr.value", mode: CONST.ACTIVE_EFFECT_MODES.CUSTOM, priority: 20, value: 'piercing'},
			{key: "system.traits.dr.value", mode: CONST.ACTIVE_EFFECT_MODES.CUSTOM, priority: 20, value: 'slashing'}
		]
	}
	let resistanceEffect = structuredClone(awakenedWeaponEffects.advancedBladesongResistance);
	resistanceEffect.label = `Advanced Bladesong Resistance: ${damageType}`;
	resistanceEffect.changes = resistanceBonusChanges;
	await ggHelpers.createEffect(lastArg.actor, resistanceEffect);
}

export let cain = {
	'awaken': awaken,
	'bladesong': advancedBladesong
}
