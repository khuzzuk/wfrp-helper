import React, {Component} from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import MeleeWeaponField from "./MeleeWeaponField";
import RangedWeaponField from "./RangedWeaponField";
import ArmorElement from "./ArmorElement";
import GearComponent from "./GearComponent";

const gearSectionStyle = {
    meleeWeaponsField: {
        paddingLeft: 50,
        width: '100%',
        minHeight: 210,
        maxHeight: 210,
    },
    rangedWeaponsField: {
        minHeight: 210,
        maxHeight: 210,
        paddingLeft: 40,
        paddingTop: 15,
        width: '100%',
    },
    armorField: {
        minHeight: 210,
        maxHeight: 210,
        paddingLeft: 30,
        paddingTop: 20,
        width: '100%',
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
            <MeleeWeaponField className={classes.meleeWeaponsField}
                              data={personService.meleeWeapons}
                              value={entity.meleeWeapons}
                              onWeaponAdd={this.addItem('meleeWeapons')}
                              onWeaponRemove={this.removeItem('meleeWeapons')}/>
            <RangedWeaponField className={classes.rangedWeaponsField}
                               data={personService.rangedWeapons}
                               value={entity.rangedWeapons}
                               onWeaponAdd={this.addItem('rangedWeapons')}
                               onWeaponRemove={this.removeItem('rangedWeapons')}/>
            <GearComponent customStyle={{gearField: classes.armorField}}
                           data={personService.armors}
                           onGearAdd={this.addItem('armor')}>
                {entity.armor.map(armor => <ArmorElement key={armor.name + '_gearField'} armor={armor}
                                                         onContextMenu={this.removeItem('armor')}/>)}
            </GearComponent>
        </div>
    }
}

export default withStyles(gearSectionStyle)(GearSection);