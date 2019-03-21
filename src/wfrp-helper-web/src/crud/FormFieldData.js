import type FormUpdateAction from "./FormUpdateAction";

class FormFieldData {
    type: string;
    name: string;
    label: string;
    onChange: FormUpdateAction;
    entity: any;
}
export default FormFieldData;

const FormFieldType = {
    TEXT: 'text',
    TEXT_AREA: 'text_area',
    BOOLEAN: 'boolean'
};

export default FormFieldType;