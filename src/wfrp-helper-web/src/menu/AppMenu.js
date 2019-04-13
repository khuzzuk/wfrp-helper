import React, {Component} from 'react';
import {AppBar, Toolbar} from "@material-ui/core";
import AppToolsMenu from "./AppToolsMenu";
import CrudWorldMenu from "../data/world/CrudWorldMenu";
import NationService from "../data/world/nation/NationService";
import CrudComponent from "../crud/CrudComponent";
import LanguageService from "../data/world/language/LanguageService";
import KnowledgeMenu from "../data/knowledge/KnowledgeMenu";
import SkillService from "../data/knowledge/skill/SkillService";
import SpellSchoolService from "../data/knowledge/magic/spellSchool/SpellSchoolService";
import ResourceService from "../data/crafting/resource/ResourceService";
import CraftingMenu from "../data/crafting/CraftingMenu";
import ItemService from "../data/crafting/item/ItemService";
import ArmorBlueprintService from "../data/crafting/blueprint/ArmorBlueprintService";

class AppMenu extends Component {
    state = {
        open: false,
        data: [],
        panelSupplier: () => {
        }
    };

    updateData = (data) => {
        this.setState({data: data})
    };

    nationService = new NationService(this.updateData);
    languageService = new LanguageService(this.updateData);
    skillService = new SkillService(this.updateData);
    spellSchoolService = new SpellSchoolService(this.updateData);

    //crafting services
    resourceService = new ResourceService(this.updateData);
    itemService = new ItemService(this.updateData);
    armorBlueprintService = new ArmorBlueprintService(this.updateData);

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
                                       languageService={this.languageService}
                                       onLanguage={this.getCrud(this.languageService)}/>
                        <CraftingMenu resourceService={this.resourceService} onResource={this.getCrud(this.resourceService)}
                                      itemService={this.itemService} onItem={this.getCrud(this.itemService)}
                                      armorBlueprintService={this.armorBlueprintService} onArmorBlueprint={this.getCrud(this.armorBlueprintService)}/>
                        <KnowledgeMenu skillService={this.skillService} onSkill={this.getCrud(this.skillService)}
                                       spellSchoolService={this.spellSchoolService} onSpellSchool={this.getCrud(this.spellSchoolService)}/>
                    </Toolbar>
                </AppBar>
                {panel}
            </div>
        )
    }
}

export default AppMenu;