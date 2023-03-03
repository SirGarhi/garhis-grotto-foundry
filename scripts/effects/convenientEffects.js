import {ggHelpers} from '../helperFunctions.js';

let emboldeningBondEffect = {
	'label': 'Emboldening Bond',
	'icon': 'icons/magic/holy/prayer-hands-glowing-yellow-green.webp',
	"duration": {
		"rounds": null,
		"startTime": null,
		"seconds": 600,
		"combat": null,
		"turns": null,
		"startRound": null,
		"startTurn": null
	},
	"disabled": false,
	"changes": [
		{
			"key": "flags.midi-qol.optional.EmbBond.label",
			"mode": 0,
			"value": "Emboldening Bond",
			"priority": 20
		},
		{
			"key": "flags.midi-qol.optional.EmbBond.count",
			"mode": 0,
			"value": "turn",
			"priority": 20
		},
		{
			"key": "flags.midi-qol.optional.EmbBond.attack.all",
			"mode": 0,
			"value": "+1d4",
			"priority": 20
		},
		{
			"key": "flags.midi-qol.optional.EmbBond.check.all",
			"mode": 0,
			"value": "+1d4",
			"priority": 20
		},
		{
			"key": "flags.midi-qol.optional.EmbBond.skill.all",
			"mode": 0,
			"value": "+1d4",
			"priority": 20
		},
		{
			"key": "flags.midi-qol.optional.EmbBond.save.all",
			"mode": 0,
			"value": "+1d4",
			"priority": 20
		}
	  ]
}
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
let hypnoticPatternEffect = {
	'label': 'Hypnotic Pattern',
	'icon': 'icons/magic/control/hypnosis-mesmerism-swirl.webp',
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
			"key": "StatusEffect",
			"mode": CONST.ACTIVE_EFFECT_MODES.CUSTOM,
			"value": "Convenient Effect: Charmed",
			"priority": 20
		},
		{
			"key": "StatusEffect",
			"mode": CONST.ACTIVE_EFFECT_MODES.CUSTOM,
			"value": "Convenient Effect: Incapacitated",
			"priority": 20
		},
		{
			"key": "system.attributes.movement.all",
			"mode": 0,
			"value": "*0",
			"priority": 20
		}
	]
}
export let convenientEffects = [
	emboldeningBondEffect,
	displacementEffect,
	hypnoticPatternEffect
]
