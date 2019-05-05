import ConnectionService from "../../../connection/ConnectionService";
import FormFieldData from "../../../crud/FormFieldData";
import Language from "./Language";
import NationService from "../nation/NationService";

class LanguageService extends ConnectionService {
    title = 'Language';
    data = [];
    nations = [];

    tableColumns: FormFieldData[] = [{
        label: 'Name',
        name: 'name',
        type: NationService.FormFieldType.TEXT
    }, {
        label: 'Description',
        name: 'description',
        type: NationService.FormFieldType.TEXT_AREA
    }];
    formFields: FormFieldData[] = [{
        label: 'Name',
        name: 'name',
        type: NationService.FormFieldType.TEXT
    }, {
        label: 'Description',
        name: 'description',
        type: NationService.FormFieldType.TEXT_AREA
    }, {
        label: 'Nations',
        name: 'nations',
        type: NationService.FormFieldType.ENTITY_COMBOBOX,
        suggestions: this.nations
    }];

    constructor(action) {
        super('worldLanguage', action);
        const nationService = new NationService(this.onRetrieveRelatedData(this.nations));
        this.registerRelatedServices([nationService]);
    }

    createNew(): Language {
        this.entity = new Language();
        return this.entity;
    }
}

export default LanguageService;