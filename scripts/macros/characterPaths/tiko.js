
import { ggHelpers } from "../../helperFunctions.js";

async function feedTheTrap(args) {
	console.log(args);
	const lastArg = args[args.length-1];
	let essenceSize = await ggHelpers.buttonMenu('What size essence is being fed?', [
		['Uncommon (+3)', 3],
		['Rare (+6)', 6],
		['Very Rare (+10)', 10]
	]);
	if( essenceSize ) {
		const actor = lastArg.actor;
		const item = actor.items.getName("Aether Trap");
		if (item) {
			const newValue = Math.min((item.system.uses.value + essenceSize), item.system.uses.max);
			let essenceItem = undefined;
			let essenceName = '';
			switch (essenceSize) {
				case 3:
					essenceName = 'Uncommon Essence';
					break;
				case 6:
					essenceName = 'Rare Essence';
					break;
				case 10:
					essenceName = 'Very Rare Essence';
					break;
			}
			essenceItem = actor.items.getName(essenceName);
			if( essenceItem && essenceItem.system.quantity != 0 ) {
				await essenceItem.update({"system.quantity": essenceItem.system.quantity-1});
				await item.update({"system.uses.value": newValue});
			} else {
				let errorDialog = new Promise((resolve, reject) => {
					new Dialog({
					title: "Unable to find Essence",
					content: `<p>Couldn't find any essence of type: ${essenceName}</p><p>Name must be exactly the same as expected</p>`,
						buttons: {
							  ok: {
								  label: "Ok",
								  callback: () => resolve()
							  },
						},
						default: "ok"
					}).render(true);
				});
				await errorDialog;
			}
		} else {
			ui.notifications.warn("Couldn't Find the item 'Aether Trap'");
		}
	}
}

export let tiko = {
	'feedTheTrap': feedTheTrap
}
