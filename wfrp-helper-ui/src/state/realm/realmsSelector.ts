import {RootState} from "../Store";
import {ModelType} from "../../model/ModelConfig";

export const realmSelector = (state: RootState) => state.model.model[ModelType.REALM];
