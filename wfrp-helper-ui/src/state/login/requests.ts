import User from "../../model/user";
import axios, {AxiosResponse} from "axios";
import {LoginResponse} from "../../model/user/LoginResponse";

export async function postLogin(user: User): Promise<AxiosResponse<LoginResponse>> {
  return axios.post<LoginResponse>('/login', user);
}