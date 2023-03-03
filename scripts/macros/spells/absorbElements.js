import { ggHelpers } from '../../helperFunctions.js';
import { spellEffects } from '../../effects/spellEffects.js';
export async function absorbElements(args) {
	const lastArg = args[args.length-1];
	if( args[0] === "on" ) {
		let damageType = await ggHelpers.buttonsMenu('What damage type is being absorbed?', [
			['Acid', 'acid'],
			['Cold', 'cold'],
			['Fire', 'fire'],
			['Lightning', 'lightning'],
			['Thunder', 'thunder']
		]);
		const damageBonusChanges = [{key: "system.bonuses.mwak.damage", mode: CONST.ACTIVE_EFFECT_MODES.ADD, priority: 20, value: "+"+lastArg.spellLevel+"d6["+damageType+"]"}];
		const resistanceBonusChanges = [{key: "system.traits.dr.value", mode: CONST.ACTIVE_EFFECT_MODES.CUSTOM, priority: 20, value: damageType}];
		let damageEffect = spellEffects.absorbElements.damageBonus;
		damageEffect.label += ' ' + damageType;
		damageEffect.changes = damageBonusChanges;
		let resistanceEffect = spellEffects.absorbElements.resistanceBonus;
		resistanceEffect.label += ' ' + damageType;
		resistanceEffect.changes = resistanceBonusChanges;
		let theActor = await fromUuid(lastArg.actorUuid);
		if (theActor.actor) theActor = theActor.actor;
		await ggHelpers.createEffect(theActor, damageEffect);
		await ggHelpers.createEffect(theActor, resistanceEffect);
	}
}
