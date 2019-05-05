import React from "react";
import MenuComponent from "../../menu/MenuComponent";
import {MenuItem} from "@material-ui/core";

class KnowledgeMenu extends MenuComponent {
    title = 'Knowledge';

    showSpell = () => {
        this.handleClose();
        this.props.onSpellSchool();
        this.props.spellSchoolService.retrieveData();
    };

    getMenuItems = () => {
        const {
            onSpellSchool, spellSchoolService,
            onSkill, skillService,
            onProfessionClass, professionClassService,
            onProfession, professionService} = this.props;

        return [
            <MenuItem key={'skill'} onClick={this.showCrudAction(onSkill, skillService)}>Skill</MenuItem>,
            <MenuItem key={'spellSchool'} onClick={this.showCrudAction(onSpellSchool, spellSchoolService)}>Spell School</MenuItem>,
            <MenuItem key={'spell'} onClick={this.showSpell}>Spell</MenuItem>,
            <MenuItem key={'professionClass'} onClick={this.showCrudAction(onProfessionClass, professionClassService)}>Class</MenuItem>,
            <MenuItem key={'profession'} onClick={this.showCrudAction(onProfession, professionService)}>Profession</MenuItem>,
        ];
    };
}

export default KnowledgeMenu;