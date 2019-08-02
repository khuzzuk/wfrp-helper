import ConnectionService from "../../../connection/ConnectionService";
import FormFieldData from "../../../crud/FormFieldData";
import Realm from "./Realm";

export default class RealmService extends ConnectionService {
    title = 'Realm';
    data = [];
    nations = [];
    persons = [];

    tableColumns: FormFieldData[] = [{
        label: 'Nazwa',
        name: 'name',
        type: ConnectionService.FormFieldType.TEXT
    }, {
        label: 'Opis',
        name: 'description',
        type: ConnectionService.FormFieldType.TEXT_AREA
    }];

    formFields: FormFieldData[] = [{
        label: 'Nazwa',
        name: 'name',
        type: ConnectionService.FormFieldType.TEXT
    }, {
        label: 'Opis',
        name: 'description',
        type: ConnectionService.FormFieldType.TEXT_AREA
    }, {
        label: 'Kraje',
        name: 'nations',
        type: ConnectionService.FormFieldType.ENTITY_COMBOBOX,
        suggestions: this.nations
    }, {
        label: 'Bohaterowie',
        name: 'persons',
        type: ConnectionService.FormFieldType.ENTITY_COMBOBOX,
        suggestions: this.persons
    }];

    constructor() {
        super('realm');
    }

    createNew(): Realm {
        this.entity = new Realm();
        return this.entity;
    }
}