import axios, {AxiosResponse} from "axios";
import {Placement} from "../../model/crafting/Placement";

export async function getArmorStatsRequest(ids: number[]): Promise<AxiosResponse<{[key in Placement]: number}>> {
    return await axios.post('gear/getArmorValuesForGear', ids);
}