import {ggHelpers} from '../../helperFunctions.js';

async function consumeMark(args) {
	console.log(args);
	const lastArg = args[args.length-1];
	if (args[0] === "off" && args[3]["expiry-reason"] === "midi-qol:isHit") {
		let targetUuid = lastArg.actorUuid;
		let damageDice = args[2];
		let actor = await fromUuid(lastArg.efData.origin);
		actor = actor.parent;
		console.log(actor);
		let damageFormula = { parts: [[damageDice, "necrotic"]] };
		const itemData = {
			name: "Shadowfell Staccato",
			img: "icons/magic/unholy/orb-contained-pink.webp",
			type: "weapon",
			effects: [],
			flags: {
				"midiProperties": {
					magicdam: true
				}
			},
			system: {
				actionType: "other",
				damage: damageFormula,
				duration: {units: "inst", value: undefined},
				description: {value: "" }
			}
		};
		const tempItem = new CONFIG.Item.documentClass(itemData, { parent: actor });
		const config = {};
		const options = { targetUuids: [targetUuid], showFullCard: false, createWorkflow: true, versatile: false, configureDialog: false };
		await MidiQOL.completeItemUse(tempItem, config, options);
		const animFile = 'jb2a.explosion.04.dark_purple';
		const animation = Sequencer.Database.entryExists(animFile);
		if (animation) {
			const token = canvas.tokens.get(lastArg.tokenId);
			new Sequence()
			.effect()
			.file(animation)
			.atLocation(token)
			.play();
		}
	}	
}

export let nocturne = {
	'staccato': consumeMark
}
