package pl.khuzzuk.wfrp.helper.service.knowledge


import io.zonky.test.db.AutoConfigureEmbeddedDatabase
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.web.client.TestRestTemplate
import org.springframework.boot.web.server.LocalServerPort
import org.springframework.core.ParameterizedTypeReference
import org.springframework.http.HttpEntity
import org.springframework.http.HttpHeaders
import org.springframework.http.HttpMethod
import org.springframework.http.MediaType
import pl.khuzzuk.remote.Adapter
import pl.khuzzuk.wfrp.helper.model.knowledge.magic.SpellSchool
import pl.khuzzuk.wfrp.helper.model.knowledge.magic.SpellSchoolDTO
import pl.khuzzuk.wfrp.helper.model.knowledge.magic.SpellSchoolLevelDTO
import pl.khuzzuk.wfrp.helper.model.knowledge.magic.SpellSchoolRepo
import spock.lang.Shared
import spock.lang.Specification

import javax.transaction.Transactional

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureEmbeddedDatabase
class MagicRemoteServiceSpec extends Specification {
    @Autowired
    SpellSchoolRepo spellSchoolRepo
    @Autowired
    Adapter<SpellSchool, SpellSchoolDTO> spellSchoolDTOAdapter;
    @Shared
    static TestRestTemplate testRestTemplate = new TestRestTemplate()
    @LocalServerPort
    int port

    @Transactional
    def 'test get available spell schools'() {
        given:
        SpellSchool spellSchool = spellSchoolRepo.getOne(1L)
        CurrentMagicKnowledgeDTO currentMagicKnowledge = new CurrentMagicKnowledgeDTO()
        currentMagicKnowledge.setCurrentSpellSchools([spellSchoolDTOAdapter.map(spellSchool)] as List)
        currentMagicKnowledge.setCurrentSkills([])

        HttpHeaders headers = new HttpHeaders()
        headers.setContentType(MediaType.APPLICATION_JSON)
        def requestBody = new HttpEntity<Object>(currentMagicKnowledge, headers)

        when:
        def results = testRestTemplate.exchange("http://localhost:${port}/magic/getAvailableSpellSchools", HttpMethod.POST,
                requestBody, new ParameterizedTypeReference<List<SpellSchoolLevelDTO>>(){})

        then:
        with(results.body) {
            size() == 7
        }
    }
}
