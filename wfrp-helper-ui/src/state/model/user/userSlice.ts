import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import User, {Authority} from "../../../model/user";

export const name = 'user';

export interface UserState {
  users: User[]
  roles: Authority[]
}

export const initialState: UserState = {users: [], roles: []}

const reducers = {
  getUsers: () => {},
  getRoles: () => {},
  setUsers: (state: UserState, action: PayloadAction<User[]>) => {
    state.users = action.payload;
  },
};

export const userSlice = createSlice({name, initialState, reducers})
export const {getUsers, getRoles, setUsers} = userSlice.actions;
export default userSlice.reducer;
