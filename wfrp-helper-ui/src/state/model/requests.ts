import axios, {AxiosResponse} from "axios";
import {BaseEntity} from "model/BaseEntity";

export async function getAll(name: string): Promise<AxiosResponse<any[]>> {
    return await axios.get<any[]>('/' + name);
}

export async function save(name: string, entity: BaseEntity): Promise<AxiosResponse<void>> {
    return await axios.post<void>('/' + name, entity);
}

export async function deleteOne(name: string, entity: BaseEntity): Promise<boolean> {
    await axios.delete<void, BaseEntity>('/' + name, {data: entity});
    return true;
}
