package pl.khuzzuk.wfrp.helper.security;

import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {
    private static final String LOGIN_URL = "/login.html";
    private static final String LOGIN_SUCCESS_URL = "/index.html";
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
                .csrf().disable().cors()
                .and()
                    .authorizeRequests()
                    //.antMatchers(HttpMethod.GET, "/login*", "/static/**", "/*.{js,html,css,json}").permitAll()
                    .anyRequest().permitAll();//.hasAnyRole("USER")
/*
                .and()
                    .formLogin()
                        .defaultSuccessUrl(LOGIN_SUCCESS_URL)
                .and()
                    .logout().logoutSuccessUrl(LOGIN_URL);
*/
        //@formatter:on
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration corsConfiguration = new CorsConfiguration();
        corsConfiguration.setAllowedOrigins(List.of("*"));
        corsConfiguration.setAllowedMethods(List.of("HEAD", "GET", "POST", "PUT"));
        corsConfiguration.setAllowedHeaders(List.of("Content-Type"));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", corsConfiguration);
        return source;
    }
}
