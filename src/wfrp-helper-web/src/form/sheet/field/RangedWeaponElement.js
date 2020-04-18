import React, {Component} from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Ammunition from "../../../model/crafting/Ammunition";
import {State} from "../../../state/State";
import {Collections} from "../../../util/Collections";
import SimpleEntitySelect from "./SimpleEntitySelect";
import SimpleTextField, {TextFieldType} from "./SimpleTextField";

const weaponElementStyle = {
    ammunitionAmountField: {
        minWidth: 40,
        maxWidth: 40,
    }
};

class RangedWeaponElement extends Component {
    render() {
        const {
            pWep,
        } = this.props;
        const weapon = pWep.rangedWeapon;
        const weaponType = weapon.type;
        const prepareTime = weaponType.prepareTime.toString();

        return <div style={{display: 'flex', flexDirection: 'column'}}
                    onContextMenu={event => {
            event.preventDefault();
            State.updateEntity({['rangedWeapons']: Collections.removeElement(State.data.entity.rangedWeapons, pWep)});
        }}>
            <div style={{display: 'flex', flexDirection: 'row'}}>
                <div style={{width: 190}}>{weapon.name}</div>
                <div style={{width: 38, textAlign: 'center'}}>{weaponType.minimumRange}</div>
                <div style={{width: 38, textAlign: 'center'}}>{weaponType.mediumRange}</div>
                <div style={{width: 38, textAlign: 'center'}}>{weaponType.maximumRange}</div>
                <div style={{width: 38, textAlign: 'center'}}>{weaponType.damage.value}</div>
                <div style={{width: 38, textAlign: 'center'}}>{prepareTime}</div>
            </div>
            <div style={{width: 170, height: 45, marginLeft: 10, display: 'flex'}}>
                <SimpleEntitySelect name={Ammunition.entityName}
                                    customStyle={{width: 140, height: 45}}
                                    value={pWep.ammunition}
                                    onChange={selected => {
                                        pWep.ammunition = selected;
                                        this.setState({newAmmunition: selected});
                                    }}/>
                <div onContextMenu={event => {
                    event.preventDefault();
                    pWep.ammunition = null;
                    pWep.ammunitionAmount = 0;
                    this.setState({newAmmunition: null});
                }}>
                    {
                        pWep.ammunition ?
                            <SimpleTextField customStyle={{width: 40}}
                                             value={pWep.ammunitionAmount}
                                             variant={TextFieldType.INT}
                                             onChange={value => {
                                                 pWep.ammunitionAmount = value;
                                                 this.setState({currentAmount: value});
                                             }}/> :
                            <div/>
                    }
                </div>
            </div>
        </div>;
    }
}

export default withStyles(weaponElementStyle)(RangedWeaponElement)