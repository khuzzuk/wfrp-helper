import React, {Component} from 'react';
import {Table, TableBody, TableCell, TableHead, TableRow} from "@material-ui/core";

class CrudComponent extends Component {
    render() {
        const {columns, rows} = this.props;

        return <div>
            <Table>
                <TableHead>
                    {columns.map(columnName => (
                        <TableCell align={'right'}>{columnName}</TableCell>
                    ))}
                </TableHead>
                <TableBody>
                    {rows.map(row => (
                        <TableRow>
                            {
                                columns.map(col => {
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