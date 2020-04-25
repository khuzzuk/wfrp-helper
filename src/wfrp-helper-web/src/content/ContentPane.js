import React, {Component} from "react";
import EntityEditor from "../form/EntityEditor";
import PictureUploadForm from "../img/PictureUploadForm";
import {State} from "../state/State";
import Table from "./Table";

class ContentPane extends Component {
  render() {
    const {showTable, showForm, entity} = State.data;
    let content                         = <div/>;

    if (showTable) {
      content = <Table/>

    } else if (showForm) {
      if (showForm === 'picture') {
          content = <PictureUploadForm value={entity.id ? entity : undefined}/>
      } else {
        content = <EntityEditor entity={entity} entityName={showForm}/>
      }
    }

    return content;
  }

}

export default ContentPane;