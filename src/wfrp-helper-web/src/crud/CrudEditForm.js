import React, {Component} from 'react';
import {Button, Dialog, DialogContent, DialogTitle, TextField, withStyles} from "@material-ui/core";
import Select from 'react-select';
import FormFieldData from "./FormFieldData";
import ConnectionService from '../connection/ConnectionService'
import EntityCombobox from "./field/EntityCombobox";
import IntegerField from "./field/IntegerField";
import FloatField from "./field/FloatField";
import EnumSelect from "./field/EnumSelect";

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
        this.props.onApply(this.state.entity);
    };

    generateField(fieldData: FormFieldData) {
        const {name, label, type} = fieldData;
        switch (type) {
            case ConnectionService.FormFieldType.TEXT:
                return <TextField key={name} label={label}
                                  value={this.props.entity[name]}
                                  onChange={event => {
                                      this.update({[name]: event.target.value});
                                  }}/>;
            case ConnectionService.FormFieldType.TEXT_AREA:
                return <TextField key={name} label={label}
                                  multiline
                                  value={this.props.entity[name]}
                                  onChange={event => {
                                      this.update({[name]: event.target.value});
                                  }}/>;
            case ConnectionService.FormFieldType.INTEGER:
                return <IntegerField label={fieldData.label}
                                     value={this.props.entity[name]}
                                     onChange={number => {this.update({[name]: number})}}/>;
            case ConnectionService.FormFieldType.FLOAT:
                return <FloatField label={fieldData.label}
                                     value={this.props.entity[name]}
                                     onChange={number => {this.update({[name]: number})}}/>;
            case ConnectionService.FormFieldType.ENTITY_COMBOBOX:
                return <EntityCombobox label={fieldData.label}
                                       data={fieldData.suggestions}
                                       value={this.props.entity[name]}
                                       onChange={data => this.update({[name]: data})}/>;
            case ConnectionService.FormFieldType.ENUM_SELECT:
                return <EnumSelect label={fieldData.label}
                               data={fieldData.suggestions}
                               value={this.props.entity[name]}
                               onChange={data => this.update({[name]: data})}/>;
            default:
                console.error('field type has no form component');
                console.error(fieldData)
        }
    }

    render() {
        const {service, entity, classes, ...other} = this.props;

        let content = <div/>;
        if (entity !== null) {
            content = <div>
                {service.formFields.map(formFieldData => this.generateField(formFieldData))}
            </div>;
        }

        return <Dialog classes={{paperScrollPaper: classes.dialogPaper}}
                       PaperProps={{classNames: classes.dialogPaper}} {...other}>
            <DialogTitle>{this.props.service.title}</DialogTitle>
            <DialogContent className={classes.dialogPaper}>
                {content}
            </DialogContent>
            <Button onClick={this.apply}>Apply</Button>
        </Dialog>;
    }
}

export default withStyles(styles)(CrudEditForm);