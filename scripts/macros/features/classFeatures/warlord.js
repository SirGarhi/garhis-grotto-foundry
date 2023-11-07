import {ggHelpers} from '../../../helperFunctions.js';

// async function consumeRallyingMark(args) {
// 	console.log(args);
// }

async function consumeRallyingMark({speaker, actor, token, character, item, args, scope, workflow}) {
	let markEffect = ggHelpers.findEffect(actor, 'Rallying Mark');
	if( item.actor.uuid == markEffect.origin) {
		console.warn("GG | Warlord - Attacking Actor is owner of Rallying Mark, aborting");
		return;
	}
	// console.log(workflow);
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
	// console.log(options);
	let markDamage = await MidiQOL.completeItemUse(tempItem, config, options);
	// console.log(markDamage);
	const animFile = 'jb2a.claws.200px.dark_red';
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
	const animationHealing = Sequencer.Database.entryExists(animHealingFile);
	if (animationHealing) {
		new Sequence()
		.effect()
		.file(animationHealing)
		.atLocation(workflow.token)
		.play();
	}
	await ggHelpers.removeEffect(markEffect);
}

async function rallyingMarkItem({speaker, actor, token, character, item, args, scope, workflow}) {
	// console.log(args);
	const lastArg = args[args.length-1];
	let diceLimit = actor.system.resources.primary.value;
	if( !diceLimit || diceLimit < 1 ) {
		ui.notifications.warn("GG | Already reached leadership dice limit this turn");
		return;
	}
	let numDice = 1;
	if( diceLimit > 1 ) {
		let buttons = [];
		for(let i = 1; i <= diceLimit; i++ ) {
			buttons.push([i, i]);
		}
		numDice = await ggHelpers.buttonMenu('How Many Leadership Dice?', buttons);	
	}
	if (lastArg.targets.length != 1) {
		ui.notifications.warn('GG | Can only use Rallying Mark against a single target');
		return;
	}
	let effectData = {
		'label': `Rallying Mark`,
		'icon': 'icons/skills/ranged/target-bullseye-arrow-glowing.webp',
		'origin': actor.uuid,
		'duration': {
			'rounds': 1
		},
		'flags' : {
			'dae': {
				'stackable': 'none'
			}
		},
		'changes': [
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
			}
		]
	}
	await ggHelpers.createEffect(lastArg.targets[0].actor, effectData);
	await actor.update({"system.resources.primary.value": actor.system.resources.primary.value - numDice});
	const leadershipItem = actor.items.getName('Leadership Dice');
	await leadershipItem.update({'system.uses.value': leadershipItem.system.uses.value - numDice});
}

async function heroicStrike({speaker, actor, token, character, item, args, scope, workflow}) {
	if (workflow.hitTargets.size != 1) return;
	if (!['mwak','rwak'].includes(workflow.item.system.actionType)) return;
	let diceLimit = actor.system.resources.primary.value;
	if( !diceLimit || diceLimit < 1 ) {
		console.log("GG | Heroic Strike - Leadership Dice Turn Limit Reached");
		return;
	}
	let baseDice = 0;
	if( diceLimit > 0 ) {
		let buttons = [];
		for(let i = 1; i <= diceLimit; i++ ) {
			buttons.push([`Heroic Strike-${i} dice`, i]);
		}
		buttons.push(['No Heroic Strike', 0]);
		baseDice = await ggHelpers.buttonMenu('Use Heroic Strike?', buttons);
	}
	if (baseDice < 1) return;
	let numDice = baseDice;
	if (workflow.isCritical) numDice = numDice * 2;
	let damageFormula = `${numDice}${actor.system.scale.warlord.dL}${ggHelpers.getDamageTypeFromItem(workflow.item)}`;
	let effectData = {
		'label': `Rallying Mark`,
		'icon': 'icons/skills/ranged/target-bullseye-arrow-glowing.webp',
		'origin': actor.uuid,
		'duration': {
			'rounds': 1
		},
		'flags' : {
			'dae': {
				'stackable': 'none'
			}
		},
		'changes': [
			{
				'key': 'flags.midi-qol.onUseMacroName',
				'mode': CONST.ACTIVE_EFFECT_MODES.CUSTOM,
				'value': 'function.garhisGrotto.macros.features.class.warlord.rallyingMarkDamage,isDamaged',
				'priority': 20
			},
			{
				'key': 'flags.garhis-grotto.features.rallyingMarkDice',
				'mode': CONST.ACTIVE_EFFECT_MODES.OVERRIDE,
				'value': baseDice,
				'priority': 20
			}
		]
	}
	await ggHelpers.createEffect(workflow.targets.first().actor, effectData);
	await actor.update({"system.resources.primary.value": actor.system.resources.primary.value - baseDice});
	const leadershipItem = actor.items.getName('Leadership Dice');
	await leadershipItem.update({'system.uses.value': leadershipItem.system.uses.value - baseDice});
	return {damageRoll: damageFormula, flavor: 'Heroic Strike'};
}

