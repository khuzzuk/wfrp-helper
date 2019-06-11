import ConnectionService from "../../../connection/ConnectionService";
import FormFieldData from "../../../crud/FormFieldData";
import NationService from "../../world/nation/NationService";
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
        label: 'Suggested price',
        name: 'suggestedPrice',
        type: NationService.FormFieldType.PRICE
    }, {
        label: 'Minimum range',
        name: 'minimumRange',
        type: NationService.FormFieldType.INTEGER
    }, {
        label: 'Medium range',
        name: 'mediumRange',
        type: NationService.FormFieldType.INTEGER
    }, {
        label: 'Maximum range',
        name: 'maximumRange',
        type: NationService.FormFieldType.INTEGER
    }, {
        label: 'Placement',
        name: 'placement',
        type: NationService.FormFieldType.ENUM_COMBOBOX,
        suggestions: Placement.weapon()
    }, {
        label: 'Determinants',
        name: 'determinants',
        type: NationService.FormFieldType.DETERMINANT,
    }, {
        label: 'Damage',
        name: 'damage',
        type: NationService.FormFieldType.MODIFIER,
    }, {
        label: 'Prepare time',
        name: 'prepareTime',
        type: NationService.FormFieldType.ACTION_TIME,
    }];

    constructor(action) {
        super('rangedWeaponBlueprint', action);
    }

    createNew(): RangedWeaponBlueprint {
        this.entity = new RangedWeaponBlueprint();
        return this.entity;
    }
}