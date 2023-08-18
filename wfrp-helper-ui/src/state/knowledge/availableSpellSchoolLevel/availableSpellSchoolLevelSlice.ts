import {SpellSchoolLevel} from "model/knowledge/SpellSchoolLevel";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export const name = 'spellSchoolLevels';

export interface SpellSchoolLevelState {
  available: SpellSchoolLevel[]
}
export const initialState = {
  available: []
}

const reducers = {
  getAvailableSpellSchoolLevels: (state: SpellSchoolLevelState) => {},
  setAvailableSpellSchoolLevels: (state: SpellSchoolLevelState, action: PayloadAction<SpellSchoolLevel[]>) => {
    state.available = action.payload;
  }
}

const availableSpellSchoolLevelSlice = createSlice({name, initialState, reducers});

export const {
  getAvailableSpellSchoolLevels,
  setAvailableSpellSchoolLevels,
} = availableSpellSchoolLevelSlice.actions;
export default availableSpellSchoolLevelSlice.reducer;
