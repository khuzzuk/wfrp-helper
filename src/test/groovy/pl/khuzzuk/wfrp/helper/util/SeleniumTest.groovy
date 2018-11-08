package pl.khuzzuk.wfrp.helper.util

import org.springframework.boot.test.context.SpringBootTest
import pl.khuzzuk.wfrp.helper.WfrpHelperApplication

import java.lang.annotation.*

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.TYPE)
@Documented
@Inherited
@interface SeleniumTest {
    String baseUrl() default "http://localhost:1081"
}