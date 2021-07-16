import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import { createBrowserHistory } from 'history'
import {connectRouter, routerMiddleware} from 'connected-react-router'
import uiReducer from "./ui/uiSlice";
import loginReducer from "./login/loginSlice";
import userReducer from './model/user/userSlice';
import createSagaMiddleware from "redux-saga";
import {loginSaga} from "./login/loginSaga";
import {userSaga} from "./model/user/userSaga";

export const sagaMiddleware = createSagaMiddleware();
export const history = createBrowserHistory();
export const historyMiddleware = routerMiddleware(history);

export const Store = configureStore({
  reducer: {
    router: connectRouter(history),
    ui: uiReducer,
    login: loginReducer,
    user: userReducer
  },
  middleware: [...getDefaultMiddleware({thunk: false}), sagaMiddleware, historyMiddleware]
});

sagaMiddleware.run(loginSaga);
sagaMiddleware.run(userSaga);

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;