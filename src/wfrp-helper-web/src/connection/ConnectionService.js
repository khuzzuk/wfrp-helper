class ConnectionService {
    uriPart;

    constructor(uriPart) {
        this.uriPart = uriPart;
    }

    register = (component, data) => {
        const socket = new WebSocket('ws:///localhost:1081/' + data)
        socket.addEventListener('message', async (event: any) => {
            const dataElement = JSON.parse(event.data);
            component.state.data.push(dataElement);
            component.setState({data: component.state.data})
        });
    };

    async retrieveData(component) {
        const response = await fetch('http://' + this.uriPart);
        const retrieved = await response.json();
        component.setState({data: retrieved})
    };
}

export default ConnectionService;