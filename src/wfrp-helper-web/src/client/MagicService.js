import CurrentMagicKnowledge from "../model/knowledge/CurrentMagicKnowledge";
import {State} from "../state/State";
import {findEntity, findIn} from "../util/Collections";
import RemoteService from "./RemoteService";

export default class MagicService extends RemoteService {
  getAvailableSpellSchools(currentMagicKnowledge: CurrentMagicKnowledge, onResponse: VoidFunction) {
    this.requestFor(currentMagicKnowledge, 'magic/getAvailableSpellSchools', onResponse);
  }

  static getRelevantSpells() {
    const {spells, spellSchools} = State.data.entity;
    const availableSpells        = State.data.spell;
    return availableSpells.filter(spell => !findEntity(spells, spell))
                          .filter(spell => {
                            const spellSchool = findIn(spellSchools,
                                                       spell,
                                                       ['spellSchool', 'name']);
                            return spellSchool && spellSchool.level >= spell.level;
                          })
  }
}
