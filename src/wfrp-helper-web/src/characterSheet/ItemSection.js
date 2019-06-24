// @flow
import React, {Component} from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import SelectableList from "../crud/field/SelectableList";
import ItemElement from "./ItemElement";
import Inventory from "../data/crafting/item/Inventory";

const componentStyle = {
    container: {
        width: '100%',
        minHeight: 460,
        maxHeight: 460,
    },
    itemList: {
        paddingLeft: 20,
        minWidth: 300,
        maxWidth: 300,
        minHeight: 420,
        maxHeight: 420,
    },
    elementItemList: {
        width: '100%',
        minHeight: '100%',
        maxHeight: '100%',
    },
    totalWeightRow: {
        width: '100%',
        textAlign: 'right',
    },
};

class ItemSection extends Component {
    onItemAdd = item => {
        const entity = this.props.entity;
        const inventory = new Inventory();
        inventory.item = item;
        entity.inventory.push(inventory);
        this.props.onChange(entity);
    };

    onItemRemove = inventory => {
        const entity = this.props.entity;
        const items = entity.inventory;
        items.splice(items.indexOf(inventory), 1);
        this.props.onChange(entity);
    };

    getRelevantItems = () => {
        const allItems = this.props.personService.items;
        const toRemove = this.props.entity.inventory.map(value => value.item);
        return allItems.filter(item => !toRemove.find(removeable => removeable.name === item.name));
    };

    calculateTotalWeight = () => {
        return this.props.entity.inventory
            .map(value => value.item.weight * value.amount)
            .reduce((a, b) => a + b, 0);
    };

    render() {
        const {
            customStyle, classes,
            entity, personService, onChange,
            ...other
        } = this.props;
        const currentStyle = {...classes, customStyle};
        const inventory = entity.inventory;

        return (
            <div {...other} className={currentStyle.container}>
                <SelectableList customStyle={{container: currentStyle.itemList, itemsList: currentStyle.elementItemList}}
                                data={this.getRelevantItems()} onGearAdd={this.onItemAdd}>
                    {
                        inventory.map(inventory => <ItemElement key={inventory.item.name}
                                                                inventory={inventory}
                                                                onItemRemove={this.onItemRemove}
                                                                onChange={data => onChange(entity)}/>)
                    }
                </SelectableList>
                <div className={currentStyle.totalWeightRow}>{this.calculateTotalWeight()}</div>
            </div>
        );
    };
};

export default withStyles(componentStyle)(ItemSection);