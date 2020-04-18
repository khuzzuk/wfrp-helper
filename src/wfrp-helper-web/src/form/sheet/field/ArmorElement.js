import React, {Component} from "react";
import {withTranslation} from "react-i18next";
import GearService from "../../../client/GearService";
import {State} from "../../../state/State";
import {Collections} from "../../../util/Collections";

const gearService = new GearService();

class ArmorElement extends Component {
    state = {
        armorValue: ''
    };

    updateArmor = () => {
        gearService.calculateArmorValue(this.props.armor.id, text => this.setState({
            armorValue: text,
            armor: this.props.armor
        }));
    };

    render() {
        const {t, armor} = this.props;
        if (this.state.armor !== armor) {
            this.updateArmor();
        }

        return <div style={{display: 'flex', flexDirection: 'row'}} onContextMenu={event => {
            event.preventDefault();
            State.updateEntity({armor: Collections.removeElement(State.data.entity.armor, armor)});
        }}>
            <div style={{width: 150}}>{armor.name}</div>
            <div style={{width: 210}}>{t(armor.type.placement)}</div>
            <div style={{width: 50}}>{this.state.armorValue}</div>
        </div>;
    }
}

export default withTranslation()(ArmorElement);