import {State} from "../state/State";
import {object} from "prop-types";

export default class Service {
    entityName: string;

    constructor(entityName: string) {
        this.entityName = entityName;
    }

    loadData = () => {
        State.fetching(this.entityName);
        fetch(this.entityName, {
            mode: 'cors'
        })
            .then(response => response.json())
            .then(data => data.map(entity => State.suppliers[this.entityName]().updateWith(entity)))
            .then(data => {
                State.update({[this.entityName]: data});
                State.fetchingFinished(this.entityName);
            })
    };
    save = (entity: object, onSuccess: VoidFunction) => {
        fetch(this.entityName, {
            method: 'post',
            mode: 'cors',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(entity)
        })
            .then(this.handleErrors)
            .then(this.loadData)
            .then(onSuccess);
    };
    delete(entity: object) {
        fetch(this.entityName, {
            method: 'delete',
            mode: 'cors',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(entity)
        })
            .then(this.handleErrors)
            .then(() => this.loadData())
    }

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
            throw response;
        }
        return response;
    };
}