import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Placement} from "model/crafting/Placement";

export const name = 'gear';

export interface GearState {
    armorStats: {[key in Placement]?: number};
    ids: number[];
}
export const initialState: GearState = {
    armorStats: {},
    ids: [],
};

const reducers = {
    getArmorStats: (state: GearState, action: PayloadAction<number[]>) => {},

    setArmorStats: (state: GearState, action: PayloadAction<{[key in Placement]?: number}>) => {
        state.armorStats = action.payload;
    },
    setCurrentIds: (state: GearState, action: PayloadAction<number[]>) => {
        state.ids = action.payload;
    },
}

const gearSlice = createSlice({name, initialState, reducers});

export const {
    getArmorStats,
    setArmorStats,
    setCurrentIds,
} = gearSlice.actions;
export default gearSlice.reducer;
