import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export const name = 'uiState';
export interface UiState {
  loadings: string[];
}

const initialState: UiState = {loadings: []}
const reducers = {
  loading: (state: UiState, action: PayloadAction<string>) => {
    state.loadings = [...state.loadings, action.payload];
  },
  loadingFinished: (state: UiState, action: PayloadAction<string>) => {
    state.loadings = state.loadings.filter(value => value !== action.payload);
  }
}

export const uiSlice = createSlice({name, initialState, reducers});
export const {loading, loadingFinished} = uiSlice.actions;
export default uiSlice.reducer;
