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
            Hooks.on("combatStart", GroupInitiative._combatStart);
        }
    }
        
    static _combatStart(combat) {
        if (!game.user.isGM) { return; }

        let updates = new Array();
        for (let [id, combatants] of Object.entries(Object.groupBy(combat.combatants, ( element, index ) => element.actorId))) {
            if (combatants.length > 1) {
                let initiative = 0;
                combatants.forEach((combatant) => {
                    initiative += Math.floor(combatant.initiative);
                });
                initiative /= combatants.length;
                if (game.settings.get(MODULE, "roundInitiative")) {
                    if (game.system.id === "dnd5e") {
                        initiative = Math.floor(initiative);
                    } else {
                        initiative = Math.round(initiative)
                    }
                }
                if (game.system.id === "dnd5e" && game.settings.get("dnd5e", "initiativeDexTiebreaker")) {
                    initiative += game.actors.get(id).system.abilities.dex.value / 100;
                }
                updates[id] = initiative;
            }
        }
        if (updates) {
            combat.combatants.forEach((combatant) => {
                if (combatant.actorId in updates) {
                    combatant.update({ initiative: updates[combatant.actorId] });
                }
            });
        }
    }
}