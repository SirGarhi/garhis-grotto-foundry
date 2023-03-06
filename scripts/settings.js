import {macros} from './macros.js';
let moduleName = 'garhis-grotto';
export function registerSettings() {
	game.settings.register(moduleName, 'Show Names', {
		'name': 'Show Names',
		'hint': 'Enabling this will show target names in the target selector dialog (Used for certain features and spells).',
		'scope': 'world',
		'config': true,
		'type': Boolean,
		'default': true
	});
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
				Hooks.on('midi-qol.RollComplete', macros.barbarian.handleRoll);
			} else {
				Hooks.off('midi-qol.RollComplete', macros.barbarian.handleRoll);
			}
		}
	});
}
