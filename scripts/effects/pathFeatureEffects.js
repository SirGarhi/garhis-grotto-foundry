import {ggHelpers} from '../helperFunctions.js';

let chromaticInfusionEffect = {
	'label': 'Chromatic Infusion',
	'icon': 'icons/creatures/reptiles/dragon-horned-blue.webp',
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
			"description": "Deal additional elemental damage of the infused type on every attack."
		},
	},
	"changes": []
};
export let pathFeatureEffects = {
	'chromaticInfusion': chromaticInfusionEffect
};
