import Entity from "../../../crud/Entity";
import Currency from "./Currency";
import Price from "./Price";

export default class Money extends Entity {
    currency: Currency;
    amount: Price = new Price();


    updateWith(entity: Money) {
        super.updateWith(entity);
        this.updateEntityProp(entity, 'currency', () => new Currency());
        this.updateEntityProp(entity, 'amount', () => new Price());
    }
}