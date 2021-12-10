import {createSlice} from "@reduxjs/toolkit";

export const name = 'person';

export interface PersonState {}
export const initialState: PersonState = {};

const reducers = {
  generateNewStats: () => {},
}

const personSlice = createSlice({name, initialState, reducers});

export const {
  generateNewStats,
} = personSlice.actions;
export default personSlice.reducer;
