import {Menu, MenuItem, Tooltip} from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {withTranslation} from "react-i18next";
import SimpleBar from "simplebar-react";
import DeterminantService from "../../client/DeterminantService";
import GearService from "../../client/GearService";
import MagicService from "../../client/MagicService";
import FrontCharacterSheet from "../../img/A.png";
import Armor from "../../model/crafting/Armor";
import Item from "../../model/crafting/Item";
import MeleeWeapon from "../../model/crafting/MeleeWeapon";
import RangedWeapon from "../../model/crafting/RangedWeapon";
import Animal from "../../model/creature/Animal";
import Character from "../../model/creature/Character";
import EyeColor from "../../model/creature/EyeColor";
import {GenderEntityName} from "../../model/creature/Gender";
import HairColor from "../../model/creature/HairColor";
import PhysicalFeature from "../../model/creature/PhysicalFeature";
import Skill from "../../model/knowledge/Skill";
import Spell from "../../model/knowledge/Spell";
import Profession from "../../model/professions/Profession";
import ProfessionClass from "../../model/professions/ProfessionClass";
import Currency from "../../model/world/Currency";
import Language from "../../model/world/Language";
import Nation from "../../model/world/Nation";
import Race from "../../model/world/Race";
import Religion from "../../model/world/Religion";
import ItemService from "../../service/ItemService";
import MoneyService from "../../service/MoneyService";
import ProfessionService from "../../service/ProfessionService";
import {State} from "../../state/State";
import {Collections, removeFrom} from "../../util/Collections";
import AnimalElement from "./field/AnimalElement";
import ArmorCalculationsComponent from "./field/ArmorCalculationsComponent";
import ArmorElement from "./field/ArmorElement";
import ItemElement from "./field/ItemElement";
import MoneyElement from "./field/MoneyElement";
import PersonalDeterminantsField from "./field/PersonalDeterminantsField";
import RangedWeaponElement from "./field/RangedWeaponElement";
import SelectableList from "./field/SelectableList";
import SimpleEntitySelect from "./field/SimpleEntitySelect";
import SimpleEnumSelect from "./field/SimpleEnumSelect";
import SimpleList from "./field/SimpleList";
import SimpleTextField, {TextFieldType} from "./field/SimpleTextField";
import SpeedComponent from "./field/SpeedComponent";
import SpellElement from "./field/SpellElement";
import SpellSchoolList from "./field/SpellSchoolList";
import WeaponElement from "./field/WeaponElement";

const styles = () => ({
  root: {
    marginTop: 5,
    background: `url(${FrontCharacterSheet})`,
    fontFamily: 'wfrp',
    fontSize: '24px',
    backgroundSize: 'cover',
    height: '1231px',
    width: '1800px',
    display: 'flex'
  },

  genderSelect: {
    display: 'inline-block', width: 85,
  },
});

class CharacterSheetForm extends Component {
  determinantService: DeterminantService = new DeterminantService();
  state = {anchorEl: null, currentElement: null,
    generateStatsAction: () => {
      const race = State.data.entity.race;
      race && this.determinantService.rollForRace(race);
    }};

  handleClose = () => {
    this.setState({anchorEl: null, showMenu: ''})
  };

