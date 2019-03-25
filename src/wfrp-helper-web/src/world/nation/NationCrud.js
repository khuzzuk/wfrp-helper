import CrudComponent from "../../crud/CrudComponent";
import React from 'react';
import {Button, Dialog, DialogTitle, TextField} from "@material-ui/core";

class NationCrud extends CrudComponent {
    tableColumns = [{
        header: 'Name',
        field: 'name'
    }, {
        header: 'Description',
        field: 'description'
    }];

    getColumns = () => {
        return this.tableColumns;
    };

    update = (editor, data) => {
        editor.update(data);
        this.props.onChange();
    };

    generateForm = () => {
        const {editor} = this.props;

        return <Dialog open={this.state.showEditor}>
            <DialogTitle>Nation editor</DialogTitle>
            <TextField key={'name'}
                       label={"Name"}
                       onChange={event => this.update(editor, {name: event.target.value})}
                       value={editor.nation.name}/>,
            <TextField key={'description'}
                       label={"Description"}
                       onChange={event => this.update(editor, {description: event.target.value})}
                       value={editor.nation.description}
                       multiline/>
            <Button onClick={this.apply}>Apply</Button>
        </Dialog>;
    };

    render(): * {
        return super.render();
    }
}

export default NationCrud;