import {ggHelpers} from '../../helperFunctions.js';
import { spellEffects } from '../../effects/spellEffects.js';

async function applyShredding({speaker, actor, token, character, item, args, scope, workflow}) {
	// console.log(args);
	const lastArg = args[args.length-1];
	if (lastArg.item.system.actionType !== 'rwak') return;
	if ( lastArg.hitTargets.length > 0 ) {
		let target = lastArg.hitTargets[0];
		let targetActor = target.actor;

		let effect = structuredClone(spellEffects.shredding);
		effect.origin = lastArg.actorUuid;
		ggHelpers.createEffect(targetActor, effect);
	}
}

async function shreddingShrapnel({speaker, actor, token, character, item, args, scope, workflow}) {
	// console.log(args);
	const lastArg = args[args.length-1];
	if (args[0] === "off" && args[1]["expiry-reason"]) {
		let targetUuid = lastArg.tokenUuid;
		let damageDice = 1;
		let sourceActor = await fromUuid(lastArg.efData.origin);
		if (sourceActor.type === 'character') {
			damageDice += Math.floor((sourceActor.system.details.level+1)/6);
		}
		let damageFormula = { parts: [[`${damageDice}d8`, "slashing"]] };
		const itemData = {
			name: "Clockwork Shrapnel",
			img: "icons/skills/ranged/arrow-flying-broadhead-metal.webp",
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
		const tempItem = new CONFIG.Item.documentClass(itemData, { parent: sourceActor });
		const config = {};
		const options = { targetUuids: [targetUuid], showFullCard: false, createWorkflow: true, versatile: false, configureDialog: false };
		await MidiQOL.completeItemUse(tempItem, config, options);
		const animFile = 'jb2a.claws.200px.brown';
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

async function clockworkBoltItem({speaker, actor, token, character, item, args, scope, workflow}) {
	// let damageDice = Math.floor((actor.system.details.level+1)/6);
	let effect = structuredClone(spellEffects.clockworkBolt);
	let changes = [
		// {
		// 	'key': 'system.bonuses.rwak.damage',
		// 	'mode': CONST.ACTIVE_EFFECT_MODES.ADD,
		// 	'value': '+'+damageDice+'d8[slashing]',
		// 	'priority': 20
		// },
		{
			'key': 'flags.dnd5e.DamageBonusMacro',
			'mode': 0,
			'value': 'function.garhisGrotto.macros.spells.clockworkBolt.damage',
			'priority': 20
		},
		{
			'key': 'flags.midi-qol.onUseMacroName',
			'mode': CONST.ACTIVE_EFFECT_MODES.CUSTOM,
			'value': 'function.garhisGrotto.macros.spells.clockworkBolt.applyShredding, postActiveEffects',
			'priority': 20
		}
	];
	effect.changes = changes;
	ggHelpers.createEffect(actor, effect);
}

async function clockworkBoltDamageBonus({speaker, actor, token, character, item, args, scope, workflow}) {
	if (workflow.hitTargets.size != 1) return {};
	if (item.system.actionType != 'rwak') return {};
	let diceNum = Math.floor((actor.system.details.level+1)/6);
	let spellMod = ggHelpers.getSpellModFromItem(item);
	if (workflow.isCritical) diceNum = diceNum * 2;
	let potent = (actor.items.find( itm => itm.name === 'Potent Spellcasting')) ? `+${spellMod}` : '';
	let damageFormula = `${diceNum}d8${potent}[slashing]`;
	return{damageRoll: damageFormula, flavor: 'Clockwork Bolt'};
}

export let clockworkBolt = {
	'applyShredding': applyShredding,
	'shrapnel': shreddingShrapnel,
	'item': clockworkBoltItem,
	'damage': clockworkBoltDamageBonus
};
