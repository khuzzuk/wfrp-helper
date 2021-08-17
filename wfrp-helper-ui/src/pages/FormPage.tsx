import {Form} from "components/Form/styled";
import withModel from "state/model/modelSelector";
import ModelConfig, {FieldDef, ModelType} from "../model/ModelConfig";
import {FieldType} from "../entity/FieldType";
import TextField, {InputType} from "../components/Form/TextField";
import CheckBox from "../components/Form/ChekcBox";
import {useTranslation} from "react-i18next";
import TextArea from "../components/Form/TextArea";
import ComboBox from "../components/Form/ComboBox";
import TextArrayField from "../components/Form/TextArrayField";
import {DeterminantField} from "../components/Form/DeterminantField";

export interface FormPageProps {
    entity: any;
    form?: ModelType;
    updateEntityProp: (val: any, propName: string) => void;
}

function FormPage({entity, form, updateEntityProp}: FormPageProps) {
    const [t] = useTranslation('base');

    if (!form || !entity) {
        return <div/>
    }

    const fields: FieldDef[] = ModelConfig[form].form;

    const toField = (def: FieldDef) => {
        const key = entity.id + '_' + def.prop;
        const label = t('props.'+def.prop);
        const upd = (val: any) => updateEntityProp(val, def.prop);

        switch (def.type){
            case FieldType.TEXT:
                return <TextField key={key} label={label} value={entity[def.prop]} onUpdate={upd}/>
            case FieldType.TEXT_AREA:
                return <TextArea key={key} label={label} value={entity[def.prop]} onUpdate={upd}/>
            case FieldType.TEXT_ARRAY:
                return <TextArrayField key={key} label={label} value={entity[def.prop]} onUpdate={upd}/>
            case FieldType.INTEGER:
                return <TextField key={key} label={label} value={entity[def.prop]} onUpdate={upd} type={InputType.INT}/>
            case FieldType.FLOAT:
                return <TextField key={key} label={label} value={entity[def.prop]} onUpdate={upd} type={InputType.FLOAT}/>
            case FieldType.BOOLEAN:
                return <CheckBox key={key} label={def.prop} value={entity[def.prop]} onUpdate={upd}/>
            case FieldType.ENTITY_SELECT:
                return <ComboBox key={key} value={entity[def.prop]} accept={upd} def={def}/>
            case FieldType.ENTITY_MULTISELECT:
            case FieldType.ENUM_MULTISELECT:
                return <ComboBox key={key} values={entity[def.prop]} accept={upd} def={def}/>
            case FieldType.DETERMINANT:
                return <DeterminantField key={key} determinants={entity[def.prop]} accept={upd} label={'det'}/>
        }
    }

    return <Form>{fields.map(toField)}</Form>
}

export default withModel(FormPage);
