// @flow
import React, {Component} from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import SelectableList from "../crud/field/SelectableList";
import MoneyElement from "./MoneyElement";
import Money from "../data/world/money/Money";
import Price from "../data/world/money/Price";

const componentStyle = {
    container: {
        height: 250,
        width: '100%',
    },

    moneyList: {
        paddingLeft: 15,
        width: '100%',
        height: 200,
    },
    elementMoneyList: {
        width: '100%',
        height: '100%',
        overflow: 'auto',
    },
};

class MoneySubsection extends Component {
    onMoneyRemove = money => {
        const personalWelth = this.props.entity.money;
        personalWelth.splice(personalWelth.indexOf(money), 1);
        this.props.onChange(this.props.entity);
    };

    getRelevantCurrencies = () => {
        const currencies = this.props.personService.currencies;
        const personalCurrencies = this.props.entity.money
            .map(value => value.currency);

        return currencies.filter(currency => !personalCurrencies.find(pc => pc.name === currency.name))
    };

    onMoneyAdd = currency => {
        const entity = this.props.entity;
        const money = entity.money;
        const newMoney = new Money();
        newMoney.currency = currency;
        newMoney.amount = new Price();
        money.push(newMoney);
        this.props.onChange(entity);
    };

    render() {
        const {
            customStyle, classes,
            onChange,
            entity, personService,
            ...other
        } = this.props;
        const currentStyle = {...classes, customStyle};

        return (
            <div {...other} className={currentStyle.container}>
                <SelectableList
                    customStyle={{gearField: currentStyle.moneyList, itemsList: currentStyle.elementMoneyList}}
                    data={this.getRelevantCurrencies()}
                    onGearAdd={this.onMoneyAdd}>
                    {
                        entity.money.map(money =>
                            <MoneyElement key={money.currency.name}
                                          money={money}
                                          onMoneyRemove={this.onMoneyRemove}
                                          onChange={() => onChange(entity)}/>)
                    }
                </SelectableList>
            </div>
        );
    };
};

export default withStyles(componentStyle)(MoneySubsection);