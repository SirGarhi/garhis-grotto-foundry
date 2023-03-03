# Garhi's Grotto Foundry Module
Foundry Module implementing the Items, Spells, Features, and Creatures developed by Garhi

# Module Compatibility
## Hard Requirements
* DnD 5e System
	- https://foundryvtt.com/packages/dnd5e
* libwrapper
	- https://foundryvtt.com/packages/lib-wrapper
* socketlib
	- https://foundryvtt.com/packages/socketlib
* DAE
	- https://foundryvtt.com/packages/dae
* Midi QoL
	- https://foundryvtt.com/packages/midi-qol
* DFreds Convenient Effects
	- https://foundryvtt.com/packages/dfreds-convenient-effects
* Active Auras
	- https://foundryvtt.com/packages/ActiveAuras
* Times Up
	- https://foundryvtt.com/packages/times-up
* Warp Gate
	- https://foundryvtt.com/packages/warpgate
* Effect macro
	- https://foundryvtt.com/packages/effectmacro
* Active Token Effects
	- https://foundryvtt.com/packages/ATL
* Advanced Macros
	- https://foundryvtt.com/packages/advanced-macros  
### Likely to become Hard Requirements in a future update
* Items with Spells DnD 5e
	- https://foundryvtt.com/packages/items-with-spells-5e
* Arbron's Summoning (5e)
	- https://foundryvtt.com/packages/arbron-summoner

## Soft Requirements
* Compendium Folders
	- Without it browsing the compendiums is a nightmare, but won't technically break anything if it's missing.
	- https://foundryvtt.com/packages/compendium-folders/
* JB2A - Patreon Edition
	- Without it you'll have broken images for some items/spells/features/tokens. I *may* create a separate compendium that utilizes the free version at some point.
	- https://www.patreon.com/JB2A

# Complimentary Modules
These modules do similar things as what I am. Rather than duplicating work, I'm focusing on covering items/spells/features that these other modules don't handle. There's some overlap where I dislike the way one of these other modules has implemented something.
* Chris's Premades
	- https://foundryvtt.com/packages/chris-premades
* DnD Beyond Importer
	- https://foundryvtt.com/packages/ddb-importer

# Required Foundry and Module Settings
If you utilize Forien's Copy Environment to import my settings, these will be configured correctly (along with a whole host of other things)
## User Permissions
* **Create New Tokens** - Required for Warp Gate to function.
* **Use File Browser** - Required for Warp Gate to function.
## DFreds Convenient Effects
* Must run the GG_updateConvenientEffects Macro found in the GG Macros folder of the world macro directory to create/update the required custom effects.
## Midi QOL
* Enable roll automation support - Enabled and Locked
### Workflow Settings
#### Workflow Tab
* Auto apply item effects - Set to any of the three "Apply Effects" options, If you don't enforce requiring a target then it's advised to not remove the button.
* Apply Convenient Effects - Set to "Apply item effects, if absent apply CE"
#### Misc Tab
* Add item on use macro to sheet - Must be Checked
## Item Macro (if installed)
* **Character Sheet Hook** - Must be Unchecked
* **Override default macro execution** - Must be Unchecked
## D&D Beyond Importer (if installed)
### Core setup
* **A Cobalt Cookie** - Follow the instructions to get and enter one
Not strictly required, but it allows for importing full spell lists which will drastically increase the coverage of automated spells.
### Compendiums Configuration
* **Override** - \[garhis-grotto\] Garhi's Grotto - Override
### Importer Window
#### Active Effects Tab
##### Active Effect Options
* **Generate Effects for Equipment** - Enabled
* **Generate Active Effects for Spells** - Enabled
* **Generate Effects for Character Features/Racial Traits/Feats/Backgrounds** - Enabled
##### Active Effects to include for Characters
Enable Spell Bonuses, and *only* Spell Bonuses, for all 4 options.
#### Advanced Tab
* **Replace Items using those in your Override compendium** - Enabled

## Other Useful Modules
* LMRTFY - OR - Monk's Token Bar (my preference)
	- Allows for players to still have agency in rolling their saving throws via Midi.
	- https://foundryvtt.com/packages/lmrtfy
	- https://foundryvtt.com/packages/monks-tokenbar
* Walled Templates
	- Allows templates to be blocked by walls, also allows for setting templates to effect grid squares they overlap by a certain percentage, not only looking at the center point.
	- https://foundryvtt.com/packages/walledtemplates
* Item Macro 
	- Needed to examine the macros embedded in items. They will function fine without it though.
	- https://foundryvtt.com/packages/itemacro
* Item Collection
	- Allows container items to actually have an inventory you can place other items in.
	- The Survivalist's Pouch signature item makes use of this module.
	- https://foundryvtt.com/packages/itemcollection
