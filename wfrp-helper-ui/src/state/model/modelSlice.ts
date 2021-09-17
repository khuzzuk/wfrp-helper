import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import User, {Authority} from "model/user";
import {ModelType} from "model/ModelConfig";
import {BaseEntity} from "../../model/BaseEntity";

export const name = 'model';

export interface ModelState {
    table?: ModelType;
    form?: ModelType;
    entity?: BaseEntity;

    model: { [key in ModelType]: any[] };
    users: User[];
    roles: Authority[];
}

const initialState: ModelState = {
    model: {
        USER: [],
        AUTHORITY: [],
        SKILL: [],
        PROFESSION_CLASS: [],
        PROFESSION: [],
        SPELL_SCHOOL: [],
        SPELL: [],
        NATION: [],
        LANGUAGE: [],
        CURRENCY: [],
        RELIGION: [],
        RACE: [],
        PLACE: [],
        RESOURCE: [],
        ARMOR_PATTERN: [],
        ARMOR_BLUEPRINT: [],
        MELEE_WEAPON_BLUEPRINT: [],
        RANGED_WEAPON_BLUEPRINT: [],
        MISC_ITEM: [],
        JEWELRY: [],
        ARMOR: [],
        MELEE_WEAPON: [],
        RANGED_WEAPON: [],
        AMMUNITION: [],
        CHARACTER: [],
        EYE_COLOR: [],
        HAIR_COLOR: [],
        PHYSICAL_FEATURE: [],
        ANIMAL_KIND: [],
        ANIMAL: [],
        PERSON: [],
    },
    users: [],
    roles: [],
};

const reducers = {
    getEntities: (_state: ModelState, _action: PayloadAction<ModelType>) => {},
    setEntities: (state: ModelState, action: PayloadAction<{ model: ModelType, entities: any[] }>) => {
        state.model[action.payload.model] = action.payload.entities;
    },
    setTable: (state: ModelState, action: PayloadAction<ModelType | undefined>) => {
        state.form = undefined;
        state.entity = undefined;
        state.table = action.payload;
    },
    setEntity: (state: ModelState, action: PayloadAction<any>) => {
        state.entity = action.payload;
    },
    createNewEntity: () => {},
    deleteEntity: () => {},
    setForm: (state: ModelState, action: PayloadAction<ModelType>) => {
        state.form = action.payload;
        state.table = undefined;
    },
    startEdit: () => {},
    updateEntityProperty: (state: ModelState, action: PayloadAction<{ val: any, propName: string }>) => {
        (state.entity as any)[action.payload.propName] = action.payload.val;
    },
    applyEntity: () => {},
    saveEntity: () => {},
}

const modelSlice = createSlice({name, initialState, reducers});
export const {
    getEntities,
    setEntities,
    setTable,
    setForm,
    setEntity,
    createNewEntity,
    deleteEntity,
    startEdit,
    updateEntityProperty,
    applyEntity,
    saveEntity
} = modelSlice.actions;
export default modelSlice.reducer;