import {BaseEntity} from "model/BaseEntity";

export const toOptions = (values: any[], current: any[] = []) => {
    return [
        <option hidden disabled value={'empty'}/>,
        ...values
            .filter(v => !current.some(c => c.id === v.id))
            .map((v) => <option key={v.name} value={v.id}>{v.name}</option>)
    ];
}

export const getOption = <T extends BaseEntity>(id: number, values: T[]) => {
    let option = values.find(v => v.id === id);
    if (!option) {
        throw new Error({id, values}.toString());
    }
    return option;
}
