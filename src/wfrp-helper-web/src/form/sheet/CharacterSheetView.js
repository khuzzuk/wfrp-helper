import {Menu, MenuItem, Tooltip} from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {withTranslation} from "react-i18next";
import DeterminantService from "../../client/DeterminantService";
import FrontCharacterSheet from "../../img/A.png";
import Animal from "../../model/creature/Animal";
import Language from "../../model/world/Language";
import Nation from "../../model/world/Nation";
import Religion from "../../model/world/Religion";
import ItemService from "../../service/ItemService";
import ProfessionService from "../../service/ProfessionService";
import {State} from "../../state/State";
import {removeFrom} from "../../util/Collections";
import AnimalElement from "./field/AnimalElement";
import ArmorCalculationsComponent from "./field/ArmorCalculationsComponent";
import ArmorElement from "./field/ArmorElement";
import ItemElement from "./field/ItemElement";
import MoneyElement from "./field/MoneyElement";
import PersonalDeterminantsView from "./field/PersonalDeterminantsView";
import RangedWeaponElementView from "./field/RangedWeaponElementView";
import SelectableList from "./field/SelectableList";
import SimpleEntitySelect from "./field/SimpleEntitySelect";
import SimpleList from "./field/SimpleList";
import SimpleListView from "./field/SimpleListView";
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

  listToDivs = (array: Object[]) => {
    return array ? array.map(e => <div>{e.name}</div>) : <div/>
  };


  render() {
    const {classes, t, editable} = this.props;
    const entity    = State.data.entity;

    return <div className={classes.root}>

      {/*page one*/}
      <div style={{width: 900, height: 1230}}>

        {/*basic data*/}
        <div style={{paddingTop: 40, paddingLeft: 33, width: 860, display: 'flex'}}>
          <div style={{width: 200}}>{entity.name}</div>
          <div style={{width: 140, paddingLeft: 20}}>{entity.race && entity.race.name}</div>
          <div style={{display: 'inline-block', width: 85}}>{entity.gender === 'MALE' ? 'M' : 'K'}</div>
          <div style={{width: 240}}>{entity.professionClass && entity.professionClass.name}</div>
          <div style={{width: 148}}>{t(entity.personality && entity.personality.name)}</div>
        </div>
        <div style={{paddingTop: 40, paddingLeft: 33, width: 860, display: 'flex'}}>
          <div style={{width: 80, paddingLeft: 5}}>{entity.age}</div>
          <div style={{width: 100, paddingLeft: 10}}>{entity.height} cm</div>
          <div style={{width: 90, paddingLeft: 20}}>{entity.weight} kg</div>
          <div style={{width: 110, paddingLeft: 10}}>{entity.hairColor && entity.hairColor.name}</div>
          <div style={{width: 90, paddingLeft: 0}}>{entity.eyeColor && entity.eyeColor.name}</div>
          <div style={{width: 265, paddingLeft: 70, maxHeight: 70, position: 'relative', top: -30, fontSize: '14px'}}>{this.listToDivs(entity.physicalFeatures)}</div>
        </div>

        {/*profession*/}
        <div style={{paddingTop: 40, paddingLeft: 33, width: 860, display: 'flex'}}>
          <div style={{width: 240, paddingLeft: 10}}>{entity.currentProfession && entity.currentProfession.name}</div>
          <SimpleListView data={entity.professions} style={{display: 'inline-block', width: 350, fontSize: '14px'}}/>
          <SimpleList name={'outgoingProfessions'} data={ProfessionService.nextProfessions()} onRemove={ProfessionService.removeProfessionFromHistory} style={{display: 'inline-block', width: 200, fontSize: '14px'}}/>
        </div>

        {/*determinants*/}
        <div style={{paddingTop: 50, width: 890, display: 'flex'}}>
          <div style={{width: 230, height: 50}}/>
          <PersonalDeterminantsView style={{width: 650}}/>
        </div>

        {/*skills and equipment*/}
        <div style={{paddingTop: 0, paddingLeft: 20, width: 860, display: 'flex'}}>

          {/*gear*/}
          <div style={{paddingTop: 0, paddingLeft: 0, width: 430}}>
            <SimpleListView style={{width: 400, height: 170, paddingLeft: 40, paddingTop: 60}}>
              {entity.meleeWeapons.map(weapon => <WeaponElement key={weapon.name} name={'meleeWeapons'} weapon={weapon} disabled/>)}
            </SimpleListView>
            <SimpleListView style={{width: 400, height: 180, paddingLeft: 30, paddingTop: 60}}>
              {entity.rangedWeapons.map(weapon => <RangedWeaponElementView key={weapon.rangedWeapon.name} pWep={weapon}/>)}
            </SimpleListView>
            <SimpleListView style={{width: 400, height: 230, paddingLeft: 20, paddingTop: 50}}>
              {entity.armor.map(armor => <ArmorElement key={armor.name} name={'meleeWeapons'} armor={armor} disabled/>)}
            </SimpleListView>
          </div>

          {/*skills and armor*/}
          <div style={{paddingTop: 0, paddingLeft: 10, width: 210}}>

            {/*skills*/}
            <SimpleListView style={{width: 200, height: 315, paddingLeft: 0, paddingTop: 60}}>
              {entity.skills.map(skill => <Tooltip title={skill.description}><p key={skill.name} style={{margin: 0}}>{skill.name}</p></Tooltip>)}
            </SimpleListView>

            {/*armor values*/}
            <ArmorCalculationsComponent/>
          </div>

          {/*magic schools*/}
          <SimpleListView style={{height: 350, width: 200, paddingTop: 60}} listStyle={{height: 250, width: '100%', overflow: 'auto'}}>
            {entity.spellSchools.map(spellSchoolLevel =>
                                         <p key={SpellSchoolList.spellSchoolLevelText(spellSchoolLevel)} style={{margin: 0}}>
                                           {SpellSchoolList.spellSchoolLevelText(spellSchoolLevel)}
                                         </p>)}
          </SimpleListView>
        </div>
      </div>

      {/*page two*/}
      <div style={{width: 900, height: 1230}}>

        {/*spells*/}
        <div style={{paddingTop: 0, paddingLeft: 20, width: 840}}>
          <div style={{paddingTop: 0, paddingLeft: 20, width: 840, display: 'flex'}}>
            <SimpleListView style={{width: 630, height: 170, paddingTop: 50}}>
              {entity.spells.map(spell => <SpellElement spell={spell} disabled/>)}
            </SimpleListView>

            {/*fate and mana*/}
            <div style={{width: 200}}>
              <div style={{width: '100%', height: 50, paddingTop: 60, textAlign: 'center'}}>{entity.fatePoints}</div>
              <div style={{width: '100%', height: 50, paddingTop: 35, textAlign: 'center'}}>{entity.mana}</div>
              <div style={{width: '100%', height: 50, paddingTop: 40, textAlign: 'center'}}>{entity.currentMana}</div>
            </div>
          </div>

          {/*personal belongings*/}
          <div style={{display: 'flex'}}>
            <div style={{width: 300, paddingTop: 20}}>

              {/*equipment*/}
              <SimpleListView style={{width: 300, height: 368, paddingTop: 30}}>
                {entity.inventory.map(eq => <div key={eq.id} style={{width: 290, display: 'flex'}}>
                  <div style={{width: 150, minWidth: 150}}>{eq.item.name}</div>
                  <div style={{width: 70, textAlign: 'center'}}>{ItemElement.calculateWeight(eq)} kg</div>
                  <div style={{width: 50, textAlign: 'center'}}>{eq.amount}</div>
                </div>)}
              </SimpleListView>
              <div style={{paddingLeft: 200}}>{ItemService.inventoryWeight()} kg</div>

              {/*money*/}
              <SimpleListView style={{width: 285, height: 150, paddingTop: 50}}>
                {entity.money.map(money =>
                                      <div style={{display: 'flex'}}>
                                        <div style={{width: 150}}>{money.currency.name}</div>
                                        <div style={{width: 35, textAlign: 'center'}}>{money.amount.gold}</div>
                                        <div style={{width: 35, textAlign: 'center'}}>{money.amount.silver}</div>
                                        <div style={{width: 50, textAlign: 'center'}}>{money.amount.lead}</div>
                                      </div>
                )}
              </SimpleListView>

            </div>

            {/*other description*/}
            <div>
              <SpeedComponent/>

              {/*personality*/}
              <div style={{width: 350, height: 160, paddingTop: 55, display: 'flex'}}>

                {/*languages*/}
                <SimpleListView style={{width: 90, height: 100}}>
                  {entity.languages.map(lang => <div>{lang.name}</div>)}
                </SimpleListView>

                {/*health*/}
                <div style={{width: 130, height: 100, paddingLeft: 10}}>{entity.health}</div>
                <div style={{width: 100, paddingLeft: 10, textAlign: 'center'}}>{entity.sanityPoints}</div>
              </div>

              {/*history*/}
              <div style={{width: 350}}>
                <div style={{width: 170, height:50, marginLeft: 170, marginTop: 50}}>{entity.nation.name}</div>
                <div style={{width: 120, height: 35, marginTop: 0, marginLeft: 220}}>{entity.parents}</div>
                <div style={{width: 220, height: 80, marginLeft: 110}}>{entity.family}</div>
              </div>

              {/*religion*/}
              <div style={{width: 350, display: 'flex'}}>
                <div style={{width: 80, height: 60, marginTop: 10, marginLeft: 110}}>{entity.socialLevel}</div>
                <div style={{width: 150, marginTop: 35, marginLeft: 5}}>{entity.religion.name}</div>
              </div>

            </div>

            {/*experience*/}
            <div style={{marginLeft: 20, marginTop: 50}}>
              <div style={{marginTop: 20}}>aktualnie:</div>
              <div style={{width: 150, height: 150}}>{entity.experience}</div>
              <div style={{marginTop: 20}}>całkowicie:</div>
              <div style={{width: 150, height: 150}}>{entity.totalExperience}</div>
            </div>

          </div>

          {/*animals*/}
          <SimpleListView style={{width: 700}} listStyle={{height: 100}} name={Animal.entityName} propName={'animals'}>
            {entity.animals.map(animal => <AnimalElement animal={animal}/>)}
          </SimpleListView>

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