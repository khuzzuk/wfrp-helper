import ConnectionService from "../../../connection/ConnectionService";
import FormFieldData from "../../../crud/FormFieldData";
import NationService from "../nation/NationService";
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
        type: NationService.FormFieldType.TEXT
    }, {
        label: 'Special Features',
        name: 'specialFeatures',
        type: NationService.FormFieldType.TEXT_AREA
    }, {
        label: 'Determinants',
        name: 'determinants',
        type: NationService.FormFieldType.DETERMINANT,
    }];

    constructor(action) {
        super('race', action);
    }

    createNew(): Race {
        this.entity = new Race();
        return this.entity;
    }
}