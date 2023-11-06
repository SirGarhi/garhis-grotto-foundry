import { ggHelpers } from "../../helperFunctions.js";
import { itemEffects } from "../../effects/itemEffects.js";

export async function shadowfellShard({speaker, actor, token, character, item, args, scope, workflow}) {
	if (workflow.targets.size != 1) {
		ui.notifications.warn('Shadowfell Shard can only be used on a single target');
		return;
	}
	let selection = await ggHelpers.buttonMenu('What ability should have disadvantage?', [
		['Strength', ['str', 'Strength']],
		['Dexterity', ['dex', 'Dexterity']],
		['Constitution', ['con', 'Constitution']],
		['Intelligence', ['int', 'Intelligence']],
		['Wisdom', ['wis', 'Wisdom']],
		['Charisma', ['cha', 'Charisma']]
	]);
	if (!selection) {
		ui.notifications.warn("Didn't select an attribute to curse, not applying any effect");
		return;
	}
	let effect = structuredClone(itemEffects.shadowfellShard);
	let changes = [
		{
			"key": "flags.midi-qol.disadvantage.ability.check." + selection[0],
			"mode": 0,
			"value": "1",
			"priority": 20
		},
		{
			"key": "flags.midi-qol.disadvantage.ability.save." + selection[0],
			"mode": 0,
			"value": "1",
			"priority": 20
		}
	];
	effect.label = `${effect.label} - ${selection[1]}`;
	effect.changes = changes;
	effect.origin = workflow.actor.uuid;
	await ggHelpers.createEffect(workflow.targets.first().actor, effect);
}
