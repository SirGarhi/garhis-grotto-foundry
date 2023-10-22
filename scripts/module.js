import { registerSettings } from './settings.js';
import {macros, setupWorldMacros, setupMacroFolder} from './macros.js';
import {effects} from './effects.js';
import {ggHelpers} from './helperFunctions.js';

async function createWorldActors() {
    let folder = game.folders.getName('GG - Actor Templates');
    if (!folder) {
        folder = await Folder.create({
            'name': 'GG - Actor Templates',
            'type': 'Actor',
            'color': '#666666'
        });
    }
    let actorsCompendium = game.packs.get('garhis-grotto.gg-actor-blueprints');
    if (!actorsCompendium) return;
    let documents = await actorsCompendium.getDocuments();
    if (documents.length === 0) return;
    for (let actor of documents) {
        let folderActor = folder.contents.find(act => act.name === actor.name);
		if (!folderActor) {
			let actorData = actor.toObject();
        	actorData.folder = folder.id;
			await Actor.create(actorData);
		}
		/*
        let avatarImg;
        let tokenImg;
        let imageFlags;
        if (folderActor) {
            let folderVersion = folderActor.flags['chris-premades']?.version;
            let documentVersion = actor.flags['chris-premades']?.version;
            if (folderVersion && folderVersion === documentVersion) continue;
            avatarImg = folderActor.img;
            tokenImg = folderActor.prototypeToken.texture.src;
            imageFlags = folderActor.flags['chris-premades']?.summon;
            await folderActor.delete();
        }
        let actorData = actor.toObject();
        actorData.folder = folder.id;
        if (avatarImg) actorData.img = avatarImg;
        if (tokenImg) actorData.prototypeToken.texture.src = tokenImg;
        if (imageFlags) actorData.flags['chris-premades'].summon = imageFlags;
        await Actor.create(actorData);
		*/
    }
	/*
	let spiritualWeapon = await ggHelpers.getItemFromCompendium('garhis-grotto.gg-actor-blueprints', 'GG - Spiritual Weapon', false, false);
	if (spiritualWeapon) {
		let existingActor = game.actors.getName('GG - Spiritual Weapon');
		if (!existingActor) {
			await Actor.create(spiritualWeapon);
		}
	}
	let cloudDaggers = await ggHelpers.getItemFromCompendium('garhis-grotto.gg-actor-blueprints', 'GG - Cloud of Daggers', false, false);
	if (cloudDaggers) {
		let existingActor = game.actors.getName('GG - Cloud of Daggers');
		if(!existingActor) {
			await Actor.create(cloudDaggers);
		}
	}
	*/
}

Hooks.once('init', async function() {
	registerSettings();
});
Hooks.once('ready', async function() {
	if (game.user.isGM) {
		await setupMacroFolder();
		await setupWorldMacros();
		await createWorldActors();
	}
	if (game.settings.get('garhis-grotto', 'Rage Automation')) { Hooks.on('midi-qol.RollComplete', macros.features.class.barbarian.handleRoll);
	}
});

globalThis['garhisGrotto'] = {
	'helpers': ggHelpers,
	macros,
	effects
}
