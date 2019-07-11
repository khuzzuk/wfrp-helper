import ArmorBlueprint from "../data/crafting/blueprint/ArmorBlueprint";
import MeleeWeaponBlueprint from "../data/crafting/blueprint/MeleeWeaponBlueprint";
import RangedWeaponBlueprint from "../data/crafting/blueprint/RangedWeaponBlueprint";
import ArmorBlueprintService from "../data/crafting/blueprint/ArmorBlueprintService";
import ConnectionService from "../connection/ConnectionService";
import MeleeWeaponBlueprintService from "../data/crafting/blueprint/MeleeWeaponBlueprintService";
import RangedWeaponBlueprintService from "../data/crafting/blueprint/RangedWeaponBlueprintService";

export default class Store {
    armorBlueprintService: ArmorBlueprintService = new ArmorBlueprintService(() => {});
    armorBlueprints: ArmorBlueprint[] = [];

    meleeWeaponBlueprintService: MeleeWeaponBlueprintService = new MeleeWeaponBlueprintService(() => {});
    meleeWeaponBlueprints: MeleeWeaponBlueprint[] = [];

    rangedWeaponBlueprintService: RangedWeaponBlueprintService = new RangedWeaponBlueprintService(() => {});
    rangedWeaponBlueprints: RangedWeaponBlueprint[] = [];

    replaceData = (store: Array, service: ConnectionService) => data => {
        store.length = 0;
        data.forEach(entity => {
            const toPush = service.createNew();
            toPush.updateWith(entity);
            store.push(toPush);
        });
    };
}
