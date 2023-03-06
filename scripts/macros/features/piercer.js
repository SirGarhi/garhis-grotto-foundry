import { ggHelpers } from '../../helperFunctions.js';

async function piercerDamageBonus(workflow) {
	if (!workflow.isCritical) return;
	if (workflow.hitTargets.length < 1) return;
	const dice = workflow.damageRoll.dice.filter(val => val.options.flavor === 'piercing');
	if (!dice.length > 0) return;	
	let biggestDie = 0;
	for (let die of dice) {
		if (die.faces > biggestDie) biggestDie = die.faces;
	}
	if (biggestDie > 0) return {damageRoll: `1d${biggestDie}[piercing]`, flavor: 'Piercer Feat Critical Bonus'};
	return {};
}

async function piercerReroll(args, rerollThreshold) {
	// console.log(args);
	const lastArg = args[args.length-1];
	if (lastArg.hitTargets.length < 1) return;
	if (game.combat) {
		const combatTime = `${game.combat.id}-${game.combat.round + game.combat.turn /100}`;
		const lastTime = lastArg.actor.getFlag("garhis-grotto", "piercerRerollTime");
		if (combatTime === lastTime) {
			console.warn("GG | Piercer: Already re-rolled a die this turn");
			return;
		}
	}
	if (!["mwak", "rwak", "msak", "rsak"].includes(lastArg.item.system.actionType)) return;
	const dice = lastArg.damageRoll.dice.filter(val => (val.options.flavor === 'piercing' || val.options.flavor === 'Piercing'));
	if (!dice.length > 0) return;
	let possibleRerolls = [];
	for (let die of dice) {
		for (let result of die.results) {
			let damageLoss = ((die.faces-result.result) / die.faces);
			// console.warn(`dieSize: ${die.faces} rollValue: ${result.result} threshold: ${damageLoss}`)
			if (damageLoss >= rerollThreshold) {
				possibleRerolls.push({dieSize: die.faces, value: result.result});
			}
		}
	}
	// console.warn(possibleRerolls);
	if (!possibleRerolls.length > 0) return;
	let workflow = MidiQOL.Workflow.getWorkflow(lastArg.uuid);
	let buttons = [];
	for (let option of possibleRerolls) {
		buttons.push([`1d${option.dieSize} rolled ${option.value}`, option]);
	}
	buttons.push(['None', false]);
	let reroll = await ggHelpers.buttonMenu('Piercer Feat: Select die to reroll', buttons);
	if (reroll) {
		// console.warn('Processing Reroll with chosen die:');
		// console.warn(reroll);
		const damageRoll = new Roll(`1d${reroll.dieSize}`);
		await damageRoll.toMessage({flavor: `Piercer rerolling ${reroll.dieSize} that rolled ${reroll.value}`});
		let targetDie = { dieIndex: 0, resultIndex: 0, found: false};
		let findTargetDie = function (targetDie, value, index) {
			// console.log("testing die");
			// console.log(value);
			if (!targetDie.found) {
				if (value.options.flavor === 'piercing' || value.options.flavor === 'Piercing') {
					// console.log(value.faces + "vs" + reroll.dieSize);
					if (value.faces === reroll.dieSize) {
						for (let i = 0; i < value.results.length; i++) {
							// console.log( value.results[i].result + "vs" + reroll.value);
							if (value.results[i].result === reroll.value) {
								targetDie.dieIndex = index;
								targetDie.resultIndex = i;
								targetDie.found = true;
							}
						}
					}	
				}
			}
		}.bind(this, targetDie);
		workflow.damageRoll.dice.forEach(findTargetDie);
		// console.log(workflow.damageRoll.dice);
		// console.log(targetDie);
		workflow.damageRoll.dice[targetDie.dieIndex].results[targetDie.resultIndex].result = damageRoll.total;
		// console.log(workflow.damageRoll.dice);
		Hooks.once("midi-qol.DamageRollComplete", async (workflow) => {
			let totalDamage = 0;
			let merged = workflow.damageDetail.reduce((acc, item) => {
			  acc[item.type] = (acc[item.type] ?? 0) + item.damage;
			  return acc;
			}, {});
		
			const newDetail = Object.keys(merged).map((key) => { return { damage: Math.max(0, merged[key]), type: key } });
			totalDamage = newDetail.reduce((acc, value) => acc + value.damage, 0);
			workflow.damageDetail = newDetail;
			workflow.damageTotal = totalDamage;
		
			workflow.damageRoll._total = workflow.damageTotal;
			workflow.damageRollHTML = await workflow.damageRoll.render();
		
			//await workflow.displayDamageRoll()
			return true;
		});
		if (game.combat) {
			const combatTime = `${game.combat.id}-${game.combat.round + game.combat.turn /100}`;
			const lastTime = lastArg.actor.getFlag("garhis-grotto", "piercerRerollTime");
			if (combatTime !== lastTime) {
				await lastArg.actor.setFlag("garhis-grotto", "piercerRerollTime", combatTime)
			}
		}		
	}
}

export let piercer = {
	'damageBonus': piercerDamageBonus,
	'reroll': piercerReroll
}
