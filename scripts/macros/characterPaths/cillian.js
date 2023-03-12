import { ggHelpers } from "../../helperFunctions.js";

async function superiorReactionShield(args) {
	const lastArg = args[args.length-1];
	let effectData = {
		"label": "Superior Reaction Shield",
		"icon": "icons/equipment/shield/buckler-wooden-boss-glowing-blue.webp",
		"origin": lastArg.item.uuid,
		"duration": {
		  "rounds": 1,
		  "startTime": null,
		  "seconds": null,
		  "combat": null,
		  "turns": null,
		  "startRound": null,
		  "startTurn": null
		},
		"disabled": false,
		"changes": [
			{key: "system.attributes.ac.bonus", mode: CONST.ACTIVE_EFFECT_MODES.ADD, priority: 20, value: `+${lastArg.damageTotal}`}
		],
		"tint": null,
		"transfer": false,
		"flags": {
			"dfreds-convenient-effects": {
				"description": "Grants a bonus to Armor Class until the start of your next turn."
			},
			"dae": {
				"selfTarget": false,
				"selfTargetAlways": false,
				"stackable": "none",
				"durationExpression": "",
				"macroRepeat": "none",
				"specialDuration": [
					"turnStartSource"
				]
			}
		}
	}
	await ggHelpers.createEffect(lastArg.actor, effectData);
}

export let cillian = {
	'superiorReactionShield': superiorReactionShield
}
