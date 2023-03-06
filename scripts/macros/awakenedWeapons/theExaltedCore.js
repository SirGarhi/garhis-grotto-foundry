import { ggHelpers } from "../../helperFunctions";
import { awakenedWeaponEffects } from "../../effects/awakenedWeaponEffects";

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

export let exlatedCore = {
	'elementalMatrix': elementalMatrix
}
