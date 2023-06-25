import {ggHelpers} from '../../helperFunctions.js';

export async function aid(args) {
	const lastArg = args[args.length - 1];
	const target = await ggHelpers.getActorByUuid(lastArg.actorUuid);
	let buff = (parseInt(args[1]) - 1) * 5;
	let curHP = target.system.attributes.hp.value;
	let curMax = target.system.attributes.hp.max;

	if (args[0] === "on") {
		await target.update({ "system.attributes.hp.value": curHP + buff });
	} else if (args[0] === "off" && curHP > curMax) {
		await target.update({ "system.attributes.hp.value": curMax });
	}
}
