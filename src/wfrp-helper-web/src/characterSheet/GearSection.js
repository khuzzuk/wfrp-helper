import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import ArmorElement from "./ArmorElement";
import WeaponElement from "./WeaponElement";
import RangedWeaponElement from "./RangedWeaponElement";
import SelectableList from "../crud/field/SelectableList";
import EntityComponent from "../crud/EntityComponent";

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
        paddingLeft: 50,
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

class GearSection extends EntityComponent {
    render() {
        const {classes, className, entity, personService} = this.props;
        return <div className={className}>
            <SelectableList customStyle={{container: classes.meleeWeaponsField}}
                           data={personService.meleeWeapons} onGearAdd={this.pushToEntity('meleeWeapons')}>
                {entity.meleeWeapons.map(weapon => <WeaponElement key={weapon.name + '_meleeWeaponField'}
                                                                  weapon={weapon}
                                                                  onContextMenu={this.removeFromArray('meleeWeapons')}/>)}
            </SelectableList>
            <SelectableList customStyle={{container: classes.rangedWeaponsField}}
                           data={personService.rangedWeapons} onGearAdd={this.pushToEntity('rangedWeapons')}>
                {entity.rangedWeapons.map(weapon => <RangedWeaponElement key={weapon.name + '_rangedWeaponField'}
                                                                         weapon={weapon}
                                                                         onContextMenu={this.removeFromArray('rangedWeapons')}/>)}
            </SelectableList>
            <SelectableList customStyle={{container: classes.armorField}}
                           data={personService.armors}
                           onGearAdd={this.pushToEntity('armor')}>
                {entity.armor.map(armor => <ArmorElement key={armor.name + '_armorField'} armor={armor}
                                                         onContextMenu={this.removeFromArray('armor')}/>)}
            </SelectableList>
        </div>
    }
}

export default withStyles(gearSectionStyle)(GearSection);