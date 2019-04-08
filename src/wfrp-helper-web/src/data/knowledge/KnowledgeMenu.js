import React from "react";
import MenuComponent from "../../menu/MenuComponent";
import {MenuItem} from "@material-ui/core";

class KnowledgeMenu extends MenuComponent {
    title = 'Knowledge';

    showSkillCrud = () => {
        this.handleClose();
        this.props.onSkill();
        this.props.skillService.retrieveData();
    };

    showSpellSchool = () => {
        this.handleClose();
        this.props.onSpellSchool();
        this.props.spellSchoolService.retrieveData();
    };

    showSpell = () => {
        this.handleClose();
        this.props.onSpellSchool();
        this.props.spellSchoolService.retrieveData();
    };

    getMenuItems = () => {
        return [
            <MenuItem key={'skill'} onClick={this.showSkillCrud}>Skill</MenuItem>,
            <MenuItem key={'spellSchool'} onClick={this.showSpellSchool}>Spell School</MenuItem>,
            <MenuItem key={'spell'} onClick={this.showSpell}>Spell</MenuItem>
        ];
    };
}

export default KnowledgeMenu;