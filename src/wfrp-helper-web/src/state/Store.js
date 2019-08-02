import ArmorBlueprintService from "../data/crafting/blueprint/ArmorBlueprintService";
import ConnectionService from "../connection/ConnectionService";
import MeleeWeaponBlueprintService from "../data/crafting/blueprint/MeleeWeaponBlueprintService";
import RangedWeaponBlueprintService from "../data/crafting/blueprint/RangedWeaponBlueprintService";
import ResourceService from "../data/crafting/resource/ResourceService";
import ArmorPatternService from "../data/crafting/item/armor/ArmorPatternService";
import ItemService from "../data/crafting/item/ItemService";
import ArmorService from "../data/crafting/item/armor/ArmorService";
import MeleeWeaponService from "../data/crafting/item/melee/MeleeWeaponService";
import RangedWeaponService from "../data/crafting/item/ranged/RangedWeaponService";
import JewelryService from "../data/crafting/item/jewelry/JewelryService";
import RealmService from "../data/world/realm/RealmService";
import ReligionService from "../data/world/religion/ReligionService";
import CurrencyService from "../data/world/money/CurrencyService";
import RaceService from "../data/world/race/RaceService";
import LanguageService from "../data/world/language/LanguageService";
import NationService from "../data/world/nation/NationService";
import SkillService from "../data/knowledge/skill/SkillService";
import SpellSchoolService from "../data/knowledge/magic/spellSchool/SpellSchoolService";
import SpellService from "../data/knowledge/magic/spell/SpellService";
import ProfessionClassService from "../data/knowledge/profession/ProfessionClassService";
import ProfessionService from "../data/knowledge/profession/ProfessionService";
import CharacterService from "../data/look/character/CharacterService";
import EyeColorService from "../data/look/eyeColor/EyeColorService";
import HairColorService from "../data/look/hairColor/HairColorService";
import PhysicalFeatureService from "../data/look/physicalFeatures/PhysicalFeatureService";
import AnimalService from "../data/creature/AnimalService";
import AnimalKindService from "../data/creature/AnimalKindService";
import PersonService from "../data/creature/PersonService";
import RealmDataService from "../data/world/realm/RealmDataService";

export default class Store {
    nationService = new NationService();
    languageService = new LanguageService();
    raceService = new RaceService();
    currencyService = new CurrencyService();
    religionService = new ReligionService();
    realmService = new RealmService();
    armorBlueprintService: ArmorBlueprintService = new ArmorBlueprintService();

    meleeWeaponBlueprintService: MeleeWeaponBlueprintService = new MeleeWeaponBlueprintService();
    rangedWeaponBlueprintService: RangedWeaponBlueprintService = new RangedWeaponBlueprintService();
    resourceService = new ResourceService();
    armorPatternService = new ArmorPatternService();
    itemService = new ItemService();
    armorService = new ArmorService();
    meleeWeaponService = new MeleeWeaponService();
    rangedWeaponService = new RangedWeaponService();
    jewelryService = new JewelryService();

    skillService = new SkillService();
    spellSchoolService = new SpellSchoolService();
    spellService = new SpellService();
    professionClassService = new ProfessionClassService();
    professionService = new ProfessionService();

    characterService = new CharacterService();
    eyeColorService = new EyeColorService();
    hairColorService = new HairColorService();
    physicalFeatureService = new PhysicalFeatureService();

    animalKindService = new AnimalKindService();
    animalService = new AnimalService();
    personService = new PersonService();

    realmDataService: RealmDataService = new RealmDataService();

    replaceData = (store: Array, service: ConnectionService) => data => {
        store.length = 0;
        data.forEach(entity => {
            const toPush = service.createNew();
            toPush.updateWith(entity);
            store.push(toPush);
        });
    };
}
