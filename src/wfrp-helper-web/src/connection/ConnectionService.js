import {object} from "prop-types";

class ConnectionService {
    hostBase: string = 'http://localhost:1081/';
    uriPart: string;
    data: Array;
    action;

    constructor(uriPart, action) {
        this.uriPart = uriPart;
        this.action = action;
        console.log('connection service action:');
        console.log(action);
    }

    register = (component, data) => {
        const socket = new WebSocket('ws:///localhost:1081/' + data);
        socket.addEventListener('message', async (event: any) => {
            const dataElement = JSON.parse(event.data);
            component.state.data.push(dataElement);
            component.setState({data: component.state.data})
        });
    };

    async retrieveData() {
        fetch(this.hostBase + this.uriPart, {
            mode: 'cors'
        }).then(response => response.json())
            .then(data => {
                this.setData(data);
            })
    };

    async save(entity: object) {
        fetch(this.hostBase + this.uriPart, {
            method: 'post',
            mode: 'cors',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(entity)
        }).then(() => this.retrieveData())
    }

    setData(data: Array) {
        this.data = data;
        this.action(data)
    };

    getTableColumns(): Array {
        console.warn("getTableColumns not implemented");
        return [];
    }
}

export default ConnectionService;