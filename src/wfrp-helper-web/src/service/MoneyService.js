import Currency from "../model/world/Currency";
import Money from "../model/world/Money";
import {State} from "../state/State";

export default class MoneyService {
  static addMoney(currency: Currency) {
    const newMoney = new Money();
    newMoney.currency = currency;

    State.data.entity.money.push(newMoney);
    State.updateEntity({money: State.data.entity.money})
  }
}