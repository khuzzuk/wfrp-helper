import { Form } from "components/Form/styled";
import withModel from "state/model/modelSelector";
import ModelConfig, {FieldDef, ModelType} from "../model/ModelConfig";
import {FieldType} from "../entity/FieldType";
import TextField from "../components/Form/TextField";
import CheckBox from "../components/Form/ChekcBox";
import {useTranslation} from "react-i18next";

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
            case FieldType.BOOLEAN:
                return <CheckBox key={key} label={def.prop} value={entity[def.prop]} onUpdate={upd}/>
        }
    }

    return <Form>{fields.map(toField)}</Form>
}

export default withModel(FormPage);
