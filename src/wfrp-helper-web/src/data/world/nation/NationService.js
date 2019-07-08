import ConnectionService from "../../../connection/ConnectionService";
import Nation from "./Nation";
import FormFieldData from "../../../crud/FormFieldData";
import {ActionType} from "../../../state/Actions";
import {STORE} from "../../../App";

export default class NationService extends ConnectionService {
    title = 'Nation';
    data = [];

    convertToNames = (namesAsString: string) => {
        return namesAsString.replace('\r', '').split('\n');
    };

    convertToField = (namesFromModel: string[]) => {
        return namesFromModel.join("\n");
    };

    tableColumns: FormFieldData[] = [{
        label: 'Nazwa',
        name: 'name',
    }, {
        label: 'Opis',
        name: 'description',
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
        label: 'Imiona',
        name: 'names',
        type: NationService.FormFieldType.TEXT_AREA,
        toView: this.convertToField,
        toModel: this.convertToNames
    }];

    constructor(action) {
        super('nation', action);
        this.entity = new Nation();
        STORE.subscribe(() => console.log(STORE.getState()));
        this.addDataListener(data => STORE.dispatch({type: 'NATIONS', data: 'data'}));
    }

    getTableColumns(): Array {
        return this.tableColumns;
    }

    createNew(): Nation {
        this.entity = new Nation();
        return this.entity;
    }
}

export const NationReducer = (state = [], action) => {
    if (ActionType.NATIONS === action.type) {
        return action.data;
    } else {
        return state;
    }
};

export class NationAction {
    type: string = ActionType.NATIONS;
    data: Nation[] = [];

    constructor(data: Nation[]) {
        this.data = data;
    }
}