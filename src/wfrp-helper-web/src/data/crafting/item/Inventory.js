import Entity from "../../../crud/Entity";
import Item from "./Item";

export default class Inventory extends Entity {
    item: Item;
    amount: number = 1;


    updateWith(entity: Inventory) {
        super.updateWith(entity);
        this.updateEntityProp(entity, 'item', () => new Item());
    }
}