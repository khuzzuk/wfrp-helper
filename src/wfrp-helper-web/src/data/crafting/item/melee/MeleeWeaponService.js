import ConnectionService from "../../../../connection/ConnectionService";
import FormFieldData from "../../../../crud/FormFieldData";
import NationService from "../../../world/nation/NationService";
import ResourceService from "../../resource/ResourceService";
import MeleeWeaponBlueprintService from "../../blueprint/MeleeWeaponBlueprintService";
import MeleeWeapon from "./MeleeWeapon";
import Availability from "../../../rule/Availability";

export default class MeleeWeaponService extends ConnectionService {
    title = 'Melee weapon';
    data = [];
    resources = [];
    meleeWeaponBlueprints = [];

    tableColumns: FormFieldData[] = [
        {
            label: 'Name',
            name: 'name',
        }, {
            label: 'Description',
            name: 'description',
        }, {
            label: 'Price',
            name: 'price',
            getter: price => price && (price.gold + 'g, ' + price.silver + 's, ' + price.lead + 'l')
        }, {
            label: 'Availability',
            name: 'availability',
        }
    ];

    formFields: FormFieldData[] = [{
        label: 'Name',
        name: 'name',
        type: NationService.FormFieldType.TEXT
    }, {
        label: 'Description',
        name: 'description',
        type: NationService.FormFieldType.TEXT_AREA
    }, {
        label: 'Weight',
        name: 'weight',
        type: NationService.FormFieldType.FLOAT
    }, {
        label: 'Price',
        name: 'price',
        type: NationService.FormFieldType.PRICE
    }, {
        label: 'Availability',
        name: 'availability',
        type: NationService.FormFieldType.ENUM_SELECT,
        suggestions: Availability
    }, {
        label: 'Determinants',
        name: 'determinants',
        type: NationService.FormFieldType.DETERMINANT,
    }, {
        label: 'Primary resource',
        name: 'primaryResource',
        type: NationService.FormFieldType.ENTITY_SELECT,
        suggestions: this.resources
    }, {
        label: 'Secondary resource',
        name: 'secondaryResource',
        type: NationService.FormFieldType.ENTITY_SELECT,
        suggestions: this.resources
    }, {
        label: 'Type',
        name: 'type',
        type: NationService.FormFieldType.ENTITY_SELECT,
        suggestions: this.meleeWeaponBlueprints
    }];

    constructor(action) {
        super('meleeWeapon', action);

        const resourceService = new ResourceService(this.onRetrieveRelatedData(this.resources));
        const meleeWeaponBlueprintService = new MeleeWeaponBlueprintService(this.onRetrieveRelatedData(this.meleeWeaponBlueprints));
        this.registerRelatedServices([resourceService, meleeWeaponBlueprintService]);
    }

    createNew(): MeleeWeapon {
        this.entity = new MeleeWeapon();
        return this.entity;
    }
}