import {ggHelpers} from '../helperFunctions.js';

let tranceProficiencyEffect = {
	'label': 'Trance Proficiencies',
	'icon': 'icons/skills/trades/academics-book-study-purple.webp',
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
			"description": "Gain 2 proficiencies of your choice until you finish a long rest."
		},
		"dae": {
			"specialDuration": []
		}
	},
	"changes": []
};

let baseRageEffect = {
	"label": "Rage",
	"icon": "icons/magic/control/buff-strength-muscle-damage-orange.webp",
	"origin": null,
	"changes": [
		{
			"key": "system.traits.dr.value",
			"mode": 0,
			"value": "bludgeoning",
			"priority": 20
		},
		{
			"key": "system.traits.dr.value",
			"mode": 0,
			"value": "piercing",
			"priority": 20
		},
		{
			"key": "system.traits.dr.value",
			"mode": 0,
			"value": "slashing",
			"priority": 20
		},
		{
			"key": "system.bonuses.mwak.damage",
			"mode": 2,
			"value": "+@scale.barbarian.rage-damage",
			"priority": 20
		},
		{
			"key": "flags.midi-qol.advantage.ability.check.str",
			"mode": 0,
			"value": "true",
			"priority": 20
		},
		{
			"key": "flags.midi-qol.advantage.ability.save.str",
			"mode": 0,
			"value": "true",
			"priority": 20
		},
		{
			"key": "flags.midi-qol.fail.spell.all",
			"mode": 0,
			"value": "true",
			"priority": 20
		}
	],
	"duration": {
		"startTime": null,
		"seconds": 60,
		"rounds": 10,
		"turns": null,
		"startRound": null,
		"startTurn": null,
		"combat": null
	},
	"tint": null,
	"transfer": false,
	"disabled": false,
	"flags": {
		"dae": {
			"transfer": false,
			"stackable": "multi"
		},
		"midi-qol": {
			"forceCEOff": true
		},
		"dfreds-convenient-effects": {
			"description": "Grants resistance to physical damage, scaling damage to melee attacks, and additional bonuses based on subclass features."
		}
	},
}

let specialRages = {
	'Totem Spirit: Bear': [
		{
			"key": "system.traits.dr.value",
			"mode": 0,
			"value": "acid",
			"priority": 20
		},
		{
			"key": "system.traits.dr.value",
			"mode": 0,
			"value": "cold",
			"priority": 20
		},
		{
			"key": "system.traits.dr.value",
			"mode": 0,
			"value": "fire",
			"priority": 20
		},
		{
			"key": "system.traits.dr.value",
			"mode": 0,
			"value": "force",
			"priority": 20
		},
		{
			"key": "system.traits.dr.value",
			"mode": 0,
			"value": "lightning",
			"priority": 20
		},
		{
			"key": "system.traits.dr.value",
			"mode": 0,
			"value": "necrotic",
			"priority": 20
		},
		{
			"key": "system.traits.dr.value",
			"mode": 0,
			"value": "poison",
			"priority": 20
		},
		{
			"key": "system.traits.dr.value",
			"mode": 0,
			"value": "radiant",
			"priority": 20
		},
		{
			"key": "system.traits.dr.value",
			"mode": 0,
			"value": "thunder",
			"priority": 20
		}
	],
	'Totem Spirit: Eagle': [],
	'Totem Spirit: Elk': [
		{
			"key": "system.attributes.movement.walk",
			"mode": 2,
			"value": "+15",
			"priority": 20
		}
	],
	'Totem Spirit: Venomfang': [
		{
			"key": "flags.dnd5e.DamageBonusMacro",
			"mode": 0,
			"value": "GG_venomfangDamage",
			"priority": 20
		}
	],
	'Totem Spirit: Wolf': [],
	'wolfSpiritRage': {
		"label": "Wolf Spirit Rage",
		"icon": "icons/creatures/abilities/wolf-howl-moon-purple.webp",
		"duration": {
		  "rounds": null,
		  "startTime": null,
		  "seconds": null,
		  "combat": null,
		  "turns": null,
		  "startRound": null,
		  "startTurn": null
		},
		"changes": [],
		"tint": null,
		"transfer": false,
		"flags": {
			"ActiveAuras": {
				"isAura": true,
				"aura": "Enemy",
				"radius": "5",
				"alignment": "",
				"type": "",
				"ignoreSelf": true,
				"height": false,
				"hidden": false,
				"displayTemp": true,
				"hostile": false,
				"onlyOnce": false
			},
			"dae": {
				"stackable": "multi"
			}
		}
	}
}

let twilightSanctuaryPulseEffect = {
	"label": "Channel Divinity: Twilight Sanctuary",
	"icon": "icons/magic/light/light-lantern-lit-white.webp",
	"duration": {
	  "startTime": null,
	  "seconds": 60,
	  "combat": null,
	  "rounds": 10,
	  "turns": null,
	  "startRound": null,
	  "startTurn": null
	},
	"disabled": false,
	"changes": [
	{
		"key": "flags.midi-qol.OverTime",
		"mode": 5,
		"value": "turn=end,\nlabel=Twilight Sanctuary,\nmacro=\"GG_twilightSanctuary\"",
		"priority": 20
	}
	],
	"tint": null,
	"transfer": false,
	"flags": {
		"dfreds-convenient-effects": {
			"description": "Emits a dome of dim light. Each creature ending their turn in the dome gets temporary hit points."
		},
		"dae": {
			"selfTarget": false,
			"selfTargetAlways": false,
			"stackable": "none",
			"durationExpression": "",
			"macroRepeat": "none",
			"specialDuration": []
		},
		"ActiveAuras": {
			"isAura": true,
			"aura": "Allies",
			"radius": "30",
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

export let featureEffects = {
	'trance': tranceProficiencyEffect,
	'baseRage': baseRageEffect,
	'specialRages': specialRages,
	'twilightSanctuaryPulse': twilightSanctuaryPulseEffect
}
