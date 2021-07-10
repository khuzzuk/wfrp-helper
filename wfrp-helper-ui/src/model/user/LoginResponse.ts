import {Authority} from "./index";

export interface LoginResponse {
  authorities: Authority[];
  isOneTimePassword: boolean;
}