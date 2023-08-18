import {AppDispatch, RootState} from "state/Store";
import {getAvailableSpellSchoolLevels} from "./availableSpellSchoolLevelSlice";
import {connect} from "react-redux";

const mapStateToProps = (state: RootState) => ({
  availableSpellSchools: state.availableSpellSchools.available
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  getAvailableSpellSchoolLevels: () => dispatch(getAvailableSpellSchoolLevels()),
})

const withAvailableSpellSchools = connect(mapStateToProps, mapDispatchToProps);
export default withAvailableSpellSchools;

export const availableSpellSchoolsSelector = (state: RootState) => state.availableSpellSchools.available;
