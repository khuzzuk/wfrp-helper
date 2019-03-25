import React, {Component} from 'react';
import {Button, Table, TableBody, TableCell, TableHead, TableRow} from "@material-ui/core";

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

    onEditorClose = () => {
        this.setState({showEditor: false});
    };

    generateForm = () => {
        console.warn('generateForm not implemented');
    };

    getColumns = () => {
        console.warn('getColumns not implemented')
    };

    render() {
        const {rows} = this.props;
        const columns = this.getColumns();

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
                            <TableCell key={column.header} align={'right'}>{column.header}</TableCell>
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
                                    return <TableCell key={row.id + '_' + col.field}>{row[col.field]}</TableCell>
                                })
                            }
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {this.generateForm()}
        </div>;
    }
}

export default CrudComponent;