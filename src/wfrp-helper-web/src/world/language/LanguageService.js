import ConnectionService from "../../connection/ConnectionService";
import FormFieldData from "../../crud/FormFieldData";
import Language from "./Language";
import Nation from "../nation/Nation";
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
    }, {
        label: 'Nations',
        name: 'nations',
        type: NationService.FormFieldType.ENTITY_COMBOBOX,
        suggestions: this.nations
    }];

    nationService = new NationService((data) => this.refreshNations(data));
    language = new Language();

    refreshNations = (data) => {
        this.nations.length = 0;
        data.forEach(d => {
            this.nations.push({
                value: d.id,
                label: d.name
            });
        });
    };

    constructor(action) {
        super('worldLanguage', action);
    }

    getTableColumns(): Array {
        return this.tableColumns;
    }

    createNew(): Language {
        this.nationService.retrieveData();
        this.language = new Nation();
        return this.language;
    }

    edit(toEdit: *): Language {
        this.language = new Nation();
        this.language.updateWith(toEdit);
        return this.language;
    }

    update = (property, value) => {
        this.language.updateWith({[property]: value});
    };
}

export default LanguageService;