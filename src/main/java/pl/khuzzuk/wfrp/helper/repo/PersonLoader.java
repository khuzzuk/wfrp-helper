package pl.khuzzuk.wfrp.helper.repo;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.khuzzuk.wfrp.helper.model.creature.Person;
import pl.khuzzuk.wfrp.helper.repo.crud.PersonRepo;

@RequiredArgsConstructor
@Service
public class PersonLoader {
    private final PersonRepo personRepo;

    @Transactional
    public Person load(Person person) {
        Person result = personRepo.findById(person.getId()).get();
        result.getPhysicalFeatures().forEach(e -> {});
        result.getSkills().forEach(e -> {});
        result.getProfessions().forEach(e -> {});
        return result;
    }
}
