// <copyright file="group-initiative.mjs" company="alterNERDtive">
// Copyright 2025 alterNERDtive.
//
// This file is part of the Custom Group Initiative Foundry module.
//
// The Custom Group Initiative Foundry module is free software: you can distribute
// it and/or modify it under the terms of the GNU General Public License as
// published by the Free Software Foundation, either version 3 of the License,
// or (at your option) any later version.
//
// The Custom Group Initiative Foundry module is distributed in the hope that it will
// be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License along with
// the Custom Group Initiative Foundry module. If not, see
// &lt;https://www.gnu.org/licenses/&gt;.
// </copyright>

import { MODULE } from "./const.mjs";

export class GroupInitiative {
    static init() {
        if (game.settings.get(MODULE, "groupMode") === "none") {
            if (game.system.id === "dnd5e") {
                libWrapper.register("custom-group-initiative", "dnd5e.documents.Combatant5e.prototype.getGroupingKey", () => null, libWrapper.OVERRIDE);
            }
            else if (game.user.isDM) {
                let msg = game.i18n.localize("CUSTOMGROUPINITIATIVE.WarningModeNone");
                ui.notifications.warn(msg);
                console.warn(msg);
            }
        }
        else if (game.settings.get(MODULE, "groupMode") === "actor") {
            const semaphore = new foundry.utils.Semaphore(1);
            Hooks.on("createCombatant", (document, options, userId) => {
                if (game.user.isActiveGM) {
                    semaphore.add(GroupInitiative.groupCombatant, document);
                }
            });
        }
    }

    static groupCombatant(combatant) {
        return new Promise(async resolve => {
            if (combatant.group || combatant.token?.actorLink || !combatant.token?.baseActor) {
                resolve(false);
            }
            else {
                const key = `${combatant.token.disposition}:${combatant.token.baseActor.id}`;
                const combat = combatant.combat;
                // check if a group already exists
                const group = combat.groups.find(g => g.getFlag("custom-group-initiative", "key") === key);
                if (group) {
                    resolve(combatant.update({group: group.id}));
                } else {
                    // see if there's another combatant to group with
                    const otherCombatant = combat.combatants.find(c => `${c.token.disposition}:${c.token.baseActor.id}` === key && c.id !== combatant.id);
                    if (otherCombatant) {
                        // create a new group then add the two combatants to it
                        const [group] = await combat.createEmbeddedDocuments("CombatantGroup", [{"flags.custom-group-initiative.key": key}]);
                        resolve(
                            combat.updateEmbeddedDocuments("Combatant", [
                                {_id: combatant.id, group: group.id},
                                {_id: otherCombatant.id, group: group.id}
                            ])
                        );
                    } else {
                        resolve(false);
                    }
                }
            }
        });
    }
}