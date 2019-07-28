import Store from "./Store";
import {bus} from "./Bus";
import Message, {MessageType} from "./Message";
import ConnectionService from "../connection/ConnectionService";

export const store = new Store();

export const initBus = () => {
    initDomain(store.nations, store.nationService);
    initDomain(store.languages, store.languageService);
    initDomain(store.races, store.raceService);
    initDomain(store.currencies, store.currencyService);
    initDomain(store.religions, store.religionService);
    initDomain(store.realms, store.realmService);

    initDomain(store.armorBlueprints, store.armorBlueprintService);
    initDomain(store.meleeWeaponBlueprints, store.meleeWeaponBlueprintService);
    initDomain(store.rangedWeaponBlueprints, store.rangedWeaponBlueprintService);
    initDomain(store.resources, store.resourceService);
    initDomain(store.items, store.itemService);
    initDomain(store.armorPatterns, store.armorPatternService);
    initDomain(store.armors, store.armorService);
    initDomain(store.meleeWeapons, store.meleeWeaponService);
    initDomain(store.rangedWeapons, store.rangedWeaponService);
    initDomain(store.jewelries, store.jewelryService);

    initDomain(store.skills, store.skillService);
    initDomain(store.spellSchools, store.spellSchoolService);
    initDomain(store.spells, store.spellService);
    initDomain(store.professionClasses, store.professionClassService);
    initDomain(store.professions, store.professionService);

    addRelation(store.resourceService, store.rangedWeaponService.resources);
    addRelation(store.rangedWeaponBlueprints, store.rangedWeaponService.rangedWeaponBlueprints);
    addRelation(store.resourceService, store.armorService.resources);
    addRelation(store.armorBlueprintService, store.armorService.armorBlueprints);
    addRelation(store.armorPatternService, store.armorService.armorPatterns);
    addRelation(store.resourceService, store.meleeWeaponService.resources);
    addRelation(store.meleeWeaponBlueprintService, store.meleeWeaponService.meleeWeaponBlueprints);
    addRelation(store.itemService, store.spellService.items);
    addRelation(store.spellSchoolService, store.spellService.spellSchools);
};

const initDomain = (container: Array, service: ConnectionService) => {
    service.subscribeForEvents();
    bus.subscribe(MessageType.ALL, service.domain, store.replaceData(container, service));
    bus.send(new Message(MessageType.FIND_ALL, service.domain));
};

const addRelation = (from: ConnectionService, container: Array) => {
    bus.subscribe(MessageType.ALL, from.domain, store.replaceData(container, from))
};
