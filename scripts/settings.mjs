// <copyright file="setings.mjs" company="alterNERDtive">
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

export class ModuleSettings {
  static init() {
    game.settings.register(MODULE, "groupMode", {
      name: "CUSTOMGROUPINITIATIVE.GroupModeSettingName",
      hint: "CUSTOMGROUPINITIATIVE.GroupModeSettingHint",
      scope: "world",
      config: true,
      type: String,
      choices: {
        default: "CUSTOMGROUPINITIATIVE.GroupModeSettingDefault",
        none: "CUSTOMGROUPINITIATIVE.GroupModeSettingNone",
        actor: "CUSTOMGROUPINITIATIVE.GroupModeSettingActor"
      },
      default: "default",
      requiresReload: true,
      onChange: false
    });

    game.settings.register(MODULE, "roundInitiative", {
      name: "CUSTOMGROUPINITIATIVE.RoundInitiativeSettingName",
      hint: "CUSTOMGROUPINITIATIVE.RoundInitiativeSettingHint",
      scope: "world",
      config: true,
      type: Boolean,
      default: true,
      requiresReload: false,
      onChange: false
    });
  }
}
