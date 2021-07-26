import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import User, {Authority} from "../../model/user";
import {ModelType} from "./ModelConfig";

export const name = 'model';

export interface ModelState {
    table?: ModelType;
    form?: ModelType;
    entity?: any;

    model: { [key in ModelType]: any[] };
    users: User[];
    roles: Authority[];
}

const initialState: ModelState = {
    model: {
        USER: [],
        AUTHORITY: [],
    },
    users: [],
    roles: [],
};

const reducers = {
    getEntities: () => {},
    setEntities: (state: ModelState, action: PayloadAction<{ model: ModelType, entities: any[] }>) => {
        state.model[action.payload.model] = action.payload.entities;
    },
    setTable: (state: ModelState, action: PayloadAction<ModelType>) => {
        state.form = undefined;
        state.entity = undefined;
        state.table = action.payload;
    },
}

const modelSlice = createSlice({name, initialState, reducers});
export const {getEntities, setEntities, setTable} = modelSlice.actions;
export default modelSlice.reducer;