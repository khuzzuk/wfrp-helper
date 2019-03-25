import ConnectionService from "../../connection/ConnectionService";
import Nation from "./Nation";
import FormFieldData from "../../crud/FormFieldData";

class NationService extends ConnectionService {
    title = 'Nation';
    data = [];
    tableColumns: FormFieldData[] = [{
        label: 'Name',
        name: 'name',
        type: NationService.FormFieldType.TEXT
    }, {
        label: 'Description',
        name: 'description',
        type: NationService.FormFieldType.TEXT_AREA
    }];

    nation = new Nation();

    constructor(action) {
        super('nation', action);
    }

    getTableColumns(): Array {
        return this.tableColumns;
    }

    createNew(): Nation {
        this.nation = new Nation();
        return this.nation;
    }

    edit(toEdit: *): Nation {
        this.nation = new Nation();
        this.nation.updateWith(toEdit);
        return this.nation;
    }

    update = (property, value) => {
        this.nation.updateWith({[property]: value});
    };
}

export default NationService;