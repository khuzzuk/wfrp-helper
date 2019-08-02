import ConnectionService from "../../../connection/ConnectionService";
import FormFieldData from "../../../crud/FormFieldData";
import Language from "./Language";

class LanguageService extends ConnectionService {
    title = 'Language';
    data = [];
    nations = [];

    tableColumns: FormFieldData[] = [{
        label: 'Name',
        name: 'name',
        type: ConnectionService.FormFieldType.TEXT
    }, {
        label: 'Description',
        name: 'description',
        type: ConnectionService.FormFieldType.TEXT_AREA
    }];
    formFields: FormFieldData[] = [{
        label: 'Name',
        name: 'name',
        type: ConnectionService.FormFieldType.TEXT
    }, {
        label: 'Description',
        name: 'description',
        type: ConnectionService.FormFieldType.TEXT_AREA
    }, {
        label: 'Nations',
        name: 'nations',
        type: ConnectionService.FormFieldType.ENTITY_COMBOBOX,
        suggestions: this.nations
    }];

    constructor() {
        super('worldLanguage');
    }

    createNew(): Language {
        this.entity = new Language();
        return this.entity;
    }
}

export default LanguageService;