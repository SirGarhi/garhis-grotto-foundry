import {ggHelpers} from '../../helperFunctions.js';

async function mount({speaker, actor, token, character, item, args}) {
	let updates = {
		'token': {
			'texture': {
				'src': 'modules/garhis-grotto/assets/art/pcs/eskelar/EskelarMountedToken.webp',
				'scaleX': 1.2,
				'scaleY': 1.2
			},
			'width': 2,
			'height': 2
		},
		'actor': {
			'system.attributes.movement.walk': 35
		}
	};
	let options = {
		'permanent': false,
		'name': 'Mounted',
		'description': 'Mounted up on Ajax'
	};
	await warpgate.mutate(token.document, updates, {}, options);
}

export let eskelar = {
	'ajax': {
		'mount': mount
	}
}
