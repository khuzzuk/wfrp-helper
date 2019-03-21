import React, {Component} from 'react';
import {Button, Dialog, DialogTitle, TextField} from "@material-ui/core";
import FormFieldData from "./FormFieldData";

class CrudEditForm extends Component {
    apply = () => {
        this.props.editor.save();
        this.props.onClose();
    };

    generateField(fieldData: FormFieldData) {
        switch (fieldData.type) {
            case FormFieldType.TEXT:
                return <TextField key={fieldData.name}
                                  label={fieldData.label}
                                  onChange={event => fieldData.onChange.onUpdate({[fieldData.name]: event.target.value})}/>
            case FormFieldType.TEXT_AREA:
                return <TextField key={fieldData.name}
                                  label={fieldData.label}
                                  multiline
                                  onChange={event => fieldData.onChange.onUpdate({[fieldData.name]: event.target.value})}/>
        }
    }

    render(): React.ReactNode {
        const {editor, ...other} = this.props;

        let content = <div/>;
        if (editor !== null) {
            content = <div>
                {editor.getFields()}
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