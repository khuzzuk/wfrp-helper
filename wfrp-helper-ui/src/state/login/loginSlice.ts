import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import User from "../../model/user";

export const name = 'login';

export interface LoginState {
  user?: User;
  error: boolean;
}

const initialState: LoginState = {error: false};

const reducers = {
  login: (state: LoginState, action: PayloadAction<User>) => {
  },
  authorize: (state: LoginState, action: PayloadAction<User>) => {
    state.user = action.payload;
    state.error = false;
  },
  loginFailed: (state: LoginState) => {
    state.error = true;
  }
}

export const loginSlice = createSlice({name, initialState, reducers});
export const {login, authorize, loginFailed} = loginSlice.actions;
export default loginSlice.reducer;