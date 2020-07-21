import {TextField} from "@material-ui/core";
import React from "react";
import {State} from "../state/State";
import ActionTimeField from "./field/ActionTimeField";
import BlueprintSelect from "./field/BlueprintSelect";
import DeterminantField from "./field/DeterminantField";
import EntitySelect from "./field/EntitySelect";
import EnumCombobox from "./field/EnumCombobox";
import EnumSelect from "./field/EnumSelect";
import IntegerField from "./field/IntegerField";
import ModifierField from "./field/ModifierField";
import PriceField from "./field/PriceField";
import FormFieldData from "./FormFieldData";
import {FormFieldType} from "./FormFieldType";
import CharacterSheetForm from "./sheet/CharacterSheetForm";
import CharacterSheetView from "./sheet/CharacterSheetView";

const basicStyle = {
    root: {
        display: 'flex',
    },
    field: {
        width: '100%',
    }
};

export const CreateFormField = (fieldData: FormFieldData, t, editable) => {
    const {name, type, suggestions, toView, toModel} = fieldData;
    const entity = State.data.entity;
    let value = entity[name];
    value = toView ? toView(value) : value;
    const onUpdate = updateProperty(name, toModel);

    switch (type) {
        case FormFieldType.TEXT:
            return <TextField key={name} label={t(name)} value={value || ''} onChange={onUpdate} style={basicStyle.field} InputProps={{readOnly: !editable}}/>;

        case FormFieldType.PASSWORD:
            return <TextField key={name} label={t(name)} value={value || ''} onChange={onUpdate} style={basicStyle.field} type={'password'} InputProps={{readOnly: !editable}}/>;

        case FormFieldType.TEXT_AREA:
            return <TextField key={name} label={t(name)} value={value || ''} onChange={onUpdate} multiline style={basicStyle.field} InputProps={{readOnly: !editable}}/>;

        case FormFieldType.INTEGER:
            return <IntegerField key={name} label={t(name)} value={value || ''} onChange={onUpdate} style={basicStyle.field} InputProps={{readOnly: !editable}}/>;

        case FormFieldType.FLOAT:
            return <TextField key={name} label={t(name)} value={value || ''} type={'number'} onChange={onUpdate} style={basicStyle.field} InputProps={{readOnly: !editable}}/>;

        case FormFieldType.DETERMINANT:
            return <DeterminantField key={name} name={name} value={value} editable={editable}/>;

        case FormFieldType.ENTITY_SELECT:
            return <EntitySelect key={name} name={name} suggestions={suggestions} editable={editable}/>;

        case FormFieldType.ENTITY_COMBOBOX:
            return <EntitySelect key={name} name={name} suggestions={suggestions} multi editable={editable}/>;

        case FormFieldType.ENUM_SELECT:
            return <EnumSelect key={name} name={name} suggestions={suggestions} value={value} editable={editable}/>;

        case FormFieldType.ENUM_COMBOBOX:
            return <EnumSelect key={name} name={name} suggestions={suggestions} value={value} multi editable={editable}/>;

        case FormFieldType.PRICE:
            return <PriceField key={name} name={name} editable={editable}/>;

        case FormFieldType.ACTION_TIME:
            return <ActionTimeField key={name} name={name} editable={editable}/>;

        case FormFieldType.MODIFIER:
            return <ModifierField id={name} name={name} value={value} editable={editable}/>;

        case FormFieldType.BLUEPRINT_SELECT:
            return <BlueprintSelect key={name} name={name} suggestions={suggestions} editable={editable}/>;

        case FormFieldType.CHARACTER_SHEET:
            return editable ? <CharacterSheetForm/> : <CharacterSheetView/>;
    }
    throw fieldData;
};

const updateProperty = (propName: string, toModel: func) => event => {
    const newValue = event.target ? event.target.value : event;
    const value = toModel ? toModel(newValue) : newValue;
    const entity = State.data.entity;
    entity.updateWith({[propName]: value});
    State.update({entity: entity});
};
