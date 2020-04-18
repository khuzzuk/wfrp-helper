import RemoteService            from "../../client/RemoteService";
import CreatureDeterminants     from "../creature/CreatureDeterminants";
import Profession               from "../professions/Profession";
import Determinant              from "./Determinant";
import Modifier, {ModifierType} from "./Modifier";

export default class DeterminantService extends RemoteService {
  addExperienceExtension(determinant: Determinant, onAdded: VoidFunction) {
    this.requestFor(determinant,
                    'determinant/addExperienceExtension',
                    data => DeterminantService.afterResponse(data, onAdded));
  }

  removeExperienceExtension(determinant: Determinant, onRemoved) {
    this.requestFor(determinant,
                    'determinant/removeExperienceExtension',
                    data => DeterminantService.afterResponse(data, onRemoved));
  }

  static afterResponse(data, afterUpdate) {
    const newDeterminant = new Determinant();
    newDeterminant.updateWith(data);
    afterUpdate(newDeterminant);
  }

  static findDeterminantIn(determinants: Determinant[], type: string) {
    return determinants.find(determinant => type === determinant.type)
  }

  static removeModifiersByType(modifiers: Modifier[], type: string): Modifier[] {
    let mod = DeterminantService.findModifierByType(modifiers, type);
    while (mod) {
      modifiers.splice(modifiers.indexOf(mod), 1);
      mod = DeterminantService.findModifierByType(modifiers, type);
    }
    return modifiers;
  }

  static findModifierByType(modifiers: Modifier[], type: string): Modifier {
    return modifiers.find(value => value.type === type);
  }

  static sumValueByTypeIn(determinants: Determinant[], type: string): number {
    return determinants.filter(det => type === det.type)
                       .reduce((a, b) => a + b.calculateFinalValue(), 0)
  }

  static updateProfessionExtensions(profession: Profession,
                                    creatureDeterminants: CreatureDeterminants) {
    creatureDeterminants.determinants = creatureDeterminants.determinants.map(det => {
      DeterminantService.setProfessionExtensions(profession, det);
      return det;
    })
  }

  static setProfessionExtensions(profession: Profession, determinant: Determinant) {
    const professionExtensions = DeterminantService.findDeterminantIn(profession.determinants,
                                                                      determinant.type);
    if (professionExtensions) {
      determinant.modifiers =
          DeterminantService.removeModifiersByType(determinant.modifiers, ModifierType.PROFESSION);
      professionExtensions.modifiers.forEach(mod => {
        const newMod = new Modifier();
        newMod.type = mod.type;
        newMod.value = mod.value;
        determinant.modifiers.push(newMod);
      });
    }
  }
}