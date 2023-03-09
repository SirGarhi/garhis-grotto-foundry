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
* Sequencer
	- https://foundryvtt.com/packages/sequencer
* Compendium Folders
	- https://foundryvtt.com/packages/compendium-folders/	
### Likely to become Hard Requirements in a future update
* Items with Spells DnD 5e
	- https://foundryvtt.com/packages/items-with-spells-5e
* Arbron's Summoning (5e)
	- https://foundryvtt.com/packages/arbron-summoner

## Soft Requirements
* JB2A - Patreon Edition
	- Without it you'll have broken images for some items/spells/features/tokens. I *may* create a separate compendium that utilizes the free version at some point.
	- https://www.patreon.com/JB2A
* Item Macro 
	- Required if you want to take advantage of any of the manual tweaking possibilities of items, features, or spells. Everything will function fine without it though.
	- https://foundryvtt.com/packages/itemacro
* Item Collection
	- Allows container items to actually have an inventory you can place other items in.
	- Some items such as the *Survivalist's Pouch* signature item makes use of this module.
	- https://foundryvtt.com/packages/itemcollection

# Complimentary Modules
These modules do similar things as what I am. Rather than duplicating work, I'm focusing on covering items/spells/features that these other modules don't handle. There's some overlap where I dislike the way one of these other modules has implemented something.
* Chris's Premades
	- https://foundryvtt.com/packages/chris-premades
* DnD Beyond Importer
	- https://foundryvtt.com/packages/ddb-importer

# Foundry and Module Settings
## Hard Requirements
These Settings ***MUST*** be set correctly or things won't function at all.
### User Permissions
* **Configure Token Settings** - Required for Warp Gate to function.
* **Create New Tokens** - Required for Warp Gate to function.
* **Use File Browser** - Required for Warp Gate to function.
### DFreds Convenient Effects
* Must run the GG_updateConvenientEffects Macro found in the GG Macros folder of the world macro directory to create/update the required custom effects.
### Midi QOL
* **Enable roll automation support** - Enabled and Locked
#### Workflow Settings
##### Workflow Tab
###### Specials
* **Auto apply item effects** - Apply effects [user preference]
* **Apply Convenient Effects** - Apply item effects, if absent apply CE
##### Misc Tab
* **Add item on use macro to sheet** - Enabled
### Item Macro (if installed)
* **Character Sheet Hook** - Disabled
* **Override default macro execution** - Disabled

## Soft Requirements
Without these settings things *should* still function, but it kind of defeats the purpose of the way things are built.
### Midi QOL
#### Workflow Settings
##### GM Tab
* Auto roll attack - Enabled
* Auto fast forward Attack - Enabled
* Auto roll damage - Always or Damage Roll Needed (My Preference)
* Auto fast forward damage - Enabled
##### Player Tab
* Auto roll attack - Enabled
* Auto roll damage - Always or Damage Roll Needed (My Preference)
* Auto fast forward rolls - Attack and Damage
##### Workflow Tab
###### Targeting
* Auto target on template draw - Use Walled Templates (If Installed, else Walls Block - Ignore Defeated)
###### Hits
* Auto check if attack hits target - Check - [user preference]
* Roll a separate attack per target - Enabled
###### Saves
* Auto check Saves - Save - [user preference]
###### Damage
* Auto apply damage to target - Yes
* Apply Damage immunities - apply immunites + physical
##### Misc Tab
* Merge Rolls to one card - Enabled

