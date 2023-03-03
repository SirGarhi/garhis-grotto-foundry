﻿import {macros} from './macros.js';
let moduleName = 'garhis-grotto';
export function registerSettings() {
	game.settings.register(moduleName, 'Expire Trance', {
		'name': 'Expire Trance Proficiencies',
		'hint': 'Enabling this option will cause the trance proficiencies effect to expire on a long rest',
		'scope': 'world',
		'config': true,
		'type': Boolean,
		'default': false
	});
	game.settings.register(moduleName, 'Rage Automation', {
		'name': 'Automate Rage Expiration',
		'hint': 'Attempts to detect if rage should fall off at the end of a barbarian\'s turn by using midi hooks.',
		'scope': 'world',
		'config': true,
		'type': Boolean,
		'default': false,
		'onChange': value => {
			if (value) {
				Hooks.on('midi-qol.RollComplete', macros.rage.handleRoll);
			} else {
				Hooks.off('midi-qol.RollComplete', macros.rage.handleRoll);
			}			
		}
	});
}
