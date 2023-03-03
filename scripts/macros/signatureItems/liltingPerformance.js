﻿export async function liltingPerformance(workflow) {
	const item = workflow.actor.items.getName("Bardic Inspiration");
	if( item ) {
		const value = Math.min(item.system.uses.value+1, item.system.uses.max);
		if ((item.system.uses.value+1) > item.system.uses.max) {
			ui.notifications.warn('Already at maximum uses of Bardic Inspiration');
			return; 
		} else {
			await item.update({"system.uses.value": system.uses.value+1});
		}
	}
}