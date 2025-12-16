# Custom Group Initiative

![Foundry v13](https://img.shields.io/badge/Foundry-v13-informational?logo=foundryvirtualtabletop)
[![Discord](https://img.shields.io/discord/385315806323408937?logo=discord&label=Discord)](https://discord.alternerd.tv)

A module for Foundry VTT that allows grouping combatants by custom rules, or disabling grouping entirely.

Foundry (since v13) groups combatants automatically if they share the same base actor, disposition and initiative value. This module allows more control over the grouping.

This has been written with D&D 5e in mind; it _should_™ work on other systems, but there are no special considerations made for them. If you are playing a different system, please file an issue for anything that is not working as intended or submit a pull request directly.

## Settings

- **Initiative Group Mode**: 
    - `Default`: Use the system’s default grouping.
    - `None`: Do not group combatants. This is a visal change only, and currently only works with the D&D 5e system.
    - `Actor`: Group combatants by base actor and roll initiative only once. Actors still need to share the same disposition to be grouped.

## Technical Details

In `None` Group Mode, the module hooks into the D&D 5e system’s method for figuring out a combatant’s grouping key. Actors with the same grouping key are combined into groups. In this mode, it is overridden to always return `null`.

In `Actor` Group Mode, the module creates combatant groups from actors that share the same disposition and base actor. Yoinked from [Kaelad](https://github.com/kaelad02/kaelad-custom-5e/blob/f32885087a2f88c9bdbbd82a08d3f2560c2270f9/src/modules/group-initiative.js) who knows more JS than me (which is not hard).

## License

GPLv3.