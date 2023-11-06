import { ggHelpers } from './helperFunctions.js';
import { features } from './macros/features.js';
import { spells } from './macros/spells.js';
import { characterPaths } from './macros/characterPaths.js';
import { awakenedWeapons } from './macros/awakenedWeapons.js';
import { inventoryItems } from './macros/inventoryItems.js';

export let macros = {
	'selectTargetsInRange': selectTargetsInRange,
	'targetAllInRange': targetAllInRange,
	'features': features,
	'spells': spells,
	'paths': characterPaths,
	'awakenedWeapons': awakenedWeapons,
	'items': inventoryItems
}
async function selectTargetsInRange(args, range, disposition) {
	const lastArg = args[args.length-1];
	let token = canvas.tokens.get(lastArg.tokenId);
	let nearbyTargets = ggHelpers.findNearby(token, range, disposition);
	let buttons = [{label: 'Target Selected Only', value: 'selected'}, {label: 'Target All', value: 'all'}];
	let chosenTargets = await ggHelpers.selectTarget('Select Targets in Range', buttons, nearbyTargets, true);
	game.user?.targets.forEach(t => {
		t.setTarget(false, { releaseOthers: false });
	});
	game.user?.targets.clear();	
	if (chosenTargets) {
		if (chosenTargets.buttons === 'selected') {
			for (let i = 0; i < chosenTargets.inputs.length; i++) {
				if (chosenTargets.inputs[i]) {
					let targetToken = nearbyTargets[i];
					targetToken.setTarget(true, { user: game.user, releaseOthers: false });
				}
			}
		} else if (chosenTargets.buttons === 'all') {
			for (let targetToken of nearbyTargets) {
				targetToken.setTarget(true, { user: game.user, releaseOthers: false });
			}
		}
	}
}
async function targetAllInRange(args, range, disposition) {
	const lastArg = args[args.length-1];
	let token = canvas.tokens.get(lastArg.tokenId);
	let nearbyTargets = ggHelpers.findNearby(token, range, disposition);
	game.user?.targets.forEach(t => {
		t.setTarget(false, { releaseOthers: false });
	});
	game.user?.targets.clear();
	for (let targetToken of nearbyTargets) {
		targetToken.setTarget(true, { user: game.user, releaseOthers: false });
	}
}
