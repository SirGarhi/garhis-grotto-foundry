import {ggHelpers} from '../helperFunctions.js';

let elementalMatrixEffect = {
	'label': 'Defensive Elemental Matrix',
	'icon': 'icons/magic/defensive/shield-barrier-flaming-diamond-teal-purple.webp',
	"duration": {
		"rounds": 1,
		"startTime": null,
		"seconds": null,
		"combat": null,
		"turns": null,
		"startRound": null,
		"startTurn": null
	},
	"flags": {
		"dfreds-convenient-effects": {
			"description": "Grants resistance to the triggering element until the start of your next turn"
		},
		"dae": {
			"specialDuration": [
				"turnStartSource"
			]
		},
		"core": {
			"statusId": ""
		}
	}
}
let advancedBladesongResistanceEffect = {
	'label': 'Advanced Bladesong Resistance',
	'icon': 'icons/magic/symbols/cross-circle-blue.webp',
	"duration": {
		"rounds": 10,
		"startTime": null,
		"seconds": 60,
		"combat": null,
		"turns": null,
		"startRound": null,
		"startTurn": null
	},
	"flags": {
		"dfreds-convenient-effects": {
			"description": "Grants resistance to the chosen damage type."
		},
		"dae": {
		},
		"core": {
			"statusId": ""
		}
	}
}
export let awakenedWeaponEffects = {
	'elementalMatrixEffect': elementalMatrixEffect,
	'advancedBladesongResistance': advancedBladesongResistanceEffect
};
