import IconButton from "@material-ui/core/IconButton";
import {Add, Delete, Edit, OpenInNew} from "@material-ui/icons";
import MUIDataTable from "mui-datatables";
import React, {Component} from "react";
import {withTranslation} from "react-i18next";
import RealmDataService from "../client/RealmDataService";
import {State} from "../state/State";
import AuthoritiesService from "../user/AuthoritiesService";
import {Collections} from "../util/Collections";

class Table extends Component {
  options = {
    filterType: 'textField',
    selectableRows: "single",
    selectableRowsOnClick: true,
    disableToolbarSelect: true,
    selectableRowsHeader: false,
    customToolbarSelect: (selectedRows, displayData, setSelectedRows) => {
      if (selectedRows.data.length > 0) {
        const data = State.data;
        const entityName = State.data.showTable;
        const dataIndex    = selectedRows.data[0].index;
        const selectedName = displayData[dataIndex].data[0];
        const entity = Collections.findByName(State.data[entityName], {name: selectedName});

        if (AuthoritiesService.hasAuthority(entityName)) {
          return <React.Fragment>
            <div>
              <IconButton onClick={() => State.showForm(entityName, entity)}><Edit/></IconButton>
              <IconButton
                  onClick={() => State.services[entityName].delete(entity)}><Delete/></IconButton>
            </div>
          </React.Fragment>;
        } else {
          return <React.Fragment>
            <IconButton onClick={() => State.showForm(entityName, entity)}><OpenInNew/></IconButton>
          </React.Fragment>
        }
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
    const {showTable}  = State.data;
    const {t}          = this.props;
    const hasAuthority = AuthoritiesService.hasAuthority(showTable);

    const title = <div>
      {t(showTable)}
      {hasAuthority ? <IconButton onClick={() => State.update({
                                                                showTable: null,
                                                                showForm: showTable,
                                                                entity: State.suppliers[showTable]()
                                                              })}>
        <Add/>
      </IconButton> : <div/>}
    </div>;

    const data = RealmDataService.hasRealmData(showTable) ?
        RealmDataService.getRealmData(showTable) :
        State.data[showTable];
    return <MUIDataTable title={title}
                         options={this.options}
                         columns={this.translateColumns(State.columns[showTable])}
                         data={data}/>
  }
}

export default withTranslation()(Table);