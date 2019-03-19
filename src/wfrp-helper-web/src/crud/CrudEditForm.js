import React, {Component} from 'react';
import {Button, Dialog, DialogTitle} from "@material-ui/core";

class CrudEditForm extends Component {
    apply = () => {
        this.props.editor.save();
        this.props.onClose();
    };

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