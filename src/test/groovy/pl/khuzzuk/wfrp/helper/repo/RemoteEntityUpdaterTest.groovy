package pl.khuzzuk.wfrp.helper.repo

import io.zonky.test.db.AutoConfigureEmbeddedDatabase
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.transaction.annotation.Propagation
import org.springframework.transaction.annotation.Transactional
import pl.khuzzuk.wfrp.helper.model.creature.EyeColor
import pl.khuzzuk.wfrp.helper.model.creature.Gender
import pl.khuzzuk.wfrp.helper.model.creature.HairColor
import pl.khuzzuk.wfrp.helper.model.creature.Person
import pl.khuzzuk.wfrp.helper.model.creature.PhysicalFeature
import pl.khuzzuk.wfrp.helper.repo.crud.EyeColorRepo
import pl.khuzzuk.wfrp.helper.repo.crud.HairColorRepo
import pl.khuzzuk.wfrp.helper.repo.crud.PersonRepo
import pl.khuzzuk.wfrp.helper.repo.crud.PhysicalFeatureRepo
import spock.lang.Specification

import javax.persistence.EntityManager
import javax.persistence.Query

@SpringBootTest
@AutoConfigureEmbeddedDatabase
@Transactional(propagation = Propagation.NEVER)
class RemoteEntityUpdaterTest extends Specification {
    @Autowired
    EntityManager entityManager

    @Autowired
    RemoteEntityUpdater remoteEntityUpdater

    @Autowired
    PersonRepo personRepo

    @Autowired
    HairColorRepo hairColorRepo

    @Autowired
    EyeColorRepo eyeColorRepo

    @Autowired
    PhysicalFeatureRepo physicalFeatureRepo

    def "check save with physical features"() {
        given:
        EyeColor eyeColor = new EyeColor()
        eyeColor.name = "A123"
        eyeColorRepo.save(eyeColor)

        HairColor hairColor = new HairColor()
        hairColor.name = "B123"
        hairColorRepo.save(hairColor)

        PhysicalFeature physicalFeature = new PhysicalFeature()
        physicalFeature.name = "C123"
        physicalFeatureRepo.save(physicalFeature)

        Person person = new Person()
        person.name = "P111"
        person.age = 1
        person.eyeColor = eyeColor
        person.hairColor = hairColor
        person.gender = Gender.MALE

        personRepo.save(person)

        def query = entityManager.createQuery('FROM Person p WHERE p.id = :id')
        query.setParameter('id', person.id)
        when:

        Person toUpdate = query.getSingleResult() as Person
        toUpdate.getPhysicalFeatures().add(physicalFeature)

        then:

        personRepo.save(toUpdate)
    }
}
