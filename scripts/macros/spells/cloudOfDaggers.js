import {ggHelpers} from '../../helperFunctions.js';

export async function conjureCloud(args, promptDamageType) {
	const filepath = 'modules/jb2a_patreon/Library/2nd_Level/Cloud_Of_Daggers/';
	let summonImage = 'CloudOfDaggers_01_Light_Blue_Thumb.webp';
	let summonTokenImage = 'CloudOfDaggers_01_Light_Blue_400x400.webm';
	let damageType='slashing';
	if (promptDamageType) {
		damageType = await ggHelpers.buttonMenu('What damage type is your sphere?', [
			['Acid', 'acid'],
			['Cold', 'cold'],
			['Fire', 'fire'],
			['Lightning', 'lightning'],
			['Thunder', 'thunder'],
			['Poison', 'poison'],
			['Force', 'force'],
			['Necrotic', 'necrotic'],
			['Radiant', 'radiant'],
			['Psychic', 'psychic'],
			['Bludgeoning', 'bludgeoning'],
			['Piercing', 'piercing'],
			['Slashing', 'slashing']
		]);
		switch (damageType) {
			case 'acid':
				summonImage = 'CloudOfDaggers_01_Light_Green_Thumb.webp';
				summonTokenImage = 'CloudOfDaggers_01_Light_Green_400x400.webm';
				break;
			case 'cold':
				summonImage = 'CloudOfDaggers_Kunai_01_Light_Blue_Thumb.webp';
				summonTokenImage = 'CloudOfDaggers_Kunai_01_Light_Blue_400x400.webm';
				break;
			case 'fire':
				summonImage = 'CloudOfDaggers_01_Light_Orange_Thumb.webp';
				summonTokenImage = 'CloudOfDaggers_01_Light_Orange_400x400.webm';
				break;
			case 'lightning':
				summonImage = 'CloudOfDaggers_01_Light_Yellow_Thumb.webp';
				summonTokenImage = 'CloudOfDaggers_01_Light_Yellow_400x400.webm';
				break;
			case 'thunder':
				summonImage = 'CloudOfDaggers_01_Light_Blue_Thumb.webp';
				summonTokenImage = 'CloudOfDaggers_01_Light_Blue_400x400.webm';
				break;
			case 'poison':
				summonImage = 'CloudOfDaggers_Kunai_01_Light_Green_Thumb.webp';
				summonTokenImage = 'CloudOfDaggers_Kunai_01_Light_Green_400x400.webm';
				break;
			case 'force':
				summonImage = 'CloudOfDaggers_Kunai_01_Light_Purple_Thumb.webp';
				summonTokenImage = 'CloudOfDaggers_Kunai_01_Light_Purple_400x400.webm';
				break;
			case 'necrotic':
				summonImage = 'CloudOfDaggers_01_Dark_Purple_Thumb.webp';
				summonTokenImage = 'CloudOfDaggers_01_Dark_Purple_400x400.webm';
				break;
			case 'radiant':
				summonImage = 'CloudOfDaggers_Kunai_01_Light_Yellow_Thumb.webp';
				summonTokenImage = 'CloudOfDaggers_Kunai_01_Light_Yellow_400x400.webm';
				break;
			case 'psychic':
				summonImage = 'CloudOfDaggers_Kunai_01_Dark_Purple_Thumb.webp';
				summonTokenImage = 'CloudOfDaggers_Kunai_01_Dark_Purple_400x400.webm';
				break;
			case 'bludgeoning':
				summonImage = 'CloudOfDaggers_01_Dark_Red_Thumb.webp';
				summonTokenImage = 'CloudOfDaggers_01_Dark_Red_400x400.webm';
				break;
			case 'piercing':
				summonImage = 'CloudOfDaggers_Kunai_01_Dark_Red_Thumb.webp';
				summonTokenImage = 'CloudOfDaggers_Kunai_01_Dark_Red_400x400.webm';
				break;
			case 'slashing':
			default:
				break;
		}
	}
	let lastArg = args[args.length-1];
	let token = canvas.tokens.get(lastArg.tokenId);
	let summonName = `Cloud of Daggers - ${lastArg.actor.name}`;
	const midiOverTime = `turn=start,label=Cloud of Daggers Slash,damageRoll=${(lastArg.castData.castLevel*2)}d4,damageType=${damageType}`;
	let summonEffectData = {
		label: "Cloud of Daggers",
		icon: filepath+summonImage,
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
				"description": `Deals ${damageType} damage upon entering and at the start of creatures turn.`
			},
			"dae": {
				"showIcon": true
			}
		}
	}
	let summonUpdates = {
		'token': {
			'name': summonName,
			'texture.src': filepath+summonTokenImage
		},
		'actor': {
			'name': summonName,
			'img': filepath+summonImage,
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
	let damage = { parts: [[`${lastArg.castData.castLevel*2}d4`, damageType]], versatile: "" };
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
