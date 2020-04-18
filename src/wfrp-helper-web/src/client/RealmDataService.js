import Realm from "../model/realm/Realm";
import {State} from "../state/State";
import RemoteService from "./RemoteService";

export default class RealmDataService extends RemoteService {
  getRealmData = (currentRealm: Realm) => {
    if (currentRealm) {
      this.requestForPath(`realmData/${currentRealm.id}`,
                          data => State.update({currentRealmData: data, currentRealm: currentRealm}));
    }
  };
}