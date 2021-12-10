import axios, {AxiosResponse} from "axios";
import {Determinant} from "../../model/rule/Determinant";

export async function getGeneratedStats(raceId: any): Promise<AxiosResponse<Determinant[]>> {
  return await axios.get<any>(`/determinant/generateDeterminants/${raceId}`);
}