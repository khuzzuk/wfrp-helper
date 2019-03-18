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
    action;

    constructor(action) {
        super('nation', action);
    }

    receiveData = (data) => {
        this.data = data;
        this.action(data);
    };

    setData(data: Array) {
        this.data = data;
        this.action(data);
    }

    getTableColumns(): Array {
        return this.tableColumns;
    }
}

export default NationService;