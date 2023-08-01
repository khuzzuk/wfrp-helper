import axios, {AxiosResponse} from "axios";
import {Determinant} from "../../model/rule/Determinant";

export type GeneratedStats = { determinants: Determinant[] };

export async function getGeneratedStats(raceId: any): Promise<AxiosResponse<GeneratedStats>> {
  return await axios.get<any>(`/determinant/generateDeterminants/${raceId}`);
}