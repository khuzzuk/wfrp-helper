import {AppDispatch, RootState} from "../Store";
import {ModelType} from "./ModelConfig";
import {getEntities} from "./modelSlice";
import {connect} from "react-redux";

const mapStateToProps = (state: RootState) => ({
   table: state.model.table,
   model: state.model.model
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
   getEntities: (modelType: ModelType) => dispatch(getEntities(modelType)),
});

const withModel = connect(mapStateToProps, mapDispatchToProps);
export default withModel;
