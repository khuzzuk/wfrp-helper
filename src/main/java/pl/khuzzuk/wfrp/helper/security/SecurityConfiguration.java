package pl.khuzzuk.wfrp.helper.security;

import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.savedrequest.HttpSessionRequestCache;

@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {
    private static final String LOGIN_URL = "/login";
    private static final String LOGIN_FAILURE_URL = "/login?error";

    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    VaadinInternalRequestMatcher vaadinInternalRequestMatcher() {
        return new VaadinInternalRequestMatcher();
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
                    .requestCache().requestCache(new HttpSessionRequestCache())
                .and()
                    .authorizeRequests()
                    .requestMatchers(vaadinInternalRequestMatcher()).permitAll()
                    .anyRequest().hasAnyRole("USER")
                .and()
                    .formLogin().loginPage(LOGIN_URL).permitAll().loginProcessingUrl(LOGIN_URL)
                    .failureUrl(LOGIN_FAILURE_URL)
                .and()
                    .logout().logoutSuccessUrl(LOGIN_URL);
        //@formatter:on
    }

    @Override
    public void configure(WebSecurity web) {
        web.ignoring().antMatchers("/VAADIN/**", "/favicon.ico", "/manifest.json",
                "/icons/**", "/images/**", "/frontend/**", "/webjars/**", "/frontend-es5/**", "/frontend-es6/**");
    }
}
