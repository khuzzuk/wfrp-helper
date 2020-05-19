package pl.khuzzuk.wfrp.helper.security;

import static org.springframework.security.config.http.SessionCreationPolicy.STATELESS;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import pl.khuzzuk.wfrp.helper.security.jwt.JwtRequestFilter;

@RequiredArgsConstructor
@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

  private static final String LOGIN_URL = "/login.html";
  private static final String LOGIN_SUCCESS_URL = "/index.html";
  private static final String LOGIN_PERFORM_URL = "/loginPerform";
  private static final String LOGIN_FAILURE_URL = "/login?error=true";

  private final JwtRequestFilter jwtRequestFilter;

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
    http.csrf().disable().cors()
          .and()
        .formLogin().disable()
        .httpBasic().disable()
        .sessionManagement().sessionCreationPolicy(STATELESS)
          .and()
        .authorizeRequests()
          .antMatchers((HttpMethod) null, "/login*", "/static/**", "/*.{js,html,css,json}")
            .permitAll()
          .antMatchers("/auth/**", "/oauth2/**")
            .permitAll()
          .anyRequest()
            .hasAnyRole("USER")
          .and()
        .addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class)
    ;//@formatter:on
  }

  @Bean
  CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration corsConfiguration = new CorsConfiguration();
    corsConfiguration.setAllowedOrigins(List.of("*"));
    corsConfiguration.setAllowedMethods(List.of("HEAD", "GET", "POST", "PUT", "DELETE"));
    corsConfiguration.setAllowedHeaders(List.of("Content-Type"));

    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", corsConfiguration);
    return source;
  }
}
