import { ggHelpers } from "../../helperFunctions.js";
async function awaken(args) {
	let lastArg = args[args.length-1];
	let furyData = await ggHelpers.getItemFromCompendium('garhis-grotto.gg-item-blueprints', "Generational Fury", false);
	if (!furyData) return;
	let token = canvas.tokens.get(lastArg.tokenId)
	let actorUpdates = {
		'embedded': {
			'Item': {
				[furyData.name]: furyData,
			}
		}
	}
	let options = {
		'permanent': false,
		'name': 'Awakened',
		'description': 'Adds Generational Fury as a feature to the character sheet.'
	}
	await warpgate.mutate(token.document, actorUpdates, {}, options);
	const bladesong = lastArg.actor.items.getName("Bladesong");
	if (bladesong) bladesong.use();
}
async function item(args) {
	const greenFlameAnim = 'jb2a.sword.melee.fire.green';
	const boomingBladeAnim = 'jb2a.sword.melee.01.blue.4';
	const defaultAnim = 'jb2a.sword.melee.01.yellow.4';
	let animFile = defaultAnim;
	const lastArg = args[args.length-1];
	if (ggHelpers.findEffect(lastArg.actor, 'Green-Flame Blade')) {
		animFile = greenFlameAnim;
	} else if (ggHelpers.findEffect(lastArg.actor, 'Booming Blade')) {
		animFile = boomingBladeAnim;
	}
	const animation = Sequencer.Database.entryExists(animFile);
	if (animation) {
		const origin = canvas.tokens.get(lastArg.tokenId);
		if (lastArg.hitTargets.length === 0) return;
		new Sequence()
			.effect()
			.atLocation(origin)
			.stretchTo(lastArg.hitTargets[0])
			.file(animation)
			.repeats(1, 200, 300)
			.randomizeMirrorY()
			.play();	
	}
}
export let lineage = {
	'awaken': awaken,
	'item': item
}
