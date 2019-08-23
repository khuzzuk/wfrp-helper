import ConnectionService from "../../../../connection/ConnectionService";
import FormFieldData from "../../../../crud/FormFieldData";
import Availability from "../../../rule/Availability";
import Ammunition from "./Ammunition";

export default class AmmunitionService extends ConnectionService {
    title = 'Ammunition';
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
        type: ConnectionService.FormFieldType.TEXT
    }, {
        label: 'Description',
        name: 'description',
        type: ConnectionService.FormFieldType.TEXT_AREA
    }, {
        label: 'Weight',
        name: 'weight',
        type: ConnectionService.FormFieldType.FLOAT
    }, {
        label: 'Price',
        name: 'price',
        type: ConnectionService.FormFieldType.PRICE
    }, {
        label: 'Availability',
        name: 'availability',
        type: ConnectionService.FormFieldType.ENUM_SELECT,
        suggestions: Availability
    }, {
        label: 'Determinants',
        name: 'determinants',
        type: ConnectionService.FormFieldType.DETERMINANT,
    }, {
        label: 'Primary resource',
        name: 'primaryResource',
        type: ConnectionService.FormFieldType.ENTITY_SELECT,
        suggestions: this.resources
    }, {
        label: 'Secondary resource',
        name: 'secondaryResource',
        type: ConnectionService.FormFieldType.ENTITY_SELECT,
        suggestions: this.resources
    }, {
        label: 'Weapon types',
        name: 'weaponTypes',
        type: ConnectionService.FormFieldType.ENTITY_COMBOBOX,
        suggestions: this.rangedWeaponBlueprints
    }];

    constructor() {
        super('ammunition');
    }

    createNew(): Ammunition {
        this.entity = new Ammunition();
        return this.entity;
    }
}