import React, {Component} from 'react';
import {AppBar, Toolbar} from "@material-ui/core";
import AppToolsMenu from "./AppToolsMenu";
import CrudWorldMenu from "../data/world/CrudWorldMenu";
import NationService from "../data/world/nation/NationService";
import CrudComponent from "../crud/CrudComponent";
import LanguageService from "../data/world/language/LanguageService";
import KnowledgeMenu from "../data/knowledge/KnowledgeMenu";
import SkillService from "../data/knowledge/skill/SkillService";

class AppMenu extends Component {
    state = {
        open: false,
        data: [],
        panelSupplier: () => {
        }
    };

    nationService = new NationService((data) => this.updateData(data));
    languageService = new LanguageService((data) => this.updateData(data));
    skillService = new SkillService((data) => this.updateData(data));

    updateData = (data) => {
        this.setState({data: data})
    };

    handleClose = event => {
        if (!this.anchorEl.contains(event.target)) {
            this.setState({open: false});
        }
    };

    getCrud = (service) => () => {
        this.setState({
            panelSupplier: () => {
                return <CrudComponent rows={this.state.data} service={service} onChange={this.setState}/>
            }
        });

    };

    render() {
        let panel = this.state.panelSupplier();
        return (
            <div>
                <AppBar position={"relative"}>
                    <Toolbar>
                        <AppToolsMenu/>
                        <CrudWorldMenu nationService={this.nationService} onNation={this.getCrud(this.nationService)}
                                       languageService={this.languageService} onLanguage={this.getCrud(this.languageService)}/>
                        <KnowledgeMenu skillService={this.skillService} onSkill={this.getCrud(this.skillService)}/>
                    </Toolbar>
                </AppBar>
                {panel}
            </div>
        )
    }
}

export default AppMenu;