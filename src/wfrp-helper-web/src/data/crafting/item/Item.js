import Entity from "../../../crud/Entity";
import Price from "../../world/money/Price";

class Item extends Entity {
    name: string;
    description: string;
    weight: number;
    price: Price = new Price();
    availability: string = 'COMMON';


    updateWith(entity: *) {
        super.updateWith(entity);
        this.updateEntityProp(entity, 'price', () => new Price());
    }
}

export default Item;