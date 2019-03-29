import ConnectionService from "../../connection/ConnectionService";
import Nation from "./Nation";
import FormFieldData from "../../crud/FormFieldData";

class NationService extends ConnectionService {
    title = 'Nation';
    data = [];
    tableColumns: FormFieldData[] = [{
        label: 'Name',
        name: 'name',
    }, {
        label: 'Description',
        name: 'description',
    }];
    formFields: FormFieldData[] = [{
        label: 'Name',
        name: 'name',
        type: NationService.FormFieldType.TEXT
    }, {
        label: 'Description',
        name: 'description',
        type: NationService.FormFieldType.TEXT_AREA

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