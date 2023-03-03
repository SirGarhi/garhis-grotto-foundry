import {ggHelpers} from '../../helperFunctions.js';
import { spellEffects } from '../../effects/spellEffects.js';

const freeSequence = "jb2a.particles.outward.greenyellow.01.05";
const patreonPrimary = "jb2a.dagger.melee.fire.green";
const patreonSecondary = "jb2a.magic_missile.green";

function sequencerEffect(target, origin = null) {
	if (game.modules.get("sequencer")?.active) {
		const secondary = Sequencer.Database.entryExists(patreonSecondary);
		if (secondary) {
		new Sequence()
			.effect()
			.atLocation(origin)
			.stretchTo(target)
			.file(patreonSecondary)
			.repeats(1, 200, 300)
			.randomizeMirrorY()
			.play();
		} else {
		const attackAnimation = Sequencer.Database.entryExists(patreonPrimary) ?? Sequencer.Database.entryExists(freeSequence);
		if (attackAnimation) {
			new Sequence()
			.effect()
			.file(attackAnimation)
			.atLocation(target)
			.play();
		}
		}
	}
}
async function greenFlameBladeSplash(args) {
	const lastArg = args[args.length-1];
	if (lastArg.itemData.system.actionType !== 'mwak') return;
	if( lastArg.hitTargets.length > 0 ) {
		let target = canvas.tokens.get(lastArg.hitTargets[0].id ?? args[0].hitTargets[0]._id);
		let nearbyTargets = ggHelpers.findNearby(target, 5, 'all');
		let buttons = [{label: 'Apply Damage', value: true},{label: 'No Damage', value: false}];
		let chosenTargets = await ggHelpers.selectTarget('Splash Damage Target', buttons, nearbyTargets, true, false);
		if (chosenTargets) {
			if (!chosenTargets.buttons) return;
			let splashTargetId = chosenTargets.inputs.find( val => val !== false )
			if (!splashTargetId) return;
			let actor = await ggHelpers.tokenOrActor(await fromUuid(lastArg.actorUuid));
			let damageDice = 0;
			let spellMod = '';
			if (actor.type === 'character') {
				damageDice += Math.floor((actor.system.details.level+1)/6);
				spellMod = '+'+actor.system.abilities[actor.system.attributes.spellcasting].mod;
			}
			let potent = actor.items.find(itm => itm.name === 'Potent Spellcasting');
			let damageFormula = { parts: [[((damageDice > 0) ? damageDice+'d8' : '')+spellMod+(potent ? spellMod : ''), 'fire']] };
			const itemData = {
				name: "Green-Flame Blade Splash",
				img: "icons/magic/unholy/projectile-fireball-green.webp",
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
			const options = { targetUuids: [splashTargetId], showFullCard: false, createWorkflow: true, versatile: false, configureDialog: false };
			await MidiQOL.completeItemUse(tempItem, config, options);
			let splashTarget = await fromUuid(splashTargetId);
			sequencerEffect(splashTarget, target);
		}
	}
}

async function greenFlameBladeItem(args) {
	console.log(args);
	const lastArg = args[args.length-1];
	let actor = lastArg.actor;
	let damageDice = Math.floor((actor.system.details.level+1)/6);
	console.log(lastArg.item);
	let spellMod = '+'+ggHelpers.getSpellMod(await fromUuid(lastArg.itemUuid));
	let potent = actor.items.find(itm => itm.name === 'Potent Spellcasting');
	let effect = spellEffects.greenFlameBlade;
	let changes = [
		{
			'key': 'system.bonuses.mwak.damage',
			'mode': CONST.ACTIVE_EFFECT_MODES.ADD,
			'value': '+'+damageDice+'d8[fire]'+(potent ? spellMod+'[fire]' : ''),
			'priority': 20
		},
		{
			'key': 'flags.midi-qol.onUseMacroName',
			'mode': CONST.ACTIVE_EFFECT_MODES.CUSTOM,
			'value': 'GG_greenFlameBladeSplash, postActiveEffects',
			'priority': 20
		}
	];
	effect.changes = changes;
	ggHelpers.createEffect(actor, effect);
}

export let greenFlameBlade = {
	'splash': greenFlameBladeSplash,
	'item': greenFlameBladeItem
}
