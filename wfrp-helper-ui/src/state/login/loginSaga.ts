import {call, put, takeLatest} from 'redux-saga/effects'
import {postLogin} from "./requests";
import {authorize, login, loginFailed} from "./loginSlice";
import User from "../../model/user";
import {LoginResponse} from "../../model/user/LoginResponse";
import {push} from "connected-react-router";
import {HOME} from "../../navigation/RoutingProvider";
import {AxiosResponse} from "axios";

export function* postLoginSaga({payload}: {type: any, payload: User}) {
  try {
    const response: AxiosResponse<LoginResponse> = yield call(postLogin, payload);
    yield put(authorize({...payload, authorities: response.data.authorities}));
    yield put(push(HOME));
  } catch (e) {
    if (e.response.status === 403) {
      yield put(loginFailed())
    }
  }
}

export function* loginSaga() {
  yield takeLatest(login.type, postLoginSaga);
}