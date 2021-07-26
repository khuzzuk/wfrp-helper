import axios, {AxiosResponse} from "axios";

export async function getAll(name: string): Promise<AxiosResponse<any[]>> {
    return await axios.get<any[]>('/' + name);
}

export async function update(name: string, entity: any): Promise<AxiosResponse<void>> {
    return await axios.post<void>('/' + name, entity);
}
