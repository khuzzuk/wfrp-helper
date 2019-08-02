import ConnectionService from "../../../connection/ConnectionService";
import FormFieldData from "../../../crud/FormFieldData";
import Currency from "./Currency";

export default class CurrencyService extends ConnectionService {
    title = 'Currency';
    data = [];
    nations = [];

    tableColumns: FormFieldData[] = [{
        label: 'Name',
        name: 'name',
    }, {
        label: 'Description',
        name: 'description',
    }, {
        label: 'Value',
        name: 'valueMultiplier',
    }];

    formFields: FormFieldData[] = [{
        label: 'Name',
        name: 'name',
        type: ConnectionService.FormFieldType.TEXT
    }, {
        label: 'Description',
        name: 'description',
        type: ConnectionService.FormFieldType.TEXT_AREA
    }, {
        label: 'Value',
        name: 'valueMultiplier',
        type: ConnectionService.FormFieldType.FLOAT
    }, {
        label: 'Nations',
        name: 'nations',
        type: ConnectionService.FormFieldType.ENTITY_COMBOBOX,
        suggestions: this.nations
    }];

    constructor() {
        super('currency');
    }

    createNew(): Currency {
        this.entity = new Currency();
        return this.entity;
    }
}