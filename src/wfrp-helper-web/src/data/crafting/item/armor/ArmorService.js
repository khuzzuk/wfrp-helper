import ConnectionService from "../../../../connection/ConnectionService";
import FormFieldData from "../../../../crud/FormFieldData";
import NationService from "../../../world/nation/NationService";
import Armor from "./Armor";
import Availability from "../../../rule/Availability";

export default class ArmorService extends ConnectionService {
    title = 'Armor';
    data = [];
    resources = [];
    armorBlueprints = [];
    armorPatterns = [];

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
        suggestions: this.armorBlueprints
    }, {
        label: 'Pattern',
        name: 'armorPattern',
        type: NationService.FormFieldType.ENTITY_SELECT,
        suggestions: this.armorPatterns
    }];

    constructor() {
        super('armor');
    }

    createNew(): Armor {
        this.entity = new Armor();
        return this.entity;
    }
}