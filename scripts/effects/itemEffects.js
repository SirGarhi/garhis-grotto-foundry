import {ggHelpers} from '../helperFunctions.js';

let displacementEffect = {
	'label': 'Displaced',
	'icon': 'modules/garhis-grotto/assets/art/icons/active_effects/dodging.svg',
	"duration": {
		"rounds": null,
		"startTime": null,
		"seconds": null,
		"combat": null,
		"turns": null,
		"startRound": null,
		"startTurn": null
	},
	"flags": {
		"dfreds-convenient-effects": {
			"description": "Imposes disadvantage on all incoming attack rolls until taking damage."
		},
		"dae": {
			"specialDuration": [
				"isDamaged"
			]
		},
		"core": {
			"statusId": ""
		}
	},
	"changes": [
		{
			"key": "flags.midi-qol.grants.disadvantage.attack.all",
			"mode": CONST.ACTIVE_EFFECT_MODES.CUSTOM,
			"value": "true",
			"priority": 20
		}
	]
}


export let itemEffects = {
	'displacement': displacementEffect
};
