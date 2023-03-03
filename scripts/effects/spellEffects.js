import {ggHelpers} from '../helperFunctions.js';
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
};
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
};
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
};
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
};
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
};
export let spellEffects = {
	'absorbElements': { 'damageBonus': absorbElementsDamageBonus, 'resistanceBonus': absorbElementsResistanceBonus},
	'boomingBlade': boomingBladeEffect,
	'thrumming': thrummingEffect,
	'greenFlameBlade': greenFlameBladeEffect
};
