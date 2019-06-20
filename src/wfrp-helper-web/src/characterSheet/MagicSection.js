import React, {Component} from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import SelectableList from "../crud/field/SelectableList";
import SpellElement from "./SpellElement";
import IntegerField from "../crud/field/IntegerField";

const sectionStyle = {
    container: {
        marginLeft: 45,
        display: 'flex',
    },
    input: {
        fontFamily: 'wfrp',
        fontSize: '24px',
        textAlign: 'center'
    },

    spellList: {
        minWidth: 620,
        maxWidth: 620,
        minHeight: 280,
        maxHeight: 280,
    },
    spellItemList: {
        width: '100%',
        minHeight: '100%',
        maxHeight: '100%',
    },
    magicPointsSection: {
        paddingLeft: 5,
        minWidth: 190,
        maxWidth: 190,
        minHeight: 280,
        maxHeight: 280,
        display: 'flex',
        flexFlow: 'column',
    },
    fatePoints: {
        width: '100%',
        minHeight: 50,
        maxHeight: 50,
        paddingTop: 60,
    },
    manaPoints: {
        width: '100%',
        minHeight: 50,
        maxHeight: 50,
        paddingTop: 36,
    },
    currentManaPoints: {
        width: '100%',
        minHeight: 50,
        maxHeight: 50,
        paddingTop: 36,
    },
};

class MagicSection extends Component {
    addSpell = spell => {
        const person = this.props.entity;
        const found = person.spells.find(value => spell.name === value.name);
        if (!found) {
            person.spells.push(spell);
            this.props.onChange(person);
        }
    };

    removeSpell = spell => {
        const person = this.props.entity;
        person.spells.splice(person.spells.indexOf(spell), 1);
        this.props.onChange(person);
    };

    getRelevantSpells = () => {
        const personSpells = this.props.entity.spells;
        const personSchools = this.props.entity.spellSchools;
        const availableSpells = this.props.personService.spells;
        const finalSpells = availableSpells.filter(spell => {
            return !personSpells.find(pSpell => pSpell.name === spell.name) &&
                personSchools.find(schoolLevel => schoolLevel.spellSchool.name === spell.spellSchool.name && schoolLevel.level >= spell.level);
        });
        return finalSpells;
    };

    updateProperty = name => value => {
        this.props.entity[name] = value;
        this.props.onChange(this.props.entity);
    };

    render() {
        const {
            customStyle, classes,
            entity, personService,
            ...other
        } = this.props;
        const currentStyle = {...classes, ...customStyle};
        const spells = entity.spells;

        return <div className={currentStyle.container} {...other}>
            <SelectableList customStyle={{gearField: currentStyle.spellList, itemsList: currentStyle.spellItemList}}
                            data={this.getRelevantSpells()}
                            onGearAdd={this.addSpell}>
                {
                    spells.map(spell => <SpellElement key={spell.name}
                                                      spell={spell}
                                                      onContextMenu={this.removeSpell}/>)
                }
            </SelectableList>
            <div className={currentStyle.magicPointsSection}>
                <IntegerField className={currentStyle.fatePoints} value={entity.fatePoints}
                              onChange={this.updateProperty('fatePoints')} inputProps={{className: currentStyle.input}}/>
                <IntegerField className={currentStyle.manaPoints} value={entity.mana}
                              onChange={this.updateProperty('mana')} inputProps={{className: currentStyle.input}}/>
                <IntegerField className={currentStyle.currentManaPoints} value={entity.currentMana}
                              onChange={this.updateProperty('currentMana')} inputProps={{className: currentStyle.input}}/>
            </div>
        </div>;
    }
}

export default withStyles(sectionStyle)(MagicSection);