import ConnectionService from "../../../../connection/ConnectionService";
import FormFieldData from "../../../../crud/FormFieldData";
import ArmorPattern from "./ArmorPattern";
import Availability from "../../../rule/Availability";

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
        label: 'Price multiplier',
        name: 'priceMultiplier',
        type: ConnectionService.FormFieldType.FLOAT
    }, {
        label: 'Weight',
        name: 'weight',
        type: ConnectionService.FormFieldType.FLOAT
    }, {
        label: 'Strength',
        name: 'strength',
        type: ConnectionService.FormFieldType.FLOAT
    }, {
        label: 'Availability',
        name: 'availability',
        type: ConnectionService.FormFieldType.ENUM_SELECT,
        suggestions: Availability
    }];

    constructor() {
        super('armorPattern');
    }

    createNew(): ArmorPattern {
        this.entity = new ArmorPattern();
        return this.entity;
    }
}