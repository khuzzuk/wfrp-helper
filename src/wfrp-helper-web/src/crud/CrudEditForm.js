import React, {Component} from 'react';
import {Button, Dialog, DialogContent, DialogTitle, TextField, withStyles} from "@material-ui/core";
import FormFieldData from "./FormFieldData";
import ConnectionService from '../connection/ConnectionService'
import EntityCombobox from "./field/EntityCombobox";
import IntegerField from "./field/IntegerField";
import FloatField from "./field/FloatField";
import EnumSelect from "./field/EnumSelect";
import PriceField from "./field/PriceField";
import DeterminantField from "./field/DeterminantField";

const styles = theme => ({
    dialogPaper: {
        overflow: "visible",
    }
});

class CrudEditForm extends Component {
    state = {
        entity: null
    };

    update = (updates) => {
        this.props.entity.updateWith(updates);
        this.setState({entity: this.props.entity});
    };

    apply = () => {
        this.props.onApply(this.props.entity);
    };

    generateField(fieldData: FormFieldData) {
        const {name, label, type} = fieldData;
        let value = this.props.entity[name];

        switch (type) {
            case ConnectionService.FormFieldType.TEXT:
                return <TextField key={name} label={label}
                                  value={value}
                                  onChange={event => {
                                      this.update({[name]: event.target.value});
                                  }}/>;
            case ConnectionService.FormFieldType.TEXT_AREA:
                return <TextField key={name} label={label}
                                  multiline
                                  value={value}
                                  onChange={event => {
                                      this.update({[name]: event.target.value});
                                  }}/>;
            case ConnectionService.FormFieldType.INTEGER:
                return <IntegerField label={fieldData.label}
                                     value={value}
                                     onChange={number => {this.update({[name]: number})}}/>;
            case ConnectionService.FormFieldType.FLOAT:
                return <FloatField key={name} label={label}
                                     value={value}
                                     onChange={number => {this.update({[name]: number})}}/>;
            case ConnectionService.FormFieldType.ENTITY_COMBOBOX:
                return <EntityCombobox key={name} label={label}
                                       data={fieldData.suggestions}
                                       value={value}
                                       onChange={data => this.update({[name]: data})}/>;
            case ConnectionService.FormFieldType.ENUM_SELECT:
                return <EnumSelect key={name} label={label}
                               data={fieldData.suggestions}
                               value={value}
                               onChange={data => this.update({[name]: data})}/>;
            case ConnectionService.FormFieldType.PRICE:
                return <PriceField key={name} label={label}
                                   value={value}
                                   onChange={price => this.update({[name]: price})}/>;
            case ConnectionService.FormFieldType.DETERMINANT:
                return <DeterminantField key={name}
                                         value={value} onChange={data => this.update({[name]: data})}/>;
            default:
                console.error('field type has no form component');
                console.error(fieldData)
        }
    }

    render() {
        const {service, entity, classes, open, onClose} = this.props;

        let content = <div/>;
        if (entity !== null) {
            content = <div>
                {service.formFields.map(formFieldData => this.generateField(formFieldData))}
            </div>;
        }

        return <Dialog classes={{paperScrollPaper: classes.dialogPaper}}
                       PaperProps={{classNames: classes.dialogPaper}}
                       open={open} onClose={onClose}>
            <DialogTitle>{this.props.service.title}</DialogTitle>
            <DialogContent className={classes.dialogPaper}>
                {content}
            </DialogContent>
            <Button onClick={this.apply}>Apply</Button>
        </Dialog>;
    }
}

export default withStyles(styles)(CrudEditForm);