import ModelConfig, {ModelType} from "model/ModelConfig";
import {call, put, select, takeLatest} from "redux-saga/effects";
import {getAll, save} from "./requsts";
import {AxiosResponse} from "axios";
import {
    applyEntity,
    createNewEntity,
    getEntities,
    saveEntity,
    setEntities, setEntity,
    setForm,
    setTable,
    startEdit
} from "./modelSlice";
import {push} from "connected-react-router";
import {FORM, TABLE} from "../../navigation/RoutingProvider";
import {loading, loadingFinished} from "../ui/uiSlice";
import {entitySelector, tableSelector, formSelector} from "./modelSelector";
import {BaseEntity} from "../../model/BaseEntity";

export function* watchGetEntities({payload}: { payload: ModelType }) {
    let entityName = ModelConfig[payload].name;
    yield put(loading(entityName));

    try {
        const response: AxiosResponse<any[]> = yield call(getAll, entityName);
        yield put(setEntities({model: payload, entities: response.data}));

        let linked = ModelConfig[payload].linked;
        for (let linkedType of linked) {
            const linkedResponse: AxiosResponse<any[]> = yield call(getAll, ModelConfig[linkedType].name);
            yield put(setEntities({model: linkedType, entities: linkedResponse.data}));
        }

        yield put(setTable(payload));
        yield put(push(TABLE));
    } catch (e) {
        console.log(e.status);
        window.alert(e.status);
    }

    yield put(loadingFinished(entityName));
}

export function* watchStartEdit() {
    const modelType: ModelType = yield select(tableSelector);
    if (!modelType) {
        return;
    }

    yield put(setForm(modelType))
    yield put(push(FORM));
}

export function* watchApplyEntity() {
    const modelType: ModelType = yield select(formSelector);
    const entityName = ModelConfig[modelType].name;
    const entity: BaseEntity = yield select(entitySelector);

    if (!modelType || !entity) {
        return;
    }
    yield put(loading(entityName));

    try {
        yield call(save, entityName, entity);
    } catch (e) {
        console.log(e.status);
        window.alert(e.status);
    }

    yield put(loadingFinished(entityName));
}

export function* watchSaveEntity() {
    const modelType: ModelType = yield select(formSelector);
    const entityName = ModelConfig[modelType].name;
    const entity: BaseEntity = yield select(entitySelector);

    if (!modelType || !entity) {
        return;
    }
    yield put(loading(entityName));

    try {
        yield call(save, entityName, entity);
        yield put(setTable(modelType));
        yield put(getEntities(modelType));
    } catch (e) {
        console.log(e.status);
        window.alert(e.status);
    }

    yield put(loadingFinished(entityName));
}

export function* watchCreateNewEntity() {
    console.log('createNewEntity');
    const modelType: ModelType = yield select(tableSelector);
    yield put(setEntity({}));
    yield put(setForm(modelType))
    yield put(push(FORM));
}

export function* modelSaga() {
    yield takeLatest(getEntities, watchGetEntities);
    yield takeLatest(startEdit, watchStartEdit);
    yield takeLatest(applyEntity, watchApplyEntity);
    yield takeLatest(saveEntity, watchSaveEntity);
    yield takeLatest(createNewEntity, watchCreateNewEntity);
}
