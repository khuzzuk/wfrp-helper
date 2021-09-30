export const toOptions = (values: any[]) => {
    return values.map(v => <option value={v}>{v.name}</option>)
}