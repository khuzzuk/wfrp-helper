import {func, object} from "prop-types";

class FormFieldData {
    type: string;
    name: string;
    label: string;
    suggestions: object[];
    toView: func;
    toModel: func;
}
export default FormFieldData;