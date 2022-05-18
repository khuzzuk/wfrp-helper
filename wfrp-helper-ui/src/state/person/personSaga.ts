import {call, put, select, takeEvery, takeLeading} from "redux-saga/effects";
import {generateNewStats, tryAddExtension, tryRemoveExtension} from "./personSlice";
import {entitySelector} from "state/model/modelSelector";
import {AxiosResponse} from "axios";
import {getGeneratedStats} from "./requests";
import {Person} from "model/creature/Person";
import {Determinant} from "model/rule/Determinant";
import {updateEntityProperty} from "state/model/modelSlice";
import {DeterminantType, percentDeterminants} from "model/rule/DeterminantType";
import {DeterminantService} from "utils/DeterminantService";
import {Modifier} from "model/rule/Modifier";
import {ModifierType} from "model/rule/ModifierType";

export function* generateStats() {
  const entity: Person = yield select(entitySelector);
  if (!entity.race) return;
  const raceId = entity.race.id;

  const response: AxiosResponse<{determinants: Determinant[]}> = yield call(getGeneratedStats, raceId);
  const determinants = response.data.determinants;
  yield put(updateEntityProperty({val: determinants, propName: 'determinants'}));
}

export function* tryAddExt({payload}: {payload: DeterminantType}) {
  const entity: Person = yield select(entitySelector);
  if (!entity.currentProfession) return;

  const possibleExtensions = DeterminantService.getProfessionExtensions(entity.currentProfession.determinants, payload);
  if (!possibleExtensions) return;

  const current: Determinant = DeterminantService.clone(
      DeterminantService.findOrAddByType(entity.determinants, payload));
  const modifier: Modifier = DeterminantService.findOrAddModifierByType(current, ModifierType.EXPERIENCE);
  if (modifier.value >= possibleExtensions) return;

  let newDeterminant;
  if (percentDeterminants.includes(current.type)) {
    newDeterminant = DeterminantService.updateModifierValue(current, ModifierType.EXPERIENCE, modifier.value + 10);
  } else {
    newDeterminant = DeterminantService.updateModifierValue(current, ModifierType.EXPERIENCE, modifier.value + 1);
  }

  const determinants: Determinant[] = [newDeterminant, ...DeterminantService.removeByType(entity.determinants, payload)];
  yield put(updateEntityProperty({val: determinants, propName: 'determinants'}));
}

export function* tryRemoveExt({payload}: {payload: DeterminantType}) {
  const entity: Person = yield select(entitySelector);
  const current: Determinant = DeterminantService.clone(
      DeterminantService.findOrAddByType(entity.determinants, payload));

  const modifier: Modifier = DeterminantService.findOrAddModifierByType(current, ModifierType.EXPERIENCE);
  if (modifier.value === 0) return;

  let newDeterminant;
  if (percentDeterminants.includes(current.type)) {
    newDeterminant = DeterminantService.updateModifierValue(current, ModifierType.EXPERIENCE, modifier.value - 10);
  } else {
    newDeterminant = DeterminantService.updateModifierValue(current, ModifierType.EXPERIENCE, modifier.value - 1);
  }

  const determinants: Determinant[] = [newDeterminant, ...DeterminantService.removeByType(entity.determinants, payload)];
  yield put(updateEntityProperty({val: determinants, propName: 'determinants'}));
}

export function* personSaga() {
  yield takeLeading(generateNewStats, generateStats);
  yield takeEvery(tryAddExtension, tryAddExt);
  yield takeEvery(tryRemoveExtension, tryRemoveExt);
}
