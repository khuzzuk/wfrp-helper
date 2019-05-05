import React from "react";
import MenuComponent from "../../menu/MenuComponent";
import {MenuItem} from "@material-ui/core";

class KnowledgeMenu extends MenuComponent {
    title = 'Knowledge';

    getMenuItems = () => {
        const {
            onSpellSchool, spellSchoolService,
            onSpell, spellService,
            onSkill, skillService,
            onProfessionClass, professionClassService,
            onProfession, professionService} = this.props;

        return [
            <MenuItem key={'skill'} onClick={this.showCrudAction(onSkill, skillService)}>Skill</MenuItem>,
            <MenuItem key={'spellSchool'} onClick={this.showCrudAction(onSpellSchool, spellSchoolService)}>Spell School</MenuItem>,
            <MenuItem key={'spell'} onClick={this.showCrudAction(onSpell, spellService)}>Spell</MenuItem>,
            <MenuItem key={'professionClass'} onClick={this.showCrudAction(onProfessionClass, professionClassService)}>Class</MenuItem>,
            <MenuItem key={'profession'} onClick={this.showCrudAction(onProfession, professionService)}>Profession</MenuItem>,
        ];
    };
}

export default KnowledgeMenu;