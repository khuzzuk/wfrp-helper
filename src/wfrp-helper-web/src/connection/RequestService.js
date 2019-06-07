import {func, object} from "prop-types";
import ConnectionService from "./ConnectionService";

export default class RequestService {
    requestFor(data: object, uri: string, onResponse: func) {
        let jsonBody = JSON.stringify(data);
        fetch(ConnectionService.hostBase + uri, {
            method: 'post',
            mode: 'cors',
            headers: {'Content-Type': 'application/json'},
            body: jsonBody
        }).then(this.handleResponse(onResponse));
    }

    async rawGetRequestFor(uri: string, onResponse: func) {
        fetch(ConnectionService.hostBase + uri, {
            method: 'get',
            mode: 'cors',
        }).then(this.handleRawResponse(onResponse))
    }

    handleRawResponse = onResponse => response => {
        if (response.status === 200) {
            response.text().then(onResponse);
        }
    };

    handleResponse = onResponse => response => {
        if (response.status === 200) {
            response.json().then(onResponse);
        }
    };
}