// @flow
import React, {Component} from 'react';
import {State} from "../../../state/State";
import {removeFrom} from "../../../util/Collections";

export default class AnimalElement extends Component {
  render() {
    const {animal, ...other} = this.props;

    return (<div {...other} onContextMenu={event => {
      event.preventDefault();
      State.updateEntity({animals: removeFrom(State.data.entity.animals, animal)})
    }}>
      <div>{animal.name}</div>
    </div>);
  };
};
