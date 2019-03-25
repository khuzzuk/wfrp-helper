import CrudComponent from "../../crud/CrudComponent";
import React from 'react';
import NationEditor from "./NationEditor";

class NationCrud extends CrudComponent {
    update = (data) => {
        this.props.service.save(data);
        this.onEditorClose()
    };

    generateForm = () => {
        return <NationEditor open={this.state.showEditor}
                             onClose={this.onEditorClose}
                             entity={this.state.entity}
                             onApply={this.update}/>;
    };
}

export default NationCrud;