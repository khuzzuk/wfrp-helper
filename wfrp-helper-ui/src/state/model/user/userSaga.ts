import {call, put, takeLatest} from "redux-saga/effects";
import {getAllUsers} from "./requests";
import {AxiosResponse} from "axios";
import User from "../../../model/user";
import {setUsers, getUsers as getUsersAction, name} from "./userSlice";
import {loading, loadingFinished} from "../../ui/uiSlice";

export function* getUsers() {
  try {
    console.log('start user fetch')
    yield put(loading(name));
    const response: AxiosResponse<User[]> = yield call(getAllUsers);
    console.log('got user fetch response')
    yield put(setUsers(response.data));
    yield put(loadingFinished(name));
    console.log('finish user fetch')
  } catch (e) {
    console.log(e.status);
    window.alert(e.status);
  }
}

export function* userSaga() {
  yield takeLatest(getUsersAction, getUsers);
}