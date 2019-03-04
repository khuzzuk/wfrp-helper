class NationService {
    data = [];
    editables = [{
        header: 'Name',
        field: 'name'
    }, {
        header: 'Description',
        field: 'description'
    }];
    dataReceiver;


    constructor(dataReceiver) {
        this.dataReceiver = dataReceiver;
    }

    receiveData = (data) => {
        this.data = data;
    }
}

export default NationService;