## Highly Recommended
### Active-Auras
* Auras in combat - Enabled
* Disable scrolling text for auras - Enabled
### Compendium Folders
* Default Keep ID - Enabled
* Auto Create folders on Import - Enabled
### Midi QOL
#### Workflow Settings
##### Workflow Tab
###### Targeting
* Auto remove placed template on spell expiry - Enabled
* Require targets to be selected - In Combat
##### Concentration Tab
* Enable Contentration Automation - Enabled
* Remove concentration on failed save - Disabled (There's too many reaction abilities and ways to modify a failed save to make this worth it)
* Single Concentration Check - Enabled
* Remove concentration when effects removed - Check Effects and Templates
##### Misc Tab
* Condense Attack/Damage Rolls - Enabled
* Move roll formula to tooltip - Advantage Attribution (Informs you *why* Midi is automatically applying advantage or disadvantage)
### Warp Gate
* Revert button behavior - 'Show mutation stack dialog' and locked
Several items in this pack utilize warpgate mutations to drive the changes. With default settings, if a player curiosly clicks the 'Revert' button at the top of their character sheet, the last applied mutation will be removed without warning. Showing the mutation stack dialog allows players to see what mutations are applied to their character and also know exactly what it is they might be removing.

## Highly Recommended Modules
* LMRTFY (my preference) - OR - Monk's Token Bar
	- Allows for players to still have agency in rolling their saving throws via Midi.
	- https://foundryvtt.com/packages/lmrtfy
	- https://foundryvtt.com/packages/monks-tokenbar
* Walled Templates
	- Allows templates to be blocked by walls, also allows for setting templates to effect grid squares they overlap by a certain percentage, not only looking at the center point.
	- https://foundryvtt.com/packages/walledtemplates
* DFreds Effects Panel - OR - Visual Active Effects (My Preference)
	- Provides a "buff bar" style listing of the selected token's active effects, with easy controls to delete or disable. Visual Active Effects allows for disabling temporary effects while DFreds Panel does not.
	- https://foundryvtt.com/packages/dfreds-effects-panel
	- https://foundryvtt.com/packages/visual-active-effects
* Automated Animations
	- Most of the spells and items are set up to trigger automated animations.
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
* Health Monitor
	- Prints to the chat log whenever an actor's health changes. Useful to visually verify that Midi is properly applying damage.
	- https://foundryvtt.com/packages/health-monitor

# Mildly Recommended Foundry and Module Settings
## Chris's Premades
* Show Names - Enabled
* Condition Resistance Mechanic - Enabled
* Mirror Image - Enabled
* Protection from Evil and Good Automation - Enabled
* Undead Fortitude Automation - Enabled
## D&D Beyond Importer
These settings are in the foundry settings menu, not the window that opens when you actually use the importer.
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
## Garhi's Grotto
* Automate Rage Expiration - Enabled
## Item Macro
* Player Access - Enabled
* Display Icon Only - Enabled
## Midi QOL
### Workflow Settings
#### Workflow Tab
##### Hits
* Display how much an attack hit or missed by (per target) - Enabled
##### Saves
* Display Saving throw DC - Enabled
* Display if save had Advantage/Disadvantage - Enabled
* Prompt Players to Roll Saves - [user preference]
##### Damage
* Show a players' damage card - Don't show
* Require 'Magical' property - Non spells do non-magical damage
#### Misc Tab
* Chat cards use token name - Enabled
* Use Actor portrait in chat cards - Enabled
#### Mechanics Tab
* Mark Wounded when hp falls below % - 50
* Add effect when HP = 0 - Add effect as overlay
* Check weapon range when attacking - Disabled (Reaction abilities like Attacks of Opportunity become annoying to use with this on)
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
## D&D Beyond Importer Window
These settings are in the window that pops up when you actually open the importer for use, not in the foundry settings menu.
### Core setup
* **A Cobalt Cookie** - Follow the instructions to get and enter one
Not strictly required, but it allows for importing full spell lists for prepared spell casters which will drastically increase the coverage of automated spells.
### Importer Window
#### Active Effects Tab
##### Active Effect Options
* **Generate Effects for Equipment** - Enabled
* **Generate Active Effects for Spells** - Enabled
* **Generate Effects for Character Features/Racial Traits/Feats/Backgrounds** - Enabled
##### Active Effects to include for Characters
Enable Spell Bonuses, and *only* Spell Bonuses, for all 4 options.
