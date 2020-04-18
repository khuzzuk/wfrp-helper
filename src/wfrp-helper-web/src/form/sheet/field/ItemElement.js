// @flow
import React, {Component} from 'react';
import SimpleTextField, {TextFieldType} from "../../../form/sheet/field/SimpleTextField";
import {State} from "../../../state/State";
import {removeFrom} from "../../../util/Collections";

class ItemElement extends Component {
  updateAmount = amount => {
    this.props.inventory.amount = amount;
    State.updateEntity({inventory: State.data.entity.inventory});
  };

  calculateWeight = inventory => {
    return inventory.amount * inventory.item.weight;
  };

  render() {
    const {inventory} = this.props;
    return (<div style={{width: 290, display: 'flex'}}
                 onContextMenu={event => {
                   event.preventDefault();
                   const allInventory = State.data.entity.inventory;
                   removeFrom(allInventory, inventory);
                   State.updateEntity({inventory: allInventory});
                 }}>
      <div style={{width: 153}}>{inventory.item.name}</div>
      <div style={{width: 70, textAlign: 'center'}}>{this.calculateWeight(inventory)}</div>
      <SimpleTextField style={{width: 50, textAlign: 'center'}}
                       variant={TextFieldType.FLOAT}
                       value={inventory.amount}
                       onChange={this.updateAmount}/>
    </div>);
  };
}

export default ItemElement;