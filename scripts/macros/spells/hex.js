import {ggHelpers} from '../../helperFunctions.js';
async function hexItem(workflow) {
    if (workflow.targets.size != 1) return;
    let featureData = await ggHelpers.getItemFromCompendium('garhis-grotto.gg-blueprint-items', 'Transfer Hex', false);
    if (!featureData) return;
    let selection = await ggHelpers.buttonMenu('What ability should have disadvantage?', [
        ['Strength', 'str'],
        ['Dexterity', 'dex'],
        ['Constitution', 'con'],
        ['Intelligence', 'int'],
        ['Wisdom', 'wis'],
        ['Charisma', 'cha']
    ]);
    if (!selection) selection = 'str';
    let seconds;
    switch (workflow.castData.castLevel) {
        case 3:
        case 4:
            seconds = 28800;
            break;
        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
            seconds = 86400;
            break;
        default:
            seconds = 3600;
    }
    let targetEffectData = {
        'label': 'Hexed',
        'icon': workflow.item.img,
        'origin': workflow.actor.uuid,
        'duration': {
            'seconds': seconds
        },
        'changes': [
            {
                'key': 'flags.midi-qol.disadvantage.ability.check.' + selection,
                'mode': CONST.ACTIVE_EFFECT_MODES.CUSTOM,
                'value': 'true',
                'priority': 20
            }
        ]
    };
    await ggHelpers.createEffect(workflow.targets.first().actor, targetEffectData);
    async function effectMacro() {
        await warpgate.revert(token.document, 'Hex');
        let targetTokenId = effect.changes[0].value;
        let targetToken = canvas.scene.tokens.get(targetTokenId);
        if (!targetToken) return;
        let targetActor = targetToken.actor;
        console.log("Looking up effect on target: " + targetActor.uuid + "from source: " + effect.origin);
        let targetEffect =  garhisGrotto.ggHelpers.findEffectFromSource(targetActor, 'Hexed', effect.origin);
        console.log(targetEffect);
        if (!targetEffect) return;
        await garhisGrotto.ggHelpers.removeEffect(targetEffect);
    }
    let sourceEffectData = {
        'label': 'Hex',
        'icon': workflow.item.img,
        'changes': [
            {
                'key': 'flags.garhis-grotto.spell.hexTarget',
                'mode': CONST.ACTIVE_EFFECT_MODES.CUSTOM,
                'value': workflow.targets.first().id,
                'priority': 20
            },
            {
                'key': 'flags.dnd5e.DamageBonusMacro',
                'mode': 0,
                'value': 'GG_hexDamage',
                'priority': 20
            }
        ],
        'transfer': false,
        'origin': workflow.item.uuid,
        'duration': {
            'seconds': seconds
        },
        'flags': {
            'effectmacro': {
                'onDelete': {
                    'script': ggHelpers.functionToString(effectMacro)
                }
            }
        }
    }
    let updates = {
        'embedded': {
            'Item': {
                [featureData.name]: featureData
            },
            'ActiveEffect': {
                [sourceEffectData.label]: sourceEffectData
            }
        }
    };
    let options = {
        'permanent': false,
        'name': sourceEffectData.label,
        'description': sourceEffectData.label
    };
    await warpgate.mutate(workflow.token.document, updates, {}, options);
    let conEffect = ggHelpers.findEffect(workflow.actor, 'Concentrating');
    if (conEffect) {
        let updates = {
            'duration': {
                'seconds': seconds
            }
        };
        await ggHelpers.updateEffect(conEffect, updates);
    }
}
async function hexDamage(workflow) {
    if (workflow.hitTargets.size != 1) return;
    let hexedTarget = ggHelpers.findEffect(workflow.actor, 'Hex')?.changes[0]?.value;
    let targetToken = workflow.hitTargets.first();
    if (targetToken.id != hexedTarget) return;
    let damage = "1d6[necrotic]";
    if (workflow.isCritical) damage = "2d6[necrotic]";
	return {damageRoll: damage, flavor: "Hex"};
}
async function hexTransfer(workflow) {
    if (workflow.targets.size != 1) {
        ui.notifications.warn('Can only transfer Hex to a single target'); 
        return;    
    }
    let targetToken = workflow.targets.first();
    let targetActor = targetToken.actor;
    let effect = ggHelpers.findEffect(workflow.actor, 'Hex');
    let oldTargetToken;
    if (effect) {
        let oldTargetTokenId = ggHelpers.findEffect(workflow.actor, 'Hex')?.changes[0]?.value;
        oldTargetToken = canvas.scene.tokens.get(oldTargetTokenId);
    }
    let selection = 'flags.midi-qol.disadvantage.ability.check.str';
    if (oldTargetToken) {
        let oldTargetActor = oldTargetToken.actor;
        let oldTargetEffect =  ggHelpers.findEffectFromSource(oldTargetActor, 'Hexed', workflow.actor.uuid);
        if (oldTargetEffect) {
            await ggHelpers.removeEffect(oldTargetEffect);
            selection = oldTargetEffect.changes[0].key;
        }
    }
    let duration = 3600;
    if (effect) duration = effect.duration.remaining;
    let effectData = {
        'label': 'Hexed',
        'icon': effect.icon,
        'origin': workflow.actor.uuid,
        'duration': {
            'seconds': duration
        },
        'changes': [
            {
                'key': selection,
                'mode': CONST.ACTIVE_EFFECT_MODES.CUSTOM,
                'value': 'true',
                'priority': 20
            }
        ]
    };
    await ggHelpers.createEffect(targetActor, effectData);
    if (effect) {
        let changes = effect.changes;
        changes[0].value = targetToken.id;
        let updates = {changes};
        await ggHelpers.updateEffect(effect, updates);
    }
}
export let hex = {
    'item': hexItem,
    'damage': hexDamage,
    'transfer': hexTransfer
};
