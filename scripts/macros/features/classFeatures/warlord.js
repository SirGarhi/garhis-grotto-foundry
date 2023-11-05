import {ggHelpers} from '../../../helperFunctions.js';

// async function consumeRallyingMark(args) {
// 	console.log(args);
// }

async function consumeRallyingMark({speaker, actor, token, character, item, args}) {
	console.log(args);
	let markEffect = ggHelpers.findEffect(actor, 'Rallying Mark');
	if( item.actor.uuid == markEffect.origin) {
		console.warn("Attacking Actor is owner of Rallying Mark, aborting");
		return;
	}
	const lastArg = args[args.length-1];
	let workflow = lastArg.workflow;
	console.log(workflow);
	// let targetToken = workflow.targets.first().document;
	let numDice = markEffect.changes[1].value;
	let warlord = await ggHelpers.getActorByUuid(markEffect.origin);
	// console.log(warlord);
	let diceSize = warlord.system.scale.warlord.dL;
	if (workflow.isCritical) {
		numDice = numDice * 2;
	}
	let damageDice = `${numDice}${diceSize}`;
	let damageType = ggHelpers.getDamageTypeFromItem(workflow.item);
	let damageFormula = { parts: [[damageDice, damageType]] };
	console.log(damageFormula);
	const itemData = {
		name: "Rallying Mark Damage",
		img: 'icons/skills/ranged/target-bullseye-arrow-glowing.webp',
		type: 'weapon',
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
	}
	// console.log(token);
	// console.log(targetToken);
	const tempItem = new CONFIG.Item.documentClass(itemData, { parent: warlord });
	const config = {};
	const options = { targetUuids: [token.document.uuid], showFullCard: false, createWorkflow: true, versatile: false, configureDialog: false };
	console.log(options);
	let markDamage = await MidiQOL.completeItemUse(tempItem, config, options);
	console.log(markDamage);
	const animFile = 'jb2a.explosion.05.yellowwhite';
	const animation = Sequencer.Database.entryExists(animFile);
	if (animation) {
		// const animToken = canvas.tokens.get(token.uuid);
		new Sequence()
		.effect()
		.file(animation)
		.atLocation(token)
		.play();
	}
	let healingFormula = { parts: [[markDamage.damageTotal, 'healing']]};
	const healingItemData = {
		name: "Rallying Mark Healing",
		img: 'icons/magic/life/crosses-trio-red.webp',
		type: 'weapon',
		effects: [],
		flags: {
			"midiProperties": {
				magicdam: true
			}
		},
		system: {
			actionType: "healing",
			damage: healingFormula,
			duration: {units: "inst", value: undefined},
			description: {value: "" }
		}
	}
	const tempHealingItem = new CONFIG.Item.documentClass(healingItemData, { parent: warlord });
	const optionsHealing = { targetUuids: [workflow.tokenUuid], showFullCard: false, createWorkflow: true, versatile: false, configureDialog: false };
	await MidiQOL.completeItemUse(tempHealingItem, config, optionsHealing);
	const animHealingFile = 'jb2a.healing_generic.200px.yellow02';
	const animationHealing = Sequencer.Database.entryExists(animFile);
	if (animation) {
		// const animToken = canvas.tokens.get(token.uuid);
		new Sequence()
		.effect()
		.file(animation)
		.atLocation(token)
		.play();
	}
	await ggHelpers.removeEffect(markEffect);
}

async function rallyingMarkItem({speaker, actor, token, character, item, args}) {
	// console.log(args);
	let numDice = await ggHelpers.buttonMenu('How Many Leadership Dice?', [
		['One', 1],
		['Two', 2],
		['Three', 3],
		['Four', 4]
	]);
	const lastArg = args[args.length-1];
	if (lastArg.targets.length != 1) {
		ui.notifications.warn('Can only use Rallying Mark against a single target');
		return;
	}
	let sourceActor = lastArg.actor;
	let diceSize = sourceActor.system.scale.warlord.dL;
	console.log(sourceActor);
	let effect = ggHelpers.findEffect(lastArg.targets[0].actor, 'Rallying Mark');
	if (effect) {
		let changes = effect.changes;
		changes.push(
			{
				'key': 'flags.midi-qol.onUseMacroName',
				'mode': CONST.ACTIVE_EFFECT_MODES.CUSTOM,
				'value': 'function.garhisGrotto.macros.features.class.warlord.rallyingMarkDamage,isDamaged',
				'priority': 20
			},
			{
				'key': 'flags.garhis-grotto.features.rallyingMarkDice',
				'mode': CONST.ACTIVE_EFFECT_MODES.OVERRIDE,
				'value': numDice,
				'priority': 20
			});
		let updates = {
			'origin': sourceActor.uuid,
			'changes': changes
		}
		await ggHelpers.updateEffect(effect, updates);
	}
}

export let warlord = {
	'rallyingMark': rallyingMarkItem,
	'rallyingMarkDamage': consumeRallyingMark
}