* DFreds Effects Panel - OR - Visual Active Effects (my preference)
	- Provides a "buff bar" style listing of the selected token's active effects, with easy controls to delete or disable. Visual Active Effects allows for disabling temporary effects while DFreds Panel does not.
	- https://foundryvtt.com/packages/dfreds-effects-panel
	- https://foundryvtt.com/packages/visual-active-effects
* Automated Animations
	- Most of the spells and items are set up to trigger automated animations. An autorec file to import is provided in the manualTools folder.
	- https://foundryvtt.com/packages/autoanimations
* Simple Calendar
	- Simple and effective calendar mod. Has a few pre-built options including Exandria (Critical Role) and Greyhawk.
	- https://foundryvtt.com/packages/foundryvtt-simple-calendar
* Small Time
	- Allows for manually incrementing the game time, useful for automatically removing effects with durations in the 10 minute or 1 hour range. Also can be configured to adjust the darkness level of your scene, and will pull sunrise/sunset data from Simple Calendar if used.
	- https://foundryvtt.com/packages/smalltime
* Module Management+
	- Enables you to lock settings that exist within the user scope instead of the world scope and force sync them for your users. Also overhauls the module management UI to provide a great deal more information.
	- https://foundryvtt.com/packages/force-client-settings
* Forien's Copy Environment
	- Allows you to import/export configuration settings of the entire world, including which modules are active and settings within those modules. My personal settings are provided within the manualTools folder.
	- https://foundryvtt.com/packages/forien-copy-environment

