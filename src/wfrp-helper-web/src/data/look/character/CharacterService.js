import ConnectionService from "../../../connection/ConnectionService";
import FormFieldData from "../../../crud/FormFieldData";
import Character from "./Character";

export default class CharacterService extends ConnectionService {
    title = 'Character';
    data = [];

    tableColumns: FormFieldData[] = [
        {
            label: 'Name',
            name: 'name',
        }, {
            label: 'Description',
            name: 'description',
        }
    ];

    formFields: FormFieldData[] = [{
        label: 'Name',
        name: 'name',
        type: ConnectionService.FormFieldType.TEXT
    }, {
        label: 'Description',
        name: 'description',
        type: ConnectionService.FormFieldType.TEXT_AREA
    }];

    constructor(action) {
        super('character', action);
    }

    createNew(): Character {
        this.entity = new Character();
        return this.entity;
    }
}