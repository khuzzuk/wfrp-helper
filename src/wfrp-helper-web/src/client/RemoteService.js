import {State} from "../state/State";

export default class RemoteService {
    requestFor(data: object, uri: string, onResponse: VoidFunction) {
        let jsonBody = JSON.stringify(data);
        fetch(uri, {
            method: 'post',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + State.data.user.token
            },
            body: jsonBody
        }).then(this.handleResponse(onResponse));
    }

    requestForPath(uri: string, onResponse: VoidFunction) {
        fetch(uri, {
            method: 'get',
            mode: 'cors',
            headers: {
                'Authorization': 'Bearer ' + State.data.user.token
            },
        }).then(this.handleResponse(onResponse));
    }

    rawGetRequestFor(uri: string, onResponse: VoidFunction) {
        fetch(uri, {
            method: 'get',
            mode: 'cors',
            headers: {
                'Authorization': 'Bearer ' + State.data.user.token
            },
        }).then(this.handleRawResponse(onResponse))
    }

    handleRawResponse = onResponse => response => {
        if (response.status === 200) {
            response.text().then(onResponse);
        } else if (response.status === 403 || response.status === 401) {
            State.updateUser({token: null})
        } else {
            console.warn(response.status);
        }
    };

    handleResponse = onResponse => response => {
        if (response.status === 200) {
            response.json().then(onResponse);
        } else if (response.status === 403 || response.status === 401) {
            State.updateUser({token: null})
        } else {
            console.warn(response.status);
        }
    };
}