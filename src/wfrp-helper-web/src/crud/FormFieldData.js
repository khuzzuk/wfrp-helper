import type FormUpdateAction from "./FormUpdateAction";

class FormFieldData {
    type: string;
    name: string;
    label: string;
    onChange: FormUpdateAction;
    getEntity: any;

    getValue = () => {
        return this.getEntity()[this.name];
    }
}
export default FormFieldData;

const FormFieldType = {
    TEXT: 'text',
    TEXT_AREA: 'text_area',
    BOOLEAN: 'boolean'
};
