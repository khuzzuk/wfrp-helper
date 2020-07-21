import React, {Component} from "react";

class RangedWeaponElement extends Component {
    render() {
        const {
            pWep,
        } = this.props;
        const weapon = pWep.rangedWeapon;
        const weaponType = weapon.type;
        const prepareTime = weaponType.prepareTime.toString();

        return <div style={{display: 'flex', flexDirection: 'column'}}>
            <div style={{display: 'flex', flexDirection: 'row'}}>
                <div style={{width: 190}}>{weapon.name}</div>
                <div style={{width: 38, textAlign: 'center'}}>{weaponType.minimumRange}</div>
                <div style={{width: 38, textAlign: 'center'}}>{weaponType.mediumRange}</div>
                <div style={{width: 38, textAlign: 'center'}}>{weaponType.maximumRange}</div>
                <div style={{width: 38, textAlign: 'center'}}>{weaponType.damage.value}</div>
                <div style={{width: 38, textAlign: 'center'}}>{prepareTime}</div>
            </div>
            <div style={{width: 170, height: 45, marginLeft: 10, display: 'flex'}}>
                <div style={{width: 140, height: 45}}>{pWep.ammunition && pWep.ammunition.name}</div>
                <div>{pWep.ammunition ? <div style={{width: 40}}>{pWep.ammunitionAmount}</div> : <div/>}</div>
            </div>
        </div>;
    }
}

export default RangedWeaponElement;