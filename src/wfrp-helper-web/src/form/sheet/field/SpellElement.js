// @flow
import React, {Component} from 'react';
import {State} from "../../../state/State";
import {removeFrom} from "../../../util/Collections";

class SpellElement extends Component {
  render() {
    const {spell}         = this.props;
    const ingredientsText = spell.ingredients.map(item => item.name).join(', ');

    return (<div style={{display: 'flex'}} onContextMenu={event => {
          event.preventDefault();
          State.updateEntity({spells: removeFrom(State.data.entity.spells, spell)});
        }}>
          <div style={{width: 155}}>{spell.name}</div>
          <div style={{textAlign: 'center', width: 47}}>{spell.level}</div>
          <div style={{textAlign: 'center', width: 47}}>{spell.manaCost}</div>
          <div style={{textAlign: 'center', width: 47}}>{spell.range}</div>
          <div style={{textAlign: 'center', width: 47}}>{spell.durationTime.toString()}</div>
          <div style={{width: 140}}>{ingredientsText}</div>
          <div style={{width: 130}}>{spell.effect}</div>
        </div>);
  };
};

export default SpellElement;