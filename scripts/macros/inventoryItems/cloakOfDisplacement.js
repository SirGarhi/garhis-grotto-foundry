import { ggHelpers } from "../../helperFunctions.js";
import { itemEffects } from "../../effects/itemEffects.js";

export async function cloakOfDisplacement(actor) {
	if(!ggHelpers.findEffect(actor, 'Displaced')) {
		let effect = structuredClone(itemEffects.displacement);
		await ggHelpers.createEffect(actor, effect);
	}
}
