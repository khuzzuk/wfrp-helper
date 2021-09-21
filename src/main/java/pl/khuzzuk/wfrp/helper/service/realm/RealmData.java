package pl.khuzzuk.wfrp.helper.service.realm;

import lombok.Getter;
import lombok.Setter;
import pl.khuzzuk.wfrp.helper.model.creature.PersonDTO;
import pl.khuzzuk.wfrp.helper.model.knowledge.magic.SpellSchoolDTO;
import pl.khuzzuk.wfrp.helper.model.money.CurrencyDTO;
import pl.khuzzuk.wfrp.helper.model.world.NationDTO;
import pl.khuzzuk.wfrp.helper.model.world.RaceDTO;
import pl.khuzzuk.wfrp.helper.model.world.ReligionDTO;
import pl.khuzzuk.wfrp.helper.model.world.WorldLanguageDTO;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class RealmData {

  private List<NationDTO> nations = new ArrayList<>();
  private List<WorldLanguageDTO> languages = new ArrayList<>();
  private List<SpellSchoolDTO> spellSchools = new ArrayList<>();
  private List<ReligionDTO> religions = new ArrayList<>();
  private List<CurrencyDTO> currencies = new ArrayList<>();
  private List<RaceDTO> races = new ArrayList<>();
  private List<PersonDTO> persons = new ArrayList<>();
}
