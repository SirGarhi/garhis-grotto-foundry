import {ggHelpers} from '../../helperFunctions.js';

export async function conjureSphere(args, promptDamageType) {
	const filePath = 'modules/jb2a_patreon/Library/2nd_Level/Flaming_Sphere/';
	let summonImage = 'FlamingSphere_01_Orange_Thumb.webp';
	let summonTokenImage = 'FlamingSphere_01_Orange_200x200.webm';
	let damageType='fire';
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
				summonImage = 'FlamingSphere_01_Green_Thumb.webp';
				summonTokenImage = 'FlamingSphere_01_Green_200x200.webm';
				break;
			case 'cold':
				summonImage = 'FlamingSphere_01_Blue_Thumb.webp';
				summonTokenImage = 'FlamingSphere_01_Blue_200x200.webm';
				break;
			case 'lightning':
				summonImage = 'FlamingSphere_01_Orange_Thumb.webp';
				summonTokenImage = 'FlamingSphere_01_Orange_200x200.webm';
				break;
			case 'thunder':
				summonImage = 'FlamingSphere_02_Blue_Thumb.webp';
				summonTokenImage = 'FlamingSphere_02_Blue_200x200.webm';
				break;
			case 'poison':
				summonImage = 'FlamingSphere_01_Green_Thumb.webp';
				summonTokenImage = 'FlamingSphere_01_Green_200x200.webm';
				break;
			case 'force':
				summonImage = 'FlamingSphere_02_Blue_Thumb.webp';
				summonTokenImage = 'FlamingSphere_02_Blue_200x200.webm';
				break;
			case 'necrotic':
				summonImage = 'FlamingSphere_01_Purple_Thumb.webp';
				summonTokenImage = 'FlamingSphere_01_Purple_200x200.webm';
				break;
			case 'radiant':
				summonImage = 'FlamingSphere_02_Orange_Thumb.webp';
				summonTokenImage = 'FlamingSphere_02_Orange_200x200.webm';
				break;
			case 'psychic':
				summonImage = 'FlamingSphere_01_Pink_Thumb.webp';
				summonTokenImage = 'FlamingSphere_01_Pink_200x200.webm';
				break;
			case 'bludgeoning':
				summonImage = 'FlamingSphere_01_Red_Thumb.webp';
				summonTokenImage = 'FlamingSphere_01_Red_200x200.webm';
				break;
			case 'piercing':
				summonImage = 'FlamingSphere_01_Red_Thumb.webp';
				summonTokenImage = 'FlamingSphere_01_Red_200x200.webm';
				break;
			case 'slashing':
				summonImage = 'FlamingSphere_01_Red_Thumb.webp';
				summonTokenImage = 'FlamingSphere_01_Red_200x200.webm';
				break;
			case 'fire':
			default:
				break;
		}
	}
	let lastArg = args[args.length-1];
	console.log(lastArg);
	let token = canvas.tokens.get(lastArg.tokenId);
	let summonName = `Flaming Sphere - ${lastArg.actor.name}`;
	const midiOverTime = `turn=end,label=Flaming Sphere Burn,damageRoll=${(lastArg.castData.castLevel)}d6,damageType=${damageType},saveRemove=false,saveMagic=true,saveDC=${lastArg.actor.system.attributes.spelldc},saveAbility=dex,saveDamage=halfdamage`;
	let summonEffectData = {
		label: "Flaming Sphere",
		icon: filePath+summonImage,
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
			"dfreds-convenient-effects": {
				"description": "Deals fire damage upon a creature ending their turn within the radius."
			},
			"dae": {
				"showIcon": true
			}
		}
	}
	let summonUpdates = {
		'token': {
			'name': summonName,
			'texture.src': filePath+summonTokenImage
		},
		'actor': {
			'name': summonName,
			'img': filePath+summonImage,
		},
		'embedded': {
			'ActiveEffect': {
				[summonEffectData.label]: summonEffectData
			}
		}
	}
	let summonId = await warpgate.spawn('GG - Flaming Sphere', summonUpdates, {}, {'controllingActor': lastArg.actor});
	const summonedToken = game.canvas.tokens.get(summonId[0]);
	const summonTokenUuid = summonedToken.document.uuid;
	let damage = { parts: [[`${lastArg.castData.castLevel}d6`, damageType]], versatile: "" };
	let attackData = await ggHelpers.getItemFromCompendium('garhis-grotto.gg-item-blueprints', 'Flaming Sphere Ram', false);
	attackData.system.damage = damage;
	let summonEffect = ggHelpers.findEffect(lastArg.actor, 'Flaming Sphere');
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
		'name': 'Flaming Sphere',
		'description': 'Flaming Sphere Summon'
	}
	await warpgate.mutate(token.document, actorUpdates, {}, options);
}