  render() {
    const {classes, t} = this.props;
    const entity    = State.data.entity;

    return <div className={classes.root}>

      {/*page one*/}
      <div style={{width: 900, height: 1230}}>

        {/*basic data*/}
        <div style={{paddingTop: 33, paddingLeft: 33, width: 860}}>
          <SimpleTextField name={'name'} customStyle={{width: 200}}/>
          <SimpleEntitySelect name={Race.entityName} customStyle={{width: 140, paddingLeft: 20}} options={State.data.currentRealmData.races}/>
          <SimpleEnumSelect name={GenderEntityName} className={classes.genderSelect}/>
          <SimpleEntitySelect name={ProfessionClass.entityName} customStyle={{width: 240}}/>
          <SimpleEntitySelect name={Character.entityName} propName={'personality'} customStyle={{width: 148}}/>
        </div>
        <div style={{paddingTop: 30, paddingLeft: 33, width: 860}}>
          <SimpleTextField name={'age'} variant={TextFieldType.INT} customStyle={{width: 80}}/>
          <SimpleTextField name={'height'} variant={TextFieldType.INT} customStyle={{width: 100, paddingLeft: 10}}/>
          <SimpleTextField name={'weight'} variant={TextFieldType.FLOAT} customStyle={{width: 90, paddingLeft: 20}}/>
          <SimpleEntitySelect name={HairColor.entityName} customStyle={{width: 110, paddingLeft: 10}}/>
          <SimpleEntitySelect name={EyeColor.entityName} customStyle={{width: 90, paddingLeft: 0}}/>
          <SimpleEntitySelect name={PhysicalFeature.entityName} propName={'physicalFeatures'} multi customStyle={{width: 280, paddingLeft: 60, maxHeight: 70, position: 'relative', top: -30, fontSize: '14px'}}/>
        </div>

        {/*profession*/}
        <div style={{paddingTop: 30, paddingLeft: 33, width: 860, height: 40, display: 'flex'}}>
          <SimpleEntitySelect name={Profession.entityName} propName={'currentProfession'} options={ProfessionService.getProfessions()} onChange={ProfessionService.updateProfession} customStyle={{width: 235, paddingLeft: 0}}/>
          <SimpleBar style={{width: 360, height: 40}}>
            <SimpleList name={'professions'} onRemove={ProfessionService.removeProfessionFromHistory} style={{display: 'inline-block', width: 350, fontSize: '14px'}}/>
          </SimpleBar>
          <SimpleBar style={{width: 200, height: 40}}>
            <SimpleList name={'outgoingProfessions'} data={ProfessionService.nextProfessions()} onRemove={ProfessionService.removeProfessionFromHistory} style={{display: 'inline-block', width: 200, height: 40, fontSize: '14px'}}/>
          </SimpleBar>
        </div>

        {/*determinants*/}
        <div style={{paddingTop: 43, width: 890, display: 'flex'}}>
          <div style={{width: 230, height: 50}} onContextMenu={event => {
            event.preventDefault();
            this.setState({anchorEl: event.target, currentElement: ['generateStats']});
          }}/>
          <PersonalDeterminantsField style={{width: 650}}/>
        </div>

        {/*skills and equipment*/}
        <div style={{paddingTop: 10, paddingLeft: 20, width: 860, display: 'flex'}}>

          {/*gear*/}
          <div style={{paddingTop: 0, paddingLeft: 0, width: 430}}>
            <SelectableList style={{width: 400, height: 220, paddingLeft: 40, paddingTop: 10}} listStyle={{height: 180}} name={MeleeWeapon.entityName} propName={'meleeWeapons'}>
              {entity.meleeWeapons.map(weapon => <WeaponElement key={weapon.name} name={'meleeWeapons'} weapon={weapon}/>)}
            </SelectableList>
            <SelectableList style={{width: 400, height: 230, paddingLeft: 30, paddingTop: 10}} listStyle={{height: 180}} name={RangedWeapon.entityName} onGearAdd={GearService.addPersonalRangedWeapon}>
              {entity.rangedWeapons.map(weapon => <RangedWeaponElement key={weapon.rangedWeapon.name} name={'meleeWeapons'} pWep={weapon}/>)}
            </SelectableList>
            <SelectableList style={{width: 400, height: 220, paddingLeft: 20}} name={Armor.entityName}>
              {entity.armor.map(armor => <ArmorElement key={armor.name} name={'meleeWeapons'} armor={armor}/>)}
            </SelectableList>
          </div>

          {/*skills and armor*/}
          <div style={{paddingTop: 0, paddingLeft: 10, width: 210}}>

            {/*skills*/}
            <SelectableList style={{width: 200, height: 360, paddingLeft: 0, paddingTop: 10}} listStyle={{height: 300}} name={Skill.entityName} propName={'skills'} data={Collections.except(State.data.skill, entity.skills)}>
              {entity.skills.map(skill => <Tooltip title={skill.description}><p key={skill.name} style={{margin: 0}}
                                             onContextMenu={event => {
                                               event.preventDefault();
                                               State.updateEntity({
                                                                    skills: Collections.removeElement(
                                                                        entity.skills,
                                                                        skill)
                                                                  });
                                             }}>{skill.name}</p></Tooltip>)}
            </SelectableList>

            {/*armor values*/}
            <ArmorCalculationsComponent/>
          </div>

          {/*magic schools*/}
          <SpellSchoolList/>
        </div>
      </div>

      {/*page two*/}
      <div style={{width: 900, height: 1230}}>

        {/*spells*/}
        <div style={{paddingTop: 0, paddingLeft: 20, width: 840}}>
          <div style={{paddingTop: 0, paddingLeft: 20, width: 840, display: 'flex'}}>
            <SelectableList style={{width: 630}} listStyle={{height: 220}} name={Spell.entityName} propName={'spells'} data={MagicService.getRelevantSpells()}>
              {entity.spells.map(spell => <SpellElement spell={spell}/>)}
            </SelectableList>

            {/*fate and mana*/}
            <div style={{width: 200}}>
              <SimpleTextField name={'fatePoints'}  variant={TextFieldType.INT} customStyle={{width: '100%', height: 50, paddingTop: 55}}/>
              <SimpleTextField name={'mana'}  variant={TextFieldType.INT} customStyle={{width: '100%', height: 50, paddingTop: 30}}/>
              <SimpleTextField name={'currentMana'}  variant={TextFieldType.INT} customStyle={{width: '100%', height: 50, paddingTop: 35}}/>
            </div>
          </div>

          {/*personal belongings*/}
          <div style={{display: 'flex'}}>
            <div style={{width: 300, paddingTop: 20}}>

              {/*equipment*/}
              <SelectableList style={{width: 300}} listStyle={{height: 370}} name={Item.entityName} onGearAdd={ItemService.addItemToInventory}>
                {entity.inventory.map(eq => <ItemElement key={eq.item.name} inventory={eq}/>)}
              </SelectableList>
              <div style={{paddingLeft: 220}}>{ItemService.inventoryWeight()} kg</div>

              {/*money*/}
              <SelectableList style={{width: 285}} listStyle={{height: 150}} name={Currency.entityName} data={State.data.currentRealmData.currencies} onGearAdd={MoneyService.addMoney}>
                {entity.money.map(money => <MoneyElement key={money.currency.name} money={money}/>)}
              </SelectableList>

            </div>

            {/*other description*/}
            <div>
              <SpeedComponent/>

              {/*personality*/}
              <div style={{width: 350, height: 160, paddingTop: 10, display: 'flex'}}>

                {/*languages*/}
                <SelectableList style={{width: 100, paddingTop: 15}} listStyle={{height: 100}} name={Language.entityName} propName={'languages'} data={State.data.currentRealmData.languages}>
                  {entity.languages.map(lang => <div onContextMenu={event => {
                    event.preventDefault();
                    State.updateEntity({languages: removeFrom(entity.languages, lang)});
                  }}>{lang.name}</div>)}
                </SelectableList>

                {/*health*/}
                <SimpleTextField name={'health'} variant={TextFieldType.TEXT} multiline customStyle={{width: 130, height: 100, alignSelf: 'flex-end'}}/>
                <SimpleTextField name={'sanityPoints'} variant={TextFieldType.INT} customStyle={{width: 100, paddingLeft: 10}}/>
              </div>

              {/*history*/}
              <div style={{width: 350}}>
                <SimpleEntitySelect name={Nation.entityName} customStyle={{width: 170, height:50, marginLeft: 170, marginTop: 50}} options={State.data.currentRealmData.nations}/>
                <SimpleTextField name={'parents'} variant={TextFieldType.TEXT} customStyle={{width: 120, height: 35, marginTop: 0, marginLeft: 220}}/>
                <SimpleTextField name={'family'} variant={TextFieldType.TEXT} customStyle={{width: 220, height: 80, marginLeft: 110}}/>
              </div>

              {/*religion*/}
              <div style={{width: 350, display: 'flex'}}>
                <SimpleTextField name={'socialLevel'} variant={TextFieldType.TEXT} customStyle={{width: 80, height: 60, marginTop: 10, marginLeft: 110}}/>
                <SimpleEntitySelect name={Religion.entityName} customStyle={{width: 150, marginTop: 35, marginLeft: 5}} data={State.data.currentRealmData.religions}/>
              </div>

            </div>

            {/*experience*/}
            <div style={{marginLeft: 20, marginTop: 50}}>
              <div style={{marginTop: 20}}>aktualnie:</div>
              <SimpleTextField name={'experience'} variant={TextFieldType.INT} customStyle={{width: 150, height: 150}}/>
              <div style={{marginTop: 20}}>całkowicie:</div>
              <SimpleTextField name={'totalExperience'} variant={TextFieldType.INT} customStyle={{width: 150, height: 150}}/>
            </div>

          </div>

          {/*animals*/}
          <SelectableList style={{width: 700}} listStyle={{height: 100}} name={Animal.entityName} propName={'animals'}>
            {entity.animals.map(animal => <AnimalElement animal={animal}/>)}
          </SelectableList>

        </div>
      </div>

      <Menu anchorEl={this.state.anchorEl}
            open={this.state.currentElement && this.state.anchorEl !== null}
            onClose={this.handleClose}>
        {
          this.state.currentElement && this.state.currentElement.map(elementName =>
            <MenuItem onClick={() => {
              this.handleClose();
              this.state[elementName + 'Action']();
            }}>{t(elementName)}</MenuItem>
          )
        }
      </Menu>
    </div>;
  }
}

CharacterSheetForm.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles)(withTranslation()(CharacterSheetForm));