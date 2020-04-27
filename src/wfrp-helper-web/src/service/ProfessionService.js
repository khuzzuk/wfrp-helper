import DeterminantService from "../client/DeterminantService";
import Profession from "../model/professions/Profession";
import {State} from "../state/State";
import {Collections} from "../util/Collections";

export default class ProfessionService {
  static getProfessions() {
    const currentClass = State.data.entity.professionClass;
    const data         = State.data[Profession.entityName];
    if (currentClass) {
      return data.filter(prof => prof.professionClass && (prof.professionClass.id
                                                          === currentClass.id));
    } else {
      return State.data[Profession.entityName];
    }
  }

  static updateProfession(profession: Profession) {
    const {professions, determinants} = State.data.entity;
    const newDeterminants = DeterminantService.updateProfessionExtensions(profession, determinants);
    Collections.addEntityIfNew(profession, professions);
    State.updateEntity({currentProfession: profession, professions: professions,
                         determinants: newDeterminants});
  }

  static removeProfessionFromHistory(profession: Profession) {
    const {professions, currentProfession} = State.data.entity;
    Collections.removeElement(professions, profession);
    if (currentProfession && profession.id === currentProfession.id) {
      State.data.entity.currentProfession = null;
    }
    State.updateEntity({professions: professions});
  }

  static nextProfessions() {
    const {currentProfession} = State.data.entity;
    if (currentProfession) {
      const professions = State.data[Profession.entityName];
      return currentProfession.nextProfessions.map(profName => Collections.findByName(professions,
                                                                                      profName));
    } else {
      return [];
    }
  }
}