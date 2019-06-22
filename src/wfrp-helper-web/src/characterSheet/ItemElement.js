// @flow
import React, {Component} from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import FloatField from "../crud/field/FloatField";

const componentStyle = {
    container: {
        display: 'flex',
        width: 290,
    },
    input: {
        fontFamily: 'wfrp',
        fontSize: '24px',
        textAlign: 'center'
    },

    nameColumn: {
        width: 153,
    },
    weightColumn: {
        width: 70,
        textAlign: 'center',
    },
    amountColumn: {
        width: 50,
        textAlign: 'center',
    },
};

class ItemElement extends Component {
    updateInventory = amount => {
        this.props.inventory.amount = amount;
        this.props.onChange(this.props.inventory);
    };

    calculateWeight = inventory => {
        return inventory.amount * inventory.item.weight;
    };

    render() {
        const {
            customStyle, classes,
            inventory, onItemRemove,
            ...other
        } = this.props;
        const currentStyle = {...classes, customStyle};

        return (
            <div {...other} className={currentStyle.container} onContextMenu={event => {
                event.preventDefault();
                onItemRemove(inventory);
            }}>
                <div className={currentStyle.nameColumn}>{inventory.item.name}</div>
                <div className={currentStyle.weightColumn}>{this.calculateWeight(inventory)}</div>
                <FloatField className={currentStyle.amountColumn}
                              value={inventory.amount}
                              onChange={this.updateInventory}
                              inputProps={{className: currentStyle.input}}/>
            </div>
        );
    };
};

export default withStyles(componentStyle)(ItemElement);