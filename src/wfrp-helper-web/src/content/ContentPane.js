import React, {Component} from "react";
import {State} from "../state/State";
import EntityEditor from "../form/EntityEditor";
import Table from "./Table";

class ContentPane extends Component {
    render() {
        const {showTable, showForm, entity} = State.data;
        let content = <div/>;
        if (showTable) {
            content = <Table/>
        } else if (showForm) {
            content = <EntityEditor entity={entity} entityName={showForm}/>
        }

        return content;
    }

}

export default ContentPane;