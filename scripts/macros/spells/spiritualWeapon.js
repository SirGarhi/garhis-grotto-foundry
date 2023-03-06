import {ggHelpers} from '../../helperFunctions.js';

export async function spiritualWeapon(args, summonImage, summonTokenImage) {
	let lastArg = args[args.length-1];
	let token = canvas.tokens.get(lastArg.tokenId);
	let summonData = await ggHelpers.getItemFromCompendium('garhis-grotto.gg-actor-blueprints', 'Spiritual Weapon', false);
	if (!summonData) return;
	let summonName = `Spiritual Weapon - ${lastArg.actor.name}`;
	// TODO: Prompt the user to select art maybe
	summonData.name = summonName;
	summonData.img = summonImage;
	summonData.prototypeToken.name = summonName;
	summonData.prototypeToken.texture.src = summonTokenImage;
	let summon = await Actor.create(summonData);

	let summonId = await warpgate.spawn(summonName, {}, {}, {'controllingActor': lastArg.actor});
	console.log(summonId);
	if (!summonId) {
		await Actor.deleteDocuments([summon.id]);
		ui.notifications.warn('Warpgate Summoning Aborted');
		return;
	}
	const summonedToken = game.canvas.tokens.get(summonId[0]);
	const summonTokenUuid = summonedToken.document.uuid;
	let damage = { parts: [[`${Math.floor(lastArg.castData.castLevel/2)}d8+@mod`, "force"]], versatile: "" };
	let attackData = await ggHelpers.getItemFromCompendium('garhis-grotto.gg-item-blueprints', 'Spiritual Weapon Attack', false);
	attackData.system.damage = damage;
	attackData.img = summonImage;
	async function effectMacro() {
		await warpgate.revert(token.document, 'Spiritual Weapon');
		await Actor.deleteDocuments([origin.id]);
	}
	let sourceEffectData = {
		'label': 'Spiritual Weapon',
		'icon': summonImage,
		'changes': [ { 'key': 'flags.dae.deleteUuid', 'mode': CONST.ACTIVE_EFFECT_MODES.ADD, 'value': [summonTokenUuid] } ],
		'origin': summon.uuid,
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
