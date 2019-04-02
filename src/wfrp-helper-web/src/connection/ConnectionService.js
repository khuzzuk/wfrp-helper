import {func, object} from "prop-types";
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
        })
            .then(response => response.json())
            .then(data => {
                this.setData(data);
            })
            .catch(this.handleErrors)
    };

    save(entity: object, onSuccess: func) {
        fetch(this.hostBase + this.uriPart, {
            method: 'post',
            mode: 'cors',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(entity)
        })
            .then(response => {
                this.handleErrors(response);
                this.retrieveData();
                this.onSuccess(response, onSuccess);
            })
            .catch(this.handleErrors);
    }

    remove(entity: object) {
        fetch(this.hostBase + this.uriPart, {
            method: 'delete',
            mode: 'cors',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(entity)
        })
            .then(this.handleErrors)
            .then(() => this.retrieveData())
            .catch(this.handleErrors)
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

    onSuccess = (response, onSuccess) => {
        if (response.status === 200) {
            onSuccess();
        }
    };

    handleErrors = (response) => {
        if (response.status !== 200) {
            let message = response.json();

            if (response.status === 400) {
                message.then(value => {
                    console.log(value);
                    window.confirm(Array.from(new Set(value.errors
                        .map(e => 'cannot set field ' + e.field + ' with ' + e.rejectedValue + ', ' + e.message)))
                        .join('\n'));
                });
            } else if (response.status === 409) {
                message.then(value => {
                    console.log(value);
                    window.confirm(value.message);
                });
            }
        }
        return response;
    };
}

export default ConnectionService;