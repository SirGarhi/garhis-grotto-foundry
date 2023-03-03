import { ggHelpers } from '../../helperFunctions.js';
import { signatureItemEffects } from '../../effects/signatureItemEffects.js';
export async function chromaticInfusion(args) {
	const lastArg = args[args.length-1];
	let buttons = [
		['Acid','acid'],
		['Cold','cold'],
		['Fire','fire'],
		['Lightning','lightning'],
		['Poison','poison']
	];
	let damageType = await ggHelpers.buttonMenu('Select Damage Type to Infuse', buttons);
	let effect = signatureItemEffects.chromaticInfusion;
	const damageBonus = {key: "system.bonuses.rwak.damage", mode: CONST.ACTIVE_EFFECT_MODES.ADD, priority: 20, value: "+1d6["+damageType+"]"}
	effect.label = effect.label+' - '+damageType;
	effect.changes.push(damageBonus);
	let actor = await ggHelpers.tokenOrActor(await fromUuid(lastArg.actorUuid));
	await ggHelpers.createEffect(actor, effect);
}
