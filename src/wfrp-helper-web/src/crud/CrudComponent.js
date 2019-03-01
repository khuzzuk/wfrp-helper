import React, {Component} from 'react';
import {Table, TableBody, TableCell, TableHead, TableRow} from "@material-ui/core";

class CrudComponent extends Component {
    state = {
        columns: [],
        rows: []
    };

    setTableData = (columns, rows) => {
        this.setState({columns: columns, rows: rows})
    };

    render() {
        return <div>
            <Table>
                <TableHead>
                    {this.state.columns.map(columnName => (
                        <TableCell align={'right'}>{columnName}</TableCell>
                    ))}
                </TableHead>
                <TableBody>
                    {this.state.rows.map(row => (
                        <TableRow>
                            {
                                this.state.columns.map(col => {
                                    return <TableCell>{row[col]}</TableCell>
                                })
                            }
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    }
}

export default CrudComponent;