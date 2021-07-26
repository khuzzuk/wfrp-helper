import {FieldType} from "entity/FieldType";

export enum ModelType {
    USER = 'USER',
    AUTHORITY = 'AUTHORITY',

    SKILL = 'SKILL',
}

export interface FieldDef {
    prop: string;
    type: FieldType;
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
            {prop: 'oneTimePassword', type: FieldType.BOOLEAN}
        ],
        form: [
            {prop: 'username', type: FieldType.TEXT}
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
            {prop: 'name', type: FieldType.TEXT}
        ],
        linked: []
    },
}

export default ModelConfig;