import ConnectionService from "../../../connection/ConnectionService";
import FormFieldData from "../../../crud/FormFieldData";
import {Placement} from "../Placement";
import RangedWeaponBlueprint from "./RangedWeaponBlueprint";

export default class RangedWeaponBlueprintService extends ConnectionService {
    title = 'Ranged weapon blueprint';
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
            label: 'Min',
            name: 'minimumRange',
        }, {
            label: 'Med',
            name: 'mediumRange',
        }, {
            label: 'Max',
            name: 'maximumRange',
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
        label: 'Minimum range',
        name: 'minimumRange',
        type: ConnectionService.FormFieldType.INTEGER
    }, {
        label: 'Medium range',
        name: 'mediumRange',
        type: ConnectionService.FormFieldType.INTEGER
    }, {
        label: 'Maximum range',
        name: 'maximumRange',
        type: ConnectionService.FormFieldType.INTEGER
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
        super('rangedWeaponBlueprint');
    }

    createNew(): RangedWeaponBlueprint {
        this.entity = new RangedWeaponBlueprint();
        return this.entity;
    }
}