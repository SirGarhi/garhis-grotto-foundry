import {ggHelpers} from '../../helperFunctions.js';
import { spellEffects } from '../../effects/spellEffects.js';
async function applyThrumming(args) {
	// console.log(args);
	const lastArg = args[args.length-1];
	if (lastArg.item.system.actionType !== 'mwak') return;
	if ( lastArg.hitTargets.length > 0 ) {
		let target = lastArg.hitTargets[0];
		let targetActor = target.actor;

		let effect = structuredClone(spellEffects.thrumming);
		effect.origin = lastArg.actorUuid;
		ggHelpers.createEffect(targetActor, effect);
		const animFile = 'jb2a.energy_strands.complete.blue.01';
		const animation = Sequencer.Database.entryExists(animFile);
		if (animation) {
			new Sequence()
			.effect()
			.file(animation)
			.atLocation(target)
			.scaleToObject(1.5)
			.play();
		}
	}
}

async function applyPotentThrumming(args) {
	//console.log(args);
	const lastArg = args[args.length-1];
	if (lastArg.item.system.actionType !== 'mwak') return;
	if ( lastArg.hitTargets.length > 0 ) {
		let target = lastArg.hitTargets[0];
		let targetActor = target.actor;

		let effect = structuredClone(spellEffects.potentThrumming);
		effect.origin = lastArg.actorUuid;
		ggHelpers.createEffect(targetActor, effect);
		const animFile = 'jb2a.energy_strands.complete.blue.01';
		const animation = Sequencer.Database.entryExists(animFile);
		if (animation) {
			new Sequence()
			.effect()
			.file(animation)
			.atLocation(target)
			.scaleToObject(1.5)
			.play();
		}
	}
}

async function thrummingExplosion(args) {
	const lastArg = args[args.length-1];
	if (args[0] === "off" && args[1]["expiry-reason"] === "midi-qol:isMoved") {
		let targetUuid = lastArg.tokenUuid;
		let damageDice = 1;
		let actor = await fromUuid(lastArg.efData.origin);
		if (actor.type === 'character') {
			damageDice += Math.floor((actor.system.details.level+1)/6);
		}
		let damageFormula = { parts: [[damageDice+"d8", "thunder"]] };
		const itemData = {
			name: "Thrumming Explosion",
			img: "icons/magic/sonic/explosion-shock-wave-teal.webp",
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
		const animFile = 'jb2a.shatter.blue';
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

async function potentThrummingExplosion(args) {
	const lastArg = args[args.length-1];
	if (args[0] === "off" && args[1]["expiry-reason"] === "midi-qol:isMoved") {
		let targetUuid = lastArg.tokenUuid;
		let damageDice = 1;
		let spellMod = "";
		let actor = await fromUuid(lastArg.efData.origin);
		if (actor.type === 'character') {
			damageDice += Math.floor((actor.system.details.level+1)/6);
			spellMod = '+'+actor.system.abilities[actor.system.attributes.spellcasting].mod;
		}
		let damageFormula = { parts: [[damageDice+"d8"+spellMod, "thunder"]] };
		const itemData = {
			name: "Thrumming Explosion",
			img: "icons/magic/sonic/explosion-shock-wave-teal.webp",
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
		const animFile = 'jb2a.shatter.blue';
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

async function boomingBladeItem(workflow) {
	let actor = workflow.actor;
	let damageDice = Math.floor((actor.system.details.level+1)/6);
	let effect = structuredClone(spellEffects.boomingBlade);
	let changes = [
		{
			'key': 'system.bonuses.mwak.damage',
			'mode': CONST.ACTIVE_EFFECT_MODES.ADD,
			'value': '+'+damageDice+'d8[thunder]',
			'priority': 20
		},
		{
			'key': 'flags.midi-qol.onUseMacroName',
			'mode': CONST.ACTIVE_EFFECT_MODES.CUSTOM,
			'value': 'GG_applyThrumming, postActiveEffects',
			'priority': 20
		}
	];
	effect.changes = changes;
	ggHelpers.createEffect(actor, effect);
}

async function boomingBladeItemPotent(workflow) {
	let actor = workflow.actor;
	let damageDice = Math.floor((actor.system.details.level+1)/6);
	console.log(workflow.item);
	let spellMod = `+${ggHelpers.getSpellModFromItem(workflow.item)}[thunder]`;
	let effect = structuredClone(spellEffects.boomingBlade);
	let changes = [
		{
			'key': 'system.bonuses.mwak.damage',
			'mode': CONST.ACTIVE_EFFECT_MODES.ADD,
			'value': `+${damageDice}d8[thunder]${spellMod}`,
			'priority': 20
		},
		{
			'key': 'flags.midi-qol.onUseMacroName',
			'mode': CONST.ACTIVE_EFFECT_MODES.CUSTOM,
			'value': 'GG_applyPotentThrumming, postActiveEffects',
			'priority': 20
		}
	];
	effect.changes = changes;
	ggHelpers.createEffect(actor, effect);
}

export let boomingBlade = {
	'applyPotentThrumming': applyPotentThrumming,
	'applyThrumming': applyThrumming,
	'potentThrummingExplosion': potentThrummingExplosion,
	'thrummingExplosion': thrummingExplosion,
	'potentItem': boomingBladeItemPotent,
	'item': boomingBladeItem
};
