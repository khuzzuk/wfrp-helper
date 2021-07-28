import {FieldType} from "entity/FieldType";

export enum ModelType {
    USER = 'USER',
    AUTHORITY = 'AUTHORITY',

    SKILL = 'SKILL',
    PROFESSION_CLASS = 'PROFESSION_CLASS',
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
    linked: ModelType[],
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
        linked: [ModelType.AUTHORITY]
    },

    AUTHORITY: {
        name: 'role',
        table: [
            {prop: 'authority', type: FieldType.TEXT}
        ],
        form: [
            {prop: 'authority', type: FieldType.TEXT}
        ],
        linked: []
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
        linked: []
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
        linked: [ModelType.SKILL]
    }
}

export default ModelConfig;