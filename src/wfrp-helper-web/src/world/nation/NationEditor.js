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
        return new Nation();
    }

    edit(toEdit: *): Nation {
        let nation = new Nation();
        nation.updateWith(toEdit);
        return nation;
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
                       onChange={event => this.update('name', event.target.value)}/>,
            <TextField key={'description'}
                       label={"Description"}
                       onChange={event => this.update('description', event.target.value)}
                       multiline/>
        ];
    }
}

export default NationEditor;