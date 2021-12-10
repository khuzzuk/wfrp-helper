import {call, put, select, takeLeading} from "redux-saga/effects";
import {generateNewStats} from "./personSlice";
import {entitySelector} from "state/model/modelSelector";
import {AxiosResponse} from "axios";
import {getGeneratedStats} from "./requests";
import {Person} from "model/creature/Person";
import {Determinant} from "model/rule/Determinant";
import {updateEntityProperty} from "state/model/modelSlice";

export function* generateStats() {
  const entity: Person = yield select(entitySelector);
  if (!entity.race) return;
  const raceId = entity.race.id;

  const response: AxiosResponse<{determinants: Determinant[]}> = yield call(getGeneratedStats, raceId);
  const determinants = response.data.determinants;
  yield put(updateEntityProperty({val: determinants, propName: 'determinants'}));
}

export function* personSaga() {
  yield takeLeading(generateNewStats, generateStats);
}
