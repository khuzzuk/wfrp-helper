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
import MeleeWeaponBlueprintService from "../data/crafting/blueprint/MeleeWeaponBlueprintService";
import RangedWeaponBlueprintService from "../data/crafting/blueprint/RangedWeaponBlueprintService";
import ArmorPatternService from "../data/crafting/item/armor/ArmorPatternService";
import ArmorService from "../data/crafting/item/armor/ArmorService";

class AppMenu extends Component {
    state = {
        showEditor: false,
        data: [],
        entity: null,
        currentService: null,
    };

    constructor(props) {
        super(props);
        console.log('new crud')
    }

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
    armorPatternService = new ArmorPatternService(this.updateData);
    armorService = new ArmorService(this.updateData);

    armorBlueprintService = new ArmorBlueprintService(this.updateData);
    armorBlueprintService = new ArmorBlueprintService(this.updateData);
    meleeWeaponBlueprintService = new MeleeWeaponBlueprintService(this.updateData);
    rangedWeaponBlueprintService = new RangedWeaponBlueprintService(this.updateData);

    onApply = (newState) => {
        this.setState({...newState});
    };

    getCrud = (service) => () => {
        this.setState({
            showEditor: false,
            currentService: service,
        });
    };

    render() {
        return (
            <div>
                <AppBar position={"relative"}>
                    <Toolbar>
                        <AppToolsMenu/>
                        <CrudWorldMenu nationService={this.nationService} onNation={this.getCrud(this.nationService)}
                                       languageService={this.languageService}
                                       onLanguage={this.getCrud(this.languageService)}/>
                        <CraftingMenu resourceService={this.resourceService}
                                      onResource={this.getCrud(this.resourceService)}
                                      itemService={this.itemService} onItem={this.getCrud(this.itemService)}
                                      armorBlueprintService={this.armorBlueprintService}
                                      onArmorBlueprint={this.getCrud(this.armorBlueprintService)}
                                      meleeWeaponBlueprintService={this.meleeWeaponBlueprintService}
                                      onMeleeWeaponBlueprint={this.getCrud(this.meleeWeaponBlueprintService)}
                                      rangedWeaponBlueprintService={this.rangedWeaponBlueprintService}
                                      onRangedWeaponBlueprint={this.getCrud(this.rangedWeaponBlueprintService)}
                                      armorPatternService={this.armorPatternService}
                                      onArmorPattern={this.getCrud(this.armorPatternService)}
                                      armorService={this.armorService} onArmor={this.getCrud(this.armorService)}/>
                        <KnowledgeMenu skillService={this.skillService} onSkill={this.getCrud(this.skillService)}
                                       spellSchoolService={this.spellSchoolService}
                                       onSpellSchool={this.getCrud(this.spellSchoolService)}/>
                    </Toolbar>
                </AppBar>
                {this.state.currentService
                    ?
                    <CrudComponent rows={this.state.data}
                                   entity={this.state.entity}
                                   service={this.state.currentService}
                                   onChange={this.onApply}
                                   showEditor={this.state.showEditor}/>
                    : null}
            </div>
        )
    }
}

export default AppMenu;