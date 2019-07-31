package pl.khuzzuk.wfrp.helper.service.realm;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import pl.khuzzuk.remote.Adapter;
import pl.khuzzuk.wfrp.helper.model.creature.Person;
import pl.khuzzuk.wfrp.helper.model.creature.PersonDTO;
import pl.khuzzuk.wfrp.helper.model.money.Currency;
import pl.khuzzuk.wfrp.helper.model.money.CurrencyDTO;
import pl.khuzzuk.wfrp.helper.model.world.*;

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

    @Transactional
    @GetMapping("{id}")
    public @ResponseBody RealmData getRealmData(@PathVariable("id") long id) {
        Realm realm = realmDataService.getRealmById(id);

        RealmData realmData = new RealmData();
        realmData.setPersons(personDTOAdapter.list(realm.getPersons()));
        realmData.setNations(nationDTOAdapter.list(realm.getNations()));
        realmData.setLanguages(worldLanguageDTOAdapter.list(realmDataService.getLanguagesForRealm(realm)));
        realmData.setReligions(religionDTOAdapter.list(realmDataService.getReligionsForRealm(realm)));
        realmData.setCurrencies(currencyDTOAdapter.list(realmDataService.getCurrenciesForRealm(realm)));

        return realmData;
    }
}
