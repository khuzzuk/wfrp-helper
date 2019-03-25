import CrudComponent from "../../crud/CrudComponent";
import React from 'react';
import NationEditor from "./NationEditor";

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

    update = (data) => {
        this.props.service.update(data);
        this.props.onChange();
    };

    apply = () => {

    };

    generateForm = () => {
        return <NationEditor open={this.state.showEditor} getEntity={() => this.state.entity} onApply={this.update}/>;
    };

    render(): * {
        return super.render();
    }
}

export default NationCrud;