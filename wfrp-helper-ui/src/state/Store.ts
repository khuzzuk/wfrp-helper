import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import { createBrowserHistory } from 'history'
import {connectRouter, routerMiddleware} from 'connected-react-router'
import uiReducer from "./ui/uiSlice";
import loginReducer from "./login/loginSlice";
import modelReducer from './model/modelSlice';
import gearReducer from './gear/gearSlice';
import availableSpellSchoolsReducer from './knowledge/availableSpellSchoolLevel/availableSpellSchoolLevelSlice';
import createSagaMiddleware from "redux-saga";
import {loginSaga} from "./login/loginSaga";
import {modelSaga} from "./model/modelSaga";
import {personSaga} from "./person/personSaga";
import {gearSaga} from "./gear/gearSaga";
import {availableSpellSchoolSaga} from "./knowledge/availableSpellSchoolLevel/availableSpellSchoolLevelSaga";

export const sagaMiddleware = createSagaMiddleware();
export const history = createBrowserHistory();
export const historyMiddleware = routerMiddleware(history);

export const Store = configureStore({
  reducer: {
    router: connectRouter(history),
    ui: uiReducer,
    login: loginReducer,
    model: modelReducer,
    gear: gearReducer,
    availableSpellSchools: availableSpellSchoolsReducer,
  },
  middleware: [...getDefaultMiddleware({thunk: false}), sagaMiddleware, historyMiddleware]
});

sagaMiddleware.run(loginSaga);
sagaMiddleware.run(modelSaga);
sagaMiddleware.run(personSaga);
sagaMiddleware.run(gearSaga);
sagaMiddleware.run(availableSpellSchoolSaga);

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;