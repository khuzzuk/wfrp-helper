import Store from "./Store";
import Bus from "./Bus";
import Message, {MessageType} from "./Message";
import ArmorBlueprintService from "../data/crafting/blueprint/ArmorBlueprintService";
import ConnectionService from "../connection/ConnectionService";
import MeleeWeaponBlueprintService from "../data/crafting/blueprint/MeleeWeaponBlueprintService";
import RangedWeaponBlueprintService from "../data/crafting/blueprint/RangedWeaponBlueprintService";

export const bus = new Bus();
export const store = new Store();

export const initBus = () => {
    initDomain(store.armorBlueprints, store.armorBlueprintService, ArmorBlueprintService.domain);
    initDomain(store.meleeWeaponBlueprints, store.meleeWeaponBlueprintService, MeleeWeaponBlueprintService.domain);
    initDomain(store.rangedWeaponBlueprints, store.rangedWeaponBlueprintService, RangedWeaponBlueprintService.domain);
};

const initDomain = (container: Array, service: ConnectionService) => {
    service.addDataListener(data => bus.send(new Message(MessageType.ALL, service.domain, data)));
    bus.subscribe(MessageType.ALL, service.domain, store.replaceData(container, service));
    bus.subscribe(MessageType.FIND_ALL, service.domain, () => service.retrieveData());
    bus.send(new Message(MessageType.FIND_ALL, service.domain));
};