# Suggested Foundry and Module Settings
## Active-Auras
* Auras in combat - Enabled
* Disable scrolling text for auras - Enabled
## Chris's Premades
* Show Names - Enabled
* Condition Resistance Mechanic - Enabled
* Mirror Image - Enabled
* Protection from Evil and Good Automation - Enabled
* Undead Fortitude Automation - Enabled
## Compendium Folders
* Default Keep ID - Enabled
* Auto Create folders on Import - Enabled
## D&D Beyond Importer
* Monster D&D Beyond link in title bar - Disabled
* Add restrictions to damage hint - Disabled
## DFreds Convenient Effects
* App Controls Permission - Player
* Remove Controls Permission - Player
* Allow Players Custom Effects - Enabled
* Integrate with ATE - Enabled
* Modify Status Effects - Replace
## Dynamic Effects using Active Effects
* Expire timed effents in real time - Disabled
* Display results of inline rolls - Disabled
* DAE Title Bar - Disabled
## Item Macro
* Player Access - Enabled
* Display Icon Only - Enabled
## Midi QOL
### Workflow Settings
#### GM Tab
* Auto roll attack - Enabled
* Auto fast forward Attack - Enabled
* Auto roll damage - Damage Roll Needed
* Auto fast forward damage - Enabled
#### Player Tab
* Auto roll attack - Enabled
* Auto roll damage - Damage Roll Needed
* Auto fast forward rolls - Attack and Damage
#### Workflow Tab
##### Targeting
* Auto target on template draw - Use Walled Templates
* Auto remove placed template on spell expiry - Enabled
* Require targets to be selected - In Combat
##### Hits
* Auto check if attack hits target - Check - all see result
* Roll a separate attack per target - Enabled
* Display how much an attack hit or missed by (per target) - Enabled
##### Saves
* Auto check Saves - Save - All see Result + Rolls
* Display Saving throw DC - Enabled
* Display if save had Advantage/Disadvantage - Enabled
##### Damage
* Auto apply damage to target - Yes
* Show a players' damage card - Don't show
* Apply Damage immunities - apply immunites + physical
* Require 'Magical' property - Non spells do non-magical damage
#### Concentration Tab
* Enable Contentration Automation - Enabled
* Remove concentration on failed save - Disabled (There's too many reaction abilities and ways to modify a failed save to make this worth it)
* Remove concentration when effects removed - Check Effects and Templates
#### Misc Tab
* Merge Rolls to one card - Enabled
* Condense Attack/Damage Rolls - Enabled
* Move roll formula to tooltip - Advantage Attribution - This will let you see why midi is automatically applying advantage or disadvantage to a roll when you expand the roll formula.
* Chat cards use token name - Enabled
* Use Actor portrait in chat cards - Enabled
#### Mechanics Tab
* Mark Wounded when hp falls below % - 50
* Add effect when HP = 0 - Add effect as overlay
* Check weapon range when attacking - Disabled (Reaction abilities like Attacks of Opportunity become hard to use with this on)
* Ability Check Advantage give Skill Advantage - Enabled
#### Rules Tab
* Optional Game Rules - Enabled
* Ranged attacks when a foe is closer than this have disadvantage - 5
## Token Magic FX
* Enable automatic template effects - Disabled (I think most of them look bad, and they clash horribly with spells that have proper sequencer effects set up)
* Default template grid on hover - Either enable this or enable the one in Automated Animations settings. This setting is a lot easier to access.
* Automatically hide template elements - Disabled
## Walled Templates
* Autotargeting and highlighting - Token area overlaps template
* Autotargeting and highlighting area - 0.1
In D&D 5e, only circular templates have an overlapping percentage requirement, rays, cones, and cubes effect every grid square they touch. Unfortunately, there's not a good module at the moment that implements that exact behavior and also handles walls. These settings feel like the best compromise to me.

# Current Contents and Instructions
* GG_updateConvenientEffects Macro
Find this macro inside the GG Macros folder, execute it to create/update the relevant Convenient Effects used by this module. Note that if you already have an effect by the same name, it will be overwritten by mine.

## Garhi's Grotto - Journals
This compendium contains journal entries, specifically those linked to by the Signature Items giving more detailed descriptions of their current and potential abilities. No manual interactions with this compendium should be necessary. The same writeups can be found at https://www.garhisgrotto.com/armory

## Garhi's Grotto - Creatures
This compendium holds actors meant to be manually deployed for use in testing or play.
### Testing Dummies 
Contains a few training dummy creatures configured with various effects to make testing out items, spells, and features easier.

## Garhi's Grotto - Summon Blueprints
This compendium holds actors meant to be summoned by items, spells, or features utilizing Warp Gate or Arbron's Summoning.
### Invulnerable Summons
These actors are all flagged Invulnerable to Damage and Conditions
* **Spiritual Weapon** - A Medium sized Token with no meaningful effects or attacks unless spawned by the matching spell in the Garhi's Grotto - Spells Compendium.

## Garhi's Grotto - Inventory Items
This compendium holds inventory items: Weapons, Equipment, Loot, etc.
* **Boots of Elvenkind** - Grants advantage on stealth skill checks. Technically in 5e these are only supposed to apply to checks to *move silently* and not checks to *hide* (the cloak is for those), but I've yet to run across a DM that actually wants to make and track that distinction.
* **Cloak of Displacement** - Applies the *Displacement* Convenient Effect to the wearer at the start of each turn in combat.
* **Gloves of Thievery** - Applies a +5 bonus to the Sleight of Hand skill. *Note:* You will need to apply the bonus to the thieves tool item manually, as there's no way for specific tools to be granted bonuses by active effects.
* **Iron Bands of Bilarro** - Ranged attack roll the apply the Restrained condition.
* **Periapt of Proof against Poison** - Grants Immunity to Poison Damage and the Poisoned condition.
* **Potent Poison** - Crafted by the Tasha's Poisoner feat. Con save vs. Flat DC 14 for 2d8 Poison Damage and the Poisoned condition for 1 round.
* **Sentinel Shield +1** - Provides a +3 total AC bonus and grants Advantage to both Initiative and Percepption checks.
* **Stone of Good Luck** - Grants a +1 bonus to all ability checks and saving throws.

## Garhi's Grotto - Spells
This compendium holds spells
### Cantrips
* **Booming Blade** - Applies a buff to the user, causing their next melee weapon attack to deal increased damage. On a hit, applies an effect to the target causing them to take damage if they move before it wears off.
* **Green-Flame Blade** - Applies a buff to the user, causing their next melee weapon attack to deal increased damage. On a hit, prompts the user to select a target to deal the secondary splash damage to.
* **Light** - Properly sets the target as emitting light.
	- ***Note*** This is not coded as a Saving Throw because it's far more often that you cast it on a willing target than an unwilling one.
* **Sword Burst** - Force targets all creatures within range before prompting for saves and rolling damage.
* **Toll the Dead** - Dynamically changes damage based on whether the target is at full hitpoints or not.
* **Word of Radiance** - Prompts the user to select targets within range before prompting for saves and rolling damage.
### 1st Level
* **Absorb Elements** - Prompts the user to select which type of damage is being absorbed, and then applies two effects. The first grants resistance until the start of their next turn. The second applies bonus elemental damage to the first melee weapon hit before the end of their next turn.
* **Bless**
* **Hex** - Does several things to automate this spell.
	- Prompts the user on initial cast to select which ability they are cursing.
	- Applies the appropriate effect to the selected target.
	- Creates and adds a new feature called "Transfer Hex" to the user's character sheet.
	- Applies a damage bonus macro that will automatically roll and add hex damage to any attack roll made against the cursed target.
### 2nd Level
* **Aid** - Applies an effect which increases maximum hitpoints and then heals for the same amount.

## Garhi's Grotto - Features
Class Features, Racial Features, Feats, basically anything that isn't a Spell or an Inventory Item.
### Class Features
* **Bladesong** - Applies a buff granting increases to AC, Walk Speed, Concentration Saves, and Advantage on Acrobatics checks.
* **Channel Divinity: Twilight Sanctuary** - Applies an aura effect that grants temporary hp to allies ending their turn inside of it. If an ally is afflicted by a Charm of Fear affect, they are instead prompted for whether to end the effect or take the healing. Technically it should be the cleric making this decision but it didn't seem worth trying to get that working.
	- ***Note - Manually Tweaking Required*** - This item must be edited to point at the correct resource to consume for Channel Divinity.
* **Emboldening Bond** - Prompts the caster to select targets within range, then applies the *Emboldening Bond* Convenient Effect.
* **Evasion** - Flags the user as a SuperSaver for Dexterity Saving Throws.
* **Fighting Spirit** - Grants advantage to all attacks made before the end of the turn on which it's used. Also applies a scaling value of temporary hitpoints.
* **Protective Bond** - Teleports the user via Automated Animations the same way Misty Step does.
* **Rakish Audacity** - Provides an initiative bonus equal to your charisma modifier. Presence of this feature augments the way the Sneak Attack feature works by enabling an additional check to see if no other tokens are within 5 feet of you.
* **Reckless Attack** - Applies 2 effects on use. The first grants advantage on all strength based attack rolls until the end of the turn. The second grants advantage to all incoming attacks until the start of your next turn.
* **Sneak Attack** - Determines if an attack is valid to apply Sneak Attack damage to, and then prompts the user whether to use it or not. By enabled the second effect (Sneak Attack (Auto)), the user it's prompted and instead Sneak Attack is applied on the first valid attack made during the turn.
	- ***Note*** - Manual tweaking possible. By setting a weapon's Activation Condition field to "Always Sneak", the Sneak Attack feature will always allow sneak attack damage if the attack doesn't have disadvantage. It will still only apply once per turn.
	- ***Note*** - If the user has no intention of ever using the Auto sneak feature. I recommend removing that effect entirely to save processing overhead. Similarly, if the user intends to always use the auto feature, I recommend combining the two effects in to one for the same reason.
* **Steady Aim** - Applies two effects, the first grants advantage to the next attack roll made. The second sets all speeds to 0 until the end of the turn.
### Feats
* **Crossbow Expert/Gunner** - Applies a passive effect that causes the user to ignore disadvantage on ranged attacks imposed by creatures within 5 feet.
	- ***Note*** - If you don't use the midi setting to impose disadvantage based on nearby creatures, I recommend removing the passive effect to save processing overhead.
* **Great Weapon Master** - Applies an effect granting a -5 Penalty to Attack and a +10 Bonus to Damage to the next melee attack made. The user will need to activate this before each attack they want to apply it to, it's not a toggle.
* **Piercer** - Automatically rolls an additional damage die of Piercing damage on a critical hit. Also prompts the user to re-roll their lowest die of Piercing damage once per turn.
	- ***Note*** Manual tweaking possible. By default, the prompt shows all dice that rolled less than their maximum. This is easily tweaked by editing the ItemMacro and changing the damageLossThreshold.
* **Sharpshooter** - Similar to Great Sweapon Master, but also has a passive effect that ignores the disadvantage from utilizing long range and the ac bonus granted by cover as calculated by the Levels module.
	- ***Note*** - If you don't use the midi features to calculate cover or impose disadvantage based on range, I recommend removed the passive effect so save processing overhead.
* **Spell Sniper** - Applies a passive effect that ignores the cover bonuses calcualted by the Levels module.
	- ***Note*** - If you don't use the midi features to calculate cover I recommend removed the passive effect so save processing overhead.
* **War Caster** - Grants advantage on concentration checks.

### Other Features
* **Darkvision** - Only use these effects for temporary scenarios. If it's an always on, non-changing sense, set it up properly in the token. Every active effect contributes to processing overhead.

### Racial Features
* **Astral Trance** - Prompts the user to select 1 skill and 1 weapon/tool proficiency they don't already have, then applies an effect granting those proficiencies. By default, this effect will persist until the user uses this ability again. There is an option in the module settings to force this effect to fall off on a long rest.
* **Blessing of the Raven Queen** - Teleports the user using Automated Animations, then applies a Resistance to all damage effect until the start of the user's next turn.
* **Starlight Step** - Teleports the user using Automated Animations.
* **Trance** - As per Astral Trance, but prompts for 2 Weapon/Tool proficiencies.
