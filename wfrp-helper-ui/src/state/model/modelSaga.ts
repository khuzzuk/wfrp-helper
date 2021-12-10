import ModelConfig, {ModelType} from "model/ModelConfig";
import {call, put, select, takeLatest} from "redux-saga/effects";
import {deleteOne, getAll, save} from "./requests";
import {AxiosResponse} from "axios";
import {
    applyEntity,
    createNewEntity,
    deleteEntity,
    getEntities,
    saveEntity,
    setEntities,
    setEntity,
    setForm,
    setTable,
    startEdit
} from "./modelSlice";
import {push} from "connected-react-router";
import {FORM, TABLE} from "navigation/RoutingProvider";
import {loading, loadingFinished} from "state/ui/uiSlice";
import {entitySelector, formSelector, tableSelector} from "./modelSelector";
import {BaseEntity} from "model/BaseEntity";

export function* watchGetEntities({payload}: { payload: ModelType }) {
    let modelConfig = ModelConfig[payload];
    let entityName = modelConfig.name;
    yield put(loading(entityName));

    try {
        const response: AxiosResponse<any[]> = yield call(getAll, entityName);
        yield put(setEntities({model: payload, entities: response.data}));

        let linked: ModelType[] = modelConfig.form.filter(def => def.linked).map(def => def.linked || ModelType.USER);
        (modelConfig.linked || []).forEach(type => linked.push(type));

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
    const modelType: ModelType = yield select(tableSelector);
    yield put(setEntity({}));
    yield put(setForm(modelType))
    yield put(push(FORM));
}

export function* watchDeleteEntity() {
    const modelType: ModelType = yield select(tableSelector);
    const entityName = ModelConfig[modelType].name;
    const entity: BaseEntity = yield select(entitySelector);

    yield put(loading(entityName));

    try {
        console.log('deleting')
        yield call(deleteOne, entityName, entity);
        yield put(getEntities(modelType));
    } catch (e) {
        console.log(e.status);
        window.alert(e.status);
    }

    yield put(loadingFinished(entityName));

}

export function* modelSaga() {
    yield takeLatest(getEntities, watchGetEntities);
    yield takeLatest(startEdit, watchStartEdit);
    yield takeLatest(applyEntity, watchApplyEntity);
    yield takeLatest(saveEntity, watchSaveEntity);
    yield takeLatest(createNewEntity, watchCreateNewEntity);
    yield takeLatest(deleteEntity, watchDeleteEntity);
}
