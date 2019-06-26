import ConnectionService from "../../connection/ConnectionService";
import FormFieldData from "../../crud/FormFieldData";
import NationService from "../world/nation/NationService";
import Person from "./Person";
import {Gender} from "./Gender";
import HairColor from "../look/hairColor/HairColor";
import HairColorService from "../look/hairColor/HairColorService";
import Race from "../world/race/Race";
import RaceService from "../world/race/RaceService";
import ProfessionClass from "../knowledge/profession/ProfessionClass";
import ProfessionClassService from "../knowledge/profession/ProfessionClassService";
import ProfessionService from "../knowledge/profession/ProfessionService";
import Profession from "../knowledge/profession/Profession";
import CharacterService from "../look/character/CharacterService";
import Character from "../look/character/Character";
import EyeColor from "../look/eyeColor/EyeColor";
import EyeColorService from "../look/eyeColor/EyeColorService";
import PhysicalFeatureService from "../look/physicalFeatures/PhysicalFeatureService";
import PhysicalFeature from "../look/physicalFeatures/PhysicalFeature";
import RangedWeapon from "../crafting/item/ranged/RangedWeapon";
import RangedWeaponService from "../crafting/item/ranged/RangedWeaponService";
import MeleeWeapon from "../crafting/item/melee/MeleeWeapon";
import MeleeWeaponService from "../crafting/item/melee/MeleeWeaponService";
import ArmorService from "../crafting/item/armor/ArmorService";
import Armor from "../crafting/item/armor/Armor";
import Skill from "../knowledge/skill/Skill";
import SkillService from "../knowledge/skill/SkillService";
import SpellService from "../knowledge/magic/spell/SpellService";
import Spell from "../knowledge/magic/spell/Spell";
import SpellSchoolService from "../knowledge/magic/spellSchool/SpellSchoolService";
import SpellSchool from "../knowledge/magic/spellSchool/SpellSchool";
import Item from "../crafting/item/Item";
import ItemService from "../crafting/item/ItemService";
import Currency from "../world/money/Currency";
import CurrencyService from "../world/money/CurrencyService";
import Language from "../world/language/Language";
import Religion from "../world/religion/Religion";
import LanguageService from "../world/language/LanguageService";
import ReligionService from "../world/religion/ReligionService";
import Nation from "../world/nation/Nation";

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

    constructor(action) {
        super('person', action);

        const hairColorService = new HairColorService(this.onRetrieveRelatedData(this.hairColors));
        const eyeColorService = new EyeColorService(this.onRetrieveRelatedData(this.eyeColors));
        const raceService = new RaceService(this.onRetrieveRelatedData(this.races));
        const professionClassService = new ProfessionClassService(this.onRetrieveRelatedData(this.professionClasses));
        const professionService = new ProfessionService(this.onRetrieveRelatedData(this.professions));
        const characterService = new CharacterService(this.onRetrieveRelatedData(this.personalities));
        const physicalFeatureService = new PhysicalFeatureService(this.onRetrieveRelatedData(this.physicalFeatures));
        const meleeWeaponService = new MeleeWeaponService(this.onRetrieveRelatedData(this.meleeWeapons));
        const rangedWeaponService = new RangedWeaponService(this.onRetrieveRelatedData(this.rangedWeapons));
        const armorService = new ArmorService(this.onRetrieveRelatedData(this.armors));
        const skillService = new SkillService(this.onRetrieveRelatedData(this.skills));
        const spellService = new SpellService(this.onRetrieveRelatedData(this.spells));
        const spellSchoolService = new SpellSchoolService(this.onRetrieveRelatedData(this.spellSchools));
        const itemService = new ItemService(this.onRetrieveRelatedData(this.items));
        const currencyService = new CurrencyService(this.onRetrieveRelatedData(this.currencies));
        const languageService = new LanguageService(this.onRetrieveRelatedData(this.languages));
        const religionService = new ReligionService(this.onRetrieveRelatedData(this.religions));
        const nationService = new NationService(this.onRetrieveRelatedData(this.nations));

        this.registerRelatedServices([hairColorService, eyeColorService,
            raceService, professionClassService, professionService,
            characterService, physicalFeatureService,
            meleeWeaponService, rangedWeaponService, armorService,
            skillService, spellService, spellSchoolService,
            itemService, currencyService, languageService, religionService,
            nationService]);
    }

    createNew(): Person {
        this.entity = new Person();
        return this.entity;
    }
}