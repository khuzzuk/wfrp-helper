import {object} from "prop-types";
import Entity from "../crud/Entity";
import {bus} from "../state/Bus";
import Message, {MessageType} from "../state/Message";

class ConnectionService {
    static FormFieldType = {
        TEXT: 'text',
        TEXT_AREA: 'text_area',
        BOOLEAN: 'boolean',
        INTEGER: 'integer',
        FLOAT: 'float',
        ENUM_SELECT: 'enum_select',
        ENUM_COMBOBOX: 'enum_combobox',
        ENTITY_SELECT: 'entity_select',
        ENTITY_COMBOBOX: 'entity_combobox',
        PRICE: 'price',
        ACTION_TIME: 'action_time',
        DETERMINANT: 'determinant',
        MODIFIER: 'modifier',
        BLUEPRINT_SELECT: 'blueprint_select',
    };
    static ANY: string = 'ANY';

    static hostBase: string = '';
    domain: string;
    data: Array;
    actions = [];
    entity;
    relatedServices: ConnectionService[] = [];

    constructor(domain: string) {
        this.domain = domain;
    }

    subscribeForEvents() {
        bus.subscribe(MessageType.FIND_ALL, this.domain, this.retrieveData);
        bus.subscribe(MessageType.SAVE, this.domain, entity => this.save(entity));
    }

    addDataListener(action) {
        this.actions.push(action);
    }

    registerRelatedServices = (services: ConnectionService[]) => {
        this.relatedServices = services;
    };

    retrieveData = () => {
        fetch(ConnectionService.hostBase + this.domain, {
            mode: 'cors'
        })
            .then(response => response.json())
            .then(data => {
                this.setData(data);
            })
            .catch(this.handleInternalErrors);
        this.relatedServices && this.relatedServices.forEach(service => service.retrieveData());
    };

    onRetrieveRelatedData = container => data => {
        container.length = 0;
        data.forEach(d => container.push(d));
    };

    save(entity: object) {
        fetch(ConnectionService.hostBase + this.domain, {
            method: 'post',
            mode: 'cors',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(entity)
        })
            .then(response => {
                this.handleErrors(response);
                this.retrieveData();
            })
            .catch(this.handleInternalErrors);
    }

    remove(entity: object) {
        fetch(ConnectionService.hostBase + this.domain, {
            method: 'delete',
            mode: 'cors',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(entity)
        })
            .then(this.handleErrors)
            .then(() => this.retrieveData())
            .catch(this.handleInternalErrors)
    }

    setData(data: Array) {
        this.data.length = 0;
        data.forEach(d => {
            const v = this.createNew();
            v.updateWith(d);
            this.data.push(v);
        });
        this.actions.forEach(action => action(this.data));
        bus.send(new Message(MessageType.ALL, this.domain, this.data));
        bus.send(new Message(MessageType.ALL, ConnectionService.ANY, this.data));
    };

    getData(): Array {
        return this.data;
    }

    edit(toEdit: *): Entity {
        this.relatedServices.forEach(service => service.retrieveData());
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
                    window.confirm(Array.from(new Set(value.errors
                        .map(e => 'cannot set field ' + e.field + ' with ' + e.rejectedValue + ', ' + e.message)))
                        .join('\n'));
                });
            } else if (response.status === 409) {
                message.then(value => {
                    window.confirm(value.errors[0].message);
                });
            }
        }
        return response;
    };

    handleInternalErrors = (error) => {
        console.error(error);
    };
}

export default ConnectionService;