import {object} from "prop-types";
import ConnectionService from "./ConnectionService";

export default class RequestService {
    async requestFor(data: object, uri: string) {
        const response = await fetch(ConnectionService.hostBase + uri, {
            method: 'post',
            mode: 'cors',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        });
        const json = await response.json();
        return json;
    }
}