import Entity from "../../../crud/Entity";
import Price from "../../world/money/Price";

class Item extends Entity {
    name: string;
    description: string;
    weight: number;
    price: Price = new Price();
    accessibility: string = 'COMMON';
}

export default Item;