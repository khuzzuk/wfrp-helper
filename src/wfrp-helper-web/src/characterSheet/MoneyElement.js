// @flow
import React, {Component} from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import FloatField from "../crud/field/FloatField";

const componentStyle = {
    container: {
        width: '100%',
        display: 'flex',
    },
    input: {
        fontFamily: 'wfrp',
        fontSize: '24px',
        textAlign: 'center'
    },

    name: {
        width: 155,
    },
    gold: {
        width: 40,
    },
    silver: {
        width: 40,
    },
    lead: {
        width: 50,
    },
};

class MoneyElement extends Component {
    updateAmount = amountType => amount => {
        this.props.money.amount[amountType] = amount;
        this.props.onChange(this.props.money);
    };

    render() {
        const {
            customStyle, classes,
            money, onMoneyRemove,
            ...other
        } = this.props;
        const currentStyle = {...classes, customStyle};

        return (
            <div {...other} className={currentStyle.container} onContextMenu={event => {
                event.preventDefault();
                onMoneyRemove(money);
            }}>
                <div className={currentStyle.name}>{money.currency.name}</div>
                <FloatField className={currentStyle.gold}
                            value={money.amount.gold}
                            onChange={this.updateAmount('gold')}
                            inputProps={{className: currentStyle.input}}/>
                <FloatField className={currentStyle.silver}
                            value={money.amount.silver}
                            onChange={this.updateAmount('silver')}
                            inputProps={{className: currentStyle.input}}/>
                <FloatField className={currentStyle.lead}
                            value={money.amount.lead}
                            onChange={this.updateAmount('lead')}
                            inputProps={{className: currentStyle.input}}/>
            </div>
        );
    };
};

export default withStyles(componentStyle)(MoneyElement);