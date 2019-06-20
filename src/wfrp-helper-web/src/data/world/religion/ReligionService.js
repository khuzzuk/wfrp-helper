import ConnectionService from "../../../connection/ConnectionService";
import Nation from "../nation/Nation";
import Religion from "./Religion";
import FormFieldData from "../../../crud/FormFieldData";
import NationService from "../nation/NationService";

export default class ReligionService extends ConnectionService {
    title = 'Religion';
    data:Religion[] = [];
    nations: Nation[] = [];

    tableColumns: FormFieldData[] = [{
        label: 'Nazwa',
        name: 'name',
    }, {
        label: 'Opis',
        name: 'description',
    }];

    formFields: FormFieldData[] = [{
        label: 'Nazwa',
        name: 'name',
        type: NationService.FormFieldType.TEXT
    }, {
        label: 'Opis',
        name: 'description',
        type: NationService.FormFieldType.TEXT_AREA
    }, {
        label: 'Kraje',
        name: 'nations',
        type: NationService.FormFieldType.ENTITY_COMBOBOX,
        suggestions: this.nations
    }];

    constructor(action) {
        super('religion', action);
        const nationService = new NationService(this.onRetrieveRelatedData(this.nations));
        this.registerRelatedServices([nationService]);
    }

    createNew(): Religion {
        this.entity = new Religion();
        return this.entity;
    }
}