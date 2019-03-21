import React from 'react';
import type EntityEditor from "../../crud/EntityEditor";
import Nation from "./Nation";
import {TextField} from "@material-ui/core";
import NationService from "./NationService";

class NationEditor implements EntityEditor {
    title = 'Nation Form';
    nationService: NationService;
    nation = new Nation();

    createNew(): Nation {
        this.nation = new Nation();
        return this.nation;
    }

    edit(toEdit: *): Nation {
        this.nation = new Nation();
        this.nation.updateWith(toEdit);
        return this.nation;
    }

    update = (property, value) => {
        this.nation.updateWith({[property]: value});
    };

    save = () => {
        this.nationService.save(this.nation);
        console.log(this.nation);
        return this.nation;
    };

    getFields() {
        return [
            <TextField key={'name'}
                       label={"Name"}
                       onChange={event => this.update('name', event.target.value)}
                       value={this.nation.name}/>,
            <TextField key={'description'}
                       label={"Description"}
                       onChange={event => this.update('description', event.target.value)}
                       value={this.nation.description}
                       multiline/>
        ];
    }
}

export default NationEditor;