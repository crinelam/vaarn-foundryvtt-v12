/**
 * Extend the basic Item with some very simple modifications.
 * @extends {Item}
 */
export class VaarnItem extends Item {
  /**
   * Augment the basic Item data model with additional dynamic data.
   */
  prepareData() {
    super.prepareData();
  }

  prepareDerivedData() {
    super.prepareDerivedData();

    // Get the Item's data
    //const itemData = this.data;
    const actorData = this.actor ? this.actor : {};
    const itemData = this.system;

    if(this.type === "weaponRanged")
    {
      if(itemData.ammo.value > itemData.ammo.max)
        itemData.ammo.value = itemData.ammo.max;
      else if(itemData.ammo.value < itemData.ammo.min)
        itemData.ammo.value = itemData.ammo.min;
    }
  }
}
