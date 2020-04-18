// @flow
import React, {Component} from 'react';
import {State} from "../../../state/State";
import {removeFrom} from "../../../util/Collections";
import SimpleTextField, {TextFieldType} from "./SimpleTextField";

export default class MoneyElement extends Component {
  updateAmount = amountType => amount => {
    this.props.money.amount[amountType] = amount;
    State.updateEntity({money: State.data.entity.money});
  };

  render() {
    const {money, ...other} = this.props;

    return <div {...other} style={{display: 'flex'}} onContextMenu={event => {
      event.preventDefault();
      State.updateEntity({money: removeFrom(State.data.entity.money, money)});
    }}>
      <div style={{width: 145}}>{money.currency.name}</div>
      <SimpleTextField customStyle={{width: 40}}
                       value={money.amount.gold}
                       onChange={this.updateAmount('gold')}
                       variant={TextFieldType.INT}/>
      <SimpleTextField customStyle={{width: 45}}
                       value={money.amount.silver}
                       onChange={this.updateAmount('silver')}
                       variant={TextFieldType.INT}/>
      <SimpleTextField customStyle={{width: 50}}
                       value={money.amount.lead}
                       onChange={this.updateAmount('lead')}
                       variant={TextFieldType.INT}/>
    </div>;
  };
}
