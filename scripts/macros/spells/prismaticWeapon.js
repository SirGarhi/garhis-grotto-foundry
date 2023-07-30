import { ggHelpers } from "../../helperFunctions.js";
import { spellEffects } from "../../effects/spellEffects.js";

export async function prismaticWeapon(workflow, bonusType, extraDamage) {

	let buttons = [
		['Acid','acid'],
		['Cold','cold'],
		['Fire','fire'],
		['Lightning','lightning'],
		['Poison','poison'],
		['Thunder','thunder']
	];
	let damageType = await ggHelpers.buttonMenu('Select Damage Type to Infuse', buttons);
	let effect = structuredClone(spellEffects.prismaticWeapon);
	let damageBonus;
	switch (workflow.castData.castLevel) {
		case 3:
			damageBonus = `+1d6[${damageType}]`;
			break;
		case 4:
		case 5:
			damageBonus = `+2d6[${damageType}]`;
			break;
		case 6:
		case 7:
		case 8:
		case 9:
			damageBonus = `+3d6[${damageType}]`;
			break;
		default:
			damageBonus = `+1d6[${damageType}]`;
	}
	if (extraDamage) {
		damageBonus = damageBonus + ` +1d4[${damageType}]`;
	}
	const damageChange = {key: bonusType, mode: CONST.ACTIVE_EFFECT_MODES.ADD, priority: 20, value: damageBonus}
	effect.label = effect.label+' - '+damageType;
	effect.changes.push(damageChange);
	//let actor = await ggHelpers.tokenOrActor(await fromUuid(lastArg.actorUuid));
	await ggHelpers.createEffect(workflow.actor, effect);
}
