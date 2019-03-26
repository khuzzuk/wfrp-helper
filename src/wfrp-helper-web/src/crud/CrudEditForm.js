import React, {Component} from 'react';
import {Button, Dialog, DialogTitle, TextField} from "@material-ui/core";
import FormFieldData from "./FormFieldData";
import ConnectionService from '../connection/ConnectionService'

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
                return <TextField key={name}
                                  label={label}
                                  value={this.props.entity[name]}
                                  onChange={event => {this.update({[name]: event.target.value});}}/>;
            case ConnectionService.FormFieldType.TEXT_AREA:
                return <TextField key={name}
                                  label={label}
                                  multiline
                                  value={this.props.entity[name]}
                                  onChange={event => {this.update({[name]: event.target.value});}}/>;
            default:
                console.error('field type has no form component');
                console.error(fieldData)
        }
    }

    render(): React.ReactNode {
        const {service, entity, ...other} = this.props;

        let content = <div/>;
        if (entity !== null) {
            content = <div>
                {service.tableColumns.map(formFieldData => this.generateField(formFieldData))}
            </div>;
        }

        return <Dialog {...other}>
            <DialogTitle>{this.props.title}</DialogTitle>
            {content}
            <Button onClick={this.apply}>Apply</Button>

        </Dialog>;
    }
}

export default CrudEditForm;