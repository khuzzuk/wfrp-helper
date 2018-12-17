package pl.khuzzuk.wfrp.helper.repo;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.khuzzuk.wfrp.helper.model.creature.Person;

import javax.persistence.EntityManager;

@RequiredArgsConstructor
@Service
@Transactional
class EntityUpdater implements Updater<Person> {
    private final EntityManager entityManager;

    @Override
    public void update(Person person) {
        entityManager.merge(person);
        entityManager.flush();
        entityManager.clear();

        Person found = entityManager.find(Person.class, person.getId());
        System.out.println(found);
    }
}
