import React, {Component} from 'react';
import {Button, Table, TableBody, TableCell, TableHead, TableRow} from "@material-ui/core";
import FormFieldData from "./FormFieldData";
import CrudEditForm from "./CrudEditForm";

class CrudComponent extends Component {
    state = {
        selectedId: null,
        entity: null,
        showEditor: false,
        title: ''
    };

    onRowSelect = id => {
        this.setState({selectedId: id});
        let row = this.props.rows.find(row => row.id === id);
        console.log(row);
    };

    getSelectedRow = () => {
        return this.props.rows.find(row => row.id === this.state.selectedId);
    };

    onAdd = () => {
        this.setState({
            showEditor: true,
            title: this.props.service.title,
            entity: this.props.service.createNew()
        });
    };

    onEdit = () => {
        this.setState({
            showEditor: true,
            title: this.props.service.title,
            entity: this.props.service.edit(this.getSelectedRow())
        });
    };

    onRemove = () => {
        this.props.service.remove(this.getSelectedRow());
        this.setState({
            entity: null
        });
    };

    update = (data) => {
        this.props.service.save(data, this.onEditorClose);
    };

    onEditorClose = () => {
        this.setState({showEditor: false});
    };

    render() {
        const {rows} = this.props;
        const columns: FormFieldData[] = this.props.service.tableColumns;

        let crudButtons = <div/>;
        if (columns.length > 0) {
            crudButtons =
                <div>
                    <Button onClick={this.onAdd}>Add</Button>
                    <Button onClick={this.onEdit} disabled={this.state.selectedId === null}>Edit</Button>
                    <Button onClick={this.onRemove} disabled={this.state.selectedId === null}>Remove</Button>
                </div>
        }

        return <div>
            {crudButtons}
            <Table>
                <TableHead>
                    <TableRow>
                        {columns.map(column => (
                            <TableCell key={column.name} align={'right'}>{column.label}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.id} hover
                                  onClick={() => this.onRowSelect(row.id)}
                                  selected={this.state.selectedId === row.id}>
                            {
                                columns.map(col => {
                                    return <TableCell key={row.id + '_' + col.name}>
                                        {(col.getter || (arg => arg))(row[col.name])}
                                    </TableCell>
                                })
                            }
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <CrudEditForm open={this.state.showEditor}
                          onClose={this.onEditorClose}
                          entity={this.state.entity}
                          onApply={this.update}
                          service={this.props.service}/>
        </div>;
    }
}

export default CrudComponent;