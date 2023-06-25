import { ggHelpers } from '../../../helperFunctions.js';

async function unsettlingWords({speaker, actor, token, character, item, args}) {
	let lastArg = args[args.length-1];
	console.log(lastArg);
	if (lastArg.hitTargets.length != 1 ) { return }
	let effectData = {
		"label": "Unsettled",
		"icon": "icons/creatures/eyes/humanoid-single-blue.webp",
		"duration": {
			"rounds": 1
		},
		"changes": [
			{
				"key": "system.bonuses.abilities.save",
				"mode": 2,
				"value": `-${lastArg.damageTotal}`,
				"priority": 20
			}
		],
		"flags": {
			"dfreds-convenient-effects": {
				"description": "Penalty to Next Saving Throw"
			},
			"dae": {
				"specialDuration": [
					"isSave"
				]
			}
		}
	}
	await ggHelpers.createEffect(lastArg.hitTargets[0].actor, effectData);
}

export let bard = {
	'unsettlingWords': unsettlingWords
}
