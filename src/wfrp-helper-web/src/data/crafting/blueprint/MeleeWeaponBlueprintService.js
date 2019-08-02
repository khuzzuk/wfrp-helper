import ConnectionService from "../../../connection/ConnectionService";
import FormFieldData from "../../../crud/FormFieldData";
import {Placement} from "../Placement";
import MeleeWeaponBlueprint from "./MeleeWeaponBlueprint";

export default class MeleeWeaponBlueprintService extends ConnectionService {
    title = 'Melee weapon blueprint';
    data = [];

    tableColumns: FormFieldData[] = [
        {
            label: 'Name',
            name: 'name',
        }, {
            label: 'Description',
            name: 'description',
        }, {
            label: 'Suggested price',
            name: 'suggestedPrice',
            getter: price => price && (price.gold + 'g, ' + price.silver + 's, ' + price.lead + 'l')
        }, {
            label: 'Placement',
            name: 'placement',
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
        label: 'Suggested price',
        name: 'suggestedPrice',
        type: ConnectionService.FormFieldType.PRICE
    }, {
        label: 'Placement',
        name: 'placement',
        type: ConnectionService.FormFieldType.ENUM_COMBOBOX,
        suggestions: Placement.weapon()
    }, {
        label: 'Determinants',
        name: 'determinants',
        type: ConnectionService.FormFieldType.DETERMINANT,
    }, {
        label: 'Damage',
        name: 'damage',
        type: ConnectionService.FormFieldType.MODIFIER,
    }, {
        label: 'Prepare time',
        name: 'prepareTime',
        type: ConnectionService.FormFieldType.ACTION_TIME,
    }];

    constructor() {
        super('meleeWeaponBlueprint');
    }

    createNew(): MeleeWeaponBlueprint {
        this.entity = new MeleeWeaponBlueprint();
        return this.entity;
    }
}