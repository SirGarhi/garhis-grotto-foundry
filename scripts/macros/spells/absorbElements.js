import { ggHelpers } from '../../helperFunctions.js';
import { spellEffects } from '../../effects/spellEffects.js';
export async function absorbElements(workflow) {
	let damageType = await ggHelpers.buttonMenu('What damage type is being absorbed?', [
		['Acid', 'acid'],
		['Cold', 'cold'],
		['Fire', 'fire'],
		['Lightning', 'lightning'],
		['Thunder', 'thunder']
	]);
	const damageBonusChanges = [{key: "system.bonuses.mwak.damage", mode: CONST.ACTIVE_EFFECT_MODES.ADD, priority: 20, value: "+"+lastArg.spellLevel+"d6["+damageType+"]"}];
	const resistanceBonusChanges = [{key: "system.traits.dr.value", mode: CONST.ACTIVE_EFFECT_MODES.CUSTOM, priority: 20, value: damageType}];
	let damageEffect = structuredClone(spellEffects.absorbElements.damageBonus);
	damageEffect.label += ' ' + damageType;
	damageEffect.changes = damageBonusChanges;
	let resistanceEffect = structuredClone(spellEffects.absorbElements.resistanceBonus);
	resistanceEffect.label += ' ' + damageType;
	resistanceEffect.changes = resistanceBonusChanges;
	await ggHelpers.createEffect(workflow.actor, damageEffect);
	await ggHelpers.createEffect(workflow.actor, resistanceEffect);
}
