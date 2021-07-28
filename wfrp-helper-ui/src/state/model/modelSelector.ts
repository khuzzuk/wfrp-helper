import {AppDispatch, RootState} from "../Store";
import {ModelType} from "model/ModelConfig";
import {
   applyEntity,
   createNewEntity,
   deleteEntity,
   getEntities,
   saveEntity,
   setEntity,
   startEdit,
   updateEntityProperty
} from "./modelSlice";
import {connect} from "react-redux";

const mapStateToProps = (state: RootState) => ({
   table: state.model.table,
   form: state.model.form,
   model: state.model.model,
   entity: state.model.entity,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
   getEntities: (modelType: ModelType) => dispatch(getEntities(modelType)),
   setEntity: (entity: any) => dispatch(setEntity(entity)),
   startEdit: () => dispatch(startEdit()),
   createEntity: () => dispatch(createNewEntity()),
   deleteEntity: () => dispatch(deleteEntity()),
   updateEntityProp: (val: any, propName: string) => dispatch(updateEntityProperty({val, propName})),
   applyEdit: () => dispatch(applyEntity()),
   saveEdit: () => dispatch(saveEntity()),
});

const withModel = connect(mapStateToProps, mapDispatchToProps);
export default withModel;

export const tableSelector = (state: RootState) => state.model.table;
export const formSelector = (state: RootState) => state.model.form;
export const entitySelector = (state: RootState) => state.model.entity;
