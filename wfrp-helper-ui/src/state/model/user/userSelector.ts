import {AppDispatch, RootState} from "../../Store";
import {getUsers} from "./userSlice";
import {connect} from "react-redux";

export const mapStateToProps = (state: RootState) => ({
  users: state.user.users,
  roles: state.user.roles,
});

export const mapDispatchToProps = (dispatch: AppDispatch) => ({
  getUsers: () => dispatch(getUsers()),
});

const withUserData = connect(mapStateToProps, mapDispatchToProps);
export default withUserData;