package pl.khuzzuk.wfrp.helper.service.realm;

import lombok.AllArgsConstructor;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;
import pl.javahello.Adapter;
import pl.khuzzuk.wfrp.helper.model.creature.Person;
import pl.khuzzuk.wfrp.helper.model.creature.PersonDTO;
import pl.khuzzuk.wfrp.helper.model.knowledge.magic.SpellSchool;
import pl.khuzzuk.wfrp.helper.model.knowledge.magic.SpellSchoolDTO;
import pl.khuzzuk.wfrp.helper.model.money.Currency;
import pl.khuzzuk.wfrp.helper.model.money.CurrencyDTO;
import pl.khuzzuk.wfrp.helper.model.world.*;
import pl.khuzzuk.wfrp.helper.security.role.RoleRepo;

import javax.transaction.Transactional;

@AllArgsConstructor
@RestController
@RequestMapping("realmData")
public class RealmDataRemoteService {
    private RealmDataService realmDataService;
    private Adapter<Nation, NationDTO> nationDTOAdapter;
    private Adapter<WorldLanguage, WorldLanguageDTO> worldLanguageDTOAdapter;
    private Adapter<Person, PersonDTO> personDTOAdapter;
    private Adapter<Religion, ReligionDTO> religionDTOAdapter;
    private Adapter<Currency, CurrencyDTO> currencyDTOAdapter;
    private Adapter<Race, RaceDTO> raceDTOAdapter;
    private Adapter<SpellSchool, SpellSchoolDTO> spellSchoolDTOAdapter;

    @Transactional
    @GetMapping("{id}")
    @Secured(RoleRepo.ROLE_USER)
    public @ResponseBody RealmData getRealmData(@PathVariable("id") long id) {
        Realm realm = realmDataService.getRealmById(id);

        RealmData realmData = new RealmData();
        realmData.setPersons(personDTOAdapter.list(realm.getPersons()));
        realmData.setNations(nationDTOAdapter.list(realm.getNations()));
        realmData.setSpellSchools(spellSchoolDTOAdapter.list(realm.getSpellSchools()));
        realmData.setRaces(raceDTOAdapter.list(realmDataService.getRacesForRealm(realm)));
        realmData.setLanguages(worldLanguageDTOAdapter.list(realmDataService.getLanguagesForRealm(realm)));
        realmData.setReligions(religionDTOAdapter.list(realmDataService.getReligionsForRealm(realm)));
        realmData.setCurrencies(currencyDTOAdapter.list(realmDataService.getCurrenciesForRealm(realm)));

        return realmData;
    }
}