async function urgentOrders({speaker, actor, token, character, item, args, scope, workflow}) {
	let diceLimit = actor.system.resources.primary.value;
	if( !diceLimit || diceLimit < 1 ) {
		ui.notifications.warn("GG | Already reached leadership dice limit this turn");
		return;
	}
	let numDice = 1;
	if( diceLimit > 1 ) {
		let buttons = [];
		for(let i = 1; i <= diceLimit; i++ ) {
			buttons.push([i, i]);
		}
		numDice = await ggHelpers.buttonMenu('How Many Leadership Dice?', buttons);	
	}
	let damageDice = `${numDice}${actor.system.scale.warlord.dL}`;
	let healingFormula = { parts: [[damageDice, 'temphp']]};
	const healingItemData = {
		name: "Urgent Orders Healing",
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
	const tempHealingItem = new CONFIG.Item.documentClass(healingItemData, { parent: actor });
	const config = {};
	const optionsHealing = { targetUuids: [workflow.targets.first().document.uuid], showFullCard: false, createWorkflow: true, versatile: false, configureDialog: false };
	await MidiQOL.completeItemUse(tempHealingItem, config, optionsHealing);
	const animHealingFile = 'jb2a.healing_generic.200px.yellow02';
	const animationHealing = Sequencer.Database.entryExists(animHealingFile);
	if (animationHealing) {
		new Sequence()
		.effect()
		.file(animationHealing)
		.atLocation(workflow.targets.first())
		.play();
	}
	await actor.update({"system.resources.primary.value": actor.system.resources.primary.value - numDice});
	const leadershipItem = actor.items.getName('Leadership Dice');
	await leadershipItem.update({'system.uses.value': leadershipItem.system.uses.value - numDice});
}

async function helpfulWord({speaker, actor, token, character, item, args, scope, workflow}) {
	let diceLimit = actor.system.resources.primary.value;
	if( !diceLimit || diceLimit < 1 ) {
		ui.notifications.warn("GG | Already reached leadership dice limit this turn");
		return;
	}
	let effectData = {
		'label': `Helpful Word`,
		'icon': 'icons/magic/control/buff-strength-muscle-damage-orange.webp',
		'origin': actor.uuid,
		'duration': {
			'rounds': 1
		},
		'flags' : {
			'dae': {
				'stackable': 'noneName',
				"specialDuration": [
					"isAttacked"
				]
			}
		},
		'changes': [
			{
				"key": "flags.midi-qol.grants.advantage.attack.all",
				"mode": 0,
				"value": "true",
				"priority": 20
			}
		]
	}
	await ggHelpers.createEffect(workflow.targets.first().actor, effectData);
	await actor.update({"system.resources.primary.value": actor.system.resources.primary.value - 1});
	const leadershipItem = actor.items.getName('Leadership Dice');
	await leadershipItem.update({'system.uses.value': leadershipItem.system.uses.value - 1});
}

export let warlord = {
	'rallyingMark': rallyingMarkItem,
	'rallyingMarkDamage': consumeRallyingMark,
	'heroicStrike': heroicStrike,
	'urgentOrders': urgentOrders,
	'helpfulWord': helpfulWord
}
