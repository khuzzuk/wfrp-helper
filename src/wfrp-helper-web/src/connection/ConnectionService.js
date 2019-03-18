import {func} from "prop-types";

class ConnectionService {
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
        fetch('http://localhost:1081/' + this.uriPart, {
            mode: 'cors'
        }).then(response => response.json())
            .then(data => {
                this.setData(data);
            })
    };

    setData(data: Array) {
        console.warn('setData not implemented');
        console.log('connection service setData action:');
        console.log(this.action);
        this.action(data)
    };

    getTableColumns(): Array {
        return [];
    }
}

export default ConnectionService;