import {AppDispatch, RootState} from "../Store";
import {connect} from "react-redux";
import {loading} from "./uiSlice";

export const mapStateToProps = (state: RootState) => ({
  isLoading: !!Array.from(state.ui.loadings.values()).find(value => value)
});

export const mapDispatchToProps = (dispatch: AppDispatch) => ({
  loading: (entity: string) => {
    dispatch(loading(entity));
  }
});

const withUiState = connect(mapStateToProps, mapDispatchToProps);
export default withUiState;