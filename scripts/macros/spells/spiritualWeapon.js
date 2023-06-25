import {ggHelpers} from '../../helperFunctions.js';

export async function spiritualWeapon(args, summonImage, summonTokenImage) {
	let lastArg = args[args.length-1];
	let token = canvas.tokens.get(lastArg.tokenId);
	let summonName = `Spiritual Weapon - ${lastArg.actor.name}`;
	let spellMod = lastArg.actor.system.abilities[lastArg.actor.system.attributes.spellcasting].mod;
	let attackBonus = spellMod + lastArg.actor.system.attributes.prof + lastArg.actor.system.bonuses.msak.attack;
	let damageBonus = spellMod + lastArg.actor.system.bonuses.msak.damage;
	let damage = { parts: [[`${Math.floor(lastArg.castData.castLevel/2)}d8+${damageBonus}`, "force"]], versatile: "" };
	let attackData = await ggHelpers.getItemFromCompendium('garhis-grotto.gg-item-blueprints', 'Spiritual Weapon Attack', false);
	attackData.system.damage = damage;
	attackData.system.attackBonus = attackBonus;
	attackData.img = summonImage;
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
			'Item': {
				[attackData.name]: attackData
			},
		}
	}
	let summonId = await warpgate.spawn('GG - Spiritual Weapon', summonUpdates, {}, {'controllingActor': lastArg.actor});
	if (!summonId) {
		ui.notifications.warn('Warpgate Summoning Aborted');
		return;
	}
	const summonedToken = game.canvas.tokens.get(summonId[0]);
	const summonTokenUuid = summonedToken.document.uuid;
	async function effectMacro() {
		await warpgate.revert(token.document, 'Spiritual Weapon');
	}
	let sourceEffectData = {
		'label': 'Spiritual Weapon',
		'icon': summonImage,
		'changes': [ { 'key': 'flags.dae.deleteUuid', 'mode': CONST.ACTIVE_EFFECT_MODES.ADD, 'value': [summonTokenUuid] } ],
		'duration': { 'seconds': 60, rounds:10 },
		'flags': {
			'dae': {
				'stackable': false
			},
			'effectmacro': {
				'onDelete': {
					'script': ggHelpers.functionToString(effectMacro)
				}
			}
		}
	}
	attackData.system.proficient = true;
	attackData.system.attackBonus = "";
	attackData.system.damage = { parts: [[`${Math.floor(lastArg.castData.castLevel/2)}d8+@mod`, "force"]], versatile: "" };
	let actorUpdates = {
		'embedded': {
			'Item': {
				[attackData.name]: attackData
			},
			'ActiveEffect': {
				[sourceEffectData.label]: sourceEffectData
			}
		}
	}
	let options = {
		'permanent': false,
		'name': sourceEffectData.label,
		'description': sourceEffectData.label
	}
	await warpgate.mutate(token.document, actorUpdates, {}, options);
}
