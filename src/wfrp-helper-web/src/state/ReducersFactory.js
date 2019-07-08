import {combineReducers} from "redux";
import {NationReducer} from "../data/world/nation/NationService";

export const reducers = combineReducers({
    nationReducer: NationReducer,
});