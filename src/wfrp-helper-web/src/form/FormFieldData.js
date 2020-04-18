import {func, object} from "prop-types";

class FormFieldData {
    type: string;
    name: string;
    suggestions: object[];
    toView: func;
    toModel: func;
}
export default FormFieldData;