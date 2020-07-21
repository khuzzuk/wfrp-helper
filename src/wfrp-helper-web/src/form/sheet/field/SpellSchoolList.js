import React, {Component} from 'react';
import MagicService from "../../../client/MagicService";
import CurrentMagicKnowledge from "../../../model/knowledge/CurrentMagicKnowledge";
import SpellSchoolLevel from "../../../model/knowledge/SpellSchoolLevel";
import {State} from "../../../state/State";
import {removeFrom} from "../../../util/Collections";
import SelectableList from "./SelectableList";

class SpellSchoolList extends Component {
  static magicService = new MagicService();
  state               = {
    availableSpellSchools: new Map(),
  };

  onSpellSchoolAdd = magicSchool => {
    const entity              = State.data.entity;
    const currentSpellSchools = entity.spellSchools;
    const currentLevelIndex   = currentSpellSchools.indexOf(currentSpellSchools.find(value => value.spellSchool.name
                                                                                              === magicSchool.name));

    if (currentLevelIndex >= 0) {
      currentSpellSchools.splice(currentLevelIndex, 1);
    }
    let newSpellSchool = this.state.availableSpellSchools.get(magicSchool);
    State.updateEntity({spellSchools: [...currentSpellSchools, newSpellSchool]});
  };

  onSpellSchoolRemove = spellSchool => event => {
    event.preventDefault();
    let newSpellSchools = removeFrom(State.data.entity.spellSchools, spellSchool);
    this.refreshRelevantMagicSchools();
    State.updateEntity({spellSchools: newSpellSchools});
  };

  refreshRelevantMagicSchools = () => {
    const currentMagicKnowledge: CurrentMagicKnowledge = new CurrentMagicKnowledge();
    currentMagicKnowledge.currentSpellSchools          = State.data.entity.spellSchools;
    currentMagicKnowledge.realm                        = State.data.currentRealm;
    SpellSchoolList.magicService.getAvailableSpellSchools(currentMagicKnowledge,
                                                          this.setSpellSchools);
  };

  setSpellSchools = spellSchools => {
    this.setState({
                    availableSpellSchools: this.assembleSpellSchools(spellSchools),
                    currentSpellSchools: State.data.entity.spellSchools
                  });
  };

  assembleSpellSchools = spellSchools => {
    const map = this.state.availableSpellSchools;
    map.clear();
    spellSchools.forEach(spellSchoolLevel => map.set(spellSchoolLevel.spellSchool,
                                                     spellSchoolLevel));
    return map;
  };

  static spellSchoolLevelText = (spellSchoolLevel: SpellSchoolLevel) => {
    return spellSchoolLevel.spellSchool.name + ' p. ' + spellSchoolLevel.level;
  };

  render() {
    const entity = State.data.entity;

    if (this.state.currentSpellSchools !== entity.spellSchools) {
      this.refreshRelevantMagicSchools();
    }
    const availableSpellSchools = [...this.state.availableSpellSchools.keys()];

    return <div>
      <SelectableList style={{height: 400, width: 200, paddingTop: 10}}
                      listStyle={{height: 300, width: '100%', overflow: 'auto'}}
                      data={availableSpellSchools}
                      onGearAdd={this.onSpellSchoolAdd}>
        {entity.spellSchools.map(spellSchoolLevel => <p
            key={SpellSchoolList.spellSchoolLevelText(spellSchoolLevel)} style={{margin: 0}}
            onContextMenu={this.onSpellSchoolRemove(spellSchoolLevel)}>
          {SpellSchoolList.spellSchoolLevelText(spellSchoolLevel)}
        </p>)}
      </SelectableList>
    </div>;
  }
}

export default SpellSchoolList;