import Inventory from "../model/crafting/Inventory";
import Item from "../model/crafting/Item";
import PersonalRangedWeapon from "../model/creature/PersonalRangedWeapon";
import {State} from "../state/State";
import {findIn, removeFrom} from "../util/Collections";

export default class ItemService {
  static addItemToInventory(item: Item) {
    let inventory = State.data.entity.inventory;
    if (!findIn(inventory, item, ['name'], ['item', 'name'])) {
      const incomingInventory  = new Inventory();
      incomingInventory.item   = item;
      incomingInventory.amount = 0;
      inventory.push(incomingInventory);
      State.updateEntity({inventory: inventory});
    }
  }

  static inventoryWeight(): number {
    const miscItemsWeight = State.data.entity.inventory
                      .map(value => value.item.weight * value.amount)
                      .reduce((a, b) => a + b, 0);
    const weaponsWeight = State.data.entity.meleeWeapons
                               .map(value => value.weight)
                               .reduce((a, b) => a + b, 0);
    const rangedWeight = State.data.entity.rangedWeapons
                               .map(p => ItemService.calculateRangedWeaponWeight(p))
                               .reduce((a, b) => a + b, 0);
    const armorWeight = State.data.entity.armor
                               .map(value => value.weight)
                               .reduce((a, b) => a + b, 0);

    return (miscItemsWeight + weaponsWeight + rangedWeight + armorWeight).toFixed(2);
  }

  static calculateRangedWeaponWeight(p: PersonalRangedWeapon) {
    let weight = 0;
    if (p.rangedWeapon) {
      weight += p.rangedWeapon.weight;
    }
    if (p.ammunition) {
      weight += p.ammunition.weight * p.ammunitionAmount;
    }
    return weight;
  }
}