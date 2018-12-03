package pl.khuzzuk.wfrp.helper.util


import org.springframework.test.context.jdbc.Sql

import java.lang.annotation.*

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.TYPE)
@Documented
@Inherited
@interface SeleniumTest {
    String baseUrl() default "http://localhost:1081"
}