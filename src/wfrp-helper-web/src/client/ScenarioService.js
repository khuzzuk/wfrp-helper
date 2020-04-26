import Picture from "../img/Picture";
import Scenario from "../model/realm/Scenario";

export default class ScenarioService {
  static fetchPicturesForScenario(scenario: Scenario, onData: number[] => void) {
    fetch(`${Picture.entityName}/${Scenario.entityName}/${scenario.id}`, {
      method: 'get',
    }).then(response => {
      if (response.ok) {
        response.json().then(onData);
      } else {
        alert(response.status);
      }
    });
  }
}