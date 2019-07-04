import ConnectionService from "../../../connection/ConnectionService";
import FormFieldData from "../../../crud/FormFieldData";
import NationService from "../nation/NationService";
import PersonService from "../../creature/PersonService";
import Realm from "./Realm";

export default class RealmService extends ConnectionService {
    title = 'Realm';
    data = [];
    nations = [];
    persons = [];

    tableColumns: FormFieldData[] = [{
        label: 'Nazwa',
        name: 'name',
        type: NationService.FormFieldType.TEXT
    }, {
        label: 'Opis',
        name: 'description',
        type: NationService.FormFieldType.TEXT_AREA
    }];

    formFields: FormFieldData[] = [{
        label: 'Nazwa',
        name: 'name',
        type: NationService.FormFieldType.TEXT
    }, {
        label: 'Opis',
        name: 'description',
        type: NationService.FormFieldType.TEXT_AREA
    }, {
        label: 'Kraje',
        name: 'nations',
        type: NationService.FormFieldType.ENTITY_COMBOBOX,
        suggestions: this.nations
    }, {
        label: 'Bohaterowie',
        name: 'persons',
        type: NationService.FormFieldType.ENTITY_COMBOBOX,
        suggestions: this.persons
    }];

    constructor(action) {
        super('realm', action);
        const nationService = new NationService(this.onRetrieveRelatedData(this.nations));
        const personService = new PersonService(this.onRetrieveRelatedData(this.persons));
        this.registerRelatedServices([nationService, personService])
    }

    createNew(): Realm {
        this.entity = new Realm();
        return this.entity;
    }
}