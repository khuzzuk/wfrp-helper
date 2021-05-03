import React, {Component} from "react";
import EntityEditor from "../form/EntityEditor";
import PictureUploadForm from "../img/PictureUploadForm";
import ScenarioView from "../scenario/ScenarioView";
import {State} from "../state/State";
import Table from "./Table";

class ContentPane extends Component {
  render() {
    const {showTable, showForm, showScenario, entity} = State.data;

    if (showTable) {
      return <Table/>;
    }

    if (showForm === 'picture') {
      return <PictureUploadForm value={entity.id ? entity : undefined}/>;
    }

    if (showForm) {
      return <EntityEditor entity={entity} entityName={showForm}/>;
    }

    if (showScenario) {
      return <ScenarioView/>;
    }

    return <div/>
  }

}

export default ContentPane;