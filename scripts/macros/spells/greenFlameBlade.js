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
async function greenFlameBladeSplash({speaker, actor, token, character, item, args, scope, workflow}) {
	const lastArg = args[args.length-1];
	if (item.system.actionType !== 'mwak') return;
	if( workflow.hitTargets.size > 0 ) {
		let target = canvas.tokens.get(workflow.hitTargets.first().id ?? args[0].hitTargets[0]._id);
		let nearbyTargets = ggHelpers.findNearby(target, 5, 'all');
		let buttons = [{label: 'Apply Damage', value: true},{label: 'No Damage', value: false}];
		let chosenTargets = await ggHelpers.selectTarget('Splash Damage Target', buttons, nearbyTargets, false);
		if (chosenTargets) {
			if (!chosenTargets.buttons) return;
			let splashTargetId = nearbyTargets[chosenTargets.inputs.indexOf(true)].document.uuid;
			if (!splashTargetId) {
				console.warn("GG | GFB - Couldn't find splashTargetId")
				return;
			}
			let damageDice = 0;
			let spellMod = '';
			let potent = '';
			if (actor.type === 'character') {
				damageDice += Math.floor((actor.system.details.level+1)/6);
				spellMod = actor.system.abilities[actor.system.attributes.spellcasting].mod;
				potent = (actor.items.find( itm => itm.name === 'Potent Spellcasting')) ? `+${spellMod}` : '';
			}
			let damageFormula = { parts: [[((damageDice > 0) ? damageDice+'d8 +' : '')+spellMod+potent, 'fire']] };
			const itemData = {
				name: "GFB Splash",
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

async function greenFlameBladeItem({speaker, actor, token, character, item, args, scope, workflow}) {
	// console.log(args);
	// let damageDice = Math.floor((actor.system.details.level+1)/6);
	// console.log(lastArg.item);
	
	let effect = structuredClone(spellEffects.greenFlameBlade);
	let changes = [
		// {
		// 	'key': 'system.bonuses.mwak.damage',
		// 	'mode': CONST.ACTIVE_EFFECT_MODES.ADD,
		// 	'value': `+${damageDice}d8[fire]`,
		// 	'priority': 20
		// },
		{
			'key': 'flags.dnd5e.DamageBonusMacro',
			'mode': 0,
			'value': 'function.garhisGrotto.macros.spells.greenFlameBlade.damage',
			'priority': 20
		},
		{
			'key': 'flags.midi-qol.onUseMacroName',
			'mode': CONST.ACTIVE_EFFECT_MODES.CUSTOM,
			'value': 'function.garhisGrotto.macros.spells.greenFlameBlade.splash, postActiveEffects',
			'priority': 20
		}
	];
	effect.changes = changes;
	ggHelpers.createEffect(actor, effect);
}

async function greenFlameBladeDamageBonus({speaker, actor, token, character, item, args, scope, workflow}) {
	if (workflow.hitTargets.size != 1) return {};
	if (item.system.actionType != 'mwak') return {};
	let diceNum = Math.floor((actor.system.details.level+1)/6);
	let spellMod = ggHelpers.getSpellModFromItem(item);
	if (workflow.isCritical) diceNum = diceNum * 2;
	let potent = (actor.items.find( itm => itm.name === 'Potent Spellcasting')) ? `+${spellMod}[fire]` : '';
	let damageFormula = `${diceNum}d8[fire]${potent}`;
	return{damageRoll: damageFormula, flavor: 'Green Flame Blade'};
}

export let greenFlameBlade = {
	'splash': greenFlameBladeSplash,
	'item': greenFlameBladeItem,
	'damage': greenFlameBladeDamageBonus
}
