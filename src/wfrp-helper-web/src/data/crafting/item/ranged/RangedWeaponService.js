import ConnectionService from "../../../../connection/ConnectionService";
import FormFieldData from "../../../../crud/FormFieldData";
import NationService from "../../../world/nation/NationService";
import ResourceService from "../../resource/ResourceService";
import RangedWeapon from "./RangedWeapon";
import RangedWeaponBlueprintService from "../../blueprint/RangedWeaponBlueprintService";
import Availability from "../../../rule/Availability";

export default class ArmorService extends ConnectionService {
    title = 'Ranged weapon';
    data = [];
    resources = [];
    rangedWeaponBlueprints = [];

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
        suggestions: this.rangedWeaponBlueprints
    }];

    constructor(action) {
        super('rangedWeapon', action);

        const resourceService = new ResourceService(this.onRetrieveRelatedData(this.resources));
        const rangedWeaponBlueprintService = new RangedWeaponBlueprintService(this.onRetrieveRelatedData(this.rangedWeaponBlueprints));
        this.registerRelatedServices([resourceService, rangedWeaponBlueprintService]);
    }

    createNew(): RangedWeapon {
        this.entity = new RangedWeapon();
        return this.entity;
    }
}