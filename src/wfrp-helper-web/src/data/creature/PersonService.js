import ConnectionService from "../../connection/ConnectionService";
import FormFieldData from "../../crud/FormFieldData";
import NationService from "../world/nation/NationService";
import Person from "./Person";
import {Gender} from "./Gender";
import HairColor from "../look/hairColor/HairColor";
import Race from "../world/race/Race";
import ProfessionClass from "../knowledge/profession/ProfessionClass";
import Profession from "../knowledge/profession/Profession";
import Character from "../look/character/Character";
import EyeColor from "../look/eyeColor/EyeColor";
import PhysicalFeature from "../look/physicalFeatures/PhysicalFeature";
import RangedWeapon from "../crafting/item/ranged/RangedWeapon";
import MeleeWeapon from "../crafting/item/melee/MeleeWeapon";
import Armor from "../crafting/item/armor/Armor";
import Skill from "../knowledge/skill/Skill";
import Spell from "../knowledge/magic/spell/Spell";
import SpellSchool from "../knowledge/magic/spellSchool/SpellSchool";
import Item from "../crafting/item/Item";
import Currency from "../world/money/Currency";
import Language from "../world/language/Language";
import Religion from "../world/religion/Religion";
import Nation from "../world/nation/Nation";
import Animal from "./Animal";
import {store} from "../../state";
import {Collections} from "../../util/Collections";
import {bus} from "../../state/Bus";
import {MessageType} from "../../state/Message";
import Realm from "../world/realm/Realm";

export default class PersonService extends ConnectionService {
    title: string = 'Person';
    data: Person[] = [];
    hairColors: HairColor[] = [];
    eyeColors: EyeColor[] = [];
    races: Race[] = [];
    professionClasses: ProfessionClass[] = [];
    professions: Profession[] = [];
    personalities: Character[] = [];
    physicalFeatures: PhysicalFeature[] = [];
    meleeWeapons: MeleeWeapon[] = [];
    rangedWeapons: RangedWeapon[] = [];
    armors: Armor[] = [];
    skills: Skill[] = [];
    spells: Spell[] = [];
    spellSchools: SpellSchool[] = [];
    items: Item[] = [];
    currencies: Currency[] = [];
    languages: Language[] = [];
    religions: Religion[] = [];
    nations: Nation[] = [];
    animals: Animal[] = [];

    tableColumns: FormFieldData[] = [
        {
            label: 'Name',
            name: 'name',
        }, {
            label: 'Description',
            name: 'description',
        }
    ];

    formFields: FormFieldData[] = [{
        label: 'Name',
        name: 'name',
        type: NationService.FormFieldType.TEXT
    }, {
        label: 'Gender',
        name: 'gender',
        type: NationService.FormFieldType.ENUM_SELECT,
        suggestions: Gender.allOf()
    }, {
        label: 'Description',
        name: 'description',
        type: NationService.FormFieldType.TEXT_AREA
    }];

    constructor() {
        super('person');
    }

    subscribeForEvents() {
        super.subscribeForEvents();
        bus.subscribe(MessageType.CURRENT, 'realm')
    }

    createNew(): Person {
        this.entity = new Person();
        return this.entity;
    }

    save(entity: object) {
        if (store.currentRealm) {
            const realm = store.currentRealm;
            if (!Collections.findByName(realm.persons, entity)) {
                store.currentRealm.persons.push(entity);
            }
        }
        super.save(entity);
    }

    getData(): Array {
        return store.currentRealm ?
            this.data.filter(person => store.currentRealm.persons.find(realmPerson => realmPerson.name === person.name))
            : [];
    }

    setCurrentRealm(realm: Realm): void {

        this.nations = [];

        if (realm) {
            this.nations = Collections.filterByRealm(store.nationService.data, realm.nations);
        }
    }
}