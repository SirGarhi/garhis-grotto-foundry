import { ggHelpers } from "../../helperFunctions.js";
import { itemEffects } from "../../effects/itemEffects.js";

export async function fireEssenceShard({speaker, actor, token, character, item, args, scope, workflow}) {
	if (workflow.targets.size != 1) return;
	let effect = structuredClone(itemEffects.fireEssenceShard);
	effect.origin = workflow.actor.uuid;
	await ggHelpers.createEffect(workflow.targets.first().actor, effect);
}
