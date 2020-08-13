import React, {Component} from "react";
import {withTranslation} from "react-i18next";
import {State} from "../../../state/State";
import {Collections} from "../../../util/Collections";

const containerStyle = {display: 'flex', flexDirection: 'row'};

class ArmorElement extends Component {
  updateEntity = armor => event => {
      event.preventDefault();
      State.updateEntity({armor: Collections.removeElement(State.data.entity.armor, armor)});
  };

  render() {
    const {t, armor, disabled} = this.props;

    let content = [<div style={{width: 150}}>{armor.name}</div>,
                   <div style={{width: 210}}>{t(armor.type.placement)}</div>,
                   <div style={{width: 50}}>{armor.weight}</div>];

      return disabled ?
        <div style={containerStyle}>{content}</div> :
        <div style={containerStyle} onContextMenu={this.updateEntity(armor)}>{content}</div>;
  }
}

export default withTranslation()(ArmorElement);