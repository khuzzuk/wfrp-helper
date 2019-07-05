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
import MeleeWeaponService from "../data/crafting/item/melee/MeleeWeaponService";
import RangedWeaponService from "../data/crafting/item/ranged/RangedWeaponService";
import JewelryService from "../data/crafting/item/jewelry/JewelryService";
import PhysicalFeatureService from "../data/look/physicalFeatures/PhysicalFeatureService";
import LookMenu from "../data/look/LookMenu";
import RaceService from "../data/world/race/RaceService";
import ProfessionClassService from "../data/knowledge/profession/ProfessionClassService";
import ProfessionService from "../data/knowledge/profession/ProfessionService";
import CurrencyService from "../data/world/money/CurrencyService";
import SpellService from "../data/knowledge/magic/spell/SpellService";
import CharacterService from "../data/look/character/CharacterService";
import EyeColorService from "../data/look/eyeColor/EyeColorService";
import HairColorService from "../data/look/hairColor/HairColorService";
import AnimalKindService from "../data/creature/AnimalKindService";
import CreatureMenu from "../data/creature/CreatureMenu";
import AnimalService from "../data/creature/AnimalService";
import PersonService from "../data/creature/PersonService";
import CharacterSheetForm from "../characterSheet/CharacterSheetForm";
import ReligionService from "../data/world/religion/ReligionService";
import EntitySelect from "../crud/field/EntitySelect";
import RealmService from "../data/world/realm/RealmService";
import withStyles from "@material-ui/core/styles/withStyles";

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

    //world
    nationService = new NationService(this.updateData);
    languageService = new LanguageService(this.updateData);
    raceService = new RaceService(this.updateData);
    currencyService = new CurrencyService(this.updateData);
    religionService = new ReligionService(this.updateData);

    //knowledge
    skillService = new SkillService(this.updateData);
    spellSchoolService = new SpellSchoolService(this.updateData);
    spellService = new SpellService(this.updateData);
    professionClassService = new ProfessionClassService(this.updateData);
    professionService = new ProfessionService(this.updateData);

    //crafting services
    resourceService = new ResourceService(this.updateData);
    itemService = new ItemService(this.updateData);
    armorPatternService = new ArmorPatternService(this.updateData);
    armorService = new ArmorService(this.updateData);
    meleeWeaponService = new MeleeWeaponService(this.updateData);
    rangedWeaponService = new RangedWeaponService(this.updateData);
    jewelryService = new JewelryService(this.updateData);

    armorBlueprintService = new ArmorBlueprintService(this.updateData);
    armorBlueprintService = new ArmorBlueprintService(this.updateData);
    meleeWeaponBlueprintService = new MeleeWeaponBlueprintService(this.updateData);
    rangedWeaponBlueprintService = new RangedWeaponBlueprintService(this.updateData);

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

    getCrud = (service) => () => {
        this.setState({
            showEditor: false,
            currentService: service,
            customEditor: null
        });
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
                        <CrudWorldMenu nationService={this.nationService} onNation={this.getCrud(this.nationService)}
                                       languageService={this.languageService} onLanguage={this.getCrud(this.languageService)}
                                       raceService={this.raceService} onRace={this.getCrud(this.raceService)}
                                       currencyService={this.currencyService} onCurrency={this.getCrud(this.currencyService)}
                                       religionService={this.religionService} onReligion={this.getCrud(this.religionService)}
                                       realmService={this.realmService} onRealm={this.getCrud(this.realmService)}/>
                        <CraftingMenu resourceService={this.resourceService} onResource={this.getCrud(this.resourceService)}
                                      itemService={this.itemService} onItem={this.getCrud(this.itemService)}
                                      armorBlueprintService={this.armorBlueprintService} onArmorBlueprint={this.getCrud(this.armorBlueprintService)}
                                      meleeWeaponBlueprintService={this.meleeWeaponBlueprintService} onMeleeWeaponBlueprint={this.getCrud(this.meleeWeaponBlueprintService)}
                                      rangedWeaponBlueprintService={this.rangedWeaponBlueprintService} onRangedWeaponBlueprint={this.getCrud(this.rangedWeaponBlueprintService)}
                                      armorPatternService={this.armorPatternService} onArmorPattern={this.getCrud(this.armorPatternService)}
                                      armorService={this.armorService} onArmor={this.getCrud(this.armorService)}
                                      meleeWeaponService={this.meleeWeaponService} onMeleeWeapon={this.getCrud(this.meleeWeaponService)}
                                      rangedWeaponService={this.rangedWeaponService} onRangedWeapon={this.getCrud(this.rangedWeaponService)}
                                      jewelryService={this.jewelryService} onJewelry={this.getCrud(this.jewelryService)}/>
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
                    <CrudComponent rows={this.state.data}
                                   entity={this.state.entity}
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