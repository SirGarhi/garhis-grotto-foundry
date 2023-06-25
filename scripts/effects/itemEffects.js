import {ggHelpers} from '../helperFunctions.js';

let shadowfellShardEffect = {
	"label": "Shadowfell Curse",
	"icon": "icons/magic/unholy/silhouette-robe-evil-power.webp",
	"duration": {
		"rounds": 1,
		"startTime": null,
		"seconds": null,
		"combat": null,
		"turns": 1,
		"startRound": null,
		"startTurn": null
	},
	"flags": {
		"dfreds-convenient-effects": {
			"description": "Imposes Disadvantage on Ability Checks and Saving Throws of the chosen ability"
		},
		"dae": {
			"specialDuration": [
				"turnEndSource"
			]
		}
	}
}

let fireEssenceShardEffect = {
	"label": "Fire Essence Burn",
	"icon": "icons/magic/fire/flame-burning-creature-skeleton.webp",
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
	  {
		"key": "flags.midi-qol.OverTime",
		"mode": 5,
		"value": "turn=start,\nlabel=Essence Burn,\ndamageRoll=2d10,\ndamageType=fire",
		"priority": 20
	  },
	  {
		"key": "macro.tokenMagic",
		"mode": 0,
		"value": "pure-fire-aura-2",
		"priority": 20
	  }
	],
	"flags": {
		"dfreds-convenient-effects": {
			"description": "Deals Fire Damage at the Start of Turn"
		},
		"dae": {
			"specialDuration": [
				"turnEnd"
			]
		}
	}
}

export let itemEffects = {
	'shadowfellShard': shadowfellShardEffect,
	'fireEssenceShard': fireEssenceShardEffect
};
