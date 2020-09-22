import Person from "../model/creature/Person";
import SpellSchool from "../model/knowledge/SpellSchool";
import Realm from "../model/realm/Realm";
import Currency from "../model/world/Currency";
import Language from "../model/world/Language";
import Nation from "../model/world/Nation";
import Race from "../model/world/Race";
import Religion from "../model/world/Religion";
import {State} from "../state/State";
import RemoteService from "./RemoteService";

const realmData = [Nation.entityName,
                   Language.entityName,
                   Religion.entityName,
                   Currency.entityName,
                   Race.entityName,
                   SpellSchool.entityName,
                   Person.entityName,];
const realmMapping = {
  nation: 'nations',
  worldLanguage: 'languages',
  religion: 'religions',
  currency: 'currencies',
  race: 'races',
  spellSchool: 'spellSchools',
  person: 'persons',
};

export default class RealmDataService extends RemoteService {
  getRealmData = (currentRealm: Realm) => {
    if (currentRealm) {
      this.requestForPath(`realmData/${currentRealm.id}`,
                          data => State.update({currentRealmData: data, currentRealm: currentRealm}));
    }
  };

  static hasRealmData(entityName: string) {
    return State.data.currentRealm && State.data.currentRealmData && realmData.includes(entityName);
  }

  static getRealmData(entityName: string) {
    let currentRealmData = State.data.currentRealmData;
    return currentRealmData[realmMapping[entityName]];
  }
}