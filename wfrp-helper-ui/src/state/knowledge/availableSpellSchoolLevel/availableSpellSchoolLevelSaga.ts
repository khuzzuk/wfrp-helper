import {call, put, select, takeEvery} from "redux-saga/effects";
import {getAvailableSpellSchoolLevels, setAvailableSpellSchoolLevels} from "./availableSpellSchoolLevelSlice";
import {realmSelector} from "state/realm/realmsSelector";
import {BaseEntity} from "model/BaseEntity";
import {fetchAvailableSpellSchools} from "./requests";
import {SpellSchoolLevel} from "model/knowledge/SpellSchoolLevel";
import {AxiosResponse} from "axios";

function* getAvailableSpellSchoolSaga() {
  const realm: BaseEntity[] = yield select(realmSelector);
  try {
    const response: AxiosResponse<SpellSchoolLevel[]> = yield call(fetchAvailableSpellSchools, {
      currentSpellSchools: [],
      currentSkills: [],
      realm: realm[0],
    });
    const data: SpellSchoolLevel[] = response.data;
    yield put(setAvailableSpellSchoolLevels(data));
  } catch (e) {
    console.error(e);
  }
}

export function* availableSpellSchoolSaga() {
  yield takeEvery(getAvailableSpellSchoolLevels, getAvailableSpellSchoolSaga)
}