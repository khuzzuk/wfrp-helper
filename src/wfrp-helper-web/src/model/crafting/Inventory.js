import Item from "./Item";
import Entity from "../Entity";

export default class Inventory extends Entity {
    item: Item;
    amount: number = 1;

    updateWith(entity: Inventory): Inventory {
        super.updateWith(entity);
        this.updateEntityProp(entity, 'item', () => new Item());
        return this;
    }
}