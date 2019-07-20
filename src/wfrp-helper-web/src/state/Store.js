import ArmorBlueprint from "../data/crafting/blueprint/ArmorBlueprint";
import MeleeWeaponBlueprint from "../data/crafting/blueprint/MeleeWeaponBlueprint";
import RangedWeaponBlueprint from "../data/crafting/blueprint/RangedWeaponBlueprint";
import ArmorBlueprintService from "../data/crafting/blueprint/ArmorBlueprintService";
import ConnectionService from "../connection/ConnectionService";
import MeleeWeaponBlueprintService from "../data/crafting/blueprint/MeleeWeaponBlueprintService";
import RangedWeaponBlueprintService from "../data/crafting/blueprint/RangedWeaponBlueprintService";
import ResourceService from "../data/crafting/resource/ResourceService";
import Resource from "../data/crafting/resource/Resource";
import ArmorPatternService from "../data/crafting/item/armor/ArmorPatternService";
import ArmorPattern from "../data/crafting/item/armor/ArmorPattern";
import ItemService from "../data/crafting/item/ItemService";
import Item from "../data/crafting/item/Item";
import ArmorService from "../data/crafting/item/armor/ArmorService";
import Armor from "../data/crafting/item/armor/Armor";
import MeleeWeaponService from "../data/crafting/item/melee/MeleeWeaponService";
import MeleeWeapon from "../data/crafting/item/melee/MeleeWeapon";
import RangedWeaponService from "../data/crafting/item/ranged/RangedWeaponService";
import RangedWeapon from "../data/crafting/item/ranged/RangedWeapon";
import JewelryService from "../data/crafting/item/jewelry/JewelryService";
import Jewelry from "../data/crafting/item/jewelry/Jewelry";
import RealmService from "../data/world/realm/RealmService";
import ReligionService from "../data/world/religion/ReligionService";
import CurrencyService from "../data/world/money/CurrencyService";
import RaceService from "../data/world/race/RaceService";
import LanguageService from "../data/world/language/LanguageService";
import NationService from "../data/world/nation/NationService";
import Nation from "../data/world/nation/Nation";
import Language from "../data/world/language/Language";
import Realm from "../data/world/realm/Realm";
import Religion from "../data/world/religion/Religion";
import Currency from "../data/world/money/Currency";
import Race from "../data/world/race/Race";

export default class Store {
    nationService = new NationService();
    nations: Nation = [];
    languageService = new LanguageService();
    languages: Language[] = [];
    raceService = new RaceService();
    races: Race[] = [];
    currencyService = new CurrencyService();
    currencies: Currency[] = [];
    religionService = new ReligionService();
    religions: Religion[] = [];
    realmService = new RealmService();
    realms: Realm[] = [];

    armorBlueprintService: ArmorBlueprintService = new ArmorBlueprintService();
    armorBlueprints: ArmorBlueprint[] = [];
    meleeWeaponBlueprintService: MeleeWeaponBlueprintService = new MeleeWeaponBlueprintService();
    meleeWeaponBlueprints: MeleeWeaponBlueprint[] = [];
    rangedWeaponBlueprintService: RangedWeaponBlueprintService = new RangedWeaponBlueprintService();
    rangedWeaponBlueprints: RangedWeaponBlueprint[] = [];

    resourceService = new ResourceService();
    resources: Resource[] = [];
    armorPatternService = new ArmorPatternService();
    armorPatterns: ArmorPattern[] = [];
    itemService = new ItemService();
    items: Item[] = [];
    armorService = new ArmorService();
    armors: Armor[] = [];
    meleeWeaponService = new MeleeWeaponService();
    meleeWeapons: MeleeWeapon[] = [];
    rangedWeaponService = new RangedWeaponService();
    rangedWeapons: RangedWeapon[] = [];
    jewelryService = new JewelryService();
    jewelries: Jewelry[] = [];

    replaceData = (store: Array, service: ConnectionService) => data => {
        store.length = 0;
        data.forEach(entity => {
            const toPush = service.createNew();
            toPush.updateWith(entity);
            store.push(toPush);
        });
    };
}
