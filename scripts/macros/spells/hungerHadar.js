import {ggHelpers} from '../../helperFunctions.js';
import { spellEffects } from '../../effects/spellEffects.js';

async function createHadarEffect(token) {
	let effect = structuredClone(spellEffects.hungerHadar);
	await ggHelpers.createEffect(token.actor, effect);
}

async function removeHadarEffect(token) {
	let effect = ggHelpers.findEffect(token.actor, 'Hunger of Hadar');
	if (!effect) return;
	await ggHelpers.removeEffect(effect);
}

async function create(template) {
	await new Promise(w => setTimeout(w, 15));
	let tokens = game.modules.get("templatemacro").api.findContained(template);
	await template.setFlag('garhis-grotto', 'containedTokens', tokens);
	async function initialEffects(item) {
		let token = canvas.scene.tokens.get(item);
		await createHadarEffect(token);
	}
	tokens.forEach(initialEffects);
}

async function remove(template) {
	let tokens = template.flags['garhis-grotto'].containedTokens;
	async function removeEffects(item) {
		let token = canvas.scene.tokens.get(item);
		await removeHadarEffect(token);
	}
	tokens.forEach(removeEffects);
}

async function enter(template, token) {
	await createHadarEffect(token.document);
	let tokens = template.flags['garhis-grotto'].containedTokens;
	tokens.push(token.document.id);
	await template.setFlag('garhis-grotto', 'containedTokens', tokens);
}

async function leave(template, token) {
	await removeHadarEffect(token.document);
	let index = template.flags['garhis-grotto'].containedTokens.indexOf(token.document.id);
	template.flags['garhis-grotto'].containedTokens.splice(index, 1);
}

export let hungerHadar = {
	'create': create,
	'remove': remove,
	'enter': enter,
	'leave': leave
}
