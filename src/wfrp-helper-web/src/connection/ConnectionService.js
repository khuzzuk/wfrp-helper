import {object} from "prop-types";
import Nation from "../world/nation/Nation";

class ConnectionService {
    static FormFieldType = {
        TEXT: 'text',
        TEXT_AREA: 'text_area',
        BOOLEAN: 'boolean',
        ENTITY_COMBOBOX: 'entity_combobox'
    };

    hostBase: string = 'http://localhost:1081/';
    uriPart: string;
    data: Array;
    action;
    entity;

    constructor(uriPart, action) {
        this.uriPart = uriPart;
        this.action = action;
    }

    register = (component, data) => {
        const socket = new WebSocket('ws:///localhost:1081/' + data);
        socket.addEventListener('message', async (event: any) => {
            const dataElement = JSON.parse(event.data);
            component.state.data.push(dataElement);
            component.setState({data: component.state.data})
        });
    };

    retrieveData() {
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

    async remove(entity: object) {
        fetch(this.hostBase + this.uriPart, {
            method: 'delete',
            mode: 'cors',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(entity)
        }).then(() => this.retrieveData())
    }

    setData(data: Array) {
        this.data = data;
        this.action(data)
    };

    edit(toEdit: *): Nation {
        this.entity = this.createNew();
        this.entity.updateWith(toEdit);
        return this.entity;
    }

    update = (property, value) => {
        this.entity.updateWith({[property]: value});
    };

}

export default ConnectionService;