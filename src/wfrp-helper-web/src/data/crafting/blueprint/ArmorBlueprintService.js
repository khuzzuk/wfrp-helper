import ConnectionService from "../../../connection/ConnectionService";
import FormFieldData from "../../../crud/FormFieldData";
import NationService from "../../world/nation/NationService";
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
        type: NationService.FormFieldType.TEXT
    }, {
        label: 'Description',
        name: 'description',
        type: NationService.FormFieldType.TEXT_AREA
    }, {
        label: 'Suggested weight',
        name: 'suggestedWeight',
        type: NationService.FormFieldType.FLOAT
    }, {
        label: 'Suggested price',
        name: 'suggestedPrice',
        type: NationService.FormFieldType.PRICE
    }, {
        label: 'Placement',
        name: 'placement',
        type: NationService.FormFieldType.ENUM_COMBOBOX,
        suggestions: Placement.armor()
    }, {
        label: 'Determinants',
        name: 'determinants',
        type: NationService.FormFieldType.DETERMINANT,
    }];

    constructor(action) {
        super('armorBlueprint', action);
    }

    createNew(): ArmorBlueprint {
        this.entity = new ArmorBlueprint();
        return this.entity;
    }
}