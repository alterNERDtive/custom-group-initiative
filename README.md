# Custom Group Initiative

![Foundry v13](https://img.shields.io/badge/Foundry-v13-informational?logo=foundryvirtualtabletop)
[![Discord](https://img.shields.io/discord/385315806323408937?logo=discord&label=Discord)](https://discord.alternerd.tv)

A module for Foundry VTT that allows grouping combatants by custom rules, or disabling grouping entirely.

Foundry (since v13) groups combatants automatically if they share the same base actor, disposition and initiative value. This module allows more control over the grouping.

This has been written with D&D 5e in mind; it _should_™ work on other systems, but there are no special considerations made for them. For example, D&D 5e rounds down by default, so the rounding mode is changed from `Math.round()` to `Math.floor()` for D&D 5especifically. If you are playing a different system, please file an issue for anything that is not working as intended or submit a pull request directly.

## Settings

- **Initiative Group Mode**: 
    - `Default`: Use the system’s default grouping.
    - `None`: Do not group combatants. This is a visal change only, and currently only works with the D&D 5e system.
    - `Actor`: Group combatants by base actor and average their initiative on combat start. Actors still need to share the same disposition to be grouped.
- **Round Initiative**: When Initiative Group Mode is set to `Actor`, round the group initiative.

## Technical Details

In `None` Group Mode, the module hooks into the D&D 5e system’s method for figuring out a combatant’s grouping key. Actors with the same grouping key are combined into groups. In this mode, it is overridden to always return `null`.

In `Actor` Group Mode, the module hooks into Foundry’s `combatStart` event. It averages the initiative value of all combatants with the same base actor, then sets their initiative value to this average. Since the combatants now share the same initiative value, they become grouped.

## License

GPLv3.