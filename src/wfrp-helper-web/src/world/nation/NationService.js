import ConnectionService from "../../connection/ConnectionService";

class NationService extends ConnectionService {
    data = [];
    tableColumns = [{
        header: 'Name',
        field: 'name'
    }, {
        header: 'Description',
        field: 'description'
    }];

    constructor(action) {
        super('nation', action);
    }

    getTableColumns(): Array {
        return this.tableColumns;
    }
}

export default NationService;