import ConnectionService from "../../connection/ConnectionService";
import Nation from "./Nation";

class NationService extends ConnectionService {
    data = [];
    tableColumns = [{
        header: 'Name',
        field: 'name'
    }, {
        header: 'Description',
        field: 'description'
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

    save = () => {
        this.nationService.save(this.nation);
        console.log(this.nation);
        return this.nation;
    };
}

export default NationService;