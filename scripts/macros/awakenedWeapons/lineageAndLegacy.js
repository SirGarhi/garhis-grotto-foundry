import { ggHelpers } from "../../helperFunctions.js";
async function awaken(args) {
	const lastArg = args[args.length-1];
	const actor = lastArg.actor;
	const fury = actor.items.getName("Generational Fury");
	await fury.update({'system.uses.value': 2});
	const bladesong = actor.items.getName("Bladesong");
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
