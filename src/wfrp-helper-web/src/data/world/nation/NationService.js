import ConnectionService from "../../../connection/ConnectionService";
import Nation from "./Nation";
import FormFieldData from "../../../crud/FormFieldData";

class NationService extends ConnectionService {
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
        type: NationService.FormFieldType.TEXT
    }, {
        label: 'Opis',
        name: 'description',
        type: NationService.FormFieldType.TEXT_AREA
    }, {
        label: 'Imiona',
        name: 'names',
        type: NationService.FormFieldType.TEXT_AREA,
        toView: this.convertToField,
        toModel: this.convertToNames
    }];

    constructor(action) {
        super('nation', action);
        this.entity = new Nation();
    }

    getTableColumns(): Array {
        return this.tableColumns;
    }

    createNew(): Nation {
        this.entity = new Nation();
        return this.entity;
    }
}

export default NationService;