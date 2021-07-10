import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import { createBrowserHistory } from 'history'
import {connectRouter, routerMiddleware} from 'connected-react-router'
import loginReducer from "./login/loginSlice";
import createSagaMiddleware from "redux-saga";
import {loginSaga} from "./login/loginSaga";

export const sagaMiddleware = createSagaMiddleware();
export const history = createBrowserHistory();
export const historyMiddleware = routerMiddleware(history);

export const Store = configureStore({
  reducer: {
    router: connectRouter(history),
    login: loginReducer
  },
  middleware: [...getDefaultMiddleware({thunk: false}), sagaMiddleware, historyMiddleware]
});

sagaMiddleware.run(loginSaga);

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;