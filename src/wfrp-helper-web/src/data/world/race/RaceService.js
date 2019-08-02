import ConnectionService from "../../../connection/ConnectionService";
import FormFieldData from "../../../crud/FormFieldData";
import Race from "./Race";

export default class RaceService extends ConnectionService {
    title = 'Race';
    data = [];

    tableColumns: FormFieldData[] = [{
        label: 'Name',
        name: 'name',
    }, {
        label: 'Special features',
        name: 'specialFeatures',
    }];

    formFields: FormFieldData[] = [{
        label: 'Name',
        name: 'name',
        type: ConnectionService.FormFieldType.TEXT
    }, {
        label: 'Special Features',
        name: 'specialFeatures',
        type: ConnectionService.FormFieldType.TEXT_AREA
    }, {
        label: 'Determinants',
        name: 'determinants',
        type: ConnectionService.FormFieldType.DETERMINANT,
    }];

    constructor() {
        super('race');
    }

    createNew(): Race {
        this.entity = new Race();
        return this.entity;
    }
}