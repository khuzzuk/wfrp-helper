import {AppDispatch, RootState} from "../Store";
import {generateNewStats} from "./personSlice";
import {connect} from "react-redux";

const mapStateToProps = () => ({});
const mapDispatchToProps = (dispatch: AppDispatch) => ({
  generateNewStats: () => dispatch(generateNewStats()),
});

const withPerson = connect(mapStateToProps, mapDispatchToProps);
export default withPerson;
