// Import Modules
import { VaarnActor } from "./actor/actor.js";
import { VaarnActorSheet } from "./actor/actor-sheet.js";
import { VaarnFoeSheet } from "./actor/foe-sheet.js";
import { VaarnItem } from "./item/item.js";
import { VaarnItemSheet } from "./item/item-sheet.js";
import { Vaarn } from "./config.js";
import { registerSystemSettings } from "./settings.js";

Hooks.once("init", async function () {
  game.Vaarn = {
    VaarnActor,
    VaarnItem
  };

  CONFIG.Vaarn = Vaarn;

  /**
   * Set an initiative formula for the system
   * @type {String}
   */
  CONFIG.Combat.initiative = {
    formula: "1d20",
    decimals: 2
  };
  // Define custom Entity classes
  CONFIG.Actor.documentClass = VaarnActor;
  CONFIG.Item.documentClass = VaarnItem;

  registerSystemSettings();

  // Register sheet application classes
  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet("vaarn", VaarnActorSheet, { makeDefault: true });
  Actors.registerSheet("vaarn", VaarnFoeSheet, { makeDefault: false });
  Items.unregisterSheet("core", ItemSheet);
  Items.registerSheet("vaarn", VaarnItemSheet, { makeDefault: true });
});

// Handlebar helpers
Handlebars.registerHelper("concat", function () {
  var outStr = "";
  for (var arg in arguments) {
    if (typeof arguments[arg] != "object") {
      outStr += arguments[arg];
    }
  }
  return outStr;
});

Handlebars.registerHelper("toLowerCase", function (str) {
  return str.toLowerCase();
});

Handlebars.registerHelper("isWeapon", function (item) {
  return item.type === "weaponMelee" || item.type === "weaponRanged";
});

Handlebars.registerHelper("inventorySlots", function (inventorySlots) {
  if (inventorySlots && inventorySlots.used >= inventorySlots.value)
    return new Handlebars.SafeString(
      '<span class="vaarn-encumbered">' +
        inventorySlots.used +
        "/" +
        inventorySlots.value +
        "</span>"
    );
  else if (inventorySlots)
    return new Handlebars.SafeString(
      inventorySlots.used + "/" + inventorySlots.value
    );
});

Handlebars.registerHelper("isItemBroken", function (item) {
  if (item.type === "spell")
    return item.system.used === "true" || !item.system.spellUsable;
  else {
    if (item.system.quality) return item.system.quality.value <= 0;
    else return false;
  }
});

Handlebars.registerHelper("hasQuality", function (item) {
  return item.system.quality !== undefined;
});
Handlebars.registerHelper("hasQuantity", function (item) {
  return item.system.quantity > 1;
});