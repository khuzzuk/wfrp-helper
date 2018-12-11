package pl.khuzzuk.wfrp.helper.util

import io.zonky.test.db.AutoConfigureEmbeddedDatabase
import org.springframework.test.context.TestExecutionListeners
import org.springframework.test.context.TestPropertySource

import java.lang.annotation.*

import static org.springframework.test.context.TestExecutionListeners.MergeMode.MERGE_WITH_DEFAULTS

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.TYPE)
@Documented
@Inherited
@TestExecutionListeners(mergeMode = MERGE_WITH_DEFAULTS, listeners = SeleniumTestExecutionListener)
@AutoConfigureEmbeddedDatabase
@TestPropertySource(properties = 'spring.flyway.locations=classpath:/db/migration,/db/data,db/test')
@interface SeleniumTest {
    String baseUrl() default "http://localhost:1081"
}