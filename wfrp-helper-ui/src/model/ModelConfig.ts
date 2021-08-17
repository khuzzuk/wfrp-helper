import {FieldType} from "entity/FieldType";

export enum ModelType {
    USER = 'USER',
    AUTHORITY = 'AUTHORITY',

    SKILL = 'SKILL',
    PROFESSION_CLASS = 'PROFESSION_CLASS',
    PROFESSION = 'PROFESSION',
    NATION = 'NATION',
    LANGUAGE = 'LANGUAGE',
    CURRENCY = 'CURRENCY',
    MONEY = 'MONEY',
    RELIGION = 'RELIGION',
    RACE = 'RACE',
    PLACE = 'PLACE',
}

export interface FieldDef {
    prop: string;
    type: FieldType;
    linked?: ModelType;
    options?: (entity: any) => string;
    toView?: (value: any) => string;
    toModel?: (view: string) => any;
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

    PROFESSION: {
        name: 'profession',
        table: [
            {prop: 'name', type: FieldType.TEXT}
        ],
        form: [
            {prop: 'name', type: FieldType.TEXT},
            {prop: 'description', type: FieldType.TEXT_AREA},
            {prop: 'professionClass', type: FieldType.ENTITY_SELECT, linked: ModelType.PROFESSION_CLASS},
            {prop: 'skills', type: FieldType.ENTITY_MULTISELECT, linked: ModelType.SKILL},
            {prop: 'determinants', type: FieldType.DETERMINANT},
            {prop: 'nextProfessions', type: FieldType.ENUM_MULTISELECT, linked: ModelType.PROFESSION,
                options: p => p.name, toView: s => s, toModel: s => s}
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

    LANGUAGE: {
        name: 'worldLanguage',
        table: [
            {prop: 'name', type: FieldType.TEXT}
        ],
        form: [
            {prop: 'name', type: FieldType.TEXT},
            {prop: 'description', type: FieldType.TEXT_AREA},
            {prop: 'nations', type: FieldType.ENTITY_MULTISELECT, linked: ModelType.NATION},
        ],
    },
    CURRENCY: {
        name: 'currency',
        table: [
            {prop: 'name', type: FieldType.TEXT},
            {prop: 'valueMultiplier', type: FieldType.TEXT}
        ],
        form: [
            {prop: 'name', type: FieldType.TEXT},
            {prop: 'valueMultiplier', type: FieldType.FLOAT},
            {prop: 'description', type: FieldType.TEXT_AREA},
            {prop: 'nations', type: FieldType.ENTITY_MULTISELECT, linked: ModelType.NATION},
        ],
    },
    MONEY: {
        name: 'money',
        table: [],
        form: [],
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
    },

    PLACE: {
        name: 'place',
        table: [
            {prop: 'name', type: FieldType.TEXT}
        ],
        form: [
            {prop: 'name', type: FieldType.TEXT},
            {prop: 'description', type: FieldType.TEXT_AREA},
            {prop: 'nation', type: FieldType.ENTITY_SELECT, linked: ModelType.NATION},
        ],
    },
}

export default ModelConfig;