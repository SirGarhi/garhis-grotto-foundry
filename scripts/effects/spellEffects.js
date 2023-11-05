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
let potentThrummingEffect = {
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
		}
	},
	"changes": [
		{
			"key": "macro.execute.GM",
			"mode": CONST.ACTIVE_EFFECT_MODES.CUSTOM,
			"value": "GG_potentThrummingExplosion",
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
		}
	},
	"changes": []
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
let hungerHadar = {
	"label": "Hunger of Hadar",
	"icon": "icons/magic/nature/root-vine-thorned-fire-purple.webp",
	"duration": {
		"startTime": null,
		"seconds": null,
		"combat": null,
		"rounds": null,
		"turns": null,
		"startRound": null,
		"startTurn": null
	},
	"changes": [
		{
			"key": "macro.CE",
			"mode": 0,
			"value": "Blinded",
			"priority": 20
		},
		{
			"key": "flags.midi-qol.OverTime",
			"mode": 5,
			"value": "turn=start,label=Hadar's Hungering Cold,damageRoll=2d6,damageType=cold,killAnim=true",
			"priority": 20
		},
		{
			"key": "flags.midi-qol.OverTime",
			"mode": 5,
			"value": "turn=end,label=Hadar's Hungering Acid,damageRoll=2d6,damageType=acid,saveRemove=false,saveDC=@attributes.spelldc,saveAbility=dex,saveDamage=nodamage,saveMagic=true,killAnim=true",
			"priority": 20
		}
	],
	"flags": {
		"dfreds-convenient-effects": {
			"description": "Blinded, suffers 2d6 Cold Damage at the start of turn, Dex Save for 2d6 Acid Damage at end of turn."
		},
		"dae": {
			"showIcon": true
		}
	}
}
let prismaticWeapon = {
	'label': 'Prismatic Weapon',
	'icon': 'icons/magic/fire/flame-burning-hand-white.webp',
	"duration": {
		"rounds": null,
		"startTime": null,
		"seconds": 3600,
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
let clockworkBoltEffect = {
	'label': 'Clockwork Bolt',
	'icon': 'icons/skills/ranged/arrow-flying-broadhead-metal.webp',
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
			"description": "Deal additional slashing damage with the next arrow or bolt fired"
		},
		"dae": {
			"specialDuration": [
				'1Attack:rwak',
				'turnStartSource'
			],
			"stackable": "noneName"
		}
	},
	"changes": []
}
let shreddingEffect = {
	'label': 'Shredding',
	'icon': 'icons/skills/ranged/arrow-flying-broadhead-metal.webp',
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
				"turnEnd"
			],
			"stackable": "none"
		}
		
	},
	"changes": [
		{
			"key": "macro.execute.GM",
			"mode": CONST.ACTIVE_EFFECT_MODES.CUSTOM,
			"value": "GG_shreddingShrapnel",
			"priority": 20
		}
	]
}
export let spellEffects = {
	'absorbElements': { 'damageBonus': absorbElementsDamageBonus, 'resistanceBonus': absorbElementsResistanceBonus},
	'boomingBlade': boomingBladeEffect,
	'thrumming': thrummingEffect,
	'potentThrumming': potentThrummingEffect,
	'greenFlameBlade': greenFlameBladeEffect,
	'bless': blessEffect,
	'hungerHadar': hungerHadar,
	'prismaticWeapon': prismaticWeapon,
	'clockworkBolt': clockworkBoltEffect,
	'shredding': shreddingEffect
};
