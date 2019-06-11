import React, {Component} from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import ArmorElement from "./ArmorElement";
import GearComponent from "./GearComponent";
import WeaponElement from "./WeaponElement";
import RangedWeaponElement from "./RangedWeaponElement";

const gearSectionStyle = {
    meleeWeaponsField: {
        paddingLeft: 50,
        width: 400,
        minHeight: 210,
        maxHeight: 210,
    },
    rangedWeaponsField: {
        minHeight: 210,
        maxHeight: 210,
        paddingLeft: 40,
        paddingTop: 15,
        width: 410,
    },
    armorField: {
        minHeight: 210,
        maxHeight: 210,
        paddingLeft: 30,
        paddingTop: 20,
        width: 420,
    },
};

class GearSection extends Component {
    addItem = propertyName => item => {
        this.props.entity[propertyName].push(item);
        this.props.onChange(this.props.entity);
    };
    removeItem = propertyName => item => {
        let items = this.props.entity[propertyName];
        items.splice(items.indexOf(item), 1);
        this.props.onChange(this.props.entity);
    };

    render() {
        const {classes, className, entity, personService} = this.props;
        return <div className={className}>
            <GearComponent customStyle={{gearField: classes.meleeWeaponsField}}
                           data={personService.meleeWeapons} onGearAdd={this.addItem('meleeWeapons')}>
                {entity.meleeWeapons.map(weapon => <WeaponElement key={weapon.name + '_meleeWeaponField'}
                                                                  weapon={weapon}
                                                                  onContextMenu={this.removeItem('meleeWeapons')}/>)}
            </GearComponent>
            <GearComponent customStyle={{gearField: classes.rangedWeaponsField}}
                           data={personService.rangedWeapons} onGearAdd={this.addItem('rangedWeapons')}>
                {entity.rangedWeapons.map(weapon => <RangedWeaponElement key={weapon.name + '_rangedWeaponField'}
                                                                         weapon={weapon}
                                                                         onContextMenu={this.removeItem('rangedWeapons')}/>)}
            </GearComponent>
            <GearComponent customStyle={{gearField: classes.armorField}}
                           data={personService.armors}
                           onGearAdd={this.addItem('armor')}>
                {entity.armor.map(armor => <ArmorElement key={armor.name + '_armorField'} armor={armor}
                                                         onContextMenu={this.removeItem('armor')}/>)}
            </GearComponent>
        </div>
    }
}

export default withStyles(gearSectionStyle)(GearSection);