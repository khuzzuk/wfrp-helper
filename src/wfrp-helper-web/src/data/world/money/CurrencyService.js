import ConnectionService from "../../../connection/ConnectionService";
import FormFieldData from "../../../crud/FormFieldData";
import NationService from "../nation/NationService";
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
        type: NationService.FormFieldType.TEXT
    }, {
        label: 'Description',
        name: 'description',
        type: NationService.FormFieldType.TEXT_AREA
    }, {
        label: 'Value',
        name: 'valueMultiplier',
        type: NationService.FormFieldType.FLOAT
    }, {
        label: 'Nations',
        name: 'nations',
        type: NationService.FormFieldType.ENTITY_COMBOBOX,
        suggestions: this.nations
    }];

    constructor(action) {
        super('currency', action);

        const nationService = new NationService(this.onRetrieveRelatedData(this.nations));
        this.registerRelatedServices([nationService]);
    }

    createNew(): Currency {
        this.entity = new Currency();
        return this.entity;
    }
}