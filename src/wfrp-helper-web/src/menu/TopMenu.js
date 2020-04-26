import {AppBar, CircularProgress, Toolbar} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import withStyles from "@material-ui/core/styles/withStyles";
import React, {Component} from "react";
import {withTranslation} from "react-i18next";
import Select from "react-select";
import Flag from 'react-world-flags';
import RealmDataService from "../client/RealmDataService";
import Ammunition from "../model/crafting/Ammunition";
import Armor from "../model/crafting/Armor";
import ArmorBlueprint from "../model/crafting/ArmorBlueprint";
import ArmorPattern from "../model/crafting/ArmorPattern";
import Item from "../model/crafting/Item";
import Jewelry from "../model/crafting/Jewelry";
import MeleeWeapon from "../model/crafting/MeleeWeapon";
import MeleeWeaponBlueprint from "../model/crafting/MeleeWeaponBlueprint";
import RangedWeapon from "../model/crafting/RangedWeapon";
import RangedWeaponBlueprint from "../model/crafting/RangedWeaponBlueprint";
import Resource from "../model/crafting/Resource";
import Animal from "../model/creature/Animal";
import AnimalKind from "../model/creature/AnimalKind";
import Character from "../model/creature/Character";
import EyeColor from "../model/creature/EyeColor";
import HairColor from "../model/creature/HairColor";
import Person from "../model/creature/Person";
import PhysicalFeature from "../model/creature/PhysicalFeature";
import Skill from "../model/knowledge/Skill";
import Spell from "../model/knowledge/Spell";
import SpellSchool from "../model/knowledge/SpellSchool";
import Profession from "../model/professions/Profession";
import ProfessionClass from "../model/professions/ProfessionClass";
import Realm from "../model/realm/Realm";
import Scenario from "../model/realm/Scenario";
import Currency from "../model/world/Currency";
import Language from "../model/world/Language";
import Nation from "../model/world/Nation";
import Place from "../model/world/Place";
import Race from "../model/world/Race";
import Religion from "../model/world/Religion";
import {State} from "../state/State";
import MenuComponent from "./MenuComponent";
import ToolsMenu from "./ToolsMenu";

const styles = theme => ({
  languageIcon: {
    marginLeft: 'auto', display: 'flex',
  }, realmSelect: {
    width: 200,
  }
});
const realmDataService = new RealmDataService();

class TopMenu extends Component {

  showTable = entityName => () => {
    State.update({showTable: entityName})
  };

  render() {
    const {i18n, classes} = this.props;

    return <AppBar position={"relative"}>
      <Toolbar>
        <ToolsMenu/>
        <MenuComponent name={'world'}
                       entities={[Nation.entityName,
                                  Currency.entityName,
                                  Language.entityName,
                                  Race.entityName,
                                  Religion.entityName,
                                  Place.entityName,
                                  Realm.entityName,
                                  Scenario.entityName]}/>
        <MenuComponent name={'knowledge'}
                       entities={[Skill.entityName,
                                  ProfessionClass.entityName,
                                  Profession.entityName,
                                  SpellSchool.entityName,
                                  Spell.entityName,]}/>
        <MenuComponent name={'crafting'}
                       entities={[Item.entityName,
                                  Armor.entityName,
                                  MeleeWeapon.entityName,
                                  RangedWeapon.entityName,
                                  Ammunition.entityName,
                                  Jewelry.entityName,]}/>
        <MenuComponent name={'types'}
                       entities={[ArmorBlueprint.entityName,
                                  MeleeWeaponBlueprint.entityName,
                                  RangedWeaponBlueprint.entityName,
                                  ArmorPattern.entityName,
                                  Resource.entityName,]}/>
        <MenuComponent name={'creature'}
                       entities={[...(State.data.currentRealm ? [Person.entityName] : []),
                                  ...[Character.entityName,
                                      EyeColor.entityName,
                                      HairColor.entityName,
                                      PhysicalFeature.entityName,
                                      Animal.entityName,
                                      AnimalKind.entityName,]]}/>
        <div className={classes.languageIcon}>
          {State.data.fetching.size > 0 && <IconButton><CircularProgress
              color={"secondary"}/></IconButton>}
          <Select className={classes.realmSelect}
                  options={State.data.realm}
                  getOptionLabel={option => <div>{option.name}</div>}
                  getOptionValue={option => option.id}
                  filterOption={(option, input) => option.data.name.startsWith(input)}
                  value={State.data.currentRealm}
                  onChange={realm => realmDataService.getRealmData(realm)}
          />
          <IconButton onClick={() => i18n.changeLanguage('en')}><Flag code={'gb'} height={16}/></IconButton>
          <IconButton onClick={() => i18n.changeLanguage('pl')}><Flag code={'pl'} height={16}/></IconButton>
        </div>
      </Toolbar>
    </AppBar>;
  }
}

export default withStyles(styles)(withTranslation()(TopMenu));
