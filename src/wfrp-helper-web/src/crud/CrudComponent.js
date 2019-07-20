import React, {Component} from 'react';
import {Button, Table, TableBody, TableCell, TableHead, TableRow} from "@material-ui/core";
import FormFieldData from "./FormFieldData";
import CrudEditForm from "./CrudEditForm";
import {bus} from "../state/Bus";
import Message, {MessageType} from "../state/Message";

class CrudComponent extends Component {
    state = {
        selectedId: null,
        entity: null,
        showEditor: false,
    };
    unsubscribe: () => void = () => {};

    componentDidMount(): void {
        this.unsubscribe = bus.subscribe(MessageType.ALL, this.props.service.domain, data => this.setState({data}));
    }

    componentWillUnmount(): void {
        this.unsubscribe();
    }

    onRowSelect = id => {
        this.setState({selectedId: id});
    };

    getSelectedRow = () => {
        return this.props.rows.find(row => row.id === this.state.selectedId);
    };

    onAdd = () => {
        this.props.onChange({
            showEditor: true,
            entity: this.props.service.createNew()
        });
    };

    onEdit = () => {
        this.props.onChange({
            showEditor: true,
            entity: this.props.service.edit(this.getSelectedRow())
        });
    };

    onRemove = () => {
        this.props.service.remove(this.getSelectedRow());
        this.props.onChange({
            showEditor: false,
            entity: null
        });
    };

    update = (data) => {
        bus.send(new Message(MessageType.SAVE, this.props.service.domain, data));
        this.onEditorClose();
    };

    onEditorClose = () => {
        this.props.onChange({showEditor: false});
    };

    render() {
        const {customEditor, service} = this.props;
        const columns: FormFieldData[] = service.tableColumns;

        let crudButtons = <div/>;
        if (columns.length > 0) {
            crudButtons =
                <div>
                    <Button onClick={this.onAdd}>Add</Button>
                    <Button onClick={this.onEdit} disabled={this.state.selectedId === null}>Edit</Button>
                    <Button onClick={this.onRemove} disabled={this.state.selectedId === null}>Remove</Button>
                </div>
        }

        if (this.props.showEditor) {
            return <CrudEditForm onClose={this.onEditorClose}
                                 entity={this.props.entity}
                                 onApply={this.update}
                                 service={this.props.service}
                                 customEditor={customEditor}/>
        } else {
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
                        {service.data.map((row) => (
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
            </div>
        }
    }
}

export default CrudComponent;