import Entity from "../Entity";
import Price from "./Price";
import {State} from "../../state/State";
import Currency from "./Currency";

export const entityName = 'money';

export default class Money extends Entity {
    currency: Currency;
    amount: Price = new Price();


    updateWith(entity: Money): Money {
        super.updateWith(entity);
        this.updateEntityProp(entity, 'currency', State.suppliers.currency);
        this.updateEntityProp(entity, 'amount', State.suppliers.price);
        return this;
    }
}

State.suppliers[entityName] = () => new Money();
