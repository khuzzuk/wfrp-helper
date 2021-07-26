import ModelConfig, {ModelType} from "./ModelConfig";
import {call, put, takeLatest} from "redux-saga/effects";
import {getAll} from "./requsts";
import {AxiosResponse} from "axios";
import {getEntities as getEntitiesAction, setEntities, setTable} from "./modelSlice";
import {push} from "connected-react-router";
import {TABLE} from "../../navigation/RoutingProvider";

export function* getEntities({payload}: { payload: ModelType }) {
    try {
        const response: AxiosResponse<any[]> = yield call(getAll, ModelConfig[payload].name);
        yield put(setEntities({model: payload, entities: response.data}));
        yield put(setTable(payload));
        yield put(push(TABLE));
    } catch (e) {
        console.log(e.status);
        window.alert(e.status);
    }
}

export function* modelSaga() {
    yield takeLatest(getEntitiesAction, getEntities);
}
