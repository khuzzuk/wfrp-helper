package pl.khuzzuk.wfrp.helper.security;

import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {
    private static final String LOGIN_URL = "/index.html";
    private static final String LOGIN_PERFORM_URL = "/loginPerform";
    private static final String LOGIN_FAILURE_URL = "/login?error=true";

    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    AuthenticationManager providedAuthenticationManager() throws Exception {
        return authenticationManager();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        // @formatter:off
        http
                    .csrf().disable()
                    //.requestCache().requestCache(new HttpSessionRequestCache())
                //.and()
                    .authorizeRequests()
                    .antMatchers(HttpMethod.GET, "/index*", "/static/**", "/*.js", "/*.json").permitAll()
                    .anyRequest().hasAnyRole("USER")
                .and()
                    .formLogin().loginPage(LOGIN_URL).permitAll().loginProcessingUrl(LOGIN_PERFORM_URL)
                    .failureUrl(LOGIN_FAILURE_URL)
                .and()
                    .logout().logoutSuccessUrl("/nation");
        //@formatter:on
    }
}
