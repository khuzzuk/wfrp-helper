package pl.khuzzuk.wfrp.helper.service.realm;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import pl.khuzzuk.wfrp.helper.model.money.Currency;
import pl.khuzzuk.wfrp.helper.model.money.CurrencyRepo;
import pl.khuzzuk.wfrp.helper.model.world.Nation;
import pl.khuzzuk.wfrp.helper.model.world.Race;
import pl.khuzzuk.wfrp.helper.model.world.RaceRepo;
import pl.khuzzuk.wfrp.helper.model.world.Realm;
import pl.khuzzuk.wfrp.helper.model.world.RealmRepo;
import pl.khuzzuk.wfrp.helper.model.world.Religion;
import pl.khuzzuk.wfrp.helper.model.world.ReligionRepo;
import pl.khuzzuk.wfrp.helper.model.world.WorldLanguage;
import pl.khuzzuk.wfrp.helper.model.world.WorldLanguageRepo;

@AllArgsConstructor
@Service
public class RealmDataService {
    private RealmRepo realmRepo;
    private WorldLanguageRepo worldLanguageRepo;
    private ReligionRepo religionRepo;
    private CurrencyRepo currencyRepo;
    private RaceRepo raceRepo;

    Realm getRealmById(long id) {
        return realmRepo.findById(id).orElseGet(Realm::new);
    }

    List<WorldLanguage> getLanguagesForRealm(Realm realm) {
        List<Nation> nations = realm.getNations();
        return worldLanguageRepo.findAll()
                .stream()
                .filter(language -> !Collections.disjoint(nations, language.getNations()))
                .collect(Collectors.toList());
    }

    List<Religion> getReligionsForRealm(Realm realm) {
        List<Nation> nations = realm.getNations();
        return religionRepo.findAll().stream()
                .filter(religion -> !Collections.disjoint(nations, religion.getNations()))
                .collect(Collectors.toList());
    }

    List<Currency> getCurrenciesForRealm(Realm realm) {
        List<Nation> nations = realm.getNations();
        return currencyRepo.findAll().stream()
                .filter(currency -> !Collections.disjoint(nations, currency.getNations()))
                .collect(Collectors.toList());
    }

    List<Race> getRacesForRealm(Realm realm) {
        List<Nation> nations = realm.getNations();
        return raceRepo.findAll()
            .stream()
            .filter(race -> !Collections.disjoint(nations, race.getNations()))
            .collect(Collectors.toList());
    }
}
