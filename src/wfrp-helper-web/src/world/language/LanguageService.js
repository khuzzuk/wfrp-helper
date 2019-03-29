import ConnectionService from "../../connection/ConnectionService";
import FormFieldData from "../../crud/FormFieldData";
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

    nationService = new NationService((data) => this.refreshNations(data));

    refreshNations = (data) => {
        this.nations.length = 0;
        data.forEach(d => {
            this.nations.push(d);
        });
    };

    constructor(action) {
        super('worldLanguage', action);
        this.nationService.retrieveData();
    }

    getTableColumns(): Array {
        return this.tableColumns;
    }

    createNew(): Language {
        this.nationService.retrieveData();
        this.entity = new Language();
        return this.entity;
    }

    edit(toEdit: *): Language {
        this.nationService.retrieveData();
        return super.edit(toEdit);
    }
}

export default LanguageService;