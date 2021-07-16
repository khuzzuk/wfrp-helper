import axios, {AxiosResponse} from "axios";
import User from "../../../model/user";

export async function getAllUsers(): Promise<AxiosResponse<User[]>> {
  return await axios.get<User[]>('/user');
}