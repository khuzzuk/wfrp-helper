import ConnectionService from "../../../connection/ConnectionService";
import FormFieldData from "../../../crud/FormFieldData";
import ArmorBlueprint from "./ArmorBlueprint";
import {Placement} from "../Placement";

export default class ArmorBlueprintService extends ConnectionService {
    title = 'Armor blueprint';
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
        label: 'Suggested weight',
        name: 'suggestedWeight',
        type: ConnectionService.FormFieldType.FLOAT
    }, {
        label: 'Suggested price',
        name: 'suggestedPrice',
        type: ConnectionService.FormFieldType.PRICE
    }, {
        label: 'Placement',
        name: 'placement',
        type: ConnectionService.FormFieldType.ENUM_COMBOBOX,
        suggestions: Placement.armor()
    }, {
        label: 'Determinants',
        name: 'determinants',
        type: ConnectionService.FormFieldType.DETERMINANT,
    }];

    constructor() {
        super('armorBlueprint');
    }

    createNew(): ArmorBlueprint {
        this.entity = new ArmorBlueprint();
        return this.entity;
    }
}