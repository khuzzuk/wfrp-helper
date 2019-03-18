import React, {Component} from 'react';
import {Button, Table, TableBody, TableCell, TableHead, TableRow} from "@material-ui/core";

class CrudComponent extends Component {
    state = {
        selectedId: null
    };

    onRowSelect = id => {
        this.setState({selectedId: id});
        let row = this.props.rows.find(row => row.id === id);
        console.log(row);
    };

    render() {
        const {columns, rows} = this.props;
        let crudButtons = <div/>;
        if (columns.length > 0) {
            crudButtons =
                <div>
                    <Button>Add</Button>
                    <Button disabled={this.state.selectedId === null}>Edit</Button>
                    <Button disabled={this.state.selectedId === null}>Remove</Button>
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
                    {rows.map((row, index) => (
                        <TableRow key={row.id} hover
                                  onClick={event => this.onRowSelect(row.id)}
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
        </div>;
    }
}

export default CrudComponent;