import {AppDispatch, RootState} from "../Store";
import {generateNewStats, tryAddExtension, tryRemoveExtension} from "./personSlice";
import {connect} from "react-redux";
import {DeterminantType} from "../../model/rule/DeterminantType";
import {Person} from "../../model/creature/Person";

const mapStateToProps = (state: RootState) => ({
  entity: state.model.entity as Person,
});
const mapDispatchToProps = (dispatch: AppDispatch) => ({
  generateNewStats: () => dispatch(generateNewStats()),
  tryAddExtension: (t: DeterminantType) => dispatch(tryAddExtension(t)),
  tryRemoveExtension: (t: DeterminantType) => dispatch(tryRemoveExtension(t)),
});

const withPerson = connect(mapStateToProps, mapDispatchToProps);
export default withPerson;
