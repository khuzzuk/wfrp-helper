import {AppDispatch, RootState} from "../Store";
import {connect} from "react-redux";
import User from "../../model/user";
import {login} from "./loginSlice";

export const mapStateToProps = (state: RootState) => ({
  user: state.login.user,
  error: state.login.error
});

export const mapDispatchToProps = (dispatch: AppDispatch) => ({
  authorize: (user: User) => {
    dispatch(login(user));
  }
});

const withAuthData = connect(mapStateToProps, mapDispatchToProps);
export default withAuthData;