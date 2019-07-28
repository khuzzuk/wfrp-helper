import React from "react";
import MenuComponent from "../../menu/MenuComponent";
import {MenuItem} from "@material-ui/core";
import {store} from "../../state";

class KnowledgeMenu extends MenuComponent {
    title = 'Knowledge';

    getMenuItems = () => {
        const {onCrud} = this.props;

        return [
            <MenuItem key={'skill'} onClick={this.showCrudAction(onCrud, store.skillService)}>Skill</MenuItem>,
            <MenuItem key={'spellSchool'} onClick={this.showCrudAction(onCrud, store.spellSchoolService)}>Spell
                School</MenuItem>,
            <MenuItem key={'spell'} onClick={this.showCrudAction(onCrud, store.spellService)}>Spell</MenuItem>,
            <MenuItem key={'professionClass'}
                      onClick={this.showCrudAction(onCrud, store.professionClassService)}>Class</MenuItem>,
            <MenuItem key={'profession'}
                      onClick={this.showCrudAction(onCrud, store.professionService)}>Profession</MenuItem>,
        ];
    };
}

export default KnowledgeMenu;