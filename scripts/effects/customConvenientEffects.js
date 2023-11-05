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

let draconicCry = {
	"label": "Draconic Cry",
	"icon": "icons/creatures/reptiles/lizard-mouth-glowing-red.webp",
	"duration": {
		"rounds": 1,
		"startTime": null,
		"seconds": null,
		"combat": null,
		"turns": null,
		"startRound": null,
		"startTurn": null
	},
	"changes": [
		{
			"key": "flags.midi-qol.grants.advantage.attack.all",
			"mode": 0,
			"value": "true",
			"priority": 20
		}
	],
	"flags": {
		"dfreds-convenient-effects": {
			"description": "Grants Advantage to all incoming attack rolls for one round."
		},
		"dae": {
			"specialDuration": [
				"turnStartSource"
			]
		}
	}
}

let giftOfAlacrity = {
	"changes": [
	  {
		"key": "system.attributes.init.bonus",
		"value": "+1d8",
		"mode": 2,
		"priority": 20
	  }
	],
	"duration": {
	  "startTime": null,
	  "seconds": null,
	  "rounds": null,
	  "turns": null,
	  "startRound": null,
	  "startTurn": null,
	  "combat": null
	},
	"icon": "icons/skills/movement/ball-spinning-blue.webp",
	"label": "Gift of Alacrity",
	"flags": {
		"dfreds-convenient-effects": {
			"description": "Adds +1d8 to Initiative Rules",
		},
		"dae": {
			"specialDuration": [
				"longRest"
			]
		}
	}
}

let silveryBarbs = {
	"changes": [
		{
			"key": "flags.midi-qol.advantage.all",
			"mode": 0,
			"value": "true",
			"priority": 20
		}	
	],
	"disabled": false,
	"duration": {
	  "startTime": null,
	  "seconds": null,
	  "rounds": 1,
	  "turns": null,
	  "startRound": null,
	  "startTurn": null,
	  "combat": null
	},
	"icon": "icons/magic/air/air-smoke-casting.webp",
	"label": "Silvery Barbs",
	"flags": {
		"dfreds-convenient-effects": {
			"description": "Grants Advantage on the next d20 test",
		},
		"dae": {
			"specialDuration": [
				"1Attack",
				"isSave",
				"isCheck",
				"isSkill"
			]
		}
	}
}

let hypnoticPattern = {
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
			"description": "Creature is Charmed. While Charmed is also Incapacitated. Taking damage removes the effect."
		},
		"dae": {
			"specialDuration": [
				"isDamaged"
			]
		}
	},
	"changes": [
		{
			"key": "macro.CE",
			"mode": 0,
			"value": "Charmed",
			"priority": 20
		},
		{
			"key": "macro.CE",
			"mode": 0,
			"value": "Incapacitated",
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

let emboldeningBond = {
	'label': 'Emboldening Bond',
	'icon': 'icons/skills/social/peace-luck-insult.webp',
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

export let convenientEffects = [
	displacementEffect,
	draconicCry,
	giftOfAlacrity,
	silveryBarbs,
	hypnoticPattern
	// emboldeningBond
]
