import React, {Component} from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import SelectableList from "../crud/field/SelectableList";
import SpellElement from "./SpellElement";

const sectionStyle = {
    container: {
        marginLeft: 45,
    },
    spellList: {
        minWidth: 700,
        maxWidth: 700,
        minHeight: 280,
        maxHeight: 280,
    },
    spellItemList: {
        width: '100%',
        minHeight: '100%',
        maxHeight: '100%',
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
        console.log(availableSpells);
        console.log(finalSpells);
        return finalSpells;
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
        </div>;
    }
}

export default withStyles(sectionStyle)(MagicSection);