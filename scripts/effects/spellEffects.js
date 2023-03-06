let absorbElementsDamageBonus = {
	'label': 'Absorb Elements Damage Bonus',
	'icon': 'icons/magic/symbols/elements-air-earth-fire-water.webp',
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
			"description": "Deal additional elemental damage on your next melee hit"
		},
		"dae": {
			"specialDuration": [
				"turnEndSource",
				"1Hit:mwak"
			]
		},
		"core": {
			"statusId": ""
		}
	},
	"changes": []
}
let absorbElementsResistanceBonus = {
	'label': 'Absorb Elements Resistance',
	'icon': 'icons/magic/symbols/elements-air-earth-fire-water.webp',
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
			"description": "Grants resistance to the absorbed element until the start of your next turn"
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
let boomingBladeEffect = {
	'label': 'Booming Blade',
	'icon': 'icons/skills/melee/strike-sword-slashing-red.webp',
	"duration": {
		"rounds": null,
		"startTime": null,
		"seconds": 6,
		"combat": null,
		"turns": 1,
		"startRound": null,
		"startTurn": null
	},
	"flags": {
		"dfreds-convenient-effects": {
			"description": "Deal additional thunder damage on your next melee attack"
		},
		"dae": {
			"specialDuration": [
				'1Attack:mwak',
				'turnStartSource'
			],
			"stackable": "noneName"
		},
		"core": {
			"statusId": ""
		}
	},
	"changes": []
}
let thrummingEffect = {
	'label': 'Thrumming',
	'icon': 'icons/magic/sonic/explosion-shock-wave-teal.webp',
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
			"description": "Applied by Booming Blade and deals thunder damage if the target moves before the start of the caster's next turn"
		},
		"dae": {
			"specialDuration": [
				"turnStartSource",
				"isMoved"
			],
			"stackable": "none"
		},
		"core": {
			"statusId": ""
		}
	},
	"changes": [
		{
			"key": "macro.execute.GM",
			"mode": CONST.ACTIVE_EFFECT_MODES.CUSTOM,
			"value": "GG_thrummingExplosion",
			"priority": 20
		}
	]
}
let greenFlameBladeEffect = {
	'label': 'Green-Flame Blade',
	'icon': 'icons/weapons/swords/greatsword-evil-green.webp',
	"duration": {
		"rounds": null,
		"startTime": null,
		"seconds": 6,
		"combat": null,
		"turns": 1,
		"startRound": null,
		"startTurn": null
	},
	"flags": {
		"dfreds-convenient-effects": {
			"description": "Deal additional fire damage on your next melee attack"
		},
		"dae": {
			"specialDuration": [
				'1Attack:mwak',
				'turnStartSource'
			],
			"stackable": "noneName"
		},
		"core": {
			"statusId": ""
		}
	},
	"changes": []
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
			"description": "Creature is Charmed. While Charmed is also Incapacitated. Taking damage removes the effect."
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
let blessEffect = {
	'label': 'Bless',
	'icon': 'icons/magic/holy/chalice-glowing-gold-water.webp',
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
			"description": "Grants a +1d4 bonus on all saving throws and attack rolls."
		},
		"dae": {

		},
		"core": {
			"statusId": ""
		}
	},
	"changes": [
		{
			"key": "system.bonuses.abilities.save",
			"mode": 2,
			"value": "+1d4",
			"priority": 20
		},
		{
			"key": "system.bonuses.All-Attacks",
			"mode": 2,
			"value": "+1d4",
			"priority": 20
		}
	]
}
let familiarDistraction =     {
	"label": "Familiar Distraction",
	"icon": "icons/creatures/birds/raptor-owl-flying-moon.webp",
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
	"_id": "EnNRhSEo5HEYxjCf",
	"changes": [
		{
			"key": "flags.midi-qol.grants.advantage.attack.all",
			"mode": 0,
			"value": "true",
			"priority": 20
		}
	],
	"tint": null,
	"transfer": false,
	"flags": {
		"times-up": {},
		"dfreds-convenient-effects": {
			"description": "Grants advantage to the next incoming attack roll."
		},
		"dae": {
			"selfTarget": false,
			"selfTargetAlways": false,
			"stackable": "none",
			"durationExpression": "",
			"macroRepeat": "none",
			"specialDuration": [
				"isAttacked"
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
export let spellEffects = {
	'absorbElements': { 'damageBonus': absorbElementsDamageBonus, 'resistanceBonus': absorbElementsResistanceBonus},
	'boomingBlade': boomingBladeEffect,
	'thrumming': thrummingEffect,
	'greenFlameBlade': greenFlameBladeEffect,
	'hynpoticPattern': hypnoticPatternEffect,
	'bless': blessEffect,
	'familiarHelp': familiarDistraction
};
