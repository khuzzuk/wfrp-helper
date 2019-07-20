import React, {Component} from 'react';
import {AppBar, Toolbar} from "@material-ui/core";
import AppToolsMenu from "./AppToolsMenu";
import CrudWorldMenu from "../data/world/CrudWorldMenu";
import CrudComponent from "../crud/CrudComponent";
import KnowledgeMenu from "../data/knowledge/KnowledgeMenu";
import SkillService from "../data/knowledge/skill/SkillService";
import SpellSchoolService from "../data/knowledge/magic/spellSchool/SpellSchoolService";
import CraftingMenu from "../data/crafting/CraftingMenu";
import PhysicalFeatureService from "../data/look/physicalFeatures/PhysicalFeatureService";
import LookMenu from "../data/look/LookMenu";
import ProfessionClassService from "../data/knowledge/profession/ProfessionClassService";
import ProfessionService from "../data/knowledge/profession/ProfessionService";
import SpellService from "../data/knowledge/magic/spell/SpellService";
import CharacterService from "../data/look/character/CharacterService";
import EyeColorService from "../data/look/eyeColor/EyeColorService";
import HairColorService from "../data/look/hairColor/HairColorService";
import AnimalKindService from "../data/creature/AnimalKindService";
import CreatureMenu from "../data/creature/CreatureMenu";
import AnimalService from "../data/creature/AnimalService";
import PersonService from "../data/creature/PersonService";
import CharacterSheetForm from "../characterSheet/CharacterSheetForm";
import EntitySelect from "../crud/field/EntitySelect";
import RealmService from "../data/world/realm/RealmService";
import withStyles from "@material-ui/core/styles/withStyles";
import {store} from "../state";

const style = {
    realmSelect: {
        marginLeft: 'auto',
        minWidth: 300,
        maxWidth: 300,
    },
};

class AppMenu extends Component {
    state = {
        showEditor: false,
        data: [],
        entity: null,
        currentService: null,
        customEditor: null
    };

    updateData = (data) => {
        this.setState({data: data, customEditor: null})
    };

    //knowledge
    skillService = new SkillService(this.updateData);
    spellSchoolService = new SpellSchoolService(this.updateData);
    spellService = new SpellService(this.updateData);
    professionClassService = new ProfessionClassService(this.updateData);
    professionService = new ProfessionService(this.updateData);

    //Look
    characterService = new CharacterService(this.updateData);
    eyeColorService = new EyeColorService(this.updateData);
    hairColorService = new HairColorService(this.updateData);
    physicalFeatureService = new PhysicalFeatureService(this.updateData);

    //creatures
    animalService = new AnimalService(this.updateData);
    animalKindService = new AnimalKindService(this.updateData);

    personEditor = (entity) => <CharacterSheetForm entity={entity} onChange={this.onApply} personService={this.personService}/>;
    personService = new PersonService(data => {this.setState({data: data, customEditor: this.personEditor})});

    realmService = new RealmService(this.updateData);

    constructor(props: P, context: any) {
        super(props, context);
        this.realmService.addDataListener(data => this.setState({realms: data}));
        this.realmService.retrieveData();
    }

    onApply = (newState) => {
        this.setState({...newState});
    };

    getCrud = () => service => {
        this.setState({
            showEditor: false,
            currentService: service,
            customEditor: null
        });
    };

    showCrud = service => () => {
        this.setState({
            showEditor: false,
            currentService: service,
            customEditor: null
        })
    };

    onPerson = () => {
        this.setState({showEditor: false, currentService: this.personService, customEditor: this.personEditor})
    };

    render() {
        return (
            <div>
                <AppBar position={"relative"}>
                    <Toolbar>
                        <AppToolsMenu/>
                        <CrudWorldMenu onCrud={this.getCrud()} store={store}/>
                        <CraftingMenu onCrud={this.getCrud()}
                                      onArmorBlueprint={this.showCrud()}
                                      onMeleeWeaponBlueprint={this.getCrud()}
                                      onRangedWeaponBlueprint={this.getCrud()}/>
                        <KnowledgeMenu skillService={this.skillService} onSkill={this.getCrud(this.skillService)}
                                       spellSchoolService={this.spellSchoolService} onSpellSchool={this.getCrud(this.spellSchoolService)}
                                       spellService={this.spellService} onSpell={this.getCrud(this.spellService)}
                                       professionClassService={this.professionClassService} onProfessionClass={this.getCrud(this.professionClassService)}
                                       professionService={this.professionService} onProfession={this.getCrud(this.professionService)}/>
                        <LookMenu characterService={this.characterService} onCharacter={this.getCrud(this.characterService)}
                                  eyeColorService={this.eyeColorService} onEyeColor={this.getCrud(this.eyeColorService)}
                                  hairColorService={this.hairColorService} onHairColor={this.getCrud(this.hairColorService)}
                                  physicalFeatureService={this.physicalFeatureService} onPhysicalFeature={this.getCrud(this.physicalFeatureService)}/>
                        <CreatureMenu animalService={this.animalService} onAnimal={this.getCrud(this.animalService)}
                                      animalKindService={this.animalKindService} onAnimalKind={this.getCrud(this.animalKindService)}
                                      personService={this.personService} onPerson={this.onPerson}/>
                        <EntitySelect className={this.props.classes.realmSelect}
                                      data={this.state.realms}
                                      value={this.state.realm}
                                      onChange={realm => this.setState({realm: realm})}/>
                    </Toolbar>
                </AppBar>
                {this.state.currentService
                    ?
                    <CrudComponent entity={this.state.currentService.entity}
                                   service={this.state.currentService}
                                   onChange={this.onApply}
                                   customEditor={this.state.customEditor || null}
                                   showEditor={this.state.showEditor}/>
                    : null}
            </div>
        )
    }
}

export default withStyles(style)(AppMenu);