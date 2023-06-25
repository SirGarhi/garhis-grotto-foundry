import {ggHelpers} from '../../helperFunctions.js';

export async function conjureCloud(args, summonImage, summonTokenImage) {
	let lastArg = args[args.length-1];
	let token = canvas.tokens.get(lastArg.tokenId);
	let summonName = `Cloud of Daggers - ${lastArg.actor.name}`;
	const midiOverTime = `turn=start,label=Cloud of Daggers Slash,damageRoll=${(lastArg.castData.castLevel*2)}d4,damageType=slashing,killAnim=true`;
	let summonEffectData = {
		label: "Cloud of Daggers",
		icon: summonImage,
		changes: [
			{
				key: "flags.midi-qol.OverTime", 
				mode: CONST.ACTIVE_EFFECT_MODES.CUSTOM, 
				value: midiOverTime
			}
		],
		'flags': {
			"ActiveAuras": {
				"isAura": true,
				"aura": "All",
				"radius": "2",
				"alignment": "",
				"type": "",
				"ignoreSelf": true,
				"height": false,
				"hidden": false,
				"displayTemp": true,
				"hostile": false,
				"onlyOnce": false
			},
			"dfreds-convenient-effects": {
				"description": "Deals slashing damage upon entering and at the start of creatures turn."
			},
			"core": {
				"statusId": "true"
			}
		}
	}
	let summonUpdates = {
		'token': {
			'name': summonName,
			'texture.src': summonTokenImage
		},
		'actor': {
			'name': summonName,
			'img': summonImage,
		},
		'embedded': {
			'ActiveEffect': {
				[summonEffectData.label]: summonEffectData
			}
		}
	}
	let summonId = await warpgate.spawn('GG - Cloud of Daggers', summonUpdates, {}, {'controllingActor': lastArg.actor});
	const summonedToken = game.canvas.tokens.get(summonId[0]);
	const summonTokenUuid = summonedToken.document.uuid;
	let damage = { parts: [[`${lastArg.castData.castLevel*2}d4`, "slashing"]], versatile: "" };
	let attackData = await ggHelpers.getItemFromCompendium('garhis-grotto.gg-item-blueprints', 'Cloud of Daggers Slash', false);
	attackData.system.damage = damage;
	let summonEffect = ggHelpers.findEffect(lastArg.actor, 'Cloud of Daggers');
	if (summonEffect) {
		let updates = {
			'changes': [ { 'key': 'flags.dae.deleteUuid', 'mode': CONST.ACTIVE_EFFECT_MODES.ADD, 'value': [summonTokenUuid] } ]
		};
		await ggHelpers.updateEffect(summonEffect, updates);
	}
	let actorUpdates = {
		'embedded': {
			'Item': {
				[attackData.name]: attackData
			}
		}
	}
	let options = {
		'permanent': false,
		'name': 'Cloud of Daggers',
		'description': 'Cloud of Daggers'
	}
	await warpgate.mutate(token.document, actorUpdates, {}, options);
}
