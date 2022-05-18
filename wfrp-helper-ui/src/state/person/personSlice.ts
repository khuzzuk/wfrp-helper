import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {DeterminantType} from "../../model/rule/DeterminantType";

export const name = 'person';

export interface PersonState {}
export const initialState: PersonState = {};

const reducers = {
  generateNewStats: () => {},
  tryAddExtension: (state: PersonState, action: PayloadAction<DeterminantType>) => {},
  tryRemoveExtension: (state: PersonState, action: PayloadAction<DeterminantType>) => {},
}

const personSlice = createSlice({name, initialState, reducers});

export const {
  generateNewStats,
  tryAddExtension,
  tryRemoveExtension,
} = personSlice.actions;
export default personSlice.reducer;
