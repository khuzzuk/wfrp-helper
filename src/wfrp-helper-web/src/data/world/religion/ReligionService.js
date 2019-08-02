import ConnectionService from "../../../connection/ConnectionService";
import Nation from "../nation/Nation";
import Religion from "./Religion";
import FormFieldData from "../../../crud/FormFieldData";

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
        type: ConnectionService.FormFieldType.TEXT
    }, {
        label: 'Opis',
        name: 'description',
        type: ConnectionService.FormFieldType.TEXT_AREA
    }, {
        label: 'Kraje',
        name: 'nations',
        type: ConnectionService.FormFieldType.ENTITY_COMBOBOX,
        suggestions: this.nations
    }];

    constructor() {
        super('religion');
    }

    createNew(): Religion {
        this.entity = new Religion();
        return this.entity;
    }
}