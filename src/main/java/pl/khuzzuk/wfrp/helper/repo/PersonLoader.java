package pl.khuzzuk.wfrp.helper.repo;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.khuzzuk.wfrp.helper.model.creature.Person;
import pl.khuzzuk.wfrp.helper.repo.crud.PersonRepo;

import java.util.function.Consumer;

@SuppressWarnings("unchecked")
@RequiredArgsConstructor
@Service
public class PersonLoader {
    private static final Consumer FETCH = o -> {};
    private final PersonRepo personRepo;

    @Transactional
    public Person load(Person person) {
        Person result = personRepo.findById(person.getId()).orElseThrow();
        result.getPhysicalFeatures().forEach(FETCH);
        result.getSkills().forEach(FETCH);
        result.getProfessions().forEach(FETCH);
        result.getInventory().forEach(FETCH);
        result.getWeapons().forEach(FETCH);
        result.getRangedWeapons().forEach(FETCH);
        result.getArmors().forEach(FETCH);
        result.getSpellSchools().forEach((spellSchool, integer) -> {});
        result.getSpells().forEach(FETCH);
        return result;
    }
}
