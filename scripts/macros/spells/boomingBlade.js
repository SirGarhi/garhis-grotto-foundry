import {ggHelpers} from '../../helperFunctions.js';
import { spellEffects } from '../../effects/spellEffects.js';
async function applyThrumming({speaker, actor, token, character, item, args, scope, workflow}) {
	// console.log(args);
	const lastArg = args[args.length-1];
	if (item.system.actionType !== 'mwak') return;
	if ( workflow.hitTargets.size > 0 ) {
		let target = workflow.hitTargets.first();
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

async function thrummingExplosion({speaker, actor, token, character, item, args, scope}) {
	const lastArg = args[args.length-1];
	if (args[0] === "off" && args[1]["expiry-reason"] === "midi-qol:isMoved") {
		let targetUuid = lastArg.tokenUuid;
		let damageDice = 1;
		let sourceActor = await fromUuid(lastArg.efData.origin);
		// console.log(sourceActor);
		let potent = '';
		if (sourceActor.type === 'character') {
			damageDice += Math.floor((sourceActor.system.details.level+1)/6);
			if (sourceActor.items.find( itm => itm.name === 'Potent Spellcasting')) {
				potent = `+${ggHelpers.getSpellModFromItem(sourceActor.items.find(itm=>itm.name==='Booming Blade'))}`
			}
		}
		let damageFormula = { parts: [[`${damageDice}d8${potent}`, "thunder"]] };
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
		const tempItem = new CONFIG.Item.documentClass(itemData, { parent: sourceActor });
		const config = {};
		const options = { targetUuids: [targetUuid], showFullCard: false, createWorkflow: true, versatile: false, configureDialog: false };
		await MidiQOL.completeItemUse(tempItem, config, options);
		const animFile = 'jb2a.shatter.blue';
		const animation = Sequencer.Database.entryExists(animFile);
		if (animation) {
			// const token = canvas.tokens.get(lastArg.tokenId);
			new Sequence()
			.effect()
			.file(animation)
			.atLocation(token)
			.play();
		}
	}
}

async function boomingBladeItem({speaker, actor, token, character, item, args, scope, workflow}) {
	// let damageDice = Math.floor((actor.system.details.level+1)/6);
	// let potent = (actor.items.find( itm => itm.name === 'Potent Spellcasting')) ? `+${ggHelpers.getSpellModFromItem(item)}` : '';
	let effect = structuredClone(spellEffects.boomingBlade);
	let changes = [
		// {
		// 	'key': 'system.bonuses.mwak.damage',
		// 	'mode': CONST.ACTIVE_EFFECT_MODES.ADD,
		// 	'value': `+${damageDice}d8${potent}[thunder]`,
		// 	'priority': 20
		// },
		{
			'key': 'flags.dnd5e.DamageBonusMacro',
			'mode': 0,
			'value': 'function.garhisGrotto.macros.spells.boomingBlade.damage',
			'priority': 20
		},
		{
			'key': 'flags.midi-qol.onUseMacroName',
			'mode': CONST.ACTIVE_EFFECT_MODES.CUSTOM,
			'value': 'function.garhisGrotto.macros.spells.boomingBlade.applyThrumming, postActiveEffects',
			'priority': 20
		}
	];
	effect.changes = changes;
	ggHelpers.createEffect(actor, effect);
}

async function boomingBladeDamageBonus({speaker, actor, token, character, item, args, scope, workflow}) {
	if (workflow.hitTargets.size != 1) return {};
	if (item.system.actionType != 'mwak') return {};
	let diceNum = Math.floor((actor.system.details.level+1)/6);
	if (workflow.isCritical) diceNum = diceNum * 2;
	let potent = (actor.items.find( itm => itm.name === 'Potent Spellcasting')) ? `+${ggHelpers.getSpellModFromItem(item)}[thunder]` : '';
	let damageFormula = `${diceNum}d8[thunder]${potent}`;
	return{damageRoll: damageFormula, flavor: 'Booming Blade'};
}

export let boomingBlade = {
	'applyThrumming': applyThrumming,
	'thrummingExplosion': thrummingExplosion,
	'item': boomingBladeItem,
	'damage': boomingBladeDamageBonus
};
