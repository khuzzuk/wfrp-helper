import ConnectionService from "../../connection/ConnectionService";
import FormFieldData from "../../crud/FormFieldData";
import NationService from "../world/nation/NationService";
import AnimalKind from "./AnimalKind";
import Animal from "./Animal";
import AnimalKindService from "./AnimalKindService";

export default class AnimalService extends ConnectionService {
    title = 'Armor blueprint';
    data = [];
    animalKinds: AnimalKind[] = [];

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
        type: NationService.FormFieldType.TEXT
    }, {
        label: 'Description',
        name: 'description',
        type: NationService.FormFieldType.TEXT_AREA
    }, {
        label: 'Animal Kind',
        name: 'animalKind',
        type: NationService.FormFieldType.ENTITY_SELECT,
        suggestions: this.animalKinds
    }, {
        label: 'Determinants',
        name: 'determinants',
        type: NationService.FormFieldType.DETERMINANT,
    }];

    constructor(action) {
        super('animal', action);
        const animalKindService = new AnimalKindService(this.onRetrieveRelatedData(this.animalKinds));
        this.registerRelatedServices([animalKindService]);
    }

    createNew(): Animal {
        this.entity = new Animal();
        return this.entity;
    }
}