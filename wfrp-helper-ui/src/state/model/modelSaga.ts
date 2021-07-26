import ModelConfig, {ModelType} from "model/ModelConfig";
import {call, put, takeLatest} from "redux-saga/effects";
import {getAll} from "./requsts";
import {AxiosResponse} from "axios";
import {getEntities as getEntitiesAction, setEntities, setTable} from "./modelSlice";
import {push} from "connected-react-router";
import {TABLE} from "../../navigation/RoutingProvider";
import {loading, loadingFinished} from "../ui/uiSlice";

export function* getEntities({payload}: { payload: ModelType }) {
    try {
        let entityName = ModelConfig[payload].name;
        yield put(loading(entityName));

        const response: AxiosResponse<any[]> = yield call(getAll, entityName);
        yield put(setEntities({model: payload, entities: response.data}));

        let linked = ModelConfig[payload].linked;
        for (let linkedType of linked) {
            const linkedResponse: AxiosResponse<any[]> = yield call(getAll, ModelConfig[linkedType].name);
            yield put(setEntities({model: linkedType, entities: linkedResponse.data}));
        }

        yield put(setTable(payload));
        yield put(push(TABLE));
        yield put(loadingFinished(entityName));
    } catch (e) {
        console.log(e.status);
        window.alert(e.status);
    }
}

export function* modelSaga() {
    yield takeLatest(getEntitiesAction, getEntities);
}
