import React, {Component} from "react";
import IconButton from "@material-ui/core/IconButton";
import {Add, Delete, Edit} from "@material-ui/icons";
import {State} from "../state/State";
import MUIDataTable from "mui-datatables";
import {withTranslation} from "react-i18next";

class Table extends Component {
    options = {
        filterType: 'textField',
        selectableRows: "single",
        selectableRowsOnClick: true,
        disableToolbarSelect: true,
        selectableRowsHeader: false,
        customToolbarSelect: (selectedRows, displayData, setSelectedRows) => {
            if (selectedRows.data.length > 0) {
                let entityName = State.data.showTable;
                const entity = State.data[entityName][selectedRows.data[0].dataIndex];
                return <React.Fragment>
                    <div>
                        <IconButton onClick={() => State.showForm(entityName, entity)}><Edit/></IconButton>
                        <IconButton onClick={() => State.services[entityName].delete(entity)}><Delete/></IconButton>
                    </div>
                </React.Fragment>;
            }
            return <React.Fragment/>
        }
    };

    translateColumns = columns => {
        const {t} = this.props;
        columns.forEach(column => column.label = t(column.name));
        return columns;
    };

    render() {
        const {showTable} = State.data;
        const {t} = this.props;

        const title = <div>
            {t(showTable)}
            <IconButton onClick={() => State.update({
                showTable: null,
                showForm: showTable,
                entity: State.suppliers[showTable]()
            })}>
                <Add/>
            </IconButton>
        </div>;

        return <MUIDataTable title={title}
                             options={this.options}
                             columns={this.translateColumns(State.columns[showTable])}
                             data={State.data[showTable]}/>
    }
}

export default withTranslation()(Table);