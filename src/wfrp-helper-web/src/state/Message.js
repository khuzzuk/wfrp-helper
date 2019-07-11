export const MessageType = {
    SAVE: 'SAVE',
    DELETE: 'DELETE',
    FIND: 'FIND',
    FIND_ALL: 'FIND_ALL',
    ALL: 'ALL',
    NEW_ENTITY: 'NEW_ENTITY',
    SET_ENTITY: 'SET_ENTITY',
    SET_PROP: 'SET_PROP',
};

export default class Message {
    type: string;
    domain: string;
    content: any;

    constructor(type: string, domain: string, content: *) {
        this.type = type;
        this.domain = domain;
        this.content = content;
    }
}