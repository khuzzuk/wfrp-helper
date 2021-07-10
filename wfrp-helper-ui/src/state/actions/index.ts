import User from "../../model/user";

export enum ActionType {
  LOGIN
}

export interface Action {
  type: ActionType;
  payload: any;
}

export function login(user: User): Action {
  return {type: ActionType.LOGIN, payload: user}
}