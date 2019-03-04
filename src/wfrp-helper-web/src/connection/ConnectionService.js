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

    async retrieveData(action) {
        fetch('http://localhost:1081/' + this.uriPart, {
            mode: 'cors'
        }).then(response => response.json())
            .then(data => action(data))
    };

    doSomething(action) {
        action([{asd: '1', bsd:'2'}, {asd:'2', bsd:'3'}]);
    }
}

export default ConnectionService;