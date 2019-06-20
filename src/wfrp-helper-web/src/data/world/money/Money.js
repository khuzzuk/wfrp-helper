import Entity from "../../../crud/Entity";
import Currency from "./Currency";
import Price from "./Price";

export default class Money extends Entity {
    currency: Currency;
    amount: Price = new Price();


    updateWith(entity: Money) {
        super.updateWith(entity);
        if (entity.currency) {
            this.currency = new Currency();
            this.currency.updateWith(entity.currency);
        }
        if (entity.amount) {
            this.amount = new Price();
            this.amount.updateWith(entity.amount);
        }
    }
}