import Store from "./Store";
import {bus} from "./Bus";
import Message, {MessageType} from "./Message";
import ConnectionService from "../connection/ConnectionService";

export const store = new Store();

export const initBus = () => {
    initDomain(store.nationService);
    initDomain(store.languageService);
    initDomain(store.raceService);
    initDomain(store.currencyService);
    initDomain(store.religionService);
    initDomain(store.realmService);

    initDomain(store.armorBlueprintService);
    initDomain(store.meleeWeaponBlueprintService);
    initDomain(store.rangedWeaponBlueprintService);
    initDomain(store.resourceService);
    initDomain(store.itemService);
    initDomain(store.armorPatternService);
    initDomain(store.armorService);
    initDomain(store.meleeWeaponService);
    initDomain(store.rangedWeaponService);
    initDomain(store.jewelryService);
    initDomain(store.ammunitionService);

    initDomain(store.skillService);
    initDomain(store.spellSchoolService);
    initDomain(store.spellService);
    initDomain(store.professionClassService);
    initDomain(store.professionService);

    initDomain(store.characterService);
    initDomain(store.eyeColorService);
    initDomain(store.hairColorService);
    initDomain(store.physicalFeatureService);

    initDomain(store.animalKindService);
    initDomain(store.animalService);
    initDomain(store.personService);

    addRelation(store.resourceService, store.rangedWeaponService.resources);
    addRelation(store.rangedWeaponBlueprintService, store.rangedWeaponService.rangedWeaponBlueprints);
    addRelation(store.resourceService, store.armorService.resources);
    addRelation(store.armorBlueprintService, store.armorService.armorBlueprints);
    addRelation(store.armorPatternService, store.armorService.armorPatterns);
    addRelation(store.resourceService, store.meleeWeaponService.resources);
    addRelation(store.meleeWeaponBlueprintService, store.meleeWeaponService.meleeWeaponBlueprints);
    addRelation(store.itemService, store.spellService.items);
    addRelation(store.spellSchoolService, store.spellService.spellSchools);
    addRelation(store.animalKindService, store.animalService.animalKinds);
    addRelation(store.resourceService, store.ammunitionService.resources);
    addRelation(store.rangedWeaponBlueprintService, store.ammunitionService.rangedWeaponBlueprints);

    addRelation(store.nationService, store.languageService.nations);
    addRelation(store.nationService, store.currencyService.nations);
    addRelation(store.nationService, store.religionService.nations);

    addRelation(store.personService, store.realmService.persons);
    addRelation(store.nationService, store.realmService.nations);

    addRelation(store.hairColorService, store.personService.hairColors);
    addRelation(store.eyeColorService, store.personService.eyeColors);
    addRelation(store.raceService, store.personService.races);
    addRelation(store.professionClassService, store.personService.professionClasses);
    addRelation(store.professionService, store.personService.professions);
    addRelation(store.characterService, store.personService.personalities);
    addRelation(store.physicalFeatureService, store.personService.physicalFeatures);
    addRelation(store.meleeWeaponService, store.personService.meleeWeapons);
    addRelation(store.rangedWeaponService, store.personService.rangedWeapons);
    addRelation(store.ammunitionService, store.personService.ammunitions);
    addRelation(store.jewelryService, store.personService.jewelleries);
    addRelation(store.armorService, store.personService.armors);
    addRelation(store.skillService, store.personService.skills);
    addRelation(store.spellService, store.personService.spells);
    addRelation(store.spellSchoolService, store.personService.spellSchools);
    addRelation(store.itemService, store.personService.items);
    addRelation(store.currencyService, store.personService.currencies);
    addRelation(store.languageService, store.personService.languages);
    addRelation(store.religionService, store.personService.religions);
    addRelation(store.animalService, store.personService.animals);

    bus.subscribe(MessageType.CURRENT, 'realm', data => store.currentRealm = data);
};

const initDomain = (service: ConnectionService) => {
    service.subscribeForEvents();
    bus.send(new Message(MessageType.FIND_ALL, service.domain));
};

const addRelation = (from: ConnectionService, container: Array) => {
    bus.subscribe(MessageType.ALL, from.domain, store.replaceData(container, from))
};
