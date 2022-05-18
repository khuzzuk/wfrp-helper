import {call, put, select, takeEvery} from "redux-saga/effects";
import {getArmorStats, setCurrentIds} from "./gearSlice";
import {getArmorStatsRequest} from "./requests";
import {AxiosResponse} from "axios";
import {Placement} from "model/crafting/Placement";
import {currentArmorIds} from "./gearSelector";
import {setArmorStats} from './gearSlice';

function* getArmorStatsSaga({payload}: { payload: number[] }) {
    const currentIds: number[] = yield select(currentArmorIds);
    if (payload === currentIds) {
        return;
    }
    const response: AxiosResponse<{ [key in Placement]: number }> = yield call(getArmorStatsRequest, payload);
    yield put(setArmorStats(response.data));
    yield put(setCurrentIds(currentIds));
}

export function* gearSaga() {
    yield takeEvery(getArmorStats, getArmorStatsSaga);
}
