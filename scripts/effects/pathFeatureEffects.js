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
}

let hemorrhagingStrikesEffect = {
	'label': 'Hemorrhaging',
	'icon': 'icons/skills/wounds/anatomy-organ-heart-red.webp',
	'duration': {
		'rounds': 2,
		'startTime': null,
		'seconds': null,
		'combat': null,
		'turns': null,
		'startRound': null,
		'startTurn': null
	},
	'flags': {
		'dfreds-convenient-effects': {
			'description': 'Takes additional non magical bludgeoning damage at the start of each turn'
		},
		"dae": {
			"selfTarget": false,
			"selfTargetAlways": false,
			"stackable": "multi"
		}
	}
}

let concussedEffect = {
	"label": "Concussed",
	"icon": "icons/skills/wounds/injury-body-pain-gray.webp",
	"origin": null,
	"duration": {
		"rounds": 1,
		"startTime": null,
		"seconds": null,
		"combat": null,
		"turns": 1,
		"startRound": null,
		"startTurn": null
	},
	"disabled": false,
	"_id": "y3zZ9R3bfOxkhLd6",
	"changes": [
		{
			"key": "macro.CE",
			"mode": 0,
			"value": "Stunned",
			"priority": 20
		}
	],
	"tint": null,
	"transfer": false,
	"flags": {
		"times-up": {},
		"dfreds-convenient-effects": {
			"description": "Stunned until the end of the attacker's next turn."
		},
		"dae": {
			"selfTarget": false,
			"selfTargetAlways": false,
			"stackable": "none",
			"durationExpression": "",
			"macroRepeat": "none",
			"specialDuration": [
				"turnEndSource"
			]
		},
		"core": {
			"statusId": ""
		},
		"ActiveAuras": {
			"isAura": false,
			"aura": "None",
			"radius": "undefined",
			"alignment": "",
			"type": "",
			"ignoreSelf": false,
			"height": false,
			"hidden": false,
			"displayTemp": false,
			"hostile": false,
			"onlyOnce": false
		}
	}
 }

let concussedImmunityEffect = {
	"label": "Concussive Strike Immunity",
	"icon": "icons/skills/melee/shield-block-gray-yellow.webp",
	"origin": null,
	"duration": {
		"startTime": null,
		"seconds": null,
		"combat": null,
		"rounds": 1,
		"turns": 1,
		"startRound": null,
		"startTurn": null
	},
	"disabled": false,
	"_id": "i48g5hn61mjZ4m8w",
	"changes": [],
	"tint": null,
	"transfer": false,
	"flags": {
		"times-up": {},
		"dfreds-convenient-effects": {
			"description": "Immunity to the effects of Concussive Strike"
		},
		"dae": {
			"selfTarget": false,
			"selfTargetAlways": false,
			"stackable": "none",
			"durationExpression": "",
			"macroRepeat": "none",
			"specialDuration": [
				"turnEndSource"
			]
		},
		"core": {
			"statusId": ""
		},
		"ActiveAuras": {
			"isAura": false,
			"aura": "None",
			"radius": "undefined",
			"alignment": "",
			"type": "",
			"ignoreSelf": false,
			"height": false,
			"hidden": false,
			"displayTemp": false,
			"hostile": false,
			"onlyOnce": false
		}
	}
}

export let pathFeatureEffects = {
	'chromaticInfusion': chromaticInfusionEffect,
	'hemorrhagingStrikes': hemorrhagingStrikesEffect,
	'concussed': concussedEffect,
	'concussedImmunity': concussedImmunityEffect
}
