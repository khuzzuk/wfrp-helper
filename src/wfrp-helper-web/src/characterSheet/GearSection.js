import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import ArmorElement from "./ArmorElement";
import WeaponElement from "./WeaponElement";
import RangedWeaponElement from "./RangedWeaponElement";
import SelectableList from "../crud/field/SelectableList";
import EntityComponent from "../crud/EntityComponent";
import PersonalRangedWeapon from "../data/crafting/item/ranged/PersonalRangedWeapon";

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
    rangedWeaponList: {
        minHeight: 160,
        maxHeight: 160,
        width: '100%',
        overflow: 'auto',
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
    onRangedWeapon = rangedWeapon => {
        const personRangedWeapon = new PersonalRangedWeapon();
        personRangedWeapon.rangedWeapon = rangedWeapon;
        this.props.entity.rangedWeapons.push(personRangedWeapon);
        this.setState({rangedWeapon: personRangedWeapon});
    };

    onAmmunition = personRangedWeapon => ammunition => {
        personRangedWeapon.ammunition = ammunition;
        this.setState({ammunition: ammunition});
    };

    onAmmunitionAmount = personRangedWeapon => amount => {
        personRangedWeapon.ammunitionAmount = amount;
        this.setState({ammunitionAmount: amount});
    };

    onAmmunitionRemove = personRangedWeapon => () => {
        personRangedWeapon.ammunition = null;
        personRangedWeapon.ammunitionAmount = 0;
        this.setState({ammunition: null, ammunitionAmount: 0});
    };

    render() {
        const {classes, className, entity, personService} = this.props;
        return <div className={className}>
            <SelectableList customStyle={{container: classes.meleeWeaponsField}}
                           data={personService.meleeWeapons} onGearAdd={this.pushToEntity('meleeWeapons')}>
                {entity.meleeWeapons.map(weapon => <WeaponElement key={weapon.name + '_meleeWeaponField'}
                                                                  weapon={weapon}
                                                                  onContextMenu={this.removeFromArray('meleeWeapons')}/>)}
            </SelectableList>
            <SelectableList customStyle={{container: classes.rangedWeaponsField, itemsList: classes.rangedWeaponList}}
                           data={personService.rangedWeapons} onGearAdd={this.onRangedWeapon}>
                {entity.rangedWeapons.map((weapon, index) => <RangedWeaponElement key={weapon.rangedWeapon.name + index + '_rangedWeaponField'}
                                                                         personRangedWeapon={weapon}
                                                                         onContextMenu={this.removeFromArray('rangedWeapons')}
                                                                         onAmmunition={this.onAmmunition(weapon)}
                                                                         onAmmunitionAmount={this.onAmmunitionAmount(weapon)}
                                                                         onAmmunitionRemove={this.onAmmunitionRemove(weapon)}
                                                                         personService={personService}/>)}
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