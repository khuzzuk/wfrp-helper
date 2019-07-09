import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import SelectableList from "../crud/field/SelectableList";
import SpellElement from "./SpellElement";
import EntityComponent from "../crud/EntityComponent";
import SimpleTextField, {TextFieldType} from "../crud/field/SimpleTextField";

const sectionStyle = {
    container: {
        marginLeft: 45,
        display: 'flex',
    },

    spellList: {
        minWidth: 620,
        maxWidth: 620,
        minHeight: 240,
        maxHeight: 240,
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

class MagicSection extends EntityComponent {
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

    render() {
        const {
            customStyle, classes,
            entity, personService,
            ...other
        } = this.props;
        const currentStyle = {...classes, ...customStyle};
        const spells = entity.spells;

        return <div className={currentStyle.container} {...other}>
            <SelectableList customStyle={{container: currentStyle.spellList}}
                            data={this.getRelevantSpells()}
                            onGearAdd={this.pushToEntity('spells')}>
                {
                    spells.map(spell => <SpellElement key={spell.name}
                                                      spell={spell}
                                                      onContextMenu={this.removeOnContextMenu('spells')}/>)
                }
            </SelectableList>
            <div className={currentStyle.magicPointsSection}>
                <SimpleTextField className={currentStyle.fatePoints}
                                 value={entity.fatePoints}
                                 variant={TextFieldType.INT}
                                 onChange={this.updateEntity('fatePoints')}/>
                <SimpleTextField className={currentStyle.manaPoints}
                                 value={entity.mana}
                                 variant={TextFieldType.INT}
                                 onChange={this.updateEntity('mana')}/>
                <SimpleTextField className={currentStyle.currentManaPoints}
                                 value={entity.currentMana}
                                 variant={TextFieldType.INT}
                                 onChange={this.updateEntity('currentMana')}/>
            </div>
        </div>;
    }
}

export default withStyles(sectionStyle)(MagicSection);