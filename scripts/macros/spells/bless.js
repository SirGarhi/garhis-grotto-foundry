import { ggHelpers } from "../../helperFunctions.js";

export async function bless(args) {
	game.user?.targets.forEach(t => {
		t.setTarget(false, { releaseOthers: false });
	});
	game.user?.targets.clear();
	const lastArg = args[args.length - 1];
	const token = canvas.tokens.get(lastArg.tokenId);
	let nearbyTargets = ggHelpers.findNearby(token, 30, 'nonHostile');
	nearbyTargets.push(token);
	let buttons = [{label: 'Apply to Selected', value: true},{label: 'Cancel', value: false}];
	const maxTargets = lastArg.castData.castLevel+2;
	let chosenTargets = await ggHelpers.selectTarget(`Bless Targets - (Max: ${maxTargets})`, buttons, nearbyTargets, true);
	if (chosenTargets) {
		if (!chosenTargets.buttons) return;
		let numSelectedTargets = chosenTargets.inputs.filter(val => val !== false).length;
		while(numSelectedTargets > maxTargets) {
			chosenTargets = await ggHelpers.selectTarget(`Chose Too Many Targets! (Max: ${maxTargets})`, buttons, nearbyTargets, true);
			if (!chosenTargets) return;
			if (!chosenTargets.buttons) return;
			numSelectedTargets = chosenTargets.inputs.filter(val => val !== false).length;
		}
		console.log(chosenTargets);
		for (let i = 0; i < chosenTargets.inputs.length; i++) {
			if (chosenTargets.inputs[i]) {
				let targetToken = nearbyTargets[i];
				console.log(targetToken);
				targetToken.setTarget(true, { user: game.user, releaseOthers: false });
			}
		}
	}
}
