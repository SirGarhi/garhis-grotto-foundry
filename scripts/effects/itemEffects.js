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

let displacementEffect = {
	"name": "Displaced",
	"icon": "modules/garhis-grotto/assets/art/icons/active_effects/dodging.svg",
	"duration": {
		"startTime": null,
		"seconds": null,
		"combat": null,
		"rounds": null,
		"turns": null,
		"startRound": null,
		"startTurn": null
	},
	"transfer": false,
	"disabled": false,
	"_id": "KSSIt1oFdFVf1TOa",
	"changes": [
		{
			"key": "flags.midi-qol.grants.disadvantage.attack.all",
			"mode": 0,
			"value": "true",
			"priority": 20
		}
	],
	"description": "<p>Attack rolls against you have disadvantage. Taking damage removes the effect until the start of your next turn.</p>",
	"statuses": [],
	"flags": {
		"times-up": {
			"isPassive": true
		},
		"dae": {
			"disableIncapacitated": true,
			"selfTarget": false,
			"selfTargetAlways": false,
			"dontApply": false,
			"stackable": "noneName",
			"showIcon": true,
			"durationExpression": "",
			"macroRepeat": "none",
			"specialDuration": [
				"isDamaged"
			]
		}
	},
	"tint": null
  }

export let itemEffects = {
	'shadowfellShard': shadowfellShardEffect,
	'fireEssenceShard': fireEssenceShardEffect,
	'displacement': displacementEffect
};
