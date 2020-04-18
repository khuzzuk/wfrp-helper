import Inventory from "../model/crafting/Inventory";
import Item from "../model/crafting/Item";
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
    return State.data.entity.inventory
                .map(value => value.item.weight * value.amount)
                .reduce((a, b) => a + b, 0);
  }
}