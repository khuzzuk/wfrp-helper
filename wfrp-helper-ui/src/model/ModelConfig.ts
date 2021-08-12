import {FieldType} from "entity/FieldType";

export enum ModelType {
    USER = 'USER',
    AUTHORITY = 'AUTHORITY',

    SKILL = 'SKILL',
    PROFESSION_CLASS = 'PROFESSION_CLASS',
    NATION = 'NATION',
    RELIGION = 'RELIGION',
    RACE = 'RACE',
}

export interface FieldDef {
    prop: string;
    type: FieldType;
    linked?: ModelType;
}

export interface ModelDef {
    name: string;
    table: FieldDef[],
    form: FieldDef[],
}

let ModelConfig: {[key in ModelType]: ModelDef};
ModelConfig = {
    USER: {
        name: 'user',
        table: [
            {prop: 'username', type: FieldType.TEXT},
            {prop: 'oneTimePassword', type: FieldType.BOOLEAN},
        ],
        form: [
            {prop: 'username', type: FieldType.TEXT},
            {prop: 'oneTimePassword', type: FieldType.BOOLEAN},
        ],
    },

    AUTHORITY: {
        name: 'role',
        table: [
            {prop: 'authority', type: FieldType.TEXT}
        ],
        form: [
            {prop: 'authority', type: FieldType.TEXT}
        ],
    },

    SKILL: {
        name: 'skill',
        table: [
            {prop: 'name', type: FieldType.TEXT}
        ],
        form: [
            {prop: 'name', type: FieldType.TEXT},
            {prop: 'description', type: FieldType.TEXT},
        ],
    },

    PROFESSION_CLASS: {
        name: 'professionClass',
        table: [
            {prop: 'name', type: FieldType.TEXT}
        ],
        form: [
            {prop: 'name', type: FieldType.TEXT},
            {prop: 'description', type: FieldType.TEXT_AREA},
            {prop: 'skills', type: FieldType.ENTITY_MULTISELECT, linked: ModelType.SKILL},
        ],
    },

    NATION: {
        name: 'nation',
        table: [
            {prop: 'name', type: FieldType.TEXT}
        ],
        form: [
            {prop: 'name', type: FieldType.TEXT},
            {prop: 'description', type: FieldType.TEXT_AREA},
            {prop: 'names', type: FieldType.TEXT_ARRAY},
        ],
    },

    RELIGION: {
        name: 'religion',
        table: [
            {prop: 'name', type: FieldType.TEXT}
        ],
        form: [
            {prop: 'name', type: FieldType.TEXT},
            {prop: 'description', type: FieldType.TEXT_AREA},
            {prop: 'nations', type: FieldType.ENTITY_MULTISELECT, linked: ModelType.NATION},
        ],
    },
    RACE: {
        name: 'race',
        table: [
            {prop: 'name', type: FieldType.TEXT}
        ],
        form: [
            {prop: 'name', type: FieldType.TEXT},
            {prop: 'specialFeatures', type: FieldType.TEXT_AREA},
            {prop: 'determinants', type: FieldType.DETERMINANT},
            {prop: 'nations', type: FieldType.ENTITY_MULTISELECT, linked: ModelType.NATION},
        ],
    }
}

export default ModelConfig;