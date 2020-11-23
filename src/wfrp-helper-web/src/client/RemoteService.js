import {State} from "../state/State";

const logoutCodes = [401, 403, 405, 302];

export default class RemoteService {
    requestFor(data: object, uri: string, onResponse: VoidFunction) {
        const jsonBody = JSON.stringify(data);
        fetch(uri, {
            method: 'post',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': 'Bearer ' + State.data.currentUser.token
            },
            body: jsonBody
        }).then(this.handleResponse(onResponse));
    }

    postRequestWithoutResponse(data: object, uri: string, onResponse: VoidFunction) {
        const jsonBody = JSON.stringify(data);
        fetch(uri, {
            method: 'post',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': 'Bearer ' + State.data.currentUser.token
            },
            body: jsonBody
        }).then(this.handleRawResponse(onResponse));
    }

    requestForPath(uri: string, onResponse: VoidFunction) {
        fetch(uri, {
            method: 'get',
            mode: 'cors',
            headers: {
                // 'Authorization': 'Bearer ' + State.data.currentUser.token
            },
        }).then(this.handleResponse(onResponse))
        .catch(reason => console.log(reason));
    }

    rawGetRequestFor(uri: string, onResponse: VoidFunction) {
        fetch(uri, {
            method: 'get',
            mode: 'cors',
            headers: {
                // 'Authorization': 'Bearer ' + State.data.currentUser.token
            },
        }).then(this.handleRawResponse(onResponse))
    }

    rawPostRequest(uri: string, data: object, onResponse: VoidFunction) {
        fetch(uri, {
            method: 'post',
            mode: 'cors',
            headers: {
                // 'Authorization': 'Bearer ' + State.data.currentUser.token
            },
            body: data,
        }).then(this.handleRawResponse(onResponse))
    }

    handleRawResponse = onResponse => response => {
        if (response.status === 200) {
            response.text().then(onResponse);
        } else if (logoutCodes.includes(response.status)) {
            State.updateUser({token: null})
        } else {
            console.warn(response.status);
        }
    };

    handleResponse = onResponse => response => {
        if (response.status === 200) {
            response.json().then(onResponse);
        } else if (logoutCodes.includes(response.status)) {
            State.updateUser({token: false})
        } else {
            console.warn(response.status);
        }
    };
}