package pl.khuzzuk.wfrp.helper.repo;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.khuzzuk.wfrp.helper.model.creature.Person;
import pl.khuzzuk.wfrp.helper.repo.crud.PersonRepo;

import java.util.function.Consumer;

@RequiredArgsConstructor
@Service
public class PersonLoader {
    private static final Consumer DO_NOTHING = o -> {};
    private final PersonRepo personRepo;

    @Transactional
    public Person load(Person person) {
        Person result = personRepo.findById(person.getId()).get();
        result.getPhysicalFeatures().forEach(DO_NOTHING);
        result.getSkills().forEach(DO_NOTHING);
        result.getProfessions().forEach(DO_NOTHING);
        result.getInventory().forEach(DO_NOTHING);
        result.getWeapons().forEach(DO_NOTHING);
        result.getRangedWeapons().forEach(DO_NOTHING);
        result.getArmors().forEach(DO_NOTHING);
        result.getSpellSchools().forEach((spellSchool, integer) -> {});
        result.getSpells().forEach(DO_NOTHING);
        return result;
    }
}
