import React, {Component} from 'react';
import {Table, TableBody, TableCell, TableHead, TableRow} from "@material-ui/core";

class CrudComponent extends Component {
    render() {
        const {columns, rows} = this.props;
        return <div>
            <Table>
                <TableHead>
                    {columns.map(column => (
                        <TableCell align={'right'}>{column.header}</TableCell>
                    ))}
                </TableHead>
                <TableBody>
                    {rows.map(row => (
                        <TableRow>
                            {
                                columns.map(col => {
                                    return <TableCell>{row[col.field]}</TableCell>
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