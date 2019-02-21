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
    private static final String LOGIN_URL = "/login.html";
    private static final String LOGIN_SUCCESS_URL = "/frontend/index.html";
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
                    .authorizeRequests()
                    .antMatchers(HttpMethod.GET, "/login*", "/static/**", "/*.{js,html,css,json}").permitAll()
                    .anyRequest().hasAnyRole("USER")
                .and()
                    .formLogin()
                        .defaultSuccessUrl(LOGIN_SUCCESS_URL)
                .and()
                    .logout().logoutSuccessUrl(LOGIN_URL);
        //@formatter:on
    }
}
