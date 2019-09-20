import React, {Component} from 'react';
import {Button, FormControl, FormGroup, TextField, withStyles} from "@material-ui/core";
import FormFieldData from "./FormFieldData";
import ConnectionService from '../connection/ConnectionService'
import EntityCombobox from "./field/EntityCombobox";
import IntegerField from "./field/IntegerField";
import EnumSelect from "./field/EnumSelect";
import PriceField from "./field/PriceField";
import DeterminantField from "./field/DeterminantField";
import ModifierField from "./field/ModifierField";
import EntitySelect from "./field/EntitySelect";
import ActionTimeField from "./field/ActionTimeField";
import EnumCombobox from "./field/EnumCombobox";
import {func} from "prop-types";
import BlueprintSelect from "./field/BlueprintSelect";

const styles = theme => ({
        form: {
            justifyContent: 'space-around'
        },
        formContent: {
            justifyContent: 'space-around'
        },
        formButtons: {
            justifyContent: 'flex-end'
        },
        dialogPaper: {
            overflow: "visible",
        },
    });

class CrudEditForm extends Component {
    state = {
        entity: null
    };

    onUpdate = (propName: string, toModel: func) => event => {
        const value = toModel ? toModel(event.target.value) : event.target.value;
        this.update({[propName]: value})
    };

    onUpdateData = (propName: string, toModel: func) => data => {
        const value = toModel ? toModel(data) : data;
        this.update({[propName]: value})
    };

    update = (updates) => {
        this.props.entity.updateWith(updates);
        this.setState({entity: this.props.entity});
    };

    apply = () => {
        this.props.onApply(this.props.entity);
    };

    generateField(fieldData: FormFieldData) {
        const {name, label, type, toView, toModel} = fieldData;
        let value = this.props.entity[name];
        value = toView ? toView(value) : value;

        switch (type) {
            case ConnectionService.FormFieldType.TEXT:
                return <TextField key={name} label={label}
                                  value={value}
                                  onChange={this.onUpdate(name, toModel)}/>;
            case ConnectionService.FormFieldType.TEXT_AREA:
                return <TextField key={name} label={label}
                                  multiline
                                  value={value}
                                  onChange={this.onUpdate(name, toModel)}/>;
            case ConnectionService.FormFieldType.INTEGER:
                return <IntegerField key={name}
                                     label={fieldData.label}
                                     value={value}
                                     onChange={this.onUpdateData(name, toModel)}/>;
            case ConnectionService.FormFieldType.FLOAT:
                return <TextField key={name} label={label}
                                  value={value}
                                  type={'number'}
                                  onChange={this.onUpdate(name, toModel)}/>;
            case ConnectionService.FormFieldType.ENTITY_SELECT:
                return <EntitySelect key={name} label={label}
                                     data={fieldData.suggestions}
                                     value={value}
                                     onChange={this.onUpdateData(name, toModel)}/>;
            case ConnectionService.FormFieldType.ENTITY_COMBOBOX:
                return <EntityCombobox key={name} label={label}
                                       data={fieldData.suggestions}
                                       value={value}
                                       onChange={this.onUpdateData(name, toModel)}/>;
            case ConnectionService.FormFieldType.ENUM_SELECT:
                return <EnumSelect key={name} label={label}
                                   data={fieldData.suggestions}
                                   value={value}
                                   onChange={this.onUpdateData(name, toModel)}/>;
            case ConnectionService.FormFieldType.ENUM_COMBOBOX:
                return <EnumCombobox key={name} label={label}
                                     data={fieldData.suggestions}
                                     value={value}
                                     onChange={this.onUpdateData(name, toModel)}/>;
            case ConnectionService.FormFieldType.PRICE:
                return <PriceField key={name} label={label}
                                   value={value}
                                   onChange={this.onUpdateData(name, toModel)}/>;
            case ConnectionService.FormFieldType.ACTION_TIME:
                return <ActionTimeField key={name} label={label}
                                        value={value}
                                        onChange={this.onUpdateData(name, toModel)}/>;
            case ConnectionService.FormFieldType.DETERMINANT:
                return <DeterminantField key={name}
                                         value={value}
                                         onChange={this.onUpdateData(name, toModel)}/>;
            case ConnectionService.FormFieldType.MODIFIER:
                return <ModifierField id={name}
                                      value={value}
                                      onChange={this.onUpdateData(name, toModel)}/>;
            case ConnectionService.FormFieldType.BLUEPRINT_SELECT:
                return <BlueprintSelect key={name} label={label}
                                        data={fieldData.suggestions}
                                        value={value}
                                        onChange={this.onUpdateData(name, toModel)}/>;
            default:
                console.error('field type has no form component');
                console.error(fieldData)
        }
    }

    render() {
        const {service, entity, onClose, classes, customEditor} = this.props;

        let content = <div/>;
        if (entity) {
            if (customEditor) {
                content = customEditor(entity);
            } else {
                content = <div>
                    {service.formFields.map(formFieldData => this.generateField(formFieldData))}
                </div>;
            }
        }

        return <FormControl margin={'dense'}
                            component={'fieldset'}
                            className={classes.form}
                            fullWidth>
            <FormGroup className={classes.formContent} row>
                {content}
            </FormGroup>
            <FormGroup className={classes.formButtons} row>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={this.apply}>Apply</Button>
            </FormGroup>
        </FormControl>;
    }
}

export default withStyles(styles)(CrudEditForm);