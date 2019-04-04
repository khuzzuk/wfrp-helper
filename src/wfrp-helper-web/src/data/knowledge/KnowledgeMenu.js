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

    getMenuItems = () => {
        return [
            <MenuItem onClick={this.showSkillCrud}>Skill</MenuItem>
        ];
    };
}

export default KnowledgeMenu;