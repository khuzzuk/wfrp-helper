import ConnectionService from "../../../../connection/ConnectionService";
import FormFieldData from "../../../../crud/FormFieldData";
import NationService from "../../../world/nation/NationService";
import Accessibility from "../../../rule/Accessibility";
import ArmorPattern from "./ArmorPattern";

export default class ArmorPatternService extends ConnectionService {
    title = 'Armor pattern';
    data = [];
    tableColumns: FormFieldData[] = [
        {
            label: 'Name',
            name: 'name',
        }, {
            label: 'Description',
            name: 'description',
        }, {
            label: 'Accessibility',
            name: 'accessibility',
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
        label: 'Price multiplier',
        name: 'priceMultiplier',
        type: NationService.FormFieldType.FLOAT
    }, {
        label: 'Weight',
        name: 'weight',
        type: NationService.FormFieldType.FLOAT
    }, {
        label: 'Strength',
        name: 'strength',
        type: NationService.FormFieldType.FLOAT
    }, {
        label: 'Accessibility',
        name: 'accessibility',
        type: NationService.FormFieldType.ENUM_SELECT,
        suggestions: Accessibility
    }];

    constructor(action) {
        super('armorPattern', action);
    }

    createNew(): ArmorPattern {
        this.entity = new ArmorPattern();
        return this.entity;
    }
}