import RequestService from "../../../connection/RequestService";
import RealmData from "./RealmData";
import {bus} from "../../../state/Bus";
import Message, {MessageType} from "../../../state/Message";
import Realm from "./Realm";

export default class RealmDataService extends RequestService {
    constructor() {
        super();
        bus.subscribe(MessageType.CURRENT, 'realm', this.getRealmData);
    }

    sendRealmData = (realmData: RealmData) => {
        const newRealmData = new RealmData();
        newRealmData.updateWith(realmData);
        console.log(newRealmData);
        bus.send(new Message(MessageType.CURRENT, 'realmData', newRealmData));
    };

    getRealmData = (currentRealm: Realm) => {
        if (currentRealm) {
            this.requestForPath(`realmData/${currentRealm.id}`, this.sendRealmData);
        }
    };
}