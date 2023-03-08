import { ggHelpers } from "../../helperFunctions.js";
import { pathFeatureEffects } from "../../effects/pathFeatureEffects.js";

async function hemorrhagingStrikes(args) {
	// console.log(args);
	const lastArg = args[args.length-1];
	if (lastArg.item.system.actionType !== 'mwak') return;
	if (lastArg.hitTargets.length === 1) {
		let target = lastArg.hitTargets[0];
		let targetActor = target.actor;
		let effect = structuredClone(pathFeatureEffects.hemorrhagingStrikes)
		let diceTotal = 0;
		for (let die of lastArg.damageRoll.dice) {
			// console.log(die);
			// console.log(die.flavor);
			if (die.flavor === 'bludgeoning' || die.flavor === 'Bludgeoning') {
				// console.log(die.total);
				diceTotal = diceTotal + die.total;
			}
		}
		// console.log(`Dice total is: ${diceTotal}`);
		let damage;
		if ( diceTotal < 5) {
			damage = '1d6';
		} else if ( diceTotal < 8) {
			damage = '2d6';
		} else if (diceTotal < 12) {
			damage = '3d6';
		} else if (diceTotal < 16) {
			damage = '4d6';
		} else if (diceTotal > 17) {
			damage = '5d6';
		} else {
			console.warn('No Bludgeoning Dice were found');
			return;
		}
		let changes = [
			{
				"key": "flags.midi-qol.OverTime",
				"mode": 5,
				"value": `turn=start,damageRoll=${damage},damageType=bludgeoning,label=\"Hemorrhaging\"`,
				"priority": 20
			}
		];
		effect.label = effect.label + ` - ${damage}`;
		effect.changes = changes;
		await ggHelpers.createEffect(targetActor, effect);
		const animFile = 'jb2a.claws.200px.red';
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

async function concussiveTechnique(args) {
	// console.log(args);
	const lastArg = args[args.length-1];
	if (lastArg.item.system.actionType !== 'mwak') return;
	let immunity = structuredClone(pathFeatureEffects.concussedImmunity);
	if (lastArg.hitTargets.length === 1) {
		let target = lastArg.hitTargets[0];
		let targetActor = target.actor;
		if (ggHelpers.findEffect(targetActor, immunity.label)) {
			ui.notifications.warn('Target is immune to Concussive Technique');
			return;
		}
		let actor = lastArg.actor;
		let concussed = structuredClone(pathFeatureEffects.concussed);
		concussed.origin = lastArg.uuid;
		immunity.origin = lastArg.uuid;
		await ggHelpers.createEffect(targetActor, immunity);
		if (lastArg.isCritical) {
			await ggHelpers.createEffect(targetActor, concussed);
			const animFile = 'jb2a.dizzy_stars.200px.purple';
			const animation = Sequencer.Database.entryExists(animFile);
			if (animation) {
				new Sequence()
				.effect()
				.file(animation)
				.atLocation(target)
				.play();
			}
			return;
		}
		let itemData = await ggHelpers.getItemFromCompendium('garhis-grotto.gg-item-blueprints', 'Concussive Strike', false);
		itemData.effects[0].origin = actor.uuid;
		itemData.system.save.dc = actor.system.attributes.spelldc;
		const tempItem = new CONFIG.Item.documentClass(itemData, { parent: actor });
		const config = {};
		const options = { targetUuids: [target.uuid], showFullCard: false, createWorkflow: true, versatile: false, configureDialog: false };
		await MidiQOL.completeItemUse(tempItem, config, options);
	}
}

async function concussiveStrike(args) {
	let lastArg = args[args.length -1];
	if (lastArg.failedSaves.length > 0) {
		let target = lastArg.failedSaves[0];
		const animFile = 'jb2a.dizzy_stars.200px.purple';
		const animation = Sequencer.Database.entryExists(animFile);
		if (animation) {
			new Sequence()
			.effect()
			.file(animation)
			.atLocation(target)
			.play();
		}
		return;
	}
}

export let haradin = {
	'hemorrhagingStrikes': hemorrhagingStrikes,
	'concussiveTechnique': concussiveTechnique,
	'concussiveStrike': concussiveStrike
}
