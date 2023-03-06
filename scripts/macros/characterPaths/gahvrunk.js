import { ggHelpers } from '../../helperFunctions.js';
import { totemNames } from '../features/classFeatures/barbarian.js';

async function chooseBonusTotemFeatures(workflow) {
	// console.log(workflow);
	const bonusFeatureNames = [
		'Totem Spirit: Bear - Bonus', 
		'Totem Spirit: Eagle - Bonus', 
		'Totem Spirit: Elk - Bonus',
		'Totem Spirit: Venomfang - Bonus',
		'Totem Spirit: Wolf - Bonus'
	];
	let featureNames = [].concat(totemNames[0]);
	let actor = workflow.actor;
	let rageEffect = actor.effects.find(val => val.label === 'Rage');
	if (rageEffect) ggHelpers.removeEffect(rageEffect);
	let permFeatures = [];
	let bonusFeatures = []
	let getCurrentFeatures = function (permFeatures, bonusFeatures, featureNames, bonusFeatureNames, value) {
		if( featureNames.includes(value.name)) {
			console.log(`Found a matching permanent feature: ${value.name}`);
			permFeatures.push(value.name);
		} else if ( bonusFeatureNames.includes(value.name)) {
			console.log(`Found a matching bonus feature: ${value.name}`);
			bonusFeatures.push(value.id);
		}
	}.bind(this, permFeatures, bonusFeatures, featureNames, bonusFeatureNames);
	actor.items.forEach(getCurrentFeatures);

	if( bonusFeatures.length > 0 ) {
		console.warn("Removing already present bonus features");
		await actor.deleteEmbeddedDocuments('Item', bonusFeatures);
	}
	let choices = [];
	for (let feature of featureNames) {
		if (!permFeatures.includes(feature)) {
			let choice = [feature, feature];
			choices.push(choice);
		}
	}
	let chosenFeature = await ggHelpers.buttonMenu('Choose a Bonus Totem Warrior Feature', choices);
	// console.log(chosenFeature);
	let featureData = await ggHelpers.getItemFromCompendium('garhis-grotto.gg-item-blueprints', `${chosenFeature} - Bonus`, false);
	// console.log(featureData);
	await actor.createEmbeddedDocuments('Item', [featureData]);

}

async function sustainTheRage(workflow) {
	let rageEffect = ggHelpers.findEffect(workflow.actor, 'Rage');
	if (rageEffect.duration.seconds) {
		await rageEffect.update({'duration.seconds': 60, 'duration.rounds': 10});
	}
	if (game.settings.get('garhis-grotto', 'Rage Automation')) {
		workflow.actor.setFlag('garhis-grotto', 'shouldRageExpire', false);
	}
}

export let gahvrunk = {
	'chooseFeatures': chooseBonusTotemFeatures,
	'sustain': sustainTheRage
}
