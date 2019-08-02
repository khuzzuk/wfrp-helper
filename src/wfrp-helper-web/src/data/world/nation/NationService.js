import ConnectionService from "../../../connection/ConnectionService";
import Nation from "./Nation";
import FormFieldData from "../../../crud/FormFieldData";

export default class NationService extends ConnectionService {
    title = 'Nation';
    data = [];

    convertToNames = (namesAsString: string) => {
        return namesAsString.replace('\r', '').split('\n');
    };

    convertToField = (namesFromModel: string[]) => {
        return namesFromModel.join("\n");
    };

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
        label: 'Imiona',
        name: 'names',
        type: ConnectionService.FormFieldType.TEXT_AREA,
        toView: this.convertToField,
        toModel: this.convertToNames
    }];

    constructor() {
        super('nation');

    }

    createNew(): Nation {
        this.entity = new Nation();
        return this.entity;
    }
}
